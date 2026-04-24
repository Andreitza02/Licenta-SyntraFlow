"use client";

import { SiteLink } from "@/components/ui/site-link";
import { useCart } from "@/components/providers/cart-provider";
import type { Locale } from "@/lib/i18n";
import { formatEuroPrice, type ProductCatalogItem } from "@/lib/product-catalog";
import { cn } from "@/lib/utils";

type ProductCatalogGridProps = {
  items: ProductCatalogItem[];
  locale: Locale;
};

type ProductVisual = {
  shortName: string;
  headerClass: string;
  dotClass: string;
  lineClass: string;
  iconClass: string;
  buttonClass: string;
};

const productVisuals: Record<ProductCatalogItem["id"], ProductVisual> = {
  ai: {
    shortName: "AI",
    headerClass: "bg-[linear-gradient(135deg,#0b1f35_0%,#0f79ff_56%,#13b5ba_100%)]",
    dotClass: "bg-[#8bd7ff]",
    lineClass: "bg-[#0f79ff]",
    iconClass: "border-white/18 bg-white/12 text-white",
    buttonClass: "border-[#0f79ff] bg-[#0f79ff] text-white shadow-[0_16px_34px_rgba(15,121,255,0.22)]",
  },
  "website-builder": {
    shortName: "WEB",
    headerClass: "bg-[linear-gradient(135deg,#0b1f35_0%,#0d9488_56%,#65d68b_100%)]",
    dotClass: "bg-[#8ff0c4]",
    lineClass: "bg-[#0d9488]",
    iconClass: "border-white/18 bg-white/12 text-white",
    buttonClass: "border-[#0d9488] bg-[#0d9488] text-white shadow-[0_16px_34px_rgba(13,148,136,0.2)]",
  },
  hosting: {
    shortName: "HOST",
    headerClass: "bg-[linear-gradient(135deg,#0b1f35_0%,#755a16_55%,#f0b429_100%)]",
    dotClass: "bg-[#ffe08a]",
    lineClass: "bg-[#d99b16]",
    iconClass: "border-white/18 bg-white/12 text-white",
    buttonClass: "border-[#b7791f] bg-[#b7791f] text-white shadow-[0_16px_34px_rgba(183,121,31,0.2)]",
  },
};

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20.6 4.6 13.7a4.7 4.7 0 0 1 0-6.8 4.8 4.8 0 0 1 6.8 0L12 7.5l.6-.6a4.8 4.8 0 0 1 6.8 0 4.7 4.7 0 0 1 0 6.8Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="19" r="1.7" />
      <circle cx="17" cy="19" r="1.7" />
      <path d="M3.5 4.5h2.2l2.1 9.3h9.1l2.3-6.8H8.4" />
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

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10h12" />
      <path d="m11.5 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function ProductGlyph({ id }: { id: ProductCatalogItem["id"] }) {
  if (id === "ai") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M8 13.5a8 8 0 0 1 16 0v5a8 8 0 0 1-16 0v-5Z" />
        <path d="M11.5 16h9" strokeLinecap="round" />
        <path d="M12.5 20.5h7" strokeLinecap="round" />
        <path d="M11 10.5h.1M21 10.5h.1" strokeLinecap="round" />
        <path d="M16 5.5V2.8M5.5 16H2.8M29.2 16h-2.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (id === "website-builder") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M5 8.5h22v15H5z" />
        <path d="M5 12.5h22" />
        <path d="M9 17h6M9 20.5h10M21.5 17h2" strokeLinecap="round" />
        <path d="M10 28h12M16 23.5V28" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M7 8.5h18a2 2 0 0 1 2 2v3.5H5v-3.5a2 2 0 0 1 2-2Z" />
      <path d="M5 14h22v7.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V14Z" />
      <path d="M9 11.3h.1M12.5 11.3h.1M9 18.5h6M19 18.5h4M9 21h10" strokeLinecap="round" />
    </svg>
  );
}

