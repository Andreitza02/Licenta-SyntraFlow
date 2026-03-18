"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import type { Locale } from "@/lib/i18n";
import type { MegaMenuItem } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  item: MegaMenuItem;
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

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={cn(
          "nav-pill shrink-0 whitespace-nowrap rounded-full px-1 py-1.5 text-[11px] font-medium 2xl:px-2.5 2xl:text-[13px]",
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
          "absolute left-1/2 top-[calc(100%-2px)] z-[70] max-h-[calc(100vh-6rem)] w-[min(94vw,64rem)] -translate-x-1/2 origin-top overflow-y-auto overscroll-contain rounded-[1.7rem] border border-[#cfe2f7] bg-white/96 p-1.5 shadow-[0_20px_56px_rgba(11,31,53,0.14)] backdrop-blur-xl transition duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="grid gap-1.5 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(247,251,255,0.95),rgba(255,255,255,0.96))] p-1.5 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[1.2rem] border border-[#0d3358]/8 bg-white px-4 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </div>
              <Link
                href={item.href}
                className="inline-flex shrink-0 rounded-full border border-[#0f79ff]/14 bg-[#eef6ff] px-4 py-2 text-xs font-semibold text-[#0b58d0] transition hover:border-[#0f79ff]/24 hover:bg-white"
                onClick={onClose}
              >
                {locale === "ro" ? "Pagina Principala" : "Main Page"}
              </Link>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {item.groups.map((group) => (
                <div
                  key={group.title}
                  className="rounded-[1.1rem] border border-[#0d3358]/8 bg-[#f8fcff] px-3.5 py-3.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {group.title}
                  </p>
                  <div className="mt-3 space-y-2">
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group block rounded-[1.1rem] px-3 py-2 transition hover:bg-white"
                        onClick={onClose}
                      >
                        <span className="block text-sm font-semibold text-[#0b1f35]">
                          {link.label}
                        </span>
                        {link.description ? (
                          <span className="mt-1 block text-xs leading-5 text-muted">
                            {link.description}
                          </span>
                        ) : null}
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0f79ff] opacity-0 transition group-hover:opacity-100">
                          {locale === "ro" ? "Exploreaza" : "Explore"}
                          <svg
                            viewBox="0 0 20 20"
                            className="h-3.5 w-3.5"
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
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.2rem] bg-[#0b1f35] px-4 py-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
              {item.featured.eyebrow}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
              {item.featured.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {item.featured.description}
            </p>
            <Link
              href={item.featured.href}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/70 bg-white px-4 py-2 text-sm font-semibold !text-[#0b1f35] shadow-[0_10px_24px_rgba(255,255,255,0.14)] transition hover:-translate-y-0.5 hover:bg-[#f7fbff] hover:!text-[#0b1f35]"
              onClick={onClose}
            >
              <span className="!text-[#0b1f35]">{item.featured.ctaLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
