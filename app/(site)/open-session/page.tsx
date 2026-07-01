import type { Metadata } from "next";
import VideoCard from "@/components/VideoCard";
import { OPEN_SESSION_PAGE } from "@/content";

export const metadata: Metadata = { title: "Open Session | WMB Collective" };

// Archived talks grid — replace with YouTube Data API v3 results by calling
// getPlaylistVideos(process.env.YOUTUBE_OPENSESSION_PLAYLIST_ID) from
// lib/youtube.ts once YOUTUBE_OPENSESSION_PLAYLIST_ID is set in .env.local.
export default function OpenSessionPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {OPEN_SESSION_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {OPEN_SESSION_PAGE.subtext}
      </p>

      <div className="mt-10 bg-red px-6 py-6 text-center sm:px-10">
        <p className="font-display italic font-black text-white text-lg sm:text-xl">
          {OPEN_SESSION_PAGE.banner}
        </p>
      </div>

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
    </main>
  );
}
