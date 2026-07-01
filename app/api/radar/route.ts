import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { RadarRelease, RadarResponse } from "@/lib/radar";

const METACRITIC_URL =
  "https://www.metacritic.com/browse/albums/release-date/coming-soon/date";

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// Metacritic's coming-soon albums page renders its listing client-side —
// the server HTML we get back doesn't contain the album data (confirmed by
// inspecting the raw response), so this parse will currently always come up
// empty and the route falls through to the error/empty response below. The
// selectors here are a best-effort target for the card markup Metacritic
// uses elsewhere on the site; if Metacritic ever serves this page
// server-rendered (or ships a public API), this is the place to update.
function parseReleases(html: string): RadarRelease[] {
  const $ = cheerio.load(html);
  const releases: RadarRelease[] = [];

  $('[data-testid="product-tile"], .c-finderProductCard').each((_, el) => {
    const card = $(el);

    const artist = card
      .find('[data-testid="product-tile-byline"], .c-finderProductCard_meta')
      .first()
      .text()
      .trim();

    const title = card
      .find('[data-testid="product-tile-title"], .c-finderProductCard_titleHeading')
      .first()
      .text()
      .trim();

    const date = card
      .find('[data-testid="product-tile-release-date"], .c-finderProductCard_meta time')
      .first()
      .text()
      .trim();

    const coverImage = card.find("img").first().attr("src") ?? "";

    const genre = card
      .find('[data-testid="product-tile-genre"]')
      .first()
      .text()
      .trim();

    const relativeLink = card.find("a").first().attr("href") ?? "";
    const metacriticUrl = relativeLink.startsWith("http")
      ? relativeLink
      : relativeLink
        ? `https://www.metacritic.com${relativeLink}`
        : "";

    if (title && artist) {
      // The coming-soon albums browse doesn't reliably distinguish
      // EP/Single releases in a scrapable way, so everything from this
      // endpoint is labeled Album.
      releases.push({
        artist,
        title,
        date,
        coverImage,
        genre,
        format: "Album",
        metacriticUrl,
      });
    }
  });

  return releases;
}

export async function GET() {
  try {
    const res = await fetch(METACRITIC_URL, {
      headers: { "User-Agent": BROWSER_USER_AGENT },
      next: { revalidate: 21600 }, // 6 hours
    });

    if (!res.ok) {
      return NextResponse.json<RadarResponse>({
        releases: [],
        error: true,
        fetchedAt: new Date().toISOString(),
      });
    }

    const html = await res.text();
    const releases = parseReleases(html);

    return NextResponse.json<RadarResponse>({
      releases,
      error: releases.length === 0,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json<RadarResponse>({
      releases: [],
      error: true,
      fetchedAt: new Date().toISOString(),
    });
  }
}
