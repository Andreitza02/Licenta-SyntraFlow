import "server-only";

import { cookies } from "next/headers";

import { isLocale, LANGUAGE_COOKIE_NAME, type Locale } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;

  return isLocale(value) ? value : "ro";
}
