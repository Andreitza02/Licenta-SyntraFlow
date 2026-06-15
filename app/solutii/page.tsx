import { CTAButton } from "@/components/ui/cta-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";

type LeadCaptureItem = {
  label: string;
  title: string;
  text: string;
};

type LeadCaptureMetric = {
  value: string;
  label: string;
};

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Lead capture" : "Lead Capture",
    locale === "ro"
      ? "Lead capture SyntraFlow pentru colectarea datelor, calificarea intentiei si pregatirea cererilor clare."
      : "SyntraFlow lead capture for collecting details, qualifying intent, and preparing clean requests.",
    "/solutii",
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

function LeadCaptureCard({ item, index }: { item: LeadCaptureItem; index: number }) {
  return (
    <article className="h-full rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_16px_36px_rgba(11,31,53,0.06)]">
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[#0f79ff] text-sm font-semibold text-white shadow-[0_16px_30px_rgba(15,121,255,0.2)]">
          {index + 1}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.label}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-normal text-[#0b1f35]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
        </div>
      </div>
    </article>
  );
}

export default async function SolutionsPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  const flowSteps: LeadCaptureItem[] = isRomanian
    ? [
        {
          label: "Pas 01",
          title: "Colectam datele de contact",
          text: "Lead capture strange nume, email, telefon si contextul cererii intr-un flux clar.",
        },
        {
          label: "Pas 02",
          title: "Calificam intentia",
          text: "Cererea este structurata dupa nevoie, urgenta si obiectiv, ca echipa sa inteleaga rapid lead-ul.",
        },
        {
          label: "Pas 03",
          title: "Pregatim follow-up-ul",
          text: "Lead-ul ajunge cu informatii curate pentru un follow-up rapid si o discutie directa cu echipa.",
        },
      ]
    : [
        {
          label: "Step 01",
          title: "Collect contact details",
          text: "Lead capture gathers name, email, phone, and request context in a clear flow.",
        },
        {
          label: "Step 02",
          title: "Qualify intent",
          text: "The request is structured by need, urgency, and objective so the team understands the lead quickly.",
        },
        {
          label: "Step 03",
          title: "Prepare follow-up",
          text: "The lead arrives with clean information for fast follow-up and a direct team conversation.",
        },
      ];

  const leadCaptureCards: LeadCaptureItem[] = isRomanian
    ? [
        {
          label: "Date",
          title: "Date complete pentru lead",
          text: "Lead capture cere informatiile importante fara sa incarce utilizatorul cu pasi inutili.",
        },
        {
          label: "Intentie",
          title: "Lead-uri mai usor de inteles",
          text: "Fiecare cerere primeste context: ce cauta clientul, cat de rapid are nevoie si ce asteapta.",
        },
        {
          label: "Claritate",
          title: "Cereri pregatite pentru echipa",
          text: "Lead capture reduce mesajele incomplete si face urmatorul pas mai rapid.",
        },
        {
          label: "Actiune",
          title: "Follow-up simplu",
          text: "Dupa captare, echipa stie ce context are lead-ul si cum trebuie continuata discutia.",
        },
      ]
    : [
        {
          label: "Data",
          title: "Complete lead details",
          text: "Lead capture asks for the important information without loading the user with unnecessary steps.",
        },
        {
          label: "Intent",
          title: "Leads that are easier to understand",
          text: "Each request gets context: what the client is looking for, how urgent it is, and what they expect.",
        },
        {
          label: "Clarity",
          title: "Requests prepared for the team",
          text: "Lead capture reduces incomplete messages and makes the next step faster.",
        },
        {
          label: "Action",
          title: "Simple follow-up",
          text: "After capture, the team knows the lead context and how the conversation should continue.",
        },
      ];

  const metrics: LeadCaptureMetric[] = isRomanian
    ? [
        { value: "01", label: "focus: lead capture" },
        { value: "3", label: "date cheie colectate" },
        { value: "24/7", label: "captare disponibila" },
      ]
    : [
        { value: "01", label: "focus: lead capture" },
        { value: "3", label: "key details collected" },
        { value: "24/7", label: "always-on capture" },
      ];

  return (
    <main className="page-gradient-shell overflow-hidden pb-12">
      <section className="relative pb-12 pt-32 md:pt-36">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/20 to-transparent" />
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
            <div className="max-w-4xl">
              <p className="eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#0f79ff]" />
                Lead capture
              </p>
              <h1 className="font-display mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#06192c] md:text-6xl lg:text-7xl">
                {isRomanian
                  ? "Lead capture care transforma interesul in cereri clare."
                  : "Lead capture that turns interest into clean requests."}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#365a78] md:text-lg">
                {isRomanian
                  ? "Pagina aceasta este dedicata doar fluxului de Lead capture: colectare date, calificare intentie si pregatirea lead-ului pentru urmatorul pas."
                  : "This page is dedicated only to Lead capture: collecting details, qualifying intent, and preparing the lead for the next step."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/contact" className="gap-2">
                  <span>{isRomanian ? "Cere Lead capture" : "Request Lead capture"}</span>
                  <ArrowIcon />
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" className="bg-white">
                  {isRomanian ? "Discuta cu echipa" : "Talk to the team"}
                </CTAButton>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.25rem] border border-[#d8e6f4] bg-white/74 px-4 py-3 shadow-[0_12px_28px_rgba(11,31,53,0.05)] backdrop-blur-md">
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-[#0b1f35]">{metric.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#0f79ff]/14 bg-white/86 p-5 shadow-[0_26px_70px_rgba(15,121,255,0.12)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {isRomanian ? "Flux Lead capture" : "Lead capture flow"}
              </p>
              <div className="mt-5 grid gap-3">
                {flowSteps.map((step, index) => (
                  <div key={step.title} className="rounded-[1.15rem] border border-[#d8e6f4] bg-[#f8fcff] p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0f79ff] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#0b1f35]">{step.title}</p>
                        <p className="mt-1 text-xs leading-5 text-muted">{step.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Lead capture"
            title={isRomanian ? "Doar Lead capture, fara module amestecate." : "Only Lead capture, without mixed modules."}
            description={isRomanian
              ? "Aici apar doar elementele care tin de captarea lead-ului: date, intentie, claritate si follow-up."
              : "This section shows only what belongs to lead capture: details, intent, clarity, and follow-up."}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {leadCaptureCards.map((item, index) => (
              <LeadCaptureCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <article className="overflow-hidden rounded-[2rem] border border-[#0d3358]/10 bg-white/84 shadow-[0_28px_74px_rgba(11,31,53,0.08)] backdrop-blur-xl">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-[linear-gradient(135deg,#0b1f35_0%,#0f79ff_58%,#13b5ba_100%)] p-6 text-white md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/70">Lead capture</p>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-normal text-white md:text-4xl">
                  {isRomanian ? "Cererea trebuie sa ajunga completa." : "The request should arrive complete."}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/78">
                  {isRomanian
                    ? "Lead capture strange informatia minima necesara ca echipa sa poata raspunde rapid si corect."
                    : "Lead capture gathers the minimum information the team needs to reply quickly and correctly."}
                </p>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid gap-4">
                  {(isRomanian
                    ? ["Nume si date de contact", "Nevoie sau obiectiv", "Context pentru follow-up"]
                    : ["Name and contact details", "Need or objective", "Context for follow-up"]
                  ).map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-[1.15rem] border border-[#d8e6f4] bg-[#f8fcff] p-4 text-sm font-semibold text-[#0b1f35]">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#13b5ba] text-white">
                        <CheckIcon />
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="py-10">
        <div className="section-shell">
          <article className="overflow-hidden rounded-[2rem] border border-[#0d3358]/10 bg-[#0b1f35] p-6 text-white shadow-[0_26px_70px_rgba(11,31,53,0.22)] md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#8bd7ff]">Lead capture</p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-normal text-white md:text-4xl">
                  {isRomanian ? "Pornim un flux de Lead capture curat." : "Start a clean Lead capture flow."}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/72 md:text-base">
                  {isRomanian
                    ? "Stabilim ce date trebuie colectate, cum se califica lead-ul si unde ajunge cererea."
                    : "We define what details need to be collected, how the lead is qualified, and where the request goes."}
                </p>
              </div>

              <CTAButton href="/contact" className="gap-2">
                <CheckIcon />
                <span>{isRomanian ? "Cere Lead capture" : "Request Lead capture"}</span>
              </CTAButton>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
