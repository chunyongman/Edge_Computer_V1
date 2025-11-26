#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge AI Computer - 통합 AI 제어 시스템
PLC Simulator 연결 + EDGE_AI_REAL의 전체 AI 기능

실행 방법:
    python main_edge_ai.py
    또는
    START.bat
"""

import sys
import io
import time
import signal
import logging
import csv
import os
import json
import threading
from datetime import datetime
from typing import Dict, Any, Optional, List
from collections import deque
from pathlib import Path

# Windows 콘솔 인코딩 문제 해결
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# PLC Simulator 통신
from modbus_client import EdgeModbusClient
import config as old_config

# EDGE_AI_REAL 모듈 임포트
from src.control.integrated_controller import IntegratedController, ControlDecision
from src.ml.temperature_predictor import TemperatureSequence, TemperaturePrediction
from src.ml.pattern_classifier import PatternClassifier
from src.ml.batch_learning import BatchLearningSystem, LearningSchedule
from src.core.safety_constraints import SafetyConstraints
from ai_calculator import EdgeAICalculator

# VFD 예방진단 모듈
from src.diagnostics.vfd_monitor import VFDMonitor, VFDDiagnostic, DanfossStatusBits
from src.diagnostics.vfd_predictive_diagnosis import VFDPredictiveDiagnosis, VFDPrediction
from src.adapter.shared_data_writer import SharedDataWriter

# AI 예방진단 모듈 (Isolation Forest, LSTM, Random Forest)
from src.ai.vfd_ai_models import VFDAIEngine, get_ai_engine
from src.database.data_collector import VFDDataCollector, get_data_collector

# HTTP API 서버
from api_server import start_api_server


# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)


class EdgeAISystem:
    """Edge AI 통합 시스템 (EDGE_AI_REAL 기반 + PLC Simulator 연결)"""

    def __init__(self):
        self.running = True

        # PLC Simulator 연결 (기존 방식 유지)
        self.plc = EdgeModbusClient(
            old_config.PLC_HOST,
            old_config.PLC_PORT,
            old_config.PLC_SLAVE_ID
        )

        # EDGE_AI_REAL 통합 제어기 (전체 AI 기능 포함)
        self.controller = IntegratedController(enable_predictive_control=True)

        # 배치 학습 시스템 (주 2회 자동 학습)
        learning_schedule = LearningSchedule(
            learning_days=[2, 6],  # 수요일, 일요일
            start_hour=2,  # 02:00
            end_hour=4     # 04:00
        )
        self.batch_learning = BatchLearningSystem(learning_schedule)

        # 안전 제약조건
        self.safety_constraints = SafetyConstraints()

        # AI 계산기 (에너지 절감, VFD 진단)
        self.ai_calculator = EdgeAICalculator()

        # VFD 예방진단 모듈
        self.vfd_monitor = VFDMonitor()
        self.vfd_predictive_diagnosis = VFDPredictiveDiagnosis()
        self.shared_data_writer = SharedDataWriter(shared_dir="C:/shared")

        # AI 예방진단 엔진 (Isolation Forest, LSTM, Random Forest)
        self.ai_engine = get_ai_engine()
        self.data_collector = get_data_collector()

        # 온도 시퀀스 버퍼 (30분, 90개 데이터 포인트)
        self.temp_buffer = {
            'timestamps': deque(maxlen=90),
            't1': deque(maxlen=90),
            't2': deque(maxlen=90),
            't3': deque(maxlen=90),
            't4': deque(maxlen=90),
            't5': deque(maxlen=90),
            't6': deque(maxlen=90),
            't7': deque(maxlen=90),
            'engine_load': deque(maxlen=90)
        }

        # 통계
        self.cycle_count = 0
        self.ai_inference_times = []

        # 알람 모니터링
        self.alarm_monitoring = True
        self.alarm_thread = None

        # 대수제어 상태 추적
        self.previous_fan_count = 3  # 초기 FAN 대수 (기본 3대)
        self.equipment_runtime = {  # 장비별 운전시간 추적 (균등 분배용)
            'FAN1': 0, 'FAN2': 0, 'FAN3': 0, 'FAN4': 0
        }

        # HTTP API 서버
        self.api_server_thread = None

        # Ctrl+C 처리
        signal.signal(signal.SIGINT, self.signal_handler)

        logger.info("=" * 80)
        logger.info("  Edge AI Computer 시작 (EDGE_AI_REAL 전체 기능)")
        logger.info("  - Random Forest 최적화")
        logger.info("  - 온도 예측 (5/10/15분)")
        logger.info("  - 패턴 인식 (가속/정속/감속/정박)")
        logger.info("  - 배치 학습 (주 2회 자동)")
        logger.info("  - VFD 예방진단 (이상 탐지, 수명 예측)")
        logger.info("=" * 80)
        logger.info(f"  PLC 주소: {old_config.PLC_HOST}:{old_config.PLC_PORT}")
        logger.info(f"  업데이트 주기: {old_config.UPDATE_INTERVAL}초")
        logger.info("=" * 80)

    def signal_handler(self, signum, frame):
        """Ctrl+C 처리"""
        logger.info("\n\n[종료] 사용자가 중단했습니다 (Ctrl+C)")
        self.running = False
        self.alarm_monitoring = False

    def update_temperature_buffer(self, sensors: Dict):
        """온도 시퀀스 버퍼 업데이트"""
        now = datetime.now()

        self.temp_buffer['timestamps'].append(now)
        self.temp_buffer['t1'].append(sensors.get('TX1', 25.0))
        self.temp_buffer['t2'].append(sensors.get('TX2', 30.0))
        self.temp_buffer['t3'].append(sensors.get('TX3', 30.0))
        self.temp_buffer['t4'].append(sensors.get('TX4', 45.0))
        self.temp_buffer['t5'].append(sensors.get('TX5', 35.0))
        self.temp_buffer['t6'].append(sensors.get('TX6', 43.0))
        self.temp_buffer['t7'].append(sensors.get('TX7', 30.0))
        self.temp_buffer['engine_load'].append(sensors.get('PU1', 70.0))

    def _select_fan_to_start(self, equipment: List[Dict]) -> Optional[int]:
        """
        시작할 FAN 선택 (운전시간 균등화)

        우선순위:
        1. 정지 중인 FAN 중
        2. 누적 운전시간이 가장 적은 FAN
        3. 장비 번호 순서

        Returns:
            FAN 인덱스 (6-9) 또는 None
        """
        if not equipment or len(equipment) < 10:
            return None

        # FAN1-4 (인덱스 6-9) 중 정지 중인 것 찾기
        stopped_fans = []
        for i in range(6, 10):
            fan = equipment[i]
            if not fan.get('running_fwd') and not fan.get('running_bwd'):
                fan_name = fan['name']
                runtime = self.equipment_runtime.get(fan_name, 0)
                stopped_fans.append((i, fan_name, runtime))

        if not stopped_fans:
            logger.warning("[대수제어] 시작 가능한 FAN 없음 (모두 운전 중)")
            return None

        # 운전시간 기준 정렬 (적은 순)
        stopped_fans.sort(key=lambda x: (x[2], x[1]))  # (runtime, name)
        selected_idx, selected_name, selected_runtime = stopped_fans[0]

        logger.info(f"[대수제어] 🎯 시작할 FAN 선택: {selected_name} (운전시간: {selected_runtime}초)")
        return selected_idx

    def _select_fan_to_stop(self, equipment: List[Dict]) -> Optional[int]:
        """
        정지할 FAN 선택 (운전시간 균등화)

        우선순위:
        1. 운전 중인 FAN 중
        2. 누적 운전시간이 가장 많은 FAN
        3. 장비 번호 역순

        Returns:
            FAN 인덱스 (6-9) 또는 None
        """
        if not equipment or len(equipment) < 10:
            return None

        # FAN1-4 (인덱스 6-9) 중 운전 중인 것 찾기
        running_fans = []
        for i in range(6, 10):
            fan = equipment[i]
            if fan.get('running_fwd') or fan.get('running_bwd'):
                fan_name = fan['name']
                runtime = self.equipment_runtime.get(fan_name, 0)
                running_fans.append((i, fan_name, runtime))

        if not running_fans:
            logger.warning("[대수제어] 정지 가능한 FAN 없음 (모두 정지 중)")
            return None

        # 운전시간 기준 정렬 (많은 순)
        running_fans.sort(key=lambda x: (-x[2], x[1]))  # (-runtime, name)
        selected_idx, selected_name, selected_runtime = running_fans[0]

        logger.info(f"[대수제어] 🎯 정지할 FAN 선택: {selected_name} (운전시간: {selected_runtime}초)")
        return selected_idx

    def _update_equipment_runtime(self, equipment: List[Dict]):
        """장비 운전시간 업데이트 (매 사이클마다 +1초)"""
        if not equipment or len(equipment) < 10:
            return

        for i in range(6, 10):  # FAN1-4
            fan = equipment[i]
            fan_name = fan['name']
            if fan.get('running_fwd') or fan.get('running_bwd'):
                # 운전 중이면 +1초
                self.equipment_runtime[fan_name] = self.equipment_runtime.get(fan_name, 0) + 1

    def get_temperature_sequence(self) -> Optional[TemperatureSequence]:
        """온도 시퀀스 객체 생성"""
        if len(self.temp_buffer['timestamps']) < 30:
            return None  # 최소 30개 데이터 필요

        try:
            sequence = TemperatureSequence(
                timestamps=list(self.temp_buffer['timestamps']),
                t1_sequence=list(self.temp_buffer['t1']),
                t2_sequence=list(self.temp_buffer['t2']),
                t3_sequence=list(self.temp_buffer['t3']),
                t4_sequence=list(self.temp_buffer['t4']),
                t5_sequence=list(self.temp_buffer['t5']),
                t6_sequence=list(self.temp_buffer['t6']),
                t7_sequence=list(self.temp_buffer['t7']),
                engine_load_sequence=list(self.temp_buffer['engine_load'])
            )
            return sequence
        except Exception as e:
            logger.warning(f"시퀀스 생성 실패: {e}")
            return None

    def save_alarm_to_csv(self, alarm_data: Dict):
        """알람을 CSV 파일에 저장"""
        try:
            # logs 디렉토리 확인
            logs_dir = "logs"
            if not os.path.exists(logs_dir):
                os.makedirs(logs_dir)

            # 날짜별 파일명
            today = datetime.now().strftime("%Y%m%d")
            csv_file = os.path.join(logs_dir, f"alarm_{today}.csv")

            # 파일이 없으면 헤더 생성
            file_exists = os.path.exists(csv_file)

            with open(csv_file, 'a', newline='', encoding='utf-8') as f:
                fieldnames = ['timestamp', 'sensor_id', 'alarm_type', 'sensor_value',
                              'threshold', 'status', 'ack_timestamp']
                writer = csv.DictWriter(f, fieldnames=fieldnames)

                if not file_exists:
                    writer.writeheader()

                writer.writerow(alarm_data)

            logger.debug(f"알람 저장 완료: {alarm_data['sensor_id']} ({alarm_data['alarm_type']})")

        except Exception as e:
            logger.error(f"알람 저장 실패: {e}")

    def monitor_alarms(self):
        """알람 모니터링 스레드 (1초 주기)"""
        logger.info("[알람 모니터링] 시작")

        while self.alarm_monitoring and self.plc.connected:
            try:
                # 7103: 새 알람 플래그 읽기
                new_alarm_flag_reg = self.plc.read_holding_registers(7103, 1)
                if not new_alarm_flag_reg:
                    time.sleep(1)
                    continue

                new_alarm_flag = new_alarm_flag_reg[0]

                # 새 알람이 있으면 처리
                if new_alarm_flag == 1:
                    logger.info("[알람 감지] 새 알람 발생, PLC에서 읽기 시작...")

                    # 7200-7279: 최근 알람 10개 (각 8개 레지스터)
                    alarm_registers = self.plc.read_holding_registers(7200, 80)
                    if not alarm_registers:
                        logger.warning("[알람] 레지스터 읽기 실패")
                        time.sleep(1)
                        continue

                    # 알람 파싱 및 저장
                    for i in range(10):
                        offset = i * 8
                        sensor_id = alarm_registers[offset]
                        alarm_type = alarm_registers[offset + 1]
                        timestamp_h = alarm_registers[offset + 2]
                        timestamp_l = alarm_registers[offset + 3]
                        sensor_value = alarm_registers[offset + 4]
                        threshold = alarm_registers[offset + 5]
                        status = alarm_registers[offset + 6]
                        ack_time_dummy = alarm_registers[offset + 7]

                        # 유효한 알람만 저장 (sensor_id > 0)
                        if sensor_id > 0:
                            # 타임스탬프 복원 (32비트 UNIX timestamp)
                            timestamp_unix = (timestamp_h << 16) | timestamp_l
                            if timestamp_unix > 0:
                                timestamp_dt = datetime.fromtimestamp(timestamp_unix)
                                timestamp_str = timestamp_dt.strftime("%Y-%m-%d %H:%M:%S")
                            else:
                                timestamp_str = ""

                            # 센서 이름 매핑
                            sensor_names = {
                                1: "TX1", 2: "TX2", 3: "TX3", 4: "TX4",
                                5: "TX5", 6: "TX6", 7: "TX7",
                                8: "PX1_LOW", 9: "PX1_HIGH", 10: "PU1"
                            }
                            sensor_name = sensor_names.get(sensor_id, f"SENSOR_{sensor_id}")

                            # 알람 타입 매핑
                            alarm_type_names = {1: "HIGH", 2: "LOW"}
                            alarm_type_str = alarm_type_names.get(alarm_type, "UNKNOWN")

                            # CSV 저장
                            alarm_data = {
                                'timestamp': timestamp_str,
                                'sensor_id': sensor_name,
                                'alarm_type': alarm_type_str,
                                'sensor_value': sensor_value / 10.0 if sensor_id <= 7 else sensor_value / 100.0 if sensor_id <= 9 else sensor_value / 10.0,
                                'threshold': threshold / 10.0 if sensor_id <= 7 else threshold / 100.0 if sensor_id <= 9 else threshold / 10.0,
                                'status': "미확인" if status == 0 else "확인됨",
                                'ack_timestamp': ""
                            }
                            self.save_alarm_to_csv(alarm_data)

                    # 플래그 리셋 (7103 = 0)
                    self.plc.write_holding_registers(7103, [0])
                    logger.info("[알람] 처리 완료, 플래그 리셋")

            except Exception as e:
                logger.error(f"[알람 모니터링] 오류: {e}")

            time.sleep(1)  # 1초 주기

        logger.info("[알람 모니터링] 종료")

    def run(self):
        """메인 실행 루프"""

        # PLC 연결
        if not self.plc.connect():
            logger.error("[ERROR] PLC 연결 실패. 프로그램을 종료합니다.")
            logger.info("[INFO] PLC Simulator가 실행 중인지 확인하세요.")
            return

        print("[DEBUG] PLC 연결 완료, 다음 단계로 진행 중...")
        logger.info(f"\n[시작] AI 제어 루프 시작 ({old_config.UPDATE_INTERVAL}초 주기)")
        logger.info("[INFO] 종료: Ctrl+C\n")

        # 알람 모니터링 스레드 시작
        self.alarm_thread = threading.Thread(target=self.monitor_alarms, daemon=True)
        self.alarm_thread.start()
        logger.info("[알람] 모니터링 스레드 시작됨")

        # HTTP API 서버 스레드 시작 (포트 8000)
        self.api_server_thread = threading.Thread(
            target=start_api_server,
            kwargs={"host": "0.0.0.0", "port": 8000},
            daemon=True
        )
        self.api_server_thread.start()
        logger.info("[API] HTTP 서버 시작됨 (포트 8000)")

        last_status_time = time.time()

        while self.running:
            try:
                cycle_start = time.time()
                self.cycle_count += 1

                # ===== Step 1: PLC에서 센서 데이터 읽기 =====
                sensors = self.plc.read_sensors()
                if sensors is None:
                    logger.warning("[WARNING] 센서 데이터 읽기 실패. 재시도...")
                    logger.warning(f"  PLC 연결 상태: {self.plc.connected}")
                    # PLC 재연결 시도
                    if not self.plc.connected:
                        logger.info("  PLC 재연결 시도...")
                        self.plc.connect()
                    time.sleep(old_config.UPDATE_INTERVAL)
                    continue

                # ===== Step 2: PLC에서 장비 상태 읽기 =====
                equipment = self.plc.read_equipment_status()
                if equipment is None:
                    logger.warning("[WARNING] 장비 데이터 읽기 실패. 재시도...")
                    time.sleep(old_config.UPDATE_INTERVAL)
                    continue

                # ===== Step 3: 온도 시퀀스 버퍼 업데이트 =====
                self.update_temperature_buffer(sensors)

                # ===== Step 4: AI 제어 결정 (통합 제어기) =====
                ai_start = time.time()

                # 통합 제어기로 AI 결정 수행
                # compute_control()에 필요한 파라미터 준비
                temperatures = {
                    'T1': sensors.get('TX1', 25.0),
                    'T2': sensors.get('TX2', 30.0),
                    'T3': sensors.get('TX3', 30.0),
                    'T4': sensors.get('TX4', 45.0),
                    'T5': sensors.get('TX5', 35.0),
                    'T6': sensors.get('TX6', 43.0),
                    'T7': sensors.get('TX7', 30.0),
                }
                pressure = sensors.get('DPX1', 1.5)
                engine_load = sensors.get('PU1', 75.0)

                # 현재 주파수 (장비 상태에서 추출)
                # E/R 팬 작동 대수 계산 (FAN1-4, 인덱스 6-9)
                er_fan_count = 0
                if equipment and len(equipment) >= 10:
                    for i in range(6, 10):  # FAN1-4
                        fan = equipment[i]
                        # running_fwd 또는 running_bwd가 True이면 작동 중
                        if fan.get('running_fwd', False) or fan.get('running_bwd', False):
                            er_fan_count += 1

                current_frequencies = {
                    'sw_pump': equipment[0]['frequency'] if equipment else 48.0,
                    'fw_pump': equipment[3]['frequency'] if len(equipment) > 3 else 48.0,
                    'er_fan': equipment[6]['frequency'] if len(equipment) > 6 else 47.0,
                    'er_fan_count': er_fan_count if er_fan_count > 0 else 3  # 실제 작동 대수
                }

                control_decision = self.controller.compute_control(
                    temperatures=temperatures,
                    pressure=pressure,
                    engine_load=engine_load,
                    current_frequencies=current_frequencies
                )

                ai_elapsed = (time.time() - ai_start) * 1000  # ms
                self.ai_inference_times.append(ai_elapsed)

                # ===== Step 5: 에너지 절감 계산 =====
                savings_data = self.ai_calculator.calculate_energy_savings(equipment)

                # ===== Step 6: VFD 고급 예방진단 =====
                vfd_diagnostics_dict = {}
                vfd_predictions_dict = {}

                for eq in equipment:
                    eq_name = eq.get("name", "")
                    if not eq_name:
                        continue

                    # 장비 이름을 VFD ID로 변환
                    if "SWP" in eq_name:
                        vfd_id = eq_name.replace("SWP", "SW_PUMP_")
                    elif "FWP" in eq_name:
                        vfd_id = eq_name.replace("FWP", "FW_PUMP_")
                    elif "FAN" in eq_name:
                        vfd_id = eq_name.replace("FAN", "ER_FAN_")
                    else:
                        continue

                    # 장비 데이터에서 VFD 파라미터 추출
                    freq = eq.get("frequency", 0.0)
                    is_running = eq.get("running", False) or eq.get("running_fwd", False) or eq.get("running_bwd", False)
                    run_hours = eq.get("run_hours", 0)

                    # VFD 진단 데이터 생성
                    # 테스트 VFD 이상 징후 체크
                    test_warning = False
                    test_anomaly_file = Path("C:/shared/test_vfd_anomalies.json")
                    if test_anomaly_file.exists():
                        try:
                            with open(test_anomaly_file, 'r', encoding='utf-8') as f:
                                test_data = json.load(f)
                                active_anomalies = test_data.get("active_anomalies", {})
                                if vfd_id in active_anomalies:
                                    test_warning = True
                                    logger.debug(f"🧪 테스트: {vfd_id} WARNING 발생")
                        except:
                            pass

                    # 정상 상태 비트 생성 (시뮬레이션)
                    status_bits = DanfossStatusBits(
                        trip=False,
                        error=False,
                        warning=test_warning,  # 테스트 데이터에서 WARNING 설정
                        voltage_exceeded=False,
                        torque_exceeded=False,
                        thermal_exceeded=False,
                        control_ready=True,
                        drive_ready=True,
                        in_operation=is_running,
                        speed_equals_reference=is_running,
                        bus_control=True
                    )

                    diagnostic = self.vfd_monitor.diagnose_vfd(
                        vfd_id=vfd_id,
                        status_bits=status_bits,
                        frequency_hz=freq,
                        output_current_a=(freq / 60.0) * 150 if is_running else 0.0,
                        output_voltage_v=380.0 if is_running else 0.0,
                        dc_bus_voltage_v=540.0 if is_running else 0.0,
                        motor_temp_c=55 + (freq / 60.0) * 20 if is_running else 35,
                        heatsink_temp_c=50 + (freq / 60.0) * 15 if is_running else 30,
                        runtime_seconds=run_hours * 3600
                    )
                    vfd_diagnostics_dict[vfd_id] = diagnostic

                    # 데이터 수집기에 진단 데이터 저장 (DB 저장 + AI 학습용)
                    self.data_collector.collect(diagnostic)

                    # AI 엔진으로 고급 분석 수행
                    # 먼저 데이터 포인트 추가
                    self.ai_engine.add_data_point(
                        vfd_id=vfd_id,
                        motor_temp=diagnostic.motor_temperature_c,
                        heatsink_temp=diagnostic.heatsink_temperature_c,
                        current=diagnostic.output_current_a,
                        frequency=diagnostic.current_frequency_hz,
                        severity_score=diagnostic.severity_score
                    )
                    # 분석 수행 (vfd_id 문자열 전달)
                    ai_analysis = self.ai_engine.analyze(vfd_id)
                    if ai_analysis:
                        # AI 분석 결과를 진단에 추가
                        diagnostic.ai_analysis = ai_analysis

                        # AI가 이상 징후 탐지했으면 로깅
                        if ai_analysis.get('anomaly_detected'):
                            logger.warning(
                                f"🔴 AI 이상 탐지: {vfd_id} - "
                                f"점수: {ai_analysis.get('anomaly_score', 0):.1f}, "
                                f"위험도: {ai_analysis.get('risk_level', 'unknown')}"
                            )

                    # 예측 분석에 진단 데이터 추가
                    self.vfd_predictive_diagnosis.add_diagnostic(diagnostic)

                    # 예측 수행
                    prediction = self.vfd_predictive_diagnosis.predict(diagnostic)
                    if prediction:
                        vfd_predictions_dict[vfd_id] = prediction

                # HMI로부터 acknowledge/clear 명령 처리
                self._process_acknowledgment_commands()

                # 공유 파일에 저장 (HMI와 Dashboard가 읽음)
                if vfd_diagnostics_dict:
                    self.shared_data_writer.write_vfd_diagnostics(vfd_diagnostics_dict, vfd_predictions_dict)

                # 기존 VFD 진단 점수도 PLC로 전송 (하위 호환성)
                diagnosis_scores = self.ai_calculator.calculate_vfd_diagnosis(equipment, sensors)

                # ===== Step 7: PLC로 제어 명령 전송 =====
                # 목표 주파수 쓰기
                target_frequencies = self._extract_target_frequencies(control_decision)
                self.plc.write_ai_target_frequency(target_frequencies)

                # 에너지 절감 데이터 쓰기
                savings_for_plc = self._format_savings_for_plc(savings_data)
                self.plc.write_energy_savings(savings_for_plc)

                # VFD 진단 점수 쓰기
                self.plc.write_vfd_diagnosis(diagnosis_scores)

                # ===== Step 7.5: 대수제어 (FAN 대수 변경 감지 및 START/STOP 명령) =====
                # 장비 운전시간 업데이트
                self._update_equipment_runtime(equipment)

                # 첫 사이클: 실제 운전 대수로 초기화
                if self.cycle_count == 1:
                    self.previous_fan_count = er_fan_count

                # 대수 변경 감지
                current_fan_count = control_decision.er_fan_count
                if current_fan_count != self.previous_fan_count:
                    logger.info("=" * 80)
                    logger.info(f"[대수제어] 🔄 FAN 대수 변경: {self.previous_fan_count}대 → {current_fan_count}대")
                    logger.info(f"[대수제어] 변경 사유: {control_decision.count_change_reason}")

                    if current_fan_count > self.previous_fan_count:
                        # 대수 증가: 정지 중인 FAN 1대 START
                        fan_to_start = self._select_fan_to_start(equipment)
                        if fan_to_start is not None:
                            success = self.plc.send_equipment_start(fan_to_start)
                            if success:
                                logger.info(f"[대수제어] ✅ FAN 시작 명령 전송 성공 (인덱스: {fan_to_start})")
                            else:
                                logger.error(f"[대수제어] ❌ FAN 시작 명령 전송 실패 (인덱스: {fan_to_start})")
                        else:
                            logger.warning(f"[대수제어] ⚠️  시작 가능한 FAN 없음")

                    elif current_fan_count < self.previous_fan_count:
                        # 대수 감소: 운전 중인 FAN 1대 STOP
                        fan_to_stop = self._select_fan_to_stop(equipment)
                        if fan_to_stop is not None:
                            success = self.plc.send_equipment_stop(fan_to_stop)
                            if success:
                                logger.info(f"[대수제어] ✅ FAN 정지 명령 전송 성공 (인덱스: {fan_to_stop})")
                            else:
                                logger.error(f"[대수제어] ❌ FAN 정지 명령 전송 실패 (인덱스: {fan_to_stop})")
                        else:
                            logger.warning(f"[대수제어] ⚠️  정지 가능한 FAN 없음")

                    # 이전 대수 업데이트
                    self.previous_fan_count = current_fan_count
                    logger.info("=" * 80)

                # ===== Step 8: 주기적 상태 출력 (10초마다) =====
                if time.time() - last_status_time >= 10:
                    self.print_status(control_decision, sensors, savings_data)
                    last_status_time = time.time()

                # ===== Step 9: 배치 학습 체크 (수요일/일요일 02:00-04:00) =====
                self.batch_learning.update(datetime.now())

                # ===== 주기 대기 =====
                cycle_elapsed = time.time() - cycle_start
                sleep_time = max(0, old_config.UPDATE_INTERVAL - cycle_elapsed)
                if sleep_time > 0:
                    time.sleep(sleep_time)

            except KeyboardInterrupt:
                logger.info("\n[종료] Ctrl+C 감지")
                break

            except Exception as e:
                logger.error(f"[ERROR] 예외 발생: {e}")
                import traceback
                traceback.print_exc()
                time.sleep(old_config.UPDATE_INTERVAL)

        # 종료 처리
        self.alarm_monitoring = False
        if self.alarm_thread and self.alarm_thread.is_alive():
            logger.info("[알람] 모니터링 스레드 종료 대기...")
            self.alarm_thread.join(timeout=3)

        self.plc.disconnect()
        logger.info("\n[완료] Edge AI 시스템 종료")

    def _extract_target_frequencies(self, decision: ControlDecision) -> list:
        """제어 결정에서 목표 주파수 추출 (10개 장비)"""
        # SWP1-3, FWP1-3, FAN1-4
        return [
            decision.sw_pump_freq,  # SWP1
            decision.sw_pump_freq,  # SWP2
            decision.sw_pump_freq,  # SWP3
            decision.fw_pump_freq,  # FWP1
            decision.fw_pump_freq,  # FWP2
            decision.fw_pump_freq,  # FWP3
            decision.er_fan_freq,   # FAN1
            decision.er_fan_freq,   # FAN2
            decision.er_fan_freq,   # FAN3
            decision.er_fan_freq    # FAN4
        ]

    def _process_acknowledgment_commands(self):
        """HMI로부터 acknowledge/clear 명령 처리"""
        import json
        from pathlib import Path

        ack_file = Path("C:/shared/vfd_acknowledgments.json")
        if not ack_file.exists():
            return

        try:
            with open(ack_file, 'r', encoding='utf-8') as f:
                ack_data = json.load(f)

            for vfd_id, command in ack_data.items():
                action = command.get("action")

                if action == "acknowledge":
                    success = self.vfd_monitor.acknowledge_anomaly(vfd_id)
                    if success:
                        logger.info(f"✅ VFD {vfd_id} 이상 징후 확인 처리 완료")
                elif action == "clear":
                    success = self.vfd_monitor.clear_anomaly(vfd_id)
                    if success:
                        logger.info(f"✅ VFD {vfd_id} 이상 징후 해제 처리 완료")

            # 처리 후 파일 삭제
            ack_file.unlink()

        except Exception as e:
            logger.error(f"❌ Acknowledgment 명령 처리 실패: {e}")

    def _format_savings_for_plc(self, savings_data: Dict) -> Dict:
        """
        AI 계산기 출력을 PLC 쓰기 포맷으로 변환

        Args:
            savings_data: ai_calculator.calculate_energy_savings() 출력

        Returns:
            PLC write_energy_savings() 형식
        """
        realtime = savings_data.get("realtime", {})
        today = savings_data.get("today", {})
        month = savings_data.get("month", {})

        # 시스템 절감률 (total, swp, fwp, fan)
        total = realtime.get("total", {})
        swp = realtime.get("swp", {})
        fwp = realtime.get("fwp", {})
        fan = realtime.get("fan", {})

        return {
            "total_ratio": total.get("savings_rate", 0.0),
            "swp_ratio": swp.get("savings_rate", 0.0),
            "fwp_ratio": fwp.get("savings_rate", 0.0),
            "fan_ratio": fan.get("savings_rate", 0.0),
            # 개별 장비 절감 전력 (kW) - 현재는 단순화, 필요시 확장
            "equipment_0": swp.get("savings_kw", 0.0) / 3,  # SWP1
            "equipment_1": swp.get("savings_kw", 0.0) / 3,  # SWP2
            "equipment_2": swp.get("savings_kw", 0.0) / 3,  # SWP3
            "equipment_3": fwp.get("savings_kw", 0.0) / 3,  # FWP1
            "equipment_4": fwp.get("savings_kw", 0.0) / 3,  # FWP2
            "equipment_5": fwp.get("savings_kw", 0.0) / 3,  # FWP3
            "equipment_6": fan.get("savings_kw", 0.0) / 4,  # FAN1
            "equipment_7": fan.get("savings_kw", 0.0) / 4,  # FAN2
            "equipment_8": fan.get("savings_kw", 0.0) / 4,  # FAN3
            "equipment_9": fan.get("savings_kw", 0.0) / 4,  # FAN4
            # 누적 절감량 (kWh)
            "today_kwh": today.get("total_kwh_saved", 0.0),
            "month_kwh": month.get("total_kwh_saved", 0.0),
            # 60Hz 고정 전력 (kW)
            "total_power_60hz": total.get("power_60hz", 0.0),
            "swp_power_60hz": swp.get("power_60hz", 0.0),
            "fwp_power_60hz": fwp.get("power_60hz", 0.0),
            "fan_power_60hz": fan.get("power_60hz", 0.0),
            # VFD 가변 전력 (kW)
            "total_power_vfd": total.get("power_vfd", 0.0),
            "swp_power_vfd": swp.get("power_vfd", 0.0),
            "fwp_power_vfd": fwp.get("power_vfd", 0.0),
            "fan_power_vfd": fan.get("power_vfd", 0.0),
            # 절감 전력 (kW)
            "total_savings_kw": total.get("savings_kw", 0.0),
            "swp_savings_kw": swp.get("savings_kw", 0.0),
            "fwp_savings_kw": fwp.get("savings_kw", 0.0),
            "fan_savings_kw": fan.get("savings_kw", 0.0),
        }

    def print_status(self, decision: ControlDecision, sensors: Dict, savings_data: Dict = None):
        """주기적 상태 출력"""
        logger.info("\n" + "=" * 80)
        logger.info(f"[상태] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Cycle #{self.cycle_count}")
        logger.info("-" * 80)

        # 센서 데이터
        logger.info(f"🌡️  센서:")
        logger.info(f"   TX5 (FW Outlet): {sensors.get('TX5', 0):.1f}°C")
        logger.info(f"   TX6 (E/R): {sensors.get('TX6', 0):.1f}°C")
        logger.info(f"   엔진 부하: {sensors.get('PU1', 0):.1f}%")

        # AI 제어 결정
        logger.info(f"\n🤖 AI 제어:")
        logger.info(f"   모드: {decision.control_mode}")
        logger.info(f"   SW 펌프: {decision.sw_pump_freq:.1f} Hz")
        logger.info(f"   FW 펌프: {decision.fw_pump_freq:.1f} Hz")
        logger.info(f"   E/R 팬: {decision.er_fan_freq:.1f} Hz (작동 {decision.er_fan_count}대)")
        logger.info(f"   이유: {decision.reason}")
        if decision.count_change_reason:
            logger.info(f"   대수제어: {decision.count_change_reason}")

        # 에너지 절감 정보
        if savings_data:
            realtime = savings_data.get("realtime", {})
            today = savings_data.get("today", {})
            month = savings_data.get("month", {})
            total = realtime.get("total", {})

            logger.info(f"\n💰 에너지 절감:")
            logger.info(f"   실시간 절감률: {total.get('savings_rate', 0):.1f}%")
            logger.info(f"   오늘 누적: {today.get('total_kwh_saved', 0):.1f} kWh")
            logger.info(f"   이번달 누적: {month.get('total_kwh_saved', 0):.1f} kWh")

        # 예측 정보
        if decision.temperature_prediction:
            pred = decision.temperature_prediction
            logger.info(f"\n🔮 온도 예측 (10분 후):")
            logger.info(f"   T5: {pred.t5_current:.1f}°C → {pred.t5_pred_10min:.1f}°C")
            logger.info(f"   T6: {pred.t6_current:.1f}°C → {pred.t6_pred_10min:.1f}°C")
            logger.info(f"   추론 시간: {pred.inference_time_ms:.1f}ms")

        # 성능 통계
        if len(self.ai_inference_times) > 0:
            avg_inference = sum(self.ai_inference_times[-10:]) / min(10, len(self.ai_inference_times))
            logger.info(f"\n⚡ 성능:")
            logger.info(f"   평균 AI 추론: {avg_inference:.1f}ms")

        logger.info("=" * 80)


def main():
    """메인 함수"""
    try:
        system = EdgeAISystem()
        system.run()

    except Exception as e:
        logger.error(f"\n[FATAL ERROR] 시스템 오류: {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
