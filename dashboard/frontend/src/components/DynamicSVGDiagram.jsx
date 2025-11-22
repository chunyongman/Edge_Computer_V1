import React, { useEffect, useRef, useState } from 'react'
import { sensorMapping, pumpMapping } from '../config/svgMapping'
import { pipingDataMapping, pipingSensorMapping, pipingPumpMapping } from '../config/pipingMapping'
import svgDiagram from '../assets/piping_diagram3.svg?raw'
import './DynamicSVGDiagram.css'

function DynamicSVGDiagram({ sensors = {}, pumps = [], onPumpCommand }) {
  const svgContainerRef = useRef(null)
  const [svgLoaded, setSvgLoaded] = useState(false)
  const [selectedPump, setSelectedPump] = useState(null)

  useEffect(() => {
    // SVG 파일을 직접 삽입
    if (svgContainerRef.current && !svgLoaded) {
      svgContainerRef.current.innerHTML = svgDiagram

      // SVG에 센서값 글로우 필터 추가
      const svgElement = svgContainerRef.current.querySelector('svg')
      if (svgElement) {
        const defs = svgElement.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        if (!svgElement.querySelector('defs')) {
          svgElement.insertBefore(defs, svgElement.firstChild)
        }

        // 글로우 필터 정의
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        filter.setAttribute('id', 'sensorValueGlow')
        filter.setAttribute('x', '-50%')
        filter.setAttribute('y', '-50%')
        filter.setAttribute('width', '200%')
        filter.setAttribute('height', '200%')

        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        feGaussianBlur.setAttribute('in', 'SourceAlpha')
        feGaussianBlur.setAttribute('stdDeviation', '2')
        feGaussianBlur.setAttribute('result', 'blur')

        const feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset')
        feOffset.setAttribute('in', 'blur')
        feOffset.setAttribute('dx', '0')
        feOffset.setAttribute('dy', '1')
        feOffset.setAttribute('result', 'offsetBlur')

        const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood')
        feFlood.setAttribute('flood-color', '#22d3ee')  // cyan 글로우
        feFlood.setAttribute('flood-opacity', '0.4')
        feFlood.setAttribute('result', 'color')

        const feComposite = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite')
        feComposite.setAttribute('in', 'color')
        feComposite.setAttribute('in2', 'offsetBlur')
        feComposite.setAttribute('operator', 'in')
        feComposite.setAttribute('result', 'shadow')

        const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        feMergeNode1.setAttribute('in', 'shadow')
        const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        feMergeNode2.setAttribute('in', 'SourceGraphic')

        feMerge.appendChild(feMergeNode1)
        feMerge.appendChild(feMergeNode2)

        filter.appendChild(feGaussianBlur)
        filter.appendChild(feOffset)
        filter.appendChild(feFlood)
        filter.appendChild(feComposite)
        filter.appendChild(feMerge)

        defs.appendChild(filter)

        // 텍스트 글로우 필터 추가
        const textGlowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        textGlowFilter.setAttribute('id', 'textGlow')
        textGlowFilter.setAttribute('x', '-50%')
        textGlowFilter.setAttribute('y', '-50%')
        textGlowFilter.setAttribute('width', '200%')
        textGlowFilter.setAttribute('height', '200%')

        const feGaussianBlur2 = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        feGaussianBlur2.setAttribute('in', 'SourceGraphic')
        feGaussianBlur2.setAttribute('stdDeviation', '1.5')
        feGaussianBlur2.setAttribute('result', 'blur')

        const feMerge2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const feMergeNode3 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        feMergeNode3.setAttribute('in', 'blur')
        const feMergeNode4 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        feMergeNode4.setAttribute('in', 'SourceGraphic')

        feMerge2.appendChild(feMergeNode3)
        feMerge2.appendChild(feMergeNode4)

        textGlowFilter.appendChild(feGaussianBlur2)
        textGlowFilter.appendChild(feMerge2)

        defs.appendChild(textGlowFilter)
      }

      setSvgLoaded(true)
      addPumpClickHandlers()
    }
  }, [])

  const addPumpClickHandlers = () => {
    if (!svgContainerRef.current) return
    const svgElement = svgContainerRef.current.querySelector('svg')
    if (!svgElement) return

    // 펌프별 클릭 영역 정의 (SVG 상의 실제 위치 기반)
    const pumpAreas = [
      // LT Pumps (왼쪽)
      { index: 0, name: 'LT Pump No.1', x: 240, y: 360, width: 65, height: 60 },
      { index: 1, name: 'LT Pump No.2', x: 240, y: 447, width: 65, height: 60 },
      { index: 2, name: 'LT Pump No.3', x: 240, y: 557, width: 65, height: 60 },
      // SW Pumps (아래쪽)
      { index: 3, name: 'SW Pump No.1', x: 585, y: 478, width: 65, height: 60 },
      { index: 4, name: 'SW Pump No.2', x: 680, y: 478, width: 65, height: 60 },
      { index: 5, name: 'SW Pump No.3', x: 770, y: 478, width: 65, height: 60 },
    ]

    pumpAreas.forEach(area => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', area.x)
      rect.setAttribute('y', area.y)
      rect.setAttribute('width', area.width)
      rect.setAttribute('height', area.height)
      rect.setAttribute('fill', 'transparent')
      rect.setAttribute('cursor', 'pointer')
      rect.setAttribute('data-pump-index', area.index)

      rect.addEventListener('click', () => {
        handlePumpClick(area.index)
      })

      svgElement.appendChild(rect)
    })
  }

  const handlePumpClick = (pumpIndex) => {
    if (pumps[pumpIndex]) {
      setSelectedPump({ ...pumps[pumpIndex], index: pumpIndex })
      console.log(`펌프 ${pumpIndex} 클릭됨`)
    }
  }

  // 팝업이 열려있는 동안 펌프 상태가 변경되면 selectedPump도 업데이트
  useEffect(() => {
    if (selectedPump && pumps[selectedPump.index]) {
      setSelectedPump(prev => ({
        ...pumps[prev.index],
        index: prev.index
      }))
    }
  }, [pumps])

  useEffect(() => {
    // 센서 및 펌프 데이터가 변경될 때마다 SVG 업데이트
    if (svgLoaded) {
      updateSVGData()
    }
  }, [sensors, pumps, svgLoaded])

  const updateSVGData = () => {
    if (!svgContainerRef.current) return

    const svgElement = svgContainerRef.current.querySelector('svg')
    if (!svgElement) {
      console.warn('SVG 요소를 찾을 수 없습니다')
      return
    }

    console.log('📊 데이터 업데이트:', { sensors, pumps })

    // 펌프 스타일용 필터 생성
    const createPumpFilters = () => {
      const defs = svgElement.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs')

      // 글래스모피즘 글로우
      if (!svgElement.querySelector('#glassGlow')) {
        const glassFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        glassFilter.setAttribute('id', 'glassGlow')
        glassFilter.setAttribute('x', '-50%')
        glassFilter.setAttribute('y', '-50%')
        glassFilter.setAttribute('width', '200%')
        glassFilter.setAttribute('height', '200%')

        const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        blur.setAttribute('stdDeviation', '1')
        blur.setAttribute('result', 'coloredBlur')

        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const node1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node1.setAttribute('in', 'coloredBlur')
        const node2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node2.setAttribute('in', 'SourceGraphic')
        merge.appendChild(node1)
        merge.appendChild(node2)

        glassFilter.appendChild(blur)
        glassFilter.appendChild(merge)
        defs.appendChild(glassFilter)
      }

      // 네온 글로우
      if (!svgElement.querySelector('#neonGlow')) {
        const neonFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        neonFilter.setAttribute('id', 'neonGlow')
        neonFilter.setAttribute('x', '-50%')
        neonFilter.setAttribute('y', '-50%')
        neonFilter.setAttribute('width', '200%')
        neonFilter.setAttribute('height', '200%')

        const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        blur.setAttribute('stdDeviation', '2.5')
        blur.setAttribute('result', 'coloredBlur')

        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const node1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node1.setAttribute('in', 'coloredBlur')
        const node2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node2.setAttribute('in', 'SourceGraphic')
        merge.appendChild(node1)
        merge.appendChild(node2)

        neonFilter.appendChild(blur)
        neonFilter.appendChild(merge)
        defs.appendChild(neonFilter)
      }

      // 카드 섀도우
      if (!svgElement.querySelector('#cardShadow')) {
        const cardFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        cardFilter.setAttribute('id', 'cardShadow')
        cardFilter.setAttribute('x', '-50%')
        cardFilter.setAttribute('y', '-50%')
        cardFilter.setAttribute('width', '200%')
        cardFilter.setAttribute('height', '200%')

        const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        blur.setAttribute('stdDeviation', '1.5')
        blur.setAttribute('result', 'coloredBlur')

        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const node1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node1.setAttribute('in', 'coloredBlur')
        const node2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node2.setAttribute('in', 'SourceGraphic')
        merge.appendChild(node1)
        merge.appendChild(node2)

        cardFilter.appendChild(blur)
        cardFilter.appendChild(merge)
        defs.appendChild(cardFilter)
      }

      // Soft Glow 효과 (추천)
      if (!svgElement.querySelector('#softGlow')) {
        const softFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        softFilter.setAttribute('id', 'softGlow')
        softFilter.setAttribute('x', '-50%')
        softFilter.setAttribute('y', '-50%')
        softFilter.setAttribute('width', '200%')
        softFilter.setAttribute('height', '200%')

        const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        blur.setAttribute('stdDeviation', '3')
        blur.setAttribute('result', 'coloredBlur')

        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const node1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node1.setAttribute('in', 'coloredBlur')
        const node2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node2.setAttribute('in', 'SourceGraphic')
        merge.appendChild(node1)
        merge.appendChild(node2)

        softFilter.appendChild(blur)
        softFilter.appendChild(merge)
        defs.appendChild(softFilter)
      }

      // Data Viz 스타일용 샤프 섀도우
      if (!svgElement.querySelector('#sharpShadow')) {
        const sharpFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
        sharpFilter.setAttribute('id', 'sharpShadow')
        sharpFilter.setAttribute('x', '-50%')
        sharpFilter.setAttribute('y', '-50%')
        sharpFilter.setAttribute('width', '200%')
        sharpFilter.setAttribute('height', '200%')

        const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
        blur.setAttribute('stdDeviation', '0.5')
        blur.setAttribute('result', 'coloredBlur')

        const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
        const node1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node1.setAttribute('in', 'coloredBlur')
        const node2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
        node2.setAttribute('in', 'SourceGraphic')
        merge.appendChild(node1)
        merge.appendChild(node2)

        sharpFilter.appendChild(blur)
        sharpFilter.appendChild(merge)
        defs.appendChild(sharpFilter)
      }

      if (!svgElement.querySelector('defs')) {
        svgElement.insertBefore(defs, svgElement.firstChild)
      }
    }

    createPumpFilters()

    // Piping Diagram: 센서 데이터 업데이트 (고정 좌표 사용)
    pipingSensorMapping.forEach(mapping => {
      const sensorKey = mapping.name
      const sensorValue = sensors[sensorKey]

      if (sensorValue !== undefined && mapping.x > 0 && mapping.y > 0) {
        const value = sensorValue.toFixed(mapping.decimal)
        const valueId = `${sensorKey}_value`

        // 기존 센서값 표시 요소 삭제
        const allOldGroups = svgElement.querySelectorAll(`#${valueId}_group`)
        allOldGroups.forEach(el => el.remove())

        // 그룹 생성 (배경 + 텍스트)
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        group.setAttribute('id', `${valueId}_group`)

        // 스타일 설정 (모든 센서 LED 디스플레이 스타일로 통일)
        const bgFill = 'rgba(0, 0, 0, 0.95)'
        const textFill = '#00ff00'
        const strokeColor = 'rgba(0, 255, 0, 0.4)'
        const strokeWidth = '1'
        const filter = 'url(#ledGlow)'
        const fontSize = '10'

        // 값 텍스트 생성
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        textElement.setAttribute('id', valueId)
        textElement.setAttribute('x', mapping.x + 6)
        textElement.setAttribute('y', mapping.y + 4)
        textElement.setAttribute('font-family', 'Arial, sans-serif')
        textElement.setAttribute('font-size', fontSize)
        textElement.setAttribute('fill', textFill)
        textElement.setAttribute('font-weight', 'bold')
        textElement.setAttribute('filter', filter)
        textElement.textContent = `${value}${mapping.unit}`

        // 임시로 추가하여 크기 측정
        svgElement.appendChild(textElement)
        const textBBox = textElement.getBBox()
        svgElement.removeChild(textElement)

        // 배경 박스
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        bgRect.setAttribute('x', mapping.x - 2)
        bgRect.setAttribute('y', mapping.y - 8)
        bgRect.setAttribute('width', textBBox.width + 14)
        bgRect.setAttribute('height', 18)
        bgRect.setAttribute('rx', '4')
        bgRect.setAttribute('ry', '4')
        bgRect.setAttribute('fill', bgFill)
        bgRect.setAttribute('stroke', strokeColor)
        bgRect.setAttribute('stroke-width', strokeWidth)

        // LED 글로우 필터 생성
        const defs = svgElement.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs')

        if (!svgElement.querySelector('#ledGlow')) {
          const ledFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
          ledFilter.setAttribute('id', 'ledGlow')
          ledFilter.setAttribute('x', '-50%')
          ledFilter.setAttribute('y', '-50%')
          ledFilter.setAttribute('width', '200%')
          ledFilter.setAttribute('height', '200%')

          const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
          blur.setAttribute('stdDeviation', '2')
          blur.setAttribute('result', 'coloredBlur')

          const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
          const node1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
          node1.setAttribute('in', 'coloredBlur')
          const node2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
          node2.setAttribute('in', 'SourceGraphic')
          merge.appendChild(node1)
          merge.appendChild(node2)

          ledFilter.appendChild(blur)
          ledFilter.appendChild(merge)
          defs.appendChild(ledFilter)

          if (!svgElement.querySelector('defs')) {
            svgElement.insertBefore(defs, svgElement.firstChild)
          }
        }

        // 그룹에 배경과 텍스트 추가
        group.appendChild(bgRect)
        group.appendChild(textElement)

        svgElement.appendChild(group)
        console.log(`✅ 센서 ${sensorKey} 표시 (스타일 ${sensorKey}): x=${mapping.x}, y=${mapping.y}, 값=${value}${mapping.unit}`)
      }
    })

    // Piping Diagram: 펌프 데이터 업데이트 (고정 좌표 사용)
    pumps.forEach((pump, index) => {
      const pumpMappingData = pipingPumpMapping[index]
      if (!pumpMappingData) {
        console.warn(`펌프 ${index} 매핑 정보 없음`)
        return
      }

      console.log(`펌프 ${index} 업데이트:`, pump)

      // 각 펌프 데이터 항목을 좌표에 표시
      pumpMappingData.data.forEach(dataItem => {
        if (dataItem.x === 0 || dataItem.y === 0) return // 좌표가 없으면 스킵

        const valueId = `${dataItem.symbolId}_value`

        // 기존 요소 삭제
        const allOldGroups = svgElement.querySelectorAll(`#${valueId}_group`)
        allOldGroups.forEach(el => el.remove())

        let displayValue = ''

        // 데이터 타입에 따라 값 설정
        if (dataItem.name.includes('Auto/Man mode')) {
          displayValue = pump.auto_mode ? 'AUTO' : 'MANU'
        } else if (dataItem.name.includes('running hour')) {
          displayValue = `${pump.run_hours || 0}${dataItem.unit || ''}`
        } else if (dataItem.name.includes('VFD') && dataItem.name.includes('BYPASS')) {
          displayValue = pump.vfd_mode ? 'VFD' : 'BYPA'
        } else if (dataItem.name.includes('Hz(VFD)')) {
          displayValue = `${pump.frequency?.toFixed(1) || '0.0'}${dataItem.unit || ''}`
        } else if (dataItem.type === 'pump') {
          return // 펌프 기본 정보는 스킵
        }

        console.log(`펌프 ${index} - ${dataItem.name}: ${displayValue}, 좌표: (${dataItem.x}, ${dataItem.y})`)

        if (!displayValue) return

        // 기존 그룹 요소 삭제
        const oldGroup = svgElement.querySelector(`#${valueId}_group`)
        if (oldGroup) oldGroup.remove()

        // 텍스트 색상 결정 (팬 다이어그램과 동일)
        let textFill = '#ffffff'
        if (dataItem.name.includes('Auto/Man mode')) {
          textFill = pump.auto_mode ? '#00BFFF' : '#FF0000'
        } else if (dataItem.name.includes('VFD') && dataItem.name.includes('BYPASS')) {
          textFill = pump.vfd_mode ? '#00BFFF' : '#FFA500'
        } else if (dataItem.name.includes('Hz(VFD)')) {
          textFill = '#FFFFFF'
        } else if (dataItem.name.includes('running hour')) {
          textFill = '#FFFFFF'
        }

        const bgFill = 'rgba(0, 0, 0, 0.9)'
        const fontSize = '9'
        const fontFamily = 'Bahnschrift, sans-serif'
        const fontWeight = 'bold'

        // 텍스트 요소 생성 (크기 측정용)
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        textElement.setAttribute('id', valueId)
        textElement.setAttribute('x', dataItem.x + 6)
        textElement.setAttribute('y', dataItem.y + 4)
        textElement.setAttribute('font-family', fontFamily)
        textElement.setAttribute('font-size', fontSize)
        textElement.setAttribute('fill', textFill)
        textElement.setAttribute('font-weight', fontWeight)
        textElement.setAttribute('text-anchor', 'start')
        textElement.setAttribute('stroke', textFill)
        textElement.setAttribute('stroke-width', '0.3')
        textElement.textContent = displayValue

        // 임시로 추가하여 크기 측정
        svgElement.appendChild(textElement)
        const textBBox = textElement.getBBox()
        svgElement.removeChild(textElement)

        // 배경 박스 생성
        const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        bgRect.setAttribute('x', dataItem.x - 1)
        bgRect.setAttribute('y', dataItem.y - 9)
        bgRect.setAttribute('width', textBBox.width + 10)
        bgRect.setAttribute('height', 14)
        bgRect.setAttribute('rx', '3')
        bgRect.setAttribute('ry', '3')
        bgRect.setAttribute('fill', bgFill)

        // 그룹 생성 및 요소 추가
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        group.setAttribute('id', `${valueId}_group`)
        group.appendChild(bgRect)
        group.appendChild(textElement)

        svgElement.appendChild(group)
      })

      // 펌프 회전 애니메이션 및 색상 제어 (running 상태에 따라)
      const pumpName = pumpMappingData.name  // 'LT_Pump_1', 'SW_Pump_1' 등
      const impellerClass = `impeller-${pumpName}`
      const impellerElement = svgElement.querySelector(`.${impellerClass}`)

      // 펌프 전체 그룹 요소 찾기
      const pumpGroupElement = svgElement.querySelector(`#${pumpName}`)

      if (impellerElement && pumpGroupElement) {
        // 펌프 그룹 내의 모든 fill 속성을 가진 요소 찾기 (impeller 제외)
        const fillElements = pumpGroupElement.querySelectorAll('[fill]')

        if (pump.running) {
          // 운전 중이면 애니메이션 활성화
          impellerElement.style.animationPlayState = 'running'

          // 펌프 색상을 진한 파란색으로 변경
          fillElements.forEach(el => {
            // impeller 내부 요소는 제외
            if (!el.closest('.impeller-' + pumpName) || el === impellerElement) {
              const currentFill = el.getAttribute('fill')
              // 원본 색상 저장 (아직 저장 안 했으면)
              if (!el.hasAttribute('data-original-fill')) {
                el.setAttribute('data-original-fill', currentFill)
              }
              // 진한 파란색 계열로 변경
              if (currentFill.includes('#06b6d4')) {
                el.setAttribute('fill', '#1E90FF')  // 밝은 진한 파란색 (DodgerBlue)
              } else if (currentFill.includes('#0891b2')) {
                el.setAttribute('fill', '#0066CC')  // 중간 진한 파란색
              } else if (currentFill.includes('#0e7490')) {
                el.setAttribute('fill', '#0052A3')  // 어두운 진한 파란색
              } else if (!currentFill.includes('url')) {
                el.setAttribute('fill', '#1E90FF')  // 기본값 (진한 파란색)
              }
            }
          })
        } else {
          // 정지 중이면 애니메이션 일시정지
          impellerElement.style.animationPlayState = 'paused'

          // 펌프 색상을 회색으로 변경
          fillElements.forEach(el => {
            // impeller 내부 요소는 제외
            if (!el.closest('.impeller-' + pumpName) || el === impellerElement) {
              const originalFill = el.getAttribute('data-original-fill')
              const currentFill = el.getAttribute('fill')

              // 회색 계열로 변경 (gradient는 제외)
              if (!currentFill.includes('url')) {
                if (originalFill && originalFill.includes('#06b6d4')) {
                  el.setAttribute('fill', '#94a3b8')  // 밝은 회색
                } else if (originalFill && originalFill.includes('#0891b2')) {
                  el.setAttribute('fill', '#64748b')  // 중간 회색
                } else if (originalFill && originalFill.includes('#0e7490')) {
                  el.setAttribute('fill', '#475569')  // 어두운 회색
                } else {
                  el.setAttribute('fill', '#94a3b8')  // 기본 회색
                }
              }
            }
          })
        }
        console.log(`✅ 펌프 ${index} (${pumpName}) 상태: ${pump.running ? '🔵 운전중 (파란색)' : '⚪ 정지 (회색)'}`)
      } else {
        console.warn(`❌ 펌프 ${index} 요소 없음 - impeller: ${!!impellerElement}, group: ${!!pumpGroupElement}`)
      }
    })
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
    <div className="dynamic-svg-diagram">
      <div
        ref={svgContainerRef}
        className="svg-container"
      />

      {/* 펌프 정보 팝업 */}
      {selectedPump && (
        <div className="pump-popup-overlay" onClick={() => setSelectedPump(null)}>
          <div className="pump-popup" onClick={(e) => e.stopPropagation()}>
            <div className="pump-popup-header">
              <h3>
                {selectedPump.index < 3 ? 'LT' : 'SW'} Pump No.{(selectedPump.index % 3) + 1}
              </h3>
              <button className="popup-close" onClick={() => setSelectedPump(null)}>×</button>
            </div>

            <div className="pump-popup-body">
              <div className="pump-info-row">
                <span className="info-label">상태:</span>
                <span className={`info-value ${selectedPump.running ? 'status-running' : 'status-stopped'}`}>
                  {selectedPump.running ? '🟢 운전 중' : '⚪ 정지'}
                </span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">운전 모드:</span>
                <span className="info-value" style={{
                  color: selectedPump.auto_mode ? '#00FF00' : '#FFA500',
                  fontWeight: 'bold'
                }}>
                  {selectedPump.auto_mode !== undefined ? (selectedPump.auto_mode ? 'AUTO' : 'MANUAL') : 'MANUAL'}
                </span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">VFD 모드:</span>
                <span className="info-value" style={{
                  color: selectedPump.vfd_mode ? '#00BFFF' : '#FF69B4',
                  fontWeight: 'bold'
                }}>
                  {selectedPump.vfd_mode !== undefined ? (selectedPump.vfd_mode ? 'VFD' : 'BYPASS') : 'VFD'}
                </span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">주파수:</span>
                <span className="info-value">{selectedPump.frequency?.toFixed(1) || '0.0'} Hz</span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">전력:</span>
                <span className="info-value">{selectedPump.power_kw || 0} kW</span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">평균 전력:</span>
                <span className="info-value">{selectedPump.avg_power || 0} kW</span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">절감 전력:</span>
                <span className="info-value">{selectedPump.saved_kwh?.toLocaleString() || 0} kWh</span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">운전 시간:</span>
                <span className="info-value">{selectedPump.run_hours?.toLocaleString() || 0} h</span>
              </div>

              <div className="pump-info-row">
                <span className="info-label">ESS 모드:</span>
                <span className="info-value">{selectedPump.ess_mode ? '🟢 활성' : '⚪ 비활성'}</span>
              </div>
            </div>

            <div className="pump-popup-controls">
              <button
                className="btn-pump-start"
                onClick={() => sendPumpCommand(selectedPump.index, 'start')}
                disabled={selectedPump.running}
              >
                ▶️ START
              </button>
              <button
                className="btn-pump-stop"
                onClick={() => sendPumpCommand(selectedPump.index, 'stop')}
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

export default DynamicSVGDiagram

