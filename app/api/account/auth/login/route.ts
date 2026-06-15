import { NextResponse } from "next/server";

import { loginAccount } from "@/lib/server-database";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { email, password, remember } = payload as Record<string, unknown>;

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Emailul si parola sunt obligatorii." }, { status: 400 });
  }

  try {
    const result = await loginAccount({
      email,
      password,
      remember: remember !== false,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Autentificarea nu a putut fi finalizata." },
      { status: 401 },
    );
  }
}
