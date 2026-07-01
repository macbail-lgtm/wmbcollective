// YouTube Data API v3 utility. Inactive until YOUTUBE_API_KEY and the
// relevant playlist ID env vars are set — see .env.example.
//
// Usage once activated (e.g. in app/vault/page.tsx):
//   const videos = await getPlaylistVideos(process.env.YOUTUBE_VAULT_PLAYLIST_ID);

export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
};

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3/playlistItems";

/**
 * Fetches videos from a YouTube playlist. Returns an empty array if the
 * API key or playlist ID is missing, so pages can fall back to placeholder
 * content without throwing.
 */
export async function getPlaylistVideos(
  playlistId: string | undefined
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey || !playlistId) {
    return [];
  }

  const url = new URL(YOUTUBE_API_BASE);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    return [];
  }

  const data: PlaylistItemsResponse = await res.json();

  return (data.items ?? []).map((item) => ({
    id: item.snippet?.resourceId?.videoId ?? "",
    title: item.snippet?.title ?? "",
    description: item.snippet?.description ?? "",
    thumbnailUrl: item.snippet?.thumbnails?.high?.url ?? "",
    publishedAt: item.snippet?.publishedAt ?? "",
  }));
}

type PlaylistItemsResponse = {
  items?: {
    snippet?: {
      resourceId?: { videoId?: string };
      title?: string;
      description?: string;
      thumbnails?: { high?: { url?: string } };
      publishedAt?: string;
    };
  }[];
};
