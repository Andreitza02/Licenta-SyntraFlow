import { ProductCatalogGrid } from "@/components/sections/product-catalog-grid";
import { CTAButton } from "@/components/ui/cta-button";
import { getServerLocale } from "@/lib/i18n-server";
import { getProductCatalog } from "@/lib/product-catalog";
import { buildMetadata } from "@/lib/site-config";
import { technologyItems, type TechnologyIconName } from "@/lib/technology-items";

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

function TechnologyIcon({ name }: { name: TechnologyIconName }) {
  const common = {
    className: "h-11 w-11",
    viewBox: "0 0 64 64",
    "aria-hidden": true,
  };

  switch (name) {
    case "openai":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path
            fill="#080b0f"
            d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.5-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07ZM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5ZM3.6 18.3a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.85-3.37v2.33a.08.08 0 0 1-.04.06l-4.83 2.8A4.5 4.5 0 0 1 3.6 18.3ZM2.34 7.9a4.49 4.49 0 0 1 2.37-1.98v5.68a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9Zm16.6 3.85-5.84-3.39L15.12 7.2a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.67a.79.79 0 0 0-.4-.67Zm2.01-3.02-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.68ZM8.31 12.86 6.29 11.7a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.79 2.76a.79.79 0 0 0-.39.68v6.72Zm1.1-2.36L12 8.99l2.61 1.51v3.01L12 15l-2.59-1.5v-3Z"
          />
        </svg>
      );
    case "claude":
      return (
        <svg {...common}>
          <g fill="none" stroke="#df7a57" strokeLinecap="round" strokeWidth="5.2">
            <path d="M32 7.5v18" />
            <path d="M32 38.5v18" />
            <path d="M7.5 32h18" />
            <path d="M38.5 32h18" />
            <path d="m14.7 14.7 12.7 12.7" />
            <path d="m36.6 36.6 12.7 12.7" />
            <path d="m49.3 14.7-12.7 12.7" />
            <path d="m27.4 36.6-12.7 12.7" />
            <path d="m23.1 8.9 5 15.4" />
            <path d="m35.9 39.7 5 15.4" />
            <path d="m55.1 23.1-15.4 5" />
            <path d="m24.3 35.9-15.4 5" />
            <path d="m40.9 8.9-5 15.4" />
            <path d="m28.1 39.7-5 15.4" />
            <path d="m55.1 40.9-15.4-5" />
            <path d="m24.3 28.1-15.4-5" />
          </g>
        </svg>
      );
    case "supabase":
      return (
        <svg {...common}>
          <path
            fill="#6ee57f"
            d="M36.8 5.6c1.9.7 3.1 2.5 3.1 4.5v17.1h12.6c4 0 6.2 4.7 3.7 7.8L29.8 58.2c-3 3.7-8.9 1.6-8.9-3.2V38.5H11.6c-4 0-6.2-4.7-3.7-7.8L31.6 7.1a4.8 4.8 0 0 1 5.2-1.5Z"
          />
        </svg>
      );
    case "elevenlabs":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="elevenlabs-gradient" x1="10" x2="54" y1="10" y2="54" gradientUnits="userSpaceOnUse">
              <stop stopColor="#101820" />
              <stop offset="1" stopColor="#5b6770" />
            </linearGradient>
          </defs>
          <rect width="13.8" height="42" x="16.8" y="11" fill="url(#elevenlabs-gradient)" rx="4" />
          <rect width="13.8" height="42" x="35" y="11" fill="url(#elevenlabs-gradient)" rx="4" />
        </svg>
      );
    case "vercel":
      return (
        <svg {...common}>
          <path fill="#080b0f" d="M32 10.5 58 53.5H6z" />
        </svg>
      );
    case "n8n":
      return (
        <svg {...common}>
          <g fill="none" stroke="#ff6f3d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
            <path d="M12 32h12" />
            <path d="M40 32h12" />
            <path d="m24 32 8-12 8 12-8 12-8-12Z" />
            <path d="M32 20h10" />
            <path d="M22 44h10" />
          </g>
          <g fill="#ff6f3d">
            <circle cx="12" cy="32" r="6.5" />
            <circle cx="24" cy="32" r="6.5" />
            <circle cx="32" cy="20" r="6.5" />
            <circle cx="40" cy="32" r="6.5" />
            <circle cx="32" cy="44" r="6.5" />
            <circle cx="52" cy="32" r="6.5" />
          </g>
          <g fill="#fff">
            <circle cx="12" cy="32" r="2" />
            <circle cx="24" cy="32" r="2" />
            <circle cx="32" cy="20" r="2" />
            <circle cx="40" cy="32" r="2" />
            <circle cx="32" cy="44" r="2" />
            <circle cx="52" cy="32" r="2" />
          </g>
        </svg>
      );
    case "voiceflow":
      return (
        <svg {...common}>
          <g fill="none" stroke="#27323a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4">
            <path d="M17 22c5.6 0 8.4 20 14 20s8.4-20 14-20" />
            <path d="M17 42c5.6 0 8.4-20 14-20s8.4 20 14 20" />
            <path d="M9 32h46" />
          </g>
          <g fill="#27323a">
            <circle cx="17" cy="22" r="4.2" />
            <circle cx="17" cy="42" r="4.2" />
            <circle cx="31" cy="32" r="4.2" />
            <circle cx="45" cy="22" r="4.2" />
            <circle cx="45" cy="42" r="4.2" />
          </g>
        </svg>
      );
    case "manychat":
      return (
        <svg {...common}>
          <path
            fill="#080b0f"
            d="M14 18.5h30a10 10 0 0 1 10 10v5.8a10 10 0 0 1-10 10H30.9L18.7 52a1.8 1.8 0 0 1-2.7-1.5v-6.2h-2a10 10 0 0 1-10-10v-5.8a10 10 0 0 1 10-10Z"
          />
          <g fill="#fff">
            <circle cx="22" cy="31.5" r="3" />
            <circle cx="31.8" cy="31.5" r="3" />
            <circle cx="41.6" cy="31.5" r="3" />
          </g>
        </svg>
      );
    case "make":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="make-gradient" x1="14" x2="50" y1="47" y2="17" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6d28ff" />
              <stop offset="0.48" stopColor="#b026ff" />
              <stop offset="1" stopColor="#ff25d8" />
            </linearGradient>
          </defs>
          <g fill="url(#make-gradient)" stroke="#080b0f" strokeWidth="1.2">
            <path d="M9.8 46.4 22 18.2a3 3 0 0 1 4.1-1.5l8.4 4-13 30.1-10.2-4.4a2.5 2.5 0 0 1-1.5-3.3Z" />
            <path d="M26.1 49.8 38 18.5a3 3 0 0 1 3.7-1.8l8.9 2.8-11.9 31.3-10.8 1.1a2.3 2.3 0 0 1-1.8-2.1Z" />
            <path d="M44.6 51.5V19a3 3 0 0 1 3-3h7.8a3 3 0 0 1 3 3v29.5a3 3 0 0 1-3 3H44.6Z" />
          </g>
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
      ? "Produse SyntraFlow pentru branduri care vor AI, website si hosting intr-un ecosistem creat pentru conversie."
      : "SyntraFlow products for brands that want AI, website, and hosting in one conversion-focused ecosystem.",
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
          title: "Vrei un website care vinde",
          text: "Alege Website Builder pentru o prezenta premium care sustine increderea si conversia.",
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
          title: "You need a website that sells",
          text: "Choose Website Builder for a premium presence that supports trust and conversion.",
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
                ? "AI, website si hosting intr-un ecosistem construit pentru conversie"
                : "AI, website, and hosting in one ecosystem built for conversion"}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
              {isRomanian
                ? "Alege modulul care iti aduce cel mai rapid impact: conversatii mai bune, prezenta digitala premium sau stabilitate dupa lansare."
                : "Choose the module that brings the fastest impact: better conversations, a premium digital presence, or stability after launch."}
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
            <div className="border-b border-[#d7e5f3] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(232,247,255,0.68))] p-6 md:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0f79ff]/14 bg-white/82 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0] shadow-[0_12px_24px_rgba(11,31,53,0.04)]">
                <span className="h-2 w-2 rounded-full bg-[#0f79ff]" />
                {isRomanian ? "Alege dupa obiectiv" : "Choose by objective"}
              </span>
              <h2 className="font-display mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#071d33] md:text-5xl">
                {isRomanian ? "Fiecare produs rezolva un pas concret" : "Each product solves a concrete step"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
                {isRomanian
                  ? "Porneste de la obiectivul comercial si ajungi rapid la produsul potrivit: conversatii, conversie sau stabilitate dupa lansare."
                  : "Start from the commercial goal and quickly reach the right product: conversations, conversion, or post-launch stability."}
              </p>
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
          <div className="overflow-hidden rounded-[2rem] border border-[#0d3358]/10 bg-white/78 py-7 shadow-[0_28px_74px_rgba(11,31,53,0.08)] backdrop-blur-xl md:py-8">
            <div className="px-5 md:px-8">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-4xl">
                  {isRomanian ? "Tehnologii pe care le folosim" : "Technologies we use"}
                </h2>
              </div>
            </div>

            <div className="tech-carousel mt-7" aria-label={isRomanian ? "Carusel tehnologii" : "Technology carousel"}>
              <div className="tech-carousel-viewport">
                <div className="tech-carousel-track">
                  {[...technologyItems, ...technologyItems].map((item, index) => {
                    const isDuplicate = index >= technologyItems.length;
                    const description = item.description[locale];
                    const tooltipId = isDuplicate ? undefined : `product-tech-tooltip-${item.icon}`;

                    return (
                      <article
                        key={`${item.name}-${index}`}
                        aria-describedby={tooltipId}
                        aria-hidden={isDuplicate}
                        aria-label={isDuplicate ? undefined : `${item.name}: ${description}`}
                        tabIndex={isDuplicate ? -1 : 0}
                        className="tech-logo-card group h-[8.75rem] w-[12rem] shrink-0 overflow-visible rounded-2xl border border-[#d7e5f3] bg-white/92 p-5 shadow-[0_16px_34px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:shadow-[0_24px_48px_rgba(11,31,53,0.12)] focus:outline-none focus-visible:-translate-y-1 focus-visible:border-[#0f79ff]/20 focus-visible:shadow-[0_24px_48px_rgba(11,31,53,0.12)]"
                      >
                        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                        <div className="relative z-[1] flex flex-col items-center gap-3 text-center">
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d7e5f3] bg-[#f8fcff] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 group-hover:scale-105">
                            <TechnologyIcon name={item.icon} />
                          </div>
                          <h3 className="tech-logo-name text-base font-semibold tracking-[-0.02em] text-[#071d33]">{item.name}</h3>
                        </div>
                        <p id={tooltipId} role="tooltip" className="tech-logo-tooltip">
                          {description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  ? "Nu vinzi doar module. Vinzi un parcurs de lansare care transforma alegerea intr-un livrabil pregatit pentru piata."
                  : "You do not sell only modules. You sell a launch path that turns the choice into a market-ready deliverable."}
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
