"use client";

import { useInView } from "react-intersection-observer";
import { services } from "@/lib/data";

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" style={{ background: "var(--bg-canvas)" }}>
      <div className="section-inner">
        <div className="sec-label">what I offer</div>
        <h2
          style={{
            fontSize: "clamp(26px,4vw,44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "14px",
          }}
        >
          Services via <span style={{ color: "var(--green)" }}>8BitBannar</span>
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            maxWidth: "540px",
            lineHeight: 1.75,
            marginBottom: "48px",
          }}
        >
          Professional web services for individuals and businesses across India.
        </p>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "18px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
          className="srv-grid"
        >
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                background: "var(--bg-overlay)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "26px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.borderColor = "var(--green)";
                t.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.borderColor = "var(--border)";
                t.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "14px" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.srv-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:520px){.srv-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
