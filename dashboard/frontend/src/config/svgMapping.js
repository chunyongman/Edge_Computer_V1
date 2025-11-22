// SVG Symbol ID와 센서/펌프 데이터 매핑 설정
// CSV 파일 (SVG symbol ID(ESS).csv) 기반

export const sensorMapping = {
  // 온도 센서 - 직접 ID 사용
  TX1: { labelId: 'TX1', unit: '°C', decimal: 1 },  // CSW PP Disc Temp
  TX2: { labelId: 'TX2', unit: '°C', decimal: 1 },  // CSW PP Suct Temp
  TX3: { labelId: 'TX3', unit: '°C', decimal: 1 },  // CSW Cooler CSW Out
  TX4: { labelId: 'TX4', unit: '°C', decimal: 1 },  // FW Cooler FW In
  TX5: { labelId: 'TX5', unit: '°C', decimal: 1 },  // FW Cooler FW Out

  // 압력 센서
  PX1: { labelId: 'DPX1', unit: ' bar', decimal: 2 },  // CSW Pressure
  DPX1: { labelId: 'DPX1', unit: ' bar', decimal: 2 },  // DPX1
}

export const pumpMapping = {
  // LT (Fresh Water) Pumps
  0: { // LT Pump No.1
    name: 'LT_Pump_1',
    symbolIds: {
      mode: 'LT_Pump1_Mode',
      hz: 'LT_Pump1_Hz',
      runningHour: 'LT_Pump1_hour',
      auto: 'LT_Pump1_Auto'
    }
  },
  1: { // LT Pump No.2
    name: 'LT_Pump_2',
    symbolIds: {
      mode: 'LT_Pump2_Mode',
      hz: 'LT_Pump2_Hz',
      runningHour: 'LT_Pump2_hour',
      auto: 'LT_Pump2_Auto'
    }
  },
  2: { // LT Pump No.3
    name: 'LT_Pump_3',
    symbolIds: {
      mode: 'LT_Pump3_Mode',
      hz: 'LT_Pump3_Hz',
      runningHour: 'LT_Pump3_hour_',
      auto: 'LT_Pump3_Auto'  // SVG에 없을 수 있음
    }
  },

  // SW (Sea Water) Pumps
  3: { // SW Pump No.1
    name: 'SW_Pump_1',
    symbolIds: {
      mode: 'SW_Pump1_Mode',
      hz: 'SW_Pump1_Hz',
      runningHour: 'SW_Pump1_hour',
      auto: 'SW_Pump1_Auto'
    }
  },
  4: { // SW Pump No.2
    name: 'SW_Pump_2',
    symbolIds: {
      mode: 'SW_Pump2_Mode',
      hz: 'SW_Pump2_Hz',
      runningHour: 'SW_Pump2_hour',
      auto: 'SW_Pump2_Auto'
    }
  },
  5: { // SW Pump No.3
    name: 'SW_Pump_3',
    symbolIds: {
      mode: 'SW_Pump3_Mode',
      hz: 'SW_Pump3_Hz',
      runningHour: 'SW_Pump3_hour',
      auto: 'SW_Pump3_Auto'
    }
  }
}
