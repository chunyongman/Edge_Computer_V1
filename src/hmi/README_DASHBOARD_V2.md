# Edge Computer Dashboard V2.0

## 개요
HMI_V1 스타일을 적용한 완전히 새로운 구조의 Edge Computer 대시보드입니다.

## 주요 특징

### 🎨 디자인
- **다크 테마**: 배경색 `#0f172a` (어두운 네이비)
- **카드 기반 레이아웃**: 배경색 `#1e293b`
- **그라디언트 헤더**: `#1e40af` → `#3b82f6`
- **액티브 버튼**: `#3b82f6`
- **텍스트**: `#e2e8f0`
- **성공/위험**: `#10b981` / `#ef4444`

### 📑 탭 구성 (9개)

#### 운영용 탭 (1-6)
1. **📊 실시간 모니터링**
   - 주파수 비교 테이블 (목표 vs 실제 vs 편차)
   - 실시간 절감률 요약 카드 (전체/SWP/FWP/FAN)
   - 장비 운전 상태 요약 (펌프/팬)

2. **💰 에너지 절감 분석**
   - 상단 요약 카드 4개 (전체/오늘/이번달/예상연간)
   - 기간별 그래프 (시간별/일별/월별)
   - 그룹별 분석 (SWP/FWP/FAN)
   - 장비별 상세 테이블

3. **🔧 VFD 예방진단**
   - 10대 VFD 상태 카드 (건강도 점수 0-100)
   - 이상 징후 경고
   - 예측 유지보수 정보
   - 상세 진단 정보 (온도/진동/운전시간 등)
   - **준비**: PLC 레지스터 6000-6099 읽기/쓰기 구조

4. **📈 센서 & 장비 상태**
   - 전체 센서 테이블 (TX1-TX7, DPX1-DPX2, PU1)
   - 센서 트렌드 그래프 (선택 가능)
   - 장비 상세 상태 (주파수/전력/운전시간)
   - AI 제어 로직 표시

5. **⚙️ 설정**
   - PLC 연결 설정 (IP/Port/Slave ID)
   - AI 파라미터 조정 (목표 주파수)
   - 알람 임계값 설정 (온도/압력)
   - 시스템 정보

6. **📝 알람/이벤트 로그**
   - 실시간 알람 목록 (미확인/확인)
   - 이벤트 로그 테이블
   - 카테고리별 필터
   - CSV 다운로드

#### 개발용 탭 (7-9) - 독립적으로 구성
7. **📚 학습 진행** (개발용)
   - AI 학습 진행 상태 (온도 예측 정확도, 최적화 정확도)
   - 주간 개선 추이 그래프
   - AI 진화 단계 (Stage 1-3)
   - 전체 진행률 표시

8. **🧪 시나리오 테스트** (개발용)
   - 시나리오 모드 활성화/비활성화
   - 5가지 시나리오 선택 (정상 운전, 고부하, 냉각 문제, 압력 저하, 고온 환경)
   - 시나리오 상세 정보

9. **🛠️ 개발자 도구** (개발용)
   - 디버그 로그
   - 레지스터 직접 읽기/쓰기
   - 데이터 덤프 (JSON 다운로드)

## PLC 통신

### 읽기 레지스터
- **센서 데이터** (10-19): TX1-TX7, DPX1-DPX2, PU1
- **장비 상태** (4000-4001): 운전 상태 비트
- **VFD 데이터** (160-238): 주파수, 전력, 운전시간 등
- **AI 목표 주파수** (5000-5009): AI가 설정한 목표 주파수
- **VFD 진단 데이터** (6000-6099): 향후 구현 예정

### 쓰기 레지스터
- **AI 목표 주파수** (5000-5009): AI 계산 결과
- **에너지 절감 데이터** (5100-5109, 5300-5303, 5400-5401): 절감량, 절감률
- **VFD 진단 점수** (5200-5209): 건강도 점수

## 설치 및 실행

### 1. 필요한 패키지 설치
```bash
pip install streamlit streamlit-autorefresh pandas plotly
```

### 2. 대시보드 실행
```bash
cd C:\Users\my\Desktop\Edge_Computer_V1
streamlit run src/hmi/dashboard.py
```

