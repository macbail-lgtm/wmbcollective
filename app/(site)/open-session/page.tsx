import type { Metadata } from "next";
// import VideoCard from "@/components/VideoCard";
import { OPEN_SESSION_PAGE } from "@/content";

export const metadata: Metadata = { title: "Open Session | WMB Collective" };

export default function OpenSessionPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {OPEN_SESSION_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {OPEN_SESSION_PAGE.subtext}
      </p>

      <div className="py-24 text-center">
        <p className="font-body text-sm font-light tracking-wide text-gray-400">
          Sessions coming soon.
          <br />
          Stay tuned for live talks and panels.
        </p>
      </div>

      {/* TODO: Add YOUTUBE_OPENSESSION_PLAYLIST_ID to .env.local to populate this grid with archived sessions */}
      {/*
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {OPEN_SESSION_PAGE.talks.map((talk, i) => (
          <VideoCard
            key={i}
            title={talk.title}
            guest={talk.guest}
            description={talk.description}
          />
        ))}
      </div>
      */}
    </main>
  );
}
