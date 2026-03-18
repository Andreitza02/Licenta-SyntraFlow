import { ArchitectureCard } from "@/components/ui/architecture-card";
import { CTAButton } from "@/components/ui/cta-button";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Arhitectura" : "Architecture",
    locale === "ro"
      ? "Prezentarea modului in care SyntraFlow sustine raspunsuri rapide, procese clare si interactiuni sigure cu clientii."
      : "A presentation of how SyntraFlow supports fast responses, clear processes, and secure customer interactions.",
    "/arhitectura",
    locale,
  );
}

export default async function ArchitecturePage() {
  const locale = await getServerLocale();
  const { architectureLayers } = getSiteData(locale);

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Cum functioneaza" : "How it works"}
        currentLabel={locale === "ro" ? "Arhitectura" : "Architecture"}
        title={locale === "ro"
          ? "Un sistem clar, sigur si pregatit sa sustina interactiuni mai bune cu clientii"
          : "A clear, secure system built to support better customer interactions"}
        description={locale === "ro"
          ? "Fiecare etapa este gandita pentru raspunsuri rapide, colectare corecta a datelor si directionare eficienta catre urmatorul pas."
          : "Each stage is designed for fast answers, correct data collection, and efficient routing into the next step."}
        highlights={locale === "ro"
          ? ["Raspuns rapid", "Flux clar", "Automatizare", "Securitate"]
          : ["Fast response", "Clear flow", "Automation", "Security"]}
      />

      <section className="py-14">
        <div className="section-shell flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Puncte cheie" : "Key points"}
            </p>
            <p className="mt-2 text-sm text-muted">
              {locale === "ro"
                ? "Exploreaza fiecare zona pentru a vedea cum contribuie la o experienta mai rapida si mai clara pentru clienti."
                : "Explore each area to see how it contributes to a faster and clearer experience for customers."}
            </p>
          </div>
          <button
            type="button"
            className="rounded-full border border-[#0d3358]/10 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f35]"
            aria-label={locale === "ro" ? "Descarca rezumatul prezentarii" : "Download the presentation summary"}
          >
            {locale === "ro" ? "Descarca rezumatul" : "Download summary"}
          </button>
        </div>
        <div className="section-shell mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {architectureLayers.map((item) => (
            <ArchitectureCard key={item.title} item={item} locale={locale} />
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Diagrama logica" : "Logical diagram"}
            </p>
            <div className="mt-6 space-y-4">
              {(locale === "ro"
                ? [
                    "Vizitatorul primeste un traseu clar si usor de urmat chiar din primul contact.",
                    "Solicitarile sunt organizate si pregatite pentru a ajunge rapid unde trebuie.",
                    "Asistentul raspunde coerent si mentine conversatia utila pentru client.",
                    "Informatiile importante pot continua catre echipa potrivita fara pasi inutili.",
                  ]
                : [
                    "The visitor gets a clear and easy-to-follow path from the very first contact.",
                    "Requests are organized and prepared to reach the right destination quickly.",
                    "The assistant responds consistently and keeps the conversation useful for the customer.",
                    "Important information can move to the right team without unnecessary steps.",
                  ]).map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-[1.5rem] bg-[#f4fbff] px-4 py-4">
                  <span className="font-display flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f79ff] text-sm font-semibold text-white">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-7 text-[#0d3358]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="accent-border rounded-[2rem] bg-[#0b1f35] p-6 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              {locale === "ro" ? "Securitate si privacy" : "Security and privacy"}
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/82">
              {(locale === "ro"
                ? [
                    "Minimizarea datelor colectate la strictul necesar pentru scopul interactiunii.",
                    "Validare a inputului si limitarea transmiterii de informatii incomplete sau ambigue.",
                    "Trasabilitate pentru evenimente, utila in audit si analiza de performanta.",
                  ]
                : [
                    "Data minimization, collecting only what is necessary for the interaction goal.",
                    "Input validation that limits incomplete or ambiguous information from being sent forward.",
                    "Traceability for events, useful in audits and performance analysis.",
                  ]).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <CTAButton href="/contact" variant="secondary" className="bg-white text-[#0b1f35]">
                {locale === "ro" ? "Solicita o demonstratie" : "Request a demonstration"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
