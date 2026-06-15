import type { ProductId } from "@/lib/product-catalog";

export type DiscountTarget = "all" | ProductId;

export type ProductPriceRecord = {
  id: ProductId;
  price: number;
  isAvailable: boolean;
  updatedAt: string;
  updatedBy: string;
};

export type PriceHistoryRecord = {
  id: string;
  productId: ProductId;
  oldPrice: number;
  newPrice: number;
  changedAt: string;
  changedBy: string;
  changedByEmail: string;
  note: string;
};

export type HolidayDiscountRecord = {
  percent: number;
  targetProductId: DiscountTarget;
  updatedAt: string;
  updatedBy: string;
};

export type DiscountHistoryRecord = {
  id: string;
  oldPercent: number;
  newPercent: number;
  oldTargetProductId: DiscountTarget;
  newTargetProductId: DiscountTarget;
  changedAt: string;
  changedBy: string;
  changedByEmail: string;
  note: string;
};

export type AdminCustomerRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  accountRole: "client" | "admin";
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
};

export type AdminDashboardData = {
  products: ProductPriceRecord[];
  holidayDiscount: HolidayDiscountRecord;
  history: PriceHistoryRecord[];
  discountHistory: DiscountHistoryRecord[];
  customers: AdminCustomerRecord[];
};
