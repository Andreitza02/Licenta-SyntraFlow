import Image from "next/image";

import dmtLogo from "../../DMT LOGO.jpg";
import { PartnersDeviceShowcase } from "@/components/sections/partners-device-showcase";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

type PartnerIconName = "brain" | "check" | "file" | "grid" | "route" | "shield" | "spark" | "workflow";

function PartnerIcon({ name, className = "h-5 w-5" }: { name: PartnerIconName; className?: string }) {
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
    case "brain":
      return (
        <svg {...common}>
          <path d="M8.5 7.5A3 3 0 0 1 12 4.6a3 3 0 0 1 3.5 2.9" />
          <path d="M7.5 10.5A3 3 0 0 0 6 16a3.3 3.3 0 0 0 3.5 3" />
          <path d="M16.5 10.5A3 3 0 0 1 18 16a3.3 3.3 0 0 1-3.5 3" />
          <path d="M12 5v14" />
          <path d="M9 12h6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M7 3.5h6l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
          <path d="M13 3.5V8h4" />
          <path d="M9 13h6" />
          <path d="M9 16h4" />
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
    case "workflow":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="2" />
          <rect x="14" y="14" width="6" height="6" rx="2" />
          <path d="M10 7h2.5A3.5 3.5 0 0 1 16 10.5V14" />
          <path d="m13.5 12 2.5 2 2.5-2" />
        </svg>
      );
  }
}

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Parteneri" : "Partners",
    locale === "ro"
      ? "Parteneri SyntraFlow: exemplu de Custom AI Assistant vandut si adaptat pentru DMT Marine Equipment."
      : "SyntraFlow partners: an example of Custom AI Assistant sold and adapted for DMT Marine Equipment.",
    "/parteneri",
    locale,
  );
}

