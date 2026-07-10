// Shared type for a Top Charts card, used by the /api/top-charts route
// and the TopChartCard component.
export type TopChartEntry = {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genre: string;
  itunesUrl: string;
  chartPosition: number;
};

export type TopChartsResponse = {
  charts: TopChartEntry[];
  error: boolean;
  fetchedAt: string;
};
