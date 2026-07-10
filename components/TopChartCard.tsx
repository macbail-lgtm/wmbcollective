"use client";

import { useState } from "react";
import type { TopChartEntry } from "@/lib/topCharts";
import { initials } from "@/lib/format";

// Card for the live Top Charts section on /radar.
export default function TopChartCard({ entry }: { entry: TopChartEntry }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = entry.coverUrl && !imageFailed;

  return (
    <div className="flex flex-col border border-border transition-colors hover:bg-hover">
      <div className="relative aspect-square w-full">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.coverUrl}
            alt={`${entry.title} cover`}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy">
            <span className="font-display italic font-black text-white text-3xl">
              {initials(entry.artist)}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-red font-display italic font-black text-white text-sm">
          #{entry.chartPosition}
        </span>
      </div>

      <div className="p-4">
        <p className="font-display italic font-black text-navy text-base">
          {entry.artist}
        </p>
        <p className="mt-1 font-body text-sm text-navy/70">{entry.title}</p>
        {entry.genre && (
          <p className="mt-2 font-body text-xs text-gray-400">{entry.genre}</p>
        )}
        {entry.itunesUrl && (
          <a
            href={entry.itunesUrl}
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
