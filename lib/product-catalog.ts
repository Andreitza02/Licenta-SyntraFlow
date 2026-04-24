import type { Locale } from "@/lib/i18n";

export type ProductCatalogItem = {
  id: "ai" | "website-builder" | "hosting";
  tag: string;
  title: string;
  price: number;
  priceNote: string;
  kicker: string;
  description: string;
  bullets: string[];
};

export function getProductCatalog(locale: Locale): ProductCatalogItem[] {
  const isRomanian = locale === "ro";

  return isRomanian
    ? [
        {
          id: "ai",
          tag: "Produs 01",
          title: "Custom AI Assistant",
          price: 1000,
          priceNote: "setup initial pentru un asistent personalizat",
          kicker: "Asistentul care raspunde instant, califica lead-uri si lasa impresia unui business bine organizat.",
          description:
            "Construiesti un punct de contact premium pentru clienti: raspunsuri clare, ton profesionist si un traseu rapid spre demo, oferta sau suport.",
          bullets: [
            "Capteaza cereri si intrebari intr-un flux care pare deja pregatit pentru vanzare",
            "Reduce timpul pierdut cu raspunsuri repetitive si triere manuala",
            "Ofera un layer modern de automatizare, potrivit pentru prezentari si lansare",
          ],
        },
        {
          id: "website-builder",
          tag: "Produs 02",
          title: "Website Builder",
          price: 500,
          priceNote: "pret orientativ pentru website de prezentare",
          kicker: "Website de prezentare construit sa inspire incredere, sa explice clar si sa transforme interesul in cereri reale.",
          description:
            "Ai o baza vizuala moderna pentru produsul tau: pagini curate, mesaj comercial mai clar si o imagine care arata ca un business serios.",
          bullets: [
            "Perfect pentru portofoliu, servicii, produs sau prezentare de licenta",
            "Arata premium pe desktop si mobil fara sa incarce utilizatorul",
            "Iti ofera un site simplu de aratat, promovat si extins ulterior",
          ],
        },
        {
          id: "hosting",
          tag: "Produs 03",
          title: "Website Hosting",
          price: 50,
          priceNote: "pret lunar pentru hostingul website-ului",
          kicker: "Hostingul care iti tine website-ul live, rapid si usor de administrat dupa lansare.",
          description:
            "Este baza tehnica simpla de care ai nevoie ca proiectul sa stea online fara batai de cap si fara senzatia de improvizatie.",
          bullets: [
            "Ideal pentru website-uri de prezentare, landing pages si proiecte digitale mici",
            "Pastreaza experienta fluida pentru utilizatori si echipa ta",
            "Completeaza elegant pachetul dintre website si automatizare",
          ],
        },
      ]
    : [
        {
          id: "ai",
          tag: "Product 01",
          title: "Custom AI Assistant",
          price: 1000,
          priceNote: "initial setup for a tailored assistant",
          kicker: "An assistant that replies instantly, qualifies leads, and gives your brand a more premium front line.",
          description:
            "You get a polished contact layer for your business: clear answers, better lead capture, and a smoother path to demo, quote, or support.",
          bullets: [
            "Turns repetitive customer conversations into a cleaner sales flow",
            "Helps visitors get answers fast without losing the commercial tone",
            "Adds a modern automation layer you can confidently present and launch",
          ],
        },
        {
          id: "website-builder",
          tag: "Product 02",
          title: "Website Builder",
          price: 500,
          priceNote: "guide price for a presentation website",
          kicker: "A presentation website built to create trust fast, explain the offer clearly, and convert interest into action.",
          description:
            "This is the visual layer that makes your product look ready for clients, demos, partnerships, and campaigns from day one.",
          bullets: [
            "Great for a product site, service showcase, or polished portfolio",
            "Feels premium on both desktop and mobile without being overcomplicated",
            "Gives you a site that is easy to show, promote, and expand later",
          ],
        },
        {
          id: "hosting",
          tag: "Product 03",
          title: "Website Hosting",
          price: 50,
          priceNote: "monthly price for website hosting",
          kicker: "Hosting that keeps your website live, fast, and easy to manage after launch.",
          description:
            "It is the simple technical base that keeps the project online without unnecessary friction or the feeling of a fragile setup.",
          bullets: [
            "Ideal for presentation websites, landing pages, and smaller digital products",
            "Keeps the user experience smooth for both visitors and your team",
            "Completes the website and automation package in a clean way",
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
