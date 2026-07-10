import { NextResponse } from "next/server";
import { getPodcastArtwork } from "@/lib/podcastArtwork";

export const revalidate = 86400; // 24 hours

export async function GET() {
  try {
    const artwork = await getPodcastArtwork();
    return NextResponse.json(artwork);
  } catch {
    return NextResponse.json({});
  }
}
