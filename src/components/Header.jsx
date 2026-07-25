import React from 'react';
import { Waves, MapPin, ShieldAlert, Award, FileText, Play } from 'lucide-react';
import { COASTAL_REGIONS } from '../data/coastalData';

export default function Header({ 
  selectedRegion, 
  setSelectedRegion, 
  onOpenPitchModal,
  isAutoPlay,
  setIsAutoPlay 
}) {
  return (
    <header className="glass-panel" style={{ margin: '16px 20px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      {/* Brand & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #00F2FE 0%, #7B2CBF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)'
        }}>
          <Waves size={26} color="#070D1D" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800 }} className="text-gradient-cyan">
              CoastMorph AI
            </h1>
            <span style={{
              background: 'rgba(0, 242, 254, 0.15)',
              color: '#00F2FE',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}>
              HACKATHON v2.6
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            해안선 변화 원인 종합 진단 & 미래 침식 시뮬레이터 (Coastline Attribution Engine)
          </p>
        </div>
      </div>

      {/* Region Selector & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* Region Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <MapPin size={18} color="#00F2FE" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>대상 해안:</span>
          <select
            value={selectedRegion.id}
            onChange={(e) => {
              const reg = COASTAL_REGIONS.find(r => r.id === e.target.value);
              if (reg) setSelectedRegion(reg);
            }}
            style={{
              background: 'transparent',
              color: 'var(--text-main)',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {COASTAL_REGIONS.map(reg => (
              <option key={reg.id} value={reg.id} style={{ background: '#0B132B', color: '#FFF' }}>
                {reg.name} ({reg.erosionRate})
              </option>
            ))}
          </select>
        </div>

        {/* Risk Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: `rgba(${selectedRegion.riskColor === '#FF4757' ? '255,71,87' : '255,165,2'}, 0.15)`,
          border: `1px solid ${selectedRegion.riskColor}`,
          color: selectedRegion.riskColor,
          fontSize: '0.82rem',
          fontWeight: 700
        }}>
          <ShieldAlert size={16} />
          <span>{selectedRegion.riskLevel}</span>
        </div>

        {/* Auto Play Timeline Button */}
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="btn-outline"
          style={{
            borderColor: isAutoPlay ? '#00F2FE' : 'var(--border-color)',
            background: isAutoPlay ? 'rgba(0, 242, 254, 0.15)' : undefined
          }}
        >
          <Play size={15} color={isAutoPlay ? '#00F2FE' : '#FFF'} />
          <span>{isAutoPlay ? '타임라인 자동 재생 중' : '시공간 시뮬레이션'}</span>
        </button>

        {/* Hackathon Pitch Report Modal Button */}
        <button onClick={onOpenPitchModal} className="btn-primary">
          <Award size={16} />
          <span>해커톤 심사 리포트</span>
        </button>
      </div>
    </header>
  );
}
