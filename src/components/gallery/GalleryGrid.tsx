"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

const CATEGORIES = [
  { key: "all", labelFr: "Tous", labelEn: "All" },
  { key: "diogene", labelFr: "Syndrome de Diogène", labelEn: "Diogenes Syndrome" },
  { key: "insalubre", labelFr: "Logement Insalubre", labelEn: "Unsanitary Housing" },
  { key: "debarras", labelFr: "Débarras", labelEn: "Clearance" },
];

// Placeholder gallery items with unsplash images for demo
const DEMO_ITEMS = [
  {
    id: "1",
    category: "diogene",
    titleFr: "Appartement Parisien — Remise en état complète",
    titleEn: "Parisian Apartment — Complete Restoration",
    beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
  },
  {
    id: "2",
    category: "insalubre",
    titleFr: "Maison Seine-et-Marne — Désinfection complète",
    titleEn: "Seine-et-Marne House — Complete Disinfection",
    beforeImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
  },
  {
    id: "3",
    category: "debarras",
    titleFr: "Débarras complet — Cave et grenier",
    titleEn: "Complete Clearance — Basement and Attic",
    beforeImage: "https://images.unsplash.com/photo-1558618047-3bfc14c65f08?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
  },
  {
    id: "4",
    category: "diogene",
    titleFr: "Studio Île-de-France — Transformation totale",
    titleEn: "Île-de-France Studio — Total Transformation",
    beforeImage: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=600&q=80",
  },
  {
    id: "5",
    category: "insalubre",
    titleFr: "Cuisine insalubre — Remise aux normes",
    titleEn: "Unsanitary Kitchen — Standards Restoration",
    beforeImage: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
  },
  {
    id: "6",
    category: "debarras",
    titleFr: "Succession — Vide appartement complet",
    titleEn: "Estate — Complete Flat Clearance",
    beforeImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80",
  },
];

function BeforeAfterCard({
  item,
  locale,
}: {
  item: (typeof DEMO_ITEMS)[0];
  locale: string;
}) {
  const [showAfter, setShowAfter] = useState(false);
  const isFr = locale === "fr";

  return (
    <div className="group rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image with toggle */}
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={showAfter ? "after" : "before"}
            src={showAfter ? item.afterImage : item.beforeImage}
            alt={isFr ? item.titleFr : item.titleEn}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Badge overlay */}
        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white ${showAfter ? "bg-teal-500" : "bg-navy-700"}`}>
          {showAfter ? (isFr ? "APRÈS" : "AFTER") : (isFr ? "AVANT" : "BEFORE")}
        </div>
      </div>

      {/* Toggle button */}
      <div className="p-5">
        <h3 className="font-semibold text-navy-900 text-sm mb-3 line-clamp-2">
          {isFr ? item.titleFr : item.titleEn}
        </h3>
        <div className="flex rounded-xl overflow-hidden border border-navy-200">
          <button
            onClick={() => setShowAfter(false)}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${!showAfter ? "bg-navy-700 text-white" : "text-navy-500 hover:bg-navy-50"}`}
          >
            {isFr ? "Avant" : "Before"}
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${showAfter ? "bg-teal-500 text-white" : "text-navy-500 hover:bg-teal-50"}`}
          >
            {isFr ? "Après" : "After"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function GalleryGrid({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const isFr = locale === "fr";

  const filtered = activeCategory === "all"
    ? DEMO_ITEMS
    : DEMO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map(({ key, labelFr, labelEn }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === key
                ? "bg-teal-500 text-white shadow-md"
                : "bg-navy-100 text-navy-600 hover:bg-navy-200"
            }`}
          >
            {isFr ? labelFr : labelEn}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <BeforeAfterCard item={item} locale={locale} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-navy-400">
          {isFr ? "Aucun résultat dans cette catégorie." : "No results in this category."}
        </div>
      )}
    </div>
  );
}
