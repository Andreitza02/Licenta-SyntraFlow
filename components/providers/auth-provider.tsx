"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { authService, type AuthProfile, type AuthUser, type LoginInput, type RegisterInput } from "@/lib/auth-service";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  requestPasswordReset: (email: string) => Promise<void>;
  updateProfile: (profile: AuthProfile) => Promise<AuthUser>;
  changePassword: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const sessionUser = authService.getSession();

    setUser(sessionUser);
    setStatus(sessionUser ? "authenticated" : "anonymous");
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const nextUser = await authService.login(input);
    setUser(nextUser);
    setStatus("authenticated");
    return nextUser;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const nextUser = await authService.register(input);
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

  const changePassword = useCallback(async () => {
    await authService.changePassword();
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo(
    () => ({
      status,
      user,
      login,
      register,
      requestPasswordReset,
      updateProfile,
      changePassword,
      logout,
    }),
    [changePassword, login, logout, register, requestPasswordReset, status, updateProfile, user],
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
