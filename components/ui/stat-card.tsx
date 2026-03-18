"use client";

import { useEffect, useState } from "react";

import type { StatItem } from "@/lib/site-data";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

type StatCardProps = StatItem;

export function StatCard({ value, suffix, label, description }: StatCardProps) {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.35 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isIntersecting) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1200;

    const step = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      setDisplayValue(Math.round(progress * value));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isIntersecting, value]);

  return (
    <div ref={ref} className="panel-surface reveal-section rounded-3xl p-6">
      <p className="font-display text-4xl font-semibold tracking-[-0.03em] text-[#0b1f35]" aria-live="polite">
        {displayValue}
        <span className="ml-1 text-xl text-[#0f79ff]">{suffix}</span>
      </p>
      <h3 className="mt-4 text-base font-semibold text-[#0b1f35]">{label}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
    </div>
  );
}
