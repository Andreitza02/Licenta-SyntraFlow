"use client";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type AssistantTryMeButtonProps = {
  locale: Locale;
  className?: string;
};

const ASSISTANT_OPEN_EVENT = "syntraflow:open-assistant";

function TryMeIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 5.5h11v7H8.2L4.5 15.8V5.5Z" />
      <path d="M7.8 8.5h4.4" />
      <path d="M7.8 11h2.8" />
    </svg>
  );
}

export function AssistantTryMeButton({ locale, className }: AssistantTryMeButtonProps) {
  return (
    <button
      type="button"
      aria-label={locale === "ro" ? "Incearca asistentul virtual SyntraFlow" : "Try the SyntraFlow virtual assistant"}
      onClick={() => window.dispatchEvent(new CustomEvent(ASSISTANT_OPEN_EVENT))}
      className={cn(
        "interactive-button inline-flex items-center gap-2 rounded-full border border-[#13b5ba]/24 bg-[#ecfeff] px-4 py-2.5 text-sm font-semibold text-[#0b7e84] shadow-[0_14px_30px_rgba(19,181,186,0.12)] transition hover:border-[#13b5ba]/35 hover:bg-white",
        className,
      )}
    >
      <TryMeIcon />
      <span>Try me</span>
    </button>
  );
}
