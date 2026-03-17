"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie-wrapper">
      <div className="cookie-box">
        <div className="cookie-text">
          🍪 This site uses cookies to improve your experience.
        </div>

        <div className="cookie-buttons">
          <button className="decline" onClick={decline}>
            Decline
          </button>

          <button className="accept" onClick={accept}>
            Accept cookies
          </button>
        </div>
      </div>

      <style jsx>{`
        .cookie-wrapper {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          animation: slideUp 0.35s ease;
        }

        .cookie-box {
          background: rgba(22, 27, 34, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex;
          gap: 20px;
          align-items: center;
          color: #c9d1d9;
          font-size: 13px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .cookie-text {
          font-family: "JetBrains Mono", monospace;
        }

        .cookie-buttons {
          display: flex;
          gap: 8px;
        }

        button {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }

        .decline {
          background: #21262d;
          color: #c9d1d9;
          border: 1px solid #30363d;
        }

        .decline:hover {
          border-color: #8b949e;
        }

        .accept {
          background: #238636;
          color: white;
        }

        .accept:hover {
          background: #2ea043;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
