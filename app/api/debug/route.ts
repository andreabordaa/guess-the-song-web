import { NextResponse } from "next/server";
import { getAccessToken, spotifyFetch } from "@/lib/spotify";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "No access token found" });
  }

  // test the exact playlist from your logs
  const playlistId = "4UHadNNHmjQr0ECB121Sa3";

  // test 1: items endpoint with fields
  const withFields = await spotifyFetch(
    `/playlists/${playlistId}/items?limit=5&fields=items(track(id,name,artists,album(name,images)))`,
    accessToken,
  );
  const withFieldsData = await withFields.json();

  // test 2: items endpoint without fields filter
  const withoutFields = await spotifyFetch(
    `/playlists/${playlistId}/items?limit=5`,
    accessToken,
  );
  const withoutFieldsData = await withoutFields.json();

  // test 3: tracks endpoint (old one)
  const tracksEndpoint = await spotifyFetch(
    `/playlists/${playlistId}/tracks?limit=5`,
    accessToken,
  );
  const tracksData = await tracksEndpoint.json();

  return NextResponse.json({
    withFieldsStatus: withFields.status,
    withFieldsData,
    withoutFieldsStatus: withoutFields.status,
    withoutFieldsData,
    tracksEndpointStatus: tracksEndpoint.status,
    tracksData,
  });
}
