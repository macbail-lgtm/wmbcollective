"use client";

import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import { JOBS_PAGE } from "@/content";
import type { Job, JobsResponse } from "@/lib/jobs";

const FILTERS = [
  "All",
  "Internship",
  "Full-time",
  "Music",
  "Agency",
  "Marketing",
  "Live Events",
] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(job: Job, filter: Filter): boolean {
  if (filter === "All") return true;
  if (filter === "Internship" || filter === "Full-time") return job.type === filter;
  // "Agency" is the filter label; the underlying ECN feed category is
  // "Agency/Management".
  if (filter === "Agency") return job.category === "Agency/Management";
  return job.category === filter;
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border px-2 py-6 animate-pulse">
      <div className="flex-1">
        <div className="h-5 w-1/3 bg-[#f0f0f0]" />
        <div className="mt-2 h-3 w-1/5 bg-[#f0f0f0]" />
      </div>
      <div className="h-6 w-24 bg-[#f0f0f0]" />
      <div className="h-8 w-24 bg-[#f0f0f0]" />
    </div>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [hadError, setHadError] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    let cancelled = false;

    fetch("/api/all-jobs")
      .then((res) => res.json())
      .then((data: JobsResponse) => {
        if (cancelled) return;
        setJobs(data.jobs);
        setHadError(data.error);
      })
      .catch(() => {
        if (cancelled) return;
        setJobs([]);
        setHadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleJobs =
    jobs && filter !== "All" ? jobs.filter((job) => matchesFilter(job, filter)) : jobs;

  const showEmptyState = jobs !== null && (hadError || visibleJobs?.length === 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {JOBS_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {JOBS_PAGE.subtext}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={`font-body text-xs uppercase tracking-widest2 transition-colors ${
              filter === option ? "text-red" : "text-navy/50 hover:text-navy"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {jobs === null ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : showEmptyState ? (
          <div className="py-16 text-center">
            <p className="font-body text-sm text-gray-400">
              {JOBS_PAGE.emptyMessage}
            </p>
            <a
              href={JOBS_PAGE.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-body text-sm text-red hover:underline"
            >
              {JOBS_PAGE.emptyCalloutText}
            </a>
          </div>
        ) : (
          visibleJobs!.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>

      <a
        href={JOBS_PAGE.instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-16 block border border-red px-8 py-6 text-center font-body text-sm tracking-wide text-red transition-colors hover:bg-hover"
      >
        {JOBS_PAGE.footerCalloutText}
      </a>
    </main>
  );
}
