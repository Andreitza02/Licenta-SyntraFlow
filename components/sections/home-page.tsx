"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { useToast } from "@/components/providers/toast-provider";
import { CTAButton } from "@/components/ui/cta-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import type { Locale } from "@/lib/i18n";
import type {
  ArchitectureLayer,
  BenefitItem,
  CaseStudyItem,
  IndustryItem,
  SolutionItem,
  SolutionTab,
  StatItem,
  WorkflowStep,
} from "@/lib/site-data";
import { getSiteData } from "@/lib/site-data";
import { buttonVariants, cn } from "@/lib/utils";

type HomePageProps = {
  locale: Locale;
};

type IconName =
  | "arrow"
  | "bot"
  | "check"
  | "grid"
  | "mail"
  | "message"
  | "route"
  | "shield"
  | "spark"
  | "users";

const copy = {
  ro: {
    eyebrow: "Platforma AI pentru operatiuni digitale",
    heroTitle: "Transforma intrebarile clientilor in fluxuri clare.",
    heroText:
      "SyntraFlow combina asistent virtual, lead capture si automatizari intr-o experienta moderna pentru clienti si echipele care raspund la solicitari.",
    primaryCta: "Solicita un demo",
    secondaryCta: "Vezi modulele",
    liveLabel: "Flux activ",
    consoleTitle: "SyntraFlow Command",
    consoleSubtitle: "Solicitare client procesata in timp real",
    signalOne: "Intentie detectata",
    signalTwo: "Date validate",
    signalThree: "Rutat catre echipa",
    metricCaption: "Timp mediu de preluare",
    statusReady: "Pregatit pentru follow-up",
    activeStatus: "Activ",
    pipelineLabel: "Flux",
    statsEyebrow: "Indicatori cheie",
    statsTitle: "O pagina de start construita pentru conversie si claritate.",
    modulesEyebrow: "Module",
    modulesTitle: "Alege ce vrei sa automatizezi prima data.",
    modulesText:
      "Pagina prezinta platforma ca un sistem modular: poti porni cu asistenta, captare de lead-uri sau orchestrare operationala.",
    openModule: "Deschide modulul",
    capabilitiesEyebrow: "Capabilitati",
    capabilitiesTitle: "Servicii digitale care lucreaza impreuna.",
    capabilitiesText:
      "Fiecare functionalitate rezolva un pas concret din interactiunea cu clientul, de la primul raspuns pana la follow-up.",
    details: "Detalii",
    processEyebrow: "Proces",
    processTitle: "De la mesaj initial la actiune interna.",
    processText:
      "Fluxul pastreaza interactiunea scurta pentru client si structurata pentru echipa care preia solicitarea.",
    industriesEyebrow: "Aplicare",
    industriesTitle: "Util pentru companii cu multe interactiuni repetitive.",
    industriesText:
      "Continutul si regulile se pot adapta pentru domenii diferite fara sa schimbi logica principala a platformei.",
    benefitsEyebrow: "Rezultat",
    benefitsTitle: "Mai multa ordine in comunicare, fara procese greoaie.",
    casesEyebrow: "Studii de caz",
    casesTitle: "Scenarii care arata impactul in contexte reale.",
    architectureEyebrow: "Arhitectura",
    architectureTitle: "Un sistem clar, usor de explicat si usor de extins.",
    faqEyebrow: "FAQ rapid",
    faqTitle: "Raspunsuri cautabile direct din homepage.",
    finalEyebrow: "Urmatorul pas",
    finalTitle: "Pregateste un demo cu modulele potrivite pentru proiectul tau.",
    finalText:
      "Alege zona de interes si trimite un email pentru a simula un follow-up comercial rapid.",
    emailPlaceholder: "email@companie.ro",
    submit: "Cere follow-up",
    invalidEmailTitle: "Email invalid",
    invalidEmailText: "Completeaza o adresa valida pentru a simula inscrierea rapida.",
    successTitle: "Interes inregistrat",
    successText: "Am notat interesul pentru",
    exploreProject: "Exploreaza proiectul",
    viewArchitecture: "Vezi arhitectura",
  },
  en: {
    eyebrow: "AI platform for digital operations",
    heroTitle: "Turn customer questions into clear workflows.",
    heroText:
      "SyntraFlow combines a virtual assistant, lead capture, and automations into a modern experience for customers and the teams handling requests.",
    primaryCta: "Request a demo",
    secondaryCta: "View modules",
    liveLabel: "Live flow",
    consoleTitle: "SyntraFlow Command",
    consoleSubtitle: "Customer request processed in real time",
    signalOne: "Intent detected",
    signalTwo: "Data validated",
    signalThree: "Routed to team",
    metricCaption: "Average intake time",
    statusReady: "Ready for follow-up",
    activeStatus: "Active",
    pipelineLabel: "Pipeline",
    statsEyebrow: "Key indicators",
    statsTitle: "A homepage built for conversion and clarity.",
    modulesEyebrow: "Modules",
    modulesTitle: "Choose what to automate first.",
    modulesText:
      "The page presents the platform as a modular system: start with assistance, lead capture, or operational orchestration.",
    openModule: "Open module",
    capabilitiesEyebrow: "Capabilities",
    capabilitiesTitle: "Digital services that work together.",
    capabilitiesText:
      "Each capability solves a concrete step in the customer interaction, from first reply to follow-up.",
    details: "Details",
    processEyebrow: "Process",
    processTitle: "From first message to internal action.",
    processText:
      "The flow keeps the interaction short for the customer and structured for the team handling the request.",
    industriesEyebrow: "Application",
    industriesTitle: "Useful for companies with many repetitive interactions.",
    industriesText:
      "Content and rules can adapt to different sectors without changing the platform's main logic.",
    benefitsEyebrow: "Outcome",
    benefitsTitle: "More order in communication, without heavy processes.",
    casesEyebrow: "Case studies",
    casesTitle: "Scenarios that show impact in real contexts.",
    architectureEyebrow: "Architecture",
    architectureTitle: "A clear system, easy to explain and easy to extend.",
    faqEyebrow: "Quick FAQ",
    faqTitle: "Searchable answers directly from the homepage.",
    finalEyebrow: "Next step",
    finalTitle: "Prepare a demo with the right modules for your project.",
    finalText:
      "Choose the area of interest and send an email to simulate a quick sales follow-up.",
    emailPlaceholder: "email@company.com",
    submit: "Request follow-up",
    invalidEmailTitle: "Invalid email",
    invalidEmailText: "Enter a valid address to simulate the quick signup.",
    successTitle: "Interest recorded",
    successText: "Interest recorded for",
    exploreProject: "Explore the project",
    viewArchitecture: "View architecture",
  },
} satisfies Record<Locale, Record<string, string>>;

