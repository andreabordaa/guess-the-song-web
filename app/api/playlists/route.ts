import { NextResponse } from "next/server";
import { getAccessToken, spotifyFetch } from "@/lib/spotify";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // fetch the current user's profile to get their id
  const meRes = await spotifyFetch("/me", accessToken);
  if (!meRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
  const me = await meRes.json();
  const userId = me.id;

  // fetch all playlists
  const res = await spotifyFetch("/me/playlists?limit=50", accessToken);
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 },
    );
  }

  const data = await res.json();

  // only return playlists owned by the current user
  const ownedPlaylists = data.items.filter(
    (playlist: { owner: { id: string }; items: { total: number } | null }) =>
      playlist.owner.id === userId && (playlist.items?.total ?? 0) > 10,
  );

  return NextResponse.json(ownedPlaylists);
}
