"use client";

import Image from "next/image";
import { useState } from "react";

import searchIcon from "../../icons-search-30.png";
import { NavItemIcon } from "@/components/layout/nav-item-icon";
import { SiteLink } from "@/components/ui/site-link";
import type { Locale } from "@/lib/i18n";
import type { DropdownMenuItem, MegaMenuItem, NavbarMenuItem } from "@/lib/menu-data";
import { buttonVariants, cn } from "@/lib/utils";

type MobileMenuProps = {
  items: NavbarMenuItem[];
  activeItemId: string | null;
  locale: Locale;
  onNavigate: () => void;
  onOpenSearch: () => void;
  onClose: () => void;
};

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="19" r="1.55" />
      <circle cx="18" cy="19" r="1.55" />
      <path d="M2.5 4.5h2.8l2.2 10.1a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.75l1.35-6.15H6.25" />
    </svg>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8.25" r="3.6" />
      <path d="M5.5 19.25a6.5 6.5 0 0 1 13 0" />
      <circle cx="12" cy="12" r="9.1" />
    </svg>
  );
}

function renderDropdownLinks(
  item: DropdownMenuItem,
  onClose: () => void,
) {
  return item.links.slice(0, 4).map((link) => (
    <SiteLink
      key={link.label}
      href={link.href}
      className="flex items-center justify-between gap-3 rounded-[1.05rem] border border-[#d7e6f5] bg-white/88 px-3 py-2.5 transition hover:border-[#0f79ff]/18 hover:bg-white"
      onClick={onClose}
    >
      <span className="truncate text-sm font-semibold text-[#0b1f35]">{link.label}</span>
      <span className="text-[#0f79ff]">-&gt;</span>
    </SiteLink>
  ));
}

