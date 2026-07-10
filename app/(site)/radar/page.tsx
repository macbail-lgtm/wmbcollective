"use client";

import { useCallback, useEffect, useState } from "react";
import DroppingSoonCard from "@/components/DroppingSoonCard";
import NewReleaseCard from "@/components/NewReleaseCard";
import TopChartCard from "@/components/TopChartCard";
import { RADAR_PAGE, UPCOMING_RELEASES } from "@/content";
import type { NewRelease, NewReleasesResponse } from "@/lib/newReleases";
import type { TopChartEntry, TopChartsResponse } from "@/lib/topCharts";

const INSTAGRAM_HREF = "https://www.instagram.com/mbupenn/";

function SkeletonCard() {
  return (
    <div className="flex flex-col animate-pulse border border-border">
      <div className="aspect-square w-full bg-[#f0f0f0]" />
      <div className="p-4">
        <div className="h-4 w-2/3 bg-[#f0f0f0]" />
        <div className="mt-2 h-3 w-1/2 bg-[#f0f0f0]" />
        <div className="mt-2 h-3 w-1/3 bg-[#f0f0f0]" />
      </div>
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

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

function ErrorState({
  message,
  onRefresh,
}: {
  message: string;
  onRefresh: () => void;
}) {
  return (
    <div className="mt-12 text-center">
      <p className="font-body text-sm text-gray-400">{message}</p>
      <button
        type="button"
        onClick={onRefresh}
        className="mt-4 inline-block bg-navy px-5 py-2 font-body text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red"
      >
        Refresh
      </button>
    </div>
  );
}

export default function RadarPage() {
  // Recent Releases
  const [releases, setReleases] = useState<NewRelease[] | null>(null);
  const [releasesError, setReleasesError] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const loadReleases = useCallback(async () => {
    try {
      const res = await fetch("/api/new-releases");
      const data: NewReleasesResponse = await res.json();
      setReleases(data.releases);
      setReleasesError(data.error);
      setUsedFallback(data.usedFallback);
    } catch {
      setReleases([]);
      setReleasesError(true);
      setUsedFallback(false);
    }
  }, []);

  // Top Charts
  const [charts, setCharts] = useState<TopChartEntry[] | null>(null);
  const [chartsError, setChartsError] = useState(false);
  const [chartsFetchedAt, setChartsFetchedAt] = useState<string | null>(null);
  const [chartsFetching, setChartsFetching] = useState(false);

  const loadCharts = useCallback(async () => {
    setChartsFetching(true);
    try {
      const res = await fetch("/api/top-charts");
      const data: TopChartsResponse = await res.json();
      setCharts(data.charts);
      setChartsError(data.error);
      setChartsFetchedAt(data.fetchedAt);
    } catch {
      setCharts([]);
      setChartsError(true);
      setChartsFetchedAt(new Date().toISOString());
    } finally {
      setChartsFetching(false);
    }
  }, []);

  useEffect(() => {
    loadReleases();
    loadCharts();
  }, [loadReleases, loadCharts]);

  const showReleasesError = releases !== null && releasesError;
  const showChartsError = charts !== null && chartsError;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {RADAR_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {RADAR_PAGE.subtext}
      </p>

      <div className="border-t border-border" />

      {/* DROPPING SOON */}
      <section className="py-[60px]">
        <SectionLabel>Dropping Soon</SectionLabel>
        <p className="mt-2 font-body text-sm font-light italic tracking-wide text-gray-400">
          Curated by the WMB team
        </p>

        <CardGrid>
          {UPCOMING_RELEASES.map((release, i) => (
            <DroppingSoonCard key={i} release={release} />
          ))}
        </CardGrid>

        <p className="mt-8 font-body text-xs italic tracking-wide text-gray-400">
          Follow{" "}
          <a
            href={INSTAGRAM_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 underline hover:text-red"
          >
            @mbupenn
          </a>{" "}
          for the latest announcements →
        </p>
      </section>

      <div className="border-t border-border" />

      {/* RECENT RELEASES */}
      <section className="py-[60px]">
        <SectionLabel>Recent Releases</SectionLabel>
        <p className="mt-2 font-body text-sm font-light tracking-wide text-gray-400">
          What just dropped — updated daily
        </p>
        {usedFallback && (
          <p className="mt-1 font-body text-sm italic text-gray-400">
            Showing latest available releases
          </p>
        )}

        {showReleasesError ? (
          <ErrorState
            message="Releases temporarily unavailable. Check back soon."
            onRefresh={loadReleases}
          />
        ) : (
          <CardGrid>
            {releases === null
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : releases.map((release) => (
                  <NewReleaseCard key={release.id} release={release} />
                ))}
          </CardGrid>
        )}
      </section>

      <div className="border-t border-border" />

      {/* TOP CHARTS */}
      <section className="py-[60px]">
        <SectionLabel>Top Charts</SectionLabel>
        <p className="mt-2 font-body text-sm font-light tracking-wide text-gray-400">
          Top albums on iTunes right now — updated daily
        </p>
        <p className="mt-1 font-body text-[10px] text-gray-300">
          Powered by iTunes charts
        </p>

        <div className="mt-6 flex items-center justify-end gap-2">
          <span className="font-body text-xs tracking-wide text-navy/50">
            {chartsFetchedAt
              ? `Last updated: ${new Date(chartsFetchedAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}`
              : "Loading…"}
          </span>
          <button
            type="button"
            onClick={loadCharts}
            aria-label="Refresh top charts"
            disabled={chartsFetching}
            className="font-body text-sm text-navy/50 transition-colors hover:text-red disabled:opacity-40"
          >
            <span className={chartsFetching ? "inline-block animate-spin" : "inline-block"}>
              ↻
            </span>
          </button>
        </div>

        {showChartsError ? (
          <ErrorState
            message="Chart data temporarily unavailable. Check back soon."
            onRefresh={loadCharts}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {charts === null
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : charts.map((entry) => (
                  <TopChartCard key={entry.id} entry={entry} />
                ))}
          </div>
        )}
      </section>
    </main>
  );
}
