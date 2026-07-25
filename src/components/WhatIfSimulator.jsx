import React, { useState } from 'react';
import { Sliders, Cpu, AlertTriangle, RefreshCw, TrendingDown, HelpCircle, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { RF_PREDICTION_DATA, calculateRFPrediction } from '../data/coastalData';

export default function WhatIfSimulator({ region }) {
  const [uncertaintyAlpha, setUncertaintyAlpha] = useState(1.0); // Default 1.0 (1.0 * sigma erosion risk)
  const [selectedYearIndex, setSelectedYearIndex] = useState(null); // null = show all 3 years

  const handleReset = () => {
    setUncertaintyAlpha(1.0);
    setSelectedYearIndex(null);
  };

  // Calculate overall 3-year cumulative impact
  const predictions = RF_PREDICTION_DATA.map(item => calculateRFPrediction(item, uncertaintyAlpha));
  const cumulativeChange = predictions.reduce((sum, p) => sum + p.adjustedVal, 0).toFixed(1);

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={22} color="#00F2FE" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              2026~2028년 머신러닝 (Random Forest) 해안선 예측 시뮬레이터
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            4개 기상·조위 입력 변수 기반 RF AI 예측 모델 & 예측 불확실성(표준편차 σ = 4.5m) 보정 침식 위험 시나리오
          </p>
        </div>

        <button onClick={handleReset} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
          <RefreshCw size={14} /> 가중치 초기화
        </button>
      </div>

      {/* Input Data Table Card (Exact Values from User Image) */}
      <div style={{ background: 'rgba(15, 25, 48, 0.8)', padding: '16px 20px', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00F2FE', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📊 2026~2028년 머신러닝 입력 환경 변수 (관측/예측 데이터)
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>단위: mm, m, kW/m, cm</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'center' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-main)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '8px 12px' }}>연도</th>
                <th style={{ padding: '8px 12px', color: '#00F2FE' }}>구간 누적 강수량 (mm)</th>
                <th style={{ padding: '8px 12px', color: '#FF4757' }}>구간 최대 유의파고 (m)</th>
                <th style={{ padding: '8px 12px', color: '#2ED573' }}>구간 누적 파랑에너지 (kW/m)</th>
                <th style={{ padding: '8px 12px', color: '#FFA502' }}>촬영 / 연도별 최고 조위 (cm)</th>
              </tr>
            </thead>
            <tbody>
              {RF_PREDICTION_DATA.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: selectedYearIndex === idx ? 'rgba(0, 242, 254, 0.1)' : 'transparent' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: '#FFF' }}>{item.year}년</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>{item.input.rainfall.toLocaleString()} mm</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>{item.input.maxWaveHeight.toFixed(2)} m</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>{item.input.waveEnergy.toLocaleString(undefined, { maximumFractionDigits: 1 })} kW/m</td>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: item.input.peakTide > 300 ? '#FF4757' : '#FFA502' }}>
                    {item.input.peakTide.toFixed(2)} cm {item.input.peakTide > 300 && '🚨 (극대)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Uncertainty Risk Weight Adjustment Slider Panel */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: '#FFA502' }}>
            <AlertTriangle size={18} /> 예측 불확실성(표준편차 σ = 4.5m) 보정 침식 위험 가중치 (α):
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FF4757' }}>
            -{ (uncertaintyAlpha * 4.5).toFixed(1) }m 하한선 침식 보정 (가중치 { (uncertaintyAlpha * 100).toFixed(0) }%)
          </span>
        </div>

        <input
          type="range"
          min={0.0}
          max={1.2}
          step={0.1}
          value={uncertaintyAlpha}
          onChange={(e) => setUncertaintyAlpha(parseFloat(e.target.value))}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          <span>α = 0.0 (RF 순수 원시 예측)</span>
          <span style={{ color: '#FFA502', fontWeight: 700 }}>α = 1.0 (표준 1σ 불확실성 고려 침식 위험 - 권장)</span>
          <span style={{ color: '#FF4757', fontWeight: 700 }}>α = 1.2 (극단 침식 시나리오)</span>
        </div>
      </div>

      {/* 3-Year Prediction Result Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {RF_PREDICTION_DATA.map((item, idx) => {
          const pred = predictions[idx];
          const isSelected = selectedYearIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => setSelectedYearIndex(isSelected ? null : idx)}
              style={{
                background: isSelected ? 'rgba(255, 71, 87, 0.12)' : 'rgba(15, 25, 48, 0.85)',
                border: `1px solid ${pred.isErosion ? '#FF4757' : '#00F2FE'}`,
                borderRadius: '14px',
                padding: '18px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF' }}>
                  {item.year}년 해안선 예측
                </span>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: pred.isErosion ? 'rgba(255, 71, 87, 0.2)' : 'rgba(0, 242, 254, 0.2)',
                  color: pred.isErosion ? '#FF4757' : '#00F2FE',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}>
                  {pred.statusText}
                </span>
              </div>

              {/* RF Raw vs Adjusted Comparison */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>Random Forest 원시 예측:</span>
                  <span style={{ fontWeight: 700, color: item.rfRawPrediction > 0 ? '#2ED573' : '#FFF' }}>
                    {pred.raw} ({item.rfRawPrediction > 0 ? '퇴적/전진' : '유지'})
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    불확실성 반영 침식 예측:
                  </span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: pred.isErosion ? '#FF4757' : '#00F2FE' }}>
                    {pred.adjustedText}
                  </span>
                </div>
              </div>

              {/* Note / Mechanism */}
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>
                💡 <strong>핵심 조건:</strong> {item.note}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cumulative Impact & Summary Bar */}
      <div style={{
        background: cumulativeChange < 0 ? 'rgba(255, 71, 87, 0.1)' : 'rgba(0, 242, 254, 0.1)',
        border: `1px solid ${cumulativeChange < 0 ? '#FF4757' : '#00F2FE'}`,
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={22} color={cumulativeChange < 0 ? '#FF4757' : '#00F2FE'} />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: cumulativeChange < 0 ? '#FF4757' : '#00F2FE' }}>
              2026~2028년 3개년 누적 해안선 변동 예측 결과: {cumulativeChange} m 후퇴
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-main)', marginTop: '2px' }}>
              예측 불확실성(σ = 4.5m) 보정 시 2028년 최고 조위(353.57cm) 폭증과 결합하여 해안선이 평균 약 10.4m 육지 쪽으로 침식 후퇴할 위험이 우세합니다.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>추산 손실 영향:</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFA502' }}>
            ${(Math.abs(parseFloat(cumulativeChange)) * 1.4).toFixed(1)}M (약 {(Math.abs(parseFloat(cumulativeChange)) * 19.5).toFixed(0)}억원)
          </div>
        </div>
      </div>
    </div>
  );
}


