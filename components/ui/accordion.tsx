"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export type AccordionEntry = {
  id: string;
  title: string;
  content: React.ReactNode;
  hint?: string;
};

type AccordionProps = {
  items: AccordionEntry[];
  defaultOpenId?: string;
};

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="panel-surface rounded-3xl">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
            >
              <div>
                <span className="block text-base font-semibold text-[#0b1f35]">{item.title}</span>
                {item.hint ? <span className="mt-1 block text-xs uppercase tracking-[0.08em] text-[#0b58d0]">{item.hint}</span> : null}
              </div>
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-[#0d3358]/10 text-xl text-[#0f79ff] transition",
                  isOpen && "rotate-45",
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden px-6 pb-6 text-sm leading-7 text-muted">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
