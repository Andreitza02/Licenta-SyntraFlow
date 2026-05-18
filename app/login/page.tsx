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
      ? "Acces rapid la contul SyntraFlow pentru profil, preferinte si o experienta digitala mai personalizata."
      : "Fast access to the SyntraFlow account for profile, preferences, and a more personalized digital experience.",
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
        title={locale === "ro" ? "Intra in cont sau creeaza un profil nou" : "Sign in or create a new profile"}
        description={
          locale === "ro"
            ? "Accesul la cont pastreaza experienta SyntraFlow pregatita pentru preferinte, profil si interactiuni mai relevante."
            : "Account access keeps the SyntraFlow experience ready for preferences, profile, and more relevant interactions."
        }
        highlights={locale === "ro" ? ["Acces rapid", "Profil personalizat", "Preferinte salvate", "Experienta fluida"] : ["Fast access", "Personalized profile", "Saved preferences", "Smooth experience"]}
        compact
      />
      <Suspense fallback={null}>
        <LoginPageClient locale={locale} />
      </Suspense>
    </main>
  );
}
