import { NextResponse } from "next/server";
import { fetchNotionJobs } from "@/lib/notionJobs";
import { fetchGreenhouseJobs } from "@/lib/greenhouseJobs";
import type { Job, JobsResponse } from "@/lib/jobs";

function dedupeKey(job: Job) {
  return `${job.role.trim().toLowerCase()}::${job.company.trim().toLowerCase()}`;
}

export async function GET() {
  const [notionResult, greenhouseResult] = await Promise.allSettled([
    fetchNotionJobs(),
    fetchGreenhouseJobs(),
  ]);

  const notionJobs = notionResult.status === "fulfilled" ? notionResult.value : [];
  const greenhouseJobs =
    greenhouseResult.status === "fulfilled" ? greenhouseResult.value : [];

  // Notion jobs first, then Greenhouse, deduped by role + company so the
  // same listing pulled from both sources doesn't show up twice.
  const seen = new Set<string>();
  const jobs: Job[] = [];

  for (const job of [...notionJobs, ...greenhouseJobs]) {
    const key = dedupeKey(job);
    if (seen.has(key)) continue;
    seen.add(key);
    jobs.push(job);
  }

  const bothFailed =
    notionResult.status === "rejected" && greenhouseResult.status === "rejected";

  return NextResponse.json<JobsResponse>({ jobs, error: bothFailed });
}
