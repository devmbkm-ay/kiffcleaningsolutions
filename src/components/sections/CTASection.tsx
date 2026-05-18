"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-300/20 blur-2xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Pulse indicator */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Disponible maintenant — Réponse sous 2h
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-800 text-white mb-4 text-balance">
            {t("title")}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/quote`}>
              <Button
                size="xl"
                variant="secondary"
                className="bg-white text-teal-700 hover:bg-navy-50 shadow-xl hover:shadow-2xl"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                {t("button")}
              </Button>
            </Link>

            <a href="tel:0770108339">
              <Button
                size="xl"
                className="bg-transparent border-2 border-white text-white hover:bg-white/20"
                icon={<Phone size={18} />}
              >
                {t("callButton")}
              </Button>
            </a>

            <a
              href="https://wa.me/33770108339"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="xl"
                className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10"
                icon={<MessageCircle size={18} />}
              >
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust line */}
          <p className="text-white/60 text-sm mt-8">
            🔒 Confidentialité totale garantie — Données personnelles protégées
          </p>
        </motion.div>
      </div>
    </section>
  );
}
