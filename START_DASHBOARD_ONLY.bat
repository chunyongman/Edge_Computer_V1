@echo off
chcp 65001 > nul
title Dashboard V2.0 Only

echo ======================================================================
echo   Dashboard V2.0 Only (Edge AI 없이 대시보드만 실행)
echo ======================================================================
echo.
echo [주의] 이 모드는 대시보드만 실행합니다.
echo        Edge AI Backend는 별도로 실행해야 합니다.
echo.

REM 가상 환경 확인
if not exist "venv\" (
    echo [오류] 가상 환경이 없습니다!
    echo [해결] python -m venv venv 실행
    pause
    exit /b 1
)

echo [실행] Dashboard V2.0 시작...
echo.

venv\Scripts\streamlit run src/hmi/dashboard.py

pause
