declare module "spotify-preview-finder" {
  interface PreviewResult {
    name: string;
    spotifyUrl: string;
    previewUrls: string[];
    trackId: string;
    albumName: string;
    releaseDate: string;
    popularity: number;
    durationMs: number;
  }

  interface SpotifyPreviewResponse {
    success: boolean;
    searchQuery: string;
    results: PreviewResult[];
    error?: string;
  }

  function spotifyPreviewFinder(
    songName: string,
    artistOrLimit?: string | number,
    limit?: number,
  ): Promise<SpotifyPreviewResponse>;

  export = spotifyPreviewFinder;
}
