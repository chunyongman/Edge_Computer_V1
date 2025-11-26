"""
VFD 이상 징후 감지 시스템 (Danfoss VFD 기준)
10개 VFD 실시간 모니터링 및 상태 등급 판정
"""
from dataclasses import dataclass
from typing import Dict, List, Optional
from datetime import datetime, timedelta
from enum import Enum
import numpy as np


class VFDStatus(Enum):
    """VFD 상태 등급"""
    NORMAL = "normal"  # 정상
    CAUTION = "caution"  # 주의
    WARNING = "warning"  # 경고
    CRITICAL = "critical"  # 위험


class VFDType(Enum):
    """VFD 타입"""
    SW_PUMP = "sw_pump"
    FW_PUMP = "fw_pump"
    ER_FAN = "er_fan"


@dataclass
class DanfossStatusBits:
    """
    Danfoss VFD StatusBits

    각 비트는 True/False로 표현
    """
    trip: bool  # VFD 트립 발생
    error: bool  # 오류 발생
    warning: bool  # 경고 발생
    voltage_exceeded: bool  # 전압 초과
    torque_exceeded: bool  # 토크 초과
    thermal_exceeded: bool  # 열 초과
    control_ready: bool  # 제어 준비
    drive_ready: bool  # 드라이브 준비
    in_operation: bool  # 운전 중
    speed_equals_reference: bool  # 속도 일치
    bus_control: bool  # 버스 제어

    def get_severity_score(self) -> int:
        """
        심각도 점수 계산 (0-100)

        높을수록 심각
        """
        score = 0

        if self.trip:
            score += 50
        if self.error:
            score += 30
        if self.warning:
            score += 60
        if self.voltage_exceeded:
            score += 20
        if self.torque_exceeded:
            score += 20
        if self.thermal_exceeded:
            score += 25

        # 정상 상태 체크 (부정적)
        if not self.control_ready:
            score += 10
        if not self.drive_ready:
            score += 10
        if self.in_operation and not self.speed_equals_reference:
            score += 10

        return min(100, score)


@dataclass
class VFDInfo:
    """VFD 정보"""
    vfd_id: str
    vfd_type: VFDType
    rated_power_kw: float
    modbus_address: int


@dataclass
class VFDDiagnostic:
    """VFD 진단 결과"""
    timestamp: datetime
    vfd_id: str

    # StatusBits
    status_bits: DanfossStatusBits

    # 운전 데이터
    current_frequency_hz: float
    output_current_a: float
    output_voltage_v: float
    dc_bus_voltage_v: float
    motor_temperature_c: float
    heatsink_temperature_c: float

    # 진단 결과
    status_grade: VFDStatus
    severity_score: int  # 0-100
    anomaly_patterns: List[str]  # 이상 패턴 목록
    recommendation: str  # 권고사항

    # 통계
    cumulative_runtime_hours: float
    trip_count: int
    error_count: int
    warning_count: int

    # 이상 징후 관리
    is_acknowledged: bool = False  # 사용자 확인 여부
    acknowledged_at: Optional[datetime] = None  # 확인 시각
    is_cleared: bool = False  # 해제 여부
    cleared_at: Optional[datetime] = None  # 해제 시각


