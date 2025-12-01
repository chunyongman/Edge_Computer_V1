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

    def calculate_vfd_diagnosis(self, equipment_list: List[Dict], sensors: Dict = None) -> tuple:
        """
        VFD 예방 진단 - 4단계 중증도 점수 계산

        사양서 기준:
        - Level 1 (정상 0점): Motor Thermal < 80%, Heatsink < 60°C, Current < 90%
        - Level 2 (주의 1점): Motor Thermal 80-90%, Heatsink 60-70°C, Warning Word 활성
        - Level 3 (경고 2점): Motor Thermal 90-100%, Heatsink 70-80°C, Over Temp's 발생
        - Level 4 (위험 3점): Motor Thermal > 100%, Heatsink > 80°C, 반복적 알람 발생

        종합 점수:
        - 0-2점: 정상 운전 (Normal)
        - 3-5점: 모니터링 강화 (Attention)
        - 6-8점: 정비 계획 수립 (Planning)
        - 9점 이상: 즉시 점검 필요 (Critical)

        Args:
            equipment_list: 장비 데이터 (VFD 진단 데이터 포함)
            sensors: 센서 데이터

        Returns:
            (diagnosis_scores, severity_levels, diagnosis_details)
            - diagnosis_scores: 각 장비별 건강도 점수 (0-100, 100=정상)
            - severity_levels: 각 장비별 중증도 레벨 (0-3)
            - diagnosis_details: 상세 진단 결과 리스트
        """
        thresholds = config.VFD_DIAGNOSIS_THRESHOLDS

        diagnosis_scores = []
        severity_levels = []
        diagnosis_details = []

        for i, eq in enumerate(equipment_list):
            # 장비 타입별 정격 전류 결정
            if i < 3:  # SWP
                rated_current = config.MOTOR_RATED_CURRENT["SWP"]
            elif i < 6:  # FWP
                rated_current = config.MOTOR_RATED_CURRENT["FWP"]
            else:  # FAN
                rated_current = config.MOTOR_RATED_CURRENT["FAN"]

            # VFD 진단 데이터 추출
            motor_thermal = eq.get("motor_thermal", 0)
            heatsink_temp = eq.get("heatsink_temp", 0)
            inverter_thermal = eq.get("inverter_thermal", 0)
            motor_current = eq.get("motor_current", 0)
            warning_word = eq.get("warning_word", 0)
            over_temps = eq.get("over_temps", 0)

            # 3상 전류 불평형 계산
            phase_u = eq.get("phase_u_current", 0)
            phase_v = eq.get("phase_v_current", 0)
            phase_w = eq.get("phase_w_current", 0)

            # 전류 정격 대비 비율 (%)
            current_ratio = (motor_current / rated_current * 100) if rated_current > 0 else 0

            # 3상 불평형률 계산 (%)
            phase_currents = [phase_u, phase_v, phase_w]
            avg_current = sum(phase_currents) / 3 if any(phase_currents) else 0
            if avg_current > 0:
                max_deviation = max(abs(c - avg_current) for c in phase_currents)
                current_imbalance = (max_deviation / avg_current) * 100
            else:
                current_imbalance = 0

            # === 각 파라미터별 중증도 점수 계산 ===
            param_scores = {}

            # 1. Motor Thermal
            param_scores["motor_thermal"] = self._get_severity_score(
                motor_thermal, thresholds["motor_thermal"])

            # 2. Heatsink Temperature
            param_scores["heatsink_temp"] = self._get_severity_score(
                heatsink_temp, thresholds["heatsink_temp"])

            # 3. Inverter Thermal
            param_scores["inverter_thermal"] = self._get_severity_score(
                inverter_thermal, thresholds["inverter_thermal"])

            # 4. Motor Current Ratio
            param_scores["motor_current"] = self._get_severity_score(
                current_ratio, thresholds["motor_current_ratio"])

            # 5. Current Imbalance
            param_scores["current_imbalance"] = self._get_severity_score(
                current_imbalance, thresholds["current_imbalance"])

            # 6. Warning Word (비트 활성화 시 1점)
            param_scores["warning_word"] = 1 if warning_word > 0 else 0

            # 7. Over Temps (과열 이력 발생 시 2점, 반복 시 3점)
            if over_temps == 0:
                param_scores["over_temps"] = 0
            elif over_temps < 3:
                param_scores["over_temps"] = 2
            else:
                param_scores["over_temps"] = 3

            # === 종합 점수 계산 ===
            total_severity_score = sum(param_scores.values())

            # 중증도 레벨 결정 (0-3)
            if total_severity_score <= 2:
                severity_level = 0  # Normal
                severity_name = "정상"
            elif total_severity_score <= 5:
                severity_level = 1  # Attention
                severity_name = "주의"
            elif total_severity_score <= 8:
                severity_level = 2  # Planning
                severity_name = "경고"
            else:
                severity_level = 3  # Critical
                severity_name = "위험"

            # 건강도 점수 계산 (0-100, 100=정상)
            # 최대 21점(7개 항목 × 3점) → 0점, 0점 → 100점
            max_score = 21
            health_score = max(0, min(100, int(100 - (total_severity_score / max_score * 100))))

            # 비정상 상태 체크 (장비 자체 이상)
            if eq.get("abnormal"):
                health_score = min(health_score, 50)
                severity_level = max(severity_level, 2)
                severity_name = "경고" if severity_level == 2 else "위험"

            diagnosis_scores.append(health_score)
            severity_levels.append(severity_level)

            # 상세 진단 결과
            diagnosis_details.append({
                "name": eq.get("name", f"Equipment_{i}"),
                "health_score": health_score,
                "severity_level": severity_level,
                "severity_name": severity_name,
                "total_severity_score": total_severity_score,
                "parameters": {
                    "motor_thermal": {"value": motor_thermal, "unit": "%", "score": param_scores["motor_thermal"]},
                    "heatsink_temp": {"value": heatsink_temp, "unit": "°C", "score": param_scores["heatsink_temp"]},
                    "inverter_thermal": {"value": inverter_thermal, "unit": "%", "score": param_scores["inverter_thermal"]},
                    "motor_current": {"value": motor_current, "unit": "A", "ratio": round(current_ratio, 1), "score": param_scores["motor_current"]},
                    "current_imbalance": {"value": round(current_imbalance, 1), "unit": "%", "score": param_scores["current_imbalance"]},
                    "warning_word": {"value": warning_word, "score": param_scores["warning_word"]},
                    "over_temps": {"value": over_temps, "unit": "회", "score": param_scores["over_temps"]},
                },
                "recommendations": self._get_recommendations(severity_level, param_scores)
            })

        return diagnosis_scores, severity_levels, diagnosis_details

    def _get_severity_score(self, value: float, threshold: Dict) -> int:
        """
        파라미터 값에 따른 중증도 점수 반환 (0-3점)

        Args:
            value: 측정값
            threshold: 임계값 딕셔너리 {"normal": x, "attention": y, "warning": z}

        Returns:
            중증도 점수 (0=정상, 1=주의, 2=경고, 3=위험)
        """
        if value < threshold["normal"]:
            return 0  # 정상
        elif value < threshold["attention"]:
            return 1  # 주의
        elif value < threshold["warning"]:
            return 2  # 경고
        else:
            return 3  # 위험

    def _get_recommendations(self, severity_level: int, param_scores: Dict) -> List[str]:
        """
        중증도 레벨 및 파라미터 점수에 따른 권장 조치 반환

        Args:
            severity_level: 중증도 레벨 (0-3)
            param_scores: 각 파라미터별 점수

        Returns:
            권장 조치 리스트
        """
        recommendations = []

        if severity_level == 0:
            recommendations.append("정상 운전 중. 정기 점검 일정에 따라 모니터링 유지.")
            return recommendations

        # 파라미터별 권장 조치
        if param_scores.get("motor_thermal", 0) >= 2:
            recommendations.append("모터 과열 징후. 냉각 시스템 점검 및 부하 확인 필요.")

        if param_scores.get("heatsink_temp", 0) >= 2:
            recommendations.append("인버터 방열판 온도 상승. 환기 상태 및 팬 동작 확인 필요.")

        if param_scores.get("inverter_thermal", 0) >= 2:
            recommendations.append("인버터 열부하 증가. 주변 온도 및 부하 상태 점검 필요.")

        if param_scores.get("motor_current", 0) >= 2:
            recommendations.append("모터 전류 과부하. 기계적 부하 및 베어링 상태 점검 필요.")

        if param_scores.get("current_imbalance", 0) >= 2:
            recommendations.append("3상 전류 불평형 감지. 케이블 및 모터 권선 점검 필요.")

        if param_scores.get("warning_word", 0) > 0:
            recommendations.append("VFD 경고 발생. 경고 코드 확인 및 원인 분석 필요.")

        if param_scores.get("over_temps", 0) >= 2:
            recommendations.append("과열 이력 다수 발생. 근본 원인 분석 및 예방 정비 필요.")

        # 중증도별 추가 권장 조치
        if severity_level == 1:
            recommendations.append("▶ 모니터링 주기 강화 권장 (1시간 → 30분)")
        elif severity_level == 2:
            recommendations.append("▶ 정비 계획 수립 필요. 다음 정비 기회에 점검 예정.")
        elif severity_level == 3:
            recommendations.append("▶ 즉시 점검 필요! 장비 손상 방지를 위해 운전 중단 검토.")

        return recommendations
