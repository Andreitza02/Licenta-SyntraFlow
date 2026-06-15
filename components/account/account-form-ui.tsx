"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type FieldShellProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  helper?: string;
};

type TextInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
  describedBy?: string;
};

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
  describedBy?: string;
  showLabel: string;
  hideLabel: string;
};

type StatusMessageProps = {
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

type IconProps = {
  className?: string;
};

export function FieldShell({ id, label, children, error, helper }: FieldShellProps) {
  const messageId = `${id}-message`;

  return (
    <div
      className={cn(
        "contact-field-shell rounded-[1.35rem] border p-4",
        error
          ? "border-red-300 bg-red-50/80 shadow-[0_14px_28px_rgba(239,68,68,0.08)]"
          : "border-[#d8e6f4] bg-white/86 shadow-[0_14px_28px_rgba(11,31,53,0.04)]",
      )}
    >
      <label htmlFor={id} className="block text-sm font-semibold text-[#0b1f35]">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      <p id={messageId} className={cn("mt-2 text-xs leading-5", error ? "text-red-600" : "text-muted")}>
        {error ?? helper ?? ""}
      </p>
    </div>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  invalid,
  describedBy,
}: TextInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={invalid ? "true" : "false"}
      aria-describedby={describedBy}
      className="min-h-11 w-full rounded-[1rem] border border-[#eef4fb] bg-white/94 px-4 py-3 text-sm font-medium text-[#0b1f35] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] placeholder:font-normal placeholder:text-[#7b90a5] focus:border-[#0f79ff]/35"
    />
  );
}

export function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
  invalid,
  describedBy,
  showLabel,
  hideLabel,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex min-h-11 items-center gap-2 rounded-[1rem] border border-[#eef4fb] bg-white/94 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-[#0f79ff]/35">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={invalid ? "true" : "false"}
        aria-describedby={describedBy}
        className="min-w-0 flex-1 bg-transparent py-1 text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#7b90a5]"
      />
      <button
        type="button"
        className="shrink-0 rounded-full border border-[#d8e6f4] bg-[#f6fbff] px-3 py-1.5 text-xs font-semibold text-[#0b58d0] transition hover:border-[#0f79ff]/25 hover:bg-white"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? hideLabel : showLabel}
      >
        {visible ? hideLabel : showLabel}
      </button>
    </div>
  );
}

export function FormStatus({ tone, title, description, icon }: StatusMessageProps) {
  const content = (
    <div className="min-w-0">
      <p className="text-sm font-semibold">{title}</p>
      {description ? <p className="mt-1 text-xs leading-6 opacity-85">{description}</p> : null}
    </div>
  );

  return (
    <div
      className={cn(
        "rounded-[1.35rem] border p-4",
        tone === "success" && "border-emerald-200 bg-emerald-50/90 text-emerald-800",
        tone === "error" && "border-red-200 bg-red-50/90 text-red-700",
        tone === "info" && "border-[#0f79ff]/16 bg-[#eef6ff]/90 text-[#0b1f35]",
      )}
      role={tone === "error" ? "alert" : "status"}
    >
      {icon ? (
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/75 text-lg shadow-[0_8px_18px_rgba(11,31,53,0.08)]"
          >
            {icon}
          </span>
          {content}
        </div>
      ) : (
        content
      )}
    </div>
  );
}

export function CheckboxField({
  checked,
  id,
  label,
  onChange,
  error,
}: {
  checked: boolean;
  id?: string;
  label: string;
  onChange: (checked: boolean) => void;
  error?: string;
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <label className="flex items-start gap-3 text-sm font-medium text-[#0b1f35]" htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? "true" : "false"}
          className="mt-1 h-4 w-4 shrink-0 accent-[#0f79ff]"
        />
        <span>{label}</span>
      </label>
      {error ? <p className="mt-2 text-xs leading-5 text-red-600">{error}</p> : null}
    </div>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 19a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5 19 6v5.4c0 4.1-2.8 7.9-7 9.1-4.2-1.2-7-5-7-9.1V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
      <path d="M19.2 14.4a7.8 7.8 0 0 0 .05-4.7l2-1.35-2-3.45-2.4 1a8 8 0 0 0-4.05-2.35L12.5 1h-4l-.35 2.55A8 8 0 0 0 4.1 5.9l-2.35-1-2 3.45 2 1.35a7.8 7.8 0 0 0 .05 4.7l-2 1.25 2 3.45 2.3-.95a8.1 8.1 0 0 0 4.05 2.35L8.5 23h4l.3-2.5a8.1 8.1 0 0 0 4.05-2.35l2.35.95 2-3.45-2-1.25Z" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h6v6h-6z" />
    </svg>
  );
}
