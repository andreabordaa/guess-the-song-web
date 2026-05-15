import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);

  response.headers.append(
    "Set-Cookie",
    serialize("spotify_access_token", "", { maxAge: 0, path: "/" }),
  );

  response.headers.append(
    "Set-Cookie",
    serialize("spotify_refresh_token", "", { maxAge: 0, path: "/" }),
  );

  return response;
}
