import { CaseStudiesPageClient } from "@/components/sections/case-studies-page-client";
import { CTAButton } from "@/components/ui/cta-button";
import { IconBadge } from "@/components/ui/icon-badge";
import { getServerLocale } from "@/lib/i18n-server";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/site-config";

export async function generateMetadata() {
  const locale = await getServerLocale();

  return buildMetadata(
    locale === "ro" ? "Studii de caz" : "Case studies",
    locale === "ro"
      ? "Studii de caz SyntraFlow pentru businessuri care vor raspunsuri mai rapide, cereri mai clare si conversii mai bune."
      : "SyntraFlow case studies for businesses that want faster replies, clearer requests, and better conversions.",
    "/studii-de-caz",
    locale,
  );
}

export default async function CaseStudiesPage() {
  const locale = await getServerLocale();
  const { caseStudies } = getSiteData(locale);
  const heroCaseStudies = caseStudies.slice(0, 4);

  return (
    <main className="overflow-hidden pb-8">
      <section className="relative pt-32" aria-labelledby="case-studies-hero-title">
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_16%_18%,rgba(15,121,255,0.2),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(19,181,186,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0))]" aria-hidden="true" />
        <div className="section-shell relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_27rem] lg:items-end">
            <div className="max-w-4xl pb-2 lg:pb-8">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <a href="/" className="transition hover:text-[#0f79ff]">
                  {locale === "ro" ? "Acasa" : "Home"}
                </a>
                <span aria-hidden="true">/</span>
                <span className="font-medium text-[#0b1f35]">
                  {locale === "ro" ? "Studii de caz" : "Case studies"}
                </span>
              </nav>

              <span className="eyebrow mt-8">
                {locale === "ro" ? "Rezultate aplicate" : "Applied outcomes"}
              </span>
              <h1 id="case-studies-hero-title" className="font-display mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] text-[#0b1f35] md:text-7xl">
                {locale === "ro" ? "Studii de caz" : "Case studies"}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg md:leading-9">
                {locale === "ro"
                  ? "Vezi cum restaurantele, clinicile, companiile B2B si magazinele online pot transforma intrebarile repetitive in lead-uri, rezervari si cereri mai bine pregatite."
                  : "See how restaurants, clinics, B2B companies, and online stores can turn repetitive questions into leads, bookings, and better-prepared requests."}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="#case-study-list" className="w-full sm:w-auto">
                  {locale === "ro" ? "Vezi studiile de caz" : "View case studies"}
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" className="w-full bg-white sm:w-auto">
                  {locale === "ro" ? "Contacteaza-ne" : "Contact us"}
                </CTAButton>
              </div>
            </div>

            <div className="grid gap-3">
              {heroCaseStudies.map((item, index) => (
                <article
                  key={item.title}
                  className="panel-surface accent-border grid grid-cols-[auto_1fr] gap-4 rounded-[1.55rem] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/16"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-display text-sm font-semibold text-[#0b58d0]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <IconBadge icon={item.icon} className="h-10 w-10 shrink-0 rounded-[1rem] bg-white/90" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold leading-snug text-[#0b1f35]">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.impact}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CaseStudiesPageClient caseStudies={caseStudies} locale={locale} />
    </main>
  );
}
