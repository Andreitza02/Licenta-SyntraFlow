"use client";

import { useState } from "react";

import {
  CheckboxField,
  FieldShell,
  FormStatus,
  PasswordInput,
  ShieldIcon,
  UserIcon,
} from "@/components/account/account-form-ui";
import { AccountShell } from "@/components/account/account-shell";
import { ProtectedAccount } from "@/components/account/protected-account";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { SiteLink } from "@/components/ui/site-link";
import type { Locale } from "@/lib/i18n";
import { buttonVariants, cn } from "@/lib/utils";

type PasswordErrors = Partial<Record<"currentPassword" | "newPassword" | "confirmPassword", string>>;
type StatusState = {
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
};

export function AccountOverviewClient({ locale }: { locale: Locale }) {
  return (
    <ProtectedAccount locale={locale}>
      <AccountShell locale={locale}>
        <AccountOverviewContent locale={locale} />
      </AccountShell>
    </ProtectedAccount>
  );
}

function AccountOverviewContent({ locale }: { locale: Locale }) {
  const { changePassword, user } = useAuth();
  const { pushToast } = useToast();
  const labels = locale === "ro"
    ? {
        title: "Dashboard cont",
        description: "Un centru rapid pentru profilul care personalizeaza recomandarile, preferintele si accesul.",
        profileTitle: "Profil de business",
        profileDescription: "Pastreaza datele actualizate pentru recomandari mai relevante si follow-up mai bun.",
        editProfile: "Optimizeaza profilul",
        profileComplete: "Completare profil",
        companyMissing: "Adauga organizatia",
        roleMissing: "Adauga rolul",
        securityTitle: "Securitate",
        securityDescription: "Protejeaza accesul si pastreaza contul pregatit pentru lucru fara frictiune.",
        currentPassword: "Parola curenta",
        newPassword: "Parola noua",
        confirmPassword: "Confirma parola noua",
        required: "Campul este obligatoriu.",
        shortPassword: "Parola noua trebuie sa aiba cel putin 8 caractere.",
        mismatch: "Parolele nu se potrivesc.",
        changePassword: "Schimba parola",
        changing: "Se schimba parola...",
        passwordSuccess: "Parola a fost actualizata",
        passwordSuccessDescription: "Accesul ramane pregatit pentru o experienta mai sigura.",
        passwordError: "Parola nu a putut fi schimbata",
        preferencesTitle: "Preferinte",
        preferencesDescription: "Alege cum vrei sa lucreze asistentul si dashboard-ul pentru tine.",
        assistantContext: "Pastreaza contextul pentru asistent",
        emailSummary: "Trimite sumar pe email",
        compactView: "Interfata compacta pe dashboard",
        savePreferences: "Salveaza preferintele",
        preferencesSaved: "Preferintele au fost actualizate",
      }
    : {
        title: "Account dashboard",
        description: "A fast hub for the profile that personalizes recommendations, preferences, and access.",
        profileTitle: "Business profile",
        profileDescription: "Keep your details up to date for more relevant recommendations and better follow-up.",
        editProfile: "Optimize profile",
        profileComplete: "Profile completion",
        companyMissing: "Add organization",
        roleMissing: "Add role",
        securityTitle: "Security",
        securityDescription: "Protect access and keep the account ready for smoother work.",
        currentPassword: "Current password",
        newPassword: "New password",
        confirmPassword: "Confirm new password",
        required: "This field is required.",
        shortPassword: "New password must be at least 8 characters.",
        mismatch: "Passwords do not match.",
        changePassword: "Change password",
        changing: "Changing password...",
        passwordSuccess: "Password updated",
        passwordSuccessDescription: "Access stays ready for a safer experience.",
        passwordError: "Password could not be changed",
        preferencesTitle: "Preferences",
        preferencesDescription: "Choose how the assistant and dashboard should work for you.",
        assistantContext: "Keep assistant context",
        emailSummary: "Send email summary",
        compactView: "Compact dashboard interface",
        savePreferences: "Save preferences",
        preferencesSaved: "Preferences updated",
      };

  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});
  const [passwordState, setPasswordState] = useState<StatusState | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [preferences, setPreferences] = useState({
    assistantContext: true,
    emailSummary: true,
    compactView: false,
  });
  const [preferencesState, setPreferencesState] = useState<StatusState | null>(null);

  const completedFields = [user?.firstName, user?.lastName, user?.email, user?.phone, user?.company, user?.role].filter((value) => value?.trim()).length;
  const completion = Math.round((completedFields / 6) * 100);

  function updatePasswordValue(field: keyof typeof passwordValues, value: string) {
    setPasswordValues((current) => ({ ...current, [field]: value }));
    setPasswordErrors((current) => ({ ...current, [field]: undefined }));
    setPasswordState(null);
  }

  function validatePassword() {
    const nextErrors: PasswordErrors = {};

    if (!passwordValues.currentPassword.trim()) {
      nextErrors.currentPassword = labels.required;
    }

    if (!passwordValues.newPassword.trim()) {
      nextErrors.newPassword = labels.required;
    } else if (passwordValues.newPassword.length < 8) {
      nextErrors.newPassword = labels.shortPassword;
    }

    if (!passwordValues.confirmPassword.trim()) {
      nextErrors.confirmPassword = labels.required;
    } else if (passwordValues.confirmPassword !== passwordValues.newPassword) {
      nextErrors.confirmPassword = labels.mismatch;
    }

    return nextErrors;
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validatePassword();

    setPasswordErrors(nextErrors);
    setPasswordState(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsChangingPassword(true);

    try {
      // TODO: Send current and new passwords to the backend auth provider.
      await changePassword();
      setPasswordValues({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordState({
        tone: "success",
        title: labels.passwordSuccess,
        description: labels.passwordSuccessDescription,
      });
      pushToast({
        tone: "success",
        title: labels.passwordSuccess,
        description: labels.passwordSuccessDescription,
      });
    } catch (error) {
      setPasswordState({
        tone: "error",
        title: labels.passwordError,
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsChangingPassword(false);
    }
  }

  function savePreferences() {
    setPreferencesState({
      tone: "success",
      title: labels.preferencesSaved,
      description: locale === "ro" ? "Experienta va folosi aceste alegeri in interactiunile urmatoare." : "The experience will use these choices in future interactions.",
    });
  }

  return (
    <div className="grid gap-6">
      <section className="panel-surface accent-border rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.title}</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
              {user?.firstName ? `${locale === "ro" ? "Salut" : "Hi"}, ${user.firstName}` : labels.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{labels.description}</p>
          </div>
          <SiteLink href="/account/information" className={buttonVariants("primary", "w-full md:w-auto")}>
            {labels.editProfile}
          </SiteLink>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="panel-surface rounded-[2rem] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.2rem] bg-[#eef6ff] text-[#0b58d0]">
              <UserIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.profileTitle}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{labels.profileDescription}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              ["Email", user?.email],
              [locale === "ro" ? "Telefon" : "Phone", user?.phone || "-"],
              [locale === "ro" ? "Organizatie" : "Organization", user?.company || labels.companyMissing],
              [locale === "ro" ? "Rol" : "Role", user?.role || labels.roleMissing],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.25rem] border border-[#d8e6f4] bg-white/82 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{label}</p>
                <p className="mt-1 text-sm font-medium text-[#0b1f35]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-[#d8e6f4] bg-white/82 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-[#0b1f35]">{labels.profileComplete}</p>
              <p className="text-sm font-semibold text-[#0b58d0]">{completion}%</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7f3ff]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0f79ff] to-[#13b5ba] transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </article>

        <article id="security-section" className="panel-surface rounded-[2rem] p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.2rem] bg-[#eef6ff] text-[#0b58d0]">
              <ShieldIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.securityTitle}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{labels.changePassword}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{labels.securityDescription}</p>
            </div>
          </div>

          <form className="mt-6 grid gap-4" noValidate onSubmit={handleChangePassword}>
            <FieldShell id="current-password" label={labels.currentPassword} error={passwordErrors.currentPassword}>
              <PasswordInput
                id="current-password"
                value={passwordValues.currentPassword}
                onChange={(value) => updatePasswordValue("currentPassword", value)}
                autoComplete="current-password"
                invalid={Boolean(passwordErrors.currentPassword)}
                describedBy="current-password-message"
                showLabel={locale === "ro" ? "Arata" : "Show"}
                hideLabel={locale === "ro" ? "Ascunde" : "Hide"}
              />
            </FieldShell>

            <div className="grid gap-4 md:grid-cols-2">
              <FieldShell id="new-password" label={labels.newPassword} error={passwordErrors.newPassword}>
                <PasswordInput
                  id="new-password"
                  value={passwordValues.newPassword}
                  onChange={(value) => updatePasswordValue("newPassword", value)}
                  autoComplete="new-password"
                  invalid={Boolean(passwordErrors.newPassword)}
                  describedBy="new-password-message"
                  showLabel={locale === "ro" ? "Arata" : "Show"}
                  hideLabel={locale === "ro" ? "Ascunde" : "Hide"}
                />
              </FieldShell>
              <FieldShell id="confirm-new-password" label={labels.confirmPassword} error={passwordErrors.confirmPassword}>
                <PasswordInput
                  id="confirm-new-password"
                  value={passwordValues.confirmPassword}
                  onChange={(value) => updatePasswordValue("confirmPassword", value)}
                  autoComplete="new-password"
                  invalid={Boolean(passwordErrors.confirmPassword)}
                  describedBy="confirm-new-password-message"
                  showLabel={locale === "ro" ? "Arata" : "Show"}
                  hideLabel={locale === "ro" ? "Ascunde" : "Hide"}
                />
              </FieldShell>
            </div>

            {passwordState ? <FormStatus {...passwordState} /> : null}

            <button type="submit" className={buttonVariants("secondary", "w-full md:w-auto")} disabled={isChangingPassword}>
              {isChangingPassword ? labels.changing : labels.changePassword}
            </button>
          </form>
        </article>
      </div>

      <section id="preferences-section" className="panel-surface rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.preferencesTitle}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{labels.preferencesTitle}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{labels.preferencesDescription}</p>
          </div>
          <button type="button" className={buttonVariants("secondary", "w-full md:w-auto")} onClick={savePreferences}>
            {labels.savePreferences}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["assistantContext", labels.assistantContext],
            ["emailSummary", labels.emailSummary],
            ["compactView", labels.compactView],
          ].map(([key, label]) => (
            <div key={key} className="rounded-[1.35rem] border border-[#d8e6f4] bg-white/82 p-4">
              <CheckboxField
                checked={preferences[key as keyof typeof preferences]}
                label={label}
                onChange={(checked) => {
                  setPreferences((current) => ({ ...current, [key]: checked }));
                  setPreferencesState(null);
                }}
              />
            </div>
          ))}
        </div>

        <div className={cn("mt-4", !preferencesState && "hidden")}>
          {preferencesState ? <FormStatus {...preferencesState} /> : null}
        </div>
      </section>
    </div>
  );
}
