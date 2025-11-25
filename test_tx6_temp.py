#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TX6 온도 실시간 모니터링 테스트
PLC Simulator의 TX6 온도를 확인하여 AI 계산이 올바른지 검증
"""

import sys
sys.path.insert(0, 'C:\\Users\\my\\Desktop\\Edge_Computer_V1')

from modbus_client import EdgeModbusClient
import config
import time

print("=" * 80)
print("TX6 온도 실시간 모니터링")
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

    print("10초간 TX6 온도 모니터링 중...")
    print("-" * 80)

    for i in range(10):
        # 센서 데이터 읽기
        sensors = plc_client.read_sensors()

        if sensors:
            tx6_temp = sensors.get('TX6', 0)
            print(f"[{i+1}/10] TX6 온도: {tx6_temp:.1f}°C")
        else:
            print(f"[{i+1}/10] 센서 읽기 실패")

        time.sleep(1)

    print("-" * 80)
    print("\n기대값:")
    print("  정상 범위: 33-37°C (base 35°C ± 2°C)")
    print("  만약 40°C 이상이면: PLC Simulator를 재시작해야 함")
    print("=" * 80)

    plc_client.disconnect()
else:
    print(f"[ERROR] PLC 연결 실패: {config.PLC_HOST}:{config.PLC_PORT}")
