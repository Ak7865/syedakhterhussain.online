"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { skillCategories, certifications } from "@/lib/data";
const GithubGraph = dynamic(() => import("../components/GithubGraph"), {
  ssr: false,
});

const BAR_COLORS = {
  green: "linear-gradient(90deg,#26a641,#3fb950)",
  blue: "linear-gradient(90deg,#388bfd,#58a6ff)",
  purple: "linear-gradient(90deg,#8957e5,#bc8cff)",
};
const LEVEL_BG = ["var(--border)", "#0e4429", "#006d32", "#26a641", "#39d353"];

interface ContribCell {
  date: string;
  level: number;
  count: number;
}

function ContribGraph() {
  const [cells, setCells] = useState<ContribCell[]>([]);
  const [total, setTotal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        setCells(data.cells || []);
        setTotal(data.total);
        setIsFallback(data.fallback);
      })
      .catch(() => setIsFallback(true))
      .finally(() => setLoading(false));
  }, []);

  const weeks: ContribCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  if (loading)
    return (
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: 52 }).map((_, w) => (
          <div
            key={w}
            style={{ display: "flex", flexDirection: "column", gap: "3px" }}
          >
            {Array.from({ length: 7 }).map((_, d) => (
              <div
                key={d}
                style={{
                  width: "11px",
                  height: "11px",
                  borderRadius: "2px",
                  background: "var(--border)",
                  opacity: 0.4,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );

  return (
    <div>
      <div style={{ overflowX: "auto", paddingBottom: "4px" }}>
        <div style={{ display: "flex", gap: "3px", minWidth: "max-content" }}>
          {weeks.map((week, w) => (
            <div
              key={w}
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              {week.map((cell, d) => (
                <div
                  key={d}
                  title={`${cell.date}: ${cell.count} contributions`}
                  style={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "2px",
                    background: LEVEL_BG[cell.level] || LEVEL_BG[0],
                    cursor: "default",
                    transition: "transform 0.1s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.transform = "scale(1.3)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.transform = "scale(1)")
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "8px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            color: "var(--text-muted)",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          Less
        </span>
        {LEVEL_BG.map((bg, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              background: bg,
            }}
          />
        ))}
        <span
          style={{
            fontSize: "10px",
            color: "var(--text-muted)",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          More
        </span>
      </div>
      <div
        style={{
          marginTop: "8px",
          fontSize: "11px",
          color: "var(--text-muted)",
          fontFamily: "JetBrains Mono, monospace",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        {total && (
          <span style={{ color: "var(--green)" }}>{total} contributions</span>
        )}
        <span>·</span>
        <a
          href="https://github.com/Ak7865"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--blue)", textDecoration: "none" }}
        >
          github.com/Ak7865 ↗
        </a>
        {isFallback && (
          <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>
            (preview data)
          </span>
        )}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref: skillRef, inView: skillsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: secRef, inView: secInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="skills" style={{ background: "var(--bg-canvas)" }}>
      <div className="section-inner">
        <div className="sec-label">expertise</div>
        <h2
          style={{
            fontSize: "clamp(26px,4vw,44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "14px",
          }}
        >
          Skills & <span style={{ color: "var(--green)" }}>Technologies</span>
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
          From frontend design to backend APIs and databases — here&apos;s what
          I bring to the table.
        </p>

        <div
          ref={skillRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            opacity: secInView ? 1 : 0,
            transition: "opacity 0.7s",
          }}
          className="skills-grid"
        >
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              style={{
                background: "var(--bg-overlay)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "22px",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget;
                t.style.borderColor = "var(--blue)";
                t.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget;
                t.style.borderColor = "var(--border)";
                t.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--text-secondary)",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                {cat.title}
              </div>
              {cat.skills.map((sk) => (
                <div key={sk.name} style={{ marginBottom: "14px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {sk.name}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      {sk.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "3px",
                      background: "var(--border)",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "2px",
                        background: BAR_COLORS[cat.color],
                        width: skillsInView ? `${sk.pct}%` : "0%",
                        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "56px" }} ref={secRef}>
          <div className="sec-label">certifications</div>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: "32px",
            }}
          >
            Professional{" "}
            <span style={{ color: "var(--orange)" }}>Credentials</span>
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
            }}
            className="certs-grid"
          >
            {certifications.map((c) => (
              <div
                key={c.name}
                style={{
                  background: "var(--bg-overlay)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "18px 16px",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget;
                  t.style.borderColor = "var(--green)";
                  t.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget;
                  t.style.borderColor = "var(--border)";
                  t.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                  {c.icon}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {c.org}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "56px" }}>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "JetBrains Mono, monospace",
              color: "var(--text-secondary)",
              marginBottom: "12px",
            }}
          >
            // GitHub contributions — github.com/Ak7865
          </div>

          <GithubGraph />
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.skills-grid{grid-template-columns:1fr!important;}.certs-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:520px){.certs-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </section>
  );
}
