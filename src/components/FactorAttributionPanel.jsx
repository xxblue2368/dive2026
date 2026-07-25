import React, { useState } from 'react';
import { PieChart as PieIcon, Radar as RadarIcon, Info, Building2, Waves, TrendingUp, Wind, Trees, HelpCircle, CheckCircle2 } from 'lucide-react';
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

  // Calculate Human vs Natural split
  const humanPercent = region.attributionFactors
    .filter(f => f.category === 'human' || f.category === 'river')
    .reduce((sum, f) => sum + f.percent, 0);
  const naturalPercent = 100 - humanPercent;

  // Chart Data preparation
  const chartLabels = region.attributionFactors.map(f => f.name.split(' (')[0]);
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
        ticks: { backdropColor: 'transparent', color: '#64748B', stepSize: 20 }
      }
    },
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Building2': return <Building2 size={18} />;
      case 'Waves': return <Waves size={18} />;
      case 'TrendingUp': return <TrendingUp size={18} />;
      case 'Wind': return <Wind size={18} />;
      case 'Trees': return <Trees size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Title & Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PieIcon size={22} color="#00F2FE" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              해안선 변화 5대 원인 요인 기여도 (Attribution Analysis)
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            AI 머신러닝 데이터 분석 기반 요인별 정량적 침식 기여율(%)
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

      {/* Human vs Natural Split Bar (Hackathon Highlight!) */}
      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700 }}>
          <span style={{ color: '#FF4757', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🏢 인위적 개발 요인 (방파제, 도심 반사파, 하천 댐 차단): {humanPercent}%
          </span>
          <span style={{ color: '#00F2FE', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🌊 자연/기후 변화 요인 (해수면 상승, 태풍 고파랑): {naturalPercent}%
          </span>
        </div>
        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${humanPercent}%`, background: 'linear-gradient(90deg, #FF4757, #FFA502)', transition: 'width 0.6s ease' }} />
          <div style={{ width: `${naturalPercent}%`, background: 'linear-gradient(90deg, #00F2FE, #4FACFE)', transition: 'width 0.6s ease' }} />
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
            요소를 클릭하여 세부 메커니즘 확인:
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
                      분류: {factor.category === 'human' ? '인공 구조물' : factor.category === 'river' ? '하천 수계' : factor.category === 'climate' ? '기후변화' : factor.category === 'storm' ? '이상 파랑' : '해안 식생'}
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
          {selectedFactor.name.includes('방파제') || selectedFactor.name.includes('구조물')
            ? '항만/돌제 건설로 인해 해안을 따라 이동하는 표사(모래) 흐름이 직각으로 막혀, 구조물 후면부의 백사장이 지속해서 깎여 나가는 인공적 침식 메커니즘입니다.'
            : selectedFactor.name.includes('토사')
            ? '상류 보·댐 건설 및 하천 준설 작업으로 인해 해안으로 공급되던 신규 토사량이 연간 70% 이상 감소하여 모래 자연 보충이 중단된 물리 현상입니다.'
            : selectedFactor.name.includes('해수면')
            ? '지구 온난화로 인한 해수 열팽창 및 극지 빙하 유실로 연간 3.8mm씩 침수선이 상승하여 백사장 기초부 유실을 일으킵니다.'
            : selectedFactor.name.includes('태풍')
            ? '이상 고파랑 및 이상 폭풍 해일이 해안선 백사장을 직격하여 모래를 심해 깊은 곳으로 강하게 끌어내는 침식 현상입니다.'
            : '해안 사구 식생의 뿌리가 모래를 고정해 주던 자연 방벽이 해안 도로/상업 시설로 훼손되어 바닷바람과 파도에 모래가 쉽게 쓸려나갑니다.'}
        </p>
      </div>
    </div>
  );
}
