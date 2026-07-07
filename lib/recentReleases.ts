// Shared type for a Recent Releases card, used by the
// /api/recent-releases route and the RecentReleaseCard component.
export type RecentRelease = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  format: string;
  itunesUrl: string;
  genre: string;
};

export type RecentReleasesResponse = {
  releases: RecentRelease[];
  error: boolean;
  fetchedAt: string;
  // True when fewer than 3 releases fell within the normal 14-day window,
  // so the list was relaxed to a 30-day window to avoid an empty page.
  usedFallback: boolean;
};
