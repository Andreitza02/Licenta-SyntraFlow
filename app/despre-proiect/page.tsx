import { CTAButton } from "@/components/ui/cta-button";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

type IconName = "calendar" | "team" | "pin" | "building" | "website" | "server" | "bot" | "handshake";

function AboutIcon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="3" />
          <path d="M8 3.5v3" />
          <path d="M16 3.5v3" />
          <path d="M4 10h16" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.8 19a5.2 5.2 0 0 1 10.4 0" />
          <path d="M15.5 10.5a2.5 2.5 0 1 0 0-5" />
          <path d="M16.5 14.2a4.3 4.3 0 0 1 3.7 4.8" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M5 20V5.8A1.8 1.8 0 0 1 6.8 4h10.4A1.8 1.8 0 0 1 19 5.8V20" />
          <path d="M3.5 20h17" />
          <path d="M9 8h1" />
          <path d="M14 8h1" />
          <path d="M9 12h1" />
          <path d="M14 12h1" />
          <path d="M10 20v-4h4v4" />
        </svg>
      );
    case "website":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="3" />
          <path d="M4 9h16" />
          <path d="M8 13h4.5" />
          <path d="M8 16h8" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="6" rx="2" />
          <rect x="5" y="14" width="14" height="6" rx="2" />
          <path d="M8 7h.01" />
          <path d="M8 17h.01" />
          <path d="M12 10v4" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <path d="M12 6V3.5" />
          <rect x="5" y="6" width="14" height="11" rx="4" />
          <path d="M9 11.5h.01" />
          <path d="M15 11.5h.01" />
          <path d="M9.5 17v2" />
          <path d="M14.5 17v2" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="m8.5 12.5 2.2 2.2a2.2 2.2 0 0 0 3.1 0l2.7-2.7" />
          <path d="m7.5 11.5 2.8-2.8a2 2 0 0 1 2.8 0l.9.9" />
          <path d="M3.5 12.2 7 8.7l3.8 3.8" />
          <path d="m20.5 12.2-3.5-3.5-3 3" />
        </svg>
      );
  }
}

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Despre SyntraFlow" : "About SyntraFlow",
    locale === "ro"
      ? "Despre SyntraFlow: activitate inceputa in 2023 cu website si hosting, extinsa din 2024 catre Custom AI Agents."
      : "About SyntraFlow: activity started in 2023 with websites and hosting, then expanded in 2024 toward Custom AI Agents.",
    "/despre-proiect",
    locale,
  );
}

