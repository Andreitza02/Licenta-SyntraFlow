"use client";

import { createContext, useContext, useMemo } from "react";

import { useLocalStorage } from "@/lib/hooks/use-local-storage";

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

  const value = useMemo<CartContextValue>(() => {
    const cartIds = state.cartIds ?? [];
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
  }, [isHydrated, setState, state.cartIds, state.favoriteIds]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
