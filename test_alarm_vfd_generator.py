"""
랜덤 알람 및 VFD 이상 징후 생성기
주기적으로 알람과 VFD WARNING을 발생시켜 시스템 테스트
"""

import random
import time
import json
from datetime import datetime
from pathlib import Path

# 알람 종류
ALARM_TYPES = [
    {"id": "HIGH_TEMP", "level": "WARNING", "message": "엔진룸 고온 경고"},
    {"id": "LOW_PRESSURE", "level": "WARNING", "message": "냉각수 압력 저하"},
    {"id": "VIBRATION", "level": "CAUTION", "message": "진동 수치 상승"},
    {"id": "PUMP_FAULT", "level": "CRITICAL", "message": "펌프 고장 감지"},
    {"id": "FAN_OVERLOAD", "level": "WARNING", "message": "팬 과부하"},
    {"id": "POWER_SURGE", "level": "CRITICAL", "message": "전력 서지 감지"},
    {"id": "COOLANT_LOW", "level": "WARNING", "message": "냉각수 부족"},
    {"id": "FILTER_CLOG", "level": "CAUTION", "message": "필터 막힘 감지"},
]

# VFD 목록
VFD_LIST = [
    "SW_PUMP_1", "SW_PUMP_2", "SW_PUMP_3",
    "FW_PUMP_1", "FW_PUMP_2", "FW_PUMP_3",
    "ER_FAN_1", "ER_FAN_2", "ER_FAN_3", "ER_FAN_4"
]

