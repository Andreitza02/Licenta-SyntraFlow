"use client";

import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  freezeOnceVisible = true,
) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || (freezeOnceVisible && isIntersecting)) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [freezeOnceVisible, isIntersecting, options]);

  return { ref, isIntersecting };
}
