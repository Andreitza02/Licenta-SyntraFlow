"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";

import { useToast } from "@/components/providers/toast-provider";
import type { Locale } from "@/lib/i18n";
import { buttonVariants, cn } from "@/lib/utils";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  website: string;
};

type FormErrors = Partial<Record<Exclude<keyof FormValues, "website">, string>>;

type ContactFormProps = {
  locale?: Locale;
};

type StepCardProps = {
  active: boolean;
  completed: boolean;
  description: string;
  index: number;
  onClick: () => void;
  title: string;
};

type FieldShellProps = {
  children: ReactNode;
  error?: string;
  helper: string;
  htmlFor: string;
  icon: ReactNode;
  label: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  interest: "",
  message: "",
  website: "",
};

function getInterestOptions(locale: Locale) {
  return locale === "ro"
    ? [
        "Asistent virtual AI",
        "Automatizare lead capture",
        "FAQ inteligent",
        "Programare demo / consultanta",
        "Integrare email / CRM",
        "Automatizare suport clienti",
      ]
    : [
        "AI Assistant",
        "Lead Capture Automation",
        "Smart FAQ",
        "Demo / consultation booking",
        "Email / CRM integration",
        "Customer support automation",
      ];
}

function formatRomanianPhone(input: string) {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  if (!digits) {
    return "";
  }

  const normalized = digits.startsWith("40") ? digits : `40${digits.startsWith("0") ? digits.slice(1) : digits}`;
  const groups = normalized.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,3})$/);

  if (!groups) {
    return `+${normalized}`;
  }

  return [groups[1], groups[2], groups[3], groups[4]].filter(Boolean).join(" ").replace(/^40/, "+40");
}

function formatPhoneInput(input: string, locale: Locale) {
  if (locale === "en") {
    return input.slice(0, 18);
  }

  return formatRomanianPhone(input);
}

function validateStep(values: FormValues, step: 1 | 2, locale: Locale) {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!values.name.trim()) {
      errors.name =
        locale === "ro"
          ? "Completeaza numele pentru a personaliza raspunsul."
          : "Complete the name field so the response can be personalized.";
    }

    if (!values.email.trim()) {
      errors.email =
        locale === "ro"
          ? "Adresa de email este necesara pentru follow-up."
          : "An email address is required for follow-up.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email =
        locale === "ro" ? "Foloseste un format de email valid." : "Use a valid email format.";
    }

    if (!values.phone.trim()) {
      errors.phone =
        locale === "ro"
          ? "Telefonul ajuta la confirmarea rapida a solicitarii."
          : "A phone number helps confirm the request quickly.";
    } else if (values.phone.replace(/\D/g, "").length < (locale === "ro" ? 11 : 7)) {
      errors.phone =
        locale === "ro"
          ? "Numarul pare incomplet. Format recomandat: +40 7xx xxx xxx."
          : "The phone number looks incomplete. Add a valid number for follow-up.";
    }

    if (!values.company.trim()) {
      errors.company =
        locale === "ro"
          ? "Compania ofera context pentru demo sau oferta."
          : "The company name adds useful context for the demo or quote.";
    }
  }

  if (step === 2) {
    if (!values.interest.trim()) {
      errors.interest =
        locale === "ro"
          ? "Selecteaza domeniul de interes pentru a ruta corect cererea."
          : "Select the area of interest so the request can be routed correctly.";
    }

    if (!values.message.trim()) {
      errors.message =
        locale === "ro"
          ? "Descrie pe scurt obiectivul sau problema pe care vrei sa o automatizezi."
          : "Briefly describe the goal or problem you want to automate.";
    } else if (values.message.trim().length < 24) {
      errors.message =
        locale === "ro"
          ? "Adauga putin mai mult context, minim 24 de caractere."
          : "Add a bit more context, at least 24 characters.";
    }
  }

  return errors;
}

