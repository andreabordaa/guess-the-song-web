import { NextResponse } from "next/server";

const SCOPES = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
].join(" ");

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: SCOPES,
    show_dialog: "true",
  });

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(spotifyAuthUrl);
}
