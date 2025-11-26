# 알람 시스템 구현 완료

## 📋 개요

Edge Computer ESS 시스템에 완전한 알람 시스템이 구현되었습니다.

**핵심 설계 원칙**: Edge Computer가 고장나도 ESS 시스템은 정상 작동해야 함
- 알람 판단: PLC에서 수행 (독립적 동작)
- 알람 저장: Edge Computer에서 수행 (대용량 저장)
- HMI_V1 접근: HTTP API를 통해 Edge Computer의 로그 조회

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                        PLC Simulator                         │
│  - 센서 임계값 관리 (7000-7009)                               │
│  - 알람 판단 로직 (check_alarms)                              │
│  - 알람 상태 레지스터 (7100-7103)                             │
│  - 최근 알람 10개 순환 버퍼 (7200-7279)                       │
└─────────────┬───────────────────────────────────────────────┘
              │ Modbus TCP (Port 502)
              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Edge Computer (main.py)                   │
│  ┌──────────────────────┐  ┌──────────────────────────┐     │
│  │ 알람 모니터링 스레드  │  │ HTTP API 서버 스레드      │     │
│  │ - PLC 알람 폴링      │  │ - FastAPI (Port 8000)    │     │
│  │ - CSV 저장           │  │ - HMI_V1용 REST API      │     │
│  │ - logs/ 디렉토리     │  │ - 알람 조회/통계/다운로드 │     │
│  └──────────────────────┘  └──────────────────────────┘     │
└─────────────┬──────────────────┬──────────────────────────┘
              │                  │
              ↓                  ↓ HTTP (Port 8000)
    ┌──────────────┐      ┌──────────────┐
    │  Dashboard   │      │   HMI_V1     │
    │  (Port 8501) │      │  (터치스크린)  │
    └──────────────┘      └──────────────┘
