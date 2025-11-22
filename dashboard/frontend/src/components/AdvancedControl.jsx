import React, { useState, useEffect } from 'react'
import './AdvancedControl.css'

function AdvancedControl({ equipment = [], pumps = [], fans = [], onCommand }) {
  const [activeTab, setActiveTab] = useState('automan')

  // equipment가 있으면 사용, 없으면 pumps 사용 (하위 호환성)
  const allEquipment = equipment.length > 0 ? equipment : pumps

  return (
    <div className="advanced-control">
      <div className="control-header">
        <h2>🎛️ 고급 제어</h2>
        <p>자동/수동 전환, PID 제어, VFD 상세 정보</p>
      </div>

      {/* 탭 메뉴 */}
      <div className="control-tabs">
        <button
          className={activeTab === 'automan' ? 'active' : ''}
          onClick={() => setActiveTab('automan')}
        >
          🔄 자동/수동
        </button>
        <button
          className={activeTab === 'pid' ? 'active' : ''}
          onClick={() => setActiveTab('pid')}
        >
          📐 PID 제어
        </button>
        <button
          className={activeTab === 'vfdinfo' ? 'active' : ''}
          onClick={() => setActiveTab('vfdinfo')}
        >
          ⚡ VFD 정보
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="control-content">
        {activeTab === 'automan' && (
          <AutoManControl
            equipment={allEquipment}
            pumps={pumps}
            fans={fans}
            onCommand={onCommand}
          />
        )}
        {activeTab === 'pid' && <PIDControl />}
        {activeTab === 'vfdinfo' && <VFDInfo equipment={allEquipment} />}
      </div>
    </div>
  )
}

