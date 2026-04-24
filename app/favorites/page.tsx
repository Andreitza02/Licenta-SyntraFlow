import { FavoritesPageClient } from "@/components/sections/favorites-page-client";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Favorite" : "Favorites",
    locale === "ro"
      ? "Pagina simpla cu produsele marcate cu inima, pregatita pentru selectie rapida si mutare in cos."
      : "Simple page for products marked with the heart icon, ready for quick selection and cart flow.",
    "/favorites",
    locale,
  );
}

export default async function FavoritesPage() {
  const locale = await getServerLocale();
  return <FavoritesPageClient locale={locale} />;
}
