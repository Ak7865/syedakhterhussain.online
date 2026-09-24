"use client";

import { useEffect, useInView } from "react-intersection-observer";
import { useState } from "react";

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type Language = {
  name: string;
  bytes: number;
  percentage: number;
};

type GithubData = {
  user: {
    login: string;
    name: string;
    avatarUrl: string;
    url: string;
  };

  contributions: {
    total: number;
    currentStreak: number;
    longestStreak: number;
    weeks: ContributionWeek[];
  };

  languages: Language[];
};

export default function CodingProfilesSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [github, setGithub] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        return res.json();
      })
      .then((data) => {
        setGithub(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          My{" "}
          <span style={{ color: "var(--green)" }}>
            Coding Activity
          </span>
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
          My open-source contributions and programming activity
          directly from GitHub.
        </p>

        <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : "translateY(28px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          {loading ? (
            <div className="github-loading">
              Loading GitHub activity...
            </div>
          ) : !github ? (
            <div className="github-error">
              Unable to load GitHub activity.
            </div>
          ) : (
            <>
              {/* ============================= */}
              {/* GITHUB CONTRIBUTIONS */}
              {/* ============================= */}

              <h3 className="sub-header">
                GitHub Contributions
              </h3>

              <div className="github-card">
                <div className="github-card-top">
                  <div>
                    <div className="github-label">
                      GITHUB
                    </div>

                    <h4>
                      Contribution Activity
                    </h4>
                  </div>

                  <a
                    href={github.user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-profile-link"
                  >
                    @{github.user.login} ↗
                  </a>
                </div>

                {/* Stats */}

                <div className="github-mini-stats">
                  <div>
                    <strong>
                      {github.contributions.total}
                    </strong>

                    <span>
                      contributions
                    </span>
                  </div>

                  <div>
                    <strong>
                      🔥 {github.contributions.currentStreak}
                    </strong>

                    <span>
                      current streak
                    </span>
                  </div>

                  <div>
                    <strong>
                      {github.contributions.longestStreak}
                    </strong>

                    <span>
                      longest streak
                    </span>
                  </div>
                </div>

                {/* Contribution Calendar */}

                <div className="contribution-wrapper">
                  <div className="contribution-calendar">
                    {github.contributions.weeks.map(
                      (week, weekIndex) => (
                        <div
                          className="contribution-week"
                          key={weekIndex}
                        >
                          {week.contributionDays.map(
                            (day) => (
                              <div
                                key={day.date}
                                className={`contribution-day ${getContributionClass(
                                  day.contributionCount
                                )}`}
                                title={`${day.contributionCount} contributions on ${day.date}`}
                              />
                            )
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="contribution-footer">
                  <span>
                    Less
                  </span>

                  <div className="legend-box level-0" />
                  <div className="legend-box level-1" />
                  <div className="legend-box level-2" />
                  <div className="legend-box level-3" />
                  <div className="legend-box level-4" />

                  <span>
                    More
                  </span>
                </div>
              </div>

              {/* ============================= */}
              {/* TOP LANGUAGES */}
              {/* ============================= */}

              <h3 className="sub-header">
                Top Languages
              </h3>

              <div className="languages-card">
                <div className="languages-header">
                  <div>
                    <div className="github-label">
                      GITHUB
                    </div>

                    <h4>
                      Most Used Languages
                    </h4>
                  </div>

                  <a
                    href={`https://github.com/${github.user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-profile-link"
                  >
                    View Profile ↗
                  </a>
                </div>

                <div className="language-list">
                  {github.languages.map(
                    (language) => (
                      <div
                        className="language-item"
                        key={language.name}
                      >
                        <div className="language-info">
                          <span>
                            {language.name}
                          </span>

                          <span>
                            {language.percentage}%
                          </span>
                        </div>

                        <div className="language-bar">
                          <div
                            className="language-progress"
                            style={{
                              width: `${language.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ============================= */}
              {/* LEETCODE */}
              {/* ============================= */}

              <h3 className="sub-header">
                LeetCode Performance
              </h3>

              <div className="stats-center">
                <div className="stat-card">
                  <img
                    src="https://leetcard.jacoblin.cool/Ak7865?theme=dark&ext=activity"
                    alt="Ak7865 LeetCode Performance"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`

        .sub-header {
          margin: 40px 0 18px;
          font-weight: 700;
          font-size: 18px;
        }

        .github-loading,
        .github-error {
          padding: 40px;
          text-align: center;
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--bg-overlay);
        }

        .github-card,
        .languages-card {
          width: 100%;
          border: 1px solid var(--border);
          background: var(--bg-overlay);
          border-radius: 14px;
          padding: 24px;
          overflow: hidden;
        }

        .github-card-top,
        .languages-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }

        .github-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: var(--green);
          margin-bottom: 5px;
        }

        .github-card h4,
        .languages-card h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 750;
        }

        .github-profile-link {
          color: var(--green);
          text-decoration: none;
          font-size: 13px;
          white-space: nowrap;
        }

        .github-profile-link:hover {
          text-decoration: underline;
        }

        .github-mini-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 28px;
        }

        .github-mini-stats > div {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .github-mini-stats strong {
          font-size: 20px;
          font-weight: 800;
        }

        .github-mini-stats span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .contribution-wrapper {
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .contribution-calendar {
          display: flex;
          gap: 4px;
          min-width: max-content;
        }

        .contribution-week {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contribution-day {
          width: 11px;
          height: 11px;
          border-radius: 2px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .level-0 {
          background: #161b22;
        }

        .level-1 {
          background: #0e4429;
        }

        .level-2 {
          background: #006d32;
        }

        .level-3 {
          background: #26a641;
        }

        .level-4 {
          background: #39d353;
        }

        .contribution-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 5px;
          margin-top: 12px;
          font-size: 11px;
          color: var(--text-secondary);
        }

        .legend-box {
          width: 11px;
          height: 11px;
          border-radius: 2px;
        }

        .language-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .language-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 7px;
          font-size: 13px;
        }

        .language-info span:first-child {
          font-weight: 600;
        }

        .language-info span:last-child {
          color: var(--text-secondary);
        }

        .language-bar {
          width: 100%;
          height: 7px;
          border-radius: 10px;
          overflow: hidden;
          background: var(--border);
        }

        .language-progress {
          height: 100%;
          border-radius: inherit;
          background: var(--green);
        }

        .stats-center {
          display: flex;
          justify-content: center;
        }

        .stat-card {
          background: var(--bg-overlay);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 420px;
        }

        .stat-card img {
          width: 100%;
          max-width: 360px;
        }

        @media (max-width: 700px) {

          .github-card,
          .languages-card {
            padding: 18px;
          }

          .github-card-top,
          .languages-header {
            flex-direction: column;
          }

          .github-mini-stats {
            grid-template-columns: 1fr;
          }

          .contribution-day,
          .legend-box {
            width: 9px;
            height: 9px;
          }

          .contribution-calendar {
            gap: 3px;
          }

          .contribution-week {
            gap: 3px;
          }
        }

      `}</style>
    </section>
  );
}

function getContributionClass(count: number) {
  if (count === 0) return "level-0";
  if (count <= 3) return "level-1";
  if (count <= 7) return "level-2";
  if (count <= 12) return "level-3";
  return "level-4";
}
