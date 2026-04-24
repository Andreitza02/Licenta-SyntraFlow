import { CaseStudyCard } from "@/components/ui/case-study-card";
import { CTAButton } from "@/components/ui/cta-button";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Studii de caz" : "Case studies",
    locale === "ro"
      ? "Scenarii reale pentru restaurant, clinica, companie B2B si business online, prezentate ca exemple de utilizare pentru SyntraFlow."
      : "Real scenarios for restaurants, clinics, B2B companies, and online businesses, presented as SyntraFlow use cases.",
    "/studii-de-caz",
    locale,
  );
}

export default async function CaseStudiesPage() {
  const locale = await getServerLocale();
  const { caseStudies } = getSiteData(locale);

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Studii de caz" : "Case studies"}
        currentLabel={locale === "ro" ? "Studii de caz" : "Case studies"}
        title={locale === "ro"
          ? "Scenarii realiste care demonstreaza aplicabilitatea platformei"
          : "Realistic scenarios that demonstrate the platform’s applicability"}
        description={locale === "ro"
          ? "Aceste exemple fac legatura dintre interfata prezentata si probleme concrete din business: rezervari, programari, cereri de oferta si suport repetitiv."
          : "These examples connect the presented interface with concrete business problems: reservations, appointments, quote requests, and repetitive support."}
        highlights={locale === "ro"
          ? ["Restaurant", "Clinica", "Companie B2B", "Business online"]
          : ["Restaurant", "Clinic", "B2B company", "Online business"]}
      />

      <section className="py-14">
        <div className="section-shell grid gap-5 lg:grid-cols-2">
          {caseStudies.map((item) => (
            <CaseStudyCard key={item.title} item={item} locale={locale} />
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell">
          <div className="accent-border rounded-[2rem] bg-white p-8 md:p-10">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-4xl">
              {locale === "ro"
                ? "Fiecare scenariu poate fi adaptat si folosit ca demonstratie in sustinerea lucrarii."
                : "Each scenario can be adapted and used as a demonstration in the project presentation."}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
              {locale === "ro"
                ? "In practica, profesorii si evaluatorii inteleg mai usor valoarea unui sistem atunci cand il vad aplicat pe contexte concrete. Aceste studii de caz ofera exact acel cadru."
                : "In practice, professors and evaluators understand the value of a system more easily when they see it applied to concrete contexts. These case studies provide exactly that framework."}
            </p>
            <div className="mt-8">
              <CTAButton href="/contact">
                {locale === "ro" ? "Programeaza o prezentare ghidata" : "Schedule a guided walkthrough"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
