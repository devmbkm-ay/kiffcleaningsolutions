"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "services", href: "/services" },
  { key: "about", href: "/about" },
  { key: "gallery", href: "/gallery" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const otherLocale = locale === "fr" ? "en" : "fr";
  const localePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const isActive = (href: string) =>
    pathname.includes(`/${locale}${href}`);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-navy-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Logo variant={isScrolled ? "dark" : "dark"} />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(href)
                      ? "text-teal-600 bg-teal-50"
                      : "text-navy-700 hover:text-navy-950 hover:bg-navy-50"
                  )}
                >
                  {t(key as keyof typeof t)}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-navy-600 hover:text-navy-900 hover:bg-navy-50 transition-colors"
                >
                  <Globe size={16} />
                  <span className="uppercase">{locale}</span>
                  <ChevronDown size={14} className={cn("transition-transform", langOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-navy-100 overflow-hidden min-w-[100px]"
                    >
                      {["fr", "en"].map((l) => (
                        <Link
                          key={l}
                          href={l === locale ? pathname : localePath}
                          onClick={() => setLangOpen(false)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
                            l === locale
                              ? "bg-teal-50 text-teal-700"
                              : "text-navy-700 hover:bg-navy-50"
                          )}
                        >
                          <span>{l === "fr" ? "🇫🇷" : "🇬🇧"}</span>
                          <span className="uppercase">{l}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone */}
              <a
                href="tel:0770108339"
                className="flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-teal-600 transition-colors"
              >
                <Phone size={16} />
                <span>{t("phone")}</span>
              </a>

              {/* CTA */}
              <Button
                size="sm"
                onClick={() => (window.location.href = `/${locale}/quote`)}
              >
                {t("quote")}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-16 lg:hidden"
          >
            <div className="flex flex-col h-full overflow-y-auto px-4 py-6 gap-2">
              {NAV_LINKS.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    isActive(href)
                      ? "bg-teal-50 text-teal-700"
                      : "text-navy-800 hover:bg-navy-50"
                  )}
                >
                  {t(key as keyof typeof t)}
                </Link>
              ))}

              <div className="mt-auto pt-6 border-t border-navy-100 flex flex-col gap-3">
                <div className="flex gap-2">
                  {["fr", "en"].map((l) => (
                    <Link
                      key={l}
                      href={l === locale ? pathname : localePath}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                        l === locale
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-navy-200 text-navy-600 hover:border-navy-300"
                      )}
                    >
                      <span>{l === "fr" ? "🇫🇷" : "🇬🇧"}</span>
                      <span className="uppercase">{l}</span>
                    </Link>
                  ))}
                </div>

                <a href="tel:0770108339">
                  <Button variant="outline" size="lg" fullWidth icon={<Phone size={18} />}>
                    {t("phone")}
                  </Button>
                </a>
                <Link href={`/${locale}/quote`}>
                  <Button size="lg" fullWidth>
                    {t("quote")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
