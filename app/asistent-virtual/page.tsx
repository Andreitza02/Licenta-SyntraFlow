import { ProductCatalogCard } from "@/components/sections/product-catalog-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { getServerLocale } from "@/lib/i18n-server";
import { getProductCatalog } from "@/lib/product-catalog";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

type ValueCard = {
  title: string;
  text: string;
};

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Custom AI Assistant" : "Custom AI Assistant",
    locale === "ro"
      ? "Custom AI Assistant este best seller-ul SyntraFlow: produsul AI vandut pentru raspuns instant, lead-uri calificate si demo live."
      : "Custom AI Assistant is SyntraFlow's best seller: the AI product sold for instant replies, qualified leads, and live demos.",
    "/asistent-virtual",
    locale,
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12" />
      <path d="m11.5 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4.5 10.4 3.2 3.2 7.8-8.2" />
    </svg>
  );
}

function ValueCard({ item }: { item: ValueCard }) {
  return (
    <article className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_16px_36px_rgba(11,31,53,0.06)]">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[1rem] bg-[#eef6ff] text-[#0b58d0]">
        <CheckIcon />
      </span>
      <h2 className="mt-4 text-xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
    </article>
  );
}

export default async function AssistantPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";
  const { faqItems } = getSiteData(locale);
  const bestSeller = getProductCatalog(locale).find((item) => item.id === "ai");

  const valueCards: ValueCard[] = isRomanian
    ? [
        {
          title: "Se vinde usor pentru ca se vede imediat",
          text: "Clientul apasa Try me, vede raspunsul instant si intelege rapid de ce produsul are valoare.",
        },
        {
          title: "Califica lead-ul inainte de discutia umana",
          text: "Asistentul strange context, intentie, date de contact si urmatorul pas pentru echipa de vanzari.",
        },
        {
          title: "Poate deveni baza pachetului complet",
          text: "Il combinam cu Website Builder si Hosting cand clientul vrea prezenta digitala completa.",
        },
      ]
    : [
        {
          title: "Easy to sell because it is visible instantly",
          text: "The client clicks Try me, sees the instant reply, and quickly understands why the product has value.",
        },
        {
          title: "Qualifies the lead before the human conversation",
          text: "The assistant captures context, intent, contact details, and the next step for the sales team.",
        },
        {
          title: "Can become the base of the complete package",
          text: "We combine it with Website Builder and Hosting when the client needs a full digital presence.",
        },
      ];

  return (
    <main className="page-gradient-shell overflow-hidden pb-12">
      <section className="relative pb-12 pt-32 md:pt-36">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div className="max-w-4xl">
              <p className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#0f79ff]" />
                {isRomanian ? "Best seller SyntraFlow" : "SyntraFlow best seller"}
              </p>
              <h1 className="font-display mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#06192c] md:text-6xl lg:text-7xl">
                {isRomanian
                  ? "Custom AI Assistant este produsul principal pe care il vindem clientilor."
                  : "Custom AI Assistant is the main product we sell to clients."}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#365a78] md:text-lg">
                {isRomanian
                  ? "Il vindem ca punct de contact premium: raspuns instant, lead-uri calificate, demo live si un traseu rapid spre oferta sau cos."
                  : "We sell it as a premium contact layer: instant replies, qualified leads, live demo, and a fast path to quote or cart."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/product#ai" className="gap-2">
                  <span>{isRomanian ? "Cumpara AI Assistant" : "Buy AI Assistant"}</span>
                  <ArrowIcon />
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" className="bg-white">
                  {isRomanian ? "Cere demo si oferta" : "Request demo and quote"}
                </CTAButton>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                {(isRomanian
                  ? ["Best seller", "Try me live", "Lead-uri calificate", "Pachet complet"]
                  : ["Best seller", "Try me live", "Qualified leads", "Complete package"]
                ).map((item) => (
                  <span key={item} className="rounded-full border border-[#0d3358]/10 bg-white/74 px-4 py-2 text-sm font-semibold text-[#0d3358] shadow-[0_12px_28px_rgba(11,31,53,0.05)] backdrop-blur-md">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {bestSeller ? <ProductCatalogCard item={bestSeller} locale={locale} /> : null}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell grid gap-5 lg:grid-cols-3">
          {valueCards.map((item) => (
            <ValueCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="overflow-hidden rounded-[2rem] border border-[#d8e6f4] bg-white/86 shadow-[0_24px_64px_rgba(11,31,53,0.08)] backdrop-blur-xl">
            <div className="border-b border-[#d7e5f3] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(232,247,255,0.72))] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {isRomanian ? "Functionalitati care vand" : "Features that sell"}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-normal text-[#0b1f35] md:text-4xl">
                {isRomanian ? "Produsul explica, raspunde si impinge clientul spre actiune." : "The product explains, replies, and moves the client toward action."}
              </h2>
            </div>

            <ul className="grid gap-3 p-5 md:p-6">
              {(isRomanian
                ? [
                    "Raspunsuri rapide despre oferta, produse, pret si urmatorul pas.",
                    "Colectare de nume, email, telefon, companie si obiectiv comercial.",
                    "CTA-uri contextuale pentru Try me, demo, oferta, contact sau cos.",
                    "Handoff catre echipa cand intrebarea are nevoie de consultanta.",
                    "Ton coerent si experienta premium pe website sau landing page.",
                  ]
                : [
                    "Fast answers about offer, products, price, and next step.",
                    "Captures name, email, phone, company, and commercial goal.",
                    "Contextual CTAs for Try me, demo, quote, contact, or cart.",
                    "Handoff to the team when the request needs consulting.",
                    "Consistent tone and premium experience on website or landing page.",
                  ]).map((item) => (
                <li key={item} className="flex gap-3 rounded-[1.15rem] border border-[#e1edf8] bg-[#fbfdff] px-4 py-3 text-sm leading-7 text-[#0b1f35]">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0f79ff] text-white">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-[#0d3358]/10 bg-[#0b1f35] p-6 text-white shadow-[0_26px_70px_rgba(11,31,53,0.22)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8bd7ff]">
              {isRomanian ? "Pachet de vanzare" : "Sales package"}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-normal text-white">
              {isRomanian ? "AI Assistant in fata, website si hosting ca extensie." : "AI Assistant up front, website and hosting as extension."}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/76">
              {isRomanian
                ? "Cand clientul vrea mai mult decat un asistent, il ducem spre pachet complet: pagina de prezentare, hosting si automatizari."
                : "When the client needs more than an assistant, we move toward the complete package: presentation page, hosting, and automation."}
            </p>
            <div className="mt-6 grid gap-3">
              {["Custom AI Assistant", "Website Builder", "Website Hosting"].map((item) => (
                <div key={item} className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <CTAButton href="/product" variant="secondary" className="bg-white text-[#0b1f35]">
                {isRomanian ? "Vezi produsele" : "View products"}
              </CTAButton>
            </div>
          </article>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">FAQ</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-normal text-[#0b1f35] md:text-4xl">
              {isRomanian ? "Intrebari care ajuta clientul sa cumpere mai repede." : "Questions that help the client buy faster."}
            </h2>
          </div>
          <CTAButton href="/contact" variant="secondary" className="h-fit bg-white">
            {isRomanian ? "Cere oferta pentru best seller" : "Request best seller quote"}
          </CTAButton>
        </div>
        <div className="section-shell mt-8">
          <FAQAccordion items={faqItems} locale={locale} />
        </div>
      </section>
    </main>
  );
}
