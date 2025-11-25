@echo off
chcp 65001 > nul
title Edge AI Computer - Dashboard Mode

echo ======================================================================
echo   Edge AI Computer + Web Dashboard (Streamlit)
echo   EDGE_AI_REAL 전체 AI 기능 포함
echo ======================================================================
echo.

REM 환경 변수 설정 (선택사항)
if not defined PLC_HOST set PLC_HOST=localhost
if not defined PLC_PORT set PLC_PORT=502
if not defined PLC_SLAVE_ID set PLC_SLAVE_ID=3

echo [설정] PLC 주소: %PLC_HOST%:%PLC_PORT%
echo [설정] Slave ID: %PLC_SLAVE_ID%
echo.

REM 가상 환경 확인 및 생성
if not exist "venv\" (
    echo [단계 1/3] Python 가상 환경 생성 중...
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
echo [단계 2/3] Python 의존성 설치 중...
venv\Scripts\pip install -q -r requirements.txt
if errorlevel 1 (
    echo [오류] 의존성 설치 실패!
    pause
    exit /b 1
)
echo [완료] Python 패키지 설치 완료
echo.

REM Backend + Dashboard 동시 시작
echo [단계 3/3] Edge AI + Dashboard 시작 중...
echo.
echo ======================================================================
echo   시작 완료!
echo ======================================================================
echo   AI Backend:      실행 중 (콘솔창)
echo   Dashboard:       http://localhost:8501 (자동 열림)
echo ======================================================================
echo   AI 기능:
echo   - Random Forest 최적화
echo   - 온도 예측 (5/10/15분)
echo   - 패턴 인식 (4가지 패턴)
echo   - 배치 학습 (주 2회 자동)
echo ======================================================================
echo   종료: Ctrl+C (두 창 모두)
echo ======================================================================
echo.

REM Backend 시작 (Python) - 백그라운드
start "Edge AI Backend" venv\Scripts\python.exe -u main.py

REM Dashboard 시작 대기 (Backend API가 준비될 때까지)
timeout /t 3 /nobreak > nul

REM Streamlit Dashboard 시작 (EDGE_AI_REAL 대시보드)
start "Edge AI Dashboard" venv\Scripts\streamlit run src/hmi/dashboard.py

echo [완료] Edge AI + Dashboard가 시작되었습니다.
echo.
echo 백그라운드에서 두 창이 실행 중입니다:
echo   1. Edge AI Backend (콘솔)
echo   2. Edge AI Dashboard (브라우저)
echo.
echo 종료하려면 각 창에서 Ctrl+C 또는 창 닫기
echo.
pause
