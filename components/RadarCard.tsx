"use client";

import { useState } from "react";
import type { RadarRelease } from "@/lib/radar";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function formatDate(raw: string) {
  if (!raw) return "";
  // Bare years (e.g. the "2026" fallback placeholder) aren't a real
  // calendar date — parsing them as UTC midnight and reformatting in the
  // browser's local timezone can roll them back a day, so show as-is.
  if (/^\d{4}$/.test(raw.trim())) return raw;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function RadarCard({ release }: { release: RadarRelease }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = release.coverImage && !imageFailed;

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={release.coverImage}
            alt={`${release.title} cover`}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy">
            <span className="font-display italic font-black text-white text-3xl">
              {initials(release.artist)}
            </span>
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-full border border-border bg-white px-2 py-1 font-body text-[10px] uppercase tracking-widest2 text-navy/60">
          {release.format}
        </span>
      </div>

      <div className="mt-4">
        <p className="font-display italic font-black text-navy text-base">
          {release.artist}
        </p>
        <p className="mt-1 font-body text-sm text-navy/70">{release.title}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {release.date && (
            <span className="font-body text-xs uppercase tracking-widest2 text-red">
              {formatDate(release.date)}
            </span>
          )}
          {release.genre && (
            <span className="rounded-full border border-border px-2 py-0.5 font-body text-[10px] uppercase tracking-widest2 text-navy/60">
              {release.genre}
            </span>
          )}
        </div>
        {release.metacriticUrl && (
          <a
            href={release.metacriticUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-body text-xs tracking-wide text-navy hover:text-red"
          >
            View on Metacritic →
          </a>
        )}
      </div>
    </div>
  );
}
