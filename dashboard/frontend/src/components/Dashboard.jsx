import React, { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard({ sensors = {}, pumps = [], fans = [] }) {
  const swPumps = pumps.slice(0, 3) // SWP1, SWP2, SWP3
  const fwPumps = pumps.slice(3, 6) // FWP1, FWP2, FWP3

  const totalSavedKwh = pumps.reduce((sum, pump) => sum + (pump.saved_kwh || 0), 0)
  const totalRunHours = pumps.reduce((sum, pump) => sum + (pump.run_hours || 0), 0)
  const runningPumps = pumps.filter(p => p.running).length
  const runningFans = fans.filter(f => f.running_fwd || f.running_bwd).length

  // 에너지 절감률 데이터
  const [energySavings, setEnergySavings] = useState(null)

  // AI 목표 주파수 제어 데이터
  const [aiFreqControl, setAiFreqControl] = useState([])

  // 에너지 절감 상세 요약 데이터
  const [energySavingsSummary, setEnergySavingsSummary] = useState([])

  // 에너지 절감률 데이터 가져오기
  useEffect(() => {
    const fetchEnergySavings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/energy-savings')
        const result = await response.json()
        setEnergySavings(result)
      } catch (error) {
        console.error('에너지 절감률 데이터 로드 실패:', error)
      }
    }

    fetchEnergySavings()
    const interval = setInterval(fetchEnergySavings, 2000) // 2초마다 업데이트

    return () => clearInterval(interval)
  }, [])

  // AI 목표 주파수 제어 데이터 가져오기
  useEffect(() => {
    const fetchAiFreqControl = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/ai-frequency-control')
        const result = await response.json()
        setAiFreqControl(result)
      } catch (error) {
        console.error('AI 주파수 제어 데이터 로드 실패:', error)
      }
    }

    fetchAiFreqControl()
    const interval = setInterval(fetchAiFreqControl, 2000) // 2초마다 업데이트

    return () => clearInterval(interval)
  }, [])

  // 에너지 절감 상세 요약 데이터 가져오기
  useEffect(() => {
    const fetchEnergySavingsSummary = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/energy-savings-summary')
        const result = await response.json()
        setEnergySavingsSummary(result)
      } catch (error) {
        console.error('에너지 절감 상세 요약 데이터 로드 실패:', error)
      }
    }

    fetchEnergySavingsSummary()
    const interval = setInterval(fetchEnergySavingsSummary, 2000) // 2초마다 업데이트

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard">
      {/* 에너지 절감률 */}
      {energySavings && (
        <section className="dashboard-section">
          <h2>💡 에너지 절감률 (60Hz 고정 대비 VFD 가변)</h2>
          <div className="energy-savings-container">
            <EnergySavingsCard data={energySavings} />
          </div>
        </section>
      )}

      {/* Energy Saving Summary Table */}
      {energySavingsSummary.length > 0 && (
        <section className="dashboard-section">
          <h2>📋 Energy Saving Summary Table</h2>
          <div className="energy-summary-table-container">
            <EnergySavingSummaryTable data={energySavingsSummary} />
          </div>
        </section>
      )}

      {/* AI 목표 vs 실제 주파수 현황 */}
      {aiFreqControl.length > 0 && (
        <section className="dashboard-section">
          <h2>📈 AI 목표 vs 실제 주파수 현황</h2>
          <div className="ai-freq-control-container">
            <AIFrequencyControlTable data={aiFreqControl} />
          </div>
        </section>
      )}

      {/* 시스템 개요 */}
      <section className="dashboard-section">
        <h2>📊 시스템 개요</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-label">총 절감 전력</div>
              <div className="stat-value">{totalSavedKwh.toLocaleString()} kWh</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <div className="stat-label">총 운전 시간</div>
              <div className="stat-value">{totalRunHours.toLocaleString()} h</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <div className="stat-label">운전 중인 펌프</div>
              <div className="stat-value">{runningPumps} / {pumps.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌀</div>
            <div className="stat-content">
              <div className="stat-label">운전 중인 팬</div>
              <div className="stat-value">{runningFans} / {fans.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-label">M/E 부하</div>
              <div className="stat-value">{sensors.PU1?.toFixed(1) || 0}%</div>
            </div>
          </div>
        </div>
      </section>

      {/* 센서 데이터 */}
      <section className="dashboard-section">
        <h2>🌡️ 센서 데이터</h2>
        <div className="sensor-grid">
          <SensorCard label="CSW 펌프 토출 온도 (TX1)" value={sensors.TX1} unit="°C" icon="🌡️" />
          <SensorCard label="FW Cooler 1 SW Out (TX2)" value={sensors.TX2} unit="°C" icon="🌡️" />
          <SensorCard label="FW Cooler 2 SW Out (TX3)" value={sensors.TX3} unit="°C" icon="🌡️" />
          <SensorCard label="FW Cooler FW In (TX4)" value={sensors.TX4} unit="°C" icon="🌡️" />
          <SensorCard label="FW Cooler FW Out (TX5)" value={sensors.TX5} unit="°C" icon="🌡️" />
          <SensorCard label="CSW 펌프 토출 압력 (DPX1)" value={sensors.DPX1} unit="kg/cm²" icon="💨" />
        </div>
        <div className="sensor-grid" style={{ marginTop: '1rem' }}>
          <SensorCard label="E/R Inside Temp (TX6)" value={sensors.TX6} unit="°C" icon="🌡️" />
          <SensorCard label="E/R Outside Temp (TX7)" value={sensors.TX7} unit="°C" icon="🌡️" />
        </div>
      </section>

      {/* 해수 펌프 (SWP) */}
      <section className="dashboard-section">
        <h2>🌊 해수 펌프 (Sea Water Pump)</h2>
        <div className="pump-grid">
          {swPumps.map((pump, idx) => (
            <PumpCard key={idx} pump={pump} />
          ))}
        </div>
      </section>

      {/* 청수 펌프 (FWP) */}
      <section className="dashboard-section">
        <h2>💧 청수 펌프 (Fresh Water Pump)</h2>
        <div className="pump-grid">
          {fwPumps.map((pump, idx) => (
            <PumpCard key={idx} pump={pump} />
          ))}
        </div>
      </section>

      {/* E/R Fan */}
      <section className="dashboard-section">
        <h2>🌀 Engine Room 팬 (E/R Fan)</h2>
        <div className="pump-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {fans.map((fan, idx) => (
            <FanCard key={idx} fan={fan} />
          ))}
        </div>
      </section>
    </div>
  )
}

