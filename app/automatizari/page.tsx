import { AutomationScenarioExplorer } from "@/components/sections/automation-scenario-explorer";
import { CTAButton } from "@/components/ui/cta-button";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

type AutomationCard = {
  title: string;
  text: string;
};

type ProductRole = {
  title: string;
  label: string;
  text: string;
};

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Automatizari pentru vanzare" : "Sales Automation",
    locale === "ro"
      ? "Automatizari SyntraFlow care fac produsele mai usor de vandut: lead capture, CRM, follow-up si fluxuri pentru oferta."
      : "SyntraFlow automation that makes products easier to sell: lead capture, CRM, follow-up, and quote flows.",
    "/automatizari",
    locale,
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12" />
      <path d="m11.5 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4.5 10.4 3.2 3.2 7.8-8.2" />
    </svg>
  );
}

function ProductRoleCard({ item }: { item: ProductRole }) {
  return (
    <article className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_16px_36px_rgba(11,31,53,0.06)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.label}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
    </article>
  );
}

export default async function AutomationsPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  const automationCards: AutomationCard[] = isRomanian
    ? [
        {
          title: "Flux de cerere oferta",
          text: "Transforma discutia din asistent in cerere pregatita pentru sales, cu date de contact si obiectiv clar.",
        },
        {
          title: "Flux demo si consultanta",
          text: "Pregateste programarea, contextul si motivul discutiei ca echipa sa vanda mai ordonat.",
        },
        {
          title: "Flux CRM si follow-up",
          text: "Pastreaza istoricul cererii si trimite urmatorul pas catre echipa sau catre client.",
        },
      ]
    : [
        {
          title: "Quote request flow",
          text: "Turns the assistant conversation into a sales-ready request with contact details and a clear goal.",
        },
        {
          title: "Demo and consulting flow",
          text: "Prepares the meeting, context, and reason for the conversation so the team can sell more clearly.",
        },
        {
          title: "CRM and follow-up flow",
          text: "Keeps the request history and sends the next step to the team or to the client.",
        },
      ];

  const productRoles: ProductRole[] = isRomanian
    ? [
        {
          label: "Best seller",
          title: "Custom AI Assistant",
          text: "Automatizarile il fac mai vandabil: lead capture, rutare si follow-up dupa conversatie.",
        },
        {
          label: "Prezenta digitala",
          title: "Website Builder",
          text: "Formularele si CTA-urile pot transforma pagina intr-un canal de cereri si demo-uri.",
        },
        {
          label: "Recurent",
          title: "Website Hosting",
          text: "Hostingul devine mai usor de vandut cand clientul vede continuitate, mentenanta si stabilitate.",
        },
      ]
    : [
        {
          label: "Best seller",
          title: "Custom AI Assistant",
          text: "Automation makes it more sellable: lead capture, routing, and follow-up after the conversation.",
        },
        {
          label: "Digital presence",
          title: "Website Builder",
          text: "Forms and CTAs can turn the page into a channel for requests and demos.",
        },
        {
          label: "Recurring",
          title: "Website Hosting",
          text: "Hosting becomes easier to sell when the client sees continuity, maintenance, and stability.",
        },
      ];

  return (
    <main className="page-gradient-shell overflow-hidden pb-12">
      <section className="relative pb-12 pt-32 md:pt-36">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div className="max-w-4xl">
              <p className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#13b5ba]" />
                {isRomanian ? "Automatizari pentru vanzare" : "Automation for sales"}
              </p>
              <h1 className="font-display mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#06192c] md:text-6xl lg:text-7xl">
                {isRomanian
                  ? "Automatizarile fac produsele SyntraFlow mai usor de cumparat."
                  : "Automation makes SyntraFlow products easier to buy."}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#365a78] md:text-lg">
                {isRomanian
                  ? "Dupa ce clientul vede Custom AI Assistant, automatizarile arata cum cererea se transforma in lead clar, oferta, demo sau follow-up."
                  : "After the client sees Custom AI Assistant, automation shows how the request becomes a clear lead, quote, demo, or follow-up."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/product#ai" className="gap-2">
                  <span>{isRomanian ? "Vezi produsul principal" : "View main product"}</span>
                  <ArrowIcon />
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" className="bg-white">
                  {isRomanian ? "Cere flux de vanzare" : "Request sales flow"}
                </CTAButton>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#13b5ba]/16 bg-white/86 p-5 shadow-[0_26px_70px_rgba(19,181,186,0.12)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
                {isRomanian ? "Ce se intampla dupa conversatie" : "What happens after the conversation"}
              </p>
              <div className="mt-5 grid gap-3">
                {(isRomanian
                  ? ["Cerere structurata", "Lead calificat", "Notificare echipa", "Follow-up pregatit"]
                  : ["Structured request", "Qualified lead", "Team notification", "Prepared follow-up"]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[1.15rem] border border-[#d8e6f4] bg-[#f8fcff] px-4 py-3 text-sm font-semibold text-[#0b1f35]">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#13b5ba] text-white">
                      <CheckIcon />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            {automationCards.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_16px_36px_rgba(11,31,53,0.06)]">
                <h2 className="text-xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#0d3358]/10 bg-white/78 p-4 shadow-[0_28px_74px_rgba(11,31,53,0.08)] backdrop-blur-xl md:p-6">
            <div className="mb-5 max-w-3xl px-1 md:px-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {isRomanian ? "Produse sustinute de automatizari" : "Products supported by automation"}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-normal text-[#0b1f35] md:text-4xl">
                {isRomanian ? "Fiecare produs are un rol clar in traseul de vanzare." : "Every product has a clear role in the sales path."}
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {productRoles.map((item) => (
                <ProductRoleCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <AutomationScenarioExplorer locale={locale} />
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-[#d8e6f4] bg-white/86 p-6 shadow-[0_24px_64px_rgba(11,31,53,0.08)] backdrop-blur-xl md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {isRomanian ? "Ce adaugi peste best seller" : "What you add to the best seller"}
            </p>
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#0b1f35]">
              {(isRomanian
                ? [
                    "Validare pentru nume, telefon, email, companie si intentie.",
                    "Clasificare pe fluxuri: oferta, suport, demo, consultanta.",
                    "Trimitere catre CRM, email sau lista interna de follow-up.",
                    "Mesaje de confirmare pentru client si istoric intern.",
                  ]
                : [
                    "Validation for name, phone, email, company, and intent.",
                    "Classification across quote, support, demo, and consulting flows.",
                    "Sending to CRM, email, or internal follow-up list.",
                    "Confirmation messages for the client and internal history.",
                  ]).map((item) => (
                <li key={item} className="flex gap-3 rounded-[1.15rem] border border-[#e1edf8] bg-[#fbfdff] px-4 py-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0f79ff] text-white">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-[#0d3358]/10 bg-[#0b1f35] p-6 text-white shadow-[0_26px_70px_rgba(11,31,53,0.22)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8bd7ff]">
              {isRomanian ? "Rezultat" : "Result"}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-normal text-white">
              {isRomanian ? "Produs mai vandabil, nu doar mai automatizat." : "A more sellable product, not just a more automated one."}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/76">
              {isRomanian
                ? "Clientul vede un sistem complet: raspunde, colecteaza, trimite context si pregateste urmatorul pas comercial."
                : "The client sees a complete system: it replies, captures, sends context, and prepares the next commercial step."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTAButton href="/contact" variant="secondary" className="bg-white text-[#0b1f35]">
                {isRomanian ? "Adauga automatizari la oferta" : "Add automation to the offer"}
              </CTAButton>
              <CTAButton href="/solutii" className="gap-2">
                <span>{isRomanian ? "Vezi solutiile" : "View solutions"}</span>
                <ArrowIcon />
              </CTAButton>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
