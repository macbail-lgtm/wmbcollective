import type { Metadata } from "next";
import HolyGrailCard from "@/components/HolyGrailCard";
import ResourceCard from "@/components/ResourceCard";
import PodcastCard from "@/components/PodcastCard";
import { CURRICULUM_PAGE } from "@/content";
import { getPodcastArtwork } from "@/lib/podcastArtwork";

export const metadata: Metadata = { title: "The Curriculum | WMB Collective" };
export const revalidate = 86400; // 24 hours — matches the podcast artwork cache

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-xs uppercase tracking-widest2 text-red">
      {children}
    </p>
  );
}

export default async function CurriculumPage() {
  const artwork = await getPodcastArtwork();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {CURRICULUM_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {CURRICULUM_PAGE.subtext}
      </p>

      {/* BOOKS */}
      <section className="py-[60px]">
        <SectionLabel>{CURRICULUM_PAGE.booksLabel}</SectionLabel>

        <div className="mt-8">
          <HolyGrailCard />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CURRICULUM_PAGE.resources.map((resource, i) => (
            <ResourceCard key={i} resource={resource} />
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* PODCASTS */}
      <section className="py-[60px]">
        <SectionLabel>{CURRICULUM_PAGE.podcastsLabel}</SectionLabel>
        <p className="mt-2 font-body text-sm font-light tracking-wide text-gray-400">
          {CURRICULUM_PAGE.podcastsSubtext}
        </p>

        <div className="mt-8">
          {CURRICULUM_PAGE.podcasts.map((podcast, i) => (
            <PodcastCard
              key={i}
              podcast={podcast}
              artworkUrl={artwork[podcast.name] ?? ""}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
