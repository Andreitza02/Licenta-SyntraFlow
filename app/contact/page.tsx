import { ContactForm } from "@/components/ui/contact-form";
import { SiteLink } from "@/components/ui/site-link";
import { getServerLocale } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/site-config";
import { buttonVariants } from "@/lib/utils";

const contactEmail = "help@syntraflow.com";
const contactPhone = "+40 743 062 549";
const contactPhoneHref = "+40743062549";
const mapSrc = "https://www.google.com/maps?ll=45.4353,28.0080&z=13&output=embed";

type ContactIconName = "calendar" | "check" | "email" | "message" | "phone" | "route" | "spark";

function ContactIcon({ name }: { name: ContactIconName }) {
  const common = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.9,
    viewBox: "0 0 20 20",
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 3.5v3" />
          <path d="M15 3.5v3" />
          <path d="M3.5 7.5h13" />
          <path d="M4.5 5.5h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m4.5 10 3.4 3.4 7.6-7.8" />
        </svg>
      );
    case "email":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3.5 5.5h13v9h-13z" />
          <path d="m4.3 6.2 5.7 4.7 5.7-4.7" />
        </svg>
      );
    case "message":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 4.5h12v8.8H8.1L4 16.5v-12Z" />
          <path d="M7.2 8h5.6" />
          <path d="M7.2 10.6h3.8" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 3.8h1.9l1 3-1.5 1.5a10.2 10.2 0 0 0 4.3 4.3l1.5-1.5 3 1V14a1.8 1.8 0 0 1-1.8 1.8C8.7 15.8 4.2 11.3 4.2 5.6A1.8 1.8 0 0 1 6 3.8Z" />
        </svg>
      );
    case "route":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5.5 5.5h4a3 3 0 0 1 0 6h-1a3 3 0 0 0 0 6h6" />
          <path d="M4 5.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
          <path d="M13 17.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M10 2.8 11.2 7l4 1.2-4 1.2-1.2 4-1.2-4-4-1.2 4-1.2L10 2.8Z" />
          <path d="M15 12.5 15.6 15l2.4.6-2.4.7-.6 2.4-.7-2.4-2.4-.7 2.4-.6.7-2.5Z" />
        </svg>
      );
  }
}

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    "Contact",
    locale === "ro"
      ? "Contact SyntraFlow pentru demo, oferta si discutii despre automatizarea interactiunilor cu clientii."
      : "Contact SyntraFlow for demos, quotes, and conversations about automating customer interactions.",
    "/contact",
    locale,
  );
}

