import type { Locale } from "@/lib/i18n";

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

export type SolutionItem = {
  title: string;
  summary: string;
  benefits: string[];
  useCase: string;
  icon: string;
  href: string;
  category: "Captare" | "Conversatie" | "Operare" | "Capture" | "Conversation" | "Operations";
};

export type IndustryItem = {
  title: string;
  summary: string;
  impact: string;
  icon: string;
};

export type WorkflowStep = {
  title: string;
  summary: string;
  detail: string;
  icon: string;
};

export type BenefitItem = {
  title: string;
  summary: string;
  metric: string;
};

export type CaseStudyItem = {
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  impact: string;
  icon: string;
};

export type ArchitectureLayer = {
  title: string;
  summary: string;
  details: string[];
  icon: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SolutionTab = {
  id: string;
  label: string;
  summary: string;
  metric: string;
  points: string[];
};

export type ChatPreset = {
  id: string;
  prompt: string;
  focus: string;
  messages: Array<{
    role: "user" | "assistant";
    text: string;
  }>;
  collectedData: string[];
};

export const stats: StatItem[] = [
  {
    value: 92,
    suffix: "%",
    label: "raspuns initial automatizat",
    description: "Solicitarile repetitive pot fi preluate instant si rutate coerent catre echipa potrivita.",
  },
  {
    value: 3,
    suffix: "x",
    label: "mai multe lead-uri calificate",
    description: "Conversatiile ghidate colecteaza date complete si reduc pierderea oportunitatilor comerciale.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "disponibilitate digitala",
    description: "Platforma ramane activa pentru clienti, parteneri si solicitari de demo in afara programului.",
  },
  {
    value: 8,
    suffix: " sec",
    label: "timp mediu de preluare",
    description: "Experienta de contact incepe rapid, cu raspuns contextual si traseu clar pentru utilizator.",
  },
];

export const solutionTabs: SolutionTab[] = [
  {
    id: "capture",
    label: "Captare inteligenta",
    summary:
      "Platforma transforma traficul in date utile prin formulare ghidate, calificare progresiva si trimitere controlata catre echipa.",
    metric: "Lead pipeline stabil",
    points: [
      "Colecteaza nume, email, telefon si context in aceeasi interactiune.",
      "Aplica reguli simple de validare inainte de trimitere.",
      "Clasifica intentia pentru vanzari, suport sau demo.",
    ],
  },
  {
    id: "assist",
    label: "Asistent conversational",
    summary:
      "Raspunsurile FAQ, recomandarea de pasi urmatori si trierea solicitarii sunt livrate intr-o interfata coerenta si credibila.",
    metric: "Suport digital constant",
    points: [
      "Livreaza raspunsuri bazate pe o baza de cunostinte structurata.",
      "Mentorizeaza utilizatorul prin intrebari de clarificare concise.",
      "Propune CTA relevante: oferta, consultanta sau escaladare catre operator.",
    ],
  },
  {
    id: "operate",
    label: "Orchestrare operationala",
    summary:
      "Fiecare conversatie poate declansa automat notificari, emailuri de follow-up si actualizari in sisteme interne.",
    metric: "Fluxuri fara blocaje",
    points: [
      "Trimite solicitari catre rolul intern potrivit.",
      "Pregateste payload-uri pentru CRM, email sau ticketing.",
      "Pastreaza trasabilitatea fiecarei interactiuni pentru analiza.",
    ],
  },
];

export const solutions: SolutionItem[] = [
  {
    title: "Asistent virtual AI",
    summary: "Interfata conversationala care raspunde contextual si ghideaza utilizatorul catre actiunea potrivita.",
    benefits: ["Disponibilitate permanenta", "Raspuns coerent", "Experienta premium pentru vizitator"],
    useCase: "Ideal pentru preluarea intrebarilor introductive si trierea vizitatorilor noi.",
    icon: "bot",
    href: "/asistent-virtual",
    category: "Conversatie",
  },
  {
    title: "Automatizare lead capture",
    summary: "Colecteaza date esentiale si transforma interesul initial in oportunitati cu date complete.",
    benefits: ["Mai putine lead-uri incomplete", "Date standardizate", "Transfer rapid catre vanzari"],
    useCase: "Potrivit pentru companii care primesc cereri frecvente de oferta sau consultanta.",
    icon: "pipeline",
    href: "/solutii",
    category: "Captare",
  },
  {
    title: "FAQ inteligent",
    summary: "Baza de cunostinte este folosita pentru raspunsuri rapide, consistente si scalabile.",
    benefits: ["Scade volumul de suport repetitiv", "Raspunsuri uniforme", "Actualizare centralizata"],
    useCase: "Util in organizatii cu multe intrebari recurente din partea clientilor.",
    icon: "faq",
    href: "/asistent-virtual",
    category: "Conversatie",
  },
  {
    title: "Formular cerere oferta",
    summary: "Traseu ghidat pentru cereri comerciale cu campuri dinamice si validare client-side.",
    benefits: ["Solicitari mai clare", "Mai putine reveniri", "Context complet pentru echipa"],
    useCase: "Recomandat pentru servicii tehnice, integratori si companii B2B.",
    icon: "form",
    href: "/contact",
    category: "Captare",
  },
  {
    title: "Programare demo sau consultanta",
    summary: "CTA-uri dedicate pentru programari, cu intentie clara si pregatirea rapida a discutiei.",
    benefits: ["Conversie mai buna", "Timp redus de preluare", "Agenda clarificata dinainte"],
    useCase: "Util pentru prezentari comerciale, validare de proiect si discutii cu decidenti.",
    icon: "calendar",
    href: "/contact",
    category: "Operare",
  },
  {
    title: "Integrare email si CRM",
    summary: "Evenimentele importante pot declansa trimiteri de email si sincronizare in sisteme externe.",
    benefits: ["Mai putine task-uri manuale", "Trasabilitate", "Follow-up consecvent"],
    useCase: "Potrivit pentru scalarea proceselor comerciale si a suportului.",
    icon: "integration",
    href: "/automatizari",
    category: "Operare",
  },
  {
    title: "Automatizare suport clienti",
    summary: "Combinatie intre raspunsuri imediate, triere si escaladare catre echipa interna.",
    benefits: ["Timp de raspuns redus", "Prioritizare corecta", "Satisfactie mai mare"],
    useCase: "Relevant pentru business-uri cu volume mari de solicitari repetitive.",
    icon: "support",
    href: "/automatizari",
    category: "Operare",
  },
];

export const industries: IndustryItem[] = [
  {
    title: "Productie / Manufacturing",
    summary: "Preia cereri tehnice, intrebari despre disponibilitate si solicitari de oferta intr-un flux standardizat.",
    impact: "Reduce timpul de pre-calificare si pregateste informatiile pentru echipele comerciale sau tehnice.",
    icon: "factory",
  },
  {
    title: "Servicii tehnice",
    summary: "Centralizeaza intrebarile recurente, urgenta solicitarii si tipul de interventie necesar.",
    impact: "Scade timpul de coordonare si ajuta la distribuirea corecta a cazurilor.",
    icon: "tools",
  },
  {
    title: "Retail",
    summary: "Raspunde la intrebari despre produse, livrare, stoc si directioneaza clientul catre pasul urmator.",
    impact: "Imbunatateste experienta digitala si reduce presiunea pe suportul uman.",
    icon: "cart",
  },
  {
    title: "Clinici",
    summary: "Ghideaza pacientii prin informatii uzuale, specialitati, programari si mesaje preliminare.",
    impact: "Optimizeaza interactiunea initiala si pastreaza claritatea fluxului de programare.",
    icon: "health",
  },
  {
    title: "HoReCa",
    summary: "Poate prelua intrebari despre rezervari, program, meniu si evenimente private.",
    impact: "Reduce apelurile repetitive si accelereaza conversia solicitarilor in rezervari.",
    icon: "hospitality",
  },
  {
    title: "Logistica",
    summary: "Structurarea cererilor de transport, status si intrebari operationale intr-un flux clar.",
    impact: "Creeaza un punct unic de preluare pentru informatii repetitive si urgente.",
    icon: "logistics",
  },
  {
    title: "Companii B2B",
    summary: "Filtreaza intentia comerciala, pregateste briefingul si accelereaza handoff-ul catre sales.",
    impact: "Creste calitatea lead-urilor si standardizeaza contactul de pre-vanzare.",
    icon: "b2b",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Intrebare initiala",
    summary: "Vizitatorul porneste conversatia din website sau dintr-un canal digital conectat.",
    detail: "Prompturile ghidate reduc ambiguitatea si accelereaza intentia.",
    icon: "message",
  },
  {
    title: "Raspuns contextual",
    summary: "Asistentul livreaza un raspuns bazat pe FAQ, reguli de business si continut de referinta.",
    detail: "Se pot afisa si recomandari pentru pasii urmatori.",
    icon: "spark",
  },
  {
    title: "Colectare date",
    summary: "Sunt cerute datele necesare: nume, email, telefon, companie si tipul solicitarii.",
    detail: "Campurile sunt adaptate la contextul conversatiei.",
    icon: "form",
  },
  {
    title: "Validare si clasificare",
    summary: "Datele sunt verificate local si solicitarea este incadrata pe fluxul corect.",
    detail: "Regulile simple reduc erorile si dublele interpretari.",
    icon: "shield",
  },
  {
    title: "Rutare operationala",
    summary: "Cazul ajunge catre vanzari, suport sau consultanta, cu toate detaliile relevante.",
    detail: "Se poate pregati payload pentru CRM, email sau ticketing.",
    icon: "route",
  },
  {
    title: "Follow-up automat",
    summary: "Clientul primeste confirmare, iar echipa interna are un punct clar de actiune.",
    detail: "Fluxul ramane auditabil si usor de masurat.",
    icon: "mail",
  },
];

export const benefits: BenefitItem[] = [
  {
    title: "Claritate operationala",
    summary: "Fiecare solicitare este preluata intr-un format repetabil si usor de urmarit.",
    metric: "Fluxuri standardizate",
  },
  {
    title: "Experienta digitala coerenta",
    summary: "Vizitatorii primesc raspunsuri si CTA-uri relevante fara sa fie blocati in formulare rigide.",
    metric: "Interactiuni ghidate",
  },
  {
    title: "Scalare fara frictiune",
    summary: "Platforma poate prelua volume mai mari fara crestere proportionala a efortului uman.",
    metric: "Cost operational optimizat",
  },
  {
    title: "Valoare practica si operationala",
    summary: "Platforma demonstreaza aplicarea conceptelor moderne de UI, automatizare si orchestrare digitala in servicii reale.",
    metric: "Servicii optimizate",
  },
];

export const caseStudies: CaseStudyItem[] = [
  {
    title: "Restaurant cu rezervari si intrebari frecvente",
    problem: "Personalul pierde timp cu apeluri repetitive despre program, rezervari si evenimente.",
    solution: "Asistentul preia intrebarile uzuale, colecteaza detalii despre rezervare si directioneaza cererile speciale.",
    benefit: "Mai putine intreruperi pentru echipa din locatie si o experienta mai rapida pentru client.",
    impact: "Pana la 40% reducere a solicitarilor repetitive pe canalele clasice.",
    icon: "hospitality",
  },
  {
    title: "Clinica pentru programari si informare preliminara",
    problem: "Pacientii au nevoie de raspuns rapid privind specialitati, documente si sloturi disponibile.",
    solution: "Platforma prezinta raspunsuri standardizate si preia datele necesare pentru o programare initiala.",
    benefit: "Front desk-ul primeste solicitari mai clare si poate prioritiza corect cazurile.",
    impact: "Raspuns initial sub 10 secunde pentru interactiunile uzuale.",
    icon: "health",
  },
  {
    title: "Companie B2B cu cereri de oferta",
    problem: "Cererea comerciala ajunge frecvent incompleta, fara specificatii sau context suficient.",
    solution: "Asistentul cere datele tehnice esentiale, valideaza formularul si trimite cererea structurata.",
    benefit: "Echipa comerciala lucreaza cu informatii mai bune, iar lead-ul este calificat mai rapid.",
    impact: "Reducere semnificativa a timpului de clarificare in faza de pre-sales.",
    icon: "tools",
  },
  {
    title: "Business online cu intrebari repetitive",
    problem: "Suportul este incarcat de intrebari identice privind livrare, retur si functionalitati.",
    solution: "FAQ-ul inteligent si escaladarea pe exceptii reduc volumul de conversatii gestionate manual.",
    benefit: "Clientii primesc raspuns imediat, iar echipa umana se concentreaza pe cazuri cu valoare mare.",
    impact: "Crestere a satisfactiei percepute si timp de raspuns mai predictibil.",
    icon: "cart",
  },
];

export const architectureLayers: ArchitectureLayer[] = [
  {
    title: "Experienta utilizatorului",
    summary: "Vizitatorii parcurg rapid paginile, inteleg usor oferta si ajung fara frictiune la actiunea potrivita.",
    details: ["Navigare clara", "Pagini rapide", "Formulare usor de folosit"],
    icon: "browser",
  },
  {
    title: "Gestionarea solicitarilor",
    summary: "Cererea este organizata, verificata si pregatita pentru a ajunge rapid la echipa potrivita.",
    details: ["Preluare structurata", "Validare a datelor", "Directionare catre echipele interne"],
    icon: "server",
  },
  {
    title: "Inteligenta conversationala",
    summary: "Asistentul intelege intentia, raspunde coerent si ajuta clientul sa ajunga mai repede la rezultat.",
    details: ["Raspunsuri ghidate", "Intelegerea intentiei", "Escaladare controlata"],
    icon: "bot",
  },
  {
    title: "Baza de informatii",
    summary: "Raspunsurile sunt sustinute de continut clar si actualizabil despre servicii, intrebari frecvente si scenarii utile.",
    details: ["Informatii actualizabile", "Mesaje coerente", "Raspunsuri consecvente"],
    icon: "database",
  },
  {
    title: "Integrari",
    summary: "Informatiile importante pot continua catre email, CRM sau alte sisteme folosite de companie.",
    details: ["Continuarea fluxului", "Notificari automate", "Conectare cu sisteme existente"],
    icon: "integration",
  },
  {
    title: "Analiza, securitate si conformitate",
    summary: "Platforma poate urmari performanta interactiunilor si proteja datele preluate de la utilizatori.",
    details: ["Monitorizare clara", "Minimizarea datelor", "Acces controlat si consimtamant"],
    icon: "shield",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Ce poate face asistentul virtual pentru clientii mei?",
    answer:
      "Poate raspunde rapid la intrebarile frecvente, poate ghida clientul spre serviciul potrivit si poate prelua cereri simple fara asteptare lunga.",
  },
  {
    question: "Raspunde si in afara programului de lucru?",
    answer:
      "Da. Asistentul este disponibil permanent, astfel incat clientii pot primi raspunsuri si pot trimite solicitari oricand.",
  },
  {
    question: "Ma ajuta sa obtin mai multe cereri de oferta?",
    answer:
      "Da. Conversatia ii ajuta pe clienti sa ofere detalii clare, iar echipa ta primeste solicitari mai bine pregatite.",
  },
  {
    question: "Poate asistentul sa pregateasca o programare pentru demo?",
    answer:
      "Da. Poate prelua datele de contact si obiectivul discutiei, ca echipa sa continue rapid cu pasul urmator.",
  },
  {
    question: "Ce se intampla daca un client are o intrebare mai complexa?",
    answer:
      "Asistentul colecteaza contextul important si directioneaza cererea catre persoana potrivita din echipa.",
  },
  {
    question: "Datele trimise de clienti sunt tratate cu grija?",
    answer:
      "Da. Sunt colectate doar informatiile necesare pentru a raspunde corect si pentru a continua discutia in siguranta.",
  },
];

export const chatPresets: ChatPreset[] = [
  {
    id: "offer",
    prompt: "Vreau o oferta pentru un asistent virtual.",
    focus: "Calificare comerciala",
    messages: [
      { role: "user", text: "Vreau o oferta pentru un asistent virtual." },
      {
        role: "assistant",
        text: "Pot ajuta. Pentru o estimare initiala, am nevoie de domeniul companiei, volumul aproximativ de solicitari si canalul principal unde vrei integrarea.",
      },
      { role: "user", text: "Suntem companie B2B si vrem integrare in website." },
      {
        role: "assistant",
        text: "Perfect. Notez interes pentru website. Te rog sa imi lasi numele, emailul si daca doresti o discutie comerciala sau o demonstratie.",
      },
      {
        role: "assistant",
        text: "Solicitarea poate fi transmisa direct catre echipa de vanzari cu un sumar al nevoilor tale.",
      },
    ],
    collectedData: ["Nume si rol", "Email de contact", "Canal dorit", "Tip solicitare"],
  },
  {
    id: "faq",
    prompt: "Poate automatiza intrebarile frecvente?",
    focus: "FAQ si suport",
    messages: [
      { role: "user", text: "Poate automatiza intrebarile frecvente?" },
      {
        role: "assistant",
        text: "Da. Platforma foloseste o baza de cunostinte pentru a livra raspunsuri consecvente la intrebarile recurente, apoi escaladeaza exceptiile.",
      },
      { role: "user", text: "Cum gestioneaza intrebarile mai complexe?" },
      {
        role: "assistant",
        text: "In scenariile complexe, asistentul colecteaza context suplimentar si poate trimite cazul catre suport, impreuna cu un rezumat clar.",
      },
    ],
    collectedData: ["Tema solicitarii", "Nivel de urgenta", "Canal de follow-up"],
  },
  {
    id: "integration",
    prompt: "Se poate integra in site-ul meu?",
    focus: "Implementare rapida",
    messages: [
      { role: "user", text: "Se poate integra in site-ul meu?" },
      {
        role: "assistant",
        text: "Da. Arhitectura este gandita pentru embed web, iar ca extensie poate sustine si canale precum WhatsApp sau Facebook.",
      },
      { role: "user", text: "Pot trimite lead-urile si in CRM?" },
      {
        role: "assistant",
        text: "Da. Fluxul poate valida datele si apoi declansa o integrare catre CRM, email sau alt sistem operational.",
      },
    ],
    collectedData: ["Canal principal", "Sistem intern tinta", "Tip integrare dorita"],
  },
  {
    id: "demo",
    prompt: "Vreau o programare pentru demo.",
    focus: "Programare demo",
    messages: [
      { role: "user", text: "Vreau o programare pentru demo." },
      {
        role: "assistant",
        text: "Sigur. Pot prelua numele, compania, intervalul preferat si obiectivul discutiei pentru a pregati demonstratia.",
      },
      { role: "user", text: "Vrem sa vedem lead capture si FAQ pentru suport." },
      {
        role: "assistant",
        text: "Am notat. Trimit o solicitare de demo cu focus pe lead capture si FAQ, astfel incat discutia sa fie relevanta din primul minut.",
      },
    ],
    collectedData: ["Companie", "Interval preferat", "Obiectiv demo", "Persoana de contact"],
  },
];

const siteDataTranslations: Record<string, string> = {
  "raspuns initial automatizat": "automated first response",
  "Solicitarile repetitive pot fi preluate instant si rutate coerent catre echipa potrivita.": "Repetitive requests can be handled instantly and routed consistently to the right team.",
  "mai multe lead-uri calificate": "more qualified leads",
  "Conversatiile ghidate colecteaza date complete si reduc pierderea oportunitatilor comerciale.": "Guided conversations collect complete data and reduce lost commercial opportunities.",
  "disponibilitate digitala": "digital availability",
  "Platforma ramane activa pentru clienti, parteneri si solicitari de demo in afara programului.": "The platform stays active for customers, partners, and demo requests outside working hours.",
  "timp mediu de preluare": "average response time",
  "Experienta de contact incepe rapid, cu raspuns contextual si traseu clar pentru utilizator.": "The contact experience starts quickly, with contextual answers and a clear next step for the user.",
  "Captare inteligenta": "Smart Capture",
  "Platforma transforma traficul in date utile prin formulare ghidate, calificare progresiva si trimitere controlata catre echipa.": "The platform turns traffic into useful data through guided forms, progressive qualification, and controlled routing to the team.",
  "Lead pipeline stabil": "Stable lead pipeline",
  "Colecteaza nume, email, telefon si context in aceeasi interactiune.": "Collects name, email, phone, and context in the same interaction.",
  "Aplica reguli simple de validare inainte de trimitere.": "Applies simple validation rules before submission.",
  "Clasifica intentia pentru vanzari, suport sau demo.": "Classifies intent for sales, support, or demos.",
  "Asistent conversational": "Conversational Assistant",
  "Raspunsurile FAQ, recomandarea de pasi urmatori si trierea solicitarii sunt livrate intr-o interfata coerenta si credibila.": "FAQ answers, next-step guidance, and request triage are delivered in a clear and credible interface.",
  "Suport digital constant": "Always-on digital support",
  "Livreaza raspunsuri bazate pe o baza de cunostinte structurata.": "Delivers answers backed by a structured knowledge base.",
  "Mentorizeaza utilizatorul prin intrebari de clarificare concise.": "Guides the user with concise clarifying questions.",
  "Propune CTA relevante: oferta, consultanta sau escaladare catre operator.": "Suggests relevant CTAs: quote, consultation, or escalation to an operator.",
  "Orchestrare operationala": "Operational Orchestration",
  "Fiecare conversatie poate declansa automat notificari, emailuri de follow-up si actualizari in sisteme interne.": "Each conversation can automatically trigger notifications, follow-up emails, and updates in internal systems.",
  "Fluxuri fara blocaje": "Frictionless workflows",
  "Trimite solicitari catre rolul intern potrivit.": "Routes requests to the right internal role.",
  "Pregateste payload-uri pentru CRM, email sau ticketing.": "Prepares payloads for CRM, email, or ticketing.",
  "Pastreaza trasabilitatea fiecarei interactiuni pentru analiza.": "Keeps each interaction traceable for analysis.",
  "Asistent virtual AI": "AI Assistant",
  "Interfata conversationala care raspunde contextual si ghideaza utilizatorul catre actiunea potrivita.": "A conversational interface that responds contextually and guides the user toward the right action.",
  "Disponibilitate permanenta": "Always available",
  "Raspuns coerent": "Consistent answers",
  "Experienta premium pentru vizitator": "Premium visitor experience",
  "Ideal pentru preluarea intrebarilor introductive si trierea vizitatorilor noi.": "Ideal for handling first questions and qualifying new visitors.",
  "Automatizare lead capture": "Lead Capture Automation",
  "Colecteaza date esentiale si transforma interesul initial in oportunitati cu date complete.": "Collects essential data and turns initial interest into opportunities with complete details.",
  "Mai putine lead-uri incomplete": "Fewer incomplete leads",
  "Date standardizate": "Standardized data",
  "Transfer rapid catre vanzari": "Fast handoff to sales",
  "Potrivit pentru companii care primesc cereri frecvente de oferta sau consultanta.": "Well suited for companies that receive frequent quote or consultation requests.",
  "FAQ inteligent": "Smart FAQ",
  "Baza de cunostinte este folosita pentru raspunsuri rapide, consistente si scalabile.": "The knowledge base is used for fast, consistent, and scalable answers.",
  "Scade volumul de suport repetitiv": "Reduces repetitive support volume",
  "Raspunsuri uniforme": "Consistent replies",
  "Actualizare centralizata": "Centralized updates",
  "Util in organizatii cu multe intrebari recurente din partea clientilor.": "Useful for organizations with many recurring customer questions.",
  "Formular cerere oferta": "Quote Request Form",
  "Traseu ghidat pentru cereri comerciale cu campuri dinamice si validare client-side.": "A guided flow for commercial requests with dynamic fields and client-side validation.",
  "Solicitari mai clare": "Clearer requests",
  "Mai putine reveniri": "Fewer back-and-forths",
  "Context complet pentru echipa": "Complete context for the team",
  "Recomandat pentru servicii tehnice, integratori si companii B2B.": "Recommended for technical services, integrators, and B2B companies.",
  "Programare demo sau consultanta": "Demo or Consultation Booking",
  "CTA-uri dedicate pentru programari, cu intentie clara si pregatirea rapida a discutiei.": "Dedicated CTAs for bookings, with clear intent and fast preparation for the discussion.",
  "Conversie mai buna": "Better conversion",
  "Timp redus de preluare": "Faster intake",
  "Agenda clarificata dinainte": "Agenda clarified in advance",
  "Util pentru prezentari comerciale, validare de proiect si discutii cu decidenti.": "Useful for sales presentations, project validation, and discussions with decision-makers.",
  "Integrare email si CRM": "Email and CRM Integration",
  "Evenimentele importante pot declansa trimiteri de email si sincronizare in sisteme externe.": "Important events can trigger emails and syncing with external systems.",
  "Mai putine task-uri manuale": "Fewer manual tasks",
  "Trasabilitate": "Traceability",
  "Follow-up consecvent": "Consistent follow-up",
  "Potrivit pentru scalarea proceselor comerciale si a suportului.": "Suitable for scaling sales and support processes.",
  "Automatizare suport clienti": "Customer Support Automation",
  "Combinatie intre raspunsuri imediate, triere si escaladare catre echipa interna.": "A combination of instant answers, triage, and escalation to the internal team.",
  "Timp de raspuns redus": "Reduced response time",
  "Prioritizare corecta": "Better prioritization",
  "Satisfactie mai mare": "Higher satisfaction",
  "Relevant pentru business-uri cu volume mari de solicitari repetitive.": "Relevant for businesses with high volumes of repetitive requests.",
  "Captare": "Capture",
  "Conversatie": "Conversation",
  "Operare": "Operations",
  "Productie / Manufacturing": "Production / Manufacturing",
  "Preia cereri tehnice, intrebari despre disponibilitate si solicitari de oferta intr-un flux standardizat.": "Handles technical requests, availability questions, and quote requests in a standardized flow.",
  "Reduce timpul de pre-calificare si pregateste informatiile pentru echipele comerciale sau tehnice.": "Reduces pre-qualification time and prepares information for commercial or technical teams.",
  "Servicii tehnice": "Technical Services",
  "Centralizeaza intrebarile recurente, urgenta solicitarii si tipul de interventie necesar.": "Centralizes recurring questions, request urgency, and the required type of intervention.",
  "Scade timpul de coordonare si ajuta la distribuirea corecta a cazurilor.": "Reduces coordination time and helps route cases correctly.",
  "Retail": "Retail",
  "Raspunde la intrebari despre produse, livrare, stoc si directioneaza clientul catre pasul urmator.": "Answers questions about products, delivery, and stock, then guides the customer to the next step.",
  "Imbunatateste experienta digitala si reduce presiunea pe suportul uman.": "Improves the digital experience and reduces pressure on human support teams.",
  "Clinici": "Clinics",
  "Ghideaza pacientii prin informatii uzuale, specialitati, programari si mesaje preliminare.": "Guides patients through common information, specialties, appointments, and preliminary details.",
  "Optimizeaza interactiunea initiala si pastreaza claritatea fluxului de programare.": "Optimizes the first interaction and keeps the booking flow clear.",
  "HoReCa": "Hospitality",
  "Poate prelua intrebari despre rezervari, program, meniu si evenimente private.": "Can handle questions about reservations, schedule, menu, and private events.",
  "Reduce apelurile repetitive si accelereaza conversia solicitarilor in rezervari.": "Reduces repetitive calls and speeds up the conversion of requests into bookings.",
  "Logistica": "Logistics",
  "Structurarea cererilor de transport, status si intrebari operationale intr-un flux clar.": "Structures transport requests, status questions, and operational inquiries in a clear flow.",
  "Creeaza un punct unic de preluare pentru informatii repetitive si urgente.": "Creates a single intake point for repetitive and urgent information.",
  "Companii B2B": "B2B Companies",
  "Filtreaza intentia comerciala, pregateste briefingul si accelereaza handoff-ul catre sales.": "Filters commercial intent, prepares the briefing, and speeds up the handoff to sales.",
  "Creste calitatea lead-urilor si standardizeaza contactul de pre-vanzare.": "Improves lead quality and standardizes pre-sales contact.",
  "Intrebare initiala": "Initial Question",
  "Vizitatorul porneste conversatia din website sau dintr-un canal digital conectat.": "The visitor starts the conversation from the website or another connected digital channel.",
  "Prompturile ghidate reduc ambiguitatea si accelereaza intentia.": "Guided prompts reduce ambiguity and speed up intent capture.",
  "Raspuns contextual": "Contextual Reply",
  "Asistentul livreaza un raspuns bazat pe FAQ, reguli de business si continut de referinta.": "The assistant delivers a reply based on FAQ content, business rules, and reference information.",
  "Se pot afisa si recomandari pentru pasii urmatori.": "It can also display recommendations for the next steps.",
  "Colectare date": "Data Collection",
  "Sunt cerute datele necesare: nume, email, telefon, companie si tipul solicitarii.": "The required data is collected: name, email, phone, company, and request type.",
  "Campurile sunt adaptate la contextul conversatiei.": "Fields are adapted to the context of the conversation.",
  "Validare si clasificare": "Validation and Classification",
  "Datele sunt verificate local si solicitarea este incadrata pe fluxul corect.": "Data is checked locally and the request is assigned to the right flow.",
  "Regulile simple reduc erorile si dublele interpretari.": "Simple rules reduce errors and conflicting interpretations.",
  "Rutare operationala": "Operational Routing",
  "Cazul ajunge catre vanzari, suport sau consultanta, cu toate detaliile relevante.": "The case reaches sales, support, or consulting with all relevant details.",
  "Se poate pregati payload pentru CRM, email sau ticketing.": "A payload can be prepared for CRM, email, or ticketing.",
  "Follow-up automat": "Automated Follow-up",
  "Clientul primeste confirmare, iar echipa interna are un punct clar de actiune.": "The customer receives confirmation, and the internal team gets a clear action point.",
  "Fluxul ramane auditabil si usor de masurat.": "The workflow remains auditable and easy to measure.",
  "Claritate operationala": "Operational Clarity",
  "Fiecare solicitare este preluata intr-un format repetabil si usor de urmarit.": "Each request is handled in a repeatable and easy-to-follow format.",
  "Fluxuri standardizate": "Standardized Workflows",
  "Experienta digitala coerenta": "Consistent Digital Experience",
  "Vizitatorii primesc raspunsuri si CTA-uri relevante fara sa fie blocati in formulare rigide.": "Visitors receive relevant answers and CTAs without getting stuck in rigid forms.",
  "Interactiuni ghidate": "Guided Interactions",
  "Scalare fara frictiune": "Frictionless Scaling",
  "Platforma poate prelua volume mai mari fara crestere proportionala a efortului uman.": "The platform can handle higher volumes without a proportional increase in human effort.",
  "Cost operational optimizat": "Optimized Operating Cost",
  "Valoare practica si operationala": "Practical Business Value",
  "Platforma demonstreaza aplicarea conceptelor moderne de UI, automatizare si orchestrare digitala in servicii reale.": "The platform demonstrates how modern UI, automation, and digital orchestration can be applied to real services.",
  "Servicii optimizate": "Optimized Services",
  "Restaurant cu rezervari si intrebari frecvente": "Restaurant with Reservations and FAQs",
  "Personalul pierde timp cu apeluri repetitive despre program, rezervari si evenimente.": "Staff lose time on repetitive calls about schedule, reservations, and events.",
  "Asistentul preia intrebarile uzuale, colecteaza detalii despre rezervare si directioneaza cererile speciale.": "The assistant handles common questions, collects booking details, and routes special requests.",
  "Mai putine intreruperi pentru echipa din locatie si o experienta mai rapida pentru client.": "Fewer interruptions for the on-site team and a faster experience for the customer.",
  "Pana la 40% reducere a solicitarilor repetitive pe canalele clasice.": "Up to 40% fewer repetitive requests through traditional channels.",
  "Clinica pentru programari si informare preliminara": "Clinic for Appointments and First Information",
  "Pacientii au nevoie de raspuns rapid privind specialitati, documente si sloturi disponibile.": "Patients need quick answers about specialties, documents, and available slots.",
  "Platforma prezinta raspunsuri standardizate si preia datele necesare pentru o programare initiala.": "The platform provides standardized answers and collects the information needed for an initial appointment.",
  "Front desk-ul primeste solicitari mai clare si poate prioritiza corect cazurile.": "The front desk receives clearer requests and can prioritize cases correctly.",
  "Raspuns initial sub 10 secunde pentru interactiunile uzuale.": "First response in under 10 seconds for common interactions.",
  "Companie B2B cu cereri de oferta": "B2B Company with Quote Requests",
  "Cererea comerciala ajunge frecvent incompleta, fara specificatii sau context suficient.": "Commercial requests often arrive incomplete, without enough specifications or context.",
  "Asistentul cere datele tehnice esentiale, valideaza formularul si trimite cererea structurata.": "The assistant asks for essential technical details, validates the form, and sends a structured request.",
  "Echipa comerciala lucreaza cu informatii mai bune, iar lead-ul este calificat mai rapid.": "The sales team works with better information, and the lead is qualified faster.",
  "Reducere semnificativa a timpului de clarificare in faza de pre-sales.": "A significant reduction in clarification time during the pre-sales stage.",
  "Business online cu intrebari repetitive": "Online Business with Repetitive Questions",
  "Suportul este incarcat de intrebari identice privind livrare, retur si functionalitati.": "Support teams are overloaded with identical questions about delivery, returns, and features.",
  "FAQ-ul inteligent si escaladarea pe exceptii reduc volumul de conversatii gestionate manual.": "The smart FAQ and exception-based escalation reduce the number of conversations handled manually.",
  "Clientii primesc raspuns imediat, iar echipa umana se concentreaza pe cazuri cu valoare mare.": "Customers get immediate answers, while the human team focuses on high-value cases.",
  "Crestere a satisfactiei percepute si timp de raspuns mai predictibil.": "Higher perceived satisfaction and more predictable response times.",
  "Experienta utilizatorului": "User Experience",
  "Vizitatorii parcurg rapid paginile, inteleg usor oferta si ajung fara frictiune la actiunea potrivita.": "Visitors move quickly through the pages, understand the offering easily, and reach the right action without friction.",
  "Navigare clara": "Clear Navigation",
  "Pagini rapide": "Fast Pages",
  "Formulare usor de folosit": "Easy-to-use Forms",
  "Gestionarea solicitarilor": "Request Handling",
  "Cererea este organizata, verificata si pregatita pentru a ajunge rapid la echipa potrivita.": "The request is organized, checked, and prepared to reach the right team quickly.",
  "Preluare structurata": "Structured Intake",
  "Validare a datelor": "Data Validation",
  "Directionare catre echipele interne": "Routing to Internal Teams",
  "Inteligenta conversationala": "Conversational Intelligence",
  "Asistentul intelege intentia, raspunde coerent si ajuta clientul sa ajunga mai repede la rezultat.": "The assistant understands intent, answers consistently, and helps the customer reach an outcome faster.",
  "Raspunsuri ghidate": "Guided Answers",
  "Intelegerea intentiei": "Intent Understanding",
  "Escaladare controlata": "Controlled Escalation",
  "Baza de informatii": "Knowledge Base",
  "Raspunsurile sunt sustinute de continut clar si actualizabil despre servicii, intrebari frecvente si scenarii utile.": "Answers are supported by clear, updatable content about services, FAQs, and useful scenarios.",
  "Informatii actualizabile": "Updatable Information",
  "Mesaje coerente": "Consistent Messaging",
  "Raspunsuri consecvente": "Reliable Answers",
  "Integrari": "Integrations",
  "Informatiile importante pot continua catre email, CRM sau alte sisteme folosite de companie.": "Important information can continue into email, CRM, or other systems used by the company.",
  "Continuarea fluxului": "Workflow Continuity",
  "Notificari automate": "Automated Notifications",
  "Conectare cu sisteme existente": "Connection with Existing Systems",
  "Analiza, securitate si conformitate": "Analytics, Security, and Compliance",
  "Platforma poate urmari performanta interactiunilor si proteja datele preluate de la utilizatori.": "The platform can track interaction performance and protect user data.",
  "Monitorizare clara": "Clear Monitoring",
  "Minimizarea datelor": "Data Minimization",
  "Acces controlat si consimtamant": "Controlled Access and Consent",
  "Ce poate face asistentul virtual pentru clientii mei?": "What can the virtual assistant do for my customers?",
  "Poate raspunde rapid la intrebarile frecvente, poate ghida clientul spre serviciul potrivit si poate prelua cereri simple fara asteptare lunga.": "It can quickly answer common questions, guide customers to the right service, and handle simple requests without long waiting times.",
  "Raspunde si in afara programului de lucru?": "Does it also answer outside business hours?",
  "Da. Asistentul este disponibil permanent, astfel incat clientii pot primi raspunsuri si pot trimite solicitari oricand.": "Yes. The assistant is always available, so customers can get answers and send requests anytime.",
  "Ma ajuta sa obtin mai multe cereri de oferta?": "Can it help me get more quote requests?",
  "Da. Conversatia ii ajuta pe clienti sa ofere detalii clare, iar echipa ta primeste solicitari mai bine pregatite.": "Yes. The conversation helps customers provide clear details, and your team receives better-prepared requests.",
  "Poate asistentul sa pregateasca o programare pentru demo?": "Can the assistant prepare a demo booking?",
  "Da. Poate prelua datele de contact si obiectivul discutiei, ca echipa sa continue rapid cu pasul urmator.": "Yes. It can collect contact details and the purpose of the discussion so your team can quickly continue with the next step.",
  "Ce se intampla daca un client are o intrebare mai complexa?": "What happens if a customer has a more complex question?",
  "Asistentul colecteaza contextul important si directioneaza cererea catre persoana potrivita din echipa.": "The assistant collects the important context and routes the request to the right person in your team.",
  "Datele trimise de clienti sunt tratate cu grija?": "Are customer-submitted data handled carefully?",
  "Da. Sunt colectate doar informatiile necesare pentru a raspunde corect si pentru a continua discutia in siguranta.": "Yes. Only the information needed to answer correctly and continue the discussion safely is collected.",
  "Vreau o oferta pentru un asistent virtual.": "I want a quote for a virtual assistant.",
  "Calificare comerciala": "Sales Qualification",
  "Pot ajuta. Pentru o estimare initiala, am nevoie de domeniul companiei, volumul aproximativ de solicitari si canalul principal unde vrei integrarea.": "I can help. For an initial estimate, I need your company sector, the approximate request volume, and the main channel where you want the integration.",
  "Suntem companie B2B si vrem integrare in website.": "We are a B2B company and we want website integration.",
  "Perfect. Notez interes pentru website. Te rog sa imi lasi numele, emailul si daca doresti o discutie comerciala sau o demonstratie.": "Perfect. I’m noting website interest. Please share your name, email, and whether you want a sales discussion or a demo.",
  "Solicitarea poate fi transmisa direct catre echipa de vanzari cu un sumar al nevoilor tale.": "The request can be sent directly to the sales team with a summary of your needs.",
  "Nume si rol": "Name and Role",
  "Email de contact": "Contact Email",
  "Canal dorit": "Preferred Channel",
  "Tip solicitare": "Request Type",
  "Poate automatiza intrebarile frecvente?": "Can it automate frequently asked questions?",
  "FAQ si suport": "FAQ and Support",
  "Da. Platforma foloseste o baza de cunostinte pentru a livra raspunsuri consecvente la intrebarile recurente, apoi escaladeaza exceptiile.": "Yes. The platform uses a knowledge base to deliver consistent answers to recurring questions, then escalates exceptions.",
  "Cum gestioneaza intrebarile mai complexe?": "How does it handle more complex questions?",
  "In scenariile complexe, asistentul colecteaza context suplimentar si poate trimite cazul catre suport, impreuna cu un rezumat clar.": "In complex scenarios, the assistant gathers extra context and can send the case to support with a clear summary.",
  "Tema solicitarii": "Request Topic",
  "Nivel de urgenta": "Urgency Level",
  "Canal de follow-up": "Follow-up Channel",
  "Se poate integra in site-ul meu?": "Can it be integrated into my website?",
  "Implementare rapida": "Fast Implementation",
  "Da. Arhitectura este gandita pentru embed web, iar ca extensie poate sustine si canale precum WhatsApp sau Facebook.": "Yes. The architecture is designed for web embed and, as an extension, can support channels like WhatsApp or Facebook.",
  "Pot trimite lead-urile si in CRM?": "Can I send leads into my CRM as well?",
  "Da. Fluxul poate valida datele si apoi declansa o integrare catre CRM, email sau alt sistem operational.": "Yes. The flow can validate the data and then trigger an integration to CRM, email, or another operational system.",
  "Canal principal": "Primary Channel",
  "Sistem intern tinta": "Target Internal System",
  "Tip integrare dorita": "Desired Integration Type",
  "Vreau o programare pentru demo.": "I want to book a demo.",
  "Programare demo": "Demo Scheduling",
  "Sigur. Pot prelua numele, compania, intervalul preferat si obiectivul discutiei pentru a pregati demonstratia.": "Sure. I can collect your name, company, preferred time slot, and the purpose of the meeting to prepare the demo.",
  "Vrem sa vedem lead capture si FAQ pentru suport.": "We want to see lead capture and FAQ for support.",
  "Am notat. Trimit o solicitare de demo cu focus pe lead capture si FAQ, astfel incat discutia sa fie relevanta din primul minut.": "Noted. I’m sending a demo request focused on lead capture and FAQ so the discussion is relevant from the first minute.",
  "Companie": "Company",
  "Interval preferat": "Preferred Time Slot",
  "Obiectiv demo": "Demo Goal",
  "Persoana de contact": "Contact Person",
};

function translateSiteText(text: string, locale: Locale) {
  if (locale === "ro") {
    return text;
  }

  return siteDataTranslations[text] ?? text;
}

function translateTextList(items: string[], locale: Locale) {
  return items.map((item) => translateSiteText(item, locale));
}

export function getStats(locale: Locale): StatItem[] {
  return stats.map((item) => ({
    ...item,
    label: translateSiteText(item.label, locale),
    description: translateSiteText(item.description, locale),
  }));
}

export function getSolutionTabs(locale: Locale): SolutionTab[] {
  return solutionTabs.map((item) => ({
    ...item,
    label: translateSiteText(item.label, locale),
    summary: translateSiteText(item.summary, locale),
    metric: translateSiteText(item.metric, locale),
    points: translateTextList(item.points, locale),
  }));
}

export function getSolutions(locale: Locale): SolutionItem[] {
  return solutions.map((item) => ({
    ...item,
    title: translateSiteText(item.title, locale),
    summary: translateSiteText(item.summary, locale),
    benefits: translateTextList(item.benefits, locale),
    useCase: translateSiteText(item.useCase, locale),
    category: translateSiteText(item.category, locale) as SolutionItem["category"],
  }));
}

export function getIndustries(locale: Locale): IndustryItem[] {
  return industries.map((item) => ({
    ...item,
    title: translateSiteText(item.title, locale),
    summary: translateSiteText(item.summary, locale),
    impact: translateSiteText(item.impact, locale),
  }));
}

export function getWorkflowSteps(locale: Locale): WorkflowStep[] {
  return workflowSteps.map((item) => ({
    ...item,
    title: translateSiteText(item.title, locale),
    summary: translateSiteText(item.summary, locale),
    detail: translateSiteText(item.detail, locale),
  }));
}

export function getBenefits(locale: Locale): BenefitItem[] {
  return benefits.map((item) => ({
    ...item,
    title: translateSiteText(item.title, locale),
    summary: translateSiteText(item.summary, locale),
    metric: translateSiteText(item.metric, locale),
  }));
}

export function getCaseStudies(locale: Locale): CaseStudyItem[] {
  return caseStudies.map((item) => ({
    ...item,
    title: translateSiteText(item.title, locale),
    problem: translateSiteText(item.problem, locale),
    solution: translateSiteText(item.solution, locale),
    benefit: translateSiteText(item.benefit, locale),
    impact: translateSiteText(item.impact, locale),
  }));
}

export function getArchitectureLayers(locale: Locale): ArchitectureLayer[] {
  return architectureLayers.map((item) => ({
    ...item,
    title: translateSiteText(item.title, locale),
    summary: translateSiteText(item.summary, locale),
    details: translateTextList(item.details, locale),
  }));
}

export function getFaqItems(locale: Locale): FaqItem[] {
  return faqItems.map((item) => ({
    question: translateSiteText(item.question, locale),
    answer: translateSiteText(item.answer, locale),
  }));
}

export function getChatPresets(locale: Locale): ChatPreset[] {
  return chatPresets.map((item) => ({
    ...item,
    prompt: translateSiteText(item.prompt, locale),
    focus: translateSiteText(item.focus, locale),
    messages: item.messages.map((message) => ({
      ...message,
      text: translateSiteText(message.text, locale),
    })),
    collectedData: translateTextList(item.collectedData, locale),
  }));
}

export function getSiteData(locale: Locale) {
  return {
    stats: getStats(locale),
    solutionTabs: getSolutionTabs(locale),
    solutions: getSolutions(locale),
    industries: getIndustries(locale),
    workflowSteps: getWorkflowSteps(locale),
    benefits: getBenefits(locale),
    caseStudies: getCaseStudies(locale),
    architectureLayers: getArchitectureLayers(locale),
    faqItems: getFaqItems(locale),
    chatPresets: getChatPresets(locale),
  };
}
