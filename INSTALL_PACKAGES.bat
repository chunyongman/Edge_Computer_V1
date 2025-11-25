@echo off
chcp 65001 > nul
echo ========================================
echo   Edge AI Computer - 패키지 설치
echo ========================================
cd /d "%~dp0"

echo.
echo [단계 1/2] 가상환경 확인...
if not exist venv (
    echo [생성] Python 가상환경 생성 중...
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] 가상환경 생성 실패!
        pause
        exit /b 1
    )
)

echo.
echo [단계 2/2] 의존성 패키지 설치 중... (약 1-2분 소요)
echo.
venv\Scripts\python.exe -m pip install --upgrade pip
venv\Scripts\pip install -r requirements.txt

if errorlevel 1 (
    echo.
    echo [ERROR] 패키지 설치 실패!
    echo.
    echo 다음을 확인하세요:
    echo 1. 인터넷 연결
    echo 2. Python 3.8 이상 설치
    echo 3. pip 업그레이드: python -m pip install --upgrade pip
    pause
    exit /b 1
)

echo.
echo ========================================
echo   설치 완료!
echo ========================================
echo.
echo 이제 START.bat를 실행하세요.
echo.
pause
