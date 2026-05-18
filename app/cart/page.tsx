import { CartPageClient } from "@/components/sections/cart-page-client";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Cosul meu" : "My Cart",
    locale === "ro"
      ? "Cosul SyntraFlow pregatit pentru alegerea pachetului AI potrivit, servicii optionale si pasul rapid spre comanda."
      : "SyntraFlow cart ready for choosing the right AI package, optional services, and a fast path to checkout.",
    "/cart",
    locale,
  );
}

export default async function CartPage() {
  const locale = await getServerLocale();
  return <CartPageClient locale={locale} />;
}