### 3. PLC 연결
- 사이드바에서 "🔌 연결" 버튼 클릭
- PLC 주소: `127.0.0.1:502` (기본값)
- Slave ID: `3` (기본값)

## 주요 기능

### 자동 새로고침
- 3초마다 자동으로 PLC 데이터 갱신
- `st_autorefresh(interval=3000)`

### 실시간 모니터링
- **주파수 비교**: 목표 주파수와 실제 주파수 편차 확인
- **절감률 계산**: 60Hz 고정 운전 대비 VFD 운전 절감률
- **장비 상태**: 펌프/팬 운전 상태 실시간 표시

### 에너지 분석
- **절감 요약**: 전체/오늘/이번달/연간 예상 절감량
- **기간별 추이**: 시간별/일별/월별 그래프
- **장비별 상세**: 10대 장비 개별 절감 분석

### VFD 진단
- **건강도 점수**: 0-100 점수로 VFD 상태 평가
- **이상 징후 탐지**: 온도/진동 이상 자동 감지
- **예측 유지보수**: 정비 시기 및 권장 조치 제공

## 코드 구조

```python
class EdgeComputerDashboard:
    def __init__(self):
        # 초기화, CSS 적용, session state 설정

    def run(self):
        # 메인 실행, 헤더/사이드바/탭 렌더링

    # 운영용 탭 (1-6)
    def _render_realtime_monitoring(self):
    def _render_energy_savings_analysis(self):
    def _render_vfd_diagnostics(self):
    def _render_sensor_equipment_status(self):
    def _render_settings(self):
    def _render_alarm_event_log(self):

    # 개발용 탭 (7-9) - 독립적
    def _render_learning_progress(self):
    def _render_scenario_testing(self):
    def _render_developer_tools(self):

    # 헬퍼 함수
    def _get_plc_data(self):
    def _calculate_realtime_savings(self):
    def _get_vfd_diagnostics_data(self):
    # ...
```

## 개발 노트

### 개발용 탭 제거 방법
운영 환경에서는 개발용 탭(7-9)을 쉽게 제거할 수 있습니다:

```python
# run() 메서드에서 탭 리스트 수정
tabs = st.tabs([
    "📊 실시간 모니터링",
    "💰 에너지 절감 분석",
    "🔧 VFD 예방진단",
    "📈 센서 & 장비 상태",
    "⚙️ 설정",
    "📝 알람/이벤트 로그"
    # 개발용 탭 주석 처리
    # "📚 학습 진행 (개발)",
    # "🧪 시나리오 테스트 (개발)",
    # "🛠️ 개발자 도구 (개발)"
])

# with tabs[6], tabs[7], tabs[8] 블록 주석 처리
```

### VFD 진단 데이터 구현
현재는 임시 데이터를 사용하지만, 향후 PLC 레지스터 6000-6099에서 실제 데이터를 읽도록 구현:

```python
# _get_vfd_diagnostics_data() 메서드 수정
vfd_diag_raw = client.read_holding_registers(6000, 100)
# 레지스터 구조에 맞춰 파싱
```

## 참조 파일
- **스타일 참조**: `C:\Users\my\Desktop\HMI_V1\frontend\src\App.css`
- **학습/시나리오 참조**: `C:\Users\my\Desktop\프로그램 폴더\EDGE_AI_REAL\src\hmi\dashboard.py`
- **Modbus 클라이언트**: `C:\Users\my\Desktop\Edge_Computer_V1\modbus_client.py`
- **설정**: `C:\Users\my\Desktop\Edge_Computer_V1\config.py`

## 버전 정보
- **버전**: V2.0
- **빌드 날짜**: 2025-11-25
- **작성자**: Claude Code
- **라이선스**: MIT

## 문의
문제가 발생하면 다음을 확인하세요:
1. PLC Simulator가 실행 중인지 확인
2. PLC 주소 및 포트가 올바른지 확인
3. 필요한 Python 패키지가 모두 설치되었는지 확인
4. 방화벽에서 Modbus TCP 포트(502)가 열려있는지 확인
