import { NextResponse } from "next/server";
import { getAccessToken, spotifyFetch } from "@/lib/spotify";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const res = await spotifyFetch("/me/playlists?limit=50", accessToken);

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch playlists" },
      { status: 500 },
    );
  }

  const data = await res.json();

  return NextResponse.json(data.items);
}
