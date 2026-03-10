'use client'

import { useInView } from 'react-intersection-observer'
import { education } from '@/lib/data'

export default function EducationSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="education" style={{ background: 'var(--bg-overlay)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section-inner">
        <div className="sec-label">education</div>
        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '14px' }}>
          Academic <span style={{ color: 'var(--purple)' }}>Background</span>
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.75, marginBottom: '56px' }}>
          Building a strong CS foundation across multiple institutions in Assam.
        </p>

        <div
          ref={ref}
          className="tl-line"
          style={{
            position: 'relative', paddingLeft: '28px',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}
        >
          {education.map((e, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: '40px' }}
              onMouseEnter={(el) => {
                const dot = el.currentTarget.querySelector<HTMLElement>('.tl-dot-el')
                const card = el.currentTarget.querySelector<HTMLElement>('.tl-card-el')
                if (dot) dot.style.background = 'var(--green)'
                if (card) { card.style.borderColor = 'var(--green)'; card.style.transform = 'translateX(4px)' }
              }}
              onMouseLeave={(el) => {
                const dot = el.currentTarget.querySelector<HTMLElement>('.tl-dot-el')
                const card = el.currentTarget.querySelector<HTMLElement>('.tl-card-el')
                if (dot) dot.style.background = 'var(--bg-canvas)'
                if (card) { card.style.borderColor = 'var(--border)'; card.style.transform = 'translateX(0)' }
              }}
            >
              {/* Dot */}
              <div className="tl-dot-el" style={{ position: 'absolute', left: '-35px', top: '4px', width: '13px', height: '13px', borderRadius: '50%', border: '2px solid var(--green)', background: 'var(--bg-canvas)', transition: 'background 0.2s' }} />
              {/* Date */}
              <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', letterSpacing: '1px', marginBottom: '7px' }}>{e.period}</div>
              {/* Card */}
              <div className="tl-card-el" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px', transition: 'border-color 0.2s, transform 0.2s' }}>
                {e.badge && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(63,185,80,0.12)', border: '1px solid rgba(63,185,80,0.25)', color: 'var(--green)', fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', borderRadius: '20px', marginBottom: '10px' }}>
                    {e.badge}
                  </div>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '3px' }}>{e.degree}</h3>
                <h4 style={{ fontSize: '13px', color: 'var(--blue)', marginBottom: '10px' }}>{e.institution}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '10px' }}>{e.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {e.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.2)', color: 'var(--blue)', borderRadius: '4px', fontFamily: 'JetBrains Mono, monospace' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}