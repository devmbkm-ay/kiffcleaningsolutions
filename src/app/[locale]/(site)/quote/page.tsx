import type { Metadata } from "next";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Badge } from "@/components/ui/Badge";
import { Shield, Clock, Star } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Demande de Devis Gratuit" : "Free Quote Request",
    description:
      locale === "fr"
        ? "Obtenez un devis gratuit et confidentiel pour votre nettoyage extrême en Île-de-France. Réponse sous 2 heures."
        : "Get a free and confidential quote for your extreme cleaning in Île-de-France. Response within 2 hours.",
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-teal-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {isFr ? "Gratuit & Sans Engagement" : "Free & No Commitment"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-800 text-white mb-4">
            {isFr ? "Demande de Devis" : "Quote Request"}
          </h1>
          <p className="text-navy-300 text-lg max-w-xl mx-auto">
            {isFr
              ? "Remplissez ce formulaire et nous vous contacterons sous 2 heures avec une estimation personnalisée."
              : "Fill in this form and we will contact you within 2 hours with a personalised estimate."}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-navy-300 text-sm">
              <Shield size={16} className="text-teal-400" />
              {isFr ? "100% Confidentiel" : "100% Confidential"}
            </div>
            <div className="flex items-center gap-2 text-navy-300 text-sm">
              <Clock size={16} className="text-teal-400" />
              {isFr ? "Réponse sous 2h" : "Response within 2h"}
            </div>
            <div className="flex items-center gap-2 text-navy-300 text-sm">
              <Star size={16} className="text-gold-400" />
              {isFr ? "Devis gratuit" : "Free quote"}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
