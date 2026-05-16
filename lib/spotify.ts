import { cookies } from "next/headers";

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("spotify_access_token");
  return token?.value ?? null;
}

export async function spotifyFetch(
  endpoint: string,
  accessToken: string,
): Promise<Response> {
  return fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
