"use client";

import { cn } from "@/lib/utils";

export type StepperItem = {
  id: string;
  title: string;
  description: string;
};

type StepperProps = {
  steps: StepperItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Stepper({ steps, activeId, onChange }: StepperProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const isActive = step.id === activeId;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onChange(step.id)}
            className={cn(
              "flex w-full items-start gap-4 rounded-[1.5rem] border px-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f79ff]/40",
              isActive
                ? "border-[#0f79ff]/22 bg-[#eef6ff] shadow-[0_14px_32px_rgba(15,121,255,0.08)]"
                : "border-[#0d3358]/8 bg-white hover:border-[#0f79ff]/16",
            )}
          >
            <span
              className={cn(
                "font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold",
                isActive ? "bg-[#0f79ff] text-white" : "bg-[#f4fbff] text-[#0b1f35]",
              )}
            >
              0{index + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#0b1f35]">{step.title}</span>
              <span className="mt-1 block text-xs leading-6 text-muted">{step.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
