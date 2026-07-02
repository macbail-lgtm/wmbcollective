// Shared type for a Job Board listing, used by /api/jobs, /api/greenhouse,
// /api/all-jobs, and the JobCard component.
export type Job = {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  link: string;
  source: "notion" | "greenhouse";
};

export type JobsResponse = {
  jobs: Job[];
  error: boolean;
};
