import { NextResponse } from "next/server";

import { updateProductPrice } from "@/lib/server-database";
import { defaultProductPrices, type ProductId } from "@/lib/product-catalog";

export const runtime = "nodejs";

const productIds = Object.keys(defaultProductPrices);

export async function PATCH(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cererea nu este valida." }, { status: 400 });
  }

  const { token, productId, price, note } = payload as Record<string, unknown>;

  if (
    typeof token !== "string" ||
    typeof productId !== "string" ||
    !productIds.includes(productId) ||
    typeof price !== "number"
  ) {
    return NextResponse.json({ error: "Datele pretului sunt incomplete." }, { status: 400 });
  }

  try {
    const result = await updateProductPrice(
      token,
      productId as ProductId,
      price,
      typeof note === "string" ? note : "",
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Pretul nu a putut fi salvat." },
      { status: 400 },
    );
  }
}