```

---

## 📂 파일 구조

### 수정된 파일

1. **C:\Users\my\Desktop\PLC_Simulator\plc_simulator.py**
   - 알람 레지스터 초기화 (7000-7009, 7100-7103, 7200-7279)
   - `check_alarms()`: 1초마다 센서값과 임계값 비교
   - `add_recent_alarm()`: 알람 발생 시 순환 버퍼에 추가
   - `write_recent_alarms_to_registers()`: 버퍼를 PLC 레지스터에 동기화

2. **C:\Users\my\Desktop\Edge_Computer_V1\main.py**
   - `monitor_alarms()`: 알람 모니터링 스레드 (1초 주기)
   - `save_alarm_to_csv()`: 알람을 날짜별 CSV 파일에 저장
   - HTTP API 서버 스레드 자동 시작

3. **C:\Users\my\Desktop\Edge_Computer_V1\api_server.py** (신규)
   - FastAPI 기반 REST API 서버
   - 엔드포인트:
     - `GET /alarms`: 알람 목록 조회 (필터링)
     - `GET /alarms/latest`: 최근 N개 알람
     - `GET /alarms/export`: CSV 다운로드
     - `GET /alarms/stats`: 알람 통계
     - `GET /events`: 이벤트 로그

4. **C:\Users\my\Desktop\Edge_Computer_V1\src\hmi\dashboard.py**
   - `_render_alarm_event_log()`: CSV 파일에서 알람 조회
   - `_render_settings()`: 알람 임계값을 PLC로 전송

5. **C:\Users\my\Desktop\Edge_Computer_V1\requirements.txt**
   - `fastapi>=0.100.0` 추가
   - `uvicorn[standard]>=0.23.0` 추가

---

## 📊 레지스터 맵

### 알람 임계값 (7000-7009, HMI → PLC Write)

| 주소  | 센서   | 설명                      | 단위        | 포맷     |
|-------|--------|---------------------------|-------------|----------|
| 7000  | TX1    | CSW PP Disc Temp 상한     | °C × 10     | 300 = 30.0°C |
| 7001  | TX2    | No.1 COOLER SW Out 상한   | °C × 10     | 500 = 50.0°C |
| 7002  | TX3    | No.2 COOLER SW Out 상한   | °C × 10     | 500 = 50.0°C |
| 7003  | TX4    | COOLER FW In Temp 상한    | °C × 10     | 500 = 50.0°C |
| 7004  | TX5    | COOLER FW Out Temp 상한   | °C × 10     | 400 = 40.0°C |
| 7005  | TX6    | E/R Inside Temp 상한      | °C × 10     | 500 = 50.0°C |
| 7006  | TX7    | E/R Outside Temp 상한     | °C × 10     | 400 = 40.0°C |
| 7007  | PX1    | CSW PP Disc Press 하한    | bar × 100   | 150 = 1.5 bar |
| 7008  | PX1    | CSW PP Disc Press 상한    | bar × 100   | 400 = 4.0 bar |
| 7009  | PU1    | M/E Load 상한             | % × 10      | 850 = 85.0% |

### 알람 상태 (7100-7103, PLC → HMI Read)

| 주소  | 설명                    | 비트 매핑                   |
|-------|-------------------------|----------------------------|
| 7100  | 온도 알람 비트          | bit0=TX1, bit1=TX2, ..., bit6=TX7 |
| 7101  | 압력/부하 알람 비트      | bit0=PX1_LOW, bit1=PX1_HIGH, bit2=PU1 |
| 7102  | 미확인 알람 개수        | 0-10                       |
| 7103  | 새 알람 플래그          | 0=없음, 1=새 알람 발생      |

### 최근 알람 10개 (7200-7279, PLC → HMI Read)

각 알람은 8개 레지스터 사용 (총 10개 × 8 = 80 레지스터):

| Offset | 내용                  | 포맷                          |
|--------|-----------------------|-------------------------------|
| 0      | 센서 ID               | 1=TX1, 2=TX2, ..., 10=PU1     |
| 1      | 알람 타입             | 1=HIGH, 2=LOW                 |
| 2      | 타임스탬프 상위 16비트 | UNIX timestamp (32bit)        |
| 3      | 타임스탬프 하위 16비트 | UNIX timestamp (32bit)        |
| 4      | 센서값                | 센서에 따라 ×10 또는 ×100     |
| 5      | 임계값                | 센서에 따라 ×10 또는 ×100     |
| 6      | 상태                  | 0=미확인, 1=확인됨            |
| 7      | 확인 시간 (예약)      | 0                             |

**예시**: 첫 번째 알람 (7200-7207), 두 번째 알람 (7208-7215), ...

---

## 🔄 알람 처리 플로우

### 1. 알람 발생 (PLC)

```
1초마다 PLC에서 실행:
  1. 센서값 읽기 (10-19)
  2. 임계값 읽기 (7000-7009)
  3. 비교 로직:
     - TX1-TX7: 센서값 > 임계값 → HIGH 알람
     - PX1: 센서값 < 하한 → LOW 알람, 센서값 > 상한 → HIGH 알람
     - PU1: 센서값 > 상한 → HIGH 알람
  4. 알람 발생 시:
     - recent_alarms 리스트에 추가 (최대 10개, 순환)
     - 레지스터 7200-7279에 쓰기
     - 7100-7103 상태 업데이트
     - 7103 (새 알람 플래그) = 1
```

### 2. 알람 감지 및 저장 (Edge Computer)

```
알람 모니터링 스레드 (1초 주기):
  1. 레지스터 7103 읽기 (새 알람 플래그)
  2. 플래그 = 1이면:
     - 레지스터 7200-7279 읽기 (최근 알람 10개)
     - 알람 파싱 (센서 ID, 타입, 타임스탬프, 값, 임계값)
     - CSV 파일 저장 (logs/alarm_YYYYMMDD.csv)
     - 플래그 리셋 (7103 = 0)
