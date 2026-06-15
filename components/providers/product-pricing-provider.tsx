"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import type { DiscountTarget } from "@/lib/admin-types";
import type { Locale } from "@/lib/i18n";
import {
  defaultProductPrices,
  getProductCatalog,
  type ProductCatalogItem,
  type ProductId,
} from "@/lib/product-catalog";

type ProductPriceMap = Record<ProductId, number>;
type ProductAvailabilityMap = Record<ProductId, boolean>;

type HolidayDiscount = {
  percent: number;
  targetProductId: DiscountTarget;
  updatedAt: string | null;
  updatedBy: string;
};

type ProductPricingContextValue = {
  prices: ProductPriceMap;
  basePrices: ProductPriceMap;
  availability: ProductAvailabilityMap;
  holidayDiscount: HolidayDiscount;
  isLoading: boolean;
  getPrice: (id: ProductId, fallback?: number) => number;
  getOriginalPrice: (id: ProductId, fallback?: number) => number;
  getDiscountPercent: (id: ProductId) => number;
  isProductAvailable: (id: ProductId) => boolean;
  getCatalog: (locale: Locale) => ProductCatalogItem[];
  getCatalogMap: (locale: Locale) => Record<ProductId, ProductCatalogItem>;
  refreshPrices: () => Promise<void>;
  setProductPrice: (id: ProductId, price: number) => void;
  setProductAvailability: (id: ProductId, isAvailable: boolean) => void;
  setHolidayDiscount: (discount: HolidayDiscount) => void;
};

const ProductPricingContext = createContext<ProductPricingContextValue | null>(null);

function normalizePrices(products: unknown): ProductPriceMap {
  const nextPrices = { ...defaultProductPrices };

  if (Array.isArray(products)) {
    products.forEach((product) => {
      if (!product || typeof product !== "object") {
        return;
      }

      const item = product as { id?: unknown; price?: unknown };

      if (
        typeof item.id === "string" &&
        item.id in nextPrices &&
        typeof item.price === "number" &&
        Number.isFinite(item.price)
      ) {
        nextPrices[item.id as ProductId] = item.price;
      }
    });
  }

  return nextPrices;
}

function normalizeAvailability(products: unknown): ProductAvailabilityMap {
  const nextAvailability = Object.fromEntries(
    Object.keys(defaultProductPrices).map((id) => [id, true]),
  ) as ProductAvailabilityMap;

  if (Array.isArray(products)) {
    products.forEach((product) => {
      if (!product || typeof product !== "object") {
        return;
      }

      const item = product as { id?: unknown; isAvailable?: unknown };

      if (typeof item.id === "string" && item.id in nextAvailability && typeof item.isAvailable === "boolean") {
        nextAvailability[item.id as ProductId] = item.isAvailable;
      }
    });
  }

  return nextAvailability;
}

function normalizeDiscount(discount: unknown): HolidayDiscount {
  if (!discount || typeof discount !== "object") {
    return { percent: 0, targetProductId: "all", updatedAt: null, updatedBy: "system" };
  }

  const item = discount as { percent?: unknown; targetProductId?: unknown; updatedAt?: unknown; updatedBy?: unknown };
  const percent = typeof item.percent === "number" && Number.isFinite(item.percent)
    ? Math.min(100, Math.max(0, Math.round(item.percent)))
    : 0;
  const targetProductId = item.targetProductId === "all" || (
    typeof item.targetProductId === "string" && item.targetProductId in defaultProductPrices
  )
    ? item.targetProductId as DiscountTarget
    : "all";

  return {
    percent,
    targetProductId,
    updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : null,
    updatedBy: typeof item.updatedBy === "string" ? item.updatedBy : "system",
  };
}

function applyDiscount(price: number, percent: number) {
  if (percent <= 0) {
    return price;
  }

  return Math.max(0, Math.round(price * (100 - percent) / 100));
}

export function ProductPricingProvider({ children }: { children: React.ReactNode }) {
  const [basePrices, setBasePrices] = useState<ProductPriceMap>(defaultProductPrices);
  const [availability, setAvailability] = useState<ProductAvailabilityMap>(
    Object.fromEntries(Object.keys(defaultProductPrices).map((id) => [id, true])) as ProductAvailabilityMap,
  );
  const [holidayDiscount, setHolidayDiscountState] = useState<HolidayDiscount>({
    percent: 0,
    targetProductId: "all",
    updatedAt: null,
    updatedBy: "system",
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshPrices = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/product-prices", { cache: "no-store" });
      const payload = await response.json().catch(() => null);

      if (response.ok) {
        const products = payload && typeof payload === "object" ? (payload as { products?: unknown }).products : null;

        setBasePrices(normalizePrices(products));
        setAvailability(normalizeAvailability(products));
        setHolidayDiscountState(normalizeDiscount(payload && typeof payload === "object" ? (payload as { holidayDiscount?: unknown }).holidayDiscount : null));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshPrices();
  }, [refreshPrices]);

  const value = useMemo<ProductPricingContextValue>(() => {
    const getDiscountPercent = (id: ProductId) => (
      holidayDiscount.percent > 0 && (holidayDiscount.targetProductId === "all" || holidayDiscount.targetProductId === id)
        ? holidayDiscount.percent
        : 0
    );
    const prices = Object.fromEntries(
      Object.entries(basePrices).map(([id, price]) => {
        const productId = id as ProductId;
        return [id, applyDiscount(price, getDiscountPercent(productId))];
      }),
    ) as ProductPriceMap;
    const getOriginalPrice = (id: ProductId, fallback = defaultProductPrices[id]) => basePrices[id] ?? fallback;
    const getPrice = (id: ProductId, fallback = defaultProductPrices[id]) => applyDiscount(getOriginalPrice(id, fallback), getDiscountPercent(id));
    const isProductAvailable = (id: ProductId) => availability[id] ?? true;
    const getCatalog = (locale: Locale) => (
      getProductCatalog(locale).map((item) => ({
        ...item,
        originalPrice: getOriginalPrice(item.id, item.price),
        price: getPrice(item.id, item.price),
        discountPercent: getDiscountPercent(item.id),
        isAvailable: isProductAvailable(item.id),
      }))
    );
    const getCatalogMap = (locale: Locale) => (
      Object.fromEntries(getCatalog(locale).map((item) => [item.id, item])) as Record<ProductId, ProductCatalogItem>
    );

    return {
      prices,
      basePrices,
      availability,
      holidayDiscount,
      isLoading,
      getPrice,
      getOriginalPrice,
      getDiscountPercent,
      isProductAvailable,
      getCatalog,
      getCatalogMap,
      refreshPrices,
      setProductPrice: (id, price) => setBasePrices((current) => ({ ...current, [id]: price })),
      setProductAvailability: (id, isAvailable) => setAvailability((current) => ({ ...current, [id]: isAvailable })),
      setHolidayDiscount: (discount) => setHolidayDiscountState(discount),
    };
  }, [availability, basePrices, holidayDiscount, isLoading, refreshPrices]);

  return <ProductPricingContext.Provider value={value}>{children}</ProductPricingContext.Provider>;
}

export function useProductPricing() {
  const context = useContext(ProductPricingContext);

  if (!context) {
    throw new Error("useProductPricing must be used within ProductPricingProvider");
  }

  return context;
}
