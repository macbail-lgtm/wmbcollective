import type { Metadata } from "next";
import ReleaseCard from "@/components/ReleaseCard";
import { RADAR_PAGE } from "@/content";

export const metadata: Metadata = { title: "Release Radar | WMB Collective" };

export default function RadarPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {RADAR_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {RADAR_PAGE.subtext}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {RADAR_PAGE.releases.map((release, i) => (
          <ReleaseCard key={i} release={release} />
        ))}
      </div>
    </main>
  );
}