```

### 3. 알람 조회 (Dashboard / HMI_V1)

**Dashboard 경로**:
```
Dashboard → logs/ 디렉토리 직접 읽기 → CSV 파일 표시
```

**HMI_V1 경로**:
```
HMI_V1 → HTTP GET /alarms → Edge Computer API → logs/ 디렉토리 읽기 → JSON 응답
```

---

## 🧪 테스트 방법

### 준비

1. **패키지 설치**:
   ```bash
   venv\Scripts\pip install fastapi uvicorn[standard]
   ```

2. **PLC Simulator 시작**:
   ```bash
   cd C:\Users\my\Desktop\PLC_Simulator
   START_PLC.bat
   ```

3. **Edge Computer 시작**:
   ```bash
   cd C:\Users\my\Desktop\Edge_Computer_V1
   START_FULL_SYSTEM.bat
   ```

### 시나리오 1: 온도 알람 테스트

1. Dashboard → **설정** 탭
2. TX6 임계값을 **40°C**로 설정
3. **알람 임계값 PLC로 전송** 버튼 클릭
4. **센서 & 장비 상태** 탭에서 TX6 확인
5. PLC Simulator에서 TX6이 40°C를 초과하면 알람 발생
6. Edge Computer 콘솔에서 `[알람 감지]` 메시지 확인
7. `logs/alarm_YYYYMMDD.csv` 파일 생성 확인
8. Dashboard → **알람/이벤트 로그** 탭에서 알람 표시 확인

### 시나리오 2: 압력 알람 테스트

1. Dashboard → **설정** 탭
2. PX1 하한을 **2.0 kg/cm²**로 설정
3. **알람 임계값 PLC로 전송** 버튼 클릭
4. PLC Simulator에서 PX1이 2.0 미만이 되면 알람 발생
5. 알람 로그 확인

### 시나리오 3: HTTP API 테스트

브라우저 또는 curl로 테스트:

```bash
# 최근 10개 알람 조회
curl http://localhost:8000/alarms/latest

# 알람 필터링 조회
curl "http://localhost:8000/alarms?sensor_id=TX6&alarm_type=HIGH"

# 알람 통계
curl http://localhost:8000/alarms/stats?days=7

