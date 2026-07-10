import { NextResponse } from "next/server";
import type { NewRelease, NewReleasesResponse } from "@/lib/newReleases";

// The spec'd source for this route was
// https://itunes.apple.com/us/rss/newmusic/limit=25/json — that feed
// genre doesn't exist on Apple's RSS API (confirmed 400 "Invalid RSS
// channel name", along with several other guessed variants). "topalbums"
// is the same real, working feed already used by /api/top-charts; this
// route reuses it and applies the 14-day recency filter, which is exactly
// what the previous version of this page already did successfully.
const ITUNES_RSS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=25/json";

const MIN_RESULTS_BEFORE_FALLBACK = 3;

type ItunesEntry = {
  id?: { attributes?: { "im:id"?: string } };
  "im:name"?: { label?: string };
  "im:artist"?: { label?: string };
  "im:image"?: { label?: string }[];
  "im:releaseDate"?: { label?: string };
  category?: { attributes?: { label?: string } };
  link?: { attributes?: { href?: string } };
};

function parseEntry(entry: ItunesEntry): NewRelease | null {
  const id = entry.id?.attributes?.["im:id"];
  const title = entry["im:name"]?.label;
  const artist = entry["im:artist"]?.label;

  if (!id || !title || !artist) return null;

  const images = entry["im:image"] ?? [];

  return {
    id,
    title,
    artist,
    coverUrl: images[2]?.label ?? images[images.length - 1]?.label ?? "",
    releaseDate: entry["im:releaseDate"]?.label ?? "",
    genre: entry.category?.attributes?.label ?? "",
    itunesUrl: entry.link?.attributes?.href ?? "",
  };
}

function withinLast14Days(release: NewRelease, now: Date) {
  if (!release.releaseDate) return false;
  const releaseDate = new Date(release.releaseDate);
  if (Number.isNaN(releaseDate.getTime())) return false;
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  return releaseDate >= twoWeeksAgo;
}

export async function GET() {
  try {
    const res = await fetch(ITUNES_RSS_URL, {
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) {
      return NextResponse.json<NewReleasesResponse>({
        releases: [],
        error: true,
        fetchedAt: new Date().toISOString(),
        usedFallback: false,
      });
    }

    const data = await res.json();
    const entries: ItunesEntry[] = data?.feed?.entry ?? [];

    // Preserve iTunes' chart ranking — do not re-sort.
    const allReleases = entries
      .map(parseEntry)
      .filter((release): release is NewRelease => release !== null);

    const now = new Date();
    const recent = allReleases.filter((release) => withinLast14Days(release, now));

    const usedFallback = recent.length < MIN_RESULTS_BEFORE_FALLBACK;
    const releases = usedFallback ? allReleases : recent;

    return NextResponse.json<NewReleasesResponse>({
      releases,
      error: releases.length === 0,
      fetchedAt: new Date().toISOString(),
      usedFallback,
    });
  } catch {
    return NextResponse.json<NewReleasesResponse>({
      releases: [],
      error: true,
      fetchedAt: new Date().toISOString(),
      usedFallback: false,
    });
  }
}
