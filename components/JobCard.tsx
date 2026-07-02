import type { Job } from "@/lib/jobs";

// Single row in the Job Board's list layout.
export default function JobCard({ job }: { job: Job }) {
  const isInternship = job.type === "Internship";

  return (
    <div className="flex flex-col gap-4 border-b border-border px-2 py-6 transition-colors hover:bg-hover sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0 sm:flex-1">
        <h3 className="font-display italic font-black text-navy text-lg">
          {job.role}
        </h3>
        <p className="mt-1 font-body text-sm text-gray-400">{job.company}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:flex-shrink-0">
        {job.location && (
          <span className="flex items-center gap-1 font-body text-xs text-gray-400">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {job.location}
          </span>
        )}
        {job.type && (
          <span
            className={`rounded-full px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-white ${
              isInternship ? "bg-red" : "bg-navy"
            }`}
          >
            {job.type}
          </span>
        )}
      </div>

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-fit flex-shrink-0 bg-navy px-5 py-2 font-body text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red"
        >
          Apply →
        </a>
      )}
    </div>
  );
}
