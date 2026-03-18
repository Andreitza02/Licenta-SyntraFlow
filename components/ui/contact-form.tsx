"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

export function ContactForm({ locale = "ro" }: ContactFormProps) {
  const { pushToast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const stepProgress = useMemo(() => (step === 1 ? "50%" : "100%"), [step]);
  const interestOptions = useMemo(() => getInterestOptions(locale), [locale]);

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
    <div className="panel-surface reveal-section rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
            {locale === "ro" ? "Formular multi-step" : "Multi-step form"}
          </p>
          <p className="mt-2 text-sm text-muted">
            {locale === "ro" ? `Pasul ${step} din 2` : `Step ${step} of 2`}
          </p>
        </div>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-[#eef6ff]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#0f79ff] to-[#13b5ba] transition-all" style={{ width: stepProgress }} />
        </div>
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

        {step === 1 ? (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b1f35]" htmlFor="name">
                {locale === "ro" ? "Nume" : "Name"}
              </label>
              <input
                id="name"
                value={values.name}
                onChange={(event) => updateValue("name", event.target.value)}
                className={cn(
                  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0b1f35] outline-none transition",
                  errors.name ? "border-red-400" : "border-[#0d3358]/10 focus:border-[#0f79ff]/35",
                )}
                placeholder={locale === "ro" ? "Nume si prenume" : "Full name"}
              />
              <p className={cn("mt-2 text-xs", errors.name ? "text-red-500" : "text-muted")}>
                {errors.name ?? (locale === "ro"
                  ? "Folosim numele pentru un follow-up mai personalizat."
                  : "We use the name for a more personalized follow-up.")}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b1f35]" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(event) => updateValue("email", event.target.value)}
                className={cn(
                  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0b1f35] outline-none transition",
                  errors.email ? "border-red-400" : "border-[#0d3358]/10 focus:border-[#0f79ff]/35",
                )}
                placeholder={locale === "ro" ? "nume@companie.ro" : "name@company.com"}
              />
              <p className={cn("mt-2 text-xs", errors.email ? "text-red-500" : "text-muted")}>
                {errors.email ?? (locale === "ro"
                  ? "Adresa va fi folosita pentru simularea confirmarii."
                  : "The address will be used to simulate the confirmation flow.")}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b1f35]" htmlFor="phone">
                {locale === "ro" ? "Telefon" : "Phone"}
              </label>
              <input
                id="phone"
                value={values.phone}
                onChange={(event) => updateValue("phone", event.target.value)}
                className={cn(
                  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0b1f35] outline-none transition",
                  errors.phone ? "border-red-400" : "border-[#0d3358]/10 focus:border-[#0f79ff]/35",
                )}
                placeholder={locale === "ro" ? "+40 7xx xxx xxx" : "+1 555 123 4567"}
              />
              <p className={cn("mt-2 text-xs", errors.phone ? "text-red-500" : "text-muted")}>
                {errors.phone ?? (locale === "ro"
                  ? "Formatam automat numarul in stil RO pentru claritate."
                  : "Add a direct phone number for quick follow-up.")}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b1f35]" htmlFor="company">
                {locale === "ro" ? "Companie" : "Company"}
              </label>
              <input
                id="company"
                value={values.company}
                onChange={(event) => updateValue("company", event.target.value)}
                className={cn(
                  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0b1f35] outline-none transition",
                  errors.company ? "border-red-400" : "border-[#0d3358]/10 focus:border-[#0f79ff]/35",
                )}
                placeholder={locale === "ro" ? "Numele organizatiei" : "Company name"}
              />
              <p className={cn("mt-2 text-xs", errors.company ? "text-red-500" : "text-muted")}>
                {errors.company ?? (locale === "ro"
                  ? "Ajuta la contextualizarea demo-ului sau a ofertei."
                  : "It helps add context for the demo or quote.")}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b1f35]" htmlFor="interest">
                {locale === "ro" ? "Domeniu interes" : "Area of interest"}
              </label>
              <select
                id="interest"
                value={values.interest}
                onChange={(event) => updateValue("interest", event.target.value)}
                className={cn(
                  "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0b1f35] outline-none transition",
                  errors.interest ? "border-red-400" : "border-[#0d3358]/10 focus:border-[#0f79ff]/35",
                )}
              >
                <option value="">{locale === "ro" ? "Selecteaza o optiune" : "Select an option"}</option>
                {interestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <p className={cn("mt-2 text-xs", errors.interest ? "text-red-500" : "text-muted")}>
                {errors.interest ?? (locale === "ro"
                  ? "Selectia ajuta la rutarea solicitarii spre un flux potrivit."
                  : "This helps route the request to the right workflow.")}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#0b1f35]" htmlFor="message">
                {locale === "ro" ? "Mesaj" : "Message"}
              </label>
              <textarea
                id="message"
                value={values.message}
                onChange={(event) => updateValue("message", event.target.value)}
                className={cn(
                  "min-h-36 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#0b1f35] outline-none transition",
                  errors.message ? "border-red-400" : "border-[#0d3358]/10 focus:border-[#0f79ff]/35",
                )}
                placeholder={locale === "ro"
                  ? "Descrie obiectivul, tipul de flux sau contextul companiei."
                  : "Describe the goal, workflow type, or the company context."}
              />
              <p className={cn("mt-2 text-xs", errors.message ? "text-red-500" : "text-muted")}>
                {errors.message ?? (locale === "ro"
                  ? "Un mesaj mai clar produce un demo mai relevant si o estimare mai buna."
                  : "A clearer message leads to a more relevant demo and a better estimate.")}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

      {status === "success" ? (
        <div className="mt-6 rounded-[1.5rem] bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-800">
            {locale === "ro" ? "Solicitarea a fost preluata in demo." : "The request was captured in the demo."}
          </p>
          <p className="mt-2 text-sm leading-7 text-emerald-700">
            {locale === "ro"
              ? "Acum poti continua cu urmatoarele actiuni, utile intr-o prezentare de produs sau intr-o discutie comerciala."
              : "You can now continue with the next actions, useful in a product presentation or a sales discussion."}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
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
  );
}
