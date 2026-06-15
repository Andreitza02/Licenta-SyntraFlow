"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useProductPricing } from "@/components/providers/product-pricing-provider";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import type { ProductId } from "@/lib/product-catalog";

type ShopState = {
  cartIds: string[];
  favoriteIds: string[];
};

type CartContextValue = {
  cartIds: string[];
  favoriteIds: string[];
  cartCount: number;
  favoriteCount: number;
  isHydrated: boolean;
  isInCart: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  toggleCart: (id: string) => void;
  toggleFavorite: (id: string) => void;
  removeFromCart: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  clearCart: () => void;
  clearFavorites: () => void;
};

const initialState: ShopState = {
  cartIds: [],
  favoriteIds: [],
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState, isHydrated] = useLocalStorage<ShopState>("syntraflow-shop-state", initialState);
  const { status } = useAuth();
  const { isProductAvailable } = useProductPricing();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [unavailableDialogOpen, setUnavailableDialogOpen] = useState(false);
  const isAuthenticated = status === "authenticated";
  const loginHref = loginDialogOpen && typeof window !== "undefined"
    ? `/login?next=${encodeURIComponent(`${window.location.pathname}${window.location.search}${window.location.hash}` || "/product")}`
    : "/login?next=%2Fproduct";

  useEffect(() => {
    if (isAuthenticated) {
      setLoginDialogOpen(false);
    }
  }, [isAuthenticated]);

  const value = useMemo<CartContextValue>(() => {
    const cartIds = isAuthenticated ? (state.cartIds ?? []).filter((id) => isProductAvailable(id as ProductId)) : [];
    const favoriteIds = state.favoriteIds ?? [];

    const toggleArrayValue = (source: string[], id: string) => (
      source.includes(id) ? source.filter((entry) => entry !== id) : [...source, id]
    );

    return {
      cartIds,
      favoriteIds,
      cartCount: cartIds.length,
      favoriteCount: favoriteIds.length,
      isHydrated,
      isInCart: (id) => cartIds.includes(id),
      isFavorite: (id) => favoriteIds.includes(id),
      toggleCart: (id) => {
        if (!isAuthenticated) {
          setLoginDialogOpen(true);
          return;
        }

        if (!isProductAvailable(id as ProductId)) {
          setUnavailableDialogOpen(true);
          return;
        }

        setState((current) => ({
          cartIds: toggleArrayValue(current.cartIds ?? [], id),
          favoriteIds: current.favoriteIds ?? [],
        }));
      },
      toggleFavorite: (id) => {
        setState((current) => ({
          cartIds: current.cartIds ?? [],
          favoriteIds: toggleArrayValue(current.favoriteIds ?? [], id),
        }));
      },
      removeFromCart: (id) => {
        if (!isAuthenticated) {
          return;
        }

        setState((current) => ({
          cartIds: (current.cartIds ?? []).filter((entry) => entry !== id),
          favoriteIds: current.favoriteIds ?? [],
        }));
      },
      removeFromFavorites: (id) => {
        setState((current) => ({
          cartIds: current.cartIds ?? [],
          favoriteIds: (current.favoriteIds ?? []).filter((entry) => entry !== id),
        }));
      },
      clearCart: () => {
        if (!isAuthenticated) {
          return;
        }

        setState((current) => ({
          cartIds: [],
          favoriteIds: current.favoriteIds ?? [],
        }));
      },
      clearFavorites: () => {
        setState((current) => ({
          cartIds: current.cartIds ?? [],
          favoriteIds: [],
        }));
      },
    };
  }, [isAuthenticated, isHydrated, isProductAvailable, setState, state.cartIds, state.favoriteIds]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {loginDialogOpen ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07192b]/48 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-login-dialog-title"
          onClick={() => setLoginDialogOpen(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl border border-[#d7e5f3] bg-white shadow-[0_28px_90px_rgba(11,31,53,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-[#e1edf8] bg-[linear-gradient(135deg,rgba(15,121,255,0.1),rgba(19,181,186,0.09))] px-6 py-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f79ff] text-white shadow-[0_16px_34px_rgba(15,121,255,0.24)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 10.5V8a5 5 0 0 1 10 0v2.5" />
                  <path d="M6.5 10.5h11A1.5 1.5 0 0 1 19 12v6.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5V12a1.5 1.5 0 0 1 1.5-1.5Z" />
                  <path d="M12 14v2.5" />
                </svg>
              </span>
              <h2 id="cart-login-dialog-title" className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
                Nu esti logat
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Pentru a adauga produse in cos sau pentru a cumpara de pe SyntraFlow, trebuie sa intri in cont.
              </p>
            </div>

            <div className="grid gap-3 px-6 py-5 sm:grid-cols-2">
              <a
                href={loginHref}
                className="interactive-button inline-flex items-center justify-center rounded-full bg-[#0f79ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(15,121,255,0.22)] transition duration-300 hover:-translate-y-0.5"
              >
                Intra in cont
              </a>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-[#d7e5f3] bg-white px-5 py-3 text-sm font-semibold text-[#0b1f35] transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/24"
                onClick={() => setLoginDialogOpen(false)}
              >
                Inchide
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {unavailableDialogOpen ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#07192b]/48 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-unavailable-dialog-title"
          onClick={() => setUnavailableDialogOpen(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl border border-[#d7e5f3] bg-white shadow-[0_28px_90px_rgba(11,31,53,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-[#e1edf8] bg-[linear-gradient(135deg,rgba(15,121,255,0.1),rgba(19,181,186,0.09))] px-6 py-5">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b1f35] text-white shadow-[0_16px_34px_rgba(11,31,53,0.2)]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <path d="M10.3 4.5 2.7 18a1.6 1.6 0 0 0 1.4 2.4h15.8a1.6 1.6 0 0 0 1.4-2.4L13.7 4.5a1.95 1.95 0 0 0-3.4 0Z" />
                </svg>
              </span>
              <h2 id="cart-unavailable-dialog-title" className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#0b1f35]">
                Produs indisponibil
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">
                Produsul este momentan out of stock si nu poate fi adaugat in cos.
              </p>
            </div>

            <div className="px-6 py-5">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#d7e5f3] bg-white px-5 py-3 text-sm font-semibold text-[#0b1f35] transition duration-300 hover:-translate-y-0.5 hover:border-[#0f79ff]/24"
                onClick={() => setUnavailableDialogOpen(false)}
              >
                Inchide
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
