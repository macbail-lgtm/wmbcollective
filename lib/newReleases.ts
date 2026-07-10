// Shared type for a Recent Releases card, used by the /api/new-releases
// route and the NewReleaseCard component.
export type NewRelease = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genre: string;
  itunesUrl: string;
};

export type NewReleasesResponse = {
  releases: NewRelease[];
  error: boolean;
  fetchedAt: string;
  // True when fewer than 3 releases fell within the 14-day window, so the
  // full unfiltered list was returned instead of an empty/sparse page.
  usedFallback: boolean;
};
