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
      category: locale === "ro" ? "Website" : "Website",
      domain: locale === "ro" ? "HoReCa" : "Hospitality",
      resultLabel: locale === "ro" ? "Solicitari repetitive reduse" : "Fewer repetitive requests",
      ctaHref: "/industrii",
    };
  }

  if (title.includes("clinica") || title.includes("clinic")) {
    return {
      category: locale === "ro" ? "Client Support" : "Client Support",
      domain: locale === "ro" ? "Clinici" : "Clinics",
      resultLabel: locale === "ro" ? "Raspuns initial rapid" : "Fast first response",
      ctaHref: "/industrii",
    };
  }

  if (title.includes("b2b")) {
    return {
      category: locale === "ro" ? "Workflow" : "Workflow",
      domain: locale === "ro" ? "B2B" : "B2B",
      resultLabel: locale === "ro" ? "Lead-uri mai clare" : "Clearer leads",
      ctaHref: "/solutii",
    };
  }

  return {
    category: locale === "ro" ? "AI Assistant" : "AI Assistant",
    domain: locale === "ro" ? "Business online" : "Online business",
    resultLabel: locale === "ro" ? "Suport optimizat" : "Optimized support",
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
        headingEyebrow: "Biblioteca de scenarii",
        headingTitle: "Studii de caz structurate pentru contexte reale de business",
        headingDescription:
          "Fiecare card pastreaza problema, solutia si beneficiul intr-un format usor de scanat, cu impactul evidentiat separat.",
        featuredEyebrow: "Studiu evidentiat",
        featuredLabel: "Flux complet",
        featuredTitle: "Un scenariu reprezentativ pentru automatizare conversationala",
        featuredDescription:
          "Studiul evidentiat arata cum acelasi nucleu SyntraFlow poate reduce interactiunile repetitive, poate colecta date utile si poate directiona cererile catre pasul urmator.",
        problem: "Problema",
        solution: "Solutia",
        benefit: "Beneficiu",
        impact: "Impact",
        details: "Afla mai multe",
        read: "Citeste studiul",
        metricsEyebrow: "Rezultate urmarite",
        metricsTitle: "Indicatori relevanti pentru o experienta digitala mai eficienta",
        metricsDescription:
          "Acolo unde exista valori in continutul curent, le pastram. Pentru restul, folosim etichete calitative fara a inventa cifre noi.",
        finalTitle: "Vrei o solutie similara pentru afacerea ta?",
        finalDescription:
          "Putem construi un asistent virtual sau o platforma inteligenta adaptata proceselor, intrebarilor si modului tau de lucru.",
        contact: "Contacteaza-ne",
        solutions: "Vezi solutiile",
      }
    : {
        all: "All",
        headingEyebrow: "Scenario library",
        headingTitle: "Case studies structured for real business contexts",
        headingDescription:
          "Each card keeps the problem, solution, and benefit easy to scan, with the impact separated as a clear result.",
        featuredEyebrow: "Featured case study",
        featuredLabel: "Complete flow",
        featuredTitle: "A representative scenario for conversational automation",
        featuredDescription:
          "The featured study shows how the same SyntraFlow core can reduce repetitive interactions, collect useful data, and route requests to the next step.",
        problem: "Problem",
        solution: "Solution",
        benefit: "Benefit",
        impact: "Impact",
        details: "Learn more",
        read: "Read study",
        metricsEyebrow: "Tracked outcomes",
        metricsTitle: "Relevant indicators for a more efficient digital experience",
        metricsDescription:
          "Where the current content includes values, we keep them. For the rest, we use qualitative labels without inventing new numbers.",
        finalTitle: "Want a similar solution for your business?",
        finalDescription:
          "We can build a virtual assistant or intelligent platform adapted to your processes, questions, and way of working.",
        contact: "Contact us",
        solutions: "View solutions",
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
        "contact-card-hover rounded-[1.45rem] border p-5 md:p-6",
        isImpact
          ? "border-[#0b1f35]/10 bg-[#0b1f35] text-white shadow-[0_22px_48px_rgba(11,31,53,0.18)]"
          : "border-[#d8e6f4] bg-white/82 shadow-[0_14px_30px_rgba(11,31,53,0.045)]",
      )}
    >
      <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
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
          <p className={cn("mt-3 text-sm leading-7", isImpact ? "text-white/88" : "text-muted")}>{text}</p>
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
  return (
    <article className="panel-surface contact-card-hover accent-border flex h-full flex-col overflow-hidden rounded-[1.75rem]">
      <div className="border-b border-[#d8e6f4]/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(238,248,255,0.86))] p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <IconBadge icon={item.icon} className="bg-white/92" />
          <span className="rounded-full border border-[#0f79ff]/12 bg-white/84 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
            {item.domain}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#0d3358]/10 bg-white/88 px-3 py-1 text-xs font-semibold text-[#0b1f35]">
            {item.category}
          </span>
          <span className="rounded-full border border-[#13b5ba]/14 bg-[#13b5ba]/8 px-3 py-1 text-xs font-semibold text-[#0b7e84]">
            {item.resultLabel}
          </span>
        </div>

        <h3 className="mt-5 text-xl font-semibold leading-tight text-[#0b1f35] md:text-2xl">{item.title}</h3>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <dl className="grid flex-1 gap-3">
          {[
            [labels.problem, item.problem],
            [labels.solution, item.solution],
            [labels.benefit, item.benefit],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1.15rem] border border-[#d8e6f4] bg-white/78 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{title}</dt>
              <dd className="mt-2 text-sm leading-7 text-muted">{text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 rounded-[1.3rem] bg-[#0b1f35] p-4 text-white shadow-[0_16px_34px_rgba(11,31,53,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/62">{labels.impact}</p>
          <p className="mt-2 text-sm font-medium leading-7 text-white/90">{item.impact}</p>
        </div>

        <CTAButton href={item.ctaHref} variant="secondary" className="mt-5 w-full bg-white">
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
          ? "Solicitarile repetitive pot fi preluate si directionate fara blocaje inutile."
          : "Repetitive requests can be captured and routed without unnecessary delays.",
    },
    {
      label: locale === "ro" ? "Procese automatizate" : "Automated processes",
      value: locale === "ro" ? "FAQ, lead capture si routing" : "FAQ, lead capture, and routing",
      description:
        locale === "ro"
          ? "Scenariile combina raspunsuri, validare de date si transfer catre echipe."
          : "The scenarios combine answers, data validation, and team handoff.",
    },
    {
      label: locale === "ro" ? "Interactiuni optimizate" : "Optimized interactions",
      value: locale === "ro" ? "Experienta ghidata" : "Guided experience",
      description:
        locale === "ro"
          ? "Utilizatorii primesc pasi clari in locul formularelor rigide sau al raspunsurilor incomplete."
          : "Users receive clear next steps instead of rigid forms or incomplete answers.",
    },
  ];

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

              <div className="grid gap-4">
                {[
                  [labels.problem, featured.problem, false],
                  [labels.solution, featured.solution, false],
                  [labels.benefit, featured.benefit, false],
                  [labels.impact, featured.impact, true],
                ].map(([title, text, isImpact], index) => (
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

          <div id="case-study-list" className="mt-8 grid gap-5 lg:grid-cols-2">
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
                <CTAButton href="/solutii" variant="secondary" className="w-full whitespace-nowrap bg-white sm:w-auto">
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
