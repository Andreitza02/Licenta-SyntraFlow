import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/server-database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const token = payload && typeof payload === "object" ? (payload as { token?: unknown }).token : null;

  if (typeof token !== "string" || !token.trim()) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await getSessionUser(token);
  return NextResponse.json({ user });
}
