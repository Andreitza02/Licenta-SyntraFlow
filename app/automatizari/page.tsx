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
      ? "Automatizari SyntraFlow pentru raspuns instant, lead capture, rutare comerciala si follow-up care pastreaza oportunitatile active."
      : "SyntraFlow automations for instant replies, lead capture, commercial routing, and follow-up that keeps opportunities active.",
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
          ? "Fluxuri care muta conversatia din chat in vanzari, CRM si follow-up"
          : "Workflows that move the conversation from chat into sales, CRM, and follow-up"}
        description={locale === "ro"
          ? "Fiecare cerere poate fi preluata, validata, calificata si trimisa mai departe cu contextul potrivit pentru un raspuns comercial rapid."
          : "Every request can be captured, validated, qualified, and routed forward with the right context for a fast commercial reply."}
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
                  text: "Intrebarile repetitive primesc raspuns instant, iar cazurile importante ajung la echipa cu rezumat util.",
                }
              : {
                  title: "FAQ and support flow",
                  text: "Repetitive questions get instant replies, while important cases reach the team with a useful summary.",
                },
            locale === "ro"
              ? {
                  title: "Flux de cerere oferta",
                  text: "Datele de contact si contextul comercial sunt colectate strategic, validate si trimise catre sales.",
                }
              : {
                  title: "Quote request flow",
                  text: "Contact details and commercial context are collected strategically, validated, and sent to sales.",
                },
            locale === "ro"
              ? {
                  title: "Flux pentru demo si consultanta",
                  text: "Intentia de demo este transformata intr-o cerere pregatita, cu obiectiv clar si context pentru discutie.",
                }
              : {
                  title: "Demo and consulting flow",
                  text: "Demo intent becomes a prepared request, with a clear objective and context for the conversation.",
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
                ? "Automatizarile nu inlocuiesc echipa, ci ii dau un start mai bun: solicitari curate, raspuns mai rapid si sanse mai mari de conversie."
                : "Automation does not replace the team, it gives them a better start: cleaner requests, faster replies, and higher conversion chances."}
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
