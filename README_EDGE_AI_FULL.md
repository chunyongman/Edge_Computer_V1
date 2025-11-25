# Edge AI Computer V1 - EDGE_AI_REAL 전체 기능

## 개요
PLC Simulator 연결 + **EDGE_AI_REAL의 전체 AI 기능**을 포함한 선박 엔진룸 온도 제어 시스템입니다.

## ✨ 주요 AI 기능 (EDGE_AI_REAL 완전 복제)

### 1. Random Forest Optimizer
- **50개 결정 트리 앙상블**
- **10개 입력 특징**: T1/T5/T6/T7, 시간대, 계절, GPS, 선속, 엔진부하
- **출력**: 펌프/팬 최적 주파수 및 운전 대수
- **알고리즘**: Information Gain 기반 분할, Bootstrap sampling

### 2. Temperature Predictor (온도 예측)
- **Polynomial Regression (2차)**
- **30분 시퀀스 데이터** (90개 포인트, 20초 간격)
- **19개 특징 추출**: 현재값, 평균, 표준편차, 증가율, 시간/계절 정보
- **예측**: 5분/10분/15분 후 T4/T5/T6 온도
- **추론 시간**: <10ms
- **정확도**: ±2-3°C

### 3. Pattern Classifier (패턴 인식)
- **4가지 엔진 부하 패턴 자동 인식**:
  - 가속 (Acceleration): 냉각 강화 (+2Hz)
  - 정속 (Steady State): 유지 (±0Hz)
  - 감속 (Deceleration): 절감 (-2Hz)
  - 정박 (Berthing): 최소 전력 (-5Hz)
- **선형 추세 분석 + Markov Chain**
- **패턴별 최적 제어 전략 자동 적용**

### 4. Batch Learning System (배치 학습)
- **주 2회 자동 학습** (수요일/일요일 심야 02:00-04:00)
- **3단계 학습 프로세스**:
  1. 데이터 정리 (02:00-02:30): 이상치 제거, 60점 미만 삭제
  2. 모델 업데이트 (02:30-03:30): 우수 사례 (95점+) 가중 학습
  3. 시나리오 DB 업데이트 (03:30-04:00): 검증된 패턴 추가
- **성과 평가 기준 (0-100점)**:
  - 온도 제어 정확도 (50점)
  - 에너지 절감 (30점)
  - 안정성 (20점)

### 5. Integrated Controller (통합 제어기)
- **ML + Rule-based 통합 제어**
- **계층적 제어 우선순위**:
  1. 안전 제약 (최우선)
  2. ML 최적화
  3. Rule 미세 조정
  4. 에너지 절감
- **예측 제어**: 10분 후 온도 기반 선제적 조정
- **자동 대수 제어**: 부하에 따른 운전 대수 자동 조정

## 📁 프로젝트 구조

```
Edge_Computer_V1/
├── main.py                    # 메인 실행 파일 (EDGE_AI_REAL 통합 제어기 사용)
├── main_simple.py.backup      # 기존 간소화 버전 (백업)
├── modbus_client.py           # PLC Simulator Modbus 통신
├── config.py                  # PLC 연결 설정
│
├── src/                       # EDGE_AI_REAL 전체 소스 코드
│   ├── ml/                    # ⭐ 머신러닝 모듈
│   │   ├── random_forest_optimizer.py      (369줄)
│   │   ├── temperature_predictor.py        (414줄)
│   │   ├── pattern_classifier.py           (344줄)
│   │   ├── batch_learning.py              (배치 학습)
│   │   ├── predictive_controller.py
│   │   ├── parameter_tuner.py
│   │   └── scenario_database.py
│   │
│   ├── control/               # ⭐ 제어 모듈
│   │   ├── integrated_controller.py       (ML + Rule 통합)
│   │   ├── rule_based_controller.py
│   │   ├── pid_controller.py
│   │   └── energy_saving.py
│   │
│   ├── diagnostics/           # ⭐ 진단 모듈
│   │   ├── vfd_predictive_diagnosis.py
│   │   ├── sensor_anomaly.py
│   │   ├── frequency_monitor.py
│   │   └── edge_plc_redundancy.py
│   │
│   ├── equipment/             # 장비 관리
│   ├── gps/                   # GPS 최적화
│   ├── core/                  # 안전 제약, 리소스 관리
│   ├── hmi/                   # Streamlit 대시보드
│   ├── data/                  # 데이터 수집/전처리
│   └── ...                    (총 57개 파일)
│
├── config/                    # 설정 파일
│   └── io_mapping.yaml        # PLC I/O 매핑
│
├── data/                      # 데이터 디렉토리
│   ├── models/                # AI 모델 저장
│   ├── learning/              # 배치 학습 데이터
│   ├── scenarios/             # 제어 시나리오
│   └── logs/                  # 로그 파일
│
├── START.bat                  # 실행 스크립트 (대시보드 없이)
├── START_WITH_DASHBOARD.bat   # 실행 스크립트 (대시보드 포함)
├── requirements.txt           # Python 의존성 (ML 라이브러리 포함)
└── README_EDGE_AI_FULL.md     # 이 문서
```

## 🚀 실행 방법

### 방법 1: 대시보드 없이 실행 (추천)
```batch
START.bat
```
- Edge AI 백엔드만 콘솔에서 실행
- 10초마다 AI 제어 상태 출력
- PLC Simulator와 실시간 통신

### 방법 2: 대시보드와 함께 실행
```batch
START_WITH_DASHBOARD.bat
```
- Edge AI 백엔드 + Streamlit 대시보드 동시 실행
- 브라우저에서 `http://localhost:8501` 자동 열림
- 실시간 센서 데이터 시각화

