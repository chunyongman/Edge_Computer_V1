# Edge Computer V2.0 실행 방법

## 📁 BAT 파일 목록

### 🚀 추천 방법

#### **START_FULL_SYSTEM.bat** ⭐ 가장 추천!
- **설명**: Edge AI Backend + Dashboard V2.0 동시 실행
- **포함 기능**:
  - Edge AI 주파수 계산 (main.py)
  - Dashboard V2.0 (9개 탭)
  - 자동 PLC 연결
- **실행 순서**:
  1. Edge AI Backend 시작 (백그라운드)
  2. 3초 대기
  3. Dashboard V2.0 시작 (브라우저 자동 열림)
- **접속**: http://localhost:8501
- **종료**: 각 창에서 Ctrl+C 또는 창 닫기

---

### 📊 Dashboard만 실행

#### **START_DASHBOARD_V2.bat**
- **설명**: Dashboard V2.0만 실행 (Edge AI 포함 안됨)
- **사용 시기**: Dashboard만 테스트할 때
- **주의**: Edge AI Backend가 실행 중이어야 데이터 확인 가능
- **접속**: http://localhost:8501

#### **START_DASHBOARD_ONLY.bat**
- **설명**: 최소 기능으로 Dashboard만 실행
- **사용 시기**: 빠르게 UI만 확인할 때

---

### 🔧 기존 BAT 파일

#### **START_WITH_DASHBOARD.bat**
- **설명**: 기존 방식 (EDGE_AI_REAL 스타일)
- **동일 기능**: `START_FULL_SYSTEM.bat`와 동일
- **호환성**: V2.0 Dashboard 자동 실행

---

## 🎯 사용 시나리오별 추천

### 시나리오 1: 전체 시스템 실행 (일반 사용)
```bash
1. PLC_Simulator 실행 (C:\Users\my\Desktop\PLC_Simulator\START_PLC.bat)
2. START_FULL_SYSTEM.bat 더블 클릭
3. 브라우저에서 http://localhost:8501 접속
```

### 시나리오 2: Dashboard만 새로고침
```bash
1. Edge AI Backend는 이미 실행 중
2. START_DASHBOARD_V2.bat 더블 클릭
3. Dashboard만 재시작
```

### 시나리오 3: 개발/테스트
```bash
1. START_DASHBOARD_ONLY.bat 실행 (빠른 UI 확인)
2. 별도 터미널에서 main.py 디버그 모드 실행
```

---

## ⚙️ 실행 전 준비사항

### 1단계: PLC Simulator 실행 (필수)
```bash
cd C:\Users\my\Desktop\PLC_Simulator
START_PLC.bat
```

### 2단계: 가상 환경 생성 (최초 1회)
```bash
python -m venv venv
```

### 3단계: 패키지 설치 (최초 1회)
```bash
venv\Scripts\pip install -r requirements.txt
```

**또는**

```bash
INSTALL_PACKAGES.bat 실행
```

---

## 🌐 접속 주소

| 서비스 | URL | 포트 |
|--------|-----|------|
| **Dashboard V2.0** | http://localhost:8501 | 8501 |
| HMI Backend API | http://localhost:8000 | 8000 |
| PLC Simulator | Modbus TCP | 502 |

---

## 🛠️ 문제 해결

### 문제 1: "가상 환경이 없습니다"
**해결**:
```bash
python -m venv venv
```

### 문제 2: "PLC 연결 실패"
**해결**:
1. PLC Simulator가 실행 중인지 확인
2. `C:\Users\my\Desktop\PLC_Simulator\START_PLC.bat` 실행
3. Dashboard 새로고침

### 문제 3: "포트 8501이 이미 사용 중"
**해결**:
```bash
# 기존 Streamlit 프로세스 종료
taskkill /F /IM streamlit.exe

# 또는 Task Manager에서 streamlit.exe 종료
```

### 문제 4: "모듈을 찾을 수 없습니다"
**해결**:
```bash
venv\Scripts\pip install -r requirements.txt
```

---

## 📋 실행 순서 (전체)

### 🎯 정식 실행 순서

```
1. PLC_Simulator 폴더
   └─ START_PLC.bat 실행

2. Edge_Computer_V1 폴더
   └─ START_FULL_SYSTEM.bat 실행

3. 브라우저에서
   └─ http://localhost:8501 접속

4. Dashboard 확인
   └─ 📊 실시간 모니터링 탭 확인
   └─ 주파수 비교 테이블 확인
   └─ 🔧 VFD 예방진단 확인
```

---

## 🎨 Dashboard V2.0 특징

### 운영용 탭 (6개)
1. **📊 실시간 모니터링**: 주파수 비교 테이블 (핵심!)
2. **💰 에너지 절감 분석**: 전체/기간별/그룹별/장비별
3. **🔧 VFD 예방진단**: 건강도 점수, 예측 유지보수
4. **📈 센서 & 장비 상태**: 전체 센서 (TX1-TX7, PU1 등)
5. **⚙️ 설정**: PLC 연결, AI 파라미터
6. **📝 알람/이벤트 로그**: 실시간 알람, 이벤트 필터

### 개발용 탭 (3개) - 독립적
7. **📚 학습 진행**: AI 정확도, 주간 개선 추이
8. **🧪 시나리오 테스트**: 5가지 시나리오 검증
9. **🛠️ 개발자 도구**: 디버그 로그, 레지스터 제어

---

## 🚦 실행 상태 확인

### Edge AI Backend 확인
```bash
# "Edge AI Backend" 창에서 다음 메시지 확인
✅ Edge Computer 시작됨
✅ PLC 연결 성공
✅ AI 주파수 계산 중...
```

### Dashboard 확인
```bash
# 브라우저 또는 "Dashboard V2.0" 창에서
✅ PLC 연결됨 (우측 상단)
✅ 주파수 비교 테이블 표시
✅ 센서 값 업데이트 (3초마다)
```

---

## 💡 팁

### 빠른 재시작
```bash
# Dashboard만 재시작 (Edge AI는 유지)
START_DASHBOARD_V2.bat
```

### 로그 확인
```bash
# Edge AI 로그
logs/ 폴더 확인

# Dashboard 로그
터미널 창 확인
```

### 성능 최적화
```bash
# 자동 새로고침 간격 변경 (dashboard.py 파일)
st_autorefresh(interval=5000)  # 3초 → 5초
```

---

## 📞 지원

문제 발생 시:
1. PLC Simulator 실행 여부 확인
2. 가상 환경 활성화 확인
3. 패키지 설치 확인
4. 로그 파일 확인

---

**버전**: Dashboard V2.0
**최종 업데이트**: 2025-11-25
**스타일**: HMI_V1 기반 다크 테마
