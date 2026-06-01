import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, spotifyFetch } from "@/lib/spotify";
import spotifyPreviewFinder from "spotify-preview-finder";

interface Track {
  id: string;
  name: string;
  type: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

interface PlaylistEntry {
  item?: Track | null;
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
    `/playlists/${playlistId}/items?limit=50&additional_types=track`,
    accessToken,
  );

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("Spotify error:", res.status, JSON.stringify(errorBody));
    return NextResponse.json(
      { error: "Failed to fetch playlist items", details: errorBody },
      { status: 500 },
    );
  }

  const data = await res.json();

  const allTracks: Track[] = data.items
    .map((entry: PlaylistEntry) => entry.item)
    .filter(
      (item: Track | null | undefined): item is Track =>
        item !== null &&
        item !== undefined &&
        item.type === "track" &&
        item.id !== undefined,
    );

  console.log("tracks found:", allTracks.length);

  if (allTracks.length < 4) {
    return NextResponse.json(
      { error: `Playlist needs at least 4 tracks, found ${allTracks.length}` },
      { status: 400 },
    );
  }

  const shuffled = shuffle(allTracks);
  const roundTracks = shuffled.slice(0, Math.min(10, shuffled.length));

  const rounds = await Promise.all(
    roundTracks.map(async (correctTrack: Track) => {
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

      const otherTracks = allTracks.filter(
        (t: Track) => t.id !== correctTrack.id,
      );
      const wrongOptions = shuffle(otherTracks).slice(0, 3);
      const options = shuffle([correctTrack, ...wrongOptions]);

      return { correctTrack, options, previewUrl };
    }),
  );

  const validRounds = rounds.filter((r) => r.previewUrl !== null);

  if (validRounds.length === 0) {
    return NextResponse.json(
      { error: "Could not find preview URLs for any tracks" },
      { status: 500 },
    );
  }

  return NextResponse.json(validRounds);
}
