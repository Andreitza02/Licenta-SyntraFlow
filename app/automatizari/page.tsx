import { AutomationScenarioExplorer } from "@/components/sections/automation-scenario-explorer";
import { CTAButton } from "@/components/ui/cta-button";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Automatizari" : "Automation",
    locale === "ro"
      ? "Fluxuri cap-coada pentru raspuns automat, colectare de date, validare, rutare si follow-up in SyntraFlow."
      : "End-to-end flows for automated replies, data collection, validation, routing, and follow-up in SyntraFlow.",
    "/automatizari",
    locale,
  );
}

export default async function AutomationsPage() {
  const locale = await getServerLocale();

  return (
    <main className="pb-6">
      <PageIntro
        locale={locale}
        eyebrow={locale === "ro" ? "Automatizari" : "Automation"}
        currentLabel={locale === "ro" ? "Automatizari" : "Automation"}
        title={locale === "ro"
          ? "Fluxuri cap-coada care leaga asistenta conversationala de actiunile interne"
          : "End-to-end workflows that connect conversational support to internal actions"}
        description={locale === "ro"
          ? "Pagina prezinta traseul complet al unei solicitari: de la intrebarea initiala, pana la validare, trimitere catre echipa si notificare ulterioara."
          : "This page presents the complete lifecycle of a request: from the initial question to validation, routing to the team, and follow-up notification."}
        highlights={locale === "ro"
          ? ["Raspuns", "Validare", "Rutare", "Follow-up"]
          : ["Response", "Validation", "Routing", "Follow-up"]}
      />

      <section className="py-14">
        <div className="section-shell">
          <AutomationScenarioExplorer locale={locale} />
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-5 lg:grid-cols-3">
          {[
            locale === "ro"
              ? {
                  title: "Flux FAQ si suport",
                  text: "Utilizatorul intreaba, asistentul raspunde din knowledge base, iar exceptiile sunt escaladate impreuna cu un rezumat.",
                }
              : {
                  title: "FAQ and support flow",
                  text: "The user asks a question, the assistant replies from the knowledge base, and exceptions are escalated together with a summary.",
                },
            locale === "ro"
              ? {
                  title: "Flux de cerere oferta",
                  text: "Sunt colectate datele de contact si contextul comercial, apoi formularul este validat si transmis catre sales.",
                }
              : {
                  title: "Quote request flow",
                  text: "Contact data and commercial context are collected, then the form is validated and sent to sales.",
                },
            locale === "ro"
              ? {
                  title: "Flux pentru demo si consultanta",
                  text: "Vizitatorul selecteaza intentia de demo, iar platforma pregateste o solicitare clara pentru urmatorul contact.",
                }
              : {
                  title: "Demo and consulting flow",
                  text: "The visitor selects demo intent, and the platform prepares a clear request for the next touchpoint.",
                },
          ].map((item) => (
            <article key={item.title} className="panel-surface reveal-section rounded-[1.75rem] p-6">
              <h2 className="text-xl font-semibold text-[#0b1f35]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="panel-surface reveal-section rounded-[2rem] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Control operational" : "Operational control"}
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[#0b1f35]">
              {(locale === "ro"
                ? [
                    "Validare la nivel de input pentru date esentiale.",
                    "Clasificare pe fluxuri: sales, suport, consultanta.",
                    "Posibilitate de trimitere catre CRM sau email tranzactional.",
                    "Mesaje de confirmare pentru utilizator si audit intern.",
                  ]
                : [
                    "Input-level validation for essential data.",
                    "Classification across flows: sales, support, consulting.",
                    "Ability to send into CRM or transactional email.",
                    "Confirmation messages for the user and internal audit.",
                  ]).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="accent-border reveal-section rounded-[2rem] bg-[#0b1f35] p-6 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              {locale === "ro" ? "Rezultat" : "Result"}
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em]">
              {locale === "ro" ? "Mai putine blocaje manuale" : "Fewer manual bottlenecks"}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/80">
              {locale === "ro"
                ? "Automatizarile nu elimina echipa umana, ci ii pregatesc contextul. Asta inseamna solicitari mai curate, raspuns mai rapid si o experienta mai previzibila pentru utilizator."
                : "Automation does not replace the human team, it prepares the context for them. That means cleaner requests, faster replies, and a more predictable experience for the user."}
            </p>
            <div className="mt-6">
              <CTAButton href="/contact" variant="secondary" className="bg-white text-[#0b1f35]">
                {locale === "ro" ? "Discuta fluxul tau" : "Discuss your workflow"}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
