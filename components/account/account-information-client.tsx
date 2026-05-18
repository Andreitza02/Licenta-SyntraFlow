"use client";

import { useEffect, useState } from "react";

import { FieldShell, FormStatus, TextInput } from "@/components/account/account-form-ui";
import { AccountShell } from "@/components/account/account-shell";
import { ProtectedAccount } from "@/components/account/protected-account";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import type { AuthProfile } from "@/lib/auth-service";
import type { Locale } from "@/lib/i18n";
import { buttonVariants } from "@/lib/utils";

type ProfileErrors = Partial<Record<keyof AuthProfile, string>>;
type StatusState = {
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyProfile: AuthProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
};

export function AccountInformationClient({ locale }: { locale: Locale }) {
  return (
    <ProtectedAccount locale={locale}>
      <AccountShell locale={locale}>
        <AccountInformationContent locale={locale} />
      </AccountShell>
    </ProtectedAccount>
  );
}

function AccountInformationContent({ locale }: { locale: Locale }) {
  const { updateProfile, user } = useAuth();
  const { pushToast } = useToast();
  const labels = locale === "ro"
    ? {
        title: "Profil de business",
        description: "Completeaza detaliile care ajuta SyntraFlow sa ofere recomandari, follow-up si raspunsuri mai relevante.",
        firstName: "Prenume",
        lastName: "Nume",
        email: "Email",
        phone: "Telefon",
        company: "Companie / organizatie",
        role: "Rol / pozitie",
        required: "Campul este obligatoriu.",
        invalidEmail: "Foloseste un format de email valid.",
        save: "Salveaza modificarile",
        saving: "Se salveaza...",
        cancel: "Anuleaza",
        success: "Profil salvat",
        successDescription: "Profilul este pregatit pentru interactiuni mai clare si mai bine personalizate.",
        error: "Profilul nu a putut fi salvat",
        optional: "Optional",
      }
    : {
        title: "Business profile",
        description: "Complete the details that help SyntraFlow deliver more relevant recommendations, follow-up, and replies.",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        company: "Company / organization",
        role: "Role / position",
        required: "This field is required.",
        invalidEmail: "Use a valid email format.",
        save: "Save changes",
        saving: "Saving...",
        cancel: "Cancel",
        success: "Profile saved",
        successDescription: "Your profile is ready for clearer, better personalized interactions.",
        error: "The profile could not be saved",
        optional: "Optional",
      };

  const [values, setValues] = useState<AuthProfile>(emptyProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [formState, setFormState] = useState<StatusState | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role,
    });
  }, [user]);

  function updateValue(field: keyof AuthProfile, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormState(null);
  }

  function validateProfile() {
    const nextErrors: ProfileErrors = {};

    if (!values.firstName.trim()) {
      nextErrors.firstName = labels.required;
    }

    if (!values.lastName.trim()) {
      nextErrors.lastName = labels.required;
    }

    if (!values.email.trim()) {
      nextErrors.email = labels.required;
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = labels.invalidEmail;
    }

    return nextErrors;
  }

  function resetForm() {
    if (!user) {
      return;
    }

    setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role,
    });
    setErrors({});
    setFormState(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateProfile();

    setErrors(nextErrors);
    setFormState(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      await updateProfile({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        role: values.role.trim(),
      });
      setFormState({ tone: "success", title: labels.success, description: labels.successDescription });
      pushToast({ tone: "success", title: labels.success, description: labels.successDescription });
    } catch (error) {
      setFormState({
        tone: "error",
        title: labels.error,
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className="panel-surface accent-border rounded-[2rem] p-6 md:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.title}</p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
          {labels.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted">{labels.description}</p>
      </div>

      <form className="mt-6 grid gap-4" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <FieldShell id="profile-first-name" label={labels.firstName} error={errors.firstName}>
            <TextInput
              id="profile-first-name"
              value={values.firstName}
              onChange={(value) => updateValue("firstName", value)}
              autoComplete="given-name"
              invalid={Boolean(errors.firstName)}
              describedBy="profile-first-name-message"
            />
          </FieldShell>
          <FieldShell id="profile-last-name" label={labels.lastName} error={errors.lastName}>
            <TextInput
              id="profile-last-name"
              value={values.lastName}
              onChange={(value) => updateValue("lastName", value)}
              autoComplete="family-name"
              invalid={Boolean(errors.lastName)}
              describedBy="profile-last-name-message"
            />
          </FieldShell>
        </div>

        <FieldShell id="profile-email" label={labels.email} error={errors.email}>
          <TextInput
            id="profile-email"
            type="email"
            value={values.email}
            onChange={(value) => updateValue("email", value)}
            autoComplete="email"
            invalid={Boolean(errors.email)}
            describedBy="profile-email-message"
          />
        </FieldShell>

        <div className="grid gap-4 md:grid-cols-3">
          <FieldShell id="profile-phone" label={labels.phone} helper={labels.optional}>
            <TextInput
              id="profile-phone"
              type="tel"
              value={values.phone}
              onChange={(value) => updateValue("phone", value)}
              autoComplete="tel"
              describedBy="profile-phone-message"
            />
          </FieldShell>
          <FieldShell id="profile-company" label={labels.company} helper={labels.optional}>
            <TextInput
              id="profile-company"
              value={values.company}
              onChange={(value) => updateValue("company", value)}
              autoComplete="organization"
              describedBy="profile-company-message"
            />
          </FieldShell>
          <FieldShell id="profile-role" label={labels.role} helper={labels.optional}>
            <TextInput
              id="profile-role"
              value={values.role}
              onChange={(value) => updateValue("role", value)}
              autoComplete="organization-title"
              describedBy="profile-role-message"
            />
          </FieldShell>
        </div>

        {formState ? <FormStatus {...formState} /> : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" className={buttonVariants("secondary", "w-full sm:w-auto")} onClick={resetForm} disabled={isSaving}>
            {labels.cancel}
          </button>
          <button type="submit" className={buttonVariants("primary", "w-full sm:w-auto")} disabled={isSaving}>
            {isSaving ? labels.saving : labels.save}
          </button>
        </div>
      </form>
    </article>
  );
}
