import React, { useState, useEffect } from 'react'
import './TrendChart.css'

function TrendChart({ sensors = {}, pumps = [] }) {
  const [history, setHistory] = useState([])
  const maxPoints = 50

  useEffect(() => {
    if (Object.keys(sensors).length > 0) {
      const timestamp = new Date().toLocaleTimeString('ko-KR')
      const newPoint = {
        time: timestamp,
        TX1: sensors.TX1 || 0,
        TX2: sensors.TX2 || 0,
        TX3: sensors.TX3 || 0,
        TX4: sensors.TX4 || 0,
        TX5: sensors.TX5 || 0,
        TX6: sensors.TX6 || 0,
        TX7: sensors.TX7 || 0,
        DPX1: sensors.DPX1 || 0,
        PU1: sensors.PU1 || 0,
        totalPower: pumps.reduce((sum, p) => sum + (p.power_kw || 0), 0),
      }

      setHistory(prev => {
        const updated = [...prev, newPoint]
        if (updated.length > maxPoints) {
          return updated.slice(-maxPoints)
        }
        return updated
      })
    }
  }, [sensors, pumps])

  return (
    <div className="trend-chart">
      <div className="chart-header">
        <h2>📈 실시간 트렌드</h2>
        <p>최근 {maxPoints}개 데이터 포인트</p>
      </div>

      <div className="charts-grid">
        {/* 첫 번째 줄 (3개) */}
        <ChartPanel
          title="CSW 펌프 토출 온도 (TX1)"
          data={history}
          dataKey="TX1"
          unit="°C"
          color="#ef4444"
        />
        <ChartPanel
          title="FW Cooler 1 SW Out (TX2)"
          data={history}
          dataKey="TX2"
          unit="°C"
          color="#f97316"
        />
        <ChartPanel
          title="FW Cooler 2 SW Out (TX3)"
          data={history}
          dataKey="TX3"
          unit="°C"
          color="#fb923c"
        />

        {/* 두 번째 줄 (3개) */}
        <ChartPanel
          title="FW Cooler FW In (TX4)"
          data={history}
          dataKey="TX4"
          unit="°C"
          color="#dc2626"
        />
        <ChartPanel
          title="FW Cooler FW Out (TX5)"
          data={history}
          dataKey="TX5"
          unit="°C"
          color="#06b6d4"
        />
        <ChartPanel
          title="CSW 펌프 토출 압력 (DPX1)"
          data={history}
          dataKey="DPX1"
          unit="kg/cm²"
          color="#3b82f6"
        />

        {/* 세 번째 줄 (2개) */}
        <ChartPanel
          title="E/R Inside Temp (TX6)"
          data={history}
          dataKey="TX6"
          unit="°C"
          color="#b91c1c"
        />
        <ChartPanel
          title="E/R Outside Temp (TX7)"
          data={history}
          dataKey="TX7"
          unit="°C"
          color="#0891b2"
        />

        {/* 네 번째 줄 (2개) */}
        <ChartPanel
          title="M/E 부하 트렌드 (PU1)"
          data={history}
          dataKey="PU1"
          unit="%"
          color="#10b981"
        />
        <ChartPanel
          title="총 소비 전력"
          data={history}
          dataKey="totalPower"
          unit="kW"
          color="#f59e0b"
        />
      </div>
    </div>
  )
}

function ChartPanel({ title, data, dataKey, unit, color }) {
  const values = data.map(d => d[dataKey])
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = max - min || 1
  const latest = values[values.length - 1] || 0

  return (
    <div className="chart-panel">
      <div className="chart-panel-header">
        <h3>{title}</h3>
        <span className="current-value" style={{ color }}>
          {latest.toFixed(2)} {unit}
        </span>
      </div>
      
      <div className="chart-container">
        <svg className="chart-svg" viewBox="0 0 500 200">
          {/* 그리드 라인 */}
          <line x1="0" y1="0" x2="500" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="50" x2="500" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="150" x2="500" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="200" x2="500" y2="200" stroke="#334155" strokeWidth="1" />

          {/* 데이터 라인 */}
          {values.length > 1 && (
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="3"
              points={values.map((val, idx) => {
                const x = (idx / (values.length - 1)) * 500
                const y = 200 - ((val - min) / range) * 200
                return `${x},${y}`
              }).join(' ')}
            />
          )}

          {/* 데이터 포인트 */}
          {values.map((val, idx) => {
            const x = (idx / Math.max(values.length - 1, 1)) * 500
            const y = 200 - ((val - min) / range) * 200
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="3"
                fill={color}
              />
            )
          })}
        </svg>
      </div>

      <div className="chart-footer">
        <span>최소: {min.toFixed(2)}</span>
        <span>최대: {max.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default TrendChart




