import { NextResponse } from "next/server"

const USERNAME = "Ak7865"

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`,
      { next: { revalidate: 3600 } }
    )

    const data = await res.json()

    const repos = data
      .filter((repo: any) => !repo.fork)
      .slice(0, 4)
      .map((repo: any) => ({
        name: repo.name,
        desc: repo.description || "No description",
        lang: repo.language || "Unknown",
        stars: repo.stargazers_count,
        url: repo.html_url
      }))

    return NextResponse.json(repos)

  } catch {
    return NextResponse.json([])
  }
}