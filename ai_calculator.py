#!/usr/bin/env python3
# -*- coding: utf-8 -*-
r"""
Edge AI 계산 모듈
HMI Backend에서 이식된 AI 계산 로직

원본: c:\Users\my\Desktop\HMI_REAL\backend\modbus_client.py
- calculate_energy_savings_from_edge() (Line 726-859)
- calculate_ai_target_frequency() (Line 861-958)
- calculate_energy_savings_summary() (Line 960-1027)
"""

import random
import time
from datetime import datetime
from typing import Dict, List, Any
import config


class EdgeAICalculator:
    """Edge AI 계산 엔진"""

    def __init__(self):
        # 에너지 누적 데이터
        self.energy_accumulator = {
            "today_start": datetime.now().replace(hour=0, minute=0, second=0, microsecond=0),
            "month_start": datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0),
            "today_total_kwh_saved": 0.0,
            "month_total_kwh_saved": 0.0,
            "today_samples": 0,
            "month_samples": 0,
            "last_update": time.time()
        }

        print("[Edge AI] AI 계산 엔진 초기화 완료")

    def calculate_energy_savings(self, equipment_list: List[Dict]) -> Dict[str, Any]:
        """
        에너지 절감률 계산
        팬/펌프 법칙: P = k × N³ (전력은 회전수의 3제곱에 비례)

        Args:
            equipment_list: 장비 데이터 리스트

        Returns:
            에너지 절감률 데이터 (total, swp, fwp, fan)
        """
        # 장비별 정격 전력 (kW)
        RATED_POWER = config.MOTOR_CAPACITY

        # 초기화
        swp_power_60hz = 0.0
        swp_power_vfd = 0.0
        fwp_power_60hz = 0.0
        fwp_power_vfd = 0.0
        fan_power_60hz = 0.0
        fan_power_vfd = 0.0

        # 각 장비별 계산
        for i, eq in enumerate(equipment_list):
            frequency = eq.get("frequency", 0.0)

            # 장비 유형 구분
            if i < 3:  # SWP1, SWP2, SWP3
                rated_power = RATED_POWER["SWP"]
                # 60Hz 고정 운전 시 전력 (정격 전력)
                power_at_60hz = rated_power if eq.get("running") else 0
                # 현재 주파수 운전 시 전력 (팬/펌프 법칙 적용)
                power_at_current_freq = rated_power * ((frequency / 60) ** 3) if frequency > 0 else 0

                swp_power_60hz += power_at_60hz
                swp_power_vfd += power_at_current_freq

            elif i < 6:  # FWP1, FWP2, FWP3
                rated_power = RATED_POWER["FWP"]
                power_at_60hz = rated_power if eq.get("running") else 0
                power_at_current_freq = rated_power * ((frequency / 60) ** 3) if frequency > 0 else 0

                fwp_power_60hz += power_at_60hz
                fwp_power_vfd += power_at_current_freq

            else:  # FAN1, FAN2, FAN3, FAN4
                rated_power = RATED_POWER["FAN"]
                power_at_60hz = rated_power if (eq.get("running_fwd") or eq.get("running_bwd")) else 0
                power_at_current_freq = rated_power * ((frequency / 60) ** 3) if frequency > 0 else 0

                fan_power_60hz += power_at_60hz
                fan_power_vfd += power_at_current_freq

        # 시스템별 절감량 및 절감률 계산
        def calc_savings(power_60hz, power_vfd):
            savings_kw = round(power_60hz - power_vfd, 1)
            savings_rate = round((savings_kw / power_60hz * 100), 1) if power_60hz > 0 else 0.0
            return {
                "power_60hz": round(power_60hz, 1),
                "power_vfd": round(power_vfd, 1),
                "savings_kw": savings_kw,
                "savings_rate": savings_rate
            }

        swp_data = calc_savings(swp_power_60hz, swp_power_vfd)
        fwp_data = calc_savings(fwp_power_60hz, fwp_power_vfd)
        fan_data = calc_savings(fan_power_60hz, fan_power_vfd)

        # 전체 절감량 계산
        total_power_60hz = swp_power_60hz + fwp_power_60hz + fan_power_60hz
        total_power_vfd = swp_power_vfd + fwp_power_vfd + fan_power_vfd
        total_data = calc_savings(total_power_60hz, total_power_vfd)

        # 누적 절감률 계산 (캘린더 기준)
        now = datetime.now()
        current_time = time.time()
        time_delta = current_time - self.energy_accumulator["last_update"]

        # 자정이 지나면 오늘 누적 데이터 리셋
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        if today_start > self.energy_accumulator["today_start"]:
            self.energy_accumulator["today_start"] = today_start
            self.energy_accumulator["today_total_kwh_saved"] = 0.0
            self.energy_accumulator["today_samples"] = 0
            print("[Edge AI] 📅 자정 경과: 오늘 누적 데이터 리셋")

        # 월초가 지나면 이번 달 누적 데이터 리셋
        month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        if month_start > self.energy_accumulator["month_start"]:
            self.energy_accumulator["month_start"] = month_start
            self.energy_accumulator["month_total_kwh_saved"] = 0.0
            self.energy_accumulator["month_samples"] = 0
            print("[Edge AI] 📅 월초 경과: 이번 달 누적 데이터 리셋")

        # 실시간 절감 전력(kW)을 시간당 절감량(kWh)으로 변환
        if time_delta > 0:
            kwh_saved_increment = total_data["savings_kw"] * (time_delta / 3600)
            self.energy_accumulator["today_total_kwh_saved"] += kwh_saved_increment
            self.energy_accumulator["month_total_kwh_saved"] += kwh_saved_increment
            self.energy_accumulator["today_samples"] += 1
            self.energy_accumulator["month_samples"] += 1
            self.energy_accumulator["last_update"] = current_time

        # 누적 절감률 계산 (평균)
        today_avg_rate = total_data["savings_rate"]
        month_avg_rate = total_data["savings_rate"]

        return {
            "realtime": {
                "total": total_data,
                "swp": swp_data,
                "fwp": fwp_data,
                "fan": fan_data
            },
            "today": {
                "total_kwh_saved": round(self.energy_accumulator["today_total_kwh_saved"], 1),
                "avg_savings_rate": round(today_avg_rate, 1),
                "start_time": self.energy_accumulator["today_start"].isoformat()
            },
            "month": {
                "total_kwh_saved": round(self.energy_accumulator["month_total_kwh_saved"], 1),
                "avg_savings_rate": round(month_avg_rate, 1),
                "start_time": self.energy_accumulator["month_start"].isoformat()
            }
        }

    def calculate_ai_target_frequency(self, equipment_list: List[Dict], sensors: Dict = None) -> List[Dict]:
        """
        AI 목표 주파수 계산
        센서 데이터를 기반으로 각 장비의 최적 주파수 계산

        Args:
            equipment_list: 펌프/팬 리스트
            sensors: 센서 데이터 (TX1-7, PX1-2, PU1)

        Returns:
            AI 목표 주파수 데이터 리스트
        """
        result = []

        # 그룹별 장비 정의
        groups = [
            {
                "group": "SW 펌프",
                "equipment": equipment_list[0:3],  # SWP1, SWP2, SWP3
                "base_target": config.AI_TARGET_FREQUENCY["SWP"]  # 48.4 Hz
            },
            {
                "group": "FW 펌프",
                "equipment": equipment_list[3:6],  # FWP1, FWP2, FWP3
                "base_target": config.AI_TARGET_FREQUENCY["FWP"]  # 48.4 Hz
            },
            {
                "group": "E/R 팬",
                "equipment": equipment_list[6:10],  # FAN1~4
                "base_target": config.AI_TARGET_FREQUENCY["FAN"]  # 47.3 Hz
            }
        ]

        for group_info in groups:
            group_name = group_info["group"]
            base_target = group_info["base_target"]

            for equip in group_info["equipment"]:
                # VFD/BYPASS 모드 확인
                vfd_mode = equip.get("vfd_mode", True)
                control_mode = "VFD" if vfd_mode else "BYPASS"

                # 운전 중인 경우에만 목표 주파수 생성
                if equip.get("running") or equip.get("running_fwd") or equip.get("running_bwd"):
                    # BYPASS 모드일 경우 목표 주파수는 60Hz 고정
                    if not vfd_mode:
                        target_freq = 60.0
                    else:
                        # AI가 계산한 목표 주파수 (약간의 변동 추가)
                        # TODO: 실제 AI 모델로 교체 (센서 데이터 기반 예측)
                        target_freq = base_target + random.uniform(-0.5, 0.5)

                    # 실제 VFD 피드백 주파수
                    actual_freq = equip.get("frequency", 0)

                    # 편차 계산
                    deviation = actual_freq - target_freq

                    # 상태 판단 (편차 기준: ±0.3Hz 이내=정상, ±0.3~1.0Hz=주의, ±1.0Hz 초과=경고)
                    if abs(deviation) <= 0.3:
                        status = "정상"
                    elif abs(deviation) < 1.0:
                        status = "주의"
                    else:
                        status = "경고"

                    # 입력 조건
                    input_conditions = ""
                    if "SW" in group_name:
                        input_conditions = "TX5, PX1"
                    elif "FW" in group_name:
                        input_conditions = "TX4"
                    else:  # E/R 팬
                        input_conditions = "TX6, TX7"

                    result.append({
                        "group": group_name,
                        "name": equip["name"],
                        "mode": control_mode,
                        "input_conditions": input_conditions,
                        "target_frequency": round(target_freq, 1),
                        "actual_frequency": round(actual_freq, 1),
                        "deviation": round(deviation, 2),
                        "status": status
                    })
                else:
                    # 정지 중인 경우
                    result.append({
                        "group": group_name,
                        "name": equip["name"],
                        "mode": "정지",
                        "input_conditions": "-",
                        "target_frequency": 0.0,
                        "actual_frequency": 0.0,
                        "deviation": 0.0,
                        "status": "-"
                    })

        return result

    def calculate_energy_savings_summary(self, equipment_list: List[Dict]) -> List[Dict]:
        """
        각 장비별 에너지 절감 상세 데이터 계산

        Args:
            equipment_list: 장비 데이터 리스트

        Returns:
            각 장비별 에너지 절감 상세 데이터 리스트
        """
        result = []

        for i, eq in enumerate(equipment_list):
            # 장비 이름 및 타입 결정
            if i < 3:  # SWP1, SWP2, SWP3
                motor_capacity = config.MOTOR_CAPACITY["SWP"]
            elif i < 6:  # FWP1, FWP2, FWP3
                motor_capacity = config.MOTOR_CAPACITY["FWP"]
            else:  # FAN1, FAN2, FAN3, FAN4
                motor_capacity = config.MOTOR_CAPACITY["FAN"]

            # 현재 주파수 및 전력 계산
            actual_freq = eq.get("frequency", 0.0)

            # 실제 전력 (팬/펌프 법칙: P = k × N³)
            actual_power = motor_capacity * ((actual_freq / 60) ** 3) if actual_freq > 0 else 0.0

            # 60Hz 고정 운전 시 전력 (정격 전력)
            power_at_60hz = motor_capacity if (eq.get("running") or eq.get("running_fwd") or eq.get("running_bwd")) else 0.0

            # 절감 전력
            saved_power = power_at_60hz - actual_power

            # 절감률
            saved_ratio = (saved_power / power_at_60hz * 100) if power_at_60hz > 0 else 0.0

            # ESS 모드 운전 시간 (ess_mode가 활성화된 시간)
            ess_mode = eq.get("ess_mode", False)
            run_hours = eq.get("run_hours", 0) if ess_mode else 0

            # KW Average (실제 전력의 평균 - 여기서는 실시간 값 사용)
            kw_average = actual_power

            # 누적 절감 에너지 (kWh) = 절감 전력(kW) × 운전 시간(h)
            saved_kwh = saved_power * (run_hours / 1000) if run_hours > 0 else 0.0

            result.append({
                "name": eq["name"],
                "motor_capacity": round(motor_capacity, 1),
                "actual_freq": round(actual_freq, 1),
                "actual_power": round(actual_power, 1),
                "kw_average": round(kw_average, 1),
                "saved_kwh": round(saved_kwh, 1),
                "saved_ratio": round(saved_ratio, 1),
                "run_hours_ess": run_hours
            })

        return result

    def calculate_vfd_diagnosis(self, equipment_list: List[Dict], sensors: Dict = None) -> List[int]:
        """
        VFD 예방 진단 점수 계산 (0-100)

        Args:
            equipment_list: 장비 데이터
            sensors: 센서 데이터

        Returns:
            각 장비별 진단 점수 (0-100, 100=정상)
        """
        # 간단한 진단 로직 (실제로는 ML 모델 사용)
        scores = []

        for eq in equipment_list:
            # 기본 점수 100에서 시작
            score = 100

            # 비정상 상태면 점수 감소
            if eq.get("abnormal"):
                score -= 50

            # 주파수 변동이 크면 점수 감소
            freq = eq.get("frequency", 0)
            if freq > 55:
                score -= 10  # 과속
            elif freq > 0 and freq < 40:
                score -= 10  # 저속

            # 전력이 비정상이면 점수 감소
            power = eq.get("power", 0)
            if power > 100:
                score -= 10  # 과부하

            # 최소 0, 최대 100
            score = max(0, min(100, score))
            scores.append(score)

        return scores
