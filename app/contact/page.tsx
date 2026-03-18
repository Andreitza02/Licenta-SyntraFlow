import { ContactForm } from "@/components/ui/contact-form";
import { CTAButton } from "@/components/ui/cta-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";
import { PageIntro } from "@/components/ui/page-intro";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
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
  const { faqItems } = getSiteData(locale);

  return (
    <main className="pb-6">
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
          ? ["Form validat", "Succes si eroare", "CTA demo", "UX clar"]
          : ["Validated form", "Success and error", "Demo CTA", "Clear UX"]}
      />

      <section className="py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <article className="panel-surface rounded-[2rem] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "Context de demo" : "Demo context"}
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
                {locale === "ro"
                  ? "Contact profesional pentru demo, oferta si prezentare de produs"
                  : "Professional contact flow for demos, quotes, and product presentations"}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted">
                {locale === "ro"
                  ? "Pagina poate fi folosita in demo pentru a ilustra preluarea unei solicitari comerciale sau tehnice, inclusiv validarea datelor, progresul in doi pasi si feedback-ul vizual al formularului."
                  : "This page can be used in a demo to illustrate how a commercial or technical request is captured, including data validation, a two-step flow, and visual form feedback."}
              </p>
            </article>

            <article className="panel-surface rounded-[2rem] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "Informatii" : "Information"}
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-[#0b1f35]">
                {locale === "ro" ? (
                  <>
                    <li>Email: contact@syntraflow.local</li>
                    <li>Program prezentari: Luni - Vineri, 09:00 - 18:00</li>
                    <li>Tip solicitari: demo, oferta, suport, consultanta</li>
                    <li>Flux simulare: validare, progres multi-step, stare de incarcare, mesaj de succes</li>
                  </>
                ) : (
                  <>
                    <li>Email: contact@syntraflow.local</li>
                    <li>Presentation schedule: Monday - Friday, 09:00 - 18:00</li>
                    <li>Request types: demo, quote, support, consulting</li>
                    <li>Simulation flow: validation, multi-step progress, loading state, success message</li>
                  </>
                )}
              </ul>
              <div className="mt-6">
                <CTAButton href="/asistent-virtual" variant="secondary">
                  {locale === "ro" ? "Vezi si demo-ul asistentului" : "See the assistant demo too"}
                </CTAButton>
              </div>
            </article>
          </div>

          <ContactForm locale={locale} />
        </div>
      </section>

      <section className="py-14">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "FAQ rapid" : "Quick FAQ"}
              </p>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-4xl">
                {locale === "ro"
                  ? "Intrebari frecvente legate de demo si functionalitati"
                  : "Frequently asked questions about demos and features"}
              </h2>
            </div>
            <CTAButton href="/despre-proiect" variant="secondary">
              {locale === "ro" ? "Citeste contextul complet" : "Read the full context"}
            </CTAButton>
          </div>
          <div className="mt-8">
            <FAQAccordion items={faqItems.slice(0, 6)} locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
