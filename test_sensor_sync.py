#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
두 대시보드의 센서값 동시 확인 테스트
"""

import sys
sys.path.insert(0, 'C:\\Users\\my\\Desktop\\Edge_Computer_V1')

from modbus_client import EdgeModbusClient
import time

def main():
    # PLC 클라이언트 연결
    plc = EdgeModbusClient()

    if not plc.connect():
        print("[ERROR] PLC 연결 실패")
        return

    print("=" * 80)
    print("PLC 센서값 동시 읽기 테스트")
    print("=" * 80)

    # 5회 연속 읽기
    for i in range(5):
        print(f"\n[읽기 #{i+1}] {time.strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 80)

        sensors = plc.read_sensors()

        if sensors:
            print(f"TX1 (CSW PP Disc):    {sensors['TX1']:.1f}°C")
            print(f"TX2 (CSW PP Suc):     {sensors['TX2']:.1f}°C")
            print(f"TX3 (FW CLNG In):     {sensors['TX3']:.1f}°C")
            print(f"TX4 (FW CLNG Out):    {sensors['TX4']:.1f}°C")
            print(f"TX5 (ESS Batt):       {sensors['TX5']:.1f}°C  [TARGET]")
            print(f"TX6 (E/R Inside):     {sensors['TX6']:.1f}°C")
            print(f"TX7 (E/R Outside):    {sensors['TX7']:.1f}°C")
            print(f"DPX1 (CSW PP Disc):   {sensors['DPX1']:.2f} kg/cm²")
            print(f"DPX2 (E/R Diff):      {sensors['DPX2']:.1f} Pa")
            print(f"PU1 (M/E Load):       {sensors['PU1']:.1f}%")
        else:
            print("[ERROR] 센서값 읽기 실패")

        if i < 4:  # 마지막 읽기가 아니면 대기
            time.sleep(2)

    plc.disconnect()
    print("\n" + "=" * 80)
    print("테스트 완료")
    print("=" * 80)

if __name__ == "__main__":
    main()
