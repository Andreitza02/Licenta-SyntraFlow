"use client";

import { useState } from "react";

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
    browser: "Primul contact trebuie sa castige incredere si sa impinga intentia spre actiune.",
    server: "Cererile sunt verificate si pregatite pentru echipa potrivita.",
    bot: "Asistentul raspunde rapid, califica intentia si reduce frictiunea.",
    database: "Mesajele si regulile tin raspunsurile coerente si usor de controlat.",
    integration: "Datele comerciale merg spre email, CRM sau sistemele care sustin follow-up-ul.",
    shield: "Performanta si protectia datelor sustin increderea in fiecare interactiune.",
  },
  en: {
    browser: "First contact must build trust and push intent toward action.",
    server: "Requests are checked and prepared for the right team.",
    bot: "The assistant replies fast, qualifies intent, and reduces friction.",
    database: "Messages and rules keep replies consistent and easy to control.",
    integration: "Commercial data moves to email, CRM, or systems that support follow-up.",
    shield: "Performance and data protection support trust in every interaction.",
  },
};

export function ArchitectureCard({ item, locale = "ro" }: ArchitectureCardProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <article className="panel-surface reveal-section group relative overflow-hidden rounded-[1.9rem] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#0f79ff]/18 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(240,248,255,0.9))] hover:shadow-[0_26px_56px_rgba(15,121,255,0.12)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-[#0f79ff]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-110" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#13b5ba]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-110" />
      <div className="flex items-start justify-between gap-4">
        <div
          className="relative"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
          onFocus={() => setIsTooltipVisible(true)}
          onBlur={() => setIsTooltipVisible(false)}
        >
          <button type="button" className="rounded-2xl transition duration-300 group-hover:-translate-y-0.5">
            <IconBadge
              icon={item.icon}
              className="transition duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:border-[#0f79ff]/20 group-hover:bg-[#eef6ff] group-hover:shadow-[0_16px_34px_rgba(15,121,255,0.16)]"
            />
          </button>
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-14 z-10 w-64 rounded-2xl bg-[#0b1f35] px-4 py-3 text-xs leading-6 text-white shadow-[0_18px_36px_rgba(11,31,53,0.24)] transition duration-200",
              isTooltipVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
            role="tooltip"
          >
            {layerTooltips[locale][item.icon]
              ?? (locale === "ro"
                ? "Zona esentiala pozitionata pentru viteza, incredere si conversie."
                : "A key layer positioned for speed, trust, and conversion.")}
          </div>
        </div>
        <span className="rounded-full border border-[#0d3358]/8 bg-white/72 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#0d3358] transition duration-300 group-hover:border-[#0f79ff]/16 group-hover:bg-[#eef6ff] group-hover:text-[#0b58d0] group-hover:shadow-[0_12px_24px_rgba(15,121,255,0.08)]">
          {locale === "ro" ? "Rol" : "Role"}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#0b1f35] transition duration-300 group-hover:text-[#0b58d0]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted transition duration-300 group-hover:text-[#35556f]">{item.summary}</p>
      <div className="mt-5 rounded-[1.45rem] border border-[#dce8f5] bg-white/78 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] transition duration-300 group-hover:border-[#0f79ff]/14 group-hover:bg-white/86">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
          {locale === "ro" ? "Puncte cheie" : "Key points"}
        </p>
        <ul className="mt-3 space-y-2.5 text-sm leading-7 text-[#35556f]">
          {item.details.map((detail) => (
            <li key={detail} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0f79ff]" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
