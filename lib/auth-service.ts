import type { AuthProfile, AuthUser, LoginInput, RegisterInput } from "@/lib/account-types";

export type { AccountRole, AuthProfile, AuthUser, LoginInput, RegisterInput } from "@/lib/account-types";

type StoredSession = {
  active: true;
  createdAt: string;
  remember: boolean;
  token: string;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};

const PROFILE_KEY = "syntraflow.dev.auth.profile";
const SESSION_KEY = "syntraflow.dev.auth.session";

async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload && typeof payload === "object" && typeof (payload as { error?: unknown }).error === "string"
      ? (payload as { error: string }).error
      : "Actiunea nu a putut fi finalizata.";

    throw new Error(message);
  }

  return payload as T;
}

function readJson<T>(key: string, storage: Storage): T | null {
  try {
    const rawValue = storage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : null;
  } catch {
    return null;
  }
}

function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    readJson<StoredSession>(SESSION_KEY, window.sessionStorage) ??
    readJson<StoredSession>(SESSION_KEY, window.localStorage)
  );
}

function writeProfile(user: AuthUser) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(user));
}

function setSession(token: string, remember: boolean) {
  const sessionValue = JSON.stringify({
    active: true,
    createdAt: new Date().toISOString(),
    remember,
    token,
  } satisfies StoredSession);

  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);

  if (remember) {
    window.localStorage.setItem(SESSION_KEY, sessionValue);
    return;
  }

  window.sessionStorage.setItem(SESSION_KEY, sessionValue);
}

function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);
}

export const authService = {
  getToken() {
    return readStoredSession()?.token ?? null;
  },

  async getSession() {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const payload = await parseApiResponse<{ user: AuthUser | null }>(
      await fetch("/api/account/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }),
    );

    if (!payload.user) {
      clearSession();
      return null;
    }

    writeProfile(payload.user);
    return payload.user;
  },

  async login(input: LoginInput) {
    const result = await parseApiResponse<AuthResponse>(
      await fetch("/api/account/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    );

    writeProfile(result.user);
    setSession(result.token, input.remember);

    return result.user;
  },

  async register(input: RegisterInput) {
    const result = await parseApiResponse<AuthResponse>(
      await fetch("/api/account/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),
    );

    writeProfile(result.user);
    setSession(result.token, true);

    return result.user;
  },

  async requestPasswordReset(email: string) {
    await new Promise((resolve) => window.setTimeout(resolve, 650));

    if (email.toLowerCase().includes("error")) {
      throw new Error("Instructiunile de resetare nu au putut fi trimise.");
    }
  },

  async updateProfile(profile: AuthProfile) {
    const token = this.getToken();

    if (!token) {
      throw new Error("Sesiunea nu mai este activa.");
    }

    const result = await parseApiResponse<{ user: AuthUser }>(
      await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, profile }),
      }),
    );

    writeProfile(result.user);
    return result.user;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const token = this.getToken();

    if (!token) {
      throw new Error("Sesiunea nu mai este activa.");
    }

    await parseApiResponse<{ success: true }>(
      await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, currentPassword, newPassword }),
      }),
    );
  },

  logout() {
    const token = this.getToken();
    clearSession();

    if (token) {
      void fetch("/api/account/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    }
  },
};
