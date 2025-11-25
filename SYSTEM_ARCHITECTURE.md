# 시스템 아키텍처 - 3개 프로그램 통합 구조

## 전체 시스템 구성

3개의 독립 프로그램이 하나의 통합 시스템을 구성합니다:

1. **PLC Simulator** (localhost:502) - 중앙 데이터 허브
2. **Edge_Computer_V1** - AI 제어 + Streamlit 대시보드 (localhost:8502)
3. **HMI_V1** - React 시각화 대시보드 (localhost:5173)

## 데이터 흐름도

```
┌─────────────────────────────────────────────────────────────────┐
│                      PLC Simulator (중앙 허브)                    │
│                         localhost:502                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Modbus Registers:                                        │   │
│  │ - Sensors (10-19): 온도, 압력, 엔진 부하                 │   │
│  │ - Equipment Status (4000-4001): 장비 ON/OFF 상태         │   │
│  │ - VFD Data (160-238): VFD 실제 주파수 (피드백)           │   │
│  │ - AI Target Freq (5000-5009): Edge AI 목표 주파수        │   │
│  │ - Energy Savings (5100-5109, 5300-5303): 절감량         │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ▲                    ▲                    ▲
         │                    │                    │
    ┌────┴────┐          ┌────┴────┐         ┌────┴────┐
    │ 센서 읽기│          │AI 목표  │         │VFD 피드백│
    │         │          │주파수 쓰기│         │ 읽기    │
    └────┬────┘          └────┬────┘         └────┬────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐
│  Edge_Computer_V1   │ │   PLC Simulator     │ │      HMI_V1         │
│   (AI 제어 시스템)   │ │  (VFD 제어 루프)    │ │  (사용자 인터페이스) │
└─────────────────────┘ └─────────────────────┘ └─────────────────────┘
```

## 상세 데이터 흐름

### 1단계: 센서 데이터 수집
```
PLC Simulator (센서 시뮬레이션)
    ↓
Register 10-19에 센서 값 저장
    ↓
Edge_Computer_V1 & HMI_V1 읽기
```

**레지스터 맵:**
- 10: TX1 (CSW PP Disc Temp) - 온도 × 10
- 11: TX2 (CSW PP Suc Temp) - 온도 × 10
- 12: TX3 (FW CLNG In Temp) - 온도 × 10
- 13: TX4 (FW CLNG Out Temp) - 온도 × 10
- 14: TX5 (ESS Batt Temp) - 온도 × 10
- 15: TX6 (E/R Inside Temp) - 온도 × 10
- 16: TX7 (E/R Outside Temp) - 온도 × 10
- 17: DPX1 (CSW PP Disc Press) - 압력 × 4608
- 18: DPX2 (E/R Diff Press) - 압력 × 10
- 19: PU1 (M/E Load) - 부하 × 276.48

### 2단계: AI 제어 계산 및 목표 주파수 전송
```
Edge_Computer_V1 (main.py)
    ↓
IntegratedController.compute_control() 실행
    ├─ Random Forest 최적화
    ├─ 온도 예측 (5/10/15분)
    ├─ 패턴 인식
    └─ 안전 제약 검증
    ↓
목표 주파수 계산 (Hz)
    ├─ SW Pump: 48.0 Hz
    ├─ FW Pump: 48.0 Hz
    └─ E/R Fan: 47.0 Hz (작동 대수 포함)
    ↓
PLC Register 5000-5009에 쓰기 (주파수 × 10)
    - 5000: SWP1 목표 주파수
    - 5001: SWP2 목표 주파수
    - 5002: SWP3 목표 주파수
    - 5003: FWP1 목표 주파수
    - 5004: FWP2 목표 주파수
    - 5005: FWP3 목표 주파수
    - 5006: FAN1 목표 주파수
    - 5007: FAN2 목표 주파수
    - 5008: FAN3 목표 주파수
    - 5009: FAN4 목표 주파수
```

### 3단계: PLC → VFD 제어 루프 (핵심!)
```
PLC Simulator (update_vfd_data)
    ↓
Register 5000-5009에서 AI 목표 주파수 읽기
    ↓
AUTO 모드 & VFD 모드 & 운전 중인 장비만 적용
    ↓
현재 명령 주파수에서 목표까지 서서히 변경 (±0.5Hz/초)
    ↓
VFD 시뮬레이션 (명령값 + 오차 ±0.3Hz)
    ↓
VFD 실제 주파수를 Register 160-238에 저장
```

