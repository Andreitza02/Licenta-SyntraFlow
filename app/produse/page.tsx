import ProductPage from "@/app/product/page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  return buildMetadata(
    isRomanian ? "Produse" : "Product",
    isRomanian
      ? "Produse SyntraFlow pentru branduri care vor AI, website si hosting intr-un ecosistem creat pentru conversie."
      : "SyntraFlow products for brands that want AI, website, and hosting in one conversion-focused ecosystem.",
    "/produse",
    locale,
  );
}

export default ProductPage;
