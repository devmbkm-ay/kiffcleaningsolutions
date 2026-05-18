"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    question: "Qu'est-ce que le nettoyage extrême et dans quelles situations intervenez-vous ?",
    answer:
      "Le nettoyage extrême désigne des opérations de remise en état dans des situations qui dépassent le nettoyage classique : logements affectés par le syndrome de Diogène, habitations insalubres, scènes post-mortem ou débarras complets. Kiff Cleaning Solutions intervient dès lors qu'un logement nécessite une intervention spécialisée, que ce soit pour des raisons sanitaires, psychologiques ou logistiques.",
  },
  {
    question: "Intervenez-vous en urgence, y compris la nuit et le week-end ?",
    answer:
      "Oui, nous sommes disponibles 24 heures sur 24, 7 jours sur 7, y compris les jours fériés. Certaines situations, notamment les nettoyages post-mortem, exigent une réponse rapide. Nous nous engageons à intervenir sous 2 heures dans notre zone d'intervention principale (Seine-et-Marne et Île-de-France).",
  },
  {
    question: "La confidentialité est-elle garantie lors de vos interventions ?",
    answer:
      "La discrétion est au cœur de notre approche. Nos équipes interviennent en tenue neutre et nos véhicules ne portent aucun signe distinctif. Toutes les informations relatives à votre situation restent strictement confidentielles et ne sont jamais partagées. Nous comprenons la sensibilité de ces situations et agissons en conséquence.",
  },
  {
    question: "Comment se déroule la demande de devis ?",
    answer:
      "Notre processus est simple et rapide : remplissez notre formulaire en ligne (2 minutes), joignez éventuellement quelques photos, et nous vous recontactons sous 2 heures avec une évaluation et un devis personnalisé. Le devis est entièrement gratuit et sans engagement. Pour les urgences, appelez directement le 07 70 10 83 39.",
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer:
      "Notre zone principale couvre toute la Seine-et-Marne (77), incluant Meaux, Melun, Chelles, Torcy, Lagny-sur-Marne, Coulommiers et Claye-Souilly. Nous intervenons également dans tout le reste de l'Île-de-France : Paris, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne, Essonne et Val-d'Oise. Des interventions ponctuelles hors Île-de-France sont possibles sur devis.",
  },
  {
    question: "Vos équipes sont-elles formées et certifiées ?",
    answer:
      "Oui, toutes nos équipes sont formées aux protocoles de sécurité sanitaire les plus stricts, aux techniques de nettoyage professionnel spécialisé et à la gestion des déchets dangereux. Nous travaillons avec des équipements de protection individuelle (EPI) adaptés à chaque situation et respectons la réglementation en vigueur pour l'élimination des déchets.",
  },
  {
    question: "Prenez-vous en charge le tri et l'évacuation des déchets ?",
    answer:
      "Absolument. Notre service inclut le tri sélectif selon les catégories (ordures ménagères, encombrants, DEEE, déchets dangereux), l'évacuation vers les filières agréées et le nettoyage final du logement. Nous remettons le logement dans un état propre et sain, conforme aux normes en vigueur.",
  },
  {
    question: "Travaillez-vous avec les familles, bailleurs et notaires ?",
    answer:
      "Oui, nous travaillons régulièrement avec des particuliers, des familles, des bailleurs sociaux et privés, des notaires et des travailleurs sociaux. Nous comprenons les contraintes administratives et juridiques liées à ces situations (succession, expulsion, logement insalubre signalé) et nous adaptons notre intervention en conséquence.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-navy-100 rounded-2xl overflow-hidden"
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-start justify-between gap-4 p-6 text-left transition-colors",
          open ? "bg-teal-50" : "bg-white hover:bg-navy-50"
        )}
        aria-expanded={open}
      >
        <span
          className="font-display font-600 text-navy-900 text-base leading-snug"
          itemProp="name"
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          className={cn(
            "text-teal-500 flex-shrink-0 mt-0.5 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            itemScope
            itemType="https://schema.org/Answer"
          >
            <div className="px-6 pb-6 bg-teal-50 border-t border-teal-100">
              <p
                className="text-navy-600 leading-relaxed pt-4"
                itemProp="text"
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="section-padding bg-white"
      ref={ref}
      aria-labelledby="faq-title"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4">FAQ</Badge>
          <h2
            id="faq-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-800 text-navy-950 mb-4"
          >
            Questions Fréquentes
          </h2>
          <p className="text-navy-500 text-lg">
            Tout ce que vous devez savoir sur nos services de nettoyage extrême
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="flex flex-col gap-3">
          {FAQ_DATA.map((item, i) => (
            <FAQItem key={i} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
