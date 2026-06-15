import { NextResponse } from "next/server";

import { getAdminDashboard } from "@/lib/server-database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const token = payload && typeof payload === "object" ? (payload as { token?: unknown }).token : null;

  if (typeof token !== "string" || !token.trim()) {
    return NextResponse.json({ error: "Sesiunea admin lipseste." }, { status: 401 });
  }

  try {
    const dashboard = await getAdminDashboard(token);
    return NextResponse.json(dashboard);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Dashboard-ul admin nu poate fi incarcat." },
      { status: 403 },
    );
  }
}
