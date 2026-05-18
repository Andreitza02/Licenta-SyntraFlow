export type AuthProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
};

export type AuthUser = AuthProfile & {
  createdAt: string;
};

export type LoginInput = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const PROFILE_KEY = "syntraflow.dev.auth.profile";
const SESSION_KEY = "syntraflow.dev.auth.session";

const defaultUser: AuthUser = {
  firstName: "Andrei",
  lastName: "Popescu",
  email: "andrei@syntraflow.local",
  phone: "+40 721 000 000",
  company: "SyntraFlow",
  role: "Product Lead",
  createdAt: new Date().toISOString(),
};

function wait(ms = 600) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(undefined), ms);
  });
}

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : null;
  } catch {
    return null;
  }
}

function writeProfile(user: AuthUser) {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(user));
}

function setSession(remember: boolean) {
  const sessionValue = JSON.stringify({
    active: true,
    createdAt: new Date().toISOString(),
    remember,
  });

  window.sessionStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(SESSION_KEY);

  if (remember) {
    window.localStorage.setItem(SESSION_KEY, sessionValue);
    return;
  }

  window.sessionStorage.setItem(SESSION_KEY, sessionValue);
}

function hasActiveSession() {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.sessionStorage.getItem(SESSION_KEY) || window.localStorage.getItem(SESSION_KEY));
}

function getStoredProfile(email?: string): AuthUser {
  const storedProfile = readJson<AuthUser>(PROFILE_KEY);

  if (storedProfile) {
    return {
      ...defaultUser,
      ...storedProfile,
      email: email ?? storedProfile.email,
    };
  }

  if (!email) {
    return defaultUser;
  }

  const [namePart] = email.split("@");
  const readableName = namePart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    ...defaultUser,
    firstName: readableName.split(" ")[0] || "SyntraFlow",
    lastName: readableName.split(" ").slice(1).join(" ") || "User",
    email,
    createdAt: new Date().toISOString(),
  };
}

export const authService = {
  getSession() {
    if (!hasActiveSession()) {
      return null;
    }

    return getStoredProfile();
  },

  async login(input: LoginInput) {
    // TODO: Replace local storage with the real backend auth provider sign-in call.
    await wait();

    if (input.email.toLowerCase().includes("error") || input.password.toLowerCase() === "fail-login") {
      throw new Error("Autentificarea nu a putut fi finalizata. Verifica emailul si parola.");
    }

    const user = getStoredProfile(input.email.trim().toLowerCase());
    writeProfile(user);
    setSession(input.remember);

    return user;
  },

  async register(input: RegisterInput) {
    // TODO: Replace local storage with the real backend account creation endpoint.
    await wait(750);

    if (input.email.toLowerCase().includes("error")) {
      throw new Error("Contul nu a putut fi creat pentru acest email.");
    }

    const user: AuthUser = {
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: "",
      company: "",
      role: "",
      createdAt: new Date().toISOString(),
    };

    writeProfile(user);
    setSession(true);

    return user;
  },

  async requestPasswordReset(email: string) {
    // TODO: Send the reset request through the backend auth provider.
    await wait(650);

    if (email.toLowerCase().includes("error")) {
      throw new Error("Instructiunile de resetare nu au putut fi trimise.");
    }
  },

  async updateProfile(profile: AuthProfile) {
    // TODO: Persist profile changes through the authenticated backend API.
    await wait(700);

    if (profile.email.toLowerCase().includes("error")) {
      throw new Error("Profilul nu a putut fi salvat pentru acest email.");
    }

    const currentUser = getStoredProfile(profile.email);
    const user: AuthUser = {
      ...currentUser,
      ...profile,
      email: profile.email.trim().toLowerCase(),
    };

    writeProfile(user);
    return user;
  },

  async changePassword() {
    // TODO: Replace with backend password update. Passwords are intentionally never stored locally.
    await wait(650);
  },

  logout() {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(SESSION_KEY);
  },
};