export default async function ContactPage() {
  const locale = await getServerLocale();
  const isRomanian = locale === "ro";

  const heroStats = isRomanian
    ? [
        { value: "24h", label: "raspuns initial" },
        { value: "2 pasi", label: "formular ghidat" },
        { value: "1 echipa", label: "contact direct" },
      ]
    : [
        { value: "24h", label: "initial response" },
        { value: "2 steps", label: "guided form" },
        { value: "1 team", label: "direct contact" },
      ];

  const directChannels = isRomanian
    ? [
        {
          icon: "email" as const,
          label: "Email",
          value: contactEmail,
          href: `mailto:${contactEmail}`,
          helper: "Pentru demo, oferta, colaborari si intrebari despre produs.",
        },
        {
          icon: "phone" as const,
          label: "Telefon",
          value: contactPhone,
          href: `tel:${contactPhoneHref}`,
          helper: "Pentru o discutie rapida despre proiectul tau.",
        },
      ]
    : [
        {
          icon: "email" as const,
          label: "Email",
          value: contactEmail,
          href: `mailto:${contactEmail}`,
          helper: "For demos, quotes, partnerships, and product questions.",
        },
        {
          icon: "phone" as const,
          label: "Phone",
          value: contactPhone,
          href: `tel:${contactPhoneHref}`,
          helper: "For a quick conversation about your project.",
        },
      ];

  const process = isRomanian
    ? [
        {
          icon: "message" as const,
          title: "Trimiti contextul",
          text: "Completezi formularul sau alegi contactul direct.",
        },
        {
          icon: "route" as const,
          title: "Pregatim traseul",
          text: "Structuram nevoia, produsul potrivit si urmatorul pas.",
        },
        {
          icon: "calendar" as const,
          title: "Stabilim discutia",
          text: "Revenim cu un demo, o estimare sau o recomandare clara.",
        },
      ]
    : [
        {
          icon: "message" as const,
          title: "Send the context",
          text: "Fill in the form or choose a direct contact channel.",
        },
        {
          icon: "route" as const,
          title: "Shape the path",
          text: "We map the need, the right product, and the next step.",
        },
        {
          icon: "calendar" as const,
          title: "Plan the discussion",
          text: "We follow up with a demo, estimate, or clear recommendation.",
        },
      ];

  return (
    <main className="page-gradient-shell pb-20 pt-32">
      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-stretch">
          <div className="reveal-section flex min-h-[620px] flex-col justify-between rounded-[2.4rem] border border-[#0d3358]/10 bg-white/62 p-6 shadow-[0_28px_70px_rgba(11,31,53,0.08)] backdrop-blur-xl md:p-9">
            <div>
              <span className="eyebrow">
                <ContactIcon name="spark" />
                {isRomanian ? "Contact SyntraFlow" : "Contact SyntraFlow"}
              </span>

              <h1 className="font-display mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[#071d33] md:text-7xl">
                {isRomanian
                  ? "Hai sa transformam ideea intr-un demo clar."
                  : "Turn the idea into a clear demo."}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-9 text-muted">
                {isRomanian
                  ? "Spune-ne ce vrei sa automatizezi, ce pagina ai nevoie sau ce flux de client trebuie simplificat. Revenim cu pasul potrivit pentru produs, demo sau oferta."
                  : "Tell us what you want to automate, what page you need, or which customer flow needs to be simplified. We follow up with the right next step for product, demo, or quote."}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${contactEmail}`} className={buttonVariants("primary", "gap-2")}>
                  <ContactIcon name="email" />
                  {isRomanian ? "Trimite email" : "Send email"}
                </a>
                <a href={`tel:${contactPhoneHref}`} className={buttonVariants("secondary", "gap-2")}>
                  <ContactIcon name="phone" />
                  {contactPhone}
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.35rem] border border-[#d7e7f5] bg-white/82 p-4 shadow-[0_16px_34px_rgba(11,31,53,0.05)]"
                >
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-[#071d33]">{item.value}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-section relative min-h-[460px] overflow-hidden rounded-[2.4rem] border border-white/80 bg-white/72 p-3 shadow-[0_32px_80px_rgba(11,31,53,0.1)] backdrop-blur-xl lg:min-h-[620px]">
            <iframe
              src={mapSrc}
              title="Google Map"
              className="h-full min-h-[454px] w-full rounded-[2rem] border-0 grayscale-[12%] lg:min-h-[596px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section-shell mt-12">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <aside className="space-y-5 lg:sticky lg:top-32">
            <article className="panel-surface reveal-section rounded-[2.1rem] p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {isRomanian ? "Contact direct" : "Direct contact"}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#071d33]">
                {isRomanian ? "Alege canalul potrivit." : "Choose the right channel."}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {isRomanian
                  ? "Pentru solicitari rapide, foloseste emailul sau telefonul. Pentru context complet, formularul din dreapta este traseul recomandat."
                  : "For quick requests, use email or phone. For complete context, the form on the right is the recommended path."}
              </p>

              <div className="mt-6 space-y-3">
                {directChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="group flex gap-4 rounded-[1.55rem] border border-[#d7e6f5] bg-white/82 p-4 shadow-[0_14px_30px_rgba(11,31,53,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/22 hover:shadow-[0_22px_42px_rgba(11,31,53,0.08)]"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#dceafb] bg-[#f5faff] text-[#0b58d0] transition duration-300 group-hover:border-[#0f79ff]/18 group-hover:bg-[#0f79ff] group-hover:text-white">
                      <ContactIcon name={channel.icon} />
                    </span>
                    <span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                        {channel.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-[#071d33]">{channel.value}</span>
                      <span className="mt-2 block text-xs leading-6 text-muted">{channel.helper}</span>
                    </span>
                  </a>
                ))}
              </div>
            </article>

            <article className="panel-surface reveal-section rounded-[2.1rem] p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {isRomanian ? "Cum lucram" : "How it works"}
                </p>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                  <ContactIcon name="check" />
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {process.map((item, index) => (
                  <div key={item.title} className="rounded-[1.45rem] border border-[#d7e6f5] bg-white/72 p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#071d33] text-white shadow-[0_14px_30px_rgba(7,29,51,0.14)]">
                        <ContactIcon name={item.icon} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#071d33]">
                          {index + 1}. {item.title}
                        </p>
                        <p className="mt-2 text-xs leading-6 text-muted">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SiteLink href="/produse" className={buttonVariants("secondary", "mt-5 w-full gap-2")}>
                <ContactIcon name="route" />
                {isRomanian ? "Vezi produsele" : "View products"}
              </SiteLink>
            </article>
          </aside>

          <ContactForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
