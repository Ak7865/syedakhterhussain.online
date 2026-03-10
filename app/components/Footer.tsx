import { personal } from '@/lib/data'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-canvas)',
        borderTop: '1px solid var(--border)',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '16px',
        }}
      >
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px', color: 'var(--text-muted)',
          }}
        >
          Designed & built by{' '}
          <span style={{ color: 'var(--green)' }}>{personal.name}</span>{' '}
          · {personal.company} · © {new Date().getFullYear()}
        </div>
        <div style={{ display: 'flex', gap: '18px' }}>
          {[
            { label: 'GitHub', href: personal.github },
            { label: 'Portfolio', href: personal.portfolio },
            { label: '8BitBannar', href: personal.companyUrl },
            { label: 'Email', href: `mailto:${personal.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontSize: '11px', color: 'var(--text-muted)',
                textDecoration: 'none',
                fontFamily: 'JetBrains Mono, monospace',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}