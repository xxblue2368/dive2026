import React, { useState, useEffect, useRef } from 'react';
import { Layers, Eye, ShieldAlert, Sparkles, Sliders, Play, Pause, RotateCcw, AlertTriangle, Calendar, TrendingUp, TrendingDown, Info } from 'lucide-react';

export default function CoastMapSlider({ region, isAutoPlay, setIsAutoPlay }) {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedPhaseId, setSelectedPhaseId] = useState(null);
  const [activeLayers, setActiveLayers] = useState({
    erosion: true,
    structures: true,
    waves: true,
    inundation: false
  });

  const canvasRef = useRef(null);

  // Auto-play timeline timer (2015 to 2025 and 2050)
  useEffect(() => {
    let timer;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setSelectedYear(prev => {
          if (prev >= 2025 && prev < 2050) return 2050;
          if (prev >= 2050) return 2015;
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // Find nearest historical timeline record
  const currentTimelineData = region.historicalTimeline.reduce((acc, item) => {
    return Math.abs(item.year - selectedYear) < Math.abs(acc.year - selectedYear) ? item : acc;
  }, region.historicalTimeline[0]);

  // Canvas Coastal Simulation Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let wavePhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      wavePhase += 0.05;

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Deep Ocean Water
      const oceanGradient = ctx.createLinearGradient(0, 0, width, height);
      oceanGradient.addColorStop(0, '#040914');
      oceanGradient.addColorStop(0.5, '#0A1836');
      oceanGradient.addColorStop(1, '#082545');
      ctx.fillStyle = oceanGradient;
      ctx.fillRect(0, 0, width, height);

      // Calculate beach width based on selected year
      const currentWidthMeters = currentTimelineData.width;
      const currentBeachWidthPx = currentWidthMeters * 3.5;

      const landBaseX = width * 0.65;
      const currentCoastX = landBaseX - currentBeachWidthPx;
      const baseline2015X = landBaseX - 50.0 * 3.5; // 2015 baseline = 50m

      // 2. Draw 2015 Baseline Coastline (Dashed Ghost Line)
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = 'rgba(0, 230, 118, 0.6)';
      ctx.lineWidth = 2;
      ctx.moveTo(baseline2015X, 0);
      ctx.lineTo(baseline2015X, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label for 2015 Baseline
      ctx.fillStyle = '#00E676';
      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.fillText('2015년 기준 해안선 (폭 50m)', baseline2015X - 140, 30);

      // 3. Draw Sand Beach Area
      const sandGradient = ctx.createLinearGradient(currentCoastX, 0, landBaseX, 0);
      sandGradient.addColorStop(0, '#ECCC68');
      sandGradient.addColorStop(1, '#D4A359');
      ctx.fillStyle = sandGradient;
      
      ctx.beginPath();
      ctx.moveTo(currentCoastX, 0);
      ctx.lineTo(landBaseX, 0);
      ctx.lineTo(landBaseX, height);
      ctx.lineTo(currentCoastX, height);
      ctx.closePath();
      ctx.fill();

      // 4. Draw Land Area (Vegetation & Buildings)
      ctx.fillStyle = '#1A2F25';
      ctx.fillRect(landBaseX, 0, width - landBaseX, height);

      // 5. Draw Water Wave Ripples
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const rippleX = currentCoastX - 15 - i * 30 + Math.sin(wavePhase + i) * 8;
        ctx.moveTo(rippleX, 0);
        for (let y = 0; y < height; y += 20) {
          const waveOffsetY = Math.sin(wavePhase + y * 0.03 + i) * 6;
          ctx.lineTo(rippleX + waveOffsetY, y);
        }
        ctx.stroke();
      }

      // 6. Draw Current Coastline Boundary with Dynamic Color Glow
      const isErosionDominant = currentTimelineData.photoText.includes('유실') || currentTimelineData.photoText.includes('재침식');
      ctx.beginPath();
      ctx.strokeStyle = isErosionDominant ? '#FF4757' : '#00F2FE';
      ctx.lineWidth = 4;
      ctx.shadowColor = isErosionDominant ? '#FF4757' : '#00F2FE';
      ctx.shadowBlur = 12;
      ctx.moveTo(currentCoastX, 0);
      for (let y = 0; y < height; y += 15) {
        const coastNoise = Math.sin(y * 0.02 + wavePhase * 0.2) * 4;
        ctx.lineTo(currentCoastX + coastNoise, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 7. Layer Overlays: Breakwaters & Artificial Structures
      if (activeLayers.structures) {
        const pierY = height * 0.35;
        ctx.fillStyle = '#475569';
        ctx.fillRect(currentCoastX - 140, pierY - 12, 140, 24);
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;
        ctx.strokeRect(currentCoastX - 140, pierY - 12, 140, 24);

        ctx.fillStyle = '#FFA502';
        ctx.font = 'bold 11px Plus Jakarta Sans';
        ctx.fillText('🏗️ 인공 방파제/항만 차단선', currentCoastX - 170, pierY - 20);

        ctx.beginPath();
        ctx.strokeStyle = '#FF4757';
        ctx.lineWidth = 3;
        ctx.moveTo(currentCoastX - 20, pierY + 40);
        ctx.lineTo(currentCoastX - 20, pierY + 10);
        ctx.stroke();
      }

      // 8. Layer Overlays: Wave Vectors
      if (activeLayers.waves) {
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
        ctx.lineWidth = 2;
        for (let y = 60; y < height; y += 90) {
          const arrowX = currentCoastX - 90;
          ctx.beginPath();
          ctx.moveTo(arrowX - 40, y);
          ctx.lineTo(arrowX, y - 10);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = '#00F2FE';
          ctx.arc(arrowX, y - 10, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 9. Layer Overlays: Erosion Hotspot Pulsing Circles
      if (activeLayers.erosion) {
        const pulseRadius = 10 + Math.sin(wavePhase * 2) * 5;
        ctx.fillStyle = 'rgba(255, 71, 87, 0.35)';
        ctx.beginPath();
        ctx.arc(currentCoastX + 15, height * 0.65, pulseRadius + 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF4757';
        ctx.beginPath();
        ctx.arc(currentCoastX + 15, height * 0.65, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 11px Plus Jakarta Sans';
        ctx.fillText('⚠️ 집중 침식 구역 (침식률 ' + region.erosionRate + ')', currentCoastX + 32, height * 0.65 + 4);
      }

      // 10. Layer Overlays: 2050 SLR Inundation Line
      if (activeLayers.inundation) {
        const inundationX = landBaseX + 40;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(currentCoastX, 0, inundationX - currentCoastX, height);
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(currentCoastX, 0, inundationX - currentCoastX, height);
        ctx.setLineDash([]);
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.fillText('🚨 2050 극단 해일 침수 예측 범위', inundationX - 180, height - 30);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedYear, region, activeLayers, currentTimelineData]);

  const toggleLayer = (layerKey) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Simulation Map Card */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header & Map Layer Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={20} color="#00F2FE" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {region.name} - 10개년 시공간 해안선 모형 및 침식 레이어
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              2015년 ~ 2025년 실측 시계열 변동 데이터 & 2050년 미래 침식 시뮬레이션
            </p>
          </div>

          {/* Spatial Layer Toggles */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => toggleLayer('erosion')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid ' + (activeLayers.erosion ? '#FF4757' : 'rgba(255,255,255,0.1)'),
                background: activeLayers.erosion ? 'rgba(255,71,87,0.2)' : 'rgba(255,255,255,0.03)',
                color: activeLayers.erosion ? '#FF4757' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldAlert size={14} /> 침식 핫스팟
            </button>
            <button
              onClick={() => toggleLayer('structures')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid ' + (activeLayers.structures ? '#FFA502' : 'rgba(255,255,255,0.1)'),
                background: activeLayers.structures ? 'rgba(255,165,2,0.2)' : 'rgba(255,255,255,0.03)',
                color: activeLayers.structures ? '#FFA502' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🏗️ 인공 방파제
            </button>
            <button
              onClick={() => toggleLayer('waves')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid ' + (activeLayers.waves ? '#00F2FE' : 'rgba(255,255,255,0.1)'),
                background: activeLayers.waves ? 'rgba(0,242,254,0.2)' : 'rgba(255,255,255,0.03)',
                color: activeLayers.waves ? '#00F2FE' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🌊 파랑 에너지
            </button>
            <button
              onClick={() => toggleLayer('inundation')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid ' + (activeLayers.inundation ? '#FF0000' : 'rgba(255,255,255,0.1)'),
                background: activeLayers.inundation ? 'rgba(255,0,0,0.25)' : 'rgba(255,255,255,0.03)',
                color: activeLayers.inundation ? '#FF6B6B' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🚨 2050 침수 구역
            </button>
          </div>
        </div>

        {/* Main Canvas View & Info Banner */}
        <div style={{ position: 'relative', width: '100%', height: '360px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <canvas ref={canvasRef} width={800} height={360} style={{ width: '100%', height: '100%', display: 'block' }} />

          {/* Selected Year Overlay Pill */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(7, 13, 29, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--primary-cyan)',
            padding: '8px 16px',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-neon)'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>선택 연도</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00F2FE' }}>{selectedYear}년</div>
          </div>

          {/* Selected Year Situation Note */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            background: 'rgba(15, 25, 48, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 18px',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} color={currentTimelineData.photoText.includes('유실') || currentTimelineData.photoText.includes('재침식') ? '#FF4757' : '#00E676'} />
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{currentTimelineData.photoText}</span>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>현재 백사장 폭: </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#00F2FE' }}>
                  {currentTimelineData.width.toFixed(1)}m
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>연간 침식 속도: </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#FF4757' }}>{region.erosionRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Controls & Year Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.03)', padding: '12px 18px', borderRadius: '12px' }}>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            style={{
              background: isAutoPlay ? '#FF4757' : 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
              color: '#070D1D',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 16px',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
            <span>{isAutoPlay ? '일시정지' : '타임라인 재생'}</span>
          </button>

          <button
            onClick={() => setSelectedYear(2015)}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              color: 'var(--text-main)',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer'
            }}
            title="2015년 리셋"
          >
            <RotateCcw size={16} />
          </button>

          {/* Year Range Slider */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              <span style={{ color: '#2ED573' }}>2015년 (시작)</span>
              <span>2017년</span>
              <span style={{ color: '#00F2FE' }}>2021년 (정점)</span>
              <span style={{ color: '#FFA502' }}>2025년 (최근)</span>
              <span style={{ color: '#FF4757' }}>2050년 (예측)</span>
            </div>
            <input
              type="range"
              min={2015}
              max={2025}
              step={1}
              value={selectedYear > 2025 ? 2025 : selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* 4-Phase Interactive Timeline Dashboard Panel */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={22} color="#00F2FE" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                10개년 해안선 변동 타임라인 분석 (2015년 ~ 2025년)
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              백사장 확장, 침식, 복원, 극단적 변동성 4대 주기별 모래 유실량($m^2$) 및 해안선 전진/후퇴($m$) 분석
            </p>
          </div>
        </div>

        {/* 4-Phase Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {region.timelinePhases.map((phase) => {
            const isSelected = selectedPhaseId === phase.id;

            return (
              <div
                key={phase.id}
                onClick={() => {
                  setSelectedPhaseId(isSelected ? null : phase.id);
                  // Set year to start of phase
                  const yearMatch = phase.period.match(/\d{4}/);
                  if (yearMatch) setSelectedYear(parseInt(yearMatch[0]));
                }}
                style={{
                  background: isSelected ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${phase.badgeColor}`,
                  borderRadius: '14px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.25 ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: isSelected ? `0 0 15px ${phase.badgeColor}33` : 'none'
                }}
              >
                {/* Phase Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: `${phase.badgeColor}22`,
                    color: phase.badgeColor,
                    fontSize: '0.78rem',
                    fontWeight: 800
                  }}>
                    {phase.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    [{phase.period}]
                  </span>
                </div>

                {/* Phase Title */}
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                  {phase.id}. {phase.title}
                </h4>

                {/* Yearly Data List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '10px 12px', borderRadius: '10px' }}>
                  {phase.yearlyData.map((yData, idx) => {
                    const isPositive = yData.areaChange.startsWith('+');
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--text-muted)' }}>{yData.yearRange}:</span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, color: isPositive ? '#2ED573' : '#FF4757' }}>
                            {yData.areaChange}
                          </span>
                          <span style={{ color: isPositive ? '#00F2FE' : '#FFA502', fontSize: '0.76rem' }}>
                            ({yData.shorelineChange})
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Core Summary Box */}
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderLeft: `3px solid ${phase.badgeColor}`,
                  padding: '10px 12px',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.82rem',
                  lineHeight: '1.5',
                  color: 'var(--text-main)'
                }}>
                  <span style={{ fontWeight: 700, color: phase.badgeColor }}>📝 핵심 요약: </span>
                  {phase.summary}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

