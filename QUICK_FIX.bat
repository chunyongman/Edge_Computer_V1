@echo off
chcp 65001 > nul
echo ========================================
echo   긴급 수정: 패키지 강제 설치
echo ========================================
cd /d "%~dp0"

echo.
echo [실행] pip 업그레이드...
venv\Scripts\python.exe -m pip install --upgrade pip

echo.
echo [실행] 필수 패키지 설치...
echo.
venv\Scripts\pip install numpy>=1.21.0
venv\Scripts\pip install scipy>=1.7.0
venv\Scripts\pip install scikit-learn>=1.0.0
venv\Scripts\pip install pandas>=1.3.0
venv\Scripts\pip install pymodbus>=3.0.0
venv\Scripts\pip install pyyaml>=6.0
venv\Scripts\pip install psutil>=5.9.0

echo.
echo ========================================
echo   설치 완료!
echo ========================================
echo.
echo 이제 START.bat를 다시 실행하세요.
pause
