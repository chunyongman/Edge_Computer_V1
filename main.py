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
import threading
from datetime import datetime
from typing import Dict, Any, Optional, List
from collections import deque

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
from src.database.db_manager import DatabaseManager
import json


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

        # 데이터베이스 매니저 (이상 징후 히스토리 저장)
        self.db = DatabaseManager(db_dir="data")

        # VFD 이상 징후 추적 (장비별 현재 활성 anomaly_id)
        self.active_anomalies = {}  # {equipment_id: anomaly_id}

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

        # 대수 제어 상태
        self.current_fan_count = 3  # 현재 운전 중인 팬 대수

        # Ctrl+C 처리
        signal.signal(signal.SIGINT, self.signal_handler)

        logger.info("=" * 80)
        logger.info("  Edge AI Computer 시작 (EDGE_AI_REAL 전체 기능)")
        logger.info("  - Random Forest 최적화")
        logger.info("  - 온도 예측 (5/10/15분)")
        logger.info("  - 패턴 인식 (가속/정속/감속/정박)")
        logger.info("  - 배치 학습 (주 2회 자동)")
        logger.info("=" * 80)
        logger.info(f"  PLC 주소: {old_config.PLC_HOST}:{old_config.PLC_PORT}")
        logger.info(f"  업데이트 주기: {old_config.UPDATE_INTERVAL}초")
        logger.info("=" * 80)

    def signal_handler(self, signum, frame):
        """Ctrl+C 처리"""
        logger.info("\n\n[종료] 사용자가 중단했습니다 (Ctrl+C)")
        self.running = False

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

    def run(self):
        """메인 실행 루프"""

        # PLC 연결
        if not self.plc.connect():
            logger.error("[ERROR] PLC 연결 실패. 프로그램을 종료합니다.")
            logger.info("[INFO] PLC Simulator가 실행 중인지 확인하세요.")
            return

        logger.info(f"\n[시작] AI 제어 루프 시작 ({old_config.UPDATE_INTERVAL}초 주기)")
        logger.info("[INFO] 종료: Ctrl+C\n")

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
                pressure = sensors.get('PX1', 1.5)
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

                # ===== Step 6: VFD 진단 점수 계산 (4단계 중증도 진단) =====
                diagnosis_scores, severity_levels, diagnosis_details = self.ai_calculator.calculate_vfd_diagnosis(equipment, sensors)

                # ===== Step 6.5: VFD 이상 징후 감지 및 DB 저장 =====
                self._process_vfd_anomalies(equipment, diagnosis_scores, severity_levels, diagnosis_details)

                # ===== Step 7: PLC로 제어 명령 전송 =====
                # 목표 주파수 쓰기
                target_frequencies = self._extract_target_frequencies(control_decision)
                self.plc.write_ai_target_frequency(target_frequencies)

                # 대수 제어 명령 전송 (팬 START/STOP)
                self._apply_fan_count_control(control_decision.er_fan_count)

                # 에너지 절감 데이터 쓰기
                savings_for_plc = self._format_savings_for_plc(savings_data, equipment)
                self.plc.write_energy_savings(savings_for_plc)

                # VFD 진단 점수 및 중증도 레벨 쓰기
                self.plc.write_vfd_diagnosis(diagnosis_scores, severity_levels)

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

    def _format_savings_for_plc(self, savings_data: Dict, equipment: List[Dict] = None) -> Dict:
        """
        AI 계산기 출력을 PLC 쓰기 포맷으로 변환

        Args:
            savings_data: ai_calculator.calculate_energy_savings() 출력
            equipment: 개별 장비 데이터 리스트 (주파수 포함)

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

        # 개별 장비 전력 계산 (큐빅 법칙: P = P_rated × (f/60)³)
        # 정격 용량: SWP=132kW, FWP=75kW, FAN=54.3kW
        rated_powers = [132, 132, 132, 75, 75, 75, 54.3, 54.3, 54.3, 54.3]
        equipment_powers = []

        if equipment:
            for i, eq in enumerate(equipment):
                freq = eq.get("frequency", 0)
                running = eq.get("running", False) or eq.get("running_fwd", False) or eq.get("running_bwd", False)
                if running and freq > 0:
                    power = rated_powers[i] * (freq / 60) ** 3
                else:
                    power = 0
                equipment_powers.append(power)
        else:
            equipment_powers = [0] * 10

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
            # 개별 장비 실제 전력 (kW) - 큐빅 법칙으로 계산
            "equipment_power_0": equipment_powers[0],  # SWP1
            "equipment_power_1": equipment_powers[1],  # SWP2
            "equipment_power_2": equipment_powers[2],  # SWP3
            "equipment_power_3": equipment_powers[3],  # FWP1
            "equipment_power_4": equipment_powers[4],  # FWP2
            "equipment_power_5": equipment_powers[5],  # FWP3
            "equipment_power_6": equipment_powers[6],  # FAN1
            "equipment_power_7": equipment_powers[7],  # FAN2
            "equipment_power_8": equipment_powers[8],  # FAN3
            "equipment_power_9": equipment_powers[9],  # FAN4
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

    def _apply_fan_count_control(self, target_count: int):
        """
        E/R 팬 대수 제어 명령 전송

        현재 작동 대수와 목표 대수를 비교하여 START/STOP 명령 전송

        Args:
            target_count: 목표 팬 대수 (2-4)
        """
        if target_count == self.current_fan_count:
            return  # 변경 없음

        if target_count > self.current_fan_count:
            # 대수 증가: 정지된 팬 중 첫 번째 START
            fan_index = 6 + self.current_fan_count  # FAN1=6, FAN2=7, FAN3=8, FAN4=9
            if fan_index < 10:
                self.plc.send_equipment_start(fan_index)
                logger.info(f"[대수 제어] 팬 {self.current_fan_count} → {target_count}대: FAN{self.current_fan_count+1} START")
                self.current_fan_count = target_count

        elif target_count < self.current_fan_count:
            # 대수 감소: 운전 중인 팬 중 마지막 STOP
            fan_index = 6 + (self.current_fan_count - 1)  # 마지막 팬
            if fan_index >= 6:
                self.plc.send_equipment_stop(fan_index)
                logger.info(f"[대수 제어] 팬 {self.current_fan_count} → {target_count}대: FAN{self.current_fan_count} STOP")
                self.current_fan_count = target_count

    def _process_vfd_anomalies(self, equipment: List[Dict], diagnosis_scores: List[int],
                                severity_levels: List[int], diagnosis_details: List[Dict]):
        """
        VFD 이상 징후 감지 및 DB 저장

        - 새로운 이상 징후 발생 시 DB에 저장
        - 기존 이상 징후가 정상으로 복귀 시 자동 해제

        Args:
            equipment: 장비 상태 리스트 (10개)
            diagnosis_scores: 건강도 점수 리스트 (10개, 0-100)
            severity_levels: 중증도 레벨 리스트 (10개, 0-3)
            diagnosis_details: 진단 상세 정보 리스트 (10개)
        """
        equipment_names = [
            "SW_PUMP_1", "SW_PUMP_2", "SW_PUMP_3",
            "FW_PUMP_1", "FW_PUMP_2", "FW_PUMP_3",
            "ER_FAN_1", "ER_FAN_2", "ER_FAN_3", "ER_FAN_4"
        ]

        severity_names = {0: "정상", 1: "주의", 2: "경고", 3: "위험"}

        for i, eq in enumerate(equipment):
            if i >= len(severity_levels):
                break

            eq_id = equipment_names[i]
            severity_level = severity_levels[i]
            health_score = diagnosis_scores[i]
            detail = diagnosis_details[i] if i < len(diagnosis_details) else {}

            has_anomaly = severity_level > 0
            had_anomaly = eq_id in self.active_anomalies

            if has_anomaly and not had_anomaly:
                # 새로운 이상 징후 발생 - DB에 저장
                import uuid
                anomaly_id = f"ANO-{eq_id}-{datetime.now().strftime('%Y%m%d%H%M%S')}-{uuid.uuid4().hex[:6]}"

                # 권고사항 생성
                recommendations = self._generate_recommendations(eq_id, severity_level, detail)

                # DB에 저장
                self.db.insert_vfd_anomaly(
                    anomaly_id=anomaly_id,
                    equipment_id=eq_id,
                    severity_level=severity_level,
                    severity_name=severity_names.get(severity_level, "알 수 없음"),
                    health_score=health_score,
                    total_severity_score=detail.get('total_severity_score', 100 - health_score),
                    motor_thermal=detail.get('motor_thermal', 0),
                    heatsink_temp=detail.get('heatsink_temp', 0),
                    inverter_thermal=detail.get('inverter_thermal', 0),
                    motor_current=detail.get('motor_current', 0),
                    current_imbalance=detail.get('current_imbalance', 0),
                    warning_word=detail.get('warning_word', 0),
                    over_temps=detail.get('over_temps', 0),
                    recommendations=recommendations
                )

                # 활성 이상 징후로 등록
                self.active_anomalies[eq_id] = anomaly_id
                logger.warning(f"⚠️  [이상 징후 발생] {eq_id}: 중증도 {severity_level} ({severity_names[severity_level]}), 건강도 {health_score}%")

            elif has_anomaly and had_anomaly:
                # 기존 이상 징후 유지 - 중증도 변경 확인 (로깅만)
                pass  # 필요시 중증도 변경 시 업데이트 로직 추가 가능

            elif not has_anomaly and had_anomaly:
                # 이상 징후 해소 - 자동 해제
                anomaly_id = self.active_anomalies[eq_id]
                self.db.auto_clear_vfd_anomaly(anomaly_id)
                del self.active_anomalies[eq_id]
                logger.info(f"✅ [이상 징후 해소] {eq_id}: 정상 복귀, anomaly_id={anomaly_id}")

    def _generate_recommendations(self, eq_id: str, severity_level: int, detail: Dict) -> str:
        """
        이상 징후에 대한 권고사항 생성

        Args:
            eq_id: 장비 ID
            severity_level: 중증도 레벨 (1-3)
            detail: 진단 상세 정보

        Returns:
            권고사항 문자열
        """
        recommendations = []

        # 중증도별 기본 권고사항
        if severity_level == 3:
            recommendations.append("즉시 장비 점검 필요")
            recommendations.append("운전 중단 검토")
        elif severity_level == 2:
            recommendations.append("정비 계획 수립 권장")
            recommendations.append("모니터링 강화")
        elif severity_level == 1:
            recommendations.append("주의 관찰 필요")
            recommendations.append("정기 점검 시 확인")

        # 상세 정보 기반 추가 권고사항
        motor_thermal = detail.get('motor_thermal', 0)
        heatsink_temp = detail.get('heatsink_temp', 0)
        current_imbalance = detail.get('current_imbalance', 0)

        if motor_thermal > 120:
            recommendations.append("모터 과열 - 냉각 시스템 점검")
        elif motor_thermal > 100:
            recommendations.append("모터 온도 상승 - 부하 확인")

        if heatsink_temp > 80:
            recommendations.append("히트싱크 과열 - 환기 상태 점검")
        elif heatsink_temp > 70:
            recommendations.append("히트싱크 온도 상승 - 먼지 청소 권장")

        if current_imbalance > 15:
            recommendations.append("전류 불균형 심함 - 전원 품질 점검")
        elif current_imbalance > 10:
            recommendations.append("전류 불균형 - 케이블 연결 확인")

        return "; ".join(recommendations)


def start_api_server_thread():
    """API 서버를 별도 스레드에서 시작"""
    try:
        from api_server import start_api_server
        start_api_server(host="0.0.0.0", port=8000)
    except Exception as e:
        logger.error(f"API 서버 시작 실패: {e}")


def main():
    """메인 함수"""
    try:
        # API 서버를 별도 스레드에서 시작
        api_thread = threading.Thread(target=start_api_server_thread, daemon=True)
        api_thread.start()
        logger.info("[API] Edge Computer API 서버 시작됨 (포트 8000)")

        # Edge AI 시스템 시작
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