function StepCard({ active, completed, description, index, onClick, title }: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group rounded-[1.5rem] border p-4 text-left transition duration-300",
        active
          ? "border-[#0f79ff]/24 bg-[linear-gradient(180deg,rgba(238,246,255,0.96),rgba(255,255,255,0.96))] shadow-[0_18px_34px_rgba(15,121,255,0.1)]"
          : "border-[#d8e6f4] bg-white/78 hover:-translate-y-1 hover:border-[#0f79ff]/16 hover:shadow-[0_18px_30px_rgba(11,31,53,0.08)]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border text-sm font-semibold transition duration-300",
            active || completed
              ? "border-[#0f79ff]/18 bg-[#0f79ff] text-white shadow-[0_12px_24px_rgba(15,121,255,0.18)]"
              : "border-[#d8e6f4] bg-[#f6fbff] text-[#0b58d0]",
          )}
        >
          {completed ? "✓" : index}
        </span>
        <span>
          <span className="block text-sm font-semibold text-[#0b1f35]">{title}</span>
          <span className="mt-1 block text-xs leading-6 text-muted">{description}</span>
        </span>
      </div>
    </button>
  );
}

function FieldShell({ children, error, helper, htmlFor, icon, label }: FieldShellProps) {
  return (
    <div
      className={cn(
        "contact-field-shell rounded-[1.55rem] border p-4 md:p-5",
        error
          ? "border-red-300 bg-red-50/80 shadow-[0_14px_28px_rgba(239,68,68,0.08)]"
          : "border-[#d8e6f4] bg-white/82 shadow-[0_14px_28px_rgba(11,31,53,0.04)]",
      )}
    >
      <label htmlFor={htmlFor} className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border",
            error ? "border-red-200 bg-white text-red-500" : "border-[#dceafb] bg-[#f5faff] text-[#0b58d0]",
          )}
        >
          {icon}
        </span>
        <span className="text-sm font-semibold text-[#0b1f35]">{label}</span>
      </label>
      <div className="mt-3 rounded-[1.2rem] border border-[#eef4fb] bg-white/94 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        {children}
      </div>
      <p className={cn("mt-3 text-xs leading-6", error ? "text-red-600" : "text-muted")}>{error ?? helper}</p>
    </div>
  );
}

