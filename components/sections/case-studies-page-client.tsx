"use client";

import { useMemo, useState } from "react";

import { CTAButton } from "@/components/ui/cta-button";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/lib/i18n";
import type { CaseStudyItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type CaseStudiesPageClientProps = {
  caseStudies: CaseStudyItem[];
  locale: Locale;
};

type EnrichedCaseStudy = CaseStudyItem & {
  category: string;
  domain: string;
  resultLabel: string;
  ctaHref: string;
};

function getCaseMeta(item: CaseStudyItem, locale: Locale) {
  const title = item.title.toLowerCase();

  if (title.includes("restaurant")) {
    return {
      category: locale === "ro" ? "AI + Rezervari" : "AI + Bookings",
      domain: locale === "ro" ? "HoReCa" : "Hospitality",
      resultLabel: locale === "ro" ? "Produs usor de demonstrat" : "Easy-to-demo product",
      ctaHref: "/industrii",
    };
  }

  if (title.includes("clinica") || title.includes("clinic")) {
    return {
      category: locale === "ro" ? "AI + Programari" : "AI + Bookings",
      domain: locale === "ro" ? "Clinici" : "Clinics",
      resultLabel: locale === "ro" ? "Raspuns initial vandabil" : "Sellable first reply",
      ctaHref: "/industrii",
    };
  }

  if (title.includes("b2b")) {
    return {
      category: locale === "ro" ? "AI + B2B" : "AI + B2B",
      domain: locale === "ro" ? "B2B" : "B2B",
      resultLabel: locale === "ro" ? "Lead-uri pentru oferta" : "Offer-ready leads",
      ctaHref: "/solutii",
    };
  }

  if (title.includes("arhivare") || title.includes("digitalizare") || title.includes("archiving") || title.includes("digitization")) {
    return {
      category: "AI + Lead capture",
      domain: locale === "ro" ? "Arhivare & digitalizare" : "Archiving & digitization",
      resultLabel: locale === "ro" ? "Lead-uri structurate" : "Structured leads",
      ctaHref: "/asistent-virtual",
    };
  }

  return {
    category: locale === "ro" ? "AI + Suport" : "AI + Support",
    domain: locale === "ro" ? "Business online" : "Online business",
    resultLabel: locale === "ro" ? "Intrebari transformate in actiune" : "Questions turned into action",
    ctaHref: "/asistent-virtual",
  };
}

function buildCaseStudies(caseStudies: CaseStudyItem[], locale: Locale): EnrichedCaseStudy[] {
  return caseStudies.map((item) => ({
    ...item,
    ...getCaseMeta(item, locale),
  }));
}

function getFilterLabels(locale: Locale) {
  return locale === "ro"
    ? {
        all: "Toate",
        headingEyebrow: "Biblioteca de vanzare",
        headingTitle: "Scenarii unde Custom AI Assistant se poate vinde mai usor",
        headingDescription:
          "Fiecare card arata problema clientului, produsul AI propus, beneficiul si motivul pentru care oferta devine mai convingatoare.",
        featuredEyebrow: "Best seller in context",
        featuredLabel: "Flux de vanzare",
        featuredTitle: "Un scenariu reprezentativ pentru vanzarea Custom AI Assistant",
        featuredDescription:
          "Studiul evidentiat arata cum acelasi produs AI poate raspunde, demonstra valoarea, colecta date utile si duce clientul catre oferta.",
        problem: "Problema",
        context: "Context",
        objective: "Obiectivul proiectului",
        solution: "Solutia",
        features: "Functionalitati principale",
        benefit: "Beneficiu",
        impact: "Impact",
        details: "Vezi industria",
        read: "Vezi scenariul",
        metricsEyebrow: "Semnale de vanzare",
        metricsTitle: "Indicatori care fac produsul AI mai usor de cumparat",
        metricsDescription:
          "Pastram valorile existente si tratam restul ca semnale comerciale: claritate, incredere si urmator pas pregatit.",
        finalTitle: "Vrei sa vinzi Custom AI Assistant pentru afacerea ta?",
        finalDescription:
          "Pornim cu best seller-ul, il demonstram prin Try me si il completam cu website sau hosting cand ai nevoie de pachet complet.",
        contact: "Cere oferta",
        solutions: "Vezi produsele",
      }
    : {
        all: "All",
        headingEyebrow: "Sales library",
        headingTitle: "Scenarios where Custom AI Assistant is easier to sell",
        headingDescription:
          "Each card shows the client problem, proposed AI product, benefit, and why the offer becomes more convincing.",
        featuredEyebrow: "Best seller in context",
        featuredLabel: "Sales flow",
        featuredTitle: "A representative scenario for selling Custom AI Assistant",
        featuredDescription:
          "The featured study shows how the same AI product can answer, prove value, collect useful data, and move the client toward an offer.",
        problem: "Problem",
        context: "Context",
        objective: "Project objective",
        solution: "Solution",
        features: "Main features",
        benefit: "Benefit",
        impact: "Impact",
        details: "View industry",
        read: "View scenario",
        metricsEyebrow: "Sales signals",
        metricsTitle: "Indicators that make the AI product easier to buy",
        metricsDescription:
          "We keep existing values and treat the rest as commercial signals: clarity, trust, and a prepared next step.",
        finalTitle: "Want to sell Custom AI Assistant for your business?",
        finalDescription:
          "We start with the best seller, prove it through Try me, and complete it with website or hosting when you need the full package.",
        contact: "Request an offer",
        solutions: "View products",
      };
}

function MetricCard({
  label,
  value,
  description,
  index,
}: {
  label: string;
  value: string;
  description: string;
  index: number;
}) {
  return (
    <article className="panel-surface contact-card-hover accent-border rounded-[1.55rem] p-5 md:p-6">
      <div className="flex items-start gap-4">
        <span className="font-display shrink-0 text-sm font-semibold text-[#13b5ba]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{label}</p>
          <p className="font-display mt-3 text-xl font-semibold leading-tight text-[#0b1f35] md:text-2xl">
            {value}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        </div>
      </div>
    </article>
  );
}

function NarrativeStep({
  index,
  title,
  text,
  isImpact = false,
}: {
  index: number;
  title: string;
  text: string;
  isImpact?: boolean;
}) {
  return (
    <article
      className={cn(
        "contact-card-hover h-auto rounded-[1.45rem] border p-4 md:p-5",
        isImpact
          ? "border-[#0b1f35]/10 bg-[#0b1f35] text-white shadow-[0_22px_48px_rgba(11,31,53,0.18)]"
          : "border-[#d8e6f4] bg-white/82 shadow-[0_14px_30px_rgba(11,31,53,0.045)]",
      )}
    >
      <div className="grid items-start gap-3 sm:grid-cols-[3rem_1fr]">
        <span
          className={cn(
            "font-display flex h-12 w-12 items-center justify-center rounded-[1rem] border text-sm font-semibold",
            isImpact
              ? "border-white/14 bg-white/10 text-white"
              : "border-[#0f79ff]/12 bg-[#eef6ff] text-[#0b58d0]",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.08em]",
              isImpact ? "text-white/62" : "text-[#0b58d0]",
            )}
          >
            {title}
          </p>
          <p className={cn("mt-2 text-sm leading-6", isImpact ? "text-white/88" : "text-muted")}>{text}</p>
        </div>
      </div>
    </article>
  );
}

