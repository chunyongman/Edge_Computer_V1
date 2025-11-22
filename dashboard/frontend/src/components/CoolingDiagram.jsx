import React, { useState } from 'react'
import './CoolingDiagram.css'

function CoolingDiagram({ sensors, pumps, onPumpCommand }) {
  const [selectedPump, setSelectedPump] = useState(null)

  // 펌프 데이터
  const fwPumps = pumps ? pumps.slice(0, 3) : []
  const swPumps = pumps ? pumps.slice(3, 6) : []

  const handlePumpClick = (pump, index, type) => {
    setSelectedPump({ ...pump, index, type })
  }

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
    <div className="cooling-diagram">
      {/* 헤더 */}
      <div className="diagram-header">
        <div className="header-left">
          <span className="company">OMTech Ecosave</span>
          <span className="mode">Info/Mode</span>
        </div>
        <div className="header-center">
          {new Date().toLocaleString('ko-KR', { 
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
        </div>
        <div className="header-right">
          <button className="btn-alarm">ALARM ACKN</button>
          <button className="btn-sound">SOUND STOP</button>
          <span className="operator">OPERATOR</span>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="main-title">COOLING WATER SYSTEM</div>

      {/* 다이어그램 */}
      <div className="diagram-content">
        <svg viewBox="0 0 1400 650" className="piping-svg">
          <defs>
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00ff00" />
            </marker>
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00bfff" />
            </marker>
          </defs>

          {/* 좌측 공급 라인 레이블 */}
          <text x="30" y="95" fontSize="11" fill="#ff0000" fontWeight="bold">To/From G/E &amp;</text>
          <text x="30" y="108" fontSize="11" fill="#ff0000" fontWeight="bold">Aux C.F.W. System</text>
          
          <text x="30" y="245" fontSize="11" fill="#ff0000" fontWeight="bold">To/From M/E</text>
          <text x="30" y="258" fontSize="11" fill="#ff0000" fontWeight="bold">AIR COOLER</text>
          
          <text x="30" y="415" fontSize="11" fill="#ff0000" fontWeight="bold">To/From M/E</text>
          <text x="30" y="428" fontSize="11" fill="#ff0000" fontWeight="bold">L.O. &amp; JKT COOLER</text>

          {/* 좌측 수직 메인 라인 (녹색) */}
          <line x1="200" y1="100" x2="240" y2="100" stroke="#00ff00" strokeWidth="8" markerEnd="url(#arrowGreen)" />
          <line x1="240" y1="100" x2="240" y2="150" stroke="#00ff00" strokeWidth="8" />
          <rect x="235" y="145" width="10" height="10" fill="#666" stroke="#000" />
          
          <line x1="200" y1="250" x2="240" y2="250" stroke="#00ff00" strokeWidth="8" markerEnd="url(#arrowGreen)" />
          <line x1="240" y1="250" x2="240" y2="300" stroke="#00ff00" strokeWidth="8" />
          <rect x="235" y="295" width="10" height="10" fill="#666" stroke="#000" />
          
          <line x1="200" y1="420" x2="240" y2="420" stroke="#00ff00" strokeWidth="8" markerEnd="url(#arrowGreen)" />
          <line x1="240" y1="420" x2="240" y2="480" stroke="#00ff00" strokeWidth="8" />
          <rect x="235" y="475" width="10" height="10" fill="#666" stroke="#000" />
          
          {/* 수직 메인 라인 */}
          <line x1="240" y1="150" x2="240" y2="530" stroke="#00ff00" strokeWidth="10" />

          {/* LT F.W. Cooling Pump 3대 */}
          {[0, 1, 2].map((idx) => {
            const pump = fwPumps[idx]
            const y = 150 + idx * 130
            const running = pump?.running || false
            const frequency = pump?.frequency || 0
            const mode = pump?.auto ? 'AUTO' : 'MANU'
            
            return (
              <g key={`fwp-${idx}`} onClick={() => handlePumpClick(pump, idx, 'FW')} style={{cursor: 'pointer'}}>
                {/* 입구 라인 */}
                <line x1="240" y1={y + 30} x2="280" y2={y + 30} stroke="#00ff00" strokeWidth="8" />
                <rect x="275" y={y + 25} width="10" height="10" fill="#666" stroke="#000" />
                
                {/* 펌프 박스 */}
                <rect x="290" y={y} width="120" height="85" fill={running ? "#b3d9ff" : "#e0e0e0"} 
                      stroke="#000" strokeWidth="2" rx="5" />
                
                {/* 주파수 표시 */}
                <text x="310" y={y + 18} fontSize="11" fontWeight="bold">{mode}</text>
                <text x="360" y={y + 18} fontSize="11" fontWeight="bold" fill={running ? "#00ff00" : "#666"}>
                  {frequency.toFixed(1)} Hz
                </text>
                
                {/* 펌프 심볼 */}
                <circle cx="330" cy={y + 40} r="18" fill="none" stroke="#000" strokeWidth="2" />
                <g className={running ? 'pump-rotating' : ''}>
                  <line x1="318" y1={y + 40} x2="342" y2={y + 40} stroke="#000" strokeWidth="2" />
                  <path d={`M342,${y + 40} l-6,-5 M342,${y + 40} l-6,5`} stroke="#000" strokeWidth="2" fill="none" />
                </g>
                
                {/* NO.X */}
                <text x="360" y={y + 35} fontSize="14" fontWeight="bold">NO.{idx + 1}</text>
                
                {/* 운전 시간 및 전력 */}
                <text x="360" y={y + 50} fontSize="11" fontWeight="bold">{pump?.run_hours || 0} h</text>
                <text x="360" y={y + 63} fontSize="11" fontWeight="bold">{pump?.power_kw || 0} kW</text>
                
                {/* 모드 표시 */}
                <rect x="300" y={y + 67} width="45" height="15" fill={mode === 'AUTO' ? '#00ff00' : '#fff'} stroke="#000" rx="2" />
                <text x="322" y={y + 78} fontSize="10" fontWeight="bold" textAnchor="middle">{mode}</text>
                
                {/* ESS 상태 */}
                <rect x="355" y={y + 67} width="40" height="15" fill={pump?.ess_mode ? '#00ff00' : '#fff'} stroke="#000" rx="2" />
                <text x="375" y={y + 78} fontSize="9" fill={pump?.ess_mode ? "#000" : "#ff0000"} fontWeight="bold" textAnchor="middle">
                  {pump?.ess_mode ? 'ESS' : 'GSP'}
                </text>
                
                {/* 출구 라인 */}
                <rect x="405" y={y + 25} width="10" height="10" fill="#666" stroke="#000" />
                <line x1="410" y1={y + 30} x2="460" y2={y + 30} stroke="#00ff00" strokeWidth="8" />
              </g>
            )
          })}

          {/* LT F.W. Cooling Pump 레이블 */}
          <text x="350" y="520" fontSize="13" fontWeight="bold" textAnchor="middle">LT F.W.</text>
          <text x="350" y="535" fontSize="13" fontWeight="bold" textAnchor="middle">Cooling Pump</text>

          {/* 펌프에서 열교환기로 연결 */}
          <line x1="460" y1="180" x2="560" y2="180" stroke="#00ff00" strokeWidth="8" />
          <line x1="460" y1="310" x2="560" y2="310" stroke="#00ff00" strokeWidth="8" />
          <line x1="460" y1="440" x2="480" y2="440" stroke="#00ff00" strokeWidth="8" />

          {/* 3-Way Temp Control Valve */}
          <circle cx="510" cy="505" r="30" fill="#f0f0f0" stroke="#000" strokeWidth="2" />
          <text x="510" y="495" fontSize="10" fontWeight="bold" textAnchor="middle">EP</text>
          <text x="510" y="508" fontSize="10" fontWeight="bold" textAnchor="middle">CON</text>
          <circle cx="510" cy="520" r="12" fill="#ddd" stroke="#000" strokeWidth="1" />
          <text x="510" y="524" fontSize="9" fontWeight="bold" textAnchor="middle">TC</text>
          <line x1="510" y1="532" x2="510" y2="550" stroke="#000" strokeWidth="2" />
          <path d="M505,545 L510,552 L515,545" fill="none" stroke="#000" strokeWidth="2" />
          <rect x="535" y="515" width="10" height="10" fill="#666" stroke="#000" />
          
          <line x1="480" y1="440" x2="510" y2="440" stroke="#00ff00" strokeWidth="8" />
          <line x1="510" y1="440" x2="510" y2="475" stroke="#00ff00" strokeWidth="8" />
          
          <text x="510" y="570" fontSize="10" fontWeight="bold" textAnchor="middle">3-Way</text>
          <text x="510" y="582" fontSize="10" fontWeight="bold" textAnchor="middle">Temp. Control</text>
          <text x="510" y="594" fontSize="10" fontWeight="bold" textAnchor="middle">Valve</text>

          {/* NO.1 Central F.W. CLR */}
          <rect x="650" y="130" width="140" height="110" fill="#6495ed" stroke="#000" strokeWidth="3" rx="5" />
          <text x="720" y="155" fontSize="16" fontWeight="bold" fill="#fff" textAnchor="middle">NO.1</text>
          <text x="720" y="175" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">Central</text>
          <text x="720" y="195" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">F.W.</text>
          <text x="720" y="215" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">CLR</text>
          
          {/* 밸브 입구 */}
          <rect x="635" y="175" width="10" height="10" fill="#666" stroke="#000" />
          <line x1="560" y1="180" x2="640" y2="180" stroke="#00ff00" strokeWidth="8" />
          
          {/* 온도 센서 TX4A, TX5A */}
          <circle cx="610" cy="150" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="610" y="138" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="610" y="155" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX4A</text>
          <text x="610" y="175" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#fff">
            {sensors?.TX4A?.toFixed(1) || '0.0'} °C
          </text>
          
          <circle cx="610" cy="220" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="610" y="208" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="610" y="225" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX5A</text>
          <text x="610" y="245" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#fff">
            {sensors?.TX5A?.toFixed(1) || '0.0'} °C
          </text>

          {/* NO.2 Central F.W. CLR */}
          <rect x="650" y="290" width="140" height="110" fill="#6495ed" stroke="#000" strokeWidth="3" rx="5" />
          <text x="720" y="315" fontSize="16" fontWeight="bold" fill="#fff" textAnchor="middle">NO.2</text>
          <text x="720" y="335" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">Central</text>
          <text x="720" y="355" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">F.W.</text>
          <text x="720" y="375" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">CLR</text>
          
          {/* 밸브 입구 */}
          <rect x="635" y="305" width="10" height="10" fill="#666" stroke="#000" />
          <line x1="560" y1="310" x2="640" y2="310" stroke="#00ff00" strokeWidth="8" />
          
          {/* 온도 센서 TX4B, TX5B */}
          <circle cx="610" cy="280" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="610" y="268" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="610" y="285" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX4B</text>
          <text x="610" y="305" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#fff">
            {sensors?.TX4B?.toFixed(1) || '0.0'} °C
          </text>
          
          <circle cx="610" cy="385" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="610" y="373" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="610" y="390" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX5B</text>
          <text x="610" y="410" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#fff">
            {sensors?.TX5B?.toFixed(1) || '0.0'} °C
          </text>

          {/* 열교환기 출구 (파란색 해수) */}
          <rect x="785" y="175" width="10" height="10" fill="#666" stroke="#000" />
          <line x1="790" y1="180" x2="1000" y2="180" stroke="#00bfff" strokeWidth="8" markerEnd="url(#arrowBlue)" />
          
          <rect x="785" y="340" width="10" height="10" fill="#666" stroke="#000" />
          <line x1="790" y1="345" x2="1000" y2="345" stroke="#00bfff" strokeWidth="8" />
          
          {/* TX2, TX3 */}
          <circle cx="850" cy="160" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="850" y="148" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="850" y="165" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX2</text>
          <text x="850" y="190" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#fff">
            {sensors?.TX2?.toFixed(1) || '0.0'} °C
          </text>
          
          <circle cx="850" cy="365" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="850" y="353" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="850" y="370" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX3</text>
          <text x="850" y="395" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#fff">
            {sensors?.TX3?.toFixed(1) || '0.0'} °C
          </text>

          {/* 우측 수직 라인 */}
          <line x1="1000" y1="180" x2="1000" y2="550" stroke="#00bfff" strokeWidth="8" />
          <line x1="1000" y1="345" x2="1000" y2="550" stroke="#00bfff" strokeWidth="8" />
          
          {/* 우측 출구 */}
          <line x1="1000" y1="180" x2="1150" y2="180" stroke="#00bfff" strokeWidth="8" markerEnd="url(#arrowBlue)" />
          <text x="1170" y="175" fontSize="9" fill="#ff0000" fontWeight="bold">To ESS</text>
          <text x="1170" y="188" fontSize="9" fontWeight="bold">???</text>
          
          {/* JB, TI */}
          <rect x="1090" y="215" width="25" height="20" fill="#fff" stroke="#ff0000" strokeWidth="2" rx="2" />
          <text x="1102" y="229" fontSize="10" fill="#ff0000" fontWeight="bold" textAnchor="middle">JB</text>
          
          <circle cx="1140" cy="240" r="18" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="1140" y="237" fontSize="9" fontWeight="bold" textAnchor="middle">TI</text>
          <text x="1140" y="248" fontSize="8" fontWeight="bold" textAnchor="middle">1072</text>
          
          {/* TX1, PX1 */}
          <circle cx="1040" cy="330" r="18" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="1040" y="335" fontSize="11" fill="#fff" fontWeight="bold" textAnchor="middle">TX1</text>
          <text x="1040" y="355" fontSize="9" textAnchor="middle" fontWeight="bold">
            {sensors?.TX1?.toFixed(1) || '0.0'} °C
          </text>
          
          <circle cx="1120" cy="365" r="18" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="1120" y="350" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          <text x="1120" y="370" fontSize="11" fill="#fff" fontWeight="bold" textAnchor="middle">PX1</text>
          <text x="1120" y="390" fontSize="9" textAnchor="middle" fontWeight="bold">
            {sensors?.PX1?.toFixed(2) || '0.00'} kg/cm²
          </text>
          
          {/* PT, PI */}
          <circle cx="1170" cy="395" r="16" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="1170" y="399" fontSize="9" fontWeight="bold" textAnchor="middle">PT</text>
          
          <circle cx="1220" cy="410" r="18" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="1220" y="407" fontSize="9" fontWeight="bold" textAnchor="middle">PI</text>
          <text x="1220" y="418" fontSize="8" fontWeight="bold" textAnchor="middle">1071</text>

          {/* M/E LOAD */}
          <text x="950" y="490" fontSize="11" fontWeight="bold" textAnchor="middle">M/E LOAD</text>
          <text x="950" y="505" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#00ff00">
            {sensors?.PU1?.toFixed(1) || '0.0'} %
          </text>

          {/* Cooling S.W. Pump 3대 */}
          <line x1="850" y1="580" x2="1300" y2="580" stroke="#00bfff" strokeWidth="10" />
          
          {[0, 1, 2].map((idx) => {
            const pump = swPumps[idx]
            const x = 900 + idx * 130
            const running = pump?.running || false
            const frequency = pump?.frequency || 0
            const mode = pump?.auto ? 'AUTO' : 'MANU'
            
            return (
              <g key={`swp-${idx}`} onClick={() => handlePumpClick(pump, idx, 'SW')} style={{cursor: 'pointer'}}>
                {/* 펌프 박스 */}
                <rect x={x - 50} y="470" width="100" height="90" fill={running ? "#b3d9ff" : "#e0e0e0"} 
                      stroke="#000" strokeWidth="2" rx="5" />
                
                {/* NO.X */}
                <text x={x} y="490" fontSize="13" fontWeight="bold" textAnchor="middle">NO.{idx + 1}</text>
                
                {/* 펌프 심볼 */}
                <circle cx={x} cy="515" r="16" fill="none" stroke="#000" strokeWidth="2" />
                <g className={running ? 'pump-rotating' : ''}>
                  <line x1={x - 10} y1="515" x2={x + 10} y2="515" stroke="#000" strokeWidth="2" />
                  <path d={`M${x + 10},515 l-5,-4 M${x + 10},515 l-5,4`} stroke="#000" strokeWidth="2" fill="none" />
                </g>
                
                {/* 주파수 및 모드 표시 */}
                <text x={x - 35} y="505" fontSize="10" fontWeight="bold">{mode}</text>
                <text x={x + 20} y="505" fontSize="10" fontWeight="bold" fill={running ? "#00ff00" : "#666"}>
                  {frequency.toFixed(1)} Hz
                </text>
                <text x={x + 20} y="528" fontSize="10" fontWeight="bold">
                  {pump?.run_hours || 0} h
                </text>
                
                {/* 모드 버튼 */}
                <rect x={x - 40} y="542" width="35" height="13" fill={mode === 'MANU' ? '#fff' : '#00ff00'} stroke="#000" rx="2" />
                <text x={x - 22} y="551" fontSize="9" fontWeight="bold" textAnchor="middle">MANU</text>
                
                {/* ESS 상태 */}
                <rect x={x + 5} y="542" width="35" height="13" fill={pump?.ess_mode ? '#00ff00' : '#fff'} stroke="#000" rx="2" />
                <text x={x + 22} y="551" fontSize="8" fill={pump?.ess_mode ? "#000" : "#ff0000"} fontWeight="bold" textAnchor="middle">
                  {pump?.ess_mode ? 'ESS' : 'GSP'}
                </text>
                
                {/* 밸브 상하 */}
                <rect x={x - 5} y="560" width="10" height="10" fill="#666" stroke="#000" />
                <rect x={x - 5} y="588" width="10" height="10" fill="#666" stroke="#000" />
                <line x1={x} y1="570" x2={x} y2="588" stroke="#00bfff" strokeWidth="6" />
              </g>
            )
          })}

          {/* Cooling S.W. Pump 레이블 */}
          <text x="1030" y="630" fontSize="13" fontWeight="bold" textAnchor="middle">Cooling</text>
          <text x="1030" y="645" fontSize="13" fontWeight="bold" textAnchor="middle">S.W. Pump</text>
          
          {/* 하단 해수 곡선 */}
          <path d="M 850,580 Q 820,580 820,610 L 820,650" stroke="#00bfff" strokeWidth="10" fill="none" />
          <path d="M 1300,580 Q 1330,580 1330,610 L 1330,650" stroke="#00bfff" strokeWidth="10" fill="none" />
        </svg>
      </div>

      {/* 하단 네비게이션 */}
      <div className="bottom-nav">
        <button className="nav-btn active">COOLING WATER</button>
        <button className="nav-btn">ENERGY SAVE</button>
        <button className="nav-btn">ALARM</button>
        <button className="nav-btn">EVENT</button>
        <button className="nav-btn">PARAMETER</button>
      </div>

      {/* 펌프 상세 팝업 */}
      {selectedPump && (
        <div className="pump-popup" onClick={() => setSelectedPump(null)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPump.type === 'FW' ? 'FWP' : 'SWP'} #{selectedPump.index + 1}</h3>
            <button className="close-btn" onClick={() => setSelectedPump(null)}>×</button>
            <div className="popup-data">
              <div><span>상태:</span><span className={selectedPump.running ? 'on' : 'off'}>
                {selectedPump.running ? '🟢 운전' : '⚪ 정지'}</span></div>
              <div><span>주파수:</span><span>{selectedPump.frequency?.toFixed(1) || 0} Hz</span></div>
              <div><span>전력:</span><span>{selectedPump.power_kw || 0} kW</span></div>
              <div><span>절감:</span><span>{selectedPump.saved_kwh?.toLocaleString() || 0} kWh</span></div>
              <div><span>운전시간:</span><span>{selectedPump.run_hours?.toLocaleString() || 0} h</span></div>
              <div><span>모드:</span><span>{selectedPump.auto ? 'AUTO' : 'MANUAL'}</span></div>
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
          </div>
        </div>
      )}
    </div>
  )
}

export default CoolingDiagram
