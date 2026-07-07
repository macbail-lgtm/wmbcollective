// Shared type for a Job Board listing, used by /api/jobs, /api/greenhouse,
// /api/ecn, /api/all-jobs, and the JobCard component.
export type Job = {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  link: string;
  source: "notion" | "greenhouse" | "ecn";
  // EntertainmentCareers.Net-specific — the feed category the listing came
  // from (e.g. "Music", "Marketing"), used by the /jobs filter bar.
  category?: string;
  // ISO date string, used to sort the combined feed newest-first. Notion
  // and Greenhouse listings don't have a reliable posted date, so this is
  // only populated for ECN jobs.
  postedDate?: string;
};

export type JobsResponse = {
  jobs: Job[];
  error: boolean;
};
