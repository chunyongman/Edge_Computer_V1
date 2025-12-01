#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge AI Modbus TCP 클라이언트
PLC Simulator와 통신하여 센서 데이터 읽기 및 AI 계산 결과 쓰기
"""

import time
from typing import Dict, List, Optional

# pymodbus 3.x
from pymodbus.client import ModbusTcpClient

from pymodbus.exceptions import ModbusException
import config


class EdgeModbusClient:
    """Edge AI용 Modbus TCP 클라이언트"""

    def __init__(self, host: str = None, port: int = None, slave_id: int = None):
        self.host = host if host is not None else config.PLC_HOST
        self.port = port if port is not None else config.PLC_PORT
        self.slave_id = slave_id if slave_id is not None else config.PLC_SLAVE_ID
        self.client = None
        self.connected = False

        print(f"[Edge AI] Modbus Client 초기화")
        print(f"  PLC 주소: {self.host}:{self.port}")
        print(f"  Slave ID: {self.slave_id}")

    def connect(self) -> bool:
        """PLC에 연결"""
        try:
            # pymodbus 3.x 버전 호환 (timeout 설정)
            self.client = ModbusTcpClient(
                host=self.host,
                port=self.port,
                timeout=5
            )
            self.connected = self.client.connect()

            if self.connected:
                print(f"[Edge AI] [OK] PLC 연결 성공: {self.host}:{self.port}")
            else:
                print(f"[Edge AI] [ERROR] PLC 연결 실패: {self.host}:{self.port}")

            return self.connected

        except Exception as e:
            print(f"[Edge AI] [ERROR] PLC 연결 오류: {e}")
            self.connected = False
            return False

    def disconnect(self):
        """PLC 연결 종료"""
        if self.client:
            self.client.close()
            self.connected = False
            print("[Edge AI] PLC 연결 종료")

    def read_sensors(self) -> Optional[Dict[str, float]]:
        """PLC에서 센서 데이터 읽기 (레지스터 10-19)"""
        if not self.connected:
            print(f"[Edge AI] [ERROR] PLC가 연결되지 않았습니다")
            return None

        try:
            # pymodbus 3.x는 slave 파라미터 사용 (unit은 deprecated)
            result = self.client.read_holding_registers(
                address=config.MODBUS_REGISTERS["SENSORS_START"],
                count=config.MODBUS_REGISTERS["SENSORS_COUNT"],
                device_id=self.slave_id
            )

            if result.isError():
                print(f"[Edge AI] [ERROR] 센서 데이터 읽기 실패")
                print(f"  오류 타입: {type(result)}")
                print(f"  오류 내용: {result}")
                return None

            # Raw 값을 실제 값으로 변환
            sensors = {
                "TX1": result.registers[0] / 10.0,   # CSW PP Disc Temp (°C)
                "TX2": result.registers[1] / 10.0,   # No.1 CLR SW Out Temp (°C)
                "TX3": result.registers[2] / 10.0,   # No.2 CLR SW Out Temp (°C)
                "TX4": result.registers[3] / 10.0,   # CLR FW In Temp (°C)
                "TX5": result.registers[4] / 10.0,   # CLR FW Out Temp (°C)
                "TX6": result.registers[5] / 10.0,   # E/R Inside Temp (°C)
                "TX7": result.registers[6] / 10.0,   # E/R Outside Temp (°C)
                "PX1": result.registers[7] / 4608.0,  # CSW PP Disc Press (kg/cm²)
                "PX2": result.registers[8] / 10.0,  # E/R Diff Press (Pa)
                "PU1": result.registers[9] / 276.48,  # M/E Load (%)
            }

            return sensors

        except Exception as e:
            print(f"[Edge AI] [ERROR] 센서 읽기 오류: {e}")
            return None

    def read_holding_registers(self, address: int, count: int) -> Optional[List[int]]:
        """PLC에서 Holding Register 읽기 (범용 메서드)"""
        if not self.connected:
            return None

        try:
            # pymodbus 3.x는 slave 파라미터 사용 (unit은 deprecated)
            result = self.client.read_holding_registers(
                address=address,
                count=count,
                device_id=self.slave_id
            )

            if result.isError():
                return None

            return result.registers

        except Exception as e:
            print(f"[Edge AI] [ERROR] 레지스터 읽기 오류 (addr={address}, count={count}): {e}")
            return None

    def write_holding_registers(self, address: int, values: List[int]) -> bool:
        """PLC에 Holding Register 쓰기 (범용 메서드)"""
        if not self.connected:
            return False

        try:
            # pymodbus 3.x는 slave 파라미터 사용 (unit은 deprecated)
            result = self.client.write_registers(
                address=address,
                values=values,
                device_id=self.slave_id
            )

            if result.isError():
                return False

            return True

        except Exception as e:
            print(f"[Edge AI] [ERROR] 레지스터 쓰기 오류 (addr={address}, values={values}): {e}")
            return False

    def read_equipment_status(self) -> Optional[List[Dict]]:
        """PLC에서 장비 상태 및 VFD 데이터 읽기"""
        if not self.connected:
            return None

        try:
            # 장비 상태 비트 읽기 (레지스터 4000-4001)
            status_result = self.client.read_holding_registers(
                address=config.MODBUS_REGISTERS["EQUIPMENT_STATUS_START"],
                count=config.MODBUS_REGISTERS["EQUIPMENT_STATUS_COUNT"],
                device_id=self.slave_id
            )

            if status_result.isError():
                print(f"[Edge AI] [ERROR] 장비 상태 읽기 실패: {status_result}")
                return None

            # VFD 데이터 읽기 (레지스터 160-359, 10개 장비 × 20 레지스터)
            # Modbus는 한 번에 최대 125개 레지스터만 읽을 수 있으므로 두 번에 나눠 읽기
            vfd_start = config.MODBUS_REGISTERS["VFD_DATA_START"]
            regs_per_equip = config.MODBUS_REGISTERS["VFD_DATA_PER_EQUIPMENT"]

            # 첫 번째 읽기: 장비 0-5 (SWP1-3, FWP1-3) = 120 레지스터
            vfd_result1 = self.client.read_holding_registers(
                address=vfd_start,
                count=6 * regs_per_equip,  # 120 레지스터
                device_id=self.slave_id
            )

            if vfd_result1.isError():
                print(f"[Edge AI] [ERROR] VFD 데이터 읽기 실패 (파트1): {vfd_result1}")
                return None

            # 두 번째 읽기: 장비 6-9 (FAN1-4) = 80 레지스터
            vfd_result2 = self.client.read_holding_registers(
                address=vfd_start + 6 * regs_per_equip,
                count=4 * regs_per_equip,  # 80 레지스터
                device_id=self.slave_id
            )

            if vfd_result2.isError():
                print(f"[Edge AI] [ERROR] VFD 데이터 읽기 실패 (파트2): {vfd_result2}")
                return None

            # 두 결과 합치기
            vfd_registers = vfd_result1.registers + vfd_result2.registers

            # 장비 데이터 파싱
            equipment_list = []
            status_word0 = status_result.registers[0]
            status_word1 = status_result.registers[1]

            for i, eq_name in enumerate(config.EQUIPMENT_LIST):
                vfd_offset = i * config.MODBUS_REGISTERS["VFD_DATA_PER_EQUIPMENT"]
                vfd_data = vfd_registers[vfd_offset:vfd_offset + 20]

                # VFD 진단 데이터 파싱 (확장된 20개 레지스터)
                # [0] frequency, [1] power, [2] avg_power
                # [3] motor_current, [4] motor_thermal, [5] heatsink_temp
                # [6] torque, [7] inverter_thermal, [8] system_temp
                # [9-10] kwh_counter (32bit), [11] num_starts, [12] over_temps
                # [13-15] phase_u/v/w_current, [16] warning_word, [17] dc_link_voltage
                # [18-19] run_hours (32bit)

                vfd_diagnosis = {
                    "frequency": vfd_data[0] / 10.0,           # Hz
                    "power": vfd_data[1],                       # kW
                    "avg_power": vfd_data[2],                   # kW
                    "motor_current": vfd_data[3] / 10.0,        # A
                    "motor_thermal": vfd_data[4],               # %
                    "heatsink_temp": vfd_data[5],               # °C
                    "torque": vfd_data[6],                      # Nm
                    "inverter_thermal": vfd_data[7],            # %
                    "system_temp": vfd_data[8],                 # °C
                    "kwh_counter": (vfd_data[10] << 16) | vfd_data[9],  # kWh
                    "num_starts": vfd_data[11],                 # 회
                    "over_temps": vfd_data[12],                 # 회
                    "phase_u_current": vfd_data[13] / 10.0,     # A
                    "phase_v_current": vfd_data[14] / 10.0,     # A
                    "phase_w_current": vfd_data[15] / 10.0,     # A
                    "warning_word": vfd_data[16],               # 비트 플래그
                    "dc_link_voltage": vfd_data[17],            # V
                    "run_hours": (vfd_data[19] << 16) | vfd_data[18],  # 시간
                }

                # 장비 상태 비트 추출
                if i < 6:  # Pumps
                    bit_offset = i * 3
                    if i < 5:
                        running = bool(status_word0 & (1 << bit_offset))
                        ess_mode = bool(status_word0 & (1 << (bit_offset + 1)))
                        abnormal = bool(status_word0 & (1 << (bit_offset + 2)))
                    else:  # FWP3
                        running = bool(status_word0 & (1 << 15))
                        ess_mode = bool(status_word1 & (1 << 0))
                        abnormal = bool(status_word1 & (1 << 1))

                    equipment_list.append({
                        "name": eq_name,
                        "running": running,
                        "ess_mode": ess_mode,
                        "abnormal": abnormal,
                        **vfd_diagnosis  # VFD 진단 데이터 포함
                    })

                else:  # Fans (FAN1-4)
                    fan_idx = i - 6
                    bit_offset = 2 + fan_idx * 3
                    running_fwd = bool(status_word1 & (1 << bit_offset))
                    running_bwd = bool(status_word1 & (1 << (bit_offset + 1)))
                    abnormal = bool(status_word1 & (1 << (bit_offset + 2)))

                    equipment_list.append({
                        "name": eq_name,
                        "running_fwd": running_fwd,
                        "running_bwd": running_bwd,
                        "abnormal": abnormal,
                        **vfd_diagnosis  # VFD 진단 데이터 포함
                    })

            return equipment_list

        except Exception as e:
            print(f"[Edge AI] [ERROR] 장비 데이터 읽기 오류: {e}")
            return None

    def write_ai_target_frequency(self, target_frequencies: List[float]) -> bool:
        """AI 목표 주파수를 PLC에 쓰기 (레지스터 5000-5009)"""
        if not self.connected:
            return False

        try:
            # Hz → Hz × 10 변환
            values = [int(freq * 10) for freq in target_frequencies]

            result = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_TARGET_FREQ_START"],
                values=values,
                device_id=self.slave_id
            )

            if result.isError():
                print(f"[Edge AI] [ERROR] 목표 주파수 쓰기 실패")
                return False

            return True

        except Exception as e:
            print(f"[Edge AI] [ERROR] 목표 주파수 쓰기 오류: {e}")
            return False

    def write_energy_savings(self, savings_data: Dict) -> bool:
        """에너지 절감 데이터를 PLC에 쓰기 (레지스터 5100-5109, 5300-5303, 5400-5401)"""
        if not self.connected:
            return False

        try:
            # 각 장비별 절감 전력 (kW × 10)
            equipment_savings = [int(savings_data.get(f"equipment_{i}", 0) * 10) for i in range(10)]

            result1 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_ENERGY_SAVINGS_START"],
                values=equipment_savings,
                device_id=self.slave_id
            )

            # 시스템 절감률 (% × 10)
            system_savings = [
                int(savings_data.get("total_ratio", 0) * 10),
                int(savings_data.get("swp_ratio", 0) * 10),
                int(savings_data.get("fwp_ratio", 0) * 10),
                int(savings_data.get("fan_ratio", 0) * 10),
            ]

            result2 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_SYSTEM_SAVINGS_START"],
                values=system_savings,
                device_id=self.slave_id
            )

            # 누적 절감량 (kWh × 10) - 오늘/이번달
            accumulated_kwh = [
                int(savings_data.get("today_kwh", 0) * 10),
                int(savings_data.get("month_kwh", 0) * 10),
            ]

            result3 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_ACCUMULATED_KWH_START"],
                values=accumulated_kwh,
                device_id=self.slave_id
            )

            # 60Hz 고정 전력 (kW × 10) - total, swp, fwp, fan
            power_60hz = [
                int(savings_data.get("total_power_60hz", 0) * 10),
                int(savings_data.get("swp_power_60hz", 0) * 10),
                int(savings_data.get("fwp_power_60hz", 0) * 10),
                int(savings_data.get("fan_power_60hz", 0) * 10),
            ]

            result4 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_POWER_60HZ_START"],
                values=power_60hz,
                device_id=self.slave_id
            )

            # VFD 가변 전력 (kW × 10) - total, swp, fwp, fan
            power_vfd = [
                int(savings_data.get("total_power_vfd", 0) * 10),
                int(savings_data.get("swp_power_vfd", 0) * 10),
                int(savings_data.get("fwp_power_vfd", 0) * 10),
                int(savings_data.get("fan_power_vfd", 0) * 10),
            ]

            result5 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_POWER_VFD_START"],
                values=power_vfd,
                device_id=self.slave_id
            )

            # 절감 전력 (kW × 10) - total, swp, fwp, fan
            savings_kw = [
                int(savings_data.get("total_savings_kw", 0) * 10),
                int(savings_data.get("swp_savings_kw", 0) * 10),
                int(savings_data.get("fwp_savings_kw", 0) * 10),
                int(savings_data.get("fan_savings_kw", 0) * 10),
            ]

            result6 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_SAVINGS_KW_START"],
                values=savings_kw,
                device_id=self.slave_id
            )

            # 개별 장비 실제 전력 (kW × 10) - 10개 장비
            equipment_power = [int(savings_data.get(f"equipment_power_{i}", 0) * 10) for i in range(10)]

            result7 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_EQUIPMENT_POWER_START"],
                values=equipment_power,
                device_id=self.slave_id
            )

            if result1.isError() or result2.isError() or result3.isError() or \
               result4.isError() or result5.isError() or result6.isError() or result7.isError():
                print(f"[Edge AI] [ERROR] 에너지 절감 데이터 쓰기 실패")
                return False

            return True

        except Exception as e:
            print(f"[Edge AI] [ERROR] 에너지 절감 데이터 쓰기 오류: {e}")
            return False

    def write_vfd_diagnosis(self, diagnosis_scores: List[int], severity_levels: List[int] = None) -> bool:
        """VFD 진단 점수 및 중증도 레벨을 PLC에 쓰기 (레지스터 5200-5209, 5210-5219)"""
        if not self.connected:
            return False

        try:
            # 진단 점수 쓰기 (0-100)
            result1 = self.client.write_registers(
                address=config.MODBUS_REGISTERS["AI_VFD_DIAGNOSIS_START"],
                values=diagnosis_scores,
                device_id=self.slave_id
            )

            if result1.isError():
                print(f"[Edge AI] [ERROR] VFD 진단 점수 쓰기 실패")
                return False

            # 중증도 레벨 쓰기 (0-3: Normal/Attention/Planning/Critical)
            if severity_levels:
                result2 = self.client.write_registers(
                    address=config.MODBUS_REGISTERS["AI_VFD_SEVERITY_START"],
                    values=severity_levels,
                    device_id=self.slave_id
                )

                if result2.isError():
                    print(f"[Edge AI] [ERROR] VFD 중증도 레벨 쓰기 실패")
                    return False

            return True

        except Exception as e:
            print(f"[Edge AI] [ERROR] VFD 진단 점수 쓰기 오류: {e}")
            return False

    def read_vfd_diagnosis(self) -> Dict:
        """
        Edge Computer가 계산한 VFD 진단 결과를 PLC에서 읽기

        Returns:
            {
                'health_scores': [10개 장비 건강도 점수 0-100],
                'severity_levels': [10개 장비 중증도 레벨 0-3]
            }
        """
        if not self.connected:
            return None

        try:
            # 건강도 점수 읽기 (레지스터 5200-5209)
            scores_result = self.client.read_holding_registers(
                address=config.MODBUS_REGISTERS["AI_VFD_DIAGNOSIS_START"],
                count=10,
                device_id=self.slave_id
            )

            if scores_result.isError():
                return None

            # 중증도 레벨 읽기 (레지스터 5210-5219)
            levels_result = self.client.read_holding_registers(
                address=config.MODBUS_REGISTERS["AI_VFD_SEVERITY_START"],
                count=10,
                device_id=self.slave_id
            )

            if levels_result.isError():
                return None

            return {
                'health_scores': list(scores_result.registers),
                'severity_levels': list(levels_result.registers)
            }

        except Exception as e:
            print(f"[Edge AI] [ERROR] VFD 진단 결과 읽기 오류: {e}")
            return None

    def send_equipment_start(self, equipment_index: int) -> bool:
        """
        장비 START 명령 전송

        Args:
            equipment_index: 장비 인덱스 (0-9)
                0-2: SWP1-3
                3-5: FWP1-3
                6-9: FAN1-4

        Returns:
            성공 여부
        """
        if not self.connected:
            print(f"[Edge AI] [ERROR] PLC가 연결되지 않았습니다")
            return False

        try:
            # START 코일 주소: 64064 + (equipment_index * 2)
            coil_addr = 64064 + (equipment_index * 2)

            result = self.client.write_coil(
                address=coil_addr,
                value=True,
                device_id=self.slave_id
            )

            if result.isError():
                print(f"[Edge AI] [ERROR] START 명령 전송 실패 (장비 인덱스: {equipment_index})")
                return False

            equipment_name = config.EQUIPMENT_LIST[equipment_index]
            print(f"[Edge AI] ✅ START 명령 전송: {equipment_name} (코일: {coil_addr})")
            return True

        except Exception as e:
            print(f"[Edge AI] [ERROR] START 명령 전송 오류: {e}")
            return False

    def send_equipment_stop(self, equipment_index: int) -> bool:
        """
        장비 STOP 명령 전송

        Args:
            equipment_index: 장비 인덱스 (0-9)

        Returns:
            성공 여부
        """
        if not self.connected:
            print(f"[Edge AI] [ERROR] PLC가 연결되지 않았습니다")
            return False

        try:
            # STOP 코일 주소: 64064 + (equipment_index * 2) + 1
            coil_addr = 64064 + (equipment_index * 2) + 1

            result = self.client.write_coil(
                address=coil_addr,
                value=True,
                device_id=self.slave_id
            )

            if result.isError():
                print(f"[Edge AI] [ERROR] STOP 명령 전송 실패 (장비 인덱스: {equipment_index})")
                return False

            equipment_name = config.EQUIPMENT_LIST[equipment_index]
            print(f"[Edge AI] ✅ STOP 명령 전송: {equipment_name} (코일: {coil_addr})")
            return True

        except Exception as e:
            print(f"[Edge AI] [ERROR] STOP 명령 전송 오류: {e}")
            return False
