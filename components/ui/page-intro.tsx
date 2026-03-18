import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/lib/i18n";

type PageIntroProps = {
  title: string;
  description: string;
  eyebrow: string;
  currentLabel: string;
  highlights?: string[];
  locale: Locale;
};

export function PageIntro({
  title,
  description,
  eyebrow,
  currentLabel,
  highlights = [],
  locale,
}: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="section-shell">
        <div className="panel-surface accent-border rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
          <Breadcrumbs items={[{ label: locale === "ro" ? "Acasa" : "Home", href: "/" }, { label: currentLabel }]} />
          <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mt-6" />
          {highlights.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-[#0d3358]/10 bg-white px-4 py-2 text-sm font-medium text-[#0b1f35]"
                >
                  {highlight}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
