'use client'

import { useInView } from 'react-intersection-observer'
import { projects, githubRepos, personal } from '@/lib/data'
import { useEffect,useState } from 'react'

export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [repos, setRepos] = useState<any[]>([])

  useEffect(() => {
  fetch("/api/repos")
    .then(res => res.json())
    .then(data => setRepos(data))
}, [])
  return (
    <section id="projects" style={{ background: 'var(--bg-overlay)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="section-inner">
        <div className="sec-label">work</div>
        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '14px' }}>
          Featured <span style={{ color: 'var(--teal)' }}>Projects</span>
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.75, marginBottom: '48px' }}>
          Real-world applications built from scratch — each solving a genuine problem.
        </p>

        <div
          ref={ref}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}
          className="proj-grid"
        >
          {projects.map((p) => (
            <div
              key={p.name}
              style={{
                background: 'var(--bg-canvas)', border: '1px solid var(--border)', borderRadius: '8px',
                padding: '18px', display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.transform = 'translateY(-4px)'
                t.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'
                const line = t.querySelector<HTMLElement>('.proj-line')
                if (line) line.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.transform = 'translateY(0)'
                t.style.boxShadow = 'none'
                const line = t.querySelector<HTMLElement>('.proj-line')
                if (line) line.style.opacity = '0'
              }}
            >
              {/* Top gradient line */}
              <div className="proj-line" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--green), var(--blue))', opacity: 0, transition: 'opacity 0.2s' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>{p.icon}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{p.badge}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '7px', color: 'var(--blue)' }}>{p.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '14px' }}>{p.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: p.langColor, display: 'inline-block' }} />
                  {p.lang}
                </span>
                
                <a
                  href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.15s' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--blue)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >↗ View</a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Box */}
        <div style={{ marginTop: '40px', background: 'var(--bg-canvas)', border: '1px solid var(--border)', borderRadius: '12px', padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <svg width="22" height="22" viewBox="0 0 16 16" fill="#8b949e">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700 }}>GitHub Repositories</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>github.com/Ak7865</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }} className="gh-repos-grid">

  {repos.map((r) => (
    <a
      key={r.name}
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: 'var(--bg-overlay)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '14px',
        textDecoration: 'none',
        transition: 'border-color 0.2s',
        display: 'block'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--blue)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--blue)', marginBottom: '5px' }}>
        📁 {r.name}
      </div>

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '10px' }}>
        {r.desc}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          ⭐ {r.stars}
        </span>

        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
          {r.lang}
        </span>
      </div>

    </a>
  ))}

</div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){.proj-grid{grid-template-columns:1fr!important;}.gh-repos-grid{grid-template-columns:1fr!important;}}
        @media(min-width:520px) and (max-width:900px){.proj-grid{grid-template-columns:repeat(2,1fr)!important;}}
      `}</style>
    </section>
  )
}