"use client";

import { cn } from "@/lib/utils";

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
};

export function Tabs({ items, activeId, onChange, ariaLabel = "Tabs" }: TabsProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f79ff]/40",
              isActive
                ? "bg-[#0b1f35] text-white shadow-[0_12px_28px_rgba(11,31,53,0.16)]"
                : "border border-[#0d3358]/10 bg-white text-[#0b1f35] hover:border-[#0f79ff]/20",
            )}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
