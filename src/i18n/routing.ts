import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/services": { fr: "/services", en: "/services" },
    "/services/[slug]": { fr: "/services/[slug]", en: "/services/[slug]" },
    "/about": { fr: "/a-propos", en: "/about" },
    "/gallery": { fr: "/galerie", en: "/gallery" },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/quote": { fr: "/devis", en: "/quote" },
    "/contact": "/contact",
  },
});
