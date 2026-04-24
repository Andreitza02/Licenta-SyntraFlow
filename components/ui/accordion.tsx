"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export type AccordionEntry = {
  id: string;
  title: string;
  content: React.ReactNode;
  hint?: string;
  actionLabelClosed?: string;
  actionLabelOpen?: string;
};

type AccordionProps = {
  items: AccordionEntry[];
  defaultOpenId?: string;
  variant?: "default" | "embedded";
};

export function Accordion({ items, defaultOpenId, variant = "default" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);
  const isEmbedded = variant === "embedded";

  return (
    <div className={cn("space-y-3", isEmbedded && "space-y-2.5")}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "group relative overflow-hidden border backdrop-blur-xl transition duration-300",
              isEmbedded
                ? "rounded-[1.45rem] border-[#d7e5f3] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,250,255,0.82))] shadow-[0_14px_30px_rgba(11,31,53,0.06)]"
                : "rounded-[1.7rem] border-[#d5e5f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,249,255,0.88))] shadow-[0_18px_40px_rgba(11,31,53,0.07)]",
              isOpen
                ? isEmbedded
                  ? "border-[#0f79ff]/18 shadow-[0_18px_36px_rgba(15,121,255,0.10)]"
                  : "border-[#0f79ff]/20 shadow-[0_24px_52px_rgba(15,121,255,0.12)]"
                : isEmbedded
                  ? "hover:-translate-y-0.5 hover:border-[#0f79ff]/16 hover:shadow-[0_18px_36px_rgba(11,31,53,0.08)]"
                  : "hover:-translate-y-1 hover:border-[#0f79ff]/18 hover:shadow-[0_26px_52px_rgba(15,121,255,0.10)]",
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 transition duration-500",
                isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              )}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/45 to-transparent" />
              <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-[#0f79ff]/10 blur-3xl" />
              <div className="absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-[#13b5ba]/10 blur-3xl" />
            </div>
            <button
              type="button"
              className={cn(
                "relative flex w-full items-center justify-between gap-4 text-left",
                isEmbedded ? "px-5 py-4" : "px-6 py-5",
              )}
              aria-expanded={isOpen}
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
            >
              <div className="min-w-0">
                {item.hint ? (
                  <span className="inline-flex rounded-full border border-[#0f79ff]/12 bg-[#eef6ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0] shadow-[0_8px_18px_rgba(15,121,255,0.08)]">
                    {item.hint}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "block font-semibold tracking-[-0.02em] text-[#0b1f35]",
                    item.hint ? "mt-3" : undefined,
                    isEmbedded ? "text-[0.98rem]" : "text-[1.03rem] md:text-[1.08rem]",
                  )}
                >
                  {item.title}
                </span>
              </div>
              <span className="flex shrink-0 items-center gap-2.5">
                {item.actionLabelClosed || item.actionLabelOpen ? (
                  <span className="hidden text-[11px] font-semibold uppercase tracking-[0.08em] text-[#557089] md:inline">
                    {isOpen ? item.actionLabelOpen ?? item.actionLabelClosed : item.actionLabelClosed ?? item.actionLabelOpen}
                  </span>
                ) : null}
                <span
                  className={cn(
                    "relative flex shrink-0 items-center justify-center overflow-hidden border text-[#0f79ff] transition duration-300",
                    isEmbedded ? "h-10 w-10 rounded-2xl" : "h-11 w-11 rounded-2xl",
                    isOpen
                      ? "border-[#0f79ff]/18 bg-[#eef6ff] shadow-[0_12px_26px_rgba(15,121,255,0.14)]"
                      : "border-[#0d3358]/10 bg-white/82 shadow-[0_10px_22px_rgba(11,31,53,0.05)] group-hover:border-[#0f79ff]/16 group-hover:bg-white",
                  )}
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-[#0f79ff]/8" />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn("relative h-4 w-4 transition duration-300", isOpen ? "rotate-90" : "rotate-0")}
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </span>
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80",
              )}
            >
              <div className={cn("overflow-hidden", isEmbedded ? "px-5 pb-5" : "px-6 pb-6")}>
                <div
                  className={cn(
                    "rounded-[1.3rem] border text-sm leading-7 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]",
                    isEmbedded
                      ? "border-[#dce8f5] bg-white/78 px-4 py-4"
                      : "border-[#dde9f5] bg-white/80 px-4 py-4 md:px-5",
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
