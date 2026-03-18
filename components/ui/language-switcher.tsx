"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import roFlag from "../../Ro Icon.png";
import usFlag from "../../US Icon.png";
import type { Locale } from "@/lib/i18n";
import { LANGUAGE_COOKIE_NAME } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
};

const languageOptions: Array<{
  locale: Locale;
  ariaLabel: string;
  flagSrc: typeof roFlag;
}> = [
  { locale: "ro", ariaLabel: "Schimba limba in romana", flagSrc: roFlag },
  { locale: "en", ariaLabel: "Switch language to English", flagSrc: usFlag },
];

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `${LANGUAGE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[#0d3358]/10 bg-white/88 p-1 shadow-[0_10px_22px_rgba(11,31,53,0.06)]"
      role="group"
      aria-label={locale === "ro" ? "Schimba limba" : "Change language"}
    >
      {languageOptions.map((option) => {
        const isActive = option.locale === locale;

        return (
          <button
            key={option.locale}
            type="button"
            className={cn(
              "inline-flex items-center rounded-full px-2 py-2 transition duration-300",
              isActive
                ? "bg-[#0f79ff] text-white shadow-[0_10px_22px_rgba(15,121,255,0.18)]"
                : "text-[#0b1f35] hover:bg-[#eef6ff]",
            )}
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            onClick={() => changeLanguage(option.locale)}
          >
            <Image
              src={option.flagSrc}
              alt=""
              aria-hidden="true"
              className="h-5 w-5 rounded-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
