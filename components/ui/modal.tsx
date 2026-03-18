"use client";

import { useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
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

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
  closeLabel = "Inchide",
}: ModalProps) {
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

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-[#081a2d]/45 p-4 pt-20 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "panel-surface relative z-[1] w-full max-w-3xl rounded-[2rem] p-6 shadow-[0_28px_80px_rgba(11,31,53,0.18)] md:p-8",
          className,
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="font-display text-2xl font-semibold text-[#0b1f35]">
            {title}
          </h2>
          <button
            type="button"
            className="rounded-full border border-[#0d3358]/10 bg-white px-4 py-2 text-xs font-semibold text-[#0b1f35] transition hover:border-[#0f79ff]/25"
            onClick={onClose}
          >
            {closeLabel}
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
