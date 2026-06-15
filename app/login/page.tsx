import { Suspense } from "react";

import { LoginPageClient } from "@/components/account/login-page-client";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Intra in cont" : "Sign in",
    locale === "ro"
      ? "Acces rapid la contul SyntraFlow pentru produse salvate, cos, oferta si preferinte."
      : "Fast access to the SyntraFlow account for saved products, cart, offer, and preferences.",
    "/login",
    locale,
  );
}

export default async function LoginPage() {
  const locale = await getServerLocale();

  return (
    <main className="pb-10">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Acces cont" : "Account access"}
        currentLabel={locale === "ro" ? "Intra in cont" : "Sign in"}
        title={locale === "ro" ? "Intra in cont pentru produse, cos si oferta" : "Sign in for products, cart, and offer"}
        description={
          locale === "ro"
            ? "Contul pastreaza produsele SyntraFlow aproape: Custom AI Assistant, Website Builder, Hosting si pasul rapid spre cerere."
            : "The account keeps SyntraFlow products close: Custom AI Assistant, Website Builder, Hosting, and a fast path to request."
        }
        highlights={locale === "ro" ? ["Acces rapid", "Produse salvate", "Cos pregatit", "Oferta clara"] : ["Fast access", "Saved products", "Ready cart", "Clear offer"]}
        compact
      />
      <Suspense fallback={null}>
        <LoginPageClient locale={locale} />
      </Suspense>
    </main>
  );
}
