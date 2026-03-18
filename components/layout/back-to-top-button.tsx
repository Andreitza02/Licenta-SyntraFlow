"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-[5.5rem] z-[65]">
      <button
        type="button"
        className={cn(
          "rounded-full border border-[#0d3358]/10 bg-white px-4 py-3 text-sm font-semibold text-[#0b1f35] shadow-[0_16px_38px_rgba(11,31,53,0.12)] transition hover:-translate-y-0.5",
          isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Inapoi sus"
      >
        Inapoi sus
      </button>
    </div>
  );
}