export function ProductCatalogGrid({ items, locale }: ProductCatalogGridProps) {
  const isRomanian = locale === "ro";
  const { isFavorite, isInCart, toggleCart, toggleFavorite } = useCart();

  return (
    <section className="pb-12">
      <div className="section-shell">
        <div className="grid gap-5 lg:grid-cols-3">
          {items.map((item) => {
            const visual = productVisuals[item.id];
            const favoriteActive = isFavorite(item.id);
            const cartActive = isInCart(item.id);

            return (
              <article
                key={item.id}
                id={item.id}
                className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-[#d7e5f3] bg-white/95 shadow-[0_18px_48px_rgba(11,31,53,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#0f79ff]/20 hover:shadow-[0_28px_70px_rgba(11,31,53,0.12)]"
              >
                <div className={cn("relative overflow-hidden px-5 py-5 text-white", visual.headerClass)}>
                  <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:22px_22px]" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/28" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                        <span className={cn("h-2 w-2 rounded-full", visual.dotClass)} />
                        <span>{item.tag}</span>
                      </div>
                      <h2 className="font-display mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                        {item.title}
                      </h2>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        aria-label={isRomanian ? `Adauga ${item.title} la favorite` : `Add ${item.title} to favorites`}
                        aria-pressed={favoriteActive}
                        onClick={() => toggleFavorite(item.id)}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-200",
                          favoriteActive
                            ? "border-white/35 bg-white text-[#e11d48]"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/18",
                        )}
                      >
                        <HeartIcon active={favoriteActive} />
                      </button>
                      <button
                        type="button"
                        aria-label={isRomanian ? `Adauga ${item.title} in cos` : `Add ${item.title} to cart`}
                        aria-pressed={cartActive}
                        onClick={() => toggleCart(item.id)}
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-full border transition duration-200",
                          cartActive
                            ? "border-white/35 bg-white text-[#0f79ff]"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/18",
                        )}
                      >
                        <CartIcon />
                      </button>
                    </div>
                  </div>

                  <div className="relative mt-6 flex items-start gap-4">
                    <div className={cn("flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl", visual.iconClass)}>
                      <ProductGlyph id={item.id} />
                    </div>
                    <p className="text-sm leading-7 text-white/86">{item.kicker}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-5 py-5">
                  <div className="flex items-end justify-between gap-4 border-b border-[#e1edf8] pb-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#557089]">
                        {isRomanian ? "Investitie" : "Investment"}
                      </p>
                      <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#0b1f35]">
                        {formatEuroPrice(item.price, locale)}
                      </p>
                    </div>
                    <p className="max-w-[10rem] text-right text-xs leading-5 text-muted">{item.priceNote}</p>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-muted">{item.description}</p>

                  <div className="mt-5 space-y-3">
                    {item.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3 text-sm leading-6 text-[#0b1f35]">
                        <span className={cn("mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white", visual.lineClass)}>
                          <CheckIcon />
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-3">
                      <SiteLink
                        href="/contact"
                        className={cn(
                          "interactive-button inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold",
                          visual.buttonClass,
                        )}
                      >
                        <span>{isRomanian ? "Solicita detalii" : "Request details"}</span>
                        <ArrowIcon />
                      </SiteLink>
                      <button
                        type="button"
                        aria-pressed={cartActive}
                        onClick={() => toggleCart(item.id)}
                        className={cn(
                          "interactive-button inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition",
                          cartActive
                            ? "border-[#0f79ff]/22 bg-[#eef6ff] text-[#0b58d0]"
                            : "border-[#0d3358]/12 bg-white text-[#0b1f35] hover:border-[#0f79ff]/25",
                        )}
                      >
                        <CartIcon />
                        <span>{cartActive ? (isRomanian ? "In cos" : "In cart") : (isRomanian ? "Adauga in cos" : "Add to cart")}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
