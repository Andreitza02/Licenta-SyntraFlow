"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { CTAButton } from "@/components/ui/cta-button";
import type { Locale } from "@/lib/i18n";
import type { CaseStudyItem, FaqItem, IndustryItem } from "@/lib/site-data";
import { getSiteData } from "@/lib/site-data";
import { technologyItems, type TechnologyIconName } from "@/lib/technology-items";
import { cn } from "@/lib/utils";

type HomePageProps = {
  locale: Locale;
};

type IconName =
  | "arrow"
  | "bot"
  | "check"
  | "clock"
  | "database"
  | "file"
  | "grid"
  | "layers"
  | "mail"
  | "message"
  | "phone"
  | "route"
  | "shield"
  | "spark"
  | "target"
  | "users"
  | "workflow"
  | "zap";

const copy = {
  ro: {
    eyebrow: "AI, website si automatizari pentru crestere",
    heroTitle: "Transforma fiecare vizita intr-un lead mai bun cu SyntraFlow.",
    heroText:
      "SyntraFlow combina website premium, asistent AI si automatizari care capteaza cereri, califica intentia si muta clientul mai repede spre demo, oferta sau vanzare.",
    primaryCta: "Vreau un demo",
    secondaryCta: "Vezi solutiile",
    proofLabel: "Tehnologii",
    proofTitle: "Stack-ul care livreaza viteza",
    proofText:
      "AI, date, voce si automatizari conectate intr-un flux care reduce raspunsurile lente si creste conversia.",
    whatEyebrow: "Ce castigi",
    whatTitle: "Mai multe lead-uri calificate, mai putina munca manuala.",
    whatText:
      "SyntraFlow transforma prezenta digitala intr-un sistem comercial: atrage, raspunde, filtreaza si directioneaza fiecare solicitare catre urmatorul pas.",
    casesEyebrow: "Studii de caz",
    casesTitle: "Rezultate concrete pentru businessuri care vor viteza.",
    casesText:
      "De la clinici si servicii pana la e-commerce, fiecare scenariu arata cum poti converti intrebari repetitive in interactiuni utile.",
    viewCases: "Vezi studiile",
    caseDetails: "Vezi detalii",
    processEyebrow: "Traseu de conversie",
    processTitle: "De la primul click la cerere calificata.",
    processText:
      "Fiecare sectiune sustine o decizie comerciala: prezinti oferta, dovedesti valoarea si duci vizitatorul spre actiune.",
    agentsEyebrow: "Asistent AI",
    agentsTitle: "Un asistent AI care vinde claritatea pentru tine.",
    agentsText:
      "Asistentul raspunde instant, califica nevoia si trimite oamenii catre produsul, demo-ul sau oferta potrivita.",
    activeLabel: "Activ comercial",
    exploreModule: "Exploreaza solutiile",
    industriesEyebrow: "Industrii",
    industriesTitle: "Fluxuri digitale pentru industrii care nu isi permit raspunsuri lente.",
    industriesText:
      "Fiecare industrie primeste un mesaj adaptat, o triere mai rapida si un parcurs comercial mai usor de convertit.",
    channelsEyebrow: "Canale",
    channelsTitle: "Canale care aduc conversatia mai aproape de vanzare.",
    channelsText:
      "Chat, email, voce si CRM lucreaza impreuna pentru raspunsuri mai rapide, follow-up curat si oportunitati mai bine captate.",
    faqEyebrow: "FAQ",
    faqTitle: "Raspunsuri care transforma curiozitatea in incredere.",
  },
  en: {
    eyebrow: "AI, websites, and automations for growth",
    heroTitle: "Turn every visit into a better lead with SyntraFlow.",
    heroText:
      "SyntraFlow combines a premium website, an AI assistant, and automations that capture requests, qualify intent, and move buyers faster toward a demo, quote, or sale.",
    primaryCta: "Book a demo",
    secondaryCta: "View solutions",
    proofLabel: "Technologies",
    proofTitle: "The stack built for speed",
    proofText:
      "AI, data, voice, and automations connected into one flow that reduces slow replies and improves conversion.",
    whatEyebrow: "What you gain",
    whatTitle: "More qualified leads, less manual work.",
    whatText:
      "SyntraFlow turns your digital presence into a commercial system: attract, answer, filter, and route every request to the next step.",
    casesEyebrow: "Case studies",
    casesTitle: "Concrete outcomes for businesses that want speed.",
    casesText:
      "From clinics and services to e-commerce, each scenario shows how repetitive questions become useful interactions.",
    viewCases: "View studies",
    caseDetails: "View details",
    processEyebrow: "Conversion path",
    processTitle: "From first click to qualified request.",
    processText:
      "Every section supports a commercial decision: present the offer, prove value, and move visitors toward action.",
    agentsEyebrow: "AI assistant",
    agentsTitle: "An AI assistant that sells clarity for you.",
    agentsText:
      "The assistant replies instantly, qualifies the need, and sends people toward the right product, demo, or offer.",
    activeLabel: "Commercially active",
    exploreModule: "Explore solutions",
    industriesEyebrow: "Industries",
    industriesTitle: "Digital flows for industries that cannot afford slow replies.",
    industriesText:
      "Each industry gets tailored messaging, faster triage, and a commercial journey that is easier to convert.",
    channelsEyebrow: "Channels",
    channelsTitle: "Channels that move the conversation closer to revenue.",
    channelsText:
      "Chat, email, voice, and CRM work together for faster replies, cleaner follow-up, and better captured opportunities.",
    faqEyebrow: "FAQ",
    faqTitle: "Answers that turn curiosity into confidence.",
  },
} satisfies Record<Locale, Record<string, string>>;

