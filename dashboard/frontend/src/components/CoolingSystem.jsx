import React, { useState } from 'react'
import './CoolingSystem.css'

function CoolingSystem({ sensors, pumps }) {
  const [selectedPump, setSelectedPump] = useState(null)

  // 펌프 데이터 파싱
  const swPumps = pumps ? pumps.slice(0, 3) : []  // SWP 1~3
  const fwPumps = pumps ? pumps.slice(3, 6) : []  // FWP 1~3

  // 펌프 클릭 핸들러
  const handlePumpClick = (pumpIndex, pumpType) => {
    setSelectedPump({ index: pumpIndex, type: pumpType })
  }

  // 온도에 따른 색상
  const getTempColor = (temp) => {
    if (!temp) return '#888'
    if (temp < 15) return '#00bfff'  // 낮음
    if (temp < 30) return '#00ff00'  // 정상
    if (temp < 45) return '#ffa500'  // 주의
    return '#ff0000'  // 높음
  }

  // 펌프 상태에 따른 색상
  const getPumpStatus = (pump) => {
    if (!pump) return 'unknown'
    if (pump.alarm === 1) return 'alarm'
    if (pump.status === 1) return 'running'
    return 'stopped'
  }

  return (
    <div className="cooling-system">
      <div className="system-header">
        <h2>❄️ 냉각 시스템 구성도</h2>
        <div className="system-status">
          <div className="status-item">
            <span>운전 중 펌프:</span>
            <span className="value">{pumps?.filter(p => p.status === 1).length || 0} / {pumps?.length || 6}</span>
          </div>
          <div className="status-item">
            <span>M/E 부하:</span>
            <span className="value">{sensors.ME_load?.toFixed(1) || '0.0'} %</span>
          </div>
        </div>
      </div>

      <div className="system-diagram">
        {/* 상단: 주엔진 (M/E) */}
        <div className="me-section">
          <div className="me-engine">
            <div className="me-icon">⚙️</div>
            <div className="me-label">주엔진 (M/E)</div>
            <div className="me-load">부하: {sensors.ME_load?.toFixed(1) || '0.0'} %</div>
          </div>
        </div>

        {/* 중앙: 냉각수 흐름 */}
        <div className="cooling-flow">
          {/* 좌측: 청수 시스템 (Fresh Water) */}
          <div className="fw-system">
            <h3>🌊 청수 시스템 (Fresh Water)</h3>
            
            {/* FW 냉각기 1 */}
            <div className="cooler-unit">
              <div className="cooler-box">
                <div className="cooler-icon">🔄</div>
                <div className="cooler-label">FW 냉각기 #1</div>
                <div className="temp-row">
                  <div className="temp-in" style={{ color: getTempColor(sensors.TX4A) }}>
                    입구: {sensors.TX4A?.toFixed(1) || '0.0'}°C
                  </div>
                  <div className="temp-out" style={{ color: getTempColor(sensors.TX5A) }}>
                    출구: {sensors.TX5A?.toFixed(1) || '0.0'}°C
                  </div>
                </div>
              </div>
            </div>

            {/* FW 냉각기 2 */}
            <div className="cooler-unit">
              <div className="cooler-box">
                <div className="cooler-icon">🔄</div>
                <div className="cooler-label">FW 냉각기 #2</div>
                <div className="temp-row">
                  <div className="temp-in" style={{ color: getTempColor(sensors.TX4B) }}>
                    입구: {sensors.TX4B?.toFixed(1) || '0.0'}°C
                  </div>
                  <div className="temp-out" style={{ color: getTempColor(sensors.TX5B) }}>
                    출구: {sensors.TX5B?.toFixed(1) || '0.0'}°C
                  </div>
                </div>
              </div>
            </div>

            {/* FW 펌프들 */}
            <div className="pump-section">
              <h4>청수 펌프 (FWP)</h4>
              <div className="pumps-row">
                {fwPumps.map((pump, idx) => (
                  <div 
                    key={idx}
                    className={`pump-unit ${getPumpStatus(pump)} ${selectedPump?.index === idx && selectedPump?.type === 'FW' ? 'selected' : ''}`}
                    onClick={() => handlePumpClick(idx, 'FW')}
                  >
                    <div className="pump-icon-wrapper">
                      <svg className="pump-icon" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="22" />
                        <path 
                          d="M 30 15 L 30 45 M 30 15 L 25 20 M 30 15 L 35 20" 
                          className={pump?.status === 1 ? 'rotating' : ''}
                        />
                      </svg>
                    </div>
                    <div className="pump-label">FWP #{idx + 1}</div>
                    <div className="pump-info">
                      <div className="pump-freq">{pump?.frequency?.toFixed(0) || 0} Hz</div>
                      <div className="pump-power">{pump?.power?.toFixed(1) || 0} kW</div>
                    </div>
                    <div className={`pump-status-badge ${getPumpStatus(pump)}`}>
                      {pump?.status === 1 ? '운전' : '정지'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 중앙: 온도 센서 표시 */}
          <div className="sensor-display">
            <div className="sensor-item">
              <div className="sensor-icon">🌡️</div>
              <div className="sensor-label">TX2 (CLR1 출구)</div>
              <div className="sensor-value" style={{ color: getTempColor(sensors.TX2) }}>
                {sensors.TX2?.toFixed(1) || '0.0'} °C
              </div>
            </div>
            <div className="sensor-item">
              <div className="sensor-icon">🌡️</div>
              <div className="sensor-label">TX3 (CLR2 출구)</div>
              <div className="sensor-value" style={{ color: getTempColor(sensors.TX3) }}>
                {sensors.TX3?.toFixed(1) || '0.0'} °C
              </div>
            </div>
          </div>

          {/* 우측: 해수 시스템 (Sea Water) */}
          <div className="sw-system">
            <h3>🌊 해수 시스템 (Sea Water)</h3>
            
            {/* SW 압력/온도 */}
            <div className="sw-info">
              <div className="info-box">
                <div className="info-icon">📏</div>
                <div className="info-label">SW 압력 (PX1)</div>
                <div className="info-value">{sensors.PX1?.toFixed(2) || '0.00'} kg/cm²</div>
              </div>
              <div className="info-box">
                <div className="info-icon">🌡️</div>
                <div className="info-label">SW 토출온도 (TX1)</div>
                <div className="info-value" style={{ color: getTempColor(sensors.TX1) }}>
                  {sensors.TX1?.toFixed(1) || '0.0'} °C
                </div>
              </div>
            </div>

            {/* SW 펌프들 */}
            <div className="pump-section">
              <h4>해수 펌프 (SWP)</h4>
              <div className="pumps-row">
                {swPumps.map((pump, idx) => (
                  <div 
                    key={idx}
                    className={`pump-unit ${getPumpStatus(pump)} ${selectedPump?.index === idx && selectedPump?.type === 'SW' ? 'selected' : ''}`}
                    onClick={() => handlePumpClick(idx, 'SW')}
                  >
                    <div className="pump-icon-wrapper">
                      <svg className="pump-icon" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="22" />
                        <path 
                          d="M 30 15 L 30 45 M 30 15 L 25 20 M 30 15 L 35 20" 
                          className={pump?.status === 1 ? 'rotating' : ''}
                        />
                      </svg>
                    </div>
                    <div className="pump-label">SWP #{idx + 1}</div>
                    <div className="pump-info">
                      <div className="pump-freq">{pump?.frequency?.toFixed(0) || 0} Hz</div>
                      <div className="pump-power">{pump?.power?.toFixed(1) || 0} kW</div>
                    </div>
                    <div className={`pump-status-badge ${getPumpStatus(pump)}`}>
                      {pump?.status === 1 ? '운전' : '정지'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 해수 입구 */}
            <div className="sea-intake">
              <div className="sea-icon">🌊</div>
              <div className="sea-label">Sea Water Intake</div>
            </div>
          </div>
        </div>

        {/* 하단: 에너지 절감 정보 */}
        <div className="energy-section">
          <h3>⚡ 에너지 절감 현황</h3>
          <div className="energy-cards">
            <div className="energy-card">
              <div className="card-icon">💡</div>
              <div className="card-label">총 절감 전력</div>
              <div className="card-value">
                {(pumps?.reduce((sum, p) => sum + (p.saved_power || 0), 0) || 0).toFixed(1)} kWh
              </div>
            </div>
            <div className="energy-card">
              <div className="card-icon">📊</div>
              <div className="card-label">평균 절감률</div>
              <div className="card-value">
                {(pumps?.reduce((sum, p) => sum + (p.saved_ratio || 0), 0) / (pumps?.length || 1) || 0).toFixed(1)} %
              </div>
            </div>
            <div className="energy-card">
              <div className="card-icon">⏱️</div>
              <div className="card-label">총 운전 시간</div>
              <div className="card-value">
                {(pumps?.reduce((sum, p) => sum + (p.running_hours || 0), 0) || 0).toFixed(0)} h
              </div>
            </div>
            <div className="energy-card">
              <div className="card-icon">⚡</div>
              <div className="card-label">현재 소비 전력</div>
              <div className="card-value">
                {(pumps?.reduce((sum, p) => sum + (p.power || 0), 0) || 0).toFixed(1)} kW
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 선택된 펌프 상세 정보 패널 */}
      {selectedPump && pumps && (
        <div className="pump-detail-panel">
          <div className="panel-header">
            <h3>
              {selectedPump.type === 'SW' ? '해수' : '청수'} 펌프 #{selectedPump.index + 1} 상세 정보
            </h3>
            <button className="close-btn" onClick={() => setSelectedPump(null)}>✕</button>
          </div>
          <div className="panel-content">
            {(() => {
              const pump = selectedPump.type === 'SW' 
                ? swPumps[selectedPump.index] 
                : fwPumps[selectedPump.index]
              
              return (
                <>
                  <div className="detail-row">
                    <span>상태:</span>
                    <span className={pump?.status === 1 ? 'running' : 'stopped'}>
                      {pump?.status === 1 ? '⚡ 운전 중' : '⏸️ 정지'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>주파수:</span>
                    <span>{pump?.frequency?.toFixed(1) || 0} Hz</span>
                  </div>
                  <div className="detail-row">
                    <span>소비 전력:</span>
                    <span>{pump?.power?.toFixed(1) || 0} kW</span>
                  </div>
                  <div className="detail-row">
                    <span>절감 전력:</span>
                    <span>{pump?.saved_power?.toFixed(1) || 0} kWh</span>
                  </div>
                  <div className="detail-row">
                    <span>절감률:</span>
                    <span>{pump?.saved_ratio?.toFixed(1) || 0} %</span>
                  </div>
                  <div className="detail-row">
                    <span>운전 시간:</span>
                    <span>{pump?.running_hours?.toFixed(1) || 0} h</span>
                  </div>
                  {pump?.alarm === 1 && (
                    <div className="detail-row alarm">
                      <span>⚠️ 알람 발생</span>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default CoolingSystem




