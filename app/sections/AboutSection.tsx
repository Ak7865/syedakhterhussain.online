"use client";

import { useInView } from "react-intersection-observer";
import { personal } from "@/lib/data";

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="about"
      style={{
        background: "var(--bg-overlay)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="section-inner">
        <div className="sec-label">about me</div>
        <h2
          style={{
            fontSize: "clamp(26px,4vw,44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          More than <span style={{ color: "var(--purple)" }}>just code</span>
        </h2>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "56px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
          className="about-grid"
        >
          <div>
            <p
              style={{
                fontSize: "17px",
                color: "var(--text-primary)",
                fontWeight: 600,
                lineHeight: 1.85,
                marginBottom: "18px",
              }}
            >
              {personal.bio[0]}
            </p>
            {personal.bio.slice(1).map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.85,
                  marginBottom: "18px",
                }}
              >
                {p}
              </p>
            ))}
            <div
              style={{
                background: "rgba(63,185,80,0.07)",
                borderLeft: "3px solid var(--green)",
                padding: "14px 18px",
                borderRadius: "0 8px 8px 0",
                margin: "22px 0",
                fontSize: "14px",
                color: "var(--text-primary)",
                fontStyle: "italic",
                lineHeight: 1.65,
              }}
            >
              {personal.quote}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "7px",
                marginTop: "20px",
              }}
            >
              {personal.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 11px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontFamily: "JetBrains Mono, monospace",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    transition: "all 0.15s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const t = e.currentTarget;
                    t.style.borderColor = "var(--blue)";
                    t.style.color = "var(--blue)";
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget;
                    t.style.borderColor = "var(--border)";
                    t.style.color = "var(--text-secondary)";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "JetBrains Mono, monospace",
                color: "var(--green)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Personal Info
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "28px",
              }}
            >
              {[
                { k: "Birthday", v: personal.birthday },
                { k: "Age", v: personal.age },
                { k: "City", v: "Nagaon, Assam" },
                { k: "Phone", v: personal.phone },
                { k: "Email", v: personal.email },
                { k: "Freelance", v: "✅ Available", green: true },
                { k: "Degree", v: personal.degree },
                { k: "Company", v: personal.company },
              ].map(({ k, v, green }) => (
                <div
                  key={k}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "JetBrains Mono, monospace",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "4px",
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: green ? "var(--green)" : "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "JetBrains Mono, monospace",
                color: "var(--green)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Languages Spoken
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "28px",
              }}
            >
              {personal.languages.map((l) => (
                <div
                  key={l}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "JetBrains Mono, monospace",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "4px",
                    }}
                  >
                    {l}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--green)",
                      fontWeight: 600,
                    }}
                  >
                    Fluent
                  </div>
                </div>
              ))}
            </div>

            <h4
              style={{
                fontSize: "10px",
                fontWeight: 700,
                fontFamily: "JetBrains Mono, monospace",
                color: "var(--green)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: "0 0 12px",
              }}
            >
              Currently Focused On
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {personal.currentFocus.map((f) => (
                <div
                  key={f}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    fontSize: "12px",
                    color: "var(--text-secondary)",
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
