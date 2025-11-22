#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge AI Computer - 대시보드 포함 버전
PLC에서 센서 데이터 읽기 → AI 계산 → PLC로 결과 쓰기 + 웹 대시보드 제공

실행 방법:
    python main_with_dashboard.py
    또는
    START_WITH_DASHBOARD.bat
"""

import sys
import io
import time
import asyncio
import signal
import threading
from datetime import datetime
from typing import Dict, Any, List
from pathlib import Path

# Windows 콘솔 인코딩 문제 해결
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn

from modbus_client import EdgeModbusClient
from ai_calculator import EdgeAICalculator
import config


# ============================================================================
# FastAPI 앱 설정
# ============================================================================

app = FastAPI(title="Edge AI Dashboard", version="1.0.0")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket 연결 관리
active_connections: List[WebSocket] = []

# 글로벌 이벤트 루프 (Edge AI 스레드에서 사용)
global_event_loop = None

# 전역 데이터 저장소 (AI 계산 결과)
dashboard_data = {
    "sensors": {},
    "equipment": [],
    "energy_savings": {},
    "ai_frequency_control": [],
    "energy_savings_summary": [],
    "vfd_diagnostics": [],
    "system_status": {
        "running": False,
        "cycle_count": 0,
        "last_update": None,
        "plc_connected": False,
    }
}


# ============================================================================
# 앱 시작/종료 이벤트
# ============================================================================

@app.on_event("startup")
async def startup_event():
    """FastAPI 시작 시 이벤트 루프 저장"""
    global global_event_loop
    global_event_loop = asyncio.get_event_loop()
    print("[시작] 이벤트 루프 초기화 완료")


# ============================================================================
# REST API 엔드포인트
# ============================================================================

@app.get("/api/sensors")
async def get_sensors():
    """센서 데이터 조회"""
    return dashboard_data["sensors"]


@app.get("/api/equipment")
async def get_equipment():
    """전체 장비 상태 조회"""
    return dashboard_data["equipment"]


@app.get("/api/energy-savings")
async def get_energy_savings():
    """에너지 절감 데이터 조회"""
    return dashboard_data["energy_savings"]


@app.get("/api/ai-frequency-control")
async def get_ai_frequency_control():
    """AI 목표 주파수 제어 데이터 조회"""
    return dashboard_data["ai_frequency_control"]


@app.get("/api/energy-savings-summary")
async def get_energy_savings_summary():
    """장비별 에너지 절감 상세 데이터 조회"""
    return dashboard_data["energy_savings_summary"]


@app.get("/api/vfd/diagnostics")
async def get_vfd_diagnostics():
    """VFD 진단 데이터 조회"""
    # 배열 형식 [100, 100, ...] → HMI 형식으로 변환
    vfd_scores = dashboard_data["vfd_diagnostics"]
    vfd_names = ['SW_PUMP_1', 'SW_PUMP_2', 'SW_PUMP_3',
                 'FW_PUMP_1', 'FW_PUMP_2', 'FW_PUMP_3',
                 'ER_FAN_1', 'ER_FAN_2', 'ER_FAN_3', 'ER_FAN_4']

    vfd_diagnostics = {}
    equipment = dashboard_data.get("equipment", [])

    for i, score in enumerate(vfd_scores):
        if i < len(vfd_names):
            vfd_id = vfd_names[i]
            # 장비 데이터에서 해당 VFD 정보 가져오기
            eq_data = equipment[i] if i < len(equipment) else {}

            vfd_diagnostics[vfd_id] = {
                "score": score,
                "status_grade": "normal" if score >= 90 else "caution" if score >= 70 else "warning" if score >= 50 else "critical",
                "current_frequency_hz": eq_data.get("frequency", 0.0),
                "output_current_a": eq_data.get("power_kw", 0.0) * 2,  # 간단한 추정
                "motor_temperature_c": 50.0,  # 기본값
                "maintenance_priority": 0 if score >= 90 else 1 if score >= 70 else 3 if score >= 50 else 5,
                "anomaly_patterns": [],
                "predicted_mtbf_days": 365 if score >= 90 else 180 if score >= 70 else 90 if score >= 50 else 30,
                "trend": "stable"
            }

    return {
        "success": True,
        "data": {
            "vfd_diagnostics": vfd_diagnostics,
            "timestamp": datetime.now().isoformat()
        }
    }


@app.get("/api/system-status")
async def get_system_status():
    """시스템 상태 조회"""
    return dashboard_data["system_status"]


# ============================================================================
# WebSocket 엔드포인트 (실시간 데이터 브로드캐스트)
# ============================================================================

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket 연결 - 실시간 데이터 전송"""
    await websocket.accept()
    active_connections.append(websocket)
    print(f"[WebSocket] 클라이언트 연결됨 (총 {len(active_connections)}개)")

    try:
        while True:
            # 클라이언트로부터 메시지 수신 대기 (ping-pong)
            await websocket.receive_text()
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        print(f"[WebSocket] 클라이언트 연결 해제됨 (총 {len(active_connections)}개)")
    except Exception as e:
        print(f"[WebSocket] 오류: {e}")
        if websocket in active_connections:
            active_connections.remove(websocket)


