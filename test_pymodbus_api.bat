@echo off
chcp 65001 > nul
echo ========================================
echo   pymodbus API 분석
echo ========================================
cd /d "%~dp0"

venv\Scripts\python.exe test_pymodbus_api.py

echo.
pause
