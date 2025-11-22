import React, { useState } from 'react'
import './CoolingDiagramOverlay.css'

function CoolingDiagramOverlay({ sensors = {}, pumps = [] }) {
  const [selectedPump, setSelectedPump] = useState(null)

  // 펌프 데이터
  const fwPumps = Array.isArray(pumps) && pumps.length >= 3 ? pumps.slice(0, 3) : [{}, {}, {}]
  const swPumps = Array.isArray(pumps) && pumps.length >= 6 ? pumps.slice(3, 6) : [{}, {}, {}]
  
  console.log('CoolingDiagramOverlay - sensors:', sensors)
  console.log('CoolingDiagramOverlay - pumps:', pumps)
  console.log('CoolingDiagramOverlay - fwPumps:', fwPumps)
  console.log('CoolingDiagramOverlay - swPumps:', swPumps)

  return (
    <div className="cooling-overlay-wrapper">
      {/* 헤더 */}
      <div className="overlay-header">
        <div className="overlay-header-left">
          <span className="overlay-company">OMTech Ecosave</span>
          <span className="overlay-mode">Info/Mode</span>
        </div>
        <div className="overlay-header-center">
          {new Date().toLocaleString('ko-KR', { 
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
        </div>
        <div className="overlay-header-right">
          <button className="overlay-btn">ALARM ACKN</button>
          <button className="overlay-btn">SOUND STOP</button>
          <span className="overlay-operator">OPERATOR</span>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="overlay-title">COOLING WATER SYSTEM</div>

      {/* 다이어그램 컨테이너 */}
      <div className="overlay-diagram-container">
        {/* 배경 이미지를 data URI로 직접 삽입 (원본 이미지 기반) */}
        <div className="overlay-background">
          {/* SVG로 원본 재현 - 이번에는 정확하게 */}
          <svg viewBox="0 0 1400 750" className="overlay-svg" preserveAspectRatio="xMidYMid meet">
            {/* 배경 */}
            <rect width="1400" height="750" fill="#f0f0f0" />
            
            {/* 좌측 텍스트 라벨들 */}
            <text x="100" y="143" fontSize="10" fill="#ff0000" fontWeight="bold" fontFamily="Arial">To/From G/E &amp;</text>
            <text x="100" y="154" fontSize="10" fill="#ff0000" fontWeight="bold" fontFamily="Arial">Aux C.F.W. System</text>
            
            <text x="100" y="280" fontSize="10" fill="#ff0000" fontWeight="bold" fontFamily="Arial">To/From M/E</text>
            <text x="100" y="291" fontSize="10" fill="#ff0000" fontWeight="bold" fontFamily="Arial">AIR COOLER</text>
            
            <text x="100" y="477" fontSize="10" fill="#ff0000" fontWeight="bold" fontFamily="Arial">To/From M/E</text>
            <text x="100" y="488" fontSize="10" fill="#ff0000" fontWeight="bold" fontFamily="Arial">L.O. &amp; JKT COOLER</text>

            {/* 좌측 녹색 수직 메인 라인 */}
            <line x1="233" y1="148" x2="280" y2="148" stroke="#00ff00" strokeWidth="7" />
            <polygon points="280,148 295,143 295,153" fill="#00ff00" />
            <rect x="288" y="153" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="292" y1="161" x2="292" y2="570" stroke="#00ff00" strokeWidth="9" />
            
            <line x1="233" y1="285" x2="292" y2="285" stroke="#00ff00" strokeWidth="7" />
            <polygon points="260,285 275,280 275,290" fill="#00ff00" />
            <rect x="288" y="281" width="8" height="8" fill="#666" stroke="#000" />
            
            <line x1="233" y1="482" x2="292" y2="482" stroke="#00ff00" strokeWidth="7" />
            <polygon points="260,482 275,477 275,487" fill="#00ff00" />
            <rect x="288" y="478" width="8" height="8" fill="#666" stroke="#000" />

            {/* FW Pump NO.1 */}
            <rect x="292" y="148" x2="8" height="8" fill="#666" stroke="#000" />
            <line x1="292" y1="152" x2="340" y2="152" stroke="#00ff00" strokeWidth="7" />
            <text x="329" y="107" fontSize="9" fill="#999" fontWeight="bold">STOP</text>
            <rect x="336" y="125" width="110" height="85" fill="#d9e6f2" stroke="#000" strokeWidth="2" rx="4" />
            <text x="340" y="139" fontSize="9" fontWeight="bold">???</text>
            <text x="405" y="139" fontSize="9" fontWeight="bold">NO.1</text>
            <circle cx="370" cy="157" r="16" fill="none" stroke="#000" strokeWidth="2" />
            <line x1="360" y1="157" x2="380" y2="157" stroke="#000" strokeWidth="2" />
            <polygon points="380,157 375,153 375,161" fill="#000" />
            <text x="405" y="158" fontSize="9" fontWeight="bold">???</text>
            <text x="405" y="171" fontSize="9" fontWeight="bold">???</text>
            <rect x="345" y="188" width="40" height="15" fill="#fff" stroke="#000" rx="2" />
            <text x="365" y="198" fontSize="9" fontWeight="bold" textAnchor="middle">MANU</text>
            <rect x="395" y="188" width="40" height="15" fill="#fff" stroke="#000" rx="2" />
            <text x="415" y="198" fontSize="8" fill="#ff0000" fontWeight="bold" textAnchor="middle">GSP</text>
            <rect x="441" y="148" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="445" y1="152" x2="560" y2="152" stroke="#00ff00" strokeWidth="7" />

            {/* FW Pump NO.2 */}
            <rect x="292" y="281" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="292" y1="285" x2="340" y2="285" stroke="#00ff00" strokeWidth="7" />
            <text x="329" y="240" fontSize="9" fill="#999" fontWeight="bold">STOP</text>
            <rect x="336" y="258" width="110" height="85" fill="#d9e6f2" stroke="#000" strokeWidth="2" rx="4" />
            <text x="340" y="272" fontSize="9" fontWeight="bold">???</text>
            <text x="405" y="272" fontSize="9" fontWeight="bold">NO.2</text>
            <circle cx="370" cy="290" r="16" fill="none" stroke="#000" strokeWidth="2" />
            <line x1="360" y1="290" x2="380" y2="290" stroke="#000" strokeWidth="2" />
            <polygon points="380,290 375,286 375,294" fill="#000" />
            <text x="405" y="291" fontSize="9" fontWeight="bold">???</text>
            <text x="405" y="304" fontSize="9" fontWeight="bold">???</text>
            <rect x="345" y="321" width="40" height="15" fill="#fff" stroke="#000" rx="2" />
            <text x="365" y="331" fontSize="9" fontWeight="bold" textAnchor="middle">MANU</text>
            <rect x="395" y="321" width="40" height="15" fill="#fff" stroke="#000" rx="2" />
            <text x="415" y="331" fontSize="8" fill="#ff0000" fontWeight="bold" textAnchor="middle">GSP</text>
            <rect x="441" y="281" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="445" y1="285" x2="560" y2="285" stroke="#00ff00" strokeWidth="7" />

            {/* FW Pump NO.3 */}
            <rect x="292" y="478" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="292" y1="482" x2="340" y2="482" stroke="#00ff00" strokeWidth="7" />
            <text x="329" y="437" fontSize="9" fill="#999" fontWeight="bold">STOP</text>
            <rect x="336" y="455" width="110" height="85" fill="#d9e6f2" stroke="#000" strokeWidth="2" rx="4" />
            <text x="340" y="469" fontSize="9" fontWeight="bold">???</text>
            <text x="405" y="469" fontSize="9" fontWeight="bold">NO.3</text>
            <circle cx="370" cy="487" r="16" fill="none" stroke="#000" strokeWidth="2" />
            <line x1="360" y1="487" x2="380" y2="487" stroke="#000" strokeWidth="2" />
            <polygon points="380,487 375,483 375,491" fill="#000" />
            <text x="405" y="488" fontSize="9" fontWeight="bold">???</text>
            <text x="405" y="501" fontSize="9" fontWeight="bold">???</text>
            <rect x="345" y="518" width="40" height="15" fill="#fff" stroke="#000" rx="2" />
            <text x="365" y="528" fontSize="9" fontWeight="bold" textAnchor="middle">MANU</text>
            <rect x="395" y="518" width="40" height="15" fill="#fff" stroke="#000" rx="2" />
            <text x="415" y="528" fontSize="8" fill="#ff0000" fontWeight="bold" textAnchor="middle">GSP</text>
            <rect x="441" y="478" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="445" y1="482" x2="500" y2="482" stroke="#00ff00" strokeWidth="7" />

            {/* LT F.W. Cooling Pump 레이블 */}
            <text x="391" y="575" fontSize="11" fontWeight="bold" textAnchor="middle">LT F.W.</text>
            <text x="391" y="588" fontSize="11" fontWeight="bold" textAnchor="middle">Cooling Pump</text>

            {/* 3-Way Valve */}
            <line x1="500" y1="482" x2="536" y2="482" stroke="#00ff00" strokeWidth="7" />
            <line x1="536" y1="482" x2="536" y2="540" stroke="#00ff00" strokeWidth="7" />
            <circle cx="575" cy="565" r="26" fill="#e8e8e8" stroke="#000" strokeWidth="2" />
            <text x="575" y="556" fontSize="10" fontWeight="bold" textAnchor="middle">EP</text>
            <text x="575" y="568" fontSize="10" fontWeight="bold" textAnchor="middle">CON</text>
            <circle cx="575" cy="580" r="11" fill="#d0d0d0" stroke="#000" strokeWidth="1" />
            <text x="575" y="584" fontSize="8" fontWeight="bold" textAnchor="middle">TC</text>
            <line x1="575" y1="591" x2="575" y2="605" stroke="#000" strokeWidth="2" />
            <polygon points="570,600 575,607 580,600" fill="none" stroke="#000" strokeWidth="2" />
            <text x="575" y="623" fontSize="9" fontWeight="bold" textAnchor="middle">3-Way</text>
            <text x="575" y="634" fontSize="9" fontWeight="bold" textAnchor="middle">Temp. Control</text>
            <text x="575" y="645" fontSize="9" fontWeight="bold" textAnchor="middle">Valve</text>
            <rect x="593" y="560" width="8" height="8" fill="#666" stroke="#000" />

            {/* NO.1 Central F.W. CLR */}
            <text x="679" y="45" fontSize="9" fontWeight="bold" textAnchor="middle">0.0 °C</text>
            <circle cx="609" cy="107" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="609" y="88" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="609" y="112" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX4A</text>
            <rect x="645" y="100" width="130" height="110" fill="#6495ed" stroke="#000" strokeWidth="3" rx="5" />
            <text x="710" y="125" fontSize="16" fontWeight="bold" fill="#fff" textAnchor="middle">NO.1</text>
            <text x="710" y="145" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">Central</text>
            <text x="710" y="165" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">F.W.</text>
            <text x="710" y="185" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">CLR</text>
            <rect x="635" y="148" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="560" y1="152" x2="640" y2="152" stroke="#00ff00" strokeWidth="7" />
            <circle cx="609" cy="167" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="609" y="148" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="609" y="172" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX5A</text>

            {/* TX2 */}
            <circle cx="815" cy="108" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="815" y="89" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="815" y="113" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX2</text>
            <rect x="770" y="148" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="774" y1="152" x2="900" y2="152" stroke="#00bfff" strokeWidth="7" />
            <line x1="900" y1="152" x2="1050" y2="152" stroke="#00bfff" strokeWidth="7" />
            <polygon points="1050,152 1065,147 1065,157" fill="#00bfff" />

            {/* NO.2 Central F.W. CLR */}
            <circle cx="609" cy="240" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="609" y="221" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="609" y="245" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX4B</text>
            <rect x="645" y="270" width="130" height="110" fill="#6495ed" stroke="#000" strokeWidth="3" rx="5" />
            <text x="710" y="295" fontSize="16" fontWeight="bold" fill="#fff" textAnchor="middle">NO.2</text>
            <text x="710" y="315" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">Central</text>
            <text x="710" y="335" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">F.W.</text>
            <text x="710" y="355" fontSize="14" fontWeight="bold" fill="#fff" textAnchor="middle">CLR</text>
            <rect x="635" y="281" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="560" y1="285" x2="640" y2="285" stroke="#00ff00" strokeWidth="7" />
            <circle cx="609" cy="370" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="609" y="351" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="609" y="375" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX5B</text>
            <text x="679" y="258" fontSize="9" fontWeight="bold" textAnchor="middle">0.0 °C</text>

            {/* TX3 */}
            <circle cx="815" cy="304" r="16" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="815" y="285" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="815" y="309" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX3</text>
            <text x="815" y="330" fontSize="9" fontWeight="bold" textAnchor="middle">???</text>
            <rect x="770" y="315" width="8" height="8" fill="#666" stroke="#000" />
            <line x1="774" y1="319" x2="900" y2="319" stroke="#00bfff" strokeWidth="7" />

            {/* 우측 수직 라인 */}
            <line x1="900" y1="152" x2="900" y2="525" stroke="#00bfff" strokeWidth="8" />
            <line x1="900" y1="319" x2="900" y2="525" stroke="#00bfff" strokeWidth="8" />

            {/* 우측 출구 및 센서 */}
            <text x="1085" y="145" fontSize="9" fill="#ff0000" fontWeight="bold">To ESS</text>
            <text x="1085" y="158" fontSize="9" fontWeight="bold">???</text>
            <rect x="1060" y="172" width="26" height="20" fill="#fff" stroke="#ff0000" strokeWidth="2" rx="2" />
            <text x="1073" y="185" fontSize="10" fill="#ff0000" fontWeight="bold" textAnchor="middle">JB</text>
            <circle cx="1110" cy="207" r="17" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="1110" y="204" fontSize="9" fontWeight="bold" textAnchor="middle">TI</text>
            <text x="1110" y="214" fontSize="8" fontWeight="bold" textAnchor="middle">1072</text>

            {/* TX1 */}
            <circle cx="950" cy="290" r="18" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="950" y="296" fontSize="11" fill="#fff" fontWeight="bold" textAnchor="middle">TX1</text>

            {/* PX1 */}
            <circle cx="1030" cy="340" r="18" fill="#ff0000" stroke="#000" strokeWidth="2" />
            <text x="1030" y="321" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
            <text x="1030" y="346" fontSize="11" fill="#fff" fontWeight="bold" textAnchor="middle">PX1</text>
            <circle cx="1080" cy="375" r="15" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="1080" y="379" fontSize="9" fontWeight="bold" textAnchor="middle">PT</text>
            <circle cx="1120" cy="392" r="17" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x="1120" y="389" fontSize="9" fontWeight="bold" textAnchor="middle">PI</text>
            <text x="1120" y="399" fontSize="8" fontWeight="bold" textAnchor="middle">1071</text>

            {/* M/E LOAD */}
            <text x="677" y="420" fontSize="10" fontWeight="bold" textAnchor="middle">M/E LOAD</text>
            <text x="677" y="433" fontSize="10" fontWeight="bold" textAnchor="middle">???</text>

            {/* SW Pump 3대 */}
            <line x1="770" y1="525" x2="1175" y2="525" stroke="#00bfff" strokeWidth="9" />

            {[0, 1, 2].map((idx) => {
              const x = 730 + idx * 142
              return (
                <g key={`swp-${idx}`}>
                  <text x={x + 45} y="467" fontSize="9" fill="#999" fontWeight="bold">STOP</text>
                  <rect x={x} y="480" width="95" height="80" fill="#d9e6f2" stroke="#000" strokeWidth="2" rx="4" />
                  <text x={x + 47} y="498" fontSize="12" fontWeight="bold" textAnchor="middle">NO.{idx + 1}</text>
                  <circle cx={x + 47} cy="515" r="15" fill="none" stroke="#000" strokeWidth="2" />
                  <line x1={x + 38} y1="515" x2={x + 56} y2="515" stroke="#000" strokeWidth="2" />
                  <polygon points={`${x + 56},515 ${x + 51},511 ${x + 51},519`} fill="#000" />
                  <text x={x + 15} y="511" fontSize="9" fontWeight="bold">???</text>
                  <text x={x + 67} y="511" fontSize="9" fontWeight="bold">???</text>
                  <text x={x + 67} y="526" fontSize="9" fontWeight="bold">???</text>
                  <rect x={x + 10} y="540" width="34" height="13" fill="#fff" stroke="#000" rx="2" />
                  <text x={x + 27} y="549" fontSize="8" fontWeight="bold" textAnchor="middle">MANU</text>
                  <rect x={x + 50} y="540" width="34" height="13" fill="#fff" stroke="#000" rx="2" />
                  <text x={x + 67} y="549" fontSize="8" fill="#ff0000" fontWeight="bold" textAnchor="middle">GSP</text>
                  <rect x={x + 43} y="556" width="8" height="8" fill="#666" stroke="#000" />
                  <line x1={x + 47} y1="564" x2={x + 47} y2="582" stroke="#00bfff" strokeWidth="6" />
                  <rect x={x + 43} y="577" width="8" height="8" fill="#666" stroke="#000" />
                </g>
              )
            })}

            {/* Cooling S.W. Pump 레이블 */}
            <text x="942" y="618" fontSize="12" fontWeight="bold" textAnchor="middle">Cooling</text>
            <text x="942" y="633" fontSize="12" fontWeight="bold" textAnchor="middle">S.W. Pump</text>

            {/* 하단 곡선 */}
            <path d="M 770,525 Q 745,525 745,550 L 745,608" stroke="#00bfff" strokeWidth="9" fill="none" />
            <path d="M 1175,525 Q 1200,525 1200,550 L 1200,608" stroke="#00bfff" strokeWidth="9" fill="none" />
          </svg>
        </div>

        {/* 실시간 데이터 오버레이 */}
        <div className="overlay-data-layer">
          {/* FW Pump 상태 오버레이 */}
          {fwPumps.map((pump, idx) => (
            <div 
              key={`fw-${idx}`}
              className="overlay-pump-indicator"
              style={{
                position: 'absolute',
                left: `${30.5}%`,
                top: `${20.5 + idx * 21.5}%`,
                cursor: 'pointer'
              }}
              onClick={() => setSelectedPump({...pump, index: idx, type: 'FW'})}
            >
              {pump?.status === 1 && (
                <div className="overlay-running-badge">⚡ RUN</div>
              )}
            </div>
          ))}

          {/* SW Pump 상태 오버레이 */}
          {swPumps.map((pump, idx) => (
            <div 
              key={`sw-${idx}`}
              className="overlay-pump-indicator"
              style={{
                position: 'absolute',
                left: `${64.5 + idx * 12.6}%`,
                top: `${79}%`,
                cursor: 'pointer'
              }}
              onClick={() => setSelectedPump({...pump, index: idx, type: 'SW'})}
            >
              {pump?.status === 1 && (
                <div className="overlay-running-badge">⚡ RUN</div>
              )}
            </div>
          ))}

          {/* 센서 값 오버레이 */}
          <div className="overlay-sensor-value" style={{left: '54%', top: '7.4%'}}>
            {sensors.TX4A ? sensors.TX4A.toFixed(1) : '0.0'} °C
          </div>
          <div className="overlay-sensor-value" style={{left: '54%', top: '24.5%'}}>
            {sensors.TX5A ? sensors.TX5A.toFixed(1) : '0.0'} °C
          </div>
          <div className="overlay-sensor-value" style={{left: '54%', top: '42.5%'}}>
            {sensors.TX4B ? sensors.TX4B.toFixed(1) : '0.0'} °C
          </div>
          <div className="overlay-sensor-value" style={{left: '54%', top: '61%'}}>
            {sensors.TX5B ? sensors.TX5B.toFixed(1) : '0.0'} °C
          </div>
          <div className="overlay-sensor-value" style={{left: '72.5%', top: '54.3%'}}>
            {sensors.TX2 ? sensors.TX2.toFixed(1) : '???'}
          </div>
          <div className="overlay-sensor-value" style={{left: '60.3%', top: '69%'}}>
            {sensors.ME_load ? sensors.ME_load.toFixed(0) : '???'}
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="overlay-nav">
        <button className="overlay-nav-btn overlay-nav-active">COOLING WATER</button>
        <button className="overlay-nav-btn">ENERGY SAVE</button>
        <button className="overlay-nav-btn">ALARM</button>
        <button className="overlay-nav-btn">EVENT</button>
        <button className="overlay-nav-btn">PARAMETER</button>
      </div>

      {/* 팝업 */}
      {selectedPump && (
        <div className="overlay-popup-bg" onClick={() => setSelectedPump(null)}>
          <div className="overlay-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPump.type === 'FW' ? 'LT F.W. Cooling Pump' : 'Cooling S.W. Pump'} #{selectedPump.index + 1}</h3>
            <button className="overlay-popup-close" onClick={() => setSelectedPump(null)}>×</button>
            <div className="overlay-popup-body">
              <div><span>Status:</span><span className={selectedPump.status === 1 ? 'status-on' : 'status-off'}>
                {selectedPump.status === 1 ? '⚡ Running' : '⏸ Stopped'}</span></div>
              <div><span>Frequency:</span><span>{selectedPump.frequency ? selectedPump.frequency.toFixed(1) : 0} Hz</span></div>
              <div><span>Power:</span><span>{selectedPump.power ? selectedPump.power.toFixed(1) : 0} kW</span></div>
              <div><span>Saved Power:</span><span>{selectedPump.saved_power ? selectedPump.saved_power.toFixed(1) : 0} kWh</span></div>
              <div><span>Saved Ratio:</span><span>{selectedPump.saved_ratio ? selectedPump.saved_ratio.toFixed(1) : 0} %</span></div>
              <div><span>Running Hours:</span><span>{selectedPump.running_hours ? selectedPump.running_hours.toFixed(1) : 0} h</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoolingDiagramOverlay

