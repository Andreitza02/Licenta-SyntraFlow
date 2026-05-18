import { AccountInformationClient } from "@/components/account/account-information-client";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Informatii personale" : "Personal information",
    locale === "ro"
      ? "Profil SyntraFlow actualizat pentru o experienta mai relevanta, mai rapida si mai bine personalizata."
      : "Updated SyntraFlow profile for a more relevant, faster, and better-personalized experience.",
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
        title={locale === "ro" ? "Pastreaza profilul pregatit pentru interactiuni mai bune" : "Keep the profile ready for better interactions"}
        description={
          locale === "ro"
            ? "Actualizeaza datele de profil folosite de dashboard si de experienta cu asistentul."
            : "Update the profile details used by the dashboard and assistant experience."
        }
        highlights={locale === "ro" ? ["Nume", "Email", "Telefon", "Organizatie"] : ["Name", "Email", "Phone", "Organization"]}
        compact
      />
      <AccountInformationClient locale={locale} />
    </main>
  );
}
