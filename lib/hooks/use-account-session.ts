"use client";

import { useCallback, useEffect, useState } from "react";

export type AccountSession = {
  username: string;
  password: string;
  isLoggedIn: boolean;
};

const ACCOUNT_STORAGE_KEY = "syntraflow-account-session";
const ACCOUNT_CHANGE_EVENT = "syntraflow-account-session-change";

function readAccount(): AccountSession | null {
  try {
    const stored = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<AccountSession>;

    if (!parsed.username || !parsed.password) {
      return null;
    }

    return {
      username: String(parsed.username),
      password: String(parsed.password),
      isLoggedIn: Boolean(parsed.isLoggedIn),
    };
  } catch {
    return null;
  }
}

function writeAccount(account: AccountSession | null) {
  try {
    if (account) {
      window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
    } else {
      window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    }

    window.dispatchEvent(new Event(ACCOUNT_CHANGE_EVENT));
  } catch {
    // Ignore storage write errors in private mode or restricted environments.
  }
}

export function useAccountSession() {
  const [account, setAccountState] = useState<AccountSession | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const syncAccount = useCallback(() => {
    setAccountState(readAccount());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    syncAccount();

    window.addEventListener("storage", syncAccount);
    window.addEventListener(ACCOUNT_CHANGE_EVENT, syncAccount);

    return () => {
      window.removeEventListener("storage", syncAccount);
      window.removeEventListener(ACCOUNT_CHANGE_EVENT, syncAccount);
    };
  }, [syncAccount]);

  const setAccount = useCallback((nextAccount: AccountSession | null) => {
    setAccountState(nextAccount);
    writeAccount(nextAccount);
  }, []);

  const register = useCallback(
    (username: string, password: string) => {
      const nextAccount = {
        username: username.trim(),
        password,
        isLoggedIn: false,
      };

      setAccount(nextAccount);
      return nextAccount;
    },
    [setAccount],
  );

  const login = useCallback(
    (username: string, password: string) => {
      const storedAccount = readAccount();

      if (!storedAccount) {
        return false;
      }

      if (storedAccount.username !== username.trim() || storedAccount.password !== password) {
        return false;
      }

      setAccount({ ...storedAccount, isLoggedIn: true });
      return true;
    },
    [setAccount],
  );

  const logout = useCallback(() => {
    const storedAccount = readAccount();

    if (!storedAccount) {
      setAccount(null);
      return;
    }

    setAccount({ ...storedAccount, isLoggedIn: false });
  }, [setAccount]);

  const clearAccount = useCallback(() => {
    setAccount(null);
  }, [setAccount]);

  return {
    account,
    clearAccount,
    hasAccount: Boolean(account?.username && account?.password),
    isHydrated,
    isLoggedIn: Boolean(account?.isLoggedIn),
    login,
    logout,
    register,
    username: account?.username ?? "",
  };
}
