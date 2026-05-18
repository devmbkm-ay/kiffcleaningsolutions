"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const STATIC_TESTIMONIALS = [
  {
    name: "Marie L.",
    location: "Meaux (77)",
    service: "Syndrome de Diogène",
    rating: 5,
    content:
      "Une équipe exceptionnelle qui a transformé le logement de ma mère en quelques jours. Professionnels, discrets et bienveillants. Je recommande vivement.",
  },
  {
    name: "Jean-Pierre M.",
    location: "Chelles (77)",
    service: "Logement Insalubre",
    rating: 5,
    content:
      "Intervention rapide et efficace. Le logement était dans un état catastrophique, ils ont tout remis en ordre avec un professionnalisme remarquable. Merci infiniment.",
  },
  {
    name: "Sophie D.",
    location: "Paris (75)",
    service: "Débarras",
    rating: 5,
    content:
      "Service impeccable du début à la fin. Devis rapide, équipe ponctuelle et travail soigné. Le logement de mon père a été complètement vidé et nettoyé en une journée.",
  },
  {
    name: "Famille R.",
    location: "Lagny-sur-Marne (77)",
    service: "Nettoyage Post-Mortem",
    rating: 5,
    content:
      "Dans un moment très difficile, l'équipe a fait preuve d'une empathie et d'un professionnalisme exemplaires. Intervention discrète et efficace. Nous les remercions du fond du cœur.",
  },
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="section-padding bg-navy-50"
      ref={ref}
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4">Témoignages</Badge>
          <h2
            id="testimonials-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-800 text-navy-950 mb-4"
          >
            {t("title")}
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <span className="text-navy-700 font-semibold">4.9/5</span>
            <span className="text-navy-400 text-sm">— Plus de 200 avis vérifiés</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STATIC_TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card padding="lg" className="h-full relative">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote size={40} className="text-teal-500" />
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-navy-700 leading-relaxed mb-6 italic relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-navy-100 pt-4 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-navy-900">{testimonial.name}</p>
                    <p className="text-navy-400 text-sm">{testimonial.location}</p>
                  </div>
                  <span className="text-xs font-medium bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
