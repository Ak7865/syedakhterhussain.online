import GlobeCanvas from './three/GlobeCanvas'
import { globeStats } from '@/lib/data'

export default function GlobeSection() {
  return (
    <section id="globe" style={{ background: 'var(--bg-canvas)' }}>
      <div className="section-inner">
        <div
          className="globe-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '72px',
            alignItems: 'center',
          }}
        >
          <div className="globe-canvas-wrap" style={{ maxWidth: '300px', width: '100%' }}>
            <GlobeCanvas />
          </div>
          <div>
            <div className="sec-label">reach</div>
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '16px' }}>
              Building for <span style={{ color: 'var(--blue)' }}>India & beyond</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.75, marginBottom: '8px' }}>
              Based in Nagaon, Assam — serving clients across India with web development, maintenance, and freelance services through 8BitBannar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
              {globeStats.map((g) => (
                <div
                  key={g.text}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 18px',
                    background: 'var(--bg-overlay)', border: '1px solid var(--border)',
                    borderRadius: '8px', transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--green)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
                >
                  <span style={{ fontSize: '18px' }}>{g.icon}</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{g.text}</strong> — {g.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width: 900px){
          .globe-grid{
            grid-template-columns:1fr!important;
            gap:40px!important;
          }
          .globe-canvas-wrap{
            max-width:300px!important;
            margin:0 auto 8px auto!important;
          }
        }
        @media(max-width: 600px){
          .globe-grid{
            gap:28px!important;
          }
        }
      `}</style>
    </section>
  )
}