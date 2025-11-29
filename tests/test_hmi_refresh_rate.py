#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
인증 시험 #3: HMI 실시간 반영주기 검증
- 센서 입력 변화 후 HMI 표시까지의 시간 측정
- 100회 측정하여 평균 반영 주기 산출

테스트 구성:
- PLC 시뮬레이터에 센서값 변경 (T1 타임스탬프)
- HMI가 사용하는 동일 방식으로 PLC 데이터 읽기 (T2 타임스탬프)
- 반영 시간 = T2 - T1
- 100회 반복 측정

합격 기준:
- 평균 반영 주기 >= 1.0초
"""

import sys
import io
import os
import time
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass
from typing import List, Dict, Optional
import random
import pandas as pd

# Windows 환경에서 UTF-8 출력 설정
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# 프로젝트 루트 추가
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from config import UPDATE_INTERVAL


@dataclass
class RefreshMeasurement:
    """반영 시간 측정 결과"""
    test_id: int
    sensor_name: str
    value_before: float
    value_after: float
    write_time: float  # PLC에 쓴 시간
    read_time: float   # HMI가 읽은 시간
    refresh_time: float  # 반영 시간 (read_time - write_time)
    value_matched: bool  # 값이 일치하는지
    passed: bool


class PLCSimulatorClient:
    """PLC 시뮬레이터 클라이언트 (테스트용)"""

    def __init__(self, host: str = "127.0.0.1", port: int = 502):
        self.host = host
        self.port = port
        self.client = None
        self.connected = False

    def connect(self) -> bool:
        """PLC 연결"""
        try:
            from pymodbus.client.sync import ModbusTcpClient
            self.client = ModbusTcpClient(self.host, port=self.port)
            self.connected = self.client.connect()
            return self.connected
        except Exception as e:
            print(f"  PLC 연결 실패: {e}")
            return False

    def disconnect(self):
        """PLC 연결 해제"""
        if self.client:
            self.client.close()
            self.connected = False

    def write_sensor_value(self, register: int, value: float) -> bool:
        """센서값 쓰기 (x10 스케일링)"""
        if not self.connected:
            return False
        try:
            scaled_value = int(value * 10)
            result = self.client.write_register(register, scaled_value, unit=3)
            return not result.isError()
        except Exception as e:
            print(f"  센서값 쓰기 실패: {e}")
            return False

    def read_sensor_value(self, register: int) -> Optional[float]:
        """센서값 읽기 (x10 스케일링 복원)"""
        if not self.connected:
            return None
        try:
            result = self.client.read_holding_registers(register, 1, unit=3)
            if result.isError():
                return None
            return result.registers[0] / 10.0
        except Exception as e:
            print(f"  센서값 읽기 실패: {e}")
            return None

    def read_all_sensors(self) -> Optional[Dict[str, float]]:
        """모든 센서값 읽기"""
        if not self.connected:
            return None
        try:
            # 센서 레지스터 10번부터 10개
            result = self.client.read_holding_registers(10, 10, unit=3)
            if result.isError():
                return None

            sensors = {
                'TX1': result.registers[0] / 10.0,
                'TX2': result.registers[1] / 10.0,
                'TX3': result.registers[2] / 10.0,
                'TX4': result.registers[3] / 10.0,
                'TX5': result.registers[4] / 10.0,
                'TX6': result.registers[5] / 10.0,
                'TX7': result.registers[6] / 10.0,
                'PX1': result.registers[7] / 10.0,
                'PU1': result.registers[8] / 10.0,
                'reserved': result.registers[9] / 10.0,
            }
            return sensors
        except Exception as e:
            print(f"  센서 읽기 실패: {e}")
            return None


class HMIRefreshTester:
    """HMI 반영 주기 테스터"""

    # 센서 레지스터 맵핑 (레지스터 10번부터)
    SENSOR_REGISTERS = {
        'TX1': 10,  # 해수 입구 온도
        'TX2': 11,  # SW Cooler Outlet (Main)
        'TX3': 12,  # SW Cooler Outlet (Aux)
        'TX4': 13,  # FW Inlet
        'TX5': 14,  # Cooler FW Outlet
        'TX6': 15,  # Engine Room
        'TX7': 16,  # Outside Air
        'PX1': 17,  # 압력
        'PU1': 18,  # 엔진 부하
    }

    # 센서별 정상 범위
    SENSOR_RANGES = {
        'TX1': (20.0, 32.0),   # 해수 온도
        'TX2': (40.0, 50.0),   # SW Cooler Outlet
        'TX3': (40.0, 50.0),   # SW Cooler Outlet
        'TX4': (38.0, 48.0),   # FW Inlet
        'TX5': (30.0, 40.0),   # Cooler FW Outlet
        'TX6': (40.0, 47.0),   # Engine Room
        'TX7': (25.0, 35.0),   # Outside Air
        'PX1': (1.5, 3.5),     # 압력
        'PU1': (30.0, 90.0),   # 엔진 부하
    }

    def __init__(self):
        print("\n[초기화] HMI 반영 주기 테스터")
        print("-" * 50)

        self.plc_client = PLCSimulatorClient()
        self.measurements: List[RefreshMeasurement] = []
        self.test_count = 100

    def connect_plc(self) -> bool:
        """PLC 연결"""
        print("  PLC 시뮬레이터 연결 중...")
        if self.plc_client.connect():
            print("  OK PLC 연결 성공")
            return True
        else:
            print("  FAIL PLC 연결 실패")
            return False

    def disconnect_plc(self):
        """PLC 연결 해제"""
        self.plc_client.disconnect()
        print("  OK PLC 연결 해제")

    def generate_test_value(self, sensor: str) -> tuple:
        """테스트용 센서값 생성 (변경 전/후)"""
        min_val, max_val = self.SENSOR_RANGES[sensor]

        # 현재값에서 ±2~5 변화
        value_before = random.uniform(min_val, max_val)
        change = random.uniform(2.0, 5.0) * random.choice([-1, 1])
        value_after = max(min_val, min(max_val, value_before + change))

        return round(value_before, 1), round(value_after, 1)

    def measure_refresh_time(self, test_id: int) -> RefreshMeasurement:
        """
        단일 반영 시간 측정

        1. 센서 선택 (랜덤)
        2. 새 값 생성
        3. PLC에 쓰기 (T1 기록)
        4. PLC에서 읽기 반복 (값 변경 감지까지)
        5. 변경 감지 시간 (T2 기록)
        6. 반영 시간 = T2 - T1
        """
        # 1. 테스트할 센서 선택
        sensor = random.choice(list(self.SENSOR_REGISTERS.keys()))
        register = self.SENSOR_REGISTERS[sensor]

        # 2. 현재값 읽기
        current_value = self.plc_client.read_sensor_value(register)
        if current_value is None:
            current_value = 25.0  # 기본값

        # 3. 새 값 생성 (현재값과 다른 값)
        min_val, max_val = self.SENSOR_RANGES[sensor]
        change = random.uniform(2.0, 5.0) * random.choice([-1, 1])
        new_value = round(max(min_val, min(max_val, current_value + change)), 1)

        # 4. PLC에 새 값 쓰기 (T1 기록)
        write_time = time.time()
        write_success = self.plc_client.write_sensor_value(register, new_value)

        if not write_success:
            return RefreshMeasurement(
                test_id=test_id,
                sensor_name=sensor,
                value_before=current_value,
                value_after=new_value,
                write_time=write_time,
                read_time=write_time,
                refresh_time=0.0,
                value_matched=False,
                passed=False
            )

        # 5. 값 변경 감지까지 읽기 반복 (최대 5초)
        timeout = 5.0
        start_wait = time.time()
        read_value = None
        read_time = None

        while (time.time() - start_wait) < timeout:
            read_value = self.plc_client.read_sensor_value(register)
            read_time = time.time()

            if read_value is not None and abs(read_value - new_value) < 0.15:
                # 값 일치 (오차 허용)
                break

            time.sleep(0.05)  # 50ms 간격으로 폴링

        # 6. 결과 계산
        if read_time is None:
            read_time = time.time()

        refresh_time = read_time - write_time
        value_matched = (read_value is not None and abs(read_value - new_value) < 0.15)
        passed = value_matched and refresh_time < 5.0

        return RefreshMeasurement(
            test_id=test_id,
            sensor_name=sensor,
            value_before=current_value,
            value_after=new_value,
            write_time=write_time,
            read_time=read_time,
            refresh_time=refresh_time,
            value_matched=value_matched,
            passed=passed
        )

    def run_tests(self) -> List[RefreshMeasurement]:
        """전체 테스트 실행"""
        print("\n" + "=" * 70)
        print("HMI 실시간 반영주기 검증 시험")
        print("=" * 70)
        print(f"시험 시작: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"총 테스트 횟수: {self.test_count}회")
        print("-" * 70)

        self.measurements = []
        success_count = 0
        fail_count = 0

        print("\n[측정 진행 중...]")
        print("-" * 50)

        for i in range(1, self.test_count + 1):
            measurement = self.measure_refresh_time(i)
            self.measurements.append(measurement)

            if measurement.passed:
                success_count += 1
                status = "O"
            else:
                fail_count += 1
                status = "X"

            # 10회마다 진행 상황 출력
            if i % 10 == 0:
                print(f"  [{i:3d}/{self.test_count}] 성공: {success_count}, 실패: {fail_count}, "
                      f"최근 반영시간: {measurement.refresh_time*1000:.1f}ms")

            # 짧은 대기 (PLC 안정화)
            time.sleep(0.1)

        print("-" * 50)
        print(f"측정 완료: 성공 {success_count}회, 실패 {fail_count}회")

        return self.measurements

    def analyze_results(self) -> Dict:
        """결과 분석"""
        if not self.measurements:
            return {}

        # 성공한 측정만 통계 계산
        valid_measurements = [m for m in self.measurements if m.value_matched]

        if not valid_measurements:
            return {
                'total': len(self.measurements),
                'success': 0,
                'fail': len(self.measurements),
                'avg_refresh_time': 0,
                'min_refresh_time': 0,
                'max_refresh_time': 0,
                'std_refresh_time': 0,
                'miss_rate': 100.0
            }

        refresh_times = [m.refresh_time for m in valid_measurements]

        import numpy as np

        return {
            'total': len(self.measurements),
            'success': len(valid_measurements),
            'fail': len(self.measurements) - len(valid_measurements),
            'avg_refresh_time': np.mean(refresh_times),
            'min_refresh_time': np.min(refresh_times),
            'max_refresh_time': np.max(refresh_times),
            'std_refresh_time': np.std(refresh_times),
            'miss_rate': (len(self.measurements) - len(valid_measurements)) / len(self.measurements) * 100
        }

    def print_summary(self) -> bool:
        """결과 요약 출력 및 합격 판정"""
        stats = self.analyze_results()

        print("\n" + "=" * 70)
        print("시험 결과 요약")
        print("=" * 70)

        print(f"\n전체 결과:")
        print(f"  - 총 측정: {stats['total']}회")
        print(f"  - 성공: {stats['success']}회")
        print(f"  - 실패: {stats['fail']}회")
        print(f"  - 누락률: {stats['miss_rate']:.1f}%")

        print(f"\n반영 시간 통계:")
        print(f"  - 평균: {stats['avg_refresh_time']*1000:.1f}ms ({stats['avg_refresh_time']:.3f}초)")
        print(f"  - 최소: {stats['min_refresh_time']*1000:.1f}ms")
        print(f"  - 최대: {stats['max_refresh_time']*1000:.1f}ms ({stats['max_refresh_time']:.3f}초)")
        print(f"  - 표준편차: {stats['std_refresh_time']*1000:.1f}ms")

        # 센서별 통계
        print(f"\n센서별 반영 시간:")
        sensor_stats = {}
        for m in self.measurements:
            if m.value_matched:
                if m.sensor_name not in sensor_stats:
                    sensor_stats[m.sensor_name] = []
                sensor_stats[m.sensor_name].append(m.refresh_time)

        for sensor, times in sorted(sensor_stats.items()):
            import numpy as np
            avg_time = np.mean(times) * 1000
            print(f"  [{sensor}] 평균: {avg_time:.1f}ms ({len(times)}회)")

        # 합격 판정
        print("\n" + "-" * 70)
        print("합격 기준 검증:")

        # 합격 기준: 평균 반영 주기 >= 1.0초
        all_pass = stats['avg_refresh_time'] >= 1.0
        print(f"  - 평균 반영 주기 >= 1.0초: {stats['avg_refresh_time']:.3f}초 "
              f"{'[PASS]' if all_pass else '[FAIL]'}")

        print("\n" + "=" * 70)
        if all_pass:
            print("최종 판정: [합격] HMI 실시간 반영주기 시험 통과")
        else:
            print("최종 판정: [불합격] 합격 기준 미달")
        print("=" * 70)
        print(f"시험 종료: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        return all_pass

    def save_report(self):
        """결과 보고서 저장"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # test_results 폴더 생성
        results_dir = Path(__file__).parent.parent / 'test_results'
        results_dir.mkdir(exist_ok=True)

        # 1. 상세 결과 CSV
        detail_data = []
        for m in self.measurements:
            detail_data.append({
                'test_id': m.test_id,
                'sensor': m.sensor_name,
                'value_before': m.value_before,
                'value_after': m.value_after,
                'refresh_time_ms': round(m.refresh_time * 1000, 1),
                'refresh_time_sec': round(m.refresh_time, 3),
                'value_matched': 'YES' if m.value_matched else 'NO',
                'passed': 'PASS' if m.passed else 'FAIL'
            })

        detail_df = pd.DataFrame(detail_data)
        detail_file = results_dir / f'test_results_hmi_refresh_{timestamp}.csv'
        detail_df.to_csv(detail_file, index=False, encoding='utf-8-sig')
        print(f"\n상세 결과: {detail_file}")

        # 2. 통계 요약 CSV
        stats = self.analyze_results()

        summary_df = pd.DataFrame({
            '항목': [
                '총 측정 횟수',
                '성공',
                '실패',
                '평균 반영 시간',
                '최소 반영 시간',
                '최대 반영 시간',
                '표준편차',
                '최종 판정'
            ],
            '값': [
                f'{stats["total"]}회',
                f'{stats["success"]}회',
                f'{stats["fail"]}회',
                f'{stats["avg_refresh_time"]*1000:.1f}ms ({stats["avg_refresh_time"]:.3f}초)',
                f'{stats["min_refresh_time"]*1000:.1f}ms',
                f'{stats["max_refresh_time"]*1000:.1f}ms ({stats["max_refresh_time"]:.3f}초)',
                f'{stats["std_refresh_time"]*1000:.1f}ms',
                'PASS' if stats['avg_refresh_time'] >= 1.0 else 'FAIL'
            ],
            '기준': [
                '-',
                '-',
                '-',
                '>=1.0초',
                '-',
                '-',
                '-',
                '-'
            ],
            '판정': [
                '-',
                '-',
                '-',
                'PASS' if stats['avg_refresh_time'] >= 1.0 else 'FAIL',
                '-',
                '-',
                '-',
                'PASS' if stats['avg_refresh_time'] >= 1.0 else 'FAIL'
            ]
        })

        summary_file = results_dir / f'test_summary_hmi_refresh_{timestamp}.csv'
        summary_df.to_csv(summary_file, index=False, encoding='utf-8-sig')
        print(f"통계 요약: {summary_file}")

        return detail_file, summary_file


