#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
pymodbus API 테스트
"""

import sys
import inspect

print("=" * 60)
print("  pymodbus API 분석")
print("=" * 60)

# pymodbus 버전 확인
try:
    import pymodbus
    print(f"\n✅ pymodbus 버전: {pymodbus.__version__}")
except Exception as e:
    print(f"\n❌ pymodbus 임포트 실패: {e}")
    sys.exit(1)

# ModbusTcpClient 임포트
try:
    from pymodbus.client import ModbusTcpClient
    print("✅ pymodbus.client.ModbusTcpClient 임포트 성공")
except ImportError:
    try:
        from pymodbus.client.sync import ModbusTcpClient
        print("✅ pymodbus.client.sync.ModbusTcpClient 임포트 성공")
    except ImportError as e:
        print(f"❌ ModbusTcpClient 임포트 실패: {e}")
        sys.exit(1)

# read_holding_registers 메소드 시그니처 확인
print("\n[분석] read_holding_registers 메소드 시그니처:")
sig = inspect.signature(ModbusTcpClient.read_holding_registers)
print(f"  {sig}")

print("\n[분석] 파라미터 목록:")
for param_name, param in sig.parameters.items():
    print(f"  - {param_name}: {param.annotation if param.annotation != inspect.Parameter.empty else 'Any'}")
    if param.default != inspect.Parameter.empty:
        print(f"    (기본값: {param.default})")

# 실제 연결 테스트 (파라미터 없이)
print("\n[테스트] 파라미터 없이 연결...")
try:
    client = ModbusTcpClient(host="127.0.0.1", port=502)
    connected = client.connect()
    print(f"  연결: {connected}")

    if connected:
        # slave/unit 파라미터 없이 시도
        print("\n[테스트] slave/unit 파라미터 없이 읽기...")
        try:
            result = client.read_holding_registers(address=10, count=10)
            print(f"  ✅ 성공! 타입: {type(result)}")
            if hasattr(result, 'registers'):
                print(f"  레지스터: {result.registers[:3]}...")
        except Exception as e:
            print(f"  ❌ 실패: {e}")

        # slave=3 시도
        print("\n[테스트] slave=3...")
        try:
            result = client.read_holding_registers(address=10, count=10, slave=3)
            print(f"  ✅ 성공!")
            if hasattr(result, 'registers'):
                print(f"  레지스터: {result.registers[:3]}...")
        except TypeError as e:
            print(f"  ❌ TypeError: {e}")
        except Exception as e:
            print(f"  ❌ 기타 오류: {e}")

        client.close()

except Exception as e:
    print(f"❌ 테스트 실패: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
