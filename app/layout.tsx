import type { Metadata } from "next";
import Script from "next/script";

import { AssistantWidget } from "@/components/layout/assistant-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartProvider } from "@/components/providers/cart-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import "@/app/globals.css";
import { getChatKitConfig } from "@/lib/chatkit-config";
import { getServerLocale } from "@/lib/i18n-server";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const description = locale === "ro"
    ? siteConfig.shortDescription
    : "A smart web platform with an AI virtual assistant built to automate and optimize customer interaction processes.";

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: siteConfig.name,
    description,
    openGraph: {
      title: siteConfig.name,
      description,
      siteName: siteConfig.name,
      locale: locale === "ro" ? "ro_RO" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`,
        },
      ],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const chatKitConfig = getChatKitConfig();
  const locale = await getServerLocale();

  return (
    <html lang={locale}>
      <body className="antialiased" suppressHydrationWarning>
        <ToastProvider>
          <CartProvider>
            <a
              href="#main-content"
              className="sr-only fixed left-4 top-4 z-[90] rounded-full bg-[#0b1f35] px-4 py-2 text-sm font-semibold text-white focus:not-sr-only"
            >
              {locale === "ro" ? "Sari la continut" : "Skip to content"}
            </a>
            <Navbar locale={locale} />
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
            <Footer locale={locale} />
            <AssistantWidget
              enabled={chatKitConfig.enabled}
              locale={locale}
              workflowId={chatKitConfig.workflowId}
            />
          </CartProvider>
        </ToastProvider>
        {chatKitConfig.enabled ? (
          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
