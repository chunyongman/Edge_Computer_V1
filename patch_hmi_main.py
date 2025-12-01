#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""HMI main.py VFD diagnostics API patch script"""

# Read file
with open("C:/Users/my/Desktop/HMI_V1/backend/main.py", "r", encoding="utf-8") as f:
    content = f.read()

# Find markers
old_function_start = '# ===== VFD'
new_api_marker = '@app.post("/api/equipment/command")'

start_idx = content.find(old_function_start)
end_idx = content.find(new_api_marker)

print(f"Found: start={start_idx}, end={end_idx}")

if start_idx == -1 or end_idx == -1:
    print("ERROR: Cannot find markers")
    exit(1)

# New function code
new_function = '''# ===== VFD 예방진단 API (PLC에서 직접 읽기 - Edge Computer 계산 결과) =====

@app.get("/api/vfd/diagnostics")
async def get_vfd_diagnostics():
    """VFD 예방진단 데이터 조회 (Edge Computer가 PLC에 쓴 결과를 직접 읽기)"""
    logger.info("🔍 get_vfd_diagnostics() - PLC에서 Edge Computer 결과 읽기")

    # PLC 연결 확인
    if not plc_client.connected:
        logger.warning("⚠️ PLC 연결 안됨 - VFD 진단 데이터 없음")
        return {
            "success": False,
            "error": "PLC 연결 안됨",
            "data": None,
            "timestamp": datetime.now().isoformat()
        }

    # PLC에서 Edge Computer가 계산한 VFD 진단 결과 읽기 (레지스터 5200-5219)
    vfd_diagnosis_result = plc_client.read_vfd_diagnosis()

    if not vfd_diagnosis_result:
        logger.warning("⚠️ VFD 진단 결과 읽기 실패")
        return {
            "success": False,
            "error": "VFD 진단 데이터 읽기 실패",
            "data": None,
            "timestamp": datetime.now().isoformat()
        }

    health_scores = vfd_diagnosis_result.get('health_scores', [100] * 10)
    severity_levels = vfd_diagnosis_result.get('severity_levels', [0] * 10)

    logger.info(f"✅ PLC에서 VFD 진단 읽기 성공: health_scores={health_scores}, severity_levels={severity_levels}")

    # PLC에서 장비 데이터 가져오기 (VFD 운전 데이터)
    equipment_data = plc_client.get_all_equipment_data()

    # 중증도 레벨 → 상태 등급 매핑
    severity_to_grade = {0: "normal", 1: "caution", 2: "warning", 3: "critical"}
    severity_to_name = {0: "정상", 1: "주의", 2: "경고", 3: "위험"}

    vfd_diagnostics = {}

    for i, eq in enumerate(equipment_data):
        eq_name = eq.get("name", "")
        if not eq_name:
            continue

        # 장비 이름을 VFD ID로 변환
        if "SWP" in eq_name:
            vfd_id = eq_name.replace("SWP", "SW_PUMP_")
        elif "FWP" in eq_name:
            vfd_id = eq_name.replace("FWP", "FW_PUMP_")
        elif "FAN" in eq_name:
            vfd_id = eq_name.replace("FAN", "ER_FAN_")
        else:
            continue

        # Edge Computer가 계산한 건강도 점수와 중증도 레벨 사용
        health_score = health_scores[i] if i < len(health_scores) else 100
        severity_level = severity_levels[i] if i < len(severity_levels) else 0

        # 상태 등급 결정
        status_grade = severity_to_grade.get(severity_level, "normal")
        severity_name = severity_to_name.get(severity_level, "정상")
        severity_score = 100 - health_score

        # 장비 데이터에서 실시간 운전 값 추출
        freq = eq.get("frequency", 0.0)
        is_running = eq.get("running", False) or eq.get("running_fwd", False) or eq.get("running_bwd", False)
        run_hours = eq.get("run_hours", 0)
        motor_temp = eq.get("motor_thermal", 0)
        heatsink_temp = eq.get("heatsink_temp", 0)
        motor_current = eq.get("motor_current", 0)
        dc_voltage = eq.get("dc_link_voltage", 540)

        # 이상 패턴 및 권장 조치 결정
        anomaly_patterns = []
        maintenance_priority = 0

        if severity_level >= 3:
            anomaly_patterns = ["CRITICAL_CONDITION"]
            maintenance_priority = 5
            recommendation = f"▶ 즉시 점검 필요! {eq_name} 상태 위험"
        elif severity_level >= 2:
            anomaly_patterns = ["WARNING_CONDITION"]
            maintenance_priority = 3
            recommendation = f"▶ 정비 계획 수립 필요. {eq_name} 점검 권장"
        elif severity_level >= 1:
            anomaly_patterns = ["ATTENTION_REQUIRED"]
            maintenance_priority = 1
            recommendation = f"▶ 모니터링 강화 권장. {eq_name} 주의"
        else:
            recommendation = f"정상 운전 중. {eq_name} 정기 점검 유지"

        # 온도 추세
        temp_rise_rate = 0.05 if is_running else -0.02
        predicted_temp_30min = heatsink_temp + (temp_rise_rate * 30)
        temp_trend = "rising" if temp_rise_rate > 0.03 else ("falling" if temp_rise_rate < -0.03 else "stable")

        # 이상 징후 상태 관리
        has_anomaly = severity_level > 0
        is_cleared_vfd = vfd_id in vfd_cleared_ids
        ack_info = vfd_ack_status.get(vfd_id, {})
        ack_state = ack_info.get('status')

        is_acknowledged = False
        acknowledged_at = None
        is_cleared = False

        if has_anomaly:
            if is_cleared_vfd:
                is_acknowledged = True
                is_cleared = True
            elif ack_state == "acknowledged":
                is_acknowledged = True
                acknowledged_at = ack_info.get('acknowledged_at')
            else:
                if vfd_id not in vfd_ack_status:
                    vfd_ack_status[vfd_id] = {"status": "active", "acknowledged_at": None}
        else:
            if vfd_id in vfd_cleared_ids:
                vfd_cleared_ids.discard(vfd_id)
            if vfd_id in vfd_ack_status:
                del vfd_ack_status[vfd_id]

        vfd_diagnostics[vfd_id] = {
            "vfd_id": vfd_id,
            "timestamp": datetime.now().isoformat(),
            "current_frequency_hz": freq,
            "output_current_a": motor_current,
            "output_voltage_v": 400,
            "dc_bus_voltage_v": dc_voltage,
            "motor_temperature_c": motor_temp,
            "heatsink_temperature_c": heatsink_temp,
            "health_score": health_score,
            "severity_level": severity_level,
            "severity_name": severity_name,
            "status_grade": status_grade,
            "severity_score": severity_score,
            "anomaly_patterns": anomaly_patterns,
            "recommendation": recommendation,
            "cumulative_runtime_hours": run_hours,
            "trip_count": 0,
            "error_count": 0,
            "warning_count": 0,
            "predicted_temp_30min": predicted_temp_30min,
            "temp_rise_rate": temp_rise_rate,
            "temp_trend": temp_trend,
            "remaining_life_percent": health_score,
            "estimated_days_to_maintenance": 1282 if severity_level == 0 else (30 if severity_level == 1 else (7 if severity_level == 2 else 0)),
            "anomaly_score": severity_score,
            "maintenance_priority": maintenance_priority,
            "prediction_confidence": 0.95,
            "is_acknowledged": is_acknowledged,
            "acknowledged_at": acknowledged_at,
            "is_cleared": is_cleared,
            "cleared_at": None,
        }

    response_data = {
        "timestamp": datetime.now().isoformat(),
        "vfd_count": len(vfd_diagnostics),
        "vfd_diagnostics": vfd_diagnostics
    }

    return {
        "success": True,
        "data": response_data,
        "timestamp": datetime.now().isoformat()
    }


'''

# Replace content
new_content = content[:start_idx] + new_function + content[end_idx:]

with open("C:/Users/my/Desktop/HMI_V1/backend/main.py", "w", encoding="utf-8") as f:
    f.write(new_content)

print("✅ File updated successfully!")
