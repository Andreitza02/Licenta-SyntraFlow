"use client";

import { useMemo, useState } from "react";

import { Accordion } from "@/components/ui/accordion";
import type { Locale } from "@/lib/i18n";
import type { FaqItem } from "@/lib/site-data";

type FAQAccordionProps = {
  items: FaqItem[];
  searchable?: boolean;
  locale?: Locale;
};

export function FAQAccordion({ items, searchable = false, locale = "ro" }: FAQAccordionProps) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchable || !query.trim()) {
      return items;
    }

    const normalized = query.toLowerCase();

    return items.filter((item) =>
      `${item.question} ${item.answer}`.toLowerCase().includes(normalized),
    );
  }, [items, query, searchable]);

  const accordionItems = filteredItems.map((item, index) => ({
    id: `${index}-${item.question}`,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <div className="space-y-4">
      {searchable ? (
        <div className="rounded-3xl border border-[#0d3358]/10 bg-white px-4 py-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={locale === "ro" ? "Cauta o intrebare sau un subiect..." : "Search a question or topic..."}
            className="w-full border-none bg-transparent text-sm text-[#0b1f35] outline-none placeholder:text-[#557089]"
            aria-label={locale === "ro" ? "Cauta in intrebari frecvente" : "Search in frequently asked questions"}
          />
        </div>
      ) : null}

      {accordionItems.length ? (
        <Accordion items={accordionItems} />
      ) : (
        <div className="panel-surface rounded-3xl px-6 py-5 text-sm text-muted">
          {locale === "ro"
            ? "Nu exista intrebari care sa corespunda filtrului curent."
            : "There are no questions matching the current filter."}
        </div>
      )}
    </div>
  );
}
