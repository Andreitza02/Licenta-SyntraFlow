"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import searchIcon from "../../icons-search-30.png";
import type { Locale } from "@/lib/i18n";
import type { DropdownMenuItem, MegaMenuItem, NavbarMenuItem } from "@/lib/menu-data";
import { buttonVariants, cn } from "@/lib/utils";

type MobileMenuProps = {
  items: NavbarMenuItem[];
  activeItemId: string | null;
  locale: Locale;
  onNavigate: (href: string, homeSectionId?: string) => void;
  onOpenSearch: () => void;
  onClose: () => void;
};

function renderDropdownLinks(
  item: DropdownMenuItem,
  onClose: () => void,
) {
  return item.links.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      className="block rounded-[1.2rem] px-3 py-3 transition hover:bg-white"
      onClick={onClose}
    >
      <span className="block text-sm font-semibold text-[#0b1f35]">{link.label}</span>
      {link.description ? (
        <span className="mt-1 block text-xs leading-6 text-muted">{link.description}</span>
      ) : null}
    </Link>
  ));
}

function renderMegaLinks(
  item: MegaMenuItem,
  onClose: () => void,
) {
  return item.groups.map((group) => (
    <div key={group.title} className="rounded-[1.2rem] border border-[#0d3358]/8 bg-white px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
        {group.title}
      </p>
      <div className="mt-2 space-y-1">
        {group.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block rounded-[1rem] px-2 py-2 transition hover:bg-[#f7fbff]"
            onClick={onClose}
          >
            <span className="block text-sm font-semibold text-[#0b1f35]">{link.label}</span>
            {link.description ? (
              <span className="mt-1 block text-xs leading-6 text-muted">{link.description}</span>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  ));
}

export function MobileMenu({
  items,
  activeItemId,
  locale,
  onNavigate,
  onOpenSearch,
  onClose,
}: MobileMenuProps) {
  const [expandedId, setExpandedId] = useState<string | null>(activeItemId);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isActive = activeItemId === item.id;
        const isExpanded = expandedId === item.id;

        if (item.type === "link") {
          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "drawer-nav-item block w-full whitespace-nowrap rounded-[1.45rem] px-4 py-3 text-left text-sm font-medium",
                isActive
                  ? "bg-[#0f79ff] text-white shadow-[0_16px_30px_rgba(15,121,255,0.18)]"
                  : "bg-white/80 text-[#0b1f35]",
              )}
              onClick={() => {
                onNavigate(item.href, item.homeSectionId);
                onClose();
              }}
            >
              {item.label}
            </button>
          );
        }

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-[1.55rem] border border-[#0d3358]/8 bg-white/88 p-2 transition",
              (isActive || isExpanded) && "shadow-[0_18px_34px_rgba(11,31,53,0.08)]",
            )}
          >
            <button
              type="button"
              className={cn(
                "drawer-nav-item flex w-full items-center justify-between rounded-[1.2rem] px-3 py-3 text-left",
                isActive ? "bg-[#eef6ff]" : "bg-transparent",
              )}
              aria-expanded={isExpanded}
              aria-controls={`${item.id}-mobile-panel`}
              onClick={() => {
                setExpandedId((current) => (current === item.id ? null : item.id));
              }}
            >
              <span>
                <span className="block text-sm font-semibold text-[#0b1f35]">{item.label}</span>
                <span className="mt-1 block text-xs leading-6 text-muted">
                  {item.description}
                </span>
              </span>
              <svg
                viewBox="0 0 20 20"
                className={cn("h-4 w-4 shrink-0 text-[#557089] transition duration-300", isExpanded && "rotate-180")}
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

            <div
              id={`${item.id}-mobile-panel`}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300",
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-2 px-1 pb-1 pt-2">
                  <button
                    type="button"
                    className="block w-full rounded-[1.2rem] border border-[#0d3358]/8 bg-[#f7fbff] px-3 py-3 text-left text-sm font-semibold text-[#0b1f35] transition hover:border-[#0f79ff]/18"
                    onClick={() => {
                      onNavigate(item.href, item.homeSectionId);
                      onClose();
                    }}
                  >
                    {locale === "ro" ? "Vezi Pagina" : "Open"} {item.label}
                  </button>

                  {item.type === "dropdown"
                    ? renderDropdownLinks(item, onClose)
                    : renderMegaLinks(item, onClose)}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="drawer-nav-item flex w-full items-center gap-2 rounded-[1.45rem] border border-[#0d3358]/10 bg-[#f4fbff] px-4 py-3 text-left text-sm font-semibold text-[#0b1f35]"
        onClick={() => {
          onClose();
          onOpenSearch();
        }}
      >
        <Image
          src={searchIcon}
          alt=""
          aria-hidden="true"
          className="h-[18px] w-[18px] object-contain"
        />
        <span>{locale === "ro" ? "Cauta In Platforma" : "Search Platform"}</span>
      </button>

      <Link
        href="/contact"
        className={buttonVariants("primary", "w-full justify-center")}
        onClick={onClose}
      >
        {locale === "ro" ? "Solicita Demo" : "Request Demo"}
      </Link>
    </div>
  );
}
