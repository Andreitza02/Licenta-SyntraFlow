import { AccountAdminClient } from "@/components/account/account-admin-client";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Admin" : "Admin",
    locale === "ro"
      ? "Pagina separata pentru administrarea clientilor, preturilor si istoricului SyntraFlow."
      : "Separate page for managing SyntraFlow customers, prices, and history.",
    "/account/admin",
    locale,
  );
}

export default async function AccountAdminPage() {
  const locale = await getServerLocale();

  return (
    <main className="pb-10">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Zona Admin" : "Admin area"}
        currentLabel="Admin"
        title={locale === "ro" ? "Administrare clienti si preturi" : "Customer and price administration"}
        description={
          locale === "ro"
            ? "Aici adminul vede doar instrumentele de administrare: produse, clienti, preturi si istoricul modificarilor."
            : "Here the admin sees only administration tools: products, customers, prices, and change history."
        }
        highlights={locale === "ro" ? ["Produse", "Clienti", "Preturi", "Istoric"] : ["Products", "Customers", "Prices", "History"]}
        compact
      />
      <AccountAdminClient locale={locale} />
    </main>
  );
}
