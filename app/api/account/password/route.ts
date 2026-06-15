import { NextResponse } from "next/server";

import { changeAccountPassword } from "@/lib/server-database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { token, currentPassword, newPassword } = payload as Record<string, unknown>;

  if (typeof token !== "string" || typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return NextResponse.json({ error: "Datele pentru schimbarea parolei sunt incomplete." }, { status: 400 });
  }

  try {
    await changeAccountPassword(token, currentPassword, newPassword);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Parola nu a putut fi schimbata." },
      { status: 400 },
    );
  }
}
