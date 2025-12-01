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

# 모터 정격 용량 (kW)
MOTOR_CAPACITY = {
    "SWP": 132.0,  # Sea Water Pump
    "FWP": 75.0,   # Fresh Water Pump
    "FAN": 54.3,   # E/R Fan
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

    # VFD 운전 데이터
    "VFD_DATA_START": 160,
    "VFD_DATA_PER_EQUIPMENT": 8,

    # Edge AI 결과 저장 영역 (Write)
    "AI_TARGET_FREQ_START": 5000,      # 목표 주파수 (Hz × 10), 10개
    "AI_ENERGY_SAVINGS_START": 5100,   # 절감 전력 (kW × 10), 10개
    "AI_VFD_DIAGNOSIS_START": 5200,    # VFD 진단 점수 (0-100), 10개
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
