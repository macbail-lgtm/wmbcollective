"use client";

import { useState } from "react";
import type { RecentRelease } from "@/lib/recentReleases";
import { initials, formatReleaseDate } from "@/lib/format";

// Card for the live iTunes-sourced Recent Releases section on /radar.
export default function RecentReleaseCard({
  release,
}: {
  release: RecentRelease;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = release.coverUrl && !imageFailed;

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={release.coverUrl}
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
      </div>

      <div className="mt-4">
        <p className="font-display italic font-black text-navy text-base">
          {release.artist}
        </p>
        <p className="mt-1 font-body text-sm text-navy/70">{release.title}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="font-body text-xs uppercase tracking-widest2 text-red">
            {formatReleaseDate(release.releaseDate)}
          </span>
          {release.genre && (
            <span className="font-body text-xs text-gray-400">
              {release.genre}
            </span>
          )}
        </div>
        {release.itunesUrl && (
          <a
            href={release.itunesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block w-fit bg-navy px-4 py-1.5 font-body text-[10px] uppercase tracking-widest2 text-white transition-colors hover:bg-red"
          >
            Listen on iTunes →
          </a>
        )}
      </div>
    </div>
  );
}
