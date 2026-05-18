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
      ? "Industrii in care SyntraFlow poate reduce raspunsurile lente, califica cereri si transforma conversatiile repetitive in oportunitati."
      : "Industries where SyntraFlow can reduce slow replies, qualify requests, and turn repetitive conversations into opportunities.",
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
          ? "Fiecare industrie poate castiga timp, lead-uri mai bune si un prim contact mai profesionist"
          : "Every industry can gain time, better leads, and a more professional first contact"}
        description={locale === "ro"
          ? "SyntraFlow adapteaza mesajele, intrebarile si CTA-urile la intentia reala a clientului: rezervare, oferta, suport, demo sau consultanta."
          : "SyntraFlow adapts messages, questions, and CTAs to the customer’s real intent: booking, quote, support, demo, or consulting."}
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
                "Mesaje si intrebari adaptate pentru intentia reala din fiecare industrie.",
                "CTA-uri construite pentru rezervare, oferta, suport, demo sau consultanta.",
                "Date colectate strategic pentru un follow-up mai rapid si mai relevant.",
              ]
            : [
                "Messages and questions adapted to the real intent in each industry.",
                "CTAs built for booking, quote, support, demo, or consulting.",
                "Strategically collected data for faster and more relevant follow-up.",
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
