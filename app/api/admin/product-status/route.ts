import { NextResponse } from "next/server";

import { updateProductAvailability } from "@/lib/server-database";
import { defaultProductPrices, type ProductId } from "@/lib/product-catalog";

export const runtime = "nodejs";

const productIds = Object.keys(defaultProductPrices);

export async function PATCH(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { token, productId, isAvailable } = payload as Record<string, unknown>;

  if (
    typeof token !== "string" ||
    typeof productId !== "string" ||
    !productIds.includes(productId) ||
    typeof isAvailable !== "boolean"
  ) {
    return NextResponse.json({ error: "Datele de disponibilitate sunt incomplete." }, { status: 400 });
  }

  try {
    const result = await updateProductAvailability(token, productId as ProductId, isAvailable);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Disponibilitatea nu a putut fi salvata." },
      { status: 400 },
    );
  }
}
