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
  overview?: string[];
  objective?: string;
  problem: string;
  solution: string;
  benefit: string;
  impact: string;
  features?: string[];
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

export type ArchitectureLayerItem = Record<string, any>;

export const architectureLayers: ArchitectureLayerItem[] = [];

export const stats: StatItem[] = [
  {
    value: 92,
    suffix: "%",
    label: "produs AI principal",
    description: "Custom AI Assistant preia intrebari, califica lead-uri si arata valoarea inainte de oferta.",
  },
  {
    value: 3,
    suffix: "x",
    label: "pachet vandut mai clar",
    description: "AI Assistant, Website Builder si Hosting sunt prezentate ca produse concrete pentru client.",
  },
  {
    value: 24,
    suffix: "/7",
    label: "demo disponibil permanent",
    description: "Butonul Try me transforma pagina intr-o demonstratie live pentru best seller.",
  },
  {
    value: 8,
    suffix: " sec",
    label: "prim contact pentru cumparare",
    description: "Vizitatorul intelege rapid produsul, pretul si urmatorul pas catre oferta.",
  },
];

export const solutionTabs: SolutionTab[] = [
  {
    id: "capture",
    label: "Oferta si lead capture",
    summary:
      "Fluxul transforma interesul pentru Custom AI Assistant in cereri clare, cu date utile pentru oferta.",
    metric: "Cereri pregatite",
    points: [
      "Colecteaza nume, email, telefon si obiectiv in aceeasi interactiune.",
      "Valideaza datele inainte ca cererea sa ajunga la echipa.",
      "Clasifica intentia pentru oferta, demo, suport sau pachet complet.",
    ],
  },
  {
    id: "assist",
    label: "Best seller AI Assistant",
    summary:
      "Produsul principal raspunde instant, explica oferta si muta clientul catre demo, contact sau cumparare.",
    metric: "Produs demonstrabil",
    points: [
      "Livreaza raspunsuri bazate pe oferta si baza de cunostinte.",
      "Califica intentia prin intrebari scurte, utile pentru vanzare.",
      "Propune CTA relevante: Try me, oferta, contact sau cos.",
    ],
  },
  {
    id: "operate",
    label: "Pachet complet",
    summary:
      "Website Builder, Hosting si automatizarile extind produsul AI intr-o oferta completa pentru client.",
    metric: "Oferta extinsa",
    points: [
      "Trimite solicitarile catre vanzari sau follow-up.",
      "Pregateste payload-uri pentru CRM, email sau estimare.",
      "Pastreaza trasabilitatea pentru analiza comerciala.",
    ],
  },
];

export const solutions: SolutionItem[] = [
  {
    title: "Custom AI Assistant",
    summary: "Produsul principal SyntraFlow: asistentul care raspunde instant si ajuta clientul sa ajunga la oferta.",
    benefits: ["Best seller", "Try me live", "Lead-uri pentru vanzare"],
    useCase: "Ideal pentru clientii care vor un produs AI usor de demonstrat si vandut.",
    icon: "bot",
    href: "/asistent-virtual",
    category: "Conversatie",
  },
  {
    title: "Add-on lead capture",
    summary: "Colecteaza datele necesare pentru o oferta mai rapida si un follow-up mai clar.",
    benefits: ["Cereri complete", "Date standardizate", "Transfer rapid catre vanzari"],
    useCase: "Potrivit pentru clienti care vor ca produsul AI sa pregateasca cererea de oferta.",
    icon: "pipeline",
    href: "/solutii",
    category: "Captare",
  },
  {
    title: "FAQ pentru produsul AI",
    summary: "Baza de cunostinte sustine raspunsuri rapide despre produse, preturi, demo si urmatorul pas.",
    benefits: ["Raspunsuri uniforme", "Mai putine ezitari", "Actualizare centralizata"],
    useCase: "Util pentru clientii care primesc multe intrebari inainte de cumparare.",
    icon: "faq",
    href: "/asistent-virtual",
    category: "Conversatie",
  },
  {
    title: "Cerere oferta pentru AI Assistant",
    summary: "Traseu ghidat pentru clienti care vor pret, demo sau recomandarea produsului potrivit.",
    benefits: ["Solicitari mai clare", "Mai putine reveniri", "Context complet pentru echipa"],
    useCase: "Recomandat cand vrei sa vinzi produsul rapid, cu date utile de la inceput.",
    icon: "form",
    href: "/contact",
    category: "Captare",
  },
  {
    title: "Demo pentru best seller",
    summary: "CTA-uri dedicate pentru prezentarea Custom AI Assistant si pregatirea discutiei comerciale.",
    benefits: ["Conversie mai buna", "Timp redus de preluare", "Agenda clarificata dinainte"],
    useCase: "Util pentru clienti care trebuie sa vada produsul in actiune inainte de cumparare.",
    icon: "calendar",
    href: "/contact",
    category: "Operare",
  },
  {
    title: "Integrare CRM pentru vanzare",
    summary: "Cererea pornita din asistent poate ajunge in email, CRM sau alt sistem de follow-up.",
    benefits: ["Mai putine task-uri manuale", "Trasabilitate", "Follow-up consecvent"],
    useCase: "Potrivit pentru echipe care vor sa transforme demo-ul in oferta si cumparare.",
    icon: "integration",
    href: "/automatizari",
    category: "Operare",
  },
  {
    title: "Suport automatizat pentru clienti",
    summary: "Raspunsuri imediate si escaladare pentru clientii care au intrebari dupa ce vad produsul.",
    benefits: ["Timp de raspuns redus", "Prioritizare corecta", "Satisfactie mai mare"],
    useCase: "Relevant pentru business-uri care vor sa vanda fara sa piarda timp in intrebari repetitive.",
    icon: "support",
    href: "/automatizari",
    category: "Operare",
  },
];

