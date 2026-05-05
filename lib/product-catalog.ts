import type { Locale } from "@/lib/i18n";

export type ProductCatalogItem = {
  id: "hosting" | "ai" | "ai-automation-intern" | "website-builder";
  tag: string;
  title: string;
  price: number;
  priceDisplay?: string;
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
          id: "hosting",
          tag: "Produs 01",
          title: "Hosting",
          price: 150,
          priceDisplay: "150 lei / luna",
          priceNote: "abonament lunar pentru mentenanta si disponibilitate",
          kicker: "Hosting stabil pentru website-uri SyntraFlow, cu baza tehnica pregatita pentru lansare si mentenanta.",
          description:
            "Pastrezi website-ul online, rapid si usor de administrat dupa lansare, fara sa separi partea tehnica de ecosistemul digital.",
          bullets: [
            "Potrivit pentru website-uri de prezentare, landing pages si proiecte digitale mici",
            "Include baza operationala pentru disponibilitate si continuitate dupa lansare",
            "Completeaza pachetele de website si automatizare intr-un mod clar",
          ],
        },
        {
          id: "ai",
          tag: "Produs 02",
          title: "Custom AI Assistant pentru clienti",
          price: 2000,
          priceDisplay: "2.000 RON",
          priceNote: "setup pentru asistent AI orientat catre clienti",
          kicker: "Asistentul care raspunde instant, califica lead-uri si sustine un contact initial profesionist.",
          description:
            "Construiesti un punct de contact premium pentru clienti: raspunsuri clare, ton profesionist si traseu rapid spre demo, oferta sau suport.",
          bullets: [
            "Capteaza cereri si intrebari intr-un flux care pare deja pregatit pentru vanzare",
            "Reduce timpul pierdut cu raspunsuri repetitive si triere manuala",
            "Ofera un layer modern de automatizare, potrivit pentru prezentari si lansare",
          ],
        },
        {
          id: "ai-automation-intern",
          tag: "Produs 03",
          title: "Custom AI Automation Intern",
          price: 5000,
          priceDisplay: "5.000 RON",
          priceNote: "automatizare AI pentru procese interne",
          kicker: "Un intern digital care preia fluxuri repetitive, structureaza informatii si pregateste actiuni interne.",
          description:
            "Automatizarea interna conecteaza cereri, documente, notificari si pasi operationali intr-un flux mai clar pentru echipa.",
          bullets: [
            "Reduce blocajele din procese repetitive si cereri interne recurente",
            "Poate pregati rezumate, rutare, validari si notificari pentru echipe",
            "Este potrivit pentru organizatii care vor un AI layer operational, nu doar conversational",
          ],
        },
        {
          id: "website-builder",
          tag: "Produs 04",
          title: "Website Builder",
          price: 1500,
          priceDisplay: "1.500 RON",
          priceNote: "website de prezentare construit pentru lansare",
          kicker: "Website de prezentare construit sa inspire incredere, sa explice clar si sa transforme interesul in cereri reale.",
          description:
            "Ai o baza vizuala moderna pentru produsul tau: pagini curate, mesaj comercial mai clar si o imagine care arata ca un business serios.",
          bullets: [
            "Perfect pentru portofoliu, servicii, produs sau prezentare de licenta",
            "Arata premium pe desktop si mobil fara sa incarce utilizatorul",
            "Iti ofera un site simplu de aratat, promovat si extins ulterior",
          ],
        },
      ]
    : [
        {
          id: "hosting",
          tag: "Product 01",
          title: "Hosting",
          price: 150,
          priceDisplay: "150 RON / month",
          priceNote: "monthly plan for maintenance and availability",
          kicker: "Stable hosting for SyntraFlow websites, with a technical base prepared for launch and maintenance.",
          description:
            "Keep the website online, fast, and easy to manage after launch without separating the technical layer from the digital ecosystem.",
          bullets: [
            "Fits presentation websites, landing pages, and smaller digital projects",
            "Includes the operational base for availability and post-launch continuity",
            "Completes website and automation packages in a clean way",
          ],
        },
        {
          id: "ai",
          tag: "Product 02",
          title: "Custom AI Assistant pentru clienti",
          price: 2000,
          priceDisplay: "2,000 RON",
          priceNote: "setup for a customer-facing AI assistant",
          kicker: "An assistant that replies instantly, qualifies leads, and supports a professional first contact.",
          description:
            "You get a polished contact layer for your business: clear answers, better lead capture, and a smoother path to demo, quote, or support.",
          bullets: [
            "Turns repetitive customer conversations into a cleaner sales flow",
            "Helps visitors get answers fast without losing the commercial tone",
            "Adds a modern automation layer you can confidently present and launch",
          ],
        },
        {
          id: "ai-automation-intern",
          tag: "Product 03",
          title: "Custom AI Automation Intern",
          price: 5000,
          priceDisplay: "5,000 RON",
          priceNote: "AI automation for internal processes",
          kicker: "A digital intern that handles repetitive flows, structures information, and prepares internal actions.",
          description:
            "The internal automation layer connects requests, documents, notifications, and operational steps into a clearer workflow for the team.",
          bullets: [
            "Reduces bottlenecks in repetitive processes and recurring internal requests",
            "Can prepare summaries, routing, validations, and notifications for teams",
            "Fits organizations that need an operational AI layer, not only a chat layer",
          ],
        },
        {
          id: "website-builder",
          tag: "Product 04",
          title: "Website Builder",
          price: 1500,
          priceDisplay: "1,500 RON",
          priceNote: "presentation website built for launch",
          kicker: "A presentation website built to create trust fast, explain the offer clearly, and convert interest into action.",
          description:
            "This is the visual layer that makes your product look ready for clients, demos, partnerships, and campaigns from day one.",
          bullets: [
            "Great for a product site, service showcase, or polished portfolio",
            "Feels premium on both desktop and mobile without being overcomplicated",
            "Gives you a site that is easy to show, promote, and expand later",
          ],
        },
      ];
}

export function getProductCatalogMap(locale: Locale) {
  return Object.fromEntries(
    getProductCatalog(locale).map((item) => [item.id, item]),
  ) as Record<ProductCatalogItem["id"], ProductCatalogItem>;
}

export function formatRonPrice(value: number, locale: Locale) {
  const formatted = new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);

  return `${formatted} RON`;
}
