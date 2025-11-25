#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PLC 연결 진단 테스트
"""

import sys

print("=" * 60)
print("  PLC 연결 진단 테스트")
print("=" * 60)

# pymodbus 버전 확인
try:
    import pymodbus
    print(f"\n✅ pymodbus 버전: {pymodbus.__version__}")
except Exception as e:
    print(f"\n❌ pymodbus 임포트 실패: {e}")
    sys.exit(1)

# pymodbus.client 임포트 테스트
try:
    from pymodbus.client import ModbusTcpClient
    print("✅ pymodbus.client.ModbusTcpClient 임포트 성공 (3.x)")
except ImportError:
    try:
        from pymodbus.client.sync import ModbusTcpClient
        print("✅ pymodbus.client.sync.ModbusTcpClient 임포트 성공 (2.x)")
    except ImportError as e:
        print(f"❌ ModbusTcpClient 임포트 실패: {e}")
        sys.exit(1)

# 연결 테스트
print("\n[테스트 1] PLC 연결 시도...")
print(f"  대상: 127.0.0.1:502")

try:
    client = ModbusTcpClient(host="127.0.0.1", port=502, timeout=3)
    connected = client.connect()

    print(f"  연결 결과: {connected}")
    print(f"  클라이언트 객체: {client}")

    if connected:
        print("\n✅ PLC 연결 성공!")

        # 레지스터 읽기 테스트
        print("\n[테스트 2] 레지스터 읽기 테스트...")
        print("  주소: 10, 개수: 10, Slave ID: 3")

        try:
            # pymodbus 3.x는 unit 파라미터 사용
            result = client.read_holding_registers(
                address=10,
                count=10,
                unit=3
            )

            print(f"  결과 타입: {type(result)}")
            print(f"  결과 내용: {result}")

            # 에러 체크
            if hasattr(result, 'isError'):
                if result.isError():
                    print(f"  ❌ 에러 발생!")
                    print(f"     에러 내용: {result}")
                else:
                    print(f"  ✅ 읽기 성공!")
                    print(f"     레지스터 값: {result.registers}")
            else:
                print(f"  결과에 isError() 메소드 없음")
                if hasattr(result, 'registers'):
                    print(f"  ✅ 읽기 성공!")
                    print(f"     레지스터 값: {result.registers}")

        except Exception as e:
            print(f"  ❌ 읽기 실패: {e}")
            import traceback
            traceback.print_exc()

        # 다른 slave ID 테스트
        print("\n[테스트 3] Slave ID 1로 재시도...")
        try:
            result = client.read_holding_registers(
                address=10,
                count=10,
                unit=1
            )
            print(f"  결과: {result}")
            if hasattr(result, 'registers'):
                print(f"  ✅ Slave ID 1 성공! 레지스터: {result.registers}")
        except Exception as e:
            print(f"  ❌ Slave ID 1 실패: {e}")

        # 주소 0부터 테스트
        print("\n[테스트 4] 주소 0부터 읽기...")
        try:
            result = client.read_holding_registers(
                address=0,
                count=10,
                unit=3
            )
            print(f"  결과: {result}")
            if hasattr(result, 'registers'):
                print(f"  ✅ 주소 0 성공! 레지스터: {result.registers}")
        except Exception as e:
            print(f"  ❌ 주소 0 실패: {e}")

        client.close()
        print("\n✅ 연결 종료")

    else:
        print("\n❌ PLC 연결 실패")
        print("   PLC Simulator가 실행 중인지 확인하세요")

except Exception as e:
    print(f"\n❌ 연결 오류: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
