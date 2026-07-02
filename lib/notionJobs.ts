import type { Job } from "@/lib/jobs";

type NotionProperty = {
  type?: string;
  title?: { plain_text?: string }[];
  rich_text?: { plain_text?: string }[];
  url?: string | null;
  select?: { name?: string } | null;
};

type NotionPage = {
  id: string;
  properties?: Record<string, NotionProperty>;
};

// Notion's API is the source of truth for property types, and it disagrees
// with the field types originally spec'd for this integration — "Role" and
// "Link" are rich_text columns in the live database, not title/url. These
// getters handle either shape so this keeps working if the schema changes.
function getText(prop: NotionProperty | undefined): string {
  if (!prop) return "";
  if (prop.type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  return "";
}

function getUrl(prop: NotionProperty | undefined): string {
  if (!prop) return "";
  if (prop.type === "url") return prop.url ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  return "";
}

export async function fetchNotionJobs(): Promise<Job[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_JOBS_DATABASE_ID;

  if (!apiKey || !databaseId) return [];

  const res = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Active",
          checkbox: { equals: true },
        },
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      }),
      next: { revalidate: 3600 }, // 1 hour
    }
  );

  if (!res.ok) throw new Error(`Notion API responded ${res.status}`);

  const data: { results?: NotionPage[] } = await res.json();
  return (data.results ?? []).map((page) => ({
    id: page.id,
    role: getText(page.properties?.Role),
    company: getText(page.properties?.Company),
    location: getText(page.properties?.Location),
    type: page.properties?.Type?.select?.name ?? "",
    link: getUrl(page.properties?.Link),
    source: "notion" as const,
  }));
}
