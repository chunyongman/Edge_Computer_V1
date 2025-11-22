/**
 * VFD 예방진단 컴포넌트
 * Edge AI 분석 결과 표시
 */

import React, { useState, useEffect } from 'react';
import './VFDDiagnostics.css';

const VFDDiagnostics = () => {
  const [diagnosticsData, setDiagnosticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVFD, setSelectedVFD] = useState(null);
  const [acknowledgedAnomalies, setAcknowledgedAnomalies] = useState({}); // { vfd_id: [pattern1, pattern2, ...] }
  const [accumulatedAnomalies, setAccumulatedAnomalies] = useState({}); // { vfd_id: [pattern1, pattern2, ...] } - 누적된 이상 패턴

  // VFD 진단 데이터 가져오기
  const fetchDiagnostics = async () => {
    try {
      const response = await fetch('/api/vfd/diagnostics');
      const result = await response.json();

      // Edge Computer: 배열 형식 [100, 100, ...]
      // HMI: 객체 형식 { success: true, data: { vfd_diagnostics: {...} } }
      if (Array.isArray(result)) {
        // Edge Computer 형식: 배열을 객체로 변환
        const vfdNames = ['SWP1', 'SWP2', 'SWP3', 'FWP1', 'FWP2', 'FWP3', 'FAN1', 'FAN2', 'FAN3', 'FAN4'];
        const vfdData = {};
        result.forEach((score, index) => {
          if (index < vfdNames.length) {
            vfdData[vfdNames[index]] = {
              score: score,
              status: score >= 90 ? 'normal' : score >= 70 ? 'caution' : score >= 50 ? 'warning' : 'critical',
              anomaly_patterns: []
            };
          }
        });
        console.log('VFD 진단 데이터 로드 (Edge Computer):', vfdData);
        setDiagnosticsData({ vfd_diagnostics: vfdData });
      } else if (result.success && result.data.vfd_diagnostics) {
        // HMI 형식
        console.log('VFD 진단 데이터 로드:', result.data);
        setDiagnosticsData(result.data);

        // 현재 이상 패턴 업데이트 (기존 패턴 유지 - 백엔드에서 지속 관리)
        setAccumulatedAnomalies(prev => {
          const updated = { ...prev };  // 기존 누적 패턴 유지

          // vfd_diagnostics는 객체이므로 Object.entries로 변환
          Object.entries(result.data.vfd_diagnostics).forEach(([vfdId, vfd]) => {
            const currentPatterns = vfd.anomaly_patterns || [];

            // 패턴이 있으면 업데이트, 없으면 기존 패턴 유지
            if (currentPatterns.length > 0) {
              console.log(`📌 ${vfdId}: 새 패턴 감지 ->`, currentPatterns);
              updated[vfdId] = currentPatterns;
            } else if (prev[vfdId]) {
              console.log(`🔒 ${vfdId}: 기존 패턴 유지 (백엔드 빈 패턴) ->`, prev[vfdId]);
            }
            // 패턴이 없어도 기존 패턴을 유지 (백엔드에서 확인 전까지 유지)
          });

          return updated;
        });

        setError(null);
      } else {
        console.error('❌ VFD 진단 데이터 없음');
        setError('VFD 진단 데이터를 사용할 수 없습니다.');
      }
    } catch (err) {
      console.error('❌ VFD 진단 데이터 로드 실패:', err);
      setError(`데이터 로드 실패: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
    const interval = setInterval(fetchDiagnostics, 2000); // 2초마다 갱신
    return () => clearInterval(interval);
  }, []);

  // 상태 등급에 따른 색상 및 아이콘
  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return '#4CAF50'; // 녹색
      case 'caution': return '#9E9E9E'; // 회색
      case 'warning': return '#FF9800'; // 주황색
      case 'critical': return '#F44336'; // 빨간색
      default: return '#9E9E9E'; // 회색
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'normal': return '정상';
      case 'caution': return '주의';
      case 'warning': return '경고';
      case 'critical': return '위험';
      default: return '알 수 없음';
    }
  };

  const getMaintenancePriorityText = (priority) => {
    switch (priority) {
      case 0: return '정상';
      case 1: return '정기 점검';
      case 3: return '1주일 내 점검';
      case 5: return '즉시 점검';
      default: return '-';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising': return '↑ 상승';
      case 'falling': return '↓ 하강';
      case 'stable': return '→ 안정';
      default: return '-';
    }
  };

  // 이상 감지 확인(Acknowledge) 함수
  const acknowledgeAnomaly = async (vfdId, patterns) => {
    console.log(`✅ ${vfdId} 이상 감지 확인 - 패턴:`, patterns);

    try {
      // 백엔드 API 호출하여 이상 상태 초기화
      const response = await fetch('http://localhost:8080/api/vfd/acknowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vfd_id: vfdId,
          user: 'Operator'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to acknowledge VFD anomaly');
      }

      const result = await response.json();
      console.log(`✅ 백엔드에 ${vfdId} 이상 상태 초기화 요청 완료:`, result);

      // 확인된 패턴 저장
      setAcknowledgedAnomalies(prev => ({
        ...prev,
        [vfdId]: patterns
      }));

      // 누적된 패턴 초기화
      setAccumulatedAnomalies(prev => {
        const updated = { ...prev };
        delete updated[vfdId];
        console.log(`🗑️ ${vfdId} 누적 패턴 삭제됨, 업데이트된 상태:`, updated);
        return updated;
      });
    } catch (error) {
      console.error(`❌ ${vfdId} 이상 감지 확인 실패:`, error);
    }
  };

  // 미확인 이상 패턴만 필터링 (누적된 패턴 사용)
  const getUnacknowledgedPatterns = (vfdId) => {
    // 누적된 패턴 가져오기
    const accumulated = accumulatedAnomalies[vfdId] || [];

    if (accumulated.length === 0) {
      return [];
    }

    // 확인된 패턴 가져오기
    const acknowledged = acknowledgedAnomalies[vfdId] || [];

    // 누적된 패턴과 확인된 패턴을 비교 (순서 무관)
    const accumulatedSet = [...accumulated].sort().join(',');
    const acknowledgedSet = [...acknowledged].sort().join(',');

    // 동일한 패턴 조합이면 이미 확인된 것으로 간주
    if (accumulatedSet === acknowledgedSet && acknowledged.length > 0) {
      return [];
    }

    // 아니면 누적된 패턴 중 미확인 패턴 반환
    return accumulated.filter(pattern => !acknowledged.includes(pattern));
  };

  if (loading) {
    return <div className="vfd-diagnostics loading">데이터 로드 중...</div>;
  }

  if (error) {
    return <div className="vfd-diagnostics error">{error}</div>;
  }

  if (!diagnosticsData || !diagnosticsData.vfd_diagnostics) {
    return <div className="vfd-diagnostics">VFD 진단 데이터가 없습니다.</div>;
  }

  const vfdList = Object.entries(diagnosticsData.vfd_diagnostics);

  // VFD 그룹별로 분류
  const swPumps = vfdList.filter(([id]) => id.startsWith('SW_PUMP'));
  const fwPumps = vfdList.filter(([id]) => id.startsWith('FW_PUMP'));
  const erFans = vfdList.filter(([id]) => id.startsWith('ER_FAN'));

  const renderVFDCard = ([vfdId, vfd]) => {
    const statusColor = getStatusColor(vfd.status_grade);
    const statusText = getStatusText(vfd.status_grade);
    const unacknowledgedPatterns = getUnacknowledgedPatterns(vfdId);
    const hasAnomaly = unacknowledgedPatterns.length > 0;

    return (
      <div
        key={vfdId}
        className={`vfd-compact-card ${hasAnomaly ? 'has-anomaly' : ''}`}
        style={{ borderTopColor: statusColor }}
        onClick={() => setSelectedVFD(vfdId)}
      >
        <div className="vfd-compact-header">
          <h4>{vfdId.replace('_', ' ').replace('SW PUMP', 'SWP').replace('FW PUMP', 'FWP').replace('ER FAN', 'FAN')}</h4>
          <span className="vfd-compact-status" style={{ backgroundColor: statusColor }}>
            {statusText}
          </span>
        </div>

        <div className="vfd-compact-body">
          <div className="vfd-compact-row">
            <span className="label">주파수</span>
            <span className="value">{vfd.current_frequency_hz?.toFixed(1) || '0.0'} Hz</span>
          </div>
          <div className="vfd-compact-row">
            <span className="label">전력</span>
            <span className="value">{vfd.output_current_a?.toFixed(1) || '0.0'} A</span>
          </div>
          <div className="vfd-compact-row">
            <span className="label">온도</span>
            <span className="value" style={{
              color: vfd.motor_temperature_c > 75 ? '#f44336' :
                     vfd.motor_temperature_c > 70 ? '#ff9800' : '#60a5fa'
            }}>
              {vfd.motor_temperature_c?.toFixed(1) || '0.0'}°C
            </span>
          </div>
        </div>

        {hasAnomaly && (
          <div className="vfd-compact-warning">
            ⚠️ {unacknowledgedPatterns.length}개 이상
          </div>
        )}
      </div>
    );
  };

  const renderDetailView = () => {
    if (!selectedVFD) return null;

    // 객체에서 VFD ID로 직접 접근
    const vfd = diagnosticsData.vfd_diagnostics[selectedVFD];
    if (!vfd) return null;

    return (
      <div className="vfd-modal-overlay" onClick={() => setSelectedVFD(null)}>
        <div className="vfd-detail-panel" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <h3>{selectedVFD.replace('_', ' ')} 상세 정보</h3>
          <button className="close-btn" onClick={() => setSelectedVFD(null)}>✕</button>
        </div>

        <div className="detail-body">
          {/* 실시간 운전 데이터 */}
          <section className="detail-section">
            <h4>실시간 운전 데이터</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">주파수</span>
                <span className="value">{vfd.current_frequency_hz?.toFixed(1)} Hz</span>
              </div>
              <div className="detail-item">
                <span className="label">출력 전류</span>
                <span className="value">{vfd.output_current_a?.toFixed(1)} A</span>
              </div>
              <div className="detail-item">
                <span className="label">출력 전압</span>
                <span className="value">{vfd.output_voltage_v?.toFixed(0)} V</span>
              </div>
              <div className="detail-item">
                <span className="label">DC 버스 전압</span>
                <span className="value">{vfd.dc_bus_voltage_v?.toFixed(0)} V</span>
              </div>
              <div className="detail-item">
                <span className="label">모터 온도</span>
                <span className="value">{vfd.motor_temperature_c?.toFixed(1)}°C</span>
              </div>
              <div className="detail-item">
                <span className="label">히트싱크 온도</span>
                <span className="value">{vfd.heatsink_temperature_c?.toFixed(1)}°C</span>
              </div>
            </div>
          </section>

          {/* 예측 데이터 */}
          <section className="detail-section">
            <h4>예측 분석</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">30분 후 예측 온도</span>
                <span className="value predicted">{vfd.predicted_temp_30min?.toFixed(1)}°C</span>
              </div>
              <div className="detail-item">
                <span className="label">온도 상승률</span>
                <span className="value">{vfd.temp_rise_rate?.toFixed(3)}°C/min</span>
              </div>
              <div className="detail-item">
                <span className="label">온도 트렌드</span>
                <span className="value">{getTrendIcon(vfd.temp_trend)}</span>
              </div>
              <div className="detail-item">
                <span className="label">수명 잔여율</span>
                <span className="value">{vfd.remaining_life_percent?.toFixed(1)}%</span>
              </div>
              <div className="detail-item">
                <span className="label">정비 예상 일수</span>
                <span className="value">{vfd.estimated_days_to_maintenance} days</span>
              </div>
              <div className="detail-item">
                <span className="label">이상 점수</span>
                <span className="value">{vfd.anomaly_score?.toFixed(1)}</span>
              </div>
            </div>
          </section>

          {/* 진단 결과 */}
          <section className="detail-section">
            <h4>진단 결과</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">상태 등급</span>
                <span className="value" style={{ color: getStatusColor(vfd.status_grade) }}>
                  {getStatusText(vfd.status_grade)}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">심각도 점수</span>
                <span className="value">{vfd.severity_score}/100</span>
              </div>
              <div className="detail-item">
                <span className="label">정비 우선순위</span>
                <span className="value">{getMaintenancePriorityText(vfd.maintenance_priority)}</span>
              </div>
              <div className="detail-item">
                <span className="label">예측 신뢰도</span>
                <span className="value">{(vfd.prediction_confidence * 100)?.toFixed(0)}%</span>
              </div>
            </div>
          </section>

          {/* 이상 패턴 */}
          {(() => {
            const unacknowledgedPatterns = getUnacknowledgedPatterns(selectedVFD);
            return unacknowledgedPatterns.length > 0 && (
              <section className="detail-section">
                <h4>이상 패턴</h4>
                <ul className="anomaly-list">
                  {unacknowledgedPatterns.map((pattern, index) => (
                    <li key={index}>{pattern}</li>
                  ))}
                </ul>
                <button
                  className="acknowledge-btn"
                  onClick={() => {
                    acknowledgeAnomaly(selectedVFD, unacknowledgedPatterns);
                  }}
                >
                  ✓ 이상 감지 확인
                </button>
              </section>
            );
          })()}

          {/* 권고사항 */}
          {vfd.recommendation && (
            <section className="detail-section">
              <h4>권고사항</h4>
              <div className="recommendation-box">
                {vfd.recommendation}
              </div>
            </section>
          )}

          {/* 누적 통계 */}
          <section className="detail-section">
            <h4>누적 통계</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">누적 운전시간</span>
                <span className="value">{vfd.cumulative_runtime_hours?.toFixed(1)} h</span>
              </div>
              <div className="detail-item">
                <span className="label">트립 횟수</span>
                <span className="value">{vfd.trip_count}</span>
              </div>
              <div className="detail-item">
                <span className="label">에러 횟수</span>
                <span className="value">{vfd.error_count}</span>
              </div>
              <div className="detail-item">
                <span className="label">경고 횟수</span>
                <span className="value">{vfd.warning_count}</span>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    );
  };

  return (
    <div className="vfd-diagnostics">
      <div className="diagnostics-header">
        <div className="header-title">
          <h2>VFD 예방진단</h2>
          <div className="header-info">
            <span>마지막 업데이트: {new Date(diagnosticsData.timestamp).toLocaleTimeString('ko-KR')}</span>
            <span>총 {diagnosticsData.vfd_count}대</span>
          </div>
        </div>

        <div className="status-legend">
          <div className="legend-title">📊 상태 등급</div>
          <div className="legend-items">
            <span className="legend-item">
              <span className="legend-dot" style={{backgroundColor: '#4CAF50'}}></span>
              정상 (0-20점)
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{backgroundColor: '#9E9E9E'}}></span>
              주의 (21-50점)
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{backgroundColor: '#FF9800'}}></span>
              경고 (51-75점)
            </span>
            <span className="legend-item">
              <span className="legend-dot" style={{backgroundColor: '#F44336'}}></span>
              위험 (76-100점)
            </span>
          </div>
        </div>
      </div>

      <div className="guide-panel">
        <h4>📖 항목 설명</h4>
        <div className="guide-items">
          <div className="guide-item">
            <strong>온도 추세:</strong> ↑상승 (모터 온도가 계속 오르는 중) / →안정 / ↓하강
          </div>
          <div className="guide-item">
            <strong>이상 점수:</strong> 0-25(정상), 25-50(주의), 50-75(경고), 75+(위험)
          </div>
          <div className="guide-item">
            <strong>정비 권고:</strong> 즉시점검(위험), 1주일내(경고), 정기점검(주의), 정상
          </div>
          <div className="guide-item">
            <strong>수명 잔여:</strong> 베어링/냉각팬 기준 예상 잔여 수명 (70% 이하 시 부품 준비)
          </div>
        </div>
      </div>

      <div className="diagnostics-content">
        <div className="vfd-grid-5col">
          {/* 1행 1열: SWP1 */}
          {swPumps[0] && renderVFDCard(swPumps[0])}
          {/* 1행 2열: SWP2 */}
          {swPumps[1] && renderVFDCard(swPumps[1])}
          {/* 1행 3열: SWP3 */}
          {swPumps[2] && renderVFDCard(swPumps[2])}
          {/* 1행 4열: FAN1 */}
          {erFans[0] && renderVFDCard(erFans[0])}
          {/* 1행 5열: FAN2 */}
          {erFans[1] && renderVFDCard(erFans[1])}

          {/* 2행 1열: FWP1 */}
          {fwPumps[0] && renderVFDCard(fwPumps[0])}
          {/* 2행 2열: FWP2 */}
          {fwPumps[1] && renderVFDCard(fwPumps[1])}
          {/* 2행 3열: FWP3 */}
          {fwPumps[2] && renderVFDCard(fwPumps[2])}
          {/* 2행 4열: FAN3 */}
          {erFans[2] && renderVFDCard(erFans[2])}
          {/* 2행 5열: FAN4 */}
          {erFans[3] && renderVFDCard(erFans[3])}
        </div>
      </div>

      {selectedVFD && renderDetailView()}
    </div>
  );
};

export default VFDDiagnostics;
