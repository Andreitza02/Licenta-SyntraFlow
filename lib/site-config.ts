import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export const siteConfig = {
  name: "SyntraFlow",
  tagline: "Platforma web inteligenta pentru automatizarea interactiunii cu clientii",
  shortDescription:
    "Platforma web inteligenta cu asistent virtual bazat pe inteligenta artificiala, construita pentru automatizarea si optimizarea proceselor de interactiune cu clientii.",
  thesisTitle:
    "Proiectarea si dezvoltarea unei platforme web inteligente cu asistent virtual bazat pe inteligenta artificiala pentru automatizarea si optimizarea proceselor de interactiune cu clientii",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const navigation = [
  { label: "Acasa", href: "/", homeSectionId: "home-top" },
  { label: "Despre proiect", href: "/despre-proiect" },
  { label: "Solutii", href: "/solutii", homeSectionId: "home-solutions" },
  { label: "Industrii", href: "/industrii", homeSectionId: "home-industries" },
  { label: "Asistent virtual", href: "/asistent-virtual", homeSectionId: "home-assistant" },
  { label: "Automatizari", href: "/automatizari", homeSectionId: "home-automations" },
  { label: "Studii de caz", href: "/studii-de-caz", homeSectionId: "home-cases" },
  { label: "Arhitectura", href: "/arhitectura", homeSectionId: "home-architecture" },
  { label: "Contact", href: "/contact", homeSectionId: "home-final-cta" },
];

export function buildMetadata(title: string, description: string, path = "/", locale: Locale = "ro"): Metadata {
  const isHomePage = path === "/" || title === "Acasa" || title === "Home";
  const pageTitle = isHomePage ? siteConfig.name : `${title} | ${siteConfig.name}`;
  const url = new URL(path, siteConfig.siteUrl).toString();
  const isRomanian = locale === "ro";

  return {
    title: pageTitle,
    description,
    keywords: isRomanian
      ? [
          "platforma web inteligenta",
          "asistent virtual",
          "automatizare procese",
          "interactiune cu clientii",
          "optimizare procese",
          "bachelor thesis",
          "AI automation",
          "lead capture",
          "FAQ inteligent",
          "SyntraFlow",
          siteConfig.thesisTitle,
        ]
      : [
          "smart web platform",
          "virtual assistant",
          "process automation",
          "customer interaction",
          "workflow optimization",
          "AI automation",
          "lead capture",
          "smart FAQ",
          "SyntraFlow",
          "AI-powered customer experience",
        ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: isRomanian ? "ro_RO" : "en_US",
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
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/og-image.svg"],
    },
  };
}
