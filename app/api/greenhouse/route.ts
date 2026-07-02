import { NextResponse } from "next/server";
import { fetchGreenhouseJobs } from "@/lib/greenhouseJobs";
import type { JobsResponse } from "@/lib/jobs";

export async function GET() {
  try {
    const jobs = await fetchGreenhouseJobs();
    return NextResponse.json<JobsResponse>({ jobs, error: false });
  } catch {
    return NextResponse.json<JobsResponse>({ jobs: [], error: true });
  }
}
