#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""PLC 연결 및 VFD 데이터 읽기 테스트"""

from pymodbus.client import ModbusTcpClient
import config

def test_connection():
    print("=" * 60)
    print("PLC 연결 테스트")
    print("=" * 60)

    client = ModbusTcpClient(host=config.PLC_HOST, port=config.PLC_PORT, timeout=5)
    connected = client.connect()

    print(f"PLC 주소: {config.PLC_HOST}:{config.PLC_PORT}")
    print(f"Slave ID: {config.PLC_SLAVE_ID}")
    print(f"연결 상태: {'성공' if connected else '실패'}")

    if not connected:
        print("ERROR: PLC에 연결할 수 없습니다!")
        return

    # 센서 데이터 읽기
    print("\n[센서 데이터 읽기]")
    result = client.read_holding_registers(
        address=config.MODBUS_REGISTERS["SENSORS_START"],
        count=config.MODBUS_REGISTERS["SENSORS_COUNT"],
        device_id=config.PLC_SLAVE_ID
    )

    if result.isError():
        print(f"ERROR: 센서 데이터 읽기 실패: {result}")
    else:
        print(f"센서 레지스터 (10-19): {result.registers}")

    # VFD 데이터 읽기 (160-359) - Modbus 125개 제한으로 두 번 읽기
    print("\n[VFD 데이터 읽기 - 레지스터 160-359]")
    vfd_start = config.MODBUS_REGISTERS["VFD_DATA_START"]
    regs_per_equip = config.MODBUS_REGISTERS["VFD_DATA_PER_EQUIPMENT"]

    print(f"VFD 시작 주소: {vfd_start}")
    print(f"장비당 레지스터 수: {regs_per_equip}")

    # 첫 번째 읽기: 장비 0-5 (120 레지스터)
    result1 = client.read_holding_registers(
        address=vfd_start,
        count=6 * regs_per_equip,
        device_id=config.PLC_SLAVE_ID
    )

    # 두 번째 읽기: 장비 6-9 (80 레지스터)
    result2 = client.read_holding_registers(
        address=vfd_start + 6 * regs_per_equip,
        count=4 * regs_per_equip,
        device_id=config.PLC_SLAVE_ID
    )

    if result1.isError() or result2.isError():
        print(f"ERROR: VFD 데이터 읽기 실패")
    else:
        vfd_registers = result1.registers + result2.registers
        print(f"VFD 전체 레지스터 수: {len(vfd_registers)}")

        # 각 장비별 데이터 출력
        for i, eq_name in enumerate(config.EQUIPMENT_LIST):
            offset = i * 20
            vfd_data = vfd_registers[offset:offset+20]

            freq = vfd_data[0] / 10.0
            power = vfd_data[1]
            motor_current = vfd_data[3] / 10.0
            motor_thermal = vfd_data[4]
            heatsink_temp = vfd_data[5]

            print(f"  {eq_name}: freq={freq:.1f}Hz, power={power}kW, "
                  f"current={motor_current:.1f}A, thermal={motor_thermal}%, "
                  f"heatsink={heatsink_temp}°C")

    # 장비 상태 읽기 (4000-4001)
    print("\n[장비 상태 읽기 - 레지스터 4000-4001]")
    result = client.read_holding_registers(
        address=config.MODBUS_REGISTERS["EQUIPMENT_STATUS_START"],
        count=config.MODBUS_REGISTERS["EQUIPMENT_STATUS_COUNT"],
        device_id=config.PLC_SLAVE_ID
    )

    if result.isError():
        print(f"ERROR: 장비 상태 읽기 실패: {result}")
    else:
        print(f"장비 상태: {result.registers}")
        status_word0 = result.registers[0]
        status_word1 = result.registers[1]
        print(f"  Word0 (bin): {bin(status_word0)}")
        print(f"  Word1 (bin): {bin(status_word1)}")

    client.close()
    print("\n테스트 완료")

if __name__ == "__main__":
    test_connection()
