import type { Locale } from "@/lib/i18n";

export type MenuLinkItem = {
  label: string;
  href: string;
  description?: string;
};

export type MenuGroup = {
  title: string;
  links: MenuLinkItem[];
};

type BaseMenuItem = {
  id: string;
  label: string;
  href: string;
  homeSectionId?: string;
};

export type LinkMenuItem = BaseMenuItem & {
  type: "link";
};

export type DropdownMenuItem = BaseMenuItem & {
  type: "dropdown";
  description: string;
  links: MenuLinkItem[];
};

export type MegaMenuItem = BaseMenuItem & {
  type: "mega";
  description: string;
  groups: MenuGroup[];
  featured: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  };
};

export type NavbarMenuItem = LinkMenuItem | DropdownMenuItem | MegaMenuItem;

const navbarMenuRo: NavbarMenuItem[] = [
  {
    id: "acasa",
    label: "Acasa",
    href: "/",
    homeSectionId: "home-top",
    type: "link",
  },
  {
    id: "despre-proiect",
    label: "Despre Proiect",
    href: "/despre-proiect",
    type: "dropdown",
    description: "O privire rapida asupra viziunii, capabilitatilor si impactului operational.",
    links: [
      {
        label: "Viziune",
        href: "/despre-proiect",
        description: "Cum pozitioneaza SyntraFlow experienta digitala cu clientii.",
      },
      {
        label: "Functionalitati",
        href: "/solutii",
        description: "Modulele esentiale care sustin interactiunile automate.",
      },
      {
        label: "Beneficii",
        href: "/studii-de-caz",
        description: "Rezultate concrete in scenarii de business si suport.",
      },
    ],
  },
  {
    id: "solutii",
    label: "Solutii",
    href: "/solutii",
    homeSectionId: "home-solutions",
    type: "mega",
    description: "Solutii modulare pentru asistenta, captare de date si automatizare operationala.",
    groups: [
      {
        title: "Conversational AI",
        links: [
          {
            label: "Asistent virtual AI",
            href: "/asistent-virtual",
            description: "Raspunsuri, calificare si directionare intr-un singur flux.",
          },
          {
            label: "FAQ inteligent",
            href: "/asistent-virtual",
            description: "Intrebari frecvente cu raspunsuri rapide si context clar.",
          },
        ],
      },
      {
        title: "Lead & Contact",
        links: [
          {
            label: "Lead capture",
            href: "/solutii",
            description: "Colectare structurata a datelor relevante pentru vanzari.",
          },
          {
            label: "Formulare inteligente",
            href: "/contact",
            description: "Fluxuri adaptate intentiei utilizatorului si pasului urmator.",
          },
        ],
      },
      {
        title: "Integrari",
        links: [
          {
            label: "Integrare CRM",
            href: "/arhitectura",
            description: "Datele pot fi rutate spre CRM si sisteme interne.",
          },
          {
            label: "Automatizare email",
            href: "/automatizari",
            description: "Follow-up si notificari automate pentru echipe si clienti.",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Pachet complet",
      title: "Conversatie, formulare si rutare intr-o singura experienta",
      description:
        "Combinatia dintre UI clar, logica de validare si AI asistat reduce timpul de raspuns si creste calitatea datelor.",
      href: "/solutii",
      ctaLabel: "Vezi toate solutiile",
    },
  },
  {
    id: "industrii",
    label: "Industrii",
    href: "/industrii",
    homeSectionId: "home-industries",
    type: "mega",
    description: "Exemple de adaptare pentru domenii cu procese repetitive si volume mari de solicitari.",
    groups: [
      {
        title: "Operational",
        links: [
          {
            label: "Manufacturing",
            href: "/industrii",
            description: "Cereri tehnice, status comenzi si suport post-vanzare.",
          },
          {
            label: "Maritime",
            href: "/industrii",
            description: "Coordonare de solicitari si fluxuri critice cu mai multi actori.",
          },
        ],
      },
      {
        title: "Customer-facing",
        links: [
          {
            label: "Retail",
            href: "/industrii",
            description: "FAQ, retururi, disponibilitate si programari rapide.",
          },
          {
            label: "Healthcare",
            href: "/industrii",
            description: "Programari, intrebari standard si orientare initiala.",
          },
        ],
      },
      {
        title: "Knowledge-driven",
        links: [
          {
            label: "Education",
            href: "/industrii",
            description: "Ghidare pentru inscrieri, cursuri si suport informational.",
          },
          {
            label: "Consulting",
            href: "/studii-de-caz",
            description: "Lead qualification si triere pentru cereri cu context complex.",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Scenarii adaptabile",
      title: "Acelasi nucleu logic, personalizat pe industrie",
      description:
        "Continutul, intrebarile si regulile de triere pot fi calibrate pentru servicii, suport sau vanzari.",
      href: "/industrii",
      ctaLabel: "Exploreaza industriile",
    },
  },
  {
    id: "asistent-virtual",
    label: "Asistent Virtual",
    href: "/asistent-virtual",
    homeSectionId: "home-assistant",
    type: "dropdown",
    description: "Un punct unic pentru conversatie, FAQ, intent detection si pregatirea pasului urmator.",
    links: [
      {
        label: "Demo conversational",
        href: "/asistent-virtual",
        description: "Experienta interactiva pentru intrebari si calificare initiala.",
      },
      {
        label: "Flux FAQ",
        href: "/asistent-virtual",
        description: "Raspunsuri coerente pentru intrebarile repetitive.",
      },
      {
        label: "Programare demo",
        href: "/contact",
        description: "Conecteaza conversatia cu un CTA clar si masurabil.",
      },
    ],
  },
  {
    id: "automatizari",
    label: "Automatizari",
    href: "/automatizari",
    homeSectionId: "home-automations",
    type: "mega",
    description: "Fluxuri operationale pentru validare, notificare si rutare automata a cererilor.",
    groups: [
      {
        title: "Lead workflows",
        links: [
          {
            label: "Workflow onboarding",
            href: "/automatizari",
            description: "Preluare ghidata a utilizatorului in primul contact.",
          },
          {
            label: "Validare lead-uri",
            href: "/automatizari",
            description: "Date curate inainte de a ajunge in echipele comerciale.",
          },
        ],
      },
      {
        title: "Routing & Alerts",
        links: [
          {
            label: "Notificari automate",
            href: "/automatizari",
            description: "E-mailuri si alerte declansate in functie de context.",
          },
          {
            label: "Routing cereri",
            href: "/automatizari",
            description: "Distribuire catre vanzari, suport sau consultanta.",
          },
        ],
      },
      {
        title: "Retention",
        links: [
          {
            label: "Follow-up email",
            href: "/automatizari",
            description: "Continuarea relatiei dupa prima conversatie.",
          },
          {
            label: "Escaladare controlata",
            href: "/arhitectura",
            description: "Exceptiile ajung la echipa potrivita cu context complet.",
          },
        ],
      },
    ],
    featured: {
      eyebrow: "Procese mai rapide",
      title: "Automatizare fara frictiune pentru cereri repetitive",
      description:
        "Fiecare interactiune poate declansa un traseu predictibil: validare, decizie, notificare si follow-up.",
      href: "/automatizari",
      ctaLabel: "Vezi fluxurile",
    },
  },
  {
    id: "studii-de-caz",
    label: "Studii de Caz",
    href: "/studii-de-caz",
    homeSectionId: "home-cases",
    type: "dropdown",
    description: "Exemple de implementare si rezultate pentru scenarii frecvente de business.",
    links: [
      {
        label: "Implementare website AI",
        href: "/studii-de-caz",
        description: "Website cu raspuns instant si triere automata a intentiei.",
      },
      {
        label: "Automatizare formulare",
        href: "/studii-de-caz",
        description: "Cereri mai clare, cu mai putine interventii manuale.",
      },
      {
        label: "Conversie lead-uri",
        href: "/studii-de-caz",
        description: "Mai mult context util pentru vanzari si follow-up.",
      },
    ],
  },
  {
    id: "arhitectura",
    label: "Arhitectura",
    href: "/arhitectura",
    homeSectionId: "home-architecture",
    type: "dropdown",
    description: "Modul in care platforma sustine viteza, claritatea si continuitatea interactiunilor cu clientii.",
    links: [
      {
        label: "Experienta utilizatorului",
        href: "/arhitectura",
        description: "Un parcurs clar, rapid si usor de urmat pentru fiecare vizitator.",
      },
      {
        label: "Gestionarea solicitarilor",
        href: "/arhitectura",
        description: "Cereri organizate, validate si directionate eficient.",
      },
      {
        label: "Asistent si informatii",
        href: "/arhitectura",
        description: "Raspunsuri coerente, clare si orientate spre rezultat.",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    homeSectionId: "home-final-cta",
    type: "link",
  },
];

const menuTranslations: Record<string, string> = {
  "Acasa": "Home",
  "Despre Proiect": "About",
  "O privire rapida asupra viziunii, capabilitatilor si impactului operational.": "A quick look at the platform vision, capabilities, and operational impact.",
  "Viziune": "Vision",
  "Cum pozitioneaza SyntraFlow experienta digitala cu clientii.": "How SyntraFlow improves the digital customer experience.",
  "Functionalitati": "Features",
  "Modulele esentiale care sustin interactiunile automate.": "Core modules that support automated interactions.",
  "Beneficii": "Benefits",
  "Rezultate concrete in scenarii de business si suport.": "Clear outcomes in support and business scenarios.",
  "Solutii": "Solutions",
  "Solutii modulare pentru asistenta, captare de date si automatizare operationala.": "Modular solutions for assistance, data capture, and operational automation.",
  "Asistent virtual AI": "AI Assistant",
  "Raspunsuri, calificare si directionare intr-un singur flux.": "Answers, qualification, and routing in one guided flow.",
  "FAQ inteligent": "Smart FAQ",
  "Intrebari frecvente cu raspunsuri rapide si context clar.": "Frequently asked questions with fast, clear answers.",
  "Colectare structurata a datelor relevante pentru vanzari.": "Structured collection of sales-relevant data.",
  "Formulare inteligente": "Smart Forms",
  "Fluxuri adaptate intentiei utilizatorului si pasului urmator.": "Flows adapted to user intent and the next step.",
  "Integrari": "Integrations",
  "Integrare CRM": "CRM Integration",
  "Datele pot fi rutate spre CRM si sisteme interne.": "Important data can be routed to CRM and internal systems.",
  "Automatizare email": "Email Automation",
  "Follow-up si notificari automate pentru echipe si clienti.": "Automated follow-up and notifications for teams and clients.",
  "Pachet complet": "Complete package",
  "Conversatie, formulare si rutare intr-o singura experienta": "Conversation, forms, and routing in one seamless experience",
  "Combinatia dintre UI clar, logica de validare si AI asistat reduce timpul de raspuns si creste calitatea datelor.": "A clear interface, guided validation, and assisted AI reduce response time and improve data quality.",
  "Vezi toate solutiile": "See all solutions",
  "Industrii": "Industries",
  "Exemple de adaptare pentru domenii cu procese repetitive si volume mari de solicitari.": "Examples of how the platform adapts to industries with repetitive processes and high request volumes.",
  "Cereri tehnice, status comenzi si suport post-vanzare.": "Requests, order status, and post-sale support in one structured flow.",
  "Coordonare de solicitari si fluxuri critice cu mai multi actori.": "Coordination for critical requests and flows involving multiple stakeholders.",
  "FAQ, retururi, disponibilitate si programari rapide.": "FAQ, returns, availability, and quick scheduling.",
  "Programari, intrebari standard si orientare initiala.": "Bookings, common questions, and first-step guidance.",
  "Ghidare pentru inscrieri, cursuri si suport informational.": "Guidance for enrollment, courses, and informational support.",
  "Lead qualification si triere pentru cereri cu context complex.": "Lead qualification and triage for requests with more context.",
  "Scenarii adaptabile": "Adaptable scenarios",
  "Acelasi nucleu logic, personalizat pe industrie": "The same logic, tailored by industry",
  "Continutul, intrebarile si regulile de triere pot fi calibrate pentru servicii, suport sau vanzari.": "Content, questions, and routing rules can be adapted for services, support, or sales.",
  "Exploreaza industriile": "Explore industries",
  "Asistent Virtual": "Assistant",
  "Un punct unic pentru conversatie, FAQ, intent detection si pregatirea pasului urmator.": "A single space for conversation, FAQ, intent detection, and the next best step.",
  "Demo conversational": "Conversation Demo",
  "Experienta interactiva pentru intrebari si calificare initiala.": "An interactive experience for questions and early qualification.",
  "Flux FAQ": "FAQ Flow",
  "Raspunsuri coerente pentru intrebarile repetitive.": "Consistent answers for repetitive questions.",
  "Programare demo": "Book Demo",
  "Conecteaza conversatia cu un CTA clar si masurabil.": "Connect the conversation to a clear, measurable CTA.",
  "Automatizari": "Automations",
  "Fluxuri operationale pentru validare, notificare si rutare automata a cererilor.": "Operational flows for validation, notification, and automatic request routing.",
  "Preluare ghidata a utilizatorului in primul contact.": "Guided capture from the very first contact.",
  "Validare lead-uri": "Lead Validation",
  "Date curate inainte de a ajunge in echipele comerciale.": "Cleaner data before it reaches sales teams.",
  "Notificari automate": "Automated Notifications",
  "E-mailuri si alerte declansate in functie de context.": "Emails and alerts triggered by the request context.",
  "Routing cereri": "Request Routing",
  "Distribuire catre vanzari, suport sau consultanta.": "Route requests to sales, support, or consulting.",
  "Follow-up email": "Email Follow-up",
  "Continuarea relatiei dupa prima conversatie.": "Continue the relationship after the first conversation.",
  "Escaladare controlata": "Controlled Escalation",
  "Exceptiile ajung la echipa potrivita cu context complet.": "Exceptions reach the right team with the right context.",
  "Procese mai rapide": "Faster processes",
  "Automatizare fara frictiune pentru cereri repetitive": "Frictionless automation for repetitive requests",
  "Fiecare interactiune poate declansa un traseu predictibil: validare, decizie, notificare si follow-up.": "Every interaction can trigger a predictable path: validation, decision, notification, and follow-up.",
  "Vezi fluxurile": "See workflows",
  "Arhitectura": "Architecture",
  "Modul in care platforma sustine viteza, claritatea si continuitatea interactiunilor cu clientii.": "How the platform supports speed, clarity, and continuity in customer interactions.",
  "Experienta utilizatorului": "User Experience",
  "Un parcurs clar, rapid si usor de urmat pentru fiecare vizitator.": "A clear, fast, and easy flow for every visitor.",
  "Gestionarea solicitarilor": "Request Handling",
  "Cereri organizate, validate si directionate eficient.": "Requests are organized, validated, and routed efficiently.",
  "Asistent si informatii": "Assistant & Information",
  "Raspunsuri coerente, clare si orientate spre rezultat.": "Clear, consistent answers focused on outcomes.",
  "Studii de Caz": "Case Studies",
  "Exemple de implementare si rezultate pentru scenarii frecvente de business.": "Implementation examples and outcomes for common business scenarios.",
  "Implementare website AI": "AI Website Rollout",
  "Website cu raspuns instant si triere automata a intentiei.": "A website with instant replies and automatic intent routing.",
  "Automatizare formulare": "Form Automation",
  "Cereri mai clare, cu mai putine interventii manuale.": "Clearer requests with fewer manual interventions.",
  "Conversie lead-uri": "Lead Conversion",
  "Mai mult context util pentru vanzari si follow-up.": "More useful context for sales and follow-up.",
  "Contact": "Contact",
};

function translateText(text: string | undefined, locale: Locale) {
  if (!text || locale === "ro") {
    return text;
  }

  return menuTranslations[text] ?? text;
}

function translateLink(link: MenuLinkItem, locale: Locale): MenuLinkItem {
  return {
    ...link,
    label: translateText(link.label, locale) ?? link.label,
    description: translateText(link.description, locale),
  };
}

function translateMenuItem(item: NavbarMenuItem, locale: Locale): NavbarMenuItem {
  if (item.type === "link") {
    return {
      ...item,
      label: translateText(item.label, locale) ?? item.label,
    };
  }

  if (item.type === "dropdown") {
    return {
      ...item,
      label: translateText(item.label, locale) ?? item.label,
      description: translateText(item.description, locale) ?? item.description,
      links: item.links.map((link) => translateLink(link, locale)),
    };
  }

  return {
    ...item,
    label: translateText(item.label, locale) ?? item.label,
    description: translateText(item.description, locale) ?? item.description,
    groups: item.groups.map((group) => ({
      ...group,
      title: translateText(group.title, locale) ?? group.title,
      links: group.links.map((link) => translateLink(link, locale)),
    })),
    featured: {
      ...item.featured,
      eyebrow: translateText(item.featured.eyebrow, locale) ?? item.featured.eyebrow,
      title: translateText(item.featured.title, locale) ?? item.featured.title,
      description: translateText(item.featured.description, locale) ?? item.featured.description,
      ctaLabel: translateText(item.featured.ctaLabel, locale) ?? item.featured.ctaLabel,
    },
  };
}

export function getNavbarMenu(locale: Locale): NavbarMenuItem[] {
  if (locale === "ro") {
    return navbarMenuRo;
  }

  return navbarMenuRo.map((item) => translateMenuItem(item, locale));
}
