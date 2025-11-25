@echo off
chcp 65001 > nul
title Edge AI Computer - Dashboard Mode

echo ======================================================================
echo   Edge AI Computer + Web Dashboard
echo   AI 계산 + 실시간 모니터링 대시보드
echo ======================================================================
echo.

REM 환경 변수 설정 (선택사항)
if not defined PLC_HOST set PLC_HOST=localhost
if not defined PLC_PORT set PLC_PORT=502
if not defined PLC_SLAVE_ID set PLC_SLAVE_ID=3

echo [설정] PLC 주소: %PLC_HOST%:%PLC_PORT%
echo [설정] Slave ID: %PLC_SLAVE_ID%
echo.

REM 가상 환경 확인 및 생성
if not exist "venv\" (
    echo [단계 1/5] Python 가상 환경 생성 중...
    python -m venv venv
    if errorlevel 1 (
        echo [오류] 가상 환경 생성 실패!
        pause
        exit /b 1
    )
    echo [완료] 가상 환경 생성 완료
    echo.
)

REM 가상 환경 활성화
echo [단계 2/5] 가상 환경 활성화 중...
call venv\Scripts\activate
if errorlevel 1 (
    echo [오류] 가상 환경 활성화 실패!
    pause
    exit /b 1
)
echo [완료] 가상 환경 활성화 완료
echo.

REM Python 의존성 설치
echo [단계 3/5] Python 의존성 설치 중...
pip install -q -r requirements.txt
if errorlevel 1 (
    echo [오류] 의존성 설치 실패!
    pause
    exit /b 1
)
echo [완료] Python 패키지 설치 완료
echo.

REM Frontend 의존성 설치
echo [단계 4/5] Frontend 의존성 확인 중...
cd dashboard\frontend
if not exist "node_modules\" (
    echo [설치] Node.js 패키지 설치 중... (최초 1회, 약 1-2분 소요)
    call npm install
    if errorlevel 1 (
        echo [오류] npm install 실패!
        cd ..\..
        pause
        exit /b 1
    )
    echo [완료] Frontend 패키지 설치 완료
) else (
    echo [확인] Frontend 패키지가 이미 설치되어 있습니다.
)
cd ..\..
echo.

REM Backend + Frontend 동시 시작
echo [단계 5/5] Edge AI + Dashboard 시작 중...
echo.
echo ======================================================================
echo   시작 완료!
echo ======================================================================
echo   Backend API:     http://localhost:8080
echo   API 문서:        http://localhost:8080/docs
echo   Frontend:        http://localhost:5174 (자동 열림)
echo   WebSocket:       ws://localhost:8080/ws
echo ======================================================================
echo   종료: 이 창에서 Ctrl+C 또는 창 닫기
echo ======================================================================
echo.

REM Backend 시작 (Python)
start "Edge AI Backend" cmd /c "cd /d "%~dp0" && venv\Scripts\python main_with_dashboard.py"

REM Frontend 시작 대기 (Backend API가 준비될 때까지)
timeout /t 5 /nobreak > nul

REM Frontend 개발 서버 시작 (Node.js)
start "Edge AI Frontend" cmd /c "cd /d "%~dp0dashboard\frontend" && npm run dev"

REM 브라우저 자동 열기 (5초 후)
timeout /t 5 /nobreak > nul
start http://localhost:5174

echo [완료] Edge AI + Dashboard가 시작되었습니다.
echo.
echo 백그라운드에서 실행 중입니다.
echo 종료하려면 "Edge AI Backend" 및 "Edge AI Frontend" 창을 닫으세요.
echo.
pause