function SensorCard({ label, value, unit, icon }) {
  return (
    <div className="sensor-card">
      <div className="sensor-icon">{icon}</div>
      <div className="sensor-info">
        <div className="sensor-label">{label}</div>
        <div className="sensor-value">
          {value !== undefined ? value.toFixed(1) : '--'} {unit}
        </div>
      </div>
    </div>
  )
}

function PumpCard({ pump }) {
  const isRunning = pump.running
  const avgSavingRatio = pump.saved_ratio || 0

  // 운전 모드 결정
  const getOperationMode = () => {
    if (pump.auto_mode && pump.vfd_mode) {
      return { text: '⚡ ESS 모드', class: 'ess-mode' }
    } else if (pump.auto_mode && !pump.vfd_mode) {
      return { text: '🔄 자동/Bypass', class: 'auto-bypass-mode' }
    } else if (!pump.auto_mode && pump.vfd_mode) {
      return { text: '🔧 수동/VFD', class: 'manual-vfd-mode' }
    } else {
      return { text: '⚙️ 수동/Bypass', class: 'manual-bypass-mode' }
    }
  }

  const operationMode = getOperationMode()

  return (
    <div className={`pump-card ${isRunning ? 'running' : 'stopped'}`}>
      <div className="pump-header">
        <h3>{pump.name}</h3>
        <div className="pump-header-badges">
          <span className={`mode-badge ${operationMode.class}`}>
            {operationMode.text}
          </span>
          <span className={`pump-status-badge ${isRunning ? 'active' : 'inactive'}`}>
            {isRunning ? '🟢 운전중' : '⚪ 정지'}
          </span>
        </div>
      </div>

      <div className="pump-details">
        <div className="pump-detail-row">
          <span className="detail-label">주파수</span>
          <span className="detail-value">{pump.frequency?.toFixed(1) || 0} Hz</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">소비 전력</span>
          <span className="detail-value">{pump.power_kw || 0} kW</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">절감률</span>
          <span className="detail-value highlight">{avgSavingRatio}%</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">운전 시간</span>
          <span className="detail-value">{pump.run_hours?.toLocaleString() || 0} h</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">누적 절감 전력</span>
          <span className="detail-value highlight">{pump.saved_kwh?.toLocaleString() || 0} kWh</span>
        </div>
      </div>
    </div>
  )
}

