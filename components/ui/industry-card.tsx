import { IconBadge } from "@/components/ui/icon-badge";
import type { IndustryItem } from "@/lib/site-data";

type IndustryCardProps = {
  item: IndustryItem;
};

export function IndustryCard({ item }: IndustryCardProps) {
  return (
    <article className="panel-soft rounded-[1.75rem] p-6 shadow-[0_16px_40px_rgba(11,31,53,0.05)]">
      <IconBadge icon={item.icon} className="bg-white/90" />
      <h3 className="mt-5 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
      <div className="mt-5 rounded-2xl border border-[#0d3358]/8 bg-white/80 px-4 py-4 text-sm leading-7 text-[#0d3358]">
        {item.impact}
      </div>
    </article>
  );
}
