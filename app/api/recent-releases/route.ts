import { NextResponse } from "next/server";
import type { RecentRelease, RecentReleasesResponse } from "@/lib/recentReleases";

const ITUNES_RSS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=50/json";

const RESULT_COUNT = 12;
const PRIMARY_WINDOW_DAYS = 14;
const FALLBACK_WINDOW_DAYS = 30;
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

function parseEntry(entry: ItunesEntry): RecentRelease | null {
  const id = entry.id?.attributes?.["im:id"];
  const title = entry["im:name"]?.label;
  const artist = entry["im:artist"]?.label;

  if (!id || !title || !artist) return null;

  const images = entry["im:image"] ?? [];
  const coverUrl = images[2]?.label ?? images[images.length - 1]?.label ?? "";
  const genre = entry.category?.attributes?.label ?? "";

  return {
    id,
    title,
    artist,
    coverUrl,
    releaseDate: entry["im:releaseDate"]?.label ?? "",
    format: genre,
    itunesUrl: entry.link?.attributes?.href ?? "",
    genre,
  };
}

function withinDays(release: RecentRelease, days: number, now: Date) {
  if (!release.releaseDate) return false;
  const releaseDate = new Date(release.releaseDate);
  if (Number.isNaN(releaseDate.getTime())) return false;
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);
  return releaseDate >= cutoff;
}

export async function GET() {
  try {
    const res = await fetch(ITUNES_RSS_URL, {
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) {
      return NextResponse.json<RecentReleasesResponse>({
        releases: [],
        error: true,
        fetchedAt: new Date().toISOString(),
        usedFallback: false,
      });
    }

    const data = await res.json();
    const entries: ItunesEntry[] = data?.feed?.entry ?? [];

    // Preserve iTunes' chart ranking — do not re-sort — so the biggest
    // releases surface first naturally within whichever window is used.
    const allReleases = entries
      .map(parseEntry)
      .filter((release): release is RecentRelease => release !== null);

    const now = new Date();
    const recent = allReleases.filter((release) =>
      withinDays(release, PRIMARY_WINDOW_DAYS, now)
    );

    const usedFallback = recent.length < MIN_RESULTS_BEFORE_FALLBACK;
    const pool = usedFallback
      ? allReleases.filter((release) => withinDays(release, FALLBACK_WINDOW_DAYS, now))
      : recent;

    const releases = pool.slice(0, RESULT_COUNT);

    return NextResponse.json<RecentReleasesResponse>({
      releases,
      error: releases.length === 0,
      fetchedAt: new Date().toISOString(),
      usedFallback,
    });
  } catch {
    return NextResponse.json<RecentReleasesResponse>({
      releases: [],
      error: true,
      fetchedAt: new Date().toISOString(),
      usedFallback: false,
    });
  }
}
