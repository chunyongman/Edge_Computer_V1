"""
Edge Computer API Server
이력 데이터 통합 관리 API
- 알람 이력
- 이벤트 로그
- 운전 이력 (제어 명령 이력)
"""

import logging
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from src.database.db_manager import DatabaseManager

logger = logging.getLogger(__name__)

# FastAPI 앱 생성
app = FastAPI(
    title="Edge Computer API",
    description="통합 이력 데이터 관리 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 매니저 (전역)
db_manager: Optional[DatabaseManager] = None


def get_db() -> DatabaseManager:
    """데이터베이스 매니저 반환"""
    global db_manager
    if db_manager is None:
        db_manager = DatabaseManager(db_dir="data")
    return db_manager


# ===== 요청/응답 모델 =====

class AlarmCreate(BaseModel):
    """알람 생성 요청"""
    alarm_id: str
    equipment_id: str
    alarm_type: str
    severity: str  # "critical", "warning", "info"
    message: str
    occurred_at: Optional[str] = None
    details: Optional[Dict] = None


class AlarmAcknowledge(BaseModel):
    """알람 확인 요청"""
    alarm_id: str
    user: str = "operator"


class EventCreate(BaseModel):
    """이벤트 생성 요청"""
    event_type: str  # "control", "alarm", "setting", "system"
    source: str  # "HMI", "Edge", "PLC"
    description: str
    details: Optional[Dict] = None


class OperationRecordCreate(BaseModel):
    """운전 이력 생성 요청"""
    equipment_name: str
    date: str  # YYYY-MM-DD 형식
    runtime_hours: float = 0
    start_count: int = 0
    energy_kwh: float = 0
    saved_kwh: float = 0


class VFDAnomalyAcknowledge(BaseModel):
    """VFD 이상 징후 확인 요청"""
    anomaly_id: str
    user: str = "Operator"


# ===== API 엔드포인트 =====

@app.get("/")
async def root():
    """API 상태 확인"""
    return {
        "service": "Edge Computer API",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    }


# ----- 알람 API -----

@app.get("/api/alarms/active")
async def get_active_alarms():
    """활성 알람 조회"""
    db = get_db()
    alarms = db.get_active_alarms()

    # HMI 형식으로 변환
    formatted = []
    for alarm in alarms:
        formatted.append({
            "id": alarm.get("alarm_id"),
            "level": alarm.get("severity"),
            "message": alarm.get("message"),
            "time": alarm.get("occurred_at"),
            "acknowledged": alarm.get("acknowledged_at") is not None,
            "ack_time": alarm.get("acknowledged_at"),
            "ack_user": alarm.get("acknowledged_by"),
            "tag": alarm.get("alarm_type"),
            "value": None
        })

    # 요약 계산
    summary = {
        "critical": sum(1 for a in formatted if a["level"] == "critical"),
        "warning": sum(1 for a in formatted if a["level"] == "warning"),
        "info": sum(1 for a in formatted if a["level"] == "info"),
        "total": len(formatted)
    }

    return {
        "success": True,
        "data": formatted,
        "summary": summary,
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/alarms/history")
async def get_alarm_history(
    limit: int = Query(100, ge=1, le=1000),
    level: Optional[str] = None,
    equipment_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    """알람 이력 조회"""
    db = get_db()

    # 날짜 파싱
    start_dt = datetime.fromisoformat(start_date) if start_date else None
    end_dt = datetime.fromisoformat(end_date) if end_date else None

    alarms = db.get_alarm_history(
        equipment_id=equipment_id,
        start_date=start_dt,
        end_date=end_dt,
        limit=limit
    )

    # 레벨 필터링
    if level:
        alarms = [a for a in alarms if a.get("severity") == level]

    # HMI 형식으로 변환
    formatted = []
    for alarm in alarms:
        formatted.append({
            "id": alarm.get("alarm_id"),
            "level": alarm.get("severity"),
            "message": alarm.get("message"),
            "time": alarm.get("occurred_at"),
            "acknowledged": alarm.get("acknowledged_at") is not None,
            "ack_time": alarm.get("acknowledged_at"),
            "ack_user": alarm.get("acknowledged_by"),
            "tag": alarm.get("alarm_type"),
            "value": None,
            "cleared_at": alarm.get("cleared_at"),
            "duration_seconds": alarm.get("duration_seconds")
        })

    return {
        "success": True,
        "data": formatted,
        "count": len(formatted),
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/alarms")
async def create_alarm(alarm: AlarmCreate):
    """알람 생성 (HMI에서 호출)"""
    db = get_db()

    occurred_at = datetime.fromisoformat(alarm.occurred_at) if alarm.occurred_at else datetime.now()

    row_id = db.insert_alarm(
        alarm_id=alarm.alarm_id,
        equipment_id=alarm.equipment_id,
        alarm_type=alarm.alarm_type,
        severity=alarm.severity,
        message=alarm.message,
        occurred_at=occurred_at,
        details=alarm.details
    )

    logger.info(f"알람 생성: {alarm.alarm_id} - {alarm.message}")

    return {
        "success": True,
        "row_id": row_id,
        "alarm_id": alarm.alarm_id
    }


@app.post("/api/alarms/acknowledge")
async def acknowledge_alarm(ack: AlarmAcknowledge):
    """알람 확인 처리"""
    db = get_db()
    db.update_alarm_acknowledged(ack.alarm_id, ack.user)

    # 이벤트 로그 추가
    db.insert_event(
        event_type="alarm",
        source="HMI",
        description=f"알람 확인: {ack.alarm_id}",
        details={"alarm_id": ack.alarm_id, "user": ack.user}
    )

    return {"success": True, "alarm_id": ack.alarm_id}


@app.post("/api/alarms/clear/{alarm_id}")
async def clear_alarm(alarm_id: str, user: str = "system"):
    """알람 해제 처리"""
    db = get_db()
    db.update_alarm_cleared(alarm_id, user)

    return {"success": True, "alarm_id": alarm_id}


# ----- 이벤트 로그 API -----

@app.get("/api/events")
async def get_events(
    limit: int = Query(100, ge=1, le=1000),
    event_type: Optional[str] = None,
    source: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    """이벤트 로그 조회"""
    db = get_db()

    start_dt = datetime.fromisoformat(start_date) if start_date else None
    end_dt = datetime.fromisoformat(end_date) if end_date else None

    events = db.get_events(
        event_type=event_type,
        source=source,
        start_date=start_dt,
        end_date=end_dt,
        limit=limit
    )

    # HMI 형식으로 변환
    formatted = []
    for event in events:
        formatted.append({
            "id": f"EVT{event.get('id', 0):010d}",
            "time": event.get("timestamp"),
            "type": event.get("event_type"),
            "user": event.get("source"),
            "message": event.get("description"),
            "details": event.get("details")
        })

    return {
        "success": True,
        "data": formatted,
        "count": len(formatted),
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/events")
async def create_event(event: EventCreate):
    """이벤트 로그 생성 (HMI에서 호출)"""
    db = get_db()

    row_id = db.insert_event(
        event_type=event.event_type,
        source=event.source,
        description=event.description,
        details=event.details
    )

    logger.info(f"이벤트 생성: [{event.event_type}] {event.description}")

    return {
        "success": True,
        "row_id": row_id
    }


# ----- 운전 이력 API -----

@app.get("/api/operations")
async def get_operations(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    equipment_name: Optional[str] = None,
    limit: int = Query(100, ge=1, le=1000)
):
    """운전 이력 조회 (장비별/일별 운전 기록)"""
    db = get_db()

    # operation_history 테이블에서 조회
    records = db.get_operation_records(
        equipment_name=equipment_name,
        start_date=start_date,
        end_date=end_date,
        limit=limit
    )

    # HMI 형식으로 변환
    formatted = []
    for record in records:
        formatted.append({
            "equipment_name": record.get("equipment_name"),
            "date": record.get("date"),
            "runtime_hours": record.get("runtime_hours", 0),
            "start_count": record.get("start_count", 0),
            "energy_kwh": record.get("energy_kwh", 0),
            "saved_kwh": record.get("saved_kwh", 0)
        })

    return {
        "success": True,
        "data": formatted,
        "count": len(formatted),
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/operations")
async def create_operation(record: OperationRecordCreate):
    """운전 이력 생성/업데이트 (HMI에서 호출)"""
    db = get_db()

    # operation_history 테이블에 저장 (UPSERT)
    db.upsert_operation_record(
        equipment_name=record.equipment_name,
        date=record.date,
        runtime_hours=record.runtime_hours,
        start_count=record.start_count,
        energy_kwh=record.energy_kwh,
        saved_kwh=record.saved_kwh
    )

    logger.info(f"운전 이력 저장: {record.equipment_name} ({record.date})")

    return {"success": True}


# ----- VFD 이상 징후 히스토리 API -----

@app.get("/api/vfd/anomalies/active")
async def get_active_vfd_anomalies():
    """활성 VFD 이상 징후 조회"""
    db = get_db()
    anomalies = db.get_active_vfd_anomalies()

    # 요약 계산
    summary = {
        "level_1": sum(1 for a in anomalies if a.get("severity_level") == 1),
        "level_2": sum(1 for a in anomalies if a.get("severity_level") == 2),
        "level_3": sum(1 for a in anomalies if a.get("severity_level") == 3),
        "total": len(anomalies)
    }

    return {
        "success": True,
        "data": anomalies,
        "summary": summary,
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/vfd/anomalies/history")
async def get_vfd_anomaly_history(
    limit: int = Query(100, ge=1, le=1000),
    equipment_id: Optional[str] = None,
    status: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    """VFD 이상 징후 히스토리 조회"""
    db = get_db()

    # 날짜 파싱
    start_dt = datetime.fromisoformat(start_date) if start_date else None
    end_dt = datetime.fromisoformat(end_date) if end_date else None

    anomalies = db.get_vfd_anomaly_history(
        equipment_id=equipment_id,
        status=status,
        start_date=start_dt,
        end_date=end_dt,
        limit=limit
    )

    return {
        "success": True,
        "data": anomalies,
        "count": len(anomalies),
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/vfd/anomalies/statistics")
async def get_vfd_anomaly_statistics(days: int = Query(30, ge=1, le=365)):
    """VFD 이상 징후 통계 조회"""
    db = get_db()
    stats = db.get_vfd_anomaly_statistics(days=days)

    return {
        "success": True,
        "data": stats,
        "timestamp": datetime.now().isoformat()
    }


@app.post("/api/vfd/anomalies/acknowledge")
async def acknowledge_vfd_anomaly(ack: VFDAnomalyAcknowledge):
    """VFD 이상 징후 확인 처리"""
    db = get_db()
    db.acknowledge_vfd_anomaly(ack.anomaly_id, ack.user)

    # 이벤트 로그 추가
    db.insert_event(
        event_type="vfd_anomaly",
        source="HMI",
        description=f"VFD 이상 징후 확인: {ack.anomaly_id}",
        details={"anomaly_id": ack.anomaly_id, "user": ack.user}
    )

    return {"success": True, "anomaly_id": ack.anomaly_id}


@app.post("/api/vfd/anomalies/clear/{anomaly_id}")
async def clear_vfd_anomaly(anomaly_id: str, user: str = "Operator"):
    """VFD 이상 징후 해제 처리"""
    db = get_db()
    db.clear_vfd_anomaly(anomaly_id, user)

    # 이벤트 로그 추가
    db.insert_event(
        event_type="vfd_anomaly",
        source="HMI",
        description=f"VFD 이상 징후 해제: {anomaly_id}",
        details={"anomaly_id": anomaly_id, "user": user}
    )

    return {"success": True, "anomaly_id": anomaly_id}


# ===== 서버 시작 =====

def start_api_server(host: str = "0.0.0.0", port: int = 8000):
    """API 서버 시작"""
    logger.info(f"Edge Computer API 서버 시작: http://{host}:{port}")
    uvicorn.run(app, host=host, port=port, log_level="info")


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s'
    )
    start_api_server()
