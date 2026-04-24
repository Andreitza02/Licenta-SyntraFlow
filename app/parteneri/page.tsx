import Image from "next/image";

import dmtLogo from "../../DMT LOGO.jpg";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Parteneri" : "Partners",
    locale === "ro"
      ? "Pentru DMT Marine Equipment prezentam un AI operational assistant cu rutare inteligenta, module specializate si raspunsuri bazate strict pe fisiere, fara expunere de date personale pe website."
      : "For DMT Marine Equipment we present an operational AI assistant with intelligent routing, specialized modules, and file-grounded answers, without exposing personal data on the website.",
    "/parteneri",
    locale,
  );
}

export default async function PartnersPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  const heroTags = isRomanian
    ? ["DMT x SyntraFlow", "Operational AI", "Smart Routing", "Secure by design"]
    : ["DMT x SyntraFlow", "Operational AI", "Smart Routing", "Secure by design"];

  const heroSignals = isRomanian
    ? [
        { label: "Focus", value: "Electrical Department AI" },
        { label: "Format", value: "Operational assistant with specialized flows" },
        { label: "Public message", value: "Capabilities only, no personal data exposed" },
      ]
    : [
        { label: "Focus", value: "Electrical Department AI" },
        { label: "Format", value: "Operational assistant with specialized flows" },
        { label: "Public message", value: "Capabilities only, no personal data exposed" },
      ];

  const pillars = isRomanian
    ? [
        {
          id: "01",
          title: "Router inteligent pentru fiecare intrebare",
          text: "Pentru DMT am structurat un entry point unic care detecteaza intentia si trimite fiecare intrebare in modulul potrivit: planning, workload, PLC, documente interne, cable sizing, Senior MES sau PDF analysis.",
        },
        {
          id: "02",
          title: "Raspunsuri bazate strict pe fisiere si procese",
          text: "Asistentul nu improvizeaza. Fiecare raspuns este ancorat in fisierele, sabloanele si regulile de lucru configurate pentru fluxurile operationale relevante.",
        },
        {
          id: "03",
          title: "Prezentare publica sigura pentru website",
          text: "Pagina de parteneriat comunica valoarea livrata pentru DMT la nivel de capabilitate, fara nume, coduri, exemple sensibile sau alte informatii interne care nu trebuie expuse public.",
        },
      ]
    : [
        {
          id: "01",
          title: "An intelligent router for every request",
          text: "For DMT we designed a single entry point that detects intent and sends each request to the right module: planning, workload, PLC, internal documents, cable sizing, Senior MES, or PDF analysis.",
        },
        {
          id: "02",
          title: "Answers grounded strictly in files and processes",
          text: "The assistant does not improvise. Every answer is anchored in the files, templates, and workflow rules configured for the relevant operational flow.",
        },
        {
          id: "03",
          title: "A safe public website narrative",
          text: "The partnership page communicates the value delivered for DMT at capability level only, without names, codes, sensitive examples, or internal information that should not be exposed publicly.",
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

  const outcomes = isRomanian
    ? [
        "Un singur AI layer care poate prelua intrebari din mai multe zone operationale si le poate directiona corect.",
        "Un mod de lucru construit pe fisiere si reguli, nu pe presupuneri sau raspunsuri generice.",
        "O prezentare publica de parteneriat care arata clar ce am construit pentru DMT fara sa publice date personale sau exemple sensibile.",
        "O baza scalabila pentru extindere in alte module, alte documente si alte fluxuri interne, atunci cand businessul o cere.",
      ]
    : [
        "One AI layer that can take questions from multiple operational areas and route them correctly.",
        "A working model built on files and rules, not on assumptions or generic answers.",
        "A public partnership page that clearly shows what we built for DMT without publishing personal data or sensitive examples.",
        "A scalable base for expansion into more modules, more documents, and more internal workflows when the business needs it.",
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
                  {isRomanian ? "Operational AI built for DMT" : "Operational AI built for DMT"}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="overflow-hidden rounded-[1.35rem] border border-[#d9e5ef] bg-white p-2 shadow-[0_18px_38px_rgba(11,31,53,0.08)]">
                    <Image
                      src={dmtLogo}
                      alt="DMT Marine Equipment logo"
                      className="h-14 w-14 rounded-xl object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0b58d0]">
                      DMT Marine Equipment
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {isRomanian
                        ? "Case de parteneriat prezentat la nivel de capabilitate"
                        : "Partnership case presented at capability level"}
                    </p>
                  </div>
                </div>

                <h1 className="font-display mt-8 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[#081a2b] md:text-6xl">
                  {isRomanian
                    ? "Pentru DMT am construit un AI operational assistant care transforma intrebarile complexe in raspunsuri rapide, bine rutate si bazate strict pe fisierele si procesele configurate."
                    : "For DMT we built an operational AI assistant that turns complex requests into fast, well-routed answers grounded strictly in the configured files and processes."}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#3a5b74] md:text-lg">
                  {isRomanian
                    ? "Mesajul acestei pagini ramane intentionat la nivel de valoare si capabilitate. Aratam clar ce am construit pentru DMT, dar nu publicam nume, coduri interne, exemple sensibile sau alte informatii care trebuie pastrate in afara spatiului public."
                    : "The message on this page stays intentionally at capability and value level. We clearly show what we built for DMT, but we do not publish names, internal codes, sensitive examples, or other information that should stay outside the public website."}
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
                    {isRomanian ? "Discuta implementarea" : "Discuss the implementation"}
                  </CTAButton>
                  <CTAButton href="#modules" variant="secondary">
                    {isRomanian ? "Vezi modulele livrate" : "See the delivered modules"}
                  </CTAButton>
                </div>
              </div>

              <div className="reveal-section relative">
                <div className="relative overflow-hidden rounded-[2.3rem] border border-[#d8e4ee] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.92))] p-6 shadow-[0_28px_76px_rgba(11,31,53,0.14)] md:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0b58d0]">
                    {isRomanian ? "Parteneriat in productie" : "Partnership in production"}
                  </p>

                  <div className="mt-5 rounded-[2rem] bg-[linear-gradient(135deg,#07192c_0%,#0b2847_52%,#0f79ff_100%)] p-6 text-white shadow-[0_24px_60px_rgba(11,31,53,0.24)]">
                    <div className="flex items-center gap-4">
                      <div className="overflow-hidden rounded-[1.2rem] border border-white/18 bg-white p-2.5 shadow-[0_16px_34px_rgba(255,255,255,0.12)]">
                        <Image src={dmtLogo} alt="DMT logo" className="h-12 w-12 rounded-lg object-cover" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/64">
                          {isRomanian ? "Client in focus" : "Client in focus"}
                        </p>
                        <p className="mt-1 text-xl font-semibold">DMT Marine Equipment</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {heroSignals.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[1.25rem] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm"
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/58">
                            {item.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="absolute -bottom-6 -right-2 rounded-[1.35rem] border border-[#d8e4ee] bg-white/92 px-4 py-3 shadow-[0_20px_42px_rgba(11,31,53,0.12)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#557089]">
                    {isRomanian ? "Mesaj cheie" : "Core message"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0b1f35]">
                    {isRomanian ? "AI operational, file-grounded, secure by design" : "Operational AI, file-grounded, secure by design"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={isRomanian ? "De ce conteaza" : "Why it matters"}
            title={isRomanian
              ? "Pentru DMT am construit mai mult decat un chatbot: am construit o arhitectura de lucru"
              : "For DMT we built more than a chatbot: we built an operating architecture"}
            description={isRomanian
              ? "Mesajul de parteneriat trebuie sa arate clar ca sistemul raspunde pe baza de reguli, fisiere si fluxuri specializate, nu pe raspunsuri generice."
              : "The partnership message should make it clear that the system responds through rules, files, and specialized flows, not through generic replies."}
          />

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((item) => (
              <article
                key={item.id}
                className="panel-surface contact-card-hover reveal-section relative overflow-hidden rounded-[1.9rem] p-6"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/40 to-transparent" />
                <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-[#0f79ff]/30">{item.id}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35]">{item.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="py-16">
        <div className="section-shell space-y-8">
          <SectionHeading
            eyebrow={isRomanian ? "Ce am livrat" : "What we delivered"}
            title={isRomanian
              ? "Modulele care transforma AI-ul DMT intr-un instrument operational real"
              : "The modules that turn DMT AI into a real operational tool"}
            description={isRomanian
              ? "Fiecare modul comunica o functie clara in business: routing, raspunsuri documentate, suport pentru planning, zona tehnica si workflows operationale."
              : "Each module communicates a clear business function: routing, documented answers, planning support, technical support, and operational workflows."}
          />

          <div className="grid gap-5 xl:grid-cols-2">
            {modules.map((item) => (
              <article
                key={item.title}
                className="reveal-section overflow-hidden rounded-[2rem] border border-[#d8e4ee] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.9))] p-6 shadow-[0_20px_52px_rgba(11,31,53,0.1)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0b58d0]">{item.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35]">{item.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35556f]">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell grid gap-5 lg:grid-cols-[0.94fr_1.06fr]">
          <article className="panel-surface reveal-section rounded-[2rem] p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0b58d0]">
              {isRomanian ? "Rezultatul pentru client" : "The client outcome"}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-4xl">
              {isRomanian
                ? "Ce aratam public despre colaborarea cu DMT"
                : "What we show publicly about the collaboration with DMT"}
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[#0b1f35]">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="reveal-section overflow-hidden rounded-[2.2rem] border border-[#d8e4ee] bg-[linear-gradient(135deg,#07192c_0%,#0b2745_50%,#0f79ff_100%)] p-8 text-white shadow-[0_30px_80px_rgba(11,31,53,0.22)] md:p-10">
            <div className="flex items-center gap-4">
              <div className="overflow-hidden rounded-[1.3rem] border border-white/18 bg-white p-2.5 shadow-[0_18px_42px_rgba(255,255,255,0.14)]">
                <Image src={dmtLogo} alt="DMT Marine Equipment logo" className="h-14 w-14 rounded-xl object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/64">
                  {isRomanian ? "Parteneriat activ" : "Active partnership"}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">DMT Marine Equipment</p>
              </div>
            </div>

            <h2 className="font-display mt-8 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              {isRomanian
                ? "Pentru DMT prezentam un AI operational assistant care stie sa routeze, sa consulte fisierele potrivite si sa raspunda cu disciplina."
                : "For DMT we present an operational AI assistant that knows how to route, consult the right files, and answer with discipline."}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
              {isRomanian
                ? "Acesta este un mesaj de marketing construit responsabil: vorbim despre capabilitati reale, rezultate de produs si arhitectura de lucru, fara sa expunem date personale, exemple sensibile sau continut intern pe website."
                : "This is a responsibly built marketing message: we talk about real capabilities, product outcomes, and workflow architecture without exposing personal data, sensitive examples, or internal content on the website."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/contact" className="justify-center bg-white text-[#0b1f35] hover:!text-[#0b1f35]">
                {isRomanian ? "Solicita o prezentare" : "Request a presentation"}
              </CTAButton>
              <CTAButton
                href="/product"
                variant="secondary"
                className="justify-center border-white/22 bg-white/10 text-white hover:bg-white/16 hover:!text-white"
              >
                {isRomanian ? "Vezi produsul" : "View the product"}
              </CTAButton>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