### 수동 실행
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

## 📊 실행 예시

```
================================================================================
  Edge AI Computer 시작 (EDGE_AI_REAL 전체 기능)
  - Random Forest 최적화
  - 온도 예측 (5/10/15분)
  - 패턴 인식 (가속/정속/감속/정박)
  - 배치 학습 (주 2회 자동)
================================================================================
  PLC 주소: localhost:502
  업데이트 주기: 1초
================================================================================

[시작] AI 제어 루프 시작 (1초 주기)
[INFO] 종료: Ctrl+C

================================================================================
[상태] 2025-11-23 07:30:00 | Cycle #600
--------------------------------------------------------------------------------
🌡️  센서:
   T5 (FW Outlet): 35.2°C
   T6 (E/R): 43.5°C
   엔진 부하: 75.3%

🤖 AI 제어:
   모드: Predictive Control (예측 제어)
   SW 펌프: 48.4 Hz
   FW 펌프: 48.2 Hz
   E/R 팬: 47.8 Hz (작동 3대)
   이유: 10분 후 T6 상승 예상 (+1.2°C), 사전 냉각 강화

🔮 온도 예측 (10분 후):
   T5: 35.2°C → 35.4°C
   T6: 43.5°C → 44.7°C
   추론 시간: 8.3ms

⚡ 성능:
   평균 AI 추론: 9.1ms
================================================================================
```

## 🔧 설정

### PLC 연결 설정
**파일: `config.py`**
```python
PLC_HOST = "localhost"  # PLC Simulator IP
PLC_PORT = 502
PLC_SLAVE_ID = 3
UPDATE_INTERVAL = 1  # 초
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

## 📦 의존성

```txt
# Core
numpy>=1.21.0
pyyaml>=6.0
psutil>=5.9.0
scipy>=1.7.0

# Machine Learning
scikit-learn>=1.0.0  # Random Forest
pandas>=1.3.0

# Communication
pymodbus>=3.0.0  # PLC Simulator 연결

# HMI Dashboard
streamlit>=1.25.0
plotly>=5.14.0
streamlit-autorefresh>=0.1.0
```

## 🎯 AI 기능 작동 방식

### 1. 온도 예측 기반 선제적 제어
```
현재 T6: 43.5°C
↓ (30분 시퀀스 데이터 분석)
Temperature Predictor
↓
10분 후 예측: T6 = 44.7°C (+1.2°C 상승)
↓
Integrated Controller 판단
↓
🚨 사전 냉각 강화 결정
↓
E/R 팬 주파수 +2Hz (47.3Hz → 49.3Hz)
```

### 2. 패턴 인식 기반 제어
```
엔진 부하 증가 감지 (70% → 80%, +2%/min)
↓
Pattern Classifier
↓
패턴 인식: "가속 (Acceleration)"
↓
제어 전략 적용
↓
냉각 강화 (+2Hz), 예측 가중치 0.8
```

### 3. 배치 학습 (주 2회 자동)
```
수요일/일요일 02:00
↓
BatchLearningSystem 작동
↓
1. 데이터 정리 (02:00-02:30)
   - 이상치 제거
   - 성과 60점 미만 삭제
↓
2. 모델 업데이트 (02:30-03:30)
   - 95점+ 우수 사례 가중 학습
   - Polynomial Regression 계수 재조정
   - Random Forest 트리 재구축
↓
3. 시나리오 DB 업데이트 (03:30-04:00)
   - 검증된 패턴만 DB 추가
   - 30일 이상 기록 정리
```

## 🆚 기존 버전과의 차이점

| 항목 | 기존 (main_simple.py) | 현재 (main.py) |
|-----|---------------------|----------------|
| **AI 기능** | ❌ 없음 (고정값 + 랜덤) | ✅ 전체 구현 |
| **파일 수** | 7개 | **57개** |
| **코드 규모** | 360줄 | **4,000줄+** |
| **Random Forest** | ❌ | ✅ 50 trees |
| **온도 예측** | ❌ | ✅ 5/10/15분 |
| **패턴 인식** | ❌ | ✅ 4가지 패턴 |
| **배치 학습** | ❌ | ✅ 주 2회 자동 |
| **예측 제어** | ❌ | ✅ 10분 예측 기반 |

## 📝 문제 해결

### 1. PLC 연결 실패
**증상**: `[ERROR] PLC 연결 실패`

**해결**:
1. PLC Simulator가 실행 중인지 확인
2. IP 주소 및 포트 확인 (`config.py`)
3. 방화벽 설정 확인 (포트 502 개방)
4. 네트워크 연결 테스트: `ping localhost`

### 2. AI 모델 로딩 실패
**증상**: `[ERROR] ML 모델 초기화 실패`

**해결**:
```batch
# 의존성 재설치
venv\Scripts\pip install --upgrade -r requirements.txt

# 특히 확인
venv\Scripts\pip install scikit-learn scipy numpy pandas
```

### 3. 메모리 부족
**증상**: 시스템이 느려지거나 멈춤

**해결**:
- 온도 시퀀스 버퍼 크기 조정 (`main.py:76`)
  ```python
  # 기본: maxlen=90 (30분)
  # 축소: maxlen=45 (15분)
  ```

## 🎓 추가 정보

- **AI 모델 크기**: 약 2MB (Xavier NX 최적화)
- **추론 시간**: <10ms (실시간 제어 가능)
- **에너지 절감 목표**: 펌프 48-52%, 팬 54-58%

## 📄 라이선스
내부 사용 전용

## 👨‍💻 개발자 정보
EDGE_AI_REAL 전체 기능 복제 완료
- PLC Simulator 연결 유지
- 모든 AI 기능 통합