function FanCard({ fan }) {
  const isRunning = fan.running_fwd || fan.running_bwd
  const avgSavingRatio = fan.saved_ratio || 0

  // 운전 모드 결정
  const getOperationMode = () => {
    if (fan.auto_mode && fan.vfd_mode) {
      return { text: '⚡ ESS 모드', class: 'ess-mode' }
    } else if (fan.auto_mode && !fan.vfd_mode) {
      return { text: '🔄 자동/Bypass', class: 'auto-bypass-mode' }
    } else if (!fan.auto_mode && fan.vfd_mode) {
      return { text: '🔧 수동/VFD', class: 'manual-vfd-mode' }
    } else {
      return { text: '⚙️ 수동/Bypass', class: 'manual-bypass-mode' }
    }
  }

  const operationMode = getOperationMode()

  return (
    <div className={`pump-card ${isRunning ? 'running' : 'stopped'}`}>
      <div className="pump-header">
        <h3>{fan.name}</h3>
        <div className="pump-header-badges">
          <span className={`mode-badge ${operationMode.class}`}>
            {operationMode.text}
          </span>
          <span className={`pump-status-badge ${isRunning ? 'active' : 'inactive'}`}>
            {fan.running_fwd ? '🟢 정방향' : fan.running_bwd ? '🟡 역방향' : '⚪ 정지'}
          </span>
        </div>
      </div>

      <div className="pump-details">
        <div className="pump-detail-row">
          <span className="detail-label">주파수</span>
          <span className="detail-value">{fan.frequency?.toFixed(1) || 0} Hz</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">소비 전력</span>
          <span className="detail-value">{fan.power_kw || 0} kW</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">절감률</span>
          <span className="detail-value highlight">{avgSavingRatio}%</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">운전 시간</span>
          <span className="detail-value">{fan.run_hours?.toLocaleString() || 0} h</span>
        </div>
        <div className="pump-detail-row">
          <span className="detail-label">누적 절감 전력</span>
          <span className="detail-value highlight">{fan.saved_kwh?.toLocaleString() || 0} kWh</span>
        </div>
      </div>
    </div>
  )
}

// 에너지 절감률 카드 컴포넌트
function EnergySavingsCard({ data }) {
  const { realtime, today, month } = data
  const { total, swp, fwp, fan } = realtime

  return (
    <div className="energy-savings-card">
      {/* 실시간 + 누적 절감 현황 */}
      <div className="energy-total-section">
        <div className="energy-total-header">
          <h3>💡 에너지 절감 현황</h3>
        </div>

        {/* 실시간 절감률 */}
        <div className="energy-total-info">
          <div className="realtime-section">
            <div className="section-title">🔴 실시간 순간 절감률</div>
            <div className="energy-comparison">
              <span className="energy-label">60Hz 고정:</span>
              <span className="energy-value">{total.power_60hz.toLocaleString()} kW</span>
            </div>
            <div className="energy-comparison">
              <span className="energy-label">VFD 가변:</span>
              <span className="energy-value vfd-value">{total.power_vfd.toLocaleString()} kW</span>
            </div>
            <div className="energy-savings-highlight">
              <span className="savings-label">절감 전력:</span>
              <span className="savings-value">
                {total.savings_kw.toLocaleString()} kW
                <span className="savings-rate"> ({total.savings_rate}% ↓)</span>
              </span>
            </div>
          </div>

          {/* 누적 절감률 */}
          <div className="accumulated-section">
            <div className="accumulated-item">
              <div className="section-title">📅 오늘 누적 (00:00부터)</div>
              <div className="accumulated-value">
                <span className="kwh-value">{today.total_kwh_saved.toLocaleString()} kWh</span>
                <span className="rate-badge">평균 {today.avg_savings_rate}% 절감</span>
              </div>
            </div>
            <div className="accumulated-item">
              <div className="section-title">📊 이번 달 누적 (1일부터)</div>
              <div className="accumulated-value">
                <span className="kwh-value">{month.total_kwh_saved.toLocaleString()} kWh</span>
                <span className="rate-badge">평균 {month.avg_savings_rate}% 절감</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 시스템별 절감률 */}
      <div className="energy-details-section">
        <h4>시스템별 절감률</h4>
        <div className="energy-systems-grid">
          <SystemSavingsRow label="SWP" data={swp} color="#38bdf8" />
          <SystemSavingsRow label="FWP" data={fwp} color="#34d399" />
          <SystemSavingsRow label="E/R FAN" data={fan} color="#fbbf24" />
        </div>
      </div>
    </div>
  )
}

