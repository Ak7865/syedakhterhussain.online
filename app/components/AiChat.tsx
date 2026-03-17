"use client";

import { useState, useRef, useEffect } from "react";
import { chatKB } from "@/lib/data";

interface Msg {
  text: string;
  from: "bot" | "user";
}

const STARTER_CHIPS = [
  "About Syed?",
  "Tech stack?",
  "Projects?",
  "Services?",
  "Certifications?",
  "Education?",
  "GitHub profile?",
  "Portfolio?",
  "Hire Syed?",
  "Contact?",
  "Location?",
  "8BitBannar?",
];

const FLOW: Record<string, string[]> = {
  about: ["Tech stack?", "Projects?", "Services?"],
  stack: ["Projects?", "Frontend?", "Backend?"],
  project: ["Tech stack?", "GitHub profile?", "Portfolio?"],
  services: ["Hire Syed?", "Portfolio?", "Contact?"],
  hire: ["Contact?", "Location?", "Services?"],
  education: ["Certifications?", "Skills?", "Internship?"],
  certification: ["Education?", "Projects?", "Skills?"],
  github: ["Projects?", "Tech stack?", "Portfolio?"],
  portfolio: ["Projects?", "Services?", "Hire Syed?"],
  contact: ["Hire Syed?", "Portfolio?", "Location?"],
  location: ["Contact?", "Hire Syed?"],
  "8bitbannar": ["Services?", "Portfolio?", "Contact?"],
};

function getResponse(q: string): string {
  const lower = q.toLowerCase();

  for (const [key, val] of Object.entries(chatKB)) {
    if (lower.includes(key)) return val;
  }

  return "I'm not sure about that yet. You can ask about Syed's projects, skills, services or contact details.";
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      text: "Hey! 👋 I'm Syed's AI assistant. Ask me anything about his skills, projects, or services.",
      from: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [chips, setChips] = useState<string[]>(STARTER_CHIPS);

  const [visibleCount, setVisibleCount] = useState(4);

  const msgEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;

    setMsgs((m) => [...m, { text, from: "user" }]);
    setInput("");
    setTyping(true);

    const response = getResponse(text);

    setTimeout(() => {
      setTyping(false);

      setMsgs((m) => [...m, { text: response, from: "bot" }]);

      const lower = text.toLowerCase();

      let matched = false;

      for (const key in FLOW) {
        if (lower.includes(key)) {
          setChips(FLOW[key]);
          setVisibleCount(FLOW[key].length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        setChips(["Projects?", "Tech stack?", "Hire Syed?", "Contact?"]);
        setVisibleCount(4);
      }
    }, 1200);
  };

  return (
    <div
      style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 500 }}
    >
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            right: 0,
            width: "340px",
            background: "var(--bg-overlay)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "14px 18px",
              background: "var(--bg-card)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,var(--green),var(--blue))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🤖
            </div>

            <div>
              <div style={{ fontSize: "13px", fontWeight: 700 }}>
                Syed&apos;s Assistant
              </div>

              <div style={{ fontSize: "10px", color: "var(--green)" }}>
                ● Online
              </div>
            </div>
          </div>

          <div
            style={{
              height: "260px",
              overflowY: "auto",
              padding: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "85%",
                  padding: "9px 13px",
                  borderRadius:
                    m.from === "bot"
                      ? "10px 10px 10px 3px"
                      : "10px 10px 3px 10px",
                  fontSize: "12px",
                  background:
                    m.from === "bot" ? "var(--bg-card)" : "var(--green)",
                  border: m.from === "bot" ? "1px solid var(--border)" : "none",
                  alignSelf: m.from === "bot" ? "flex-start" : "flex-end",
                  animation: "msgFade .25s ease",
                }}
              >
                {m.text}
              </div>
            ))}

            {typing && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px 10px 10px 3px",
                  padding: "8px 12px",
                  display: "flex",
                  gap: "4px",
                }}
              >
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}

            <div ref={msgEnd} />
          </div>

          {chips.length > 0 && (
            <div
              style={{
                padding: "6px 14px 10px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {chips.slice(0, visibleCount).map((c) => (
                <button
                  key={c}
                  onClick={() => send(c)}
                  style={{
                    fontSize: "10px",
                    padding: "4px 9px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "20px",
                    cursor: "pointer",
                    transition: "all .2s ease",
                  }}
                >
                  {c}
                </button>
              ))}

              {visibleCount < chips.length && (
                <button
                  onClick={() => setVisibleCount(visibleCount + 4)}
                  style={{
                    fontSize: "10px",
                    padding: "4px 9px",
                    background: "transparent",
                    border: "1px dashed var(--border)",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                >
                  + More
                </button>
              )}
            </div>
          )}

          <div
            style={{
              padding: "10px 14px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              gap: "7px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about Syed..."
              style={{
                flex: 1,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "7px",
                padding: "7px 11px",
                fontSize: "12px",
              }}
            />

            <button
              onClick={() => send(input)}
              style={{
                background: "var(--green)",
                border: "none",
                borderRadius: "7px",
                padding: "7px 11px",
                cursor: "pointer",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setOpen(!open);
          if (!open) {
            setChips(STARTER_CHIPS);
            setVisibleCount(4);
          }
        }}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,var(--green),var(--blue))",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          boxShadow: "0 4px 18px rgba(63,185,80,0.4)",
        }}
      >
        {open ? "✕" : "🤖"}
      </button>

      <style>{`

        @keyframes msgFade{
          from{
            opacity:0;
            transform:translateY(6px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .typing-dot{
          width:6px;
          height:6px;
          background:var(--text-secondary);
          border-radius:50%;
          animation:typingBounce 1.2s infinite;
        }

        .typing-dot:nth-child(2){
          animation-delay:.2s;
        }

        .typing-dot:nth-child(3){
          animation-delay:.4s;
        }

        @keyframes typingBounce{
          0%,80%,100%{
            transform:scale(.6);
            opacity:.5;
          }
          40%{
            transform:scale(1);
            opacity:1;
          }
        }

      `}</style>
    </div>
  );
}
