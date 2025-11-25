@echo off
chcp 65001 > nul
title Edge Computer Dashboard V2.0

echo ======================================================================
echo   Edge Computer Dashboard V2.0
echo   HMI_V1 스타일 적용 + 9개 탭 구성
echo ======================================================================
echo.

REM 환경 변수 설정
if not defined PLC_HOST set PLC_HOST=localhost
if not defined PLC_PORT set PLC_PORT=502

echo [설정] PLC 주소: %PLC_HOST%:%PLC_PORT%
echo.

REM 가상 환경 확인
if not exist "venv\" (
    echo [오류] 가상 환경이 없습니다!
    echo [해결] 먼저 INSTALL_PACKAGES.bat를 실행하세요.
    pause
    exit /b 1
)

REM 필요한 패키지 확인 및 설치
echo [단계 1/2] 필요한 패키지 확인 중...
venv\Scripts\pip install -q streamlit streamlit-autorefresh pandas plotly 2>nul
if errorlevel 1 (
    echo [경고] 패키지 설치 중 문제 발생 (무시하고 계속)
)
echo [완료] 패키지 확인 완료
echo.

REM Streamlit Dashboard 시작
echo [단계 2/2] Dashboard V2.0 시작 중...
echo.
echo ======================================================================
echo   시작 완료!
echo ======================================================================
echo   Dashboard URL:   http://localhost:8501
echo   자동 새로고침:   3초마다
echo ======================================================================
echo   주요 기능:
echo   [운영용 탭 - 6개]
echo   1. 📊 실시간 모니터링 (주파수 비교 테이블)
echo   2. 💰 에너지 절감 분석
echo   3. 🔧 VFD 예방진단 (핵심!)
echo   4. 📈 센서 ^& 장비 상태
echo   5. ⚙️ 설정
echo   6. 📝 알람/이벤트 로그
echo.
echo   [개발용 탭 - 3개]
echo   7. 📚 학습 진행
echo   8. 🧪 시나리오 테스트
echo   9. 🛠️ 개발자 도구
echo ======================================================================
echo   종료: Ctrl+C 또는 이 창 닫기
echo ======================================================================
echo.

REM Streamlit 실행
venv\Scripts\streamlit run src/hmi/dashboard.py

echo.
echo Dashboard가 종료되었습니다.
pause
