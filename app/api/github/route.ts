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

/**
 * Escape a string before using it inside a RegExp.
 */
function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Extract the contribution count from GitHub's tooltip.
 *
 * GitHub contribution cells contain something similar to:
 *
 * <td
 *   id="contribution-day-component-..."
 *   data-date="2026-09-17"
 *   data-level="2"
 * >
 *
 * and the corresponding tooltip contains text such as:
 *
 * "3 contributions on September 17"
 */
function getContributionCount(
  html: string,
  cellId: string,
): number {
  const escapedId = escapeRegex(cellId);

  const tooltipRegex = new RegExp(
    `<tool-tip[^>]*\\bfor=["']${escapedId}["'][^>]*>[\\s\\S]*?<\\/tool-tip>`,
    "i",
  );

  const tooltipMatch = html.match(
    tooltipRegex,
  );

  if (!tooltipMatch) {
    return 0;
  }

  const tooltipText = tooltipMatch[0]
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const countMatch = tooltipText.match(
    /(\d[\d,]*)\s+contributions?/i,
  );

  if (!countMatch) {
    return 0;
  }

  return Number(
    countMatch[1].replace(/,/g, ""),
  );
}

/**
 * Parse GitHub contribution calendar cells.
 */
function parseContributionCells(
  html: string,
): ContributionCell[] {
  const cells: ContributionCell[] = [];

  const cellRegex =
    /<td\b[^>]*data-date="([^"]+)"[^>]*data-level="([0-4])"[^>]*>/gi;

  let match: RegExpExecArray | null;

  while (
    (match = cellRegex.exec(html)) !== null
  ) {
    const tag = match[0];

    const date = match[1];
    const level = Number(match[2]);

    const idMatch = tag.match(
      /\bid="([^"]+)"/i,
    );

    const cellId = idMatch?.[1];

    const count = cellId
      ? getContributionCount(
          html,
          cellId,
        )
      : 0;

    cells.push({
      date,
      level,
      count,
    });
  }

  return cells;
}

/**
 * Add/subtract days without local timezone problems.
 */
function getDateOffset(
  date: string,
  days: number,
): string {
  const [year, month, day] = date
    .split("-")
    .map(Number);

  const result = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
    ),
  );

  result.setUTCDate(
    result.getUTCDate() + days,
  );

  return result
    .toISOString()
    .slice(0, 10);
}

/**
 * Calculate the current contribution streak.
 *
 * GitHub's current streak can start today or yesterday.
 * If the most recent contribution is older than yesterday,
 * the current streak is 0.
 */
function calculateCurrentStreak(
  cells: ContributionCell[],
): number {
  if (cells.length === 0) {
    return 0;
  }

  const byDate = new Map<
    string,
    number
  >();

  for (const cell of cells) {
    byDate.set(
      cell.date,
      cell.count,
    );
  }

  const sorted = [...cells].sort(
    (a, b) =>
      a.date.localeCompare(b.date),
  );

  const lastDate =
    sorted[sorted.length - 1].date;

  const today = new Date()
    .toISOString()
    .slice(0, 10);

  const yesterday = getDateOffset(
    today,
    -1,
  );

  let startDate: string;

  if (lastDate === today) {
    startDate = today;
  } else if (lastDate === yesterday) {
    startDate = yesterday;
  } else {
    return 0;
  }

  if (
    (byDate.get(startDate) ?? 0) <= 0
  ) {
    return 0;
  }

  let streak = 0;
  let currentDate = startDate;

  while (
    (byDate.get(currentDate) ?? 0) > 0
  ) {
    streak++;

    currentDate = getDateOffset(
      currentDate,
      -1,
    );
  }

  return streak;
}

/**
 * Calculate the longest consecutive
 * contribution streak in the returned
 * calendar.
 */
function calculateLongestStreak(
  cells: ContributionCell[],
): number {
  const sorted = [...cells].sort(
    (a, b) =>
      a.date.localeCompare(b.date),
  );

  let longest = 0;
  let running = 0;

  let previousDate:
    | string
    | null = null;

  for (const cell of sorted) {
    if (cell.count <= 0) {
      running = 0;
      previousDate = cell.date;
      continue;
    }

    if (
      previousDate &&
      getDateOffset(
        previousDate,
        1,
      ) === cell.date
    ) {
      running++;
    } else {
      running = 1;
    }

    longest = Math.max(
      longest,
      running,
    );

    previousDate = cell.date;
  }

  return longest;
}

/**
 * Build the contribution weeks expected
 * by CodingProfileSection.tsx.
 */
