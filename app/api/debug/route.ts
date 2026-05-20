import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/spotify";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "No access token found" });
  }

  // check what this token can actually do by inspecting it
  const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=1`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // try a collaborative playlist owned by you specifically
  const ownedRes = await fetch(`https://api.spotify.com/v1/me/tracks?limit=1`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const ownedData = await ownedRes.json();

  // check token info via Spotify introspection
  const introspect = await fetch("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const meData = await introspect.json();

  return NextResponse.json({
    tokenPreview: accessToken.substring(0, 30) + "...",
    playlistsStatus: res.status,
    savedTracksStatus: ownedRes.status,
    savedTracksData: ownedData,
    me: meData,
  });
}
