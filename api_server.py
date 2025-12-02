"""
Edge Computer API Server
이력 데이터 통합 관리 API
- 알람 이력
- 이벤트 로그
- 운전 이력 (제어 명령 이력)
- 사용자 인증
"""

import logging
import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query, Header
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


class LoginRequest(BaseModel):
    """로그인 요청"""
    username: str
    password: str


class ChangePasswordRequest(BaseModel):
    """비밀번호 변경 요청"""
    current_password: str
    new_password: str


class UserUpdateRequest(BaseModel):
    """사용자 정보 업데이트 요청"""
    role: Optional[str] = None
    display_name: Optional[str] = None
    is_active: Optional[bool] = None


class UserCreateRequest(BaseModel):
    """사용자 생성 요청"""
    username: str
    password: str
    role: str = "viewer"
    display_name: Optional[str] = None


class ResetPasswordRequest(BaseModel):
    """비밀번호 초기화 요청"""
    new_password: str


# 역할별 권한 정의
# 게스트(비로그인): home, system_overview, dashboard, vfd_diagnostics, trend, history, alarm
# 운전자: 게스트 + diagram, fan_diagram, advanced
# 관리자: 운전자 + settings, 사용자 관리
ROLE_PERMISSIONS = {
    "admin": {
        "tabs": ["home", "system_overview", "dashboard", "diagram", "fan_diagram",
                 "advanced", "vfd_diagnostics", "trend", "settings", "history", "alarm"],
        "can_control": True,
        "can_manage_users": True
    },
    "operator": {
        "tabs": ["home", "system_overview", "dashboard", "diagram", "fan_diagram",
                 "advanced", "vfd_diagnostics", "trend", "history", "alarm"],
        "can_control": True,
        "can_manage_users": False
    }
}

# 게스트(비로그인) 접근 가능 탭
GUEST_TABS = ["home", "system_overview", "dashboard", "vfd_diagnostics", "trend", "history", "alarm"]


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


# ----- ESS 보고서 API -----