const accents = [
  "border-[#0f79ff]/18 bg-[#f1f7ff] text-[#0b58d0]",
  "border-[#13b5ba]/20 bg-[#eefcfc] text-[#08777c]",
  "border-[#10b981]/20 bg-[#effcf6] text-[#047857]",
  "border-[#f59e0b]/22 bg-[#fff8e7] text-[#a16207]",
  "border-[#7c3aed]/16 bg-[#f6f1ff] text-[#6d28d9]",
  "border-[#e11d48]/16 bg-[#fff1f3] text-[#be123c]",
];

const accentBars = [
  "from-[#0f79ff] to-[#13b5ba]",
  "from-[#13b5ba] to-[#10b981]",
  "from-[#10b981] to-[#f59e0b]",
  "from-[#f59e0b] to-[#e11d48]",
  "from-[#7c3aed] to-[#0f79ff]",
  "from-[#e11d48] to-[#f59e0b]",
];

const heroMetrics = {
  ro: [
    { value: "24/7", label: "raspuns initial" },
    { value: "3 pasi", label: "demo, oferta, suport" },
    { value: "AI + CRM", label: "context pentru vanzari" },
  ],
  en: [
    { value: "24/7", label: "first response" },
    { value: "3 steps", label: "demo, quote, support" },
    { value: "AI + CRM", label: "sales-ready context" },
  ],
} satisfies Record<Locale, Array<{ value: string; label: string }>>;

const whatWeDoItems = {
  ro: [
    {
      title: "Vizitatorul ajunge mai repede la actiune",
      text: "Butoanele si sectiunile imping fiecare intentie spre demo, produs, studiu de caz sau contact, fara ezitare.",
      icon: "target",
    },
    {
      title: "Tehnologie transformata in avantaj comercial",
      text: "Stack-ul este pozitionat prin beneficii directe: viteza, incredere, automatizare si livrare mai buna.",
      icon: "database",
    },
    {
      title: "Raspunsurile umplu golurile din pagina",
      text: "Intrebarile obisnuite primesc raspuns instant, astfel incat vizitatorul ramane in fluxul de conversie.",
      icon: "message",
    },
    {
      title: "Follow-up mai curat pentru echipa",
      text: "Datele utile sunt directionate spre contact, oferta sau demo cu mai putine clarificari manuale.",
      icon: "route",
    },
  ],
  en: [
    {
      title: "Visitors reach action faster",
      text: "Buttons and sections push every intent toward a demo, product, case study, or contact point without hesitation.",
      icon: "target",
    },
    {
      title: "Technology turned into a commercial advantage",
      text: "The stack is positioned through direct benefits: speed, trust, automation, and better delivery.",
      icon: "database",
    },
    {
      title: "Replies fill the gaps on the page",
      text: "Common questions get an instant answer, so the visitor stays inside the conversion flow.",
      icon: "message",
    },
    {
      title: "Cleaner follow-up for the team",
      text: "Useful details are routed toward contact, quote, or demo with fewer manual clarifications.",
      icon: "route",
    },
  ],
} satisfies Record<Locale, Array<{ title: string; text: string; icon: IconName }>>;

const processItems = {
  ro: [
    {
      title: "Captezi atentia",
      text: "Prima impresie vinde promisiunea: un sistem digital care raspunde rapid si transforma interesul in oportunitate.",
      icon: "users",
    },
    {
      title: "Arati valoarea",
      text: "Produsele, tehnologiile si industriile sunt prezentate prin rezultate, nu prin descrieri sterile.",
      icon: "file",
    },
    {
      title: "Raspunzi instant",
      text: "Asistentul AI elimina asteptarea si pastreaza conversatia vie exact cand interesul este cel mai ridicat.",
      icon: "workflow",
    },
    {
      title: "Transformi intentia in lead",
      text: "Cand vizitatorul este pregatit, fluxul il duce direct catre demo, oferta sau discutia potrivita.",
      icon: "spark",
    },
  ],
  en: [
    {
      title: "Capture attention",
      text: "The first impression sells the promise: a digital system that replies fast and turns interest into opportunity.",
      icon: "users",
    },
    {
      title: "Show the value",
      text: "Products, technologies, and industries are positioned through outcomes, not sterile descriptions.",
      icon: "file",
    },
    {
      title: "Reply instantly",
      text: "The AI assistant removes waiting and keeps the conversation alive when intent is at its highest.",
      icon: "workflow",
    },
    {
      title: "Turn intent into a lead",
      text: "When visitors are ready, the flow sends them directly toward a demo, quote, or the right conversation.",
      icon: "spark",
    },
  ],
} satisfies Record<Locale, Array<{ title: string; text: string; icon: IconName }>>;

