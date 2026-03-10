'use client'

import { useEffect, useRef } from 'react'
import { personal } from '@/lib/data'
import AvatarCanvas from './three/AvatarCanvas'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')!
    const N = 100
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const pts: P[] = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.4, a: Math.random() * 0.4 + 0.1,
    }))
    let hx = -9999, hy = -9999
    const onMove = (e: MouseEvent) => { hx = e.clientX; hy = e.clientY }
    canvas.addEventListener('mousemove', onMove)
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(48,54,61,${(1 - d / 130) * 0.7})`; ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      pts.forEach((p) => {
        const dx = p.x - hx, dy = p.y - hy, d = Math.sqrt(dx * dx + dy * dy)
        if (d < 150) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(hx, hy)
          ctx.strokeStyle = `rgba(63,185,80,${(1 - d / 150) * 0.3})`; ctx.lineWidth = 0.7; ctx.stroke()
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,148,158,${p.a})`; ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: '1200px', margin: '0 auto',
          padding: '110px 24px 80px', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 440px',
          gap: '60px', alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.25)',
              padding: '5px 14px', borderRadius: '20px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
              color: 'var(--green)', marginBottom: '20px',
              animation: 'fadeUp 0.6s ease both 0.2s',
            }}
          >
            <span
              style={{
                width: '6px', height: '6px', background: 'var(--green)',
                borderRadius: '50%', animation: 'pulseDot 2s infinite',
              }}
            />
            Available for Freelance · Nagaon, Assam
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05,
              animation: 'fadeUp 0.6s ease both 0.35s',
            }}
          >
            <span style={{ display: 'block', color: 'var(--text-primary)' }}>{personal.name}</span>
            <span
              style={{
                background: 'linear-gradient(135deg, var(--green), var(--blue))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {personal.role}
            </span>
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '18px 0 32px', maxWidth: '500px', animation: 'fadeUp 0.6s ease both 0.5s' }}>
            {personal.tagline}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', animation: 'fadeUp 0.6s ease both 0.65s' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                background: 'var(--green)', color: 'var(--bg-canvas)',
                padding: '11px 22px', borderRadius: '8px', fontWeight: 700, fontSize: '13px',
                textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'Syne, sans-serif',
              }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.background = '#4ac661'; t.style.boxShadow = '0 0 24px var(--glow-green)'; t.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.background = 'var(--green)'; t.style.boxShadow = 'none'; t.style.transform = 'translateY(0)' }}
            >View Projects →</a>
            <a
              href={personal.cvUrl}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                background: 'transparent', color: 'var(--text-primary)',
                padding: '11px 22px', borderRadius: '8px', fontWeight: 700, fontSize: '13px',
                textDecoration: 'none', border: '1px solid var(--border)', transition: 'all 0.2s', fontFamily: 'Syne, sans-serif',
              }}
              onMouseEnter={(e) => { const t = e.currentTarget; t.style.background = 'var(--bg-card)'; t.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { const t = e.currentTarget; t.style.background = 'transparent'; t.style.transform = 'translateY(0)' }}
            >Download CV ↓</a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '28px', marginTop: '40px', animation: 'fadeUp 0.6s ease both 0.8s' }}>
            {personal.stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>
                  {s.num.replace('+', '')}<span style={{ color: 'var(--green)' }}>{s.num.includes('+') ? '+' : ''}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D Avatar */}
        <div className="hidden lg:block" style={{ animation: 'fadeUp 0.8s ease both 0.4s', position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <AvatarCanvas />
            {/* Corner decorations */}
            {[
              { top: '-1px', left: '-1px', borderWidth: '2px 0 0 2px' },
              { top: '-1px', right: '-1px', borderWidth: '2px 2px 0 0' },
              { bottom: '-1px', left: '-1px', borderWidth: '0 0 2px 2px' },
              { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: '18px', height: '18px', borderColor: 'var(--green)', borderStyle: 'solid', ...s }} />
            ))}
          </div>
          {/* Floating pills */}
          {[
            { label: '⚛️ React.js', style: { top: '14%', left: '-55px', animationDelay: '0s' } },
            { label: '🔥 Firebase', style: { top: '46%', right: '-45px', animationDelay: '0.8s' } },
            { label: '🐘 PHP', style: { bottom: '18%', left: '-48px', animationDelay: '1.6s' } },
          ].map((p) => (
            <div
              key={p.label}
              style={{
                position: 'absolute',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                padding: '5px 11px', borderRadius: '20px',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '10px',
                color: 'var(--text-secondary)', whiteSpace: 'nowrap',
                animation: 'float 3s ease-in-out infinite',
                zIndex: 3, ...p.style,
              }}
            >{p.label}</div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2, animation: 'fadeUp 1s ease both 1.2s' }}>
        <div style={{ width: '18px', height: '30px', border: '1.5px solid var(--border)', borderRadius: '9px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '5px', background: 'var(--green)', borderRadius: '2px', animation: 'scrollWheel 2s ease-in-out infinite' }} />
        </div>
        <span style={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', letterSpacing: '2px' }}>SCROLL</span>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100% { box-shadow:0 0 0 0 rgba(63,185,80,.5); } 50% { box-shadow:0 0 0 5px transparent; } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes scrollWheel { 0% { transform:translateX(-50%) translateY(0); opacity:1; } 100% { transform:translateX(-50%) translateY(12px); opacity:0; } }
        @media (max-width: 1024px) { .hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}