"use client";

import { useState } from "react";
import { CURRICULUM_PAGE } from "@/content";

// Hardcoded, distinctly-styled first card on The Curriculum page.
export default function HolyGrailCard() {
  const { holyGrail } = CURRICULUM_PAGE;
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <div className="relative flex flex-col gap-6 border-2 border-red p-6 sm:flex-row sm:p-8">
      <span className="absolute -top-3 left-6 rounded-full bg-red px-4 py-1 font-body text-[10px] uppercase tracking-widest2 text-white">
        {holyGrail.badge}
      </span>

      {coverFailed ? (
        <div className="h-48 w-32 flex-shrink-0 self-center bg-[#f0f0f0] sm:self-start" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={holyGrail.coverImage}
          alt={`${holyGrail.title} book cover`}
          onError={() => setCoverFailed(true)}
          className="h-48 w-32 flex-shrink-0 self-center object-cover sm:self-start"
        />
      )}

      <div className="flex flex-col justify-center">
        <h3 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {holyGrail.title}
        </h3>
        <p className="mt-1 font-body text-sm text-navy/70">
          {holyGrail.author}
        </p>
        <p className="mt-3 font-body text-sm font-light text-gray-500">
          {holyGrail.blurb}
        </p>
        <a
          href={holyGrail.buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block w-fit bg-navy px-5 py-2 font-body text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red"
        >
          {holyGrail.buttonText}
        </a>
      </div>
    </div>
  );
}
