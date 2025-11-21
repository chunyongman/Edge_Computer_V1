#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge AI Computer 설정 파일
"""

import os

# PLC 연결 설정
PLC_HOST = os.getenv("PLC_HOST", "localhost")  # 기본값: localhost (같은 PC 테스트용)
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
    "AI_TARGET_FREQ_START": 5000,      # 목표 주파수 (Hz × 10)
    "AI_ENERGY_SAVINGS_START": 5100,   # 절감 전력 (kW × 10)
    "AI_VFD_DIAGNOSIS_START": 5200,    # VFD 진단 점수 (0-100)
    "AI_SYSTEM_SAVINGS_START": 5300,   # 시스템 절감률 (% × 10)
}

# AI 목표 주파수 기본값 (Hz)
AI_TARGET_FREQUENCY = {
    "SWP": 48.4,
    "FWP": 48.4,
    "FAN": 47.3,
}

# 로그 설정
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", "edge_ai.log")
