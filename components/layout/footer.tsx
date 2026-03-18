import Link from "next/link";

import { LogoMark } from "@/components/ui/logo-mark";
import type { Locale } from "@/lib/i18n";
import { getNavbarMenu } from "@/lib/menu-data";
import { siteConfig } from "@/lib/site-config";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  const navigation = getNavbarMenu(locale);

  return (
    <footer className="mt-24 border-t border-[#0d3358]/8 bg-white/70 py-12">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center">
                <LogoMark className="h-12 w-12" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-[#0b1f35]">{siteConfig.name}</p>
                <p className="text-sm text-muted">
                  {locale === "ro"
                    ? "Platforma web inteligenta pentru automatizarea interactiunii cu clientii"
                    : "Smart web platform for automating customer interactions"}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
              {locale === "ro"
                ? "Platforma web inteligenta cu asistent virtual AI pentru automatizarea si optimizarea proceselor de interactiune cu clientii."
                : "A smart web platform with an AI virtual assistant built to automate and optimize customer interaction processes."}
            </p>
            <p className="mt-4 text-sm font-medium text-[#0b1f35]">
              {locale === "ro"
                ? siteConfig.thesisTitle
                : "Designed as a premium digital experience for faster responses, clearer requests, and scalable service workflows."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "Navigatie" : "Navigation"}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="transition hover:text-[#0f79ff]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {locale === "ro" ? "Context" : "What you get"}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {locale === "ro" ? (
                  <>
                    <li>Experienta premium pentru prezentare si demo</li>
                    <li>Interactiuni mai rapide si mai clare</li>
                    <li>Fundatie pentru extindere SaaS</li>
                    <li>Automatizare si AI aplicat in servicii reale</li>
                  </>
                ) : (
                  <>
                    <li>Premium experience for demos and presentations</li>
                    <li>Faster, clearer customer interactions</li>
                    <li>A strong base for SaaS expansion</li>
                    <li>Applied automation and AI for real services</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#0d3358]/8 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {locale === "ro"
              ? `${year} ${siteConfig.name}. Concept original pentru prezentare moderna si extensie de produs.`
              : `${year} ${siteConfig.name}. Original concept for modern presentation and product expansion.`}
          </p>
          <p>{locale === "ro" ? "Contact demo" : "Demo contact"}: contact@syntraflow.local</p>
        </div>
      </div>
    </footer>
  );
}