export function ContactForm({ locale = "ro" }: ContactFormProps) {
  const { pushToast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const stepProgress = useMemo(() => (step === 1 ? "50%" : "100%"), [step]);
  const interestOptions = useMemo(() => getInterestOptions(locale), [locale]);
  const stepCards = locale === "ro"
    ? [
        {
          title: "Identitate si context",
          description: "Datele de baza pentru follow-up si personalizarea demo-ului.",
        },
        {
          title: "Interes si mesaj",
          description: "Obiectivul, tipul de flux si contextul companiei.",
        },
      ]
    : [
        {
          title: "Identity and context",
          description: "Core details for follow-up and demo personalization.",
        },
        {
          title: "Interest and message",
          description: "The goal, workflow type, and company context.",
        },
      ];
  const topHighlights = locale === "ro"
    ? [
        {
          label: "2 pasi",
          detail: "Parcurs clar pentru demo sau oferta",
        },
        {
          label: "Validare live",
          detail: "Campuri verificate inainte de trimitere",
        },
        {
          label: "Feedback vizual",
          detail: "Succes, eroare si progres afisate clar",
        },
      ]
    : [
        {
          label: "2 steps",
          detail: "A clear path for demo or quote requests",
        },
        {
          label: "Live validation",
          detail: "Fields checked before submission",
        },
        {
          label: "Visual feedback",
          detail: "Success, error, and progress shown clearly",
        },
      ];
  const messageLength = values.message.trim().length;

  useEffect(() => {
    setStep(1);
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  }, [locale]);

  function updateValue<K extends keyof FormValues>(field: K, nextValue: FormValues[K]) {
    const finalValue =
      field === "phone" ? (formatPhoneInput(String(nextValue), locale) as FormValues[K]) : nextValue;

    setValues((current) => ({ ...current, [field]: finalValue }));
    if (field !== "website") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    setStatus("idle");
  }

  function handleNext() {
    const nextErrors = validateStep(values, 1, locale);

    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      pushToast({
        tone: "error",
        title: locale === "ro" ? "Verifica datele de identitate" : "Check the identity details",
        description:
          locale === "ro"
            ? "Completeaza campurile obligatorii inainte de a trece la pasul urmator."
            : "Complete the required fields before moving to the next step.",
      });
      return;
    }

    setStep(2);
  }

  function navigateToStep(nextStep: 1 | 2) {
    if (nextStep === 1) {
      setStep(1);
      return;
    }

    handleNext();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (values.website.trim()) {
      setStatus("error");
      return;
    }

    const nextErrors = validateStep(values, 2, locale);

    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({ ...current, ...nextErrors }));
      pushToast({
        tone: "error",
        title: locale === "ro" ? "Mai sunt campuri de completat" : "Some fields still need attention",
        description:
          locale === "ro"
            ? "Adauga interesul si un mesaj clar pentru a putea simula trimiterea."
            : "Add the interest and a clear message so the submission can be simulated.",
      });
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setStatus("success");
    setValues(initialValues);
    setStep(1);
    pushToast({
      tone: "success",
      title: locale === "ro" ? "Solicitarea a fost simulata cu succes" : "The request was simulated successfully",
      description:
        locale === "ro"
          ? "Poti continua cu un demo sau poti explora scenariile de utilizare."
          : "You can continue with a demo or explore the use-case scenarios.",
    });
  }

  return (
    <div className="panel-surface contact-card-hover reveal-section relative overflow-hidden rounded-[2.25rem] p-6 md:p-8">
      <div className="contact-orb absolute -right-10 top-8 h-32 w-32 rounded-full bg-[#0f79ff]/10 blur-3xl" />
      <div className="contact-orb contact-orb-delay absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#13b5ba]/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? "Formular multi-step" : "Multi-step form"}
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-3xl">
              {locale === "ro" ? "Construit pentru un punct final de conversie clar" : "Built for a clear final conversion point"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              {locale === "ro"
                ? "Fluxul ghideaza utilizatorul prin pasi simpli, valideaza datele si ofera feedback vizual convingator pentru demo, pitch sau prezentare academica."
                : "The flow guides the user through simple steps, validates the data, and provides convincing visual feedback for demos, pitches, or academic presentations."}
            </p>
          </div>

          <div className="rounded-[1.45rem] border border-[#d8e6f4] bg-white/86 px-4 py-3 shadow-[0_14px_28px_rgba(11,31,53,0.05)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
              {locale === "ro" ? `Pasul ${step} din 2` : `Step ${step} of 2`}
            </p>
            <p className="mt-2 text-sm font-semibold text-[#0b1f35]">
              {step === 1
                ? (locale === "ro" ? "Preluare identitate" : "Identity intake")
                : (locale === "ro" ? "Clarificare interes" : "Interest clarification")}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {topHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.35rem] border border-[#d8e6f4] bg-white/80 p-4 shadow-[0_12px_24px_rgba(11,31,53,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(11,31,53,0.07)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{item.label}</p>
              <p className="mt-2 text-xs leading-6 text-muted">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {stepCards.map((item, index) => (
            <StepCard
              key={item.title}
              active={step === index + 1}
              completed={step === 2 && index === 0}
              description={item.description}
              index={index + 1}
              onClick={() => navigateToStep((index + 1) as 1 | 2)}
              title={item.title}
            />
          ))}
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#e7f3ff]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0f79ff] via-[#2d8dff] to-[#13b5ba] transition-all duration-500"
            style={{ width: stepProgress }}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6" noValidate>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => updateValue("website", event.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <div className="rounded-[1.85rem] border border-[#d6e5f4] bg-[linear-gradient(180deg,rgba(248,252,255,0.98),rgba(255,255,255,0.92))] p-4 md:p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                  {step === 1
                    ? (locale === "ro" ? "Identitate si follow-up" : "Identity and follow-up")
                    : (locale === "ro" ? "Interes si obiectiv" : "Interest and goal")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[#0b1f35]">
                  {step === 1
                    ? (locale === "ro" ? "Spune-ne cine esti si cum te contactam" : "Tell us who you are and how to reach you")
                    : (locale === "ro" ? "Ajuta-ne sa pregatim un demo relevant" : "Help us prepare a relevant demo")}
                </h3>
              </div>
              <span className="rounded-full border border-[#0f79ff]/10 bg-[#eef6ff] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                {step === 1
                  ? (locale === "ro" ? "Campuri de baza" : "Core details")
                  : (locale === "ro" ? "Context util" : "Useful context")}
              </span>
            </div>

            {step === 1 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <FieldShell
                  htmlFor="name"
                  label={locale === "ro" ? "Nume" : "Name"}
                  helper={locale === "ro"
                    ? "Folosim numele pentru un follow-up mai personalizat."
                    : "We use the name for a more personalized follow-up."}
                  error={errors.name}
                  icon={(
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                      <path d="M3.5 17a6.5 6.5 0 0 1 13 0" />
                    </svg>
                  )}
                >
                  <input
                    id="name"
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    className="w-full bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#7b90a5]"
                    placeholder={locale === "ro" ? "Nume si prenume" : "Full name"}
                  />
                </FieldShell>

                <FieldShell
                  htmlFor="email"
                  label="Email"
                  helper={locale === "ro"
                    ? "Adresa va fi folosita pentru simularea confirmarii."
                    : "The address will be used to simulate the confirmation flow."}
                  error={errors.email}
                  icon={(
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 5.5h14v9H3z" />
                      <path d="m4 6 6 5 6-5" />
                    </svg>
                  )}
                >
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(event) => updateValue("email", event.target.value)}
                    className="w-full bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#7b90a5]"
                    placeholder={locale === "ro" ? "nume@companie.ro" : "name@company.com"}
                  />
                </FieldShell>

                <FieldShell
                  htmlFor="phone"
                  label={locale === "ro" ? "Telefon" : "Phone"}
                  helper={locale === "ro"
                    ? "Formatam automat numarul in stil RO pentru claritate."
                    : "Add a direct phone number for quick follow-up."}
                  error={errors.phone}
                  icon={(
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 3.5h2l1 3-1.5 1.5a11 11 0 0 0 4.5 4.5L13.5 11l3 1v2a1.5 1.5 0 0 1-1.5 1.5h-.5C8.596 15.5 4.5 11.404 4.5 6.5V6A1.5 1.5 0 0 1 6 4.5Z" />
                    </svg>
                  )}
                >
                  <input
                    id="phone"
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                    className="w-full bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#7b90a5]"
                    placeholder={locale === "ro" ? "+40 7xx xxx xxx" : "+1 555 123 4567"}
                  />
                </FieldShell>

                <FieldShell
                  htmlFor="company"
                  label={locale === "ro" ? "Companie" : "Company"}
                  helper={locale === "ro"
                    ? "Ajuta la contextualizarea demo-ului sau a ofertei."
                    : "It helps add context for the demo or quote."}
                  error={errors.company}
                  icon={(
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3.5 16.5h13" />
                      <path d="M5 16.5V7.5h10v9" />
                      <path d="M8 7.5V4.5h4v3" />
                    </svg>
                  )}
                >
                  <input
                    id="company"
                    value={values.company}
                    onChange={(event) => updateValue("company", event.target.value)}
                    className="w-full bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#7b90a5]"
                    placeholder={locale === "ro" ? "Numele organizatiei" : "Company name"}
                  />
                </FieldShell>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="rounded-[1.55rem] border border-[#d8e6f4] bg-white/82 p-4 md:p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#dceafb] bg-[#f5faff] text-[#0b58d0]">
                      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 5h12" />
                        <path d="M4 10h12" />
                        <path d="M4 15h8" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0b1f35]">{locale === "ro" ? "Domeniu interes" : "Area of interest"}</p>
                      <p className="text-xs leading-6 text-muted">
                        {locale === "ro"
                          ? "Alege rapid un scenariu sau selecteaza optiunea potrivita din lista."
                          : "Choose a quick scenario or select the right option from the list."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {interestOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-2 text-xs font-semibold transition duration-300",
                          values.interest === option
                            ? "border-[#0f79ff]/18 bg-[#eef6ff] text-[#0b58d0] shadow-[0_10px_24px_rgba(15,121,255,0.08)]"
                            : "border-[#d8e6f4] bg-white text-[#0b1f35] hover:-translate-y-0.5 hover:border-[#0f79ff]/16 hover:bg-[#f8fbff]",
                        )}
                        onClick={() => updateValue("interest", option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className={cn("mt-4 rounded-[1.2rem] border bg-white/94 px-4 py-3", errors.interest ? "border-red-300" : "border-[#eef4fb]")}>
                    <select
                      id="interest"
                      value={values.interest}
                      onChange={(event) => updateValue("interest", event.target.value)}
                      className="w-full appearance-none bg-transparent text-sm text-[#0b1f35] outline-none"
                    >
                      <option value="">{locale === "ro" ? "Selecteaza o optiune" : "Select an option"}</option>
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className={cn("mt-3 text-xs leading-6", errors.interest ? "text-red-600" : "text-muted")}>
                    {errors.interest ?? (locale === "ro"
                      ? "Selectia ajuta la rutarea solicitarii spre un flux potrivit."
                      : "This helps route the request to the right workflow.")}
                  </p>
                </div>

                <FieldShell
                  htmlFor="message"
                  label={locale === "ro" ? "Mesaj" : "Message"}
                  helper={locale === "ro"
                    ? "Un mesaj mai clar produce un demo mai relevant si o estimare mai buna."
                    : "A clearer message leads to a more relevant demo and a better estimate."}
                  error={errors.message}
                  icon={(
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4.5h12v9H8l-4 3v-12Z" />
                    </svg>
                  )}
                >
                  <textarea
                    id="message"
                    value={values.message}
                    onChange={(event) => updateValue("message", event.target.value)}
                    className="min-h-40 w-full resize-none bg-transparent text-sm leading-7 text-[#0b1f35] outline-none placeholder:text-[#7b90a5]"
                    placeholder={locale === "ro"
                      ? "Descrie obiectivul, tipul de flux sau contextul companiei."
                      : "Describe the goal, workflow type, or the company context."}
                  />
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#eef4fb] pt-3 text-[11px] font-medium text-muted">
                    <span>{locale === "ro" ? "Minim recomandat: 24 caractere" : "Recommended minimum: 24 characters"}</span>
                    <span>{messageLength} {locale === "ro" ? "caractere" : "characters"}</span>
                  </div>
                </FieldShell>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            {step === 2 ? (
              <button type="button" className={buttonVariants("secondary", "sm:flex-1")} onClick={() => setStep(1)}>
                {locale === "ro" ? "Inapoi" : "Back"}
              </button>
            ) : null}

            {step === 1 ? (
              <button type="button" className={buttonVariants("primary", "sm:flex-1")} onClick={handleNext}>
                {locale === "ro" ? "Continua" : "Continue"}
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className={buttonVariants("primary", "sm:flex-1 disabled:opacity-70")}>
                {isSubmitting
                  ? (locale === "ro" ? "Se trimite solicitarea..." : "Sending request...")
                  : (locale === "ro" ? "Trimite solicitarea" : "Send request")}
              </button>
            )}
          </div>
        </form>

        {status === "error" ? (
          <div className="contact-success-enter mt-6 rounded-[1.6rem] border border-red-200 bg-red-50/90 p-5 shadow-[0_16px_30px_rgba(239,68,68,0.08)]">
            <p className="text-sm font-semibold text-red-700">
              {locale === "ro" ? "Solicitarea nu a putut fi procesata." : "The request could not be processed."}
            </p>
            <p className="mt-2 text-sm leading-7 text-red-600">
              {locale === "ro"
                ? "Verifica datele introduse si incearca din nou."
                : "Check the entered details and try again."}
            </p>
          </div>
        ) : null}

        {status === "success" ? (
          <div className="contact-success-enter mt-6 rounded-[1.7rem] border border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.98),rgba(255,255,255,0.95))] p-5 shadow-[0_20px_38px_rgba(16,185,129,0.1)]">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_14px_30px_rgba(16,185,129,0.24)]">
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m4.5 10 3.5 3.5L15.5 6" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  {locale === "ro" ? "Solicitarea a fost preluata in demo." : "The request was captured in the demo."}
                </p>
                <p className="mt-2 text-sm leading-7 text-emerald-700">
                  {locale === "ro"
                    ? "Acum poti continua cu urmatoarele actiuni, utile intr-o prezentare de produs sau intr-o discutie comerciala."
                    : "You can now continue with the next actions, useful in a product presentation or a sales discussion."}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={buttonVariants("secondary", "sm:flex-1 justify-center bg-white")}>
                {locale === "ro" ? "Programeaza demo" : "Book a demo"}
              </Link>
              <Link href="/studii-de-caz" className={buttonVariants("ghost", "sm:flex-1 justify-center rounded-full border border-emerald-200 bg-white")}>
                {locale === "ro" ? "Vezi scenarii" : "View scenarios"}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
