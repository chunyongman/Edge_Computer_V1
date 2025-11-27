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
import csv
import io
import importlib

# Add parent directory to path for imports
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, root_dir)

from modbus_client import EdgeModbusClient
import config
importlib.reload(config)  # config 모듈 reload

# 시나리오 엔진 import
from src.simulation.scenarios import SimulationScenarios, ScenarioType
from src.control.integrated_controller import IntegratedController


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

        # 시나리오 엔진 (session state에서 가져오기)
        self.scenario_engine = st.session_state.scenario_engine

        # IntegratedController 초기화
        if 'integrated_controller' not in st.session_state:
            st.session_state.integrated_controller = IntegratedController()
        self.integrated_controller = st.session_state.integrated_controller

        # VFD 이상 패턴 한글 매핑
        self.anomaly_pattern_names = {
            "MOTOR_OVERTEMP": "⚠️ 모터 과열 (80°C 초과)",
            "MOTOR_TEMP_WARNING": "📊 모터 온도 주의 (예측: 70°C 이상)",
            "HEATSINK_OVERTEMP": "⚠️ 히트싱크 과열",
            "VOLTAGE_LOW": "⚡ 출력 전압 저하",
            "VOLTAGE_HIGH": "⚡ 출력 전압 과다",
            "DC_BUS_ABNORMAL": "🔌 DC 버스 전압 이상",
            "CURRENT_HIGH": "⚡ 전류 과다",
            "VIBRATION_HIGH": "📳 진동 과다",
            "THERMAL_EXCEEDED": "🔥 열 보호 작동",
            "VFD_TRIP": "🛑 VFD 트립",
            "VFD_ERROR": "❌ VFD 오류",
            "TEMP_RISING": "📈 온도 상승 추세 (예측)",
            "CURRENT_UNSTABLE": "⚡ 전류 불안정 (예측)",
        }

    def _apply_custom_css(self):
        """HMI_V1 스타일 CSS 적용"""
        st.markdown("""
        <style>
        /* 전역 배경색 */
        .stApp {
            background-color: #0f172a;
        }

        /* 상단 헤더 영역 */
        header[data-testid="stHeader"] {
            background-color: #0f172a !important;
        }

        /* 상단 툴바 */
        .stApp > header {
            background-color: #0f172a !important;
        }

        /* 메인 컨텐츠 영역 */
        .main .block-container {
            padding-top: 1rem;
            padding-bottom: 2rem;
            background-color: #0f172a;
        }

        /* 메인 영역 전체 */
        section[data-testid="stMain"] {
            background-color: #0f172a;
        }

        /* 사이드바 */
        [data-testid="stSidebar"] {
            background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
        }

        /* 사이드바 콘텐츠 */
        [data-testid="stSidebar"] > div:first-child {
            background-color: transparent !important;
        }

        /* 사이드바 내부 모든 텍스트 */
        [data-testid="stSidebar"] * {
            color: #e2e8f0 !important;
        }

        /* 사이드바 버튼 */
        [data-testid="stSidebar"] button {
            background-color: #3b82f6 !important;
            color: white !important;
            border: none !important;
        }

        /* 사이드바 버튼 호버 */
        [data-testid="stSidebar"] button:hover {
            background-color: #2563eb !important;
        }

        /* 사이드바 마크다운 */
        [data-testid="stSidebar"] .stMarkdown {
            color: #e2e8f0 !important;
        }

        /* 사이드바 라벨 */
        [data-testid="stSidebar"] label {
            color: #e2e8f0 !important;
        }

        /* Selectbox 드롭다운 메뉴 */
        [data-baseweb="popover"] {
            background-color: #1e293b !important;
        }

        [data-baseweb="select"] {
            background-color: #1e293b !important;
        }

        /* Selectbox 옵션 리스트 */
        [role="listbox"] {
            background-color: #1e293b !important;
        }

        /* Selectbox 개별 옵션 */
        [role="option"] {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [role="option"]:hover {
            background-color: #334155 !important;
            color: #ffffff !important;
        }

        /* Selectbox 선택된 옵션 */
        [aria-selected="true"] {
            background-color: #3b82f6 !important;
            color: white !important;
        }

        /* Selectbox 입력 필드 */
        [data-baseweb="select"] > div {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
            border-color: #334155 !important;
        }

        /* Selectbox 화살표 아이콘 */
        [data-baseweb="select"] svg {
            fill: #e2e8f0 !important;
            cursor: pointer !important;
        }

        /* Selectbox 전체 컨테이너 */
        .stSelectbox > div > div {
            background-color: #1e293b !important;
            border: 1px solid #334155 !important;
            cursor: pointer !important;
        }

        /* Selectbox 텍스트 */
        .stSelectbox > div > div > div {
            color: #e2e8f0 !important;
            cursor: pointer !important;
        }

        /* Selectbox 입력 영역 전체 */
        [data-baseweb="select"] {
            cursor: pointer !important;
        }

        [data-baseweb="select"] * {
            cursor: pointer !important;
        }

        /* 데이터프레임 설정 아이콘 */
        .stDataFrame button {
            cursor: pointer !important;
        }

        .stDataFrame svg {
            cursor: pointer !important;
        }

        /* 데이터프레임/테이블 스타일 */
        .stDataFrame {
            background-color: #1e293b !important;
        }

        /* 데이터프레임 테이블 */
        .stDataFrame table {
            background-color: #1e293b !important;
            color: #ffffff !important;
            font-size: 20px !important;
            font-weight: 800 !important;
        }

        /* 데이터프레임 헤더 */
        .stDataFrame thead tr th {
            background-color: #0f172a !important;
            color: #ffffff !important;
            border-bottom: 2px solid #334155 !important;
            font-size: 22px !important;
            font-weight: 900 !important;
            padding: 14px !important;
        }

        /* 데이터프레임 셀 */
        .stDataFrame tbody tr td {
            background-color: #1e293b !important;
            color: #ffffff !important;
            border-bottom: 1px solid #334155 !important;
            font-size: 20px !important;
            font-weight: 800 !important;
            padding: 12px !important;
        }

        /* 데이터프레임 행 호버 */
        .stDataFrame tbody tr:hover td {
            background-color: #334155 !important;
        }

        /* 일반 테이블 */
        table {
            background-color: #1e293b !important;
            color: #ffffff !important;
            font-size: 20px !important;
            font-weight: 800 !important;
        }

        thead {
            background-color: #0f172a !important;
            color: #ffffff !important;
            font-size: 22px !important;
            font-weight: 900 !important;
        }

        tbody {
            background-color: #1e293b !important;
            color: #ffffff !important;
            font-size: 20px !important;
            font-weight: 800 !important;
        }

        th {
            background-color: #0f172a !important;
            color: #ffffff !important;
            border-bottom: 2px solid #334155 !important;
            font-size: 22px !important;
            font-weight: 900 !important;
            padding: 14px !important;
        }

        td {
            background-color: #1e293b !important;
            color: #ffffff !important;
            border-bottom: 1px solid #334155 !important;
            font-size: 20px !important;
            font-weight: 800 !important;
            padding: 12px !important;
        }

        /* 데이터프레임 팝업 메뉴 */
        [data-baseweb="menu"] {
            background-color: #1e293b !important;
        }

        [data-baseweb="list"] {
            background-color: #1e293b !important;
        }

        [data-baseweb="list-item"] {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [data-baseweb="list-item"]:hover {
            background-color: #334155 !important;
        }

        /* 체크박스 */
        [data-baseweb="checkbox"] {
            background-color: #1e293b !important;
        }

        /* 팝업 전체 */
        [role="menu"] {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [role="menuitem"] {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [role="menuitem"]:hover {
            background-color: #334155 !important;
        }

        /* 모든 ul, li */
        ul {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        li {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        li:hover {
            background-color: #334155 !important;
        }

        /* 테이블 내부 모든 요소 강제 스타일 */
        table * {
            color: #ffffff !important;
            font-size: 20px !important;
            font-weight: 800 !important;
        }

        table th * {
            color: #ffffff !important;
            font-size: 22px !important;
            font-weight: 900 !important;
        }

        table td * {
            color: #ffffff !important;
            font-size: 20px !important;
            font-weight: 800 !important;
        }

        /* 배경 강제 스타일 */
        div[data-baseweb] {
            background-color: #1e293b !important;
        }

        /* 팝오버 모든 하위 요소 */
        [data-baseweb="popover"] * {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [data-baseweb="menu"] * {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [data-baseweb="list"] * {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [data-baseweb="list-item"] * {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        /* 모든 svg 아이콘 */
        svg {
            fill: #e2e8f0 !important;
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
        .stTextInput input, .stNumberInput input, .stSelectbox select, .stDateInput input {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
            border: 1px solid #334155 !important;
        }

        /* Date Input 커서 */
        .stDateInput input {
            cursor: pointer !important;
        }

        .stDateInput {
            cursor: pointer !important;
        }

        .stDateInput * {
            cursor: pointer !important;
        }

        /* Date Input 캘린더 아이콘 */
        .stDateInput button {
            background-color: #334155 !important;
            color: #e2e8f0 !important;
            cursor: pointer !important;
        }

        .stDateInput button svg {
            fill: #e2e8f0 !important;
            cursor: pointer !important;
        }

        /* Number Input 증감 버튼 */
        .stNumberInput button {
            background-color: #334155 !important;
            color: #e2e8f0 !important;
            border: 1px solid #475569 !important;
        }

        .stNumberInput button:hover {
            background-color: #475569 !important;
            color: #ffffff !important;
        }

        /* Number Input 증감 버튼 아이콘 (SVG) */
        .stNumberInput button svg {
            fill: #e2e8f0 !important;
        }

        .stNumberInput button:hover svg {
            fill: #ffffff !important;
        }

        /* Expander 스타일 */
        .streamlit-expanderHeader {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
            border-radius: 0.5rem !important;
        }

        .streamlit-expanderContent {
            background-color: #0f172a !important;
            color: #e2e8f0 !important;
            border: 1px solid #334155 !important;
        }

        /* Info/Success/Warning/Error 메시지 */
        .stAlert {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        [data-baseweb="notification"] {
            background-color: #1e293b !important;
            color: #e2e8f0 !important;
        }

        /* Info 메시지 */
        .stInfo, [data-baseweb="notification"][kind="info"] {
            background-color: rgba(59, 130, 246, 0.2) !important;
            border-left: 4px solid #3b82f6 !important;
            color: #e2e8f0 !important;
        }

        /* Success 메시지 */
        .stSuccess, [data-baseweb="notification"][kind="positive"] {
            background-color: rgba(16, 185, 129, 0.2) !important;
            border-left: 4px solid #10b981 !important;
            color: #e2e8f0 !important;
        }

        /* Warning 메시지 */
        .stWarning, [data-baseweb="notification"][kind="warning"] {
            background-color: rgba(251, 191, 36, 0.2) !important;
            border-left: 4px solid #fbbf24 !important;
            color: #e2e8f0 !important;
        }

        /* Error 메시지 */
        .stError, [data-baseweb="notification"][kind="negative"] {
            background-color: rgba(239, 68, 68, 0.2) !important;
            border-left: 4px solid #ef4444 !important;
            color: #e2e8f0 !important;
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

        # 개발용: 시나리오 테스트 (EDGE_AI_REAL 시나리오 엔진 사용)
        if 'scenario_engine' not in st.session_state:
            st.session_state.scenario_engine = SimulationScenarios()

        if 'scenario_history' not in st.session_state:
            st.session_state.scenario_history = {
                'timestamps': [],
                'T1': [], 'T2': [], 'T3': [], 'T4': [], 'T5': [], 'T6': [], 'T7': [],
                'PX1': [], 'engine_load': [],
                'swp_freq': [], 'fwp_freq': [], 'fan_freq': []
            }

        # 시나리오 모드 관련 세션 상태
        if 'use_scenario_data' not in st.session_state:
            st.session_state.use_scenario_data = False

        if 'current_scenario_type' not in st.session_state:
            st.session_state.current_scenario_type = ScenarioType.NORMAL_OPERATION

        if 'current_frequencies' not in st.session_state:
            st.session_state.current_frequencies = {
                'sw_pump': 48.0,
                'fw_pump': 48.0,
                'er_fan': 48.0,
                'er_fan_count': 3,
                'time_at_max_freq': 0,
                'time_at_min_freq': 0
            }

        if 'selected_scenario_label' not in st.session_state:
            st.session_state.selected_scenario_label = "기본 제어 검증"

        # VFD 모니터 초기화 (이상 징후 관리)
        # 모듈 reload하여 최신 코드 반영
        import importlib
        import src.diagnostics.vfd_monitor as vfd_monitor_module
        importlib.reload(vfd_monitor_module)
        from src.diagnostics.vfd_monitor import VFDMonitor

        if 'vfd_monitor' not in st.session_state:
            st.session_state.vfd_monitor = VFDMonitor()
        # cleared_anomalies 속성이 없으면 새 VFDMonitor로 교체 (코드 업데이트 반영)
        elif not hasattr(st.session_state.vfd_monitor, 'cleared_anomalies'):
            st.session_state.vfd_monitor = VFDMonitor()

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

            # PLC 재연결
            st.markdown("#### PLC 연결")
            if st.button("🔄 재연결", use_container_width=True):
                client = st.session_state.modbus_client
                # 기존 연결 끊기
                if client.connected:
                    client.disconnect()
                    time.sleep(0.3)
                # 재연결 시도
                if client.connect():
                    st.success("✅ PLC 재연결 성공!")
                    time.sleep(0.5)
                    st.rerun()
                else:
                    st.error("❌ PLC 연결 실패! PLC Simulator가 실행 중인지 확인하세요.")
                    st.info(f"연결 대상: {client.host}:{client.port}")

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

        # DataFrame 생성 및 Pandas Styler로 다크 테마 적용
        freq_df = self._create_frequency_comparison_table(plc_data)

        # 그룹별 색상 정의
        group_colors = {
            'SWP': {'bg': '#0f4c5c', 'text': '#5eead4'},
            'FWP': {'bg': '#4c1d95', 'text': '#c4b5fd'},
            'FAN': {'bg': '#7c2d12', 'text': '#fdba74'},
            'default': {'bg': '#1e293b', 'text': '#e2e8f0'}
        }

        # HTML 테이블 직접 생성
        html_rows = []
        for idx, row in freq_df.iterrows():
            equipment_name = row['장비명']
            # 그룹 색상 결정
            if 'SWP' in equipment_name:
                colors = group_colors['SWP']
            elif 'FWP' in equipment_name:
                colors = group_colors['FWP']
            elif 'FAN' in equipment_name:
                colors = group_colors['FAN']
            else:
                colors = group_colors['default']

            bg = colors['bg']
            txt = colors['text']

            # 각 셀 생성
            cells = []
            for col in freq_df.columns:
                val = row[col]
                cell_bg = bg
                cell_txt = txt
                font_weight = 'normal'

                # 상태 컬럼 특별 처리
                if col == '상태':
                    if "정상" in str(val):
                        cell_bg = '#064e3b'
                        cell_txt = '#10b981'
                        font_weight = 'bold'
                    elif "편차" in str(val):
                        cell_bg = '#78350f'
                        cell_txt = '#fbbf24'
                        font_weight = 'bold'

                # 편차 컬럼 특별 처리
                elif col == '편차 (Hz)':
                    try:
                        v = float(str(val).replace('+', ''))
                        if v > 0:
                            cell_bg = '#7f1d1d'
                            cell_txt = '#fca5a5'
                            font_weight = 'bold'
                        elif v < 0:
                            cell_bg = '#1e3a5f'
                            cell_txt = '#93c5fd'
                            font_weight = 'bold'
                    except:
                        pass

                # 장비명/목표주파수 볼드
                if col in ['장비명', '목표 주파수 (Hz)']:
                    font_weight = 'bold'

                cells.append(f'<td style="background-color:{cell_bg};color:{cell_txt};font-weight:{font_weight};text-align:center;padding:6px;font-size:11px;border-bottom:1px solid #334155">{val}</td>')

            html_rows.append(f'<tr>{"".join(cells)}</tr>')

        # 헤더 생성
        header_cells = ''.join([f'<th style="background-color:#1e40af;color:white;font-weight:bold;text-align:center;padding:8px;font-size:11px;border-bottom:2px solid #3b82f6">{col}</th>' for col in freq_df.columns])

        html_table = f'''
        <table style="width:100%;border-collapse:collapse;margin-bottom:10px">
            <thead><tr>{header_cells}</tr></thead>
            <tbody>{"".join(html_rows)}</tbody>
        </table>
        '''

        st.markdown(html_table, unsafe_allow_html=True)

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

        # HTML 테이블 시작 (다크 테마)
        html = """
        <div style="background-color: #1e293b; border-radius: 12px; padding: 4px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.4);">
        <table style="width: 100%; border-collapse: collapse; background-color: #1e293b;">
            <thead>
                <tr style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
                    <th style="color: white; padding: 16px 12px; text-align: center; font-size: 1.1rem; font-weight: 700;">장비명</th>
                    <th style="color: white; padding: 16px 12px; text-align: center; font-size: 1.1rem; font-weight: 700;">목표 주파수 (Hz)</th>
                    <th style="color: white; padding: 16px 12px; text-align: center; font-size: 1.1rem; font-weight: 700;">실제 주파수 (Hz)</th>
                    <th style="color: white; padding: 16px 12px; text-align: center; font-size: 1.1rem; font-weight: 700;">편차 (Hz)</th>
                    <th style="color: white; padding: 16px 12px; text-align: center; font-size: 1.1rem; font-weight: 700;">전력 (kW)</th>
                    <th style="color: white; padding: 16px 12px; text-align: center; font-size: 1.1rem; font-weight: 700;">상태</th>
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
                status_color = "#10b981"
            else:
                target = target_freq[i] if i < len(target_freq) else 48.4
                deviation = actual_freq - target
                if abs(deviation) < 2.0:
                    status = "✅ 정상"
                    status_color = "#10b981"
                else:
                    status = "⚠️ 편차 큼"
                    status_color = "#f59e0b"

            # 편차 색상 (양수: 빨강, 음수: 파랑, 0: 흰색)
            if deviation > 0:
                dev_color = "#ef4444"
            elif deviation < 0:
                dev_color = "#3b82f6"
            else:
                dev_color = "#94a3b8"

            html += f"""
                <tr style="border-bottom: 1px solid #334155;">
                    <td style="background-color: #1e293b; color: #60a5fa; padding: 14px 12px; text-align: center; font-size: 1.05rem; font-weight: 600;">{name}</td>
                    <td style="background-color: #1e293b; color: #fbbf24; padding: 14px 12px; text-align: center; font-size: 1.05rem; font-weight: 600;">{target:.1f}</td>
                    <td style="background-color: #1e293b; color: #e2e8f0; padding: 14px 12px; text-align: center; font-size: 1.05rem; font-weight: 500;">{actual_freq:.1f}</td>
                    <td style="background-color: #1e293b; color: {dev_color}; padding: 14px 12px; text-align: center; font-size: 1.05rem; font-weight: 600;">{deviation:+.1f}</td>
                    <td style="background-color: #1e293b; color: #a78bfa; padding: 14px 12px; text-align: center; font-size: 1.05rem; font-weight: 500;">{eq['power']:.1f}</td>
                    <td style="background-color: #1e293b; color: {status_color}; padding: 14px 12px; text-align: center; font-size: 1.05rem; font-weight: 600;">{status}</td>
                </tr>
            """

        html += """
            </tbody>
        </table>
        </div>
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

        # 장비별 상세 분석 테이블 스타일 적용
        def style_detail_row(row):
            """장비별 테이블 행 스타일"""
            equipment_name = row['장비명']
            # SWP 그룹: 청록색 계열
            if 'SWP' in equipment_name:
                bg_color = '#0f4c5c'
                text_color = '#5eead4'
            # FWP 그룹: 보라색 계열
            elif 'FWP' in equipment_name:
                bg_color = '#4c1d95'
                text_color = '#c4b5fd'
            # FAN 그룹: 주황색 계열
            elif 'FAN' in equipment_name:
                bg_color = '#7c2d12'
                text_color = '#fdba74'
            else:
                bg_color = '#1e293b'
                text_color = '#e2e8f0'

            return [f'background-color: {bg_color}; color: {text_color}; font-size: 11px'] * len(row)

        styled_detail_df = detail_df.style.apply(
            style_detail_row, axis=1
        ).set_table_styles([
            {'selector': 'th', 'props': [
                ('background-color', '#1e40af'),
                ('color', 'white'),
                ('font-weight', 'bold'),
                ('text-align', 'center'),
                ('padding', '8px'),
                ('font-size', '11px'),
                ('border-bottom', '2px solid #3b82f6')
            ]},
            {'selector': 'td', 'props': [
                ('text-align', 'center'),
                ('padding', '6px'),
                ('font-size', '11px'),
                ('border-bottom', '1px solid #334155')
            ]}
        ])

        st.write(styled_detail_df.to_html(escape=False), unsafe_allow_html=True)

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
                        # 건강도에 따른 색상 (VFDMonitor 등급과 일치)
                        # health_score = 100 - severity_score 이므로:
                        # severity 0-20 (normal) → health 80-100
                        # severity 21-50 (caution) → health 50-79
                        # severity 51-75 (warning) → health 25-49
                        # severity 76-100 (critical) → health 0-24
                        if vfd['health_score'] >= 80:
                            color = "#10b981"  # 녹색
                            status = "정상"
                        elif vfd['health_score'] >= 50:
                            color = "#9e9e9e"  # 회색
                            status = "주의"
                        elif vfd['health_score'] >= 25:
                            color = "#ff9800"  # 주황색
                            status = "경고"
                        else:
                            color = "#f44336"  # 빨간색
                            status = "위험"

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

        # 해제 버튼 스타일 (주황색)
        st.markdown("""
        <style>
        div[data-testid="column"]:has(button[kind="secondary"]) button {
            background-color: #ff6b35 !important;
            border-color: #ff6b35 !important;
            color: white !important;
        }
        div[data-testid="column"]:has(button[kind="secondary"]) button:hover {
            background-color: #e55a2b !important;
            border-color: #e55a2b !important;
        }
        </style>
        """, unsafe_allow_html=True)

        # health_score < 80 = severity_score > 20 (정상이 아닌 모든 것)
        # is_cleared가 True인 VFD는 이상 징후 목록에서 제외 (건강도 카드에는 표시)
        warnings = [vfd for vfd in vfd_diagnostics if vfd['health_score'] < 80 and not vfd.get('is_cleared', False)]

        if warnings:
            for vfd in warnings:
                vfd_id = vfd.get('id') or vfd.get('vfd_id') or vfd.get('name')
                is_acknowledged = vfd.get('is_acknowledged', False)

                # 확인된 경우 노란색 배경
                if is_acknowledged:
                    color_style = "background-color: rgba(255, 193, 7, 0.15); border-left: 4px solid #ffc107;"
                    ack_status = " ✓ 확인됨"
                else:
                    color_style = ""
                    ack_status = ""

                col1, col2 = st.columns([6, 1])

                with col1:
                    # health_score 기준: 80-100(정상), 50-79(주의), 25-49(경고), 0-24(위험)
                    if vfd['health_score'] >= 50:
                        st.markdown(f"<div style='padding: 10px; {color_style}'>⚠️ **{vfd['name']}**: 건강도 {vfd['health_score']} (주의) - {vfd['warning_message']}{ack_status}</div>", unsafe_allow_html=True)
                    elif vfd['health_score'] >= 25:
                        st.markdown(f"<div style='padding: 10px; {color_style}'>🟠 **{vfd['name']}**: 건강도 {vfd['health_score']} (경고) - {vfd['warning_message']}{ack_status}</div>", unsafe_allow_html=True)
                    else:
                        st.markdown(f"<div style='padding: 10px; {color_style}'>🔴 **{vfd['name']}**: 건강도 {vfd['health_score']} (위험) - {vfd['warning_message']}{ack_status}</div>", unsafe_allow_html=True)

                with col2:
                    # 확인/해제 버튼을 같은 위치에 표시
                    if not is_acknowledged:
                        if st.button("✓ 확인", key=f"ack_{vfd_id}", type="primary"):  # 파란색
                            # VFD Monitor에서 확인 처리
                            if hasattr(st.session_state, 'vfd_monitor') and st.session_state.vfd_monitor:
                                monitor = st.session_state.vfd_monitor
                                # active_anomalies에 없으면 먼저 등록
                                if vfd_id not in monitor.active_anomalies:
                                    from src.diagnostics.vfd_monitor import VFDDiagnostic, DanfossStatusBits, VFDStatus
                                    from datetime import datetime
                                    status_bits = DanfossStatusBits(
                                        trip=False, error=False, warning=True,
                                        voltage_exceeded=False, torque_exceeded=False, thermal_exceeded=False,
                                        control_ready=True, drive_ready=True, in_operation=True, speed_equals_reference=True, bus_control=True
                                    )
                                    diag = VFDDiagnostic(
                                        timestamp=datetime.now(), vfd_id=vfd_id, status_bits=status_bits,
                                        current_frequency_hz=0, output_current_a=0, output_voltage_v=380,
                                        dc_bus_voltage_v=540, motor_temperature_c=50, heatsink_temperature_c=45,
                                        status_grade=VFDStatus.CAUTION, severity_score=30, anomaly_patterns=["이상 징후"],
                                        recommendation="점검 필요", cumulative_runtime_hours=0, trip_count=0, error_count=0, warning_count=0
                                    )
                                    monitor.active_anomalies[vfd_id] = diag
                                monitor.acknowledge_anomaly(vfd_id)
                                st.rerun()
                    else:
                        if st.button("✕ 해제", key=f"clear_{vfd_id}", type="secondary"):  # 회색
                            # VFD Monitor에서 해제 처리
                            if hasattr(st.session_state, 'vfd_monitor') and st.session_state.vfd_monitor:
                                monitor = st.session_state.vfd_monitor
                                # active_anomalies에 있어야 해제 가능
                                if vfd_id in monitor.active_anomalies:
                                    monitor.clear_anomaly(vfd_id)
                                else:
                                    # active_anomalies에 없어도 cleared_anomalies에 추가
                                    monitor.cleared_anomalies.add(vfd_id)
                                st.rerun()
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
            # 실시간 운전 데이터
            st.markdown("#### 🔧 실시간 운전 데이터")
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                st.metric("주파수", f"{vfd_detail.get('current_frequency_hz', 0):.1f} Hz")
                st.metric("모터 온도", f"{vfd_detail['avg_temp']:.1f} °C")

            with col2:
                st.metric("출력 전류", f"{vfd_detail.get('output_current_a', 0):.1f} A")
                st.metric("히트싱크 온도", f"{vfd_detail.get('heatsink_temperature_c', 0):.1f} °C")

            with col3:
                st.metric("출력 전압", f"{vfd_detail.get('output_voltage_v', 0):.0f} V")
                st.metric("DC 버스 전압", f"{vfd_detail.get('dc_bus_voltage_v', 0):.0f} V")

            with col4:
                st.metric("운전 시간", f"{vfd_detail['run_hours']:.1f} h")
                st.metric("트립 횟수", f"{vfd_detail['start_count']} 회")

            st.markdown("---")

            # 예측 분석
            st.markdown("#### 🔮 예측 분석")
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                trend_icon = {"rising": "↑", "stable": "→", "falling": "↓"}.get(vfd_detail.get('temp_trend', 'stable'), '→')
                st.metric("30분 후 예측 온도", f"{vfd_detail.get('predicted_temp_30min', 0):.1f} °C")
                st.metric("온도 트렌드", f"{trend_icon} {vfd_detail.get('temp_trend', 'stable')}")

            with col2:
                st.metric("온도 상승률", f"{vfd_detail.get('temp_rise_rate', 0):.3f} °C/min")
                st.metric("이상 점수", f"{vfd_detail.get('anomaly_score', 0):.1f}")

            with col3:
                st.metric("수명 잔여율", f"{vfd_detail.get('remaining_life_percent', 100):.1f} %")
                st.metric("정비 예상", vfd_detail['next_maintenance'])

            with col4:
                status_color = {
                    'normal': '🟢',
                    'caution': '🟡',
                    'warning': '🟠',
                    'critical': '🔴'
                }.get(vfd_detail.get('status_grade', 'normal'), '⚪')
                st.metric("상태 등급", f"{status_color} {vfd_detail.get('status_grade', 'normal')}")
                st.metric("심각도 점수", f"{vfd_detail.get('severity_score', 0)}/100")

            # 이상 패턴 표시
            anomaly_patterns = vfd_detail.get('anomaly_patterns', [])
            if anomaly_patterns:
                st.markdown("---")
                st.markdown("#### ⚠️ 감지된 패턴")
                for pattern in anomaly_patterns:
                    # 한글 패턴 이름 가져오기
                    pattern_name = self.anomaly_pattern_names.get(pattern, f"⚠️ {pattern}")

                    # 예측 패턴은 경고로, 실제 문제는 에러로 표시
                    if "예측" in pattern_name or "주의" in pattern_name:
                        st.warning(f"🔔 {pattern_name}")
                    else:
                        st.error(f"🔴 {pattern_name}")
            else:
                st.markdown("---")
                st.success("✅ 이상 패턴 없음 - 정상 운전 중")

            # 온도 예측 그래프
            st.markdown("#### 📈 온도 예측 (현재 → 30분 후)")

            current_temp = vfd_detail['avg_temp']
            predicted_temp = vfd_detail.get('predicted_temp_30min', current_temp)
            temp_rise_rate = vfd_detail.get('temp_rise_rate', 0)

            # 현재부터 30분 후까지 선형 예측
            minutes = list(range(0, 35, 5))  # 0, 5, 10, 15, 20, 25, 30분
            predicted_temps = [current_temp + (temp_rise_rate * m) for m in minutes]

            fig = go.Figure()

            # 예측 온도 라인
            fig.add_trace(go.Scatter(
                x=minutes,
                y=predicted_temps,
                mode='lines+markers',
                name='예측 온도',
                line=dict(color='#3b82f6', width=3),
                marker=dict(size=8)
            ))

            # 현재 온도 강조
            fig.add_trace(go.Scatter(
                x=[0],
                y=[current_temp],
                mode='markers',
                name='현재 온도',
                marker=dict(size=15, color='#10b981', symbol='star')
            ))

            # 30분 후 예측 온도 강조
            fig.add_trace(go.Scatter(
                x=[30],
                y=[predicted_temp],
                mode='markers',
                name='30분 후 예측',
                marker=dict(size=15, color='#ef4444', symbol='diamond')
            ))

            fig.add_hline(y=80, line_dash="dash", line_color="#f59e0b", annotation_text="경고 온도 (80°C)")
            fig.add_hline(y=90, line_dash="dash", line_color="#ef4444", annotation_text="위험 온도 (90°C)")

            fig.update_layout(
                height=350,
                xaxis_title="시간 (분)",
                yaxis_title="온도 (°C)",
                template="plotly_dark",
                paper_bgcolor='#1e293b',
                plot_bgcolor='#1e293b',
                showlegend=True,
                legend=dict(
                    orientation="h",
                    yanchor="bottom",
                    y=1.02,
                    xanchor="right",
                    x=1
                )
            )

            st.plotly_chart(fig, use_container_width=True)

            # 권고사항
            st.markdown("---")
            st.markdown("#### 💡 권고사항")
            st.info(vfd_detail['recommended_action'])

        st.markdown("---")

        # 4. 이상 징후 히스토리
        st.markdown("### 📜 이상 징후 히스토리")

        if hasattr(st.session_state, 'vfd_monitor') and st.session_state.vfd_monitor:
            history = st.session_state.vfd_monitor.get_anomaly_history(limit=50)

            if history:
                history_data = []
                for diag in history:
                    eq_name = diag.vfd_id.replace("SW_PUMP_", "SWP").replace("FW_PUMP_", "FWP").replace("ER_FAN_", "FAN")

                    status_text = "정상" if diag.status_grade.value == "normal" else \
                                  "주의" if diag.status_grade.value == "caution" else \
                                  "경고" if diag.status_grade.value == "warning" else "위험"

                    ack_text = "✓" if diag.is_acknowledged else "✗"
                    cleared_text = "✓" if diag.is_cleared else "진행중"

                    history_data.append({
                        "시간": diag.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
                        "장비": eq_name,
                        "상태": status_text,
                        "건강도": 100 - diag.severity_score,
                        "이상패턴": ", ".join(diag.anomaly_patterns) if diag.anomaly_patterns else "-",
                        "확인": ack_text,
                        "해제": cleared_text,
                        "권고사항": diag.recommendation
                    })

                df_history = pd.DataFrame(history_data)
                st.dataframe(df_history, use_container_width=True, height=400)
            else:
                st.info("📋 이상 징후 히스토리가 없습니다.")
        else:
            st.warning("⚠️ VFD Monitor가 초기화되지 않았습니다.")

    def _get_vfd_diagnostics_data(self, plc_data: Dict) -> List[Dict]:
        """VFD 진단 데이터 조회 (Edge AI 공유 파일 우선)"""
        import json
        from pathlib import Path

        # 1. Edge AI 공유 파일 확인
        shared_file = Path("C:/shared/vfd_diagnostics.json")
        if shared_file.exists():
            try:
                with open(shared_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)

                vfd_diagnostics_data = data.get("vfd_diagnostics", {})
                diagnostics = []

                for vfd_id, vfd_data in vfd_diagnostics_data.items():
                    # VFD ID를 장비 이름으로 변환 (SW_PUMP_1 -> SWP1)
                    eq_name = vfd_id.replace("SW_PUMP_", "SWP").replace("FW_PUMP_", "FWP").replace("ER_FAN_", "FAN")

                    # 건강도 점수 계산 (100 - severity_score)
                    severity_score = vfd_data.get("severity_score", 0)
                    health_score = 100 - severity_score

                    # 정비 우선순위에 따른 메시지
                    maintenance_priority = vfd_data.get("maintenance_priority", 0)
                    anomaly_patterns = vfd_data.get("anomaly_patterns", [])

                    if maintenance_priority == 5:
                        warning = "즉시 점검 필요: " + ", ".join(anomaly_patterns) if anomaly_patterns else "위험 상태"
                        priority = "높음"
                        action = "즉시 정밀 점검 필요"
                    elif maintenance_priority == 3:
                        warning = "1주일 내 점검: " + ", ".join(anomaly_patterns) if anomaly_patterns else "경고"
                        priority = "중간"
                        action = "1주일 내 점검 권장"
                    elif maintenance_priority == 1:
                        warning = "정기 점검 예정"
                        priority = "낮음"
                        action = "정기 점검"
                    else:
                        warning = "정상 운전 중"
                        priority = "낮음"
                        action = "정상"

                    # 활성 이상 징후 확인 및 관리
                    is_acknowledged = False
                    is_cleared = False
                    if hasattr(st.session_state, 'vfd_monitor') and st.session_state.vfd_monitor:
                        vfd_monitor = st.session_state.vfd_monitor

                        # 해제된 VFD는 건너뛰기
                        if vfd_id in vfd_monitor.cleared_anomalies:
                            is_cleared = True
                        else:
                            # 이상 상태인데 active_anomalies에 없으면 자동 등록
                            status_grade = vfd_data.get('status_grade', 'normal')
                            if status_grade != 'normal' and vfd_id not in vfd_monitor.active_anomalies:
                                # 간단한 VFDDiagnostic 객체 생성하여 등록
                                from src.diagnostics.vfd_monitor import VFDDiagnostic, DanfossStatusBits, VFDStatus
                                from datetime import datetime
                                status_bits = DanfossStatusBits(
                                    trip=False, error=False, warning=status_grade in ['warning', 'critical'],
                                    voltage_exceeded=False, torque_exceeded=False, thermal_exceeded=False,
                                    control_ready=True, drive_ready=True, in_operation=True, speed_equals_reference=True, bus_control=True
                                )
                                diag = VFDDiagnostic(
                                    timestamp=datetime.now(), vfd_id=vfd_id, status_bits=status_bits,
                                    current_frequency_hz=vfd_data.get('current_frequency_hz', 0),
                                    output_current_a=vfd_data.get('output_current_a', 0),
                                    output_voltage_v=vfd_data.get('output_voltage_v', 380),
                                    dc_bus_voltage_v=vfd_data.get('dc_bus_voltage_v', 540),
                                    motor_temperature_c=vfd_data.get('motor_temperature_c', 50),
                                    heatsink_temperature_c=vfd_data.get('heatsink_temperature_c', 45),
                                    status_grade=VFDStatus(status_grade) if status_grade in ['normal', 'caution', 'warning', 'critical'] else VFDStatus.CAUTION,
                                    severity_score=severity_score, anomaly_patterns=anomaly_patterns,
                                    recommendation="점검 필요", cumulative_runtime_hours=0, trip_count=0, error_count=0, warning_count=0
                                )
                                vfd_monitor.active_anomalies[vfd_id] = diag

                            # 이상 상태 확인
                            anomaly_status = vfd_monitor.get_anomaly_status(vfd_id)
                            if anomaly_status:
                                is_acknowledged = anomaly_status.is_acknowledged

                    # is_cleared 플래그를 데이터에 포함 (이상 징후 탐지 섹션에서만 필터링)
                    diagnostics.append({
                        'id': vfd_id,  # ID 필드 추가
                        'name': eq_name,
                        'vfd_id': vfd_id,
                        'health_score': health_score,
                        'warning_message': warning,
                        'next_maintenance': f"{vfd_data.get('estimated_days_to_maintenance', 90)}일 후",
                        'recommended_action': action,
                        'priority': priority,
                        'run_hours': vfd_data.get('cumulative_runtime_hours', 0),
                        'avg_temp': vfd_data.get('motor_temperature_c', 0),
                        'max_temp': vfd_data.get('motor_temperature_c', 0) + 5,
                        'vibration': 0.5,  # TODO: 실제 진동 데이터
                        'start_count': vfd_data.get('trip_count', 0),
                        # Edge AI 고급 데이터
                        'predicted_temp_30min': vfd_data.get('predicted_temp_30min', 0),
                        'temp_rise_rate': vfd_data.get('temp_rise_rate', 0),
                        'temp_trend': vfd_data.get('temp_trend', 'stable'),
                        'remaining_life_percent': vfd_data.get('remaining_life_percent', 100),
                        'anomaly_score': vfd_data.get('anomaly_score', 0),
                        'anomaly_patterns': anomaly_patterns,
                        'severity_score': severity_score,
                        'status_grade': vfd_data.get('status_grade', 'normal'),
                        'current_frequency_hz': vfd_data.get('current_frequency_hz', 0),
                        'output_current_a': vfd_data.get('output_current_a', 0),
                        'output_voltage_v': vfd_data.get('output_voltage_v', 0),
                        'dc_bus_voltage_v': vfd_data.get('dc_bus_voltage_v', 0),
                        'heatsink_temperature_c': vfd_data.get('heatsink_temperature_c', 0),
                        # 이상 징후 관리
                        'is_acknowledged': is_acknowledged,
                        'is_cleared': is_cleared,  # 해제 여부 (이상 징후 목록에서만 필터링용)
                    })

                return diagnostics

            except Exception as e:
                st.warning(f"⚠️ Edge AI VFD 데이터 읽기 실패: {e}")

        # 2. Edge AI 파일이 없으면 임시 데이터 생성
        equipment = plc_data.get('equipment', [])
        diagnostics = []
        vfd_diagnostics_for_file = {}  # HMI와 공유할 파일 데이터

        for i, eq in enumerate(equipment):
            eq_name = eq.get('name', '')

            # VFD ID 생성
            if "SWP" in eq_name:
                vfd_id = eq_name.replace("SWP", "SW_PUMP_")
            elif "FWP" in eq_name:
                vfd_id = eq_name.replace("FWP", "FW_PUMP_")
            elif "FAN" in eq_name:
                vfd_id = eq_name.replace("FAN", "ER_FAN_")
            else:
                vfd_id = eq_name

            # 임시 건강도 점수 생성
            base_score = 85
            score_variation = (i * 7) % 30
            health_score = base_score - score_variation
            severity_score = 100 - health_score

            # 경고 메시지
            if health_score >= 80:
                warning = "정상 운전 중"
                priority = "낮음"
                next_maint = f"{(100 - health_score) * 10}일 후"
                action = "정기 점검"
                status_grade = "normal"
                anomaly_patterns = []
            elif health_score >= 60:
                warning = "온도 상승 감지"
                priority = "중간"
                next_maint = f"{(80 - health_score) * 5}일 후"
                action = "냉각 시스템 점검 권장"
                status_grade = "caution"
                anomaly_patterns = ["MOTOR_TEMP_WARNING"]
            else:
                warning = "비정상 진동 감지"
                priority = "높음"
                next_maint = "7일 이내"
                action = "즉시 정밀 점검 필요"
                status_grade = "warning"
                anomaly_patterns = ["VIBRATION_HIGH"]

            diagnostics.append({
                'id': vfd_id,
                'name': eq_name,
                'vfd_id': vfd_id,
                'health_score': health_score,
                'warning_message': warning,
                'next_maintenance': next_maint,
                'recommended_action': action,
                'priority': priority,
                'run_hours': eq.get('run_hours', 5000),
                'avg_temp': 65.0 + (i * 3) % 15,
                'max_temp': 75.0 + (i * 3) % 15,
                'vibration': 0.5 + (i * 0.2) % 1.5,
                'start_count': 1200 + (i * 150),
                'severity_score': severity_score,
                'status_grade': status_grade,
                'anomaly_patterns': anomaly_patterns,
            })

            # 파일 저장용 데이터 구성
            vfd_diagnostics_for_file[vfd_id] = {
                "vfd_id": vfd_id,
                "severity_score": severity_score,
                "status_grade": status_grade,
                "anomaly_patterns": anomaly_patterns,
                "recommendation": action,
                "motor_temperature_c": 65.0 + (i * 3) % 15,
                "heatsink_temperature_c": 50.0 + (i * 2) % 10,
                "current_frequency_hz": eq.get('frequency', 0),
                "output_current_a": 0,
                "output_voltage_v": 380,
                "dc_bus_voltage_v": 540,
                "cumulative_runtime_hours": eq.get('run_hours', 5000),
                "maintenance_priority": 5 if health_score < 50 else (3 if health_score < 80 else 0),
                "estimated_days_to_maintenance": int(next_maint.replace("일 후", "").replace("일 이내", "7")) if "일" in next_maint else 90,
            }

        # HMI와 공유하기 위해 파일에 저장
        try:
            shared_dir = Path("C:/shared")
            shared_dir.mkdir(parents=True, exist_ok=True)
            shared_file = shared_dir / "vfd_diagnostics.json"

            file_data = {
                "timestamp": datetime.now().isoformat(),
                "vfd_count": len(vfd_diagnostics_for_file),
                "vfd_diagnostics": vfd_diagnostics_for_file,
                "source": "dashboard_fallback"
            }

            with open(shared_file, 'w', encoding='utf-8') as f:
                json.dump(file_data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            pass  # 파일 저장 실패는 무시

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
            {'센서': 'PX1', '설명': 'CSW PP Disc Press', '값': f"{sensors.get('PX1', 0):.2f} kg/cm²", '상태': '✅ 정상'},
            {'센서': 'PU1', '설명': 'M/E Load', '값': f"{sensors.get('PU1', 0):.1f} %", '상태': '✅ 정상'},
        ]

        sensor_df = pd.DataFrame(sensor_data)

        # 센서 테이블 스타일 적용
        def style_sensor_row(row):
            """센서 테이블 행 스타일"""
            sensor_name = row['센서']
            # TX 센서: 청록색 계열
            if sensor_name.startswith('TX'):
                bg_color = '#0f4c5c'
                text_color = '#5eead4'
            # PX 센서: 보라색 계열
            elif sensor_name.startswith('PX'):
                bg_color = '#4c1d95'
                text_color = '#c4b5fd'
            # PU 센서: 주황색 계열
            elif sensor_name.startswith('PU'):
                bg_color = '#7c2d12'
                text_color = '#fdba74'
            else:
                bg_color = '#1e293b'
                text_color = '#e2e8f0'

            return [f'background-color: {bg_color}; color: {text_color}; font-size: 11px'] * len(row)

        styled_sensor_df = sensor_df.style.apply(
            style_sensor_row, axis=1
        ).set_table_styles([
            {'selector': 'th', 'props': [
                ('background-color', '#1e40af'),
                ('color', 'white'),
                ('font-weight', 'bold'),
                ('text-align', 'center'),
                ('padding', '8px'),
                ('font-size', '11px'),
                ('border-bottom', '2px solid #3b82f6')
            ]},
            {'selector': 'td', 'props': [
                ('text-align', 'center'),
                ('padding', '6px'),
                ('font-size', '11px'),
                ('border-bottom', '1px solid #334155')
            ]}
        ])

        st.write(styled_sensor_df.to_html(escape=False), unsafe_allow_html=True)

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

        # 중앙 정렬 컨테이너
        _, center_col, _ = st.columns([0.1, 0.8, 0.1])

        with center_col:
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

        _, center_col2, _ = st.columns([0.1, 0.8, 0.1])

        with center_col2:
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

        # 3. 모터 용량 설정
        st.markdown("### ⚡ 모터 용량 설정")

        _, center_col3, _ = st.columns([0.1, 0.8, 0.1])

        with center_col3:
            st.info("ℹ️ 모터 용량을 변경하면 전체 시스템의 절감량/절감률이 재계산됩니다.")

            col1, col2, col3 = st.columns(3)

            # session_state 초기화
            if 'motor_capacity' not in st.session_state:
                st.session_state.motor_capacity = config.MOTOR_CAPACITY.copy()

            with col1:
                st.markdown("#### 💧 SWP 모터 용량")
                new_swp_capacity = st.number_input(
                    "Sea Water Pump (kW)",
                    value=st.session_state.motor_capacity.get("SWP", 132.0),
                    min_value=10.0,
                    max_value=500.0,
                    step=1.0,
                    help="해수 펌프 모터의 정격 용량을 입력하세요."
                )

            with col2:
                st.markdown("#### 💦 FWP 모터 용량")
                new_fwp_capacity = st.number_input(
                    "Fresh Water Pump (kW)",
                    value=st.session_state.motor_capacity.get("FWP", 75.0),
                    min_value=10.0,
                    max_value=500.0,
                    step=1.0,
                    help="청수 펌프 모터의 정격 용량을 입력하세요."
                )

            with col3:
                st.markdown("#### 🌪️ FAN 모터 용량")
                new_fan_capacity = st.number_input(
                    "E/R Fan (kW)",
                    value=st.session_state.motor_capacity.get("FAN", 54.3),
                    min_value=10.0,
                    max_value=500.0,
                    step=0.1,
                    help="기관실 환기팬 모터의 정격 용량을 입력하세요."
                )

            if st.button("💾 모터 용량 저장 및 시스템 재계산"):
                new_capacity = {
                    "SWP": new_swp_capacity,
                    "FWP": new_fwp_capacity,
                    "FAN": new_fan_capacity,
                }

                # config 파일에 저장
                if config.save_motor_capacity(new_capacity):
                    st.session_state.motor_capacity = new_capacity.copy()

                    # config 모듈 reload
                    importlib.reload(config)

                    st.success(f"""
                    ✅ 모터 용량이 저장되었습니다!
                    - SWP: {new_swp_capacity:.1f} kW
                    - FWP: {new_fwp_capacity:.1f} kW
                    - FAN: {new_fan_capacity:.1f} kW

                🔄 시스템 재시작 시 새로운 용량이 적용됩니다.
                    """)
                else:
                    st.error("❌ 모터 용량 저장에 실패했습니다.")

            # 현재 적용 중인 모터 용량 표시
            st.markdown("##### 📌 현재 적용 중인 모터 용량")
            current_col1, current_col2, current_col3 = st.columns(3)
            with current_col1:
                st.metric("SWP", f"{config.MOTOR_CAPACITY['SWP']:.1f} kW")
            with current_col2:
                st.metric("FWP", f"{config.MOTOR_CAPACITY['FWP']:.1f} kW")
            with current_col3:
                st.metric("FAN", f"{config.MOTOR_CAPACITY['FAN']:.1f} kW")

        st.markdown("---")

        # 4. 전기요금 단가 설정
        st.markdown("### 💰 전기요금 단가 설정")

        _, center_col4, _ = st.columns([0.1, 0.8, 0.1])

        with center_col4:
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

        # 5. 알람 임계값 설정
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

        _, center_col5, _ = st.columns([0.1, 0.8, 0.1])

        with center_col5:
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

            if st.button("💾 알람 임계값 PLC로 전송"):
                # PLC에 쓰기 (레지스터 7000-7009)
                try:
                    # 임계값을 PLC 포맷으로 변환
                    threshold_values = [
                        int(tx1_high * 10),    # TX1: °C × 10
                        int(tx2_high * 10),    # TX2: °C × 10
                        int(tx3_high * 10),    # TX3: °C × 10
                        int(tx4_high * 10),    # TX4: °C × 10
                        int(tx5_high * 10),    # TX5: °C × 10
                        int(tx6_high * 10),    # TX6: °C × 10
                        int(tx7_high * 10),    # TX7: °C × 10
                        int(px1_low * 100),    # PX1 하한: kg/cm² × 100
                        int(px1_high * 100),   # PX1 상한: kg/cm² × 100
                        int(pu1_high * 10),    # PU1: % × 10
                    ]

                    # PLC 쓰기
                    client = st.session_state.modbus_client
                    success = client.write_holding_registers(7000, threshold_values)

                    if success:
                        # session_state에도 저장
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
                        st.success("✅ 알람 임계값이 PLC로 전송되었습니다!")
                        st.info(f"""
                **전송된 임계값:**
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
                    else:
                        st.error("❌ PLC로 임계값 전송 실패! PLC 연결을 확인하세요.")

                except Exception as e:
                    st.error(f"❌ PLC 쓰기 오류: {e}")
                    st.warning("PLC 연결을 확인하세요.")

        st.markdown("---")

        # 4. 시스템 정보
        _, center_col6, _ = st.columns([0.1, 0.8, 0.1])

        with center_col6:
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

        # 1. 조회 조건
        st.markdown("### 🔍 조회 조건")

        col1, col2, col3, col4 = st.columns(4)

        with col1:
            # 날짜 범위
            start_date = st.date_input(
                "시작 날짜",
                value=datetime.now().date() - timedelta(days=7)
            )

        with col2:
            end_date = st.date_input(
                "종료 날짜",
                value=datetime.now().date()
            )

        with col3:
            # 센서 필터
            sensor_filter = st.selectbox(
                "센서",
                ["전체", "TX1", "TX2", "TX3", "TX4", "TX5", "TX6", "TX7", "PX1_LOW", "PX1_HIGH", "PU1"]
            )

        with col4:
            # 알람 타입 필터
            alarm_type_filter = st.selectbox(
                "알람 타입",
                ["전체", "HIGH", "LOW"]
            )

        # 2. CSV 파일에서 알람 데이터 읽기
        logs_dir = "../../logs"  # dashboard.py 기준 상대 경로
        all_alarms = []

        # 날짜 범위의 모든 CSV 파일 읽기
        current_date = datetime.combine(start_date, datetime.min.time())
        end_date_dt = datetime.combine(end_date, datetime.min.time())

        while current_date <= end_date_dt:
            date_str = current_date.strftime("%Y%m%d")
            csv_file = os.path.join(logs_dir, f"alarm_{date_str}.csv")

            if os.path.exists(csv_file):
                try:
                    with open(csv_file, 'r', encoding='utf-8') as f:
                        reader = csv.DictReader(f)
                        for row in reader:
                            all_alarms.append(row)
                except Exception as e:
                    st.error(f"CSV 읽기 오류 ({csv_file}): {e}")

            current_date += timedelta(days=1)

        # 3. 필터링
        filtered_alarms = all_alarms

        if sensor_filter != "전체":
            filtered_alarms = [a for a in filtered_alarms if a.get('sensor_id') == sensor_filter]

        if alarm_type_filter != "전체":
            filtered_alarms = [a for a in filtered_alarms if a.get('alarm_type') == alarm_type_filter]

        # 4. 실시간 알람 (미확인 알람)
        st.markdown("### 🚨 실시간 알람 (미확인)")

        unack_alarms = [a for a in filtered_alarms if a.get('status') == '미확인']

        if unack_alarms:
            st.warning(f"⚠️ 미확인 알람: {len(unack_alarms)}개")

            # 최근 5개만 표시
            for alarm in unack_alarms[:5]:
                sensor_id = alarm.get('sensor_id', 'N/A')
                alarm_type = alarm.get('alarm_type', 'N/A')
                sensor_value = alarm.get('sensor_value', 'N/A')
                threshold = alarm.get('threshold', 'N/A')
                timestamp = alarm.get('timestamp', 'N/A')

                st.error(f"🚨 [{timestamp}] **{sensor_id}** - {alarm_type} (값: {sensor_value}, 임계값: {threshold})")
        else:
            st.success("✅ 미확인 알람이 없습니다.")

        st.markdown("---")

        # 5. 알람 로그 테이블
        st.markdown("### 📋 알람 로그")

        if filtered_alarms:
            # DataFrame 생성
            alarm_df = pd.DataFrame(filtered_alarms)

            # 컬럼 순서 및 이름 정리
            column_order = ['timestamp', 'sensor_id', 'alarm_type', 'sensor_value', 'threshold', 'status']
            alarm_df = alarm_df[column_order]

            # 컬럼명 한글화
            alarm_df.columns = ['시간', '센서', '타입', '센서값', '임계값', '상태']

            # 정렬 (최신순)
            alarm_df = alarm_df.sort_values('시간', ascending=False)

            # 통계
            st.info(f"📊 총 **{len(alarm_df)}**개 알람 조회됨")

            # 테이블 표시
            st.dataframe(alarm_df, use_container_width=True, height=400)
        else:
            st.info("조회된 알람이 없습니다.")

        st.markdown("---")

        # 6. 알람 통계
        st.markdown("### 📊 알람 통계")

        if filtered_alarms:
            col1, col2, col3 = st.columns(3)

            with col1:
                st.metric("전체 알람", len(filtered_alarms))

            with col2:
                unack_count = len([a for a in filtered_alarms if a.get('status') == '미확인'])
                st.metric("미확인 알람", unack_count)

            with col3:
                ack_count = len([a for a in filtered_alarms if a.get('status') == '확인됨'])
                st.metric("확인된 알람", ack_count)

            # 센서별 통계
            st.markdown("#### 센서별 알람 발생 횟수")
            sensor_counts = {}
            for alarm in filtered_alarms:
                sensor = alarm.get('sensor_id', 'UNKNOWN')
                sensor_counts[sensor] = sensor_counts.get(sensor, 0) + 1

            sensor_stats_df = pd.DataFrame(
                list(sensor_counts.items()),
                columns=['센서', '발생 횟수']
            ).sort_values('발생 횟수', ascending=False)

            st.dataframe(sensor_stats_df, use_container_width=True, height=200)

        st.markdown("---")

        # 7. 로그 다운로드
        col1, col2 = st.columns(2)

        with col1:
            if st.button("📥 조회된 알람 CSV 다운로드"):
                if filtered_alarms:
                    csv_output = io.StringIO()
                    fieldnames = ['timestamp', 'sensor_id', 'alarm_type', 'sensor_value', 'threshold', 'status', 'ack_timestamp']
                    writer = csv.DictWriter(csv_output, fieldnames=fieldnames)
                    writer.writeheader()
                    writer.writerows(filtered_alarms)

                    st.download_button(
                        label="다운로드",
                        data=csv_output.getvalue(),
                        file_name=f"alarm_export_{start_date.strftime('%Y%m%d')}_{end_date.strftime('%Y%m%d')}.csv",
                        mime="text/csv"
                    )
                else:
                    st.warning("다운로드할 알람이 없습니다.")

        with col2:
            if st.button("🔄 새로고침"):
                st.rerun()

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
        """시나리오 테스트 렌더링"""
        st.header("🎬 시나리오 테스트")

        st.info("""
        **시나리오 모드**에서는 다양한 운항 조건을 시뮬레이션할 수 있습니다.
        시나리오를 활성화하면 **메인 대시보드의 센서 값이 시나리오 데이터로 변경**되며,
        **Rule-based AI 시스템**이 실시간으로 어떤 규칙을 적용하는지 확인할 수 있습니다.
        """)

        # 시나리오 모드 ON/OFF
        col1, col2 = st.columns([1, 3])

        with col1:
            use_scenario = st.checkbox(
                "시나리오 모드 활성화",
                value=st.session_state.use_scenario_data,
                key="scenario_mode_toggle"
            )

            if use_scenario != st.session_state.use_scenario_data:
                st.session_state.use_scenario_data = use_scenario
                st.rerun()

        with col2:
            if st.session_state.use_scenario_data:
                st.success("✅ 시나리오 모드 활성화됨 - 메인 대시보드에서 실시간 변화를 확인하세요!")
            else:
                st.warning("⚪ 시나리오 모드 비활성화됨 - 고정 시뮬레이션 데이터 사용 중")

        st.markdown("---")

        # 시나리오 선택 버튼
        st.subheader("🎯 시나리오 선택")

        # 시나리오 속도 조절
        col_speed1, col_speed2, col_speed3 = st.columns([2, 3, 6])

        with col_speed1:
            st.markdown("**⚡ 재생 속도**")

        with col_speed2:
            speed_options = {
                "0.5배속 (느림)": 0.5,
                "1배속 (정상)": 1.0,
                "2배속": 2.0,
                "5배속": 5.0,
                "10배속 (빠름)": 10.0
            }

            # 최초 렌더링 시 기본값을 10배속으로 설정
            if "speed_selector" not in st.session_state:
                st.session_state.speed_selector = "10배속 (빠름)"
                st.session_state.speed_multiplier = 10.0
                self.scenario_engine.set_time_multiplier(10.0)

            selected_speed = st.selectbox(
                "속도 선택",
                options=list(speed_options.keys()),
                key="speed_selector",
                label_visibility="collapsed"
            )

            new_speed = speed_options[selected_speed]
            previous_speed = st.session_state.get("speed_multiplier", new_speed)
            if abs(new_speed - previous_speed) > 0.001:
                self.scenario_engine.set_time_multiplier(new_speed)
                st.session_state.speed_multiplier = new_speed
                st.rerun()  # 즉시 화면 새로고침

        with col_speed3:
            display_speed = st.session_state.get("speed_multiplier", speed_options[selected_speed])
            if display_speed > 1.0:
                st.info(f"⏩ {display_speed:.1f}배 빠른 속도로 진행 중")
            elif display_speed < 1.0:
                st.info(f"⏪ {display_speed:.1f}배 느린 속도로 진행 중")
            else:
                st.info("▶️ 정상 속도로 진행 중")

        st.markdown("---")

        # 현재 선택된 시나리오 타입
        current = st.session_state.current_scenario_type

        # 라디오 버튼으로 변경 (한 줄 표시 보장)
        scenario_options = {
            "기본 제어 검증": ScenarioType.NORMAL_OPERATION,
            "SW 펌프 제어 검증": ScenarioType.HIGH_LOAD,
            "FW 펌프 제어 검증": ScenarioType.COOLING_FAILURE,
            "압력 안전 제어 검증": ScenarioType.PRESSURE_DROP,
            "E/R 온도 제어 검증": ScenarioType.ER_VENTILATION
        }

        # 현재 선택된 옵션 찾기
        current_label = None
        for label, stype in scenario_options.items():
            if current == stype:
                current_label = label
                break

        # 세션 상태 초기화 또는 유효성 검증
        if 'selected_scenario_label' not in st.session_state or st.session_state.selected_scenario_label not in scenario_options:
            st.session_state.selected_scenario_label = current_label

        # 라디오 버튼으로 시나리오 선택
        selected_index = list(scenario_options.keys()).index(st.session_state.selected_scenario_label) if st.session_state.selected_scenario_label in scenario_options else 0

        col_radio, col_button = st.columns([4, 1])

        with col_radio:
            selected = st.radio(
                "시나리오를 선택하세요",
                options=list(scenario_options.keys()),
                index=selected_index,
                horizontal=True,
                label_visibility="collapsed"
            )

        with col_button:
            st.write("")  # 버튼 정렬을 위한 공백
            start_button = st.button("🚀 시작", type="primary", use_container_width=True)

        # 선택이 변경되면 선택만 업데이트 (시작 버튼으로 실행)
        if selected != st.session_state.selected_scenario_label:
            st.session_state.selected_scenario_label = selected

        # 시작 버튼 클릭 시 시나리오 시작
        if start_button:
            self.scenario_engine.start_scenario(scenario_options[selected])
            st.session_state.use_scenario_data = True
            st.session_state.current_scenario_type = scenario_options[selected]
            # 주파수 및 대수 초기화
            st.session_state.current_frequencies = {
                'sw_pump': 48.0,
                'fw_pump': 48.0,
                'er_fan': 48.0,  # 47.0 → 48.0 (일관성)
                'er_fan_count': 3,  # 2 → 3 (E/R 팬 기본 3대)
                'time_at_max_freq': 0,  # 60Hz 유지 시간 (초)
                'time_at_min_freq': 0   # 40Hz 유지 시간 (초)
            }
            # RuleBasedController 리셋
            self.integrated_controller.rule_controller.reset()
            st.rerun()

        # 선택 안내 메시지
        if current == ScenarioType.NORMAL_OPERATION:
            st.info("✅ 기본 제어 검증 시나리오 실행 중")
        elif current == ScenarioType.HIGH_LOAD:
            st.info("✅ SW 펌프 제어 검증 시나리오 실행 중")
        elif current == ScenarioType.COOLING_FAILURE:
            st.warning("⚠️ FW 펌프 제어 검증 시나리오 실행 중")
        elif current == ScenarioType.PRESSURE_DROP:
            st.warning("⚠️ 압력 안전 제어 검증 시나리오 실행 중")
        elif current == ScenarioType.ER_VENTILATION:
            st.warning("⚠️ E/R 온도 제어 검증 시나리오 실행 중")

        st.markdown("---")

        # 현재 시나리오 정보
        st.subheader("📊 현재 시나리오 상태")

        info = self.scenario_engine.get_scenario_info()

        if info:
            col1, col2, col3 = st.columns(3)

            with col1:
                st.metric("시나리오", info['name'])
                st.caption(info['description'])

            with col2:
                progress_pct = float(info['progress'].replace('%', ''))
                st.metric("진행률", info['progress'])
                st.progress(progress_pct / 100.0)

            with col3:
                st.metric("경과 시간", f"{info['elapsed_seconds']:.0f}초")
                remaining = info['duration_minutes'] * 60 - info['elapsed_seconds']
                st.caption(f"남은 시간: {remaining:.0f}초")

            # 완료 여부
            if info['is_complete']:
                st.success("✅ 시나리오 완료!")
                st.info("👆 상단에서 다른 시나리오를 선택하거나 '기본 제어 검증'을 선택하세요.")
        else:
            st.info("시나리오를 선택해주세요.")

        st.markdown("---")

        # 현재 센서 값 (시나리오 활성화 시)
        if st.session_state.use_scenario_data:
            st.subheader("🌡️ 현재 센서 값 & AI 판단")

            values = self.scenario_engine.get_current_values()

            # 메인 대시보드와 동일한 IntegratedController 사용
            controller = self.integrated_controller

            # 현재 주파수 및 대수 (세션 상태에 저장하여 추적)
            # 강제로 er_fan_count를 3대로 리셋 (기존 2대 세션 상태 무시)
            if 'current_frequencies' not in st.session_state:
                st.session_state.current_frequencies = {
                    'sw_pump': 48.0,
                    'fw_pump': 48.0,
                    'er_fan': 47.0,
                    'er_fan_count': 3,  # E/R 팬 작동 대수 (기본 3대)
                    'time_at_max_freq': 0,  # 60Hz 유지 시간 (초)
                    'time_at_min_freq': 0   # 40Hz 유지 시간 (초)
                }

            # 기존 세션에서 er_fan_count가 2대로 설정되어 있으면 3대로 강제 변경
            if st.session_state.current_frequencies.get('er_fan_count', 3) == 2:
                st.session_state.current_frequencies['er_fan_count'] = 3

            current_freqs = st.session_state.current_frequencies

            # AI 판단 실행
            temperatures = {
                'T1': values['T1'],
                'T2': values['T2'],
                'T3': values['T3'],
                'T4': values['T4'],
                'T5': values['T5'],
                'T6': values['T6'],
                'T7': values['T7']
            }

            # 온도 시퀀스 업데이트 (예측 제어용)
            controller.update_temperature_sequence(temperatures, values['engine_load'])

            # 디버깅: 입력 값 출력
            st.info(f"🔍 디버그: T6={values['T6']:.1f}°C, 현재 E/R 팬={current_freqs['er_fan']:.1f}Hz ({current_freqs.get('er_fan_count', 3)}대)")

            decision = controller.compute_control(
                temperatures=temperatures,
                pressure=values['PX1'],
                engine_load=values['engine_load'],
                current_frequencies=current_freqs
            )

            # 디버깅: 출력 값 확인
            st.info(f"🔍 AI 판단 결과: E/R 팬={decision.er_fan_freq:.1f}Hz → Reason: {decision.reason}")

            # 예측 제어 정보 표시
            if decision.use_predictive_control and decision.temperature_prediction:
                pred = decision.temperature_prediction
                # 디버그: 타입 확인
                try:
                    t4_val = float(pred.t4_pred_10min)
                    t5_val = float(pred.t5_pred_10min)
                    t6_val = float(pred.t6_pred_10min)
                    conf_val = float(pred.confidence * 100)
                    st.success(f"🔮 예측 제어 활성: T4={t4_val:.1f}°C, T5={t5_val:.1f}°C, T6={t6_val:.1f}°C (10분 후 예측, 신뢰도: {conf_val:.0f}%)")
                except Exception as e:
                    st.error(f"❌ 예측 값 포맷팅 오류: {e}")
                    st.write(f"Debug - T4 type: {type(pred.t4_pred_10min)}, value: {pred.t4_pred_10min}")

            # AI 판단을 현재 주파수 및 대수에 반영
            st.session_state.current_frequencies['sw_pump'] = decision.sw_pump_freq
            st.session_state.current_frequencies['fw_pump'] = decision.fw_pump_freq
            st.session_state.current_frequencies['er_fan'] = decision.er_fan_freq
            st.session_state.current_frequencies['er_fan_count'] = getattr(decision, 'er_fan_count', 3)
            # 타이머는 integrated_controller가 current_freqs에 직접 업데이트했으므로 이미 반영됨

            # 디버깅: 타이머 상태 표시
            timer_max = current_freqs.get('time_at_max_freq', 0)
            timer_min = current_freqs.get('time_at_min_freq', 0)
            st.info(f"🕐 타이머 상태: 최대={timer_max}s, 최소={timer_min}s")

            # 시나리오별 강조 표시 플래그
            is_er_scenario = (st.session_state.current_scenario_type == ScenarioType.ER_VENTILATION)
            is_sw_scenario = (st.session_state.current_scenario_type == ScenarioType.HIGH_LOAD)
            is_fw_scenario = (st.session_state.current_scenario_type == ScenarioType.COOLING_FAILURE)
            is_pressure_scenario = (st.session_state.current_scenario_type == ScenarioType.PRESSURE_DROP)

            col1, col2, col3, col4, col5 = st.columns(5)

            with col1:
                delta_t5 = values['T5'] - 35.0
                if is_sw_scenario:
                    # SW 펌프 시나리오에서 T5 강조
                    st.markdown("""
                    <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(102,126,234,0.3);'>
                        <p style='color: white; font-size: 14px; margin: 0; font-weight: 600;'>⭐ T5 (FW 출구)</p>
                        <p style='color: white; font-size: 36px; margin: 10px 0; font-weight: 700;'>{:.1f}°C</p>
                        <p style='color: {}; font-size: 16px; margin: 0; font-weight: 600;'>{:+.1f}°C</p>
                    </div>
                    """.format(values['T5'],
                              '#ff6b6b' if delta_t5 > 0 else '#51cf66',
                              delta_t5), unsafe_allow_html=True)
                else:
                    st.metric("T5 (FW 출구)", f"{values['T5']:.1f}°C",
                             f"{delta_t5:+.1f}°C",
                             delta_color="inverse" if delta_t5 > 0 else "normal")

            with col2:
                delta_t4 = values['T4'] - 43.0  # T4 정상 범위 중심
                if is_fw_scenario:
                    # FW 펌프 시나리오에서 T4 강조
                    st.markdown("""
                    <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(102,126,234,0.3);'>
                        <p style='color: white; font-size: 14px; margin: 0; font-weight: 600;'>⭐ T4 (FW 입구)</p>
                        <p style='color: white; font-size: 36px; margin: 10px 0; font-weight: 700;'>{:.1f}°C</p>
                        <p style='color: {}; font-size: 16px; margin: 0; font-weight: 600;'>{:+.1f}°C</p>
                    </div>
                    """.format(values['T4'],
                              '#ff6b6b' if delta_t4 > 0 else '#51cf66',
                              delta_t4), unsafe_allow_html=True)
                else:
                    st.metric("T4 (FW 입구)", f"{values['T4']:.1f}°C",
                             f"{delta_t4:+.1f}°C",
                             delta_color="inverse" if delta_t4 > 0 else "normal")

            with col3:
                delta_t6 = values['T6'] - 43.0
                if is_er_scenario:
                    # E/R 시나리오에서 T6 강조
                    st.markdown("""
                    <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(102,126,234,0.3);'>
                        <p style='color: white; font-size: 14px; margin: 0; font-weight: 600;'>⭐ T6 (E/R 온도)</p>
                        <p style='color: white; font-size: 36px; margin: 10px 0; font-weight: 700;'>{:.1f}°C</p>
                        <p style='color: {}; font-size: 16px; margin: 0; font-weight: 600;'>{:+.1f}°C</p>
                    </div>
                    """.format(values['T6'],
                              '#ff6b6b' if delta_t6 > 0 else '#51cf66',
                              delta_t6), unsafe_allow_html=True)
                else:
                    st.metric("T6 (E/R 온도)", f"{values['T6']:.1f}°C",
                             f"{delta_t6:+.1f}°C",
                             delta_color="inverse" if delta_t6 > 0 else "normal")

            with col4:
                delta_px = values['PX1'] - 2.0
                if is_pressure_scenario:
                    # 압력 시나리오에서 PX1 강조
                    st.markdown("""
                    <div style='background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(240,147,251,0.3);'>
                        <p style='color: white; font-size: 14px; margin: 0; font-weight: 600;'>⭐ PX1 (압력)</p>
                        <p style='color: white; font-size: 36px; margin: 10px 0; font-weight: 700;'>{:.2f} bar</p>
                        <p style='color: {}; font-size: 16px; margin: 0; font-weight: 600;'>{:+.2f} bar</p>
                    </div>
                    """.format(values['PX1'],
                              '#51cf66' if delta_px > 0 else '#ff6b6b',
                              delta_px), unsafe_allow_html=True)
                else:
                    st.metric("PX1 (압력)", f"{values['PX1']:.2f} bar",
                             f"{delta_px:+.2f}",
                             delta_color="inverse" if delta_px < 0 else "normal")

            with col5:
                st.metric("엔진 부하", f"{values['engine_load']:.1f}%")

            # Rule-based AI 제어 판단 표시
            st.markdown("---")
            st.markdown("### 🤖 Rule-based AI 제어 판단")

            # 제어 상태 표시 (시나리오별)
            if is_sw_scenario:
                ml_used = hasattr(decision, 'ml_prediction_used') and decision.ml_prediction_used
                if ml_used:
                    st.success("🤖 **제어 방식**: ML 온도 예측 (T5 선제 대응) + Rule R1 강화 보정 (60Hz/40Hz 가속) - 핵심 에너지 절감 기능!")
                else:
                    st.warning("📐 **제어 방식**: Rule 기반 제어 (ML 데이터 축적 중...)")
            elif is_fw_scenario:
                ml_used = hasattr(decision, 'ml_prediction_used') and decision.ml_prediction_used
                if ml_used:
                    st.success("🤖 **제어 방식**: ML 온도 예측 + Rule R2 3단계 제어 (극한 에너지 절감) - T4<48°C일 때 최대한 40Hz 운전!")
                else:
                    st.warning("📐 **제어 방식**: Rule 기반 제어 (ML 데이터 축적 중...)")
            elif is_pressure_scenario:
                if decision.control_mode == "pressure_constraint":
                    st.error("⛔ **제어 방식**: Safety Layer S3 압력 보호 - PX1 < 1.0 bar → SW 펌프 감속 차단!")
                else:
                    st.info("📊 **제어 방식**: 압력 모니터링 중 (PX1 ≥ 1.0 bar → 정상)")

            # 적용된 규칙 표시
            if hasattr(decision, 'applied_rules') and decision.applied_rules:
                with st.expander("📋 적용된 규칙 보기", expanded=False):
                    for rule in decision.applied_rules:
                        if rule.startswith('S'):  # Safety rules
                            st.error(f"🚨 {rule}")
                        elif rule.startswith('R'):  # Optimization rules
                            st.info(f"⚙️ {rule}")
                        elif rule == 'ML_PREDICTION':
                            st.success(f"🤖 {rule}: ML 모델 예측 사용 (선제적 주파수 조정)")
                        else:
                            st.text(f"• {rule}")

            # 제어 모드에 따른 알림 표시
            if decision.emergency_action:
                st.error(f"🚨 긴급 제어 발동: {decision.reason}")
            elif decision.control_mode == "pressure_constraint":
                st.warning(f"⚠️ 압력 제약 활성: {decision.reason}")
            elif values['T5'] > 37.0 or values['T6'] > 45.0:
                st.warning(f"⚠️ 온도 상승 감지: {decision.reason}")
            else:
                st.success(f"✅ 정상 제어: {decision.reason}")

            # AI 판단 결과 (목표 주파수)
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                freq_change = decision.sw_pump_freq - current_freqs['sw_pump']
                if is_sw_scenario or is_pressure_scenario:
                    # SW 펌프 시나리오 또는 압력 시나리오에서 주파수 강조
                    change_color = '#ff6b6b' if freq_change > 0 else ('#51cf66' if freq_change < 0 else '#ffd93d')
                    gradient_bg = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' if is_sw_scenario else 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    text_color = '#333' if is_sw_scenario else 'white'
                    change_text_color = change_color if is_sw_scenario else 'white'
                    st.markdown(f"""
                    <div style='background: {gradient_bg};
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(250,112,154,0.3);'>
                        <p style='color: {text_color}; font-size: 14px; margin: 0; font-weight: 600;'>⭐ SW 펌프 목표</p>
                        <p style='color: {text_color}; font-size: 36px; margin: 10px 0; font-weight: 700;'>{decision.sw_pump_freq:.1f} Hz</p>
                        <p style='color: {change_text_color}; font-size: 16px; margin: 0; font-weight: 600;'>{freq_change:+.1f} Hz</p>
                    </div>
                    """, unsafe_allow_html=True)
                else:
                    # 압력 제약이 활성화된 경우 특별 표시
                    if decision.control_mode == "pressure_constraint":
                        st.metric("SW 펌프 목표", f"{decision.sw_pump_freq:.1f} Hz",
                                 "⛔ 감소 제한", delta_color="off")
                    elif decision.sw_pump_freq >= 60.0 and decision.emergency_action:
                        st.metric("SW 펌프 목표", f"{decision.sw_pump_freq:.1f} Hz",
                                 "🚨 최대!", delta_color="inverse")
                    elif abs(freq_change) >= 0.1:
                        st.metric("SW 펌프 목표", f"{decision.sw_pump_freq:.1f} Hz", f"{freq_change:+.1f} Hz")
                    else:
                        st.metric("SW 펌프 목표", f"{decision.sw_pump_freq:.1f} Hz")

            with col2:
                freq_change = decision.fw_pump_freq - current_freqs['fw_pump']
                if is_fw_scenario:
                    # FW 펌프 시나리오에서 주파수 강조
                    change_color = '#ff6b6b' if freq_change > 0 else ('#51cf66' if freq_change < 0 else '#ffd93d')
                    st.markdown("""
                    <div style='background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(250,112,154,0.3);'>
                        <p style='color: #333; font-size: 14px; margin: 0; font-weight: 600;'>⭐ FW 펌프 목표</p>
                        <p style='color: #333; font-size: 36px; margin: 10px 0; font-weight: 700;'>{:.1f} Hz</p>
                        <p style='color: {}; font-size: 16px; margin: 0; font-weight: 600;'>{:+.1f} Hz</p>
                    </div>
                    """.format(decision.fw_pump_freq, change_color, freq_change), unsafe_allow_html=True)
                else:
                    if decision.fw_pump_freq >= 60.0 and decision.emergency_action:
                        st.metric("FW 펌프 목표", f"{decision.fw_pump_freq:.1f} Hz",
                                 "🚨 최대!", delta_color="inverse")
                    elif abs(freq_change) >= 0.1:
                        st.metric("FW 펌프 목표", f"{decision.fw_pump_freq:.1f} Hz", f"{freq_change:+.1f} Hz")
                    else:
                        st.metric("FW 펌프 목표", f"{decision.fw_pump_freq:.1f} Hz")

            with col3:
                freq_change = decision.er_fan_freq - current_freqs['er_fan']
                fan_count = getattr(decision, 'er_fan_count', 2)

                if is_er_scenario:
                    # E/R 시나리오에서 팬 목표 강조
                    change_color = '#ff6b6b' if freq_change > 0 else ('#51cf66' if freq_change < 0 else '#ffd93d')
                    st.markdown("""
                    <div style='background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                                padding: 20px; border-radius: 10px; text-align: center;
                                box-shadow: 0 8px 16px rgba(250,112,154,0.3);'>
                        <p style='color: #333; font-size: 14px; margin: 0; font-weight: 600;'>⭐ E/R 팬 목표</p>
                        <p style='color: #333; font-size: 36px; margin: 10px 0; font-weight: 700;'>{:.1f} Hz</p>
                        <p style='color: #333; font-size: 20px; margin: 5px 0; font-weight: 600;'>({:}대)</p>
                        <p style='color: {}; font-size: 16px; margin: 0; font-weight: 600;'>{:+.1f} Hz</p>
                    </div>
                    """.format(decision.er_fan_freq, fan_count, change_color, freq_change), unsafe_allow_html=True)
                else:
                    if abs(freq_change) >= 0.1:
                        st.metric("E/R 팬 목표", f"{decision.er_fan_freq:.1f} Hz ({fan_count}대)", f"{freq_change:+.1f} Hz")
                    else:
                        st.metric("E/R 팬 목표", f"{decision.er_fan_freq:.1f} Hz ({fan_count}대)")

            with col4:
                st.metric("제어 모드", decision.control_mode)

            # 압력 제약 특별 표시
            if values['PX1'] < 1.0:
                st.error("⛔ **압력 제약 조건 활성**: PX1 < 1.0 bar → SW 펌프 주파수 감소 제한")
                st.info(f"현재 압력: {values['PX1']:.2f} bar → AI가 SW 펌프 주파수를 {decision.sw_pump_freq:.1f} Hz로 유지 (감소 불가)")

            # 대수 변경 메시지
            if hasattr(decision, 'count_change_reason') and decision.count_change_reason:
                st.info(f"🔄 **대수 제어**: {decision.count_change_reason}")

            # 추가 센서
            st.markdown("### 추가 센서")
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                st.metric("T1 (SW 입구)", f"{values['T1']:.1f}°C")
            with col2:
                st.metric("T2 (SW 출구 1)", f"{values['T2']:.1f}°C")
            with col3:
                st.metric("T3 (SW 출구 2)", f"{values['T3']:.1f}°C")
            with col4:
                st.metric("T7 (외기)", f"{values['T7']:.1f}°C")

        st.markdown("---")

        # 시나리오 설명
        st.subheader("📖 시나리오 설명")

        scenario_descriptions = {
            "기본 제어 검증": {
                "조건": "열대 해역, 75% 엔진 부하",
                "예상 온도": "T5=33°C, T6=43°C (정상 범위)",
                "예상 압력": "PX1=2.0 bar (정상)",
                "AI 대응": "현재 상태 유지, 효율 최적화"
            },
            "고부하 제어 검증": {
                "조건": "고속 항해, 95% 엔진 부하",
                "예상 온도": "T5=35°C, T6=46°C (점진적 상승)",
                "예상 압력": "PX1=2.0 bar",
                "AI 대응": "펌프/팬 증속으로 냉각 강화"
            },
            "냉각기 과열 보호 검증": {
                "조건": "냉각 성능 저하",
                "예상 온도": "T5=40°C, T6=52°C (급격한 상승)",
                "예상 압력": "PX1=2.0 bar",
                "AI 대응": "최대 냉각, 알람 발생"
            },
            "압력 안전 제어 검증": {
                "조건": "SW 펌프 압력 저하 (2분간 2.0→0.7bar)",
                "예상 온도": "T5=33°C (낮음, 정상이면 감속 가능)",
                "예상 압력": "PX1: 2.0 → 1.5 (1분) → 0.7 (2분)",
                "AI 대응": "1.0bar 통과 후 주파수 감소 금지 (안전 제약)"
            },
            "E/R 온도 제어 검증": {
                "조건": "기관실 환기 불량 (T6만 상승)",
                "예상 온도": "T6: 43°C → 48°C (7분간 점진적 상승), 기타 온도 정상",
                "예상 압력": "PX1=2.0 bar (정상)",
                "AI 대응": "E/R 팬 주파수/대수 증가로 기관실 냉각"
            }
        }

        for scenario_name, desc in scenario_descriptions.items():
            with st.expander(f"📌 {scenario_name}"):
                st.write(f"**조건**: {desc['조건']}")
                st.write(f"**예상 온도**: {desc['예상 온도']}")
                st.write(f"**예상 압력**: {desc['예상 압력']}")
                st.write(f"**AI 대응**: {desc['AI 대응']}")

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
