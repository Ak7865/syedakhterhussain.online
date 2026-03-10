'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { personal } from '@/lib/data'

const NAV_LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#education', label: 'edu' },
  { href: '#career', label: 'career' },
  { href: '#projects', label: 'projects' },
  { href: '#services', label: 'services' },
  { href: '#contact', label: 'contact' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current + 5 && y > 80)
      if (y < lastY.current - 5) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '58px',
        background: 'rgba(13,17,23,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
        transition: 'transform 0.3s ease',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px', width: '100%', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '15px', fontWeight: 700,
            color: 'var(--text-primary)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          <span style={{ color: 'var(--green)' }}>&lt;</span>
          Syed
          <span style={{ color: 'var(--blue)' }}>.</span>
          dev
          <span style={{ color: 'var(--green)' }}>/&gt;</span>
        </a>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          style={{ gap: '2px', listStyle: 'none' }}
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontSize: '12px',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '5px 11px',
                  borderRadius: '6px',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLElement).style.color = 'var(--text-primary)'
                  ;(e.target as HTMLElement).style.background = 'var(--bg-card)'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLElement).style.color = 'var(--text-secondary)'
                  ;(e.target as HTMLElement).style.background = 'transparent'
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex"
          style={{
            fontSize: '12px', fontWeight: 700,
            color: 'var(--bg-canvas)',
            background: 'var(--green)',
            padding: '7px 16px', borderRadius: '6px',
            textDecoration: 'none',
            fontFamily: 'JetBrains Mono, monospace',
            transition: 'all 0.15s',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLElement).style.background = '#4ac661'
            ;(e.target as HTMLElement).style.boxShadow = '0 0 18px var(--glow-green)'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLElement).style.background = 'var(--green)'
            ;(e.target as HTMLElement).style.boxShadow = 'none'
          }}
        >
          Hire Me →
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-primary)', fontSize: '20px',
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute', top: '58px', left: 0, right: 0,
            background: 'var(--bg-overlay)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 24px',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '14px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '8px',
              textAlign: 'center',
              background: 'var(--green)',
              color: 'var(--bg-canvas)',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Hire Me →
          </a>
        </div>
      )}
    </nav>
  )
}