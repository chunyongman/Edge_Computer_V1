"""PLC 데이터 읽기 테스트"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from modbus_client import EdgeModbusClient
import config

def main():
    print("=" * 60)
    print("  PLC 데이터 읽기 테스트")
    print("=" * 60)

    # Modbus 클라이언트 생성
    client = EdgeModbusClient(
        host="localhost",
        port=502,
        slave_id=3
    )

    # 연결
    print("\n[1단계] PLC 연결 중...")
    if not client.connect():
        print("ERROR: PLC 연결 실패!")
        return
    print("OK: PLC 연결 성공!")

    # 센서 데이터 읽기
    print("\n[2단계] 센서 데이터 읽기...")
    sensors = client.read_sensors()
    if sensors:
        print("OK: 센서 데이터 읽기 성공!")
        print(f"  TX4: {sensors.get('TX4', 'N/A')}")
        print(f"  TX5: {sensors.get('TX5', 'N/A')}")
        print(f"  TX6: {sensors.get('TX6', 'N/A')}")
        print(f"  TX7: {sensors.get('TX7', 'N/A')}")
    else:
        print("ERROR: 센서 데이터 읽기 실패!")

    # 장비 상태 읽기
    print("\n[3단계] 장비 상태 읽기...")
    equipment = client.read_equipment_status()
    if equipment:
        print(f"OK: 장비 상태 읽기 성공! (총 {len(equipment)}대)")
        for eq in equipment[:3]:  # 처음 3개만 출력
            print(f"  {eq['name']}: {eq.get('frequency', 0):.1f} Hz, {eq.get('power', 0):.1f} kW")
    else:
        print("ERROR: 장비 상태 읽기 실패!")

    # AI 목표 주파수 읽기
    print("\n[4단계] AI 목표 주파수 읽기 (레지스터 5000-5009)...")
    try:
        target_freq_raw = client.read_holding_registers(
            config.MODBUS_REGISTERS["AI_TARGET_FREQ_START"],
            10
        )
        if target_freq_raw:
            target_frequencies = [f / 10.0 for f in target_freq_raw]
            print(f"OK: 목표 주파수 읽기 성공!")
            print(f"  SWP: {target_frequencies[0]:.1f} Hz")
            print(f"  FWP: {target_frequencies[3]:.1f} Hz")
            print(f"  FAN: {target_frequencies[6]:.1f} Hz")
        else:
            print("ERROR: 목표 주파수 읽기 실패!")
    except Exception as e:
        print(f"ERROR: {e}")

    # 연결 해제
    client.disconnect()
    print("\n[완료] 테스트 종료")
    print("=" * 60)

if __name__ == "__main__":
    main()
