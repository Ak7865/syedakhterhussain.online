'use client'

import { useState, useRef, useEffect } from 'react'
import { chatKB } from '@/lib/data'

interface Msg { text: string; from: 'bot' | 'user' }

const CHIPS = ['Tech stack?', 'Available to hire?', 'Projects?', 'What is 8BitBannar?']

function getResponse(q: string): string {
  const l = q.toLowerCase()
  for (const [key, val] of Object.entries(chatKB)) {
    if (l.includes(key.split(' ')[0])) return val
  }
  return 'Great question! Best to reach Syed directly at ah076145@gmail.com or check his portfolio at syed-akhter-hussain-port.vercel.app 😊'
}

export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { text: "Hey! 👋 I'm Syed's AI assistant. Ask me about his skills, projects, or how to hire him!", from: 'bot' },
  ])
  const [input, setInput] = useState('')
  const [chipsVisible, setChipsVisible] = useState(true)
  const msgEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const send = (text: string) => {
    if (!text.trim()) return
    setMsgs((m) => [...m, { text, from: 'user' }])
    setInput('')
    setChipsVisible(false)
    setTimeout(() => setMsgs((m) => [...m, { text: getResponse(text), from: 'bot' }]), 500)
  }

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 500 }}>
      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'absolute', bottom: '64px', right: 0,
            width: '340px',
            background: 'var(--bg-overlay)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ padding: '14px 18px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--green), var(--blue))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>🤖</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>Syed&apos;s Assistant</div>
              <div style={{ fontSize: '10px', color: 'var(--green)' }}>● Online · Ask me anything!</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: '260px', overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: '85%',
                  padding: '9px 13px',
                  borderRadius: m.from === 'bot' ? '10px 10px 10px 3px' : '10px 10px 3px 10px',
                  fontSize: '12px', lineHeight: '1.5',
                  background: m.from === 'bot' ? 'var(--bg-card)' : 'var(--green)',
                  border: m.from === 'bot' ? '1px solid var(--border)' : 'none',
                  color: m.from === 'bot' ? 'var(--text-primary)' : '#0d1117',
                  alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
                  fontWeight: m.from === 'user' ? 600 : 400,
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={msgEnd} />
          </div>

          {/* Chips */}
          {chipsVisible && (
            <div style={{ padding: '6px 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => send(c)}
                  style={{
                    fontSize: '10px', padding: '4px 9px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    borderRadius: '20px', cursor: 'pointer',
                    fontFamily: 'JetBrains Mono, monospace',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLElement).style.borderColor = 'var(--green)'
                    ;(e.target as HTMLElement).style.color = 'var(--green)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.target as HTMLElement).style.color = 'var(--text-secondary)'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: '7px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Ask about Syed..."
              style={{
                flex: 1, background: 'var(--bg-card)',
                border: '1px solid var(--border)', borderRadius: '7px',
                padding: '7px 11px', fontSize: '12px',
                color: 'var(--text-primary)',
                fontFamily: 'Syne, sans-serif', outline: 'none',
              }}
            />
            <button
              onClick={() => send(input)}
              style={{
                background: 'var(--green)', border: 'none',
                borderRadius: '7px', padding: '7px 11px',
                cursor: 'pointer', fontSize: '14px',
                color: '#0d1117', transition: 'background 0.15s',
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '50px', height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--green), var(--blue))',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 4px 18px rgba(63,185,80,0.4)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = 'scale(1)')}
      >
        {open ? '✕' : '🤖'}
      </button>
    </div>
  )
}