import type { Locale } from "@/lib/i18n";

export type ProductId = "ai" | "website-builder" | "hosting" | "maintenance-support";

export type ProductCatalogItem = {
  id: ProductId;
  code: string;
  tag: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isAvailable?: boolean;
  priceNote: string;
  kicker: string;
  description: string;
  bullets: string[];
};

export const defaultProductPrices: Record<ProductId, number> = {
  ai: 1000,
  "website-builder": 500,
  hosting: 50,
  "maintenance-support": 199,
};

export function getProductCatalog(locale: Locale): ProductCatalogItem[] {
  const isRomanian = locale === "ro";

  return isRomanian
    ? [
        {
          id: "ai",
          code: "SYF:001",
          tag: "Best seller",
          title: "Custom AI Assistant",
          price: defaultProductPrices.ai,
          priceNote: "setup initial pentru produsul AI principal",
          kicker: "Best seller-ul SyntraFlow: asistentul care raspunde instant, califica lead-uri si vinde claritatea pentru client.",
          description:
            "Vinzi clientului un punct de contact premium: raspunsuri clare, ton profesionist si un traseu rapid spre demo, oferta sau suport.",
          bullets: [
            "Produs principal, usor de demonstrat si vandut catre businessuri",
            "Capteaza cereri si intrebari intr-un flux pregatit pentru vanzare",
            "Reduce raspunsurile repetitive si face echipa clientului sa para mai rapida",
          ],
        },
        {
          id: "website-builder",
          code: "SYF:002",
          tag: "Produs 02",
          title: "Website Builder",
          price: defaultProductPrices["website-builder"],
          priceNote: "pret orientativ pentru website de prezentare",
          kicker: "Produs complementar pentru clientii care au nevoie de o prezenta digitala clara inainte de a cumpara AI.",
          description:
            "Vinzi o baza vizuala moderna: pagini curate, mesaj comercial mai clar si o imagine care arata ca un business serios.",
          bullets: [
            "Perfect pentru clienti care vor sa arate credibil inainte de demo",
            "Arata premium pe desktop si mobil fara sa incarce utilizatorul",
            "Completeaza pachetul AI cu o pagina pregatita pentru conversie",
          ],
        },
        {
          id: "hosting",
          code: "SYF:003",
          tag: "Produs 03",
          title: "Website Hosting",
          price: defaultProductPrices.hosting,
          priceNote: "pret lunar pentru hostingul website-ului",
          kicker: "Produs recurent care tine website-ul clientului live, rapid si usor de administrat dupa lansare.",
          description:
            "Vinzi stabilitate lunara: baza tehnica de care clientul are nevoie ca proiectul sa stea online fara batai de cap.",
          bullets: [
            "Ideal ca add-on lunar pentru website-uri si landing pages",
            "Pastreaza experienta fluida pentru utilizatori si echipa ta",
            "Completeaza pachetul dintre website, AI si suport dupa lansare",
          ],
        },
        {
          id: "maintenance-support",
          code: "SYF:004",
          tag: "Abonament lunar",
          title: "Mentenanta & Suport",
          price: defaultProductPrices["maintenance-support"],
          priceNote: "primele 3 luni gratuite, apoi 199 EUR/luna",
          kicker: "Abonamentul lunar pentru mentenanta si suport, creat ca produs recurent dupa lansare.",
          description:
            "Vinzi clientului liniste dupa implementare: verificari, suport, mici ajustari si mentenanta continua dupa perioada gratuita.",
          bullets: [
            "Primele 3 luni sunt gratuite pentru clientii care pornesc pachetul",
            "Dupa perioada gratuita abonamentul continua cu 199 EUR/luna",
            "Include suport si mentenanta ca produs recurent separat",
          ],
        },
      ]
    : [
        {
          id: "ai",
          code: "SYF:001",
          tag: "Best seller",
          title: "Custom AI Assistant",
          price: defaultProductPrices.ai,
          priceNote: "initial setup for the main AI product",
          kicker: "SyntraFlow's best seller: the assistant that replies instantly, qualifies leads, and sells clarity for the client.",
          description:
            "You sell the client a polished contact layer: clear answers, professional tone, and a faster path to demo, quote, or support.",
          bullets: [
            "Main product, easy to demonstrate and sell to businesses",
            "Captures requests and questions in a sales-ready flow",
            "Reduces repetitive replies and makes the client's team feel faster",
          ],
        },
        {
          id: "website-builder",
          code: "SYF:002",
          tag: "Product 02",
          title: "Website Builder",
          price: defaultProductPrices["website-builder"],
          priceNote: "guide price for a presentation website",
          kicker: "A complementary product for clients who need a clear digital presence before buying AI.",
          description:
            "You sell a modern visual base: clean pages, clearer commercial messaging, and a brand that feels serious.",
          bullets: [
            "Great for clients who need credibility before the demo",
            "Feels premium on both desktop and mobile without being overcomplicated",
            "Completes the AI package with a conversion-ready page",
          ],
        },
        {
          id: "hosting",
          code: "SYF:003",
          tag: "Product 03",
          title: "Website Hosting",
          price: defaultProductPrices.hosting,
          priceNote: "monthly price for website hosting",
          kicker: "A recurring product that keeps the client's website live, fast, and easy to manage after launch.",
          description:
            "You sell monthly stability: the technical base the client needs to keep the project online without friction.",
          bullets: [
            "Ideal as a monthly add-on for websites and landing pages",
            "Keeps the user experience smooth for both visitors and your team",
            "Completes the package between website, AI, and post-launch support",
          ],
        },
        {
          id: "maintenance-support",
          code: "SYF:004",
          tag: "Monthly subscription",
          title: "Maintenance & Support",
          price: defaultProductPrices["maintenance-support"],
          priceNote: "first 3 months free, then 199 EUR/month",
          kicker: "The monthly maintenance and support subscription, built as a recurring product after launch.",
          description:
            "You sell peace of mind after implementation: checks, support, small adjustments, and continued maintenance after the free period.",
          bullets: [
            "The first 3 months are free for clients starting the package",
            "After the free period, the subscription continues at 199 EUR/month",
            "Includes support and maintenance as a separate recurring product",
          ],
        },
      ];
}

export function getProductCatalogMap(locale: Locale) {
  return Object.fromEntries(
    getProductCatalog(locale).map((item) => [item.id, item]),
  ) as Record<ProductCatalogItem["id"], ProductCatalogItem>;
}

export function formatEuroPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
