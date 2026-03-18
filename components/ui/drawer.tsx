"use client";

import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: "right" | "bottom";
  className?: string;
  closeLabel?: string;
};

function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  if (event.key !== "Tab") {
    return;
  }

  const focusable = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  );

  if (!focusable.length) {
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  className,
  closeLabel = "Inchide",
}: DrawerProps) {
  const titleId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget = containerRef.current?.querySelector<HTMLElement>(
      'button, input, [href], [tabindex]:not([tabindex="-1"])',
    );
    focusTarget?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (containerRef.current) {
        trapFocus(event, containerRef.current);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const placement =
    side === "right"
      ? "ml-auto h-full max-h-[100vh] w-full max-w-md rounded-l-[2rem] rounded-r-none"
      : "mt-auto w-full max-w-xl rounded-t-[2rem] rounded-b-none";

  return (
    <div className="fixed inset-0 z-[85] flex bg-[#081a2d]/45 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label={closeLabel}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "panel-surface relative z-[1] flex flex-col p-5 shadow-[0_28px_80px_rgba(11,31,53,0.18)]",
          placement,
          className,
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="font-display text-xl font-semibold text-[#0b1f35]">
            {title}
          </h2>
          <button
            type="button"
            className="rounded-full border border-[#0d3358]/10 bg-white px-4 py-2 text-xs font-semibold text-[#0b1f35]"
            onClick={onClose}
          >
            {closeLabel}
          </button>
        </div>
        <div className="mt-5 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
