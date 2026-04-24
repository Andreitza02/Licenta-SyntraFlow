"use client";

import { useEffect, useRef, useState } from "react";

import { SiteLink } from "@/components/ui/site-link";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";
import { formatEuroPrice, getProductCatalogMap, type ProductCatalogItem } from "@/lib/product-catalog";
import type { Locale } from "@/lib/i18n";

type CartPageClientProps = {
  locale: Locale;
};

type ProductTone = {
  badge: string;
  icon: string;
  soft: string;
  price: string;
};

const productTones: Record<ProductCatalogItem["id"], ProductTone> = {
  ai: {
    badge: "bg-[#0f79ff]",
    icon: "border-[#0f79ff]/16 bg-[#eef6ff] text-[#0b58d0]",
    soft: "bg-[linear-gradient(135deg,rgba(15,121,255,0.09),rgba(19,181,186,0.08))]",
    price: "text-[#0b58d0]",
  },
  "website-builder": {
    badge: "bg-[#0d9488]",
    icon: "border-[#0d9488]/16 bg-[#ecfdf5] text-[#0d9488]",
    soft: "bg-[linear-gradient(135deg,rgba(13,148,136,0.09),rgba(101,214,139,0.08))]",
    price: "text-[#0d766f]",
  },
  hosting: {
    badge: "bg-[#b7791f]",
    icon: "border-[#b7791f]/16 bg-[#fff8e6] text-[#b7791f]",
    soft: "bg-[linear-gradient(135deg,rgba(183,121,31,0.1),rgba(240,180,41,0.08))]",
    price: "text-[#955f12]",
  },
};

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="19" r="1.55" />
      <circle cx="18" cy="19" r="1.55" />
      <path d="M2.5 4.5h2.8l2.2 10.1a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.75l1.35-6.15H6.25" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4.5 10.4 3.2 3.2 7.8-8.2" />
    </svg>
  );
}

function ProductIcon({ id }: { id: ProductCatalogItem["id"] }) {
  if (id === "ai") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M7 10.5a5 5 0 0 1 10 0v3a5 5 0 0 1-10 0v-3Z" />
        <path d="M9.5 12h5M10 15h4M12 5.5V3M4.5 12H3M21 12h-1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "website-builder") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 6.5h16v11H4z" />
        <path d="M4 10h16M8 14h5M15.5 14h1.5M9 20h6M12 17.5V20" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 7h14a1.5 1.5 0 0 1 1.5 1.5V11h-17V8.5A1.5 1.5 0 0 1 5 7Z" />
      <path d="M3.5 11h17v5.5A1.5 1.5 0 0 1 19 18H5a1.5 1.5 0 0 1-1.5-1.5V11Z" />
      <path d="M7 9h.1M10 9h.1M7 14.5h5M15 14.5h2" strokeLinecap="round" />
    </svg>
  );
}

