'use client'

import { useEffect, useRef, useState } from 'react'

const MESSAGES = [
  'Booting dev environment...',
  'Loading React components...',
  'Connecting to Firebase...',
  'Building timetable...',
  'Rendering 3D globe...',
  'Almost done!',
  '🚀 Launch!',
]

export default function Loader() {
  const [pct, setPct] = useState(0)
  const [visible, setVisible] = useState(true)
  const rafRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    let current = 0

    const step = () => {
      current += Math.random() * 15 + 5
      if (current > 100) current = 100
      setPct(Math.floor(current))

      if (current < 100) {
        rafRef.current = setTimeout(step, 100 + Math.random() * 150)
      } else {
        setTimeout(() => setVisible(false), 500)
      }
    }

    rafRef.current = setTimeout(step, 300)
    return () => clearTimeout(rafRef.current)
  }, [])

  if (!visible) return null

  const msgIdx = Math.min(Math.floor(pct / 15), MESSAGES.length - 1)

  return (
    <div
      className="fixed inset-0 z-[9997] flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-canvas)', transition: 'opacity 0.6s', opacity: pct >= 100 ? 0 : 1 }}
    >
      <div
        className="mb-3 text-6xl font-bold"
        style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)' }}
      >
        {pct}%
      </div>

      <div
        className="mb-7 text-center leading-8"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}
      >
        <span style={{ color: 'var(--green)' }}>import</span> {'{ Portfolio }'}{' '}
        <span style={{ color: 'var(--green)' }}>from</span>{' '}
        <span style={{ color: 'var(--orange)' }}>&apos;@syedakhter/portfolio&apos;</span>
        <br />
        <span style={{ color: 'var(--green)' }}>const</span> dev ={' '}
        <span style={{ color: 'var(--blue)' }}>new</span> Developer(
        <span style={{ color: 'var(--orange)' }}>&apos;Syed Akhter Hussain&apos;</span>)
      </div>

      {/* Bar */}
      <div
        className="relative overflow-hidden"
        style={{ width: '260px', height: '1px', background: 'var(--border)' }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--green), var(--blue))',
            boxShadow: '0 0 8px var(--glow-green)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>

      <div
        className="mt-4"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}
      >
        {MESSAGES[msgIdx]}
      </div>
    </div>
  )
}