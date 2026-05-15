// app/api/playlists/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "playlists route — coming soon" });
}
