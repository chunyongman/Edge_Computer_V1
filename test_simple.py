#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import io

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

print("Test 1: Basic print")
print("=" * 70)
print("Test 2: Korean 한글 테스트")
print("Test 3: Emoji ✅ 🎯 💡")

import config
print(f"Test 4: Config loaded: PLC_HOST={config.PLC_HOST}")

from modbus_client import EdgeModbusClient
print("Test 5: modbus_client imported")

from ai_calculator import EdgeAICalculator
print("Test 6: ai_calculator imported")

plc = EdgeModbusClient(config.PLC_HOST, config.PLC_PORT, config.PLC_SLAVE_ID)
print("Test 7: EdgeModbusClient created")

ai = EdgeAICalculator()
print("Test 8: EdgeAICalculator created")

print("\n✅ All tests passed!")
