"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { FormStatus, GridIcon, SettingsIcon, UserIcon } from "@/components/account/account-form-ui";
import { useAuth } from "@/components/providers/auth-provider";
import { useProductPricing } from "@/components/providers/product-pricing-provider";
import type {
  AdminCustomerRecord,
  AdminDashboardData,
  DiscountTarget,
  DiscountHistoryRecord,
  HolidayDiscountRecord,
  PriceHistoryRecord,
  ProductPriceRecord,
} from "@/lib/admin-types";
import type { Locale } from "@/lib/i18n";
import { formatEuroPrice, getProductCatalog, type ProductId } from "@/lib/product-catalog";
import { buttonVariants, cn } from "@/lib/utils";

type StatusState = {
  tone: "success" | "error" | "info";
  title: string;
  description?: string;
};

const emptyDashboard: AdminDashboardData = {
  products: [],
  holidayDiscount: {
    percent: 0,
    targetProductId: "all",
    updatedAt: "",
    updatedBy: "system",
  },
  history: [],
  discountHistory: [],
  customers: [],
};

function formatDate(value: string | null, locale: Locale) {
  if (!value) {
    return locale === "ro" ? "Niciodata" : "Never";
  }

  return new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

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

function AdminStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-[#d8e6f4] bg-white/86 p-4 shadow-[0_14px_28px_rgba(11,31,53,0.04)]">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-[#eef6ff] text-[#0b58d0]">
          {icon}
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#557089]">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#0b1f35]">{value}</p>
        </div>
      </div>
    </div>
  );
}

const productTextIcons: Record<ProductId, string> = {
  ai: "🤖",
  "website-builder": "🌐",
  hosting: "🗄️",
  "maintenance-support": "🛡️",
};

function ProductNameWithTextIcon({ productId, name }: { productId: ProductId; name: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="text-lg leading-none">
        {productTextIcons[productId]}
      </span>
      <span>{name}</span>
    </span>
  );
}

