"use client";

import { useMemo, useState } from "react";

import { useToast } from "@/components/providers/toast-provider";
import { Stepper } from "@/components/ui/stepper";
import { Tabs } from "@/components/ui/tabs";
import type { Locale } from "@/lib/i18n";

type ScenarioStep = {
  id: string;
  title: string;
  description: string;
  dataCollected: string[];
  destination: string;
};

type Scenario = {
  id: string;
  label: string;
  payload: Record<string, string | string[]>;
  steps: ScenarioStep[];
};

function getScenarios(locale: Locale): Scenario[] {
  if (locale === "en") {
    return [
      {
        id: "support",
        label: "Support",
        payload: {
          flow: "support",
          source: "website",
          fields: ["name", "email", "topic", "urgency_level"],
          destination: "support@company.local",
        },
        steps: [
          {
            id: "support-q1",
            title: "Intent detection",
            description: "The assistant determines whether the request is FAQ-level or requires real support.",
            dataCollected: ["Topic", "Category", "Urgency"],
            destination: "Knowledge base + support",
          },
          {
            id: "support-q2",
            title: "Context intake",
            description: "Only the minimum useful details are collected to avoid vague escalations.",
            dataCollected: ["Name", "Email", "Issue details"],
            destination: "Internal ticket",
          },
          {
            id: "support-q3",
            title: "Reply and handoff",
            description: "FAQ cases are resolved automatically, while exceptions are sent to an operator.",
            dataCollected: ["Conversation summary"],
            destination: "Support team",
          },
        ],
      },
      {
        id: "offer",
        label: "Quote",
        payload: {
          flow: "quote_request",
          source: "assistant",
          fields: ["name", "email", "phone", "company", "requirement"],
          destination: "sales@company.local",
        },
        steps: [
          {
            id: "offer-q1",
            title: "Lead qualification",
            description: "The visitor is guided through a short set of commercial questions.",
            dataCollected: ["Company", "Preferred channel", "Request type"],
            destination: "Sales pipeline",
          },
          {
            id: "offer-q2",
            title: "Data validation",
            description: "Essential details are verified to remove incomplete requests.",
            dataCollected: ["Email", "Phone", "Requirement"],
            destination: "Validated payload",
          },
          {
            id: "offer-q3",
            title: "Routing and confirmation",
            description: "The request is routed to sales and the follow-up is prepared.",
            dataCollected: ["Technical summary", "Priority level"],
            destination: "Sales team + email",
          },
        ],
      },
      {
        id: "demo",
        label: "Demo Booking",
        payload: {
          flow: "demo_booking",
          source: "website",
          fields: ["name", "company", "time_slot", "demo_goal"],
          destination: "consulting@company.local",
        },
        steps: [
          {
            id: "demo-q1",
            title: "Demo intent",
            description: "The assistant clarifies whether the user wants a business or technical demo.",
            dataCollected: ["Demo type", "Goal"],
            destination: "Demo flow",
          },
          {
            id: "demo-q2",
            title: "Initial booking",
            description: "The preferred time slot and contact person are collected.",
            dataCollected: ["Preferred slot", "Contact person"],
            destination: "Calendar / consulting",
          },
          {
            id: "demo-q3",
            title: "Flow confirmation",
            description: "The user receives confirmation, and the team gets the meeting context.",
            dataCollected: ["Agenda summary"],
            destination: "Confirmation email + consultant",
          },
        ],
      },
    ];
  }

  return [
    {
      id: "support",
      label: "Support",
      payload: {
        flow: "support",
        source: "website",
        fields: ["nume", "email", "tema", "nivel_urgenta"],
        destination: "support@companie.local",
      },
      steps: [
        {
          id: "support-q1",
          title: "Identificare intentie",
          description: "Asistentul determina daca solicitarea este FAQ sau suport real.",
          dataCollected: ["Tema", "Categorie", "Urgenta"],
          destination: "Knowledge base + suport",
        },
        {
          id: "support-q2",
          title: "Preluare context",
          description: "Sunt cerute detaliile minime pentru a evita escaladari vagi.",
          dataCollected: ["Nume", "Email", "Detaliu problema"],
          destination: "Ticket intern",
        },
        {
          id: "support-q3",
          title: "Raspuns si handoff",
          description: "FAQ-urile sunt rezolvate automat, exceptiile merg catre operator.",
          dataCollected: ["Rezumat conversatie"],
          destination: "Echipa suport",
        },
      ],
    },
    {
      id: "offer",
      label: "Oferta",
      payload: {
        flow: "quote_request",
        source: "assistant",
        fields: ["nume", "email", "telefon", "companie", "cerinta"],
        destination: "sales@companie.local",
      },
      steps: [
        {
          id: "offer-q1",
          title: "Calificare lead",
          description: "Vizitatorul este ghidat printr-un set scurt de intrebari comerciale.",
          dataCollected: ["Companie", "Canal dorit", "Tip solicitare"],
          destination: "Sales pipeline",
        },
        {
          id: "offer-q2",
          title: "Validare date",
          description: "Datele esentiale sunt verificate pentru a elimina cererile incomplete.",
          dataCollected: ["Email", "Telefon", "Cerinta"],
          destination: "Payload validat",
        },
        {
          id: "offer-q3",
          title: "Rutare si confirmare",
          description: "Solicitarea este transmisa catre sales si se pregateste follow-up-ul.",
          dataCollected: ["Rezumat tehnic", "Nivel prioritate"],
          destination: "Echipa comerciala + email",
        },
      ],
    },
    {
      id: "demo",
      label: "Programare demo",
      payload: {
        flow: "demo_booking",
        source: "website",
        fields: ["nume", "companie", "interval", "obiectiv_demo"],
        destination: "consulting@companie.local",
      },
      steps: [
        {
          id: "demo-q1",
          title: "Intentie de demo",
          description: "Asistentul clarifica daca utilizatorul doreste demo comercial sau tehnic.",
          dataCollected: ["Tip demo", "Obiectiv"],
          destination: "Flux demo",
        },
        {
          id: "demo-q2",
          title: "Programare preliminara",
          description: "Sunt preluate intervalul si persoana de contact.",
          dataCollected: ["Interval preferat", "Persoana de contact"],
          destination: "Calendar / consultanta",
        },
        {
          id: "demo-q3",
          title: "Confirmare traseu",
          description: "Utilizatorul primeste confirmare, iar echipa are contextul discutiei.",
          dataCollected: ["Rezumat agenda"],
          destination: "Email confirmare + consultant",
        },
      ],
    },
  ];
}