class AlarmVFDGenerator:
    """알람 및 VFD 이상 징후 생성기"""

    def __init__(self):
        self.shared_dir = Path("C:/shared")
        self.shared_dir.mkdir(parents=True, exist_ok=True)

        self.alarm_file = self.shared_dir / "test_alarms.json"
        self.vfd_anomaly_file = self.shared_dir / "test_vfd_anomalies.json"

        # 현재 활성 알람 및 VFD 이상
        self.active_alarms = {}
        self.active_vfd_anomalies = {}

        print("=" * 70)
        print("TEST - Alarm & VFD Anomaly Generator Started")
        print("=" * 70)
        print(f"Shared Directory: {self.shared_dir}")
        print(f"Alarm Probability: 20% (every 10 seconds)")
        print(f"VFD Anomaly Probability: 15% (every 10 seconds)")
        print(f"Auto Clear: 5-10 minutes later")
        print("=" * 70)

    def generate_random_alarm(self):
        """랜덤 알람 생성"""
        # 20% 확률로 알람 발생
        if random.random() > 0.2:
            return

        alarm = random.choice(ALARM_TYPES)
        alarm_id = f"{alarm['id']}_{int(time.time())}"

        alarm_data = {
            "id": alarm_id,
            "type": alarm["id"],
            "level": alarm["level"],
            "message": alarm["message"],
            "timestamp": datetime.now().isoformat(),
            "equipment": random.choice(["SWP1", "SWP2", "FWP1", "FAN1", "FAN2"]),
            "value": round(random.uniform(50, 95), 1),
            "threshold": 80.0,
            "auto_clear_after": random.randint(300, 600)  # 5-10분 후 자동 해제
        }

        self.active_alarms[alarm_id] = alarm_data

        print(f"[ALARM] {alarm['level']} - {alarm['message']}")
        self._save_alarms()

    def generate_random_vfd_anomaly(self):
        """랜덤 VFD 이상 징후 생성"""
        # 15% 확률로 VFD 이상 발생
        if random.random() > 0.15:
            return

        vfd_id = random.choice(VFD_LIST)

        # 이미 활성 상태면 스킵
        if vfd_id in self.active_vfd_anomalies:
            return

        anomaly_types = [
            {"pattern": "VFD_WARNING", "severity": 60, "message": "VFD 경고 발생"},
            {"pattern": "MOTOR_TEMP_HIGH", "severity": 55, "message": "모터 온도 상승"},
            {"pattern": "HEATSINK_OVERTEMP", "severity": 50, "message": "히트싱크 과열"},
            {"pattern": "VOLTAGE_FLUCTUATION", "severity": 45, "message": "전압 변동"},
        ]

        anomaly = random.choice(anomaly_types)

        vfd_data = {
            "vfd_id": vfd_id,
            "pattern": anomaly["pattern"],
            "severity_score": anomaly["severity"],
            "health_score": 100 - anomaly["severity"],
            "message": anomaly["message"],
            "timestamp": datetime.now().isoformat(),
            "auto_clear_after": random.randint(300, 600)  # 5-10분 후 자동 해제
        }

        self.active_vfd_anomalies[vfd_id] = vfd_data

        eq_name = vfd_id.replace("SW_PUMP_", "SWP").replace("FW_PUMP_", "FWP").replace("ER_FAN_", "FAN")
        print(f"[VFD ANOMALY] {eq_name} - {anomaly['message']} (health: {vfd_data['health_score']})")
        self._save_vfd_anomalies()

    def check_auto_clear(self):
        """자동 해제 체크"""
        current_time = time.time()

        # 알람 자동 해제
        alarms_to_clear = []
        for alarm_id, alarm in self.active_alarms.items():
            alarm_time = datetime.fromisoformat(alarm["timestamp"]).timestamp()
            elapsed = current_time - alarm_time

            if elapsed >= alarm["auto_clear_after"]:
                alarms_to_clear.append(alarm_id)

        for alarm_id in alarms_to_clear:
            alarm = self.active_alarms[alarm_id]
            print(f"[ALARM CLEARED] {alarm['type']} - {alarm['message']}")
            del self.active_alarms[alarm_id]

        if alarms_to_clear:
            self._save_alarms()

        # VFD 이상 자동 해제
        vfds_to_clear = []
        for vfd_id, vfd in self.active_vfd_anomalies.items():
            vfd_time = datetime.fromisoformat(vfd["timestamp"]).timestamp()
            elapsed = current_time - vfd_time

            if elapsed >= vfd["auto_clear_after"]:
                vfds_to_clear.append(vfd_id)

        for vfd_id in vfds_to_clear:
            vfd = self.active_vfd_anomalies[vfd_id]
            eq_name = vfd_id.replace("SW_PUMP_", "SWP").replace("FW_PUMP_", "FWP").replace("ER_FAN_", "FAN")
            print(f"[VFD NORMAL] {eq_name} - {vfd['pattern']} cleared")
            del self.active_vfd_anomalies[vfd_id]

        if vfds_to_clear:
            self._save_vfd_anomalies()

    def _save_alarms(self):
        """알람 데이터 저장"""
        data = {
            "timestamp": datetime.now().isoformat(),
            "active_alarms": list(self.active_alarms.values()),
            "count": len(self.active_alarms)
        }

        with open(self.alarm_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def _save_vfd_anomalies(self):
        """VFD 이상 징후 데이터 저장"""
        data = {
            "timestamp": datetime.now().isoformat(),
            "active_anomalies": self.active_vfd_anomalies,
            "count": len(self.active_vfd_anomalies)
        }

        with open(self.vfd_anomaly_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    def print_status(self):
        """현재 상태 출력"""
        print("\n" + "=" * 70)
        print(f"Status ({datetime.now().strftime('%H:%M:%S')})")
        print(f"   Active Alarms: {len(self.active_alarms)}")
        print(f"   Active VFD Anomalies: {len(self.active_vfd_anomalies)}")

        if self.active_alarms:
            print("\n   Active Alarms:")
            for alarm in self.active_alarms.values():
                elapsed = (datetime.now() - datetime.fromisoformat(alarm["timestamp"])).seconds
                print(f"      - [{alarm['level']}] {alarm['message']} ({elapsed}s elapsed)")

        if self.active_vfd_anomalies:
            print("\n   Active VFD Anomalies:")
            for vfd_id, vfd in self.active_vfd_anomalies.items():
                eq_name = vfd_id.replace("SW_PUMP_", "SWP").replace("FW_PUMP_", "FWP").replace("ER_FAN_", "FAN")
                elapsed = (datetime.now() - datetime.fromisoformat(vfd["timestamp"])).seconds
                print(f"      - {eq_name}: {vfd['pattern']} (health: {vfd['health_score']}, {elapsed}s elapsed)")

        print("=" * 70)

    def run(self):
        """메인 루프"""
        cycle = 0

        try:
            while True:
                cycle += 1

                # 랜덤 알람 생성
                self.generate_random_alarm()

                # 랜덤 VFD 이상 생성
                self.generate_random_vfd_anomaly()

                # 자동 해제 체크
                self.check_auto_clear()

                # 30초마다 상태 출력
                if cycle % 3 == 0:
                    self.print_status()

                time.sleep(10)  # 10초마다 실행

        except KeyboardInterrupt:
            print("\n\nGenerator stopped")
            print("=" * 70)


if __name__ == "__main__":
    generator = AlarmVFDGenerator()
    generator.run()
