import React, { useState } from 'react'
import './CoolingDiagramSimple.css'

function CoolingDiagramSimple({ sensors, pumps }) {
  const [selectedPump, setSelectedPump] = useState(null)

  // 펌프 데이터
  const fwPumps = pumps ? pumps.slice(0, 3) : []
  const swPumps = pumps ? pumps.slice(3, 6) : []

  return (
    <div className="cooling-diagram-simple">
      {/* 헤더 */}
      <div className="cd-header">
        <div className="cd-header-left">
          <span className="cd-company">OMTech Ecosave</span>
          <span className="cd-mode">Info/Mode</span>
        </div>
        <div className="cd-header-center">
          {new Date().toLocaleString('ko-KR', { 
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
        </div>
        <div className="cd-header-right">
          <button className="cd-btn-alarm">ALARM ACKN</button>
          <button className="cd-btn-sound">SOUND STOP</button>
          <span className="cd-operator">OPERATOR</span>
        </div>
      </div>

      {/* 타이틀 */}
      <div className="cd-title">COOLING WATER SYSTEM</div>

      {/* 다이어그램 컨테이너 */}
      <div className="cd-diagram-container">
        {/* 상단 온도 표시 */}
        <div className="cd-sensor" style={{position: 'absolute', left: '42%', top: '3%'}}>
          <div className="cd-sensor-value">0.0 °C</div>
        </div>
        
        <div className="cd-sensor" style={{position: 'absolute', left: '52%', top: '3%'}}>
          <div className="cd-sensor-value">???</div>
        </div>

        {/* FW Pump NO.1 데이터 */}
        <div className="cd-pump-data" style={{position: 'absolute', left: '24%', top: '13%'}} 
             onClick={() => setSelectedPump({...fwPumps[0], index: 0, type: 'FW'})}>
          <div className="cd-pump-label">NO.1</div>
          <div className="cd-pump-status" data-running={fwPumps[0]?.status === 1}>
            {fwPumps[0]?.status === 1 ? 'RUN' : 'STOP'}
          </div>
        </div>

        {/* TX4A 온도 */}
        <div className="cd-sensor-temp" style={{position: 'absolute', left: '47%', top: '15%'}}>
          <div className="cd-temp-value">0.0 °C</div>
        </div>

        {/* TX5A 온도 */}
        <div className="cd-sensor-temp" style={{position: 'absolute', left: '47%', top: '20%'}}>
          <div className="cd-temp-value">0.0 °C</div>
        </div>

        {/* TX2 */}
        <div className="cd-sensor" style={{position: 'absolute', left: '52%', top: '11%'}}>
          <div className="cd-sensor-value">???</div>
        </div>

        {/* FW Pump NO.2 데이터 */}
        <div className="cd-pump-data" style={{position: 'absolute', left: '24%', top: '33%'}}
             onClick={() => setSelectedPump({...fwPumps[1], index: 1, type: 'FW'})}>
          <div className="cd-pump-label">NO.2</div>
          <div className="cd-pump-status" data-running={fwPumps[1]?.status === 1}>
            {fwPumps[1]?.status === 1 ? 'RUN' : 'STOP'}
          </div>
        </div>

        {/* TX4B, TX5B, TX3 */}
        <div className="cd-sensor-temp" style={{position: 'absolute', left: '47%', top: '32%'}}>
          <div className="cd-temp-value">0.0 °C</div>
        </div>
        <div className="cd-sensor-temp" style={{position: 'absolute', left: '47%', top: '40%'}}>
          <div className="cd-temp-value">0.0 °C</div>
        </div>
        <div className="cd-sensor" style={{position: 'absolute', left: '52%', top: '35%'}}>
          <div className="cd-sensor-value">???</div>
        </div>

        {/* FW Pump NO.3 데이터 */}
        <div className="cd-pump-data" style={{position: 'absolute', left: '24%', top: '49%'}}
             onClick={() => setSelectedPump({...fwPumps[2], index: 2, type: 'FW'})}>
          <div className="cd-pump-label">NO.3</div>
          <div className="cd-pump-status" data-running={fwPumps[2]?.status === 1}>
            {fwPumps[2]?.status === 1 ? 'RUN' : 'STOP'}
          </div>
        </div>

        {/* 우측 센서들 */}
        <div className="cd-sensor" style={{position: 'absolute', left: '72%', top: '17%'}}>
          <div className="cd-sensor-value">???</div>
        </div>

        {/* M/E LOAD */}
        <div className="cd-sensor" style={{position: 'absolute', left: '48%', top: '65%'}}>
          <div className="cd-sensor-label">M/E LOAD</div>
          <div className="cd-sensor-value">???</div>
        </div>

        {/* SW Pump NO.1 */}
        <div className="cd-pump-data cd-sw-pump" style={{position: 'absolute', left: '49%', top: '73%'}}
             onClick={() => setSelectedPump({...swPumps[0], index: 0, type: 'SW'})}>
          <div className="cd-pump-label">NO.1</div>
          <div className="cd-pump-status" data-running={swPumps[0]?.status === 1}>
            {swPumps[0]?.status === 1 ? 'RUN' : 'STOP'}
          </div>
        </div>

        {/* SW Pump NO.2 */}
        <div className="cd-pump-data cd-sw-pump" style={{position: 'absolute', left: '59%', top: '73%'}}
             onClick={() => setSelectedPump({...swPumps[1], index: 1, type: 'SW'})}>
          <div className="cd-pump-label">NO.2</div>
          <div className="cd-pump-status" data-running={swPumps[1]?.status === 1}>
            {swPumps[1]?.status === 1 ? 'RUN' : 'STOP'}
          </div>
        </div>

        {/* SW Pump NO.3 */}
        <div className="cd-pump-data cd-sw-pump" style={{position: 'absolute', left: '71%', top: '73%'}}
             onClick={() => setSelectedPump({...swPumps[2], index: 2, type: 'SW'})}>
          <div className="cd-pump-label">NO.3</div>
          <div className="cd-pump-status" data-running={swPumps[2]?.status === 1}>
            {swPumps[2]?.status === 1 ? 'RUN' : 'STOP'}
          </div>
        </div>

        {/* 배경 다이어그램 - SVG로 그리기 */}
        <svg className="cd-background-svg" viewBox="0 0 1200 650" preserveAspectRatio="xMidYMid meet">
          {/* 좌측 공급 라인 텍스트 */}
          <text x="130" y="130" fontSize="11" fill="#ff0000" fontWeight="bold">To/From G/E &amp;</text>
          <text x="130" y="143" fontSize="11" fill="#ff0000" fontWeight="bold">Aux C.F.W. System</text>
          
          <text x="130" y="280" fontSize="11" fill="#ff0000" fontWeight="bold">To/From M/E</text>
          <text x="130" y="293" fontSize="11" fill="#ff0000" fontWeight="bold">AIR COOLER</text>
          
          <text x="130" y="460" fontSize="11" fill="#ff0000" fontWeight="bold">To/From M/E</text>
          <text x="130" y="473" fontSize="11" fill="#ff0000" fontWeight="bold">L.O. &amp; JKT COOLER</text>

          {/* 좌측 녹색 라인 */}
          <line x1="230" y1="130" x2="250" y2="130" stroke="#00ff00" strokeWidth="7" />
          <polygon points="250,130 265,125 265,135" fill="#00ff00" />
          <line x1="265" y1="130" x2="265" y2="540" stroke="#00ff00" strokeWidth="9" />
          
          <line x1="230" y1="287" x2="265" y2="287" stroke="#00ff00" strokeWidth="7" />
          <polygon points="250,287 265,282 265,292" fill="#00ff00" />
          
          <line x1="230" y1="467" x2="265" y2="467" stroke="#00ff00" strokeWidth="7" />
          <polygon points="250,467 265,462 265,472" fill="#00ff00" />

          {/* FW Pump 박스들 */}
          {[130, 260, 390].map((y, idx) => (
            <g key={`fwp-${idx}`}>
              <rect x="265" y={y} width="10" height="10" fill="#666" />
              <line x1="265" y1={y + 5} x2="310" y2={y + 5} stroke="#00ff00" strokeWidth="7" />
              
              <rect x="310" y={y - 20} width="100" height="75" fill="#d9e6f2" stroke="#000" strokeWidth="2" rx="3" />
              <text x="360" y={y + 10} fontSize="12" fontWeight="bold" textAnchor="middle">NO.{idx + 1}</text>
              <circle cx="340" cy={y + 23} r="15" fill="none" stroke="#000" strokeWidth="2" />
              <line x1="332" y1={y + 23} x2="348" y2={y + 23} stroke="#000" strokeWidth="2" />
              <polygon points={`348,${y + 23} 343,${y + 19} 343,${y + 27}`} fill="#000" />
              
              <rect x="318" y={y + 45} width="35" height="12" fill="#fff" stroke="#000" rx="2" />
              <text x="335" y={y + 54} fontSize="9" fontWeight="bold" textAnchor="middle">MANU</text>
              
              <rect x="360" y={y + 45} width="35" height="12" fill="#fff" stroke="#000" rx="2" />
              <text x="377" y={y + 54} fontSize="8" fill="#ff0000" fontWeight="bold" textAnchor="middle">GSP</text>
              
              <rect x="405" y={y} width="10" height="10" fill="#666" />
              <line x1="410" y1={y + 5} x2="490" y2={y + 5} stroke="#00ff00" strokeWidth="7" />
            </g>
          ))}

          {/* LT F.W. Cooling Pump 레이블 */}
          <text x="360" y="535" fontSize="12" fontWeight="bold" textAnchor="middle">LT F.W.</text>
          <text x="360" y="550" fontSize="12" fontWeight="bold" textAnchor="middle">Cooling Pump</text>

          {/* 3-Way Valve */}
          <circle cx="520" cy="500" r="27" fill="#f5f5f5" stroke="#000" strokeWidth="2" />
          <text x="520" y="492" fontSize="10" fontWeight="bold" textAnchor="middle">EP</text>
          <text x="520" y="504" fontSize="10" fontWeight="bold" textAnchor="middle">CON</text>
          <circle cx="520" cy="515" r="11" fill="#e0e0e0" stroke="#000" strokeWidth="1" />
          <text x="520" y="519" fontSize="9" fontWeight="bold" textAnchor="middle">TC</text>
          <line x1="520" y1="527" x2="520" y2="543" stroke="#000" strokeWidth="2" />
          <polygon points="515,538 520,545 525,538" fill="none" stroke="#000" strokeWidth="2" />
          <text x="520" y="563" fontSize="10" fontWeight="bold" textAnchor="middle">3-Way</text>
          <text x="520" y="575" fontSize="10" fontWeight="bold" textAnchor="middle">Temp. Control</text>
          <text x="520" y="587" fontSize="10" fontWeight="bold" textAnchor="middle">Valve</text>
          
          <line x1="490" y1="395" x2="520" y2="395" stroke="#00ff00" strokeWidth="7" />
          <line x1="520" y1="395" x2="520" y2="473" stroke="#00ff00" strokeWidth="7" />
          <rect x="540" y="490" width="10" height="10" fill="#666" />

          {/* 열교환기 NO.1 */}
          <rect x="545" y="95" width="125" height="95" fill="#6495ed" stroke="#000" strokeWidth="3" rx="4" />
          <text x="607" y="120" fontSize="15" fontWeight="bold" fill="#fff" textAnchor="middle">NO.1</text>
          <text x="607" y="140" fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle">Central</text>
          <text x="607" y="160" fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle">F.W.</text>
          <text x="607" y="180" fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle">CLR</text>
          
          <line x1="490" y1="135" x2="540" y2="135" stroke="#00ff00" strokeWidth="7" />
          <rect x="535" y="130" width="10" height="10" fill="#666" />
          
          {/* TX4A, TX5A */}
          <circle cx="515" cy="105" r="15" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="515" y="110" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX4A</text>
          <text x="515" y="90" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          
          <circle cx="515" cy="165" r="15" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="515" y="170" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX5A</text>
          <text x="515" y="150" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>

          {/* 열교환기 NO.2 */}
          <rect x="545" y="240" width="125" height="95" fill="#6495ed" stroke="#000" strokeWidth="3" rx="4" />
          <text x="607" y="265" fontSize="15" fontWeight="bold" fill="#fff" textAnchor="middle">NO.2</text>
          <text x="607" y="285" fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle">Central</text>
          <text x="607" y="305" fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle">F.W.</text>
          <text x="607" y="325" fontSize="13" fontWeight="bold" fill="#fff" textAnchor="middle">CLR</text>
          
          <line x1="490" y1="265" x2="540" y2="265" stroke="#00ff00" strokeWidth="7" />
          <rect x="535" y="260" width="10" height="10" fill="#666" />
          
          {/* TX4B, TX5B */}
          <circle cx="515" cy="230" r="15" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="515" y="235" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX4B</text>
          <text x="515" y="215" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          
          <circle cx="515" cy="350" r="15" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="515" y="355" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX5B</text>
          <text x="515" y="335" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>

          {/* 파란색 해수 라인 */}
          <rect x="665" y="130" width="10" height="10" fill="#666" />
          <line x1="670" y1="135" x2="845" y2="135" stroke="#00bfff" strokeWidth="7" />
          <polygon points="845,135 860,130 860,140" fill="#00bfff" />
          <line x1="860" y1="135" x2="1060" y2="135" stroke="#00bfff" strokeWidth="7" />
          
          <rect x="665" y="285" width="10" height="10" fill="#666" />
          <line x1="670" y1="290" x2="860" y2="290" stroke="#00bfff" strokeWidth="7" />
          
          {/* TX2, TX3 */}
          <circle cx="730" cy="115" r="15" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="730" y="120" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX2</text>
          <text x="730" y="100" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          
          <circle cx="730" cy="310" r="15" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="730" y="315" fontSize="10" fill="#fff" fontWeight="bold" textAnchor="middle">TX3</text>
          <text x="730" y="295" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>

          {/* 우측 수직 라인 */}
          <line x1="860" y1="135" x2="860" y2="530" stroke="#00bfff" strokeWidth="8" />
          <line x1="860" y1="290" x2="860" y2="530" stroke="#00bfff" strokeWidth="8" />
          
          {/* 우측 출구 */}
          <line x1="860" y1="160" x2="1000" y2="160" stroke="#00bfff" strokeWidth="7" />
          <polygon points="1000,160 1015,155 1015,165" fill="#00bfff" />
          <text x="1030" y="155" fontSize="9" fill="#ff0000" fontWeight="bold">To ESS</text>
          <text x="1030" y="168" fontSize="9" fontWeight="bold">???</text>
          
          {/* TX1, PX1 센서 */}
          <circle cx="900" cy="290" r="17" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="900" y="295" fontSize="11" fill="#fff" fontWeight="bold" textAnchor="middle">TX1</text>
          
          <circle cx="980" cy="325" r="17" fill="#ff0000" stroke="#000" strokeWidth="2" />
          <text x="980" y="330" fontSize="11" fill="#fff" fontWeight="bold" textAnchor="middle">PX1</text>
          <text x="980" y="310" fontSize="9" fill="#ff0000" fontWeight="bold" textAnchor="middle">To ESS</text>
          
          {/* JB, TI, PT, PI */}
          <rect x="950" y="205" width="23" height="18" fill="#fff" stroke="#ff0000" strokeWidth="2" rx="2" />
          <text x="961" y="218" fontSize="10" fill="#ff0000" fontWeight="bold" textAnchor="middle">JB</text>
          
          <circle cx="995" cy="230" r="17" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="995" y="227" fontSize="9" fontWeight="bold" textAnchor="middle">TI</text>
          <text x="995" y="237" fontSize="8" fontWeight="bold" textAnchor="middle">1072</text>
          
          <circle cx="1030" cy="355" r="15" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="1030" y="359" fontSize="9" fontWeight="bold" textAnchor="middle">PT</text>
          
          <circle cx="1070" cy="370" r="17" fill="#fff" stroke="#000" strokeWidth="2" />
          <text x="1070" y="367" fontSize="9" fontWeight="bold" textAnchor="middle">PI</text>
          <text x="1070" y="377" fontSize="8" fontWeight="bold" textAnchor="middle">1071</text>

          {/* SW Pump 3대 */}
          <line x1="750" y1="540" x2="1100" y2="540" stroke="#00bfff" strokeWidth="9" />
          
          {[590, 705, 850].map((x, idx) => (
            <g key={`swp-${idx}`}>
              <rect x={x} y="450" width="90" height="80" fill="#d9e6f2" stroke="#000" strokeWidth="2" rx="3" />
              <text x={x + 45} y="470" fontSize="12" fontWeight="bold" textAnchor="middle">NO.{idx + 1}</text>
              <circle cx={x + 45} cy="490" r="14" fill="none" stroke="#000" strokeWidth="2" />
              <line x1={x + 37} y1="490" x2={x + 53} y2="490" stroke="#000" strokeWidth="2" />
              <polygon points={`${x + 53},490 ${x + 48},486 ${x + 48},494`} fill="#000" />
              
              <rect x={x + 10} y="508" width="32" height="12" fill="#fff" stroke="#000" rx="2" />
              <text x={x + 26} y="516" fontSize="8" fontWeight="bold" textAnchor="middle">MANU</text>
              
              <rect x={x + 48} y="508" width="32" height="12" fill="#fff" stroke="#000" rx="2" />
              <text x={x + 64} y="516" fontSize="8" fill="#ff0000" fontWeight="bold" textAnchor="middle">GSP</text>
              
              <rect x={x + 40} y="526" width="10" height="10" fill="#666" />
              <line x1={x + 45} y1="536" x2={x + 45} y2="550" stroke="#00bfff" strokeWidth="6" />
              <rect x={x + 40} y="545" width="10" height="10" fill="#666" />
            </g>
          ))}

          {/* Cooling S.W. Pump 레이블 */}
          <text x="825" y="605" fontSize="12" fontWeight="bold" textAnchor="middle">Cooling</text>
          <text x="825" y="620" fontSize="12" fontWeight="bold" textAnchor="middle">S.W. Pump</text>
          
          {/* 하단 곡선 */}
          <path d="M 750,540 Q 720,540 720,570 L 720,630" stroke="#00bfff" strokeWidth="9" fill="none" />
          <path d="M 1100,540 Q 1130,540 1130,570 L 1130,630" stroke="#00bfff" strokeWidth="9" fill="none" />
        </svg>
      </div>

      {/* 하단 네비게이션 */}
      <div className="cd-bottom-nav">
        <button className="cd-nav-btn cd-active">COOLING WATER</button>
        <button className="cd-nav-btn">ENERGY SAVE</button>
        <button className="cd-nav-btn">ALARM</button>
        <button className="cd-nav-btn">EVENT</button>
        <button className="cd-nav-btn">PARAMETER</button>
      </div>

      {/* 펌프 상세 팝업 */}
      {selectedPump && (
        <div className="cd-popup-overlay" onClick={() => setSelectedPump(null)}>
          <div className="cd-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPump.type === 'FW' ? 'LT F.W. Cooling Pump' : 'Cooling S.W. Pump'} #{selectedPump.index + 1}</h3>
            <button className="cd-popup-close" onClick={() => setSelectedPump(null)}>×</button>
            <div className="cd-popup-content">
              <div><span>Status:</span><span className={selectedPump.status === 1 ? 'cd-on' : 'cd-off'}>
                {selectedPump.status === 1 ? '⚡ Running' : '⏸ Stopped'}</span></div>
              <div><span>Frequency:</span><span>{selectedPump.frequency?.toFixed(1) || 0} Hz</span></div>
              <div><span>Power:</span><span>{selectedPump.power?.toFixed(1) || 0} kW</span></div>
              <div><span>Saved:</span><span>{selectedPump.saved_power?.toFixed(1) || 0} kWh</span></div>
              <div><span>Ratio:</span><span>{selectedPump.saved_ratio?.toFixed(1) || 0} %</span></div>
              <div><span>Runtime:</span><span>{selectedPump.running_hours?.toFixed(1) || 0} h</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoolingDiagramSimple



