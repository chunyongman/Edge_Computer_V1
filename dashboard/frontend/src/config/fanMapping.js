// E/R FAN System - SVG Symbol ID와 센서/팬 데이터 매핑 설정
// fan_diagram1.svg 파일의 실제 SVG ID 매핑

export const fanSensorMapping = {
  // 온도 센서
  TX7: { labelId: 'TX7', x: 406, y: 293, unit: '°C', decimal: 1 },  // E/R Outside Temp
  TX6: { labelId: 'TX6', x: 490, y: 311, unit: '°C', decimal: 1 },  // E/R Inside Temp

  // 압력 센서
  PX2: { labelId: 'Px2', x: 485.43, y: 470, unit: ' Pa', decimal: 1 },  // E/R Diff Press (Px2로 변경)

  // M/E 부하
  'M/E Load': { labelId: 'M/E Load', x: 505, y: 408, unit: '%', decimal: 1 },  // M/E Load
}

export const fanMapping = {
  // E/R Fan 1 (VENT No.1)
  0: {
    name: 'FAN1',
    led: 'fanLED207',              // VENT No.1 LED
    fanId: 'fan206',               // Fan rotation element
    positions: {
      autoMan: { x: 722, y: 310 },   // Auto/Man mode 표시 위치
      vfd: { x: 722, y: 321 },       // VFD/BYPASS 표시 위치
      hz: { x: 722, y: 334 },        // Hz 표시 위치
      hour: { x: 722, y: 345 }       // Running hour 표시 위치
    }
  },

  // E/R Fan 2 (VENT No.2)
  1: {
    name: 'FAN2',
    led: 'fanLED207-9',            // VENT No.2 LED
    fanId: 'fan205',               // Fan rotation element
    positions: {
      autoMan: { x: 668, y: 310 },
      vfd: { x: 668, y: 321 },
      hz: { x: 668, y: 334 },
      hour: { x: 668, y: 345 }
    }
  },

  // E/R Fan 3 (VENT No.3)
  2: {
    name: 'FAN3',
    led: 'fanLED207-4',            // VENT No.3 LED
    fanId: 'fan204',               // Fan rotation element
    positions: {
      autoMan: { x: 352, y: 310 },
      vfd: { x: 352, y: 321 },
      hz: { x: 352, y: 334 },
      hour: { x: 352, y: 345 }
    }
  },

  // E/R Fan 4 (VENT No.4)
  3: {
    name: 'FAN4',
    led: 'fanLED207-6',            // VENT No.4 LED
    fanId: 'fan203',               // Fan rotation element
    positions: {
      autoMan: { x: 296, y: 310 },
      vfd: { x: 296, y: 321 },
      hz: { x: 296, y: 334 },
      hour: { x: 296, y: 345 }
    }
  }
}
