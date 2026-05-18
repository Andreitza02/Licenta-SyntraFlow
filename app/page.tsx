import { HomePage } from "@/components/sections/home-page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Acasa" : "Home",
    locale === "ro"
      ? "SyntraFlow transforma website-ul, AI-ul si automatizarile intr-un sistem comercial care capteaza lead-uri, raspunde rapid si accelereaza conversia."
      : "SyntraFlow turns websites, AI, and automations into a commercial system that captures leads, replies fast, and accelerates conversion.",
    "/",
    locale,
  );
}

export default async function Page() {
  const locale = await getServerLocale();

  return <HomePage locale={locale} />;
}