// 자동/수동 제어
function AutoManControl({ equipment = [], pumps = [], fans = [], onCommand }) {
  const allEquipment = equipment.length > 0 ? equipment : pumps

  const [modes, setModes] = useState({
    SWP1: { auto: true, vfd: true },
    SWP2: { auto: true, vfd: true },
    SWP3: { auto: true, vfd: true },
    FWP1: { auto: true, vfd: true },
    FWP2: { auto: true, vfd: true },
    FWP3: { auto: true, vfd: true },
    FAN1: { auto: true, vfd: true },
    FAN2: { auto: true, vfd: true },
    FAN3: { auto: true, vfd: true },
    FAN4: { auto: true, vfd: true },
  })

  // WebSocket에서 받은 equipment 데이터로 modes 상태 동기화
  useEffect(() => {
    if (allEquipment.length > 0) {
      const newModes = {}
      allEquipment.forEach(eq => {
        newModes[eq.name] = {
          auto: eq.auto_mode !== undefined ? eq.auto_mode : true,
          vfd: eq.vfd_mode !== undefined ? eq.vfd_mode : true
        }
      })
      setModes(newModes)
      console.log('🔄 모드 상태 동기화:', newModes)
    }
  }, [allEquipment])

  const setMode = async (equipmentName, modeType, value) => {
    // UI 상태 업데이트
    setModes(prev => ({
      ...prev,
      [equipmentName]: {
        ...prev[equipmentName],
        [modeType]: value
      }
    }))

    // 백엔드로 명령 전송
    if (onCommand) {
      let command = ''
      if (modeType === 'auto') {
        command = value ? 'auto' : 'manual'
      } else if (modeType === 'vfd') {
        command = value ? 'vfd' : 'bypass'
      }

      console.log(`🔧 모드 변경: ${equipmentName} ${command}`)
      const success = await onCommand(equipmentName, command)

      if (success) {
        console.log(`✅ ${equipmentName} ${command} 모드 설정 완료`)
      } else {
        console.error(`❌ ${equipmentName} ${command} 모드 설정 실패`)
        // 실패 시 UI 상태 되돌리기
        setModes(prev => ({
          ...prev,
          [equipmentName]: {
            ...prev[equipmentName],
            [modeType]: !value
          }
        }))
      }
    }
  }

  const swpEquipment = allEquipment.slice(0, 3)  // SWP 3개
  const fwpEquipment = allEquipment.slice(3, 6)  // FWP 3개
  const fanEquipment = allEquipment.slice(6, 10) // FAN 4개

  return (
    <div className="automan-section">
      <div className="automan-description">
        <h3>🔄 운전 모드 설정</h3>
        <p>각 장비의 운전 모드(자동/수동)와 VFD 모드를 설정할 수 있습니다.</p>
      </div>

      {/* 3개 열로 배치: SWP | FWP | FAN */}
      <div className="mode-grid-3col">
        {/* SWP 열 */}
        <div className="mode-column">
          <h4 className="column-title">🌊 해수 펌프 (SWP)</h4>
          {swpEquipment.map((item, idx) => (
            <EquipmentModeCard
              key={idx}
              equipment={item}
              modes={modes[item.name]}
              onSetMode={(type, value) => setMode(item.name, type, value)}
              isFan={false}
            />
          ))}
        </div>

        {/* FWP 열 */}
        <div className="mode-column">
          <h4 className="column-title">💧 청수 펌프 (FWP)</h4>
          {fwpEquipment.map((item, idx) => (
            <EquipmentModeCard
              key={idx + 3}
              equipment={item}
              modes={modes[item.name]}
              onSetMode={(type, value) => setMode(item.name, type, value)}
              isFan={false}
            />
          ))}
        </div>

        {/* FAN 열 */}
        <div className="mode-column fan-column">
          <h4 className="column-title">🌀 E/R 팬 (FAN)</h4>
          <div className="fan-cards-grid">
            {fanEquipment.map((item, idx) => (
              <EquipmentModeCard
                key={idx + 6}
                equipment={item}
                modes={modes[item.name]}
                onSetMode={(type, value) => setMode(item.name, type, value)}
                isFan={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function EquipmentModeCard({ equipment, modes, onSetMode, isFan = false }) {
  const isRunning = isFan ? (equipment.running_fwd || equipment.running_bwd) : equipment.running

  return (
    <div className="pump-mode-card">
      <div className="mode-card-header">
        <h5>{equipment.name}</h5>
        <span className={`status-dot ${isRunning ? 'running' : 'stopped'}`}></span>
      </div>

      <div className="mode-switches">
        <div className="mode-switch">
          <span className="switch-label">운전 모드</span>
          <div className="switch-buttons">
            <button
              className={modes?.auto ? 'active' : ''}
              onClick={() => onSetMode('auto', true)}
            >
              🤖 자동
            </button>
            <button
              className={!modes?.auto ? 'active' : ''}
              onClick={() => onSetMode('auto', false)}
            >
              👤 수동
            </button>
          </div>
        </div>

        <div className="mode-switch">
          <span className="switch-label">VFD 모드</span>
          <div className="switch-buttons">
            <button
              className={modes?.vfd ? 'active' : ''}
              onClick={() => onSetMode('vfd', true)}
            >
              ⚡ VFD
            </button>
            <button
              className={!modes?.vfd ? 'active' : ''}
              onClick={() => onSetMode('vfd', false)}
            >
              🔌 Bypass
            </button>
          </div>
        </div>
      </div>

      <div className="mode-info">
        <div className="info-row">
          <span>주파수:</span>
          <span>{equipment.frequency?.toFixed(1) || 0} Hz</span>
        </div>
        <div className="info-row">
          <span>전력:</span>
          <span>{equipment.power_kw || 0} kW</span>
        </div>
        {isFan && (
          <div className="info-row">
            <span>방향:</span>
            <span>
              {equipment.running_fwd ? '정방향' :
               equipment.running_bwd ? '역방향' : '정지'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// PID 제어
function PIDControl() {
  const [pidParams, setPidParams] = useState({
    swp_kp: 1.0,
    swp_ki: 0.1,
    swp_kd: 0.05,
    swp_setpoint: 30.0,
    
    fwp_kp: 1.0,
    fwp_ki: 0.1,
    fwp_kd: 0.05,
    fwp_setpoint: 75.0,
  })

  const handleChange = (key, value) => {
    setPidParams(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }))
  }

  return (
    <div className="pid-section">
      <div className="pid-description">
        <h3>📐 PID 제어 파라미터</h3>
        <p>온도 제어를 위한 PID 게인값을 설정합니다.</p>
        <div className="pid-formula">
          <strong>제어식:</strong> Output = Kp × e(t) + Ki × ∫e(t)dt + Kd × de(t)/dt
        </div>
      </div>

      {/* 해수 펌프 PID */}
      <div className="pid-controller-section">
        <h4>🌊 해수 펌프 PID 파라미터</h4>
        <div className="pid-grid">
          <PIDParameter 
            label="비례 게인 (Kp)" 
            value={pidParams.swp_kp}
            onChange={(v) => handleChange('swp_kp', v)}
            min={0}
            max={10}
            step={0.1}
          />
          <PIDParameter 
            label="적분 게인 (Ki)" 
            value={pidParams.swp_ki}
            onChange={(v) => handleChange('swp_ki', v)}
            min={0}
            max={5}
            step={0.01}
          />
          <PIDParameter 
            label="미분 게인 (Kd)" 
            value={pidParams.swp_kd}
            onChange={(v) => handleChange('swp_kd', v)}
            min={0}
            max={1}
            step={0.01}
          />
          <PIDParameter 
            label="목표값 (Setpoint)" 
            value={pidParams.swp_setpoint}
            onChange={(v) => handleChange('swp_setpoint', v)}
            min={-30}
            max={100}
            step={0.5}
            unit="°C"
          />
        </div>
      </div>

      {/* 청수 펌프 PID */}
      <div className="pid-controller-section">
        <h4>💧 청수 펌프 PID 파라미터</h4>
        <div className="pid-grid">
          <PIDParameter 
            label="비례 게인 (Kp)" 
            value={pidParams.fwp_kp}
            onChange={(v) => handleChange('fwp_kp', v)}
            min={0}
            max={10}
            step={0.1}
          />
          <PIDParameter 
            label="적분 게인 (Ki)" 
            value={pidParams.fwp_ki}
            onChange={(v) => handleChange('fwp_ki', v)}
            min={0}
            max={5}
            step={0.01}
          />
          <PIDParameter 
            label="미분 게인 (Kd)" 
            value={pidParams.fwp_kd}
            onChange={(v) => handleChange('fwp_kd', v)}
            min={0}
            max={1}
            step={0.01}
          />
          <PIDParameter 
            label="목표값 (Setpoint)" 
            value={pidParams.fwp_setpoint}
            onChange={(v) => handleChange('fwp_setpoint', v)}
            min={0}
            max={100}
            step={0.5}
            unit="°C"
          />
        </div>
      </div>

      <div className="pid-footer">
        <button className="btn-apply">💾 PID 파라미터 적용</button>
      </div>
    </div>
  )
}

function PIDParameter({ label, value, onChange, min, max, step, unit = '' }) {
  return (
    <div className="pid-parameter">
      <label>{label}</label>
      <div className="pid-input-group">
        <input 
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
        />
        {unit && <span className="unit">{unit}</span>}
      </div>
      <input 
        type="range"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className="pid-slider"
      />
    </div>
  )
}

// VFD 상세 정보
function VFDInfo({ equipment = [] }) {
  const [selectedEquipment, setSelectedEquipment] = useState(0)

  return (
    <div className="vfdinfo-section">
      <div className="vfdinfo-description">
        <h3>⚡ VFD 상세 정보</h3>
        <p>각 장비의 VFD(인버터) 상세 운전 정보를 확인합니다.</p>
      </div>

      {/* 장비 선택 */}
      <div className="pump-selector">
        {equipment.slice(0, 6).map((item, idx) => (
          <button
            key={idx}
            className={`pump-select-btn ${selectedEquipment === idx ? 'active' : ''}`}
            onClick={() => setSelectedEquipment(idx)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="pump-selector" style={{ marginTop: '0.5rem' }}>
        {equipment.slice(6, 10).map((item, idx) => (
          <button
            key={idx + 6}
            className={`pump-select-btn ${selectedEquipment === idx + 6 ? 'active' : ''}`}
            onClick={() => setSelectedEquipment(idx + 6)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 선택된 장비의 VFD 정보 */}
      {equipment[selectedEquipment] && (
        <VFDDetailCard
          equipment={equipment[selectedEquipment]}
          isFan={selectedEquipment >= 6}
        />
      )}
    </div>
  )
}

function VFDDetailCard({ equipment, isFan = false }) {
  const isRunning = isFan ? (equipment.running_fwd || equipment.running_bwd) : equipment.running

  return (
    <div className="vfd-detail-card">
      <div className="vfd-header">
        <h4>{equipment.name} VFD 상세 정보</h4>
        <span className={`vfd-status ${isRunning ? 'running' : 'stopped'}`}>
          {isFan ? (
            equipment.running_fwd ? '🟢 정방향 운전중' :
            equipment.running_bwd ? '🟡 역방향 운전중' : '⚪ 정지'
          ) : (
            equipment.running ? '🟢 운전중' : '⚪ 정지'
          )}
        </span>
      </div>

      <div className="vfd-info-grid">
        {/* 좌측 열 */}
        <div className="vfd-info-column">
          <div className="vfd-info-section">
            <h5>📊 운전 데이터</h5>
            <VFDInfoRow label="현재 주파수" value={`${equipment.frequency?.toFixed(1) || 0} Hz`} />
            <VFDInfoRow label="출력 주파수" value={`${equipment.frequency?.toFixed(1) || 0} Hz`} />
            <VFDInfoRow label="목표 주파수" value={`60.0 Hz`} />
            <VFDInfoRow label="현재 전류" value={`${(equipment.power_kw * 2.5).toFixed(1)} A`} />
            <VFDInfoRow label="출력 전압" value={`440 V`} />
            {isFan && (
              <VFDInfoRow
                label="운전 방향"
                value={equipment.running_fwd ? '정방향 (FWD)' :
                       equipment.running_bwd ? '역방향 (BWD)' : '정지'}
              />
            )}
          </div>

          <div className="vfd-info-section">
            <h5>⚡ 전력 데이터</h5>
            <VFDInfoRow label="순시 전력" value={`${equipment.power_kw || 0} kW`} />
            <VFDInfoRow label="평균 전력" value={`${equipment.avg_power || 0} kW`} />
            <VFDInfoRow label="역률" value={`0.95`} />
            <VFDInfoRow label="효율" value={`94.5 %`} />
            <VFDInfoRow
              label="절감률"
              value={`${equipment.saved_ratio || 0} %`}
              highlight
            />
          </div>
        </div>

        {/* 우측 열 */}
        <div className="vfd-info-column">
          <div className="vfd-info-section">
            <h5>🕐 운전 시간</h5>
            <VFDInfoRow
              label="ESS 운전 시간"
              value={`${equipment.run_hours?.toLocaleString() || 0} h`}
            />
            <VFDInfoRow
              label="총 운전 시간"
              value={`${(equipment.run_hours * 1.5)?.toLocaleString() || 0} h`}
            />
            <VFDInfoRow
              label="절감 전력량"
              value={`${equipment.saved_kwh?.toLocaleString() || 0} kWh`}
              highlight
            />
          </div>

          <div className="vfd-info-section">
            <h5>🛡️ 상태 정보</h5>
            <VFDInfoRow label="운전 모드" value={equipment.ess_mode ? 'ESS 모드' : '일반 모드'} />
            <VFDInfoRow label="제어 모드" value={`자동`} />
            <VFDInfoRow label="VFD 온도" value={`42 °C`} />
            <VFDInfoRow label="모터 온도" value={`38 °C`} />
            <VFDInfoRow label="알람 상태" value={`정상`} success />
          </div>
        </div>
      </div>
    </div>
  )
}

function VFDInfoRow({ label, value, highlight, success }) {
  return (
    <div className="vfd-info-row">
      <span className="vfd-label">{label}</span>
      <span className={`vfd-value ${highlight ? 'highlight' : ''} ${success ? 'success' : ''}`}>
        {value}
      </span>
    </div>
  )
}

export default AdvancedControl