export function AdminDashboardPanel({ locale }: { locale: Locale }) {
  const { token, user } = useAuth();
  const { refreshPrices, setHolidayDiscount, setProductAvailability, setProductPrice } = useProductPricing();
  const isRomanian = locale === "ro";
  const [dashboard, setDashboard] = useState<AdminDashboardData>(emptyDashboard);
  const [priceValues, setPriceValues] = useState<Record<string, string>>({});
  const [noteValues, setNoteValues] = useState<Record<string, string>>({});
  const [discountValue, setDiscountValue] = useState("0");
  const [discountTarget, setDiscountTarget] = useState<DiscountTarget>("all");
  const [discountNote, setDiscountNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savingId, setSavingId] = useState<ProductId | null>(null);
  const [savingAvailabilityId, setSavingAvailabilityId] = useState<ProductId | null>(null);
  const [isSavingDiscount, setIsSavingDiscount] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  const labels = isRomanian
    ? {
        eyebrow: "Zona Admin",
        title: "Administrare clienti si preturi",
        description: "Adminul poate modifica preturile produselor. Fiecare modificare ramane salvata in istoric.",
        holidayDiscount: "Discount de sarbatori",
        discountDescription: "Seteaza un procent si alege daca reducerea se aplica pe toate produsele sau pe un produs anume.",
        discountTarget: "Aplica discount pe",
        allProducts: "Toate produsele",
        discountPercent: "Procent discount",
        discountNote: "Nota discount",
        discountPlaceholder: "Ex: campanie sarbatori",
        saveDiscount: "Salveaza discount",
        discountSaved: "Discount salvat",
        discountSavedDescription: "Discountul se aplica pe selectia aleasa, in preturile publice si in cos.",
        discountError: "Discountul nu a putut fi salvat",
        finalAfterDiscount: "Pret dupa discount",
        noDiscountHistory: "Nu exista inca modificari de discount.",
        adminDb: "Baza admin",
        clientDb: "Baza clienti",
        products: "Produse",
        history: "Istoric preturi",
        clients: "Clienti",
        admins: "Admini",
        save: "Salveaza pret",
        availability: "Disponibil pentru clienti",
        availabilityHint: "Debifat = produs indisponibil pentru clienti si blocat in cos.",
        outOfStock: "Out of stock",
        inStock: "In stock",
        availabilitySaved: "Disponibilitate actualizata",
        availabilityError: "Disponibilitatea nu a putut fi salvata",
        saving: "Se salveaza...",
        note: "Nota modificare",
        notePlaceholder: "Ex: oferta actualizata pentru luna aceasta",
        price: "Pret EUR",
        updated: "Actualizat",
        updatedBy: "Modificat de",
        lastLogin: "Ultima autentificare",
        role: "Rol",
        company: "Companie",
        success: "Pret actualizat",
        successDescription: "Pretul a fost salvat si istoricul a primit o inregistrare noua.",
        error: "Pretul nu a putut fi salvat",
        loadError: "Dashboard-ul admin nu a putut fi incarcat",
        noHistory: "Nu exista inca modificari de pret.",
        noClients: "Nu exista clienti inregistrati in afara conturilor seed.",
        current: "Pret curent",
        from: "de la",
        to: "la",
        discountFrom: "discount de la",
      }
    : {
        eyebrow: "Admin Area",
        title: "Customer and price management",
        description: "The admin can update product prices. Every change stays saved in the history.",
        holidayDiscount: "Holiday discount",
        discountDescription: "Set a percentage and choose whether the discount applies to every product or one product.",
        discountTarget: "Apply discount to",
        allProducts: "All products",
        discountPercent: "Discount percent",
        discountNote: "Discount note",
        discountPlaceholder: "Example: holiday campaign",
        saveDiscount: "Save discount",
        discountSaved: "Discount saved",
        discountSavedDescription: "The discount applies to the selected products in public prices and the cart.",
        discountError: "The discount could not be saved",
        finalAfterDiscount: "Price after discount",
        noDiscountHistory: "There are no discount changes yet.",
        adminDb: "Admin database",
        clientDb: "Customer database",
        products: "Products",
        history: "Price history",
        clients: "Customers",
        admins: "Admins",
        save: "Save price",
        availability: "Available for customers",
        availabilityHint: "Unchecked = unavailable for customers and blocked in cart.",
        outOfStock: "Out of stock",
        inStock: "In stock",
        availabilitySaved: "Availability updated",
        availabilityError: "Availability could not be saved",
        saving: "Saving...",
        note: "Change note",
        notePlaceholder: "Example: monthly offer updated",
        price: "EUR price",
        updated: "Updated",
        updatedBy: "Changed by",
        lastLogin: "Last sign-in",
        role: "Role",
        company: "Company",
        success: "Price updated",
        successDescription: "The price was saved and the history received a new record.",
        error: "The price could not be saved",
        loadError: "The admin dashboard could not be loaded",
        noHistory: "There are no price changes yet.",
        noClients: "There are no customer accounts beyond the seeded accounts yet.",
        current: "Current price",
        from: "from",
        to: "to",
        discountFrom: "discount from",
      };

  const productNames = useMemo(() => (
    Object.fromEntries(getProductCatalog(locale).map((item) => [item.id, item.title])) as Record<ProductId, string>
  ), [locale]);
  const productOptions = useMemo(() => getProductCatalog(locale), [locale]);
  const getDiscountTargetLabel = (target: DiscountTarget) => (
    target === "all" ? labels.allProducts : productNames[target]
  );

  const adminCount = dashboard.customers.filter((customer) => customer.accountRole === "admin").length;
  const clientCount = dashboard.customers.filter((customer) => customer.accountRole === "client").length;
  const previewDiscountPercent = Number.isFinite(Number(discountValue))
    ? Math.min(100, Math.max(0, Math.round(Number(discountValue))))
    : dashboard.holidayDiscount.percent;

  useEffect(() => {
    if (user?.accountRole !== "admin" || !token) {
      return;
    }

    let active = true;

    async function loadDashboard() {
      setIsLoading(true);
      setStatus(null);

      try {
        const payload = await parseApiResponse<AdminDashboardData>(
          await fetch("/api/admin/dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }),
        );

        if (!active) {
          return;
        }

        setDashboard(payload);
        setPriceValues(Object.fromEntries(payload.products.map((product) => [product.id, String(product.price)])));
        setDiscountValue(String(payload.holidayDiscount.percent));
        setDiscountTarget(payload.holidayDiscount.targetProductId);
      } catch (error) {
        if (!active) {
          return;
        }

        setStatus({ tone: "error", title: labels.loadError, description: getErrorMessage(error, labels.loadError) });
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, [labels.loadError, token, user?.accountRole]);

  if (user?.accountRole !== "admin") {
    return null;
  }

  async function savePrice(product: ProductPriceRecord) {
    if (!token) {
      return;
    }

    const nextPrice = Number(priceValues[product.id]);

    if (!Number.isFinite(nextPrice) || nextPrice < 0) {
      setStatus({
        tone: "error",
        title: labels.error,
        description: isRomanian ? "Introdu un pret valid." : "Enter a valid price.",
      });
      return;
    }

    setSavingId(product.id);
    setStatus(null);

    try {
      const payload = await parseApiResponse<{ products: ProductPriceRecord[]; history: PriceHistoryRecord[] }>(
        await fetch("/api/admin/product-prices", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            productId: product.id,
            price: Math.round(nextPrice),
            note: noteValues[product.id] ?? "",
          }),
        }),
      );

      const sortedHistory = [...payload.history].sort((a, b) => b.changedAt.localeCompare(a.changedAt));

      setDashboard((current) => ({
        ...current,
        products: payload.products,
        history: sortedHistory,
      }));
      setProductPrice(product.id, Math.round(nextPrice));
      setNoteValues((current) => ({ ...current, [product.id]: "" }));
      setStatus({ tone: "success", title: labels.success, description: labels.successDescription });
      void refreshPrices();
    } catch (error) {
      setStatus({ tone: "error", title: labels.error, description: getErrorMessage(error, labels.error) });
    } finally {
      setSavingId(null);
    }
  }

  async function saveAvailability(product: ProductPriceRecord, isAvailable: boolean) {
    if (!token) {
      return;
    }

    setSavingAvailabilityId(product.id);
    setStatus(null);

    try {
      const payload = await parseApiResponse<{ products: ProductPriceRecord[] }>(
        await fetch("/api/admin/product-status", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            productId: product.id,
            isAvailable,
          }),
        }),
      );

      setDashboard((current) => ({
        ...current,
        products: payload.products,
      }));
      setProductAvailability(product.id, isAvailable);
      setStatus({
        tone: "success",
        title: labels.availabilitySaved,
        description: isAvailable
          ? (isRomanian ? "Produsul poate fi adaugat din nou in cos." : "The product can be added to the cart again.")
          : (isRomanian ? "Produsul este pe pauza si nu mai poate fi adaugat in cos." : "The product is paused and can no longer be added to the cart."),
      });
      void refreshPrices();
    } catch (error) {
      setStatus({ tone: "error", title: labels.availabilityError, description: getErrorMessage(error, labels.availabilityError) });
    } finally {
      setSavingAvailabilityId(null);
    }
  }

  async function saveHolidayDiscount() {
    if (!token) {
      return;
    }

    const nextDiscount = Number(discountValue);

    if (!Number.isFinite(nextDiscount) || nextDiscount < 0 || nextDiscount > 100) {
      setStatus({
        tone: "error",
        title: labels.discountError,
        description: isRomanian ? "Introdu un procent intre 0 si 100." : "Enter a percentage between 0 and 100.",
      });
      return;
    }

    setIsSavingDiscount(true);
    setStatus(null);

    try {
      const payload = await parseApiResponse<{ holidayDiscount: HolidayDiscountRecord; discountHistory: DiscountHistoryRecord[] }>(
        await fetch("/api/admin/holiday-discount", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            percent: Math.round(nextDiscount),
            targetProductId: discountTarget,
            note: discountNote,
          }),
        }),
      );

      const sortedDiscountHistory = [...payload.discountHistory].sort((a, b) => b.changedAt.localeCompare(a.changedAt));

      setDashboard((current) => ({
        ...current,
        holidayDiscount: payload.holidayDiscount,
        discountHistory: sortedDiscountHistory,
      }));
      setHolidayDiscount(payload.holidayDiscount);
      setDiscountValue(String(payload.holidayDiscount.percent));
      setDiscountTarget(payload.holidayDiscount.targetProductId);
      setDiscountNote("");
      setStatus({ tone: "success", title: labels.discountSaved, description: labels.discountSavedDescription });
      void refreshPrices();
    } catch (error) {
      setStatus({ tone: "error", title: labels.discountError, description: getErrorMessage(error, labels.discountError) });
    } finally {
      setIsSavingDiscount(false);
    }
  }

  function getPreviewDiscountPercent(productId: ProductId) {
    return discountTarget === "all" || discountTarget === productId ? previewDiscountPercent : 0;
  }

  function getDiscountedPrice(price: number, productId: ProductId) {
    const percent = getPreviewDiscountPercent(productId);
    return percent > 0 ? Math.max(0, Math.round(price * (100 - percent) / 100)) : price;
  }

  return (
    <section id="admin-section" className="panel-surface accent-border rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#0b1f35] md:text-4xl">
            {labels.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">{labels.description}</p>
        </div>
        <div className="rounded-full border border-[#13b5ba]/18 bg-[#ecfeff] px-4 py-2 text-sm font-semibold text-[#0b7e84]">
          {labels.adminDb}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <AdminStat icon={<GridIcon className="h-5 w-5" />} label={labels.products} value={String(dashboard.products.length)} />
        <AdminStat icon={<UserIcon className="h-5 w-5" />} label={labels.clients} value={String(clientCount)} />
        <AdminStat icon={<SettingsIcon className="h-5 w-5" />} label={labels.admins} value={String(adminCount)} />
      </div>

      {status ? (
        <div className="mt-5">
          <FormStatus {...status} icon="🔔" />
        </div>
      ) : null}

      <article className="mt-6 rounded-[1.5rem] border border-[#13b5ba]/16 bg-[#ecfeff] p-5 shadow-[0_14px_32px_rgba(11,31,53,0.05)]">
        <div className="grid gap-5 xl:grid-cols-[1fr_22rem] xl:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">{labels.holidayDiscount}</p>
            <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-[#0b1f35]">
              <span aria-hidden="true" className="text-2xl leading-none">
                🏷️
              </span>
              {dashboard.holidayDiscount.percent}% {labels.holidayDiscount}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{labels.discountDescription}</p>
            <p className="mt-2 text-xs leading-5 text-muted">
              {labels.updated}: {formatDate(dashboard.holidayDiscount.updatedAt, locale)} / {labels.updatedBy}: {dashboard.holidayDiscount.updatedBy}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted">
              {labels.discountTarget}: {getDiscountTargetLabel(dashboard.holidayDiscount.targetProductId)}
            </p>
          </div>

          <div className="grid gap-3">
            <label htmlFor="admin-holiday-discount-target" className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
              {labels.discountTarget}
            </label>
            <select
              id="admin-holiday-discount-target"
              value={discountTarget}
              onChange={(event) => setDiscountTarget(event.target.value as DiscountTarget)}
              className="min-h-11 w-full rounded-[1rem] border border-[#bdeff0] bg-white/94 px-4 py-3 text-sm font-semibold text-[#0b1f35] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:border-[#13b5ba]/45"
            >
              <option value="all">{labels.allProducts}</option>
              {productOptions.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.code} - {product.title}
                </option>
              ))}
            </select>

            <label htmlFor="admin-holiday-discount" className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
              {labels.discountPercent}
            </label>
            <div className="flex min-h-11 items-center rounded-[1rem] border border-[#bdeff0] bg-white/94 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-[#13b5ba]/45">
              <input
                id="admin-holiday-discount"
                type="number"
                min={0}
                max={100}
                step={1}
                value={discountValue}
                onChange={(event) => setDiscountValue(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-[#0b1f35] outline-none"
              />
              <span className="text-xs font-semibold text-muted">%</span>
            </div>

            <input
              type="text"
              value={discountNote}
              onChange={(event) => setDiscountNote(event.target.value)}
              placeholder={labels.discountPlaceholder}
              aria-label={labels.discountNote}
              className="min-h-11 w-full rounded-[1rem] border border-[#bdeff0] bg-white/94 px-4 py-3 text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#7b90a5] focus:border-[#13b5ba]/45"
            />

            <button
              type="button"
              className={buttonVariants("primary", "w-full")}
              disabled={isSavingDiscount || isLoading}
              onClick={saveHolidayDiscount}
            >
              {isSavingDiscount ? labels.saving : labels.saveDiscount}
            </button>
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.products}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{labels.current}</h3>
          </div>

          {dashboard.products.map((product) => (
            <article key={product.id} className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,53,0.05)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#557089]">{product.id}</p>
                  <h4 className="mt-1 text-lg font-semibold text-[#0b1f35]">
                    <ProductNameWithTextIcon productId={product.id} name={productNames[product.id]} />
                  </h4>
                  <p className="mt-2 text-sm text-muted">
                    {labels.updated}: {formatDate(product.updatedAt, locale)}
                  </p>
                  <p className="mt-1 text-xs text-muted">{labels.updatedBy}: {product.updatedBy}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
                        product.isAvailable
                          ? "border-[#13b5ba]/18 bg-[#ecfeff] text-[#0b7e84]"
                          : "border-[#ef4444]/18 bg-[#fff5f5] text-[#dc2626]",
                      )}
                    >
                      {product.isAvailable ? labels.inStock : labels.outOfStock}
                    </span>
                    {getPreviewDiscountPercent(product.id) > 0 ? (
                      <span className="rounded-full border border-[#13b5ba]/18 bg-[#ecfeff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0b7e84]">
                        {labels.finalAfterDiscount}: {formatEuroPrice(getDiscountedPrice(product.price, product.id), locale)}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="min-w-0 lg:w-80">
                  <label htmlFor={`admin-price-${product.id}`} className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {labels.price}
                  </label>
                  <div className="mt-2 flex min-h-11 items-center rounded-[1rem] border border-[#eef4fb] bg-white/94 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus-within:border-[#0f79ff]/35">
                    <input
                      id={`admin-price-${product.id}`}
                      type="number"
                      min={0}
                      step={1}
                      value={priceValues[product.id] ?? String(product.price)}
                      onChange={(event) => setPriceValues((current) => ({ ...current, [product.id]: event.target.value }))}
                      className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-[#0b1f35] outline-none"
                    />
                    <span className="text-xs font-semibold text-muted">EUR</span>
                  </div>

                  <label htmlFor={`admin-note-${product.id}`} className="mt-4 block text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                    {labels.note}
                  </label>
                  <input
                    id={`admin-note-${product.id}`}
                    type="text"
                    value={noteValues[product.id] ?? ""}
                    onChange={(event) => setNoteValues((current) => ({ ...current, [product.id]: event.target.value }))}
                    placeholder={labels.notePlaceholder}
                    className="mt-2 min-h-11 w-full rounded-[1rem] border border-[#eef4fb] bg-white/94 px-4 py-3 text-sm font-medium text-[#0b1f35] outline-none placeholder:font-normal placeholder:text-[#7b90a5] focus:border-[#0f79ff]/35"
                  />

                  <label className="group relative mt-4 flex items-center justify-between gap-4 rounded-[1rem] border border-[#eef4fb] bg-white/94 px-4 py-3 transition hover:border-[#0f79ff]/25 hover:bg-[#f8fbff] focus-within:border-[#0f79ff]/35">
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">
                          {labels.availability}
                        </span>
                        <span className="relative inline-flex">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#d8e6f4] bg-[#eef6ff] text-[11px] font-bold text-[#0b58d0]"
                          >
                            ?
                          </span>
                          <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-xl bg-[#0b1f35] px-3 py-2 text-[11px] font-medium normal-case leading-5 tracking-normal text-white opacity-0 shadow-[0_14px_32px_rgba(11,31,53,0.22)] transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                            {labels.availabilityHint}
                          </span>
                        </span>
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {product.isAvailable ? labels.inStock : labels.outOfStock}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={product.isAvailable}
                      disabled={savingAvailabilityId === product.id || isLoading}
                      onChange={(event) => saveAvailability(product, event.target.checked)}
                      className="h-5 w-5 rounded border-[#d8e6f4] accent-[#0f79ff]"
                    />
                  </label>

                  <button
                    type="button"
                    data-admin-save-price={product.id}
                    className={buttonVariants("primary", "mt-4 w-full")}
                    disabled={savingId === product.id || isLoading}
                    onClick={() => savePrice(product)}
                  >
                    {savingId === product.id ? labels.saving : labels.save}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-6">
          <article className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,53,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.clientDb}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{labels.clients}</h3>
            <div className="mt-4 grid max-h-[28rem] gap-3 overflow-auto pr-1">
              {dashboard.customers.length ? (
                dashboard.customers.map((customer: AdminCustomerRecord) => (
                  <div key={customer.id} className="rounded-[1.15rem] border border-[#e1edf8] bg-[#fbfdff] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#0b1f35]">
                          {`${customer.firstName} ${customer.lastName}`.trim()}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">{customer.email}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
                          customer.accountRole === "admin"
                            ? "border-[#13b5ba]/18 bg-[#ecfeff] text-[#0b7e84]"
                            : "border-[#0f79ff]/14 bg-[#eef6ff] text-[#0b58d0]",
                        )}
                      >
                        {customer.accountRole}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-xs leading-5 text-muted">
                      <p>{labels.company}: {customer.company || "-"}</p>
                      <p>{labels.role}: {customer.role || "-"}</p>
                      <p>{labels.lastLogin}: {formatDate(customer.lastLoginAt, locale)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-[1.15rem] border border-dashed border-[#d8e6f4] p-4 text-sm text-muted">{labels.noClients}</p>
              )}
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,53,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.holidayDiscount}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{labels.history}</h3>
            <div className="mt-4 grid max-h-[18rem] gap-3 overflow-auto pr-1">
              {dashboard.discountHistory.length ? (
                dashboard.discountHistory.map((entry) => (
                  <div key={entry.id} className="rounded-[1.15rem] border border-[#e1edf8] bg-[#fbfdff] p-4">
                    <p className="font-semibold text-[#0b1f35]">
                      {entry.oldPercent}% {labels.to} <span className="text-[#0b58d0]">{entry.newPercent}%</span>
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {getDiscountTargetLabel(entry.oldTargetProductId)} {labels.to} {getDiscountTargetLabel(entry.newTargetProductId)}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {formatDate(entry.changedAt, locale)} / {entry.changedByEmail}
                    </p>
                    {entry.note ? <p className="mt-2 rounded-xl bg-white px-3 py-2 text-xs leading-5 text-muted">{entry.note}</p> : null}
                  </div>
                ))
              ) : (
                <p className="rounded-[1.15rem] border border-dashed border-[#d8e6f4] p-4 text-sm text-muted">{labels.noDiscountHistory}</p>
              )}
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-[#d8e6f4] bg-white/88 p-5 shadow-[0_14px_32px_rgba(11,31,53,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0b58d0]">{labels.history}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#0b1f35]">{labels.history}</h3>
            <div className="mt-4 grid max-h-[28rem] gap-3 overflow-auto pr-1">
              {dashboard.history.length ? (
                dashboard.history.map((entry) => (
                  <div key={entry.id} className="rounded-[1.15rem] border border-[#e1edf8] bg-[#fbfdff] p-4">
                    <p className="font-semibold text-[#0b1f35]">
                      <ProductNameWithTextIcon productId={entry.productId} name={productNames[entry.productId]} />
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {labels.from} <span className="font-semibold text-[#0b1f35]">{formatEuroPrice(entry.oldPrice, locale)}</span>{" "}
                      {labels.to} <span className="font-semibold text-[#0b58d0]">{formatEuroPrice(entry.newPrice, locale)}</span>
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {formatDate(entry.changedAt, locale)} / {entry.changedByEmail}
                    </p>
                    {entry.note ? <p className="mt-2 rounded-xl bg-white px-3 py-2 text-xs leading-5 text-muted">{entry.note}</p> : null}
                  </div>
                ))
              ) : (
                <p className="rounded-[1.15rem] border border-dashed border-[#d8e6f4] p-4 text-sm text-muted">{labels.noHistory}</p>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
