#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Modbus 연결 테스트 스크립트
"""

import sys
import io

# Windows 콘솔 인코딩 문제 해결
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

from pymodbus.client.sync import ModbusTcpClient
import time

print("=" * 70)
print("  Modbus TCP 연결 테스트")
print("=" * 70)

# 연결 테스트
client = ModbusTcpClient('localhost', port=502)

print("\n[TEST 1] PLC 연결 시도...")
connected = client.connect()

if connected:
    print("✅ 연결 성공!")

    # 센서 데이터 읽기 테스트
    print("\n[TEST 2] 센서 데이터 읽기 (레지스터 10-19)...")
    try:
        result = client.read_holding_registers(
            address=10,
            count=10,
            unit=3
        )

        if result.isError():
            print(f"❌ 읽기 실패: {result}")
        else:
            print("✅ 읽기 성공!")
            print(f"데이터: {result.registers}")

            # 실제 값으로 변환
            print("\n[센서 값]")
            print(f"  TX1: {result.registers[0] / 10.0}°C")
            print(f"  TX2: {result.registers[1] / 10.0}°C")
            print(f"  TX3: {result.registers[2] / 10.0}°C")
            print(f"  TX4: {result.registers[3] / 10.0}°C")
            print(f"  TX5: {result.registers[4] / 10.0}°C")
            print(f"  TX6: {result.registers[5] / 10.0}°C")
            print(f"  TX7: {result.registers[6] / 10.0}°C")
            print(f"  DPX1: {result.registers[7] / 4608.0} kg/cm²")
            print(f"  DPX2: {result.registers[8] / 10.0} Pa")
            print(f"  PU1: {result.registers[9] / 276.48}%")

    except Exception as e:
        print(f"❌ 예외 발생: {e}")

    # 장비 상태 읽기 테스트
    print("\n[TEST 3] 장비 상태 읽기 (레지스터 4000-4001)...")
    try:
        result = client.read_holding_registers(
            address=4000,
            count=2,
            unit=3
        )

        if result.isError():
            print(f"❌ 읽기 실패: {result}")
        else:
            print("✅ 읽기 성공!")
            print(f"데이터: {result.registers}")

    except Exception as e:
        print(f"❌ 예외 발생: {e}")

    # VFD 데이터 읽기 테스트
    print("\n[TEST 4] VFD 데이터 읽기 (레지스터 160-167)...")
    try:
        result = client.read_holding_registers(
            address=160,
            count=8,
            unit=3
        )

        if result.isError():
            print(f"❌ 읽기 실패: {result}")
        else:
            print("✅ 읽기 성공!")
            print(f"데이터: {result.registers}")
            print(f"  SWP1 주파수: {result.registers[0] / 10.0} Hz")
            print(f"  SWP1 전력: {result.registers[1]} kW")

    except Exception as e:
        print(f"❌ 예외 발생: {e}")

    client.close()
    print("\n✅ 모든 테스트 완료!")

else:
    print("❌ 연결 실패!")

print("=" * 70)
