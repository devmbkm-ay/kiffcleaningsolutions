"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Eye, Clock, Award, Heart } from "lucide-react";

const TRUST_ICONS = [Eye, Clock, Award, Heart] as const;

const TRUST_COLORS = [
  { bg: "bg-teal-50", border: "border-teal-200", icon: "text-teal-600", dot: "bg-teal-500" },
  { bg: "bg-navy-50", border: "border-navy-200", icon: "text-navy-600", dot: "bg-navy-500" },
  { bg: "bg-gold-50", border: "border-gold-200", icon: "text-gold-600", dot: "bg-gold-500" },
  { bg: "bg-teal-50", border: "border-teal-200", icon: "text-teal-600", dot: "bg-teal-500" },
] as const;

const TRUST_KEYS = ["discretion", "availability", "expertise", "compassion"] as const;

export function TrustSection() {
  const t = useTranslations("trust");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="section-padding bg-gradient-to-br from-navy-950 to-navy-900 relative overflow-hidden"
      ref={ref}
      aria-labelledby="trust-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="trust-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-800 text-white mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_KEYS.map((key, i) => {
            const Icon = TRUST_ICONS[i];
            const colors = TRUST_COLORS[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-teal-400" />
                </div>
                <h3 className="text-white font-display font-700 text-lg mb-2">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
