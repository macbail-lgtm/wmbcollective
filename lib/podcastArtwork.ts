import { unstable_cache } from "next/cache";

// Keyed by the exact `name` used in CURRICULUM_PAGE.podcasts (content/index.ts).
//
// Two of these feed URLs differ from what's commonly guessed from a show's
// name — verified against Apple's public iTunes Lookup API
// (itunes.apple.com/lookup?id=<appleId>&entity=podcast) and confirmed by
// checking each feed's <title> matches the show:
//   - Ari Herstand's show is on Acast under a UUID slug, not a
//     name-based one.
//   - Trapital is hosted on Megaphone, not RedCircle.
const PODCAST_FEEDS: { name: string; feedUrl: string }[] = [
  {
    name: "The New Music Business with Ari Herstand",
    feedUrl: "https://feeds.acast.com/public/shows/6b22dabf-b9be-45c2-bddb-1483c14ab221",
  },
  {
    name: "Music Business Worldwide Podcast",
    feedUrl: "https://rss.buzzsprout.com/203834.rss",
  },
  {
    name: "And The Writer Is... with Ross Golan",
    feedUrl: "https://feeds.acast.com/public/shows/05db9598-9baf-443a-ab69-21a77284c034",
  },
  {
    name: "Trapital",
    feedUrl: "https://feeds.megaphone.fm/ALIAL5947999035",
  },
  {
    name: "The Town with Matt Belloni",
    feedUrl: "https://feeds.megaphone.fm/the-town-with-matthew-belloni",
  },
];

// The show-level <itunes:image>/<image> tag always appears near the top of
// the document, before any <item> (episode) entries — but the full feed
// can run to tens of megabytes once every episode is included (Trapital's
// is 17MB+). Downloading the whole thing just to read the first tag both
// wastes bandwidth and blows past Next's 2MB fetch-cache entry limit, which
// silently breaks caching. So this reads the response as a stream and
// stops as soon as it's captured the channel image (or hit the first
// <item>), instead of buffering the entire body.
const MAX_BYTES = 65536; // 64KB is comfortably past the channel-level tags

async function fetchArtworkUrl(feedUrl: string): Promise<string> {
  // `cache: "no-store"` would avoid Next's fetch cache entirely, but it
  // also marks the calling route as needing dynamic rendering ("Dynamic
  // server usage") during static generation — which broke the build. So
  // this uses Next's normal cacheable fetch mode instead, and relies on
  // aborting the underlying request (not just stopping local consumption)
  // to keep the cached body small: Next tees the response to build its
  // cache entry independently of how much the caller reads, so cancelling
  // only *our* reader still leaves Next downloading — and attempting to
  // cache — the entire multi-megabyte feed in the background. Aborting the
  // whole request kills that background download too.
  const controller = new AbortController();

  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 86400 }, // 24 hours
      signal: controller.signal,
    });
    if (!res.ok || !res.body) return "";

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let text = "";
    let bytesRead = 0;

    while (bytesRead < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      text += decoder.decode(value, { stream: true });
      if (/<itunes:image[^>]*\/>/.test(text) || text.includes("<item")) break;
    }
    controller.abort();

    const hrefMatch = text.match(/<itunes:image[^>]*\shref="([^"]+)"/);
    if (hrefMatch) return decodeXmlEntities(hrefMatch[1]);

    // Fall back to the standard RSS <image><url> tag if itunes:image wasn't
    // found within the truncated read.
    const imageUrlMatch = text.match(/<image>\s*<url>([^<]+)<\/url>/);
    return imageUrlMatch ? decodeXmlEntities(imageUrlMatch[1]) : "";
  } catch {
    return "";
  }
}

// Regex-extracted attribute values aren't run through an XML parser, so
// entities like the "&amp;" in Megaphone/imgix query strings (e.g.
// "...&amp;max-w=3000") arrive un-decoded — which breaks the URL when used
// as an <img src>, since the browser doesn't decode entities in
// programmatically-set attributes the way it would in parsed HTML markup.
function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

async function fetchAllArtwork(): Promise<Record<string, string>> {
  const results = await Promise.allSettled(
    PODCAST_FEEDS.map(async (feed) => {
      const url = await fetchArtworkUrl(feed.feedUrl);
      return [feed.name, url] as const;
    })
  );

  const artwork: Record<string, string> = {};
  for (const result of results) {
    if (result.status === "fulfilled") {
      const [name, url] = result.value;
      if (url) artwork[name] = url;
    }
  }
  return artwork;
}

// Returns a map of podcast name -> artwork URL. A feed that fails to fetch
// or parse is simply omitted, so callers can fall back to a placeholder.
//
// The raw feed fetches above use `cache: "no-store"` (see note), so caching
// happens here instead: unstable_cache stores this function's small return
// value (a handful of URLs) for 24 hours, independent of Next's fetch data
// cache — which sidesteps the 2MB entry-size limit entirely since it's
// never asked to cache the multi-megabyte feed bodies.
export const getPodcastArtwork = unstable_cache(
  fetchAllArtwork,
  ["podcast-artwork"],
  { revalidate: 86400 }
);
