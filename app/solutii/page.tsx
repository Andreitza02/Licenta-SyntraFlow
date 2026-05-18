import { CTAButton } from "@/components/ui/cta-button";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { SolutionCard } from "@/components/ui/solution-card";
import { SolutionTabs } from "@/components/ui/solution-tabs";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Solutii" : "Solutions",
    locale === "ro"
      ? "Solutii SyntraFlow pentru conversatii mai rapide, lead-uri mai curate, demo-uri mai bine pregatite si automatizari care sustin vanzarea."
      : "SyntraFlow solutions for faster conversations, cleaner leads, better-prepared demos, and automations that support sales.",
    "/solutii",
    locale,
  );
}

export default async function SolutionsPage() {
  const locale = await getServerLocale();
  const { solutionTabs, solutions } = getSiteData(locale);

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Solutii" : "Solutions"}
        currentLabel={locale === "ro" ? "Solutii" : "Solutions"}
        title={locale === "ro"
          ? "Module care transforma interesul in conversatii, lead-uri si actiuni comerciale"
          : "Modules that turn interest into conversations, leads, and commercial actions"}
        description={locale === "ro"
          ? "Alege exact piesele care cresc conversia: raspuns instant, lead capture, FAQ inteligent, programari si integrari pregatite pentru echipa ta."
          : "Choose the exact pieces that improve conversion: instant replies, lead capture, smart FAQ, bookings, and integrations ready for your team."}
        highlights={locale === "ro"
          ? ["7 module", "Date validate", "CTA-uri clare", "Ready pentru integrari"]
          : ["7 modules", "Validated data", "Clear CTAs", "Integration-ready"]}
      />

      <section className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Structura modulara" : "Modular structure"}
            title={locale === "ro"
              ? "Construiesti pachetul potrivit pentru obiectivul tau comercial"
              : "Build the right package for your commercial goal"}
            description={locale === "ro"
              ? "Conversatia, formularele si automatizarile lucreaza impreuna ca sa transforme traficul in solicitari mai bine calificate."
              : "Conversation, forms, and automation work together to turn traffic into better-qualified requests."}
          />
          <SolutionTabs tabs={solutionTabs} locale={locale} />
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {solutions.map((item) => (
              <SolutionCard key={item.title} item={item} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-5 lg:grid-cols-3">
          {[
            locale === "ro"
              ? {
                  title: "Beneficii directe",
                  text: "Scazi timpul pana la primul raspuns si cresti sansele ca intentia sa devina demo, oferta sau vanzare.",
                }
              : {
                  title: "Direct benefits",
                  text: "Reduce time to first reply and increase the chances that intent becomes a demo, quote, or sale.",
                },
            locale === "ro"
              ? {
                  title: "Use case comercial",
                  text: "Ideal pentru businessuri care primesc cereri repetitive si vor sa le transforme in lead-uri mai clare.",
                }
              : {
                  title: "Commercial use case",
                  text: "Ideal for businesses that receive repetitive requests and want to turn them into clearer leads.",
                },
            locale === "ro"
              ? {
                  title: "CTA si next step",
                  text: "Fiecare modul impinge conversatia spre un pas masurabil: demo, oferta, contact sau escaladare.",
                }
              : {
                  title: "CTA and next step",
                  text: "Each module pushes the conversation toward a measurable step: demo, quote, contact, or escalation.",
                },
          ].map((item) => (
            <article key={item.title} className="panel-surface rounded-[1.75rem] p-6">
              <h2 className="text-xl font-semibold text-[#0b1f35]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
        <div className="section-shell mt-8">
          <CTAButton href="/contact">
            {locale === "ro" ? "Solicita o prezentare aplicata" : "Request a tailored walkthrough"}
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