export const industries: IndustryItem[] = [
  {
    title: "Productie / Manufacturing",
    summary: "Clientul cumpara AI Assistant pentru cereri tehnice, disponibilitate si oferte preluate intr-un flux standardizat.",
    impact: "Produsul reduce timpul de pre-calificare si pregateste contextul pentru vanzari sau echipa tehnica.",
    icon: "factory",
  },
  {
    title: "Servicii tehnice",
    summary: "AI Assistant centralizeaza intrebarile recurente, urgenta solicitarii si tipul de interventie necesar.",
    impact: "Oferta devine mai usor de vandut pentru echipe care pierd timp in coordonare.",
    icon: "tools",
  },
  {
    title: "Retail",
    summary: "Produsul raspunde la intrebari despre oferta, livrare, stoc si directioneaza clientul catre pasul urmator.",
    impact: "Creste increderea in cumparare si reduce presiunea pe suportul uman.",
    icon: "cart",
  },
  {
    title: "Clinici",
    summary: "AI Assistant ghideaza pacientii catre specialitati, programari si intrebari preliminare cu mai putina frictiune.",
    impact: "Clientul vede rapid valoarea: programari mai clare si raspuns initial mai bun.",
    icon: "health",
  },
  {
    title: "HoReCa",
    summary: "Produsul poate prelua intrebari despre rezervari, program, meniu si evenimente private.",
    impact: "Este usor de vandut pentru businessuri care vor rezervari si mai putine apeluri repetitive.",
    icon: "hospitality",
  },
  {
    title: "Logistica",
    summary: "AI Assistant structureaza cereri de transport, status si intrebari operationale intr-un flux clar.",
    impact: "Oferta creeaza un punct unic de preluare pentru solicitari repetitive si urgente.",
    icon: "logistics",
  },
  {
    title: "Companii B2B",
    summary: "Filtreaza intentia comerciala, pregateste briefingul si accelereaza handoff-ul catre sales.",
    impact: "Custom AI Assistant creste calitatea lead-urilor si standardizeaza contactul de pre-vanzare.",
    icon: "b2b",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    title: "Vizitatorul vede produsul",
    summary: "Pagina prezinta Custom AI Assistant ca best seller, cu pret, beneficiu si CTA clar.",
    detail: "Mesajul reduce ezitarea si arata rapid ce cumpara clientul.",
    icon: "message",
  },
  {
    title: "Try me demonstreaza valoarea",
    summary: "Asistentul raspunde live si transforma pagina intr-o prezentare interactiva.",
    detail: "Clientul vede produsul in actiune inainte de oferta.",
    icon: "spark",
  },
  {
    title: "Cerere pregatita",
    summary: "Fluxul strange nume, email, telefon, companie si obiectivul clientului.",
    detail: "Campurile sunt adaptate la produsul cerut si la nivelul de intentie.",
    icon: "form",
  },
  {
    title: "Validare pentru oferta",
    summary: "Datele sunt verificate rapid si solicitarea ajunge pe fluxul potrivit.",
    detail: "Regulile simple reduc erorile si pregatesc un raspuns comercial mai bun.",
    icon: "shield",
  },
  {
    title: "Rutare catre vanzare",
    summary: "Cazul ajunge catre vanzari, suport sau consultanta, cu toate detaliile relevante.",
    detail: "Se poate pregati payload pentru CRM, email sau estimare.",
    icon: "route",
  },
  {
    title: "Follow-up pentru cumparare",
    summary: "Clientul primeste confirmare, iar echipa are un punct clar de actiune.",
    detail: "Fluxul ramane masurabil de la interes pana la oferta.",
    icon: "mail",
  },
];

export const benefits: BenefitItem[] = [
  {
    title: "Produs principal clar",
    summary: "Custom AI Assistant este prezentat ca best seller, cu demo live si urmator pas usor de inteles.",
    metric: "Oferta usor de vandut",
  },
  {
    title: "Experienta care vinde",
    summary: "Prospectii primesc raspunsuri si CTA-uri relevante fara sa fie blocati in formulare rigide.",
    metric: "Drum scurt spre oferta",
  },
  {
    title: "Pachet complet",
    summary: "Website Builder si Hosting pot fi vandute impreuna cu AI Assistant cand clientul vrea lansare completa.",
    metric: "AI plus website plus hosting",
  },
  {
    title: "Valoare comerciala",
    summary: "Platforma arata cum produsul AI, automatizarea si interfata premium pot genera cereri reale.",
    metric: "Vanzare mai coerenta",
  },
];

