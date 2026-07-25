import React, { useState } from 'react';
import Header from './components/Header';
import CoastMapSlider from './components/CoastMapSlider';
import FactorAttributionPanel from './components/FactorAttributionPanel';
import WhatIfSimulator from './components/WhatIfSimulator';
import AICoastCopilot from './components/AICoastCopilot';
import HackathonPitchReport from './components/HackathonPitchReport';
import { COASTAL_REGIONS } from './data/coastalData';
import { LayoutGrid, Map, PieChart, Sliders, Bot, ShieldAlert, Waves, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(COASTAL_REGIONS[0]);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'map' | 'attribution' | 'simulator' | 'copilot'
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Sync selectedRegion if dataset region ID changes
  React.useEffect(() => {
    const current = COASTAL_REGIONS.find(r => r.id === selectedRegion?.id);
    if (!current) {
      setSelectedRegion(COASTAL_REGIONS[0]);
    }
  }, [selectedRegion]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '40px' }}>
      {/* Header Bar */}
      <Header
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        onOpenPitchModal={() => setIsPitchModalOpen(true)}
        isAutoPlay={isAutoPlay}
        setIsAutoPlay={setIsAutoPlay}
      />

      {/* Main Container */}
      <main style={{ flex: 1, padding: '0 20px', maxWidth: '1600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Navigation Tabs Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 25, 48, 0.8)', padding: '6px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'all' ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)' : 'transparent',
                color: activeTab === 'all' ? '#070D1D' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LayoutGrid size={15} /> 📊 전체 대시보드
            </button>
            <button
              onClick={() => setActiveTab('map')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'map' ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)' : 'transparent',
                color: activeTab === 'map' ? '#070D1D' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Map size={15} /> 🗺️ 지도 비교 슬라이더
            </button>
            <button
              onClick={() => setActiveTab('attribution')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'attribution' ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)' : 'transparent',
                color: activeTab === 'attribution' ? '#070D1D' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <PieChart size={15} /> 📈 5대 요인 기여도 분석
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'simulator' ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)' : 'transparent',
                color: activeTab === 'simulator' ? '#070D1D' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Sliders size={15} /> 🤖 RF 해안선 예측 시뮬레이터
            </button>
            <button
              onClick={() => setActiveTab('copilot')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'copilot' ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)' : 'transparent',
                color: activeTab === 'copilot' ? '#070D1D' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Bot size={15} /> 💬 AI 진단 챗봇
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem' }}>
            <div style={{ color: 'var(--text-muted)' }}>
              누적 침식 면적: <strong style={{ color: '#FF4757' }}>{selectedRegion.stats.totalAreaLost}</strong>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              추산 손실액: <strong style={{ color: '#FFA502' }}>{selectedRegion.stats.economicImpact}</strong>
            </div>
          </div>
        </div>

        {/* Dynamic Views Rendering */}
        {activeTab === 'all' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Top Row: Map Slider */}
            <CoastMapSlider region={selectedRegion} isAutoPlay={isAutoPlay} setIsAutoPlay={setIsAutoPlay} />

            {/* Middle Row: Factor Attribution + WhatIf Simulator */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
              <FactorAttributionPanel region={selectedRegion} />
              <WhatIfSimulator region={selectedRegion} />
            </div>

            {/* Bottom Row: AI Copilot Assistant */}
            <AICoastCopilot region={selectedRegion} />
          </div>
        )}

        {activeTab === 'map' && (
          <CoastMapSlider region={selectedRegion} isAutoPlay={isAutoPlay} setIsAutoPlay={setIsAutoPlay} />
        )}

        {activeTab === 'attribution' && (
          <FactorAttributionPanel region={selectedRegion} />
        )}

        {activeTab === 'simulator' && (
          <WhatIfSimulator region={selectedRegion} />
        )}

        {activeTab === 'copilot' && (
          <AICoastCopilot region={selectedRegion} />
        )}
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        CoastMorph AI © 2026 - Hackathon Demonstration Platform | Powered by Multi-Factor Attribution Engine
      </footer>

      {/* Hackathon Pitch Report Modal */}
      {isPitchModalOpen && (
        <HackathonPitchReport
          region={selectedRegion}
          onClose={() => setIsPitchModalOpen(false)}
        />
      )}
    </div>
  );
}
