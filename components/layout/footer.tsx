import { LogoMark } from "@/components/ui/logo-mark";
import { SiteLink } from "@/components/ui/site-link";
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
                    ? "Produse digitale pentru vanzare si conversie"
                    : "Digital products for sales and conversion"}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
              {locale === "ro"
                ? "SyntraFlow vinde produse digitale pentru clienti: Custom AI Assistant ca best seller, Website Builder pentru incredere si Hosting pentru stabilitate dupa lansare."
                : "SyntraFlow sells digital products for clients: Custom AI Assistant as the best seller, Website Builder for trust, and Hosting for post-launch stability."}
            </p>
            <p className="mt-4 text-sm font-medium text-[#0b1f35]">
              {locale === "ro"
                ? siteConfig.thesisTitle
                : "Designed as a commercial product experience focused on selling the AI assistant first, then expanding into website and hosting packages."}
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
                    <SiteLink href={item.href} className="transition hover:text-[#0f79ff]">
                      {item.label}
                    </SiteLink>
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
                    <li>Custom AI Assistant ca best seller</li>
                    <li>Website Builder pentru incredere</li>
                    <li>Hosting lunar pentru stabilitate</li>
                    <li>Demo, oferta si cos pentru vanzare</li>
                  </>
                ) : (
                  <>
                    <li>Custom AI Assistant as best seller</li>
                    <li>Website Builder for trust</li>
                    <li>Monthly hosting for stability</li>
                    <li>Demo, quote, and cart for sales</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#0d3358]/8 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {locale === "ro"
              ? `${year} ${siteConfig.name}. Produse digitale vandute cu focus pe Custom AI Assistant.`
              : `${year} ${siteConfig.name}. Digital products sold with focus on Custom AI Assistant.`}
          </p>
          <p>{locale === "ro" ? "Contact vanzari" : "Sales contact"}: help@syntraflow.com</p>
        </div>
      </div>
    </footer>
  );
}
