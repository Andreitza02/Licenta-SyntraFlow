import ProductPage from "@/app/product/page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  return buildMetadata(
    isRomanian ? "Produse" : "Product",
    isRomanian
      ? "Produsele SyntraFlow vandute catre clienti: Custom AI Assistant ca best seller, Website Builder si Hosting pentru pachet complet."
      : "SyntraFlow products sold to clients: Custom AI Assistant as the best seller, Website Builder, and Hosting for a complete package.",
    "/produse",
    locale,
  );
}

export default ProductPage;