export default async function PartnersPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  const heroTags = isRomanian
    ? ["DMT x SyntraFlow", "Produs AI vandut", "Smart Routing", "Secure by design"]
    : ["DMT x SyntraFlow", "Sold AI product", "Smart Routing", "Secure by design"];

  const pillars = isRomanian
    ? [
        {
          id: "01",
          title: "Produs AI adaptat pentru fiecare intrebare",
          text: "Pentru DMT am livrat un entry point unic care detecteaza intentia si trimite fiecare intrebare in modulul potrivit: planning, workload, PLC, documente interne, cable sizing, Senior MES sau PDF analysis.",
        },
        {
          id: "02",
          title: "Raspunsuri care fac produsul credibil",
          text: "Asistentul nu improvizeaza. Fiecare raspuns este ancorat in fisierele, sabloanele si regulile de lucru configurate pentru fluxurile operationale relevante.",
        },
        {
          id: "03",
          title: "Dovada ca produsul poate fi vandut responsabil",
          text: "Colaborarea arata impactul operational livrat pentru DMT fara sa expuna date interne, exemple sensibile sau continut care trebuie pastrat privat.",
        },
      ]
    : [
        {
          id: "01",
          title: "An AI product adapted for every request",
          text: "For DMT we delivered a single entry point that detects intent and sends each request to the right module: planning, workload, PLC, internal documents, cable sizing, Senior MES, or PDF analysis.",
        },
        {
          id: "02",
          title: "Answers that make the product credible",
          text: "The assistant does not improvise. Every answer is anchored in the files, templates, and workflow rules configured for the relevant operational flow.",
        },
        {
          id: "03",
          title: "Proof the product can be sold responsibly",
          text: "The collaboration shows the operational impact delivered for DMT without exposing internal data, sensitive examples, or content that must remain private.",
        },
      ];

  const modules = isRomanian
    ? [
        {
          eyebrow: "Planning & Offers",
          title: "Planning si oferte intr-un singur flux de claritate",
          points: [
            "Intrebarile despre proiecte, oferte, livrari, status si responsabilitati sunt directionate spre logica potrivita.",
            "Asistentul returneaza doar informatia relevanta, intr-un format scurt si profesional.",
            "Fluxul este gandit pentru decizii mai rapide si mai putina frictiune operationala.",
          ],
        },
        {
          eyebrow: "Workload",
          title: "Vizibilitate pe workload si capacitate saptamanala",
          points: [
            "Pentru intrebarile despre disponibilitate si incarcare, sistemul separa clar capacitatea, alocarea si nevoia suplimentara.",
            "Raspunsurile sunt pregatite pentru o citire rapida, orientata spre actiune.",
            "Mesajul comercial este simplu: mai multa vizibilitate, mai putina incertitudine.",
          ],
        },
        {
          eyebrow: "PLC",
          title: "Asistenta rapida pentru coduri, module si identificare PLC",
          points: [
            "Fluxul PLC raspunde pe baza unei logici precise pentru coduri, descrieri, module si cautari orientate pe caracteristici.",
            "Clientul vede un instrument care reduce timpul de cautare si sustine munca tehnica.",
            "Totul este prezentat ca o capabilitate operationala, nu ca expunere de date brute.",
          ],
        },
        {
          eyebrow: "Internal Documents",
          title: "Acces ghidat la reguli, proceduri si documente interne",
          points: [
            "Intrebarile despre proceduri interne sunt preluate de un modul dedicat, construit pentru raspunsuri clare si controlate.",
            "Asistentul foloseste doar documentele relevante pentru subiectul cerut.",
            "Rezultatul este o experienta mai rapida pentru echipe si o comunicare publica mai responsabila.",
          ],
        },
        {
          eyebrow: "Cable Sizing",
          title: "Cable sizing asistat prin sabloane si calcule controlate",
          points: [
            "Pentru dimensionare, workflow-ul colecteaza doar datele de intrare necesare si foloseste un sablon dedicat de calcul.",
            "Mesajul de marketing ramane clar: asistenta tehnica mai rapida, fara improvizatie.",
            "Utilizatorul primeste un rezultat compact, bine ghidat si usor de urmat.",
          ],
        },
        {
          eyebrow: "Senior MES",
          title: "Ghid operational pentru fluxurile Senior MES",
          points: [
            "Asistentul poate explica pasii operationali pentru BOM, productie, activitati si verificari de status in Senior MES.",
            "Informatiile sunt structurate pentru executie, nu pentru zgomot informational.",
            "Astfel, DMT obtine un strat de suport digital care accelereaza adoptarea fluxurilor interne.",
          ],
        },
        {
          eyebrow: "PDF Intelligence",
          title: "Analiza, sumar si extractie din PDF-uri relevante",
          points: [
            "Pentru documente PDF, asistentul poate analiza, sumariza si extrage strict informatia ceruta.",
            "Asta transforma documentatia grea intr-o experienta mult mai usor de consumat.",
            "Public, comunicam valoarea: viteza de acces la informatie, nu continutul sensibil al documentelor.",
          ],
        },
      ]
    : [
        {
          eyebrow: "Planning & Offers",
          title: "Planning and offers in one clear operational flow",
          points: [
            "Questions about projects, offers, deliveries, status, and ownership are routed to the right logic.",
            "The assistant returns only the relevant information in a short, professional format.",
            "The result is faster decisions and less operational friction.",
          ],
        },
        {
          eyebrow: "Workload",
          title: "Visibility into weekly workload and capacity",
          points: [
            "For workload and availability questions, the system separates capacity, assignment, and additional need in a clear way.",
            "Responses are prepared for fast reading and direct action.",
            "The commercial message stays simple: more visibility, less uncertainty.",
          ],
        },
        {
          eyebrow: "PLC",
          title: "Fast assistance for PLC codes, modules, and hardware lookup",
          points: [
            "The PLC flow responds through precise logic for codes, descriptions, modules, and feature-based searches.",
            "The client sees a tool that reduces search time and supports technical work.",
            "Everything is presented as operational capability, not as raw data exposure.",
          ],
        },
        {
          eyebrow: "Internal Documents",
          title: "Guided access to internal rules, procedures, and documents",
          points: [
            "Questions about internal procedures are handled by a dedicated module built for clear and controlled answers.",
            "The assistant uses only the documents relevant to the requested topic.",
            "The outcome is a faster team experience and a more responsible public narrative.",
          ],
        },
        {
          eyebrow: "Cable Sizing",
          title: "Cable sizing assisted by templates and controlled calculations",
          points: [
            "For sizing requests, the workflow collects only the required inputs and uses a dedicated calculation template.",
            "The marketing message remains clear: faster technical assistance without improvisation.",
            "The user gets a compact, guided, and easy-to-follow result.",
          ],
        },
        {
          eyebrow: "Senior MES",
          title: "Operational guidance for Senior MES workflows",
          points: [
            "The assistant can explain operational steps for BOM, production, activities, and status checks inside Senior MES.",
            "Information is structured for execution, not noise.",
            "This gives DMT a digital support layer that accelerates internal workflow adoption.",
          ],
        },
        {
          eyebrow: "PDF Intelligence",
          title: "Analysis, summary, and extraction from relevant PDFs",
          points: [
            "For PDF documents, the assistant can analyze, summarize, and extract only the requested information.",
            "That turns heavy documentation into a much easier experience to consume.",
            "Publicly, we communicate the value: faster access to information, not the sensitive content itself.",
          ],
        },
      ];

  const impactStats = isRomanian
    ? [
        { value: "1", label: "entry point operational", text: "Un singur loc pentru intrebari tehnice, documente si routing intern." },
        { value: "7", label: "module livrate", text: "Planning, workload, PLC, documente, cable sizing, MES si PDF intelligence." },
        { value: "0", label: "improvizatie", text: "Raspunsuri ancorate in fisiere, reguli si procese configurate." },
      ]
    : [
        { value: "1", label: "operational entry point", text: "One place for technical requests, documents, and internal routing." },
        { value: "7", label: "delivered modules", text: "Planning, workload, PLC, documents, cable sizing, MES, and PDF intelligence." },
        { value: "0", label: "improvisation", text: "Answers grounded in configured files, rules, and processes." },
      ];

  const pillarMeta: Array<{ icon: PartnerIconName; accent: string; glow: string }> = [
    { icon: "route", accent: "from-[#0f79ff] to-[#13b5ba]", glow: "bg-[#0f79ff]/12" },
    { icon: "file", accent: "from-[#13b5ba] to-[#10b981]", glow: "bg-[#13b5ba]/12" },
    { icon: "shield", accent: "from-[#7c3aed] to-[#0f79ff]", glow: "bg-[#7c3aed]/10" },
  ];

  const moduleMeta: Array<{ icon: PartnerIconName; accent: string; signal: string }> = [
    { icon: "workflow", accent: "from-[#0f79ff] to-[#13b5ba]", signal: "bg-[#0f79ff]" },
    { icon: "grid", accent: "from-[#13b5ba] to-[#10b981]", signal: "bg-[#13b5ba]" },
    { icon: "brain", accent: "from-[#7c3aed] to-[#0f79ff]", signal: "bg-[#7c3aed]" },
    { icon: "file", accent: "from-[#10b981] to-[#f59e0b]", signal: "bg-[#10b981]" },
    { icon: "spark", accent: "from-[#f59e0b] to-[#e11d48]", signal: "bg-[#f59e0b]" },
    { icon: "route", accent: "from-[#e11d48] to-[#7c3aed]", signal: "bg-[#e11d48]" },
    { icon: "shield", accent: "from-[#0f79ff] to-[#7c3aed]", signal: "bg-[#0f79ff]" },
  ];

  return (
    <main className="page-gradient-shell pb-10">
      <section className="relative overflow-hidden pt-32">
        <div className="section-shell">
          <div className="reveal-section relative overflow-hidden rounded-[2.8rem] border border-[#d8e4ee] bg-[radial-gradient(circle_at_top_left,rgba(19,181,186,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(15,121,255,0.18),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(244,250,255,0.96)_44%,rgba(235,246,255,0.94)_100%)] p-6 shadow-[0_34px_90px_rgba(11,31,53,0.14)] md:p-8 xl:p-10">
            <div className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-[#13b5ba]/12 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-[#0f79ff]/12 blur-3xl" />

            <Breadcrumbs
              items={[
                { label: isRomanian ? "Acasa" : "Home", href: "/" },
                { label: isRomanian ? "Parteneri" : "Partners" },
              ]}
            />

            <div className="mt-8 grid gap-10 xl:grid-cols-[1fr_0.96fr] xl:items-center">
              <div>
                <div className="inline-flex rounded-full border border-[#0f79ff]/14 bg-white/86 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0b58d0] shadow-[0_14px_30px_rgba(15,121,255,0.08)]">
                  {isRomanian ? "Custom AI Assistant vandut si adaptat" : "Custom AI Assistant sold and adapted"}
                </div>

                <Image
                  src={dmtLogo}
                  alt="DMT Marine Equipment logo"
                  className="mt-6 h-14 w-14 rounded-xl object-cover shadow-[0_18px_38px_rgba(11,31,53,0.08)]"
                  priority
                />
                <div className="mt-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0b58d0]">
                    DMT Marine Equipment
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {isRomanian
                      ? "Exemplu de produs AI livrat catre client"
                      : "Example of an AI product delivered to a client"}
                  </p>
                </div>

                <h1 className="font-display mt-8 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#081a2b] md:text-6xl">
                  {isRomanian
                    ? "Pentru DMT am vandut si adaptat un Custom AI Assistant operational care transforma intrebarile complexe in raspunsuri rapide, bine rutate si bazate strict pe fisierele si procesele configurate."
                    : "For DMT we sold and adapted an operational Custom AI Assistant that turns complex requests into fast, well-routed answers grounded strictly in the configured files and processes."}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#3a5b74] md:text-lg">
                  {isRomanian
                    ? "Rezultatul arata cum produsul principal SyntraFlow poate deveni oferta potrivita pentru un client real: demo clar, valoare concreta si implementare controlata."
                    : "The result shows how SyntraFlow's main product can become the right offer for a real client: clear demo, concrete value, and controlled implementation."}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {heroTags.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#d9e5ef] bg-white/84 px-4 py-2 text-sm font-medium text-[#0b1f35] shadow-[0_12px_28px_rgba(11,31,53,0.05)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <CTAButton href="/contact">
                    {isRomanian ? "Cere un AI Assistant similar" : "Request a similar AI Assistant"}
                  </CTAButton>
                  <CTAButton href="/product#ai" variant="secondary">
                    {isRomanian ? "Vezi produsul principal" : "View the main product"}
                  </CTAButton>
                </div>
              </div>

              <PartnersDeviceShowcase isRomanian={isRomanian} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[2.45rem] border border-[#d2e4f3] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(239,249,255,0.9)_48%,rgba(241,253,249,0.86))] p-5 shadow-[0_30px_86px_rgba(11,31,53,0.12)] md:p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0f79ff,#13b5ba,#10b981,#f59e0b,#7c3aed)]" />
            <div className="pointer-events-none absolute -left-20 top-16 h-52 w-52 rounded-full bg-[#0f79ff]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#13b5ba]/10 blur-3xl" />

            <div className="relative grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
              <div>
                <SectionHeading
                  eyebrow={isRomanian ? "De ce conteaza" : "Why it matters"}
                  title={
                    isRomanian
                      ? "Un produs AI vandut, adaptat si folosit intr-un context real"
                      : "An AI product sold, adapted, and used in a real context"
                  }
                  description={
                    isRomanian
                      ? "Pentru DMT, AI-ul nu este prezentat ca efect vizual, ci ca produs de lucru: intelege intentia, alege fluxul corect si pastreaza raspunsurile controlate."
                      : "For DMT, AI is not presented as a visual effect. It works as a product: it understands intent, selects the right flow, and keeps answers controlled."
                  }
                />

                <div className="mt-7 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  {impactStats.map((item, index) => (
                    <div
                      key={item.label}
                      className="group rounded-[1.35rem] border border-[#d6e7f5] bg-white/82 p-4 shadow-[0_16px_36px_rgba(11,31,53,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/22 hover:bg-white hover:shadow-[0_24px_52px_rgba(15,121,255,0.1)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#0f79ff]/14 bg-[#eef6ff] text-lg font-semibold text-[#0b58d0] transition duration-300 group-hover:scale-105">
                          {item.value}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-[#0b1f35]">{item.label}</span>
                          <span className="mt-1 block text-xs leading-5 text-muted">{item.text}</span>
                        </span>
                      </div>
                      <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${pillarMeta[index % pillarMeta.length].accent}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                {pillars.map((item, index) => {
                  const meta = pillarMeta[index % pillarMeta.length];

                  return (
                    <article
                      key={item.id}
                      className="group relative overflow-hidden rounded-[1.8rem] border border-[#d6e7f5] bg-white/86 p-5 shadow-[0_18px_46px_rgba(11,31,53,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/24 hover:bg-white hover:shadow-[0_28px_64px_rgba(15,121,255,0.12)] md:p-6"
                    >
                      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${meta.glow} blur-3xl transition duration-500 group-hover:scale-125`} />
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.accent}`} />
                      <div className="relative flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8e7f5] bg-[#f8fcff] text-[#0b58d0] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 group-hover:scale-105 group-hover:bg-white">
                          <PartnerIcon name={meta.icon} />
                        </span>
                        <span className="rounded-full border border-[#d8e7f5] bg-white/82 px-3 py-1 text-xs font-semibold text-[#557089]">
                          {item.id}
                        </span>
                      </div>
                      <h2 className="relative mt-5 text-2xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h2>
                      <p className="relative mt-4 text-sm leading-7 text-muted">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="pb-16 pt-6 md:pb-20 md:pt-8">
        <div className="section-shell">
          <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:items-start">
            <div className="xl:sticky xl:top-28">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#d2e4f3] bg-white/82 p-6 shadow-[0_22px_60px_rgba(11,31,53,0.09)] backdrop-blur-xl md:p-7">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0f79ff,#13b5ba,#10b981)]" />
                <SectionHeading
                  eyebrow={isRomanian ? "Ce am livrat" : "What we delivered"}
                  title={
                    isRomanian
                      ? "Ce poate include produsul AI vandut unui client"
                      : "What the AI product sold to a client can include"
                  }
                  description={
                    isRomanian
                      ? "Fiecare modul are un rol clar in oferta: reduce cautarea manuala, directioneaza cererea si transforma documentatia in raspunsuri pregatite pentru actiune."
                      : "Each module has a clear role in the offer: reduce manual search, route the request, and turn documentation into answers ready for action."
                  }
                />

                <div className="mt-7 grid gap-3">
                  {(isRomanian
                    ? ["Intentie detectata", "Flux selectat", "Raspuns controlat"]
                    : ["Intent detected", "Flow selected", "Controlled answer"]
                  ).map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-[1.1rem] border border-[#d8e7f5] bg-[#f8fcff] px-4 py-3 text-sm font-semibold text-[#0b1f35]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0b58d0] shadow-[0_8px_18px_rgba(11,31,53,0.06)]">
                        <PartnerIcon name={index === 0 ? "brain" : index === 1 ? "route" : "shield"} className="h-4 w-4" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {modules.map((item, index) => {
                const meta = moduleMeta[index % moduleMeta.length];

                return (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-[1.85rem] border border-[#d8e4ee] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,255,0.92))] p-5 shadow-[0_18px_48px_rgba(11,31,53,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/22 hover:bg-white hover:shadow-[0_28px_68px_rgba(15,121,255,0.12)] md:p-6"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.accent}`} />
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d8e7f5] bg-[#f8fcff] text-[#0b58d0] transition duration-300 group-hover:scale-105 group-hover:bg-white">
                        <PartnerIcon name={meta.icon} />
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e7f5] bg-white/82 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-normal text-[#557089]">
                        <span className={`h-2 w-2 rounded-full ${meta.signal}`} />
                        {item.eyebrow}
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h2>
                    <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35556f]">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3 rounded-[1rem] border border-transparent px-3 py-2 transition duration-300 group-hover:border-[#dceaf6] group-hover:bg-[#f8fcff]">
                          <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef6ff] text-[#0b58d0]">
                            <PartnerIcon name="check" className="h-3.5 w-3.5" />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
