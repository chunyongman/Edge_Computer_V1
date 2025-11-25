#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
대시보드 센서 읽기 테스트
"""

import sys
sys.path.insert(0, 'C:\\Users\\my\\Desktop\\Edge_Computer_V1')

from modbus_client import EdgeModbusClient
import config
import time

print("=" * 80)
print("대시보드 센서 읽기 시뮬레이션")
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

    # 10회 연속 읽기 (30초, 3초 간격 - Streamlit 자동 새로고침과 동일)
    for i in range(10):
        print(f"[읽기 #{i+1}] {time.strftime('%H:%M:%S')}")
        print("-" * 80)

        sensors = plc_client.read_sensors()
        if sensors:
            T1 = sensors.get('TX1', 0)
            T2 = sensors.get('TX2', 0)
            T3 = sensors.get('TX3', 0)
            T4 = sensors.get('TX4', 0)
            T5 = sensors.get('TX5', 0)
            T6 = sensors.get('TX6', 0)
            T7 = sensors.get('TX7', 0)
            PX1 = sensors.get('DPX1', 0)
            ME = sensors.get('PU1', 0)

            print(f"TX1 (바닷물 유입):     {T1:.1f}°C")
            print(f"TX2 (NO.1 냉각수 출구): {T2:.1f}°C")
            print(f"TX3 (NO.2 냉각수 출구): {T3:.1f}°C")
            print(f"TX4 (담수 입구):       {T4:.1f}°C")
            print(f"TX5 (담수 출구):       {T5:.1f}°C  [TARGET]")
            print(f"TX6 (기관실 내부):     {T6:.1f}°C  [TARGET]")
            print(f"TX7 (기관실 외부):     {T7:.1f}°C")
            print(f"PX1 (압력):           {PX1:.2f} BAR")
            print(f"M/E (부하):           {ME:.1f}%")
        else:
            print("[ERROR] 센서값 읽기 실패")

        print()

        if i < 9:
            time.sleep(3)  # 3초 대기 (Streamlit 자동 새로고침 주기와 동일)

    plc_client.disconnect()
    print("=" * 80)
    print("테스트 완료")
    print("=" * 80)
else:
    print(f"[ERROR] PLC 연결 실패: {config.PLC_HOST}:{config.PLC_PORT}")