class VFDMonitor:
    """
    VFD 이상 징후 감지 시스템

    10개 VFD 모니터링:
    - SW펌프 1-3
    - FW펌프 1-3
    - E/R팬 1-4
    """

    def __init__(self):
        """초기화"""
        # VFD 정보
        self.vfds: Dict[str, VFDInfo] = self._initialize_vfds()

        # 진단 히스토리
        self.diagnostic_history: Dict[str, List[VFDDiagnostic]] = {
            vfd_id: [] for vfd_id in self.vfds.keys()
        }

        # 통계
        self.cumulative_runtime: Dict[str, float] = {
            vfd_id: 0.0 for vfd_id in self.vfds.keys()
        }
        self.trip_counts: Dict[str, int] = {
            vfd_id: 0 for vfd_id in self.vfds.keys()
        }
        self.error_counts: Dict[str, int] = {
            vfd_id: 0 for vfd_id in self.vfds.keys()
        }
        self.warning_counts: Dict[str, int] = {
            vfd_id: 0 for vfd_id in self.vfds.keys()
        }

        # 임계값
        self.temp_threshold_motor = 80.0  # °C
        self.temp_threshold_heatsink = 65.0  # °C
        self.voltage_range = (380.0, 420.0)  # V

        # 이상 징후 관리
        self.active_anomalies: Dict[str, VFDDiagnostic] = {}  # 현재 활성 이상 징후
        self.anomaly_history: List[VFDDiagnostic] = []  # 전체 이상 징후 히스토리
        self.auto_clear_delay_minutes = 10  # 자동 해제 대기 시간 (분)
        self.cleared_anomalies: set = set()  # 해제된 VFD ID (정상 복귀 전까지 다시 등록 안함)

    def _initialize_vfds(self) -> Dict[str, VFDInfo]:
        """VFD 정보 초기화"""
        vfds = {}

        # SW펌프 1-3
        for i in range(1, 4):
            vfd_id = f"SW_PUMP_{i}"
            vfds[vfd_id] = VFDInfo(
                vfd_id=vfd_id,
                vfd_type=VFDType.SW_PUMP,
                rated_power_kw=132.0,
                modbus_address=100 + i
            )

        # FW펌프 1-3
        for i in range(1, 4):
            vfd_id = f"FW_PUMP_{i}"
            vfds[vfd_id] = VFDInfo(
                vfd_id=vfd_id,
                vfd_type=VFDType.FW_PUMP,
                rated_power_kw=75.0,
                modbus_address=200 + i
            )

        # E/R팬 1-4
        for i in range(1, 5):
            vfd_id = f"ER_FAN_{i}"
            vfds[vfd_id] = VFDInfo(
                vfd_id=vfd_id,
                vfd_type=VFDType.ER_FAN,
                rated_power_kw=54.3,
                modbus_address=300 + i
            )

        return vfds

    def diagnose_vfd(
        self,
        vfd_id: str,
        status_bits: DanfossStatusBits,
        frequency_hz: float,
        output_current_a: float,
        output_voltage_v: float,
        dc_bus_voltage_v: float,
        motor_temp_c: float,
        heatsink_temp_c: float,
        runtime_seconds: float = 0.0
    ) -> VFDDiagnostic:
        """
        VFD 진단

        Returns:
            VFDDiagnostic
        """
        if vfd_id not in self.vfds:
            raise ValueError(f"Unknown VFD: {vfd_id}")

        # 이상 패턴 분석
        anomaly_patterns = self._analyze_anomaly_patterns(
            vfd_id, status_bits, motor_temp_c, heatsink_temp_c,
            output_voltage_v, dc_bus_voltage_v
        )

        # 심각도 점수
        severity_score = status_bits.get_severity_score()

        # 추가 심각도 (온도, 전압)
        if motor_temp_c > self.temp_threshold_motor:
            severity_score += 15
        if heatsink_temp_c > self.temp_threshold_heatsink:
            severity_score += 10
        if not (self.voltage_range[0] <= output_voltage_v <= self.voltage_range[1]):
            severity_score += 15

        severity_score = min(100, severity_score)

        # 상태 등급 판정
        status_grade = self._determine_status_grade(severity_score, anomaly_patterns)

        # severity와 anomaly_patterns 일관성 유지
        # VFD_WARNING은 severity +60을 의미하므로, severity < 51이면 제거
        if severity_score < 51 and "VFD_WARNING" in anomaly_patterns:
            anomaly_patterns.remove("VFD_WARNING")

        # 권고사항
        recommendation = self._generate_recommendation(
            status_grade, anomaly_patterns, status_bits
        )

        # 통계 업데이트
        if runtime_seconds > 0:
            self.cumulative_runtime[vfd_id] += runtime_seconds / 3600.0

        if status_bits.trip:
            self.trip_counts[vfd_id] += 1
        if status_bits.error:
            self.error_counts[vfd_id] += 1
        if status_bits.warning:
            self.warning_counts[vfd_id] += 1

        diagnostic = VFDDiagnostic(
            timestamp=datetime.now(),
            vfd_id=vfd_id,
            status_bits=status_bits,
            current_frequency_hz=frequency_hz,
            output_current_a=output_current_a,
            output_voltage_v=output_voltage_v,
            dc_bus_voltage_v=dc_bus_voltage_v,
            motor_temperature_c=motor_temp_c,
            heatsink_temperature_c=heatsink_temp_c,
            status_grade=status_grade,
            severity_score=severity_score,
            anomaly_patterns=anomaly_patterns,
            recommendation=recommendation,
            cumulative_runtime_hours=self.cumulative_runtime[vfd_id],
            trip_count=self.trip_counts[vfd_id],
            error_count=self.error_counts[vfd_id],
            warning_count=self.warning_counts[vfd_id]
        )

        # 히스토리 저장 (최근 1000개)
        self.diagnostic_history[vfd_id].append(diagnostic)
        if len(self.diagnostic_history[vfd_id]) > 1000:
            self.diagnostic_history[vfd_id] = self.diagnostic_history[vfd_id][-1000:]

        # 활성 이상 징후 업데이트
        self.update_active_anomalies(vfd_id, diagnostic)

        return diagnostic

    def _analyze_anomaly_patterns(
        self,
        vfd_id: str,
        status_bits: DanfossStatusBits,
        motor_temp: float,
        heatsink_temp: float,
        output_voltage: float,
        dc_bus_voltage: float
    ) -> List[str]:
        """이상 패턴 분석"""
        patterns = []

        # StatusBits 기반
        if status_bits.trip:
            patterns.append("VFD_TRIP")
        if status_bits.error:
            patterns.append("VFD_ERROR")
        if status_bits.warning:
            patterns.append("VFD_WARNING")
        if status_bits.voltage_exceeded:
            patterns.append("VOLTAGE_EXCEEDED")
        if status_bits.torque_exceeded:
            patterns.append("TORQUE_EXCEEDED")
        if status_bits.thermal_exceeded:
            patterns.append("THERMAL_EXCEEDED")

        # 온도 기반
        if motor_temp > self.temp_threshold_motor:
            patterns.append("MOTOR_OVERTEMP")
        elif motor_temp > self.temp_threshold_motor - 10:
            patterns.append("MOTOR_TEMP_HIGH")

        if heatsink_temp > self.temp_threshold_heatsink:
            patterns.append("HEATSINK_OVERTEMP")

        # 전압 기반
        if output_voltage < self.voltage_range[0]:
            patterns.append("VOLTAGE_LOW")
        elif output_voltage > self.voltage_range[1]:
            patterns.append("VOLTAGE_HIGH")

        # DC 버스 전압 (정상: 540V ± 10%)
        if dc_bus_voltage < 486 or dc_bus_voltage > 594:
            patterns.append("DC_BUS_ABNORMAL")

        # 준비 상태 체크
        if not status_bits.control_ready:
            patterns.append("CONTROL_NOT_READY")
        if not status_bits.drive_ready:
            patterns.append("DRIVE_NOT_READY")

        # 속도 불일치 (운전 중)
        if status_bits.in_operation and not status_bits.speed_equals_reference:
            patterns.append("SPEED_MISMATCH")

        # 통계적 이상 패턴 (히스토리 기반)
        stat_patterns = self._detect_statistical_anomalies(vfd_id)
        patterns.extend(stat_patterns)

        return patterns

    def _detect_statistical_anomalies(self, vfd_id: str) -> List[str]:
        """통계적 이상 패턴 감지"""
        patterns = []

        history = self.diagnostic_history[vfd_id]
        if len(history) < 30:
            return patterns

        # 최근 30개 데이터
        recent = history[-30:]

        # 온도 증가 추세
        motor_temps = [d.motor_temperature_c for d in recent]
        temp_trend = np.polyfit(range(len(motor_temps)), motor_temps, 1)[0]
        if temp_trend > 0.5:  # 0.5°C/샘플 이상 증가
            patterns.append("TEMP_RISING_TREND")

        # 경고 빈도 증가
        warning_rate = sum(1 for d in recent if d.status_bits.warning) / len(recent)
        if warning_rate > 0.3:  # 30% 이상
            patterns.append("FREQUENT_WARNINGS")

        return patterns

    def _determine_status_grade(
        self,
        severity_score: int,
        anomaly_patterns: List[str]
    ) -> VFDStatus:
        """
        상태 등급 판정

        점수 기준:
        - 0-20: 정상
        - 21-50: 주의
        - 51-75: 경고
        - 76-100: 위험
        """
        # 심각한 패턴 체크
        critical_patterns = {"VFD_TRIP", "VFD_ERROR", "THERMAL_EXCEEDED", "MOTOR_OVERTEMP"}
        if any(p in critical_patterns for p in anomaly_patterns):
            return VFDStatus.CRITICAL

        # 점수 기반
        if severity_score >= 76:
            return VFDStatus.CRITICAL
        elif severity_score >= 51:
            return VFDStatus.WARNING
        elif severity_score >= 21:
            return VFDStatus.CAUTION
        else:
            return VFDStatus.NORMAL

    def _generate_recommendation(
        self,
        status_grade: VFDStatus,
        anomaly_patterns: List[str],
        status_bits: DanfossStatusBits
    ) -> str:
        """권고사항 생성"""
        if status_grade == VFDStatus.NORMAL:
            return "정상 운전 중"

        recommendations = []

        if status_grade == VFDStatus.CRITICAL:
            recommendations.append("⚠️ 즉시 점검 필요")

        # 패턴별 권고
        if "VFD_TRIP" in anomaly_patterns:
            recommendations.append("VFD 트립 원인 확인 필요")
        if "MOTOR_OVERTEMP" in anomaly_patterns or "THERMAL_EXCEEDED" in anomaly_patterns:
            recommendations.append("모터 냉각 점검 및 부하 확인")
        if "HEATSINK_OVERTEMP" in anomaly_patterns:
            recommendations.append("히트싱크 청소 및 냉각팬 점검")
        if "VOLTAGE_HIGH" in anomaly_patterns or "VOLTAGE_LOW" in anomaly_patterns:
            recommendations.append("전원 공급 상태 점검")
        if "TORQUE_EXCEEDED" in anomaly_patterns:
            recommendations.append("기계 부하 과다, 점검 필요")
        if "SPEED_MISMATCH" in anomaly_patterns:
            recommendations.append("VFD 파라미터 및 통신 확인")
        if "TEMP_RISING_TREND" in anomaly_patterns:
            recommendations.append("온도 상승 추세 관찰 중, 주의")

        if not recommendations:
            if status_grade == VFDStatus.WARNING:
                recommendations.append("정기 점검 권장")
            elif status_grade == VFDStatus.CAUTION:
                recommendations.append("관찰 필요")

        return " | ".join(recommendations)

    def get_all_vfd_status(self) -> Dict[str, VFDDiagnostic]:
        """전체 VFD 최신 상태"""
        status = {}
        for vfd_id in self.vfds.keys():
            if self.diagnostic_history[vfd_id]:
                status[vfd_id] = self.diagnostic_history[vfd_id][-1]
        return status

    def acknowledge_anomaly(self, vfd_id: str) -> bool:
        """
        이상 징후 확인 처리

        Args:
            vfd_id: VFD ID

        Returns:
            bool: 성공 여부
        """
        if vfd_id not in self.active_anomalies:
            return False

        anomaly = self.active_anomalies[vfd_id]
        anomaly.is_acknowledged = True
        anomaly.acknowledged_at = datetime.now()

        # 히스토리에도 업데이트
        for diag in self.diagnostic_history[vfd_id]:
            if diag.timestamp == anomaly.timestamp:
                diag.is_acknowledged = True
                diag.acknowledged_at = anomaly.acknowledged_at
                break

        return True

    def clear_anomaly(self, vfd_id: str) -> bool:
        """
        이상 징후 해제 처리

        Args:
            vfd_id: VFD ID

        Returns:
            bool: 성공 여부
        """
        if vfd_id not in self.active_anomalies:
            return False

        anomaly = self.active_anomalies[vfd_id]
        anomaly.is_cleared = True
        anomaly.cleared_at = datetime.now()

        # 히스토리에 저장
        self.anomaly_history.append(anomaly)

        # active_anomalies에서 제거
        del self.active_anomalies[vfd_id]

        # cleared_anomalies에 추가하여 다시 등록되지 않도록 함
        # (정상 상태로 돌아올 때까지 유지)
        self.cleared_anomalies.add(vfd_id)

        return True

    def check_auto_clear(self):
        """
        자동 해제 조건 확인 및 처리

        조건:
        - 이상 비트가 해제된 후
        - 설정된 대기 시간(기본 10분) 경과
        """
        current_time = datetime.now()
        vfds_to_clear = []

        for vfd_id, anomaly in self.active_anomalies.items():
            # 가장 최근 진단 결과 확인
            if not self.diagnostic_history[vfd_id]:
                continue

            latest_diag = self.diagnostic_history[vfd_id][-1]

            # 현재 정상 상태이고, 확인 완료 상태인 경우
            if (latest_diag.status_grade == VFDStatus.NORMAL and
                anomaly.is_acknowledged and
                anomaly.acknowledged_at):

                # 대기 시간 경과 확인
                elapsed = (current_time - anomaly.acknowledged_at).total_seconds() / 60
                if elapsed >= self.auto_clear_delay_minutes:
                    vfds_to_clear.append(vfd_id)

        # 자동 해제
        for vfd_id in vfds_to_clear:
            self.clear_anomaly(vfd_id)

    def update_active_anomalies(self, vfd_id: str, diagnostic: VFDDiagnostic):
        """
        활성 이상 징후 업데이트

        Args:
            vfd_id: VFD ID
            diagnostic: 진단 결과
        """
        # 정상 상태로 돌아오면 cleared_anomalies에서 제거 (다음 이상 발생 시 다시 표시)
        if diagnostic.status_grade == VFDStatus.NORMAL:
            if vfd_id in self.cleared_anomalies:
                self.cleared_anomalies.discard(vfd_id)
            return

        # 이미 해제된 VFD는 다시 등록하지 않음
        if vfd_id in self.cleared_anomalies:
            return

        # 이상 상태인 경우 active_anomalies에 추가
        if diagnostic.status_grade != VFDStatus.NORMAL:
            if vfd_id not in self.active_anomalies:
                # 새로운 이상 징후
                self.active_anomalies[vfd_id] = diagnostic
            else:
                # 기존 이상 징후 업데이트 (확인 상태는 유지)
                existing = self.active_anomalies[vfd_id]
                diagnostic.is_acknowledged = existing.is_acknowledged
                diagnostic.acknowledged_at = existing.acknowledged_at
                self.active_anomalies[vfd_id] = diagnostic

        # 자동 해제 체크
        self.check_auto_clear()

    def get_anomaly_status(self, vfd_id: str) -> Optional[VFDDiagnostic]:
        """
        특정 VFD의 활성 이상 징후 상태 조회

        Args:
            vfd_id: VFD ID

        Returns:
            VFDDiagnostic: 활성 이상 징후 (없으면 None)
        """
        return self.active_anomalies.get(vfd_id)

    def get_anomaly_history(self, vfd_id: Optional[str] = None, limit: int = 100) -> List[VFDDiagnostic]:
        """
        이상 징후 히스토리 조회

        Args:
            vfd_id: VFD ID (None이면 전체)
            limit: 최대 개수

        Returns:
            List[VFDDiagnostic]: 이상 징후 히스토리 (최신순)
        """
        if vfd_id:
            # 특정 VFD의 히스토리
            history = [diag for diag in self.anomaly_history if diag.vfd_id == vfd_id]
        else:
            # 전체 히스토리
            history = self.anomaly_history

        # 최신순으로 정렬
        history_sorted = sorted(history, key=lambda x: x.timestamp, reverse=True)
        return history_sorted[:limit]

    def get_active_anomalies(self) -> Dict[str, VFDDiagnostic]:
        """
        현재 활성 이상 징후 전체 조회

        Returns:
            Dict[str, VFDDiagnostic]: 활성 이상 징후 딕셔너리
        """
        return self.active_anomalies.copy()

    def get_vfd_status_summary(self) -> Dict:
        """VFD 상태 요약"""
        all_status = self.get_all_vfd_status()

        summary = {
            'total_vfds': len(self.vfds),
            'normal': 0,
            'caution': 0,
            'warning': 0,
            'critical': 0,
            'critical_vfds': []
        }

        for vfd_id, diagnostic in all_status.items():
            grade = diagnostic.status_grade
            if grade == VFDStatus.NORMAL:
                summary['normal'] += 1
            elif grade == VFDStatus.CAUTION:
                summary['caution'] += 1
            elif grade == VFDStatus.WARNING:
                summary['warning'] += 1
            elif grade == VFDStatus.CRITICAL:
                summary['critical'] += 1
                summary['critical_vfds'].append(vfd_id)

        return summary
