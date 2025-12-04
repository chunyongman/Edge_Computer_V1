@echo off
chcp 65001 > nul
title Edge AI Backend

echo ======================================================================
echo   Edge AI Backend
echo   AI 제어 시스템 (대시보드 없이 실행)
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

REM Edge AI Backend 시작
echo [단계 3/3] Edge AI Backend 시작 중...
echo.

echo ======================================================================
echo   Edge AI Backend 실행 중
echo ======================================================================
echo   기능:
echo   - AI 주파수 계산 (SWP/FWP/FAN)
echo   - PLC 레지스터 5000-5009 쓰기
echo   - VFD 예방진단 데이터 생성
echo   - 실시간 센서 모니터링
echo ======================================================================
echo   종료: Ctrl+C 또는 창 닫기
echo ======================================================================
echo.

venv\Scripts\python.exe -u main.py

pause
