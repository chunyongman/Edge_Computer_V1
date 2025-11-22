// Piping Diagram (piping_diagram1.svg) 데이터 매핑
// 표의 좌표(X, Y)를 기반으로 동적으로 데이터 표시

export const pipingDataMapping = [
  // 온도 센서 (TX1-TX6) - 라벨과 균형을 맞추도록 조정
  { name: 'TX1', symbolId: 'TX1', x: 825, y: 320, unit: '°C', decimal: 1 },
  { name: 'TX2', symbolId: 'TX2', x: 568, y: 154, unit: '°C', decimal: 1 },
  { name: 'TX3', symbolId: 'TX3', x: 568, y: 298, unit: '°C', decimal: 1 },
  { name: 'TX4', symbolId: 'TX4', x: 318, y: 156, unit: '°C', decimal: 1 },
  { name: 'TX5', symbolId: 'TX5', x: 495, y: 440, unit: '°C', decimal: 1 },
  { name: 'TX6', symbolId: 'TX6', x: 0, y: 0, unit: '°C', decimal: 1 }, // 좌표 미제공

  // 압력 센서 - 균형 조정
  { name: 'DPX1', symbolId: 'PX1', x: 945, y: 439, unit: ' bar', decimal: 2 },
  { name: 'PX2', symbolId: 'PX2', x: 0, y: 0, unit: ' bar', decimal: 2 }, // Symbol ID 없음

  // LT Pump No.1 정보
  { name: 'LT Pump No.1', symbolId: 'g229', x: 244.243, y: 372.093, type: 'pump' },
  { name: 'LT Pump No.1 Auto/Man mode', symbolId: 'LT_Pump1_Mode', x: 300, y: 365 },
  { name: 'LT Pump No.1 VFD/ BYPASS', symbolId: 'LT_Pump1_VFD', x: 300, y: 382 },
  { name: 'LT Pump No.1 Hz(VFD)', symbolId: 'LT_Pump1_Hz', x: 300, y: 399, unit: ' Hz' },
  { name: 'LT Pump No.1 running hour', symbolId: 'LT_Pump1_hour', x: 300, y: 416, unit: ' h' },

  // LT Pump No.2 정보
  { name: 'LT Pump No.2', symbolId: 'g245', x: 244.243, y: 459.033, type: 'pump' },
  { name: 'LT Pump No.2 Auto/Man mode', symbolId: 'LT_Pump2_Mode', x: 300, y: 452 },
  { name: 'LT Pump No.2 VFD/ BYPASS', symbolId: 'LT_Pump2_VFD', x: 300, y: 469 },
  { name: 'LT Pump No.2 Hz(VFD)', symbolId: 'LT_Pump2_Hz', x: 300, y: 486, unit: ' Hz' },
  { name: 'LT Pump No.2 running hour', symbolId: 'LT_Pump2_hour', x: 300, y: 503, unit: ' h' },

  // LT Pump No.3 정보
  { name: 'LT Pump No.3', symbolId: 'g261', x: 244.243, y: 545.963, type: 'pump' },
  { name: 'LT Pump No.3 Auto/Man mode', symbolId: 'LT_Pump3_Mode', x: 300, y: 539 },
  { name: 'LT Pump No.3 VFD/ BYPASS', symbolId: 'LT_Pump3_VFD', x: 300, y: 556 },
  { name: 'LT Pump No.3 Hz(VFD)', symbolId: 'LT_Pump3_Hz', x: 300, y: 573, unit: ' Hz' },
  { name: 'LT Pump No.3 running hour', symbolId: 'LT_Pump3_hour', x: 300, y: 590, unit: ' h' },

  // SW Pump No.1 정보
  { name: 'SW Pump No.1', symbolId: 'g103', x: 599.923, y: 476.633, type: 'pump' },
  { name: 'SW Pump No.1 Auto/Man mode', symbolId: 'SW_Pump1_Mode', x: 640, y: 470 },
  { name: 'SW Pump No.1 VFD/ BYPASS', symbolId: 'SW_Pump1_VFD', x: 640, y: 487 },
  { name: 'SW Pump No.1 Hz(VFD)', symbolId: 'SW_Pump1_Hz', x: 640, y: 504, unit: ' Hz' },
  { name: 'SW Pump No.1 running hour', symbolId: 'SW_Pump1_hour', x: 640, y: 521, unit: ' h' },

  // SW Pump No.2 정보
  { name: 'SW Pump No.2', symbolId: 'g1046', x: 695.023, y: 476.633, type: 'pump' },
  { name: 'SW Pump No.2 Auto/Man mode', symbolId: 'SW_Pump2_Mode', x: 735, y: 470 },
  { name: 'SW Pump No.2 VFD/ BYPASS', symbolId: 'SW_Pump2_VFD', x: 735, y: 487 },
  { name: 'SW Pump No.2 Hz(VFD)', symbolId: 'SW_Pump2_Hz', x: 735, y: 504, unit: ' Hz' },
  { name: 'SW Pump No.2 running hour', symbolId: 'SW_Pump2_hour', x: 735, y: 521, unit: ' h' },

  // SW Pump No.3 정보
  { name: 'SW Pump No.3', symbolId: 'g119', x: 786.444, y: 476.633, type: 'pump' },
  { name: 'SW Pump No.3 Auto/Man mode', symbolId: 'SW_Pump3_Mode', x: 827, y: 470 },
  { name: 'SW Pump No.3 VFD/ BYPASS', symbolId: 'SW_Pump3_VFD', x: 827, y: 487 },
  { name: 'SW Pump No.3 Hz(VFD)', symbolId: 'SW_Pump3_Hz', x: 827, y: 504, unit: ' Hz' },
  { name: 'SW Pump No.3 running hour', symbolId: 'SW_Pump3_hour', x: 827, y: 521, unit: ' h' },
]

