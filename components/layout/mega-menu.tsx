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
        href: item.href,
        ctaLabel: locale === "ro" ? "Vezi Pagina" : "View Page",
      };
  const quickLinks = groups
    .flatMap((group) => group.links.map((link) => ({ ...link, groupTitle: group.title })))
    .filter((link, index, links) => links.findIndex((current) => current.href === link.href) === index)
    .slice(0, 4);
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
          "absolute top-[calc(100%+0.45rem)] z-[70] max-h-[calc(100vh-6rem)] w-[min(calc(100vw-2rem),40rem)] overflow-hidden rounded-[1.6rem] border border-[#cfe2f7] bg-white/94 p-2 shadow-[0_26px_64px_rgba(11,31,53,0.16)] backdrop-blur-2xl transition duration-300",
          panelAlignmentClass,
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-3 scale-[0.985] opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#13b5ba]/80 to-transparent" />

        <div className="relative overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(247,252,255,0.98),rgba(255,255,255,0.96))]">
          <div className="flex items-center justify-between gap-3 border-b border-[#d7e6f5] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0f79ff] text-white shadow-[0_12px_28px_rgba(15,121,255,0.18)]">
                <NavItemIcon itemId={item.id} className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#0b1f35]">{item.label}</p>
                <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {featured.eyebrow}
                </p>
              </div>
            </div>

            <SiteLink
              href={item.href}
              className="interactive-button inline-flex shrink-0 items-center justify-center rounded-full border border-[#0f79ff]/14 bg-[#eef6ff] px-3.5 py-2 text-xs font-semibold text-[#0b58d0] shadow-[0_12px_26px_rgba(15,121,255,0.08)] hover:-translate-y-0.5 hover:border-[#0f79ff]/24 hover:bg-white"
              onClick={onClose}
            >
              {locale === "ro" ? "Deschide" : "Open"}
            </SiteLink>
          </div>

          <div className="grid gap-2 p-2 sm:grid-cols-2">
            {quickLinks.map((link, index) => (
              <SiteLink
                key={`${item.id}-${link.href}`}
                href={link.href}
                className={cn(
                  "group rounded-[1.05rem] border border-[#d7e6f5] bg-white/88 px-3.5 py-3 shadow-[0_10px_24px_rgba(11,31,53,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/22 hover:bg-white hover:shadow-[0_18px_34px_rgba(11,31,53,0.08)]",
                  open && "menu-card-enter",
                )}
                style={open ? { animationDelay: `${60 + index * 35}ms` } : undefined}
                onClick={onClose}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[#0f79ff]/10 bg-[#f4f9ff] text-[#0b58d0] transition duration-300 group-hover:bg-[#0f79ff] group-hover:text-white">
                    <NavItemIcon itemId={item.id} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[#0b1f35]">{link.label}</span>
                    <span className="mt-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
                      {link.groupTitle}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className="ml-auto h-3.5 w-3.5 shrink-0 text-[#0f79ff] transition duration-300 group-hover:translate-x-0.5"
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
              </SiteLink>
            ))}
          </div>

          <div className="px-2 pb-2">
            <SiteLink
              href={featured.href}
              className={cn(
                "group flex items-center justify-between gap-4 rounded-[1.1rem] bg-[#071d33] px-4 py-3 text-white shadow-[0_20px_42px_rgba(7,29,51,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b2947]",
                open && "menu-card-enter",
              )}
              style={open ? { animationDelay: `${80 + quickLinks.length * 35}ms` } : undefined}
              onClick={onClose}
            >
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8bd7ff]">
                  {locale === "ro" ? "Recomandat" : "Recommended"}
                </span>
                <span className="mt-1 block truncate text-sm font-semibold text-white">
                  {featured.title}
                </span>
              </span>
              <span className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-white px-3 text-xs font-semibold text-[#071d33] transition duration-300 group-hover:translate-x-0.5">
                {featured.ctaLabel}
              </span>
            </SiteLink>
          </div>
        </div>
      </div>
    </div>
  );
}
