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
      ? "Industrii unde vindem rapid Custom AI Assistant, cu website si hosting ca produse complementare pentru clienti."
      : "Industries where we sell Custom AI Assistant fast, with website and hosting as complementary client products.",
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
        eyebrow={locale === "ro" ? "Clienti potriviti" : "Best-fit clients"}
        currentLabel={locale === "ro" ? "Industrii" : "Industries"}
        title={locale === "ro"
          ? "Industrii unde vindem rapid Custom AI Assistant"
          : "Industries where we can sell Custom AI Assistant fast"}
        description={locale === "ro"
          ? "Clientii cumpara mai usor cand vad un produs concret: un asistent AI care raspunde, califica cereri si creeaza un prim contact mai bun."
          : "Clients buy more easily when they see a concrete product: an AI assistant that replies, qualifies requests, and creates a better first contact."}
        highlights={locale === "ro"
          ? ["HoReCa", "Clinici", "Retail", "B2B"]
          : ["HoReCa", "Clinics", "Retail", "B2B"]}
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
                "Pozitionam Custom AI Assistant ca produs principal pentru fiecare industrie.",
                "Adaptam exemplele pe rezervare, oferta, suport, demo sau consultanta.",
                "Folosim website si hosting ca pachet complementar cand clientul are nevoie de prezenta completa.",
              ]
            : [
                "We position Custom AI Assistant as the main product for every industry.",
                "We adapt examples around booking, quote, support, demo, or consulting.",
                "We use website and hosting as a complementary package when the client needs a complete presence.",
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
            {locale === "ro" ? "Cere oferta pentru industria ta" : "Request an offer for your industry"}
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
