import { NextResponse } from "next/server";

import { registerAccount } from "@/lib/server-database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { firstName, lastName, email, password } = payload as Record<string, unknown>;

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return NextResponse.json({ error: "Datele contului sunt incomplete." }, { status: 400 });
  }

  try {
    const result = await registerAccount({ firstName, lastName, email, password });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Contul nu a putut fi creat." },
      { status: 400 },
    );
  }
}
