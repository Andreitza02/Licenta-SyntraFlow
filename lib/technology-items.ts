import type { Locale } from "@/lib/i18n";

export type TechnologyIconName =
  | "openai"
  | "claude"
  | "supabase"
  | "elevenlabs"
  | "vercel"
  | "n8n"
  | "voiceflow"
  | "manychat"
  | "make";

type TechnologyItem = {
  name: string;
  icon: TechnologyIconName;
  accent: string;
  description: Record<Locale, string>;
};

export const technologyItems: TechnologyItem[] = [
  {
    name: "OpenAI",
    icon: "openai",
    accent: "from-[#111827] to-[#0f79ff]",
    description: {
      ro: "Genereaza raspunsuri inteligente si logica AI pentru asistenti conversationali.",
      en: "Generates smart answers and AI reasoning for conversational assistants.",
    },
  },
  {
    name: "Claude",
    icon: "claude",
    accent: "from-[#df7a57] to-[#ffbd7a]",
    description: {
      ro: "Analizeaza texte complexe si ofera raspunsuri clare, sigure si naturale.",
      en: "Analyzes complex text and returns clear, safe, natural answers.",
    },
  },
  {
    name: "Supabase",
    icon: "supabase",
    accent: "from-[#38c76b] to-[#8af39a]",
    description: {
      ro: "Stocheaza datele, lead-urile si autentificarea intr-un backend rapid.",
      en: "Stores data, leads, and authentication in a fast backend.",
    },
  },
  {
    name: "ElevenLabs",
    icon: "elevenlabs",
    accent: "from-[#111827] to-[#697886]",
    description: {
      ro: "Transforma textul in voci naturale pentru apeluri si asistenti AI.",
      en: "Turns text into natural voices for calls and AI assistants.",
    },
  },
  {
    name: "Vercel",
    icon: "vercel",
    accent: "from-[#080b0f] to-[#475569]",
    description: {
      ro: "Publica website-ul rapid, stabil si optimizat pentru performanta.",
      en: "Publishes the website quickly, reliably, and optimized for performance.",
    },
  },
  {
    name: "N8N",
    icon: "n8n",
    accent: "from-[#ff5a2f] to-[#ffb199]",
    description: {
      ro: "Leaga aplicatii si automatizeaza procese fara munca manuala repetitiva.",
      en: "Connects apps and automates processes without repetitive manual work.",
    },
  },
  {
    name: "Voiceflow",
    icon: "voiceflow",
    accent: "from-[#1f2933] to-[#718096]",
    description: {
      ro: "Construieste fluxuri conversationale pentru chatboti si asistenti vocali.",
      en: "Builds conversational flows for chatbots and voice assistants.",
    },
  },
  {
    name: "Manychat",
    icon: "manychat",
    accent: "from-[#080b0f] to-[#3f4b57]",
    description: {
      ro: "Automatizeaza conversatii pe social media si gestioneaza lead-uri din mesaje.",
      en: "Automates social conversations and manages leads from messages.",
    },
  },
  {
    name: "Make",
    icon: "make",
    accent: "from-[#6d28ff] to-[#ff25d8]",
    description: {
      ro: "Conecteaza servicii si sincronizeaza automat date intre platforme.",
      en: "Connects services and syncs data automatically across platforms.",
    },
  },
];
