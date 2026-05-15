// app/api/game/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "game route — coming soon" });
}