export const caseStudies: CaseStudyItem[] = [
  {
    title: "Custom AI Assistant pentru servicii de arhivare și digitalizare",
    overview: [
      "Am dezvoltat o soluție AI pentru o companie din domeniul arhivării și digitalizării documentelor, cu scopul de a automatiza comunicarea inițială cu vizitatorii website-ului.",
      "Asistentul virtual răspunde la întrebări frecvente despre servicii precum arhivarea documentelor, digitalizarea, depozitarea, îndosarierea și distrugerea securizată a documentelor. În același timp, acesta colectează date relevante de la utilizatori și îi direcționează către o consultație gratuită.",
    ],
    objective:
      "Reducerea întrebărilor repetitive gestionate manual și îmbunătățirea experienței vizitatorilor prin răspunsuri rapide, clare și disponibile direct pe website.",
    problem:
      "Întrebările repetitive despre arhivare, digitalizare, depozitare, îndosariere și distrugere securizată erau gestionate manual în comunicarea inițială.",
    solution:
      "A fost integrat un asistent AI pe website, configurat să ofere informații generale despre servicii, să evite răspunsurile comerciale sensibile și să trimită lead-urile către echipa responsabilă.",
    benefit:
      "Soluția ajută compania să economisească timp, să răspundă mai rapid potențialilor clienți și să transforme vizitatorii interesați în lead-uri mai bine structurate.",
    impact:
      "Vizitatorii primesc răspunsuri rapide, clare și disponibile direct pe website, iar lead-urile ajung structurate către echipa responsabilă.",
    features: [
      "răspunsuri automate la întrebări frecvente",
      "colectare nume, email, telefon și nevoi specifice",
      "calificare lead-uri",
      "direcționare către consultație gratuită",
      "integrare directă pe website",
    ],
    icon: "database",
  },
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
    solution: "Asistentul livreaza raspunsuri standardizate si preia datele necesare pentru o programare initiala.",
    benefit: "Front desk-ul primeste solicitari mai clare si poate prioritiza corect cazurile.",
    impact: "Raspuns initial sub 10 secunde pentru interactiunile uzuale.",
    icon: "health",
  },
  {
    title: "Companie B2B cu cereri de oferta",
    problem: "Cererea comerciala ajunge frecvent incompleta, fara specificatii sau context suficient.",
    solution: "Asistentul cere datele tehnice esentiale, valideaza formularul si trimite cererea structurata.",
    benefit: "Echipa comerciala lucreaza cu context mai bun, iar lead-ul este calificat mai rapid.",
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

export const faqItems: FaqItem[] = [
  {
    question: "Ce poate face asistentul virtual pentru clientii mei?",
    answer:
      "Poate prelua primele discutii, poate raspunde la intrebarile frecvente si poate ghida prospectul catre oferta, demo sau contact. Cand cineva este interesat, asistentul colecteaza datele esentiale si le trimite mai departe intr-o forma pregatita pentru vanzare. Astfel, clientul primeste raspuns rapid, iar echipa ta incepe conversatia cu mai mult context.",
  },
  {
    question: "Raspunde si in afara programului de lucru?",
    answer:
      "Da. Asistentul poate ramane activ 24/7, inclusiv seara sau in weekend, pentru raspunsuri initiale si preluare de solicitari. Nu inlocuieste complet echipa umana in cazurile sensibile, dar evita situatia in care clientul nu primeste nimic pana a doua zi. In plus, mesajele si datele colectate pot fi pastrate pentru follow-up atunci cand echipa reintra in program.",
  },
  {
    question: "Ma ajuta sa obtin mai multe cereri de oferta?",
    answer:
      "Da, pentru ca discutia nu ramane la nivel general. Asistentul poate cere nume, companie, tipul nevoii, buget orientativ sau obiectivul proiectului, astfel incat cererea sa ajunga mai bine structurata. Asta inseamna mai putine mesaje de clarificare si sanse mai bune ca echipa ta sa raspunda rapid cu o oferta relevanta.",
  },
  {
    question: "Poate asistentul sa pregateasca o programare pentru demo?",
    answer:
      "Da. Poate intreba cine solicita demo-ul, ce vrea sa vada, ce interval prefera si cum poate fi contactat. In loc sa primesti un mesaj scurt de tipul \"vreau o prezentare\", echipa ta primeste o solicitare mai clara si poate pregati discutia in mod profesionist. Rezultatul este un demo mai bine organizat si un timp mai mic pierdut pe clarificari.",
  },
  {
    question: "Ce se intampla daca un client are o intrebare mai complexa?",
    answer:
      "Cand intrebarea depaseste zona de FAQ, asistentul nu inventeaza raspunsuri. Colecteaza problema concreta, nivelul de urgenta si datele de contact, apoi directioneaza cazul catre persoana sau echipa potrivita. In acest fel, clientul primeste o experienta serioasa, iar colegii tai primesc contextul necesar pentru a continua.",
  },
  {
    question: "Datele trimise de clienti sunt tratate cu grija?",
    answer:
      "Da. Fluxul poate fi configurat astfel incat sa ceara doar datele necesare pentru raspuns, demo sau oferta, nu mai mult. Datele pot fi validate, transmise controlat catre echipa si pastrate intr-un cadru clar de acces si responsabilitate. Pe scurt, scopul este conversie mai buna fara colectare inutila.",
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
        text: "Da. Produsul este gandit pentru embed web, iar ca extensie poate sustine si canale precum WhatsApp sau Facebook.",
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
  "produs AI principal": "main AI product",
  "Custom AI Assistant preia intrebari, califica lead-uri si arata valoarea inainte de oferta.": "Custom AI Assistant handles questions, qualifies leads, and shows value before the offer.",
  "pachet vandut mai clar": "clearer product package",
  "AI Assistant, Website Builder si Hosting sunt prezentate ca produse concrete pentru client.": "AI Assistant, Website Builder, and Hosting are presented as concrete products for the client.",
  "demo disponibil permanent": "always-on demo",
  "Butonul Try me transforma pagina intr-o demonstratie live pentru best seller.": "The Try me button turns the page into a live demo for the best seller.",
  "prim contact pentru cumparare": "first contact for purchase",
  "Vizitatorul intelege rapid produsul, pretul si urmatorul pas catre oferta.": "The visitor quickly understands the product, price, and next step toward the offer.",
  "Oferta si lead capture": "Offer and Lead Capture",
  "Fluxul transforma interesul pentru Custom AI Assistant in cereri clare, cu date utile pentru oferta.": "The flow turns interest in Custom AI Assistant into clear requests, with useful data for the offer.",
  "Cereri pregatite": "Prepared requests",
  "Colecteaza nume, email, telefon si obiectiv in aceeasi interactiune.": "Collects name, email, phone, and goal in the same interaction.",
  "Valideaza datele inainte ca cererea sa ajunga la echipa.": "Validates data before the request reaches the team.",
  "Clasifica intentia pentru oferta, demo, suport sau pachet complet.": "Classifies intent for offer, demo, support, or complete package.",
  "Best seller AI Assistant": "Best Seller AI Assistant",
  "Produsul principal raspunde instant, explica oferta si muta clientul catre demo, contact sau cumparare.": "The main product replies instantly, explains the offer, and moves the client toward demo, contact, or purchase.",
  "Produs demonstrabil": "Demo-ready product",
  "Livreaza raspunsuri bazate pe oferta si baza de cunostinte.": "Delivers replies based on the offer and knowledge base.",
  "Califica intentia prin intrebari scurte, utile pentru vanzare.": "Qualifies intent through short questions that are useful for sales.",
  "Propune CTA relevante: Try me, oferta, contact sau cos.": "Suggests relevant CTAs: Try me, offer, contact, or cart.",
  "Pachet complet": "Complete Package",
  "Website Builder, Hosting si automatizarile extind produsul AI intr-o oferta completa pentru client.": "Website Builder, Hosting, and automations extend the AI product into a complete client offer.",
  "Oferta extinsa": "Extended offer",
  "Trimite solicitarile catre vanzari sau follow-up.": "Routes requests to sales or follow-up.",
  "Pregateste payload-uri pentru CRM, email sau estimare.": "Prepares payloads for CRM, email, or estimation.",
  "Pastreaza trasabilitatea pentru analiza comerciala.": "Keeps traceability for commercial analysis.",
  "Custom AI Assistant": "Custom AI Assistant",
  "Produsul principal SyntraFlow: asistentul care raspunde instant si ajuta clientul sa ajunga la oferta.": "SyntraFlow's main product: the assistant that replies instantly and helps the client reach the offer.",
  "Best seller": "Best seller",
  "Try me live": "Try me live",
  "Lead-uri pentru vanzare": "Sales-ready leads",
  "Ideal pentru clientii care vor un produs AI usor de demonstrat si vandut.": "Ideal for clients who want an AI product that is easy to demo and sell.",
  "Add-on lead capture": "Lead Capture Add-on",
  "Colecteaza datele necesare pentru o oferta mai rapida si un follow-up mai clar.": "Collects the data needed for a faster offer and clearer follow-up.",
  "Cereri complete": "Complete requests",
  "Potrivit pentru clienti care vor ca produsul AI sa pregateasca cererea de oferta.": "Well suited for clients who want the AI product to prepare quote requests.",
  "FAQ pentru produsul AI": "FAQ for the AI Product",
  "Baza de cunostinte sustine raspunsuri rapide despre produse, preturi, demo si urmatorul pas.": "The knowledge base supports quick replies about products, prices, demos, and the next step.",
  "Mai putine ezitari": "Less hesitation",
  "Util pentru clientii care primesc multe intrebari inainte de cumparare.": "Useful for clients who receive many questions before purchase.",
  "Cerere oferta pentru AI Assistant": "Quote Request for AI Assistant",
  "Traseu ghidat pentru clienti care vor pret, demo sau recomandarea produsului potrivit.": "A guided path for clients who want a price, demo, or the right product recommendation.",
  "Recomandat cand vrei sa vinzi produsul rapid, cu date utile de la inceput.": "Recommended when you want to sell the product quickly, with useful data from the start.",
  "Demo pentru best seller": "Demo for the Best Seller",
  "CTA-uri dedicate pentru prezentarea Custom AI Assistant si pregatirea discutiei comerciale.": "Dedicated CTAs for presenting Custom AI Assistant and preparing the sales conversation.",
  "Util pentru clienti care trebuie sa vada produsul in actiune inainte de cumparare.": "Useful for clients who need to see the product in action before purchase.",
  "Integrare CRM pentru vanzare": "CRM Integration for Sales",
  "Cererea pornita din asistent poate ajunge in email, CRM sau alt sistem de follow-up.": "A request started in the assistant can reach email, CRM, or another follow-up system.",
  "Potrivit pentru echipe care vor sa transforme demo-ul in oferta si cumparare.": "Well suited for teams that want to turn demos into offers and purchases.",
  "Suport automatizat pentru clienti": "Automated Customer Support",
  "Raspunsuri imediate si escaladare pentru clientii care au intrebari dupa ce vad produsul.": "Immediate replies and escalation for clients who have questions after seeing the product.",
  "Relevant pentru business-uri care vor sa vanda fara sa piarda timp in intrebari repetitive.": "Relevant for businesses that want to sell without losing time on repetitive questions.",
  "Clientul cumpara AI Assistant pentru cereri tehnice, disponibilitate si oferte preluate intr-un flux standardizat.": "The client buys AI Assistant for technical requests, availability, and offers handled in a standardized flow.",
  "Produsul reduce timpul de pre-calificare si pregateste contextul pentru vanzari sau echipa tehnica.": "The product reduces pre-qualification time and prepares context for sales or the technical team.",
  "AI Assistant centralizeaza intrebarile recurente, urgenta solicitarii si tipul de interventie necesar.": "AI Assistant centralizes recurring questions, request urgency, and the required type of intervention.",
  "Oferta devine mai usor de vandut pentru echipe care pierd timp in coordonare.": "The offer becomes easier to sell to teams that lose time in coordination.",
  "Produsul raspunde la intrebari despre oferta, livrare, stoc si directioneaza clientul catre pasul urmator.": "The product answers questions about the offer, delivery, and stock, then guides the client to the next step.",
  "Creste increderea in cumparare si reduce presiunea pe suportul uman.": "It increases purchase confidence and reduces pressure on human support.",
  "AI Assistant ghideaza pacientii catre specialitati, programari si intrebari preliminare cu mai putina frictiune.": "AI Assistant guides patients toward specialties, appointments, and preliminary questions with less friction.",
  "Clientul vede rapid valoarea: programari mai clare si raspuns initial mai bun.": "The client quickly sees the value: clearer appointments and a better first reply.",
  "Produsul poate prelua intrebari despre rezervari, program, meniu si evenimente private.": "The product can handle questions about reservations, schedule, menu, and private events.",
  "Este usor de vandut pentru businessuri care vor rezervari si mai putine apeluri repetitive.": "It is easy to sell to businesses that want bookings and fewer repetitive calls.",
  "AI Assistant structureaza cereri de transport, status si intrebari operationale intr-un flux clar.": "AI Assistant structures transport requests, status, and operational questions into a clear flow.",
  "Oferta creeaza un punct unic de preluare pentru solicitari repetitive si urgente.": "The offer creates one intake point for repetitive and urgent requests.",
  "Custom AI Assistant creste calitatea lead-urilor si standardizeaza contactul de pre-vanzare.": "Custom AI Assistant improves lead quality and standardizes pre-sales contact.",
  "Vizitatorul vede produsul": "The visitor sees the product",
  "Pagina prezinta Custom AI Assistant ca best seller, cu pret, beneficiu si CTA clar.": "The page presents Custom AI Assistant as the best seller, with price, benefit, and a clear CTA.",
  "Mesajul reduce ezitarea si arata rapid ce cumpara clientul.": "The message reduces hesitation and quickly shows what the client is buying.",
  "Try me demonstreaza valoarea": "Try me proves the value",
  "Asistentul raspunde live si transforma pagina intr-o prezentare interactiva.": "The assistant replies live and turns the page into an interactive presentation.",
  "Clientul vede produsul in actiune inainte de oferta.": "The client sees the product in action before the offer.",
  "Cerere pregatita": "Prepared request",
  "Fluxul strange nume, email, telefon, companie si obiectivul clientului.": "The flow gathers name, email, phone, company, and the client's goal.",
  "Campurile sunt adaptate la produsul cerut si la nivelul de intentie.": "Fields adapt to the requested product and intent level.",
  "Validare pentru oferta": "Offer validation",
  "Datele sunt verificate rapid si solicitarea ajunge pe fluxul potrivit.": "Data is checked quickly and the request reaches the right flow.",
  "Regulile simple reduc erorile si pregatesc un raspuns comercial mai bun.": "Simple rules reduce errors and prepare a better sales reply.",
  "Rutare catre vanzare": "Routing to sales",
  "Follow-up pentru cumparare": "Purchase follow-up",
  "Clientul primeste confirmare, iar echipa are un punct clar de actiune.": "The client receives confirmation, and the team has a clear action point.",
  "Fluxul ramane masurabil de la interes pana la oferta.": "The flow remains measurable from interest to offer.",
  "Produs principal clar": "Clear main product",
  "Custom AI Assistant este prezentat ca best seller, cu demo live si urmator pas usor de inteles.": "Custom AI Assistant is presented as the best seller, with a live demo and an easy-to-understand next step.",
  "Oferta usor de vandut": "Easy-to-sell offer",
  "Experienta care vinde": "Experience that sells",
  "Drum scurt spre oferta": "Short path to offer",
  "Website Builder si Hosting pot fi vandute impreuna cu AI Assistant cand clientul vrea lansare completa.": "Website Builder and Hosting can be sold together with AI Assistant when the client wants a complete launch.",
  "AI plus website plus hosting": "AI plus website plus hosting",
  "Valoare comerciala": "Commercial value",
  "Platforma arata cum produsul AI, automatizarea si interfata premium pot genera cereri reale.": "The platform shows how the AI product, automation, and premium interface can generate real requests.",
  "Vanzare mai coerenta": "More coherent sales",
  "raspuns initial automatizat": "automated first response",
  "Solicitarile repetitive pot fi preluate instant si rutate coerent catre echipa potrivita.": "Repetitive requests can be handled instantly and routed consistently to the right team.",
  "mai multe lead-uri calificate": "more qualified leads",
  "Conversatiile ghidate colecteaza date complete si reduc pierderea oportunitatilor comerciale.": "Guided conversations collect complete data and reduce lost commercial opportunities.",
  "disponibilitate digitala": "digital availability",
  "Platforma ramane activa pentru clienti, parteneri si solicitari de demo in afara programului.": "The platform stays active for customers, partners, and demo requests outside working hours.",
  "timp mediu de preluare": "average response time",
  "Primul contact incepe rapid, cu raspuns contextual si traseu orientat spre conversie.": "First contact starts quickly, with contextual replies and a conversion-oriented path.",
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
  "Califica intentia prin intrebari scurte si utile pentru vanzare.": "Qualifies intent through short questions that are useful for sales.",
  "Propune CTA relevante: oferta, consultanta sau escaladare catre operator.": "Suggests relevant CTAs: quote, consultation, or escalation to an operator.",
  "Orchestrare operationala": "Operational Orchestration",
  "Fiecare conversatie poate declansa automat notificari, emailuri de follow-up si actualizari in sisteme interne.": "Each conversation can automatically trigger notifications, follow-up emails, and updates in internal systems.",
  "Fluxuri fara blocaje": "Frictionless workflows",
  "Trimite solicitari catre rolul intern potrivit.": "Routes requests to the right internal role.",
  "Pregateste payload-uri pentru CRM, email sau ticketing.": "Prepares payloads for CRM, email, or ticketing.",
  "Pastreaza trasabilitatea fiecarei interactiuni pentru analiza.": "Keeps each interaction traceable for analysis.",
  "Asistent virtual AI": "AI Assistant",
  "Interfata conversationala care raspunde instant si muta intentia catre actiunea potrivita.": "A conversational interface that replies instantly and moves intent toward the right action.",
  "Disponibilitate permanenta": "Always available",
  "Raspuns coerent": "Consistent answers",
  "Experienta premium pentru lead": "Premium lead experience",
  "Ideal pentru preluarea intrebarilor introductive si calificarea prospectilor noi.": "Ideal for handling first questions and qualifying new prospects.",
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
  "Reduce timpul de pre-calificare si pregateste contextul pentru echipele comerciale sau tehnice.": "Reduces pre-qualification time and prepares context for commercial or technical teams.",
  "Servicii tehnice": "Technical Services",
  "Centralizeaza intrebarile recurente, urgenta solicitarii si tipul de interventie necesar.": "Centralizes recurring questions, request urgency, and the required type of intervention.",
  "Scade timpul de coordonare si ajuta la distribuirea corecta a cazurilor.": "Reduces coordination time and helps route cases correctly.",
  "Retail": "Retail",
  "Raspunde la intrebari despre produse, livrare, stoc si directioneaza clientul catre pasul urmator.": "Answers questions about products, delivery, and stock, then guides the customer to the next step.",
  "Imbunatateste experienta digitala si reduce presiunea pe suportul uman.": "Improves the digital experience and reduces pressure on human support teams.",
  "Clinici": "Clinics",
  "Ghideaza pacientii catre specialitati, programari si mesaje preliminare cu mai putina frictiune.": "Guides patients toward specialties, appointments, and preliminary messages with less friction.",
  "Optimizeaza interactiunea initiala si pastreaza claritatea fluxului de programare.": "Optimizes the first interaction and keeps the booking flow clear.",
  "HoReCa": "Hospitality",
  "Poate prelua intrebari despre rezervari, program, meniu si evenimente private.": "Can handle questions about reservations, schedule, menu, and private events.",
  "Reduce apelurile repetitive si accelereaza conversia solicitarilor in rezervari.": "Reduces repetitive calls and speeds up the conversion of requests into bookings.",
  "Logistica": "Logistics",
  "Structurarea cererilor de transport, status si intrebari operationale intr-un flux clar.": "Structures transport requests, status questions, and operational inquiries in a clear flow.",
  "Creeaza un punct unic de preluare pentru solicitari repetitive si urgente.": "Creates a single intake point for repetitive and urgent requests.",
  "Companii B2B": "B2B Companies",
  "Filtreaza intentia comerciala, pregateste briefingul si accelereaza handoff-ul catre sales.": "Filters commercial intent, prepares the briefing, and speeds up the handoff to sales.",
  "Creste calitatea lead-urilor si standardizeaza contactul de pre-vanzare.": "Improves lead quality and standardizes pre-sales contact.",
  "Intrebare initiala": "Initial Question",
  "Prospectul porneste conversatia din website sau dintr-un canal digital conectat.": "The prospect starts the conversation from the website or another connected digital channel.",
  "Prompturile ghidate reduc ambiguitatea si accelereaza intentia.": "Guided prompts reduce ambiguity and speed up intent capture.",
  "Raspuns contextual": "Contextual Reply",
  "Asistentul livreaza un raspuns bazat pe FAQ, reguli de business si continut de referinta.": "The assistant delivers a reply based on FAQ content, business rules, and reference information.",
  "Se pot afisa si recomandari pentru pasii urmatori.": "It can also display recommendations for the next steps.",
  "Colectare date": "Data Collection",
  "Sunt cerute datele necesare: nume, email, telefon, companie si tipul solicitarii.": "The required data is collected: name, email, phone, company, and request type.",
  "Campurile sunt adaptate la contextul conversatiei.": "Fields are adapted to the context of the conversation.",
  "Validare si clasificare": "Validation and Classification",
  "Datele sunt validate rapid si solicitarea ajunge pe fluxul potrivit.": "Data is validated quickly and the request reaches the right flow.",
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
  "Prospectii primesc raspunsuri si CTA-uri relevante fara sa fie blocati in formulare rigide.": "Prospects receive relevant replies and CTAs without getting stuck in rigid forms.",
  "Interactiuni ghidate": "Guided Interactions",
  "Scalare fara frictiune": "Frictionless Scaling",
  "Platforma poate prelua volume mai mari fara crestere proportionala a efortului uman.": "The platform can handle higher volumes without a proportional increase in human effort.",
  "Cost operational optimizat": "Optimized Operating Cost",
  "Valoare practica si operationala": "Practical Business Value",
  "Platforma arata cum UI-ul premium, automatizarea si orchestrarea digitala pot accelera servicii reale.": "The platform shows how premium UI, automation, and digital orchestration can accelerate real services.",
  "Servicii optimizate": "Optimized Services",
  "Custom AI Assistant pentru servicii de arhivare și digitalizare": "Custom AI Assistant for archiving and document digitization services",
  "Am dezvoltat o soluție AI pentru o companie din domeniul arhivării și digitalizării documentelor, cu scopul de a automatiza comunicarea inițială cu vizitatorii website-ului.": "We developed an AI solution for a company in the archiving and document digitization sector, with the goal of automating the first communication with website visitors.",
  "Asistentul virtual răspunde la întrebări frecvente despre servicii precum arhivarea documentelor, digitalizarea, depozitarea, îndosarierea și distrugerea securizată a documentelor. În același timp, acesta colectează date relevante de la utilizatori și îi direcționează către o consultație gratuită.": "The virtual assistant answers frequently asked questions about services such as document archiving, digitization, storage, filing, and secure document destruction. At the same time, it collects relevant user data and directs visitors toward a free consultation.",
  "Reducerea întrebărilor repetitive gestionate manual și îmbunătățirea experienței vizitatorilor prin răspunsuri rapide, clare și disponibile direct pe website.": "Reducing manually handled repetitive questions and improving the visitor experience through fast, clear answers available directly on the website.",
  "Întrebările repetitive despre arhivare, digitalizare, depozitare, îndosariere și distrugere securizată erau gestionate manual în comunicarea inițială.": "Repetitive questions about archiving, digitization, storage, filing, and secure destruction were handled manually during the first interaction.",
  "A fost integrat un asistent AI pe website, configurat să ofere informații generale despre servicii, să evite răspunsurile comerciale sensibile și să trimită lead-urile către echipa responsabilă.": "An AI assistant was integrated into the website and configured to provide general service information, avoid sensitive commercial replies, and send leads to the responsible team.",
  "Soluția ajută compania să economisească timp, să răspundă mai rapid potențialilor clienți și să transforme vizitatorii interesați în lead-uri mai bine structurate.": "The solution helps the company save time, respond faster to potential clients, and turn interested visitors into better-structured leads.",
  "Vizitatorii primesc răspunsuri rapide, clare și disponibile direct pe website, iar lead-urile ajung structurate către echipa responsabilă.": "Visitors receive fast, clear answers directly on the website, while leads reach the responsible team in a structured format.",
  "răspunsuri automate la întrebări frecvente": "automatic answers to frequently asked questions",
  "colectare nume, email, telefon și nevoi specifice": "collection of name, email, phone, and specific needs",
  "calificare lead-uri": "lead qualification",
  "direcționare către consultație gratuită": "routing toward a free consultation",
  "integrare directă pe website": "direct website integration",
  "Restaurant cu rezervari si intrebari frecvente": "Restaurant with Reservations and FAQs",
  "Personalul pierde timp cu apeluri repetitive despre program, rezervari si evenimente.": "Staff lose time on repetitive calls about schedule, reservations, and events.",
  "Asistentul preia intrebarile uzuale, colecteaza detalii despre rezervare si directioneaza cererile speciale.": "The assistant handles common questions, collects booking details, and routes special requests.",
  "Mai putine intreruperi pentru echipa din locatie si o experienta mai rapida pentru client.": "Fewer interruptions for the on-site team and a faster experience for the customer.",
  "Pana la 40% reducere a solicitarilor repetitive pe canalele clasice.": "Up to 40% fewer repetitive requests through traditional channels.",
  "Clinica pentru programari si informare preliminara": "Clinic for Appointments and First Information",
  "Pacientii au nevoie de raspuns rapid privind specialitati, documente si sloturi disponibile.": "Patients need quick answers about specialties, documents, and available slots.",
  "Asistentul livreaza raspunsuri standardizate si preia datele necesare pentru o programare initiala.": "The assistant delivers standardized replies and collects the details needed for an initial appointment.",
  "Front desk-ul primeste solicitari mai clare si poate prioritiza corect cazurile.": "The front desk receives clearer requests and can prioritize cases correctly.",
  "Raspuns initial sub 10 secunde pentru interactiunile uzuale.": "First response in under 10 seconds for common interactions.",
  "Companie B2B cu cereri de oferta": "B2B Company with Quote Requests",
  "Cererea comerciala ajunge frecvent incompleta, fara specificatii sau context suficient.": "Commercial requests often arrive incomplete, without enough specifications or context.",
  "Asistentul cere datele tehnice esentiale, valideaza formularul si trimite cererea structurata.": "The assistant asks for essential technical details, validates the form, and sends a structured request.",
  "Echipa comerciala lucreaza cu context mai bun, iar lead-ul este calificat mai rapid.": "The sales team works with better context, and the lead is qualified faster.",
  "Reducere semnificativa a timpului de clarificare in faza de pre-sales.": "A significant reduction in clarification time during the pre-sales stage.",
  "Business online cu intrebari repetitive": "Online Business with Repetitive Questions",
  "Suportul este incarcat de intrebari identice privind livrare, retur si functionalitati.": "Support teams are overloaded with identical questions about delivery, returns, and features.",
  "FAQ-ul inteligent si escaladarea pe exceptii reduc volumul de conversatii gestionate manual.": "The smart FAQ and exception-based escalation reduce the number of conversations handled manually.",
  "Clientii primesc raspuns imediat, iar echipa umana se concentreaza pe cazuri cu valoare mare.": "Customers get immediate answers, while the human team focuses on high-value cases.",
  "Crestere a satisfactiei percepute si timp de raspuns mai predictibil.": "Higher perceived satisfaction and more predictable response times.",
  "Experienta de conversie": "Conversion Experience",
  "Primul contact trebuie sa arate premium, sa inspire incredere si sa impinga intentia spre actiune.": "First contact must feel premium, build trust, and push intent toward action.",
  "Pagini orientate spre conversie": "Conversion-oriented pages",
  "Actiuni clare pentru prospect": "Clear actions for prospects",
  "Formulare rapide": "Fast forms",
  "Gestionarea solicitarilor": "Request Handling",
  "Solicitarea este preluata intr-un format clar, verificata si trimisa catre echipa potrivita.": "The request is captured in a clear format, checked, and sent to the right team.",
  "Preluare clara a cererii": "Clear request intake",
  "Verificarea datelor importante": "Checking important data",
  "Trimitere catre persoana potrivita": "Sent to the right person",
  "Inteligenta conversationala": "Conversational Intelligence",
  "Asistentul raspunde rapid, pune intrebarile potrivite si duce prospectul mai aproape de demo sau oferta.": "The assistant replies fast, asks the right questions, and moves the prospect closer to a demo or quote.",
  "Raspunsuri rapide": "Fast replies",
  "Calificare scurta": "Short qualification",
  "Escaladare cand intentia este valoroasa": "Escalation when intent is valuable",
  "Baza de cunostinte comerciale": "Commercial Knowledge Base",
  "Aici stau mesajele, regulile si raspunsurile care pastreaza promisiunea brandului coerenta.": "This is where the messages, rules, and replies keep the brand promise consistent.",
  "Mesaje usor de actualizat": "Easy-to-update messages",
  "Ton unitar": "Unified tone",
  "Raspunsuri stabile": "Stable answers",
  "Integrari": "Integrations",
  "Datele colectate pot merge mai departe catre email, CRM sau alte sisteme folosite in companie.": "Collected data can move further to email, CRM, or other systems used in the company.",
  "Trimitere catre email sau CRM": "Sent to email or CRM",
  "Notificari automate": "Automated notifications",
  "Legatura cu alte sisteme": "Connection with other systems",
  "Analiza, securitate si conformitate": "Analytics, Security, and Compliance",
  "Platforma poate urmari ce functioneaza si poate proteja datele folosite in conversatii.": "The platform can track what works and can protect the data used in conversations.",
  "Vizibilitate asupra interactiunilor": "Visibility into interactions",
  "Colectare limitata de date": "Limited data collection",
  "Acces controlat": "Controlled access",
  "Ce poate face asistentul virtual pentru clientii mei?": "What can the virtual assistant do for my customers?",
  "Poate prelua primele discutii, poate raspunde la intrebarile frecvente si poate ghida prospectul catre oferta, demo sau contact. Cand cineva este interesat, asistentul colecteaza datele esentiale si le trimite mai departe intr-o forma pregatita pentru vanzare. Astfel, clientul primeste raspuns rapid, iar echipa ta incepe conversatia cu mai mult context.": "It can handle the first conversations, answer common questions, and guide the prospect toward a quote, demo, or contact. When someone is interested, the assistant collects the essential details and sends them forward in a sales-ready format. This gives the customer a fast reply and gives your team more context from the start.",
  "Raspunde si in afara programului de lucru?": "Does it also answer outside business hours?",
  "Da. Asistentul poate ramane activ 24/7, inclusiv seara sau in weekend, pentru raspunsuri initiale si preluare de solicitari. Nu inlocuieste complet echipa umana in cazurile sensibile, dar evita situatia in care clientul nu primeste nimic pana a doua zi. In plus, mesajele si datele colectate pot fi pastrate pentru follow-up atunci cand echipa reintra in program.": "Yes. The assistant can stay active 24/7, including evenings and weekends, to provide first replies and capture requests. It does not fully replace the human team in sensitive cases, but it avoids situations where the customer receives nothing until the next day. The collected messages and data can also be kept for follow-up when your team is back online.",
  "Ma ajuta sa obtin mai multe cereri de oferta?": "Can it help me get more quote requests?",
  "Da, pentru ca discutia nu ramane la nivel general. Asistentul poate cere nume, companie, tipul nevoii, buget orientativ sau obiectivul proiectului, astfel incat cererea sa ajunga mai bine structurata. Asta inseamna mai putine mesaje de clarificare si sanse mai bune ca echipa ta sa raspunda rapid cu o oferta relevanta.": "Yes, because the conversation does not stay at a vague level. The assistant can ask for the name, company, type of need, approximate budget, or project goal so the request arrives in a better-structured form. That means fewer clarification messages and better chances for your team to reply quickly with a relevant quote.",
  "Poate asistentul sa pregateasca o programare pentru demo?": "Can the assistant prepare a demo booking?",
  "Da. Poate intreba cine solicita demo-ul, ce vrea sa vada, ce interval prefera si cum poate fi contactat. In loc sa primesti un mesaj scurt de tipul \"vreau o prezentare\", echipa ta primeste o solicitare mai clara si poate pregati discutia in mod profesionist. Rezultatul este un demo mai bine organizat si un timp mai mic pierdut pe clarificari.": "Yes. It can ask who is requesting the demo, what they want to see, which time slot they prefer, and how they want to be contacted. Instead of receiving a short message like 'I want a presentation', your team receives a clearer request and can prepare the discussion professionally. The result is a better organized demo and less time wasted on clarification.",
  "Ce se intampla daca un client are o intrebare mai complexa?": "What happens if a customer has a more complex question?",
  "Cand intrebarea depaseste zona de FAQ, asistentul nu inventeaza raspunsuri. Colecteaza problema concreta, nivelul de urgenta si datele de contact, apoi directioneaza cazul catre persoana sau echipa potrivita. In acest fel, clientul primeste o experienta serioasa, iar colegii tai primesc contextul necesar pentru a continua.": "When the question goes beyond FAQ territory, the assistant does not invent answers. It collects the concrete issue, urgency level, and contact details, then routes the case to the right person or team. This gives the customer a serious experience and gives your colleagues the context needed to continue.",
  "Datele trimise de clienti sunt tratate cu grija?": "Are customer-submitted data handled carefully?",
  "Da. Fluxul poate fi configurat astfel incat sa ceara doar datele necesare pentru raspuns, demo sau oferta, nu mai mult. Datele pot fi validate, transmise controlat catre echipa si pastrate intr-un cadru clar de acces si responsabilitate. Pe scurt, scopul este conversie mai buna fara colectare inutila.": "Yes. The flow can be configured to ask only for the data needed for a reply, demo, or quote, and nothing more. Data can be validated, sent to the team in a controlled way, and kept within a clear access and responsibility model. In short, the goal is better conversion without unnecessary collection.",
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
  "Da. Produsul este gandit pentru embed web, iar ca extensie poate sustine si canale precum WhatsApp sau Facebook.": "Yes. The product is designed for web embed and, as an extension, can support channels like WhatsApp or Facebook.",
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
    overview: item.overview ? translateTextList(item.overview, locale) : undefined,
    objective: item.objective ? translateSiteText(item.objective, locale) : undefined,
    problem: translateSiteText(item.problem, locale),
    solution: translateSiteText(item.solution, locale),
    benefit: translateSiteText(item.benefit, locale),
    impact: translateSiteText(item.impact, locale),
    features: item.features ? translateTextList(item.features, locale) : undefined,
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

export function getArchitectureLayers(_locale: Locale): ArchitectureLayerItem[] {
  return architectureLayers;
}

export function getSiteData(locale: Locale) {
  return {
    stats: getStats(locale),
    solutionTabs: getSolutionTabs(locale),
    solutions: getSolutions(locale),
    architectureLayers: getArchitectureLayers(locale),
    industries: getIndustries(locale),
    workflowSteps: getWorkflowSteps(locale),
    benefits: getBenefits(locale),
    caseStudies: getCaseStudies(locale),
    faqItems: getFaqItems(locale),
    chatPresets: getChatPresets(locale),
  };
}
