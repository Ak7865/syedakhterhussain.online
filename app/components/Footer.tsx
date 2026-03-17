"use client";
import { personal } from "@/lib/data";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Globe,
  Briefcase,
} from "lucide-react";

export default function Footer() {
  const socials = [
    { icon: Github, href: personal.github, label: "GitHub" },
    { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
    {
      icon: Instagram,
      href: personal.own_instagram,
      label: "Personal Instagram",
    },
    {
      icon: Instagram,
      href: personal.company_instagram,
      label: "Company Instagram",
    },
    { icon: Globe, href: personal.portfolio, label: "Portfolio" },
    { icon: Briefcase, href: personal.companyUrl, label: "Company Website" },
    { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
  ];
  return (
    <footer
      style={{
        background: "var(--bg-canvas)",
        borderTop: "1px solid var(--border)",
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          Designed & built by{" "}
          <span style={{ color: "var(--green)" }}>
            <a href="https://www.syedakhterhussain.online">{personal.name}</a>
          </span>{" "}
          · {personal.company} · © {new Date().getFullYear()}
        </div>
        <div style={{ display: "flex", gap: "18px" }}>
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontFamily: "JetBrains Mono, monospace",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-muted)")
                }
              >
                <Icon
                  size={18}
                  color="var(--text-muted)"
                  aria-label={s.label}
                />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
