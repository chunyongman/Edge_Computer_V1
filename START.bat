@echo off
chcp 65001 > nul
echo ========================================
echo   Edge AI Computer 시작
echo   PLC Connection: %PLC_HOST%:502
echo ========================================
cd /d "%~dp0"

REM Python 가상환경 확인 및 생성
if not exist venv (
    echo [설치] Python 가상환경 생성 중...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Python 가상환경 생성 실패
        echo [INFO] Python 3.8 이상이 설치되어 있는지 확인하세요
        pause
        exit /b 1
    )
)

REM 의존성 패키지 설치 (항상 확인)
echo [확인] 의존성 패키지 확인 중...
venv\Scripts\pip install -q -r requirements.txt
if errorlevel 1 (
    echo [WARNING] 일부 패키지 설치 실패 (계속 진행)
)

echo.
echo [실행] Edge AI 프로그램 시작...
echo [INFO] 종료: Ctrl+C
echo.

venv\Scripts\python.exe -u main.py

echo.
echo ========================================
echo   Edge AI Computer 종료
echo ========================================
pause
