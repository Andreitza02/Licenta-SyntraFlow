import ProductPage from "@/app/product/page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  return buildMetadata(
    isRomanian ? "Produse" : "Product",
    isRomanian
      ? "Catalogul SyntraFlow pentru AI, Website Builder si Hosting, prezentate intr-un format comercial clar."
      : "The SyntraFlow catalog for AI, Website Builder, and Hosting, presented in a clear commercial format.",
    "/produse",
    locale,
  );
}

export default ProductPage;
