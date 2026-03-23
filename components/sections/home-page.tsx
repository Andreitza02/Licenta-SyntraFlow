"use client";

import { useEffect, useMemo, useState } from "react";

import { useToast } from "@/components/providers/toast-provider";
import { CTAButton } from "@/components/ui/cta-button";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ArchitectureCard } from "@/components/ui/architecture-card";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { Chip } from "@/components/ui/chip";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { IndustryCard } from "@/components/ui/industry-card";
import { Modal } from "@/components/ui/modal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs } from "@/components/ui/tabs";
import { WorkflowTimeline } from "@/components/ui/workflow-timeline";
import type { Locale } from "@/lib/i18n";
import type { IndustryItem, SolutionItem, SolutionTab } from "@/lib/site-data";
import { getSiteData } from "@/lib/site-data";
import { buttonVariants } from "@/lib/utils";

type HomePageProps = {
  locale: Locale;
};

type FilterId = "all" | "leads" | "support" | "bookings" | "integration";

function SolutionDeck({
  locale,
  solutions,
}: {
  locale: Locale;
  solutions: SolutionItem[];
}) {
  const filters = useMemo(
    () => [
      { id: "all" as const, label: locale === "ro" ? "Toate" : "All" },
      { id: "leads" as const, label: locale === "ro" ? "Lead-uri" : "Leads" },
      { id: "support" as const, label: locale === "ro" ? "Suport" : "Support" },
      { id: "bookings" as const, label: locale === "ro" ? "Programari" : "Bookings" },
      { id: "integration" as const, label: locale === "ro" ? "Integrare" : "Integration" },
    ],
    [locale],
  );
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  useEffect(() => {
    setSelectedSolution(null);
  }, [locale]);

  const filteredSolutions = useMemo(() => {
    switch (activeFilter) {
      case "leads":
        return solutions.filter((item) => item.icon === "pipeline" || item.icon === "form");
      case "support":
        return solutions.filter((item) => item.icon === "bot" || item.icon === "faq" || item.icon === "support");
      case "bookings":
        return solutions.filter((item) => item.icon === "calendar");
      case "integration":
        return solutions.filter((item) => item.icon === "integration");
      default:
        return solutions.slice(0, 6);
    }
  }, [activeFilter, solutions]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            isActive={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredSolutions.map((item) => (
          <article key={item.title} className="panel-surface reveal-section rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-[#0f79ff]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {item.category}
              </span>
              <button
                type="button"
                className="rounded-full border border-[#0d3358]/10 bg-white px-3 py-2 text-xs font-semibold text-[#0b1f35]"
                onClick={() => setSelectedSolution(item)}
              >
                {locale === "ro" ? "Detalii" : "Details"}
              </button>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
            <ul className="mt-5 space-y-2 text-sm text-[#0b1f35]">
              {item.benefits.slice(0, 2).map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#13b5ba]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <Modal
        open={Boolean(selectedSolution)}
        onClose={() => setSelectedSolution(null)}
        title={selectedSolution?.title ?? (locale === "ro" ? "Detalii solutie" : "Solution details")}
        closeLabel={locale === "ro" ? "Inchide" : "Close"}
      >
        {selectedSolution ? (
          <div className="space-y-5">
            <p className="text-sm leading-7 text-muted">{selectedSolution.summary}</p>
            <div className="rounded-[1.5rem] bg-[#f4fbff] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "Beneficii principale" : "Main benefits"}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#0b1f35]">
                {selectedSolution.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#13b5ba]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.5rem] bg-[#0b1f35] p-5 text-sm leading-7 text-white/80">{selectedSolution.useCase}</div>
            <CTAButton href={selectedSolution.href}>
              {locale === "ro" ? "Deschide pagina dedicata" : "Open dedicated page"}
            </CTAButton>
          </div>
        ) : null}
      </Modal>
    </>
  );
}

function IndustrySwitcher({
  locale,
  industries,
}: {
  locale: Locale;
  industries: IndustryItem[];
}) {
  const [activeTab, setActiveTab] = useState("b2b");
  const tabs = useMemo(
    () => [
      { id: "b2b", label: "B2B" },
      { id: "services", label: locale === "ro" ? "Servicii" : "Services" },
      { id: "retail", label: "Retail" },
      { id: "medical", label: locale === "ro" ? "Medical" : "Medical" },
      { id: "horeca", label: locale === "ro" ? "HoReCa" : "Hospitality" },
    ],
    [locale],
  );

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "services":
        return industries.filter((item) => item.icon === "tools" || item.icon === "logistics");
      case "retail":
        return industries.filter((item) => item.icon === "cart");
      case "medical":
        return industries.filter((item) => item.icon === "health");
      case "horeca":
        return industries.filter((item) => item.icon === "hospitality");
      default:
        return industries.filter((item) => item.icon === "b2b" || item.icon === "factory");
    }
  }, [activeTab, industries]);

  return (
    <>
      <Tabs
        items={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
        ariaLabel={locale === "ro" ? "Filtre industrii" : "Industry filters"}
      />
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <IndustryCard key={item.title} item={item} />
        ))}
      </div>
    </>
  );
}

