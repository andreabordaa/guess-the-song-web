import { NextResponse } from "next/server";
import { getAccessToken, spotifyFetch } from "@/lib/spotify";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "No access token found in cookies" });
  }

  // test 1: check who the token belongs to
  const meRes = await spotifyFetch("/me", accessToken);
  const meData = await meRes.json();

  // test 2: try fetching playlists
  const playlistsRes = await spotifyFetch("/me/playlists?limit=1", accessToken);
  const playlistsData = await playlistsRes.json();

  // test 3: check token scopes
  const tokenInfoRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json({
    hasToken: !!accessToken,
    tokenPreview: accessToken.substring(0, 20) + "...",
    meStatus: meRes.status,
    meData,
    playlistsStatus: playlistsRes.status,
    playlistsData,
  });
}
