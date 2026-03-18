import { CTAButton } from "@/components/ui/cta-button";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Despre proiect" : "About",
    locale === "ro"
      ? "Contextul academic, obiectivele si relevanta practica ale platformei SyntraFlow pentru automatizarea si optimizarea proceselor de interactiune cu clientii."
      : "The academic context, objectives, and practical business relevance of the SyntraFlow platform for automating and optimizing customer interaction processes.",
    "/despre-proiect",
    locale,
  );
}

const pageCopy = {
  ro: {
    intro: {
      eyebrow: "Despre proiect",
      currentLabel: "Despre proiect",
      title: "O platforma web inteligenta construita pentru servicii mai rapide si interactiuni mai clare",
      description: "SyntraFlow este o platforma web inteligenta cu asistent virtual bazat pe inteligenta artificiala, gandita pentru automatizarea si optimizarea interactiunii cu clientii.",
      highlights: ["Experienta premium", "Flux clar", "Servicii automatizate", "Scenarii reale"],
    },
    objectives: [
      {
        title: "Solutie digitala credibila",
        text: "Platforma combina o experienta clara, automatizare si un traseu logic usor de prezentat clientilor.",
      },
      {
        title: "Servicii reflectate clar in produs",
        text: "Interfata evidentiaza rolul asistentului virtual AI in automatizarea, trierea si optimizarea interactiunilor cu clientii.",
      },
      {
        title: "Fundatie pentru extindere",
        text: "Structura modulara permite adaugarea de servicii noi, fluxuri noi si extinderea usoara catre scenarii reale de business.",
      },
    ],
    userProblems: [
      "Raspuns lent la solicitari repetitive si intrebari frecvente.",
      "Lead-uri incomplete, fara date suficiente pentru evaluare comerciala.",
      "Timp pierdut in trierea manuala a cererilor venite din website.",
      "Lipsa unui flux clar intre contact initial, validare si follow-up.",
    ],
  },
  en: {
    intro: {
      eyebrow: "About",
      currentLabel: "About",
      title: "A smart web platform built for faster service and clearer customer interactions",
      description: "SyntraFlow is a smart web platform with an AI virtual assistant designed to automate and optimize customer interaction flows.",
      highlights: ["Premium experience", "Clear flow", "Automated services", "Real scenarios"],
    },
    objectives: [
      {
        title: "Credible digital solution",
        text: "The platform combines a clear experience, automation, and a logical flow that is easy to present to clients.",
      },
      {
        title: "Services clearly reflected in the product",
        text: "The interface highlights how the AI virtual assistant supports automation, triage, and optimization across customer interactions.",
      },
      {
        title: "A strong base for expansion",
        text: "The modular structure supports new services, new flows, and easy extension into real business scenarios.",
      },
    ],
    userProblems: [
      "Slow replies to repetitive requests and frequent questions.",
      "Incomplete leads with too little information for commercial evaluation.",
      "Time lost in manually sorting requests coming from the website.",
      "No clear flow between first contact, validation, and follow-up.",
    ],
  },
} as const;

export default async function AboutProjectPage() {
  const locale = await getServerLocale();
  const copy = pageCopy[locale];

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={copy.intro.eyebrow}
        currentLabel={copy.intro.currentLabel}
        title={copy.intro.title}
        description={copy.intro.description}
        highlights={[...copy.intro.highlights]}
      />

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <SectionHeading
              eyebrow={locale === "ro" ? "Context" : "Context"}
              title={locale === "ro" ? "De ce a fost construita aceasta platforma" : "Why this platform was built"}
              description={locale === "ro"
                ? "Multe organizatii au nevoie de un punct digital de contact care sa raspunda rapid, sa colecteze corect datele esentiale si sa pregateasca urmatorul pas operational."
                : "Many organizations need a digital contact point that responds quickly, captures essential data correctly, and prepares the next operational step."}
            />
            <p className="mt-6 text-base leading-8 text-muted">
              {locale === "ro"
                ? "In locul unui simplu website de prezentare, SyntraFlow propune un sistem care comunica, filtreaza, directioneaza si optimizeaza fluxuri reale de interactiune cu clientii printr-un asistent virtual AI si automatizari conectate la procesele de business."
                : "Instead of a simple presentation website, SyntraFlow proposes a system that communicates, filters, routes, and optimizes real customer interaction flows through an AI virtual assistant and business-ready automations."}
            </p>
            <p className="mt-5 text-base leading-8 text-muted">
              {locale === "ro"
                ? "Platforma este relevanta pentru organizatii care au nevoie de viteza de raspuns, coerenta si standardizarea contactului initial, fara a incarca inutil echipele umane cu sarcini repetitive."
                : "The platform is relevant for organizations that need response speed, consistency, and a standardized first contact, without overloading human teams with repetitive tasks."}
            </p>
          </div>

          <div className="grid gap-5">
            {copy.objectives.map((item, index) => (
              <article key={item.title} className="panel-soft rounded-[1.75rem] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {locale === "ro" ? "Obiectiv" : "Objective"} 0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-2">
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Valoare practica" : "Practical value"}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
              {locale === "ro"
                ? "O experienta completa, clara si usor de prezentat"
                : "A complete, clear, and easy-to-present experience"}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              {locale === "ro"
                ? "Platforma arata cum pot fi simplificate interactiunile cu clientii prin raspunsuri rapide, colectare corecta a datelor si automatizarea etapelor repetitive."
                : "The platform shows how customer interactions can be simplified through fast answers, correct data collection, and automation of repetitive stages."}
            </p>
            <p className="mt-5 text-base leading-8 text-muted">
              {locale === "ro"
                ? "In acelasi timp, poate fi prezentata ca o solutie convingatoare in discutii comerciale, de prezentare sau de validare a unei directii digitale moderne."
                : "At the same time, it can be presented as a convincing solution in sales conversations, product presentations, or the validation of a modern digital direction."}
            </p>
          </div>

          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Probleme rezolvate" : "Problems solved"}
            </p>
            <ul className="mt-5 space-y-4">
              {copy.userProblems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-[#0b1f35]">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-[1.5rem] bg-[#0b1f35] p-5 text-sm leading-7 text-white/80">
              {locale === "ro"
                ? "Directia de transformare digitala este clara: un contact initial mai bun, date mai curate si un traseu operational mai usor de controlat."
                : "The digital transformation direction is clear: a better first contact, cleaner data, and an operational flow that is easier to control."}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell">
          <div className="accent-border rounded-[2rem] bg-white p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {locale === "ro" ? "Transformare digitala" : "Digital transformation"}
                </p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-4xl">
                  {locale === "ro"
                    ? "Platforma este gandita sa transforme o simpla vizita pe website intr-un flux util pentru organizatie."
                    : "The platform is designed to turn a simple website visit into a useful workflow for the organization."}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
                  {locale === "ro"
                    ? "De la raspuns informativ la lead capture, la programare de demo si trimitere de date catre un sistem intern, SyntraFlow ilustreaza concret cum pot fi automatizate si optimizate procesele de interactiune cu clientii."
                    : "From informative replies to lead capture, demo scheduling, and routing data into an internal system, SyntraFlow shows in concrete terms how customer interaction processes can be automated and optimized."}
                </p>
              </div>
              <CTAButton href="/solutii">
                {locale === "ro" ? "Exploreaza solutiile" : "Explore the solutions"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
