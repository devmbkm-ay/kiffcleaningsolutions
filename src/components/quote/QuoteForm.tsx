"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const quoteSchema = z.object({
  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  postalCode: z.string().length(5, "Code postal à 5 chiffres"),
  serviceType: z.enum(["diogene", "insalubre", "post-mortem", "debarras", "autre"]),
  description: z.string().min(30, "Description trop courte (minimum 30 caractères)"),
  urgency: z.enum(["normal", "urgent", "very_urgent"]),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const STEPS = [
  { id: 1, icon: User, label: "Coordonnées" },
  { id: 2, icon: FileText, label: "Service" },
  { id: 3, icon: Clock, label: "Détails" },
];

const SERVICE_OPTIONS = [
  { value: "diogene", label: "Syndrome de Diogène" },
  { value: "insalubre", label: "Logement Insalubre" },
  { value: "post-mortem", label: "Nettoyage Post-Mortem" },
  { value: "debarras", label: "Débarras & Évacuation" },
  { value: "autre", label: "Autre / Pas sûr" },
];

const URGENCY_OPTIONS = [
  { value: "normal", label: "Normal (sous 1 semaine)", color: "text-green-600" },
  { value: "urgent", label: "Urgent (sous 48h)", color: "text-amber-600" },
  { value: "very_urgent", label: "Très Urgent (sous 24h)", color: "text-red-600" },
];

export function QuoteForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: "onChange",
  });

  const goNext = async () => {
    const fields: (keyof QuoteFormData)[] =
      step === 1
        ? ["firstName", "lastName", "email", "phone"]
        : step === 2
        ? ["address", "city", "postalCode", "serviceType"]
        : ["description", "urgency"];

    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-teal-600" />
        </div>
        <h2 className="text-2xl font-display font-700 text-navy-950 mb-3">
          Demande envoyée avec succès !
        </h2>
        <p className="text-navy-600 mb-8 max-w-md mx-auto">
          Nous vous recontacterons dans les plus brefs délais, généralement sous 2 heures. Merci pour votre confiance.
        </p>
        <a href="tel:0770108339">
          <Button icon={<Phone size={18} />}>
            Appeler directement : 07 70 10 83 39
          </Button>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map(({ id, icon: Icon, label }) => (
          <div key={id} className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                step === id
                  ? "bg-teal-500 text-white"
                  : step > id
                  ? "bg-teal-100 text-teal-700"
                  : "bg-navy-100 text-navy-400"
              }`}
            >
              {step > id ? (
                <CheckCircle2 size={16} />
              ) : (
                <Icon size={16} />
              )}
              <span className="hidden sm:inline">{label}</span>
            </div>
            {id < STEPS.length && (
              <div className={`h-0.5 flex-1 rounded ${step > id ? "bg-teal-300" : "bg-navy-100"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Contact */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-display font-700 text-navy-950 mb-6 flex items-center gap-2">
              <User size={22} className="text-teal-500" />
              Vos coordonnées
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Prénom *</label>
                <input
                  {...register("firstName")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                  placeholder="Jean"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Nom *</label>
                <input
                  {...register("lastName")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                  placeholder="Dupont"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                <span className="flex items-center gap-1.5"><Mail size={14} /> Email *</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                placeholder="jean.dupont@email.fr"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                <span className="flex items-center gap-1.5"><Phone size={14} /> Téléphone *</span>
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                placeholder="06 12 34 56 78"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </motion.div>
        )}

        {/* Step 2: Service & Location */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-display font-700 text-navy-950 mb-6 flex items-center gap-2">
              <MapPin size={22} className="text-teal-500" />
              Adresse & Service
            </h2>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">Adresse du logement *</label>
              <input
                {...register("address")}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                placeholder="123 rue de la Paix"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Ville *</label>
                <input
                  {...register("city")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                  placeholder="Meaux"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">Code Postal *</label>
                <input
                  {...register("postalCode")}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm"
                  placeholder="77100"
                  maxLength={5}
                />
                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Type de service *</label>
              <div className="space-y-2">
                {SERVICE_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 p-3 rounded-xl border border-navy-200 hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-colors">
                    <input
                      {...register("serviceType")}
                      type="radio"
                      value={value}
                      className="text-teal-500 w-4 h-4"
                    />
                    <span className="text-sm text-navy-800">{label}</span>
                  </label>
                ))}
              </div>
              {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType.message}</p>}
            </div>
          </motion.div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-display font-700 text-navy-950 mb-6 flex items-center gap-2">
              <FileText size={22} className="text-teal-500" />
              Description & Urgence
            </h2>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Description de la situation *
              </label>
              <textarea
                {...register("description")}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition text-navy-900 text-sm resize-none"
                placeholder="Décrivez la situation : type de logement, superficie approximative, nature du problème... Plus vous êtes précis, plus notre devis sera adapté."
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Niveau d&apos;urgence *</label>
              <div className="space-y-2">
                {URGENCY_OPTIONS.map(({ value, label, color }) => (
                  <label key={value} className="flex items-center gap-3 p-3 rounded-xl border border-navy-200 hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-colors">
                    <input
                      {...register("urgency")}
                      type="radio"
                      value={value}
                      className="text-teal-500 w-4 h-4"
                    />
                    <span className={`text-sm font-medium ${color}`}>{label}</span>
                  </label>
                ))}
              </div>
              {errors.urgency && <p className="text-red-500 text-xs mt-1">{errors.urgency.message}</p>}
            </div>

            <p className="text-navy-400 text-xs bg-navy-50 rounded-xl p-4">
              🔒 Vos informations sont strictement confidentielles. Elles ne sont utilisées que pour traiter votre demande et ne sont jamais partagées avec des tiers.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-navy-100">
        {step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            icon={<ArrowLeft size={16} />}
          >
            Retour
          </Button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <Button
            type="button"
            onClick={goNext}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Continuer
          </Button>
        ) : (
          <Button
            type="submit"
            loading={loading}
            icon={<CheckCircle2 size={16} />}
            iconPosition="right"
          >
            Envoyer ma Demande
          </Button>
        )}
      </div>
    </form>
  );
}