const content = {
  ro: {
    eyebrow: "Despre SyntraFlow",
    title: "SyntraFlow construieste produse digitale pentru clienti care vor prezenta online, hosting stabil si asistenti AI personalizati.",
    description:
      "Activitatea a inceput in 2023 cu proiecte de website si hosting. Din 2024, SyntraFlow s-a extins catre Custom AI Agents: asistenti digitali construiti pentru conversatii, lead capture, suport si demo-uri comerciale.",
    stats: [
      { value: "2023", label: "start website si hosting" },
      { value: "2024", label: "start Custom AI Agents" },
      { value: "1-5", label: "persoane implicate in proiecte" },
    ],
    facts: [
      { icon: "calendar", label: "An infiintare activitate", value: "2023" },
      { icon: "team", label: "Numar de angajati", value: "1-5 persoane implicate, in functie de proiect" },
      { icon: "pin", label: "Locatie", value: "Romania, cu livrare remote pentru clienti" },
      { icon: "building", label: "Sediu operational", value: "Remote-first / online, pregatit pentru proiecte digitale" },
    ],
    projectsTitle: "Proiecte si servicii livrate",
    projectsDescription:
      "SyntraFlow a crescut natural de la prezenta online la produse AI vandabile. Fiecare proiect este gandit sa ajute clientul sa arate mai profesionist, sa raspunda mai repede si sa vanda mai clar.",
    projects: [
      {
        icon: "website",
        title: "Website-uri de prezentare",
        text: "Din 2023 am construit website-uri pentru clienti care au nevoie de imagine clara, pagini rapide si o prezenta online credibila.",
      },
      {
        icon: "server",
        title: "Hosting si mentenanta",
        text: "Am oferit configurare, lansare si suport pentru website-uri, astfel incat proiectele sa ramana stabile dupa publicare.",
      },
      {
        icon: "bot",
        title: "Custom AI Agents",
        text: "Din 2024 am inceput dezvoltarea de agenti AI personalizati pentru raspuns instant, lead capture, FAQ si suport comercial.",
      },
      {
        icon: "handshake",
        title: "Implementari pentru parteneri",
        text: "Am construit experiente AI adaptate pentru nevoi reale, inclusiv asistenti operationali si module digitale pentru clienti.",
      },
    ],
    timelineTitle: "Evolutie",
    timeline: [
      {
        year: "2023",
        title: "Website si hosting",
        text: "SyntraFlow a pornit cu proiecte de website, landing page, configurare hosting si suport pentru lansare online.",
      },
      {
        year: "2024",
        title: "Custom AI Agents",
        text: "Focusul s-a extins catre agenti AI personalizati, construiti pentru conversatii, automatizare si interactiuni comerciale.",
      },
      {
        year: "Acum",
        title: "Produse digitale vandabile",
        text: "Oferta principala este Custom AI Assistant, completata de Website Builder si Hosting pentru clienti care vor pachet complet.",
      },
    ],
    ctaTitle: "Vrei sa vezi ce poate construi SyntraFlow pentru clientul tau?",
    ctaText: "Pornim de la obiectivul clientului si alegem produsul potrivit: website, hosting sau Custom AI Assistant.",
    primaryCta: "Vezi produsele",
    secondaryCta: "Cere oferta",
  },
  en: {
    eyebrow: "About SyntraFlow",
    title: "SyntraFlow builds digital products for clients who need online presence, stable hosting, and custom AI assistants.",
    description:
      "The activity started in 2023 with website and hosting projects. In 2024, SyntraFlow expanded into Custom AI Agents: digital assistants built for conversations, lead capture, support, and commercial demos.",
    stats: [
      { value: "2023", label: "website and hosting start" },
      { value: "2024", label: "Custom AI Agents start" },
      { value: "1-5", label: "people involved in projects" },
    ],
    facts: [
      { icon: "calendar", label: "Activity started", value: "2023" },
      { icon: "team", label: "Team size", value: "1-5 people involved, depending on the project" },
      { icon: "pin", label: "Location", value: "Romania, with remote delivery for clients" },
      { icon: "building", label: "Operational office", value: "Remote-first / online, built for digital projects" },
    ],
    projectsTitle: "Projects and services delivered",
    projectsDescription:
      "SyntraFlow grew naturally from online presence to sellable AI products. Every project is built to help the client look more professional, reply faster, and sell more clearly.",
    projects: [
      {
        icon: "website",
        title: "Presentation websites",
        text: "Since 2023 we have built websites for clients who need clear positioning, fast pages, and a credible online presence.",
      },
      {
        icon: "server",
        title: "Hosting and maintenance",
        text: "We offered setup, launch, and support for websites so projects stay stable after publishing.",
      },
      {
        icon: "bot",
        title: "Custom AI Agents",
        text: "Since 2024 we started building custom AI agents for instant replies, lead capture, FAQ, and commercial support.",
      },
      {
        icon: "handshake",
        title: "Partner implementations",
        text: "We built AI experiences adapted to real needs, including operational assistants and digital modules for clients.",
      },
    ],
    timelineTitle: "Evolution",
    timeline: [
      {
        year: "2023",
        title: "Website and hosting",
        text: "SyntraFlow started with websites, landing pages, hosting setup, and online launch support.",
      },
      {
        year: "2024",
        title: "Custom AI Agents",
        text: "The focus expanded toward custom AI agents built for conversations, automation, and commercial interactions.",
      },
      {
        year: "Now",
        title: "Sellable digital products",
        text: "The main offer is Custom AI Assistant, completed by Website Builder and Hosting for clients who want the full package.",
      },
    ],
    ctaTitle: "Want to see what SyntraFlow can build for your client?",
    ctaText: "We start from the client's goal and choose the right product: website, hosting, or Custom AI Assistant.",
    primaryCta: "View products",
    secondaryCta: "Request an offer",
  },
} as const;

