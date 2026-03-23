import { ContactForm } from "@/components/ui/contact-form";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    "Contact",
    locale === "ro"
      ? "Formularul de contact SyntraFlow pentru solicitari de demo, intrebari despre proiect si discutii privind automatizarea proceselor."
      : "The SyntraFlow contact form for demo requests, project questions, and conversations about process automation.",
    "/contact",
    locale,
  );
}

export default async function ContactPage() {
  const locale = await getServerLocale();
  const responseHighlights = locale === "ro"
    ? [
        {
          value: "<24h",
          label: "Raspuns initial",
          detail: "Pentru demo, oferta sau clarificari despre arhitectura.",
        },
        {
          value: "4 fluxuri",
          label: "Solicitari acoperite",
          detail: "Demo, oferta, suport si consultanta intr-un singur traseu.",
        },
        {
          value: "L-V 09-18",
          label: "Program prezentari",
          detail: "Interval folosit pentru demonstratii, follow-up si validare.",
        },
      ]
    : [
        {
          value: "<24h",
          label: "Initial response",
          detail: "For demos, quotes, or architecture clarifications.",
        },
        {
          value: "4 flows",
          label: "Request coverage",
          detail: "Demo, quote, support, and consulting in one journey.",
        },
        {
          value: "Mon-Fri 09-18",
          label: "Presentation hours",
          detail: "Used for demos, follow-up, and validation.",
        },
      ];
  const contactChannels = locale === "ro"
    ? [
        {
          title: "Email principal",
          value: "contact@syntraflow.local",
          description: "Canalul recomandat pentru sumarul solicitarii si trimiterea contextului initial.",
        },
        {
          title: "Tipuri de cereri",
          value: "Demo, oferta, suport, consultanta",
          description: "Formularul adapteaza fluxul in functie de intentie si pregateste pasul urmator.",
        },
        {
          title: "Format demo",
          value: "Validare + progres + feedback",
          description: "Experienta simuleaza o preluare profesionala, usor de prezentat intr-un pitch.",
        },
      ]
    : [
        {
          title: "Primary email",
          value: "contact@syntraflow.local",
          description: "Recommended for the request summary and the first layer of context.",
        },
        {
          title: "Request types",
          value: "Demo, quote, support, consulting",
          description: "The form adapts the flow based on intent and prepares the next step.",
        },
        {
          title: "Demo format",
          value: "Validation + progress + feedback",
          description: "The experience simulates a professional intake flow that works well in a pitch.",
        },
      ];

  return (
    <main className="pb-8">
      <PageIntro
        locale={locale}
        eyebrow="Contact"
        currentLabel="Contact"
        title={locale === "ro"
          ? "Trimite o solicitare, cere un demo sau foloseste pagina ca punct final de prezentare"
          : "Send a request, ask for a demo, or use this page as the final conversion point"}
        description={locale === "ro"
          ? "Formularul de mai jos este validat client-side si simuleaza un flux de contact profesional, potrivit pentru demo-uri, oferte si prezentarea produsului."
          : "The form below is validated client-side and simulates a professional contact flow, suitable for demos, quotes, and product presentations."}
        highlights={locale === "ro"
          ? ["Raspuns rapid", "Formular ghidat", "Demo & oferta", "UX premium"]
          : ["Fast response", "Guided form", "Demo & quote", "Premium UX"]}
      />

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-32">
            <article className="panel-surface contact-card-hover reveal-section relative overflow-hidden rounded-[2.25rem] p-6 md:p-8">
              <div className="contact-orb absolute -left-10 top-10 h-28 w-28 rounded-full bg-[#0f79ff]/10 blur-3xl" />
              <div className="contact-orb contact-orb-delay absolute right-0 top-0 h-36 w-36 rounded-full bg-[#13b5ba]/12 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {locale === "ro" ? "Context de demo" : "Demo context"}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {locale === "ro" ? "Disponibil pentru prezentari" : "Available for presentations"}
                  </span>
                </div>

                <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-[2.2rem]">
                  {locale === "ro"
                    ? "Contact profesional pentru demo, oferta si prezentare de produs"
                    : "Professional contact flow for demos, quotes, and product presentations"}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
                  {locale === "ro"
                    ? "Pagina poate fi folosita intr-un pitch sau intr-o prezentare academica pentru a arata un punct final de conversie clar, validat si usor de urmarit."
                    : "This page works well in a pitch or academic presentation to show a clear, validated, easy-to-follow conversion point."}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {responseHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.35rem] border border-[#d6e5f4] bg-white/80 p-4 shadow-[0_14px_28px_rgba(11,31,53,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(11,31,53,0.08)]"
                    >
                      <p className="text-lg font-semibold text-[#0b1f35]">{item.value}</p>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.label}</p>
                      <p className="mt-2 text-xs leading-6 text-muted">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="panel-surface contact-card-hover reveal-section rounded-[2rem] p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {locale === "ro" ? "Canale si format" : "Channels and format"}
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
                    {locale === "ro" ? "Informatii utile pentru conversie" : "Conversion-ready contact details"}
                  </h3>
                </div>
                <span className="rounded-full border border-[#0f79ff]/10 bg-[#eef6ff] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {locale === "ro" ? "Clar si prezentabil" : "Clear and presentable"}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {contactChannels.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.35rem] border border-[#d7e6f5] bg-[linear-gradient(180deg,rgba(248,252,255,0.98),rgba(255,255,255,0.9))] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/18 hover:shadow-[0_18px_34px_rgba(11,31,53,0.07)]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.title}</p>
                    <p className="mt-2 text-sm font-semibold text-[#0b1f35]">{item.value}</p>
                    <p className="mt-2 text-xs leading-6 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <ContactForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
