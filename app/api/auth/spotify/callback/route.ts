import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=spotify_denied`,
    );
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?error=token_exchange_failed`,
    );
  }

  const tokens = await tokenRes.json();

  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_URL}/playlists`,
  );

  response.headers.append(
    "Set-Cookie",
    serialize("spotify_access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: tokens.expires_in,
      path: "/",
    }),
  );

  response.headers.append(
    "Set-Cookie",
    serialize("spotify_refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    }),
  );

  return response;
}
