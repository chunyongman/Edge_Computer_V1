@echo off
chcp 65001 > nul
echo ========================================
echo   설치 상태 확인
echo ========================================
cd /d "%~dp0"

echo.
echo [확인] 현재 설치된 패키지:
echo.
venv\Scripts\pip list | findstr /I "numpy pymodbus scipy scikit pandas"

echo.
echo.
echo [확인] Python 버전:
venv\Scripts\python.exe --version

echo.
echo [확인] pip 버전:
venv\Scripts\pip --version

echo.
pause