const accents = [
  "border-[#0f79ff]/18 bg-[#f1f7ff] text-[#0b58d0]",
  "border-[#13b5ba]/20 bg-[#eefcfc] text-[#08777c]",
  "border-[#10b981]/20 bg-[#effcf6] text-[#047857]",
  "border-[#f59e0b]/22 bg-[#fff8e7] text-[#a16207]",
  "border-[#e11d48]/16 bg-[#fff1f3] text-[#be123c]",
  "border-[#7c3aed]/16 bg-[#f6f1ff] text-[#6d28d9]",
];

function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <path d="M12 8V4" />
          <rect x="5" y="8" width="14" height="10" rx="4" />
          <path d="M8 13h.01" />
          <path d="M16 13h.01" />
          <path d="M9 18v2" />
          <path d="M15 18v2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="2" />
          <rect x="14" y="4" width="6" height="6" rx="2" />
          <rect x="4" y="14" width="6" height="6" rx="2" />
          <rect x="14" y="14" width="6" height="6" rx="2" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="12" rx="3" />
          <path d="m5 8 7 5 7-5" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M5 17.5V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9l-4 3.5Z" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <path d="M5 5h4a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h12" />
          <path d="m15 13 4 4-4 4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 2.8 7.6 7 10 4.2-2.4 7-5.5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3 9.8 9.2 4 12l5.8 2.8L12 21l2.2-6.2L20 12l-5.8-2.8L12 3Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 19a4 4 0 0 0-8 0" />
          <circle cx="12" cy="9" r="3" />
          <path d="M20 18a3 3 0 0 0-3-3" />
          <path d="M4 18a3 3 0 0 1 3-3" />
        </svg>
      );
  }
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("reveal-section max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#081b2f] md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </div>
  );
}

