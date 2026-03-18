"use client";

import { useEffect, useState } from "react";

type UseScrollSpyOptions = {
  rootMargin?: string;
  threshold?: number;
};

export function useScrollSpy(ids: string[], options: UseScrollSpyOptions = {}) {
  const { rootMargin = "-20% 0px -55% 0px", threshold = 0.1 } = options;
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!ids.length) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin, threshold },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ids, rootMargin, threshold]);

  return activeId;
}
