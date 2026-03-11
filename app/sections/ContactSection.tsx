'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { personal } from '@/lib/data'

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
  try {
    setStatus("sending")

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    if (data.success) {
      setStatus("sent")
      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    } else {
      setStatus("error")
    }

  } catch {
    setStatus("error")
  }
}

  const LINKS = [
    { icon: '✉️', title: 'Email', sub: personal.email, href: `mailto:${personal.email}` },
    { icon: '📱', title: 'Phone / WhatsApp', sub: personal.phone, href: `tel:${personal.phone}` },
    { icon: '🐱', title: 'GitHub', sub: 'github.com/Ak7865', href: personal.github },
    { icon: '🌐', title: 'Portfolio', sub: 'syedakhterhussain.online', href: personal.portfolio },
    { icon: '🏢', title: '8BitBannar', sub: '8bitbannar.in — WebTech Company', href: personal.companyUrl },
  ]

  return (
    <section id="contact" style={{ background: 'var(--bg-overlay)', borderTop: '1px solid var(--border)' }}>
      <div className="section-inner">
        <div className="sec-label">contact</div>
        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '14px' }}>
          Let&apos;s <span style={{ color: 'var(--green)' }}>Connect</span>
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: 1.75, marginBottom: '48px' }}>
          Have a project, freelance opportunity, or just want to say hi? I respond within 24 hours.
        </p>

        <div
          ref={ref}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px',
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.7s, transform 0.7s',
          }}
          className="con-grid"
        >
          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { key: 'name', label: 'Your Name', type: 'text', placeholder: 'What should I call you?' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Project, freelance, or just saying hi' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(88,166,255,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Message</label>
              <textarea
                placeholder="Tell me about your project or what you're looking for..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                rows={5}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--blue)' }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--border)' }}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              style={{
                alignSelf: 'flex-start',
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                background: status === 'sent' ? '#26a641' : 'var(--green)',
                color: 'var(--bg-canvas)', padding: '11px 22px',
                borderRadius: '8px', fontWeight: 700, fontSize: '13px',
                border: 'none', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', fontFamily: 'Syne, sans-serif',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✅ Message Sent!' : 'Send Message →'}
            </button>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {LINKS.map((l) => (
              <a
                key={l.title}
                href={l.href}
                target={l.href.startsWith('mailto') || l.href.startsWith('tel') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', textDecoration: 'none', color: 'var(--text-primary)', transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={(e) => { const t = e.currentTarget; t.style.borderColor = 'var(--green)'; t.style.transform = 'translateX(4px)' }}
                onMouseLeave={(e) => { const t = e.currentTarget; t.style.borderColor = 'var(--border)'; t.style.transform = 'translateX(0)' }}
              >
                <span style={{ fontSize: '22px' }}>{l.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{l.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l.sub}</div>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
              </a>
            ))}
            <div style={{ marginTop: '4px', padding: '18px', background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              📍 Based in <strong style={{ color: 'var(--text-primary)' }}>Nagaon, Assam — 782003</strong><br />
              ⏰ Reply time: <strong style={{ color: 'var(--green)' }}>within 24 hours</strong><br />
              💬 Open to: <strong style={{ color: 'var(--text-primary)' }}>Freelance, Internship, Full-time</strong><br />
              🌐 Languages: <strong style={{ color: 'var(--text-primary)' }}>English, Assamese, Hindi, Bengali</strong>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.con-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  )
}