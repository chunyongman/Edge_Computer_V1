# Edge AI Computer V1

## 개요
PLC Simulator에서 센서 데이터를 읽어 AI 계산을 수행하고, 결과를 PLC로 전송하는 Edge AI 시스템입니다.

## 역할
1. **PLC에서 데이터 읽기**: 센서 데이터 (온도, 압력, 부하) 및 장비 상태 읽기
2. **AI 계산 수행**:
   - 최적 목표 주파수 계산
   - 에너지 절감량 계산
   - 장비별 에너지 절감 상세 분석
   - VFD 예방 진단
3. **PLC로 결과 쓰기**: AI 계산 결과를 Modbus 레지스터에 저장

## 시스템 요구사항
- Python 3.8 이상
- Windows 10 이상
- 네트워크: PLC Simulator와 연결 가능한 환경

## 설치 및 실행

### 방법 1: 자동 실행 (권장)
```batch
START.bat
```
→ 자동으로 가상환경 생성 및 의존성 설치 후 실행

### 방법 2: 수동 실행
```batch
# 1. 가상환경 생성
python -m venv venv

# 2. 가상환경 활성화
venv\Scripts\activate

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 프로그램 실행
python main.py
```

## 설정

### PLC 연결 설정
**파일: `config.py`**
```python
PLC_HOST = "192.168.1.10"  # PLC Simulator IP
PLC_PORT = 502
PLC_SLAVE_ID = 3
```

### 환경 변수 (선택 사항)
```batch
# Windows
set PLC_HOST=192.168.1.10
set PLC_PORT=502

# Linux/Mac
export PLC_HOST=192.168.1.10
export PLC_PORT=502
```

## 데이터 흐름

```
[PLC Simulator]
    ↓ (Modbus TCP Read)
[Edge AI] - 센서 데이터 읽기
    ↓
[Edge AI] - AI 계산:
    - 목표 주파수 계산
    - 에너지 절감 계산
    - VFD 진단
    ↓
[Edge AI] → PLC (Modbus TCP Write)
    - 레지스터 5000-5009: 목표 주파수
    - 레지스터 5100-5109: 절감 전력
    - 레지스터 5200-5209: VFD 진단 점수
    - 레지스터 5300-5303: 시스템 절감률
    ↓
[PLC Simulator] - 결과 저장
    ↓
[HMI] - PLC에서 읽어서 시각화
```

## AI 계산 내용

### 1. 최적 목표 주파수 계산
- **입력**: 센서 데이터 (TX4, TX5, TX6, TX7, DPX1)
- **알고리즘**: 규칙 기반 (향후 머신러닝 모델로 교체 가능)
- **출력**: 각 장비별 최적 주파수 (Hz)

### 2. 에너지 절감량 계산
- **입력**: 실제 VFD 주파수, 장비 운전 상태
- **계산**: 팬/펌프 법칙 (P = k × N³)
- **출력**:
  - 실시간 절감 전력 (kW)
  - 실시간 절감률 (%)
  - 오늘/이번 달 누적 절감량 (kWh)

### 3. VFD 예방 진단
- **입력**: VFD 운전 데이터, 센서 데이터
- **알고리즘**: 이상 패턴 감지
- **출력**: 진단 점수 (0-100, 100=정상)

## Modbus 레지스터 맵

### Edge AI 결과 저장 영역 (Write)

| 주소 | 항목 | 설명 | 포맷 |
|------|------|------|------|
| 5000-5009 | AI 목표 주파수 | 각 장비별 목표 주파수 | Hz × 10 |
| 5100-5109 | 절감 전력 | 각 장비별 절감 전력 | kW × 10 |
| 5200-5209 | VFD 진단 점수 | 각 장비별 진단 점수 | 0-100 |
| 5300 | 전체 시스템 절감률 | 실시간 절감률 | % × 10 |
| 5301 | SW 펌프 절감률 | SW 펌프 그룹 절감률 | % × 10 |
| 5302 | FW 펌프 절감률 | FW 펌프 그룹 절감률 | % × 10 |
| 5303 | E/R 팬 절감률 | E/R 팬 그룹 절감률 | % × 10 |

## 문제 해결

### 1. PLC 연결 실패
**증상**: `[ERROR] PLC 연결 실패`

**해결**:
1. PLC Simulator가 실행 중인지 확인
2. IP 주소 및 포트 확인 (`config.py`)
3. 방화벽 설정 확인 (포트 502 개방)
4. 네트워크 연결 테스트: `ping 192.168.1.10`

### 2. Python 환경 오류
**증상**: `python: command not found`

**해결**:
1. Python 3.8 이상 설치 확인: `python --version`
2. PATH 환경 변수에 Python 경로 추가
3. 재부팅 후 재시도

### 3. 패키지 설치 실패
**증상**: `[ERROR] 패키지 설치 실패`

**해결**:
```batch
# pip 업그레이드
python -m pip install --upgrade pip

# 수동 설치
pip install pymodbus
```

## 로그 및 모니터링

### 콘솔 출력
- 10초마다 현재 상태 출력
- 에너지 절감 현황
- AI 목표 주파수 (운전 중인 장비)

### 상태 확인
```
[상태] 2025-11-21 14:30:00 | Cycle #600

💡 에너지 절감:
   실시간: 45.3 kW (35.2%)
   오늘 누적: 234.5 kWh
   이번 달 누적: 5678.9 kWh

🎯 AI 목표 주파수 (운전 중: 6대):
   SWP1: 목표=48.4Hz, 실제=48.5Hz, 편차=+0.10Hz (정상)
   SWP2: 목표=48.3Hz, 실제=48.4Hz, 편차=+0.10Hz (정상)
   ...
```

## 개발자 정보

### 파일 구조
```
Edge_Computer_V1/
├── main.py              # 메인 실행 파일
├── modbus_client.py     # Modbus TCP 클라이언트
├── ai_calculator.py     # AI 계산 엔진
├── config.py            # 설정 파일
├── requirements.txt     # Python 의존성
├── START.bat            # 실행 스크립트
└── README.md            # 이 문서
```

### AI 계산 로직 출처
- 원본: `c:\Users\my\Desktop\HMI_REAL\backend\modbus_client.py`
- 이식 함수:
  - `calculate_energy_savings_from_edge()` (Line 726-859)
  - `calculate_ai_target_frequency()` (Line 861-958)
  - `calculate_energy_savings_summary()` (Line 960-1027)

## 실제 PLC 연결 시

### PLC 프로그램 요구사항
1. Modbus TCP 서버 기능 (포트 502)
2. Slave ID: 3
3. 센서 데이터 레지스터 (10-19) 준비
4. 장비 상태 레지스터 (4000-4001) 준비
5. VFD 데이터 레지스터 (160-238) 준비
6. **Edge AI 결과 저장 레지스터 (5000-5399) 준비** ← 중요!

### 설정 변경
**config.py**:
```python
PLC_HOST = "192.168.0.130"  # 실제 PLC IP로 변경
```

→ PLC Simulator 중지 후 Edge AI 재시작하면 자동으로 실제 PLC에 연결!

## 라이선스
내부 사용 전용
