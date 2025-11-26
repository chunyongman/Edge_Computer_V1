"""
VFD AI 예방진단 모델
- Isolation Forest: 이상 탐지
- LSTM: 온도 예측
- Random Forest: 고장 유형 분류
"""

import logging
import pickle
import numpy as np
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from datetime import datetime
from collections import deque

# scikit-learn
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# TensorFlow/Keras (경량 LSTM)
try:
    import tensorflow as tf
    from tensorflow.keras.models import Sequential, load_model
    from tensorflow.keras.layers import LSTM, Dense, Dropout
    from tensorflow.keras.callbacks import EarlyStopping
    TF_AVAILABLE = True
except ImportError:
    TF_AVAILABLE = False
    logging.warning("⚠️ TensorFlow 미설치 - LSTM 기능 비활성화")

from src.database.db_manager import get_db_manager

logger = logging.getLogger(__name__)


class IsolationForestAnomalyDetector:
    """
    Isolation Forest 기반 이상 탐지

    정상 데이터 패턴을 학습하고, 이상치를 탐지
    """

    def __init__(self, model_dir: str = "models"):
        self.model_dir = Path(model_dir)
        self.model_dir.mkdir(parents=True, exist_ok=True)

        self.model: Optional[IsolationForest] = None
        self.scaler: Optional[StandardScaler] = None
        self.is_trained = False

        # 모델 파일 경로
        self.model_path = self.model_dir / "isolation_forest.pkl"
        self.scaler_path = self.model_dir / "if_scaler.pkl"

        # 저장된 모델 로드 시도
        self._load_model()

    def _load_model(self):
        """저장된 모델 로드"""
        try:
            if self.model_path.exists() and self.scaler_path.exists():
                with open(self.model_path, 'rb') as f:
                    self.model = pickle.load(f)
                with open(self.scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
                self.is_trained = True
                logger.info("✅ Isolation Forest 모델 로드 완료")
        except Exception as e:
            logger.warning(f"⚠️ 모델 로드 실패: {e}")

    def train(self, features: np.ndarray, contamination: float = 0.1):
        """
        모델 학습

        Args:
            features: 특성 데이터 (n_samples, n_features)
            contamination: 예상 이상치 비율
        """
        if len(features) < 100:
            logger.warning("⚠️ 학습 데이터 부족 (최소 100개 필요)")
            return False

        try:
            # 스케일링
            self.scaler = StandardScaler()
            scaled_features = self.scaler.fit_transform(features)

            # Isolation Forest 학습
            self.model = IsolationForest(
                n_estimators=100,
                contamination=contamination,
                random_state=42,
                n_jobs=-1
            )
            self.model.fit(scaled_features)

            # 모델 저장
            with open(self.model_path, 'wb') as f:
                pickle.dump(self.model, f)
            with open(self.scaler_path, 'wb') as f:
                pickle.dump(self.scaler, f)

            self.is_trained = True
            logger.info(f"✅ Isolation Forest 학습 완료: {len(features)}개 샘플")

            # 메타데이터 저장
            db = get_db_manager()
            db.save_model_metadata(
                model_name="isolation_forest",
                model_type="anomaly_detection",
                version="1.0",
                accuracy=0.0,  # 비지도 학습이라 정확도 없음
                parameters={"contamination": contamination, "n_estimators": 100},
                file_path=str(self.model_path)
            )

            return True

        except Exception as e:
            logger.error(f"❌ 학습 실패: {e}")
            return False

    def predict(self, features: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        이상 탐지 예측

        Args:
            features: 특성 데이터

        Returns:
            (is_anomaly, anomaly_scores)
            - is_anomaly: True면 이상, False면 정상
            - anomaly_scores: 이상 점수 (0-100, 높을수록 이상)
        """
        if not self.is_trained:
            # 학습되지 않은 경우 기본값 반환
            return np.zeros(len(features), dtype=bool), np.zeros(len(features))

        try:
            scaled_features = self.scaler.transform(features)

            # -1: 이상, 1: 정상
            predictions = self.model.predict(scaled_features)
            is_anomaly = predictions == -1

            # 이상 점수 (decision_function: 낮을수록 이상)
            raw_scores = self.model.decision_function(scaled_features)
            # 0-100 스케일로 변환 (낮은 값 → 높은 이상 점수)
            anomaly_scores = np.clip((0.5 - raw_scores) * 100, 0, 100)

            return is_anomaly, anomaly_scores

        except Exception as e:
            logger.error(f"❌ 예측 실패: {e}")
            return np.zeros(len(features), dtype=bool), np.zeros(len(features))

    def predict_single(self, features: List[float]) -> Tuple[bool, float]:
        """단일 샘플 예측"""
        features_array = np.array([features])
        is_anomaly, scores = self.predict(features_array)
        return bool(is_anomaly[0]), float(scores[0])


class LSTMTemperaturePredictor:
    """
    LSTM 기반 온도 예측

    시계열 온도 데이터를 학습하여 미래 온도 예측
    """

    def __init__(self, model_dir: str = "models", sequence_length: int = 30):
        self.model_dir = Path(model_dir)
        self.model_dir.mkdir(parents=True, exist_ok=True)

        self.sequence_length = sequence_length
        self.model = None
        self.scaler: Optional[StandardScaler] = None
        self.is_trained = False

        self.model_path = self.model_dir / "lstm_temp.h5"
        self.scaler_path = self.model_dir / "lstm_scaler.pkl"

        if TF_AVAILABLE:
            self._load_model()

    def _load_model(self):
        """저장된 모델 로드"""
        if not TF_AVAILABLE:
            return

        try:
            if self.model_path.exists() and self.scaler_path.exists():
                self.model = load_model(str(self.model_path))
                with open(self.scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
                self.is_trained = True
                logger.info("✅ LSTM 모델 로드 완료")
        except Exception as e:
            logger.warning(f"⚠️ LSTM 모델 로드 실패: {e}")

    def _build_model(self, n_features: int):
        """LSTM 모델 구축"""
        model = Sequential([
            LSTM(64, input_shape=(self.sequence_length, n_features), return_sequences=True),
            Dropout(0.2),
            LSTM(32, return_sequences=False),
            Dropout(0.2),
            Dense(16, activation='relu'),
            Dense(1)  # 온도 예측
        ])
        model.compile(optimizer='adam', loss='mse', metrics=['mae'])
        return model

    def prepare_sequences(
        self,
        data: np.ndarray,
        target_col: int = 0
    ) -> Tuple[np.ndarray, np.ndarray]:
        """
        시계열 데이터를 LSTM 입력 형태로 변환

        Args:
            data: (n_samples, n_features) 데이터
            target_col: 예측할 컬럼 인덱스 (기본: 온도)

        Returns:
            X: (n_sequences, sequence_length, n_features)
            y: (n_sequences,) 타겟 값
        """
        X, y = [], []

        for i in range(len(data) - self.sequence_length):
            X.append(data[i:i + self.sequence_length])
            y.append(data[i + self.sequence_length, target_col])

        return np.array(X), np.array(y)

    def train(
        self,
        temperature_data: np.ndarray,
        additional_features: np.ndarray = None,
        epochs: int = 50,
        batch_size: int = 32
    ):
        """
        LSTM 모델 학습

        Args:
            temperature_data: 온도 시계열 데이터 (n_samples,)
            additional_features: 추가 특성 (n_samples, n_features)
            epochs: 학습 에폭
            batch_size: 배치 크기
        """
        if not TF_AVAILABLE:
            logger.warning("⚠️ TensorFlow 미설치 - LSTM 학습 불가")
            return False

        if len(temperature_data) < self.sequence_length * 2:
            logger.warning("⚠️ 학습 데이터 부족")
            return False

        try:
            # 데이터 준비
            if additional_features is not None:
                data = np.column_stack([temperature_data, additional_features])
            else:
                data = temperature_data.reshape(-1, 1)

            # 스케일링
            self.scaler = StandardScaler()
            scaled_data = self.scaler.fit_transform(data)

            # 시퀀스 생성
            X, y = self.prepare_sequences(scaled_data, target_col=0)

            if len(X) < 50:
                logger.warning("⚠️ 시퀀스 데이터 부족")
                return False

            # Train/Test 분할
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42
            )

            # 모델 구축 및 학습
            n_features = X.shape[2]
            self.model = self._build_model(n_features)

            early_stop = EarlyStopping(
                monitor='val_loss',
                patience=10,
                restore_best_weights=True
            )

            self.model.fit(
                X_train, y_train,
                validation_data=(X_test, y_test),
                epochs=epochs,
                batch_size=batch_size,
                callbacks=[early_stop],
                verbose=0
            )

            # 평가
            loss, mae = self.model.evaluate(X_test, y_test, verbose=0)
            logger.info(f"✅ LSTM 학습 완료: MAE={mae:.4f}")

            # 모델 저장
            self.model.save(str(self.model_path))
            with open(self.scaler_path, 'wb') as f:
                pickle.dump(self.scaler, f)

            self.is_trained = True

            # 메타데이터 저장
            db = get_db_manager()
            db.save_model_metadata(
                model_name="lstm_temperature",
                model_type="regression",
                version="1.0",
                accuracy=1.0 - mae,  # MAE를 정확도로 변환
                parameters={
                    "sequence_length": self.sequence_length,
                    "epochs": epochs
                },
                file_path=str(self.model_path)
            )

            return True

        except Exception as e:
            logger.error(f"❌ LSTM 학습 실패: {e}")
            return False

    def predict(
        self,
        recent_temps: np.ndarray,
        additional_features: np.ndarray = None,
        steps_ahead: int = 15
    ) -> List[float]:
        """
        미래 온도 예측

        Args:
            recent_temps: 최근 온도 데이터 (sequence_length,)
            additional_features: 추가 특성
            steps_ahead: 예측할 스텝 수 (각 스텝 = 2초, 15스텝 = 30초)

        Returns:
            예측 온도 리스트
        """
        if not self.is_trained or not TF_AVAILABLE:
            # 선형 추세로 간단 예측
            if len(recent_temps) >= 2:
                slope = (recent_temps[-1] - recent_temps[0]) / len(recent_temps)
                return [recent_temps[-1] + slope * i for i in range(1, steps_ahead + 1)]
            return [recent_temps[-1]] * steps_ahead if len(recent_temps) > 0 else [0.0] * steps_ahead

        try:
            # 데이터 준비
            if additional_features is not None:
                data = np.column_stack([recent_temps[-self.sequence_length:], additional_features[-self.sequence_length:]])
            else:
                data = recent_temps[-self.sequence_length:].reshape(-1, 1)

            scaled_data = self.scaler.transform(data)

            predictions = []
            current_sequence = scaled_data.copy()

            for _ in range(steps_ahead):
                # 예측
                X = current_sequence.reshape(1, self.sequence_length, -1)
                pred = self.model.predict(X, verbose=0)[0, 0]
                predictions.append(pred)

                # 시퀀스 업데이트
                new_row = current_sequence[-1].copy()
                new_row[0] = pred
                current_sequence = np.vstack([current_sequence[1:], new_row])

            # 역스케일링 (온도만)
            dummy = np.zeros((len(predictions), self.scaler.n_features_in_))
            dummy[:, 0] = predictions
            unscaled = self.scaler.inverse_transform(dummy)

            return unscaled[:, 0].tolist()

        except Exception as e:
            logger.error(f"❌ LSTM 예측 실패: {e}")
            return [recent_temps[-1]] * steps_ahead if len(recent_temps) > 0 else [0.0] * steps_ahead

    def predict_30min(self, recent_temps: np.ndarray) -> float:
        """30분 후 온도 예측"""
        # 2초 주기 기준: 30분 = 900초 = 450 스텝
        # 간략화: 15스텝씩 30번 예측
        predictions = self.predict(recent_temps, steps_ahead=450)
        return predictions[-1] if predictions else recent_temps[-1]


class RandomForestFaultClassifier:
    """
    Random Forest 기반 고장 유형 분류

    이상 패턴을 특정 고장 유형으로 분류
    """

    FAULT_TYPES = [
        "normal",           # 정상
        "bearing_wear",     # 베어링 마모
        "cooling_fault",    # 냉각 이상
        "electrical_fault", # 전기적 이상
        "overload",         # 과부하
        "vibration_fault"   # 진동 이상
    ]

    def __init__(self, model_dir: str = "models"):
        self.model_dir = Path(model_dir)
        self.model_dir.mkdir(parents=True, exist_ok=True)

        self.model: Optional[RandomForestClassifier] = None
        self.scaler: Optional[StandardScaler] = None
        self.is_trained = False

        self.model_path = self.model_dir / "random_forest_fault.pkl"
        self.scaler_path = self.model_dir / "rf_scaler.pkl"

        self._load_model()

    def _load_model(self):
        """저장된 모델 로드"""
        try:
            if self.model_path.exists() and self.scaler_path.exists():
                with open(self.model_path, 'rb') as f:
                    self.model = pickle.load(f)
                with open(self.scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
                self.is_trained = True
                logger.info("✅ Random Forest 모델 로드 완료")
        except Exception as e:
            logger.warning(f"⚠️ 모델 로드 실패: {e}")

    def train(self, features: np.ndarray, labels: np.ndarray):
        """
        모델 학습

        Args:
            features: 특성 데이터
            labels: 고장 유형 라벨
        """
        if len(features) < 50:
            logger.warning("⚠️ 학습 데이터 부족")
            return False

        try:
            # 스케일링
            self.scaler = StandardScaler()
            scaled_features = self.scaler.fit_transform(features)

            # Train/Test 분할
            X_train, X_test, y_train, y_test = train_test_split(
                scaled_features, labels, test_size=0.2, random_state=42
            )

            # Random Forest 학습
            self.model = RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                random_state=42,
                n_jobs=-1
            )
            self.model.fit(X_train, y_train)

            # 평가
            accuracy = self.model.score(X_test, y_test)
            logger.info(f"✅ Random Forest 학습 완료: 정확도={accuracy:.4f}")

            # 모델 저장
            with open(self.model_path, 'wb') as f:
                pickle.dump(self.model, f)
            with open(self.scaler_path, 'wb') as f:
                pickle.dump(self.scaler, f)

            self.is_trained = True

            # 메타데이터 저장
            db = get_db_manager()
            db.save_model_metadata(
                model_name="random_forest_fault",
                model_type="classification",
                version="1.0",
                accuracy=accuracy,
                parameters={"n_estimators": 100, "max_depth": 10},
                file_path=str(self.model_path)
            )

            return True

        except Exception as e:
            logger.error(f"❌ 학습 실패: {e}")
            return False

    def predict(self, features: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        고장 유형 예측

        Args:
            features: 특성 데이터

        Returns:
            (predicted_labels, probabilities)
        """
        if not self.is_trained:
            return np.array(["normal"] * len(features)), np.zeros((len(features), len(self.FAULT_TYPES)))

        try:
            scaled_features = self.scaler.transform(features)
            predictions = self.model.predict(scaled_features)
            probabilities = self.model.predict_proba(scaled_features)

            return predictions, probabilities

        except Exception as e:
            logger.error(f"❌ 예측 실패: {e}")
            return np.array(["normal"] * len(features)), np.zeros((len(features), len(self.FAULT_TYPES)))

    def predict_single(self, features: List[float]) -> Dict:
        """
        단일 샘플 고장 유형 예측

        Returns:
            {
                "predicted_fault": "bearing_wear",
                "confidence": 0.85,
                "probabilities": {"normal": 0.1, "bearing_wear": 0.85, ...}
            }
        """
        features_array = np.array([features])
        predictions, probabilities = self.predict(features_array)

        prob_dict = {}
        if self.is_trained and hasattr(self.model, 'classes_'):
            for i, cls in enumerate(self.model.classes_):
                prob_dict[cls] = float(probabilities[0, i])
        else:
            prob_dict = {ft: 0.0 for ft in self.FAULT_TYPES}
            prob_dict["normal"] = 1.0

        return {
            "predicted_fault": predictions[0],
            "confidence": float(np.max(probabilities[0])) if len(probabilities[0]) > 0 else 1.0,
            "probabilities": prob_dict
        }

    def generate_synthetic_training_data(self, n_samples: int = 1000) -> Tuple[np.ndarray, np.ndarray]:
        """
        합성 학습 데이터 생성 (실제 고장 데이터 없을 때 사용)

        실제 운영에서는 실제 고장 이력 데이터로 학습해야 함
        """
        np.random.seed(42)

        features_list = []
        labels_list = []

        samples_per_class = n_samples // len(self.FAULT_TYPES)

        for fault_type in self.FAULT_TYPES:
            for _ in range(samples_per_class):
                # 기본 정상 패턴
                features = [
                    np.random.normal(65, 5),   # 온도 평균
                    np.random.normal(2, 0.5),  # 온도 표준편차
                    np.random.normal(72, 5),   # 온도 최대
                    np.random.normal(58, 5),   # 온도 최소
                    np.random.normal(0, 0.1),  # 온도 추세
                    np.random.normal(0, 2),    # 온도 변화량
                    np.random.normal(55, 5),   # 히트싱크 온도
                    np.random.normal(2, 0.5),  # 히트싱크 표준편차
                    np.random.normal(62, 5),   # 히트싱크 최대
                    np.random.normal(55, 5),   # 히트싱크 현재
                    np.random.normal(100, 20), # 전류 평균
                    np.random.normal(10, 3),   # 전류 표준편차
                    np.random.normal(120, 20), # 전류 최대
                    np.random.normal(100, 20), # 전류 현재
                    np.random.normal(45, 5),   # 주파수 평균
                    np.random.normal(2, 0.5),  # 주파수 표준편차
                    np.random.normal(45, 5),   # 주파수 현재
                    np.random.normal(10, 5),   # 심각도 평균
                    np.random.normal(15, 5),   # 심각도 최대
                    np.random.normal(10, 5),   # 심각도 현재
                ]

                # 고장 유형별 패턴 변조
                if fault_type == "bearing_wear":
                    features[0] += 10  # 온도 상승
                    features[4] += 0.3  # 온도 추세 상승
                    features[10] += 20  # 전류 증가

                elif fault_type == "cooling_fault":
                    features[0] += 15  # 온도 급상승
                    features[6] += 15  # 히트싱크 온도 상승
                    features[4] += 0.5  # 온도 추세 급상승

                elif fault_type == "electrical_fault":
                    features[10] += 40  # 전류 급증
                    features[11] += 10  # 전류 변동 증가
                    features[17] += 30  # 심각도 증가

                elif fault_type == "overload":
                    features[10] += 50  # 전류 매우 높음
                    features[0] += 8   # 온도 상승
                    features[14] += 10  # 주파수 증가

                elif fault_type == "vibration_fault":
                    features[1] += 5   # 온도 변동 증가
                    features[11] += 15  # 전류 변동 증가
                    features[15] += 5   # 주파수 변동

                features_list.append(features)
                labels_list.append(fault_type)

        return np.array(features_list), np.array(labels_list)


class VFDAIEngine:
    """
    VFD AI 예방진단 통합 엔진

    모든 AI 모델을 통합하여 종합 진단 제공
    """

    def __init__(self, model_dir: str = "models"):
        self.model_dir = Path(model_dir)

        # AI 모델들 초기화
        self.anomaly_detector = IsolationForestAnomalyDetector(str(self.model_dir))
        self.temp_predictor = LSTMTemperaturePredictor(str(self.model_dir))
        self.fault_classifier = RandomForestFaultClassifier(str(self.model_dir))

        # 데이터 버퍼 (VFD별)
        self.data_buffers: Dict[str, deque] = {}
        self.buffer_size = 60  # 2분 (2초 주기)

        logger.info("✅ VFD AI Engine 초기화 완료")

    def add_data_point(
        self,
        vfd_id: str,
        motor_temp: float,
        heatsink_temp: float,
        current: float,
        frequency: float,
        severity_score: int
    ):
        """데이터 포인트 추가"""
        if vfd_id not in self.data_buffers:
            self.data_buffers[vfd_id] = deque(maxlen=self.buffer_size)

        self.data_buffers[vfd_id].append({
            'motor_temp': motor_temp,
            'heatsink_temp': heatsink_temp,
            'current': current,
            'frequency': frequency,
            'severity_score': severity_score,
            'timestamp': datetime.now()
        })

    def analyze(self, vfd_id: str) -> Dict:
        """
        종합 AI 분석

        Returns:
            {
                "anomaly_detected": bool,
                "anomaly_score": float (0-100),
                "predicted_temp_30min": float,
                "temp_trend": str,
                "fault_prediction": {
                    "predicted_fault": str,
                    "confidence": float,
                    "probabilities": dict
                },
                "recommendations": list,
                "risk_level": str  # "low", "medium", "high", "critical"
            }
        """
        result = {
            "anomaly_detected": False,
            "anomaly_score": 0.0,
            "predicted_temp_30min": 0.0,
            "temp_trend": "stable",
            "fault_prediction": {
                "predicted_fault": "normal",
                "confidence": 1.0,
                "probabilities": {}
            },
            "recommendations": [],
            "risk_level": "low"
        }

        buffer = self.data_buffers.get(vfd_id)
        if not buffer or len(buffer) < 30:
            result["recommendations"].append("데이터 수집 중... (최소 1분 필요)")
            return result

        data = list(buffer)

        # 특성 추출
        features = self._extract_features(data)

        # 1. 이상 탐지
        is_anomaly, anomaly_score = self.anomaly_detector.predict_single(features)
        result["anomaly_detected"] = is_anomaly
        result["anomaly_score"] = anomaly_score

        # 2. 온도 예측
        temps = np.array([d['motor_temp'] for d in data])
        predictions = self.temp_predictor.predict(temps, steps_ahead=900)  # 30분
        result["predicted_temp_30min"] = predictions[-1] if predictions else temps[-1]

        # 온도 추세
        if len(temps) >= 10:
            slope = np.polyfit(range(len(temps)), temps, 1)[0]
            if slope > 0.1:
                result["temp_trend"] = "rising"
            elif slope < -0.1:
                result["temp_trend"] = "falling"
            else:
                result["temp_trend"] = "stable"

        # 3. 고장 유형 예측
        fault_result = self.fault_classifier.predict_single(features)
        result["fault_prediction"] = fault_result

        # 4. 위험도 평가 및 권고사항 생성
        result["risk_level"], result["recommendations"] = self._evaluate_risk(
            anomaly_score=anomaly_score,
            predicted_temp=result["predicted_temp_30min"],
            fault_type=fault_result["predicted_fault"],
            fault_confidence=fault_result["confidence"]
        )

        return result

    def _extract_features(self, data: List[Dict]) -> List[float]:
        """특성 벡터 추출"""
        motor_temps = [d['motor_temp'] for d in data]
        heatsink_temps = [d['heatsink_temp'] for d in data]
        currents = [d['current'] for d in data]
        frequencies = [d['frequency'] for d in data]
        severity_scores = [d['severity_score'] for d in data]

        x = np.arange(len(motor_temps))
        temp_slope = np.polyfit(x, motor_temps, 1)[0] if len(motor_temps) > 1 else 0

        return [
            np.mean(motor_temps),
            np.std(motor_temps),
            np.max(motor_temps),
            np.min(motor_temps),
            temp_slope,
            motor_temps[-1] - motor_temps[0],
            np.mean(heatsink_temps),
            np.std(heatsink_temps),
            np.max(heatsink_temps),
            heatsink_temps[-1],
            np.mean(currents),
            np.std(currents),
            np.max(currents),
            currents[-1],
            np.mean(frequencies),
            np.std(frequencies),
            frequencies[-1],
            np.mean(severity_scores),
            np.max(severity_scores),
            severity_scores[-1],
        ]

    def _evaluate_risk(
        self,
        anomaly_score: float,
        predicted_temp: float,
        fault_type: str,
        fault_confidence: float
    ) -> Tuple[str, List[str]]:
        """위험도 평가 및 권고사항 생성"""
        recommendations = []
        risk_score = 0

        # 이상 점수 기반
        if anomaly_score > 70:
            risk_score += 40
            recommendations.append("⚠️ 비정상 패턴 감지 - 즉시 점검 필요")
        elif anomaly_score > 50:
            risk_score += 25
            recommendations.append("⚠️ 이상 징후 감지 - 주의 관찰 필요")
        elif anomaly_score > 30:
            risk_score += 10

        # 예측 온도 기반
        if predicted_temp > 85:
            risk_score += 35
            recommendations.append(f"🌡️ 30분 후 온도 {predicted_temp:.1f}°C 예상 - 냉각 조치 필요")
        elif predicted_temp > 75:
            risk_score += 20
            recommendations.append(f"🌡️ 30분 후 온도 {predicted_temp:.1f}°C 예상 - 모니터링 강화")

        # 고장 유형 기반
        if fault_type != "normal" and fault_confidence > 0.7:
            risk_score += 25

            fault_recommendations = {
                "bearing_wear": "🔧 베어링 마모 의심 - 진동 측정 및 윤활 상태 점검 권장",
                "cooling_fault": "❄️ 냉각 이상 의심 - 냉각팬 및 방열판 점검 권장",
                "electrical_fault": "⚡ 전기적 이상 의심 - 전원 및 배선 점검 권장",
                "overload": "📈 과부하 상태 - 부하 감소 또는 용량 검토 필요",
                "vibration_fault": "📳 진동 이상 의심 - 설치 상태 및 밸런싱 점검 권장"
            }

            if fault_type in fault_recommendations:
                recommendations.append(fault_recommendations[fault_type])
                recommendations.append(f"   (신뢰도: {fault_confidence * 100:.0f}%)")

        # 위험도 등급 결정
        if risk_score >= 60:
            risk_level = "critical"
            if not any("즉시" in r for r in recommendations):
                recommendations.insert(0, "🚨 즉시 점검 필요")
        elif risk_score >= 40:
            risk_level = "high"
            recommendations.insert(0, "⚠️ 1주일 내 점검 권장")
        elif risk_score >= 20:
            risk_level = "medium"
            recommendations.insert(0, "📋 정기 점검 시 확인 필요")
        else:
            risk_level = "low"
            if not recommendations:
                recommendations.append("✅ 정상 운전 중")

        return risk_level, recommendations

    def train_models(self, training_data: Dict[str, np.ndarray] = None):
        """
        모든 모델 학습

        Args:
            training_data: {
                "features": np.ndarray,
                "temperatures": np.ndarray,
                "fault_labels": np.ndarray (optional)
            }
        """
        if training_data is None:
            logger.info("🔄 합성 데이터로 모델 학습 시작...")

            # Isolation Forest: 정상 데이터 패턴 학습
            # 실제로는 수집된 정상 데이터 사용
            normal_features = np.random.normal(0, 1, (500, 20))
            self.anomaly_detector.train(normal_features)

            # Random Forest: 합성 데이터로 학습
            features, labels = self.fault_classifier.generate_synthetic_training_data()
            self.fault_classifier.train(features, labels)

            # LSTM: 온도 데이터 필요
            if TF_AVAILABLE:
                temps = np.random.normal(65, 5, 1000)  # 샘플 데이터
                self.temp_predictor.train(temps)

            logger.info("✅ 모델 학습 완료")
        else:
            # 실제 데이터로 학습
            if "features" in training_data:
                self.anomaly_detector.train(training_data["features"])

            if "temperatures" in training_data:
                self.temp_predictor.train(training_data["temperatures"])

            if "features" in training_data and "fault_labels" in training_data:
                self.fault_classifier.train(
                    training_data["features"],
                    training_data["fault_labels"]
                )


# 싱글톤 인스턴스
_ai_engine: Optional[VFDAIEngine] = None


def get_ai_engine() -> VFDAIEngine:
    """VFDAIEngine 싱글톤 인스턴스 반환"""
    global _ai_engine
    if _ai_engine is None:
        _ai_engine = VFDAIEngine()
    return _ai_engine
