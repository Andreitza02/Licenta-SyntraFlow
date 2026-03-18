import { IconBadge } from "@/components/ui/icon-badge";
import type { WorkflowStep } from "@/lib/site-data";

type WorkflowTimelineProps = {
  steps: WorkflowStep[];
};

export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {steps.map((step, index) => (
        <article key={step.title} className="panel-surface rounded-[1.75rem] p-6">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-[#0f79ff] text-sm font-semibold text-white">
                {index + 1}
              </span>
              {index < steps.length - 1 ? <span className="mt-3 h-12 w-px bg-[#0f79ff]/16 lg:hidden" /> : null}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-[#0b1f35]">{step.title}</h3>
                <IconBadge icon={step.icon} className="h-10 w-10 rounded-xl" />
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{step.summary}</p>
              <p className="mt-4 rounded-2xl bg-[#f4fbff] px-4 py-3 text-sm leading-7 text-[#0d3358]">{step.detail}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
