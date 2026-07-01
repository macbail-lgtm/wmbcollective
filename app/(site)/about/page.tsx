import type { Metadata } from "next";
import { ABOUT_PAGE, FOOTER } from "@/content";

export const metadata: Metadata = { title: "About | WMB Collective" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {ABOUT_PAGE.header}
      </h1>

      <section className="mt-14">
        <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {ABOUT_PAGE.whoWeAre.title}
        </h2>
        <p className="mt-4 max-w-3xl font-body text-base font-light leading-relaxed text-gray-500">
          {ABOUT_PAGE.whoWeAre.body}
        </p>
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
          {ABOUT_PAGE.forStudents.title}
        </h2>
        <p className="mt-4 max-w-3xl font-body text-base font-light leading-relaxed text-gray-500">
          {ABOUT_PAGE.forStudents.body}
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-display italic font-black text-navy text-xl sm:text-2xl">
          {ABOUT_PAGE.whereItsGoing.title}
        </h2>
        <p className="mt-4 max-w-3xl font-body text-base font-light leading-relaxed text-gray-500">
          {ABOUT_PAGE.whereItsGoing.body}
        </p>
      </section>

      <a
        href={FOOTER.joinClubHref}
        className="mt-16 block border border-red px-8 py-6 text-center font-body text-sm tracking-wide text-red transition-colors hover:bg-hover"
      >
        {FOOTER.joinClubText}
      </a>
    </main>
  );
}
