import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GITHUB_USERNAME = "Ak7865";

type ContributionCell = {
  date: string;
  level: number;
  count: number;
};

type LanguageResult = {
  name: string;
  bytes: number;
  percentage: number;
};

export async function GET() {
  try {
    // ============================================================
    // 1. FETCH GITHUB CONTRIBUTION CALENDAR
    // ============================================================

    const contributionsRes = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions`,
      {
        headers: {
          "User-Agent": "Ak7865-Portfolio",
          Accept: "text/html,application/xhtml+xml",
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!contributionsRes.ok) {
      throw new Error(
        `GitHub contributions returned ${contributionsRes.status}`,
      );
    }

    const html = await contributionsRes.text();

    const cells: ContributionCell[] = [];

    // ============================================================
    // 2. PARSE CONTRIBUTION CELLS
    // ============================================================

    /*
     * GitHub normally renders contribution cells similar to:
     *
     * <td
     *   data-date="2026-09-24"
     *   data-level="2"
     *   aria-label="5 contributions on September 24, 2026"
     * >
     */

    const cellRegex =
      /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*aria-label="([^"]*)"[^>]*>/gi;

    let match: RegExpExecArray | null;

    while ((match = cellRegex.exec(html)) !== null) {
      const date = match[1];
      const level = Number(match[2]);
      const ariaLabel = match[3];

      const countMatch = ariaLabel.match(
        /([\d,]+)\s+contribution/i,
      );

      const count = countMatch
        ? Number(countMatch[1].replace(/,/g, ""))
        : 0;

      cells.push({
        date,
        level,
        count,
      });
    }

    /*
     * GitHub can change the attribute order.
     *
     * If the first parser didn't work, try a more flexible
     * parser that finds data-date/data-level independently.
     */

    if (cells.length === 0) {
      const fallbackCellRegex =
        /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>/gi;

      while (
        (match = fallbackCellRegex.exec(html)) !== null
      ) {
        cells.push({
          date: match[1],
          level: Number(match[2]),
          count: 0,
        });
      }
    }

    if (cells.length === 0) {
      throw new Error(
        "Unable to parse GitHub contribution calendar",
      );
    }

    // ============================================================
    // 3. SORT CONTRIBUTIONS BY DATE
    // ============================================================

    const sortedCells = [...cells].sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime(),
    );

    // ============================================================
    // 4. TOTAL CONTRIBUTIONS
    // ============================================================

    let total = 0;

    /*
     * GitHub's contribution page normally contains:
     *
     * "XXX contributions in the last year"
     */

    const totalMatch = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );

    if (totalMatch) {
      total = Number(
        totalMatch[1].replace(/,/g, ""),
      );
    }

    /*
     * If GitHub's text changes, calculate the total from
     * the individual contribution cells.
     */

    if (!total) {
      total = sortedCells.reduce(
        (sum, cell) => sum + cell.count,
        0,
      );
    }

    // ============================================================
    // 5. CURRENT STREAK
    // ============================================================

    let currentStreak = 0;

    for (let i = sortedCells.length - 1; i >= 0; i--) {
      if (sortedCells[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // ============================================================
    // 6. LONGEST STREAK
    // ============================================================

    let longestStreak = 0;
    let runningStreak = 0;

    for (const cell of sortedCells) {
      if (cell.count > 0) {
        runningStreak++;

        longestStreak = Math.max(
          longestStreak,
          runningStreak,
        );
      } else {
        runningStreak = 0;
      }
    }

    // ============================================================
    // 7. CONVERT CELLS INTO WEEKS
    // ============================================================

    /*
     * Your frontend expects:
     *
     * contributions.weeks[]
     *   └── contributionDays[]
     */

    const weeks = [];

    for (let i = 0; i < sortedCells.length; i += 7) {
      const weekCells = sortedCells.slice(i, i + 7);

      weeks.push({
        contributionDays: weekCells.map(
          (cell) => ({
            date: cell.date,
            contributionCount: cell.count,
            contributionLevel: `LEVEL_${cell.level}`,
          }),
        ),
      });
    }

    // ============================================================
    // 8. FETCH PUBLIC GITHUB REPOSITORIES
    // ============================================================

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          "User-Agent": "Ak7865-Portfolio",
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!reposRes.ok) {
      throw new Error(
        `GitHub repositories returned ${reposRes.status}`,
      );
    }

    const repos = await reposRes.json();

    // ============================================================
    // 9. FILTER OWN NON-FORK REPOSITORIES
    // ============================================================

    const ownRepos = repos.filter(
      (repo: {
        fork: boolean;
        owner?: {
          login?: string;
        };
      }) =>
        !repo.fork &&
        repo.owner?.login?.toLowerCase() ===
          GITHUB_USERNAME.toLowerCase(),
    );

    // ============================================================
    // 10. FETCH LANGUAGE DATA
    // ============================================================

    const languageTotals: Record<string, number> = {};

    const languageResponses = await Promise.all(
      ownRepos.map(
        async (repo: { name: string }) => {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
              {
                headers: {
                  "User-Agent": "Ak7865-Portfolio",
                  Accept:
                    "application/vnd.github+json",
                },
                next: {
                  revalidate: 3600,
                },
              },
            );

            if (!response.ok) {
              return {};
            }

            return await response.json();
          } catch {
            return {};
          }
        },
      ),
    );

    // ============================================================
    // 11. COMBINE LANGUAGE BYTE COUNTS
    // ============================================================

    for (const repoLanguages of languageResponses) {
      for (const [language, bytes] of Object.entries(
        repoLanguages,
      )) {
        if (typeof bytes !== "number") {
          continue;
        }

        languageTotals[language] =
          (languageTotals[language] || 0) +
          bytes;
      }
    }

    // ============================================================
    // 12. CALCULATE LANGUAGE PERCENTAGES
    // ============================================================

    const totalLanguageBytes = Object.values(
      languageTotals,
    ).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );

    const languages: LanguageResult[] =
      Object.entries(languageTotals)
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage:
            totalLanguageBytes > 0
              ? Number(
                  (
                    (bytes /
                      totalLanguageBytes) *
                    100
                  ).toFixed(1),
                )
              : 0,
        }))
        .sort(
          (a, b) => b.bytes - a.bytes,
        )
        .slice(0, 8);

    // ============================================================
    // 13. RETURN DATA
    // ============================================================

    return NextResponse.json(
      {
        user: {
          login: GITHUB_USERNAME,
          name: "Syed Akhter Hussain",
          avatarUrl: `https://github.com/${GITHUB_USERNAME}.png`,
          url: `https://github.com/${GITHUB_USERNAME}`,
        },

        contributions: {
          total,
          currentStreak,
          longestStreak,
          weeks,
        },

        languages,

        fallback: false,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    // ============================================================
    // ERROR RESPONSE
    // ============================================================

    console.error(
      "GitHub API error:",
      error,
    );

    /*
     * Do NOT generate fake/random contribution data.
     */

    return NextResponse.json(
      {
        user: {
          login: GITHUB_USERNAME,
          name: "Syed Akhter Hussain",
          avatarUrl: `https://github.com/${GITHUB_USERNAME}.png`,
          url: `https://github.com/${GITHUB_USERNAME}`,
        },

        contributions: {
          total: 0,
          currentStreak: 0,
          longestStreak: 0,
          weeks: [],
        },

        languages: [],

        fallback: true,
        error: "Unable to load GitHub data",
      },
      {
        status: 503,
      },
    );
  }
}