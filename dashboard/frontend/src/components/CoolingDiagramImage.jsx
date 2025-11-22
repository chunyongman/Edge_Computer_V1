import React, { useState } from 'react'
import './CoolingDiagramImage.css'
import coolingDiagramImage from '../assets/cooling_diagram_new.svg'

function CoolingDiagramImage({ sensors = {}, pumps = [], onPumpCommand }) {
  const [selectedPump, setSelectedPump] = useState(null)

  // 펌프 데이터
  const fwPumps = Array.isArray(pumps) && pumps.length >= 3 ? pumps.slice(0, 3) : [{}, {}, {}]
  const swPumps = Array.isArray(pumps) && pumps.length >= 6 ? pumps.slice(3, 6) : [{}, {}, {}]

  const sendPumpCommand = async (pumpIndex, command) => {
    if (onPumpCommand) {
      const success = await onPumpCommand(pumpIndex, command)
      if (success) {
        alert(`펌프 ${pumpIndex + 1} ${command === 'start' ? '시작' : '정지'} 명령 전송 완료`)
        setSelectedPump(null)
      } else {
        alert('명령 전송 실패')
      }
    }
  }

  return (
    <div className="cooling-image-wrapper">
      {/* 헤더 */}
      <div className="image-header">
        <div className="image-header-left">
          <span className="image-company">OMTech Ecosave</span>
          <span className="image-mode">Info/Mode</span>
        </div>
        <div className="image-header-center">
          {new Date().toLocaleString('ko-KR', { 
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
        </div>
        <div className="image-header-right">
          <button className="image-btn alarm-btn">ALARM ACKN</button>
          <button className="image-btn sound-btn">SOUND STOP</button>
          <span className="image-operator">OPERATOR</span>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="image-title">COOLING WATER SYSTEM</div>

      {/* 다이어그램 컨테이너 */}
      <div className="image-diagram-container">
        {/* 원본 이미지를 배경으로 사용 */}
        <img 
          src={coolingDiagramImage} 
          alt="Cooling Water System Diagram"
          className="image-diagram-img"
        />
        <div className="image-background">
          {/* 실시간 데이터 오버레이 레이어 */}
          <div className="image-overlay-layer">
            {/* NO.1 CLR 좌측 상단 0.0°C */}
            <div className="sensor-overlay" style={{ top: '11%', left: '56%' }}>
              {sensors.TX4A ? sensors.TX4A.toFixed(1) : '0.0'} °C
            </div>

            {/* NO.1 CLR 우측 상단 0.0°C */}
            <div className="sensor-overlay" style={{ top: '14%', left: '67%' }}>
              {sensors.TX2 ? sensors.TX2.toFixed(1) : '0.0'} °C
            </div>

            {/* NO.2 CLR 좌측 중간 0.0°C */}
            <div className="sensor-overlay" style={{ top: '48%', left: '56%' }}>
              {sensors.TX4B ? sensors.TX4B.toFixed(1) : '0.0'} °C
            </div>

            {/* NO.2 CLR 우측 중간 0.0°C */}
            <div className="sensor-overlay" style={{ top: '54%', left: '67%' }}>
              {sensors.TX3 ? sensors.TX3.toFixed(1) : '0.0'} °C
            </div>

            {/* SW Pump No.1 좌측 하단 0.0 */}
            <div className="sensor-overlay" style={{ top: '79%', left: '39%' }}>
              {sensors.TX5A !== undefined ? sensors.TX5A.toFixed(1) : '0.0'}
            </div>

            {/* SW Pump No.1 위 0.0°C */}
            <div className="sensor-overlay" style={{ top: '82%', left: '52%' }}>
              {sensors.TX5B !== undefined ? sensors.TX5B.toFixed(1) : '0.0'} °C
            </div>

            {/* FW Pump 클릭 영역 (좌측 No.1, No.2, No.3) */}
            {fwPumps.map((pump, idx) => (
              <div 
                key={`fw-${idx}`}
                className="pump-click-area"
                style={{
                  top: `${13 + idx * 13.5}%`,
                  left: '30%',
                  width: '10%',
                  height: '11%'
                }}
                onClick={() => setSelectedPump({...pump, index: idx, type: 'FW'})}
                title={`FW Pump #${idx + 1} 클릭하여 제어`}
              >
                {pump?.running && (
                  <div className="pump-status-badge running">
                    ⚡ {pump.frequency?.toFixed(1) || 0} Hz
                  </div>
                )}
                {!pump?.running && (
                  <div className="pump-status-badge stopped">⏸ 정지</div>
                )}
              </div>
            ))}

            {/* SW Pump 클릭 영역 (하단 No.1, No.2, No.3) */}
            {swPumps.map((pump, idx) => (
              <div 
                key={`sw-${idx}`}
                className="pump-click-area"
                style={{
                  top: '70%',
                  left: `${62 + idx * 10.5}%`,
                  width: '8%',
                  height: '13%'
                }}
                onClick={() => setSelectedPump({...pump, index: idx, type: 'SW'})}
                title={`SW Pump #${idx + 1} 클릭하여 제어`}
              >
                {pump?.running && (
                  <div className="pump-status-badge running">
                    ⚡ {pump.frequency?.toFixed(1) || 0} Hz
                  </div>
                )}
                {!pump?.running && (
                  <div className="pump-status-badge stopped">⏸ 정지</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* 펌프 상세 정보 팝업 */}
      {selectedPump && (
        <div className="image-popup-bg" onClick={() => setSelectedPump(null)}>
          <div className="image-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <span className="popup-icon">⚙️</span>
              <h3>No.{selectedPump.index + 1} {selectedPump.type === 'FW' ? 'Main Cool Fresh Water Pump VFD' : 'Main Cool Sea Water Pump VFD'}</h3>
            </div>
            <button className="image-popup-close" onClick={() => setSelectedPump(null)}>×</button>
            <div className="image-popup-body">
              <div className="popup-row">
                <span className="popup-label">상태</span>
                <span className={`popup-value ${selectedPump.running ? 'status-on' : 'status-off'}`}>
                  {selectedPump.running ? '🟢 운전' : '⚪ 정지'}
                </span>
              </div>
              <div className="popup-row">
                <span className="popup-label">VFD Frequency</span>
                <span className="popup-value">{selectedPump.frequency ? selectedPump.frequency.toFixed(1) + ' Hz' : '0.0 Hz'}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label">Actual Power</span>
                <span className="popup-value">{selectedPump.power_kw ? selectedPump.power_kw + ' kW' : '0 kW'}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label">Average Power</span>
                <span className="popup-value">{selectedPump.avg_kw ? selectedPump.avg_kw + ' kW' : '0 kW'}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label">절감 전력</span>
                <span className="popup-value">{selectedPump.saved_kwh ? selectedPump.saved_kwh.toLocaleString() + ' kWh' : '0 kWh'}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label">운전 시간</span>
                <span className="popup-value">{selectedPump.run_hours ? selectedPump.run_hours.toLocaleString() + ' h' : '0 h'}</span>
              </div>
              <div className="popup-row">
                <span className="popup-label">모드</span>
                <span className="popup-value">{selectedPump.auto ? 'AUTO' : 'MANUAL'}</span>
              </div>
            </div>
            
            {/* START/STOP 버튼 추가 */}
            <div className="pump-control-buttons">
              <button 
                className="btn-start" 
                onClick={() => {
                  const pumpIndex = selectedPump.type === 'FW' ? selectedPump.index : selectedPump.index + 3
                  sendPumpCommand(pumpIndex, 'start')
                }}
                disabled={selectedPump.running}
              >
                ▶️ START
              </button>
              <button 
                className="btn-stop" 
                onClick={() => {
                  const pumpIndex = selectedPump.type === 'FW' ? selectedPump.index : selectedPump.index + 3
                  sendPumpCommand(pumpIndex, 'stop')
                }}
                disabled={!selectedPump.running}
              >
                ⏹️ STOP
              </button>
            </div>
            
            <div className="popup-footer">
              <button className="popup-close-btn" onClick={() => setSelectedPump(null)}>CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoolingDiagramImage

