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

            # 8. 운전 이력 테이블 (장비별/일별 운전 기록)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS operation_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    equipment_name TEXT NOT NULL,
                    date TEXT NOT NULL,
                    runtime_hours REAL DEFAULT 0,
                    start_count INTEGER DEFAULT 0,
                    energy_kwh REAL DEFAULT 0,
                    saved_kwh REAL DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(equipment_name, date)
                )
            """)

            # 9. ESS 누적 운전 데이터 테이블 (장비별 누적 통계)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS ess_cumulative_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    equipment_name TEXT NOT NULL UNIQUE,
                    ess_run_hours REAL DEFAULT 0,
                    total_run_hours REAL DEFAULT 0,
                    ess_energy_kwh REAL DEFAULT 0,
                    baseline_energy_kwh REAL DEFAULT 0,
                    saved_energy_kwh REAL DEFAULT 0,
                    last_running_state INTEGER DEFAULT 0,
                    last_ess_state INTEGER DEFAULT 0,
                    session_start_time DATETIME,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 10. ESS 일별 운전 데이터 테이블 (일별 통계)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS ess_daily_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    equipment_name TEXT NOT NULL,
                    date TEXT NOT NULL,
                    ess_run_hours REAL DEFAULT 0,
                    total_run_hours REAL DEFAULT 0,
                    ess_energy_kwh REAL DEFAULT 0,
                    baseline_energy_kwh REAL DEFAULT 0,
                    saved_energy_kwh REAL DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(equipment_name, date)
                )
            """)

            # 11. VFD 이상 징후 히스토리 테이블 (센서 알람과 별도 관리)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS vfd_anomaly_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    anomaly_id TEXT UNIQUE NOT NULL,
                    equipment_id TEXT NOT NULL,
                    occurred_at DATETIME NOT NULL,
                    severity_level INTEGER NOT NULL,
                    severity_name TEXT NOT NULL,
                    health_score INTEGER NOT NULL,
                    total_severity_score INTEGER,
                    motor_thermal REAL,
                    heatsink_temp REAL,
                    inverter_thermal REAL,
                    motor_current REAL,
                    current_imbalance REAL,
                    warning_word INTEGER,
                    over_temps INTEGER,
                    recommendations TEXT,
                    status TEXT DEFAULT 'ACTIVE',
                    acknowledged_at DATETIME,
                    acknowledged_by TEXT,
                    cleared_at DATETIME,
                    cleared_by TEXT,
                    duration_minutes INTEGER,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # 10. 사용자 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    role TEXT NOT NULL DEFAULT 'viewer',
                    display_name TEXT,
                    is_active INTEGER DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    last_login DATETIME
                )
            """)

            # 11. 세션 테이블
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS user_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_token TEXT UNIQUE NOT NULL,
                    user_id INTEGER NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    expires_at DATETIME NOT NULL,
                    is_valid INTEGER DEFAULT 1,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            """)

            # 인덱스 생성
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_alarm_equipment ON alarm_history(equipment_id)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_alarm_occurred ON alarm_history(occurred_at)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_anomaly_equipment ON vfd_anomaly_history(equipment_id)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_anomaly_occurred ON vfd_anomaly_history(occurred_at)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_anomaly_status ON vfd_anomaly_history(status)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_event_timestamp ON event_log(timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_diag_vfd ON vfd_diagnostic_history(vfd_id)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_vfd_diag_timestamp ON vfd_diagnostic_history(timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_trend_min_vfd ON trend_data_minute(vfd_id, timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_trend_hour_vfd ON trend_data_hour(vfd_id, timestamp)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_operation_equipment ON operation_history(equipment_name)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_operation_date ON operation_history(date)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_ess_cumulative_equipment ON ess_cumulative_data(equipment_name)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_ess_daily_equipment ON ess_daily_data(equipment_name)")
            cursor.execute("CREATE INDEX IF NOT EXISTS idx_ess_daily_date ON ess_daily_data(date)")

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

    # ==================== 운전 이력 ====================

    def upsert_operation_record(
        self,
        equipment_name: str,
        date: str,
        runtime_hours: float = 0,
        start_count: int = 0,
        energy_kwh: float = 0,
        saved_kwh: float = 0
    ) -> int:
        """운전 이력 추가/업데이트 (UPSERT)"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 기존 레코드 확인
            cursor.execute("""
                SELECT id, runtime_hours, start_count, energy_kwh, saved_kwh
                FROM operation_history
                WHERE equipment_name = ? AND date = ?
            """, (equipment_name, date))
            existing = cursor.fetchone()

            if existing:
                # 기존 값에 누적
                cursor.execute("""
                    UPDATE operation_history
                    SET runtime_hours = runtime_hours + ?,
                        start_count = start_count + ?,
                        energy_kwh = energy_kwh + ?,
                        saved_kwh = saved_kwh + ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE equipment_name = ? AND date = ?
                """, (runtime_hours, start_count, energy_kwh, saved_kwh, equipment_name, date))
                return existing['id']
            else:
                # 새 레코드 생성
                cursor.execute("""
                    INSERT INTO operation_history
                    (equipment_name, date, runtime_hours, start_count, energy_kwh, saved_kwh)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (equipment_name, date, runtime_hours, start_count, energy_kwh, saved_kwh))
                return cursor.lastrowid

    def get_operation_records(
        self,
        equipment_name: str = None,
        start_date: str = None,
        end_date: str = None,
        limit: int = 100
    ) -> List[Dict]:
        """운전 이력 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM operation_history WHERE 1=1"
            params = []

            if equipment_name:
                query += " AND equipment_name = ?"
                params.append(equipment_name)
            if start_date:
                query += " AND date >= ?"
                params.append(start_date)
            if end_date:
                query += " AND date <= ?"
                params.append(end_date)

            query += f" ORDER BY date DESC, equipment_name LIMIT {limit}"

            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    # ==================== VFD 이상 징후 히스토리 ====================

    def insert_vfd_anomaly(
        self,
        anomaly_id: str,
        equipment_id: str,
        severity_level: int,
        severity_name: str,
        health_score: int,
        total_severity_score: int = None,
        motor_thermal: float = None,
        heatsink_temp: float = None,
        inverter_thermal: float = None,
        motor_current: float = None,
        current_imbalance: float = None,
        warning_word: int = None,
        over_temps: int = None,
        recommendations: str = None
    ) -> int:
        """VFD 이상 징후 저장"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO vfd_anomaly_history
                (anomaly_id, equipment_id, occurred_at, severity_level, severity_name,
                 health_score, total_severity_score, motor_thermal, heatsink_temp,
                 inverter_thermal, motor_current, current_imbalance, warning_word,
                 over_temps, recommendations, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE')
            """, (
                anomaly_id, equipment_id, datetime.now(), severity_level, severity_name,
                health_score, total_severity_score, motor_thermal, heatsink_temp,
                inverter_thermal, motor_current, current_imbalance, warning_word,
                over_temps, recommendations
            ))
            logger.info(f"VFD 이상 징후 저장: {anomaly_id} ({equipment_id})")
            return cursor.lastrowid

    def acknowledge_vfd_anomaly(self, anomaly_id: str, user: str = "Operator"):
        """VFD 이상 징후 확인 처리"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE vfd_anomaly_history
                SET status = 'ACKNOWLEDGED', acknowledged_at = ?, acknowledged_by = ?
                WHERE anomaly_id = ? AND status = 'ACTIVE'
            """, (datetime.now(), user, anomaly_id))
            logger.info(f"VFD 이상 징후 확인: {anomaly_id}")

    def clear_vfd_anomaly(self, anomaly_id: str, user: str = "Operator"):
        """VFD 이상 징후 해제 처리 (수동)"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            now = datetime.now()

            # 발생 시간 조회 후 지속 시간 계산
            cursor.execute(
                "SELECT occurred_at FROM vfd_anomaly_history WHERE anomaly_id = ?",
                (anomaly_id,)
            )
            row = cursor.fetchone()
            duration = None
            if row:
                occurred_at = datetime.fromisoformat(row['occurred_at'])
                duration = int((now - occurred_at).total_seconds() / 60)

            cursor.execute("""
                UPDATE vfd_anomaly_history
                SET status = 'CLEARED', cleared_at = ?, cleared_by = ?, duration_minutes = ?
                WHERE anomaly_id = ? AND status IN ('ACTIVE', 'ACKNOWLEDGED')
            """, (now, user, duration, anomaly_id))
            logger.info(f"VFD 이상 징후 해제: {anomaly_id}")

    def auto_clear_vfd_anomaly(self, anomaly_id: str):
        """VFD 이상 징후 자동 해제 (정상 복귀 시)"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            now = datetime.now()

            cursor.execute(
                "SELECT occurred_at FROM vfd_anomaly_history WHERE anomaly_id = ?",
                (anomaly_id,)
            )
            row = cursor.fetchone()
            duration = None
            if row:
                occurred_at = datetime.fromisoformat(row['occurred_at'])
                duration = int((now - occurred_at).total_seconds() / 60)

            cursor.execute("""
                UPDATE vfd_anomaly_history
                SET status = 'AUTO_CLEARED', cleared_at = ?, cleared_by = 'System', duration_minutes = ?
                WHERE anomaly_id = ? AND status IN ('ACTIVE', 'ACKNOWLEDGED')
            """, (now, duration, anomaly_id))
            logger.info(f"VFD 이상 징후 자동 해제: {anomaly_id}")

    def get_vfd_anomaly_history(
        self,
        equipment_id: str = None,
        status: str = None,
        start_date: datetime = None,
        end_date: datetime = None,
        limit: int = 100
    ) -> List[Dict]:
        """VFD 이상 징후 히스토리 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM vfd_anomaly_history WHERE 1=1"
            params = []

            if equipment_id:
                query += " AND equipment_id = ?"
                params.append(equipment_id)
            if status:
                query += " AND status = ?"
                params.append(status)
            if start_date:
                query += " AND occurred_at >= ?"
                params.append(start_date)
            if end_date:
                query += " AND occurred_at <= ?"
                params.append(end_date)

            query += f" ORDER BY occurred_at DESC LIMIT {limit}"

            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    def get_active_vfd_anomalies(self) -> List[Dict]:
        """활성 VFD 이상 징후 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM vfd_anomaly_history
                WHERE status IN ('ACTIVE', 'ACKNOWLEDGED')
                ORDER BY occurred_at DESC
            """)
            return [dict(row) for row in cursor.fetchall()]

    def get_vfd_anomaly_statistics(self, days: int = 30) -> Dict:
        """VFD 이상 징후 통계"""
        start_date = datetime.now() - timedelta(days=days)

        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 전체 이상 징후 수
            cursor.execute("""
                SELECT COUNT(*) FROM vfd_anomaly_history WHERE occurred_at >= ?
            """, (start_date,))
            total = cursor.fetchone()[0]

            # 활성 이상 징후 수
            cursor.execute("""
                SELECT COUNT(*) FROM vfd_anomaly_history
                WHERE status IN ('ACTIVE', 'ACKNOWLEDGED')
            """)
            active = cursor.fetchone()[0]

            # 중증도별 통계
            cursor.execute("""
                SELECT severity_level, COUNT(*) as count
                FROM vfd_anomaly_history
                WHERE occurred_at >= ?
                GROUP BY severity_level
            """, (start_date,))
            by_severity = {row['severity_level']: row['count'] for row in cursor.fetchall()}

            # 장비별 통계
            cursor.execute("""
                SELECT equipment_id, COUNT(*) as count
                FROM vfd_anomaly_history
                WHERE occurred_at >= ?
                GROUP BY equipment_id
                ORDER BY count DESC
            """, (start_date,))
            by_equipment = {row['equipment_id']: row['count'] for row in cursor.fetchall()}

            # 평균 지속 시간
            cursor.execute("""
                SELECT AVG(duration_minutes) as avg_duration
                FROM vfd_anomaly_history
                WHERE duration_minutes IS NOT NULL AND occurred_at >= ?
            """, (start_date,))
            row = cursor.fetchone()
            avg_duration = row['avg_duration'] if row and row['avg_duration'] else 0

            return {
                "period_days": days,
                "total_anomalies": total,
                "active_anomalies": active,
                "by_severity": by_severity,
                "by_equipment": by_equipment,
                "avg_duration_minutes": round(avg_duration, 1)
            }

    # ==================== ESS 누적 데이터 ====================

    def get_or_create_ess_cumulative(self, equipment_name: str) -> Dict:
        """ESS 누적 데이터 조회 또는 생성"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM ess_cumulative_data WHERE equipment_name = ?",
                (equipment_name,)
            )
            row = cursor.fetchone()

            if row:
                return dict(row)

            # 새 레코드 생성
            cursor.execute("""
                INSERT INTO ess_cumulative_data (equipment_name)
                VALUES (?)
            """, (equipment_name,))

            return {
                'equipment_name': equipment_name,
                'ess_run_hours': 0.0,
                'total_run_hours': 0.0,
                'ess_energy_kwh': 0.0,
                'baseline_energy_kwh': 0.0,
                'saved_energy_kwh': 0.0,
                'last_running_state': 0,
                'last_ess_state': 0,
                'session_start_time': None
            }

    def update_ess_cumulative(
        self,
        equipment_name: str,
        delta_ess_hours: float = 0.0,
        delta_total_hours: float = 0.0,
        delta_ess_energy: float = 0.0,
        delta_baseline_energy: float = 0.0,
        delta_saved_energy: float = 0.0,
        last_running_state: int = None,
        last_ess_state: int = None,
        session_start_time: datetime = None
    ):
        """ESS 누적 데이터 업데이트"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 먼저 레코드가 있는지 확인
            cursor.execute(
                "SELECT id FROM ess_cumulative_data WHERE equipment_name = ?",
                (equipment_name,)
            )
            if not cursor.fetchone():
                cursor.execute("""
                    INSERT INTO ess_cumulative_data (equipment_name)
                    VALUES (?)
                """, (equipment_name,))

            # 업데이트
            update_parts = [
                "ess_run_hours = ess_run_hours + ?",
                "total_run_hours = total_run_hours + ?",
                "ess_energy_kwh = ess_energy_kwh + ?",
                "baseline_energy_kwh = baseline_energy_kwh + ?",
                "saved_energy_kwh = saved_energy_kwh + ?",
                "updated_at = CURRENT_TIMESTAMP"
            ]
            params = [delta_ess_hours, delta_total_hours, delta_ess_energy,
                     delta_baseline_energy, delta_saved_energy]

            if last_running_state is not None:
                update_parts.append("last_running_state = ?")
                params.append(last_running_state)

            if last_ess_state is not None:
                update_parts.append("last_ess_state = ?")
                params.append(last_ess_state)

            if session_start_time is not None:
                update_parts.append("session_start_time = ?")
                params.append(session_start_time)

            params.append(equipment_name)

            cursor.execute(f"""
                UPDATE ess_cumulative_data
                SET {', '.join(update_parts)}
                WHERE equipment_name = ?
            """, params)

    def get_all_ess_cumulative(self) -> List[Dict]:
        """모든 장비의 ESS 누적 데이터 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM ess_cumulative_data ORDER BY equipment_name")
            return [dict(row) for row in cursor.fetchall()]

    def upsert_ess_daily(
        self,
        equipment_name: str,
        date: str,
        delta_ess_hours: float = 0.0,
        delta_total_hours: float = 0.0,
        delta_ess_energy: float = 0.0,
        delta_baseline_energy: float = 0.0,
        delta_saved_energy: float = 0.0
    ):
        """ESS 일별 데이터 업데이트 (UPSERT)"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            cursor.execute("""
                SELECT id FROM ess_daily_data
                WHERE equipment_name = ? AND date = ?
            """, (equipment_name, date))
            existing = cursor.fetchone()

            if existing:
                cursor.execute("""
                    UPDATE ess_daily_data
                    SET ess_run_hours = ess_run_hours + ?,
                        total_run_hours = total_run_hours + ?,
                        ess_energy_kwh = ess_energy_kwh + ?,
                        baseline_energy_kwh = baseline_energy_kwh + ?,
                        saved_energy_kwh = saved_energy_kwh + ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE equipment_name = ? AND date = ?
                """, (delta_ess_hours, delta_total_hours, delta_ess_energy,
                      delta_baseline_energy, delta_saved_energy,
                      equipment_name, date))
            else:
                cursor.execute("""
                    INSERT INTO ess_daily_data
                    (equipment_name, date, ess_run_hours, total_run_hours,
                     ess_energy_kwh, baseline_energy_kwh, saved_energy_kwh)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (equipment_name, date, delta_ess_hours, delta_total_hours,
                      delta_ess_energy, delta_baseline_energy, delta_saved_energy))

    def get_ess_daily_data(
        self,
        equipment_name: str = None,
        date: str = None,
        start_date: str = None,
        end_date: str = None,
        limit: int = 100
    ) -> List[Dict]:
        """ESS 일별 데이터 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            query = "SELECT * FROM ess_daily_data WHERE 1=1"
            params = []

            if equipment_name:
                query += " AND equipment_name = ?"
                params.append(equipment_name)
            if date:
                query += " AND date = ?"
                params.append(date)
            if start_date:
                query += " AND date >= ?"
                params.append(start_date)
            if end_date:
                query += " AND date <= ?"
                params.append(end_date)

            query += f" ORDER BY date DESC, equipment_name LIMIT {limit}"

            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    def get_ess_summary_by_group(self, date: str = None) -> Dict:
        """그룹별 ESS 요약 데이터 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()

            if date:
                # 특정 일자 데이터
                cursor.execute("""
                    SELECT equipment_name, ess_run_hours, total_run_hours,
                           ess_energy_kwh, baseline_energy_kwh, saved_energy_kwh
                    FROM ess_daily_data WHERE date = ?
                """, (date,))
            else:
                # 누적 데이터
                cursor.execute("""
                    SELECT equipment_name, ess_run_hours, total_run_hours,
                           ess_energy_kwh, baseline_energy_kwh, saved_energy_kwh
                    FROM ess_cumulative_data
                """)

            rows = cursor.fetchall()

            # 그룹별 집계
            groups = {
                'SWP': {'ess_hours': 0, 'total_hours': 0, 'ess_kwh': 0, 'baseline_kwh': 0, 'saved_kwh': 0},
                'FWP': {'ess_hours': 0, 'total_hours': 0, 'ess_kwh': 0, 'baseline_kwh': 0, 'saved_kwh': 0},
                'FAN': {'ess_hours': 0, 'total_hours': 0, 'ess_kwh': 0, 'baseline_kwh': 0, 'saved_kwh': 0},
                'TOTAL': {'ess_hours': 0, 'total_hours': 0, 'ess_kwh': 0, 'baseline_kwh': 0, 'saved_kwh': 0}
            }

            for row in rows:
                name = row['equipment_name']
                if name.startswith('SWP'):
                    group = 'SWP'
                elif name.startswith('FWP'):
                    group = 'FWP'
                elif name.startswith('FAN'):
                    group = 'FAN'
                else:
                    continue

                groups[group]['ess_hours'] += row['ess_run_hours'] or 0
                groups[group]['total_hours'] += row['total_run_hours'] or 0
                groups[group]['ess_kwh'] += row['ess_energy_kwh'] or 0
                groups[group]['baseline_kwh'] += row['baseline_energy_kwh'] or 0
                groups[group]['saved_kwh'] += row['saved_energy_kwh'] or 0

            # 전체 합계
            for group in ['SWP', 'FWP', 'FAN']:
                for key in groups[group]:
                    groups['TOTAL'][key] += groups[group][key]

            # 절감률 계산
            for group in groups:
                baseline = groups[group]['baseline_kwh']
                if baseline > 0:
                    groups[group]['savings_rate'] = (groups[group]['saved_kwh'] / baseline) * 100
                else:
                    groups[group]['savings_rate'] = 0.0

            return groups

    # ==================== ESS 보고서 쿼리 ====================

    def get_ess_daily_report(self, date: str) -> Dict:
        """
        일별 ESS 보고서 데이터 조회

        Args:
            date: 조회할 날짜 (YYYY-MM-DD 형식)

        Returns:
            {
                'date': '2025-12-02',
                'equipment': [장비별 데이터...],
                'groups': {'SWP': {...}, 'FWP': {...}, 'FAN': {...}, 'TOTAL': {...}}
            }
        """
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 해당 날짜의 장비별 데이터 조회
            cursor.execute("""
                SELECT equipment_name, ess_run_hours, total_run_hours,
                       ess_energy_kwh, baseline_energy_kwh, saved_energy_kwh
                FROM ess_daily_data
                WHERE date = ?
                ORDER BY equipment_name
            """, (date,))

            rows = cursor.fetchall()

            # 장비별 데이터
            equipment = []
            for row in rows:
                baseline = row['baseline_energy_kwh'] or 0
                saved = row['saved_energy_kwh'] or 0
                savings_rate = (saved / baseline * 100) if baseline > 0 else 0

                equipment.append({
                    'equipment_name': row['equipment_name'],
                    'ess_run_hours': round(row['ess_run_hours'] or 0, 2),
                    'total_run_hours': round(row['total_run_hours'] or 0, 2),
                    'ess_energy_kwh': round(row['ess_energy_kwh'] or 0, 1),
                    'baseline_energy_kwh': round(baseline, 1),
                    'saved_energy_kwh': round(saved, 1),
                    'savings_rate': round(savings_rate, 1)
                })

            # 그룹별 집계
            groups = self.get_ess_summary_by_group(date)

            return {
                'date': date,
                'equipment': equipment,
                'groups': groups
            }

    def get_ess_period_report(self, start_date: str, end_date: str) -> Dict:
        """
        기간별 ESS 보고서 데이터 조회

        Args:
            start_date: 시작 날짜 (YYYY-MM-DD)
            end_date: 종료 날짜 (YYYY-MM-DD)

        Returns:
            {
                'start_date': '2025-12-01',
                'end_date': '2025-12-02',
                'daily_data': [일별 그룹별 데이터...],
                'summary': {'SWP': {...}, ...}
            }
        """
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 일별 그룹별 집계
            cursor.execute("""
                SELECT date,
                       SUM(CASE WHEN equipment_name LIKE 'SWP%' THEN saved_energy_kwh ELSE 0 END) as swp_saved,
                       SUM(CASE WHEN equipment_name LIKE 'FWP%' THEN saved_energy_kwh ELSE 0 END) as fwp_saved,
                       SUM(CASE WHEN equipment_name LIKE 'FAN%' THEN saved_energy_kwh ELSE 0 END) as fan_saved,
                       SUM(saved_energy_kwh) as total_saved,
                       SUM(baseline_energy_kwh) as total_baseline
                FROM ess_daily_data
                WHERE date >= ? AND date <= ?
                GROUP BY date
                ORDER BY date
            """, (start_date, end_date))

            daily_data = []
            for row in cursor.fetchall():
                baseline = row['total_baseline'] or 0
                saved = row['total_saved'] or 0
                savings_rate = (saved / baseline * 100) if baseline > 0 else 0

                daily_data.append({
                    'date': row['date'],
                    'swp_saved_kwh': round(row['swp_saved'] or 0, 1),
                    'fwp_saved_kwh': round(row['fwp_saved'] or 0, 1),
                    'fan_saved_kwh': round(row['fan_saved'] or 0, 1),
                    'total_saved_kwh': round(saved, 1),
                    'savings_rate': round(savings_rate, 1)
                })

            # 기간 합계
            cursor.execute("""
                SELECT
                       SUM(CASE WHEN equipment_name LIKE 'SWP%' THEN saved_energy_kwh ELSE 0 END) as swp_saved,
                       SUM(CASE WHEN equipment_name LIKE 'SWP%' THEN baseline_energy_kwh ELSE 0 END) as swp_baseline,
                       SUM(CASE WHEN equipment_name LIKE 'SWP%' THEN ess_run_hours ELSE 0 END) as swp_ess_hours,
                       SUM(CASE WHEN equipment_name LIKE 'FWP%' THEN saved_energy_kwh ELSE 0 END) as fwp_saved,
                       SUM(CASE WHEN equipment_name LIKE 'FWP%' THEN baseline_energy_kwh ELSE 0 END) as fwp_baseline,
                       SUM(CASE WHEN equipment_name LIKE 'FWP%' THEN ess_run_hours ELSE 0 END) as fwp_ess_hours,
                       SUM(CASE WHEN equipment_name LIKE 'FAN%' THEN saved_energy_kwh ELSE 0 END) as fan_saved,
                       SUM(CASE WHEN equipment_name LIKE 'FAN%' THEN baseline_energy_kwh ELSE 0 END) as fan_baseline,
                       SUM(CASE WHEN equipment_name LIKE 'FAN%' THEN ess_run_hours ELSE 0 END) as fan_ess_hours,
                       SUM(saved_energy_kwh) as total_saved,
                       SUM(baseline_energy_kwh) as total_baseline,
                       SUM(ess_run_hours) as total_ess_hours
                FROM ess_daily_data
                WHERE date >= ? AND date <= ?
            """, (start_date, end_date))

            row = cursor.fetchone()

            def calc_rate(saved, baseline):
                return round((saved / baseline * 100) if baseline > 0 else 0, 1)

            summary = {
                'SWP': {
                    'saved_kwh': round(row['swp_saved'] or 0, 1),
                    'baseline_kwh': round(row['swp_baseline'] or 0, 1),
                    'ess_hours': round(row['swp_ess_hours'] or 0, 1),
                    'savings_rate': calc_rate(row['swp_saved'] or 0, row['swp_baseline'] or 0)
                },
                'FWP': {
                    'saved_kwh': round(row['fwp_saved'] or 0, 1),
                    'baseline_kwh': round(row['fwp_baseline'] or 0, 1),
                    'ess_hours': round(row['fwp_ess_hours'] or 0, 1),
                    'savings_rate': calc_rate(row['fwp_saved'] or 0, row['fwp_baseline'] or 0)
                },
                'FAN': {
                    'saved_kwh': round(row['fan_saved'] or 0, 1),
                    'baseline_kwh': round(row['fan_baseline'] or 0, 1),
                    'ess_hours': round(row['fan_ess_hours'] or 0, 1),
                    'savings_rate': calc_rate(row['fan_saved'] or 0, row['fan_baseline'] or 0)
                },
                'TOTAL': {
                    'saved_kwh': round(row['total_saved'] or 0, 1),
                    'baseline_kwh': round(row['total_baseline'] or 0, 1),
                    'ess_hours': round(row['total_ess_hours'] or 0, 1),
                    'savings_rate': calc_rate(row['total_saved'] or 0, row['total_baseline'] or 0)
                }
            }

            return {
                'start_date': start_date,
                'end_date': end_date,
                'daily_data': daily_data,
                'summary': summary
            }

    def get_ess_equipment_report(self, equipment_name: str, start_date: str, end_date: str) -> Dict:
        """
        장비별 ESS 보고서 데이터 조회

        Args:
            equipment_name: 장비명 (예: SWP1)
            start_date: 시작 날짜
            end_date: 종료 날짜

        Returns:
            {
                'equipment_name': 'SWP1',
                'daily_data': [일별 데이터...],
                'summary': {...}
            }
        """
        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 일별 데이터
            cursor.execute("""
                SELECT date, ess_run_hours, total_run_hours,
                       ess_energy_kwh, baseline_energy_kwh, saved_energy_kwh
                FROM ess_daily_data
                WHERE equipment_name = ? AND date >= ? AND date <= ?
                ORDER BY date
            """, (equipment_name, start_date, end_date))

            daily_data = []
            for row in cursor.fetchall():
                baseline = row['baseline_energy_kwh'] or 0
                saved = row['saved_energy_kwh'] or 0
                savings_rate = (saved / baseline * 100) if baseline > 0 else 0

                daily_data.append({
                    'date': row['date'],
                    'ess_run_hours': round(row['ess_run_hours'] or 0, 2),
                    'total_run_hours': round(row['total_run_hours'] or 0, 2),
                    'ess_energy_kwh': round(row['ess_energy_kwh'] or 0, 1),
                    'baseline_energy_kwh': round(baseline, 1),
                    'saved_energy_kwh': round(saved, 1),
                    'savings_rate': round(savings_rate, 1)
                })

            # 합계
            cursor.execute("""
                SELECT SUM(ess_run_hours) as total_ess_hours,
                       SUM(total_run_hours) as total_hours,
                       SUM(ess_energy_kwh) as total_ess_energy,
                       SUM(baseline_energy_kwh) as total_baseline,
                       SUM(saved_energy_kwh) as total_saved
                FROM ess_daily_data
                WHERE equipment_name = ? AND date >= ? AND date <= ?
            """, (equipment_name, start_date, end_date))

            row = cursor.fetchone()
            baseline = row['total_baseline'] or 0
            saved = row['total_saved'] or 0
            savings_rate = (saved / baseline * 100) if baseline > 0 else 0

            summary = {
                'ess_run_hours': round(row['total_ess_hours'] or 0, 2),
                'total_run_hours': round(row['total_hours'] or 0, 2),
                'ess_energy_kwh': round(row['total_ess_energy'] or 0, 1),
                'baseline_energy_kwh': round(baseline, 1),
                'saved_energy_kwh': round(saved, 1),
                'savings_rate': round(savings_rate, 1)
            }

            return {
                'equipment_name': equipment_name,
                'start_date': start_date,
                'end_date': end_date,
                'daily_data': daily_data,
                'summary': summary
            }

    def get_ess_monthly_report(self, year: int, month: int) -> Dict:
        """
        월간 ESS 보고서 데이터 조회

        Args:
            year: 연도 (예: 2025)
            month: 월 (예: 12)

        Returns:
            {
                'year': 2025,
                'month': 12,
                'equipment_summary': [장비별 월간 합계...],
                'group_summary': {'SWP': {...}, ...},
                'daily_data': [일별 전체 합계...]
            }
        """
        # 월의 첫날과 마지막날 계산
        start_date = f"{year:04d}-{month:02d}-01"
        if month == 12:
            end_date = f"{year + 1:04d}-01-01"
        else:
            end_date = f"{year:04d}-{month + 1:02d}-01"

        with self.get_connection() as conn:
            cursor = conn.cursor()

            # 장비별 월간 합계
            cursor.execute("""
                SELECT equipment_name,
                       SUM(ess_run_hours) as ess_run_hours,
                       SUM(total_run_hours) as total_run_hours,
                       SUM(ess_energy_kwh) as ess_energy_kwh,
                       SUM(baseline_energy_kwh) as baseline_energy_kwh,
                       SUM(saved_energy_kwh) as saved_energy_kwh
                FROM ess_daily_data
                WHERE date >= ? AND date < ?
                GROUP BY equipment_name
                ORDER BY equipment_name
            """, (start_date, end_date))

            equipment_summary = []
            for row in cursor.fetchall():
                baseline = row['baseline_energy_kwh'] or 0
                saved = row['saved_energy_kwh'] or 0
                savings_rate = (saved / baseline * 100) if baseline > 0 else 0

                equipment_summary.append({
                    'equipment_name': row['equipment_name'],
                    'ess_run_hours': round(row['ess_run_hours'] or 0, 1),
                    'total_run_hours': round(row['total_run_hours'] or 0, 1),
                    'ess_energy_kwh': round(row['ess_energy_kwh'] or 0, 1),
                    'baseline_energy_kwh': round(baseline, 1),
                    'saved_energy_kwh': round(saved, 1),
                    'savings_rate': round(savings_rate, 1)
                })

            # 일별 전체 합계
            cursor.execute("""
                SELECT date,
                       SUM(saved_energy_kwh) as total_saved,
                       SUM(baseline_energy_kwh) as total_baseline
                FROM ess_daily_data
                WHERE date >= ? AND date < ?
                GROUP BY date
                ORDER BY date
            """, (start_date, end_date))

            daily_data = []
            for row in cursor.fetchall():
                baseline = row['total_baseline'] or 0
                saved = row['total_saved'] or 0
                savings_rate = (saved / baseline * 100) if baseline > 0 else 0

                daily_data.append({
                    'date': row['date'],
                    'total_saved_kwh': round(saved, 1),
                    'savings_rate': round(savings_rate, 1)
                })

            # 기간별 보고서 재사용 (그룹 요약)
            # end_date를 실제 마지막 날짜로 변경
            from calendar import monthrange
            last_day = monthrange(year, month)[1]
            actual_end_date = f"{year:04d}-{month:02d}-{last_day:02d}"

            period_report = self.get_ess_period_report(start_date, actual_end_date)

            return {
                'year': year,
                'month': month,
                'equipment_summary': equipment_summary,
                'group_summary': period_report['summary'],
                'daily_data': daily_data
            }

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

    # ==================== 사용자 인증 ====================

    def create_user(
        self,
        username: str,
        password_hash: str,
        role: str = "viewer",
        display_name: str = None
    ) -> Optional[int]:
        """사용자 생성"""
        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO users (username, password_hash, role, display_name)
                    VALUES (?, ?, ?, ?)
                """, (username, password_hash, role, display_name or username))
                user_id = cursor.lastrowid
                logger.info(f"✅ 사용자 생성: {username} (역할: {role})")
                return user_id
        except sqlite3.IntegrityError:
            logger.warning(f"⚠️ 사용자 이미 존재: {username}")
            return None

    def get_user_by_username(self, username: str) -> Optional[Dict]:
        """사용자명으로 사용자 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, username, password_hash, role, display_name, is_active, created_at, last_login
                FROM users WHERE username = ?
            """, (username,))
            row = cursor.fetchone()
            if row:
                return dict(row)
            return None

    def get_user_by_id(self, user_id: int) -> Optional[Dict]:
        """ID로 사용자 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, username, role, display_name, is_active, created_at, last_login
                FROM users WHERE id = ?
            """, (user_id,))
            row = cursor.fetchone()
            if row:
                return dict(row)
            return None

    def update_user_last_login(self, user_id: int):
        """마지막 로그인 시간 업데이트"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE users SET last_login = ? WHERE id = ?
            """, (datetime.now(), user_id))

    def get_all_users(self) -> List[Dict]:
        """모든 사용자 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, username, role, display_name, is_active, created_at, last_login
                FROM users ORDER BY id
            """)
            return [dict(row) for row in cursor.fetchall()]

    def update_user(self, user_id: int, role: str = None, display_name: str = None, is_active: int = None) -> bool:
        """사용자 정보 업데이트"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            updates = []
            params = []
            if role is not None:
                updates.append("role = ?")
                params.append(role)
            if display_name is not None:
                updates.append("display_name = ?")
                params.append(display_name)
            if is_active is not None:
                updates.append("is_active = ?")
                params.append(is_active)

            if not updates:
                return False

            params.append(user_id)
            cursor.execute(f"""
                UPDATE users SET {', '.join(updates)} WHERE id = ?
            """, params)
            return cursor.rowcount > 0

    def update_user_password(self, user_id: int, password_hash: str) -> bool:
        """비밀번호 업데이트"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE users SET password_hash = ? WHERE id = ?
            """, (password_hash, user_id))
            return cursor.rowcount > 0

    def delete_user(self, user_id: int) -> bool:
        """사용자 완전 삭제"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            # 먼저 해당 사용자의 세션 삭제
            cursor.execute("DELETE FROM user_sessions WHERE user_id = ?", (user_id,))
            # 사용자 삭제
            cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
            return cursor.rowcount > 0

    def create_session(self, user_id: int, session_token: str, expires_hours: int = 8) -> int:
        """세션 생성"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            expires_at = datetime.now() + timedelta(hours=expires_hours)
            cursor.execute("""
                INSERT INTO user_sessions (session_token, user_id, expires_at)
                VALUES (?, ?, ?)
            """, (session_token, user_id, expires_at))
            return cursor.lastrowid

    def get_session(self, session_token: str) -> Optional[Dict]:
        """세션 조회"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT s.id, s.session_token, s.user_id, s.created_at, s.expires_at, s.is_valid,
                       u.username, u.role, u.display_name, u.is_active
                FROM user_sessions s
                JOIN users u ON s.user_id = u.id
                WHERE s.session_token = ? AND s.is_valid = 1 AND s.expires_at > ?
            """, (session_token, datetime.now()))
            row = cursor.fetchone()
            if row:
                return dict(row)
            return None

    def invalidate_session(self, session_token: str) -> bool:
        """세션 무효화"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE user_sessions SET is_valid = 0 WHERE session_token = ?
            """, (session_token,))
            return cursor.rowcount > 0

    def invalidate_all_user_sessions(self, user_id: int) -> int:
        """특정 사용자의 모든 세션 무효화"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE user_sessions SET is_valid = 0 WHERE user_id = ?
            """, (user_id,))
            return cursor.rowcount

    def cleanup_expired_sessions(self):
        """만료된 세션 정리"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                UPDATE user_sessions SET is_valid = 0 WHERE expires_at < ?
            """, (datetime.now(),))
            return cursor.rowcount

    def init_default_users(self):
        """기본 사용자 초기화 (최초 실행 시)"""
        import hashlib

        # admin 사용자가 없으면 기본 사용자 생성
        if not self.get_user_by_username("admin"):
            # 기본 비밀번호: admin123 (SHA-256 해시)
            admin_hash = hashlib.sha256("admin123".encode()).hexdigest()
            self.create_user("admin", admin_hash, "admin", "관리자")

        if not self.get_user_by_username("operator"):
            # 기본 비밀번호: operator123
            operator_hash = hashlib.sha256("operator123".encode()).hexdigest()
            self.create_user("operator", operator_hash, "operator", "운전자")

        if not self.get_user_by_username("viewer"):
            # 기본 비밀번호: viewer123
            viewer_hash = hashlib.sha256("viewer123".encode()).hexdigest()
            self.create_user("viewer", viewer_hash, "viewer", "조회자")

        logger.info("✅ 기본 사용자 초기화 완료")


# 싱글톤 인스턴스
_db_manager: Optional[DatabaseManager] = None


def get_db_manager(db_dir: str = "data") -> DatabaseManager:
    """DatabaseManager 싱글톤 인스턴스 반환"""
    global _db_manager
    if _db_manager is None:
        _db_manager = DatabaseManager(db_dir)
    return _db_manager
