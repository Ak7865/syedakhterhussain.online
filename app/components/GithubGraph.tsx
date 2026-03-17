"use client";
import dynamic from "next/dynamic";

import { GitHubCalendar } from "react-github-calendar";

export default function GithubGraph() {
  const selectLastYear = (contributions: any[]) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return contributions.filter((day) => new Date(day.date) > oneYearAgo);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <GitHubCalendar
        username="Ak7865"
        transformData={selectLastYear}
        blockSize={12}
        blockMargin={4}
        fontSize={12}
        theme={{
          light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
          dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
        }}
      />
    </div>
  );
}