export default async function AboutProjectPage() {
  const locale = await getServerLocale();
  const copy = content[locale];
  const profileHighlights = locale === "ro"
    ? ["Website si hosting din 2023", "Custom AI Agents din 2024", "Remote-first, livrare rapida"]
    : ["Websites and hosting since 2023", "Custom AI Agents since 2024", "Remote-first, fast delivery"];

  return (
    <main className="page-gradient-shell overflow-hidden pb-12">
      <section className="relative pb-12 pt-32 md:pt-36">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/20 to-transparent" aria-hidden="true" />
        <div className="section-shell relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-center">
            <div className="max-w-4xl">
              <p className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#0f79ff]" />
                {copy.eyebrow}
              </p>
              <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#06192c] md:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg md:leading-9">
                {copy.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {profileHighlights.map((item) => (
                  <span key={item} className="rounded-full border border-[#d8e6f4] bg-white/76 px-4 py-2 text-sm font-semibold text-[#0b1f35] shadow-[0_12px_28px_rgba(11,31,53,0.04)]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/product" className="w-full sm:w-auto">
                  {copy.primaryCta}
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" className="w-full bg-white sm:w-auto">
                  {copy.secondaryCta}
                </CTAButton>
              </div>
            </div>

            <aside className="overflow-hidden rounded-[2rem] border border-[#0f79ff]/14 bg-white/86 shadow-[0_28px_78px_rgba(15,121,255,0.12)] backdrop-blur-xl">
              <div className="bg-[linear-gradient(135deg,#0b1f35_0%,#0f79ff_58%,#13b5ba_100%)] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">SyntraFlow profile</p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-normal text-white">
                  {locale === "ro" ? "Companie digitala, construita pentru proiecte rapide." : "Digital company built for fast projects."}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/76">
                  {locale === "ro"
                    ? "Website, hosting, asistenti AI si suport pentru clienti care vor prezenta online clara."
                    : "Websites, hosting, AI assistants, and support for clients who need a clear online presence."}
                </p>
              </div>

              <div className="grid gap-3 p-4 md:p-5">
                {copy.stats.map((item) => (
                  <div key={item.label} className="rounded-[1.35rem] border border-[#d8e6f4] bg-[#f8fcff] p-4">
                    <p className="font-display text-3xl font-semibold text-[#0b1f35]">{item.value}</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {copy.facts.map((item) => (
              <article key={item.label} className="group rounded-[1.55rem] border border-[#d8e6f4] bg-white/82 p-5 shadow-[0_18px_42px_rgba(11,31,53,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/24 hover:bg-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0f79ff]/14 bg-[#eef6ff] text-[#0b58d0] transition duration-300 group-hover:bg-[#0f79ff] group-hover:text-white">
                  <AboutIcon name={item.icon} />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.label}</p>
                <p className="mt-2 text-base font-semibold leading-7 text-[#0b1f35]">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#13b5ba]" />
                {locale === "ro" ? "Portofoliu" : "Portfolio"}
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-normal text-[#0b1f35] md:text-5xl">
                {copy.projectsTitle}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">{copy.projectsDescription}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {copy.projects.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-[#d8e6f4] bg-white/88 shadow-[0_18px_42px_rgba(11,31,53,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/22 hover:bg-white hover:shadow-[0_28px_62px_rgba(11,31,53,0.11)]">
                  <div className="h-1.5 bg-[linear-gradient(90deg,#0f79ff,#13b5ba)]" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b1f35] text-white transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#0f79ff]">
                        <AboutIcon name={item.icon} />
                      </span>
                      <span className="rounded-full border border-[#13b5ba]/18 bg-[#ecfeff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
                        SyntraFlow
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
