import type { Metadata } from "next";
import VideoCard from "@/components/VideoCard";
import { VAULT_PAGE } from "@/content";

export const metadata: Metadata = { title: "The Vault | WMB Collective" };

// Placeholder grid — replace with YouTube Data API v3 results by calling
// getPlaylistVideos(process.env.YOUTUBE_VAULT_PLAYLIST_ID) from lib/youtube.ts
// once YOUTUBE_VAULT_PLAYLIST_ID is set in .env.local.
export default function VaultPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {VAULT_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {VAULT_PAGE.subtext}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {VAULT_PAGE.videos.map((video, i) => (
          <VideoCard
            key={i}
            title={video.title}
            guest={video.guest}
            description={video.description}
          />
        ))}
      </div>
    </main>
  );
}
