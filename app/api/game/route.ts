import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, spotifyFetch } from "@/lib/spotify";
import spotifyPreviewFinder from "spotify-preview-finder";

// types for raw Spotify API response
interface RawTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

interface RawPlaylistItem {
  track: RawTrack | null;
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const playlistId = searchParams.get("playlistId");

  if (!playlistId) {
    return NextResponse.json({ error: "Missing playlistId" }, { status: 400 });
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const res = await spotifyFetch(
    `/playlists/${playlistId}/items?limit=50&fields=items(track(id,name,artists,album(name,images)))`,
    accessToken,
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch tracks" },
      { status: 500 },
    );
  }

  const data = await res.json();

  // filter out null tracks and tracks without an id
  const allTracks: RawTrack[] = data.items
    .map((item: RawPlaylistItem) => item.track)
    .filter(
      (track: RawTrack | null): track is RawTrack =>
        track !== null && !!track.id,
    );

  if (allTracks.length < 4) {
    return NextResponse.json(
      { error: "Playlist needs at least 4 tracks" },
      { status: 400 },
    );
  }

  // shuffle and pick 10 tracks as correct answers
  const shuffled = shuffle(allTracks);
  const roundTracks = shuffled.slice(0, Math.min(10, shuffled.length));

  // fetch preview URLs using correct API shape
  const rounds = await Promise.all(
    roundTracks.map(async (correctTrack: RawTrack) => {
      let previewUrl: string | null = null;

      try {
        const artistName = correctTrack.artists?.[0]?.name ?? "";
        const result = await spotifyPreviewFinder(
          correctTrack.name,
          artistName,
          1,
        );

        if (
          result.success &&
          result.results.length > 0 &&
          result.results[0].previewUrls.length > 0
        ) {
          previewUrl = result.results[0].previewUrls[0];
        }
      } catch {
        previewUrl = null;
      }

      // pick 3 random wrong options
      const otherTracks = allTracks.filter(
        (t: RawTrack) => t.id !== correctTrack.id,
      );
      const wrongOptions = shuffle(otherTracks).slice(0, 3);
      const options = shuffle([correctTrack, ...wrongOptions]);

      return {
        correctTrack,
        options,
        previewUrl,
      };
    }),
  );

  // filter out rounds with no preview URL
  const validRounds = rounds.filter((r) => r.previewUrl !== null);

  if (validRounds.length === 0) {
    return NextResponse.json(
      { error: "Could not find preview URLs for any tracks" },
      { status: 500 },
    );
  }

  return NextResponse.json(validRounds);
}
