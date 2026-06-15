import { AccountOverviewClient } from "@/components/account/account-overview-client";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Cont" : "Account",
    locale === "ro"
      ? "Dashboard de cont pentru profil, produse salvate, cos si oferte SyntraFlow."
      : "Account dashboard for SyntraFlow profile, saved products, cart, and offers.",
    "/account",
    locale,
  );
}

export default async function AccountPage() {
  const locale = await getServerLocale();

  return (
    <main className="pb-10">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Zona de cont" : "Account area"}
        currentLabel={locale === "ro" ? "Cont" : "Account"}
        title={locale === "ro" ? "Dashboard pentru produsele tale SyntraFlow" : "Dashboard for your SyntraFlow products"}
        description={
          locale === "ro"
            ? "Gestioneaza profilul, produsele salvate si pasii catre oferta pentru Custom AI Assistant sau pachetul complet."
            : "Manage your profile, saved products, and offer steps for Custom AI Assistant or the complete package."
        }
        highlights={locale === "ro" ? ["Profil", "Favorite", "Cos", "Oferta"] : ["Profile", "Favorites", "Cart", "Offer"]}
        compact
      />
      <AccountOverviewClient locale={locale} />
    </main>
  );
}
