import { ProductCatalogGrid } from "@/components/sections/product-catalog-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { getServerLocale } from "@/lib/i18n-server";
import { getProductCatalog } from "@/lib/product-catalog";
import { buildMetadata } from "@/lib/site-config";

function TeamIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.8 19a5.2 5.2 0 0 1 10.4 0" />
      <path d="M15.4 6.2a3 3 0 0 1 0 5.6" />
      <path d="M17.4 14.2A4.8 4.8 0 0 1 21 19" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="19" r="1.55" />
      <circle cx="18" cy="19" r="1.55" />
      <path d="M2.5 4.5h2.8l2.2 10.1a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.75l1.35-6.15H6.25" />
    </svg>
  );
}

type ObjectiveIconName = "chat" | "hosting" | "website";

function ObjectiveIcon({ name }: { name: ObjectiveIconName }) {
  const common = {
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "chat":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 5.5h14v9H9.3L5 18.2V5.5Z" />
          <path d="M8.2 9h7.6" />
          <path d="M8.2 12h5" />
        </svg>
      );
    case "hosting":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 5.5h14v5H5z" />
          <path d="M5 13.5h14v5H5z" />
          <path d="M8 8h.01" />
          <path d="M8 16h.01" />
          <path d="M12 8h4" />
          <path d="M12 16h4" />
        </svg>
      );
    case "website":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4.5 6.5h15v11h-15z" />
          <path d="M4.5 9.5h15" />
          <path d="M7.4 13h4.2" />
          <path d="M7.4 15.5h8.8" />
        </svg>
      );
  }
}

export async function generateMetadata() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  return buildMetadata(
    isRomanian ? "Produse" : "Product",
    isRomanian
      ? "Catalogul SyntraFlow pentru AI, Website Builder si Hosting, prezentate intr-un format comercial clar."
      : "The SyntraFlow catalog for AI, Website Builder, and Hosting, presented in a clear commercial format.",
    "/product",
    locale,
  );
}

