import React, { useState } from 'react';
import { PieChart as PieIcon, Radar as RadarIcon, Info, Building2, Waves, TrendingUp, Wind, CloudRain, Zap, CheckCircle2 } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

export default function FactorAttributionPanel({ region }) {
  const [selectedFactor, setSelectedFactor] = useState(region.attributionFactors[0]);
  const [chartType, setChartType] = useState('doughnut'); // 'doughnut' | 'radar'

  // Calculate Rain/Energy vs Tide/Wave split
  const rainEnergyPercent = region.attributionFactors
    .filter(f => f.category === 'hydro' || f.category === 'energy')
    .reduce((sum, f) => sum + f.percent, 0).toFixed(2);
  const tideWavePercent = (100 - rainEnergyPercent).toFixed(2);

  // Chart Data preparation
  const chartLabels = region.attributionFactors.map(f => f.name);
  const chartValues = region.attributionFactors.map(f => f.percent);
  const chartColors = region.attributionFactors.map(f => f.color);

  const doughnutData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: chartColors,
        borderColor: '#070D1D',
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#F1F5F9',
          font: { family: 'Plus Jakarta Sans', size: 11 },
          padding: 12,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` 기여도: ${context.raw}%`
        }
      }
    },
    maintainAspectRatio: false
  };

  const radarData = {
    labels: chartLabels,
    datasets: [
      {
        label: `${region.name} 요인 영향도 (%)`,
        data: chartValues,
        backgroundColor: 'rgba(0, 242, 254, 0.25)',
        borderColor: '#00F2FE',
        borderWidth: 2,
        pointBackgroundColor: '#00F2FE',
        pointBorderColor: '#FFF',
        pointHoverRadius: 6
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
 grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#94A3B8', font: { size: 10 } },
        ticks: { backdropColor: 'transparent', color: '#64748B', stepSize: 10 }
      }
    },
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'CloudRain': return <CloudRain size={18} />;
      case 'Waves': return <Waves size={18} />;
      case 'TrendingUp': return <TrendingUp size={18} />;
      case 'Wind': return <Wind size={18} />;
      case 'Zap': return <Zap size={18} />;
      default: return <Info size={18} />;
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'hydro': return '강수/수문 변수';
      case 'tide': return '조위/해수면 변수';
      case 'wave': return '파랑/파고 변수';
      case 'energy': return '누적 에너지 변수';
      default: return '환경 물리 변수';
    }
  };

  const getFactorDescription = (factorName) => {
    if (factorName.includes('강수량')) {
      return '육상 강수량 누적으로 인한 수계 토사 유출 및 연안 세굴 작용이 해안선 수평 위치 변동에 30.15%의 가장 커다란 지배적 영향을 미칩니다.';
    } else if (factorName.includes('순간 조위')) {
      return '촬영 위성/항공 영상의 촬영 시점 만조·간조 조위차로 인한 노출 백사장 폭 해설 및 해안선 위치의 24.53% 변동 오차를 설명합니다.';
    } else if (factorName.includes('최고 조위')) {
      return '연중 발생한 대조기 및 폭풍 해일 최고 조위 상승에 따른 해안 사구 침식 및 백사장 상부 유실 기여도(24.25%)입니다.';
    } else if (factorName.includes('유의파고')) {
      return '태풍 및 이상 파랑 유입 시 극단적 파고 에너지가 백사장 모래를 깊은 바다속으로 휩쓸고 가는 대규모 유실 작용(14.15%)입니다.';
    } else if (factorName.includes('파랑에너지')) {
      return '장기간 지속적으로 작용하는 수중 파동 에너지가 누적되어 침식과 복원 사이의 평형을 파괴하는 요인(6.91%)입니다.';
    }
    return '해안 물리 및 기상 환경 조건이 해안선 변동에 복합적으로 작용한 결과입니다.';
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title & Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieIcon size={22} color="#00F2FE" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              해안선 변화 5대 주요 원인 기여도 (Attribution Analysis)
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            AI 머신러닝 상관분석 기반 5개 핵심 환경 물리 변수 기여율(%)
          </p>
        </div>

        {/* Chart View Toggle */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setChartType('doughnut')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: chartType === 'doughnut' ? 'var(--primary-cyan)' : 'transparent',
              color: chartType === 'doughnut' ? '#070D1D' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <PieIcon size={14} /> 도넛 차트
          </button>
          <button
            onClick={() => setChartType('radar')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: chartType === 'radar' ? 'var(--primary-cyan)' : 'transparent',
              color: chartType === 'radar' ? '#070D1D' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RadarIcon size={14} /> 레이더 분석
          </button>
        </div>
      </div>

      {/* Split Bar */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700 }}>
          <span style={{ color: '#00F2FE', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🌧️ 강수 및 누적 에너지 변수 (강수량, 파랑에너지): {rainEnergyPercent}%
          </span>
          <span style={{ color: '#FFA502', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🌊 조위 및 파고 요인 (순간조위, 최고조위, 유의파고): {tideWavePercent}%
          </span>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${rainEnergyPercent}%`, background: 'linear-gradient(90deg, #00F2FE, #2ED573)', transition: 'width 0.6s ease' }} />
          <div style={{ width: `${tideWavePercent}%`, background: 'linear-gradient(90deg, #4FACFE, #FFA502, #FF4757)', transition: 'width 0.6s ease' }} />
        </div>
      </div>

      {/* Main Grid: Left Chart + Right Factor Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'center' }}>
        {/* Chart View */}
        <div style={{ height: '300px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {chartType === 'doughnut' ? (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          ) : (
            <Radar data={radarData} options={radarOptions} />
          )}
        </div>

        {/* Factors List & Selected Deep Dive */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            변수를 클릭하여 세부 인과 메커니즘 확인:
          </h4>

          {region.attributionFactors.map((factor, index) => {
            const isSelected = selectedFactor.name === factor.name;
            return (
              <div
                key={index}
                onClick={() => setSelectedFactor(factor)}
                style={{
                  background: isSelected ? 'rgba(0, 242, 254, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isSelected ? factor.color : 'rgba(255, 255, 255, 0.08)'}`,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: `${factor.color}22`,
                    color: factor.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getIcon(factor.icon)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{factor.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      분류: {getCategoryLabel(factor.category)}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: factor.color }}>
                    {factor.percent}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Factor Mechanical Insight Box */}
      <div style={{
        background: `rgba(${selectedFactor.color === '#FF4757' ? '255,71,87' : '0,242,254'}, 0.08)`,
        border: `1px solid ${selectedFactor.color}`,
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} color={selectedFactor.color} />
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: selectedFactor.color }}>
            주요 요인 원인 분석: [{selectedFactor.name}] - 기여율 {selectedFactor.percent}%
          </h4>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
          {getFactorDescription(selectedFactor.name)}
        </p>
      </div>
    </div>
  );
}