// 시스템별 절감률 행
function SystemSavingsRow({ label, data, color }) {
  return (
    <div className="system-savings-row">
      <div className="system-label" style={{ borderLeft: `4px solid ${color}` }}>
        {label}
      </div>
      <div className="system-savings-data">
        <div className="system-power">
          <span className="power-value">{data.savings_kw} kW</span>
        </div>
        <div className="system-progress">
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(data.savings_rate, 100)}%`,
                backgroundColor: color
              }}
            />
          </div>
          <span className="progress-rate">{data.savings_rate}%</span>
        </div>
      </div>
    </div>
  )
}

// AI 목표 주파수 제어 테이블 컴포넌트
function AIFrequencyControlTable({ data }) {
  // 그룹별로 데이터 정리
  const groupedData = {
    'SW 펌프': data.filter(item => item.group === 'SW 펌프'),
    'FW 펌프': data.filter(item => item.group === 'FW 펌프'),
    'E/R 팬': data.filter(item => item.group === 'E/R 팬')
  }

  return (
    <div className="ai-freq-table-wrapper">
      <table className="ai-freq-table">
        <thead>
          <tr>
            <th>그룹</th>
            <th>장비명</th>
            <th>제어 모드</th>
            <th>입력 조건</th>
            <th>목표 주파수</th>
            <th>실제 주파수</th>
            <th>편차</th>
            <th>판단</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedData).map(([groupName, items]) => (
            items.map((item, idx) => (
              <tr key={`${groupName}-${idx}`} className={`status-${item.status}`}>
                {idx === 0 && (
                  <td rowSpan={items.length} className="group-cell">
                    {groupName}
                  </td>
                )}
                <td>{item.name}</td>
                <td className={item.mode === 'AI 제어' ? 'mode-ai' : 'mode-stop'}>
                  {item.mode}
                </td>
                <td className="input-conditions">{item.input_conditions}</td>
                <td className="freq-value">{item.target_frequency.toFixed(1)} Hz</td>
                <td className="freq-value">{item.actual_frequency.toFixed(1)} Hz</td>
                <td className={`deviation ${Math.abs(item.deviation) < 0.3 ? 'good' : Math.abs(item.deviation) < 1.0 ? 'warning' : 'alert'}`}>
                  {item.deviation >= 0 ? '+' : ''}{item.deviation.toFixed(2)} Hz
                </td>
                <td className="status-cell">
                  {item.status === '정상' && <span className="status-badge status-normal">✓ 정상</span>}
                  {item.status === '주의' && <span className="status-badge status-warning">⚠ 주의</span>}
                  {item.status === '경고' && <span className="status-badge status-alert">⚠ 경고</span>}
                  {item.status === '-' && <span className="status-badge status-stopped">-</span>}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Energy Saving Summary Table 컴포넌트
function EnergySavingSummaryTable({ data }) {
  // 장비 타입 결정 함수
  const getEquipmentType = (name) => {
    if (name.startsWith('SWP')) return 'swp'
    if (name.startsWith('FWP')) return 'fwp'
    if (name.startsWith('FAN')) return 'fan'
    return ''
  }

  return (
    <div className="energy-summary-table-wrapper">
      <table className="energy-summary-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Motor Capacity (kW)</th>
            <th>Actual Freq. (Hz)</th>
            <th>Actual Power (kW)</th>
            <th>KW Average</th>
            <th>Saved Power (kWh)</th>
            <th>Saved Ratio (%)</th>
            <th>Running Hours in ESS Mode</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const equipmentType = getEquipmentType(item.name)
            return (
              <tr key={index} className={`equipment-row ${equipmentType}`}>
                <td className="name-cell">{item.name}</td>
                <td className="numeric-cell">{item.motor_capacity}</td>
                <td className="numeric-cell">{item.actual_freq}</td>
                <td className="numeric-cell">{item.actual_power}</td>
                <td className="numeric-cell">{item.kw_average}</td>
                <td className="numeric-cell">{item.saved_kwh}</td>
                <td className={`numeric-cell ratio-cell ${item.saved_ratio > 0 ? 'positive' : ''}`}>
                  {item.saved_ratio}
                </td>
                <td className="numeric-cell">{item.run_hours_ess.toLocaleString()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard




