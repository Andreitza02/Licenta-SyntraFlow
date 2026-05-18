import { FavoritesPageClient } from "@/components/sections/favorites-page-client";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Favorite" : "Favorites",
    locale === "ro"
      ? "Produsele SyntraFlow salvate pentru o selectie rapida si un pachet final mai usor de construit."
      : "Saved SyntraFlow products for faster selection and an easier final package build.",
    "/favorites",
    locale,
  );
}

export default async function FavoritesPage() {
  const locale = await getServerLocale();
  return <FavoritesPageClient locale={locale} />;
}