@app.get("/api/reports/ess/daily")
async def get_ess_daily_report(date: str = Query(..., description="날짜 (YYYY-MM-DD)")):
    """일별 ESS 보고서 조회 (특정 날짜의 장비별/그룹별 절감량)"""
    db = get_db()
    report = db.get_ess_daily_report(date)

    if not report:
        return {
            "success": True,
            "data": {"equipment": [], "groups": []},
            "date": date,
            "timestamp": datetime.now().isoformat()
        }

    return {
        "success": True,
        "data": report,
        "date": date,
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/reports/ess/period")
async def get_ess_period_report(
    start_date: str = Query(..., description="시작일 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="종료일 (YYYY-MM-DD)")
):
    """기간별 ESS 보고서 조회 (일별 추이 및 요약)"""
    db = get_db()
    report = db.get_ess_period_report(start_date, end_date)

    return {
        "success": True,
        "data": report,
        "period": {"start": start_date, "end": end_date},
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/reports/ess/equipment/{equipment_name}")
async def get_ess_equipment_report(
    equipment_name: str,
    start_date: str = Query(..., description="시작일 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="종료일 (YYYY-MM-DD)")
):
    """장비별 ESS 보고서 조회 (특정 장비의 일별 데이터)"""
    db = get_db()
    report = db.get_ess_equipment_report(equipment_name, start_date, end_date)

    return {
        "success": True,
        "data": report,
        "equipment": equipment_name,
        "period": {"start": start_date, "end": end_date},
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/reports/ess/monthly")
async def get_ess_monthly_report(
    year: int = Query(..., description="연도"),
    month: int = Query(..., ge=1, le=12, description="월 (1-12)")
):
    """월별 ESS 보고서 조회 (장비별 요약, 그룹별 요약, 일별 데이터)"""
    db = get_db()
    report = db.get_ess_monthly_report(year, month)

    return {
        "success": True,
        "data": report,
        "year": year,
        "month": month,
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/reports/ess/csv/daily")
async def download_ess_daily_csv(date: str = Query(..., description="날짜 (YYYY-MM-DD)")):
    """일별 ESS 보고서 CSV 다운로드"""
    from fastapi.responses import Response
    import io
    import csv

    db = get_db()
    report = db.get_ess_daily_report(date)

    # CSV 생성
    output = io.StringIO()
    writer = csv.writer(output)

    # BOM for Excel Korean support
    output.write('\ufeff')

    # 헤더
    writer.writerow([f"ESS 일별 보고서 - {date}"])
    writer.writerow([])

    # 장비별 데이터
    writer.writerow(["[장비별 절감 현황]"])
    writer.writerow(["장비명", "ESS 운전시간(h)", "절감량(kWh)", "절감률(%)", "기준 전력(kWh)", "ESS 전력(kWh)"])

    if report and "equipment" in report:
        for eq in report["equipment"]:
            writer.writerow([
                eq.get("equipment_name", ""),
                round(eq.get("ess_run_hours", 0), 2),
                round(eq.get("saved_energy_kwh", 0), 2),
                round(eq.get("savings_rate", 0), 2),
                round(eq.get("baseline_energy_kwh", 0), 2),
                round(eq.get("ess_energy_kwh", 0), 2)
            ])

    writer.writerow([])

    # 그룹별 데이터
    writer.writerow(["[그룹별 절감 현황]"])
    writer.writerow(["그룹명", "ESS 운전시간(h)", "절감량(kWh)", "절감률(%)", "기준 전력(kWh)", "ESS 전력(kWh)"])

    if report and "groups" in report:
        groups = report["groups"]
        for group_name in ['SWP', 'FWP', 'FAN', 'TOTAL']:
            if group_name in groups:
                grp = groups[group_name]
                writer.writerow([
                    group_name,
                    round(grp.get("ess_hours", 0), 2),
                    round(grp.get("saved_kwh", 0), 2),
                    round(grp.get("savings_rate", 0), 2),
                    round(grp.get("baseline_kwh", 0), 2),
                    round(grp.get("ess_kwh", 0), 2)
                ])

    csv_content = output.getvalue()

    return Response(
        content=csv_content,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="ESS_Daily_Report_{date}.csv"'
        }
    )


@app.get("/api/reports/ess/csv/period")
async def download_ess_period_csv(
    start_date: str = Query(..., description="시작일 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="종료일 (YYYY-MM-DD)")
):
    """기간별 ESS 보고서 CSV 다운로드"""
    from fastapi.responses import Response
    import io
    import csv

    db = get_db()
    report = db.get_ess_period_report(start_date, end_date)

    # CSV 생성
    output = io.StringIO()
    writer = csv.writer(output)

    output.write('\ufeff')

    writer.writerow([f"ESS 기간별 보고서 - {start_date} ~ {end_date}"])
    writer.writerow([])

    # 요약 (그룹별)
    writer.writerow(["[기간 요약 - 그룹별]"])
    summary = report.get("summary", {})
    writer.writerow(["그룹", "절감량(kWh)", "절감률(%)", "ESS 운전시간(h)", "기준 전력(kWh)"])
    for group_name in ['SWP', 'FWP', 'FAN', 'TOTAL']:
        if group_name in summary:
            grp = summary[group_name]
            writer.writerow([
                group_name,
                round(grp.get("saved_kwh", 0), 2),
                round(grp.get("savings_rate", 0), 2),
                round(grp.get("ess_hours", 0), 2),
                round(grp.get("baseline_kwh", 0), 2)
            ])
    writer.writerow([])

    # 일별 추이
    writer.writerow(["[일별 추이]"])
    writer.writerow(["날짜", "SWP 절감(kWh)", "FWP 절감(kWh)", "FAN 절감(kWh)", "총 절감량(kWh)", "절감률(%)"])

    for day in report.get("daily_data", []):
        writer.writerow([
            day.get("date", ""),
            round(day.get("swp_saved_kwh", 0), 2),
            round(day.get("fwp_saved_kwh", 0), 2),
            round(day.get("fan_saved_kwh", 0), 2),
            round(day.get("total_saved_kwh", 0), 2),
            round(day.get("savings_rate", 0), 2)
        ])

    csv_content = output.getvalue()

    return Response(
        content=csv_content,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="ESS_Period_Report_{start_date}_to_{end_date}.csv"'
        }
    )


@app.get("/api/reports/ess/csv/equipment/{equipment_name}")
async def download_ess_equipment_csv(
    equipment_name: str,
    start_date: str = Query(..., description="시작일 (YYYY-MM-DD)"),
    end_date: str = Query(..., description="종료일 (YYYY-MM-DD)")
):
    """장비별 ESS 보고서 CSV 다운로드"""
    from fastapi.responses import Response
    import io
    import csv

    db = get_db()
    report = db.get_ess_equipment_report(equipment_name, start_date, end_date)

    # CSV 생성
    output = io.StringIO()
    writer = csv.writer(output)

    output.write('\ufeff')

    writer.writerow([f"ESS 장비별 보고서 - {equipment_name} ({start_date} ~ {end_date})"])
    writer.writerow([])

    # 요약
    writer.writerow(["[장비 요약]"])
    summary = report.get("summary", {})
    writer.writerow(["총 절감량(kWh)", round(summary.get("saved_kwh", 0), 2)])
    writer.writerow(["평균 절감률(%)", round(summary.get("savings_rate", 0), 2)])
    writer.writerow(["총 ESS 운전시간(h)", round(summary.get("ess_hours", 0), 2)])
    writer.writerow([])

    # 일별 데이터
    writer.writerow(["[일별 데이터]"])
    writer.writerow(["날짜", "ESS 운전시간(h)", "절감량(kWh)", "절감률(%)", "기준 전력(kWh)", "ESS 전력(kWh)"])

    for day in report.get("daily_data", []):
        writer.writerow([
            day.get("date", ""),
            round(day.get("ess_run_hours", 0), 2),
            round(day.get("saved_energy_kwh", 0), 2),
            round(day.get("savings_rate", 0), 2),
            round(day.get("baseline_energy_kwh", 0), 2),
            round(day.get("ess_energy_kwh", 0), 2)
        ])

    csv_content = output.getvalue()

    return Response(
        content=csv_content,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="ESS_Equipment_Report_{equipment_name}_{start_date}_to_{end_date}.csv"'
        }
    )


@app.get("/api/reports/ess/csv/monthly")
async def download_ess_monthly_csv(
    year: int = Query(..., description="연도"),
    month: int = Query(..., ge=1, le=12, description="월 (1-12)")
):
    """월별 ESS 보고서 CSV 다운로드"""
    from fastapi.responses import Response
    import io
    import csv

    db = get_db()
    report = db.get_ess_monthly_report(year, month)

    # CSV 생성
    output = io.StringIO()
    writer = csv.writer(output)

    output.write('\ufeff')

    writer.writerow([f"ESS 월별 보고서 - {year}년 {month}월"])
    writer.writerow([])

    # 장비별 요약
    writer.writerow(["[장비별 월간 요약]"])
    writer.writerow(["장비명", "ESS 운전시간(h)", "절감량(kWh)", "절감률(%)", "기준 전력(kWh)", "ESS 전력(kWh)"])

    for eq in report.get("equipment_summary", []):
        writer.writerow([
            eq.get("equipment_name", ""),
            round(eq.get("ess_run_hours", 0), 2),
            round(eq.get("saved_energy_kwh", 0), 2),
            round(eq.get("savings_rate", 0), 2),
            round(eq.get("baseline_energy_kwh", 0), 2),
            round(eq.get("ess_energy_kwh", 0), 2)
        ])

    writer.writerow([])

    # 그룹별 요약
    writer.writerow(["[그룹별 월간 요약]"])
    writer.writerow(["그룹명", "ESS 운전시간(h)", "절감량(kWh)", "절감률(%)", "기준 전력(kWh)"])

    group_summary = report.get("group_summary", {})
    for group_name in ['SWP', 'FWP', 'FAN', 'TOTAL']:
        if group_name in group_summary:
            grp = group_summary[group_name]
            writer.writerow([
                group_name,
                round(grp.get("ess_hours", 0), 2),
                round(grp.get("saved_kwh", 0), 2),
                round(grp.get("savings_rate", 0), 2),
                round(grp.get("baseline_kwh", 0), 2)
            ])

    writer.writerow([])

    # 일별 데이터
    writer.writerow(["[일별 상세 데이터]"])
    writer.writerow(["날짜", "절감량(kWh)", "절감률(%)"])

    for day in report.get("daily_data", []):
        writer.writerow([
            day.get("date", ""),
            round(day.get("total_saved_kwh", 0), 2),
            round(day.get("savings_rate", 0), 2)
        ])

    csv_content = output.getvalue()

    return Response(
        content=csv_content,
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="ESS_Monthly_Report_{year}_{month:02d}.csv"'
        }
    )


# ===== 인증 API =====

def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[Dict]:
    """현재 로그인한 사용자 조회 (헤더에서 토큰 추출)"""
    if not authorization:
        return None

    # "Bearer <token>" 형식
    if authorization.startswith("Bearer "):
        token = authorization[7:]
    else:
        token = authorization

    db = get_db()
    session = db.get_session(token)
    if session and session.get("is_active"):
        return session
    return None


@app.post("/api/auth/login")
async def login(request: LoginRequest):
    """로그인"""
    db = get_db()

    # 기본 사용자 초기화 (최초 실행 시)
    db.init_default_users()

    user = db.get_user_by_username(request.username)
    if not user:
        raise HTTPException(status_code=401, detail="사용자를 찾을 수 없습니다")

    if not user.get("is_active"):
        raise HTTPException(status_code=401, detail="비활성화된 계정입니다")

    # 비밀번호 확인
    password_hash = hashlib.sha256(request.password.encode()).hexdigest()
    if password_hash != user.get("password_hash"):
        raise HTTPException(status_code=401, detail="비밀번호가 일치하지 않습니다")

    # 세션 생성
    session_token = secrets.token_urlsafe(32)
    db.create_session(user["id"], session_token, expires_hours=8)
    db.update_user_last_login(user["id"])

    # 권한 정보 가져오기
    role = user.get("role", "operator")
    permissions = ROLE_PERMISSIONS.get(role, ROLE_PERMISSIONS["operator"])

    logger.info(f"✅ 로그인 성공: {user['username']} (역할: {role})")

    return {
        "success": True,
        "message": "로그인 성공",
        "data": {
            "token": session_token,
            "user": {
                "id": user["id"],
                "username": user["username"],
                "role": role,
                "display_name": user.get("display_name"),
            },
            "permissions": permissions
        }
    }


@app.post("/api/auth/logout")
async def logout(authorization: Optional[str] = Header(None)):
    """로그아웃"""
    if not authorization:
        raise HTTPException(status_code=401, detail="인증 토큰이 필요합니다")

    token = authorization[7:] if authorization.startswith("Bearer ") else authorization

    db = get_db()
    if db.invalidate_session(token):
        logger.info("✅ 로그아웃 성공")
        return {"success": True, "message": "로그아웃 되었습니다"}
    else:
        return {"success": False, "message": "세션을 찾을 수 없습니다"}


@app.get("/api/auth/me")
async def get_current_user_info(authorization: Optional[str] = Header(None)):
    """현재 로그인한 사용자 정보 조회"""
    user = get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="인증이 필요합니다")

    role = user.get("role", "operator")
    permissions = ROLE_PERMISSIONS.get(role, ROLE_PERMISSIONS["operator"])

    return {
        "success": True,
        "data": {
            "user": {
                "id": user["user_id"],
                "username": user["username"],
                "role": role,
                "display_name": user.get("display_name"),
            },
            "permissions": permissions
        }
    }


@app.get("/api/auth/permissions")
async def get_permissions():
    """모든 역할별 권한 정보 조회"""
    return {
        "success": True,
        "data": ROLE_PERMISSIONS
    }


@app.post("/api/auth/change-password")
async def change_password(
    request: ChangePasswordRequest,
    authorization: Optional[str] = Header(None)
):
    """비밀번호 변경"""
    user = get_current_user(authorization)
    if not user:
        raise HTTPException(status_code=401, detail="인증이 필요합니다")

    db = get_db()

    # 현재 비밀번호 확인
    full_user = db.get_user_by_username(user["username"])
    current_hash = hashlib.sha256(request.current_password.encode()).hexdigest()
    if current_hash != full_user.get("password_hash"):
        raise HTTPException(status_code=400, detail="현재 비밀번호가 일치하지 않습니다")

    # 새 비밀번호 설정
    new_hash = hashlib.sha256(request.new_password.encode()).hexdigest()
    db.update_user_password(user["user_id"], new_hash)

    logger.info(f"✅ 비밀번호 변경: {user['username']}")

    return {"success": True, "message": "비밀번호가 변경되었습니다"}


# ===== 사용자 관리 API (관리자 전용) =====

@app.get("/api/users")
async def get_all_users(authorization: Optional[str] = Header(None)):
    """모든 사용자 조회 (관리자 전용)"""
    user = get_current_user(authorization)
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="관리자 권한이 필요합니다")

    db = get_db()
    users = db.get_all_users()

    return {
        "success": True,
        "data": users
    }


@app.post("/api/users")
async def create_user(
    request: UserCreateRequest,
    authorization: Optional[str] = Header(None)
):
    """새 사용자 생성 (관리자 전용)"""
    current_user = get_current_user(authorization)
    if not current_user or current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="관리자 권한이 필요합니다")

    db = get_db()

    # 유효한 역할인지 확인
    if request.role not in ROLE_PERMISSIONS:
        raise HTTPException(status_code=400, detail="유효하지 않은 역할입니다")

    # 사용자 중복 확인
    if db.get_user_by_username(request.username):
        raise HTTPException(status_code=400, detail="이미 존재하는 사용자명입니다")

    # 사용자명 유효성 검사
    if len(request.username) < 3:
        raise HTTPException(status_code=400, detail="사용자명은 3자 이상이어야 합니다")

    if len(request.password) < 6:
        raise HTTPException(status_code=400, detail="비밀번호는 6자 이상이어야 합니다")

    # 비밀번호 해시
    password_hash = hashlib.sha256(request.password.encode()).hexdigest()

    # 사용자 생성
    display_name = request.display_name or request.username
    user_id = db.create_user(request.username, password_hash, request.role, display_name)

    logger.info(f"✅ 새 사용자 생성: {request.username} (역할: {request.role})")

    return {
        "success": True,
        "message": "사용자가 생성되었습니다",
        "data": {"user_id": user_id, "username": request.username}
    }


