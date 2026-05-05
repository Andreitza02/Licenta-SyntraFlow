import ProductPage from "@/app/product/page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  return buildMetadata(
    isRomanian ? "Produse" : "Products",
    isRomanian
      ? "Catalogul SyntraFlow pentru Hosting, AI, automatizare interna si Website Builder, prezentate intr-un format comercial clar."
      : "The SyntraFlow catalog for Hosting, AI, internal automation, and Website Builder, presented in a clear commercial format.",
    "/produse",
    locale,
  );
}

export default ProductPage;
