"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { authService, type AuthProfile, type AuthUser, type LoginInput, type RegisterInput } from "@/lib/auth-service";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  token: string | null;
  user: AuthUser | null;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  requestPasswordReset: (email: string) => Promise<void>;
  updateProfile: (profile: AuthProfile) => Promise<AuthUser>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const sessionUser = await authService.getSession();

      if (!active) {
        return;
      }

      setToken(authService.getToken());
      setUser(sessionUser);
      setStatus(sessionUser ? "authenticated" : "anonymous");
    }

    loadSession().catch(() => {
      if (!active) {
        return;
      }

      setToken(null);
      setUser(null);
      setStatus("anonymous");
    });

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const nextUser = await authService.login(input);
    setToken(authService.getToken());
    setUser(nextUser);
    setStatus("authenticated");
    return nextUser;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const nextUser = await authService.register(input);
    setToken(authService.getToken());
    setUser(nextUser);
    setStatus("authenticated");
    return nextUser;
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    await authService.requestPasswordReset(email);
  }, []);

  const updateProfile = useCallback(async (profile: AuthProfile) => {
    const nextUser = await authService.updateProfile(profile);
    setUser(nextUser);
    return nextUser;
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    await authService.changePassword(currentPassword, newPassword);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo(
    () => ({
      status,
      token,
      user,
      login,
      register,
      requestPasswordReset,
      updateProfile,
      changePassword,
      logout,
    }),
    [changePassword, login, logout, register, requestPasswordReset, status, token, updateProfile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
