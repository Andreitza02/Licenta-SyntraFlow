import { NextResponse } from "next/server";

import { updateHolidayDiscount } from "@/lib/server-database";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { token, percent, targetProductId, note } = payload as Record<string, unknown>;

  if (typeof token !== "string" || typeof percent !== "number") {
    return NextResponse.json({ error: "Datele discountului sunt incomplete." }, { status: 400 });
  }

  try {
    const result = await updateHolidayDiscount(
      token,
      percent,
      typeof targetProductId === "string" ? targetProductId : "all",
      typeof note === "string" ? note : "",
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Discountul nu a putut fi salvat." },
      { status: 400 },
    );
  }
}
