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
    description: "Pagina principala a platformei SyntraFlow.",
    href: "/",
    keywords: ["home", "acasa", "hero", "platforma"],
  },
  {
    id: "section-home-solutions",
    title: "Acasa - Solutii",
    description: "Sari direct la sectiunea cu capabilitati si module de pe homepage.",
    href: "/#home-solutions",
    keywords: ["solutii", "module", "lead", "faq", "automation"],
  },
  {
    id: "section-home-industries",
    title: "Acasa - Industrii",
    description: "Vezi domeniile de utilizare direct din homepage.",
    href: "/#home-industries",
    keywords: ["industrii", "medical", "horeca", "retail", "b2b"],
  },
  {
    id: "section-home-assistant",
    title: "Acasa - Asistent demo",
    description: "Deschide rapid demo-ul conversational din homepage.",
    href: "/#home-assistant",
    keywords: ["chat", "asistent", "demo", "faq"],
  },
  {
    id: "section-home-architecture",
    title: "Acasa - Arhitectura preview",
    description: "Navigheaza direct la preview-ul tehnic din homepage.",
    href: "/#home-architecture",
    keywords: ["arhitectura", "api", "knowledge base", "security"],
  },
  {
    id: "page-about",
    title: "Despre proiect",
    description: "Contextul academic si obiectivele proiectului.",
    href: "/despre-proiect",
    keywords: ["despre", "licenta", "context", "obiective"],
  },
  {
    id: "page-solutions",
    title: "Solutii",
    description: "Toate modulele functionale si beneficiile lor.",
    href: "/solutii",
    keywords: ["solutii", "lead", "crm", "faq", "programari"],
  },
  {
    id: "page-industries",
    title: "Industrii",
    description: "Exemple de industrii si scenarii de utilizare.",
    href: "/industrii",
    keywords: ["industrii", "b2b", "retail", "clinici", "horeca"],
  },
  {
    id: "page-assistant",
    title: "Asistent virtual",
    description: "Demo chat, quick replies si scenarii conversationale.",
    href: "/asistent-virtual",
    keywords: ["asistent", "chat", "faq", "prompts", "demo"],
  },
  {
    id: "page-product",
    title: "Product",
    description: "Catalogul SyntraFlow pentru AI, Website Builder si Hosting, prezentat in stil comercial.",
    href: "/product",
    keywords: ["product", "produs", "catalog", "ai", "website builder", "hosting"],
  },
  {
    id: "page-automations",
    title: "Automatizari",
    description: "Stepper interactiv pentru fluxurile de suport, oferta si demo.",
    href: "/automatizari",
    keywords: ["automatizari", "stepper", "payload", "crm", "follow-up"],
  },
  {
    id: "page-architecture",
    title: "Arhitectura",
    description: "Layer cards, tooltips si detalii tehnice.",
    href: "/arhitectura",
    keywords: ["arhitectura", "api", "ui", "security", "layers"],
  },
  {
    id: "page-cases",
    title: "Studii de caz",
    description: "Scenarii concrete pentru restaurante, clinici si companii B2B.",
    href: "/studii-de-caz",
    keywords: ["caz", "scenarii", "restaurant", "clinica", "b2b"],
  },
  {
    id: "page-contact",
    title: "Contact",
    description: "Formular multi-step pentru demo sau solicitari.",
    href: "/contact",
    keywords: ["contact", "demo", "formular", "solicitare"],
  },
  {
    id: "page-cart",
    title: "Cosul meu",
    description: "Pagina de cos pentru AI Agent Builder, cu sumarul comenzii si servicii optionale.",
    href: "/cart",
    keywords: ["cos", "cart", "agent builder", "shopping", "comanda"],
  },
  {
    id: "page-account",
    title: "Cont",
    description: "Pagina de cont pentru profil, companie si preferinte personalizabile.",
    href: "/account",
    keywords: ["cont", "account", "profil", "settings", "workspace"],
  },
];

const commandTranslations: Record<string, string> = {
  "Acasa": "Home",
  "Pagina principala a platformei SyntraFlow.": "The main SyntraFlow platform page.",
  "Acasa - Solutii": "Home - Solutions",
  "Sari direct la sectiunea cu capabilitati si module de pe homepage.": "Jump directly to the capabilities and modules section on the homepage.",
  "Acasa - Industrii": "Home - Industries",
  "Vezi domeniile de utilizare direct din homepage.": "See the industry use cases directly from the homepage.",
  "Acasa - Asistent demo": "Home - Assistant Demo",
  "Deschide rapid demo-ul conversational din homepage.": "Open the conversational demo from the homepage.",
  "Acasa - Arhitectura preview": "Home - How It Works Preview",
  "Navigheaza direct la preview-ul tehnic din homepage.": "Go directly to the solution overview on the homepage.",
  "Despre proiect": "About",
  "Contextul academic si obiectivele proiectului.": "The project background and key objectives.",
  "Solutii": "Solutions",
  "Toate modulele functionale si beneficiile lor.": "All platform modules and their business benefits.",
  "Industrii": "Industries",
  "Exemple de industrii si scenarii de utilizare.": "Industry examples and usage scenarios.",
  "Asistent virtual": "Virtual Assistant",
  "Demo chat, quick replies si scenarii conversationale.": "Demo chat, quick replies, and guided conversation flows.",
  "Product": "Product",
  "Pagina produsului SyntraFlow cu overview, module si trasee de demo.": "The SyntraFlow product page with overview, modules, and demo journeys.",
  "Automatizari": "Automations",
  "Stepper interactiv pentru fluxurile de suport, oferta si demo.": "Interactive flow for support, offer, and demo journeys.",
  "Arhitectura": "How It Works",
  "Layer cards, tooltips si detalii tehnice.": "The main solution blocks and how they support customer flows.",
  "Studii de caz": "Case Studies",
  "Scenarii concrete pentru restaurante, clinici si companii B2B.": "Concrete scenarios for restaurants, clinics, and B2B companies.",
  "Contact": "Contact",
  "Formular multi-step pentru demo sau solicitari.": "Multi-step form for demos or requests.",
  "Cosul meu": "My Cart",
  "Pagina de cos pentru AI Agent Builder, cu sumarul comenzii si servicii optionale.": "Cart page for AI Agent Builder, with order summary and optional services.",
  "Cont": "Account",
  "Pagina de cont pentru profil, companie si preferinte personalizabile.": "Account page for profile, company details, and customizable preferences.",
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
