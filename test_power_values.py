#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
실시간 전력값 전송 테스트
Edge Computer → PLC → HMI 데이터 흐름 검증
"""

import sys
sys.path.insert(0, 'C:\\Users\\my\\Desktop\\Edge_Computer_V1')

from modbus_client import EdgeModbusClient
import config
import time

print("=" * 80)
print("실시간 전력값 PLC 전송 테스트")
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

    # 테스트 데이터 (Edge AI Calculator가 계산하는 형태)
    test_savings_data = {
        # 시스템 절감률 (%)
        "total_ratio": 45.5,
        "swp_ratio": 48.5,
        "fwp_ratio": 52.3,
        "fan_ratio": 53.1,

        # 개별 장비 절감 전력 (kW)
        "equipment_0": 64.0,  # SWP1
        "equipment_1": 64.0,  # SWP2
        "equipment_2": 64.1,  # SWP3
        "equipment_3": 39.2,  # FWP1
        "equipment_4": 39.3,  # FWP2
        "equipment_5": 39.2,  # FWP3
        "equipment_6": 28.9,  # FAN1
        "equipment_7": 28.8,  # FAN2
        "equipment_8": 28.9,  # FAN3
        "equipment_9": 28.8,  # FAN4

        # 누적 절감량 (kWh)
        "today_kwh": 123.4,
        "month_kwh": 3456.7,

        # 60Hz 고정 전력 (kW) - NEW!
        "total_power_60hz": 838.2,
        "swp_power_60hz": 396.0,
        "fwp_power_60hz": 225.0,
        "fan_power_60hz": 217.2,

        # VFD 가변 전력 (kW) - NEW!
        "total_power_vfd": 456.8,
        "swp_power_vfd": 203.9,
        "fwp_power_vfd": 107.5,
        "fan_power_vfd": 101.9,

        # 절감 전력 (kW) - NEW!
        "total_savings_kw": 381.4,
        "swp_savings_kw": 192.1,
        "fwp_savings_kw": 117.5,
        "fan_savings_kw": 115.3,
    }

    print("[테스트] PLC에 에너지 절감 데이터 쓰기...")
    print("-" * 80)

    # PLC에 쓰기
    success = plc_client.write_energy_savings(test_savings_data)

    if success:
        print("[OK] 데이터 쓰기 성공\n")

        print("전송된 데이터:")
        print(f"  시스템 절감률:")
        print(f"    - Total: {test_savings_data['total_ratio']:.1f}%")
        print(f"    - SWP:   {test_savings_data['swp_ratio']:.1f}%")
        print(f"    - FWP:   {test_savings_data['fwp_ratio']:.1f}%")
        print(f"    - FAN:   {test_savings_data['fan_ratio']:.1f}%")
        print()

        print(f"  60Hz 고정 전력:")
        print(f"    - Total: {test_savings_data['total_power_60hz']:.1f} kW")
        print(f"    - SWP:   {test_savings_data['swp_power_60hz']:.1f} kW")
        print(f"    - FWP:   {test_savings_data['fwp_power_60hz']:.1f} kW")
        print(f"    - FAN:   {test_savings_data['fan_power_60hz']:.1f} kW")
        print()

        print(f"  VFD 가변 전력:")
        print(f"    - Total: {test_savings_data['total_power_vfd']:.1f} kW")
        print(f"    - SWP:   {test_savings_data['swp_power_vfd']:.1f} kW")
        print(f"    - FWP:   {test_savings_data['fwp_power_vfd']:.1f} kW")
        print(f"    - FAN:   {test_savings_data['fan_power_vfd']:.1f} kW")
        print()

        print(f"  절감 전력:")
        print(f"    - Total: {test_savings_data['total_savings_kw']:.1f} kW")
        print(f"    - SWP:   {test_savings_data['swp_savings_kw']:.1f} kW")
        print(f"    - FWP:   {test_savings_data['fwp_savings_kw']:.1f} kW")
        print(f"    - FAN:   {test_savings_data['fan_savings_kw']:.1f} kW")
        print()

        print(f"  누적 절감량:")
        print(f"    - 오늘:   {test_savings_data['today_kwh']:.1f} kWh")
        print(f"    - 이번달: {test_savings_data['month_kwh']:.1f} kWh")

    else:
        print("[ERROR] 데이터 쓰기 실패")

    plc_client.disconnect()
    print("\n" + "=" * 80)
    print("테스트 완료")
    print("=" * 80)
    print("\n다음 단계:")
    print("1. HMI 대시보드 (localhost:5173)를 열어서 '실시간 순간 절감률' 확인")
    print("2. '60Hz 고정'과 'VFD 가변' 값이 0이 아닌 실제 kW 값으로 표시되는지 확인")

else:
    print(f"[ERROR] PLC 연결 실패: {config.PLC_HOST}:{config.PLC_PORT}")
    print("\nPLC Simulator가 실행 중인지 확인하세요.")
