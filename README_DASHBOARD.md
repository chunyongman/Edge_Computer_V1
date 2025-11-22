# Edge AI Computer - Dashboard 가이드

## 개요

Edge Computer에는 2가지 실행 모드가 있습니다:

### 1️⃣ 일반 모드 (운영용)
- 대시보드 없이 AI 계산만 수행
- 콘솔에 로그만 출력
- 리소스 최소화
- **실제 Edge Computer 장비에서 사용**

### 2️⃣ Dashboard 모드 (개발/디버깅용)
- AI 계산 + 웹 대시보드 제공
- 실시간 모니터링 가능
- AI 학습 진행 상황 확인
- 시나리오 테스트 가능
- **개발 PC 또는 노트북에서 사용**

---

## 실행 방법

### 🚀 일반 모드 (대시보드 없음)

```batch
cd C:\Users\my\Desktop\Edge_Computer_V1
START.bat
```

**특징:**
- 콘솔에 로그만 출력
- 가볍고 빠름
- 백그라운드 실행 적합

---

### 🌐 Dashboard 모드 (대시보드 포함)

```batch
cd C:\Users\my\Desktop\Edge_Computer_V1
START_WITH_DASHBOARD.bat
```

**특징:**
- Backend API 서버: `http://localhost:8080`
- Frontend 대시보드: `http://localhost:5174` (자동 열림)
- API 문서: `http://localhost:8080/docs`
- WebSocket 실시간 업데이트

**브라우저가 자동으로 열리고 대시보드가 표시됩니다!**

---

## 대시보드 기능

### 📊 메인 대시보드
- 실시간 에너지 절감률
- AI 목표 주파수 vs 실제 주파수
- 장비 상태 모니터링
- 센서 데이터 표시

### 📈 실시간 모니터링
- 센서 데이터 트렌드
- 장비 운전 상태
- VFD 주파수 모니터링

### ⚙️ AI 계산 결과
- 에너지 절감 계산 (실시간/일일/월간)
- AI 목표 주파수 제어
- VFD 진단 점수
- 장비별 에너지 절감 상세

### 🧪 시나리오 테스트
- 센서 값 변경 시뮬레이션
- AI 반응 확인
- 디버깅 로그 확인

---

## 포트 정보

| 서비스 | 포트 | 설명 |
|--------|------|------|
| Edge AI Backend | 8080 | REST API + WebSocket |
| Edge AI Frontend | 5174 | React 대시보드 |
| HMI Backend | 8000 | HMI 시스템 (별도) |
| HMI Frontend | 5173 | HMI 대시보드 (별도) |

**Edge Computer 대시보드와 HMI는 포트가 다르므로 동시에 실행 가능합니다!**

---

## 네트워크 모니터링

### 시나리오 1: 개발 PC에서 Edge Computer 모니터링

Edge Computer가 별도 장비에서 실행 중일 때:

```
1. Edge Computer (192.168.1.20):
   START_WITH_DASHBOARD.bat 실행

2. 개발 PC 브라우저:
   http://192.168.1.20:8080 접속
```

### 시나리오 2: 노트북으로 원격 모니터링

```
1. Edge Computer:
   START.bat (대시보드 없이 실행)

2. 노트북:
   브라우저로 http://<Edge_IP>:8080 접속
```

---

## 종료 방법

### 일반 모드:
```
콘솔 창에서 Ctrl+C
```

### Dashboard 모드:
```
1. "Edge AI Backend" 창 닫기
2. "Edge AI Frontend" 창 닫기
또는 메인 창에서 Ctrl+C
```

---

## 트러블슈팅

### 문제 1: 대시보드가 열리지 않음

**원인:** Backend가 아직 시작 중

**해결:**
```
1. 5-10초 기다림
2. 브라우저에서 http://localhost:5174 수동 접속
```

### 문제 2: "npm install" 실패

**원인:** Node.js가 설치되어 있지 않음

**해결:**
```
1. Node.js 다운로드: https://nodejs.org/
2. LTS 버전 설치
3. START_WITH_DASHBOARD.bat 재실행
```

### 문제 3: 포트 8080이 이미 사용 중

**원인:** 다른 프로그램이 8080 포트 사용 중

**해결:**
```batch
# 포트 사용 확인
netstat -ano | findstr :8080

# 프로세스 종료
taskkill /F /PID <PID>
```

### 문제 4: 데이터가 업데이트되지 않음

**원인:** WebSocket 연결 끊김

**해결:**
```
1. 브라우저 새로고침 (F5)
2. Backend 재시작
```

---

## API 엔드포인트

### REST API

| 엔드포인트 | 설명 |
|-----------|------|
| `GET /api/sensors` | 센서 데이터 조회 |
| `GET /api/equipment` | 장비 상태 조회 |
| `GET /api/energy-savings` | 에너지 절감 데이터 |
| `GET /api/ai-frequency-control` | AI 목표 주파수 |
| `GET /api/energy-savings-summary` | 장비별 절감 상세 |
| `GET /api/vfd/diagnostics` | VFD 진단 데이터 |
| `GET /api/system-status` | 시스템 상태 |

### WebSocket

```
ws://localhost:8080/ws
```

**메시지 형식:**
```json
{
  "type": "realtime_update",
  "sensors": {...},
  "equipment": [...],
  "energy_savings": {...},
  "ai_frequency_control": [...],
  "system_status": {...},
  "timestamp": "2025-01-22T12:00:00"
}
```

---

## 파일 구조

```
Edge_Computer_V1/
├── main.py                      # 일반 모드 (대시보드 없음)
├── main_with_dashboard.py       # Dashboard 모드
├── config.py
├── modbus_client.py
├── ai_calculator.py
├── requirements.txt
├── START.bat                    # 일반 모드 실행
├── START_WITH_DASHBOARD.bat     # Dashboard 모드 실행
├── dashboard/                   # 대시보드 파일
│   └── frontend/               # React 앱
│       ├── src/
│       ├── package.json
│       └── vite.config.js
└── venv/                        # Python 가상 환경
```

---

## 개발 가이드

### Backend 수정 시

```batch
# 1. Backend 재시작
Ctrl+C로 "Edge AI Backend" 창 종료
START_WITH_DASHBOARD.bat 재실행

# 2. 또는 수동 재시작
cd C:\Users\my\Desktop\Edge_Computer_V1
venv\Scripts\python main_with_dashboard.py
```

### Frontend 수정 시

```batch
# Vite의 Hot Module Replacement (HMR) 자동 적용
# 코드 수정 → 브라우저 자동 새로고침
```

---

## 참고 사항

1. **일반 모드와 Dashboard 모드는 동시에 실행 불가**
   - main.py와 main_with_dashboard.py는 같은 PLC에 연결하므로 충돌 가능

2. **HMI와는 독립적**
   - Edge Computer 대시보드와 HMI는 별도 시스템
   - 동시 실행 가능 (포트가 다름)

3. **실제 Edge Computer 장비 배포 시**
   - `START.bat` 사용 (대시보드 불필요)
   - 노트북으로 원격 접속하여 모니터링 가능

4. **개발/디버깅 시**
   - `START_WITH_DASHBOARD.bat` 사용
   - AI 학습 과정 시각화
   - 시나리오 테스트

---

**작성일:** 2025년 1월 22일
**버전:** 1.0
