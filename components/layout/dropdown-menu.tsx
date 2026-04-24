"use client";

import { useEffect, useRef } from "react";

import { SiteLink } from "@/components/ui/site-link";
import type { Locale } from "@/lib/i18n";
import type { DropdownMenuItem } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

type DropdownMenuProps = {
  item: DropdownMenuItem;
  open: boolean;
  active: boolean;
  locale: Locale;
  onOpen: () => void;
  onClose: () => void;
};

export function DropdownMenu({
  item,
  open,
  active,
  locale,
  onOpen,
  onClose,
}: DropdownMenuProps) {
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
          "absolute left-1/2 top-[calc(100%-2px)] z-[70] max-h-[calc(100vh-6rem)] w-[min(24rem,92vw)] -translate-x-1/2 origin-top overflow-y-auto overscroll-contain rounded-[1.5rem] border border-[#cfe2f7] bg-white/96 p-1.5 shadow-[0_20px_56px_rgba(11,31,53,0.14)] backdrop-blur-xl transition duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="rounded-[1.1rem] border border-[#0d3358]/8 bg-[#f7fbff] px-3.5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
            {item.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
          <SiteLink
            href={item.href}
            className="mt-3 inline-flex text-sm font-semibold text-[#0f79ff] transition hover:text-[#0b58d0]"
            onClick={onClose}
          >
            {locale === "ro" ? "Vezi Pagina" : "View Page"}
          </SiteLink>
        </div>

        <div className="mt-1.5 space-y-1">
          {item.links.map((link) => (
            <SiteLink
              key={link.label}
              href={link.href}
              className="group block rounded-[1.1rem] border border-transparent px-3.5 py-2.5 transition hover:border-[#0f79ff]/10 hover:bg-[#f7fbff]"
              onClick={onClose}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block text-sm font-semibold text-[#0b1f35]">{link.label}</span>
                  {link.description ? (
                    <span className="mt-1 block text-xs leading-6 text-muted">{link.description}</span>
                  ) : null}
                </span>
                <svg
                  viewBox="0 0 20 20"
                  className="mt-1 h-4 w-4 shrink-0 text-[#7ba0c3] transition group-hover:translate-x-0.5 group-hover:text-[#0f79ff]"
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
      </div>
    </div>
  );
}
