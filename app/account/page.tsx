import { AccountAccessClient } from "@/components/sections/account-access-client";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Cont" : "Account",
    locale === "ro"
      ? "Pagina de cont pentru inregistrare, autentificare si afisarea username-ului in navigatie."
      : "Account page for registration, login, and showing the username in navigation.",
    "/account",
    locale,
  );
}

export default async function AccountPage() {
  const locale = await getServerLocale();

  return (
    <main>
      <AccountAccessClient locale={locale} />
    </main>
  );
}
