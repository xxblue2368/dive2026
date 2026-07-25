import React, { useState } from 'react';
import { Bot, Send, Sparkles, MessageSquare, Lightbulb, CheckCircle, ChevronRight } from 'lucide-react';

export default function AICoastCopilot({ region }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `안녕하세요! CoastMorph AI 해안선 원인 분석 진단 전문가입니다. 현재 선택된 [${region.name}] 지역의 해안선 변화 메커니즘이나 침식 방지책에 대해 질문해 주세요.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    `${region.name}의 주원인 요인(${region.attributionFactors[0].name.split(' (')[0]})이 침식에 미친 메커니즘을 설명해줘.`,
    `2050년까지 ${region.name}의 해안선 보존을 위해 가장 시급한 수목/공학적 대책은?`,
    `인위적 구조물과 기후변화 해수면 상승 중 어디에 예산을 먼저 투입해야 할까?`
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // AI Dynamic Response logic based on region and query
    setTimeout(() => {
      let aiResponseText = "";
      if (query.includes('메커니즘') || query.includes('주원인')) {
        aiResponseText = `[CoastMorph AI 정밀 진단] ${region.name}의 주원인은 **${region.attributionFactors[0].name}** (기여도 ${region.attributionFactors[0].percent}%)입니다. \n\n이 현상은 표사(해안 모래)의 연안 이동 경로가 구조물에 의해 직각 차단되면서 하류측 백사장에 공급되는 모래가 상실되는 '인공 침식' 현상이 지배적입니다.`;
      } else if (query.includes('대책') || query.includes('보존') || query.includes('예산')) {
        aiResponseText = `[추천 솔루션] ${region.name}의 권장 방재 대책: \n1. **${region.recommendation}** \n2. 하천 댐 구간 상류 토사 수중 바이패싱 관로 설치 \n3. 해안 사구 식생(해당화, 갯기름나물 등) 2.5km 구획 재복원 프로젝트\n\n이 대책 실행 시 2050년 예상 백사장 유실량을 약 62% 절감할 수 있습니다.`;
      } else {
        aiResponseText = `[데이터 종합 분석] ${region.name} 지역은 현재 **${region.erosionRate}** 속도로 침식이 진행되고 있습니다. 전체 침식의 **${region.stats.dominantFactor}**가 결정적 영향을 주고 있으며, 2050년까지 총 ${region.stats.economicImpact}의 경제적 손실이 추산됩니다.`;
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #7B2CBF 0%, #00F2FE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFF'
        }}>
          <Bot size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            CoastMorph AI 진단 챗봇 & 해커톤 발표 어시스턴트
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            해안 원인 분석 파라미터 및 해양 공학 솔루션 Q&A
          </p>
        </div>
      </div>

      {/* Quick Prompt Presets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Lightbulb size={13} color="#FFD700" /> 추천 시연 질문:
        </span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,242,254,0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: 'var(--text-main)',
                fontSize: '0.76rem',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <ChevronRight size={14} color="#00F2FE" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <div style={{
        height: '240px',
        overflowY: 'auto',
        background: 'rgba(7, 13, 29, 0.6)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              background: msg.sender === 'user'
                ? 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)'
                : 'rgba(15, 25, 48, 0.9)',
              color: msg.sender === 'user' ? '#070D1D' : 'var(--text-main)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-color)',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '0.84rem',
              lineHeight: '1.55',
              whiteSpace: 'pre-line'
            }}
          >
            {msg.text}
            <div style={{
              fontSize: '0.65rem',
              color: msg.sender === 'user' ? 'rgba(7, 13, 29, 0.7)' : 'var(--text-dim)',
              marginTop: '4px',
              textAlign: 'right'
            }}>
              {msg.time}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ color: '#00F2FE', fontSize: '0.8rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} className="radar-scanner" /> CoastMorph AI 정밀 분석 중...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="해안선 변화 원인이나 침식 방지 대책에 대해 자유롭게 질문해 보세요..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '10px 16px',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
        <button onClick={() => handleSend()} className="btn-primary" style={{ padding: '10px 18px' }}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
