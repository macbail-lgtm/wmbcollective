"use client";

import { useCallback, useEffect, useState } from "react";
import RadarCard from "@/components/RadarCard";
import { RADAR_PAGE, RADAR_FALLBACK_RELEASES } from "@/content";
import type { RadarRelease, RadarResponse } from "@/lib/radar";

function SkeletonCard() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-square w-full bg-[#f0f0f0]" />
      <div className="mt-4 h-4 w-2/3 bg-[#f0f0f0]" />
      <div className="mt-2 h-3 w-1/2 bg-[#f0f0f0]" />
      <div className="mt-2 h-3 w-1/3 bg-[#f0f0f0]" />
    </div>
  );
}

export default function RadarPage() {
  const [releases, setReleases] = useState<RadarRelease[] | null>(null);
  const [hadError, setHadError] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const load = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await fetch("/api/radar");
      const data: RadarResponse = await res.json();
      setReleases(data.releases);
      setHadError(data.error);
      setFetchedAt(data.fetchedAt);
    } catch {
      setReleases([]);
      setHadError(true);
      setFetchedAt(new Date().toISOString());
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const showFallback = releases !== null && (hadError || releases.length === 0);
  const cardsToShow = showFallback ? RADAR_FALLBACK_RELEASES : releases;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {RADAR_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {RADAR_PAGE.subtext}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span className="font-body text-xs tracking-wide text-navy/50">
          {fetchedAt
            ? `Last updated: ${new Date(fetchedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}`
            : "Loading…"}
        </span>
        <button
          type="button"
          onClick={load}
          aria-label="Refresh release data"
          disabled={isFetching}
          className="font-body text-sm text-navy/50 transition-colors hover:text-red disabled:opacity-40"
        >
          <span className={isFetching ? "inline-block animate-spin" : "inline-block"}>
            ↻
          </span>
        </button>
      </div>

      {showFallback && (
        <p className="mt-6 font-body text-sm text-gray-400">
          Release data temporarily unavailable. Check back soon.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {releases === null
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : cardsToShow!.map((release, i) => (
              <RadarCard key={i} release={release} />
            ))}
      </div>
    </main>
  );
}
