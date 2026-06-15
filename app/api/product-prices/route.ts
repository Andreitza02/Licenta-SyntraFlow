import { NextResponse } from "next/server";

import { getPublicProductPrices } from "@/lib/server-database";

export const runtime = "nodejs";

export async function GET() {
  const pricing = await getPublicProductPrices();
  return NextResponse.json(pricing);
}
