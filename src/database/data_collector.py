"""
VFD 데이터 수집기
- 실시간 진단 데이터 수집
- 트렌드 데이터 집계
- AI 학습 데이터 준비
"""

import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from collections import deque
import numpy as np

from src.database.db_manager import get_db_manager, DatabaseManager
from src.diagnostics.vfd_monitor import VFDDiagnostic

logger = logging.getLogger(__name__)


class VFDDataCollector:
    """VFD 데이터 수집 및 저장"""

    def __init__(
        self,
        db_manager: DatabaseManager = None,
        sample_interval_seconds: int = 2,
        trend_interval_minutes: int = 1
    ):
        """
        초기화

        Args:
            db_manager: 데이터베이스 관리자
            sample_interval_seconds: 샘플링 주기 (초)
            trend_interval_minutes: 트렌드 집계 주기 (분)
        """
        self.db = db_manager or get_db_manager()
        self.sample_interval = sample_interval_seconds
        self.trend_interval = trend_interval_minutes

        # VFD별 임시 버퍼 (트렌드 집계용)
        self.buffers: Dict[str, deque] = {}
        self.buffer_size = int(60 / sample_interval_seconds * trend_interval_minutes)

        # 마지막 트렌드 저장 시각
        self.last_trend_save: Dict[str, datetime] = {}

        # 샘플 카운터 (모든 데이터 저장하지 않고 일정 간격으로)
        self.sample_counter: Dict[str, int] = {}
        self.save_every_n_samples = 5  # 5개 샘플마다 1개 저장 (10초 간격)

        logger.info("✅ VFDDataCollector 초기화 완료")

    def collect(self, diagnostic: VFDDiagnostic):
        """
        VFD 진단 데이터 수집

        Args:
            diagnostic: VFD 진단 결과
        """
        vfd_id = diagnostic.vfd_id

        # 버퍼 초기화
        if vfd_id not in self.buffers:
            self.buffers[vfd_id] = deque(maxlen=self.buffer_size)
            self.last_trend_save[vfd_id] = datetime.now()
            self.sample_counter[vfd_id] = 0

        # 버퍼에 추가
        self.buffers[vfd_id].append(diagnostic)

        # 샘플 카운터 증가
        self.sample_counter[vfd_id] += 1

        # N개 샘플마다 DB에 저장
        if self.sample_counter[vfd_id] >= self.save_every_n_samples:
            self._save_diagnostic(diagnostic)
            self.sample_counter[vfd_id] = 0

        # 트렌드 집계 체크
        self._check_trend_aggregation(vfd_id)

    def _save_diagnostic(self, diagnostic: VFDDiagnostic):
        """진단 데이터를 DB에 저장"""
        try:
            health_score = 100 - diagnostic.severity_score

            self.db.insert_vfd_diagnostic(
                vfd_id=diagnostic.vfd_id,
                health_score=health_score,
                severity_score=diagnostic.severity_score,
                status_grade=diagnostic.status_grade.value,
                anomaly_patterns=diagnostic.anomaly_patterns,
                motor_temp=diagnostic.motor_temperature_c,
                heatsink_temp=diagnostic.heatsink_temperature_c,
                frequency=diagnostic.current_frequency_hz,
                output_current=diagnostic.output_current_a,
                output_voltage=diagnostic.output_voltage_v,
                dc_bus_voltage=diagnostic.dc_bus_voltage_v,
                timestamp=diagnostic.timestamp
            )

        except Exception as e:
            logger.error(f"❌ 진단 데이터 저장 실패: {e}")

    def _check_trend_aggregation(self, vfd_id: str):
        """트렌드 데이터 집계 체크"""
        now = datetime.now()
        last_save = self.last_trend_save.get(vfd_id, now)

        # 집계 주기가 지났으면 트렌드 저장
        if (now - last_save).total_seconds() >= self.trend_interval * 60:
            self._save_trend(vfd_id)
            self.last_trend_save[vfd_id] = now

    def _save_trend(self, vfd_id: str):
        """트렌드 데이터 집계 및 저장"""
        buffer = self.buffers.get(vfd_id)
        if not buffer or len(buffer) == 0:
            return

        try:
            diagnostics = list(buffer)

            # 집계 계산
            health_scores = [100 - d.severity_score for d in diagnostics]
            motor_temps = [d.motor_temperature_c for d in diagnostics]
            heatsink_temps = [d.heatsink_temperature_c for d in diagnostics]
            frequencies = [d.current_frequency_hz for d in diagnostics]
            currents = [d.output_current_a for d in diagnostics]

            self.db.insert_trend_minute(
                vfd_id=vfd_id,
                timestamp=datetime.now(),
                avg_health_score=np.mean(health_scores),
                avg_motor_temp=np.mean(motor_temps),
                avg_heatsink_temp=np.mean(heatsink_temps),
                avg_frequency=np.mean(frequencies),
                avg_current=np.mean(currents),
                max_motor_temp=np.max(motor_temps),
                min_motor_temp=np.min(motor_temps),
                sample_count=len(diagnostics)
            )

            logger.debug(f"📊 {vfd_id} 트렌드 저장: {len(diagnostics)}개 샘플")

        except Exception as e:
            logger.error(f"❌ 트렌드 데이터 저장 실패: {e}")

    def record_alarm(
        self,
        alarm_id: str,
        equipment_id: str,
        alarm_type: str,
        severity: str,
        message: str,
        details: Dict = None
    ):
        """알람 기록"""
        try:
            self.db.insert_alarm(
                alarm_id=alarm_id,
                equipment_id=equipment_id,
                alarm_type=alarm_type,
                severity=severity,
                message=message,
                details=details
            )

            # 이벤트 로그에도 기록
            self.db.insert_event(
                event_type="ALARM",
                source=equipment_id,
                description=f"{alarm_type}: {message}",
                details={"alarm_id": alarm_id, "severity": severity}
            )

            logger.info(f"🚨 알람 기록: {equipment_id} - {message}")

        except Exception as e:
            logger.error(f"❌ 알람 기록 실패: {e}")

    def record_event(
        self,
        event_type: str,
        source: str,
        description: str,
        details: Dict = None
    ):
        """이벤트 기록"""
        try:
            self.db.insert_event(
                event_type=event_type,
                source=source,
                description=description,
                details=details
            )
        except Exception as e:
            logger.error(f"❌ 이벤트 기록 실패: {e}")

    def prepare_training_features(self, vfd_id: str, window_size: int = 30) -> Optional[List[float]]:
        """
        AI 학습용 특성 벡터 준비

        Args:
            vfd_id: VFD ID
            window_size: 윈도우 크기 (샘플 수)

        Returns:
            특성 벡터 [온도평균, 온도표준편차, 온도추세, 전류평균, 전류표준편차, ...]
        """
        buffer = self.buffers.get(vfd_id)
        if not buffer or len(buffer) < window_size:
            return None

        diagnostics = list(buffer)[-window_size:]

        # 특성 추출
        motor_temps = [d.motor_temperature_c for d in diagnostics]
        heatsink_temps = [d.heatsink_temperature_c for d in diagnostics]
        currents = [d.output_current_a for d in diagnostics]
        frequencies = [d.current_frequency_hz for d in diagnostics]
        severity_scores = [d.severity_score for d in diagnostics]

        # 온도 추세 (선형 회귀 기울기)
        x = np.arange(len(motor_temps))
        temp_slope = np.polyfit(x, motor_temps, 1)[0] if len(motor_temps) > 1 else 0

        # 특성 벡터 구성
        features = [
            # 온도 관련 (6개)
            np.mean(motor_temps),
            np.std(motor_temps),
            np.max(motor_temps),
            np.min(motor_temps),
            temp_slope,
            motor_temps[-1] - motor_temps[0],  # 변화량

            # 히트싱크 온도 (4개)
            np.mean(heatsink_temps),
            np.std(heatsink_temps),
            np.max(heatsink_temps),
            heatsink_temps[-1],

            # 전류 (4개)
            np.mean(currents),
            np.std(currents),
            np.max(currents),
            currents[-1],

            # 주파수 (3개)
            np.mean(frequencies),
            np.std(frequencies),
            frequencies[-1],

            # 심각도 (3개)
            np.mean(severity_scores),
            np.max(severity_scores),
            severity_scores[-1],
        ]

        return features

    def save_training_sample(
        self,
        vfd_id: str,
        features: List[float],
        label: str = None,
        label_type: str = "anomaly"
    ):
        """AI 학습 샘플 저장"""
        try:
            self.db.insert_training_data(
                vfd_id=vfd_id,
                feature_vector=features,
                label=label,
                label_type=label_type
            )
        except Exception as e:
            logger.error(f"❌ 학습 데이터 저장 실패: {e}")

    def get_historical_features(
        self,
        vfd_id: str,
        hours: int = 24,
        window_size: int = 30
    ) -> List[List[float]]:
        """
        과거 데이터에서 특성 벡터 추출 (AI 학습용)

        Args:
            vfd_id: VFD ID
            hours: 조회할 시간 범위
            window_size: 윈도우 크기

        Returns:
            특성 벡터 리스트
        """
        start_date = datetime.now() - timedelta(hours=hours)
        history = self.db.get_vfd_diagnostic_history(
            vfd_id=vfd_id,
            start_date=start_date,
            limit=10000
        )

        if len(history) < window_size:
            return []

        features_list = []

        # 슬라이딩 윈도우로 특성 추출
        for i in range(len(history) - window_size + 1):
            window = history[i:i + window_size]

            motor_temps = [d['motor_temp'] for d in window]
            heatsink_temps = [d['heatsink_temp'] for d in window]
            currents = [d['output_current'] for d in window]
            frequencies = [d['frequency'] for d in window]
            severity_scores = [d['severity_score'] for d in window]

            x = np.arange(len(motor_temps))
            temp_slope = np.polyfit(x, motor_temps, 1)[0] if len(motor_temps) > 1 else 0

            features = [
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

            features_list.append(features)

        return features_list


# 싱글톤 인스턴스
_data_collector: Optional[VFDDataCollector] = None


def get_data_collector() -> VFDDataCollector:
    """VFDDataCollector 싱글톤 인스턴스 반환"""
    global _data_collector
    if _data_collector is None:
        _data_collector = VFDDataCollector()
    return _data_collector
