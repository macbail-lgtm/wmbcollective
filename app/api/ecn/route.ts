import { NextResponse } from "next/server";
import { fetchEcnJobs } from "@/lib/ecnJobs";
import type { JobsResponse } from "@/lib/jobs";

export async function GET() {
  try {
    const jobs = await fetchEcnJobs();
    return NextResponse.json<JobsResponse>({ jobs, error: false });
  } catch {
    return NextResponse.json<JobsResponse>({ jobs: [], error: true });
  }
}
