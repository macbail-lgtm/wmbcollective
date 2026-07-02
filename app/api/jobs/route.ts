import { NextResponse } from "next/server";
import { fetchNotionJobs } from "@/lib/notionJobs";
import type { JobsResponse } from "@/lib/jobs";

export async function GET() {
  try {
    const jobs = await fetchNotionJobs();
    return NextResponse.json<JobsResponse>({ jobs, error: false });
  } catch {
    return NextResponse.json<JobsResponse>({ jobs: [], error: true });
  }
}
