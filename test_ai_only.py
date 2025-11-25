#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI 기능만 테스트 (PLC 연결 없이)
"""

import sys
import logging
from datetime import datetime
from collections import deque

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
logger = logging.getLogger(__name__)

# EDGE_AI_REAL 모듈 임포트
from src.control.integrated_controller import IntegratedController
from src.ml.temperature_predictor import TemperatureSequence

def main():
    """AI 기능 테스트"""

    logger.info("=" * 80)
    logger.info("  AI 기능 테스트 (PLC 연결 없이)")
    logger.info("  - Random Forest Optimizer")
    logger.info("  - Temperature Predictor")
    logger.info("  - Pattern Classifier")
    logger.info("=" * 80)

    # 통합 제어기 초기화
    controller = IntegratedController(enable_predictive_control=True)

    logger.info("\n✅ 통합 제어기 초기화 완료")
    logger.info("   - ML 모델 로드 완료")
    logger.info("   - 예측 제어 활성화")

    # 더미 센서 데이터 생성
    sensors = {
        'T1': 25.0,  # 해수 온도
        'T2': 30.0,
        'T3': 30.0,
        'T4': 45.0,  # FW Inlet
        'T5': 35.0,  # FW Outlet
        'T6': 43.0,  # E/R 온도
        'T7': 30.0,  # 외기
        'ENGINE_LOAD': 75.0,
        'GPS_LAT': 35.0,
        'GPS_LON': 129.0,
        'SHIP_SPEED': 15.0
    }

    # 더미 장비 상태
    equipment = []
    for i in range(10):
        equipment.append({
            'name': f'EQUIP_{i+1}',
            'running': True,
            'frequency': 48.0
        })

    # 온도 시퀀스 생성 (30분 데이터)
    timestamps = [datetime.now() for _ in range(90)]
    temp_sequence = TemperatureSequence(
        timestamps=timestamps,
        t1_sequence=[25.0] * 90,
        t2_sequence=[30.0] * 90,
        t3_sequence=[30.0] * 90,
        t4_sequence=[45.0 + i*0.01 for i in range(90)],  # 점진적 증가
        t5_sequence=[35.0] * 90,
        t6_sequence=[43.0 + i*0.01 for i in range(90)],  # 점진적 증가
        t7_sequence=[30.0] * 90,
        engine_load_sequence=[75.0] * 90
    )

    logger.info("\n🌡️  더미 센서 데이터:")
    logger.info(f"   T5 (FW Outlet): {sensors['T5']}°C")
    logger.info(f"   T6 (E/R): {sensors['T6']}°C")
    logger.info(f"   엔진 부하: {sensors['ENGINE_LOAD']}%")

    # AI 제어 결정
    logger.info("\n🤖 AI 제어 결정 수행 중...")

    try:
        decision = controller.decide(
            sensors=sensors,
            equipment_states=equipment,
            temperature_sequence=temp_sequence
        )

        logger.info("\n✅ AI 제어 결정 완료:")
        logger.info(f"   모드: {decision.control_mode}")
        logger.info(f"   SW 펌프: {decision.sw_pump_freq:.1f} Hz")
        logger.info(f"   FW 펌프: {decision.fw_pump_freq:.1f} Hz")
        logger.info(f"   E/R 팬: {decision.er_fan_freq:.1f} Hz (작동 {decision.er_fan_count}대)")
        logger.info(f"   이유: {decision.reason}")

        if decision.temperature_prediction:
            pred = decision.temperature_prediction
            logger.info(f"\n🔮 온도 예측 (10분 후):")
            logger.info(f"   T5: {pred.t5_current:.1f}°C → {pred.t5_pred_10min:.1f}°C")
            logger.info(f"   T6: {pred.t6_current:.1f}°C → {pred.t6_pred_10min:.1f}°C")
            logger.info(f"   추론 시간: {pred.inference_time_ms:.1f}ms")

        logger.info("\n" + "=" * 80)
        logger.info("✅ 모든 AI 기능이 정상 작동합니다!")
        logger.info("=" * 80)

    except Exception as e:
        logger.error(f"\n❌ AI 제어 오류: {e}")
        import traceback
        traceback.print_exc()
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
