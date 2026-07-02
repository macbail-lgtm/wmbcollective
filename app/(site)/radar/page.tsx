"use client";

import { useCallback, useEffect, useState } from "react";
import DroppingSoonCard from "@/components/DroppingSoonCard";
import RecentReleaseCard from "@/components/RecentReleaseCard";
import { RADAR_PAGE, UPCOMING_RELEASES } from "@/content";
import type { RecentRelease, RecentReleasesResponse } from "@/lib/recentReleases";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-xs uppercase tracking-widest2 text-red">
      {children}
    </p>
  );
}

export default function RadarPage() {
  const [releases, setReleases] = useState<RecentRelease[] | null>(null);
  const [hadError, setHadError] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const load = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await fetch("/api/recent-releases");
      const data: RecentReleasesResponse = await res.json();
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

  const showError = releases !== null && hadError;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {RADAR_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {RADAR_PAGE.subtext}
      </p>

      <div className="mt-10 border-t border-border" />

      {/* DROPPING SOON */}
      <section className="mt-12">
        <SectionLabel>Dropping Soon</SectionLabel>
        <h2 className="mt-2 font-display italic font-black text-navy text-2xl sm:text-3xl">
          Dropping Soon
        </h2>
        <p className="mt-2 font-body text-sm font-light tracking-wide text-gray-400">
          Ones to watch
        </p>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {UPCOMING_RELEASES.map((release, i) => (
            <DroppingSoonCard key={i} release={release} />
          ))}
        </div>

        <p className="mt-8 font-body text-xs italic tracking-wide text-gray-400">
          Updated by the WMB team. Follow{" "}
          <a
            href="https://www.instagram.com/mbupenn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-red"
          >
            @mbupenn
          </a>{" "}
          for the latest drops →
        </p>
      </section>

      <div className="mt-14 border-t border-border" />

      {/* RECENT RELEASES */}
      <section className="mt-12">
        <SectionLabel>Recent Releases</SectionLabel>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display italic font-black text-navy text-2xl sm:text-3xl">
              Recent Releases
            </h2>
            <p className="mt-2 font-body text-sm font-light tracking-wide text-gray-400">
              What just dropped
            </p>
          </div>

          <div className="flex items-center gap-2">
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
              aria-label="Refresh recent releases"
              disabled={isFetching}
              className="font-body text-sm text-navy/50 transition-colors hover:text-red disabled:opacity-40"
            >
              <span className={isFetching ? "inline-block animate-spin" : "inline-block"}>
                ↻
              </span>
            </button>
          </div>
        </div>

        {showError ? (
          <div className="mt-12 text-center">
            <p className="font-body text-sm text-gray-400">
              Recent releases temporarily unavailable.
              <br />
              Check back soon.
            </p>
            <button
              type="button"
              onClick={load}
              className="mt-4 inline-block bg-navy px-5 py-2 font-body text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {releases === null
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : releases.map((release) => (
                  <RecentReleaseCard key={release.id} release={release} />
                ))}
          </div>
        )}
      </section>
    </main>
  );
}