function CaseStudyPremiumCard({
  item,
  labels,
}: {
  item: EnrichedCaseStudy;
  labels: ReturnType<typeof getFilterLabels>;
}) {
  const caseDetails = [
    [labels.problem, item.problem],
    ...(item.objective ? [[labels.objective, item.objective]] : []),
    [labels.solution, item.solution],
    [labels.benefit, item.benefit],
  ];

  return (
    <article className="panel-surface contact-card-hover accent-border flex h-auto flex-col self-start overflow-hidden rounded-[1.75rem]">
      <div className="border-b border-[#d8e6f4]/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(238,248,255,0.86))] p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <IconBadge icon={item.icon} className="bg-white/92" />
          <span className="rounded-full border border-[#0f79ff]/12 bg-white/84 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
            {item.domain}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#0d3358]/10 bg-white/88 px-3 py-1 text-xs font-semibold text-[#0b1f35]">
            {item.category}
          </span>
          <span className="rounded-full border border-[#13b5ba]/14 bg-[#13b5ba]/8 px-3 py-1 text-xs font-semibold text-[#0b7e84]">
            {item.resultLabel}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold leading-tight text-[#0b1f35] md:text-2xl">{item.title}</h3>
      </div>

      <div className="flex h-auto flex-col p-4 md:p-5">
        {item.overview?.length ? (
          <div className="mb-3 h-auto rounded-[1.2rem] border border-[#d8e6f4] bg-[#f8fcff] p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.context}</p>
            <div className="mt-2.5 grid items-start gap-2.5">
              {item.overview.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-6 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <dl className="grid h-auto items-start gap-2.5">
          {caseDetails.map(([title, text]) => (
            <div key={title} className="h-auto rounded-[1.15rem] border border-[#d8e6f4] bg-white/78 p-3.5">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{title}</dt>
              <dd className="mt-2 text-sm leading-6 text-muted">{text}</dd>
            </div>
          ))}
        </dl>

        {item.features?.length ? (
          <div className="mt-3.5 h-auto rounded-[1.2rem] border border-[#13b5ba]/16 bg-[#ecfeff] p-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">{labels.features}</p>
            <ul className="mt-2.5 grid items-start gap-1.5">
              {item.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-[#0b1f35]">
                  <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-[#13b5ba]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-4 h-auto rounded-[1.3rem] bg-[#0b1f35] p-3.5 text-white shadow-[0_16px_34px_rgba(11,31,53,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/62">{labels.impact}</p>
          <p className="mt-2 text-sm font-medium leading-6 text-white/90">{item.impact}</p>
        </div>

        <CTAButton href={item.ctaHref} variant="secondary" className="mt-4 w-full bg-white">
          {labels.details}
        </CTAButton>
      </div>
    </article>
  );
}

export function CaseStudiesPageClient({ caseStudies, locale }: CaseStudiesPageClientProps) {
  const labels = useMemo(() => getFilterLabels(locale), [locale]);
  const enrichedCaseStudies = useMemo(() => buildCaseStudies(caseStudies, locale), [caseStudies, locale]);
  const categories = useMemo(
    () => [labels.all, ...Array.from(new Set(enrichedCaseStudies.map((item) => item.category)))],
    [enrichedCaseStudies, labels.all],
  );
  const [activeCategory, setActiveCategory] = useState(labels.all);
  const featured = enrichedCaseStudies[0];
  const filteredCaseStudies = activeCategory === labels.all
    ? enrichedCaseStudies
    : enrichedCaseStudies.filter((item) => item.category === activeCategory);

  const metrics = [
    {
      label: locale === "ro" ? "Timp economisit" : "Time saved",
      value: featured?.impact ?? (locale === "ro" ? "Procese mai rapide" : "Faster processes"),
      description:
        locale === "ro"
          ? "Solicitarile repetitive devin un argument clar pentru cumpararea produsului AI."
          : "Repetitive requests become a clear reason to buy the AI product.",
    },
    {
      label: locale === "ro" ? "Pachet vandabil" : "Sellable package",
      value: locale === "ro" ? "AI, lead capture si follow-up" : "AI, lead capture, and follow-up",
      description:
        locale === "ro"
          ? "Scenariile combina raspunsuri, validare de date si pas urmator pentru oferta."
          : "The scenarios combine answers, data validation, and a next step for the offer.",
    },
    {
      label: locale === "ro" ? "Demo mai convingator" : "More convincing demo",
      value: locale === "ro" ? "Experienta ghidata" : "Guided experience",
      description:
        locale === "ro"
          ? "Clientul vede cum produsul raspunde, strange context si pregateste oferta."
          : "The client sees how the product replies, gathers context, and prepares the offer.",
    },
  ];
  const featuredNarrativeSteps = featured
    ? [
        [labels.problem, featured.problem, false],
        ...(featured.objective ? [[labels.objective, featured.objective, false]] : []),
        [labels.solution, featured.solution, false],
        [labels.benefit, featured.benefit, false],
        [labels.impact, featured.impact, true],
      ]
    : [];

  return (
    <>
      {featured ? (
        <section className="py-14 md:py-16" aria-labelledby="featured-case-study">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
              <article className="panel-surface accent-border rounded-[2rem] p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <IconBadge icon={featured.icon} className="h-14 w-14 rounded-[1.25rem] bg-[#f8fcff]" />
                  <span className="rounded-full border border-[#0f79ff]/12 bg-white/82 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {labels.featuredLabel}
                  </span>
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {labels.featuredEyebrow}
                </p>
                <h2 id="featured-case-study" className="font-display mt-3 text-3xl font-semibold leading-tight text-[#0b1f35] md:text-[2.65rem]">
                  {labels.featuredTitle}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted md:text-base md:leading-8">
                  {labels.featuredDescription}
                </p>

                <div className="mt-6 rounded-[1.35rem] border border-[#d8e6f4] bg-white/78 p-4">
                  <p className="text-sm font-semibold leading-6 text-[#0b1f35]">{featured.title}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
                    {featured.resultLabel}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <CTAButton href="#case-study-list" className="w-full sm:w-auto">
                    {labels.read}
                  </CTAButton>
                  <CTAButton href="/contact" variant="secondary" className="w-full bg-white sm:w-auto">
                    {labels.contact}
                  </CTAButton>
                </div>
              </article>

              <div className="grid items-start gap-3">
                {featuredNarrativeSteps.map(([title, text, isImpact], index) => (
                  <NarrativeStep
                    key={title as string}
                    index={index + 1}
                    title={title as string}
                    text={text as string}
                    isImpact={isImpact as boolean}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-12 md:py-16" aria-label={labels.headingTitle}>
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SectionHeading
              eyebrow={labels.headingEyebrow}
              title={labels.headingTitle}
              description={labels.headingDescription}
              size="compact"
            />
            <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-[#0d3358]/10 bg-white/64 p-2 shadow-[0_14px_30px_rgba(11,31,53,0.045)]" aria-label={locale === "ro" ? "Filtre studii de caz" : "Case study filters"}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f79ff]/40",
                    activeCategory === category
                      ? "border-[#0f79ff]/20 bg-[#0b1f35] text-white shadow-[0_12px_28px_rgba(11,31,53,0.16)]"
                      : "border-[#0d3358]/10 bg-white/84 text-[#0b1f35] hover:border-[#0f79ff]/18 hover:bg-white",
                  )}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div id="case-study-list" className="mt-7 grid items-start gap-4 lg:grid-cols-2">
            {filteredCaseStudies.map((item) => (
              <CaseStudyPremiumCard key={item.title} item={item} labels={labels} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-label={labels.metricsTitle}>
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <SectionHeading
              eyebrow={labels.metricsEyebrow}
              title={labels.metricsTitle}
              description={labels.metricsDescription}
              size="compact"
            />
            <div id="case-study-results" className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {metrics.map((metric, index) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  description={metric.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="panel-surface accent-border mt-8 rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {locale === "ro" ? "Urmatorul pas" : "Next step"}
                </p>
                <h2 id="case-studies-final-cta" className="font-display mt-3 text-3xl font-semibold leading-tight text-[#0b1f35] md:text-[2.5rem]">
                  {labels.finalTitle}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                  {labels.finalDescription}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <CTAButton href="/contact" className="w-full whitespace-nowrap sm:w-auto">
                  {labels.contact}
                </CTAButton>
                <CTAButton href="/product" variant="secondary" className="w-full whitespace-nowrap bg-white sm:w-auto">
                  {labels.solutions}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
