import type { MetadataRoute } from "next";

import { navigation, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return navigation.map((item) => ({
    url: `${siteConfig.siteUrl}${item.href}`,
    lastModified: new Date(),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
