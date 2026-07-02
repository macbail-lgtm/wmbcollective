import { NextResponse } from "next/server";
import type { RecentRelease, RecentReleasesResponse } from "@/lib/recentReleases";

const ITUNES_RSS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=24/json";

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
      });
    }

    const data = await res.json();
    const entries: ItunesEntry[] = data?.feed?.entry ?? [];
    const releases = entries
      .map(parseEntry)
      .filter((release): release is RecentRelease => release !== null);

    return NextResponse.json<RecentReleasesResponse>({
      releases,
      error: releases.length === 0,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json<RecentReleasesResponse>({
      releases: [],
      error: true,
      fetchedAt: new Date().toISOString(),
    });
  }
}
