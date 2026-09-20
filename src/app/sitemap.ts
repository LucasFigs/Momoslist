import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  // Só páginas institucionais: listas de presentes são privadas por link.
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/cadastro`, lastModified: new Date(), priority: 0.5 },
    { url: `${siteUrl}/login`, lastModified: new Date(), priority: 0.3 },
  ];
}
