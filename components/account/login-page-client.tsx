"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  CheckboxField,
  FieldShell,
  FormStatus,
  PasswordInput,
  TextInput,
} from "@/components/account/account-form-ui";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { Modal } from "@/components/ui/modal";
import type { Locale } from "@/lib/i18n";
import { buttonVariants } from "@/lib/utils";

type LoginErrors = Partial<Record<"email" | "password", string>>;
type RegisterErrors = Partial<Record<"firstName" | "lastName" | "email" | "password" | "confirmPassword" | "terms", string>>;
type ForgotErrors = Partial<Record<"email", string>>;
type FormState = {
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPageClient({ locale }: { locale: Locale }) {
  const { login, register, requestPasswordReset, status } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => {
    const rawNext = searchParams.get("next");
    return rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/account";
  }, [searchParams]);

  const labels = locale === "ro"
    ? {
        loginTitle: "Acces premium",
        loginDescription: "Intra in cont si pastreaza SyntraFlow pregatit pentru preferinte, proiecte si interactiuni mai relevante.",
        email: "Email",
        password: "Parola",
        emailPlaceholder: "nume@companie.ro",
        passwordPlaceholder: "Parola contului",
        remember: "Pastreaza sesiunea activa pe acest dispozitiv",
        forgot: "Ai uitat parola?",
        login: "Intra in cont",
        loading: "Se verifica datele...",
        successTitle: "Autentificare reusita",
        successDescription: "Te ducem spre zona de cont.",
        newUserTitle: "Nu ai cont inca?",
        newUserText: "Creeaza un profil pentru o experienta mai fluida cu asistentul si dashboard-ul.",
        createAccount: "Creeaza cont",
        benefits: ["Acces mai rapid la asistent", "Preferinte salvate", "Dashboard personal", "Interactiuni de proiect mai clare"],
        requiredEmail: "Emailul este obligatoriu.",
        invalidEmail: "Foloseste un format de email valid.",
        requiredPassword: "Parola este obligatorie.",
        authError: "Autentificarea nu a putut fi finalizata.",
        demoAccess: "Acces demo",
        adminDemo: "Admin: admin@syntraflow.local / Admin123!",
        clientDemo: "Client: andrei@syntraflow.local / Syntra123!",
      }
    : {
        loginTitle: "Premium access",
        loginDescription: "Sign in and keep SyntraFlow ready for preferences, projects, and more relevant interactions.",
        email: "Email",
        password: "Password",
        emailPlaceholder: "name@company.com",
        passwordPlaceholder: "Account password",
        remember: "Keep this session active on this device",
        forgot: "Forgot password?",
        login: "Sign in",
        loading: "Checking details...",
        successTitle: "Signed in successfully",
        successDescription: "Taking you to your account area.",
        newUserTitle: "No account yet?",
        newUserText: "Create a profile for a smoother assistant and dashboard experience.",
        createAccount: "Create account",
        benefits: ["Faster access to the assistant", "Saved preferences", "Personal dashboard", "Clearer project interaction"],
        requiredEmail: "Email is required.",
        invalidEmail: "Use a valid email format.",
        requiredPassword: "Password is required.",
        authError: "Sign in could not be completed.",
        demoAccess: "Demo access",
        adminDemo: "Admin: admin@syntraflow.local / Admin123!",
        clientDemo: "Client: andrei@syntraflow.local / Syntra123!",
      };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPath);
    }
  }, [nextPath, router, status]);

  function validateLogin() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = labels.requiredEmail;
    } else if (!emailPattern.test(email)) {
      nextErrors.email = labels.invalidEmail;
    }

    if (!password.trim()) {
      nextErrors.password = labels.requiredPassword;
    }

    return nextErrors;
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLogin();

    setErrors(nextErrors);
    setFormState(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email, password, remember });
      setFormState({
        tone: "success",
        title: labels.successTitle,
        description: labels.successDescription,
      });
      pushToast({
        tone: "success",
        title: labels.successTitle,
        description: labels.successDescription,
      });
      window.setTimeout(() => router.push(nextPath), 450);
    } catch (error) {
      setFormState({
        tone: "error",
        title: labels.authError,
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-14">
      <div className="section-shell grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <article className="panel-surface contact-card-hover rounded-[2rem] p-6 md:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.loginTitle}</p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
              {labels.loginTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">{labels.loginDescription}</p>
          </div>

          <form className="mt-6 grid gap-4" noValidate onSubmit={handleLogin}>
            <FieldShell id="login-email" label={labels.email} error={errors.email}>
              <TextInput
                id="login-email"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setErrors((current) => ({ ...current, email: undefined }));
                  setFormState(null);
                }}
                type="email"
                placeholder={labels.emailPlaceholder}
                autoComplete="email"
                invalid={Boolean(errors.email)}
                describedBy="login-email-message"
              />
            </FieldShell>

            <FieldShell id="login-password" label={labels.password} error={errors.password}>
              <PasswordInput
                id="login-password"
                value={password}
                onChange={(value) => {
                  setPassword(value);
                  setErrors((current) => ({ ...current, password: undefined }));
                  setFormState(null);
                }}
                placeholder={labels.passwordPlaceholder}
                autoComplete="current-password"
                invalid={Boolean(errors.password)}
                describedBy="login-password-message"
                showLabel={locale === "ro" ? "Arata" : "Show"}
                hideLabel={locale === "ro" ? "Ascunde" : "Hide"}
              />
            </FieldShell>

            <div className="flex flex-col gap-3 rounded-[1.35rem] border border-[#d8e6f4] bg-white/78 p-4 sm:flex-row sm:items-center sm:justify-between">
              <CheckboxField checked={remember} label={labels.remember} onChange={setRemember} id="login-remember" />
              <button
                type="button"
                className="w-fit text-sm font-semibold text-[#0b58d0] transition hover:text-[#0f79ff]"
                onClick={() => setForgotOpen(true)}
              >
                {labels.forgot}
              </button>
            </div>

            {formState ? <FormStatus {...formState} /> : null}

            <button type="submit" className={buttonVariants("primary", "w-full")} disabled={isSubmitting}>
              {isSubmitting ? labels.loading : labels.login}
            </button>
          </form>
        </article>

        <aside className="panel-surface accent-border rounded-[2rem] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.createAccount}</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
            {labels.newUserTitle}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">{labels.newUserText}</p>

          <ul className="mt-6 grid gap-3">
            {labels.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 rounded-[1.2rem] border border-[#d8e6f4] bg-white/82 px-4 py-3 text-sm font-medium text-[#0b1f35]">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#13b5ba]" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-[1.35rem] border border-[#13b5ba]/18 bg-[#ecfeff] p-4 text-sm text-[#0b1f35]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">{labels.demoAccess}</p>
            <p className="mt-2 font-semibold">{labels.adminDemo}</p>
            <p className="mt-1 text-muted">{labels.clientDemo}</p>
          </div>

          <button type="button" className={buttonVariants("secondary", "mt-6 w-full")} onClick={() => setRegisterOpen(true)}>
            {labels.createAccount}
          </button>
        </aside>
      </div>

      <RegisterModal
        locale={locale}
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSuccess={() => router.push(nextPath)}
        register={register}
      />
      <ForgotPasswordModal
        locale={locale}
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        requestPasswordReset={requestPasswordReset}
      />
    </section>
  );
}

function RegisterModal({
  locale,
  onClose,
  onSuccess,
  open,
  register,
}: {
  locale: Locale;
  onClose: () => void;
  onSuccess: () => void;
  open: boolean;
  register: ReturnType<typeof useAuth>["register"];
}) {
  const { pushToast } = useToast();
  const labels = locale === "ro"
    ? {
        title: "Creeaza cont",
        firstName: "Prenume",
        lastName: "Nume",
        email: "Email",
        password: "Parola",
        confirmPassword: "Confirma parola",
        terms: "Accept termenii si politica de confidentialitate.",
        submit: "Creeaza cont",
        loading: "Se creeaza contul...",
        success: "Cont creat",
        successDescription: "Profilul este pregatit pentru o experienta SyntraFlow mai personalizata.",
        allRequired: "Campul este obligatoriu.",
        invalidEmail: "Foloseste un format de email valid.",
        shortPassword: "Parola trebuie sa aiba cel putin 8 caractere.",
        mismatch: "Parolele nu se potrivesc.",
        requiredTerms: "Acceptarea termenilor este obligatorie.",
        errorTitle: "Contul nu a putut fi creat",
      }
    : {
        title: "Create account",
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        terms: "I accept the terms and privacy policy.",
        submit: "Create account",
        loading: "Creating account...",
        success: "Account created",
        successDescription: "Your profile is ready for a more personalized SyntraFlow experience.",
        allRequired: "This field is required.",
        invalidEmail: "Use a valid email format.",
        shortPassword: "Password must be at least 8 characters.",
        mismatch: "Passwords do not match.",
        requiredTerms: "Accepting the terms is required.",
        errorTitle: "The account could not be created",
      };

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState | null>(null);

  function updateValue<K extends keyof typeof values>(field: K, value: (typeof values)[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormState(null);
  }

  function validateRegister() {
    const nextErrors: RegisterErrors = {};

    if (!values.firstName.trim()) {
      nextErrors.firstName = labels.allRequired;
    }

    if (!values.lastName.trim()) {
      nextErrors.lastName = labels.allRequired;
    }

    if (!values.email.trim()) {
      nextErrors.email = labels.allRequired;
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = labels.invalidEmail;
    }

    if (!values.password) {
      nextErrors.password = labels.allRequired;
    } else if (values.password.length < 8) {
      nextErrors.password = labels.shortPassword;
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = labels.allRequired;
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = labels.mismatch;
    }

    if (!values.terms) {
      nextErrors.terms = labels.requiredTerms;
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegister();

    setErrors(nextErrors);
    setFormState(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      setFormState({ tone: "success", title: labels.success, description: labels.successDescription });
      pushToast({ tone: "success", title: labels.success, description: labels.successDescription });
      onClose();
      onSuccess();
    } catch (error) {
      setFormState({
        tone: "error",
        title: labels.errorTitle,
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={labels.title} closeLabel={locale === "ro" ? "Inchide" : "Close"}>
      <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <FieldShell id="register-first-name" label={labels.firstName} error={errors.firstName}>
            <TextInput
              id="register-first-name"
              value={values.firstName}
              onChange={(value) => updateValue("firstName", value)}
              autoComplete="given-name"
              invalid={Boolean(errors.firstName)}
              describedBy="register-first-name-message"
            />
          </FieldShell>
          <FieldShell id="register-last-name" label={labels.lastName} error={errors.lastName}>
            <TextInput
              id="register-last-name"
              value={values.lastName}
              onChange={(value) => updateValue("lastName", value)}
              autoComplete="family-name"
              invalid={Boolean(errors.lastName)}
              describedBy="register-last-name-message"
            />
          </FieldShell>
        </div>

        <FieldShell id="register-email" label={labels.email} error={errors.email}>
          <TextInput
            id="register-email"
            type="email"
            value={values.email}
            onChange={(value) => updateValue("email", value)}
            autoComplete="email"
            invalid={Boolean(errors.email)}
            describedBy="register-email-message"
          />
        </FieldShell>

        <div className="grid gap-4 md:grid-cols-2">
          <FieldShell id="register-password" label={labels.password} error={errors.password}>
            <PasswordInput
              id="register-password"
              value={values.password}
              onChange={(value) => updateValue("password", value)}
              autoComplete="new-password"
              invalid={Boolean(errors.password)}
              describedBy="register-password-message"
              showLabel={locale === "ro" ? "Arata" : "Show"}
              hideLabel={locale === "ro" ? "Ascunde" : "Hide"}
            />
          </FieldShell>
          <FieldShell id="register-confirm-password" label={labels.confirmPassword} error={errors.confirmPassword}>
            <PasswordInput
              id="register-confirm-password"
              value={values.confirmPassword}
              onChange={(value) => updateValue("confirmPassword", value)}
              autoComplete="new-password"
              invalid={Boolean(errors.confirmPassword)}
              describedBy="register-confirm-password-message"
              showLabel={locale === "ro" ? "Arata" : "Show"}
              hideLabel={locale === "ro" ? "Ascunde" : "Hide"}
            />
          </FieldShell>
        </div>

        <div className="rounded-[1.35rem] border border-[#d8e6f4] bg-white/82 p-4">
          <CheckboxField checked={values.terms} label={labels.terms} onChange={(value) => updateValue("terms", value)} error={errors.terms} />
        </div>

        {formState ? <FormStatus {...formState} /> : null}

        <button type="submit" className={buttonVariants("primary", "w-full")} disabled={isSubmitting}>
          {isSubmitting ? labels.loading : labels.submit}
        </button>
      </form>
    </Modal>
  );
}

function ForgotPasswordModal({
  locale,
  onClose,
  open,
  requestPasswordReset,
}: {
  locale: Locale;
  onClose: () => void;
  open: boolean;
  requestPasswordReset: ReturnType<typeof useAuth>["requestPasswordReset"];
}) {
  const labels = locale === "ro"
    ? {
        title: "Resetare parola",
        description: "Introdu emailul contului si iti trimitem instructiuni de resetare.",
        email: "Email",
        submit: "Trimite instructiuni",
        loading: "Se trimit instructiunile...",
        success: "Instructiunile au fost trimise",
        successDescription: "Verifica emailul pentru urmatorii pasi.",
        requiredEmail: "Emailul este obligatoriu.",
        invalidEmail: "Foloseste un format de email valid.",
        errorTitle: "Resetarea nu a putut fi pornita",
      }
    : {
        title: "Reset password",
        description: "Enter the account email and we will send reset instructions.",
        email: "Email",
        submit: "Send instructions",
        loading: "Sending instructions...",
        success: "Instructions sent",
        successDescription: "Check your email for the next steps.",
        requiredEmail: "Email is required.",
        invalidEmail: "Use a valid email format.",
        errorTitle: "Password reset could not be started",
      };

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ForgotErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<FormState | null>(null);

  function validateForgot() {
    const nextErrors: ForgotErrors = {};

    if (!email.trim()) {
      nextErrors.email = labels.requiredEmail;
    } else if (!emailPattern.test(email)) {
      nextErrors.email = labels.invalidEmail;
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForgot();

    setErrors(nextErrors);
    setFormState(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await requestPasswordReset(email);
      setFormState({ tone: "success", title: labels.success, description: labels.successDescription });
    } catch (error) {
      setFormState({
        tone: "error",
        title: labels.errorTitle,
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={labels.title} closeLabel={locale === "ro" ? "Inchide" : "Close"}>
      <p className="mb-5 text-sm leading-7 text-muted">{labels.description}</p>
      <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
        <FieldShell id="forgot-email" label={labels.email} error={errors.email}>
          <TextInput
            id="forgot-email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setErrors({});
              setFormState(null);
            }}
            autoComplete="email"
            invalid={Boolean(errors.email)}
            describedBy="forgot-email-message"
          />
        </FieldShell>

        {formState ? <FormStatus {...formState} /> : null}

        <button type="submit" className={buttonVariants("primary", "w-full")} disabled={isSubmitting}>
          {isSubmitting ? labels.loading : labels.submit}
        </button>
      </form>
    </Modal>
  );
}
