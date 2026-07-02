import type { Job } from "@/lib/jobs";

// Public Greenhouse job board tokens for music, entertainment, and adjacent
// companies. Not every token here resolves to a real board — boards.greenhouse.io
// 404s for a company that isn't on Greenhouse or uses a different token, and
// those are skipped silently below. Edit this list to add/remove companies.
const COMPANIES = [
  // Major Labels
  "spotify",
  "atlanticrecords",
  "warnermusic",
  "universalmusicgroup",
  "sonymusic",
  "interscope",
  "republicrecords",
  "columbiarecords",
  "defjam",
  "rcarecords",
  "capitolmusic",
  "islandrecords",
  "motown",
  "geffen",
  "epicsonymusic",

  // Agencies
  "wmeimg",
  "caa",
  "unitedtalentagency",
  "paradigmagency",
  "endeavor",
  "agencyfortheperformingarts",
  "icmpartners",

  // Live & Events
  "livenation",
  "aegworldwide",
  "ticketmaster",
  "anschutzentertainmentgroup",
  "goldenvoice",
  "c3presents",
  "spotsylvania",

  // Streaming & Tech
  "soundcloud",
  "tidal",
  "pandora",
  "siriusxm",
  "beatport",
  "bandcamp",
  "distrokid",
  "tunecore",
  "cdbaby",
  "audiomack",

  // Management & Publishing
  "kobaltmusic",
  "bmi",
  "ascap",
  "sonyatv",
  "warnerchappell",
  "primarywave",
  "concord",
  "beggarsgroup",

  // Media & Press
  "pitchfork",
  "billboard",
  "rollingstone",
  "complexnetworks",
  "vice",
  "buzzfeed",
  "variedmedia",

  // Sports & Entertainment Crossover
  "endeavorstreaming",
  "rocnation",
  "wolfpackentertainment",
  "fulwell73",
  "seventhousand",
  "merck",

  // TV & Film Music
  "netflixmusic",
  "disneymusicgroup",
  "paramountmusic",
  "nbcuniversal",
  "a24",
  "lionsgate",

  // PR & Marketing
  "shorefiremedia",
  "nastylittleman",
  "idpr",
  "sundrenched",
];

const KEYWORDS = [
  "music",
  "entertainment",
  "artist",
  "label",
  "publishing",
  "marketing",
  "sync",
  "licensing",
  "partnerships",
  "brand",
  "a&r",
  "creative",
  "content",
  "media",
  "talent",
  "booking",
  "streaming",
  "digital",
  "social",
  "events",
  "touring",
];

const FETCH_TIMEOUT_MS = 8000;

type GreenhouseJob = {
  id: number | string;
  title?: string;
  company_name?: string;
  location?: { name?: string };
  absolute_url?: string;
};

function capitalize(slug: string) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function matchesKeywords(title: string) {
  const lower = title.toLowerCase();
  return KEYWORDS.some((keyword) => lower.includes(keyword));
}

async function fetchCompanyJobs(company: string): Promise<Job[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    // content=false — we only read title/company/location/id/url, and the
    // full HTML job descriptions content=true returns can push some boards
    // past Next's 2MB fetch-cache entry limit, silently breaking the
    // 3-hour revalidate cache for those companies.
    const res = await fetch(
      `https://boards.greenhouse.io/v1/boards/${company}/jobs?content=false`,
      {
        signal: controller.signal,
        next: { revalidate: 10800 }, // 3 hours
      }
    );

    if (!res.ok) return [];

    const data: { jobs?: GreenhouseJob[] } = await res.json();
    const jobs = data?.jobs ?? [];

    return jobs
      .filter(
        (job): job is GreenhouseJob & { title: string } =>
          typeof job.title === "string" && matchesKeywords(job.title)
      )
      .map((job) => ({
        id: `greenhouse-${company}-${job.id}`,
        role: job.title,
        company: job.company_name || capitalize(company),
        location: job.location?.name ?? "",
        type: "Full-time",
        link: job.absolute_url ?? "",
        source: "greenhouse" as const,
      }));
  } catch {
    // 404s, timeouts, and malformed responses are all treated the same —
    // skip this board and keep going.
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchGreenhouseJobs(): Promise<Job[]> {
  const results = await Promise.allSettled(
    COMPANIES.map((company) => fetchCompanyJobs(company))
  );

  return results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );
}