# CSV 다운로드
curl "http://localhost:8000/alarms/export?start_date=20251125&end_date=20251125" -o alarms.csv
```

---

## 📁 로그 파일 형식

**파일명**: `logs/alarm_YYYYMMDD.csv`

**예시**: `logs/alarm_20251125.csv`

**CSV 형식**:
```csv
timestamp,sensor_id,alarm_type,sensor_value,threshold,status,ack_timestamp
2025-11-25 14:35:22,TX6,HIGH,45.3,40.0,미확인,
2025-11-25 14:36:15,PX1_LOW,LOW,1.3,1.5,미확인,
2025-11-25 14:40:00,PU1,HIGH,87.5,85.0,미확인,
```

---

## 🔧 Dashboard 기능

### 설정 탭
- 알람 임계값 설정 UI (TX1-TX7, PX1, PU1)
- **알람 임계값 PLC로 전송** 버튼
- PLC 레지스터 7000-7009에 쓰기

### 알람/이벤트 로그 탭
- 날짜 범위 필터 (기본: 최근 7일)
- 센서 필터 (전체, TX1-TX7, PX1_LOW, PX1_HIGH, PU1)
- 알람 타입 필터 (전체, HIGH, LOW)
- 실시간 알람 표시 (미확인 알람 강조)
- 알람 로그 테이블 (시간 내림차순 정렬)
- 알람 통계 (전체/미확인/확인됨, 센서별 발생 횟수)
- CSV 다운로드 기능

---

## 🌐 HTTP API 엔드포인트

### GET /alarms

**파라미터**:
- `start_date`: 시작 날짜 (YYYYMMDD)
- `end_date`: 종료 날짜 (YYYYMMDD)
- `sensor_id`: 센서 ID (TX1, TX6, PX1_HIGH, ...)
- `alarm_type`: 알람 타입 (HIGH, LOW)
- `status`: 상태 (미확인, 확인됨)
- `limit`: 최대 개수 (기본 100, 최대 1000)

**응답**:
```json
{
  "total": 5,
  "start_date": "20251120",
  "end_date": "20251125",
  "alarms": [
    {
      "timestamp": "2025-11-25 14:35:22",
      "sensor_id": "TX6",
      "alarm_type": "HIGH",
      "sensor_value": "45.3",
      "threshold": "40.0",
      "status": "미확인",
      "ack_timestamp": ""
    }
  ]
}
```

### GET /alarms/latest

**파라미터**:
- `count`: 개수 (기본 10, 최대 100)

### GET /alarms/export

**파라미터**:
- `start_date`: 시작 날짜 (YYYYMMDD)
- `end_date`: 종료 날짜 (YYYYMMDD)

**응답**: CSV 파일 다운로드

### GET /alarms/stats

**파라미터**:
- `days`: 최근 N일 (기본 7, 최대 90)

**응답**:
```json
{
  "total_alarms": 25,
  "unacknowledged": 3,
  "acknowledged": 22,
  "by_sensor": {
    "TX6": 10,
    "PX1_LOW": 5,
    "PU1": 10
  },
  "by_type": {
    "HIGH": 20,
    "LOW": 5
  },
  "by_date": {
    "2025-11-25": 10,
    "2025-11-24": 15
  }
}
```

---

## 🛠️ HMI_V1 통합 가이드

HMI_V1에서 알람 로그를 조회하려면:

1. **Edge Computer IP 확인**:
   - 일반적으로 동일 네트워크: `192.168.x.x`
   - 로컬 테스트: `127.0.0.1` 또는 `localhost`

2. **HTTP 요청 보내기**:
   ```python
   import requests

   # Edge Computer IP
   edge_computer_ip = "192.168.1.100"

   # 최근 알람 조회
   response = requests.get(f"http://{edge_computer_ip}:8000/alarms/latest?count=10")
   alarms = response.json()['alarms']

   # 알람 표시
   for alarm in alarms:
       print(f"{alarm['timestamp']} - {alarm['sensor_id']}: {alarm['alarm_type']}")
   ```

3. **CORS 설정**:
   - `api_server.py`에서 HMI_V1 IP를 `allow_origins`에 추가 가능
   - 현재는 `*` (모든 IP 허용)

---

## ✅ 구현 완료 항목

1. ✅ PLC Simulator 알람 레지스터 및 체크 로직
2. ✅ Edge Computer 알람 모니터링 및 CSV 저장
3. ✅ Edge Computer HTTP API 서버 (FastAPI)
4. ✅ Dashboard 알람 로그 조회 기능
5. ✅ Dashboard 설정 탭 PLC 임계값 전송

---

## 🔍 문제 해결

### 문제 1: 알람이 CSV 파일에 저장되지 않음

**확인 사항**:
1. Edge Computer가 실행 중인지 확인
2. `logs/` 디렉토리가 생성되었는지 확인
3. PLC에서 알람이 발생했는지 확인 (센서값 > 임계값)
4. Edge Computer 콘솔에서 `[알람 감지]` 메시지 확인

### 문제 2: HTTP API 접근 불가

**확인 사항**:
1. Edge Computer main.py가 실행 중인지 확인
2. 포트 8000이 사용 중인지 확인: `netstat -an | findstr 8000`
3. 방화벽 설정 확인 (포트 8000 허용)

### 문제 3: Dashboard에서 알람이 표시되지 않음

**확인 사항**:
1. `logs/alarm_YYYYMMDD.csv` 파일이 존재하는지 확인
2. Dashboard 날짜 필터가 올바른지 확인
3. CSV 파일 인코딩이 UTF-8인지 확인

---

## 📞 지원

문제 발생 시:
1. PLC Simulator 실행 상태 확인
2. Edge Computer 콘솔 로그 확인
3. `logs/` 디렉토리의 CSV 파일 확인
4. HTTP API 엔드포인트 테스트 (`curl http://localhost:8000/`)

---

**버전**: Alarm System V1.0
**최종 업데이트**: 2025-11-25
**작성자**: Claude Code