function ProductConsole({
  locale,
  stats,
  workflowSteps,
}: {
  locale: Locale;
  stats: StatItem[];
  workflowSteps: WorkflowStep[];
}) {
  const t = copy[locale];
  const rows = workflowSteps.slice(0, 4);

  return (
    <div className="accent-border reveal-section rounded-[2rem] border border-[#0d3358]/10 bg-white/86 p-4 shadow-[0_30px_80px_rgba(11,31,53,0.14)] backdrop-blur-xl md:p-5">
      <div className="rounded-[1.55rem] border border-[#0d3358]/10 bg-[#081b2f] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78d9ff]">{t.liveLabel}</p>
            <h3 className="mt-1 text-lg font-semibold">{t.consoleTitle}</h3>
          </div>
          <div className="rounded-full border border-[#10b981]/25 bg-[#10b981]/12 px-3 py-1.5 text-xs font-semibold text-[#a7f3d0]">
            {t.statusReady}
          </div>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{t.consoleSubtitle}</p>
              <div className="mt-4 space-y-3">
                {[t.signalOne, t.signalTwo, t.signalThree].map((item, index) => (
                  <div key={item} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-white/82">{item}</span>
                    <Icon name="check" className="h-4 w-4 text-[#6ee7b7]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.slice(0, 2).map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                    {item.suffix}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/58">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{t.pipelineLabel}</span>
              <span className="rounded-full bg-[#f59e0b]/16 px-3 py-1 text-[11px] font-semibold text-[#fde68a]">
                {stats[3]?.value ?? 8}
                {stats[3]?.suffix ?? " sec"}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {rows.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.055] p-3 transition duration-300 hover:bg-white/[0.09]"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f79ff]/20 text-xs font-semibold text-[#9ed0ff]">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-white/58">{step.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricStrip({ stats, locale }: { stats: StatItem[]; locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="py-12">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <SectionHeader eyebrow={t.statsEyebrow} title={t.statsTitle} />
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((item, index) => (
              <article
                key={item.label}
                className="reveal-section rounded-[1.4rem] border border-[#0d3358]/10 bg-white/76 p-5 shadow-[0_18px_42px_rgba(11,31,53,0.07)] backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#081b2f]">
                    {item.value}
                    <span className="text-[#0f79ff]">{item.suffix}</span>
                  </p>
                  <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold", accents[index % accents.length])}>
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.06em] text-[#0d3358]">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleShowcase({
  locale,
  solutionTabs,
}: {
  locale: Locale;
  solutionTabs: SolutionTab[];
}) {
  const t = copy[locale];
  const [activeId, setActiveId] = useState(solutionTabs[0]?.id ?? "");

  useEffect(() => {
    setActiveId(solutionTabs[0]?.id ?? "");
  }, [solutionTabs]);

  const activeTab = solutionTabs.find((item) => item.id === activeId) ?? solutionTabs[0];

  return (
    <section id="home-modules" className="py-14">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeader eyebrow={t.modulesEyebrow} title={t.modulesTitle} description={t.modulesText} />
            <div className="mt-8 flex flex-col gap-3">
              {solutionTabs.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.2rem] border p-4 text-left transition duration-300",
                    activeId === item.id
                      ? "border-[#0f79ff]/24 bg-white shadow-[0_22px_52px_rgba(15,121,255,0.12)]"
                      : "border-[#0d3358]/10 bg-white/64 hover:-translate-y-0.5 hover:border-[#0f79ff]/18 hover:bg-white",
                  )}
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold", accents[index % accents.length])}>
                    0{index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#081b2f]">{item.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted">{item.metric}</span>
                  </span>
                  <Icon name="arrow" className="h-4 w-4 text-[#557089] transition group-hover:translate-x-1 group-hover:text-[#0f79ff]" />
                </button>
              ))}
            </div>
          </div>

          {activeTab ? (
            <article className="accent-border reveal-section rounded-[2rem] border border-[#0d3358]/10 bg-white/88 p-6 shadow-[0_26px_70px_rgba(11,31,53,0.11)] backdrop-blur-xl md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0b58d0]">{activeTab.metric}</p>
                  <h3 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#081b2f]">{activeTab.label}</h3>
                </div>
                <span className="rounded-full border border-[#10b981]/20 bg-[#effcf6] px-4 py-2 text-xs font-semibold text-[#047857]">
                  {t.activeStatus}
                </span>
              </div>
              <p className="mt-5 text-base leading-8 text-muted">{activeTab.summary}</p>
              <div className="mt-7 grid gap-3">
                {activeTab.points.map((point, index) => (
                  <div key={point} className="grid grid-cols-[auto_1fr] gap-3 rounded-[1.1rem] border border-[#0d3358]/8 bg-[#f8fcff] p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f79ff]/10 text-xs font-semibold text-[#0b58d0]">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[#0d3358]">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <CTAButton href="/solutii">
                  <span>{t.openModule}</span>
                  <Icon name="arrow" />
                </CTAButton>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SolutionCard({
  item,
  index,
  locale,
}: {
  item: SolutionItem;
  index: number;
  locale: Locale;
}) {
  const t = copy[locale];

  return (
    <article className="reveal-section group flex h-full flex-col rounded-[1.5rem] border border-[#0d3358]/10 bg-white/82 p-5 shadow-[0_18px_42px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:bg-white hover:shadow-[0_26px_60px_rgba(15,121,255,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-full border", accents[index % accents.length])}>
          <Icon name={index % 3 === 0 ? "bot" : index % 3 === 1 ? "route" : "spark"} className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-[#0d3358]/8 bg-[#f8fcff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#557089]">
          {item.category}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#081b2f]">{item.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">{item.summary}</p>
      <ul className="mt-5 space-y-2">
        {item.benefits.slice(0, 2).map((benefit) => (
          <li key={benefit} className="flex gap-2 text-sm leading-6 text-[#0d3358]">
            <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-[#10b981]" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <a
        href={item.href}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0b58d0] transition group-hover:gap-3"
      >
        {t.details}
        <Icon name="arrow" />
      </a>
    </article>
  );
}

function CapabilitiesSection({
  locale,
  solutions,
}: {
  locale: Locale;
  solutions: SolutionItem[];
}) {
  const t = copy[locale];

  return (
    <section id="home-solutions" className="py-14">
      <div className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={t.capabilitiesEyebrow} title={t.capabilitiesTitle} description={t.capabilitiesText} />
          <CTAButton href="/solutii" variant="secondary" className="shrink-0">
            <span>{locale === "ro" ? "Vezi solutiile" : "View solutions"}</span>
            <Icon name="arrow" />
          </CTAButton>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.slice(0, 6).map((item, index) => (
            <SolutionCard key={item.title} item={item} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({
  locale,
  workflowSteps,
}: {
  locale: Locale;
  workflowSteps: WorkflowStep[];
}) {
  const t = copy[locale];

  return (
    <section id="home-process" className="py-14">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow={t.processEyebrow} title={t.processTitle} description={t.processText} />
          <div className="space-y-3">
            {workflowSteps.slice(0, 6).map((step, index) => (
              <article
                key={step.title}
                className="reveal-section grid gap-4 rounded-[1.35rem] border border-[#0d3358]/10 bg-white/78 p-4 shadow-[0_16px_36px_rgba(11,31,53,0.06)] md:grid-cols-[auto_1fr]"
              >
                <span className={cn("flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold", accents[index % accents.length])}>
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#081b2f]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{step.summary}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.08em] text-[#0b58d0]">{step.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryBenefitSection({
  locale,
  industries,
  benefits,
}: {
  locale: Locale;
  industries: IndustryItem[];
  benefits: BenefitItem[];
}) {
  const t = copy[locale];

  return (
    <section id="home-industries" className="py-14">
      <div className="section-shell space-y-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader eyebrow={t.industriesEyebrow} title={t.industriesTitle} description={t.industriesText} />
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <article key={item.title} className="rounded-[1.3rem] border border-[#0d3358]/10 bg-white/72 p-5 shadow-[0_16px_36px_rgba(11,31,53,0.06)]">
                <p className={cn("inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", accents[index % accents.length])}>
                  {item.metric}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-[#081b2f]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.slice(0, 6).map((item, index) => (
            <article
              key={item.title}
              className="reveal-section rounded-[1.45rem] border border-[#0d3358]/10 bg-white/80 p-5 shadow-[0_16px_40px_rgba(11,31,53,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/18 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border", accents[index % accents.length])}>
                  <Icon name={index % 2 === 0 ? "users" : "grid"} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#557089]">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#081b2f]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
              <p className="mt-4 rounded-[1rem] border border-[#0f79ff]/10 bg-[#f7fbff] p-3 text-xs leading-6 text-[#0d3358]">
                {item.impact}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection({
  locale,
  caseStudies,
}: {
  locale: Locale;
  caseStudies: CaseStudyItem[];
}) {
  const t = copy[locale];

  return (
    <section id="home-cases" className="py-14">
      <div className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={t.casesEyebrow} title={t.casesTitle} />
          <CTAButton href="/studii-de-caz" variant="secondary" className="shrink-0">
            <span>{locale === "ro" ? "Vezi scenariile" : "View scenarios"}</span>
            <Icon name="arrow" />
          </CTAButton>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {caseStudies.slice(0, 4).map((item, index) => (
            <article key={item.title} className="reveal-section rounded-[1.55rem] border border-[#0d3358]/10 bg-white/82 p-6 shadow-[0_18px_42px_rgba(11,31,53,0.07)]">
              <div className="flex items-start justify-between gap-4">
                <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", accents[index % accents.length])}>
                  {item.impact}
                </span>
                <span className="text-xs font-semibold text-[#557089]">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#081b2f]">{item.title}</h3>
              <div className="mt-5 grid gap-3">
                <p className="rounded-[1rem] bg-[#f8fcff] p-4 text-sm leading-7 text-muted">{item.problem}</p>
                <p className="rounded-[1rem] border border-[#0f79ff]/10 bg-white p-4 text-sm leading-7 text-[#0d3358]">{item.solution}</p>
              </div>
              <p className="mt-4 text-sm font-medium leading-7 text-[#081b2f]">{item.benefit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection({
  locale,
  layers,
}: {
  locale: Locale;
  layers: ArchitectureLayer[];
}) {
  const t = copy[locale];

  return (
    <section id="home-architecture" className="py-14">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeader eyebrow={t.architectureEyebrow} title={t.architectureTitle} />
            <div className="mt-8">
              <CTAButton href="/arhitectura" variant="secondary">
                <span>{t.viewArchitecture}</span>
                <Icon name="arrow" />
              </CTAButton>
            </div>
          </div>
          <div className="grid gap-3">
            {layers.slice(0, 5).map((item, index) => (
              <article
                key={item.title}
                className="reveal-section grid gap-4 rounded-[1.25rem] border border-[#0d3358]/10 bg-white/78 p-4 shadow-[0_14px_34px_rgba(11,31,53,0.06)] md:grid-cols-[auto_1fr]"
              >
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border", accents[index % accents.length])}>
                  <Icon name={index % 2 === 0 ? "shield" : "route"} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#081b2f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.details.slice(0, 3).map((detail) => (
                      <span key={detail} className="rounded-full border border-[#0d3358]/8 bg-[#f8fcff] px-3 py-1 text-xs font-medium text-[#0d3358]">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTAForm({
  locale,
  solutionTabs,
}: {
  locale: Locale;
  solutionTabs: SolutionTab[];
}) {
  const t = copy[locale];
  const { pushToast } = useToast();
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(solutionTabs[0]?.label ?? "");

  useEffect(() => {
    setInterest(solutionTabs[0]?.label ?? "");
    setEmail("");
  }, [solutionTabs]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      pushToast({
        tone: "error",
        title: t.invalidEmailTitle,
        description: t.invalidEmailText,
      });
      return;
    }

    pushToast({
      tone: "success",
      title: t.successTitle,
      description: `${t.successText} ${interest.toLowerCase()}.`,
    });
    setEmail("");
  }

  return (
    <form onSubmit={submit} className="mt-7 grid gap-3 lg:grid-cols-[1fr_220px_auto]">
      <label className="sr-only" htmlFor="home-final-email">
        Email
      </label>
      <input
        id="home-final-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t.emailPlaceholder}
        className="min-h-12 rounded-full border border-white/16 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/48 focus:border-[#78d9ff]/50"
      />
      <label className="sr-only" htmlFor="home-final-interest">
        Interest
      </label>
      <select
        id="home-final-interest"
        value={interest}
        onChange={(event) => setInterest(event.target.value)}
        className="min-h-12 rounded-full border border-white/16 bg-white/10 px-4 text-sm text-white outline-none focus:border-[#78d9ff]/50"
      >
        {solutionTabs.map((item) => (
          <option key={item.id} value={item.label} className="text-[#081b2f]">
            {item.label}
          </option>
        ))}
      </select>
      <button type="submit" className={buttonVariants("primary", "min-h-12 justify-center")}>
        {t.submit}
      </button>
    </form>
  );
}

function HeroActions({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <CTAButton href="/contact">
        <span>{t.primaryCta}</span>
        <Icon name="arrow" />
      </CTAButton>
      <CTAButton href="#home-modules" variant="secondary">
        <Icon name="grid" />
        <span>{t.secondaryCta}</span>
      </CTAButton>
    </div>
  );
}

function HeroTag({ children, icon }: { children: ReactNode; icon: IconName }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#0d3358]/10 bg-white/72 px-4 py-2 text-sm font-semibold text-[#0d3358] shadow-[0_12px_28px_rgba(11,31,53,0.05)] backdrop-blur-md">
      <Icon name={icon} className="h-4 w-4 text-[#0b58d0]" />
      {children}
    </span>
  );
}

export function HomePage({ locale }: HomePageProps) {
  const {
    architectureLayers,
    benefits,
    caseStudies,
    faqItems,
    industries,
    solutionTabs,
    solutions,
    stats,
    workflowSteps,
  } = useMemo(() => getSiteData(locale), [locale]);

  const t = copy[locale];

  return (
    <div className="page-gradient-shell overflow-hidden">
      <section id="home-top" className="relative min-h-screen pt-32 pb-16 md:pt-36 lg:pb-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/20 to-transparent" />
        <div className="section-shell grid min-h-[calc(100vh-10rem)] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="reveal-section max-w-3xl">
            <p className="eyebrow">
              <Icon name="spark" />
              {t.eyebrow}
            </p>
            <h1 className="font-display mt-6 text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-[#06192c] md:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#365a78] md:text-lg">{t.heroText}</p>
            <HeroActions locale={locale} />
            <div className="mt-7 flex flex-wrap gap-3">
              <HeroTag icon="bot">{locale === "ro" ? "Asistent AI" : "AI assistant"}</HeroTag>
              <HeroTag icon="route">{locale === "ro" ? "Rutare automata" : "Automatic routing"}</HeroTag>
              <HeroTag icon="shield">{locale === "ro" ? "Date validate" : "Validated data"}</HeroTag>
            </div>
          </div>
          <ProductConsole locale={locale} stats={stats} workflowSteps={workflowSteps} />
        </div>
      </section>

      <MetricStrip stats={stats} locale={locale} />
      <ModuleShowcase locale={locale} solutionTabs={solutionTabs} />
      <CapabilitiesSection locale={locale} solutions={solutions} />
      <ProcessSection locale={locale} workflowSteps={workflowSteps} />
      <IndustryBenefitSection locale={locale} industries={industries} benefits={benefits} />
      <CaseStudiesSection locale={locale} caseStudies={caseStudies} />
      <ArchitectureSection locale={locale} layers={architectureLayers} />

      <section id="home-faq" className="py-14">
        <div className="section-shell">
          <SectionHeader eyebrow={t.faqEyebrow} title={t.faqTitle} align="center" />
          <div className="mx-auto mt-8 max-w-4xl">
            <FAQAccordion items={faqItems} searchable locale={locale} />
          </div>
        </div>
      </section>

      <section id="home-final-cta" className="py-14 pb-20">
        <div className="section-shell">
          <div className="accent-border rounded-[2rem] bg-[#081b2f] p-7 text-white shadow-[0_32px_80px_rgba(11,31,53,0.18)] md:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78d9ff]">{t.finalEyebrow}</p>
                <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-5xl">
                  {t.finalTitle}
                </h2>
                <p className="mt-4 text-base leading-8 text-white/72">{t.finalText}</p>
                <FinalCTAForm locale={locale} solutionTabs={solutionTabs} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CTAButton href="/contact" className="justify-center">
                  <Icon name="mail" />
                  <span>{t.primaryCta}</span>
                </CTAButton>
                <CTAButton href="/despre-proiect" variant="secondary" className="justify-center bg-white text-[#081b2f]">
                  <span>{t.exploreProject}</span>
                  <Icon name="arrow" />
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
