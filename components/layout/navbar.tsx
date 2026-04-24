"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import searchIcon from "../../icons-search-30.png";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavItemIcon } from "@/components/layout/nav-item-icon";
import { UtilityHoverCard } from "@/components/layout/utility-hover-card";
import { CommandPalette } from "@/components/ui/command-palette";
import { Drawer } from "@/components/ui/drawer";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LogoMark } from "@/components/ui/logo-mark";
import { SiteLink } from "@/components/ui/site-link";
import { useCart } from "@/components/providers/cart-provider";
import { useDismissableLayer } from "@/lib/hooks/use-dismissable-layer";
import type { Locale } from "@/lib/i18n";
import { getNavbarMenu } from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
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

function HeartIcon({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.55 4.8 13.85a4.6 4.6 0 0 1 0-6.7 4.75 4.75 0 0 1 6.7 0L12 7.7l.5-.55a4.75 4.75 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.7Z" />
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

export function Navbar({ locale }: NavbarProps) {
  const { cartCount, favoriteCount } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navbarMenu = useMemo(() => getNavbarMenu(locale), [locale]);

  useDismissableLayer({
    enabled: Boolean(openMenuId),
    refs: [headerRef],
    onDismiss: () => setOpenMenuId(null),
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMenuId(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const shouldUseSolid = pathname !== "/" || isScrolled || isMenuOpen || Boolean(openMenuId);
  const desktopNavItemClass =
    "nav-pill inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium 2xl:px-3 2xl:text-[12px]";
  const cartLabel = locale === "ro" ? "Cosul meu" : "My Cart";
  const favoritesLabel = locale === "ro" ? "Favorite" : "Favorites";
  const accountLabel = locale === "ro" ? "Cont" : "Account";
  const cartPanel = locale === "ro"
    ? {
        badge: "Cos rapid",
        title: "Cosul tau de cumparaturi",
        description: "Deschide pagina dedicata cart-ului pentru AI Agent Builder si sumarul comenzii.",
        actions: [],
        primaryCta: {
          label: "Vezi Cosul",
          href: "/cart",
        },
        minimal: true,
      }
    : {
        badge: "Quick cart",
        title: "Your shopping cart",
        description: "Open the dedicated cart page for AI Agent Builder and the order summary.",
        actions: [],
        primaryCta: {
          label: "View Cart",
          href: "/cart",
        },
        minimal: true,
      };
  const accountPanel = locale === "ro"
    ? {
        badge: "Cont rapid",
        title: "Detalii cont",
        description: "Deschide pagina dedicata pentru actualizarea si personalizarea detaliilor contului.",
        actions: [],
        primaryCta: {
          label: "View Details",
          href: "/account",
        },
        minimal: true,
      }
    : {
        badge: "Quick account",
        title: "Account details",
        description: "Open the dedicated page for updating and customizing account details.",
        actions: [],
        primaryCta: {
          label: "View Details",
          href: "/account",
        },
        minimal: true,
      };
  const favoritesPanel = locale === "ro"
    ? {
        badge: "Favorite",
        title: "Produsele favorite",
        description: "Deschide lista simpla cu produsele pe care le-ai marcat cu inima din catalog.",
        actions: [],
        primaryCta: {
          label: "Vezi favorite",
          href: "/favorites",
        },
        minimal: true,
        iconOnly: true,
      }
    : {
        badge: "Favorites",
        title: "Saved favorites",
        description: "Open the simple list of products you marked with the heart icon in the catalog.",
        actions: [],
        primaryCta: {
          label: "View favorites",
          href: "/favorites",
        },
        minimal: true,
        iconOnly: true,
      };

  function isItemActive(item: (typeof navbarMenu)[number]) {
    const currentPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
    const itemPath = item.href.endsWith("/") && item.href !== "/" ? item.href.slice(0, -1) : item.href;

    if (item.id === "product" && (currentPath === "/product" || currentPath === "/produse")) {
      return true;
    }

    return currentPath === itemPath;
  }
  const getNavigationHref = (href: string, homeSectionId?: string) => (homeSectionId ? `/#${homeSectionId}` : href);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
        <div
          ref={headerRef}
          className={cn(
            "mx-auto w-full max-w-[92rem] rounded-[1.6rem] border px-3 py-3 transition duration-300 md:px-4 xl:w-fit xl:max-w-[calc(100vw-4rem)] 2xl:px-5",
            shouldUseSolid
              ? "border-[#0d3358]/8 bg-white/88 shadow-[0_14px_36px_rgba(11,31,53,0.08)] backdrop-blur-xl"
              : "border-white/40 bg-white/12 backdrop-blur-md",
          )}
        >
          <div className="flex items-center justify-between gap-1.5 xl:gap-2 2xl:gap-3">
            <SiteLink
              href="/#home-top"
              className="flex min-w-0 items-center gap-3 xl:hidden"
              aria-label={`${siteConfig.name} - pagina principala`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                <LogoMark className="h-10 w-10" />
              </span>
              <div className="min-w-0">
                <p className="font-display truncate text-base font-semibold text-[#0b1f35]">{siteConfig.name}</p>
                <p className="truncate text-xs text-muted">
                  {locale === "ro"
                    ? "Platforma web pentru automatizarea interactiunilor"
                    : "Web platform for automating customer interactions"}
                </p>
              </div>
            </SiteLink>

            <div className="hidden min-w-0 items-center gap-1 xl:flex 2xl:gap-1.5">
              <nav className="min-w-0 items-center gap-px xl:flex 2xl:gap-px" aria-label="Navigatie principala">
                <SiteLink
                  href="/#home-top"
                  className="mr-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0d3358]/10 bg-white/92 shadow-[0_10px_20px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/18 hover:bg-white 2xl:mr-1 2xl:shadow-[0_12px_24px_rgba(11,31,53,0.08)]"
                  aria-label={`${siteConfig.name} - pagina principala`}
                >
                  <LogoMark className="h-8 w-8" />
                </SiteLink>

                {navbarMenu.map((item) => {
                  const isActive = isItemActive(item);

                  if (item.type === "link") {
                    return (
                      <SiteLink
                        key={item.id}
                        href={getNavigationHref(item.href, item.homeSectionId)}
                        className={cn(
                          desktopNavItemClass,
                          isActive ? "nav-pill-active text-white" : "text-[#0b1f35]",
                        )}
                      >
                        <span className="relative z-[1] inline-flex items-center gap-1.5">
                          <NavItemIcon itemId={item.id} className="h-3.5 w-3.5 opacity-80" />
                          <span className={cn("transition", isActive && "font-semibold")}>
                            {item.label}
                          </span>
                        </span>
                      </SiteLink>
                    );
                  }

                  return (
                    <MegaMenu
                      key={item.id}
                      item={item}
                      open={openMenuId === item.id}
                      active={isActive}
                      locale={locale}
                      onOpen={() => setOpenMenuId(item.id)}
                      onClose={() => {
                        setOpenMenuId((current) => (current === item.id ? null : current));
                      }}
                    />
                  );
                })}
              </nav>

              <UtilityHoverCard
                label={cartLabel}
                icon={<CartIcon className="h-3.5 w-3.5 opacity-80" />}
                badge={cartPanel.badge}
                title={cartPanel.title}
                description={cartPanel.description}
                actions={cartPanel.actions}
                primaryCta={cartPanel.primaryCta}
                minimal={cartPanel.minimal}
                count={cartCount}
                highlight={cartCount > 0}
              />

              <UtilityHoverCard
                label={favoritesLabel}
                icon={<HeartIcon className="h-[18px] w-[18px] text-[#b11226]" active={favoriteCount > 0} />}
                badge={favoritesPanel.badge}
                title={favoritesPanel.title}
                description={favoritesPanel.description}
                actions={favoritesPanel.actions}
                primaryCta={favoritesPanel.primaryCta}
                minimal={favoritesPanel.minimal}
                iconOnly={favoritesPanel.iconOnly}
                tone="rose"
                highlight={favoriteCount > 0}
                className="mx-0.5"
              />

              <UtilityHoverCard
                label={accountLabel}
                icon={<AccountIcon className="h-[18px] w-[18px]" />}
                badge={accountPanel.badge}
                title={accountPanel.title}
                description={accountPanel.description}
                actions={accountPanel.actions}
                primaryCta={accountPanel.primaryCta}
                minimal={accountPanel.minimal}
              />

              <button
                type="button"
                className="nav-utility-button h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0d3358]/10 bg-white/80 text-[#0b1f35] hover:border-[#0f79ff]/25 xl:inline-flex"
                onClick={() => setIsCommandOpen(true)}
                aria-label={locale === "ro" ? "Deschide cautarea rapida" : "Open quick search"}
              >
                <Image
                  src={searchIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-[18px] w-[18px] object-contain"
                />
              </button>

              <div className="hidden 2xl:block">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>

            <button
              type="button"
              className="nav-utility-button inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#0d3358]/10 bg-white/80 text-[#0b1f35] xl:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Deschide meniul"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="relative h-4 w-5">
                <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current" />
                <span className="absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current" />
                <span className="absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <Drawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title={locale === "ro" ? "Navigatie rapida" : "Quick Navigation"}
        closeLabel={locale === "ro" ? "Inchide" : "Close"}
      >
        <div className="mb-4 flex justify-start">
          <LanguageSwitcher locale={locale} />
        </div>
        <MobileMenu
          items={navbarMenu}
          activeItemId={navbarMenu.find((item) => isItemActive(item))?.id ?? null}
          locale={locale}
          onNavigate={() => setOpenMenuId(null)}
          onOpenSearch={() => setIsCommandOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        />
      </Drawer>

      <CommandPalette open={isCommandOpen} onClose={() => setIsCommandOpen(false)} locale={locale} />
    </>
  );
}
