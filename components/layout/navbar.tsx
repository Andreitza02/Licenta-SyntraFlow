"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import searchIcon from "../../icons-search-30.png";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CommandPalette } from "@/components/ui/command-palette";
import { CTAButton } from "@/components/ui/cta-button";
import { Drawer } from "@/components/ui/drawer";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LogoMark } from "@/components/ui/logo-mark";
import { useDismissableLayer } from "@/lib/hooks/use-dismissable-layer";
import type { Locale } from "@/lib/i18n";
import { getNavbarMenu } from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

type NavbarProps = {
  locale: Locale;
};

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navbarMenu = useMemo(() => getNavbarMenu(locale), [locale]);

  const scrollSpyIds = useMemo(
    () => navbarMenu
      .map((item) => item.homeSectionId)
      .filter((item): item is string => Boolean(item)),
    [],
  );
  const activeHomeSection = useScrollSpy(pathname === "/" ? scrollSpyIds : []);

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

  function isItemActive(item: (typeof navbarMenu)[number]) {
    if (pathname === "/") {
      return item.homeSectionId === activeHomeSection || (!activeHomeSection && item.href === "/");
    }

    return pathname === item.href;
  }

  function navigateTo(href: string, homeSectionId?: string) {
    setOpenMenuId(null);

    if (pathname === "/" && homeSectionId) {
      document.getElementById(homeSectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    router.push(href);
  }

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
            <button
              type="button"
              className="flex min-w-0 items-center gap-3 xl:hidden"
              aria-label={`${siteConfig.name} - pagina principala`}
              onClick={() => navigateTo("/", "home-top")}
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
            </button>

            <div className="hidden min-w-0 items-center gap-1 xl:flex 2xl:gap-1.5">
              <nav className="min-w-0 items-center gap-px xl:flex 2xl:gap-px" aria-label="Navigatie principala">
                <button
                  type="button"
                  className="mr-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0d3358]/10 bg-white/92 shadow-[0_10px_20px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/18 hover:bg-white 2xl:mr-1 2xl:shadow-[0_12px_24px_rgba(11,31,53,0.08)]"
                  aria-label={`${siteConfig.name} - pagina principala`}
                  onClick={() => navigateTo("/", "home-top")}
                >
                  <LogoMark className="h-8 w-8" />
                </button>

                {navbarMenu.map((item) => {
                  const isActive = isItemActive(item);

                  if (item.type === "link") {
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={cn(
                          desktopNavItemClass,
                          isActive ? "nav-pill-active text-white" : "text-[#0b1f35]",
                        )}
                        onClick={() => navigateTo(item.href, item.homeSectionId)}
                      >
                        <span className={cn("relative z-[1] transition", isActive && "font-semibold")}>
                          {item.label}
                        </span>
                      </button>
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

              <CTAButton href="/contact" className="h-10 px-3 py-0 text-[11px] 2xl:px-3.5 2xl:text-[12px]">
                <span className="min-[1720px]:hidden">{locale === "ro" ? "Demo" : "Demo"}</span>
                <span className="hidden min-[1720px]:inline">{locale === "ro" ? "Solicita Demo" : "Request Demo"}</span>
              </CTAButton>

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
          onNavigate={navigateTo}
          onOpenSearch={() => setIsCommandOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        />
      </Drawer>

      <CommandPalette open={isCommandOpen} onClose={() => setIsCommandOpen(false)} locale={locale} />
    </>
  );
}
