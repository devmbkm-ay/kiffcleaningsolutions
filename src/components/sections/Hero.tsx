"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import {
  Phone,
  ArrowRight,
  Shield,
  Clock,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const STATS = [
  { value: "500+", labelKey: "interventions" },
  { value: "98%", labelKey: "satisfaction" },
  { value: "24/7", labelKey: "availability" },
  { value: "10+", labelKey: "experience" },
] as const;

const TRUST_ITEMS = [
  "Devis gratuit sous 2h",
  "Confidentialité garantie",
  "Équipes certifiées",
  "Intervention rapide",
];

const easing = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy-950"
      aria-label="Hero section"
    >
      {/* Background image — professional cleaning team */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80&auto=format&fit=crop"
          alt="Professional cleaning service"
          className="w-full h-full object-cover opacity-20"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/95 to-navy-950/70" />
        {/* Teal accent glow */}
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-100 h-100 rounded-full bg-teal-500/8 blur-3xl pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0, ease: easing }}
            >
              <Badge
                variant="teal"
                className="mb-6 bg-teal-500/15 text-teal-300 border-teal-500/30"
              >
                <Clock size={12} />
                {t("badge")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: easing }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-4 leading-[1.1]"
            >
              {t("title")}
              <br />
              <span className="gradient-text">{t("titleHighlight")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easing }}
              className="text-navy-300 text-lg leading-relaxed mb-8 max-w-xl"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: easing }}
              className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-navy-300 text-sm"
                >
                  <CheckCircle2 size={16} className="text-teal-400" />
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easing }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href={`/${locale}/quote`}>
                <Button
                  size="xl"
                  className="group"
                  icon={
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  }
                  iconPosition="right"
                >
                  {t("cta")}
                </Button>
              </Link>
              <a href="tel:0770108339">
                <Button variant="outline" size="xl" icon={<Phone size={18} />}>
                  <span className="hidden sm:inline">{t("emergency")}</span>
                  <span className="sm:hidden">07 70 10 83 39</span>
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right — Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easing }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {STATS.map(({ value, labelKey }, i) => (
                  <motion.div
                    key={labelKey}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="bg-white/5 rounded-2xl p-5 text-center"
                  >
                    <div className="text-3xl lg:text-4xl font-display font-800 gradient-text mb-1">
                      {value}
                    </div>
                    <div className="text-navy-300 text-xs leading-tight">
                      {t(`stats.${labelKey}`)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={18} className="text-teal-400" />
                  <span className="text-white text-sm font-semibold">
                    Certifié & Assuré
                  </span>
                </div>
                <p className="text-navy-300 text-sm leading-relaxed">
                  Toutes nos interventions sont réalisées dans le respect des
                  protocoles sanitaires et de sécurité les plus stricts.
                </p>
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold-500 fill-gold-500" />
                  ))}
                  <span className="text-navy-300 text-sm ml-2">
                    4.9/5 — 200+ avis
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-teal-500 text-white rounded-2xl px-5 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-sm font-semibold">Disponible maintenant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