const agentCapabilities = {
  ro: [
    {
      id: "conversations",
      label: "Raspuns instant",
      title: "Transforma intrebarile in conversatii care duc spre vanzare.",
      text: "Asistentul mentine interesul activ, raspunde rapid si elimina frictiunea dintre curiozitate si actiune.",
      points: ["Raspunsuri rapide", "Obiectii reduse", "Actiune recomandata"],
      icon: "bot",
    },
    {
      id: "actions",
      label: "Routing comercial",
      title: "Duce fiecare intentie spre oferta potrivita.",
      text: "In loc sa lase oamenii sa caute, asistentul trimite fiecare conversatie spre produs, studiu de caz sau contact.",
      points: ["Produse potrivite", "Studii relevante", "Contact rapid"],
      icon: "zap",
    },
    {
      id: "triggers",
      label: "Lead capture",
      title: "Pregateste cereri mai bune pentru echipa de vanzari.",
      text: "Cand intentia este clara, fluxul colecteaza datele esentiale si face urmatoarea discutie mai eficienta.",
      points: ["Date de contact", "Nevoie concreta", "Context de vanzare"],
      icon: "workflow",
    },
    {
      id: "documentation",
      label: "Mesaj coerent",
      title: "Pastreaza promisiunea comerciala consistenta in fiecare interactiune.",
      text: "Brandul vorbeste la fel de clar in pagina, chat si follow-up, ceea ce creste increderea inainte de demo.",
      points: ["Mesaj premium", "FAQ orientat spre vanzare", "Follow-up mai bun"],
      icon: "file",
    },
  ],
  en: [
    {
      id: "conversations",
      label: "Instant reply",
      title: "Turns questions into conversations that move toward sales.",
      text: "The assistant keeps interest active, replies fast, and removes friction between curiosity and action.",
      points: ["Fast replies", "Fewer objections", "Recommended action"],
      icon: "bot",
    },
    {
      id: "actions",
      label: "Commercial routing",
      title: "Moves every intent toward the right offer.",
      text: "Instead of making people search, the assistant sends each conversation toward a product, case study, or contact point.",
      points: ["Right products", "Relevant studies", "Fast contact"],
      icon: "zap",
    },
    {
      id: "triggers",
      label: "Lead capture",
      title: "Prepares better requests for the sales team.",
      text: "When intent is clear, the flow collects the essential details and makes the next conversation more efficient.",
      points: ["Contact details", "Concrete need", "Sales context"],
      icon: "workflow",
    },
    {
      id: "documentation",
      label: "Consistent message",
      title: "Keeps the commercial promise consistent in every interaction.",
      text: "The brand speaks clearly across the page, chat, and follow-up, building trust before the demo.",
      points: ["Premium message", "Sales-focused FAQ", "Better follow-up"],
      icon: "file",
    },
  ],
} satisfies Record<
  Locale,
  Array<{ id: string; label: string; title: string; text: string; points: string[]; icon: IconName }>
>;

const channelItems = {
  ro: [
    {
      title: "Website chat",
      text: "Conversatia incepe exact in momentul de interes si poate transforma intrebarile in lead-uri calificate.",
      href: "/asistent-virtual",
      icon: "message",
    },
    {
      title: "Email si mesaje",
      text: "Follow-up-ul ramane organizat, rapid si pregatit pentru urmatorul pas comercial.",
      href: "/automatizari",
      icon: "mail",
    },
    {
      title: "Voice",
      text: "Vocea adauga incredere pentru prospectii care vor raspunsuri directe si o experienta mai personala.",
      href: "/contact",
      icon: "phone",
    },
    {
      title: "CRM si email",
      text: "Datele comerciale ajung intr-un flux curat, usor de urmarit si pregatit pentru vanzare.",
      href: "/automatizari",
      icon: "database",
    },
  ],
  en: [
    {
      title: "Website chat",
      text: "The conversation starts at the exact moment of interest and can turn questions into qualified leads.",
      href: "/asistent-virtual",
      icon: "message",
    },
    {
      title: "Email and messages",
      text: "Follow-up stays organized, fast, and ready for the next commercial step.",
      href: "/automatizari",
      icon: "mail",
    },
    {
      title: "Voice",
      text: "Voice adds trust for prospects who want direct answers and a more personal experience.",
      href: "/contact",
      icon: "phone",
    },
    {
      title: "CRM and email",
      text: "Commercial data lands in a clean flow that is easy to track and ready for sales.",
      href: "/automatizari",
      icon: "database",
    },
  ],
} satisfies Record<Locale, Array<{ title: string; text: string; href: string; icon: IconName }>>;

