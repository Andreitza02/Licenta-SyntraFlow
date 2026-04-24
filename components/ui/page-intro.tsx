import { cn } from "@/lib/utils";
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
  compact?: boolean;
};

export function PageIntro({
  title,
  description,
  eyebrow,
  currentLabel,
  highlights = [],
  locale,
  compact = false,
}: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="section-shell">
        <div
          className={cn(
            "panel-surface accent-border rounded-[2rem]",
            compact ? "max-w-5xl px-6 py-7 md:px-8 md:py-8" : "px-6 py-8 md:px-10 md:py-12",
          )}
        >
          <Breadcrumbs items={[{ label: locale === "ro" ? "Acasa" : "Home", href: "/" }, { label: currentLabel }]} />
          <SectionHeading eyebrow={eyebrow} title={title} description={description} className={compact ? "mt-5" : "mt-6"} size={compact ? "compact" : "default"} />
          {highlights.length ? (
            <div className={cn("flex flex-wrap gap-3", compact ? "mt-6" : "mt-8")}>
              {highlights.map((highlight) => (
                <span
                  key={highlight}
                  className={cn(
                    "rounded-full border border-[#0d3358]/10 bg-white font-medium text-[#0b1f35]",
                    compact ? "px-3.5 py-1.5 text-[0.95rem]" : "px-4 py-2 text-sm",
                  )}
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
