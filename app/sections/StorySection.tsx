'use client'

import { useEffect, useRef, useState } from 'react'
import { story } from '@/lib/data'

export default function StorySection() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef  = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const outer  = outerRef.current
    const sticky = stickyRef.current
    const track  = trackRef.current
    if (!outer || !sticky || !track) return

    const N = story.length

    /* called on mount and every resize */
    const applyLayout = () => {
      if (window.innerWidth < 768) {
        // ── MOBILE: clear every inline style the desktop branch writes
        outer.style.height        = ''
        sticky.style.position     = ''
        sticky.style.top          = ''
        sticky.style.height       = ''
        sticky.style.overflow     = ''
        track.style.transform     = ''
        track.style.flexDirection = 'column'

        // reset per-panel inline styles
        track.querySelectorAll<HTMLElement>('.story-panel').forEach(p => {
          p.style.opacity   = ''
          p.style.transform = ''
        })
      } else {
        // ── DESKTOP: tall outer + sticky inner
        outer.style.height        = `${N * 100}vh`
        sticky.style.position     = 'sticky'
        sticky.style.top          = '0'
        sticky.style.height       = '100vh'
        sticky.style.overflow     = 'hidden'
        track.style.flexDirection = 'row'
      }
    }

    applyLayout()

    const onScroll = () => {
      if (window.innerWidth < 768) return

      const rect     = outer.getBoundingClientRect()
      const total    = outer.offsetHeight - window.innerHeight
      const prog     = Math.max(0, Math.min(1, -rect.top / total))
      const panelF   = prog * (N - 1)

      setActiveIdx(Math.min(Math.round(panelF), N - 1))
      track.style.transform = `translateX(-${panelF * window.innerWidth}px)`

      track.querySelectorAll<HTMLElement>('.story-panel').forEach((p, i) => {
        const dist    = Math.abs(panelF - i)
        p.style.opacity   = String(Math.max(0.25, 1 - dist * 0.35))
        p.style.transform = `scale(${Math.max(0.93, 1 - dist * 0.04)})`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', applyLayout)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', applyLayout)
    }
  }, [])

  return (
    <section
      id="story"
      style={{
        background: 'var(--bg-overlay)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div ref={outerRef} style={{ position: 'relative' }}>

        <div ref={stickyRef} className="story-sticky" style={{ display: 'flex', flexDirection: 'column' }}>

          {/* ── Header ── */}
          <div className="story-header">
            <div className="sec-label">my journey</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                From Nagaon to <span style={{ color: 'var(--green)' }}>the web</span>
              </h2>
              {/* progress dots — hidden on mobile via CSS */}
              <div className="story-dots">
                {story.map((_, i) => (
                  <div key={i} style={{
                    width: i === activeIdx ? '22px' : '7px',
                    height: '7px', borderRadius: '4px',
                    background: i === activeIdx ? 'var(--green)' : 'var(--border)',
                    transition: 'all 0.3s',
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Sliding / stacked track ── */}
          <div ref={trackRef} className="story-track">
            {story.map((s, i) => (
              <div key={s.num} className="story-panel">
                <div className="story-card" style={{
                  border: `1px solid ${i === activeIdx ? 'rgba(63,185,80,0.4)' : 'var(--border)'}`,
                  boxShadow: i === activeIdx ? '0 0 40px rgba(63,185,80,0.07)' : 'none',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}>
                  {/* top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,var(--green),var(--blue))', opacity: i === activeIdx ? 1 : 0, transition: 'opacity 0.3s', borderRadius: '20px 20px 0 0' }} />
                  {/* watermark number */}
                  <div style={{ position: 'absolute', top: '-8px', right: '16px', fontFamily: 'JetBrains Mono,monospace', fontSize: '80px', fontWeight: 800, color: 'rgba(255,255,255,0.035)', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>{s.num}</div>

                  <div style={{ fontSize: '44px', marginBottom: '14px' }}>{s.icon}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)', padding: '3px 12px', borderRadius: '20px', fontFamily: 'JetBrains Mono,monospace', fontSize: '10px', color: 'var(--green)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
                    Step {s.num}
                  </div>
                  <h3 style={{ fontSize: 'clamp(18px,2.5vw,26px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '12px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: s.desc }} />
                </div>
              </div>
            ))}
          </div>

          {/* scroll hint */}
          <div className="story-hint" style={{ opacity: activeIdx === 0 ? 1 : 0, transition: 'opacity 0.3s' }}>
            scroll to explore <span style={{ display: 'inline-block', animation: 'bounceRight 1.5s ease-in-out infinite' }}>→</span>
          </div>
        </div>
      </div>
    </section>
  )
}