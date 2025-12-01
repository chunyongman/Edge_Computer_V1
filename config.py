#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge AI Computer 설정 파일
"""

import os

# PLC 연결 설정
PLC_HOST = os.getenv("PLC_HOST", "127.0.0.1")  # localhost (같은 PC)
PLC_PORT = int(os.getenv("PLC_PORT", "502"))
PLC_SLAVE_ID = int(os.getenv("PLC_SLAVE_ID", "3"))

# AI 계산 주기 (초)
UPDATE_INTERVAL = 1

# 모터 정격 용량 (kW) - 사양서 기준
MOTOR_CAPACITY = {
    "SWP": 160.0,  # 냉각 해수 펌프 (FC-202 N160)
    "FWP": 200.0,  # 저온 담수 펌프 (FC-202 N200)
    "FAN": 37.0,   # E/R Fan (FC-102 P37K)
}

# 모터 정격 전류 (A) - 예방진단용
MOTOR_RATED_CURRENT = {
    "SWP": 300.0,  # 냉각 해수 펌프
    "FWP": 370.0,  # 저온 담수 펌프
    "FAN": 70.0,   # E/R Fan
}

# 장비 목록
EQUIPMENT_LIST = [
    "SWP1", "SWP2", "SWP3",
    "FWP1", "FWP2", "FWP3",
    "FAN1", "FAN2", "FAN3", "FAN4"
]

# Modbus 레지스터 주소
MODBUS_REGISTERS = {
    # 센서 데이터 (Read-Only)
    "SENSORS_START": 10,
    "SENSORS_COUNT": 10,

    # 장비 상태 비트
    "EQUIPMENT_STATUS_START": 4000,
    "EQUIPMENT_STATUS_COUNT": 2,

    # VFD 운전 데이터 (확장: 장비당 20개 레지스터)
    # 레지스터 매핑 (장비당):
    #   [0] frequency (Hz × 10)
    #   [1] power (kW)
    #   [2] avg_power (kW)
    #   [3] motor_current (A × 10)
    #   [4] motor_thermal (%)
    #   [5] heatsink_temp (°C)
    #   [6] torque (Nm)
    #   [7] inverter_thermal (%)
    #   [8] system_temp (°C)
    #   [9] kwh_counter_lo (kWh, 32bit low)
    #   [10] kwh_counter_hi (kWh, 32bit high)
    #   [11] num_starts (회)
    #   [12] over_temps (회)
    #   [13] phase_u_current (A × 10)
    #   [14] phase_v_current (A × 10)
    #   [15] phase_w_current (A × 10)
    #   [16] warning_word
    #   [17] dc_link_voltage (V)
    #   [18] run_hours_lo (32bit low)
    #   [19] run_hours_hi (32bit high)
    "VFD_DATA_START": 160,
    "VFD_DATA_PER_EQUIPMENT": 20,  # 8 → 20 확장 (예방진단 데이터 추가)

    # Edge AI 결과 저장 영역 (Write)
    "AI_TARGET_FREQ_START": 5000,      # 목표 주파수 (Hz × 10), 10개
    "AI_ENERGY_SAVINGS_START": 5100,   # 절감 전력 (kW × 10), 10개
    "AI_VFD_DIAGNOSIS_START": 5200,    # VFD 진단 점수 (0-100), 10개
    "AI_VFD_SEVERITY_START": 5210,     # VFD 중증도 레벨 (0-3), 10개
    "AI_SYSTEM_SAVINGS_START": 5300,   # 시스템 절감률 (% × 10), 4개
    "AI_ACCUMULATED_KWH_START": 5400,  # 누적 절감량 (kWh × 10), 2개 (오늘/이번달)
    "AI_POWER_60HZ_START": 5500,       # 60Hz 고정 전력 (kW × 10), 4개 (total, swp, fwp, fan)
    "AI_POWER_VFD_START": 5510,        # VFD 가변 전력 (kW × 10), 4개 (total, swp, fwp, fan)
    "AI_SAVINGS_KW_START": 5520,       # 절감 전력 (kW × 10), 4개 (total, swp, fwp, fan)

    # VFD 이상 징후 관리 (Read/Write)
    "VFD_ANOMALY_ACKNOWLEDGED_START": 5600,  # 이상 징후 확인 상태 (0/1), 10개
    "VFD_ANOMALY_ACTIVE_START": 5610,        # 활성 이상 징후 (0/1), 10개

    # 개별 장비 전력 (Write)
    "AI_EQUIPMENT_POWER_START": 5620,        # 개별 장비 실제 전력 (kW × 10), 10개
}

# VFD 예방진단 임계값 (4단계 중증도 기준)
VFD_DIAGNOSIS_THRESHOLDS = {
    # Motor Thermal (%)
    "motor_thermal": {
        "normal": 80,      # < 80%: 정상
        "attention": 90,   # 80-90%: 주의
        "warning": 100,    # 90-100%: 경고
        # > 100%: 위험
    },
    # Heatsink Temperature (°C)
    "heatsink_temp": {
        "normal": 60,      # < 60°C: 정상
        "attention": 70,   # 60-70°C: 주의
        "warning": 80,     # 70-80°C: 경고
        # > 80°C: 위험
    },
    # Inverter Thermal (%)
    "inverter_thermal": {
        "normal": 80,
        "attention": 90,
        "warning": 100,
    },
    # Motor Current (정격 대비 %)
    "motor_current_ratio": {
        "normal": 90,      # < 90%: 정상
        "attention": 100,  # 90-100%: 주의
        "warning": 110,    # 100-110%: 경고
        # > 110%: 위험
    },
    # 3상 불평형률 (%)
    "current_imbalance": {
        "normal": 5,       # < 5%: 정상
        "attention": 10,   # 5-10%: 주의
        "warning": 15,     # 10-15%: 경고
        # > 15%: 위험
    },
}

# 종합 점수 기준
VFD_SEVERITY_LEVELS = {
    "normal": (0, 2),      # 0-2점: 정상 운전
    "attention": (3, 5),   # 3-5점: 모니터링 강화
    "planning": (6, 8),    # 6-8점: 정비 계획 수립
    "critical": (9, 100),  # 9점 이상: 즉시 점검 필요
}

# AI 목표 주파수 기본값 (Hz)
AI_TARGET_FREQUENCY = {
    "SWP": 48.4,
    "FWP": 48.4,
    "FAN": 47.3,
}

# 전기요금 단가 (원/kWh)
ELECTRICITY_RATE = 120.0  # 산업용 평균 단가

# 로그 설정
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", "edge_ai.log")

# 모터 용량 설정 파일 경로
MOTOR_CAPACITY_FILE = os.path.join(os.path.dirname(__file__), "config", "motor_capacity.json")

def load_motor_capacity():
    """모터 용량 설정 로드"""
    import json
    if os.path.exists(MOTOR_CAPACITY_FILE):
        try:
            with open(MOTOR_CAPACITY_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            print(f"모터 용량 설정 로드 실패: {e}")
    return MOTOR_CAPACITY.copy()

def save_motor_capacity(capacity_dict):
    """모터 용량 설정 저장"""
    import json
    os.makedirs(os.path.dirname(MOTOR_CAPACITY_FILE), exist_ok=True)
    try:
        with open(MOTOR_CAPACITY_FILE, 'w', encoding='utf-8') as f:
            json.dump(capacity_dict, f, ensure_ascii=False, indent=2)
        # 전역 변수 업데이트
        global MOTOR_CAPACITY
        MOTOR_CAPACITY = capacity_dict.copy()
        return True
    except Exception as e:
        print(f"모터 용량 설정 저장 실패: {e}")
        return False

# 시작 시 모터 용량 로드
MOTOR_CAPACITY = load_motor_capacity()
