import React, { useEffect, useRef, useState } from 'react'
import { fanSensorMapping, fanMapping } from '../config/fanMapping'
import './FanDiagram.css'

function FanDiagram({ sensors = {}, fans = [], equipment = [], onCommand }) {
  const svgContainerRef = useRef(null)
  const [svgLoaded, setSvgLoaded] = useState(false)
  const [selectedFan, setSelectedFan] = useState(null)

  const fanData = fans.length > 0 ? fans : (equipment.length >= 10 ? equipment.slice(6, 10) : [])

  const fanAnimationsRef = useRef({})

  useEffect(() => {
    loadSVG()
  }, [])

  const addFanClickHandlers = () => {
    if (!svgContainerRef.current) return
    const svgElement = svgContainerRef.current.querySelector('svg')
    if (!svgElement) return

    // 팬별 클릭 영역 정의 (fanMapping 설정 기반)
    const fanAreas = [
      { index: 0, name: 'FAN1', fanId: 'fan206', x: 722.323, y: 291.019, width: 36.4547, height: 42.593498 },
      { index: 1, name: 'FAN2', fanId: 'fan205', x: 666.649, y: 291.019, width: 36.360298, height: 42.593498 },
      { index: 2, name: 'FAN3', fanId: 'fan204', x: 352.676, y: 291.68, width: 36.4547, height: 42.593498 },
      { index: 3, name: 'FAN4', fanId: 'fan203', x: 297.002, y: 291.68, width: 36.3603, height: 42.5935 },
    ]

    fanAreas.forEach(area => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      // 클릭 영역을 왼쪽으로 15, 위로 47 이동
      rect.setAttribute('x', area.x - 15)
      rect.setAttribute('y', area.y - 47)
      rect.setAttribute('width', area.width * 0.9)
      rect.setAttribute('height', area.height * 1.3) // 클릭 영역 크기 조정
      rect.setAttribute('fill', 'transparent')
      rect.setAttribute('cursor', 'pointer')
      rect.setAttribute('data-fan-index', area.index)

      rect.addEventListener('click', () => {
        handleFanClick(area.index)
      })

      svgElement.appendChild(rect)
    })
  }

  const handleFanClick = (fanIndex) => {
    if (fanData[fanIndex]) {
      setSelectedFan({ ...fanData[fanIndex], index: fanIndex })
      console.log(`팬 ${fanIndex} 클릭됨`)
    }
  }

  // 팝업이 열려있는 동안 팬 상태가 변경되면 selectedFan도 업데이트
  useEffect(() => {
    if (selectedFan && fanData[selectedFan.index]) {
      setSelectedFan(prev => ({
        ...fanData[prev.index],
        index: prev.index
      }))
    }
  }, [fanData])

  const sendFanCommand = async (fanIndex, command) => {
    if (onCommand && fanData[fanIndex]) {
      const fan = fanData[fanIndex]
      const success = await onCommand(fan.name, command)
      if (success) {
        alert(`✅ ${fan.name} ${command === 'start_fwd' ? '정방향 시작' : command === 'start_bwd' ? '역방향 시작' : command === 'start' ? '시작' : '정지'} 명령 성공`)
      } else {
        alert(`❌ 명령 실패`)
      }
    }
  }

  const loadSVG = async () => {
    try {
      const response = await fetch(`/src/assets/fan_diagram3.svg?t=${Date.now()}`)
      let svgText = await response.text()

      console.log('📄 SVG 파일 로드 완료, g28 제거 시작...')

      // g28 임펠러를 CSS로 숨기기 위해 style 태그 추가
      // SVG 내부의 defs 섹션 뒤에 style 추가
      const styleTag = `<style>#g28 { display: none !important; }</style>`
      svgText = svgText.replace('</defs>', `</defs>${styleTag}`)

      console.log('📝 g28 숨김 스타일 추가 완료')

      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = svgText

        const svgElement = svgContainerRef.current.querySelector('svg')
        if (svgElement) {
          console.log('✅ SVG 로드 완료 (g28 CSS로 숨김 처리)')

          // 팬 클릭 핸들러 추가
          addFanClickHandlers()

          // 각 팬의 위치에 회전할 블레이드 그룹 생성
          // symbol viewBox="0 0 100 330"에서 임펠러는 (50, 88) 위치에 있었음
          // use 요소의 x, y는 symbol의 (0, 0) 위치를 의미
          // use 요소의 width/height로 viewBox가 스케일링됨
          const fanConfigs = [
            { id: 'fan203', index: 3, x: 297.002, y: 291.68, width: 36.3603, height: 42.5935 },   // FAN4
            { id: 'fan204', index: 2, x: 352.676, y: 291.68, width: 36.4547, height: 42.593498 }, // FAN3
            { id: 'fan205', index: 1, x: 666.649, y: 291.019, width: 36.360298, height: 42.593498 }, // FAN2
            { id: 'fan206', index: 0, x: 722.323, y: 291.019, width: 36.4547, height: 42.593498 }  // FAN1
          ]

          fanConfigs.forEach(config => {
            // symbol viewBox="0 0 100 330"의 스케일 비율
            // SVG는 width만 지정하면 aspectRatio를 유지하므로 X, Y 동일한 스케일 사용
            const scale = (config.width / 100) * 0.85 * 0.85 * 0.90  // viewBox width 기준 스케일 * 0.65 (크기 조정)

            // 임펠러 위치 조정 - 팬 본체 중심에 맞추기
            // X는 width의 0% 위치 (왼쪽 끝), Y는 음수 값으로 팬 본체 훨씬 위쪽으로
            const impellerOffsetX = config.width * 0.0
            const impellerOffsetY = -config.height * 0.85

            // 최종 임펠러 중심 위치
            const finalX = config.x + impellerOffsetX
            const finalY = config.y + impellerOffsetY

            console.log(`${config.id}: use(${config.x}, ${config.y}), scale=${scale.toFixed(3)}, offset(${impellerOffsetX.toFixed(2)}, ${impellerOffsetY.toFixed(2)}), final(${finalX.toFixed(2)}, ${finalY.toFixed(2)})`)

            // 외부 컨테이너 그룹 (위치만 적용, 스케일은 제거)
            const containerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            containerGroup.setAttribute('transform', `translate(${finalX}, ${finalY})`)

            // 블레이드 그룹 생성 (회전용)
            const bladeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
            bladeGroup.setAttribute('id', `impeller-${config.id}`)
            bladeGroup.setAttribute('class', 'fan-impeller-blades')

            // 5개의 블레이드 생성 - 스케일 적용된 경로 계산
            const bladeAngles = [0, 72, 144, 216, 288]
            bladeAngles.forEach(angle => {
              const blade = document.createElementNS('http://www.w3.org/2000/svg', 'path')

              // 원본 경로를 각도만큼 회전시키고 스케일 적용
              const rad = angle * Math.PI / 180
              const cos = Math.cos(rad)
              const sin = Math.sin(rad)

              // 원본 경로 좌표들 (M 0 -12 Q 15 -25, 25 -45 Q 28 -50, 22 -52 Q 10 -48, 5 -45 Q -2 -35, 0 -12 Z)
              // 회전 후 스케일 적용
              const rotateAndScale = (x, y) => {
                const rx = x * cos - y * sin
                const ry = x * sin + y * cos
                return [rx * scale, ry * scale]
              }

              const [p1x, p1y] = rotateAndScale(0, -12)
              const [c1x, c1y] = rotateAndScale(15, -25)
              const [p2x, p2y] = rotateAndScale(25, -45)
              const [c2x, c2y] = rotateAndScale(28, -50)
              const [p3x, p3y] = rotateAndScale(22, -52)
              const [c3x, c3y] = rotateAndScale(10, -48)
              const [p4x, p4y] = rotateAndScale(5, -45)
              const [c4x, c4y] = rotateAndScale(-2, -35)

              const d = `M ${p1x.toFixed(2)} ${p1y.toFixed(2)} Q ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${p2x.toFixed(2)} ${p2y.toFixed(2)} Q ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p3x.toFixed(2)} ${p3y.toFixed(2)} Q ${c3x.toFixed(2)} ${c3y.toFixed(2)}, ${p4x.toFixed(2)} ${p4y.toFixed(2)} Q ${c4x.toFixed(2)} ${c4y.toFixed(2)}, ${p1x.toFixed(2)} ${p1y.toFixed(2)} Z`

              blade.setAttribute('d', d)
              blade.setAttribute('fill', 'url(#fan1_realisticBlade)')
              blade.setAttribute('stroke', '#263238')
              blade.setAttribute('stroke-width', (0.8 * scale).toFixed(2))
              blade.setAttribute('opacity', '0.95')

              bladeGroup.appendChild(blade)
            })

            // 허브 원 2개 생성 (스케일 적용)
            const outerHub = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            outerHub.setAttribute('cx', '0')
            outerHub.setAttribute('cy', '0')
            outerHub.setAttribute('r', (14 * scale).toFixed(2))
            outerHub.setAttribute('fill', 'url(#fan1_hubGrad)')
            outerHub.setAttribute('stroke', '#263238')
            outerHub.setAttribute('stroke-width', (1 * scale).toFixed(2))
            bladeGroup.appendChild(outerHub)

            const innerHub = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            innerHub.setAttribute('cx', '0')
            innerHub.setAttribute('cy', '0')
            innerHub.setAttribute('r', (10 * scale).toFixed(2))
            innerHub.setAttribute('fill', '#546e7a')
            bladeGroup.appendChild(innerHub)

            // 그룹 계층 구조 조립
            containerGroup.appendChild(bladeGroup)
            svgElement.appendChild(containerGroup)
            console.log(`✅ ${config.id} 임펠러 생성 완료 at (${finalX.toFixed(2)}, ${finalY.toFixed(2)}), scale: ${scale.toFixed(3)}`)
          })
        }

        setSvgLoaded(true)
      }
    } catch (error) {
      console.error('❌ SVG 로드 오류:', error)
    }
  }

  useEffect(() => {
    if (svgLoaded) {
      updateSVGData()
    }
  }, [sensors, fanData, svgLoaded])

  const updateSVGData = () => {
    if (!svgContainerRef.current) return
    const svgElement = svgContainerRef.current.querySelector('svg')
    if (!svgElement) return

    console.log('📊 Fan Data:', fanData)
    console.log('📡 Sensors:', sensors)

    // 센서 데이터 업데이트 - X 좌표 기준으로 박스와 텍스트 동적 생성
    Object.keys(fanSensorMapping).forEach(sensorKey => {
      const mapping = fanSensorMapping[sensorKey]

      // 센서 데이터 가져오기 (백엔드 센서 키와 매핑)
      let sensorValue = sensors[sensorKey]

      // M/E Load는 PU1 센서에서 가져옴
      if (sensorKey === 'M/E Load' && sensors['PU1'] !== undefined) {
        sensorValue = sensors['PU1']
      }

      if (sensorValue !== undefined) {
        const value = sensorValue.toFixed(mapping.decimal)
        const boxId = `${sensorKey.replace(/[^a-zA-Z0-9]/g, '_')}_box`
        const textId = `${sensorKey.replace(/[^a-zA-Z0-9]/g, '_')}_text`

        // 기존 박스와 텍스트 삭제
        let oldBox = svgElement.querySelector(`#${boxId}`)
        let oldText = svgElement.querySelector(`#${textId}`)
        if (oldBox) oldBox.remove()
        if (oldText) oldText.remove()

        // X, Y 좌표 기준으로 박스 생성
        const x = mapping.x
        const y = mapping.y || 470  // Y 좌표 (mapping에 없으면 기본값 470)
        const boxWidth = 38
        const boxHeight = 16

        // 데이터 표시용 박스 생성 (어두운 배경)
        const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rectElement.setAttribute('id', boxId)
        rectElement.setAttribute('x', x - boxWidth / 2)
        rectElement.setAttribute('y', y)
        rectElement.setAttribute('width', boxWidth)
        rectElement.setAttribute('height', boxHeight)
        rectElement.setAttribute('fill', '#1a1a1a')
        rectElement.setAttribute('stroke', '#2a2a2a')
        rectElement.setAttribute('stroke-width', '0.5')
        rectElement.setAttribute('rx', '2')
        svgElement.appendChild(rectElement)

        // 텍스트 생성 (밝은 녹색)
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        textElement.setAttribute('id', textId)
        textElement.setAttribute('x', x)
        textElement.setAttribute('y', y + boxHeight / 2 + 3.5)
        textElement.setAttribute('text-anchor', 'middle')
        textElement.setAttribute('fill', '#00ff00')
        textElement.setAttribute('font-size', '8.5')
        textElement.setAttribute('font-family', 'Arial, sans-serif')
        textElement.setAttribute('font-weight', 'bold')
        textElement.textContent = `${value}${mapping.unit}`

        svgElement.appendChild(textElement)
      }
    })

    // 팬 데이터 업데이트
    fanData.forEach((fan, index) => {
      const mapping = fanMapping[index]
      if (!mapping) return

      const isRunning = fan.running_fwd || fan.running_bwd || fan.running || false
      const isAuto = fan.auto_mode !== undefined ? fan.auto_mode : false
      const vfdMode = fan.vfd_mode !== undefined ? fan.vfd_mode : true

      // 팬 임펠러 회전 제어 - CSS 애니메이션 방식 (정방향/역방향)
      const impellerElement = svgElement.querySelector(`#impeller-${mapping.fanId}`)
      if (impellerElement) {
        // 임펠러 내부의 모든 블레이드 path 요소 가져오기
        const blades = impellerElement.querySelectorAll('path')

        if (isRunning) {
          // 역방향 운전인지 확인
          const isReverse = fan.running_bwd || false

          if (isReverse) {
            // 역방향: 반시계 방향 회전 + 보라색
            impellerElement.style.animation = 'fanRotate 3s linear infinite reverse'
            blades.forEach(blade => {
              blade.setAttribute('fill', '#9370DB')
              blade.setAttribute('opacity', '0.85')
            })
            console.log(`🔄 ${mapping.fanId} 임펠러 역방향 회전 (보라색)`)
          } else {
            // 정방향: 시계 방향 회전 + 파란색
            impellerElement.style.animation = 'fanRotate 3s linear infinite'
            blades.forEach(blade => {
              blade.setAttribute('fill', '#1E90FF')
              blade.setAttribute('opacity', '0.95')
            })
            console.log(`✅ ${mapping.fanId} 임펠러 정방향 회전 (파란색)`)
          }
        } else {
          // 정지 시: 애니메이션 정지 + 회색
          impellerElement.style.animation = 'none'
          blades.forEach(blade => {
            blade.setAttribute('fill', '#808080')
            blade.setAttribute('opacity', '0.7')
          })
          console.log(`⏸️ ${mapping.fanId} 임펠러 회전 정지 (회색)`)
        }
      }

      // LED 업데이트 (운전 상태 표시)
      const ledElement = svgElement.querySelector(`#${CSS.escape(mapping.led)}`)
      if (ledElement) {
        // LED 색상 변경 (운전 중: 녹색, 정지: 회색)
        ledElement.setAttribute('fill', isRunning ? '#00FF00' : '#808080')
      }

      // Auto/Man Mode 텍스트 생성
      const autoManId = `fan${index}_autoMan`
      let autoManElement = svgElement.querySelector(`#${autoManId}`)
      if (autoManElement) autoManElement.remove()

      autoManElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      autoManElement.setAttribute('id', autoManId)
      autoManElement.setAttribute('x', mapping.positions.autoMan.x)
      autoManElement.setAttribute('y', mapping.positions.autoMan.y)
      autoManElement.setAttribute('text-anchor', 'middle')
      autoManElement.setAttribute('fill', isAuto ? '#00BFFF' : '#FF0000')
      autoManElement.setAttribute('font-size', '9')
      autoManElement.setAttribute('font-family', 'Arial, sans-serif')
      autoManElement.setAttribute('font-weight', 'bold')
      autoManElement.textContent = isAuto ? 'AUTO' : 'MANU'
      svgElement.appendChild(autoManElement)

      // VFD/BYPASS 텍스트 생성
      const vfdId = `fan${index}_vfd`
      let vfdElement = svgElement.querySelector(`#${vfdId}`)
      if (vfdElement) vfdElement.remove()

      vfdElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      vfdElement.setAttribute('id', vfdId)
      vfdElement.setAttribute('x', mapping.positions.vfd.x)
      vfdElement.setAttribute('y', mapping.positions.vfd.y)
      vfdElement.setAttribute('text-anchor', 'middle')
      vfdElement.setAttribute('fill', vfdMode ? '#00BFFF' : '#FFA500')
      vfdElement.setAttribute('font-size', '9')
      vfdElement.setAttribute('font-family', 'Arial, sans-serif')
      vfdElement.setAttribute('font-weight', 'bold')
      vfdElement.textContent = vfdMode ? 'VFD' : 'BYPA'
      svgElement.appendChild(vfdElement)

      // Hz 텍스트 생성
      const hzId = `fan${index}_hz`
      let hzElement = svgElement.querySelector(`#${hzId}`)
      if (hzElement) hzElement.remove()

      hzElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      hzElement.setAttribute('id', hzId)
      hzElement.setAttribute('x', mapping.positions.hz.x)
      hzElement.setAttribute('y', mapping.positions.hz.y)
      hzElement.setAttribute('text-anchor', 'middle')
      hzElement.setAttribute('fill', '#FFFFFF')
      hzElement.setAttribute('font-size', '9')
      hzElement.setAttribute('font-family', 'Arial, sans-serif')
      hzElement.setAttribute('font-weight', 'bold')
      hzElement.textContent = `${fan.frequency?.toFixed(1) || 0} Hz`
      svgElement.appendChild(hzElement)

      // Running Hour 텍스트 생성
      const hourId = `fan${index}_hour`
      let hourElement = svgElement.querySelector(`#${hourId}`)
      if (hourElement) hourElement.remove()

      hourElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      hourElement.setAttribute('id', hourId)
      hourElement.setAttribute('x', mapping.positions.hour.x)
      hourElement.setAttribute('y', mapping.positions.hour.y)
      hourElement.setAttribute('text-anchor', 'middle')
      hourElement.setAttribute('fill', '#FFFFFF')
      hourElement.setAttribute('font-size', '9')
      hourElement.setAttribute('font-family', 'Arial, sans-serif')
      hourElement.setAttribute('font-weight', 'bold')
      hourElement.textContent = `${fan.run_hours || 0} h`
      svgElement.appendChild(hourElement)
    })
  }

  return (
    <div className="fan-diagram-wrapper">
      <div className="fan-diagram-header">
        <h2>🌀 E/R Ventilation System</h2>
      </div>
      <div className="fan-diagram-content" ref={svgContainerRef}>
        {/* SVG가 여기에 로드됩니다 */}
      </div>

      {/* 팬 정보 팝업 */}
      {selectedFan && (
        <div className="fan-popup-overlay" onClick={() => setSelectedFan(null)}>
          <div className="fan-popup" onClick={(e) => e.stopPropagation()}>
            <div className="fan-popup-header">
              <h3>E/R Fan No.{selectedFan.index + 1}</h3>
              <button className="popup-close" onClick={() => setSelectedFan(null)}>×</button>
            </div>

            <div className="fan-popup-body">
              <div className="fan-info-row">
                <span className="info-label">상태:</span>
                <span className={`info-value ${(selectedFan.running_fwd || selectedFan.running_bwd || selectedFan.running) ? 'status-running' : 'status-stopped'}`}>
                  {(selectedFan.running_fwd || selectedFan.running_bwd || selectedFan.running) ? '🟢 운전 중' : '⚪ 정지'}
                </span>
              </div>

              <div className="fan-info-row">
                <span className="info-label">운전 방향:</span>
                <span className="info-value">
                  {selectedFan.running_bwd ? '역방향 (Reverse)' : selectedFan.running_fwd ? '정방향 (Forward)' : '-'}
                </span>
              </div>

              <div className="fan-info-row">
                <span className="info-label">운전 모드:</span>
                <span className="info-value">
                  {selectedFan.auto_mode !== undefined ? (selectedFan.auto_mode ? 'AUTO' : 'MANUAL') : 'MANUAL'}
                </span>
              </div>

              <div className="fan-info-row">
                <span className="info-label">VFD 모드:</span>
                <span className="info-value">
                  {selectedFan.vfd_mode !== undefined ? (selectedFan.vfd_mode ? 'VFD' : 'BYPASS') : 'VFD'}
                </span>
              </div>

              <div className="fan-info-row">
                <span className="info-label">주파수:</span>
                <span className="info-value">{selectedFan.frequency?.toFixed(1) || '0.0'} Hz</span>
              </div>

              <div className="fan-info-row">
                <span className="info-label">운전 시간:</span>
                <span className="info-value">{selectedFan.run_hours?.toLocaleString() || 0} h</span>
              </div>
            </div>

            <div className="fan-popup-controls">
              <button
                className="btn-fan-start-fwd"
                onClick={() => sendFanCommand(selectedFan.index, 'start_fwd')}
                disabled={selectedFan.running_fwd || selectedFan.running_bwd}
              >
                ▶️ 정방향
              </button>
              <button
                className="btn-fan-start-bwd"
                onClick={() => sendFanCommand(selectedFan.index, 'start_bwd')}
                disabled={selectedFan.running_fwd || selectedFan.running_bwd}
              >
                ◀️ 역방향
              </button>
              <button
                className="btn-fan-stop"
                onClick={() => sendFanCommand(selectedFan.index, 'stop')}
                disabled={!selectedFan.running_fwd && !selectedFan.running_bwd && !selectedFan.running}
              >
                ⏹️ 정지
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FanDiagram
