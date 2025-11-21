#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge AI Computer - 메인 실행 프로그램
PLC에서 센서 데이터 읽기 → AI 계산 → PLC로 결과 쓰기

실행 방법:
    python main.py
    또는
    START.bat
"""

import sys
import io
import time
import signal
from datetime import datetime

# Windows 콘솔 인코딩 문제 해결
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

from modbus_client import EdgeModbusClient
from ai_calculator import EdgeAICalculator
import config


class EdgeAISystem:
    """Edge AI 시스템 메인 클래스"""

    def __init__(self):
        self.running = True
        self.plc = EdgeModbusClient(config.PLC_HOST, config.PLC_PORT, config.PLC_SLAVE_ID)
        self.ai = EdgeAICalculator()
        self.cycle_count = 0

        # Ctrl+C 처리
        signal.signal(signal.SIGINT, self.signal_handler)

        print("=" * 70)
        print("  Edge AI Computer 시작")
        print("  AI 계산 및 PLC 통신 시스템")
        print("=" * 70)
        print(f"  PLC 주소: {config.PLC_HOST}:{config.PLC_PORT}")
        print(f"  업데이트 주기: {config.UPDATE_INTERVAL}초")
        print("=" * 70)

    def signal_handler(self, signum, frame):
        """Ctrl+C 처리"""
        print("\n\n[종료] 사용자가 중단했습니다 (Ctrl+C)")
        self.running = False

    def run(self):
        """메인 실행 루프"""

        # PLC 연결
        if not self.plc.connect():
            print("[ERROR] PLC 연결 실패. 프로그램을 종료합니다.")
            print("[INFO] PLC Simulator가 실행 중인지 확인하세요.")
            return

        print(f"\n[시작] AI 계산 루프 시작 ({config.UPDATE_INTERVAL}초 주기)")
        print("[INFO] 종료: Ctrl+C\n")

        last_status_time = time.time()

        while self.running:
            try:
                cycle_start = time.time()
                self.cycle_count += 1

                # ===== Step 1: PLC에서 센서 데이터 읽기 =====
                sensors = self.plc.read_sensors()
                if sensors is None:
                    print("[WARNING] 센서 데이터 읽기 실패. 재시도...")
                    time.sleep(config.UPDATE_INTERVAL)
                    continue

                # ===== Step 2: PLC에서 장비 상태 읽기 =====
                equipment = self.plc.read_equipment_status()
                if equipment is None:
                    print("[WARNING] 장비 데이터 읽기 실패. 재시도...")
                    time.sleep(config.UPDATE_INTERVAL)
                    continue

                # ===== Step 3: AI 계산 수행 =====

                # 3-1. 에너지 절감 계산
                energy_savings = self.ai.calculate_energy_savings(equipment)

                # 3-2. AI 목표 주파수 계산
                ai_target_freq = self.ai.calculate_ai_target_frequency(equipment, sensors)

                # 3-3. 장비별 에너지 절감 상세
                energy_summary = self.ai.calculate_energy_savings_summary(equipment)

                # 3-4. VFD 진단
                vfd_diagnosis = self.ai.calculate_vfd_diagnosis(equipment, sensors)

                # ===== Step 4: PLC로 AI 계산 결과 전송 =====

                # 4-1. 목표 주파수 쓰기 (레지스터 5000-5009)
                target_frequencies = [item["target_frequency"] for item in ai_target_freq]
                self.plc.write_ai_target_frequency(target_frequencies)

                # 4-2. 에너지 절감 데이터 쓰기 (레지스터 5100-5109, 5300-5303)
                savings_data = {
                    "total_ratio": energy_savings["realtime"]["total"]["savings_rate"],
                    "swp_ratio": energy_savings["realtime"]["swp"]["savings_rate"],
                    "fwp_ratio": energy_savings["realtime"]["fwp"]["savings_rate"],
                    "fan_ratio": energy_savings["realtime"]["fan"]["savings_rate"],
                }
                # 각 장비별 절감 전력
                for i, summary in enumerate(energy_summary):
                    savings_data[f"equipment_{i}"] = summary["actual_power"]

                self.plc.write_energy_savings(savings_data)

                # 4-3. VFD 진단 점수 쓰기 (레지스터 5200-5209)
                self.plc.write_vfd_diagnosis(vfd_diagnosis)

                # ===== Step 5: 주기적 상태 출력 (10초마다) =====
                if time.time() - last_status_time >= 10:
                    self.print_status(energy_savings, ai_target_freq)
                    last_status_time = time.time()

                # ===== 주기 대기 =====
                cycle_elapsed = time.time() - cycle_start
                sleep_time = max(0, config.UPDATE_INTERVAL - cycle_elapsed)
                if sleep_time > 0:
                    time.sleep(sleep_time)

            except KeyboardInterrupt:
                print("\n[종료] Ctrl+C 감지")
                break

            except Exception as e:
                print(f"[ERROR] 예외 발생: {e}")
                import traceback
                traceback.print_exc()
                time.sleep(config.UPDATE_INTERVAL)

        # 종료 처리
        self.plc.disconnect()
        print("\n[완료] Edge AI 시스템 종료")

    def print_status(self, energy_savings, ai_target_freq):
        """주기적 상태 출력"""
        print("\n" + "=" * 70)
        print(f"[상태] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Cycle #{self.cycle_count}")
        print("-" * 70)

        # 에너지 절감 현황
        total = energy_savings["realtime"]["total"]
        print(f"💡 에너지 절감:")
        print(f"   실시간: {total['savings_kw']} kW ({total['savings_rate']}%)")
        print(f"   오늘 누적: {energy_savings['today']['total_kwh_saved']} kWh")
        print(f"   이번 달 누적: {energy_savings['month']['total_kwh_saved']} kWh")

        # AI 목표 주파수 (운전 중인 장비만)
        running_equipment = [eq for eq in ai_target_freq if eq["target_frequency"] > 0]
        if running_equipment:
            print(f"\n🎯 AI 목표 주파수 (운전 중: {len(running_equipment)}대):")
            for eq in running_equipment[:5]:  # 최대 5개만 출력
                print(f"   {eq['name']}: 목표={eq['target_frequency']}Hz, "
                      f"실제={eq['actual_frequency']}Hz, "
                      f"편차={eq['deviation']:+.2f}Hz ({eq['status']})")

        print("=" * 70)


def main():
    """메인 함수"""
    try:
        system = EdgeAISystem()
        system.run()

    except Exception as e:
        print(f"\n[FATAL ERROR] 시스템 오류: {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