**VFD 데이터 레지스터 맵 (각 장비당 8개):**
- 160-167: SWP1 (주파수, 전력, 절감량, 운전시간)
- 168-175: SWP2
- 176-183: SWP3
- 184-191: FWP1
- 192-199: FWP2
- 200-207: FWP3
- 208-215: FAN1
- 216-223: FAN2
- 224-231: FAN3
- 232-239: FAN4

**각 장비의 8개 레지스터:**
1. [0] 주파수 (Hz × 10) - VFD 피드백 실제 값
2. [1] 전력 (kW)
3. [2] 평균 전력 (kW)
4. [3] 절감량 Low Word (Edge AI 계산값)
5. [4] 절감량 High Word (Edge AI 계산값)
6. [5] 절감률 (%) (Edge AI 계산값)
7. [6] 운전시간 Low Word
8. [7] 운전시간 High Word

### 4단계: 두 대시보드의 동기화된 데이터 표시
```
┌─────────────────────────────────────────────────┐
│         Edge_Computer_V1 대시보드               │
│         (Streamlit - localhost:8502)             │
├─────────────────────────────────────────────────┤
│ PLC에서 읽기:                                    │
│ - Register 10-19: 센서 데이터                   │
│ - Register 160-238: VFD 실제 주파수 (피드백)    │
│                                                  │
│ 표시:                                            │
│ - 목표 주파수: AI 계산값 (5000-5009)            │
│ - 실제 주파수: VFD 피드백 (160-238)             │
│ - 두 값의 차이 (편차)                           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              HMI_V1 대시보드                    │
│           (React - localhost:5173)               │
├─────────────────────────────────────────────────┤
│ PLC에서 읽기:                                    │
│ - Register 10-19: 센서 데이터                   │
│ - Register 160-238: VFD 실제 주파수 (피드백)    │
│ - Register 5000-5009: AI 목표 주파수            │
│                                                  │
│ 표시:                                            │
│ - 목표 주파수: AI 계산값 (5000-5009)            │
│ - 실제 주파수: VFD 피드백 (160-238)             │
│ - 장비 상태: 운전/정지, AUTO/MANUAL             │
└─────────────────────────────────────────────────┘
```

### 5단계: HMI 사용자 명령 처리
```
HMI_V1 사용자 입력
    ↓
Coil 주소에 명령 쓰기:
    - 64064~: START/STOP 명령
    - 64160~: AUTO/MANUAL 모드
    - 64320~: VFD/BYPASS 모드
    ↓
PLC Simulator (monitor_commands)
    ↓
명령 감지 및 장비 상태 변경
    ↓
Register 4000-4001 업데이트 (장비 상태)
    ↓
Edge_Computer_V1 & HMI_V1 읽기
    ↓
두 대시보드 모두 동일한 상태 표시
```

## 중요 포인트

