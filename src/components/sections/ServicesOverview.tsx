"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Home, AlertTriangle, Heart, Package } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const SERVICE_DATA = [
  {
    key: "diogene",
    slug: "syndrome-de-diogene",
    icon: Home,
    color: "teal",
    highlight: "#00a896",
    bg: "bg-teal-50",
    iconBg: "bg-teal-100",
  },
  {
    key: "insalubre",
    slug: "logement-insalubre",
    icon: AlertTriangle,
    color: "navy",
    highlight: "#243b53",
    bg: "bg-navy-50",
    iconBg: "bg-navy-100",
  },
  {
    key: "postMortem",
    slug: "nettoyage-post-mortem",
    icon: Heart,
    color: "gold",
    highlight: "#f0b429",
    bg: "bg-gold-50",
    iconBg: "bg-gold-100",
  },
  {
    key: "debarras",
    slug: "debarras-evacuation",
    icon: Package,
    color: "teal",
    highlight: "#00a896",
    bg: "bg-teal-50",
    iconBg: "bg-teal-100",
  },
] as const;

export function ServicesOverview() {
  const t = useTranslations("services");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="section-padding bg-white"
      ref={ref}
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4">Nos Expertises</Badge>
          <h2
            id="services-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-800 text-navy-950 mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICE_DATA.map(({ key, slug, icon: Icon, bg, iconBg, highlight }, i) => {
            const name = t(`items.${key}.name`);
            const tagline = t(`items.${key}.tagline`);
            const description = t(`items.${key}.description`);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/${locale}/services/${slug}`}>
                  <Card
                    hover
                    padding="lg"
                    className="h-full group border-2 border-transparent hover:border-teal-200 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={26} style={{ color: highlight }} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-display font-700 text-navy-950 mb-2 group-hover:text-teal-600 transition-colors">
                      {name}
                    </h3>

                    {/* GEO-optimized answer capsule */}
                    <p className="text-navy-500 text-sm font-medium mb-3 italic">
                      {tagline}
                    </p>
                    <p className="text-navy-600 text-sm leading-relaxed mb-5">
                      {description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all">
                      {t("learnMore")}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