export function CartPageClient({ locale }: CartPageClientProps) {
  const { cartIds, removeFromCart, clearCart, isHydrated } = useCart();
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const timersRef = useRef<Record<string, number>>({});
  const isRomanian = locale === "ro";
  const catalogMap = getProductCatalogMap(locale);
  const items = cartIds.map((id) => catalogMap[id as keyof typeof catalogMap]).filter(Boolean);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const labels = isRomanian
    ? {
        title: "Cosul meu",
        eyebrow: "Produse selectate",
        emptyTitle: "Cosul este gol",
        emptyText: "Adauga un produs din pagina Produse, iar aici vei vedea sumarul si totalul.",
        continueShopping: "Continua cumparaturile",
        orderSummary: "Sumar comanda",
        products: "Produse",
        total: "Total",
        contactCta: "Plateste produsele",
        clearCart: "Goleste cosul",
        remove: "Scoate",
        includes: "Include",
        selected: "selectate",
        oneSelected: "selectat",
        ready: "Gata pentru pasul urmator",
        review: "Verifica produsele si continua spre contact pentru finalizarea comenzii.",
      }
    : {
        title: "My cart",
        eyebrow: "Selected products",
        emptyTitle: "Your cart is empty",
        emptyText: "Add a product from the Product page and this page will show the summary and total.",
        continueShopping: "Continue shopping",
        orderSummary: "Order summary",
        products: "Products",
        total: "Total",
        contactCta: "Pay Products",
        clearCart: "Clear cart",
        remove: "Remove",
        includes: "Includes",
        selected: "selected",
        oneSelected: "selected",
        ready: "Ready for the next step",
        review: "Review the products and continue to contact to finalize the order.",
      };

  useEffect(() => () => {
    Object.values(timersRef.current).forEach((timer) => window.clearTimeout(timer));
  }, []);

  const handleRemoveFromCart = (id: string) => {
    if (removingIds.includes(id)) {
      return;
    }

    setRemovingIds((current) => [...current, id]);
    timersRef.current[id] = window.setTimeout(() => {
      removeFromCart(id);
      setRemovingIds((current) => current.filter((entry) => entry !== id));
      delete timersRef.current[id];
    }, 340);
  };

  if (!isHydrated) {
    return (
      <main className="pb-12 pt-32">
        <section className="section-shell">
          <div className="rounded-2xl border border-[#d7e5f3] bg-white/84 px-6 py-8 shadow-[0_18px_48px_rgba(11,31,53,0.08)]">
            <div className="h-7 w-44 animate-pulse rounded-full bg-[#eef6ff]" />
            <div className="mt-5 h-20 max-w-3xl animate-pulse rounded-2xl bg-[#f4fbff]" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-12 pt-32">
      <section className="section-shell">
        <div className="flex flex-col gap-5 border-b border-[#d7e5f3] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0b58d0]">{labels.eyebrow}</p>
            <h1 className="font-display mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#0b1f35] md:text-5xl">
              {labels.title}
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted">
              {items.length
                ? `${items.length} ${items.length === 1 ? labels.oneSelected : labels.selected}. ${labels.review}`
                : labels.emptyText}
            </p>
          </div>

          <SiteLink
            href="/produse"
            className="interactive-button inline-flex w-fit items-center justify-center rounded-full border border-[#d7e6f5] bg-white/86 px-5 py-3 text-sm font-semibold text-[#0b58d0] shadow-[0_12px_28px_rgba(11,31,53,0.06)] hover:-translate-y-0.5 hover:border-[#0f79ff]/20 hover:bg-white"
          >
            {labels.continueShopping}
          </SiteLink>
        </div>
      </section>

      {!items.length ? (
        <section className="section-shell mt-7">
          <div className="rounded-2xl border border-dashed border-[#cddceb] bg-white/84 p-8 shadow-[0_16px_40px_rgba(11,31,53,0.05)]">
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-[#d7e6f5] bg-[#f7fbff] text-[#0b58d0]">
                <CartIcon className="h-8 w-8" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35]">{labels.emptyTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{labels.emptyText}</p>
              <SiteLink
                href="/produse"
                className="interactive-button mt-6 inline-flex items-center justify-center rounded-full border border-[#0f79ff] bg-[#0f79ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,121,255,0.2)] transition duration-300 hover:-translate-y-0.5"
              >
                {labels.continueShopping}
              </SiteLink>
            </div>
          </div>
        </section>
      ) : (
        <section className="section-shell mt-7">
          <div className="grid gap-6 xl:grid-cols-[1fr_22rem] xl:items-start">
            <div className="space-y-4">
              {items.map((item) => {
                const tone = productTones[item.id];

                return (
                  <article
                    key={item.id}
                    className={cn(
                      "cart-item-removable overflow-hidden rounded-2xl border border-[#d7e5f3] bg-white/94 shadow-[0_18px_46px_rgba(11,31,53,0.08)] transition-[opacity,transform,max-height,margin,padding] duration-300 ease-out",
                      removingIds.includes(item.id) && "cart-item-removing",
                    )}
                  >
                    <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
                      <div className="p-5 md:p-6">
                        <div className="flex gap-4">
                          <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border", tone.icon)}>
                            <ProductIcon id={item.id} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={cn("h-2 w-2 rounded-full", tone.badge)} />
                              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#557089]">
                                {item.tag}
                              </p>
                            </div>
                            <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0b1f35]">
                              {item.title}
                            </h2>
                            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{item.kicker}</p>
                          </div>
                        </div>

                        <div className={cn("mt-5 rounded-2xl border border-[#e1edf8] p-4", tone.soft)}>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.includes}</p>
                          <ul className="mt-3 grid gap-2 md:grid-cols-3">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2 text-xs leading-6 text-[#0b1f35]">
                                <span className={cn("mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white", tone.badge)}>
                                  <CheckIcon />
                                </span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between border-t border-[#e1edf8] bg-[#fbfdff] p-5 lg:w-64 lg:border-l lg:border-t-0">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#557089]">
                            {isRomanian ? "Pret" : "Price"}
                          </p>
                          <p className={cn("mt-2 text-3xl font-semibold tracking-[-0.04em]", tone.price)}>
                            {formatEuroPrice(item.price, locale)}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-muted">{item.priceNote}</p>
                        </div>

                        <button
                          type="button"
                          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-[#ef4444]/18 bg-white px-4 py-2.5 text-sm font-semibold text-[#dc2626] shadow-[0_10px_24px_rgba(239,68,68,0.08)] transition duration-300 hover:-translate-y-0.5 hover:border-[#ef4444]/28 hover:bg-[#fff5f5]"
                          onClick={() => handleRemoveFromCart(item.id)}
                          disabled={removingIds.includes(item.id)}
                        >
                          <CrossIcon className="h-4 w-4" />
                          {labels.remove}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="xl:sticky xl:top-28">
              <article className="overflow-hidden rounded-2xl border border-[#d7e5f3] bg-white/94 shadow-[0_22px_58px_rgba(11,31,53,0.11)]">
                <div className="border-b border-[#e1edf8] px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0b58d0]">{labels.ready}</p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#0b1f35]">
                    {labels.orderSummary}
                  </h2>
                </div>

                <div className="px-5 py-5">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                        <span className="min-w-0 truncate text-[#0b1f35]">{item.title}</span>
                        <span className="shrink-0 font-semibold text-[#0b1f35]">{formatEuroPrice(item.price, locale)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 border-t border-[#e7eef6] pt-5">
                    <div className="flex items-center justify-between gap-4 text-sm text-muted">
                      <span>{labels.products}</span>
                      <span>{items.length}</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-4 text-[#0b1f35]">
                      <span className="text-base font-semibold">{labels.total}</span>
                      <span className="text-3xl font-semibold tracking-[-0.04em]">{formatEuroPrice(total, locale)}</span>
                    </div>
                  </div>

                  <SiteLink
                    href="/contact"
                    className="interactive-button mt-6 inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#0f79ff,#13b5ba)] px-5 py-3 text-sm font-semibold tracking-[0.02em] text-white shadow-[0_18px_40px_rgba(15,121,255,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,121,255,0.3)]"
                  >
                    {labels.contactCta}
                  </SiteLink>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#ef4444]/16 bg-white px-4 py-3 text-sm font-semibold text-[#dc2626] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff5f5]"
                    onClick={clearCart}
                  >
                    {labels.clearCart}
                  </button>
                </div>
              </article>
            </aside>
          </div>
        </section>
      )}
    </main>
  );
}
