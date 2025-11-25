#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PLC 목표 주파수 레지스터 읽기 테스트
레지스터 5000-5009의 실제 값을 확인
"""

import sys
sys.path.insert(0, 'C:\\Users\\my\\Desktop\\Edge_Computer_V1')

from modbus_client import EdgeModbusClient
import config

print("=" * 80)
print("PLC 목표 주파수 레지스터 읽기 테스트")
print("=" * 80)

# PLC 클라이언트 초기화
plc_client = EdgeModbusClient(
    config.PLC_HOST,
    config.PLC_PORT,
    config.PLC_SLAVE_ID
)

# 연결
if plc_client.connect():
    print(f"[OK] PLC 연결 성공: {config.PLC_HOST}:{config.PLC_PORT}\n")

    # 레지스터 5000-5009 읽기 (AI 목표 주파수)
    print("[읽기] 레지스터 5000-5009 (AI 목표 주파수)")
    print("-" * 80)

    # EdgeModbusClient는 내부 client를 사용
    result = plc_client.client.read_holding_registers(
        address=5000,
        count=10,
        unit=plc_client.slave_id
    )

    target_raw = None
    if result and not result.isError():
        target_raw = result.registers
    else:
        print(f"[ERROR] 레지스터 읽기 오류: {result}")

    if target_raw:
        print("원본 레지스터 값 (× 10 스케일):")
        for i, val in enumerate(target_raw):
            print(f"  레지스터 {5000+i}: {val}")

        print("\n실제 주파수 값 (÷ 10):")
        equipment_names = [
            "SWP1", "SWP2", "SWP3",
            "FWP1", "FWP2", "FWP3",
            "FAN1", "FAN2", "FAN3", "FAN4"
        ]

        for i, val in enumerate(target_raw):
            freq = val / 10.0
            print(f"  {equipment_names[i]}: {freq:.1f} Hz")
    else:
        print("[ERROR] 레지스터 읽기 실패")

    print("\n" + "=" * 80)
    print("예상 값:")
    print("  SWP1-3: 48.4 Hz (레지스터 값 484)")
    print("  FWP1-3: 48.4 Hz (레지스터 값 484)")
    print("  FAN1-4: 47.3 Hz (레지스터 값 473)")
    print("=" * 80)

    plc_client.disconnect()
else:
    print(f"[ERROR] PLC 연결 실패: {config.PLC_HOST}:{config.PLC_PORT}")
