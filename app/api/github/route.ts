import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const username = "Ak7865";

    const res = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "text/html,application/xhtml+xml",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error(`GitHub ${res.status}`);

    const html = await res.text();
    const cells: { date: string; level: number; count: number }[] = [];

    const re =
      /<td[^>]+data-date="([^"]+)"[^>]*data-level="(\d)"[^>]*>(?:[^<]*?(\d+)\s+contribution)?/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      cells.push({
        date: m[1],
        level: parseInt(m[2]),
        count: m[3] ? parseInt(m[3]) : 0,
      });
    }

    const totalMatch = html.match(
      /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i,
    );
    const total = totalMatch ? totalMatch[1] : null;

    if (cells.length === 0) {
      return NextResponse.json({
        cells: fallback(),
        total: "200+",
        fallback: true,
      });
    }

    return NextResponse.json({ cells, total, fallback: false });
  } catch {
    return NextResponse.json({
      cells: fallback(),
      total: "200+",
      fallback: true,
    });
  }
}

function fallback() {
  const cells = [];
  const today = new Date();
  for (let w = 51; w >= 0; w--) {
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + d));
      const r = Math.random();
      const level =
        r > 0.72 ? 4 : r > 0.55 ? 3 : r > 0.4 ? 2 : r > 0.25 ? 1 : 0;
      cells.push({
        date: date.toISOString().split("T")[0],
        level,
        count: [0, 1, 3, 6, 10][level],
      });
    }
  }
  return cells;
}
