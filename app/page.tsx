import { HomePage } from "@/components/sections/home-page";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Acasa" : "Home",
    locale === "ro"
      ? "SyntraFlow prezinta o platforma web inteligenta cu asistent virtual bazat pe inteligenta artificiala pentru automatizarea si optimizarea proceselor de interactiune cu clientii."
      : "SyntraFlow presents a smart web platform with an AI virtual assistant built to automate and optimize customer interaction processes.",
    "/",
    locale,
  );
}

export default async function Page() {
  const locale = await getServerLocale();

  return <HomePage locale={locale} />;
}
