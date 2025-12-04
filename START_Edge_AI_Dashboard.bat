@echo off
chcp 65001 > nul
title Edge Computer Full System V2.0

echo ======================================================================
echo   Edge Computer Full System V2.0
echo   Edge AI + Dashboard V2.0 동시 실행
echo ======================================================================
echo.

REM 환경 변수 설정
if not defined PLC_HOST set PLC_HOST=localhost
if not defined PLC_PORT set PLC_PORT=502
if not defined PLC_SLAVE_ID set PLC_SLAVE_ID=3

echo [설정] PLC 주소: %PLC_HOST%:%PLC_PORT%
echo [설정] Slave ID: %PLC_SLAVE_ID%
echo.

REM 가상 환경 확인 및 생성
if not exist "venv\" (
    echo [단계 1/4] Python 가상 환경 생성 중...
    python -m venv venv
    if errorlevel 1 (
        echo [오류] 가상 환경 생성 실패!
        pause
        exit /b 1
    )
    echo [완료] 가상 환경 생성 완료
    echo.
)

REM Python 의존성 설치
echo [단계 2/4] Python 의존성 설치 중...
venv\Scripts\pip install -q -r requirements.txt
if errorlevel 1 (
    echo [오류] 의존성 설치 실패!
    pause
    exit /b 1
)
echo [완료] Python 패키지 설치 완료
echo.

REM Edge AI Backend 시작
echo [단계 3/4] Edge AI Backend 시작 중...
start "Edge AI Backend" venv\Scripts\python.exe -u main.py
echo [완료] Backend 시작됨
echo.

REM Backend 준비 대기
echo [대기] Backend API 준비 중... (3초)
timeout /t 3 /nobreak > nul
echo.

REM Dashboard V2.0 시작
echo [단계 4/4] Dashboard V2.0 시작 중...
start "Edge Computer Dashboard V2.0" venv\Scripts\streamlit run src/hmi/dashboard.py
echo [완료] Dashboard 시작됨
echo.

echo ======================================================================
echo   시작 완료!
echo ======================================================================
echo   Edge AI Backend:     실행 중 (백그라운드)
echo   Dashboard V2.0:      http://localhost:8501 (자동 열림)
echo ======================================================================
echo   Edge AI 기능:
echo   - AI 주파수 계산 (SWP/FWP/FAN)
echo   - PLC 레지스터 5000-5009 쓰기
echo   - VFD 예방진단 데이터 생성
echo   - 실시간 센서 모니터링
echo ======================================================================
echo   Dashboard V2.0 기능:
echo   [운영용 - 6개 탭]
echo   1. 실시간 모니터링 (주파수 비교)
echo   2. 에너지 절감 분석
echo   3. VFD 예방진단
echo   4. 센서 ^& 장비 상태
echo   5. 설정
echo   6. 알람/이벤트 로그
echo.
echo   [개발용 - 3개 탭]
echo   7. 학습 진행
echo   8. 시나리오 테스트
echo   9. 개발자 도구
echo ======================================================================
echo   종료 방법:
echo   - Backend: "Edge AI Backend" 창에서 Ctrl+C
echo   - Dashboard: "Dashboard V2.0" 창에서 Ctrl+C
echo   - 또는 각 창 닫기
echo ======================================================================
echo.
echo 백그라운드에서 두 프로그램이 실행 중입니다.
echo 브라우저에서 http://localhost:8501 을 확인하세요.
echo.
pause
