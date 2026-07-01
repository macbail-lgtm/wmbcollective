import type { Metadata } from "next";
// import VideoCard from "@/components/VideoCard";
import { VAULT_PAGE } from "@/content";

export const metadata: Metadata = { title: "The Vault | WMB Collective" };

export default function VaultPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <h1 className="font-display italic font-black text-navy text-4xl sm:text-5xl">
        {VAULT_PAGE.header}
      </h1>
      <p className="mt-3 font-body text-sm font-light tracking-wide text-gray-400">
        {VAULT_PAGE.subtext}
      </p>

      <div className="py-24 text-center">
        <p className="font-body text-sm font-light tracking-wide text-gray-400">
          Episodes coming soon.
          <br />
          We&apos;re building something worth watching.
        </p>
      </div>

      {/* TODO: Add YOUTUBE_VAULT_PLAYLIST_ID to .env.local to populate this grid with real episodes */}
      {/*
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
      */}
    </main>
  );
}