function TechnologyIcon({ name }: { name: TechnologyIconName }) {
  const common = {
    className: "h-11 w-11",
    viewBox: "0 0 64 64",
    "aria-hidden": true,
  };

  switch (name) {
    case "openai":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path
            fill="#080b0f"
            d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.5-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07ZM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.58a4.5 4.5 0 0 1-4.49 4.5ZM3.6 18.3a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.85-3.37v2.33a.08.08 0 0 1-.04.06l-4.83 2.8A4.5 4.5 0 0 1 3.6 18.3ZM2.34 7.9a4.49 4.49 0 0 1 2.37-1.98v5.68a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9Zm16.6 3.85-5.84-3.39L15.12 7.2a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.67a.79.79 0 0 0-.4-.67Zm2.01-3.02-.14-.09-4.78-2.78a.78.78 0 0 0-.78 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.68ZM8.31 12.86 6.29 11.7a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.79 2.76a.79.79 0 0 0-.39.68v6.72Zm1.1-2.36L12 8.99l2.61 1.51v3.01L12 15l-2.59-1.5v-3Z"
          />
        </svg>
      );
    case "claude":
      return (
        <svg {...common}>
          <g fill="none" stroke="#df7a57" strokeLinecap="round" strokeWidth="5.2">
            <path d="M32 7.5v18" />
            <path d="M32 38.5v18" />
            <path d="M7.5 32h18" />
            <path d="M38.5 32h18" />
            <path d="m14.7 14.7 12.7 12.7" />
            <path d="m36.6 36.6 12.7 12.7" />
            <path d="m49.3 14.7-12.7 12.7" />
            <path d="m27.4 36.6-12.7 12.7" />
            <path d="m23.1 8.9 5 15.4" />
            <path d="m35.9 39.7 5 15.4" />
            <path d="m55.1 23.1-15.4 5" />
            <path d="m24.3 35.9-15.4 5" />
            <path d="m40.9 8.9-5 15.4" />
            <path d="m28.1 39.7-5 15.4" />
            <path d="m55.1 40.9-15.4-5" />
            <path d="m24.3 28.1-15.4-5" />
          </g>
        </svg>
      );
    case "supabase":
      return (
        <svg {...common}>
          <path
            fill="#6ee57f"
            d="M36.8 5.6c1.9.7 3.1 2.5 3.1 4.5v17.1h12.6c4 0 6.2 4.7 3.7 7.8L29.8 58.2c-3 3.7-8.9 1.6-8.9-3.2V38.5H11.6c-4 0-6.2-4.7-3.7-7.8L31.6 7.1a4.8 4.8 0 0 1 5.2-1.5Z"
          />
        </svg>
      );
    case "elevenlabs":
      return (
        <svg {...common}>
          <rect width="13.8" height="42" x="16.8" y="11" fill="#101820" rx="4" />
          <rect width="13.8" height="42" x="35" y="11" fill="#5b6770" rx="4" />
        </svg>
      );
    case "vercel":
      return (
        <svg {...common}>
          <path fill="#080b0f" d="M32 10.5 58 53.5H6z" />
        </svg>
      );
    case "n8n":
      return (
        <svg {...common}>
          <g fill="#ff6f3d">
            <circle cx="12" cy="32" r="6.5" />
            <circle cx="24" cy="32" r="6.5" />
            <circle cx="32" cy="20" r="6.5" />
            <circle cx="40" cy="32" r="6.5" />
            <circle cx="32" cy="44" r="6.5" />
            <circle cx="52" cy="32" r="6.5" />
          </g>
          <g fill="#fff">
            <circle cx="12" cy="32" r="2" />
            <circle cx="24" cy="32" r="2" />
            <circle cx="32" cy="20" r="2" />
            <circle cx="40" cy="32" r="2" />
            <circle cx="32" cy="44" r="2" />
            <circle cx="52" cy="32" r="2" />
          </g>
        </svg>
      );
    case "voiceflow":
      return (
        <svg {...common}>
          <g fill="none" stroke="#27323a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.4">
            <path d="M17 22c5.6 0 8.4 20 14 20s8.4-20 14-20" />
            <path d="M17 42c5.6 0 8.4-20 14-20s8.4 20 14 20" />
            <path d="M9 32h46" />
          </g>
        </svg>
      );
    case "manychat":
      return (
        <svg {...common}>
          <path
            fill="#080b0f"
            d="M14 18.5h30a10 10 0 0 1 10 10v5.8a10 10 0 0 1-10 10H30.9L18.7 52a1.8 1.8 0 0 1-2.7-1.5v-6.2h-2a10 10 0 0 1-10-10v-5.8a10 10 0 0 1 10-10Z"
          />
          <g fill="#fff">
            <circle cx="22" cy="31.5" r="3" />
            <circle cx="31.8" cy="31.5" r="3" />
            <circle cx="41.6" cy="31.5" r="3" />
          </g>
        </svg>
      );
    case "make":
      return (
        <svg {...common}>
          <g fill="#b026ff" stroke="#080b0f" strokeWidth="1.2">
            <path d="M9.8 46.4 22 18.2a3 3 0 0 1 4.1-1.5l8.4 4-13 30.1-10.2-4.4a2.5 2.5 0 0 1-1.5-3.3Z" />
            <path d="M26.1 49.8 38 18.5a3 3 0 0 1 3.7-1.8l8.9 2.8-11.9 31.3-10.8 1.1a2.3 2.3 0 0 1-1.8-2.1Z" />
            <path d="M44.6 51.5V19a3 3 0 0 1 3-3h7.8a3 3 0 0 1 3 3v29.5a3 3 0 0 1-3 3H44.6Z" />
          </g>
        </svg>
      );
  }
}

