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
    description: "Sari direct la modulele care transforma interesul in lead-uri.",
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
    description: "Deschide demo-ul conversational care arata lead capture in actiune.",
    href: "/#home-assistant",
    keywords: ["chat", "asistent", "demo", "faq"],
  },
  {
    id: "section-home-architecture",
    title: "Acasa - Arhitectura preview",
    description: "Navigheaza la preview-ul sistemului care sustine conversia.",
    href: "/#home-architecture",
    keywords: ["arhitectura", "api", "knowledge base", "security"],
  },
  {
    id: "page-about",
    title: "Despre proiect",
    description: "Povestea sistemului comercial din spatele SyntraFlow.",
    href: "/despre-proiect",
    keywords: ["despre", "licenta", "context", "obiective"],
  },
  {
    id: "page-solutions",
    title: "Solutii",
    description: "Module pentru conversatie, lead capture, demo si follow-up.",
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
    description: "Catalog pentru AI, Website Builder si Hosting orientat spre conversie.",
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
    id: "page-architecture",
    title: "Arhitectura",
    description: "Arhitectura care conecteaza website-ul, AI-ul si automatizarile.",
    href: "/arhitectura",
    keywords: ["arhitectura", "api", "ui", "security", "layers"],
  },
  {
    id: "page-cases",
    title: "Studii de caz",
    description: "Scenarii concrete care arata raspuns rapid si conversie mai buna.",
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
    description: "Cos pentru AI Agent Builder, valoarea pachetului si servicii optionale.",
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
  "Sari direct la modulele care transforma interesul in lead-uri.": "Jump directly to the modules that turn interest into leads.",
  "Acasa - Industrii": "Home - Industries",
  "Vezi industriile unde raspunsul rapid poate creste conversia.": "See the industries where fast replies can improve conversion.",
  "Acasa - Asistent demo": "Home - Assistant Demo",
  "Deschide demo-ul conversational care arata lead capture in actiune.": "Open the conversational demo that shows lead capture in action.",
  "Acasa - Arhitectura preview": "Home - How It Works Preview",
  "Navigheaza la preview-ul sistemului care sustine conversia.": "Go to the system preview that supports conversion.",
  "Despre proiect": "About",
  "Povestea sistemului comercial din spatele SyntraFlow.": "The story of the commercial system behind SyntraFlow.",
  "Solutii": "Solutions",
  "Module pentru conversatie, lead capture, demo si follow-up.": "Modules for conversation, lead capture, demo, and follow-up.",
  "Industrii": "Industries",
  "Industrii unde SyntraFlow poate accelera raspunsul si vanzarea.": "Industries where SyntraFlow can accelerate replies and sales.",
  "Asistent virtual": "Virtual Assistant",
  "Asistent AI pentru raspuns instant si lead-uri mai bune.": "AI assistant for instant replies and better leads.",
  "Product": "Product",
  "Catalog pentru AI, Website Builder si Hosting orientat spre conversie.": "Catalog for AI, Website Builder, and Hosting focused on conversion.",
  "Automatizari": "Automations",
  "Fluxuri automate pentru oferta, demo, suport si follow-up.": "Automated flows for quote, demo, support, and follow-up.",
  "Arhitectura": "How It Works",
  "Arhitectura care conecteaza website-ul, AI-ul si automatizarile.": "Architecture that connects the website, AI, and automations.",
  "Studii de caz": "Case Studies",
  "Scenarii concrete care arata raspuns rapid si conversie mai buna.": "Concrete scenarios showing faster replies and better conversion.",
  "Contact": "Contact",
  "Contact rapid pentru demo, oferta si recomandarea potrivita.": "Fast contact for demo, quote, and the right recommendation.",
  "Cosul meu": "My Cart",
  "Cos pentru AI Agent Builder, valoarea pachetului si servicii optionale.": "Cart for AI Agent Builder, package value, and optional services.",
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
