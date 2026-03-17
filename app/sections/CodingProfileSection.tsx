"use client";

import { useInView } from "react-intersection-observer";

export default function CodingProfilesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="coding" style={{ background: "var(--bg-canvas)" }}>
      <div className="section-inner">
        <div className="sec-label">coding profiles</div>

        <h2
          style={{
            fontSize: "clamp(26px,4vw,44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            marginBottom: "14px",
          }}
        >
          My <span style={{ color: "var(--green)" }}>Coding Activity</span>
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
          My open-source contributions and competitive programming progress.
        </p>

        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <h3 className="sub-header">GitHub Stats</h3>

          <div className="stats-row">
            <div className="stat-card">
              <img src="https://github-readme-stats.vercel.app/api?username=Ak7865&theme=synthwave&count_private=true" />
            </div>

            <div className="stat-card">
              <img src="https://github-readme-streak-stats.herokuapp.com/?user=Ak7865&theme=synthwave" />
            </div>
          </div>

          <h3 className="sub-header">Top Languages</h3>

          <div className="stats-center">
            <div className="stat-card">
              <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Ak7865&theme=synthwave&layout=compact" />
            </div>
          </div>

          <h3 className="sub-header">LeetCode Performance</h3>
          <div className="stats-center">
            <div className="stat-card">
              <img src="https://leetcard.jacoblin.cool/Ak7865?theme=dark&ext=activity" />
            </div>
          </div>
        </div>
      </div>

      <style>{`

      .sub-header{
        margin:40px 0 18px;
        font-weight:700;
        font-size:18px;
      }

      .stats-row{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:24px;
        justify-items:center;
        align-items:center;
      }

      .stats-center{
        display:flex;
        justify-content:center;
      }

      .stat-card{
        background:var(--bg-overlay);
        border:1px solid var(--border);
        border-radius:12px;
        padding:18px;
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        max-width:420px;
        transition:border-color .2s, transform .2s;
      }

      .stat-card img{
        width:100%;
        max-width:360px;
      }

      .stat-card:hover{
        border-color:var(--green);
        transform:translateY(-3px);
      }

      .snake-container{
        display:flex;
        justify-content:center;
        margin-top:10px;
      }

     
      @media(max-width:700px){
        .stats-row{
          grid-template-columns:1fr;
        }
      }

      `}</style>
    </section>
  );
}
