import type { Metadata } from "next";
import HolyGrailCard from "@/components/HolyGrailCard";
import ResourceCard from "@/components/ResourceCard";
import { CURRICULUM_PAGE } from "@/content";

export const metadata: Metadata = { title: "The Curriculum | WMB Collective" };

export default function CurriculumPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {CURRICULUM_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {CURRICULUM_PAGE.subtext}
      </p>

      <div className="mt-14">
        <HolyGrailCard />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CURRICULUM_PAGE.resources.map((resource, i) => (
          <ResourceCard key={i} resource={resource} />
        ))}
      </div>
    </main>
  );
}
