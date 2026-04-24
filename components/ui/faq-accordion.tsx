"use client";

import { useMemo, useState } from "react";

import { Accordion } from "@/components/ui/accordion";
import type { Locale } from "@/lib/i18n";
import type { FaqItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type FAQAccordionProps = {
  items: FaqItem[];
  searchable?: boolean;
  locale?: Locale;
};

export function FAQAccordion({ items, searchable = false, locale = "ro" }: FAQAccordionProps) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();
  const quickTags = locale === "ro" ? ["program", "oferta", "demo", "suport"] : ["schedule", "quote", "demo", "support"];

  const filteredItems = useMemo(() => {
    if (!searchable || !trimmedQuery) {
      return items;
    }

    const normalized = trimmedQuery.toLowerCase();

    return items.filter((item) =>
      `${item.question} ${item.answer}`.toLowerCase().includes(normalized),
    );
  }, [items, searchable, trimmedQuery]);

  const accordionItems = filteredItems.map((item, index) => ({
    id: `${index}-${item.question}`,
    title: item.question,
    content: <p className="text-sm leading-7 text-[#0b1f35]/88">{item.answer}</p>,
  }));

  return (
    <div className="space-y-5">
      {searchable ? (
        <div className="group relative overflow-hidden rounded-[2rem] border border-[#d7e6f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,249,255,0.9))] px-4 py-4 shadow-[0_18px_40px_rgba(11,31,53,0.07)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(15,121,255,0.09)] md:px-5">
          <div className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-[#0f79ff]/12 blur-3xl transition duration-500 group-hover:scale-110 group-focus-within:scale-110" />
          <div className="pointer-events-none absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-[#13b5ba]/10 blur-3xl transition duration-500 group-hover:scale-110 group-focus-within:scale-110" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f79ff]/45 to-transparent" />
          <label
            htmlFor={`faq-search-${locale}`}
            className="relative text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]"
          >
            {locale === "ro" ? "Cautare rapida in FAQ" : "Quick FAQ search"}
          </label>
          <div className="relative mt-3 flex items-center gap-3 rounded-[1.35rem] border border-[#d8e6f4] bg-white/86 px-4 py-3.5 shadow-[0_12px_28px_rgba(11,31,53,0.04)] transition duration-300 group-hover:border-[#0f79ff]/14 group-focus-within:-translate-y-0.5 group-focus-within:border-[#0f79ff]/22 group-focus-within:bg-white group-focus-within:shadow-[0_18px_34px_rgba(15,121,255,0.10)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-[#557089] transition duration-300 group-focus-within:text-[#0f79ff]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id={`faq-search-${locale}`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                locale === "ro"
                  ? "Ex: program, oferta, demo, suport"
                  : "Eg. schedule, quote, demo, support"
              }
              className="w-full border-none bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#557089]"
              aria-label={locale === "ro" ? "Cauta in intrebari frecvente" : "Search in frequently asked questions"}
            />
            {trimmedQuery ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-full border border-[#0f79ff]/12 bg-[#eef6ff] px-3 py-1.5 text-[11px] font-semibold text-[#0b58d0] transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/20 hover:bg-white"
              >
                {locale === "ro" ? "Sterge" : "Clear"}
              </button>
            ) : null}
          </div>
          <div className="relative mt-4 flex flex-wrap gap-2">
            {quickTags.map((tag) => {
              const isActive = trimmedQuery.toLowerCase() === tag.toLowerCase();

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] transition duration-300",
                    isActive
                      ? "border-[#0f79ff]/22 bg-[#0b1f35] text-white shadow-[0_12px_26px_rgba(11,31,53,0.16)]"
                      : "border-[#d9e7f4] bg-white/84 text-[#0b1f35] hover:-translate-y-0.5 hover:border-[#0f79ff]/18 hover:bg-white hover:shadow-[0_14px_28px_rgba(11,31,53,0.08)]",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <p className="relative mt-4 text-xs leading-6 text-muted">
            {locale === "ro"
              ? "Poti cauta atat dupa intrebare, cat si dupa cuvinte-cheie din raspuns."
              : "You can search both by question and by keywords found in the answer."}
          </p>
        </div>
      ) : null}

      {searchable && trimmedQuery ? (
        <p className="px-1 text-xs font-medium text-muted">
          {locale === "ro"
            ? `${filteredItems.length} raspunsuri gasite pentru "${trimmedQuery}".`
            : `${filteredItems.length} answers found for "${trimmedQuery}".`}
        </p>
      ) : null}

      {accordionItems.length ? (
        <Accordion items={accordionItems} />
      ) : (
        <div className="rounded-[1.7rem] border border-[#d7e6f4] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,249,255,0.88))] px-6 py-5 text-sm text-muted shadow-[0_16px_34px_rgba(11,31,53,0.06)]">
          {locale === "ro"
            ? "Nu exista intrebari care sa corespunda filtrului curent."
            : "There are no questions matching the current filter."}
        </div>
      )}
    </div>
  );
}
