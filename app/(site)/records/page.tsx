import type { Metadata } from "next";
import ArtistCard from "@/components/ArtistCard";
import { WMB_INCUBATOR, ROSTER } from "@/content";

export const metadata: Metadata = { title: "WMB Artist Incubator | WMB Collective" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-xs uppercase tracking-widest2 text-red">
      {children}
    </p>
  );
}

// Renders a body string as separate paragraphs, split on blank lines.
function Paragraphs({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <>
      {text.split("\n\n").map((paragraph, i) => (
        <p key={i} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default function RecordsPage() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="text-center">
          <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
            {WMB_INCUBATOR.hero.title}
          </h1>
          <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
            {WMB_INCUBATOR.hero.subtext}
          </p>
          <p className="mx-auto mt-8 max-w-[600px] font-body text-base font-light leading-[1.8] text-gray-500">
            {WMB_INCUBATOR.hero.blurb}
          </p>
        </section>

        <div className="mt-14 border-t border-border" />

        {/* ABOUT */}
        <section className="grid grid-cols-1 gap-12 py-[60px] lg:grid-cols-2">
          <div>
            <SectionLabel>{WMB_INCUBATOR.about.label}</SectionLabel>
            <Paragraphs
              text={WMB_INCUBATOR.about.body}
              className="mt-4 font-body text-base font-light leading-[1.8] text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-8">
            {WMB_INCUBATOR.whatWeOffer.map((item) => (
              <div key={item.title} className="border-l-2 border-red pl-4">
                <h3 className="font-display italic font-black text-navy text-base">
                  {item.title}
                </h3>
                <p className="mt-1 font-body text-sm font-light text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ROSTER */}
        <section className="py-[60px]">
          <SectionLabel>{WMB_INCUBATOR.roster.label}</SectionLabel>
          <p className="mt-2 font-body text-sm font-light tracking-wide text-gray-400">
            {WMB_INCUBATOR.roster.subtext}
          </p>

          {ROSTER.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-body text-sm text-gray-400">
                {WMB_INCUBATOR.roster.emptyTitle}
              </p>
              <p className="mt-1 font-body text-sm text-gray-400">
                {WMB_INCUBATOR.roster.emptySubtext}
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ROSTER.map((artist, i) => (
                <ArtistCard key={i} artist={artist} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* SUBMIT */}
      <section className="bg-navy py-20 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <SectionLabel>{WMB_INCUBATOR.submit.label}</SectionLabel>
          <h2 className="mt-3 font-display italic font-black text-white text-3xl sm:text-4xl">
            {WMB_INCUBATOR.submit.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] font-body text-base font-light leading-[1.8] text-[#A8BFDA]">
            {WMB_INCUBATOR.submit.body}
          </p>
          <a
            href={WMB_INCUBATOR.submit.buttonHref}
            className="mt-6 inline-block bg-white px-7 py-3.5 font-body text-xs uppercase tracking-widest2 text-navy transition-colors hover:bg-red hover:text-white"
          >
            {WMB_INCUBATOR.submit.buttonText}
          </a>
        </div>
      </section>
    </main>
  );
}
