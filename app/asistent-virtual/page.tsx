import { CTAButton } from "@/components/ui/cta-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Asistent virtual" : "Assistant",
    locale === "ro"
      ? "Pagina dedicata asistentului virtual SyntraFlow: exemple conversationale, FAQ automat, lead qualification si extindere omnichannel."
      : "The SyntraFlow virtual assistant page: conversation examples, automated FAQ, lead qualification, and omnichannel expansion.",
    "/asistent-virtual",
    locale,
  );
}

export default async function AssistantPage() {
  const locale = await getServerLocale();
  const { faqItems } = getSiteData(locale);

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Asistent virtual" : "Assistant"}
        currentLabel={locale === "ro" ? "Asistent virtual" : "Assistant"}
        title={locale === "ro"
          ? "Un asistent care raspunde, filtreaza intentia si pregateste urmatorul pas"
          : "An assistant that answers, filters intent, and prepares the next step"}
        description={locale === "ro"
          ? "Componenta conversationala este nucleul experientei SyntraFlow. Ea poate livra raspunsuri FAQ, poate califica lead-uri si poate pregati o programare de demo sau o cerere de oferta."
          : "The conversational component is the core of the SyntraFlow experience. It can deliver FAQ answers, qualify leads, and prepare a demo booking or quote request."}
        highlights={locale === "ro"
          ? ["FAQ automat", "Lead qualification", "Multichannel ready", "Context controlat"]
          : ["Automated FAQ", "Lead qualification", "Multichannel ready", "Controlled context"]}
      />

      <section className="py-14">
        <div className="section-shell grid gap-5 lg:grid-cols-3">
          {[
            locale === "ro"
              ? {
                  title: "Ce face asistentul",
                  text: "Intelege intentia vizitatorului si alege intre informare, colectare de date sau escaladare.",
                }
              : {
                  title: "What the assistant does",
                  text: "It understands visitor intent and chooses between information, data capture, or escalation.",
                },
            locale === "ro"
              ? {
                  title: "Cum poate memora contextul",
                  text: "Pastreaza firul discutiei in sesiune si foloseste datele deja oferite pentru a evita repetitia inutila.",
                }
              : {
                  title: "How it keeps context",
                  text: "It keeps the thread of the discussion during the session and reuses known data to avoid unnecessary repetition.",
                },
            locale === "ro"
              ? {
                  title: "Unde poate fi extins",
                  text: "Structura este pregatita pentru website, widget integrat si viitoare conectari cu WhatsApp sau Facebook.",
                }
              : {
                  title: "Where it can expand",
                  text: "The structure is ready for the website, embedded widgets, and future connections with WhatsApp or Facebook.",
                },
          ].map((item) => (
            <article key={item.title} className="panel-surface rounded-[1.75rem] p-6">
              <h2 className="text-xl font-semibold text-[#0b1f35]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Functionalitati relevante" : "Relevant capabilities"}
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[#0b1f35]">
              {(locale === "ro"
                ? [
                    "Raspunde la intrebari frecvente folosind o baza de cunostinte configurabila.",
                    "Solicita date precum nume, email, telefon si companie doar cand intentia o cere.",
                    "Directioneaza catre vanzari, suport sau consultanta pe baza unor reguli simple.",
                    "Poate afisa CTA-uri contextuale pentru oferta, demo sau contact direct.",
                    "Sustine un ton coerent si o experienta unitara in toate punctele de contact digitale.",
                  ]
                : [
                    "Answers frequent questions using a configurable knowledge base.",
                    "Requests data like name, email, phone, and company only when the intent requires it.",
                    "Routes requests to sales, support, or consulting based on simple rules.",
                    "Can display contextual CTAs for quotes, demos, or direct contact.",
                    "Maintains a consistent tone and a unified experience across digital touchpoints.",
                  ]).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Canale si extensii" : "Channels and extensions"}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "Website",
                locale === "ro" ? "Landing page" : "Landing page",
                "WhatsApp",
                "Facebook Messenger",
                locale === "ro" ? "Widget helpdesk" : "Helpdesk widget",
                locale === "ro" ? "Portal clienti" : "Customer portal",
              ].map((item) => (
                <span key={item} className="rounded-full border border-[#0d3358]/10 bg-white px-4 py-2 text-sm font-medium text-[#0b1f35]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-[#0b1f35] p-5 text-sm leading-7 text-white/80">
              {locale === "ro"
                ? "Asistentul poate fi extins in mai multe puncte digitale si poate sustine aceeasi experienta clara pentru informare, calificare si directionare."
                : "The assistant can be extended across multiple digital touchpoints and can support the same clear experience for information, qualification, and routing."}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">FAQ</p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-4xl">
              {locale === "ro"
                ? "Intrebari uzuale despre modul conversational"
                : "Common questions about the conversational module"}
            </h2>
          </div>
          <CTAButton href="/contact" variant="secondary">
            {locale === "ro" ? "Solicita demo personalizat" : "Request a tailored demo"}
          </CTAButton>
        </div>
        <div className="section-shell mt-8">
          <FAQAccordion items={faqItems} locale={locale} />
        </div>
      </section>
    </main>
  );
}
