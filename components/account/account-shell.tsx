"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { GridIcon, SettingsIcon, ShieldIcon, UserIcon } from "@/components/account/account-form-ui";
import { SiteLink } from "@/components/ui/site-link";
import type { Locale } from "@/lib/i18n";
import { buttonVariants, cn } from "@/lib/utils";

type AccountShellProps = {
  children: React.ReactNode;
  locale: Locale;
};

function getInitials(firstName?: string, lastName?: string) {
  const first = firstName?.trim().charAt(0) ?? "S";
  const last = lastName?.trim().charAt(0) ?? "F";

  return `${first}${last}`.toUpperCase();
}

export function AccountShell({ children, locale }: AccountShellProps) {
  const { logout, user } = useAuth();
  const { pushToast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const labels = locale === "ro"
    ? {
        menu: "Meniu cont",
        close: "Inchide meniul",
        overview: "Dashboard cont",
        information: "Profil de business",
        security: "Securitate",
        preferences: "Preferinte",
        admin: "Admin",
        logout: "Iesi din cont",
        signedIn: "Autentificat",
        logoutTitle: "Ai iesit din cont",
        logoutDescription: "Contul este inchis in siguranta pe acest dispozitiv.",
      }
    : {
        menu: "Account menu",
        close: "Close menu",
        overview: "Account dashboard",
        information: "Business profile",
        security: "Security",
        preferences: "Preferences",
        admin: "Admin",
        logout: "Log out",
        signedIn: "Signed in",
        logoutTitle: "You are signed out",
        logoutDescription: "The account is safely signed out on this device.",
      };

  const navItems = [
    {
      label: labels.overview,
      href: "/account",
      active: pathname === "/account",
      icon: <GridIcon className="h-4 w-4" />,
    },
    {
      label: labels.information,
      href: "/account/information",
      active: pathname === "/account/information",
      icon: <UserIcon className="h-4 w-4" />,
    },
    {
      label: labels.security,
      href: "/account#security-section",
      active: false,
      icon: <ShieldIcon className="h-4 w-4" />,
    },
    {
      label: labels.preferences,
      href: "/account#preferences-section",
      active: false,
      icon: <SettingsIcon className="h-4 w-4" />,
    },
    ...(user?.accountRole === "admin"
      ? [
          {
            label: labels.admin,
            href: "/account/admin",
            active: pathname === "/account/admin",
            icon: <SettingsIcon className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  function handleLogout() {
    logout();
    pushToast({
      tone: "info",
      title: labels.logoutTitle,
      description: labels.logoutDescription,
    });
    router.push("/login");
  }

  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : "SyntraFlow User";

  const navigation = (
    <div className="grid gap-2">
      {navItems.map((item) => (
        <SiteLink
          key={item.label}
          href={item.href}
          className={cn(
            "drawer-nav-item flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition",
            item.active
              ? "bg-[#0f79ff] text-white shadow-[0_16px_30px_rgba(15,121,255,0.18)]"
              : "border border-[#d8e6f4] bg-white/82 text-[#0b1f35] hover:border-[#0f79ff]/18 hover:bg-white",
          )}
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] border border-current/10 bg-white/20">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </SiteLink>
      ))}
      <button
        type="button"
        className="drawer-nav-item flex items-center gap-3 rounded-[1.25rem] border border-[#d8e6f4] bg-white/82 px-4 py-3 text-left text-sm font-semibold text-[#0b1f35] transition hover:border-red-200 hover:bg-red-50"
        onClick={handleLogout}
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] border border-red-100 bg-red-50 text-red-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 17.5 14.5 13 10 8.5" />
            <path d="M14.5 13H3" />
            <path d="M13 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
          </svg>
        </span>
        <span>{labels.logout}</span>
      </button>
    </div>
  );

  return (
    <section className="py-14">
      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="hidden lg:block">
            <div className="panel-surface sticky top-32 rounded-[2rem] p-5">
              <div className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/82 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-[#0f79ff] to-[#13b5ba] text-base font-bold text-white shadow-[0_16px_30px_rgba(15,121,255,0.2)]">
                    {getInitials(user?.firstName, user?.lastName)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0b1f35]">{fullName}</p>
                    <p className="truncate text-xs leading-5 text-muted">{user?.email}</p>
                  </div>
                </div>
                <p className="mt-4 rounded-full border border-[#0f79ff]/12 bg-[#eef6ff] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {labels.signedIn}
                </p>
              </div>
              <nav aria-label={labels.menu} className="mt-4">
                {navigation}
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="panel-surface rounded-[2rem] p-4 lg:hidden">
              <button
                type="button"
                className={buttonVariants("secondary", "w-full justify-between rounded-[1.35rem]")}
                aria-expanded={mobileMenuOpen}
                aria-controls="account-mobile-menu"
                onClick={() => setMobileMenuOpen((current) => !current)}
              >
                <span>{mobileMenuOpen ? labels.close : labels.menu}</span>
                <svg
                  viewBox="0 0 20 20"
                  className={cn("h-4 w-4 transition", mobileMenuOpen && "rotate-180")}
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
                id="account-mobile-menu"
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300",
                  mobileMenuOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">{navigation}</div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
