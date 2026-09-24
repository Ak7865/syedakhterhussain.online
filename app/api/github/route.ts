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
    // 1. GET GITHUB CONTRIBUTION CALENDAR
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

    /*
     * GitHub contribution cells look approximately like:
     *
     * <td
     *   data-date="2026-09-24"
     *   data-level="2"
     *   aria-label="5 contributions on September 24, 2026"
     * >
     *
     * We extract:
     * - date
     * - contribution level
     * - actual contribution count
     */

    const cellRegex =
      /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*aria-label="([^"]*)"[^>]*>/gi;

    let match;

    while ((match = cellRegex.exec(html)) !== null) {
      const date = match[1];
      const level = Number(match[2]);
      const ariaLabel = match[3];

      /*
       * Extract number from:
       *
       * "5 contributions on September 24, 2026"
       *
       * Also handles:
       *
       * "1 contribution on ..."
       * "0 contributions on ..."
       */

      const countMatch = ariaLabel.match(/([\d,]+)\s+contribution/i);

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
     * Some GitHub HTML variations may put aria-label before
     * data-level, so try a second parser if the first one
     * doesn't find anything.
     */

    if (cells.length === 0) {
      const fallbackRegex =
        /<td[^>]*data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>/gi;

      while ((match = fallbackRegex.exec(html)) !== null) {
        cells.push({
          date: match[1],
          level: Number(match[2]),
          count: 0,
        });
      }
    }

    if (cells.length === 0) {
      throw new Error("GitHub contribution cells could not be parsed");
    }

    // ============================================================
    // 2. TOTAL CONTRIBUTIONS
    // ============================================================

    let total = 0;

    /*
     * First try GitHub's visible text.
     */

    const totalMatch = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );

    if (totalMatch) {
      total = Number(totalMatch[1].replace(/,/g, ""));
    }

    /*
     * If GitHub changes the text structure, calculate the total
     * from the contribution cells.
     */

    if (!total) {
      total = cells.reduce(
        (sum, cell) => sum + cell.count,
        0,
      );
    }

    // ============================================================
    // 3. CURRENT STREAK
    // ============================================================

    const sortedCells = [...cells].sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime(),
    );

    let currentStreak = 0;

    for (let i = sortedCells.length - 1; i >= 0; i--) {
      if (sortedCells[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    // ============================================================
    // 4. LONGEST STREAK
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
    // 5. GET PUBLIC REPOSITORIES
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
    // 6. GET LANGUAGES FROM EACH REPOSITORY
    // ============================================================

    const languageTotals: Record<string, number> = {};

    /*
     * Ignore forks because they can heavily distort the
     * language percentages.
     */

    const ownRepos = repos.filter(
      (repo: {
        fork: boolean;
        owner?: { login?: string };
      }) =>
        !repo.fork &&
        repo.owner?.login?.toLowerCase() ===
          GITHUB_USERNAME.toLowerCase(),
    );

    /*
     * Fetch language statistics for repositories in parallel.
     */

    const languageResponses = await Promise.all(
      ownRepos.map(async (repo: { name: string }) => {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
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

          if (!response.ok) {
            return {};
          }

          return await response.json();
        } catch {
          return {};
        }
      }),
    );

    // ============================================================
    // 7. COMBINE LANGUAGE BYTES
    // ============================================================

    for (const repoLanguages of languageResponses) {
      for (const [language, bytes] of Object.entries(
        repoLanguages,
      )) {
        if (typeof bytes !== "number") continue;

        languageTotals[language] =
          (languageTotals[language] || 0) + bytes;
      }
    }

    // ============================================================
    // 8. CALCULATE LANGUAGE PERCENTAGES
    // ============================================================

    const totalLanguageBytes = Object.values(
      languageTotals,
    ).reduce((sum, bytes) => sum + bytes, 0);

    const languages: LanguageResult[] = Object.entries(
      languageTotals,
    )
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage:
          totalLanguageBytes > 0
            ? Number(
                (
                  (bytes / totalLanguageBytes) *
                  100
                ).toFixed(1),
              )
            : 0,
      }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8);

    // ============================================================
    // 9. RETURN EVERYTHING
    // ============================================================

    return NextResponse.json(
      {
        username: GITHUB_USERNAME,

        cells,

        total,

        currentStreak,

        longestStreak,

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
    console.error("GitHub API error:", error);

    /*
     * IMPORTANT:
     *
     * Do NOT generate random fake contribution data.
     *
     * A portfolio should never display fake GitHub activity.
     */

    return NextResponse.json(
      {
        username: GITHUB_USERNAME,
        cells: [],
        total: 0,
        currentStreak: 0,
        longestStreak: 0,
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
