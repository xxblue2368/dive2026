import React from 'react';
import { Award, X, Download, Sparkles, CheckCircle2, ShieldAlert, FileText, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HackathonPitchReport({ region, onClose }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(4, 9, 20, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '30px',
        border: '1px solid var(--primary-cyan)',
        boxShadow: 'var(--shadow-neon)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#FFF',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>

        {/* Header Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA502 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#070D1D'
          }}>
            <Award size={28} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#FFD700', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              EXECUTIVE HACKATHON PITCH DECK REPORT
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }} className="text-gradient-cyan">
              CoastMorph AI: {region.name} 해안선 변화 종합 분석서
            </h2>
          </div>
        </div>

        {/* Summary Overview Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>연간 해안 침식 속도</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FF4757', marginTop: '2px' }}>
              {region.erosionRate}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>추산 누적 경제 피해액</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFA502', marginTop: '2px' }}>
              {region.stats.economicImpact}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>주 원인 요인</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#00F2FE', marginTop: '2px' }}>
              {region.stats.dominantFactor}
            </div>
          </div>
        </div>

        {/* Factor Breakdown List */}
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="#00F2FE" /> 5대 원인 요인 가중치 정량 분석표
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {region.attributionFactors.map((factor, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(15, 25, 48, 0.6)',
                padding: '10px 16px',
                borderRadius: '8px',
                borderLeft: `4px solid ${factor.color}`
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{factor.name}</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: factor.color }}>{factor.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Solution Card */}
        <div style={{
          background: 'rgba(0, 242, 254, 0.08)',
          border: '1px solid var(--primary-cyan)',
          padding: '16px 20px',
          borderRadius: '12px'
        }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#00F2FE', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={16} /> AI 정책 & 해양 공학 권장 솔루션
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>
            {region.recommendation}
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
          <button onClick={onClose} className="btn-outline">
            닫기
          </button>
          <button
            onClick={() => {
              triggerConfetti();
              alert(`[${region.name}] 해커톤 피치 리포트 생성이 확정되었습니다! (PDF/Print Ready)`);
            }}
            className="btn-primary"
          >
            <Sparkles size={16} />
            <span>시연 성공 Confetti & 리포트 확정</span>
          </button>
        </div>
      </div>
    </div>
  );
}
