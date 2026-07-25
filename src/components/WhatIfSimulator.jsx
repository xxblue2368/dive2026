import React, { useState } from 'react';
import { Sliders, Thermometer, ShieldCheck, Sparkles, TrendingDown, DollarSign, AlertCircle, RefreshCw } from 'lucide-react';
import { calculateWhatIfImpact } from '../data/coastalData';

export default function WhatIfSimulator({ region }) {
  const [tempRise, setTempRise] = useState(1.5); // +1.5°C default
  const [seawallHeight, setSeawallHeight] = useState(1.0); // 1.0m default
  const [sedimentSupplied, setSedimentSupplied] = useState(25); // 25% default

  // Calculate dynamic simulation outputs
  const simResult = calculateWhatIfImpact(region, tempRise, seawallHeight, sedimentSupplied);

  const handleReset = () => {
    setTempRise(1.5);
    setSeawallHeight(1.0);
    setSedimentSupplied(25);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={22} color="#00F2FE" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              What-If 기후변화 & 공학 방재 실시간 시뮬레이터
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            변수를 직접 조정하여 2050년 해안 침식량 및 경제적 피해액 손익 시뮬레이션
          </p>
        </div>

        <button onClick={handleReset} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
          <RefreshCw size={14} /> 기본값 초기화
        </button>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Slider 1: Temp Rise */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: '#FF6B81' }}>
              <Thermometer size={16} /> 지구 온도 상승폭:
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FF6B81' }}>+{tempRise}°C</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={3.5}
            step={0.1}
            value={tempRise}
            onChange={(e) => setTempRise(parseFloat(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            <span>+0.5°C (파리협정)</span>
            <span>+1.5°C (현재추세)</span>
            <span>+3.5°C (최악)</span>
          </div>
        </div>

        {/* Slider 2: Seawall Height */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: '#00F2FE' }}>
              <ShieldCheck size={16} /> 방파제/수중 잠제 보강:
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#00F2FE' }}>+{seawallHeight}m</span>
          </div>
          <input
            type="range"
            min={0.0}
            max={5.0}
            step={0.5}
            value={seawallHeight}
            onChange={(e) => setSeawallHeight(parseFloat(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            <span>+0m (무대응)</span>
            <span>+2.5m (표준보강)</span>
            <span>+5.0m (요새화)</span>
          </div>
        </div>

        {/* Slider 3: Sediment Replenishment */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.86rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: '#00E676' }}>
              <Sparkles size={16} /> 모래/토사 보충율 (양빈):
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#00E676' }}>{sedimentSupplied}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={sedimentSupplied}
            onChange={(e) => setSedimentSupplied(parseInt(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            <span>0% (보충 없음)</span>
            <span>50% (부분 보충)</span>
            <span>100% (완전 복원)</span>
          </div>
        </div>
      </div>

      {/* Real-time Calculation Result Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {/* Card 1: Predicted Rate */}
        <div style={{ background: 'rgba(15, 25, 48, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>시뮬레이션 연간 침식율</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: simResult.predictedRate > 3 ? '#FF4757' : '#00F2FE', marginTop: '4px' }}>
            {simResult.predictedRate} m/년
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
            기존 침식속도: {region.erosionRate}
          </div>
        </div>

        {/* Card 2: 2050 Land Loss */}
        <div style={{ background: 'rgba(15, 25, 48, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2050년 백사장 누적 후퇴거리</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFA502', marginTop: '4px' }}>
            {simResult.landLostMeters} m
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
            2026~2050년 24년간 누적 손실
          </div>
        </div>

        {/* Card 3: Economic Damage */}
        <div style={{ background: 'rgba(15, 25, 48, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>예상 경제적 손실</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FF6B81', marginTop: '4px' }}>
            ${simResult.projectedDamageM}M
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
            약 {(parseFloat(simResult.projectedDamageM) * 13.8).toFixed(0)}억원 규모
          </div>
        </div>

        {/* Card 4: Risk Index Gauge */}
        <div style={{ background: 'rgba(15, 25, 48, 0.8)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>위험 지수 (Risk Index)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: simResult.riskIndex > 65 ? '#FF4757' : '#00E676', marginTop: '4px' }}>
            {simResult.riskIndex} / 100
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: simResult.riskIndex > 65 ? '#FF4757' : '#00E676', marginTop: '2px' }}>
            {simResult.statusText}
          </div>
        </div>
      </div>
    </div>
  );
}