@app.put("/api/users/{user_id}")
async def update_user(
    user_id: int,
    request: UserUpdateRequest,
    authorization: Optional[str] = Header(None)
):
    """사용자 정보 업데이트 (관리자 전용)"""
    current_user = get_current_user(authorization)
    if not current_user or current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="관리자 권한이 필요합니다")

    db = get_db()

    # 유효한 역할인지 확인
    if request.role and request.role not in ROLE_PERMISSIONS:
        raise HTTPException(status_code=400, detail="유효하지 않은 역할입니다")

    is_active = None
    if request.is_active is not None:
        is_active = 1 if request.is_active else 0

    success = db.update_user(
        user_id,
        role=request.role,
        display_name=request.display_name,
        is_active=is_active
    )

    if success:
        # 역할이 변경되면 해당 사용자의 세션 무효화
        if request.role or (request.is_active is not None and not request.is_active):
            db.invalidate_all_user_sessions(user_id)

        logger.info(f"✅ 사용자 정보 업데이트: ID={user_id}")
        return {"success": True, "message": "사용자 정보가 업데이트되었습니다"}
    else:
        return {"success": False, "message": "업데이트할 내용이 없습니다"}


@app.post("/api/users/{user_id}/reset-password")
async def reset_user_password(
    user_id: int,
    request: ResetPasswordRequest,
    authorization: Optional[str] = Header(None)
):
    """사용자 비밀번호 초기화 (관리자 전용)"""
    current_user = get_current_user(authorization)
    if not current_user or current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="관리자 권한이 필요합니다")

    if len(request.new_password) < 6:
        raise HTTPException(status_code=400, detail="비밀번호는 6자 이상이어야 합니다")

    db = get_db()

    # 새 비밀번호 해시
    new_hash = hashlib.sha256(request.new_password.encode()).hexdigest()
    db.update_user_password(user_id, new_hash)

    # 해당 사용자의 모든 세션 무효화
    db.invalidate_all_user_sessions(user_id)

    logger.info(f"✅ 비밀번호 초기화: user_id={user_id}")

    return {"success": True, "message": "비밀번호가 초기화되었습니다"}


@app.delete("/api/users/{user_id}")
async def delete_user(
    user_id: int,
    authorization: Optional[str] = Header(None)
):
    """사용자 완전 삭제 (관리자 전용)"""
    current_user = get_current_user(authorization)
    if not current_user or current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="관리자 권한이 필요합니다")

    # 자기 자신은 삭제 불가
    if current_user.get("user_id") == user_id:
        raise HTTPException(status_code=400, detail="자기 자신은 삭제할 수 없습니다")

    db = get_db()

    # 사용자 완전 삭제 (세션도 함께 삭제됨)
    success = db.delete_user(user_id)

    if success:
        logger.info(f"✅ 사용자 완전 삭제: user_id={user_id}")
        return {"success": True, "message": "사용자가 삭제되었습니다"}
    else:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다")


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