async def broadcast_data():
    """모든 WebSocket 연결에 데이터 브로드캐스트"""
    print(f"[DEBUG] broadcast_data() 호출됨! active_connections 수: {len(active_connections)}")
    if not active_connections:
        return

    message = {
        "type": "realtime_update",
        "sensors": dashboard_data["sensors"],
        "equipment": dashboard_data["equipment"],
        "energy_savings": dashboard_data["energy_savings"],
        "ai_frequency_control": dashboard_data["ai_frequency_control"],
        "system_status": dashboard_data["system_status"],
        "timestamp": datetime.now().isoformat()
    }

    disconnected = []
    for connection in active_connections:
        try:
            await connection.send_json(message)
        except Exception as e:
            print(f"[WebSocket] 전송 실패: {e}")
            disconnected.append(connection)

    # 연결 끊긴 클라이언트 제거
    for conn in disconnected:
        if conn in active_connections:
            active_connections.remove(conn)


# ============================================================================
# Edge AI 시스템 (백그라운드 스레드)
# ============================================================================

class EdgeAISystem:
    """Edge AI 시스템 메인 클래스"""

    def __init__(self):
        self.running = True
        self.plc = EdgeModbusClient(config.PLC_HOST, config.PLC_PORT, config.PLC_SLAVE_ID)
        self.ai = EdgeAICalculator()
        self.cycle_count = 0

        print("=" * 70)
        print("  Edge AI Computer + Dashboard")
        print("  AI 계산 및 웹 대시보드 시스템")
        print("=" * 70)
        print(f"  PLC 주소: {config.PLC_HOST}:{config.PLC_PORT}")
        print(f"  업데이트 주기: {config.UPDATE_INTERVAL}초")
        print(f"  대시보드: http://localhost:8080")
        print("=" * 70)

    def run(self):
        """메인 실행 루프"""

        # PLC 연결
        if not self.plc.connect():
            print("[ERROR] PLC 연결 실패.")
            dashboard_data["system_status"]["plc_connected"] = False
            return

        dashboard_data["system_status"]["plc_connected"] = True
        dashboard_data["system_status"]["running"] = True

        print(f"\n[시작] AI 계산 루프 시작 ({config.UPDATE_INTERVAL}초 주기)")
        print("[INFO] 종료: Ctrl+C\n")

        last_status_time = time.time()

        while self.running:
            try:
                cycle_start = time.time()
                self.cycle_count += 1
                dashboard_data["system_status"]["cycle_count"] = self.cycle_count

                # ===== Step 1: PLC에서 센서 데이터 읽기 =====
                sensors = self.plc.read_sensors()
                if sensors is None:
                    print("[WARNING] 센서 데이터 읽기 실패. 재시도...")
                    time.sleep(config.UPDATE_INTERVAL)
                    continue

                dashboard_data["sensors"] = sensors

                # ===== Step 2: PLC에서 장비 상태 읽기 =====
                equipment = self.plc.read_equipment_status()
                if equipment is None:
                    print("[WARNING] 장비 데이터 읽기 실패. 재시도...")
                    time.sleep(config.UPDATE_INTERVAL)
                    continue

                dashboard_data["equipment"] = equipment

                # ===== Step 3: AI 계산 수행 =====

                # 3-1. 에너지 절감 계산
                energy_savings = self.ai.calculate_energy_savings(equipment)
                dashboard_data["energy_savings"] = energy_savings

                # 3-2. AI 목표 주파수 계산
                ai_target_freq = self.ai.calculate_ai_target_frequency(equipment, sensors)
                dashboard_data["ai_frequency_control"] = ai_target_freq

                # 3-3. 장비별 에너지 절감 상세
                energy_summary = self.ai.calculate_energy_savings_summary(equipment)
                dashboard_data["energy_savings_summary"] = energy_summary

                # 3-4. VFD 진단
                vfd_diagnosis = self.ai.calculate_vfd_diagnosis(equipment, sensors)
                dashboard_data["vfd_diagnostics"] = vfd_diagnosis

                # ===== Step 4: PLC로 AI 계산 결과 전송 =====

                # 4-1. 목표 주파수 쓰기 (레지스터 5000-5009)
                target_frequencies = [item["target_frequency"] for item in ai_target_freq]
                self.plc.write_ai_target_frequency(target_frequencies)

                # 4-2. 에너지 절감 데이터 쓰기 (레지스터 5100-5109, 5300-5303)
                savings_data = {
                    "total_ratio": energy_savings["realtime"]["total"]["savings_rate"],
                    "swp_ratio": energy_savings["realtime"]["swp"]["savings_rate"],
                    "fwp_ratio": energy_savings["realtime"]["fwp"]["savings_rate"],
                    "fan_ratio": energy_savings["realtime"]["fan"]["savings_rate"],
                }
                # 각 장비별 절감 전력
                for i, summary in enumerate(energy_summary):
                    savings_data[f"equipment_{i}"] = summary["actual_power"]

                self.plc.write_energy_savings(savings_data)

                # 4-3. VFD 진단 점수 쓰기 (레지스터 5200-5209)
                self.plc.write_vfd_diagnosis(vfd_diagnosis)

                # ===== Step 5: 업데이트 시간 기록 =====
                dashboard_data["system_status"]["last_update"] = datetime.now().isoformat()

                # ===== Step 6: WebSocket 브로드캐스트 (비동기) =====
                # 글로벌 이벤트 루프를 사용하여 broadcast 작업 추가
                if global_event_loop:
                    try:
                        asyncio.run_coroutine_threadsafe(broadcast_data(), global_event_loop)
                    except Exception as e:
                        print(f"[WebSocket] 브로드캐스트 실패: {e}")
                else:
                    print("[DEBUG] global_event_loop가 None입니다!")

                # ===== Step 7: 주기적 상태 출력 (10초마다) =====
                if time.time() - last_status_time >= 10:
                    self.print_status(energy_savings, ai_target_freq)
                    last_status_time = time.time()

                # ===== 주기 대기 =====
                cycle_elapsed = time.time() - cycle_start
                sleep_time = max(0, config.UPDATE_INTERVAL - cycle_elapsed)
                if sleep_time > 0:
                    time.sleep(sleep_time)

            except KeyboardInterrupt:
                print("\n[종료] Ctrl+C 감지")
                break

            except Exception as e:
                print(f"[ERROR] 예외 발생: {e}")
                import traceback
                traceback.print_exc()
                time.sleep(config.UPDATE_INTERVAL)

        # 종료 처리
        self.plc.disconnect()
        dashboard_data["system_status"]["running"] = False
        dashboard_data["system_status"]["plc_connected"] = False
        print("\n[완료] Edge AI 시스템 종료")

    def print_status(self, energy_savings, ai_target_freq):
        """주기적 상태 출력"""
        print("\n" + "=" * 70)
        print(f"[상태] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Cycle #{self.cycle_count}")
        print("-" * 70)

        # 에너지 절감 현황
        total = energy_savings["realtime"]["total"]
        print(f"💡 에너지 절감:")
        print(f"   실시간: {total['savings_kw']} kW ({total['savings_rate']}%)")
        print(f"   오늘 누적: {energy_savings['today']['total_kwh_saved']} kWh")
        print(f"   이번 달 누적: {energy_savings['month']['total_kwh_saved']} kWh")

        # AI 목표 주파수 (운전 중인 장비만)
        running_equipment = [eq for eq in ai_target_freq if eq["target_frequency"] > 0]
        if running_equipment:
            print(f"\n🎯 AI 목표 주파수 (운전 중: {len(running_equipment)}대):")
            for eq in running_equipment[:5]:  # 최대 5개만 출력
                print(f"   {eq['name']}: 목표={eq['target_frequency']}Hz, "
                      f"실제={eq['actual_frequency']}Hz, "
                      f"편차={eq['deviation']:+.2f}Hz ({eq['status']})")

        print(f"\n🌐 대시보드: {len(active_connections)}개 클라이언트 연결됨")
        print("=" * 70)


# ============================================================================
# 메인 실행
# ============================================================================

def run_edge_ai_in_thread():
    """Edge AI 시스템을 별도 스레드에서 실행"""
    system = EdgeAISystem()
    system.run()


def main():
    """메인 함수 - FastAPI 서버 + Edge AI 시스템"""

    # Edge AI 시스템을 백그라운드 스레드로 시작
    ai_thread = threading.Thread(target=run_edge_ai_in_thread, daemon=True)
    ai_thread.start()

    print("\n[시작] FastAPI 웹서버 시작 중...")
    print("       대시보드: http://localhost:8080")
    print("       API 문서: http://localhost:8080/docs")

    # FastAPI 서버 시작 (메인 스레드)
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8080,
        log_level="info"
    )


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n[종료] 프로그램 종료")
        sys.exit(0)
    except Exception as e:
        print(f"\n[FATAL ERROR] 시스템 오류: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
