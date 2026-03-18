"use client";

import { useState } from "react";

import type { Locale } from "@/lib/i18n";
import type { SolutionTab } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type SolutionTabsProps = {
  tabs: SolutionTab[];
  locale: Locale;
};

export function SolutionTabs({ tabs, locale }: SolutionTabsProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!activeTab) {
    return null;
  }

  return (
    <div className="panel-surface rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-[#0b1f35] text-white shadow-[0_12px_28px_rgba(11,31,53,0.18)]"
                  : "border border-[#0d3358]/10 bg-white text-[#0b1f35] hover:border-[#0f79ff]/20",
              )}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h3 className="text-2xl font-semibold text-[#0b1f35]">{activeTab.label}</h3>
          <p className="mt-4 text-base leading-8 text-muted">{activeTab.summary}</p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[#0b1f35]">
            {activeTab.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#13b5ba]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.75rem] bg-[#0b1f35] p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/64">
            {locale === "ro" ? "Indicator strategic" : "Strategic indicator"}
          </p>
          <p className="font-display mt-4 text-4xl font-semibold tracking-[-0.03em]">01</p>
          <p className="mt-4 text-lg font-semibold">{activeTab.metric}</p>
          <p className="mt-4 text-sm leading-7 text-white/76">
            {locale === "ro"
              ? "Fiecare tab ilustreaza un strat al platformei: interactiune, captare de date si executie operationala."
              : "Each tab highlights a layer of the platform: interaction, data capture, and operational execution."}
          </p>
        </div>
      </div>
    </div>
  );
}
