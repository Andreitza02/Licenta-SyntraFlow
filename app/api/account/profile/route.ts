import { NextResponse } from "next/server";

import { updateAccountProfile } from "@/lib/server-database";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { token, profile } = payload as Record<string, unknown>;

  if (typeof token !== "string" || !profile || typeof profile !== "object") {
    return NextResponse.json({ error: "Sesiunea sau profilul lipseste." }, { status: 401 });
  }

  const profilePayload = profile as Record<string, unknown>;

  try {
    const user = await updateAccountProfile(token, {
      firstName: typeof profilePayload.firstName === "string" ? profilePayload.firstName : "",
      lastName: typeof profilePayload.lastName === "string" ? profilePayload.lastName : "",
      email: typeof profilePayload.email === "string" ? profilePayload.email : "",
      phone: typeof profilePayload.phone === "string" ? profilePayload.phone : "",
      company: typeof profilePayload.company === "string" ? profilePayload.company : "",
      role: typeof profilePayload.role === "string" ? profilePayload.role : "",
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Profilul nu a putut fi salvat." },
      { status: 400 },
    );
  }
}