export default async function ProductPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";
  const catalogItems = getProductCatalog(locale);

  const decisionCards = isRomanian
    ? [
        {
          accent: "from-[#0f79ff] to-[#14b8c7]",
          icon: "chat" as const,
          label: "Produs 01",
          product: "Custom AI Assistant",
          title: "Vrei conversatii mai bune",
          text: "Alege asistentul AI pentru intrebari, calificare si captare rapida de intentie.",
        },
        {
          accent: "from-[#10a37f] to-[#13b5ba]",
          icon: "website" as const,
          label: "Produs 02",
          product: "Website Builder",
          title: "Vrei prezenta digitala",
          text: "Alege Website Builder pentru o pagina clara, credibila si usor de prezentat.",
        },
        {
          accent: "from-[#7c5cff] to-[#0f79ff]",
          icon: "hosting" as const,
          label: "Produs 03",
          product: "Website Hosting",
          title: "Vrei stabilitate dupa lansare",
          text: "Alege Hosting pentru mentenanta simpla si un website disponibil permanent.",
        },
      ]
    : [
        {
          accent: "from-[#0f79ff] to-[#14b8c7]",
          icon: "chat" as const,
          label: "Product 01",
          product: "Custom AI Assistant",
          title: "You need better conversations",
          text: "Choose the AI assistant for questions, qualification, and fast intent capture.",
        },
        {
          accent: "from-[#10a37f] to-[#13b5ba]",
          icon: "website" as const,
          label: "Product 02",
          product: "Website Builder",
          title: "You need a digital presence",
          text: "Choose Website Builder for a clear, credible page that is easy to present.",
        },
        {
          accent: "from-[#7c5cff] to-[#0f79ff]",
          icon: "hosting" as const,
          label: "Product 03",
          product: "Website Hosting",
          title: "You need stability after launch",
          text: "Choose Hosting for simpler maintenance and a website that stays available.",
        },
      ];

  const launchSteps = isRomanian
    ? [
        {
          title: "Selectie",
          text: "Pornesti cu produsul potrivit pentru obiectivul actual: AI, website, hosting sau un pachet combinat.",
        },
        {
          title: "Configurare",
          text: "Mesajele, fluxurile si structura paginii sunt adaptate la modul in care vrei sa vinzi sau sa prezinti.",
        },
        {
          title: "Lansare",
          text: "Produsul este pregatit ca experienta digitala coerenta, usor de extins cu module noi.",
        },
      ]
    : [
        {
          title: "Select",
          text: "Start with the product that fits the current goal: AI, website, hosting, or a combined package.",
        },
        {
          title: "Configure",
          text: "Messaging, flows, and page structure are adapted to how you want to sell or present.",
        },
        {
          title: "Launch",
          text: "The product is ready as a coherent digital experience that can expand with new modules.",
        },
      ];

  return (
    <main className="pb-12">
      <section className="pb-10 pt-32 md:pt-36">
        <div className="section-shell">
          <div className="max-w-5xl">
            <span className="eyebrow">{isRomanian ? "Produse SyntraFlow" : "SyntraFlow Products"}</span>
            <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#0b1f35] md:text-6xl">
              {isRomanian
                ? "Un catalog modern pentru AI, website si hosting intr-un singur ecosistem"
                : "A modern catalog for AI, website, and hosting in one ecosystem"}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
              {isRomanian
                ? "Pagina de produse este gandita ca o interfata de selectie rapida: vezi ce face fiecare modul, cat costa, cum se combina si ce pas are sens pentru proiectul tau."
                : "The product page is designed as a fast selection interface: see what each module does, how much it costs, how it combines, and what next step fits your project."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="#ai">{isRomanian ? "Vezi produsele" : "View products"}</CTAButton>
              <CTAButton href="/contact" variant="secondary">
                {isRomanian ? "Cere recomandare" : "Request a recommendation"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="section-shell">
          <div className="overflow-hidden rounded-[2.35rem] border border-[#0d3358]/10 bg-white/72 shadow-[0_28px_74px_rgba(11,31,53,0.09)] backdrop-blur-xl">
            <div className="grid gap-6 border-b border-[#d7e5f3] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(232,247,255,0.68))] p-6 md:p-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0f79ff]/14 bg-white/82 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0] shadow-[0_12px_24px_rgba(11,31,53,0.04)]">
                  <span className="h-2 w-2 rounded-full bg-[#0f79ff]" />
                  {isRomanian ? "Alege dupa obiectiv" : "Choose by objective"}
                </span>
                <h2 className="font-display mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#071d33] md:text-5xl">
                  {isRomanian ? "Fiecare produs rezolva un pas concret" : "Each product solves a concrete step"}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
                  {isRomanian
                    ? "Porneste de la obiectivul real al clientului si ajungi rapid la produsul potrivit: conversatii, prezenta digitala sau stabilitate dupa lansare."
                    : "Start from the real client objective and quickly reach the right product: conversations, digital presence, or post-launch stability."}
                </p>
              </div>

              <div className="rounded-[1.7rem] border border-[#09213a]/10 bg-[#071d33] p-5 text-white shadow-[0_22px_54px_rgba(7,29,51,0.18)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8bd7ff]">
                  {isRomanian ? "Selector rapid" : "Quick selector"}
                </p>
                <div className="mt-4 grid gap-3">
                  {[
                    isRomanian ? "1 obiectiv clar" : "1 clear objective",
                    isRomanian ? "1 produs recomandat" : "1 recommended product",
                    isRomanian ? "Extindere in pachet" : "Package expansion",
                  ].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-3 py-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-semibold text-[#071d33]">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-3">
              {decisionCards.map((card) => (
                <article
                  key={card.title}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-[#d7e5f3] bg-white/90 p-5 shadow-[0_16px_36px_rgba(11,31,53,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:shadow-[0_28px_58px_rgba(11,31,53,0.11)]"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.accent}`} />
                  <div className="flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-[0_16px_32px_rgba(15,121,255,0.14)]`}>
                      <ObjectiveIcon name={card.icon} />
                    </div>
                    <span className="rounded-full border border-[#d8e6f4] bg-[#f7fbff] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {card.product}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#071d33]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#0b58d0]">
                    <span>{isRomanian ? "Vezi modulul" : "View module"}</span>
                    <span className="transition duration-300 group-hover:translate-x-1">-&gt;</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductCatalogGrid items={catalogItems} locale={locale} />

      <section className="pb-10">
        <div className="section-shell">
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {isRomanian ? "Proces" : "Process"}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-4xl">
                {isRomanian ? "De la selectie la lansare fara pasi neclari" : "From selection to launch without unclear steps"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {isRomanian
                  ? "Pagina nu prezinta doar preturi. Arata cum se poate transforma alegerea intr-un livrabil concret, pregatit pentru prezentare si vanzare."
                  : "The page does not only show prices. It shows how the choice becomes a concrete deliverable, ready for presentation and sales."}
              </p>
            </div>

            <div className="grid gap-4">
              {launchSteps.map((step, index) => (
                <article key={step.title} className="rounded-xl border border-[#d7e5f3] bg-white/88 p-5 shadow-[0_14px_34px_rgba(11,31,53,0.06)]">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0b1f35] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0b1f35]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="section-shell">
          <article className="overflow-hidden rounded-2xl border border-[#0d3358]/10 bg-[#0b1f35] p-6 text-white shadow-[0_26px_70px_rgba(11,31,53,0.22)] md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8bd7ff]">
                  {isRomanian ? "Urmatorul pas" : "Next step"}
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                  {isRomanian
                    ? "Alege produsul potrivit sau construieste pachetul complet"
                    : "Choose the right product or build the complete package"}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72 md:text-base">
                  {isRomanian
                    ? "Poti incepe cu un singur produs si extinde ulterior in acelasi ecosistem. Daca nu esti sigur, discutam obiectivul si recomandam combinatia corecta."
                    : "You can start with one product and expand later in the same ecosystem. If you are not sure, we discuss the goal and recommend the right combination."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <CTAButton href="/contact" className="gap-2">
                  <TeamIcon />
                  <span>{isRomanian ? "Discuta cu echipa" : "Talk to the team"}</span>
                </CTAButton>
                <CTAButton href="/cart" variant="secondary" className="gap-2">
                  <CartIcon />
                  <span>{isRomanian ? "Vezi cosul" : "View cart"}</span>
                </CTAButton>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
