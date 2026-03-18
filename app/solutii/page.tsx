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
      ? "Modulele functionale SyntraFlow: asistent virtual, lead capture, FAQ inteligent, programari si integrari operationale."
      : "SyntraFlow functional modules: virtual assistant, lead capture, smart FAQ, bookings, and operational integrations.",
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
          ? "Module functionale construite pentru conversatie, captare de date si executie"
          : "Functional modules built for conversation, data capture, and execution"}
        description={locale === "ro"
          ? "Fiecare solutie este prezentata ca un bloc reutilizabil, cu beneficii clare, use case relevant si rol bine definit in arhitectura platformei."
          : "Each solution is presented as a reusable block, with clear benefits, a relevant use case, and a well-defined role in the platform architecture."}
        highlights={locale === "ro"
          ? ["7 module", "Date validate", "CTA-uri clare", "Ready pentru integrari"]
          : ["7 modules", "Validated data", "Clear CTAs", "Integration-ready"]}
      />

      <section className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Structura modulara" : "Modular structure"}
            title={locale === "ro"
              ? "Solutiile pot fi combinate in functie de tipul companiei si de maturitatea digitala"
              : "The solutions can be combined based on company type and digital maturity"}
            description={locale === "ro"
              ? "Acestea nu functioneaza izolat. Conversatia, formularele si automatizarile sunt gandite ca parti ale aceluiasi traseu digital."
              : "They do not work in isolation. Conversation, forms, and automation are designed as parts of the same digital journey."}
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
                  text: "Scade timpul de raspuns initial si creste consistenta in comunicarea de pre-vanzare sau suport.",
                }
              : {
                  title: "Direct benefits",
                  text: "It reduces initial response time and increases consistency in pre-sales or support communication.",
                },
            locale === "ro"
              ? {
                  title: "Use case operational",
                  text: "Ideal pentru website-uri care primesc cereri repetitive si au nevoie de o triere rapida a intentiei.",
                }
              : {
                  title: "Operational use case",
                  text: "Ideal for websites that receive repetitive requests and need quick intent triage.",
                },
            locale === "ro"
              ? {
                  title: "CTA si next step",
                  text: "Fiecare modul propune un pas clar: demo, solicitare de oferta, contact sau escaladare catre operator.",
                }
              : {
                  title: "CTA and next step",
                  text: "Each module proposes a clear next action: demo, quote request, contact, or escalation to an operator.",
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
