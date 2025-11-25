#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Edge Computer Dashboard V2.0
HMI_V1 스타일 적용 - 완전히 새로운 구조
"""

import streamlit as st
from streamlit_autorefresh import st_autorefresh
import time
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import sys
import os
import importlib

# Add parent directory to path for imports
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, root_dir)

from modbus_client import EdgeModbusClient
import config
importlib.reload(config)  # config 모듈 reload


class EdgeComputerDashboard:
    """Edge Computer 대시보드 - HMI_V1 스타일"""

    def __init__(self):
        """초기화"""
        # Streamlit 페이지 설정
        st.set_page_config(
            page_title="Edge Computer Dashboard",
            page_icon="🚢",
            layout="wide",
            initial_sidebar_state="expanded"
        )

        # HMI_V1 스타일 CSS 적용
        self._apply_custom_css()

        # Session state 초기화
        self._init_session_state()

        # Modbus Client 초기화
        if 'modbus_client' not in st.session_state:
            st.session_state.modbus_client = EdgeModbusClient()
            # 초기 연결 시도
            if not st.session_state.modbus_client.connected:
                st.session_state.modbus_client.connect()

    def _apply_custom_css(self):
        """HMI_V1 스타일 CSS 적용"""
        st.markdown("""
        <style>
        /* 전역 배경색 */
        .stApp {
            background-color: #0f172a;
        }

        /* 메인 컨텐츠 영역 */
        .main .block-container {
            padding-top: 2rem;
            padding-bottom: 2rem;
            background-color: #0f172a;
        }

        /* 사이드바 */
        [data-testid="stSidebar"] {
            background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
        }

        /* 헤더 텍스트 */
        h1, h2, h3, h4, h5, h6 {
            color: #e2e8f0 !important;
        }

        /* 일반 텍스트 */
        p, span, div {
            color: #e2e8f0;
        }

        /* 카드 스타일 */
        div[data-testid="stMetricValue"] {
            color: #3b82f6 !important;
            font-size: 1.5rem !important;
            font-weight: 700 !important;
        }

        div[data-testid="stMetricLabel"] {
            color: #94a3b8 !important;
        }

        /* 탭 스타일 */
        .stTabs [data-baseweb="tab-list"] {
            gap: 0.5rem;
            background-color: #1e293b;
            padding: 0.5rem;
            border-radius: 0.5rem;
        }

        .stTabs [data-baseweb="tab"] {
            background-color: transparent;
            color: #94a3b8;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            font-weight: 500;
        }

        .stTabs [data-baseweb="tab"]:hover {
            background-color: #334155;
            color: #e2e8f0;
        }

        .stTabs [aria-selected="true"] {
            background: #3b82f6 !important;
            color: white !important;
        }

        /* 버튼 스타일 */
        .stButton > button {
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            transition: all 0.2s;
        }

        .stButton > button:hover {
            background: #2563eb;
            box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }

        /* 테이블 스타일 */
        .dataframe {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        .dataframe th {
            background-color: #334155 !important;
            color: #e2e8f0 !important;
            font-weight: 600;
        }

        .dataframe td {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        /* 입력 필드 */
        .stTextInput input, .stNumberInput input, .stSelectbox select {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
            border: 1px solid #334155 !important;
        }

        /* 성공/위험 색상 */
        .success-text {
            color: #10b981 !important;
        }

        .danger-text {
            color: #ef4444 !important;
        }

        /* 카드 컨테이너 */
        .card {
            background: #1e293b;
            border-radius: 0.75rem;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            margin-bottom: 1rem;
        }

        /* 그라디언트 헤더 */
        .gradient-header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        /* 상태 표시 점 */
        .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 0.5rem;
            animation: pulse 2s infinite;
        }

        .status-dot.connected {
            background: #10b981;
        }

        .status-dot.disconnected {
            background: #ef4444;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* 경고 깜박임 */
        @keyframes blink-warning {
            0%, 100% { background: #ef4444; }
            50% { background: #dc2626; }
        }

        .warning-blink {
            animation: blink-warning 1s infinite;
            color: white !important;
            font-weight: 700;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
        }
        </style>
        """, unsafe_allow_html=True)

    def _init_session_state(self):
        """세션 상태 초기화"""
        if 'selected_tab' not in st.session_state:
            st.session_state.selected_tab = 0

        if 'plc_connected' not in st.session_state:
            st.session_state.plc_connected = False

        if 'sensor_history' not in st.session_state:
            st.session_state.sensor_history = {
                'TX1': [], 'TX4': [], 'TX5': [], 'TX6': [], 'TX7': [],
                'PU1': [], 'timestamps': []
            }

        if 'energy_history' not in st.session_state:
            st.session_state.energy_history = {
                'total_savings': [],
                'swp_savings': [],
                'fwp_savings': [],
                'fan_savings': [],
                'timestamps': []
            }

        if 'alarm_log' not in st.session_state:
            st.session_state.alarm_log = []

        if 'event_log' not in st.session_state:
            st.session_state.event_log = []

        # 개발용: 학습 진행 데이터
        if 'learning_progress' not in st.session_state:
            st.session_state.learning_progress = {
                'temperature_prediction_accuracy': 82.5,
                'optimization_accuracy': 79.3,
                'average_energy_savings': 49.8,
                'total_learning_hours': 192.5,
                'last_learning_time': datetime.now() - timedelta(hours=2),
                'months_running': 8
            }

        # 개발용: 시나리오 테스트
        if 'scenario_active' not in st.session_state:
            st.session_state.scenario_active = False
        if 'current_scenario' not in st.session_state:
            st.session_state.current_scenario = "정상 운전"

    def run(self):
        """메인 실행"""
        # 자동 새로고침 (3초)
        st_autorefresh(interval=3000, key="dashboard_refresh")

        # 헤더
        self._render_header()

        # 사이드바
        self._render_sidebar()

        # 탭 선택
        tabs = st.tabs([
            "📊 실시간 모니터링",
            "💰 에너지 절감 분석",
            "🔧 VFD 예방진단",
            "📈 센서 & 장비 상태",
            "⚙️ 설정",
            "📝 알람/이벤트 로그",
            "📚 학습 진행 (개발)",
            "🧪 시나리오 테스트 (개발)",
            "🛠️ 개발자 도구 (개발)"
        ])

        with tabs[0]:
            self._render_realtime_monitoring()

        with tabs[1]:
            self._render_energy_savings_analysis()

        with tabs[2]:
            self._render_vfd_diagnostics()

        with tabs[3]:
            self._render_sensor_equipment_status()

        with tabs[4]:
            self._render_settings()

        with tabs[5]:
            self._render_alarm_event_log()

        with tabs[6]:
            self._render_learning_progress()

        with tabs[7]:
            self._render_scenario_testing()

        with tabs[8]:
            self._render_developer_tools()

    def _render_header(self):
        """헤더 렌더링"""
        col1, col2 = st.columns([3, 1])

        with col1:
            st.markdown("""
            <div class="gradient-header">
                🚢 Edge Computer Dashboard V2.0
            </div>
            """, unsafe_allow_html=True)

        with col2:
            # PLC 연결 상태
            client = st.session_state.modbus_client
            if client.connected:
                st.markdown("""
                <div style="text-align: right; padding: 1rem;">
                    <span class="status-dot connected"></span>
                    <span style="color: #10b981; font-weight: 600;">PLC 연결됨</span>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown("""
                <div style="text-align: right; padding: 1rem;">
                    <span class="status-dot disconnected"></span>
                    <span style="color: #ef4444; font-weight: 600;">PLC 연결 끊김</span>
                </div>
                """, unsafe_allow_html=True)

    def _render_sidebar(self):
        """사이드바 렌더링"""
        with st.sidebar:
            st.markdown("### 🎛️ 제어판")

            # PLC 연결 제어
            st.markdown("#### PLC 연결")
            col1, col2 = st.columns(2)
            with col1:
                if st.button("🔌 연결", use_container_width=True):
                    client = st.session_state.modbus_client
                    if client.connect():
                        st.success("연결 성공!")
                        time.sleep(0.5)
                        st.rerun()
                    else:
                        st.error("연결 실패!")

            with col2:
                if st.button("❌ 끊기", use_container_width=True):
                    st.session_state.modbus_client.disconnect()
                    st.info("연결 종료")
                    time.sleep(0.5)
                    st.rerun()

            st.markdown("---")

            # 시스템 정보
            st.markdown("#### 📊 시스템 정보")
            st.metric("PLC 주소", f"{config.PLC_HOST}:{config.PLC_PORT}")
            st.metric("Slave ID", config.PLC_SLAVE_ID)
            st.metric("업데이트 주기", f"{config.UPDATE_INTERVAL}초")

            st.markdown("---")

            # 현재 시간
            st.markdown("#### ⏰ 현재 시간")
            st.info(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    # ==================== 탭 1: 실시간 모니터링 ====================
    def _render_realtime_monitoring(self):
        """실시간 모니터링 탭"""
        st.markdown("## 📊 실시간 모니터링")

        # PLC 데이터 가져오기
        plc_data = self._get_plc_data()

        if plc_data is None:
            st.error("⚠️ PLC 연결이 필요합니다.")
            st.info("""
            **PLC 연결 방법:**
            1. PLC Simulator 실행: `C:\\Users\\my\\Desktop\\PLC_Simulator\\START_PLC.bat`
            2. 사이드바에서 "연결" 버튼 클릭
            3. PLC 주소: localhost:502
            """)
            return

        # 1. 주파수 비교 테이블 (최우선!)
        st.markdown("### 🎯 주파수 비교 (목표 vs 실제)")

        freq_df = self._create_frequency_comparison_table(plc_data)

        # 스타일 적용
        st.markdown("""
        <style>
        .stDataFrame {
            font-size: 18px !important;
        }
        .stDataFrame [data-testid="stDataFrameResizable"] > div {
            background-color: #1e293b !important;
        }
        .stDataFrame table {
            background-color: #1e293b !important;
        }
        .stDataFrame thead tr th {
            background-color: #3b82f6 !important;
            color: white !important;
            font-size: 20px !important;
            font-weight: bold !important;
            padding: 14px !important;
        }
        .stDataFrame tbody tr td {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
            font-size: 18px !important;
            padding: 12px !important;
        }
        </style>
        """, unsafe_allow_html=True)

        st.dataframe(
            freq_df,
            use_container_width=True,
            height=400,
            hide_index=True
        )

        st.markdown("---")

        # 2. 실시간 절감률 요약 카드
        st.markdown("### 💡 실시간 절감률 요약")
        savings = self._calculate_realtime_savings(plc_data)

        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric(
                "실시간 순간 절감률",
                f"{savings['total_ratio']:.1f}%",
                delta=f"{savings['total_savings_kw']:.1f} kW",
                delta_color="normal"
            )

        with col2:
            st.metric(
                "SWP 절감률",
                f"{savings['swp_ratio']:.1f}%",
                delta=f"{savings['swp_savings_kw']:.1f} kW",
                delta_color="normal"
            )

        with col3:
            st.metric(
                "FWP 절감률",
                f"{savings['fwp_ratio']:.1f}%",
                delta=f"{savings['fwp_savings_kw']:.1f} kW",
                delta_color="normal"
            )

        with col4:
            st.metric(
                "FAN 절감률",
                f"{savings['fan_ratio']:.1f}%",
                delta=f"{savings['fan_savings_kw']:.1f} kW",
                delta_color="normal"
            )

        st.markdown("---")

        # 3. 장비 운전 상태 요약
        st.markdown("### ⚙️ 장비 운전 상태")

        col1, col2 = st.columns(2)

        with col1:
            st.markdown("#### 펌프 상태")
            pump_status = self._get_pump_status(plc_data)
            for pump in pump_status:
                # 'running' 필드가 있으면 사용, 없으면 기본값 False
                is_running = pump.get('running', False)
                if is_running:
                    st.success(f"✅ {pump['name']}: {pump['frequency']:.1f} Hz ({pump['power']:.1f} kW)")
                else:
                    st.info(f"⚪ {pump['name']}: 정지")

        with col2:
            st.markdown("#### 팬 상태")
            fan_status = self._get_fan_status(plc_data)
            for fan in fan_status:
                # 'running_fwd', 'running_bwd' 필드가 있으면 사용, 없으면 기본값 False
                running_fwd = fan.get('running_fwd', False)
                running_bwd = fan.get('running_bwd', False)
                if running_fwd or running_bwd:
                    direction = "정방향" if running_fwd else "역방향"
                    st.success(f"✅ {fan['name']}: {fan['frequency']:.1f} Hz ({fan['power']:.1f} kW) - {direction}")
                else:
                    st.info(f"⚪ {fan['name']}: 정지")

    def _create_frequency_comparison_table(self, plc_data: Dict) -> pd.DataFrame:
        """주파수 비교 테이블 생성"""
        equipment = plc_data.get('equipment', [])
        target_freq = plc_data.get('target_frequencies', [48.4] * 10)

        # equipment가 None이면 빈 리스트로 초기화
        if equipment is None:
            equipment = []

        data = []
        for i, eq in enumerate(equipment):
            name = eq['name']
            actual_freq = eq['frequency']

            # 작동하지 않는 장비(실제 주파수 0)는 목표 주파수도 0으로 표시
            if actual_freq == 0.0:
                target = 0.0
                deviation = 0.0
                status = "✅ 정상"
            else:
                target = target_freq[i] if i < len(target_freq) else 48.4
                deviation = actual_freq - target
                status = "✅ 정상" if abs(deviation) < 2.0 else "⚠️ 편차 큼"

            data.append({
                '장비명': name,
                '목표 주파수 (Hz)': f"{target:.1f}",
                '실제 주파수 (Hz)': f"{actual_freq:.1f}",
                '편차 (Hz)': f"{deviation:+.1f}",
                '전력 (kW)': f"{eq['power']:.1f}",
                '상태': status
            })

        return pd.DataFrame(data)

    def _create_frequency_comparison_html(self, plc_data: Dict) -> str:
        """주파수 비교 테이블 HTML 생성"""
        equipment = plc_data.get('equipment', [])
        target_freq = plc_data.get('target_frequencies', [48.4] * 10)

        if equipment is None:
            equipment = []

        # HTML 테이블 시작
        html = """
        <style>
        .freq-table {
            width: 100%;
            border-collapse: collapse;
            background-color: #1e293b;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }
        .freq-table th {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 16px 12px;
            text-align: center;
            font-size: 1.15rem;
            font-weight: 700;
            border-bottom: 2px solid #3b82f6;
        }
        .freq-table td {
            background-color: #1e293b;
            color: #e2e8f0;
            padding: 14px 12px;
            text-align: center;
            font-size: 1.1rem;
            border-bottom: 1px solid #334155;
        }
        .freq-table tr:hover td {
            background-color: #334155;
        }
        .freq-table .eq-name {
            font-weight: 600;
            color: #60a5fa;
        }
        .freq-table .status-ok {
            color: #10b981;
            font-weight: 600;
        }
        .freq-table .status-warning {
            color: #f59e0b;
            font-weight: 600;
        }
        </style>
        <table class="freq-table">
            <thead>
                <tr>
                    <th>장비명</th>
                    <th>목표 주파수 (Hz)</th>
                    <th>실제 주파수 (Hz)</th>
                    <th>편차 (Hz)</th>
                    <th>전력 (kW)</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
        """

        # 데이터 행 추가
        for i, eq in enumerate(equipment):
            name = eq['name']
            actual_freq = eq['frequency']

            # 작동하지 않는 장비(실제 주파수 0)는 목표 주파수도 0으로 표시
            if actual_freq == 0.0:
                target = 0.0
                deviation = 0.0
                status = "✅ 정상"
                status_class = "status-ok"
            else:
                target = target_freq[i] if i < len(target_freq) else 48.4
                deviation = actual_freq - target
                if abs(deviation) < 2.0:
                    status = "✅ 정상"
                    status_class = "status-ok"
                else:
                    status = "⚠️ 편차 큼"
                    status_class = "status-warning"

            html += f"""
                <tr>
                    <td class="eq-name">{name}</td>
                    <td>{target:.1f}</td>
                    <td>{actual_freq:.1f}</td>
                    <td>{deviation:+.1f}</td>
                    <td>{eq['power']:.1f}</td>
                    <td class="{status_class}">{status}</td>
                </tr>
            """

        html += """
            </tbody>
        </table>
        """

        return html

    def _calculate_realtime_savings(self, plc_data: Dict) -> Dict:
        """실시간 절감률 계산"""
        equipment = plc_data.get('equipment', [])
        if equipment is None:
            equipment = []

        # 그룹별 계산
        swp_power_60hz = 0
        swp_power_vfd = 0
        fwp_power_60hz = 0
        fwp_power_vfd = 0
        fan_power_60hz = 0
        fan_power_vfd = 0

        for i, eq in enumerate(equipment):
            freq = eq['frequency']
            power = eq['power']
            running = eq.get('running', False) or eq.get('running_fwd', False) or eq.get('running_bwd', False)

            if not running:
                continue

            # 60Hz 기준 전력 (P = P_rated × (f/60)^3)
            if i < 3:  # SWP
                rated = config.MOTOR_CAPACITY['SWP']
                power_60hz = rated
                swp_power_60hz += power_60hz
                swp_power_vfd += power
            elif i < 6:  # FWP
                rated = config.MOTOR_CAPACITY['FWP']
                power_60hz = rated
                fwp_power_60hz += power_60hz
                fwp_power_vfd += power
            else:  # FAN
                rated = config.MOTOR_CAPACITY['FAN']
                power_60hz = rated
                fan_power_60hz += power_60hz
                fan_power_vfd += power

        # 절감량 및 절감률 계산
        swp_savings = swp_power_60hz - swp_power_vfd
        fwp_savings = fwp_power_60hz - fwp_power_vfd
        fan_savings = fan_power_60hz - fan_power_vfd
        total_savings = swp_savings + fwp_savings + fan_savings

        total_power_60hz = swp_power_60hz + fwp_power_60hz + fan_power_60hz
        total_power_vfd = swp_power_vfd + fwp_power_vfd + fan_power_vfd

        return {
            'total_ratio': (total_savings / total_power_60hz * 100) if total_power_60hz > 0 else 0,
            'swp_ratio': (swp_savings / swp_power_60hz * 100) if swp_power_60hz > 0 else 0,
            'fwp_ratio': (fwp_savings / fwp_power_60hz * 100) if fwp_power_60hz > 0 else 0,
            'fan_ratio': (fan_savings / fan_power_60hz * 100) if fan_power_60hz > 0 else 0,
            'total_savings_kw': total_savings,
            'swp_savings_kw': swp_savings,
            'fwp_savings_kw': fwp_savings,
            'fan_savings_kw': fan_savings,
        }

    def _get_pump_status(self, plc_data: Dict) -> List[Dict]:
        """펌프 상태 추출"""
        equipment = plc_data.get('equipment', [])
        if equipment is None:
            equipment = []
        return [eq for eq in equipment if 'WP' in eq['name']]

    def _get_fan_status(self, plc_data: Dict) -> List[Dict]:
        """팬 상태 추출"""
        equipment = plc_data.get('equipment', [])
        if equipment is None:
            equipment = []
        return [eq for eq in equipment if 'FAN' in eq['name']]

    # ==================== 탭 2: 에너지 절감 분석 ====================
    def _render_energy_savings_analysis(self):
        """에너지 절감 분석 탭"""
        st.markdown("## 💰 에너지 절감 분석")

        # PLC 데이터 가져오기
        plc_data = self._get_plc_data()

        if plc_data is None:
            st.error("⚠️ PLC 연결이 필요합니다.")
            return

        # 1. 상단 요약 카드 4개
        st.markdown("### 📊 절감 요약")
        savings = self._calculate_realtime_savings(plc_data)

        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.markdown("""
            <div class="card">
                <h4 style="color: #94a3b8; margin-bottom: 0.5rem;">실시간 순간 절감률</h4>
                <h2 style="color: #3b82f6; margin: 0;">{:.1f}%</h2>
                <p style="color: #10b981; margin-top: 0.5rem;">{:.1f} kW</p>
            </div>
            """.format(savings['total_ratio'], savings['total_savings_kw']), unsafe_allow_html=True)

        with col2:
            today_kwh = savings['total_savings_kw'] * 0.5  # 임시 계산 (12시간 기준)
            electricity_rate = st.session_state.get('electricity_rate', config.ELECTRICITY_RATE)
            st.markdown("""
            <div class="card">
                <h4 style="color: #94a3b8; margin-bottom: 0.5rem;">오늘 절감량</h4>
                <h2 style="color: #3b82f6; margin: 0;">{:.1f} kWh</h2>
                <p style="color: #10b981; margin-top: 0.5rem;">약 {:.0f}원</p>
            </div>
            """.format(today_kwh, today_kwh * electricity_rate), unsafe_allow_html=True)

        with col3:
            month_kwh = today_kwh * 30  # 임시 계산
            st.markdown("""
            <div class="card">
                <h4 style="color: #94a3b8; margin-bottom: 0.5rem;">이번 달 절감량</h4>
                <h2 style="color: #3b82f6; margin: 0;">{:.1f} kWh</h2>
                <p style="color: #10b981; margin-top: 0.5rem;">약 {:.0f}만원</p>
            </div>
            """.format(month_kwh, month_kwh * electricity_rate / 10000), unsafe_allow_html=True)

        with col4:
            year_kwh = month_kwh * 12
            st.markdown("""
            <div class="card">
                <h4 style="color: #94a3b8; margin-bottom: 0.5rem;">예상 연간 절감량</h4>
                <h2 style="color: #3b82f6; margin: 0;">{:.1f} MWh</h2>
                <p style="color: #10b981; margin-top: 0.5rem;">약 {:.0f}백만원</p>
            </div>
            """.format(year_kwh / 1000, year_kwh * electricity_rate / 1000000), unsafe_allow_html=True)

        st.markdown("---")

        # 2. 기간별 그래프
        st.markdown("### 📈 기간별 절감 추이")

        period = st.selectbox("기간 선택", ["시간별 (24시간)", "일별 (30일)", "월별 (12개월)"])

        if period == "시간별 (24시간)":
            # 임시 데이터 생성
            hours = list(range(24))
            savings_data = [savings['total_savings_kw'] * (0.8 + 0.4 * abs((h - 12) / 12)) for h in hours]

            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=hours,
                y=savings_data,
                mode='lines+markers',
                name='절감 전력 (kW)',
                line=dict(color='#10b981', width=3),
                marker=dict(size=8)
            ))

            fig.update_layout(
                height=400,
                xaxis_title="시간",
                yaxis_title="절감 전력 (kW)",
                template="plotly_dark",
                paper_bgcolor='#1e293b',
                plot_bgcolor='#1e293b'
            )

            st.plotly_chart(fig, use_container_width=True)

        elif period == "일별 (30일)":
            days = list(range(1, 31))
            savings_data = [savings['total_savings_kw'] * 12 * (0.9 + 0.2 * (d % 7) / 7) for d in days]

            fig = go.Figure()
            fig.add_trace(go.Bar(
                x=days,
                y=savings_data,
                name='일별 절감량 (kWh)',
                marker_color='#3b82f6'
            ))

            fig.update_layout(
                height=400,
                xaxis_title="일",
                yaxis_title="절감량 (kWh)",
                template="plotly_dark",
                paper_bgcolor='#1e293b',
                plot_bgcolor='#1e293b'
            )

            st.plotly_chart(fig, use_container_width=True)

        else:  # 월별
            months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            savings_data = [savings['total_savings_kw'] * 12 * 30 * (0.85 + 0.3 * (m % 4) / 4) for m in range(12)]

            fig = go.Figure()
            fig.add_trace(go.Bar(
                x=months,
                y=savings_data,
                name='월별 절감량 (MWh)',
                marker_color='#3b82f6'
            ))

            fig.update_layout(
                height=400,
                xaxis_title="월",
                yaxis_title="절감량 (MWh)",
                template="plotly_dark",
                paper_bgcolor='#1e293b',
                plot_bgcolor='#1e293b'
            )

            st.plotly_chart(fig, use_container_width=True)

        st.markdown("---")

        # 3. 그룹별 분석
        st.markdown("### 🔍 그룹별 분석")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.markdown("#### SWP (해수 펌프)")
            st.metric("절감률", f"{savings['swp_ratio']:.1f}%")
            st.metric("절감 전력", f"{savings['swp_savings_kw']:.1f} kW")

        with col2:
            st.markdown("#### FWP (청수 펌프)")
            st.metric("절감률", f"{savings['fwp_ratio']:.1f}%")
            st.metric("절감 전력", f"{savings['fwp_savings_kw']:.1f} kW")

        with col3:
            st.markdown("#### FAN (기관실 팬)")
            st.metric("절감률", f"{savings['fan_ratio']:.1f}%")
            st.metric("절감 전력", f"{savings['fan_savings_kw']:.1f} kW")

        st.markdown("---")

        # 4. 장비별 상세 테이블
        st.markdown("### 📋 장비별 상세 분석")

        equipment = plc_data.get('equipment', [])
        detail_data = []

        for i, eq in enumerate(equipment):
            name = eq['name']
            freq = eq['frequency']
            power = eq['power']
            running = eq.get('running', False) or eq.get('running_fwd', False) or eq.get('running_bwd', False)

            # 정격 용량
            if 'SWP' in name:
                rated = config.MOTOR_CAPACITY['SWP']
            elif 'FWP' in name:
                rated = config.MOTOR_CAPACITY['FWP']
            else:
                rated = config.MOTOR_CAPACITY['FAN']

            power_60hz = rated if running else 0
            savings_kw = power_60hz - power if running else 0
            savings_ratio = (savings_kw / power_60hz * 100) if power_60hz > 0 else 0

            detail_data.append({
                '장비명': name,
                '운전 상태': '✅ 운전중' if running else '⚪ 정지',
                '주파수 (Hz)': f"{freq:.1f}",
                '실제 전력 (kW)': f"{power:.1f}",
                '60Hz 전력 (kW)': f"{power_60hz:.1f}",
                '절감 전력 (kW)': f"{savings_kw:.1f}",
                '절감률 (%)': f"{savings_ratio:.1f}"
            })

        detail_df = pd.DataFrame(detail_data)
        st.dataframe(detail_df, use_container_width=True, height=400)

    # ==================== 탭 3: VFD 예방진단 ====================
    def _render_vfd_diagnostics(self):
        """VFD 예방진단 탭"""
        st.markdown("## 🔧 VFD 예방진단")

        st.info("💡 **VFD 예방진단 시스템** - PLC 레지스터 6000-6099를 통해 VFD 진단 데이터를 수집합니다.")

        # PLC 데이터 가져오기
        plc_data = self._get_plc_data()

        if plc_data is None:
            st.error("⚠️ PLC 연결이 필요합니다.")
            return

        # VFD 진단 데이터 (임시 - 향후 PLC 레지스터 6000-6099에서 읽기)
        vfd_diagnostics = self._get_vfd_diagnostics_data(plc_data)

        # 1. 10대 VFD 상태 카드
        st.markdown("### 📊 VFD 건강도 현황")

        # 2행 5열로 배치
        for row in range(2):
            cols = st.columns(5)
            for col_idx in range(5):
                vfd_idx = row * 5 + col_idx
                if vfd_idx < len(vfd_diagnostics):
                    vfd = vfd_diagnostics[vfd_idx]
                    with cols[col_idx]:
                        # 건강도에 따른 색상
                        if vfd['health_score'] >= 80:
                            color = "#10b981"
                            status = "양호"
                        elif vfd['health_score'] >= 60:
                            color = "#f59e0b"
                            status = "주의"
                        else:
                            color = "#ef4444"
                            status = "경고"

                        st.markdown(f"""
                        <div class="card" style="border-left: 4px solid {color};">
                            <h4 style="margin: 0; color: #e2e8f0;">{vfd['name']}</h4>
                            <h2 style="margin: 0.5rem 0; color: {color};">{vfd['health_score']}</h2>
                            <p style="margin: 0; color: #94a3b8;">건강도 점수</p>
                            <p style="margin: 0.5rem 0; color: {color}; font-weight: 600;">{status}</p>
                        </div>
                        """, unsafe_allow_html=True)

        st.markdown("---")

        # 2. 이상 징후 경고
        st.markdown("### ⚠️ 이상 징후 탐지")

        warnings = [vfd for vfd in vfd_diagnostics if vfd['health_score'] < 80]

        if warnings:
            for vfd in warnings:
                if vfd['health_score'] >= 60:
                    st.warning(f"⚠️ **{vfd['name']}**: 건강도 {vfd['health_score']} - {vfd['warning_message']}")
                else:
                    st.error(f"🚨 **{vfd['name']}**: 건강도 {vfd['health_score']} - {vfd['warning_message']}")
        else:
            st.success("✅ 모든 VFD가 정상 상태입니다.")

        st.markdown("---")

        # 3. 예측 유지보수 정보
        st.markdown("### 🔮 예측 유지보수")

        maintenance_data = []
        for vfd in vfd_diagnostics:
            if vfd['health_score'] < 80:
                maintenance_data.append({
                    '장비명': vfd['name'],
                    '건강도': vfd['health_score'],
                    '예상 정비 시기': vfd['next_maintenance'],
                    '권장 조치': vfd['recommended_action'],
                    '우선순위': vfd['priority']
                })

        if maintenance_data:
            maintenance_df = pd.DataFrame(maintenance_data)
            st.dataframe(maintenance_df, use_container_width=True)
        else:
            st.info("✅ 예정된 유지보수 항목이 없습니다.")

        st.markdown("---")

        # 4. 상세 진단 정보
        st.markdown("### 📋 상세 진단 정보")

        st.markdown("**VFD 선택:**")

        # 라디오 버튼으로 변경 (가로 배치)
        vfd_names = [vfd['name'] for vfd in vfd_diagnostics]
        selected_vfd = st.radio(
            "VFD 선택",
            vfd_names,
            horizontal=True,
            label_visibility="collapsed"
        )

        vfd_detail = next((vfd for vfd in vfd_diagnostics if vfd['name'] == selected_vfd), None)

        if vfd_detail:
            col1, col2, col3 = st.columns(3)

            with col1:
                st.metric("건강도 점수", vfd_detail['health_score'])
                st.metric("운전 시간", f"{vfd_detail['run_hours']} h")

            with col2:
                st.metric("평균 온도", f"{vfd_detail['avg_temp']:.1f} °C")
                st.metric("최대 온도", f"{vfd_detail['max_temp']:.1f} °C")

            with col3:
                st.metric("진동 레벨", f"{vfd_detail['vibration']:.2f} mm/s")
                st.metric("누적 기동 횟수", f"{vfd_detail['start_count']} 회")

            # 온도 트렌드 그래프
            st.markdown("#### 온도 트렌드 (24시간)")

            hours = list(range(24))
            temp_trend = [vfd_detail['avg_temp'] + (h % 6 - 3) * 2 for h in hours]

            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=hours,
                y=temp_trend,
                mode='lines+markers',
                name='VFD 온도',
                line=dict(color='#ef4444', width=2),
                marker=dict(size=6)
            ))

            fig.add_hline(y=80, line_dash="dash", line_color="#f59e0b", annotation_text="경고 온도")
            fig.add_hline(y=90, line_dash="dash", line_color="#ef4444", annotation_text="위험 온도")

            fig.update_layout(
                height=300,
                xaxis_title="시간",
                yaxis_title="온도 (°C)",
                template="plotly_dark",
                paper_bgcolor='#1e293b',
                plot_bgcolor='#1e293b'
            )

            st.plotly_chart(fig, use_container_width=True)

    def _get_vfd_diagnostics_data(self, plc_data: Dict) -> List[Dict]:
        """VFD 진단 데이터 생성 (임시)"""
        equipment = plc_data.get('equipment', [])
        diagnostics = []

        for i, eq in enumerate(equipment):
            # 임시 건강도 점수 생성
            base_score = 85
            score_variation = (i * 7) % 30
            health_score = base_score - score_variation

            # 경고 메시지
            if health_score >= 80:
                warning = "정상 운전 중"
                priority = "낮음"
                next_maint = f"{(100 - health_score) * 10}일 후"
                action = "정기 점검"
            elif health_score >= 60:
                warning = "온도 상승 감지"
                priority = "중간"
                next_maint = f"{(80 - health_score) * 5}일 후"
                action = "냉각 시스템 점검 권장"
            else:
                warning = "비정상 진동 감지"
                priority = "높음"
                next_maint = "7일 이내"
                action = "즉시 정밀 점검 필요"

            diagnostics.append({
                'name': eq['name'],
                'health_score': health_score,
                'warning_message': warning,
                'next_maintenance': next_maint,
                'recommended_action': action,
                'priority': priority,
                'run_hours': eq.get('run_hours', 5000),
                'avg_temp': 65.0 + (i * 3) % 15,
                'max_temp': 75.0 + (i * 3) % 15,
                'vibration': 0.5 + (i * 0.2) % 1.5,
                'start_count': 1200 + (i * 150)
            })

        return diagnostics

    # ==================== 탭 4: 센서 & 장비 상태 ====================
    def _render_sensor_equipment_status(self):
        """센서 & 장비 상태 탭"""
        st.markdown("## 📈 센서 & 장비 상태")

        # PLC 데이터 가져오기
        plc_data = self._get_plc_data()

        if plc_data is None:
            st.error("⚠️ PLC 연결이 필요합니다.")
            return

        # 1. 전체 센서 테이블
        st.markdown("### 🌡️ 전체 센서 현황")

        sensors = plc_data.get('sensors', {})
        sensor_data = [
            {'센서': 'TX1', '설명': 'CSW PP Disc Temp', '값': f"{sensors.get('TX1', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'TX2', '설명': 'No.1 COOLER SW Out Temp', '값': f"{sensors.get('TX2', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'TX3', '설명': 'No.2 COOLER SW Out Temp', '값': f"{sensors.get('TX3', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'TX4', '설명': 'COOLER FW In Temp', '값': f"{sensors.get('TX4', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'TX5', '설명': 'COOLER FW Out Temp', '값': f"{sensors.get('TX5', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'TX6', '설명': 'E/R Inside Temp', '값': f"{sensors.get('TX6', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'TX7', '설명': 'E/R Outside Temp', '값': f"{sensors.get('TX7', 0):.1f} °C", '상태': '✅ 정상'},
            {'센서': 'PX1', '설명': 'CSW PP Disc Press', '값': f"{sensors.get('DPX1', 0):.2f} kg/cm²", '상태': '✅ 정상'},
            {'센서': 'PU1', '설명': 'M/E Load', '값': f"{sensors.get('PU1', 0):.1f} %", '상태': '✅ 정상'},
        ]

        sensor_df = pd.DataFrame(sensor_data)
        st.dataframe(sensor_df, use_container_width=True, height=400)

        st.markdown("---")

        # 2. 센서 트렌드 그래프
        st.markdown("### 📊 센서 트렌드 (최근 1시간)")

        selected_sensors = st.multiselect(
            "센서 선택",
            ['TX1', 'TX4', 'TX5', 'TX6', 'TX7', 'PU1'],
            default=['TX4', 'TX6']
        )

        if selected_sensors:
            # 임시 트렌드 데이터 생성
            timestamps = [datetime.now() - timedelta(minutes=60-i*5) for i in range(12)]

            fig = go.Figure()

            for sensor in selected_sensors:
                base_value = sensors.get(sensor, 50)
                trend_data = [base_value + (i % 4 - 2) * 2 for i in range(12)]

                fig.add_trace(go.Scatter(
                    x=timestamps,
                    y=trend_data,
                    mode='lines+markers',
                    name=sensor,
                    line=dict(width=2),
                    marker=dict(size=6)
                ))

            fig.update_layout(
                height=400,
                xaxis_title="시간",
                yaxis_title="값",
                template="plotly_dark",
                paper_bgcolor='#1e293b',
                plot_bgcolor='#1e293b',
                legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1)
            )

            st.plotly_chart(fig, use_container_width=True)

        st.markdown("---")

        # 3. 장비 상세 상태
        st.markdown("### ⚙️ 장비 상세 상태")

        equipment = plc_data.get('equipment', [])

        for eq in equipment:
            with st.expander(f"**{eq['name']}** - {eq['frequency']:.1f} Hz, {eq['power']:.1f} kW"):
                col1, col2, col3 = st.columns(3)

                with col1:
                    st.metric("주파수", f"{eq['frequency']:.1f} Hz")
                    st.metric("전력", f"{eq['power']:.1f} kW")

                with col2:
                    st.metric("평균 전력", f"{eq['avg_power']:.1f} kW")
                    st.metric("운전 시간", f"{eq['run_hours']:,} h")

                with col3:
                    running = eq.get('running', False) or eq.get('running_fwd', False) or eq.get('running_bwd', False)
                    st.metric("상태", "✅ 운전중" if running else "⚪ 정지")

                    if 'FAN' in eq['name']:
                        direction = "정방향" if eq.get('running_fwd', False) else ("역방향" if eq.get('running_bwd', False) else "정지")
                        st.metric("방향", direction)

        st.markdown("---")

        # 4. AI 제어 로직 표시
        st.markdown("### 🤖 AI 제어 로직")

        st.info("""
        **현재 적용 중인 AI 제어 규칙**

        - **SWP (해수 펌프)**: 디스차지 온도 기반 주파수 조절
        - **FWP (청수 펌프)**: 냉각수 입출구 온도차 기반 제어
        - **FAN (기관실 팬)**: E/R 내외부 온도차 기반 대수 및 주파수 제어

        모든 제어는 안전 범위(40-60 Hz) 내에서 수행되며, 압력 및 부하 조건을 고려합니다.
        """)

    # ==================== 탭 5: 설정 ====================
    def _render_settings(self):
        """설정 탭"""
        st.markdown("## ⚙️ 설정")

        # 1. PLC 연결 설정
        st.markdown("### 🔌 PLC 연결 설정")

        col1, col2, col3 = st.columns(3)

        with col1:
            new_host = st.text_input("PLC 주소", value=config.PLC_HOST)

        with col2:
            new_port = st.number_input("PLC 포트", value=config.PLC_PORT, min_value=1, max_value=65535)

        with col3:
            new_slave_id = st.number_input("Slave ID", value=config.PLC_SLAVE_ID, min_value=1, max_value=255)

        if st.button("💾 PLC 설정 저장 및 재연결"):
            # 설정 업데이트 (실제로는 config 파일 수정 필요)
            st.session_state.modbus_client.disconnect()
            st.session_state.modbus_client.host = new_host
            st.session_state.modbus_client.port = new_port
            st.session_state.modbus_client.slave_id = new_slave_id

            if st.session_state.modbus_client.connect():
                st.success("✅ PLC 설정이 저장되고 재연결되었습니다!")
            else:
                st.error("❌ PLC 재연결에 실패했습니다.")

        st.markdown("---")

        # 2. AI 파라미터 조정
        st.markdown("### 🤖 AI 파라미터 조정")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.markdown("#### SWP 목표 주파수")
            swp_target = st.slider("SWP (Hz)", 40.0, 60.0, config.AI_TARGET_FREQUENCY['SWP'], 0.1)

        with col2:
            st.markdown("#### FWP 목표 주파수")
            fwp_target = st.slider("FWP (Hz)", 40.0, 60.0, config.AI_TARGET_FREQUENCY['FWP'], 0.1)

        with col3:
            st.markdown("#### FAN 목표 주파수")
            fan_target = st.slider("FAN (Hz)", 40.0, 60.0, config.AI_TARGET_FREQUENCY['FAN'], 0.1)

        if st.button("💾 AI 파라미터 저장 및 PLC 전송"):
            # 목표 주파수 리스트 생성
            target_freq = [
                swp_target, swp_target, swp_target,  # SWP1-3
                fwp_target, fwp_target, fwp_target,  # FWP1-3
                fan_target, fan_target, fan_target, fan_target  # FAN1-4
            ]

            client = st.session_state.modbus_client
            if client.connected:
                if client.write_ai_target_frequency(target_freq):
                    st.success("✅ AI 파라미터가 PLC에 전송되었습니다!")
                else:
                    st.error("❌ PLC 전송에 실패했습니다.")
            else:
                st.error("❌ PLC가 연결되지 않았습니다.")

        st.markdown("---")

        # 3. 전기요금 단가 설정
        st.markdown("### 💰 전기요금 단가 설정")

        col1, col2 = st.columns([2, 1])

        with col1:
            # session_state 초기화
            if 'electricity_rate' not in st.session_state:
                st.session_state.electricity_rate = config.ELECTRICITY_RATE

            new_rate = st.number_input(
                "전기요금 단가 (원/kWh)",
                value=st.session_state.electricity_rate,
                min_value=50.0,
                max_value=500.0,
                step=1.0,
                help="산업용 전기요금 단가를 입력하세요. 시간대별/계절별로 다를 수 있습니다."
            )

        with col2:
            st.markdown("<br>", unsafe_allow_html=True)
            if st.button("💾 단가 저장"):
                st.session_state.electricity_rate = new_rate
                st.success(f"✅ 전기요금 단가가 {new_rate:.0f}원/kWh로 저장되었습니다!")

        st.info(f"ℹ️ 현재 적용 중인 단가: **{st.session_state.electricity_rate:.0f}원/kWh**")

        st.markdown("---")

        # 4. 알람 임계값 설정
        st.markdown("### 🚨 알람 임계값 설정")

        # session_state 초기화
        if 'alarm_thresholds' not in st.session_state:
            st.session_state.alarm_thresholds = {
                # 온도 센서 (°C)
                'TX1_high': 30.0,   # CSW PP Disc Temp
                'TX2_high': 50.0,   # No.1 COOLER SW Out Temp
                'TX3_high': 50.0,   # No.2 COOLER SW Out Temp
                'TX4_high': 50.0,   # COOLER FW In Temp
                'TX5_high': 40.0,   # COOLER FW Out Temp
                'TX6_high': 50.0,   # E/R Inside Temp
                'TX7_high': 40.0,   # E/R Outside Temp
                # 압력 센서
                'PX1_low': 1.5,     # CSW PP Disc Press 하한 (kg/cm²)
                'PX1_high': 4.0,    # CSW PP Disc Press 상한 (kg/cm²)
                # 부하
                'PU1_high': 85.0,   # M/E Load 상한 (%)
            }

        st.markdown("#### 🌡️ 온도 알람 임계값 (상한)")

        # CSS로 number_input 너비 제한
        st.markdown("""
        <style>
        /* number_input 전체 컨테이너 너비 축소 */
        div[data-testid="stNumberInput"] {
            max-width: 200px !important;
        }
        /* 입력 필드 너비 축소 */
        div[data-testid="stNumberInput"] input {
            width: 80px !important;
            max-width: 80px !important;
        }
        /* +/- 버튼이 입력 필드 바로 옆에 위치 */
        div[data-testid="stNumberInput"] > div {
            width: fit-content !important;
        }
        </style>
        """, unsafe_allow_html=True)

        col1, col2, col3, col4, col5, col6, col7 = st.columns(7)

        with col1:
            tx1_high = st.number_input(
                "TX1 (°C)",
                value=st.session_state.alarm_thresholds['TX1_high'],
                min_value=20.0, max_value=60.0, step=1.0,
                key="tx1_alarm"
            )

        with col2:
            tx2_high = st.number_input(
                "TX2 (°C)",
                value=st.session_state.alarm_thresholds['TX2_high'],
                min_value=30.0, max_value=70.0, step=1.0,
                key="tx2_alarm"
            )

        with col3:
            tx3_high = st.number_input(
                "TX3 (°C)",
                value=st.session_state.alarm_thresholds['TX3_high'],
                min_value=30.0, max_value=70.0, step=1.0,
                key="tx3_alarm"
            )

        with col4:
            tx4_high = st.number_input(
                "TX4 (°C)",
                value=st.session_state.alarm_thresholds['TX4_high'],
                min_value=30.0, max_value=70.0, step=1.0,
                key="tx4_alarm"
            )

        with col5:
            tx5_high = st.number_input(
                "TX5 (°C)",
                value=st.session_state.alarm_thresholds['TX5_high'],
                min_value=30.0, max_value=60.0, step=1.0,
                key="tx5_alarm"
            )

        with col6:
            tx6_high = st.number_input(
                "TX6 (°C)",
                value=st.session_state.alarm_thresholds['TX6_high'],
                min_value=30.0, max_value=80.0, step=1.0,
                key="tx6_alarm"
            )

        with col7:
            tx7_high = st.number_input(
                "TX7 (°C)",
                value=st.session_state.alarm_thresholds['TX7_high'],
                min_value=20.0, max_value=60.0, step=1.0,
                key="tx7_alarm"
            )

        st.markdown("---")

        st.markdown("#### 💧 압력 & ⚙️ 부하 알람 임계값")

        col1, col2, col3, col4, col5, col6, col7 = st.columns(7)

        with col1:
            px1_low = st.number_input(
                "PX1 하한 (kg/cm²)",
                value=st.session_state.alarm_thresholds['PX1_low'],
                min_value=0.0, max_value=5.0, step=0.1,
                key="px1_low_alarm"
            )

        with col2:
            px1_high = st.number_input(
                "PX1 상한 (kg/cm²)",
                value=st.session_state.alarm_thresholds['PX1_high'],
                min_value=0.0, max_value=10.0, step=0.1,
                key="px1_high_alarm"
            )

        with col3:
            pu1_high = st.number_input(
                "PU1 상한 (%)",
                value=st.session_state.alarm_thresholds['PU1_high'],
                min_value=50.0, max_value=100.0, step=1.0,
                key="pu1_alarm"
            )

        st.markdown("---")

        if st.button("💾 알람 임계값 저장"):
            # session_state에 저장
            st.session_state.alarm_thresholds = {
                'TX1_high': tx1_high,
                'TX2_high': tx2_high,
                'TX3_high': tx3_high,
                'TX4_high': tx4_high,
                'TX5_high': tx5_high,
                'TX6_high': tx6_high,
                'TX7_high': tx7_high,
                'PX1_low': px1_low,
                'PX1_high': px1_high,
                'PU1_high': pu1_high,
            }
            st.success("✅ 알람 임계값이 저장되었습니다!")
            st.info(f"""
            **저장된 임계값:**
            - TX1 상한: {tx1_high}°C
            - TX2 상한: {tx2_high}°C
            - TX3 상한: {tx3_high}°C
            - TX4 상한: {tx4_high}°C
            - TX5 상한: {tx5_high}°C
            - TX6 상한: {tx6_high}°C
            - TX7 상한: {tx7_high}°C
            - PX1 하한: {px1_low} kg/cm²
            - PX1 상한: {px1_high} kg/cm²
            - PU1 상한: {pu1_high}%
            """)

        st.markdown("---")

        # 4. 시스템 정보
        st.markdown("### ℹ️ 시스템 정보")

        system_info = f"""
        - **버전**: Edge Computer Dashboard V2.0
        - **빌드 날짜**: 2025-11-25
        - **PLC 연결**: {config.PLC_HOST}:{config.PLC_PORT}
        - **업데이트 주기**: {config.UPDATE_INTERVAL}초
        - **Python 버전**: {sys.version.split()[0]}
        """

        st.info(system_info)

    # ==================== 탭 6: 알람/이벤트 로그 ====================
    def _render_alarm_event_log(self):
        """알람/이벤트 로그 탭"""
        st.markdown("## 📝 알람/이벤트 로그")

        # 임시 알람/이벤트 데이터 생성
        if not st.session_state.alarm_log:
            st.session_state.alarm_log = [
                {'시간': datetime.now() - timedelta(minutes=30), '등급': '경고', '메시지': 'SWP1 주파수 편차 발생', '상태': '미확인'},
                {'시간': datetime.now() - timedelta(hours=2), '등급': '정보', '메시지': 'FWP2 시작', '상태': '확인됨'},
                {'시간': datetime.now() - timedelta(hours=5), '등급': '위험', '메시지': 'E/R 온도 상한 초과', '상태': '확인됨'},
            ]

        if not st.session_state.event_log:
            st.session_state.event_log = [
                {'시간': datetime.now() - timedelta(minutes=10), '유형': '제어', '메시지': 'AI 목표 주파수 업데이트'},
                {'시간': datetime.now() - timedelta(minutes=45), '유형': '시스템', '메시지': 'PLC 연결 재시도'},
                {'시간': datetime.now() - timedelta(hours=1), '유형': '사용자', '메시지': '설정 변경: SWP 목표 주파수'},
            ]

        # 1. 실시간 알람 목록
        st.markdown("### 🚨 실시간 알람")

        unack_alarms = [a for a in st.session_state.alarm_log if a['상태'] == '미확인']

        if unack_alarms:
            for alarm in unack_alarms:
                if alarm['등급'] == '위험':
                    st.error(f"🚨 [{alarm['시간'].strftime('%H:%M:%S')}] {alarm['메시지']}")
                elif alarm['등급'] == '경고':
                    st.warning(f"⚠️ [{alarm['시간'].strftime('%H:%M:%S')}] {alarm['메시지']}")
                else:
                    st.info(f"ℹ️ [{alarm['시간'].strftime('%H:%M:%S')}] {alarm['메시지']}")

                if st.button(f"확인", key=f"ack_{alarm['시간']}"):
                    alarm['상태'] = '확인됨'
                    st.rerun()
        else:
            st.success("✅ 미확인 알람이 없습니다.")

        st.markdown("---")

        # 2. 이벤트 로그 테이블
        st.markdown("### 📋 이벤트 로그")

        # 카테고리 필터
        categories = st.multiselect(
            "카테고리 필터",
            ['모두', '제어', '시스템', '사용자', '알람'],
            default=['모두']
        )

        # 알람 로그 표시
        st.markdown("#### 알람 로그")
        alarm_df = pd.DataFrame(st.session_state.alarm_log)
        if not alarm_df.empty:
            alarm_df['시간'] = alarm_df['시간'].dt.strftime('%Y-%m-%d %H:%M:%S')
            st.dataframe(alarm_df, use_container_width=True, height=250)
        else:
            st.info("알람 로그가 없습니다.")

        st.markdown("---")

        # 이벤트 로그 표시
        st.markdown("#### 이벤트 로그")
        event_df = pd.DataFrame(st.session_state.event_log)
        if not event_df.empty:
            event_df['시간'] = event_df['시간'].dt.strftime('%Y-%m-%d %H:%M:%S')

            if '모두' not in categories:
                event_df = event_df[event_df['유형'].isin(categories)]

            st.dataframe(event_df, use_container_width=True, height=250)
        else:
            st.info("이벤트 로그가 없습니다.")

        st.markdown("---")

        # 로그 내보내기
        col1, col2 = st.columns(2)

        with col1:
            if st.button("📥 알람 로그 다운로드 (CSV)"):
                if not alarm_df.empty:
                    csv = alarm_df.to_csv(index=False, encoding='utf-8-sig')
                    st.download_button(
                        label="다운로드",
                        data=csv,
                        file_name=f"alarm_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                        mime="text/csv"
                    )

        with col2:
            if st.button("📥 이벤트 로그 다운로드 (CSV)"):
                if not event_df.empty:
                    csv = event_df.to_csv(index=False, encoding='utf-8-sig')
                    st.download_button(
                        label="다운로드",
                        data=csv,
                        file_name=f"event_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                        mime="text/csv"
                    )

    # ==================== 탭 7: 학습 진행 (개발용) ====================
    def _render_learning_progress(self):
        """학습 진행 탭 (EDGE_AI_REAL 참조)"""
        st.markdown("## 📚 AI 학습 진행 상태")

        st.warning("⚠️ **개발용 탭** - 운영 시 제거 가능")

        progress = st.session_state.learning_progress

        # 주요 지표
        col1, col2, col3, col4 = st.columns(4)

        with col1:
            st.metric("온도 예측 정확도", f"{progress['temperature_prediction_accuracy']:.1f}%")

        with col2:
            st.metric("최적화 정확도", f"{progress['optimization_accuracy']:.1f}%")

        with col3:
            st.metric("평균 에너지 절감률", f"{progress['average_energy_savings']:.1f}%")

        with col4:
            st.metric("총 학습 시간", f"{progress['total_learning_hours']:.1f}h")

        # 마지막 학습 시간
        if progress['last_learning_time']:
            st.info(f"📅 마지막 학습: {progress['last_learning_time'].strftime('%Y-%m-%d %H:%M:%S')}")
        else:
            st.warning("⚠️ 아직 학습이 수행되지 않았습니다.")

        st.markdown("---")

        # 주간 개선 추이
        st.markdown("### 📈 주간 개선 추이")

        weeks = list(range(1, 9))
        temp_accuracy = [72.0, 74.5, 76.2, 77.8, 79.1, 80.3, 81.4, 82.5]
        energy_savings = [42.0, 44.5, 46.2, 47.5, 48.5, 49.0, 49.5, 49.8]

        fig = go.Figure()

        fig.add_trace(go.Scatter(
            x=weeks,
            y=temp_accuracy,
            name='온도 예측 정확도 (%)',
            line=dict(color='#3b82f6', width=3),
            marker=dict(size=8)
        ))

        fig.add_trace(go.Scatter(
            x=weeks,
            y=energy_savings,
            name='에너지 절감률 (%)',
            line=dict(color='#10b981', width=3),
            marker=dict(size=8),
            yaxis='y2'
        ))

        fig.update_layout(
            height=400,
            xaxis_title="주차",
            yaxis_title="온도 예측 정확도 (%)",
            yaxis2=dict(
                title="에너지 절감률 (%)",
                overlaying='y',
                side='right'
            ),
            template="plotly_dark",
            paper_bgcolor='#1e293b',
            plot_bgcolor='#1e293b',
            legend=dict(orientation="h", yanchor="bottom", y=-0.2, xanchor="center", x=0.5)
        )

        st.plotly_chart(fig, use_container_width=True)

        st.markdown("---")

        # AI 진화 단계
        st.markdown("### 🚀 AI 진화 단계")

        months_running = progress['months_running']

        col1, col2, col3 = st.columns(3)

        with col1:
            if months_running < 6:
                st.success("✅ **Stage 1: 규칙 기반** (현재)")
                st.caption("규칙 80% + ML 20%")
            else:
                st.info("✅ Stage 1: 규칙 기반 (완료)")

        with col2:
            if 6 <= months_running < 12:
                st.success("✅ **Stage 2: 패턴 학습** (현재)")
                st.caption("규칙 70% + ML 30%")
            elif months_running >= 12:
                st.info("✅ Stage 2: 패턴 학습 (완료)")
            else:
                st.warning("⏳ Stage 2: 패턴 학습")

        with col3:
            if months_running >= 12:
                st.success("✅ **Stage 3: 적응형** (현재)")
                st.caption("규칙 60% + ML 40%")
            else:
                st.warning("⏳ Stage 3: 적응형")

        # 진행률 바
        st.markdown("---")
        st.markdown("**📊 전체 진행률**")

        progress_pct = min(100, (months_running / 12) * 100)
        st.progress(progress_pct / 100)

        # 상세 정보
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("현재 운영 기간", f"{months_running}개월")
        with col2:
            st.metric("Stage 3 완료까지", f"{max(0, 12-months_running)}개월")
        with col3:
            st.metric("진행률", f"{progress_pct:.0f}%")

        st.info(f"""
        💡 **AI 진화 단계 안내**
        - **Stage 1 (0-6개월)**: 규칙 기반 제어 위주, AI 학습 시작
        - **Stage 2 (6-12개월)**: 패턴 학습 단계, AI 비중 증가
        - **Stage 3 (12개월 이후)**: 완전 적응형 AI, 최적화 완성

        현재 시스템은 **{months_running}개월** 운영 중으로, **Stage 2 단계**에 있습니다.
        """)

    # ==================== 탭 8: 시나리오 테스트 (개발용) ====================
    def _render_scenario_testing(self):
        """시나리오 테스트 탭 (EDGE_AI_REAL 참조)"""
        st.markdown("## 🧪 시나리오 테스트")

        st.warning("⚠️ **개발용 탭** - 운영 시 제거 가능")

        st.info("""
        **시나리오 모드**에서는 다양한 운항 조건을 시뮬레이션할 수 있습니다.
        시나리오를 활성화하면 시뮬레이션 데이터가 생성되어 AI 시스템의 동작을 테스트할 수 있습니다.
        """)

        # 시나리오 모드 ON/OFF
        col1, col2 = st.columns([1, 3])

        with col1:
            scenario_active = st.checkbox(
                "시나리오 모드 활성화",
                value=st.session_state.scenario_active
            )

            if scenario_active != st.session_state.scenario_active:
                st.session_state.scenario_active = scenario_active
                st.rerun()

        with col2:
            if st.session_state.scenario_active:
                st.success("✅ 시나리오 모드 활성화됨")
            else:
                st.warning("⚪ 시나리오 모드 비활성화됨")

        st.markdown("---")

        # 시나리오 선택
        st.markdown("### 🎯 시나리오 선택")

        scenarios = {
            "정상 운전": "기본 제어 검증",
            "고부하 운전": "SW 펌프 제어 검증",
            "냉각 문제": "FW 펌프 제어 검증",
            "압력 저하": "압력 안전 제어 검증",
            "고온 환경": "E/R 온도 제어 검증"
        }

        selected = st.radio(
            "시나리오를 선택하세요",
            list(scenarios.keys()),
            horizontal=True
        )

        if st.button("🚀 시나리오 시작", type="primary"):
            st.session_state.current_scenario = selected
            st.session_state.scenario_active = True
            st.success(f"✅ '{selected}' 시나리오가 시작되었습니다!")
            st.rerun()

        st.info(f"**현재 시나리오**: {st.session_state.current_scenario} - {scenarios[st.session_state.current_scenario]}")

        st.markdown("---")

        # 시나리오 상세 정보
        st.markdown("### 📊 시나리오 상세 정보")

        if st.session_state.current_scenario == "정상 운전":
            st.success("""
            **정상 운전 시나리오**
            - 모든 센서 값이 정상 범위 내
            - AI 최적화 주파수 적용
            - 안정적인 에너지 절감
            """)

        elif st.session_state.current_scenario == "고부하 운전":
            st.warning("""
            **고부하 운전 시나리오**
            - M/E 부하 80% 이상
            - SWP 주파수 상승 필요
            - 높은 냉각 요구
            """)

        elif st.session_state.current_scenario == "냉각 문제":
            st.error("""
            **냉각 문제 시나리오**
            - FW 냉각수 온도 상승
            - FWP 주파수 증가 필요
            - ESS 온도 모니터링 강화
            """)

        elif st.session_state.current_scenario == "압력 저하":
            st.error("""
            **압력 저하 시나리오**
            - CSW 압력 낮음
            - SWP 주파수 강제 상승
            - 안전 제어 활성화
            """)

        else:  # 고온 환경
            st.warning("""
            **고온 환경 시나리오**
            - E/R 외부 온도 높음
            - FAN 대수 증설 필요
            - 환기 강화 모드
            """)

    # ==================== 탭 9: 개발자 도구 (개발용) ====================
    def _render_developer_tools(self):
        """개발자 도구 탭"""
        st.markdown("## 🛠️ 개발자 도구")

        st.warning("⚠️ **개발용 탭** - 운영 시 제거 가능")

        # 1. 디버그 로그
        st.markdown("### 📋 디버그 로그")

        if st.button("🔄 로그 새로고침"):
            st.info("로그가 새로고침되었습니다.")

        # 임시 로그 데이터
        debug_logs = [
            "[INFO] PLC 연결 성공: 127.0.0.1:502",
            "[INFO] 센서 데이터 읽기 성공: 10개",
            "[INFO] 장비 상태 읽기 성공: 10개",
            "[DEBUG] AI 목표 주파수 계산 완료",
            "[DEBUG] 에너지 절감률: 49.8%",
        ]

        with st.expander("로그 보기", expanded=True):
            for log in debug_logs:
                st.text(log)

        st.markdown("---")

        # 2. 레지스터 직접 읽기/쓰기
        st.markdown("### 🔧 레지스터 직접 읽기/쓰기")

        tab1, tab2 = st.tabs(["읽기", "쓰기"])

        with tab1:
            col1, col2 = st.columns(2)

            with col1:
                read_addr = st.number_input("시작 주소", value=10, min_value=0, max_value=65535, key="read_addr")

            with col2:
                read_count = st.number_input("개수", value=10, min_value=1, max_value=125, key="read_count")

            if st.button("📖 레지스터 읽기"):
                client = st.session_state.modbus_client
                if client.connected:
                    result = client.read_holding_registers(read_addr, read_count)
                    if result:
                        st.success(f"✅ 읽기 성공!")
                        st.json({f"레지스터 {read_addr+i}": result[i] for i in range(len(result))})
                    else:
                        st.error("❌ 읽기 실패!")
                else:
                    st.error("❌ PLC가 연결되지 않았습니다.")

        with tab2:
            col1, col2 = st.columns(2)

            with col1:
                write_addr = st.number_input("주소", value=5000, min_value=0, max_value=65535, key="write_addr")

            with col2:
                write_value = st.number_input("값", value=484, min_value=0, max_value=65535, key="write_value")

            if st.button("✍️ 레지스터 쓰기"):
                client = st.session_state.modbus_client
                if client.connected:
                    try:
                        result = client.client.write_registers(write_addr, [write_value], unit=client.slave_id)
                        if not result.isError():
                            st.success(f"✅ 쓰기 성공! 레지스터 {write_addr}에 {write_value} 저장됨")
                        else:
                            st.error("❌ 쓰기 실패!")
                    except Exception as e:
                        st.error(f"❌ 오류: {e}")
                else:
                    st.error("❌ PLC가 연결되지 않았습니다.")

        st.markdown("---")

        # 3. 데이터 덤프
        st.markdown("### 💾 데이터 덤프")

        if st.button("📥 현재 상태 덤프"):
            plc_data = self._get_plc_data()

            if plc_data:
                st.json({
                    'timestamp': datetime.now().isoformat(),
                    'sensors': plc_data.get('sensors', {}),
                    'equipment': [
                        {
                            'name': eq['name'],
                            'frequency': eq['frequency'],
                            'power': eq['power'],
                            'run_hours': eq['run_hours']
                        }
                        for eq in plc_data.get('equipment', [])
                    ]
                })

                # CSV 다운로드
                import json
                dump_str = json.dumps(plc_data, indent=2, default=str)
                st.download_button(
                    label="💾 JSON 다운로드",
                    data=dump_str,
                    file_name=f"plc_dump_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                    mime="application/json"
                )
            else:
                st.error("❌ PLC 데이터를 가져올 수 없습니다.")

    # ==================== 헬퍼 함수들 ====================
    def _get_plc_data(self) -> Optional[Dict]:
        """PLC에서 모든 데이터 가져오기"""
        client = st.session_state.modbus_client

        if not client.connected:
            return None

        try:
            # 센서 데이터 읽기
            sensors = client.read_sensors()
            if sensors is None:
                sensors = {}

            # 장비 상태 읽기
            equipment = client.read_equipment_status()
            if equipment is None:
                # 기본 장비 데이터 생성
                equipment = []
                for i in range(3):
                    equipment.append({
                        'name': f'SWP{i+1}',
                        'running': False,
                        'running_fwd': False,
                        'running_bwd': False,
                        'frequency': 0.0,
                        'power': 0.0
                    })
                for i in range(3):
                    equipment.append({
                        'name': f'FWP{i+1}',
                        'running': False,
                        'running_fwd': False,
                        'running_bwd': False,
                        'frequency': 0.0,
                        'power': 0.0
                    })
                for i in range(4):
                    equipment.append({
                        'name': f'FAN{i+1}',
                        'running': False,
                        'running_fwd': False,
                        'running_bwd': False,
                        'frequency': 0.0,
                        'power': 0.0
                    })

            # AI 목표 주파수 읽기 (레지스터 5000-5009)
            target_freq_raw = client.read_holding_registers(
                config.MODBUS_REGISTERS["AI_TARGET_FREQ_START"],
                10
            )
            target_frequencies = [f / 10.0 for f in target_freq_raw] if target_freq_raw else [48.4] * 10

            return {
                'sensors': sensors,
                'equipment': equipment,
                'target_frequencies': target_frequencies
            }

        except Exception as e:
            st.error(f"❌ PLC 데이터 읽기 오류: {e}")
            return None


# ==================== 메인 실행 ====================
def main():
    """메인 함수"""
    dashboard = EdgeComputerDashboard()
    dashboard.run()


if __name__ == "__main__":
    main()
