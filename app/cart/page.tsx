import { CartPageClient } from "@/components/sections/cart-page-client";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Cosul meu" : "My Cart",
    locale === "ro"
      ? "Pagina de cos pentru AI Agent Builder, construita intr-un stil simplu de e-commerce cu sumar de comanda si servicii optionale."
      : "Cart page for AI Agent Builder, built in a simple e-commerce style with order summary and optional services.",
    "/cart",
    locale,
  );
}

export default async function CartPage() {
  const locale = await getServerLocale();
  return <CartPageClient locale={locale} />;
}
