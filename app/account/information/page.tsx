import { AccountInformationClient } from "@/components/account/account-information-client";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Informatii personale" : "Personal information",
    locale === "ro"
      ? "Profil SyntraFlow actualizat pentru oferte mai clare, contact rapid si produse recomandate corect."
      : "Updated SyntraFlow profile for clearer offers, fast contact, and better product recommendations.",
    "/account/information",
    locale,
  );
}

export default async function AccountInformationPage() {
  const locale = await getServerLocale();

  return (
    <main className="pb-10">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Detalii profil" : "Profile details"}
        currentLabel={locale === "ro" ? "Informatii personale" : "Personal information"}
        title={locale === "ro" ? "Pastreaza profilul pregatit pentru oferta potrivita" : "Keep your profile ready for the right offer"}
        description={
          locale === "ro"
            ? "Datele de profil ajuta echipa sa recomande produsul corect: Custom AI Assistant, website, hosting sau pachet complet."
            : "Profile details help the team recommend the right product: Custom AI Assistant, website, hosting, or complete package."
        }
        highlights={locale === "ro" ? ["Nume", "Email", "Telefon", "Companie"] : ["Name", "Email", "Phone", "Company"]}
        compact
      />
      <AccountInformationClient locale={locale} />
    </main>
  );
}
