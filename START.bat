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

    echo [설치] 의존성 패키지 설치 중...
    venv\Scripts\pip install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] 패키지 설치 실패
        pause
        exit /b 1
    )
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
