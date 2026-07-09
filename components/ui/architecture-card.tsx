"use client";

import type { Locale } from "@/lib/i18n";
import type { ArchitectureLayer } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type ArchitectureCardProps = {
  item: ArchitectureLayer;
  index?: number;
  locale?: Locale;
  className?: string;
};

export function ArchitectureCard({ item, index = 0, className }: ArchitectureCardProps) {
  return (
    <article
      className={cn(
        "rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,53,0.05)]",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[#eef6ff] text-sm font-semibold text-[#0b58d0]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-[#0b1f35]">{item.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{item.summary}</p>
        </div>
      </div>

      {item.details.length ? (
        <ul className="mt-4 space-y-2.5 text-sm leading-7 text-[#35556f]">
          {item.details.map((detail: string) => (
            <li key={detail} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f79ff]" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default ArchitectureCard;
