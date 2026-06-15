"use client";

import { AccountShell } from "@/components/account/account-shell";
import { AdminDashboardPanel } from "@/components/account/admin-dashboard-panel";
import { ProtectedAccount } from "@/components/account/protected-account";
import type { Locale } from "@/lib/i18n";

export function AccountAdminClient({ locale }: { locale: Locale }) {
  return (
    <ProtectedAccount locale={locale}>
      <AccountShell locale={locale}>
        <AdminDashboardPanel locale={locale} />
      </AccountShell>
    </ProtectedAccount>
  );
}
