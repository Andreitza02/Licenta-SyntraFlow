"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type ToastTone = "success" | "info" | "error";

type Toast = {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastInput = Omit<Toast, "id">;

type ToastContextValue = {
  pushToast: (toast: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: ToastInput) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((current) => [...current, { ...toast, id }]);

      window.setTimeout(() => {
        dismissToast(id);
      }, 2800);
    },
    [dismissToast],
  );

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex flex-col items-end gap-3"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto w-full max-w-sm rounded-3xl border px-5 py-4 shadow-[0_18px_48px_rgba(11,31,53,0.14)] backdrop-blur-xl",
              toast.tone === "success" && "border-emerald-200 bg-white text-emerald-900",
              toast.tone === "info" && "border-[#0f79ff]/18 bg-white text-[#0b1f35]",
              toast.tone === "error" && "border-red-200 bg-white text-red-700",
            )}
            role="status"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description ? <p className="mt-1 text-xs leading-6 opacity-85">{toast.description}</p> : null}
              </div>
              <button
                type="button"
                className="rounded-full px-2 py-1 text-xs font-semibold opacity-70 transition hover:opacity-100"
                onClick={() => dismissToast(toast.id)}
                aria-label="Inchide notificarea"
              >
                Inchide
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
