import "server-only";

import { getSupabaseContactTable, insertSupabaseRow } from "@/lib/supabase-admin";

export type ContactSubmissionLocale = "ro" | "en";

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  locale: ContactSubmissionLocale;
};

export type ContactSubmissionFieldErrors = Partial<
  Record<keyof Omit<ContactSubmission, "locale">, string>
>;

type ContactSubmissionMetadata = {
  ipAddress: string | null;
  referrer: string | null;
  submittedAt: string;
  userAgent: string | null;
};

type ValidationSuccess = {
  ok: true;
  data: ContactSubmission;
};

type ValidationFailure = {
  ok: false;
  error: string;
  fieldErrors: ContactSubmissionFieldErrors;
};

type ValidationResult = ValidationSuccess | ValidationFailure;

function normalizeSingleLine(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeMultiline(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n/g, "\n").trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getLocale(value: unknown): ContactSubmissionLocale {
  return value === "en" ? "en" : "ro";
}

export function validateContactSubmissionPayload(payload: unknown): ValidationResult {
  const source = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
  const locale = getLocale(source.locale);
  const fieldErrors: ContactSubmissionFieldErrors = {};

  const data: ContactSubmission = {
    name: normalizeSingleLine(source.name, 120),
    email: normalizeSingleLine(source.email, 160).toLowerCase(),
    phone: normalizeSingleLine(source.phone, 40),
    company: normalizeSingleLine(source.company, 120),
    interest: normalizeSingleLine(source.interest, 120),
    message: normalizeMultiline(source.message, 2000),
    locale,
  };

  if (!data.name) {
    fieldErrors.name =
      locale === "ro"
        ? "Completeaza numele pentru a continua."
        : "Complete the name field to continue.";
  }

  if (!data.email) {
    fieldErrors.email =
      locale === "ro"
        ? "Adresa de email este obligatorie."
        : "An email address is required.";
  } else if (!isValidEmail(data.email)) {
    fieldErrors.email =
      locale === "ro"
        ? "Foloseste o adresa de email valida."
        : "Use a valid email address.";
  }

  if (!data.phone || data.phone.replace(/\D/g, "").length < (locale === "ro" ? 11 : 7)) {
    fieldErrors.phone =
      locale === "ro"
        ? "Adauga un numar de telefon valid."
        : "Add a valid phone number.";
  }

  if (!data.company) {
    fieldErrors.company =
      locale === "ro"
        ? "Compania este obligatorie pentru context."
        : "The company field is required for context.";
  }

  if (!data.interest) {
    fieldErrors.interest =
      locale === "ro"
        ? "Selecteaza un domeniu de interes."
        : "Select an area of interest.";
  }

  if (!data.message || data.message.length < 24) {
    fieldErrors.message =
      locale === "ro"
        ? "Mesajul trebuie sa aiba cel putin 24 de caractere."
        : "The message must be at least 24 characters long.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error:
        locale === "ro"
          ? "Datele transmise nu sunt complete."
          : "The submitted details are incomplete.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    data,
  };
}

export async function saveContactSubmission(
  submission: ContactSubmission,
  metadata: ContactSubmissionMetadata,
) {
  return insertSupabaseRow(getSupabaseContactTable(), {
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    company: submission.company,
    interest: submission.interest,
    message: submission.message,
    locale: submission.locale,
    source: "website-contact-form",
    status: "new",
    metadata: {
      ipAddress: metadata.ipAddress,
      referrer: metadata.referrer,
      submittedAt: metadata.submittedAt,
      userAgent: metadata.userAgent,
    },
  });
}
