import type { Locale } from "@/lib/i18n";

export type CommandItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

const commandIndexRo: CommandItem[] = [
  {
    id: "page-home",
    title: "Acasa",
    description: "Start rapid catre ecosistemul SyntraFlow pentru AI, website si conversie.",
    href: "/",
    keywords: ["home", "acasa", "hero", "platforma"],
  },
  {
    id: "section-home-solutions",
    title: "Acasa - Solutii",
    description: "Sari direct la produsele si modulele care sustin vanzarea.",
    href: "/#home-solutions",
    keywords: ["solutii", "module", "lead", "faq", "automation"],
  },
  {
    id: "section-home-industries",
    title: "Acasa - Industrii",
    description: "Vezi industriile unde raspunsul rapid poate creste conversia.",
    href: "/#home-industries",
    keywords: ["industrii", "medical", "horeca", "retail", "b2b"],
  },
  {
    id: "section-home-assistant",
    title: "Acasa - Asistent demo",
    description: "Deschide zona care prezinta Custom AI Assistant ca best seller.",
    href: "/#home-assistant",
    keywords: ["chat", "asistent", "demo", "faq"],
  },
  {
    id: "page-about",
    title: "Despre SyntraFlow",
    description: "Activitatea, proiectele, echipa si evolutia SyntraFlow din 2023 pana azi.",
    href: "/despre-proiect",
    keywords: ["despre", "syntraflow", "echipa", "sediu", "proiecte"],
  },
  {
    id: "page-solutions",
    title: "Solutii",
    description: "Module vandute in jurul best seller-ului Custom AI Assistant.",
    href: "/solutii",
    keywords: ["solutii", "lead", "crm", "faq", "programari"],
  },
  {
    id: "page-industries",
    title: "Industrii",
    description: "Industrii unde SyntraFlow poate accelera raspunsul si vanzarea.",
    href: "/industrii",
    keywords: ["industrii", "b2b", "retail", "clinici", "horeca"],
  },
  {
    id: "page-assistant",
    title: "Asistent virtual",
    description: "Asistent AI pentru raspuns instant si lead-uri mai bune.",
    href: "/asistent-virtual",
    keywords: ["asistent", "chat", "faq", "prompts", "demo"],
  },
  {
    id: "page-product",
    title: "Product",
    description: "Catalog pentru Custom AI Assistant, Website Builder si Hosting.",
    href: "/product",
    keywords: ["product", "produs", "catalog", "ai", "website builder", "hosting"],
  },
  {
    id: "page-automations",
    title: "Automatizari",
    description: "Fluxuri automate pentru oferta, demo, suport si follow-up.",
    href: "/automatizari",
    keywords: ["automatizari", "stepper", "payload", "crm", "follow-up"],
  },
  {
    id: "page-cases",
    title: "Studii de caz",
    description: "Scenarii care arata unde se poate vinde Custom AI Assistant.",
    href: "/studii-de-caz",
    keywords: ["caz", "scenarii", "restaurant", "clinica", "b2b"],
  },
  {
    id: "page-contact",
    title: "Contact",
    description: "Contact rapid pentru demo, oferta si recomandarea potrivita.",
    href: "/contact",
    keywords: ["contact", "demo", "formular", "solicitare"],
  },
  {
    id: "page-cart",
    title: "Cosul meu",
    description: "Cos pentru Custom AI Assistant, website, hosting si valoarea pachetului.",
    href: "/cart",
    keywords: ["cos", "cart", "agent builder", "shopping", "comanda"],
  },
  {
    id: "page-account",
    title: "Cont",
    description: "Cont pentru profil, companie si preferinte care personalizeaza experienta.",
    href: "/account",
    keywords: ["cont", "account", "profil", "settings", "workspace"],
  },
];

const commandTranslations: Record<string, string> = {
  "Acasa": "Home",
  "Start rapid catre ecosistemul SyntraFlow pentru AI, website si conversie.": "Fast start to the SyntraFlow ecosystem for AI, website, and conversion.",
  "Acasa - Solutii": "Home - Solutions",
  "Sari direct la produsele si modulele care sustin vanzarea.": "Jump directly to the products and modules that support sales.",
  "Acasa - Industrii": "Home - Industries",
  "Vezi industriile unde raspunsul rapid poate creste conversia.": "See the industries where fast replies can improve conversion.",
  "Acasa - Asistent demo": "Home - Assistant Demo",
  "Deschide zona care prezinta Custom AI Assistant ca best seller.": "Open the area that presents Custom AI Assistant as the best seller.",
  "Despre SyntraFlow": "About SyntraFlow",
  "Activitatea, proiectele, echipa si evolutia SyntraFlow din 2023 pana azi.": "SyntraFlow activity, projects, team, and evolution from 2023 to today.",
  "Solutii": "Solutions",
  "Module vandute in jurul best seller-ului Custom AI Assistant.": "Modules sold around the Custom AI Assistant best seller.",
  "Industrii": "Industries",
  "Industrii unde SyntraFlow poate accelera raspunsul si vanzarea.": "Industries where SyntraFlow can accelerate replies and sales.",
  "Asistent virtual": "Virtual Assistant",
  "Asistent AI pentru raspuns instant si lead-uri mai bune.": "AI assistant for instant replies and better leads.",
  "Product": "Product",
  "Catalog pentru Custom AI Assistant, Website Builder si Hosting.": "Catalog for Custom AI Assistant, Website Builder, and Hosting.",
  "Automatizari": "Automations",
  "Fluxuri automate pentru oferta, demo, suport si follow-up.": "Automated flows for quote, demo, support, and follow-up.",
  "Studii de caz": "Case Studies",
  "Scenarii care arata unde se poate vinde Custom AI Assistant.": "Scenarios showing where Custom AI Assistant can be sold.",
  "Contact": "Contact",
  "Contact rapid pentru demo, oferta si recomandarea potrivita.": "Fast contact for demo, quote, and the right recommendation.",
  "Cosul meu": "My Cart",
  "Cos pentru Custom AI Assistant, website, hosting si valoarea pachetului.": "Cart for Custom AI Assistant, website, hosting, and package value.",
  "Cont": "Account",
  "Cont pentru profil, companie si preferinte care personalizeaza experienta.": "Account for profile, company details, and preferences that personalize the experience.",
};

export function getCommandIndex(locale: Locale): CommandItem[] {
  if (locale === "ro") {
    return commandIndexRo;
  }

  return commandIndexRo.map((item) => ({
    ...item,
    title: commandTranslations[item.title] ?? item.title,
    description: commandTranslations[item.description] ?? item.description,
    keywords: [...item.keywords, item.title.toLowerCase(), item.description.toLowerCase()],
  }));
}