// 센서 데이터만 필터링
export const pipingSensorMapping = pipingDataMapping.filter(item =>
  item.name.startsWith('TX') || item.name.startsWith('PX') || item.name.startsWith('DPX')
)

// 펌프 데이터만 필터링
// 백엔드 equipment 배열 순서: [SWP1, SWP2, SWP3, FWP1, FWP2, FWP3]
// 화면 좌표: 우측=NO.1, 중앙=NO.2, 좌측=NO.3
// SVG 그룹 이름을 화면 위치와 일치하도록 수정 완료
// 운전제어 SWP1 → SVG SW_Pump_1 (화면 우측 NO.1)
// 운전제어 SWP3 → SVG SW_Pump_3 (화면 좌측 NO.3)
export const pipingPumpMapping = {
  0: { // 백엔드 index 0 (SWP1) → SVG 우측 그룹 (SW_Pump_1)
    name: 'SW_Pump_1',
    data: pipingDataMapping.filter(item => item.name.includes('SW Pump No.3'))
  },
  1: { // 백엔드 index 1 (SWP2) → SVG 중앙 그룹 (SW_Pump_2)
    name: 'SW_Pump_2',
    data: pipingDataMapping.filter(item => item.name.includes('SW Pump No.2'))
  },
  2: { // 백엔드 index 2 (SWP3) → SVG 좌측 그룹 (SW_Pump_3)
    name: 'SW_Pump_3',
    data: pipingDataMapping.filter(item => item.name.includes('SW Pump No.1'))
  },
  3: { // 백엔드 index 3 (FWP1) → SVG 상단 그룹 (LT_Pump_1)
    name: 'LT_Pump_1',
    data: pipingDataMapping.filter(item => item.name.includes('LT Pump No.1'))
  },
  4: { // 백엔드 index 4 (FWP2) → SVG 중간 그룹 (LT_Pump_2)
    name: 'LT_Pump_2',
    data: pipingDataMapping.filter(item => item.name.includes('LT Pump No.2'))
  },
  5: { // 백엔드 index 5 (FWP3) → SVG 하단 그룹 (LT_Pump_3)
    name: 'LT_Pump_3',
    data: pipingDataMapping.filter(item => item.name.includes('LT Pump No.3'))
  }
}