function Icon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <path d="M12 8V4" />
          <rect x="5" y="8" width="14" height="10" rx="4" />
          <path d="M8 13h.01" />
          <path d="M16 13h.01" />
          <path d="M9 18v2" />
          <path d="M15 18v2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7.5V12l3.2 2" />
        </svg>
      );
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M7 3.5h6l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
          <path d="M13 3.5V8h4" />
          <path d="M9 13h6" />
          <path d="M9 16h4" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="2" />
          <rect x="14" y="4" width="6" height="6" rx="2" />
          <rect x="4" y="14" width="6" height="6" rx="2" />
          <rect x="14" y="14" width="6" height="6" rx="2" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 17 8 4 8-4" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="16" height="12" rx="3" />
          <path d="m5 8 7 5 7-5" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M5 17.5V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9l-4 3.5Z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M8.4 4.5 10.2 8a1.5 1.5 0 0 1-.35 1.75l-1.1 1.1a11 11 0 0 0 4.4 4.4l1.1-1.1A1.5 1.5 0 0 1 16 13.8l3.5 1.8a1.5 1.5 0 0 1 .8 1.65l-.5 2.25a2 2 0 0 1-2.2 1.55C9.4 20.15 3.85 14.6 2.95 6.4a2 2 0 0 1 1.55-2.2l2.25-.5a1.5 1.5 0 0 1 1.65.8Z" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <path d="M5 5h4a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h12" />
          <path d="m15 13 4 4-4 4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 2.8 7.6 7 10 4.2-2.4 7-5.5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-5" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3 9.8 9.2 4 12l5.8 2.8L12 21l2.2-6.2L20 12l-5.8-2.8L12 3Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 19a4 4 0 0 0-8 0" />
          <circle cx="12" cy="9" r="3" />
          <path d="M20 18a3 3 0 0 0-3-3" />
          <path d="M4 18a3 3 0 0 1 3-3" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="6" height="6" rx="2" />
          <rect x="14" y="14" width="6" height="6" rx="2" />
          <path d="M10 7h2.5A3.5 3.5 0 0 1 16 10.5V14" />
          <path d="m13.5 12 2.5 2 2.5-2" />
        </svg>
      );
    case "zap":
      return (
        <svg {...common}>
          <path d="M13 2.8 4.8 13h6.4L10.8 21.2 19.2 11h-6.4L13 2.8Z" />
        </svg>
      );
  }
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("reveal-section max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-5 text-3xl font-semibold leading-tight tracking-normal text-[#081b2f] md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-muted md:text-lg">{description}</p> : null}
    </div>
  );
}

function HeroActions({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <CTAButton href="/contact">
        <span>{t.primaryCta}</span>
        <Icon name="arrow" />
      </CTAButton>
      <CTAButton href="#home-process" variant="secondary">
        <Icon name="workflow" />
        <span>{t.secondaryCta}</span>
      </CTAButton>
    </div>
  );
}

function HeroTag({ children, icon }: { children: ReactNode; icon: IconName }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#0d3358]/10 bg-white/74 px-4 py-2 text-sm font-semibold text-[#0d3358] shadow-[0_12px_28px_rgba(11,31,53,0.05)] backdrop-blur-md">
      <Icon name={icon} className="h-4 w-4 text-[#0b58d0]" />
      {children}
    </span>
  );
}