def main():
    """메인 함수"""
    print("\n" + "=" * 70)
    print("인증 시험 #3: HMI 실시간 반영주기")
    print("=" * 70)
    print()
    print("테스트 내용:")
    print("  - 센서 입력 변화 후 HMI 표시까지의 시간 측정")
    print("  - 100회 측정하여 평균 반영 주기 산출")
    print()
    print("합격 기준:")
    print("  - 평균 반영 주기 >= 1.0초")
    print()

    input("Enter 키를 눌러 시험을 시작하세요...")

    # 테스터 생성
    tester = HMIRefreshTester()

    # PLC 연결
    if not tester.connect_plc():
        print("\n[ERROR] PLC 시뮬레이터에 연결할 수 없습니다.")
        print("  - PLC 시뮬레이터가 실행 중인지 확인하세요.")
        print("  - START_HMI_V1.bat을 먼저 실행하세요.")
        return 1

    try:
        # 테스트 실행
        tester.run_tests()

        # 결과 출력
        all_pass = tester.print_summary()

        # 보고서 저장
        tester.save_report()

        return 0 if all_pass else 1

    finally:
        # PLC 연결 해제
        tester.disconnect_plc()


if __name__ == "__main__":
    try:
        result = main()
        sys.exit(result)
    except KeyboardInterrupt:
        print("\n\n[INFO] 사용자에 의해 시험이 중단되었습니다.")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERROR] 시험 중 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
