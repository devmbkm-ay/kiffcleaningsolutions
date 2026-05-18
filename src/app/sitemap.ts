import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services-data";

const BASE_URL = "https://www.kiffcleaningsolutions.com";
const LOCALES = ["fr", "en"];

const BLOG_SLUGS = [
  "syndrome-de-diogene-comment-aider",
  "logement-insalubre-droits-locataire",
  "nettoyage-post-mortem-qui-appeler",
  "debarras-maison-succession",
  "desinfection-logement-guide-complet",
  "reconnaitre-logement-insalubre",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const pages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/quote", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  for (const locale of LOCALES) {
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }

    for (const service of SERVICES) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }

    for (const slug of BLOG_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