function FinalCTAForm({
  locale,
  solutionTabs,
}: {
  locale: Locale;
  solutionTabs: SolutionTab[];
}) {
  const { pushToast } = useToast();
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(solutionTabs[0]?.label ?? "");

  useEffect(() => {
    setInterest(solutionTabs[0]?.label ?? "");
    setEmail("");
  }, [solutionTabs]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      pushToast({
        tone: "error",
        title: locale === "ro" ? "Email invalid" : "Invalid email",
        description:
          locale === "ro"
            ? "Completeaza o adresa valida pentru a simula inscrierea rapida."
            : "Enter a valid address to simulate the quick signup.",
      });
      return;
    }

    pushToast({
      tone: "success",
      title: locale === "ro" ? "Interes inregistrat" : "Interest recorded",
      description:
        locale === "ro"
          ? `Am notat interesul pentru ${interest.toLowerCase()} si un follow-up demo.`
          : `Interest for ${interest.toLowerCase()} and a demo follow-up has been recorded.`,
    });
    setEmail("");
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={locale === "ro" ? "email@companie.ro" : "email@company.com"}
        className="rounded-full border border-white/16 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/50"
        aria-label={locale === "ro" ? "Email pentru follow-up" : "Email for follow-up"}
      />
      <select
        value={interest}
        onChange={(event) => setInterest(event.target.value)}
        className="rounded-full border border-white/16 bg-white/8 px-4 py-3 text-sm text-white outline-none"
        aria-label={locale === "ro" ? "Interes" : "Interest"}
      >
        {solutionTabs.map((item) => (
          <option key={item.id} value={item.label} className="text-[#0b1f35]">
            {item.label}
          </option>
        ))}
      </select>
      <button type="submit" className={buttonVariants("primary", "justify-center")}>
        {locale === "ro" ? "Cere follow-up" : "Request follow-up"}
      </button>
    </form>
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

  return (
    <div className="page-gradient-shell">
      <section id="home-top" className="relative overflow-hidden pb-16 pt-28 md:pt-36">
        <AnimatedBackground />
        <div className="section-shell relative">
          <div className="mx-auto max-w-5xl">
            <div className="reveal-section text-center">
              <span className="eyebrow">
                {locale === "ro"
                  ? "Asistent virtual, automatizari si fluxuri inteligente pentru clienti"
                  : "Virtual assistant, automation, and smart customer workflows"}
              </span>
              <h1 className="font-display mx-auto mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-7xl">
                {locale === "ro"
                  ? "Platforma web inteligenta cu asistent virtual AI pentru interactiuni mai bune cu clientii."
                  : "A smart web platform with an AI virtual assistant for better customer interactions."}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted md:text-xl">
                {locale === "ro"
                  ? "SyntraFlow prezinta implementarea unei platforme web inteligente care combina asistent virtual, formulare inteligente si fluxuri automate pentru automatizarea si optimizarea proceselor de interactiune cu clientii."
                  : "SyntraFlow showcases a smart web platform that combines a virtual assistant, smart forms, and automated workflows to automate and optimize customer interaction processes."}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CTAButton href="/contact">{locale === "ro" ? "Solicita un demo" : "Request a demo"}</CTAButton>
                <CTAButton href="#home-assistant" variant="secondary">
                  {locale === "ro" ? "Vezi cum functioneaza" : "See how it works"}
                </CTAButton>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-[#0d3358]">
                <a href="#home-architecture" className="transition hover:text-[#0f79ff]">
                  {locale === "ro" ? "Cum functioneaza" : "How it works"}
                </a>
                <span className="h-1.5 w-1.5 rounded-full bg-[#13b5ba]" />
                <span>
                  {locale === "ro" ? "Demo rapid, clar si usor de urmarit" : "A fast, clear, and easy-to-follow demo"}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium text-[#0d3358]">
                {(locale === "ro"
                  ? ["Asistent virtual AI", "Lead capture", "FAQ inteligent", "Arhitectura moderna"]
                  : ["AI assistant", "Lead capture", "Smart FAQ", "Modern architecture"]).map((item) => (
                  <span key={item} className="rounded-full border border-[#0d3358]/10 bg-white/80 px-4 py-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <StatCard key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="home-solutions" className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Capabilitati" : "Capabilities"}
            title={locale === "ro" ? "Ce poate face platforma" : "What the platform can do"}
            description={locale === "ro"
              ? "Structura modulara combina conversatie, captare de date si executie operationala intr-un singur traseu digital coerent."
              : "The modular structure combines conversation, data capture, and operational execution in one coherent digital journey."}
          />
          <div className="panel-surface reveal-section rounded-[2rem] p-6 md:p-8">
            <SolutionDeck locale={locale} solutions={solutions} />
          </div>
        </div>
      </section>

      <section id="home-industries" className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Domenii de utilizare" : "Industries"}
            title={locale === "ro"
              ? "Adaptata pentru industrii cu procese repetitive si interactiuni frecvente"
              : "Built for industries with repetitive processes and frequent customer interactions"}
            description={locale === "ro"
              ? "Continutul, intrebarile si logica de rutare pot fi personalizate pentru companii comerciale, operationale sau orientate catre servicii."
              : "Content, questions, and routing logic can be adapted for commercial, operational, or service-driven companies."}
          />
          <IndustrySwitcher locale={locale} industries={industries} />
          <CTAButton href="/industrii" variant="secondary">
            {locale === "ro" ? "Vezi toate industriile" : "View all industries"}
          </CTAButton>
        </div>
      </section>

      <section id="home-assistant" className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Asistent virtual" : "Virtual assistant"}
            title={locale === "ro"
              ? "Un demo chat realist pentru FAQ, oferte si programari"
              : "A realistic chat demo for FAQs, quotes, and bookings"}
            description={locale === "ro"
              ? "Blocul demonstrativ simuleaza un asistent care intelege intentia, cere datele relevante si livreaza un pas urmator credibil."
              : "The demo block simulates an assistant that understands intent, requests relevant data, and delivers a credible next step."}
          />
          <div className="panel-surface reveal-section rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {locale === "ro" ? "FAQ rapid" : "Quick FAQ"}
                </p>
                <h3 className="font-display mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-3xl">
                  {locale === "ro"
                    ? "Intrebari frecvente cautabile, direct din homepage"
                    : "Searchable frequently asked questions, directly from the homepage"}
                </h3>
              </div>
              <CTAButton href="/asistent-virtual" variant="secondary">
                {locale === "ro" ? "Vezi pagina completa" : "View the full page"}
              </CTAButton>
            </div>
            <div className="mt-6">
              <FAQAccordion items={faqItems} searchable locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section id="home-automations" className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Automatizari" : "Automation"}
            title={locale === "ro"
              ? "Fluxul operational de la intrebare la follow-up"
              : "The operational flow from question to follow-up"}
            description={locale === "ro"
              ? "Fiecare interactiune poate deveni un traseu complet: raspuns, colectare, validare, rutare si confirmare."
              : "Each interaction can become a complete journey: response, collection, validation, routing, and confirmation."}
          />
          <WorkflowTimeline steps={workflowSteps.slice(0, 6)} />
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell">
          <SectionHeading
            eyebrow={locale === "ro" ? "Beneficii" : "Benefits"}
            title={locale === "ro"
              ? "Valoare masurabila pentru demo academic si scenarii de business"
              : "Measurable value for academic demos and business scenarios"}
            description={locale === "ro"
              ? "Platforma este construita sa arate solid in fata unei comisii academice si convingator in fata unui manager de business."
              : "The platform is built to look strong in front of an academic committee and convincing in front of a business decision-maker."}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item) => (
              <article key={item.title} className="panel-surface reveal-section rounded-[1.75rem] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.metric}</p>
                <h3 className="mt-4 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="home-cases" className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Studii de caz" : "Case studies"}
            title={locale === "ro"
              ? "Scenarii de aplicare care fac proiectul credibil"
              : "Use-case scenarios that make the project credible"}
            description={locale === "ro"
              ? "Exemplele urmaresc probleme concrete, fluxul propus si impactul asteptat pentru organizatii din domenii diferite."
              : "The examples follow concrete problems, the proposed flow, and the expected impact for organizations in different industries."}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {caseStudies.slice(0, 2).map((item) => (
              <CaseStudyCard key={item.title} item={item} locale={locale} />
            ))}
          </div>
          <CTAButton href="/studii-de-caz" variant="secondary">
            {locale === "ro" ? "Exploreaza scenariile complete" : "Explore the full scenarios"}
          </CTAButton>
        </div>
      </section>

      <section id="home-architecture" className="py-14">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={locale === "ro" ? "Cum functioneaza" : "How it works"}
            title={locale === "ro"
              ? "Un sistem clar, modular si usor de extins"
              : "A clear, modular system that is easy to extend"}
            description={locale === "ro"
              ? "Platforma este organizata astfel incat sa sustina raspunsuri rapide, procese fluide si o experienta coerenta pentru clienti."
              : "The platform is structured to support fast responses, smooth processes, and a consistent customer experience."}
          />
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {architectureLayers.slice(0, 4).map((item) => (
              <ArchitectureCard key={item.title} item={item} locale={locale} />
            ))}
          </div>
          <CTAButton href="/arhitectura" variant="secondary">
            {locale === "ro" ? "Vezi arhitectura completa" : "View the full architecture"}
          </CTAButton>
        </div>
      </section>

      <section id="home-final-cta" className="py-14">
        <div className="section-shell">
          <div className="accent-border reveal-section rounded-[2.2rem] bg-[#0b1f35] p-8 text-white md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
                  {locale === "ro" ? "CTA final" : "Final CTA"}
                </p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                  {locale === "ro"
                    ? "Pregatit pentru demo, prezentare academica si extindere ulterioara."
                    : "Ready for demos, academic presentations, and future expansion."}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">
                  {locale === "ro"
                    ? "SyntraFlow este construit pentru a oferi o experienta convingatoare, cu procese clare, interactiuni rapide si posibilitatea de a creste odata cu nevoile companiei."
                    : "SyntraFlow is built to deliver a convincing experience, with clear processes, fast interactions, and room to grow with the company’s needs."}
                </p>
                <FinalCTAForm locale={locale} solutionTabs={solutionTabs} />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <CTAButton href="/contact" className="justify-center">
                  {locale === "ro" ? "Solicita un demo" : "Request a demo"}
                </CTAButton>
                <CTAButton href="/despre-proiect" variant="secondary" className="justify-center bg-white text-[#0b1f35]">
                  {locale === "ro" ? "Exploreaza proiectul" : "Explore the project"}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
