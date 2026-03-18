import { IconBadge } from "@/components/ui/icon-badge";
import type { Locale } from "@/lib/i18n";
import type { CaseStudyItem } from "@/lib/site-data";

type CaseStudyCardProps = {
  item: CaseStudyItem;
  locale?: Locale;
};

export function CaseStudyCard({ item, locale = "ro" }: CaseStudyCardProps) {
  return (
    <article className="panel-surface rounded-[1.75rem] p-6">
      <div className="flex items-center justify-between gap-4">
        <IconBadge icon={item.icon} />
        <span className="rounded-full bg-[#13b5ba]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
          {locale === "ro" ? "Scenariu aplicat" : "Applied scenario"}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
      <dl className="mt-5 space-y-4 text-sm leading-7">
        <div>
          <dt className="font-semibold text-[#0b1f35]">{locale === "ro" ? "Problema" : "Problem"}</dt>
          <dd className="mt-1 text-muted">{item.problem}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#0b1f35]">{locale === "ro" ? "Solutia" : "Solution"}</dt>
          <dd className="mt-1 text-muted">{item.solution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#0b1f35]">{locale === "ro" ? "Beneficiu" : "Benefit"}</dt>
          <dd className="mt-1 text-muted">{item.benefit}</dd>
        </div>
      </dl>
      <p className="mt-5 rounded-2xl bg-[#0b1f35] px-4 py-3 text-sm font-medium text-white/88">{item.impact}</p>
    </article>
  );
}
