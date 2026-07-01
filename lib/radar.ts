// Shared type for a Release Radar card, used by the /api/radar route,
// the static fallback data in content/index.ts, and the RadarCard component.
export type RadarRelease = {
  artist: string;
  title: string;
  date: string;
  coverImage: string;
  genre: string;
  format: "Album" | "EP" | "Single";
  metacriticUrl: string;
};

export type RadarResponse = {
  releases: RadarRelease[];
  error: boolean;
  fetchedAt: string;
};
