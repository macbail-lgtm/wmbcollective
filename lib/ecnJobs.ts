import { XMLParser } from "fast-xml-parser";
import type { Job } from "@/lib/jobs";

const ECN_FEEDS = [
  { url: "https://www.entertainmentcareers.net/ecnjcat114", category: "Internship" },
  { url: "https://www.entertainmentcareers.net/ecnjcat119", category: "Music" },
  { url: "https://www.entertainmentcareers.net/ecnjcat103", category: "Agency/Management" },
  { url: "https://www.entertainmentcareers.net/ecnjcat120", category: "Marketing" },
  { url: "https://www.entertainmentcareers.net/ecnjcat110", category: "Executive" },
  { url: "https://www.entertainmentcareers.net/ecnjcat118", category: "MBA" },
  { url: "https://www.entertainmentcareers.net/ecnjcat125", category: "Sports" },
  { url: "https://www.entertainmentcareers.net/ecnjcat167", category: "PR/Publicity" },
  { url: "https://www.entertainmentcareers.net/ecnjcat157", category: "Content" },
  { url: "https://www.entertainmentcareers.net/ecnjcat117", category: "Legal/Business Affairs" },
  { url: "https://www.entertainmentcareers.net/ecnjcat124", category: "Live Events" },
  { url: "https://www.entertainmentcareers.net/ecnjcat127", category: "Entry Level" },
];

const MAX_AGE_DAYS = 30;
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const parser = new XMLParser({
  ignoreAttributes: false,
  trimValues: true,
});

type EcnRssItem = {
  title?: string;
  link?: string;
  description?: string;
  category?: string | string[];
  pubDate?: string;
  guid?: string | { "#text"?: string };
};

// Titles arrive as "Role - Company", e.g. "E-Commerce Manager - Sony Music".
// The company is reliably the last " - "-separated segment; the role is
// everything before it (rejoined, since the role itself can contain one).
function splitTitle(rawTitle: string): { role: string; company: string } {
  const title = rawTitle.replace(/\s+/g, " ").trim();
  const lastSeparator = title.lastIndexOf(" - ");
  if (lastSeparator === -1) return { role: title, company: "" };
  return {
    role: title.slice(0, lastSeparator).trim(),
    company: title.slice(lastSeparator + 3).trim(),
  };
}

// The feed's <category> tags are, in order: city/region, state/country,
// employment type (x2), listing type, company name. The first two make a
// usable location string — the ECN spec assumed location lived in
// <description>, but the real feed only puts unstructured job-description
// prose there, not a parseable location.
function extractLocation(categories: string[]): string {
  const [city, region] = categories;
  if (city && region) return `${city}, ${region}`;
  return city ?? "";
}

function getGuid(item: EcnRssItem): string {
  if (typeof item.guid === "string") return item.guid;
  if (item.guid?.["#text"]) return item.guid["#text"];
  return item.link ?? "";
}

async function fetchFeed(
  feed: (typeof ECN_FEEDS)[number],
  cutoff: Date
): Promise<Job[]> {
  const res = await fetch(feed.url, {
    headers: { "User-Agent": BROWSER_USER_AGENT },
    next: { revalidate: 10800 }, // 3 hours
  });

  if (!res.ok) return [];

  const xml = await res.text();
  const parsed = parser.parse(xml);
  const rawItems = parsed?.rss?.channel?.item;
  const items: EcnRssItem[] = Array.isArray(rawItems)
    ? rawItems
    : rawItems
      ? [rawItems]
      : [];

  const jobs: Job[] = [];

  for (const item of items) {
    if (!item.title || !item.link) continue;

    const pubDate = item.pubDate ? new Date(item.pubDate) : null;
    const isValidDate = pubDate && !Number.isNaN(pubDate.getTime());
    if (isValidDate && pubDate < cutoff) continue;

    const { role, company } = splitTitle(item.title);
    if (!role) continue;

    const categories = Array.isArray(item.category)
      ? item.category
      : item.category
        ? [item.category]
        : [];

    jobs.push({
      id: getGuid(item) || item.link,
      role,
      company,
      location: extractLocation(categories),
      type: feed.category === "Internship" ? "Internship" : "Full-time",
      link: item.link,
      source: "ecn",
      category: feed.category,
      postedDate: isValidDate ? pubDate.toISOString() : "",
    });
  }

  return jobs;
}

export async function fetchEcnJobs(): Promise<Job[]> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - MAX_AGE_DAYS);

  const results = await Promise.allSettled(
    ECN_FEEDS.map((feed) => fetchFeed(feed, cutoff))
  );

  const allJobs = results.flatMap((result) =>
    result.status === "fulfilled" ? result.value : []
  );

  // The same listing often appears in more than one category feed (e.g. a
  // label marketing role tagged under both Music and Marketing) — each
  // copy has a different guid (the utm_content query param varies per
  // feed), so dedupe by role + company rather than id.
  const seen = new Set<string>();
  const jobs: Job[] = [];
  for (const job of allJobs) {
    const key = job.role.toLowerCase().trim() + job.company.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    jobs.push(job);
  }

  jobs.sort((a, b) => (b.postedDate ?? "").localeCompare(a.postedDate ?? ""));

  return jobs;
}
