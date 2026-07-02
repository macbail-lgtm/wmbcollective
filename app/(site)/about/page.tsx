import type { Metadata } from "next";
import { ABOUT_PAGE } from "@/content";

export const metadata: Metadata = { title: "About | WMB Collective" };

// Renders a body string as separate paragraphs, split on blank lines.
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((paragraph, i) => (
        <p
          key={i}
          className="mt-4 max-w-3xl font-body text-base font-light leading-relaxed text-gray-500"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {ABOUT_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {ABOUT_PAGE.subtext}
      </p>

      <section className="mt-14">
        <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {ABOUT_PAGE.whoWeAre.title}
        </h2>
        <Paragraphs text={ABOUT_PAGE.whoWeAre.body} />
      </section>

      <section className="mt-14">
        <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {ABOUT_PAGE.whatWeBuiltItFor.title}
        </h2>
        <Paragraphs text={ABOUT_PAGE.whatWeBuiltItFor.body} />
      </section>

      <section className="mt-14">
        <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {ABOUT_PAGE.whatWeCover.title}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
          {ABOUT_PAGE.whatWeCover.items.map((item) => (
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

      <section className="mt-14">
        <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {ABOUT_PAGE.theClub.title}
        </h2>
        <Paragraphs text={ABOUT_PAGE.theClub.body} />
      </section>

      <a
        href={ABOUT_PAGE.calloutHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-16 block border border-red px-8 py-6 text-center font-body text-sm tracking-wide text-red transition-colors hover:bg-hover"
      >
        {ABOUT_PAGE.calloutText}
      </a>
    </main>
  );
}
