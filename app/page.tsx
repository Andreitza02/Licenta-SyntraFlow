import { HomePage } from "@/components/sections/home-page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Acasa" : "Home",
    locale === "ro"
      ? "SyntraFlow vinde produse digitale pentru clienti: Custom AI Assistant ca best seller, website premium si hosting pentru conversie."
      : "SyntraFlow sells digital products for clients: Custom AI Assistant as the best seller, premium websites, and conversion-focused hosting.",
    "/",
    locale,
  );
}

export default async function Page() {
  const locale = await getServerLocale();

  return <HomePage locale={locale} />;
}
