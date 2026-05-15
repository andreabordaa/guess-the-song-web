import { NextRequest, NextResponse } from "next/server";
import { serialize, parse } from "cookie";

export async function GET(req: NextRequest) {
  const cookies = parse(req.headers.get("cookie") || "");
  const refreshToken = cookies["spotify_refresh_token"];

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
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
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "Failed to refresh" }, { status: 401 });
  }

  const tokens = await tokenRes.json();

  const response = NextResponse.json({ success: true });

  response.headers.append(
    "Set-Cookie",
    serialize("spotify_access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: tokens.expires_in,
      path: "/",
    }),
  );

  return response;
}
