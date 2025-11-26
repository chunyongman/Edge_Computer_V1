"""
Edge Computer API Server (더미)
실제 API는 HMI_V1/backend/main.py에서 제공
"""

def start_api_server(host="0.0.0.0", port=8000):
    """API 서버 시작 (더미 함수 - 실제로는 아무것도 하지 않음)"""
    import logging
    logger = logging.getLogger(__name__)
    logger.info(f"[API] API 서버 비활성화 (HMI_V1 백엔드 사용)")
    # 실제 API 서버는 HMI_V1/backend/main.py에서 8001 포트로 실행됨
    pass
