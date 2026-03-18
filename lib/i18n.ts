export type Locale = "ro" | "en";

export const LANGUAGE_COOKIE_NAME = "syntraflow-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ro" || value === "en";
}
