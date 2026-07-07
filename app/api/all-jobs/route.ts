import { NextResponse } from "next/server";
import { fetchNotionJobs } from "@/lib/notionJobs";
import { fetchGreenhouseJobs } from "@/lib/greenhouseJobs";
import { fetchEcnJobs } from "@/lib/ecnJobs";
import type { Job, JobsResponse } from "@/lib/jobs";

function dedupeKey(job: Job) {
  return job.role.toLowerCase().trim() + job.company.toLowerCase().trim();
}

// Notion and Greenhouse listings don't carry a reliable posted date, so
// they sort ahead of the dated ECN listings (in their original Notion
// first/Greenhouse second order, since Array#sort is stable) — and ECN
// listings sort newest-first among themselves.
function comparePostedDate(a: Job, b: Job) {
  if (!a.postedDate && !b.postedDate) return 0;
  if (!a.postedDate) return -1;
  if (!b.postedDate) return 1;
  return b.postedDate.localeCompare(a.postedDate);
}

export async function GET() {
  const [notionResult, greenhouseResult, ecnResult] = await Promise.allSettled([
    fetchNotionJobs(),
    fetchGreenhouseJobs(),
    fetchEcnJobs(),
  ]);

  const notionJobs = notionResult.status === "fulfilled" ? notionResult.value : [];
  const greenhouseJobs =
    greenhouseResult.status === "fulfilled" ? greenhouseResult.value : [];
  const ecnJobs = ecnResult.status === "fulfilled" ? ecnResult.value : [];

  // Notion jobs first, then Greenhouse, then ECN, deduped by role + company
  // so the same listing pulled from multiple sources doesn't show up twice.
  const seen = new Set<string>();
  const jobs: Job[] = [];

  for (const job of [...notionJobs, ...greenhouseJobs, ...ecnJobs]) {
    const key = dedupeKey(job);
    if (seen.has(key)) continue;
    seen.add(key);
    jobs.push(job);
  }

  jobs.sort(comparePostedDate);

  const allFailed =
    notionResult.status === "rejected" &&
    greenhouseResult.status === "rejected" &&
    ecnResult.status === "rejected";

  return NextResponse.json<JobsResponse>({ jobs, error: allFailed });
}