function TechnologyCarousel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="py-8 md:py-10">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2rem] border border-[#0d3358]/10 bg-white/78 py-7 shadow-[0_24px_68px_rgba(11,31,53,0.08)] backdrop-blur-xl md:py-8">
          <div className="px-5 md:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0b58d0]">{t.proofLabel}</p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-normal text-[#0b1f35] md:text-4xl">
                {t.proofTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{t.proofText}</p>
            </div>
          </div>

          <div className="tech-carousel mt-7" aria-label={locale === "ro" ? "Carusel tehnologii" : "Technology carousel"}>
            <div className="tech-carousel-viewport">
              <div className="tech-carousel-track">
                {[...technologyItems, ...technologyItems].map((item, index) => {
                  const isDuplicate = index >= technologyItems.length;
                  const description = item.description[locale];
                  const tooltipId = isDuplicate ? undefined : `home-tech-tooltip-${item.icon}`;

                  return (
                    <article
                      key={`${item.name}-${index}`}
                      aria-describedby={tooltipId}
                      aria-hidden={isDuplicate}
                      aria-label={isDuplicate ? undefined : `${item.name}: ${description}`}
                      tabIndex={isDuplicate ? -1 : 0}
                      className="tech-logo-card group h-[8.75rem] w-[12rem] shrink-0 overflow-visible rounded-2xl border border-[#d7e5f3] bg-white/92 p-5 shadow-[0_16px_34px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:shadow-[0_24px_48px_rgba(11,31,53,0.12)] focus:outline-none focus-visible:-translate-y-1 focus-visible:border-[#0f79ff]/20 focus-visible:shadow-[0_24px_48px_rgba(11,31,53,0.12)]"
                    >
                      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                      <div className="relative z-[1] flex flex-col items-center gap-3 text-center">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#d7e5f3] bg-[#f8fcff] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 group-hover:scale-105">
                          <TechnologyIcon name={item.icon} />
                        </div>
                        <h3 className="tech-logo-name text-base font-semibold tracking-normal text-[#071d33]">{item.name}</h3>
                      </div>
                      <p id={tooltipId} role="tooltip" className="tech-logo-tooltip">
                        {description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeDoSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const items = whatWeDoItems[locale];

  return (
    <section id="home-solutions" className="py-10 md:py-12">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#0d3358]/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(238,249,255,0.78)_45%,rgba(255,248,231,0.72))] p-5 shadow-[0_26px_76px_rgba(11,31,53,0.09)] backdrop-blur-xl md:p-8">
          <div className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#0f79ff,#13b5ba,#10b981,#f59e0b,#e11d48)]" />
          <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
            <div>
              <SectionHeader eyebrow={t.whatEyebrow} title={t.whatTitle} description={t.whatText} />
              <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {heroMetrics[locale].map((metric) => (
                  <div key={metric.value} className="rounded-[1.15rem] border border-[#0d3358]/10 bg-white/76 px-4 py-3 shadow-[0_14px_32px_rgba(11,31,53,0.05)]">
                    <p className="text-lg font-semibold text-[#081b2f]">{metric.value}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item, index) => (
                <article
                  key={item.title}
                  className="reveal-section group relative overflow-hidden rounded-[1.5rem] border border-[#0d3358]/10 bg-white/86 p-5 shadow-[0_18px_42px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:bg-white hover:shadow-[0_26px_60px_rgba(15,121,255,0.12)]"
                >
                  <div className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r", accentBars[index % accentBars.length])} />
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-full border", accents[index % accents.length])}>
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-normal text-[#081b2f]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection({ locale, caseStudies }: { locale: Locale; caseStudies: CaseStudyItem[] }) {
  const t = copy[locale];
  const summaries =
    locale === "ro"
      ? [
          {
            text: "Rezervarile, programul si intrebarile repetitive devin conversatii rapide care pot aduce cereri mai bune.",
            note: "Perfect pentru servicii care pierd timp cu aceleasi intrebari.",
          },
          {
            text: "Programarile si solicitarile sunt directionate mai rapid, cu mai putine blocaje inainte de contact.",
            note: "Ideal pentru organizatii care vor mai multa incredere inainte de primul apel.",
          },
          {
            text: "Cererile comerciale sunt captate cu context mai bun si trimise spre discutii de oferta mai eficiente.",
            note: "Creat pentru echipe care vor lead-uri mai clare, nu mesaje incomplete.",
          },
          {
            text: "Livrarea, retururile si suportul initial devin raspunsuri rapide care reduc frictiunea la cumparare.",
            note: "Bun pentru magazine online care vor clienti mai siguri inainte de checkout.",
          },
        ]
      : [
          {
            text: "Bookings, schedules, and repetitive questions become fast conversations that can bring better requests.",
            note: "Perfect for services that lose time on the same questions.",
          },
          {
            text: "Appointments and requests are routed faster, with fewer blockers before contact.",
            note: "Ideal for organizations that want more trust before the first call.",
          },
          {
            text: "Commercial requests are captured with better context and sent toward more efficient quote discussions.",
            note: "Built for teams that want clearer leads, not incomplete messages.",
          },
          {
            text: "Delivery, returns, and first support become fast replies that reduce purchase friction.",
            note: "Strong for online stores that want more confident customers before checkout.",
          },
        ];

  return (
    <section id="home-cases" className="py-10 md:py-12">
      <div className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow={t.casesEyebrow} title={t.casesTitle} description={t.casesText} />
          <CTAButton href="/studii-de-caz" variant="secondary" className="shrink-0">
            <span>{t.viewCases}</span>
            <Icon name="arrow" />
          </CTAButton>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {caseStudies.slice(0, 4).map((item, index) => (
            <article
              key={item.title}
              className="reveal-section group flex h-full flex-col rounded-[1.45rem] border border-[#0d3358]/10 bg-white/84 p-5 shadow-[0_18px_42px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:bg-white hover:shadow-[0_26px_60px_rgba(15,121,255,0.12)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border", accents[index % accents.length])}>
                  <Icon name={index % 2 === 0 ? "message" : "grid"} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#557089]">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-normal text-[#081b2f]">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{summaries[index]?.text ?? item.solution}</p>
              <p className="mt-5 rounded-[1rem] border border-[#0f79ff]/10 bg-[#f7fbff] p-3 text-xs leading-6 text-[#0d3358]">
                {summaries[index]?.note ?? item.benefit}
              </p>
              <a
                href="/studii-de-caz"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0b58d0] transition group-hover:gap-3"
              >
                {t.caseDetails}
                <Icon name="arrow" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const items = processItems[locale];

  return (
    <section id="home-process" className="py-10 md:py-12">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeader eyebrow={t.processEyebrow} title={t.processTitle} description={t.processText} />
          <div className="grid gap-4">
            {items.map((item, index) => (
              <article
                key={item.title}
                className="reveal-section grid gap-4 rounded-[1.45rem] border border-[#0d3358]/10 bg-white/78 p-5 shadow-[0_16px_38px_rgba(11,31,53,0.06)] md:grid-cols-[auto_1fr]"
              >
                <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border text-sm font-semibold", accents[index % accents.length])}>
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0b58d0]">0{index + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-normal text-[#081b2f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentCapabilitiesSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const items = agentCapabilities[locale];
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    setActiveId(items[0]?.id ?? "");
  }, [items]);

  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <section id="home-assistant" className="py-10 md:py-12">
      <div className="section-shell">
        <span id="home-architecture" className="block scroll-mt-28" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div>
            <SectionHeader eyebrow={t.agentsEyebrow} title={t.agentsTitle} description={t.agentsText} />
            <div className="mt-8 grid gap-3">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[1.2rem] border p-4 text-left transition duration-300",
                    activeId === item.id
                      ? "border-[#0f79ff]/24 bg-white shadow-[0_22px_52px_rgba(15,121,255,0.12)]"
                      : "border-[#0d3358]/10 bg-white/64 hover:-translate-y-0.5 hover:border-[#0f79ff]/18 hover:bg-white",
                  )}
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border", accents[index % accents.length])}>
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-[#081b2f]">{item.label}</span>
                    <span className="mt-1 block truncate text-xs text-muted">{item.title}</span>
                  </span>
                  <Icon name="arrow" className="h-4 w-4 text-[#557089] transition group-hover:translate-x-1 group-hover:text-[#0f79ff]" />
                </button>
              ))}
            </div>
          </div>

          {active ? (
            <article className="accent-border reveal-section rounded-[2rem] border border-[#0d3358]/10 bg-white/88 p-6 shadow-[0_26px_70px_rgba(11,31,53,0.11)] backdrop-blur-xl md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0b58d0]">{active.label}</p>
                  <h3 className="font-display mt-3 text-3xl font-semibold tracking-normal text-[#081b2f]">{active.title}</h3>
                </div>
                <span className="rounded-full border border-[#10b981]/20 bg-[#effcf6] px-4 py-2 text-xs font-semibold text-[#047857]">
                  {t.activeLabel}
                </span>
              </div>
              <p className="mt-5 text-base leading-8 text-muted">{active.text}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {active.points.map((point, index) => (
                  <div key={point} className="rounded-[1.1rem] border border-[#0d3358]/8 bg-[#f8fcff] p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f79ff]/10 text-xs font-semibold text-[#0b58d0]">
                      {index + 1}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-[#0d3358]">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <CTAButton href="/solutii">
                  <span>{t.exploreModule}</span>
                  <Icon name="arrow" />
                </CTAButton>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection({ locale, industries }: { locale: Locale; industries: IndustryItem[] }) {
  const t = copy[locale];
  const summaries =
    locale === "ro"
      ? [
          "Cereri tehnice mai bine calificate, raspunsuri rapide si mai putina presiune pe echipele comerciale.",
          "Interventii si discutii initiale directionate rapid catre pasul care poate produce vanzare.",
          "Produse, livrare si stoc transformate in raspunsuri care sustin decizia de cumparare.",
          "Programari si intrebari preliminare gestionate mai clar pentru o experienta premium.",
          "Rezervari, meniu si evenimente private prezentate intr-un flux care incurajeaza contactul.",
          "Status, solicitari si intrebari operationale mutate intr-un traseu rapid si controlat.",
        ]
      : [
          "Better-qualified technical requests, faster replies, and less pressure on commercial teams.",
          "Interventions and first conversations routed quickly toward the step that can create revenue.",
          "Products, delivery, and stock turned into replies that support buying decisions.",
          "Appointments and preliminary questions handled more clearly for a premium experience.",
          "Bookings, menu, and private events presented in a flow that encourages contact.",
          "Status, requests, and operational questions moved into a faster, more controlled journey.",
        ];

  return (
    <section id="home-industries" className="py-10 md:py-12">
      <div className="section-shell">
        <SectionHeader eyebrow={t.industriesEyebrow} title={t.industriesTitle} description={t.industriesText} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.slice(0, 6).map((item, index) => (
            <article
              key={item.title}
              className="reveal-section rounded-[1.35rem] border border-[#0d3358]/10 bg-white/78 p-5 shadow-[0_16px_38px_rgba(11,31,53,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/18 hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cn("flex h-10 w-10 items-center justify-center rounded-full border", accents[index % accents.length])}>
                  <Icon name={index % 2 === 0 ? "users" : "grid"} className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#557089]">0{index + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#081b2f]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{summaries[index] ?? item.summary}</p>
              <p className="mt-4 rounded-[1rem] border border-[#0f79ff]/10 bg-[#f7fbff] p-3 text-xs leading-6 text-[#0d3358]">
                {locale === "ro"
                  ? "Impact: mai putine blocaje inainte de contact si mai multe conversatii pregatite pentru actiune."
                  : "Impact: fewer blockers before contact and more conversations ready for action."}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChannelsSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const items = channelItems[locale];

  return (
    <section id="home-channels" className="py-10 md:py-12">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2rem] border border-[#0d3358]/10 bg-white/76 p-6 shadow-[0_24px_68px_rgba(11,31,53,0.08)] backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionHeader eyebrow={t.channelsEyebrow} title={t.channelsTitle} description={t.channelsText} />
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item, index) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-[1.35rem] border border-[#d7e5f3] bg-white/88 p-5 shadow-[0_14px_34px_rgba(11,31,53,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:bg-white hover:shadow-[0_24px_52px_rgba(15,121,255,0.1)]"
                >
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-full border", accents[index % accents.length])}>
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-normal text-[#081b2f]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0b58d0] transition group-hover:gap-3">
                    {locale === "ro" ? "Vezi canalul" : "View channel"}
                    <Icon name="arrow" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqVisualIcons: IconName[] = ["message", "clock", "target", "bot", "route", "shield"];

function HomeFaqSection({ locale, faqItems }: { locale: Locale; faqItems: FaqItem[] }) {
  const t = copy[locale];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="home-faq" className="pb-14 pt-10 md:pb-16 md:pt-12">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#cfe1f3] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(237,248,255,0.9)_48%,rgba(245,252,249,0.86))] p-5 shadow-[0_26px_72px_rgba(11,31,53,0.1)] backdrop-blur-xl md:p-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#0f79ff,#13b5ba,#10b981,#f59e0b,#e11d48)]" />
          <div className="pointer-events-none absolute -left-20 top-16 h-48 w-48 rounded-full bg-[#0f79ff]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-[#10b981]/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="eyebrow">
              <Icon name="spark" />
              {t.faqEyebrow}
            </p>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-tight tracking-normal text-[#123f66] md:text-5xl">
              {t.faqTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#557089]">
              {locale === "ro"
                ? "Fiecare raspuns reduce ezitarea, explica valoarea pe intelesul clientului si il apropie de demo, oferta sau contact."
                : "Every answer reduces hesitation, explains the value clearly, and moves visitors closer to a demo, quote, or conversation."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {(locale === "ro" ? ["Mai multa incredere", "Drum scurt spre demo", "Cereri mai clare"] : ["More trust", "Shorter path to demo", "Clearer requests"]).map(
                (label, index) => (
                  <span
                    key={label}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border bg-white/82 px-3 py-1.5 text-xs font-semibold text-[#123f66] shadow-[0_10px_24px_rgba(11,31,53,0.05)]",
                      index === 0 && "border-[#0f79ff]/18",
                      index === 1 && "border-[#13b5ba]/20",
                      index === 2 && "border-[#10b981]/20",
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full", index === 0 && "bg-[#0f79ff]", index === 1 && "bg-[#13b5ba]", index === 2 && "bg-[#10b981]")} />
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto mt-8 max-w-4xl space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const icon = faqVisualIcons[index % faqVisualIcons.length];

              return (
                <article
                  key={item.question}
                  className={cn(
                    "group overflow-hidden rounded-[1.35rem] border bg-white/86 shadow-[0_14px_34px_rgba(11,31,53,0.05)] transition duration-300",
                    isOpen
                      ? "border-[#0f79ff]/24 bg-white shadow-[0_22px_52px_rgba(15,121,255,0.12)]"
                      : "border-[#d4e5f5] hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:bg-white hover:shadow-[0_22px_50px_rgba(11,31,53,0.1)]",
                  )}
                >
                  <button
                    type="button"
                    className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 text-left md:px-5"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  >
                    <span className={cn("relative flex h-12 w-12 items-center justify-center rounded-2xl border transition duration-300 group-hover:scale-105", accents[index % accents.length])}>
                      <Icon name={icon} className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-white text-[10px] font-semibold text-[#123f66] shadow-[0_8px_18px_rgba(11,31,53,0.08)]">
                        {index + 1}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-semibold leading-6 text-[#123f66] transition duration-300 group-hover:text-[#0b58d0]">
                        {item.question}
                      </span>
                      <span className={cn("mt-1 block text-xs font-semibold uppercase tracking-[0.08em] transition duration-300", isOpen ? "text-[#0b58d0]" : "text-[#557089]")}>
                        {isOpen
                          ? locale === "ro"
                            ? "Raspuns deschis"
                            : "Answer open"
                          : locale === "ro"
                            ? "Apasa pentru detalii"
                            : "Tap for details"}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border transition duration-300",
                        isOpen
                          ? "rotate-90 border-[#0f79ff]/22 bg-[#eef6ff] text-[#0b58d0]"
                          : "border-[#d8e6f4] bg-[#f7fbff] text-[#0b58d0] group-hover:border-[#0f79ff]/20 group-hover:bg-white",
                      )}
                    >
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </button>

                  <div className={cn("grid transition-[grid-template-rows,opacity] duration-300 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden px-4 md:px-5">
                      <div className="mb-4 rounded-[1.05rem] border border-[#e0ecf7] bg-[linear-gradient(180deg,#ffffff,#f8fcff)] px-4 py-4 text-sm leading-7 text-[#365a78] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ locale }: HomePageProps) {
  const { caseStudies, faqItems, industries } = useMemo(() => getSiteData(locale), [locale]);
  const t = copy[locale];

  return (
    <div className="page-gradient-shell overflow-hidden">
      <section id="home-top" className="relative pb-12 pt-32 md:pt-36 lg:pb-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/20 to-transparent" />
        <div className="section-shell flex min-h-[calc(72vh-6rem)] items-center justify-center py-8">
          <div className="reveal-section mx-auto max-w-4xl text-center">
              <p className="eyebrow">
                <Icon name="spark" />
                {t.eyebrow}
              </p>
              <h1 className="font-display mx-auto mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#06192c] md:text-6xl lg:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#365a78] md:text-lg">{t.heroText}</p>
              <HeroActions locale={locale} />
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <HeroTag icon="bot">{locale === "ro" ? "AI care raspunde" : "AI that replies"}</HeroTag>
                <HeroTag icon="grid">{locale === "ro" ? "Produse si servicii" : "Products and services"}</HeroTag>
                <HeroTag icon="shield">{locale === "ro" ? "Conversii clare" : "Clear conversions"}</HeroTag>
              </div>
          </div>
        </div>
      </section>

      <TechnologyCarousel locale={locale} />
      <WhatWeDoSection locale={locale} />
      <CaseStudiesSection locale={locale} caseStudies={caseStudies} />
      <ProcessSection locale={locale} />
      <AgentCapabilitiesSection locale={locale} />
      <IndustriesSection locale={locale} industries={industries} />
      <ChannelsSection locale={locale} />
      <HomeFaqSection locale={locale} faqItems={faqItems} />
    </div>
  );
}
