import { AccountOverviewClient } from "@/components/account/account-overview-client";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Cont" : "Account",
    locale === "ro"
      ? "Dashboard de cont pentru profil, securitate si preferinte SyntraFlow."
      : "Account dashboard for SyntraFlow profile, security, and preferences.",
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
        title={locale === "ro" ? "Dashboard pentru profil, securitate si preferinte" : "Dashboard for profile, security, and preferences"}
        description={
          locale === "ro"
            ? "Gestioneaza datele personale si setarile importante intr-o interfata care urmeaza stilul SyntraFlow."
            : "Manage personal details and key settings in an interface that follows the SyntraFlow style."
        }
        highlights={locale === "ro" ? ["Profil", "Securitate", "Preferinte", "Dashboard"] : ["Profile", "Security", "Preferences", "Dashboard"]}
        compact
      />
      <AccountOverviewClient locale={locale} />
    </main>
  );
}
