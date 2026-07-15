"use client";

import { useState } from "react";
import type { Artist } from "@/content";
import { initials } from "@/lib/format";
import InstagramIcon from "@/components/icons/InstagramIcon";

// Card for an artist in the WMB Artist Incubator roster on /records.
export default function ArtistCard({ artist }: { artist: Artist }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = artist.photoUrl && !imageFailed;

  return (
    <div className="flex flex-col border border-border transition-colors hover:bg-hover">
      <div className="relative aspect-square w-full">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={artist.photoUrl}
            alt={artist.name}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-navy">
            <span className="font-display italic font-black text-white text-3xl">
              {initials(artist.name)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="font-display italic font-black text-navy text-lg">
          {artist.name}
        </p>
        <p className="mt-1 font-body text-xs text-gray-400">
          {[artist.genre, artist.hometown].filter(Boolean).join(" · ")}
        </p>
        {artist.bio && (
          <p className="mt-3 font-body text-sm font-light leading-relaxed text-gray-500">
            {artist.bio}
          </p>
        )}

        {artist.spotifyTrackId && (
          <iframe
            src={`https://open.spotify.com/embed/track/${artist.spotifyTrackId}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="mt-4"
            title={`${artist.name} on Spotify`}
          />
        )}

        {artist.instagramUrl && (
          <a
            href={artist.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${artist.name} on Instagram`}
            className="mt-4 inline-block text-navy transition-colors hover:text-red"
          >
            <InstagramIcon />
          </a>
        )}
      </div>
    </div>
  );
}