function renderMegaLinks(
  item: MegaMenuItem,
  onClose: () => void,
) {
  const quickLinks = item.groups
    .flatMap((group) => group.links.map((link) => ({ ...link, groupTitle: group.title })))
    .filter((link, index, links) => links.findIndex((current) => current.href === link.href) === index)
    .slice(0, 5);

  return (
    <div className="grid gap-2">
      {quickLinks.map((link) => (
        <SiteLink
          key={`${item.id}-${link.href}`}
          href={link.href}
          className="flex items-center justify-between gap-3 rounded-[1.05rem] border border-[#d7e6f5] bg-white/88 px-3 py-2.5 transition hover:border-[#0f79ff]/18 hover:bg-white"
          onClick={onClose}
        >
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-[#0b1f35]">{link.label}</span>
            <span className="mt-0.5 block truncate text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
              {link.groupTitle}
            </span>
          </span>
          <span className="text-[#0f79ff]">-&gt;</span>
        </SiteLink>
      ))}
    </div>
  );
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
  const [expandedUtilityId, setExpandedUtilityId] = useState<"cart" | "account" | null>(null);
  const utilityPanels = locale === "ro"
    ? [
        {
          id: "cart" as const,
          label: "Cosul meu",
          icon: <CartIcon className="h-[18px] w-[18px] shrink-0" />,
          title: "Acces rapid la pagina de cos",
          description: "In meniu ramane un singur buton care te duce direct la cosul de cumparaturi.",
          links: [
            {
              label: "Vezi Cosul",
              href: "/cart",
              description: "Deschide pagina cu AI Agent Builder, servicii optionale si sumarul comenzii.",
            },
          ],
        },
        {
          id: "account" as const,
          label: "Cont",
          icon: <AccountIcon className="h-[18px] w-[18px] shrink-0" />,
          title: "Detalii cont",
          description: "Un singur buton care te duce la pagina unde poti personaliza detaliile contului.",
          links: [
            {
              label: "View Details",
              href: "/account",
              description: "Deschide pagina pentru editarea profilului, companiei si preferintelor.",
            },
          ],
        },
      ]
    : [
        {
          id: "cart" as const,
          label: "My Cart",
          icon: <CartIcon className="h-[18px] w-[18px] shrink-0" />,
          title: "Quick access to the cart page",
          description: "In the menu this stays as one direct action that opens the shopping cart page.",
          links: [
            {
              label: "View Cart",
              href: "/cart",
              description: "Open the page with AI Agent Builder, optional services, and the order summary.",
            },
          ],
        },
        {
          id: "account" as const,
          label: "Account",
          icon: <AccountIcon className="h-[18px] w-[18px] shrink-0" />,
          title: "Account details",
          description: "One direct button that opens the page where you can customize your account details.",
          links: [
            {
              label: "View Details",
              href: "/account",
              description: "Open the page for editing profile, company, and preference details.",
            },
          ],
        },
      ];
  const getNavigationHref = (href: string, homeSectionId?: string) => (homeSectionId ? `/#${homeSectionId}` : href);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isActive = activeItemId === item.id;
        const isExpanded = expandedId === item.id;

        if (item.type === "link") {
          return (
            <SiteLink
              key={item.id}
              href={getNavigationHref(item.href, item.homeSectionId)}
              className={cn(
                "drawer-nav-item flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-[1.45rem] px-4 py-3 text-left text-sm font-medium",
                isActive
                  ? "bg-[#0f79ff] text-white shadow-[0_16px_30px_rgba(15,121,255,0.18)]"
                  : "bg-white/80 text-[#0b1f35]",
              )}
              onClick={() => {
                onNavigate();
                onClose();
              }}
            >
              <NavItemIcon itemId={item.id} className="h-4 w-4 opacity-80" />
              <span className="mr-auto">{item.label}</span>
            </SiteLink>
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
                <span className="flex items-center gap-2 text-sm font-semibold text-[#0b1f35]">
                  <NavItemIcon itemId={item.id} className="h-4 w-4 text-[#0b58d0]" />
                  <span>{item.label}</span>
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
                  <SiteLink
                    href={getNavigationHref(item.href, item.homeSectionId)}
                    className="block w-full rounded-[1.1rem] border border-[#0d3358]/8 bg-[#071d33] px-3 py-3 text-left text-sm font-semibold text-white transition hover:bg-[#0b2947]"
                    onClick={() => {
                      onNavigate();
                      onClose();
                    }}
                  >
                    {locale === "ro" ? "Vezi Pagina" : "Open"} {item.label}
                  </SiteLink>

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

      <div className="grid gap-3">
        {utilityPanels.map((panel) => {
          const isExpanded = expandedUtilityId === panel.id;

          return (
            <div
              key={panel.id}
              className={cn(
                "rounded-[1.55rem] border border-[#0d3358]/8 bg-white/88 p-2 transition",
                isExpanded && "shadow-[0_18px_34px_rgba(11,31,53,0.08)]",
              )}
            >
              <button
                type="button"
                className="drawer-nav-item flex w-full items-center justify-between rounded-[1.2rem] px-3 py-3 text-left"
                aria-expanded={isExpanded}
                aria-controls={`${panel.id}-mobile-panel`}
                onClick={() => {
                  setExpandedUtilityId((current) => (current === panel.id ? null : panel.id));
                }}
              >
                <span className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] border border-[#0f79ff]/10 bg-[#eef6ff] text-[#0b58d0]">
                    {panel.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[#0b1f35]">{panel.label}</span>
                    <span className="mt-1 block text-xs leading-6 text-muted">{panel.title}</span>
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
                id={`${panel.id}-mobile-panel`}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300",
                  isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 px-1 pb-1 pt-2">
                    <div className="rounded-[1.25rem] border border-[#d7e6f5] bg-[linear-gradient(180deg,rgba(248,252,255,0.98),rgba(255,255,255,0.9))] px-4 py-4">
                      <p className="text-sm font-semibold text-[#0b1f35]">{panel.title}</p>
                      <p className="mt-2 text-xs leading-6 text-muted">{panel.description}</p>
                    </div>

                    {panel.links.map((link) => (
                      <SiteLink
                        key={link.label}
                        href={link.href}
                        className="block rounded-[1.2rem] border border-[#d7e6f5] bg-white/90 px-4 py-3 transition hover:bg-[#f7fbff]"
                        onClick={onClose}
                      >
                        <span className="block text-sm font-semibold text-[#0b1f35]">{link.label}</span>
                        <span className="mt-1 block text-xs leading-6 text-muted">{link.description}</span>
                      </SiteLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <SiteLink
        href="/contact"
        className={buttonVariants("primary", "w-full justify-center")}
        onClick={onClose}
      >
        {locale === "ro" ? "Solicita Demo" : "Request Demo"}
      </SiteLink>
    </div>
  );
}
