import Link from "next/link";
import type { LandingSection } from "@/content";

// One full-width row in the landing page's 6-section list.
export default function SectionRow({ section }: { section: LandingSection }) {
  return (
    <Link
      href={section.href}
      className="group flex items-center justify-between gap-6 border-b border-border px-6 py-8 transition-colors hover:bg-hover sm:px-12 sm:py-10"
    >
      <div className="flex items-baseline gap-6 sm:gap-10">
        <span className="font-display italic font-black text-red text-2xl sm:text-3xl">
          {section.number}
        </span>
        <div>
          <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
            {section.title}
          </h2>
          <p className="mt-1 font-body text-sm font-light text-gray-400">
            {section.description}
          </p>
        </div>
      </div>
      <span className="font-display text-2xl text-navy transition-colors group-hover:text-red">
        →
      </span>
    </Link>
  );
}
