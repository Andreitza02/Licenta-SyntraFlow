import { NextResponse } from "next/server";

import { logoutSession } from "@/lib/server-database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const token = payload && typeof payload === "object" ? (payload as { token?: unknown }).token : null;

  if (typeof token === "string" && token.trim()) {
    await logoutSession(token);
  }

  return NextResponse.json({ success: true });
}
