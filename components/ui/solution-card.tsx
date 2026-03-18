import { CTAButton } from "@/components/ui/cta-button";
import { IconBadge } from "@/components/ui/icon-badge";
import type { Locale } from "@/lib/i18n";
import type { SolutionItem } from "@/lib/site-data";

type SolutionCardProps = {
  item: SolutionItem;
  locale?: Locale;
};

export function SolutionCard({ item, locale = "ro" }: SolutionCardProps) {
  return (
    <article className="panel-surface accent-border rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <IconBadge icon={item.icon} />
        <span className="rounded-full bg-[#0f79ff]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
          {item.category}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
      <ul className="mt-5 space-y-2 text-sm text-[#0b1f35]">
        {item.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#13b5ba]" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 rounded-2xl bg-[#f3f9fc] px-4 py-3 text-sm leading-7 text-[#0d3358]">{item.useCase}</p>
      <CTAButton href={item.href} variant="secondary" className="mt-5 w-full">
        {locale === "ro" ? "Exploreaza modulul" : "Explore the module"}
      </CTAButton>
    </article>
  );
}