### ✅ PLC Simulator의 VFD 제어 루프
[plc_simulator.py:274-381](C:\Users\my\Desktop\PLC_Simulator\plc_simulator.py#L274-L381)

**핵심 로직:**
1. Edge AI 목표 주파수 읽기 (reg 5000-5009)
2. AUTO & VFD 모드 확인
3. 현재 주파수에서 목표까지 **서서히 변경** (0.5Hz/초)
4. VFD 시뮬레이션 (**실제 측정 오차** ±0.3Hz 반영)
5. 피드백 데이터를 reg 160-238에 저장

```python
# AUTO 모드이고 VFD 모드일 때만 Edge AI 주파수 사용
if auto_mode and vfd_mode and running:
    ai_freq_raw = self.store.getValues(3, 5000 + i, 1)[0]
    if ai_freq_raw > 0:
        ai_freq_hz = ai_freq_raw / 10.0
        # AI 목표 주파수로 서서히 변경 (급격한 변화 방지)
        if abs(ai_freq_hz - vfd_command_freq) > 0.5:
            if ai_freq_hz > vfd_command_freq:
                vfd_command_freq = min(vfd_command_freq + 0.5, ai_freq_hz, 60.0)
            else:
                vfd_command_freq = max(vfd_command_freq - 0.5, ai_freq_hz, 0.0)
        else:
            vfd_command_freq = ai_freq_hz
```

### ✅ Edge_Computer_V1 대시보드 수정
[dashboard.py:718-760](C:\Users\my\Desktop\Edge_Computer_V1\src\hmi\dashboard.py#L718-L760)

**변경 내용:**
- **Before:** 시뮬레이션 데이터 사용 (목표 = 실제)
- **After:** PLC에서 실제 VFD 데이터 읽기 (reg 160-238)

```python
# 실제 주파수 업데이트 (PLC/VFD에서 읽어옴)
if self.plc_client and self.plc_client.connected:
    equipment = self.plc_client.read_equipment_status()
    if equipment and len(equipment) >= 10:
        # 각 장비의 실제 주파수 업데이트
        for idx, eq_name in zip(indices, eq_names):
            actual_freq = equipment[idx].get('frequency', 0.0)
            self.hmi_manager.update_actual_frequency(group_key, eq_name, actual_freq)
```

### ✅ 데이터 동기화 보장
모든 시스템이 **동일한 PLC 레지스터**를 읽기 때문에 자동으로 동기화됨:
- Edge_Computer_V1: modbus_client.py → PLC reg 160-238
- HMI_V1: backend/modbus_client.py → PLC reg 160-238
- PLC Simulator: update_vfd_data() → PLC reg 160-238 쓰기

## 실행 순서

1. **PLC Simulator 실행**
   ```
   C:\Users\my\Desktop\PLC_Simulator\START.bat
   ```
   - Modbus TCP 서버 시작 (0.0.0.0:502)
   - 센서 시뮬레이션 시작
   - VFD 제어 루프 시작

2. **Edge_Computer_V1 실행**
   ```
   C:\Users\my\Desktop\Edge_Computer_V1\START.bat
   또는
   C:\Users\my\Desktop\Edge_Computer_V1\START_WITH_DASHBOARD.bat
   ```
   - AI 제어 시스템 시작
   - PLC 연결 (127.0.0.1:502)
   - 목표 주파수 계산 및 전송
   - (대시보드 모드) Streamlit 대시보드 시작 (localhost:8502)

3. **HMI_V1 실행**
   ```
   C:\Users\my\Desktop\HMI_V1\START_HMI_V1.bat
   ```
   - React 대시보드 시작 (localhost:5173)
   - PLC 연결 (localhost:502)
   - 센서 데이터 및 VFD 피드백 표시

## 문제 해결

### Edge_Computer_V1와 HMI_V1 데이터가 다를 때
1. PLC Simulator가 실행 중인지 확인
2. Edge_Computer_V1이 PLC에 목표 주파수를 쓰고 있는지 확인 (reg 5000-5009)
3. PLC Simulator가 VFD 제어 루프를 실행 중인지 확인
4. 두 대시보드가 모두 reg 160-238에서 읽는지 확인

### 주파수가 변경되지 않을 때
1. 장비가 AUTO 모드인지 확인
2. 장비가 VFD 모드인지 확인 (BYPASS 모드면 주파수 고정)
3. 장비가 운전 중인지 확인 (정지 중이면 0Hz)

### PLC 연결 실패
1. PLC Simulator가 먼저 실행되어야 함
2. 방화벽에서 포트 502 허용 확인
3. Edge_Computer_V1 config.py에서 PLC_HOST="127.0.0.1" 확인
4. HMI_V1 backend에서 localhost 연결 확인

## 성능 지표

- **AI 추론 시간:** ~0.1ms (평균)
- **PLC 통신 주기:** 20초 (Edge_Computer_V1)
- **VFD 제어 루프:** 1초 (PLC Simulator)
- **대시보드 새로고침:** 3초 (Edge_Computer_V1), 1초 (HMI_V1)

## 파일 위치 요약

| 구성 요소 | 경로 |
|---------|------|
| PLC Simulator | C:\Users\my\Desktop\PLC_Simulator |
| Edge_Computer_V1 | C:\Users\my\Desktop\Edge_Computer_V1 |
| HMI_V1 | C:\Users\my\Desktop\HMI_V1 |
| PLC 메인 코드 | C:\Users\my\Desktop\PLC_Simulator\plc_simulator.py |
| Edge AI 메인 | C:\Users\my\Desktop\Edge_Computer_V1\main.py |
| Edge 대시보드 | C:\Users\my\Desktop\Edge_Computer_V1\src\hmi\dashboard.py |
| HMI 백엔드 | C:\Users\my\Desktop\HMI_V1\backend\modbus_client.py |
