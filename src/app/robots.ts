import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // As listas são privadas por link — não devem ser indexadas nem enumeradas.
      disallow: ["/dashboard", "/lista"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
