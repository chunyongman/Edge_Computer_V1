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
from datetime import datetime
from typing import Dict, Any, Optional
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
        self.temp_buffer['t1'].append(sensors.get('T1', 25.0))
        self.temp_buffer['t2'].append(sensors.get('T2', 30.0))
        self.temp_buffer['t3'].append(sensors.get('T3', 30.0))
        self.temp_buffer['t4'].append(sensors.get('T4', 45.0))
        self.temp_buffer['t5'].append(sensors.get('T5', 35.0))
        self.temp_buffer['t6'].append(sensors.get('T6', 43.0))
        self.temp_buffer['t7'].append(sensors.get('T7', 30.0))
        self.temp_buffer['engine_load'].append(sensors.get('ENGINE_LOAD', 70.0))

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

                # 온도 시퀀스 획득
                temp_sequence = self.get_temperature_sequence()

                # 통합 제어기로 AI 결정 수행
                control_decision = self.controller.decide(
                    sensors=sensors,
                    equipment_states=equipment,
                    temperature_sequence=temp_sequence
                )

                ai_elapsed = (time.time() - ai_start) * 1000  # ms
                self.ai_inference_times.append(ai_elapsed)

                # ===== Step 5: PLC로 제어 명령 전송 =====
                # 목표 주파수 쓰기
                target_frequencies = self._extract_target_frequencies(control_decision)
                self.plc.write_ai_target_frequency(target_frequencies)

                # ===== Step 6: 주기적 상태 출력 (10초마다) =====
                if time.time() - last_status_time >= 10:
                    self.print_status(control_decision, sensors)
                    last_status_time = time.time()

                # ===== Step 7: 배치 학습 체크 (수요일/일요일 02:00-04:00) =====
                self.batch_learning.check_and_run_learning()

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

    def print_status(self, decision: ControlDecision, sensors: Dict):
        """주기적 상태 출력"""
        logger.info("\n" + "=" * 80)
        logger.info(f"[상태] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Cycle #{self.cycle_count}")
        logger.info("-" * 80)

        # 센서 데이터
        logger.info(f"🌡️  센서:")
        logger.info(f"   T5 (FW Outlet): {sensors.get('T5', 0):.1f}°C")
        logger.info(f"   T6 (E/R): {sensors.get('T6', 0):.1f}°C")
        logger.info(f"   엔진 부하: {sensors.get('ENGINE_LOAD', 0):.1f}%")

        # AI 제어 결정
        logger.info(f"\n🤖 AI 제어:")
        logger.info(f"   모드: {decision.control_mode}")
        logger.info(f"   SW 펌프: {decision.sw_pump_freq:.1f} Hz")
        logger.info(f"   FW 펌프: {decision.fw_pump_freq:.1f} Hz")
        logger.info(f"   E/R 팬: {decision.er_fan_freq:.1f} Hz (작동 {decision.er_fan_count}대)")
        logger.info(f"   이유: {decision.reason}")

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