function buildContributionWeeks(
  cells: ContributionCell[],
) {
  const sorted = [...cells].sort(
    (a, b) =>
      a.date.localeCompare(b.date),
  );

  const weeks = [];

  for (
    let i = 0;
    i < sorted.length;
    i += 7
  ) {
    const weekCells =
      sorted.slice(i, i + 7);

    weeks.push({
      contributionDays:
        weekCells.map((cell) => ({
          date: cell.date,

          contributionCount:
            cell.count,

          contributionLevel:
            `LEVEL_${cell.level}`,
        })),
    });
  }

  return weeks;
}

export async function GET() {
  try {
    // ==================================================
    // 1. GITHUB CONTRIBUTION CALENDAR
    // ==================================================

    const contributionsRes =
      await fetch(
        `https://github.com/users/${GITHUB_USERNAME}/contributions`,
        {
          headers: {
            "User-Agent":
              "Ak7865-Portfolio",

            Accept:
              "text/html,application/xhtml+xml",
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

    const html =
      await contributionsRes.text();

    const cells =
      parseContributionCells(html);

    if (cells.length === 0) {
      throw new Error(
        "Unable to parse GitHub contribution calendar",
      );
    }

    const sortedCells = [...cells].sort(
      (a, b) =>
        a.date.localeCompare(b.date),
    );

    // ==================================================
    // 2. TOTAL CONTRIBUTIONS
    // ==================================================

    let total = 0;

    /**
     * GitHub usually exposes the yearly
     * total in text similar to:
     *
     * 215 contributions in the last year
     */
    const totalMatch = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );

    if (totalMatch) {
      total = Number(
        totalMatch[1].replace(/,/g, ""),
      );
    }

    /**
     * Fallback:
     * calculate total from individual days.
     */
    if (!total) {
      total = sortedCells.reduce(
        (sum, cell) =>
          sum + cell.count,
        0,
      );
    }

    // ==================================================
    // 3. STREAKS
    // ==================================================

    const currentStreak =
      calculateCurrentStreak(
        sortedCells,
      );

    const longestStreak =
      calculateLongestStreak(
        sortedCells,
      );

    // ==================================================
    // 4. CONTRIBUTION WEEKS
    // ==================================================

    const weeks =
      buildContributionWeeks(
        sortedCells,
      );

    // ==================================================
    // 5. GITHUB REPOSITORIES
    // ==================================================

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          "User-Agent":
            "Ak7865-Portfolio",

          Accept:
            "application/vnd.github+json",
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

    // Only count repositories owned by Ak7865.
    // Forks are excluded.
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

    // ==================================================
    // 6. LANGUAGE STATISTICS
    // ==================================================

    const languageTotals: Record<
      string,
      number
    > = {};

    const languageResponses =
      await Promise.all(
        ownRepos.map(
          async (repo: {
            name: string;
          }) => {
            try {
              const response =
                await fetch(
                  `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
                  {
                    headers: {
                      "User-Agent":
                        "Ak7865-Portfolio",

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

    for (const repoLanguages of languageResponses) {
      for (const [
        language,
        bytes,
      ] of Object.entries(
        repoLanguages,
      )) {
        if (
          typeof bytes !== "number"
        ) {
          continue;
        }

        languageTotals[language] =
          (languageTotals[language] ??
            0) + bytes;
      }
    }

    // ==================================================
    // 7. LANGUAGE PERCENTAGES
    // ==================================================

    const totalLanguageBytes =
      Object.values(
        languageTotals,
      ).reduce(
        (sum, bytes) =>
          sum + bytes,
        0,
      );

    const languages: LanguageResult[] =
      Object.entries(
        languageTotals,
      )
        .map(
          ([name, bytes]) => ({
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
          }),
        )
        .sort(
          (a, b) =>
            b.bytes - a.bytes,
        )
        .slice(0, 8);

    // ==================================================
    // 8. FINAL API RESPONSE
    // ==================================================

    return NextResponse.json(
      {
        user: {
          login:
            GITHUB_USERNAME,

          name:
            "Syed Akhter Hussain",

          avatarUrl:
            `https://github.com/${GITHUB_USERNAME}.png`,

          url:
            `https://github.com/${GITHUB_USERNAME}`,
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
    console.error(
      "GitHub API error:",
      error,
    );

    // ==================================================
    // FALLBACK RESPONSE
    // ==================================================

    return NextResponse.json(
      {
        user: {
          login:
            GITHUB_USERNAME,

          name:
            "Syed Akhter Hussain",

          avatarUrl:
            `https://github.com/${GITHUB_USERNAME}.png`,

          url:
            `https://github.com/${GITHUB_USERNAME}`,
        },

        contributions: {
          total: 0,

          currentStreak: 0,

          longestStreak: 0,

          weeks: [],
        },

        languages: [],

        fallback: true,

        error:
          "Unable to load GitHub data",
      },

      {
        status: 503,
      },
    );
  }
}