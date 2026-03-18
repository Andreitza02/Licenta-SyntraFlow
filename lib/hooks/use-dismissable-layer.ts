"use client";

import { useEffect, type RefObject } from "react";

type UseDismissableLayerOptions = {
  enabled: boolean;
  refs: Array<RefObject<HTMLElement | null>>;
  onDismiss: () => void;
};

export function useDismissableLayer({
  enabled,
  refs,
  onDismiss,
}: UseDismissableLayerOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target) {
        return;
      }

      const clickedInside = refs.some((ref) => {
        const node = ref.current;
        return node ? node.contains(target) : false;
      });

      if (!clickedInside) {
        onDismiss();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("touchstart", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enabled, onDismiss, refs]);
}
