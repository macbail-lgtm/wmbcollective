"use client";

import { useState } from "react";
import type { Podcast } from "@/content";

const STOP_WORDS = new Set(["the", "with", "and", "of", "a", "an"]);

// Skips common stop words so placeholder initials read more like a real
// mark (e.g. "The New Music Business with Ari Herstand" -> "NM" instead
// of "TN").
function podcastInitials(name: string) {
  const words = name
    .replace(/[.,]/g, "")
    .split(" ")
    .filter((word) => word && !STOP_WORDS.has(word.toLowerCase()));
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

// Row in the full-width Podcasts list on The Curriculum page.
export default function PodcastCard({
  podcast,
  artworkUrl,
}: {
  podcast: Podcast;
  artworkUrl: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = artworkUrl && !imageFailed;

  return (
    <div className="flex flex-col gap-5 border-b border-border px-2 py-8 transition-colors hover:bg-hover sm:flex-row">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={artworkUrl}
          alt={`${podcast.name} cover art`}
          onError={() => setImageFailed(true)}
          className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-navy">
          <span className="font-display italic font-black text-white text-lg">
            {podcastInitials(podcast.name)}
          </span>
        </div>
      )}

      <div className="flex-1">
        <h3 className="font-display italic font-black text-navy text-xl">
          {podcast.name}
        </h3>
        <p className="mt-1 font-body text-sm text-gray-400">{podcast.host}</p>
        <p className="mt-2 font-body text-[10px] uppercase tracking-widest2 text-red">
          {podcast.category}
        </p>
        <p className="mt-3 max-w-3xl font-body text-sm font-light leading-relaxed text-gray-500">
          {podcast.blurb}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={podcast.appleLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy px-5 py-2 font-body text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red"
          >
            Apple Podcasts →
          </a>
          <a
            href={podcast.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy px-5 py-2 font-body text-xs uppercase tracking-widest2 text-white transition-colors hover:bg-red"
          >
            Spotify →
          </a>
        </div>
      </div>
    </div>
  );
}
