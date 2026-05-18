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
      ? "SyntraFlow este construit ca un sistem comercial modern: raspuns instant, lead-uri mai curate si interactiuni digitale care duc mai repede spre vanzare."
      : "SyntraFlow is built as a modern commercial system: instant replies, cleaner leads, and digital interactions that move faster toward revenue.",
    "/despre-proiect",
    locale,
  );
}

const pageCopy = {
  ro: {
    intro: {
      eyebrow: "Despre proiect",
      currentLabel: "Despre proiect",
      title: "Un sistem digital premium care transforma interactiunile in oportunitati comerciale",
      description: "SyntraFlow combina website, asistent AI si automatizari pentru branduri care vor raspuns rapid, lead-uri calificate si un traseu de vanzare mai controlat.",
      highlights: ["Experienta premium", "Lead-uri calificate", "Flux comercial", "Scenarii reale"],
    },
    objectives: [
      {
        title: "Prezenta digitala care inspira incredere",
        text: "Experienta arata premium, raspunde rapid si creeaza un prim contact care sustine decizia de cumparare.",
      },
      {
        title: "AI pozitionat ca motor de conversie",
        text: "Asistentul nu este decorativ: califica intentia, colecteaza context si muta cererea spre pasul comercial potrivit.",
      },
      {
        title: "Baza scalabila pentru crestere",
        text: "Structura modulara permite extinderea spre noi produse, fluxuri si canale fara sa schimbi promisiunea comerciala.",
      },
    ],
    userProblems: [
      "Raspuns lent la solicitari repetitive si intrebari frecvente.",
      "Lead-uri incomplete, fara date suficiente pentru evaluare comerciala.",
      "Timp pierdut in trierea manuala a cererilor venite din trafic digital.",
      "Lipsa unui flux clar intre contact initial, validare si follow-up.",
    ],
  },
  en: {
    intro: {
      eyebrow: "About",
      currentLabel: "About",
      title: "A premium digital system that turns interactions into commercial opportunities",
      description: "SyntraFlow combines website, AI assistant, and automations for brands that want fast replies, qualified leads, and a more controlled sales journey.",
      highlights: ["Premium experience", "Qualified leads", "Commercial flow", "Real scenarios"],
    },
    objectives: [
      {
        title: "Digital presence that builds trust",
        text: "The experience feels premium, replies quickly, and creates a first contact that supports buying decisions.",
      },
      {
        title: "AI positioned as a conversion engine",
        text: "The assistant is not decorative: it qualifies intent, captures context, and moves requests toward the right commercial step.",
      },
      {
        title: "A scalable base for growth",
        text: "The modular structure supports new products, flows, and channels without changing the commercial promise.",
      },
    ],
    userProblems: [
      "Slow replies to repetitive requests and frequent questions.",
      "Incomplete leads with too little information for commercial evaluation.",
      "Time lost in manually sorting requests coming from digital traffic.",
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
              title={locale === "ro" ? "De ce merita SyntraFlow in funnelul tau" : "Why SyntraFlow belongs in your funnel"}
              description={locale === "ro"
                ? "Businessurile pierd oportunitati cand raspund greu, cer prea multe clarificari si nu transforma interesul in actiune imediata."
                : "Businesses lose opportunities when replies are slow, clarification takes too long, and interest does not turn into immediate action."}
            />
            <p className="mt-6 text-base leading-8 text-muted">
              {locale === "ro"
                ? "SyntraFlow transforma prezenta digitala intr-un motor comercial care comunica, filtreaza, directioneaza si pregateste fiecare cerere pentru urmatorul pas."
                : "SyntraFlow turns digital presence into a commercial engine that communicates, filters, routes, and prepares every request for the next step."}
            </p>
            <p className="mt-5 text-base leading-8 text-muted">
              {locale === "ro"
                ? "Rezultatul este un prim contact mai rapid, un mesaj mai coerent si mai putina munca manuala pentru echipele care trebuie sa vanda, nu sa sorteze mesaje."
                : "The result is faster first contact, a more consistent message, and less manual work for teams that need to sell, not sort messages."}
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
                ? "O experienta care arata premium si lucreaza comercial"
                : "An experience that looks premium and works commercially"}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted">
              {locale === "ro"
                ? "SyntraFlow reduce timpul pana la raspuns, capteaza datele potrivite si transforma interactiunile repetitive in oportunitati mai bine calificate."
                : "SyntraFlow reduces time to reply, captures the right data, and turns repetitive interactions into better-qualified opportunities."}
            </p>
            <p className="mt-5 text-base leading-8 text-muted">
              {locale === "ro"
                ? "Este construit pentru discutii comerciale mai puternice: promisiune clara, demo usor de inteles si un traseu care arata rapid valoarea."
                : "It is built for stronger sales conversations: a clear promise, an easy-to-understand demo, and a journey that quickly shows value."}
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
                ? "Directia este simpla: contact initial mai bun, lead-uri mai curate si un traseu comercial mai usor de controlat."
                : "The direction is simple: better first contact, cleaner leads, and a commercial journey that is easier to control."}
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
                    ? "SyntraFlow transforma traficul digital intr-un flux comercial care poate produce cereri reale."
                    : "SyntraFlow turns digital traffic into a commercial flow that can create real requests."}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted">
                  {locale === "ro"
                    ? "De la raspuns instant la lead capture, programare de demo si handoff catre echipa, fiecare etapa sustine o conversie mai rapida si mai bine pregatita."
                    : "From instant reply to lead capture, demo scheduling, and team handoff, every stage supports a faster and better-prepared conversion."}
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
