@echo off
chcp 65001 > nul
echo ========================================
echo   PLC 연결 테스트
echo ========================================
cd /d "%~dp0"

echo.
echo [테스트 1] 포트 502 확인...
netstat -ano | findstr :502

echo.
echo [테스트 2] Python으로 직접 연결 시도...
venv\Scripts\python.exe test_connection.py

echo.
pause
