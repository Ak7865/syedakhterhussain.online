import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Syed Akhter Hussain — Full Stack Web Developer, Nagaon, Assam'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0d1117',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(48,54,61,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          display: 'flex',
        }} />

        {/* Green glow top-left */}
        <div style={{
          position: 'absolute', top: '-120px', left: '-120px',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63,185,80,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Blue glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(88,166,255,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top border accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(90deg, #3fb950, #58a6ff, #bc8cff)',
          display: 'flex',
        }} />

        {/* Main content */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          padding: '60px 72px',
          flex: 1,
        }}>

          {/* Top row: avatar placeholder + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '36px', marginBottom: '40px' }}>

            {/* Avatar circle */}
            <img
              src="https://www.syedakhterhussain.online/syed-akhter-hussain.jpg"
              width="110"
              height="110"
              style={{ borderRadius: '50%', border: '3px solid #3fb950', objectFit: 'cover', flexShrink: 0 }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Available badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(63,185,80,0.12)',
                border: '1px solid rgba(63,185,80,0.35)',
                padding: '4px 14px', borderRadius: '20px',
                width: 'fit-content',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3fb950', display: 'flex' }} />
                <span style={{ color: '#3fb950', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Available for Freelance
                </span>
              </div>

              <div style={{ fontSize: '52px', fontWeight: 800, color: '#e6edf3', lineHeight: 1.05, display: 'flex' }}>
                Syed Akhter Hussain
              </div>
              <div style={{ fontSize: '24px', fontWeight: 600, display: 'flex' }}>
                <span style={{ color: '#3fb950' }}>Full Stack</span>
                <span style={{ color: '#8b949e', marginLeft: '10px' }}>Web Developer</span>
              </div>
            </div>
          </div>

          {/* Location + company row */}
          <div style={{ display: 'flex', gap: '28px', marginBottom: '36px' }}>
            {[
              { icon: '📍', text: 'Nagaon, Assam, India' },
              { icon: '🏢', text: '8BitBannar WebTech' },
              { icon: '🎓', text: 'B.Tech CSE — BVEC' },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid #30363d',
                padding: '8px 16px', borderRadius: '8px',
              }}>
                <span style={{ fontSize: '16px' }}>{icon}</span>
                <span style={{ color: '#8b949e', fontSize: '15px' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Skills tags */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['React.js', 'PHP', 'Node.js', 'MySQL', 'Firebase', 'JavaScript', 'Python', 'Java'].map((skill) => (
              <div key={skill} style={{
                background: 'rgba(88,166,255,0.08)',
                border: '1px solid rgba(88,166,255,0.25)',
                padding: '6px 14px', borderRadius: '6px',
                color: '#58a6ff', fontSize: '14px', fontWeight: 600,
                display: 'flex',
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 72px',
          borderTop: '1px solid #21262d',
          background: 'rgba(22,27,34,0.8)',
        }}>
          <span style={{ color: '#6e7681', fontSize: '14px', fontFamily: 'monospace', display: 'flex' }}>
            syedakhterhussain.online
          </span>
          <span style={{ color: '#6e7681', fontSize: '14px', display: 'flex', gap: '20px' }}>
            <span style={{ color: '#3fb950' }}>github.com/Ak7865</span>
            <span>•</span>
            <span>8bitbannar.in</span>
            <span>•</span>
            <span>ah076145@gmail.com</span>
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}