"use client";

import { useState } from "react";

import { Accordion } from "@/components/ui/accordion";
import type { Locale } from "@/lib/i18n";
import { IconBadge } from "@/components/ui/icon-badge";
import type { ArchitectureLayer } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type ArchitectureCardProps = {
  item: ArchitectureLayer;
  locale?: Locale;
};

const layerTooltips: Record<Locale, Record<string, string>> = {
  ro: {
    browser: "Clientul interactioneaza usor cu platforma si primeste un parcurs clar.",
    server: "Solicitarile sunt organizate si directionate rapid catre pasul potrivit.",
    bot: "Asistentul mentine raspunsurile utile, coerente si orientate spre rezultat.",
    database: "Informatiile relevante raman consistente in toate punctele de contact.",
    integration: "Fluxurile pot continua catre echipele sau serviciile potrivite.",
    shield: "Datele sunt tratate atent, cu accent pe claritate si incredere.",
  },
  en: {
    browser: "Customers interact easily with the platform and follow a clear path.",
    server: "Requests are organized and routed quickly to the right next step.",
    bot: "The assistant keeps answers useful, consistent, and outcome-focused.",
    database: "Relevant information stays consistent across all touchpoints.",
    integration: "Workflows can continue to the right teams or business services.",
    shield: "Data is handled carefully, with a focus on clarity and trust.",
  },
};

export function ArchitectureCard({ item, locale = "ro" }: ArchitectureCardProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <article className="panel-surface reveal-section rounded-[1.75rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div
          className="relative"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          onFocus={() => setIsTooltipVisible(true)}
          onBlur={() => setIsTooltipVisible(false)}
        >
          <button type="button" className="rounded-2xl">
            <IconBadge icon={item.icon} />
          </button>
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-14 z-10 w-64 rounded-2xl bg-[#0b1f35] px-4 py-3 text-xs leading-6 text-white transition",
              isTooltipVisible ? "opacity-100" : "opacity-0",
            )}
            role="tooltip"
          >
            {layerTooltips[locale][item.icon]
              ?? (locale === "ro"
                ? "Zona esentiala explicata concis pentru o prezentare clara."
                : "A key layer explained clearly for a concise presentation.")}
          </div>
        </div>
        <span className="rounded-full border border-[#0d3358]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0d3358]">
          {locale === "ro" ? "Rol" : "Role"}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#0b1f35]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
      <div className="mt-5">
        <Accordion
          items={[
            {
              id: item.title,
              title: locale === "ro" ? "Ce ofera" : "What it offers",
              hint: locale === "ro" ? "Expandabil" : "Expandable",
              content: (
                <ul className="space-y-2">
                  {item.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0f79ff]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
          defaultOpenId=""
        />
      </div>
    </article>
  );
}
