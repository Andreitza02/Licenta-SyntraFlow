"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { getCommandIndex } from "@/lib/command-index";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
};

export function CommandPalette({ open, onClose, locale }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWarm, setIsWarm] = useState(false);
  const commandIndex = useMemo(() => getCommandIndex(locale), [locale]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      setIsWarm(false);
      return;
    }

    const timer = window.setTimeout(() => setIsWarm(true), 180);
    return () => window.clearTimeout(timer);
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return commandIndex;
    }

    return commandIndex.filter((item) => {
      const haystack = [item.title, item.description, ...item.keywords].join(" ").toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!results.length) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((current) => (current + 1) % results.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((current) => (current - 1 + results.length) % results.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const target = results[activeIndex];
        if (target) {
          router.push(target.href);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, onClose, open, results, router]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={locale === "ro" ? "Cautare rapida" : "Quick Search"}
      closeLabel={locale === "ro" ? "Inchide" : "Close"}
    >
      {!isWarm ? (
        <div className="space-y-4">
          <div className="h-12 animate-pulse rounded-2xl bg-[#eef6ff]" />
          <div className="h-20 animate-pulse rounded-3xl bg-[#f4fbff]" />
          <div className="h-20 animate-pulse rounded-3xl bg-[#f4fbff]" />
          <div className="h-20 animate-pulse rounded-3xl bg-[#f4fbff]" />
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-[#0d3358]/10 bg-white px-4 py-3">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                locale === "ro"
                  ? "Cauta pagini, sectiuni, solutii sau industrii..."
                  : "Search pages, sections, solutions, or industries..."
              }
              className="w-full border-none bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#557089]"
              aria-label={locale === "ro" ? "Cautare rapida" : "Quick Search"}
            />
          </div>

          <div className="mt-4 max-h-[55vh] space-y-2 overflow-y-auto pr-1">
            {results.length ? (
              results.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "w-full rounded-3xl border px-4 py-4 text-left transition",
                      isActive
                        ? "border-[#0f79ff]/20 bg-[#eef6ff] shadow-[0_14px_30px_rgba(15,121,255,0.08)]"
                        : "border-[#0d3358]/8 bg-white hover:border-[#0f79ff]/14",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                  >
                    <p className="text-sm font-semibold text-[#0b1f35]">{item.title}</p>
                    <p className="mt-1 text-xs leading-6 text-muted">{item.description}</p>
                  </button>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-[#0d3358]/10 bg-[#f8fcff] px-4 py-6 text-sm text-muted">
                {locale === "ro"
                  ? "Nu exista rezultate pentru cautarea curenta."
                  : "There are no results for the current search."}
              </div>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
