import React, { useState } from 'react'
import './PumpControl.css'

function PumpControl({ pumps = [], fans = [], onCommand, onPumpCommand }) {
  const [commandInProgress, setCommandInProgress] = useState(false)

  const handleCommand = async (equipment, command) => {
    setCommandInProgress(true)
    try {
      let success = false

      // 새로운 API 사용 (equipment_name 기반)
      if (onCommand && equipment.name) {
        success = await onCommand(equipment.name, command)
      }
      // 하위 호환성 (pump_index 기반)
      else if (onPumpCommand) {
        const pumpIndex = pumps.findIndex(p => p === equipment)
        success = await onPumpCommand(pumpIndex, command)
      }

      const cmdText = command === 'start' ? '시작' :
                      command === 'start_fwd' ? '정방향 시작' :
                      command === 'start_bwd' ? '역방향 시작' : '정지'

      if (success) {
        alert(`✅ ${equipment.name} ${cmdText} 명령 성공`)
      } else {
        alert(`❌ 명령 실패`)
      }
    } catch (error) {
      alert(`❌ 오류: ${error.message}`)
    } finally {
      setCommandInProgress(false)
    }
  }

  return (
    <div className="pump-control unified-mode">
      <div className="control-header">
        <h2>⚙️ 운전 제어</h2>
        <p>펌프와 팬을 선택하고 운전 명령을 내릴 수 있습니다.</p>
      </div>

      <div className="control-grid">
        {/* 해수 펌프 */}
        <section className="control-section">
          <h3>🌊 해수 펌프 (Sea Water Pump)</h3>
          <div className="pump-control-list">
            {pumps.slice(0, 3).map((pump, idx) => (
              <PumpControlCard
                key={idx}
                pump={pump}
                pumpIndex={idx}
                isFan={false}
                onStart={() => handleCommand(pump, 'start')}
                onStop={() => handleCommand(pump, 'stop')}
                disabled={commandInProgress}
              />
            ))}
          </div>
        </section>

        {/* 청수 펌프 */}
        <section className="control-section">
          <h3>💧 청수 펌프 (Fresh Water Pump)</h3>
          <div className="pump-control-list">
            {pumps.slice(3, 6).map((pump, idx) => (
              <PumpControlCard
                key={idx + 3}
                pump={pump}
                pumpIndex={idx + 3}
                isFan={false}
                onStart={() => handleCommand(pump, 'start')}
                onStop={() => handleCommand(pump, 'stop')}
                disabled={commandInProgress}
              />
            ))}
          </div>
        </section>

        {/* E/R 팬 */}
        <section className="control-section">
          <h3>🌀 Engine Room 팬 (E/R Fan)</h3>
          <div className="pump-control-list fan-grid">
            {fans.map((fan, idx) => (
              <PumpControlCard
                key={idx}
                pump={fan}
                pumpIndex={idx}
                isFan={true}
                onStart={() => handleCommand(fan, 'start_fwd')}
                onStartBwd={() => handleCommand(fan, 'start_bwd')}
                onStop={() => handleCommand(fan, 'stop')}
                disabled={commandInProgress}
              />
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}

function PumpControlCard({ pump, pumpIndex, isFan, onStart, onStartBwd, onStop, disabled }) {
  const isRunning = isFan ? (pump.running_fwd || pump.running_bwd) : pump.running

  return (
    <div className={`pump-control-card ${isRunning ? 'running' : 'stopped'}`}>
      <div className="control-card-header">
        <h4>{pump.name}</h4>
        <span className={`status-indicator ${
          isFan && pump.running_bwd ? 'reverse' :
          isRunning ? 'active' : 'inactive'
        }`}>
          {isFan ? (
            pump.running_fwd ? (
              <>
                <span className="rotating-icon">⚙️</span> 정방향
              </>
            ) :
            pump.running_bwd ? (
              <>
                <span className="rotating-icon reverse">⚙️</span> 역방향
              </>
            ) : '⚪ 정지'
          ) : (
            pump.running ? (
              <>
                <span className="rotating-icon">⚙️</span> 운전중
              </>
            ) : '⚪ 정지'
          )}
        </span>
      </div>

      <div className="control-card-info">
        <div className="info-item">
          <span className="info-label">주파수</span>
          <span className="info-value">{pump.frequency?.toFixed(1) || 0} Hz</span>
        </div>
        <div className="info-item">
          <span className="info-label">전력</span>
          <span className="info-value">{pump.power_kw || 0} kW</span>
        </div>
      </div>

      <div className="control-buttons">
        {isFan ? (
          <>
            <div className="direction-toggle">
              <button
                className={`toggle-btn ${pump.running_fwd ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); onStart(); }}
                disabled={disabled || pump.running_fwd}
              >
                ▶️ 정방향
              </button>
              <button
                className={`toggle-btn ${pump.running_bwd ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); onStartBwd(); }}
                disabled={disabled || pump.running_bwd}
              >
                ◀️ 역방향
              </button>
            </div>
            <button
              className="btn-stop"
              onClick={(e) => { e.stopPropagation(); onStop(); }}
              disabled={disabled || !isRunning}
            >
              ⏸️ 정지
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-start"
              onClick={(e) => { e.stopPropagation(); onStart(); }}
              disabled={disabled || pump.running}
            >
              ▶️ 시작
            </button>
            <button
              className="btn-stop"
              onClick={(e) => { e.stopPropagation(); onStop(); }}
              disabled={disabled || !pump.running}
            >
              ⏸️ 정지
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PumpControl




