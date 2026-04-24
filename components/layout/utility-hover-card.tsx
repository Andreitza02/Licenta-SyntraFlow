"use client";

import type { ReactNode } from "react";

import { SiteLink } from "@/components/ui/site-link";
import { cn } from "@/lib/utils";

type UtilityHoverCardAction = {
  label: string;
  href: string;
  description: string;
};

type UtilityHoverCardProps = {
  label: string;
  icon: ReactNode;
  badge: string;
  title: string;
  description: string;
  actions?: UtilityHoverCardAction[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  minimal?: boolean;
  count?: number;
  highlight?: boolean;
  iconOnly?: boolean;
  tone?: "blue" | "rose";
  className?: string;
};

export function UtilityHoverCard({
  label,
  icon,
  badge,
  title,
  description,
  actions = [],
  primaryCta,
  secondaryCta,
  minimal = false,
  count = 0,
  highlight = false,
  iconOnly = false,
  tone = "blue",
  className,
}: UtilityHoverCardProps) {
  const toneStyles = tone === "rose"
    ? {
        highlight:
          "border-[#b11226]/28 bg-[#fff1f3] text-[#b11226] shadow-[0_14px_28px_rgba(177,18,38,0.16)] hover:-translate-y-0.5 hover:border-[#b11226]/38 hover:bg-white",
        idle: "border-[#f3c5cd] bg-white/92 text-[#b11226] hover:-translate-y-0.5 hover:border-[#b11226]/28 hover:bg-white",
        count: "bg-[#b11226] text-white ring-2 ring-white shadow-[0_10px_18px_rgba(177,18,38,0.28)]",
      }
    : {
        highlight:
          "border-[#0f79ff]/24 bg-[#eef6ff] text-[#0b58d0] shadow-[0_14px_28px_rgba(15,121,255,0.14)] hover:-translate-y-0.5 hover:border-[#0f79ff]/32 hover:bg-white",
        idle: "border-[#0d3358]/10 bg-white/84 text-[#0b1f35] hover:-translate-y-0.5 hover:border-[#0f79ff]/25 hover:bg-white",
        count: "bg-[#0f79ff] text-white",
      };

  if (minimal) {
    return (
      <SiteLink
        href={primaryCta.href}
        className={cn(
          "nav-utility-button relative hidden xl:inline-flex h-10 shrink-0 items-center rounded-full border text-[11px] font-medium 2xl:text-[12px]",
          iconOnly ? "w-10 justify-center px-0 overflow-visible" : "gap-2 px-3 2xl:px-3.5",
          highlight ? toneStyles.highlight : toneStyles.idle,
          className,
        )}
        aria-label={label}
      >
        <span className="relative z-[1] flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          {icon}
        </span>
        {!iconOnly ? <span className="relative z-[1] whitespace-nowrap">{label}</span> : null}
        {count > 0 ? (
          <span className={cn(
            "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold leading-none",
            toneStyles.count,
            iconOnly ? "absolute -right-2 -top-2 z-[2]" : "relative z-[2]",
          )}>
            {count}
          </span>
        ) : null}
      </SiteLink>
    );
  }

  return (
    <div className={cn("group/utility relative hidden xl:block", className)}>
      <button
        type="button"
        className="nav-utility-button inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#0d3358]/10 bg-white/84 px-3 text-[11px] font-medium text-[#0b1f35] hover:border-[#0f79ff]/25 2xl:px-3.5 2xl:text-[12px]"
        aria-haspopup="true"
        aria-label={label}
      >
        <span className="relative z-[1] flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          {icon}
        </span>
        <span className="relative z-[1] whitespace-nowrap">{label}</span>
        <svg
          viewBox="0 0 20 20"
          className="relative z-[1] h-3.5 w-3.5 text-[#557089] transition duration-300 group-hover/utility:rotate-180 group-focus-within/utility:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5 7 5 5 5-5" />
        </svg>
      </button>

      <div className="absolute right-0 top-full z-[80] pt-3">
        <div className="absolute inset-x-0 top-0 h-3" />
        <div className={cn(
          "pointer-events-none translate-y-2 scale-[0.985] opacity-0 transition duration-300 group-hover/utility:pointer-events-auto group-hover/utility:translate-y-0 group-hover/utility:scale-100 group-hover/utility:opacity-100 group-focus-within/utility:pointer-events-auto group-focus-within/utility:translate-y-0 group-focus-within/utility:scale-100 group-focus-within/utility:opacity-100",
          "w-[22.75rem]",
        )}>
          <div className={cn(
            "overflow-hidden rounded-[1.75rem] border border-[#d5e4f4] bg-white/96 p-3 shadow-[0_28px_72px_rgba(11,31,53,0.16)] backdrop-blur-2xl",
          )}>
            <div className="relative overflow-hidden rounded-[1.45rem] bg-[linear-gradient(135deg,#07192c_0%,#0b2847_52%,#0f79ff_100%)] p-4 text-white shadow-[0_18px_42px_rgba(11,31,53,0.2)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%)]" />
              <div className="pointer-events-none absolute -right-10 bottom-0 h-24 w-24 rounded-full bg-white/12 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/72">
                  {badge}
                </span>

                <div className="mt-4 flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-white/14 bg-white/10 text-white shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
                    {icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-2 text-xs leading-6 text-white/78">{description}</p>
                  </div>
                </div>
              </div>
            </div>

            {actions.length ? (
              <div className="mt-3 space-y-2">
                {actions.map((action) => (
                  <SiteLink
                    key={action.label}
                    href={action.href}
                    className="group/action block rounded-[1.2rem] border border-[#d7e6f5] bg-[linear-gradient(180deg,rgba(248,252,255,0.98),rgba(255,255,255,0.9))] px-4 py-3 transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/18 hover:bg-white hover:shadow-[0_16px_30px_rgba(11,31,53,0.08)]"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block text-sm font-semibold text-[#0b1f35]">{action.label}</span>
                        <span className="mt-1 block text-xs leading-6 text-muted">{action.description}</span>
                      </span>
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-[#0f79ff]/10 bg-[#f4f9ff] text-[#0f79ff] transition duration-300 group-hover/action:border-[#0f79ff]/24 group-hover/action:bg-[#eef6ff]">
                        <svg
                          viewBox="0 0 20 20"
                          className="h-3.5 w-3.5 transition duration-300 group-hover/action:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 10h10" />
                          <path d="m11 5 5 5-5 5" />
                        </svg>
                      </span>
                    </span>
                  </SiteLink>
                ))}
              </div>
            ) : null}

            <div className={cn("mt-3 grid gap-2", secondaryCta ? "sm:grid-cols-2" : "sm:grid-cols-1")}>
              <SiteLink
                href={primaryCta.href}
                className="interactive-button inline-flex items-center justify-center rounded-full bg-[length:160%_100%] bg-gradient-to-r from-[#0f79ff] via-[#2d8dff] to-[#14b8c7] bg-left px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(15,121,255,0.22)] hover:-translate-y-0.5 hover:bg-right"
              >
                {primaryCta.label}
              </SiteLink>

              {secondaryCta ? (
                <SiteLink
                  href={secondaryCta.href}
                  className="interactive-button inline-flex items-center justify-center rounded-full border border-[#0d3358]/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1f35] shadow-[0_14px_28px_rgba(11,31,53,0.06)] hover:-translate-y-0.5 hover:border-[#0f79ff]/20 hover:bg-[#f9fcff]"
                >
                  {secondaryCta.label}
                </SiteLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
