@echo off
chcp 65001 > nul
title Edge Computer Only

echo ======================================================================
echo   Edge Computer (AI Backend) 단독 실행
echo ======================================================================
echo.

cd /d "%~dp0"

if not exist "venv\" (
    echo [오류] 가상 환경이 없습니다!
    pause
    exit /b 1
)

echo [실행] Edge Computer 시작 중...
echo.
echo ======================================================================
echo   Edge Computer가 실행됩니다.
echo   - AI 주파수 계산
echo   - PLC 레지스터 5000-5009에 쓰기
echo   - 실시간 센서 모니터링
echo ======================================================================
echo.

venv\Scripts\python.exe -u main.py

pause
