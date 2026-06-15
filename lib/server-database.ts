import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { pbkdf2Sync, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";

import type {
  AdminCustomerRecord,
  AdminDashboardData,
  DiscountTarget,
  DiscountHistoryRecord,
  HolidayDiscountRecord,
  PriceHistoryRecord,
  ProductPriceRecord,
} from "@/lib/admin-types";
import type { AccountRole, AuthProfile, AuthUser, LoginInput, RegisterInput } from "@/lib/account-types";
import { defaultProductPrices, type ProductId } from "@/lib/product-catalog";

type StoredAccount = AuthProfile & {
  id: string;
  accountRole: AccountRole;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

type StoredSession = {
  token: string;
  accountId: string;
  createdAt: string;
  expiresAt: string;
  remember: boolean;
};

type SyntraFlowDatabase = {
  accounts: StoredAccount[];
  sessions: StoredSession[];
  productPrices: Record<ProductId, ProductPriceRecord>;
  holidayDiscount: HolidayDiscountRecord;
  priceHistory: PriceHistoryRecord[];
  discountHistory: DiscountHistoryRecord[];
};

type AuthResult = {
  user: AuthUser;
  token: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "syntraflow-db.json");
const productIds = Object.keys(defaultProductPrices) as ProductId[];
let writeChain = Promise.resolve();

function nowIso() {
  return new Date().toISOString();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeText(value: string, maxLength: number) {
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeDiscountTarget(value: unknown): DiscountTarget {
  if (value === "all") {
    return "all";
  }

  if (typeof value === "string" && productIds.includes(value as ProductId)) {
    return value as ProductId;
  }

  return "all";
}

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex");
  return { hash, salt };
}

function verifyPassword(password: string, account: StoredAccount) {
  const candidate = Buffer.from(hashPassword(password, account.passwordSalt).hash, "hex");
  const stored = Buffer.from(account.passwordHash, "hex");

  if (candidate.length !== stored.length) {
    return false;
  }

  return timingSafeEqual(candidate, stored);
}

function createStoredAccount(
  input: AuthProfile & {
    accountRole: AccountRole;
    password: string;
  },
): StoredAccount {
  const timestamp = nowIso();
  const password = hashPassword(input.password);

  return {
    id: randomUUID(),
    firstName: normalizeText(input.firstName, 80),
    lastName: normalizeText(input.lastName, 80),
    email: normalizeEmail(input.email),
    phone: normalizeText(input.phone, 40),
    company: normalizeText(input.company, 120),
    role: normalizeText(input.role, 120),
    accountRole: input.accountRole,
    passwordHash: password.hash,
    passwordSalt: password.salt,
    createdAt: timestamp,
    updatedAt: timestamp,
    lastLoginAt: null,
  };
}

function createInitialDatabase(): SyntraFlowDatabase {
  const systemUser = "system";
  const timestamp = nowIso();

  return {
    accounts: [
      createStoredAccount({
        firstName: "Admin",
        lastName: "SyntraFlow",
        email: "admin@syntraflow.local",
        phone: "+40 721 000 000",
        company: "SyntraFlow",
        role: "Administrator",
        accountRole: "admin",
        password: "Admin123!",
      }),
      createStoredAccount({
        firstName: "Andrei",
        lastName: "Popescu",
        email: "andrei@syntraflow.local",
        phone: "+40 721 000 000",
        company: "SyntraFlow",
        role: "Client",
        accountRole: "client",
        password: "Syntra123!",
      }),
    ],
    sessions: [],
    productPrices: {
      ai: {
        id: "ai",
        price: defaultProductPrices.ai,
        isAvailable: true,
        updatedAt: timestamp,
        updatedBy: systemUser,
      },
      "website-builder": {
        id: "website-builder",
        price: defaultProductPrices["website-builder"],
        isAvailable: true,
        updatedAt: timestamp,
        updatedBy: systemUser,
      },
      hosting: {
        id: "hosting",
        price: defaultProductPrices.hosting,
        isAvailable: true,
        updatedAt: timestamp,
        updatedBy: systemUser,
      },
      "maintenance-support": {
        id: "maintenance-support",
        price: defaultProductPrices["maintenance-support"],
        isAvailable: true,
        updatedAt: timestamp,
        updatedBy: systemUser,
      },
    },
    holidayDiscount: {
      percent: 0,
      targetProductId: "all",
      updatedAt: timestamp,
      updatedBy: systemUser,
    },
    priceHistory: [],
    discountHistory: [],
  };
}

function sanitizeDatabase(database: SyntraFlowDatabase): SyntraFlowDatabase {
  const fallback = createInitialDatabase();
  const sourceProductPrices = database.productPrices ?? {};
  const productPrices = Object.fromEntries(
    productIds.map((id) => {
      const stored = sourceProductPrices[id] ?? {};
      const fallbackProduct = fallback.productPrices[id];
      const storedPrice = typeof stored.price === "number" && Number.isFinite(stored.price)
        ? Math.max(0, Math.round(stored.price))
        : fallbackProduct.price;

      return [
        id,
        {
          ...fallbackProduct,
          ...stored,
          id,
          price: storedPrice,
          isAvailable: typeof stored.isAvailable === "boolean" ? stored.isAvailable : true,
          updatedAt: typeof stored.updatedAt === "string" ? stored.updatedAt : fallbackProduct.updatedAt,
          updatedBy: typeof stored.updatedBy === "string" ? stored.updatedBy : fallbackProduct.updatedBy,
        },
      ];
    }),
  ) as Record<ProductId, ProductPriceRecord>;
  const storedDiscount = database.holidayDiscount ?? fallback.holidayDiscount;
  const discountPercent = typeof storedDiscount.percent === "number" && Number.isFinite(storedDiscount.percent)
    ? Math.min(100, Math.max(0, Math.round(storedDiscount.percent)))
    : 0;

  return {
    accounts: Array.isArray(database.accounts) ? database.accounts : fallback.accounts,
    sessions: Array.isArray(database.sessions) ? database.sessions : [],
    productPrices,
    holidayDiscount: {
      percent: discountPercent,
      targetProductId: normalizeDiscountTarget(storedDiscount.targetProductId),
      updatedAt: typeof storedDiscount.updatedAt === "string" ? storedDiscount.updatedAt : fallback.holidayDiscount.updatedAt,
      updatedBy: typeof storedDiscount.updatedBy === "string" ? storedDiscount.updatedBy : fallback.holidayDiscount.updatedBy,
    },
    priceHistory: Array.isArray(database.priceHistory) ? database.priceHistory : [],
    discountHistory: Array.isArray(database.discountHistory)
      ? database.discountHistory.map((entry) => ({
          ...entry,
          oldTargetProductId: normalizeDiscountTarget(entry.oldTargetProductId),
          newTargetProductId: normalizeDiscountTarget(entry.newTargetProductId),
        }))
      : [],
  };
}

async function readDatabase(): Promise<SyntraFlowDatabase> {
  await mkdir(dataDirectory, { recursive: true });

  if (!existsSync(databasePath)) {
    const initialDatabase = createInitialDatabase();
    await writeDatabase(initialDatabase);
    return initialDatabase;
  }

  const rawValue = await readFile(databasePath, "utf8");
  return sanitizeDatabase(JSON.parse(rawValue) as SyntraFlowDatabase);
}

async function writeDatabase(database: SyntraFlowDatabase) {
  await mkdir(dataDirectory, { recursive: true });

  writeChain = writeChain.then(() => (
    writeFile(databasePath, `${JSON.stringify(database, null, 2)}\n`, "utf8")
  ));

  return writeChain;
}

async function updateDatabase<T>(mutate: (database: SyntraFlowDatabase) => T | Promise<T>) {
  const database = await readDatabase();
  const result = await mutate(database);
  await writeDatabase(database);
  return result;
}

function toAuthUser(account: StoredAccount): AuthUser {
  return {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phone: account.phone,
    company: account.company,
    role: account.role,
    accountRole: account.accountRole,
    createdAt: account.createdAt,
  };
}

function toCustomerRecord(account: StoredAccount): AdminCustomerRecord {
  return {
    id: account.id,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phone: account.phone,
    company: account.company,
    role: account.role,
    accountRole: account.accountRole,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    lastLoginAt: account.lastLoginAt,
  };
}

function createSession(database: SyntraFlowDatabase, accountId: string, remember: boolean) {
  const token = randomUUID();
  const createdAt = nowIso();
  const maxAgeDays = remember ? 30 : 1;
  const expiresAt = new Date(Date.now() + maxAgeDays * 24 * 60 * 60 * 1000).toISOString();

  database.sessions = database.sessions.filter((session) => new Date(session.expiresAt).getTime() > Date.now());
  database.sessions.push({ token, accountId, createdAt, expiresAt, remember });

  return token;
}

async function getAccountForToken(token: string) {
  const database = await readDatabase();
  const session = database.sessions.find((entry) => entry.token === token);

  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
    return null;
  }

  const account = database.accounts.find((entry) => entry.id === session.accountId);
  return account ?? null;
}

function getAccountOrThrow(database: SyntraFlowDatabase, accountId: string) {
  const account = database.accounts.find((entry) => entry.id === accountId);

  if (!account) {
    throw new Error("Contul nu mai exista.");
  }

  return account;
}

export async function getPublicProductPrices() {
  const database = await readDatabase();
  return {
    products: productIds.map((id) => database.productPrices[id]),
    holidayDiscount: database.holidayDiscount,
  };
}

export async function loginAccount(input: LoginInput): Promise<AuthResult> {
  const email = normalizeEmail(input.email);

  return updateDatabase((database) => {
    const account = database.accounts.find((entry) => entry.email === email);

    if (!account || !verifyPassword(input.password, account)) {
      throw new Error("Emailul sau parola nu sunt corecte.");
    }

    account.lastLoginAt = nowIso();
    account.updatedAt = account.lastLoginAt;

    return {
      user: toAuthUser(account),
      token: createSession(database, account.id, input.remember),
    };
  });
}

export async function registerAccount(input: RegisterInput): Promise<AuthResult> {
  const email = normalizeEmail(input.email);

  return updateDatabase((database) => {
    const existingAccount = database.accounts.find((entry) => entry.email === email);

    if (existingAccount) {
      throw new Error("Exista deja un cont pentru acest email.");
    }

    const account = createStoredAccount({
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      phone: "",
      company: "",
      role: "Client",
      accountRole: "client",
      password: input.password,
    });

    account.lastLoginAt = nowIso();
    database.accounts.push(account);

    return {
      user: toAuthUser(account),
      token: createSession(database, account.id, true),
    };
  });
}

export async function getSessionUser(token: string) {
  const account = await getAccountForToken(token);
  return account ? toAuthUser(account) : null;
}

export async function updateAccountProfile(token: string, profile: AuthProfile) {
  const sessionAccount = await getAccountForToken(token);

  if (!sessionAccount) {
    throw new Error("Sesiunea nu mai este activa.");
  }

  return updateDatabase((database) => {
    const account = getAccountOrThrow(database, sessionAccount.id);
    const requestedEmail = normalizeEmail(profile.email);
    const emailOwner = database.accounts.find((entry) => entry.email === requestedEmail && entry.id !== account.id);

    if (emailOwner) {
      throw new Error("Emailul este deja folosit de alt cont.");
    }

    account.firstName = normalizeText(profile.firstName, 80);
    account.lastName = normalizeText(profile.lastName, 80);
    account.email = requestedEmail;
    account.phone = normalizeText(profile.phone, 40);
    account.company = normalizeText(profile.company, 120);
    account.role = normalizeText(profile.role, 120);
    account.updatedAt = nowIso();

    return toAuthUser(account);
  });
}

export async function changeAccountPassword(token: string, currentPassword: string, newPassword: string) {
  const sessionAccount = await getAccountForToken(token);

  if (!sessionAccount) {
    throw new Error("Sesiunea nu mai este activa.");
  }

  await updateDatabase((database) => {
    const account = getAccountOrThrow(database, sessionAccount.id);

    if (!verifyPassword(currentPassword, account)) {
      throw new Error("Parola curenta nu este corecta.");
    }

    const password = hashPassword(newPassword);
    account.passwordHash = password.hash;
    account.passwordSalt = password.salt;
    account.updatedAt = nowIso();
  });
}

export async function logoutSession(token: string) {
  await updateDatabase((database) => {
    database.sessions = database.sessions.filter((session) => session.token !== token);
  });
}

export async function getAdminDashboard(token: string): Promise<AdminDashboardData> {
  const admin = await getAccountForToken(token);

  if (!admin || admin.accountRole !== "admin") {
    throw new Error("Ai nevoie de acces admin pentru aceasta zona.");
  }

  const database = await readDatabase();

  return {
    products: productIds.map((id) => database.productPrices[id]),
    holidayDiscount: database.holidayDiscount,
    history: [...database.priceHistory].sort((a, b) => b.changedAt.localeCompare(a.changedAt)),
    discountHistory: [...database.discountHistory].sort((a, b) => b.changedAt.localeCompare(a.changedAt)),
    customers: database.accounts.map(toCustomerRecord).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  };
}

export async function updateProductPrice(
  token: string,
  productId: ProductId,
  price: number,
  note: string,
) {
  const admin = await getAccountForToken(token);

  if (!admin || admin.accountRole !== "admin") {
    throw new Error("Ai nevoie de acces admin pentru modificarea preturilor.");
  }

  if (!productIds.includes(productId) || !Number.isFinite(price) || price < 0 || price > 1000000) {
    throw new Error("Pretul trimis nu este valid.");
  }

  return updateDatabase((database) => {
    const currentPrice = database.productPrices[productId];
    const roundedPrice = Math.round(price);
    const changedAt = nowIso();

    if (currentPrice.price !== roundedPrice) {
      database.priceHistory.unshift({
        id: randomUUID(),
        productId,
        oldPrice: currentPrice.price,
        newPrice: roundedPrice,
        changedAt,
        changedBy: `${admin.firstName} ${admin.lastName}`.trim(),
        changedByEmail: admin.email,
        note: normalizeText(note, 180),
      });
    }

    database.productPrices[productId] = {
      ...currentPrice,
      id: productId,
      price: roundedPrice,
      isAvailable: currentPrice.isAvailable,
      updatedAt: changedAt,
      updatedBy: admin.email,
    };

    return {
      products: productIds.map((id) => database.productPrices[id]),
      history: [...database.priceHistory],
    };
  });
}

export async function updateProductAvailability(
  token: string,
  productId: ProductId,
  isAvailable: boolean,
) {
  const admin = await getAccountForToken(token);

  if (!admin || admin.accountRole !== "admin") {
    throw new Error("Ai nevoie de acces admin pentru modificarea disponibilitatii.");
  }

  if (!productIds.includes(productId)) {
    throw new Error("Produsul trimis nu este valid.");
  }

  return updateDatabase((database) => {
    const currentProduct = database.productPrices[productId];

    database.productPrices[productId] = {
      ...currentProduct,
      isAvailable,
      updatedAt: nowIso(),
      updatedBy: admin.email,
    };

    return {
      products: productIds.map((id) => database.productPrices[id]),
    };
  });
}

export async function updateHolidayDiscount(
  token: string,
  percent: number,
  targetProductId: DiscountTarget | string,
  note: string,
) {
  const admin = await getAccountForToken(token);

  if (!admin || admin.accountRole !== "admin") {
    throw new Error("Ai nevoie de acces admin pentru modificarea discountului.");
  }

  if (!Number.isFinite(percent) || percent < 0 || percent > 100) {
    throw new Error("Discountul trebuie sa fie intre 0 si 100.");
  }

  const normalizedTarget = normalizeDiscountTarget(targetProductId);

  return updateDatabase((database) => {
    const roundedPercent = Math.round(percent);
    const currentDiscount = database.holidayDiscount;
    const changedAt = nowIso();

    if (currentDiscount.percent !== roundedPercent || currentDiscount.targetProductId !== normalizedTarget) {
      database.discountHistory.unshift({
        id: randomUUID(),
        oldPercent: currentDiscount.percent,
        newPercent: roundedPercent,
        oldTargetProductId: currentDiscount.targetProductId,
        newTargetProductId: normalizedTarget,
        changedAt,
        changedBy: `${admin.firstName} ${admin.lastName}`.trim(),
        changedByEmail: admin.email,
        note: normalizeText(note, 180),
      });
    }

    database.holidayDiscount = {
      percent: roundedPercent,
      targetProductId: normalizedTarget,
      updatedAt: changedAt,
      updatedBy: admin.email,
    };

    return {
      holidayDiscount: database.holidayDiscount,
      discountHistory: [...database.discountHistory],
    };
  });
}
