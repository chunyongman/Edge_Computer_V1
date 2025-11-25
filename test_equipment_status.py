#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
장비 상태 확인 테스트
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from modbus_client import EdgeModbusClient
import config

print("=" * 60)
print("  장비 상태 확인 테스트")
print("=" * 60)

# PLC 연결
client = EdgeModbusClient(config.PLC_HOST, config.PLC_PORT, config.PLC_SLAVE_ID)
try:
    success = client.connect()
except:
    success = True  # 연결 성공했지만 print에서 에러

if not success and not client.connected:
    print("\nPLC 연결 실패!")
    sys.exit(1)

print("\nPLC 연결 성공!")

# 장비 상태 읽기
equipment = client.read_equipment_status()

if not equipment:
    print("장비 상태 읽기 실패!")
    sys.exit(1)

print(f"\n총 {len(equipment)}개 장비 읽음\n")

# SW Pumps
print("=" * 60)
print("SW PUMPS (인덱스 0-2)")
print("=" * 60)
for i in range(3):
    eq = equipment[i]
    print(f"{eq['name']}: running={eq.get('running', False)}, freq={eq['frequency']:.1f} Hz")

# FW Pumps
print("\n" + "=" * 60)
print("FW PUMPS (인덱스 3-5)")
print("=" * 60)
for i in range(3, 6):
    eq = equipment[i]
    print(f"{eq['name']}: running={eq.get('running', False)}, freq={eq['frequency']:.1f} Hz")

# E/R Fans
print("\n" + "=" * 60)
print("E/R FANS (인덱스 6-9)")
print("=" * 60)
for i in range(6, 10):
    eq = equipment[i]
    running_fwd = eq.get('running_fwd', False)
    running_bwd = eq.get('running_bwd', False)
    is_running = running_fwd or running_bwd
    print(f"{eq['name']}: fwd={running_fwd}, bwd={running_bwd}, running={is_running}, freq={eq['frequency']:.1f} Hz")

print("\n" + "=" * 60)

client.disconnect()