type AutomationScenarioExplorerProps = {
  locale?: Locale;
};

export function AutomationScenarioExplorer({
  locale = "ro",
}: AutomationScenarioExplorerProps) {
  const { pushToast } = useToast();
  const scenarios = useMemo(() => getScenarios(locale), [locale]);
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id ?? "");
  const [activeStepId, setActiveStepId] = useState(scenarios[0]?.steps[0]?.id ?? "");

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0],
    [activeScenarioId, scenarios],
  );

  const activeStep = useMemo(
    () => activeScenario.steps.find((step) => step.id === activeStepId) ?? activeScenario.steps[0],
    [activeScenario, activeStepId],
  );

  function handleScenarioChange(nextScenarioId: string) {
    const nextScenario = scenarios.find((scenario) => scenario.id === nextScenarioId) ?? scenarios[0];
    setActiveScenarioId(nextScenario.id);
    setActiveStepId(nextScenario.steps[0].id);
  }

  async function copyPayload() {
    await navigator.clipboard.writeText(JSON.stringify(activeScenario.payload, null, 2));
    pushToast({
      tone: "success",
      title: locale === "ro" ? "Payload copiat" : "Payload copied",
      description:
        locale === "ro"
          ? "JSON-ul demonstrativ a fost copiat in clipboard."
          : "The demo JSON payload was copied to the clipboard.",
    });
  }

  return (
    <div className="panel-surface reveal-section rounded-[2rem] p-6 md:p-8">
      <Tabs
        items={scenarios.map((scenario) => ({ id: scenario.id, label: scenario.label }))}
        activeId={activeScenario.id}
        onChange={handleScenarioChange}
        ariaLabel={locale === "ro" ? "Scenarii de automatizare" : "Automation scenarios"}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Stepper
          steps={activeScenario.steps.map((step) => ({
            id: step.id,
            title: step.title,
            description: step.description,
          }))}
          activeId={activeStep.id}
          onChange={setActiveStepId}
        />

        <div className="space-y-5">
          <div className="rounded-[1.75rem] bg-[#f4fbff] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Ce date se colecteaza" : "Data collected"}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[#0b1f35]">
              {activeStep.dataCollected.map((field) => (
                <li key={field} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#13b5ba]" />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_16px_40px_rgba(11,31,53,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Unde ajunge" : "Destination"}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#0d3358]">{activeStep.destination}</p>
          </div>

          <div className="rounded-[1.75rem] bg-[#0b1f35] p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/60">
                {locale === "ro" ? "Payload exemplu" : "Sample payload"}
              </p>
              <button
                type="button"
                className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white"
                onClick={copyPayload}
              >
                {locale === "ro" ? "Copiaza JSON" : "Copy JSON"}
              </button>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-[1.25rem] bg-white/6 p-4 text-xs leading-6 text-white/78">
              {JSON.stringify(activeScenario.payload, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
