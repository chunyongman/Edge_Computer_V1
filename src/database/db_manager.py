"""
SQLite 데이터베이스 관리자
- 알람 이력
- 이벤트 로그
- VFD 진단 이력
- 트렌드 데이터
"""

import sqlite3
import json
import logging
from pathlib import Path
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from contextlib import contextmanager

logger = logging.getLogger(__name__)


class DatabaseManager:
    """Edge Computer 데이터베이스 관리자"""

    def __init__(self, db_dir: str = "data"):
        """
        초기화

        Args:
            db_dir: 데이터베이스 디렉토리 경로
        """
        self.db_dir = Path(db_dir)
        self.db_dir.mkdir(parents=True, exist_ok=True)

        self.db_path = self.db_dir / "edge_computer.db"

        # 테이블 초기화
        self._init_database()

        logger.info(f"✅ DatabaseManager 초기화 완료: {self.db_path}")

    @contextmanager
    def get_connection(self):
        """데이터베이스 연결 컨텍스트 매니저"""
        conn = sqlite3.connect(str(self.db_path))
        conn.row_factory = sqlite3.Row  # 딕셔너리 형태로 결과 반환
        try:
            yield conn
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.error(f"❌ DB 오류: {e}")
            raise
        finally:
            conn.close()

    def _init_database(self):
        """데이터베이스 테이블 초기화"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 1. 알람 이력 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS alarm_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    alarm_id TEXT NOT NULL,
                    equipment_id TEXT NOT NULL,
                    alarm_type TEXT NOT NULL,
                    severity TEXT NOT NULL,
                    message TEXT,
                    occurred_at DATETIME NOT NULL,
                    acknowledged_at DATETIME,
                    acknowledged_by TEXT,
                    cleared_at DATETIME,
                    cleared_by TEXT,
                    duration_seconds INTEGER,
                    details TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 2. 이벤트 로그 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS event_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp DATETIME NOT NULL,
                    event_type TEXT NOT NULL,
                    source TEXT NOT NULL,
                    description TEXT,
                    details TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 3. VFD 진단 이력 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS vfd_diagnostic_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    vfd_id TEXT NOT NULL,
                    timestamp DATETIME NOT NULL,
                    health_score INTEGER,
                    severity_score INTEGER,
                    status_grade TEXT,
                    anomaly_patterns TEXT,
                    motor_temp REAL,
                    heatsink_temp REAL,
                    frequency REAL,
                    output_current REAL,
                    output_voltage REAL,
                    dc_bus_voltage REAL,
                    anomaly_score REAL,
                    prediction_data TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 4. 트렌드 데이터 테이블 (분 단위 집계)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS trend_data_minute (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    vfd_id TEXT NOT NULL,
                    timestamp DATETIME NOT NULL,
                    avg_health_score REAL,
                    avg_motor_temp REAL,
                    avg_heatsink_temp REAL,
                    avg_frequency REAL,
                    avg_current REAL,
                    max_motor_temp REAL,
                    min_motor_temp REAL,
                    sample_count INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(vfd_id, timestamp)
                )
            """)

            # 5. 트렌드 데이터 테이블 (시간 단위 집계)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS trend_data_hour (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    vfd_id TEXT NOT NULL,
                    timestamp DATETIME NOT NULL,
                    avg_health_score REAL,
                    avg_motor_temp REAL,
                    avg_heatsink_temp REAL,
                    avg_frequency REAL,
                    avg_current REAL,
                    max_motor_temp REAL,
                    min_motor_temp REAL,
                    sample_count INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(vfd_id, timestamp)
                )
            """)

            # 6. AI 모델 학습 데이터 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS ai_training_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    vfd_id TEXT NOT NULL,
                    timestamp DATETIME NOT NULL,
                    feature_vector TEXT NOT NULL,
                    label TEXT,
                    label_type TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 7. AI 모델 메타데이터 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS ai_model_metadata (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    model_name TEXT NOT NULL UNIQUE,
                    model_type TEXT NOT NULL,
                    version TEXT,
                    trained_at DATETIME,
                    accuracy REAL,
                    parameters TEXT,
                    file_path TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 인덱스 생성
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_alarm_equipment ON alarm_history(equipment_id)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_alarm_occurred ON alarm_history(occurred_at)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_event_timestamp ON event_log(timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_diag_vfd ON vfd_diagnostic_history(vfd_id)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_diag_timestamp ON vfd_diagnostic_history(timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_trend_min_vfd ON trend_data_minute(vfd_id, timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_trend_hour_vfd ON trend_data_hour(vfd_id, timestamp)")

            logger.info("✅ 데이터베이스 테이블 초기화 완료")

    # ==================== 알람 이력 ====================

    def insert_alarm(
        self,
        alarm_id: str,
        equipment_id: str,
        alarm_type: str,
        severity: str,
        message: str,
        occurred_at: datetime = None,
        details: Dict = None
    ) -> int:
        """알람 기록 추가"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO alarm_history
                (alarm_id, equipment_id, alarm_type, severity, message, occurred_at, details)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                alarm_id,
                equipment_id,
                alarm_type,
                severity,
                message,
                occurred_at or datetime.now(),
                json.dumps(details) if details else None
            ))
            return cursor.lastrowid

    def update_alarm_acknowledged(
        self,
        alarm_id: str,
        acknowledged_by: str = "operator"
    ):
        """알람 확인 처리"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE alarm_history
                SET acknowledged_at = ?, acknowledged_by = ?
                WHERE alarm_id = ? AND acknowledged_at IS NULL
            """, (datetime.now(), acknowledged_by, alarm_id))

    def update_alarm_cleared(
        self,
        alarm_id: str,
        cleared_by: str = "system"
    ):
        """알람 해제 처리"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            now = datetime.now()

            # 먼저 발생 시각 조회
            cursor.execute(
                "SELECT occurred_at FROM alarm_history WHERE alarm_id = ?",
                (alarm_id,)
            )
            row = cursor.fetchone()

            if row:
                occurred_at = datetime.fromisoformat(row['occurred_at'])
                duration = int((now - occurred_at).total_seconds())

                cursor.execute("""
                    UPDATE alarm_history
                    SET cleared_at = ?, cleared_by = ?, duration_seconds = ?
                    WHERE alarm_id = ? AND cleared_at IS NULL
                """, (now, cleared_by, duration, alarm_id))

    def get_active_alarms(self) -> List[Dict]:
        """활성 알람 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM alarm_history
                WHERE cleared_at IS NULL
                ORDER BY occurred_at DESC
            """)
            return [dict(row) for row in cursor.fetchall()]

    def get_alarm_history(
        self,
        equipment_id: str = None,
        start_date: datetime = None,
        end_date: datetime = None,
        limit: int = 100
    ) -> List[Dict]:
        """알람 이력 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM alarm_history WHERE 1=1"
            params = []

            if equipment_id:
                query += " AND equipment_id = ?"
                params.append(equipment_id)
            if start_date:
                query += " AND occurred_at >= ?"
                params.append(start_date)
            if end_date:
                query += " AND occurred_at <= ?"
                params.append(end_date)

            query += f" ORDER BY occurred_at DESC LIMIT {limit}"

            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    # ==================== 이벤트 로그 ====================

    def insert_event(
        self,
        event_type: str,
        source: str,
        description: str,
        details: Dict = None
    ) -> int:
        """이벤트 로그 추가"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO event_log (timestamp, event_type, source, description, details)
                VALUES (?, ?, ?, ?, ?)
            """, (
                datetime.now(),
                event_type,
                source,
                description,
                json.dumps(details) if details else None
            ))
            return cursor.lastrowid

    def get_events(
        self,
        event_type: str = None,
        source: str = None,
        start_date: datetime = None,
        end_date: datetime = None,
        limit: int = 100
    ) -> List[Dict]:
        """이벤트 로그 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM event_log WHERE 1=1"
            params = []

            if event_type:
                query += " AND event_type = ?"
                params.append(event_type)
            if source:
                query += " AND source = ?"
                params.append(source)
            if start_date:
                query += " AND timestamp >= ?"
                params.append(start_date)
            if end_date:
                query += " AND timestamp <= ?"
                params.append(end_date)

            query += f" ORDER BY timestamp DESC LIMIT {limit}"

            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    # ==================== VFD 진단 이력 ====================

    def insert_vfd_diagnostic(
        self,
        vfd_id: str,
        health_score: int,
        severity_score: int,
        status_grade: str,
        anomaly_patterns: List[str],
        motor_temp: float,
        heatsink_temp: float,
        frequency: float,
        output_current: float,
        output_voltage: float,
        dc_bus_voltage: float,
        anomaly_score: float = 0.0,
        prediction_data: Dict = None,
        timestamp: datetime = None
    ) -> int:
        """VFD 진단 데이터 추가"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO vfd_diagnostic_history
                (vfd_id, timestamp, health_score, severity_score, status_grade,
                 anomaly_patterns, motor_temp, heatsink_temp, frequency,
                 output_current, output_voltage, dc_bus_voltage, anomaly_score, prediction_data)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                vfd_id,
                timestamp or datetime.now(),
                health_score,
                severity_score,
                status_grade,
                json.dumps(anomaly_patterns),
                motor_temp,
                heatsink_temp,
                frequency,
                output_current,
                output_voltage,
                dc_bus_voltage,
                anomaly_score,
                json.dumps(prediction_data) if prediction_data else None
            ))
            return cursor.lastrowid

    def get_vfd_diagnostic_history(
        self,
        vfd_id: str,
        start_date: datetime = None,
        end_date: datetime = None,
        limit: int = 1000
    ) -> List[Dict]:
        """VFD 진단 이력 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM vfd_diagnostic_history WHERE vfd_id = ?"
            params = [vfd_id]

            if start_date:
                query += " AND timestamp >= ?"
                params.append(start_date)
            if end_date:
                query += " AND timestamp <= ?"
                params.append(end_date)

            query += f" ORDER BY timestamp DESC LIMIT {limit}"

            cursor.execute(query, params)
            rows = cursor.fetchall()

            result = []
            for row in rows:
                d = dict(row)
                if d['anomaly_patterns']:
                    d['anomaly_patterns'] = json.loads(d['anomaly_patterns'])
                if d['prediction_data']:
                    d['prediction_data'] = json.loads(d['prediction_data'])
                result.append(d)

            return result

    def get_latest_vfd_diagnostics(self, vfd_id: str, count: int = 60) -> List[Dict]:
        """최근 VFD 진단 데이터 조회 (AI 학습용)"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM vfd_diagnostic_history
                WHERE vfd_id = ?
                ORDER BY timestamp DESC
                LIMIT ?
            """, (vfd_id, count))

            rows = cursor.fetchall()
            result = []
            for row in rows:
                d = dict(row)
                if d['anomaly_patterns']:
                    d['anomaly_patterns'] = json.loads(d['anomaly_patterns'])
                result.append(d)

            return list(reversed(result))  # 시간순 정렬

    # ==================== 트렌드 데이터 ====================

    def insert_trend_minute(
        self,
        vfd_id: str,
        timestamp: datetime,
        avg_health_score: float,
        avg_motor_temp: float,
        avg_heatsink_temp: float,
        avg_frequency: float,
        avg_current: float,
        max_motor_temp: float,
        min_motor_temp: float,
        sample_count: int
    ):
        """분 단위 트렌드 데이터 추가"""
        # timestamp를 분 단위로 정규화
        normalized_ts = timestamp.replace(second=0, microsecond=0)

        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO trend_data_minute
                (vfd_id, timestamp, avg_health_score, avg_motor_temp, avg_heatsink_temp,
                 avg_frequency, avg_current, max_motor_temp, min_motor_temp, sample_count)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                vfd_id, normalized_ts, avg_health_score, avg_motor_temp,
                avg_heatsink_temp, avg_frequency, avg_current,
                max_motor_temp, min_motor_temp, sample_count
            ))

    def get_trend_data(
        self,
        vfd_id: str,
        interval: str = "minute",
        hours: int = 1
    ) -> List[Dict]:
        """트렌드 데이터 조회"""
        table = "trend_data_minute" if interval == "minute" else "trend_data_hour"
        start_time = datetime.now() - timedelta(hours=hours)

        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"""
                SELECT * FROM {table}
                WHERE vfd_id = ? AND timestamp >= ?
                ORDER BY timestamp ASC
            """, (vfd_id, start_time))

            return [dict(row) for row in cursor.fetchall()]

    # ==================== AI 학습 데이터 ====================

    def insert_training_data(
        self,
        vfd_id: str,
        feature_vector: List[float],
        label: str = None,
        label_type: str = None
    ) -> int:
        """AI 학습 데이터 추가"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO ai_training_data
                (vfd_id, timestamp, feature_vector, label, label_type)
                VALUES (?, ?, ?, ?, ?)
            """, (
                vfd_id,
                datetime.now(),
                json.dumps(feature_vector),
                label,
                label_type
            ))
            return cursor.lastrowid

    def get_training_data(
        self,
        vfd_id: str = None,
        label_type: str = None,
        limit: int = 10000
    ) -> List[Dict]:
        """AI 학습 데이터 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM ai_training_data WHERE 1=1"
            params = []

            if vfd_id:
                query += " AND vfd_id = ?"
                params.append(vfd_id)
            if label_type:
                query += " AND label_type = ?"
                params.append(label_type)

            query += f" ORDER BY timestamp DESC LIMIT {limit}"

            cursor.execute(query, params)
            rows = cursor.fetchall()

            result = []
            for row in rows:
                d = dict(row)
                d['feature_vector'] = json.loads(d['feature_vector'])
                result.append(d)

            return result

    # ==================== AI 모델 메타데이터 ====================

    def save_model_metadata(
        self,
        model_name: str,
        model_type: str,
        version: str,
        accuracy: float,
        parameters: Dict,
        file_path: str
    ):
        """AI 모델 메타데이터 저장"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT OR REPLACE INTO ai_model_metadata
                (model_name, model_type, version, trained_at, accuracy, parameters, file_path, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                model_name,
                model_type,
                version,
                datetime.now(),
                accuracy,
                json.dumps(parameters),
                file_path,
                datetime.now()
            ))

    def get_model_metadata(self, model_name: str) -> Optional[Dict]:
        """AI 모델 메타데이터 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM ai_model_metadata WHERE model_name = ?",
                (model_name,)
            )
            row = cursor.fetchone()

            if row:
                d = dict(row)
                if d['parameters']:
                    d['parameters'] = json.loads(d['parameters'])
                return d
            return None

    # ==================== 유틸리티 ====================

    def cleanup_old_data(self, days: int = 90):
        """오래된 데이터 정리"""
        cutoff_date = datetime.now() - timedelta(days=days)

        with self.get_connection() as conn:
            cursor = conn.cursor()

            # VFD 진단 이력 정리
            cursor.execute(
                "DELETE FROM vfd_diagnostic_history WHERE timestamp < ?",
                (cutoff_date,)
            )
            deleted_diag = cursor.rowcount

            # 트렌드 데이터 정리 (분 단위는 7일만 보관)
            minute_cutoff = datetime.now() - timedelta(days=7)
            cursor.execute(
                "DELETE FROM trend_data_minute WHERE timestamp < ?",
                (minute_cutoff,)
            )
            deleted_trend_min = cursor.rowcount

            # 이벤트 로그 정리
            cursor.execute(
                "DELETE FROM event_log WHERE timestamp < ?",
                (cutoff_date,)
            )
            deleted_events = cursor.rowcount

            logger.info(f"🗑️ 데이터 정리 완료: 진단={deleted_diag}, 트렌드(분)={deleted_trend_min}, 이벤트={deleted_events}")

    def get_statistics(self) -> Dict:
        """데이터베이스 통계"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            stats = {}

            cursor.execute("SELECT COUNT(*) FROM alarm_history")
            stats['total_alarms'] = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM alarm_history WHERE cleared_at IS NULL")
            stats['active_alarms'] = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM event_log")
            stats['total_events'] = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM vfd_diagnostic_history")
            stats['total_diagnostics'] = cursor.fetchone()[0]

            cursor.execute("SELECT COUNT(*) FROM ai_training_data")
            stats['training_samples'] = cursor.fetchone()[0]

            return stats


# 싱글톤 인스턴스
_db_manager: Optional[DatabaseManager] = None


def get_db_manager(db_dir: str = "data") -> DatabaseManager:
    """DatabaseManager 싱글톤 인스턴스 반환"""
    global _db_manager
    if _db_manager is None:
        _db_manager = DatabaseManager(db_dir)
    return _db_manager
