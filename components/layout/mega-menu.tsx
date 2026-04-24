"use client";

import { useEffect, useRef } from "react";

import { NavItemIcon } from "@/components/layout/nav-item-icon";
import { SiteLink } from "@/components/ui/site-link";
import type { Locale } from "@/lib/i18n";
import type { DropdownMenuItem, MegaMenuItem } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  item: DropdownMenuItem | MegaMenuItem;
  open: boolean;
  active: boolean;
  locale: Locale;
  onOpen: () => void;
  onClose: () => void;
};

export function MegaMenu({
  item,
  open,
  active,
  locale,
  onOpen,
  onClose,
}: MegaMenuProps) {
  const panelId = `${item.id}-menu`;
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelScheduledClose = () => {
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => () => cancelScheduledClose(), []);

  const handleMouseEnter = () => {
    cancelScheduledClose();
    onOpen();
  };

  const handleMouseLeave = () => {
    cancelScheduledClose();
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
      closeTimeoutRef.current = null;
    }, 170);
  };

  const groups = item.type === "mega"
    ? item.groups
    : [
        {
          title: item.label,
          links: item.links,
        },
      ];
  const featured = item.type === "mega"
    ? item.featured
    : {
        eyebrow: item.label,
        title: item.description,
        description: item.links[0]?.description ?? item.description,
        href: item.href,
        ctaLabel: locale === "ro" ? "Vezi Pagina" : "View Page",
      };
  const previewLinks = groups.flatMap((group) => group.links).slice(0, 3);
  const panelAlignmentClass = item.id === "despre-proiect" || item.id === "solutii"
    ? "left-0 origin-top-left"
    : item.id === "studii-de-caz" || item.id === "arhitectura"
      ? "right-0 left-auto origin-top-right"
      : "left-1/2 -translate-x-1/2 origin-top";

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={cn(
          "nav-pill inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium 2xl:px-3 2xl:text-[12px]",
          active || open ? "nav-pill-active text-white" : "text-[#0b1f35]",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => {
          if (open) {
            onClose();
            return;
          }

          onOpen();
        }}
        onFocus={onOpen}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen();
          }
        }}
      >
        <span className="relative z-[1] inline-flex items-center gap-2">
          <NavItemIcon itemId={item.id} className="h-3.5 w-3.5 opacity-80" />
          <span className={cn("transition", active && "font-semibold")}>{item.label}</span>
          <svg
            viewBox="0 0 20 20"
            className={cn("relative z-[1] h-4 w-4 transition duration-300", open && "rotate-180")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 7 5 5 5-5" />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          "absolute top-[calc(100%+0.45rem)] z-[70] max-h-[calc(100vh-6rem)] w-[min(calc(100vw-2rem),68rem)] overflow-hidden rounded-[1.9rem] border border-[#cfe2f7] bg-white/94 p-2 shadow-[0_28px_72px_rgba(11,31,53,0.18)] backdrop-blur-2xl transition duration-300",
          panelAlignmentClass,
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.985] opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#13b5ba]/80 to-transparent" />
        <div className="pointer-events-none absolute -left-8 top-8 h-28 w-28 rounded-full bg-[#0f79ff]/12 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-6 h-36 w-36 rounded-full bg-[#13b5ba]/14 blur-3xl" />

        <div className="relative grid gap-2 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(244,250,255,0.98),rgba(255,255,255,0.96))] p-2 xl:grid-cols-[1.45fr_0.72fr]">
          <div className="rounded-[1.35rem] border border-[#d6e4f5] bg-white/92 px-5 py-5 shadow-[0_16px_38px_rgba(11,31,53,0.06)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {item.label}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {groups.map((group) => (
                    <span
                      key={group.title}
                      className="rounded-full border border-[#0f79ff]/10 bg-[#f5faff] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]"
                    >
                      {group.title}
                    </span>
                  ))}
                </div>
              </div>
              <SiteLink
                href={item.href}
                className="interactive-button inline-flex shrink-0 items-center justify-center rounded-full border border-[#0f79ff]/14 bg-[#eef6ff] px-4 py-2 text-xs font-semibold text-[#0b58d0] shadow-[0_12px_26px_rgba(15,121,255,0.08)] hover:-translate-y-0.5 hover:border-[#0f79ff]/24 hover:bg-white"
                onClick={onClose}
              >
                {locale === "ro" ? "Pagina Principala" : "Main Page"}
              </SiteLink>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {groups.map((group, index) => (
                <div
                  key={group.title}
                  className={cn(
                    "rounded-[1.25rem] border border-[#d7e6f5] bg-[linear-gradient(180deg,rgba(248,252,255,0.98),rgba(241,248,255,0.92))] px-4 py-4 transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/22 hover:shadow-[0_18px_40px_rgba(15,121,255,0.08)]",
                    open && "menu-card-enter",
                  )}
                  style={open ? { animationDelay: `${70 + index * 45}ms` } : undefined}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                      {group.title}
                    </p>
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-[#0f79ff]/12 bg-white text-[11px] font-semibold text-[#0b58d0]">
                      {group.links.length}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    {group.links.map((link) => (
                      <SiteLink
                        key={link.label}
                        href={link.href}
                        className="group block rounded-[1.08rem] border border-transparent bg-white/78 px-3.5 py-3 transition duration-300 hover:translate-x-1 hover:border-[#0f79ff]/18 hover:bg-white hover:shadow-[0_16px_28px_rgba(11,31,53,0.08)]"
                        onClick={onClose}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span>
                            <span className="block text-sm font-semibold text-[#0b1f35]">{link.label}</span>
                            {link.description ? (
                              <span className="mt-1.5 block text-xs leading-6 text-muted">
                                {link.description}
                              </span>
                            ) : null}
                          </span>
                          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border border-[#0f79ff]/10 bg-[#f4f9ff] text-[#0f79ff] transition duration-300 group-hover:border-[#0f79ff]/24 group-hover:bg-[#eef6ff] group-hover:shadow-[0_10px_22px_rgba(15,121,255,0.12)]">
                            <svg
                              viewBox="0 0 20 20"
                              className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5"
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
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "relative overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,#0b1f35_0%,#123457_52%,#0f79ff_100%)] px-5 py-5 text-white shadow-[0_24px_54px_rgba(11,31,53,0.22)]",
              open && "menu-card-enter",
            )}
            style={open ? { animationDelay: `${70 + groups.length * 45}ms` } : undefined}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_36%)]" />
            <div className="pointer-events-none absolute -right-12 bottom-0 h-32 w-32 rounded-full bg-white/12 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/62">
                {featured.eyebrow}
              </p>
              <h3 className="mt-3 text-[1.45rem] font-semibold tracking-[-0.03em] text-white">
                {featured.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                {featured.description}
              </p>

              <div className="mt-5 rounded-[1.15rem] border border-white/12 bg-white/8 p-3.5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/60">
                  {locale === "ro" ? "Trasee recomandate" : "Recommended paths"}
                </p>
                <div className="mt-3 space-y-2.5">
                  {previewLinks.map((link) => (
                    <div key={`${item.id}-${link.label}`} className="flex items-start gap-3 text-sm leading-6 text-white/88">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#13b5ba]" />
                      <span>{link.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <SiteLink
                href={featured.href}
                className="interactive-button mt-6 inline-flex items-center justify-center rounded-full border border-white/70 bg-white px-4 py-2.5 text-sm font-semibold !text-[#0b1f35] shadow-[0_14px_30px_rgba(255,255,255,0.16)] hover:-translate-y-0.5 hover:bg-[#f7fbff] hover:!text-[#0b1f35]"
                onClick={onClose}
              >
                <span className="!text-[#0b1f35]">{featured.ctaLabel}</span>
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
