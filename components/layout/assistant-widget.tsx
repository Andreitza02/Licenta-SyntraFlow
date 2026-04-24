"use client";

import { useEffect, useRef, useState } from "react";

import { ChatKitPanel } from "@/components/ui/chatkit-panel";
import { LogoMark } from "@/components/ui/logo-mark";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type AssistantWidgetProps = {
  enabled: boolean;
  locale?: Locale;
  workflowId?: string;
};

export function AssistantWidget({ enabled, locale = "ro", workflowId = "" }: AssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, [isOpen]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[72] flex flex-col items-end gap-3">
      <div
        ref={panelRef}
        className={cn(
          "w-[calc(100vw-2rem)] max-w-[31rem] origin-bottom-right transition duration-300",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[2rem] border border-black/8 bg-[#fafaf7] shadow-[0_26px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl">
          <div className="h-[min(78vh,48rem)] min-h-[39rem] bg-transparent p-3">
            <ChatKitPanel
              enabled={enabled}
              mode="widget"
              locale={locale}
              workflowId={workflowId}
            />
          </div>
        </div>
      </div>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={locale === "ro" ? "Deschide widgetul asistentului" : "Open the assistant widget"}
        className={cn(
          "assistant-launcher pointer-events-auto group flex items-center justify-center rounded-full border border-[#0d3358]/10 bg-white p-1.5 text-white shadow-[0_12px_30px_rgba(11,31,53,0.12)] transition duration-300 hover:-translate-y-0.5",
          isOpen && "drop-shadow-[0_0_14px_rgba(16,163,127,0.22)]",
        )}
      >
        <LogoMark className="assistant-launcher-logo h-[3.1rem] w-[3.1rem]" />
      </button>
    </div>
  );
}
