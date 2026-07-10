import { NextResponse } from "next/server";
import type { TopChartEntry, TopChartsResponse } from "@/lib/topCharts";

const ITUNES_RSS_URL = "https://itunes.apple.com/us/rss/topalbums/limit=20/json";

type ItunesEntry = {
  id?: { attributes?: { "im:id"?: string } };
  "im:name"?: { label?: string };
  "im:artist"?: { label?: string };
  "im:image"?: { label?: string }[];
  "im:releaseDate"?: { label?: string };
  category?: { attributes?: { label?: string } };
  link?: { attributes?: { href?: string } };
};

function parseEntry(entry: ItunesEntry, index: number): TopChartEntry | null {
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
    chartPosition: index + 1,
  };
}

export async function GET() {
  try {
    const res = await fetch(ITUNES_RSS_URL, {
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) {
      return NextResponse.json<TopChartsResponse>({
        charts: [],
        error: true,
        fetchedAt: new Date().toISOString(),
      });
    }

    const data = await res.json();
    const entries: ItunesEntry[] = data?.feed?.entry ?? [];

    // Preserve chart order — position 1 first, no re-sorting.
    const charts = entries
      .map(parseEntry)
      .filter((entry): entry is TopChartEntry => entry !== null);

    return NextResponse.json<TopChartsResponse>({
      charts,
      error: charts.length === 0,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json<TopChartsResponse>({
      charts: [],
      error: true,
      fetchedAt: new Date().toISOString(),
    });
  }
}
