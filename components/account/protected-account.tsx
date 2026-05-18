"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import type { Locale } from "@/lib/i18n";

export function ProtectedAccount({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status !== "anonymous") {
      return;
    }

    const nextPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    router.replace(`/login?next=${encodeURIComponent(nextPath)}`);
  }, [router, status]);

  if (status === "loading") {
    return (
      <section className="py-14">
        <div className="section-shell">
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-sm font-semibold text-[#0b1f35]">
              {locale === "ro" ? "Se incarca zona de cont..." : "Loading the account area..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (status === "anonymous") {
    return (
      <section className="py-14">
        <div className="section-shell">
          <div className="panel-surface rounded-[2rem] p-6 md:p-8">
            <p className="text-sm font-semibold text-[#0b1f35]">
              {locale === "ro" ? "Redirectionare spre autentificare..." : "Redirecting to sign in..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
