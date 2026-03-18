import { CTAButton } from "@/components/ui/cta-button";
import { IndustryCard } from "@/components/ui/industry-card";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Industrii" : "Industries",
    locale === "ro"
      ? "Exemple de domenii in care SyntraFlow poate automatiza FAQ-uri, lead capture, rezervari si fluxuri repetitive."
      : "Examples of industries where SyntraFlow can automate FAQs, lead capture, bookings, and repetitive workflows.",
    "/industrii",
    locale,
  );
}

export default async function IndustriesPage() {
  const locale = await getServerLocale();
  const { industries } = getSiteData(locale);

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Domenii de utilizare" : "Use cases"}
        currentLabel={locale === "ro" ? "Industrii" : "Industries"}
        title={locale === "ro"
          ? "Platforma este usor de adaptat pentru industrii cu nevoi diferite, dar procese repetitive similare"
          : "The platform is easy to adapt for industries with different needs but similar repetitive processes"}
        description={locale === "ro"
          ? "Logica ramane aceeasi: raspuns rapid, colectare de date, validare si directionare catre un flux clar. Diferenta sta in vocabular, reguli si tipul informatiilor cerute."
          : "The logic stays the same: fast response, data collection, validation, and routing into a clear flow. The difference is in the vocabulary, rules, and requested information."}
        highlights={locale === "ro"
          ? ["B2B", "Servicii", "Retail", "Canale digitale"]
          : ["B2B", "Services", "Retail", "Digital channels"]}
      />

      <section className="py-14">
        <div className="section-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((item) => (
            <IndustryCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-5 lg:grid-cols-3">
          {(locale === "ro"
            ? [
                "Personalizare a intrebarilor in functie de industrie si tip de solicitare.",
                "Ajustarea CTA-urilor pentru rezervare, oferta, suport sau consultanta.",
                "Adaptarea campurilor colectate in functie de contextul business-ului.",
              ]
            : [
                "Questions can be customized based on the industry and request type.",
                "CTAs can be adjusted for booking, quotes, support, or consultation.",
                "Collected fields can be adapted to the business context.",
              ]).map((item, index) => (
            <article key={item} className="panel-surface rounded-[1.75rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "Principiu" : "Principle"} 0{index + 1}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted">{item}</p>
            </article>
          ))}
        </div>
        <div className="section-shell mt-8">
          <CTAButton href="/contact">
            {locale === "ro" ? "Discuta un scenariu pentru compania ta" : "Discuss a scenario for your company"}
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
