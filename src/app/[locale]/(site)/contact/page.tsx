import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Contact — Intervention 24h/24" : "Contact — 24/7 Intervention",
    description:
      locale === "fr"
        ? "Contactez Kiff Cleaning Solutions pour toute urgence de nettoyage extrême en Île-de-France. Disponible 24h/24, 7j/7."
        : "Contact Kiff Cleaning Solutions for any extreme cleaning emergency in Île-de-France. Available 24/7.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isFr ? "Page de Contact — Kiff Cleaning Solutions" : "Contact Page — Kiff Cleaning Solutions",
    url: `https://www.kiffcleaningsolutions.com/${locale}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Kiff Cleaning Solutions",
      telephone: "+33770108339",
      email: "contact@kiffcleaningsolutions.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "220 chemin de Crécy",
        addressLocality: "Mareuil-lès-Meaux",
        postalCode: "77100",
        addressCountry: "FR",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {isFr ? "Disponible 24h/24" : "Available 24/7"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-6">
            {isFr ? "Contactez-Nous" : "Contact Us"}
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            {isFr
              ? "Nous sommes disponibles 24 heures sur 24, 7 jours sur 7. Pour les urgences, appelez directement."
              : "We are available 24 hours a day, 7 days a week. For emergencies, call us directly."}
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Phone */}
            <a href="tel:0770108339" className="block">
              <Card hover padding="lg" className="text-center h-full group">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-500 transition-colors">
                  <Phone size={26} className="text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-700 text-lg text-navy-950 mb-2">
                  {isFr ? "Téléphone" : "Phone"}
                </h3>
                <p className="text-2xl font-bold text-teal-600 mb-1">07 70 10 83 39</p>
                <p className="text-navy-400 text-sm">{isFr ? "Disponible 24h/24" : "Available 24/7"}</p>
              </Card>
            </a>

            {/* Email */}
            <a href="mailto:contact@kiffcleaningsolutions.com" className="block">
              <Card hover padding="lg" className="text-center h-full group">
                <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-navy-500 transition-colors">
                  <Mail size={26} className="text-navy-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-700 text-lg text-navy-950 mb-2">Email</h3>
                <p className="text-navy-700 font-medium mb-1 break-all text-sm">
                  contact@kiffcleaningsolutions.com
                </p>
                <p className="text-navy-400 text-sm">{isFr ? "Réponse sous 4h" : "Response within 4h"}</p>
              </Card>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/33770108339" target="_blank" rel="noopener noreferrer" className="block">
              <Card hover padding="lg" className="text-center h-full group">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                  <MessageCircle size={26} className="text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-700 text-lg text-navy-950 mb-2">WhatsApp</h3>
                <p className="text-navy-700 font-medium mb-1">07 70 10 83 39</p>
                <p className="text-navy-400 text-sm">{isFr ? "Message rapide" : "Quick message"}</p>
              </Card>
            </a>
          </div>

          {/* Address & Hours */}
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            <Card padding="lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-navy-950 mb-2">
                    {isFr ? "Adresse" : "Address"}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    220 chemin de Crécy<br />
                    77100 Mareuil-lès-Meaux<br />
                    Île-de-France, France
                  </p>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-gold-600" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-navy-950 mb-2">
                    {isFr ? "Horaires" : "Hours"}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    {isFr
                      ? <>Lundi — Dimanche<br /><strong className="text-teal-600">24h/24 — 7j/7</strong><br />Interventions d'urgence disponibles</>
                      : <>Monday — Sunday<br /><strong className="text-teal-600">24/7 — All year</strong><br />Emergency interventions available</>}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA to quote */}
          <div className="bg-gradient-to-r from-navy-950 to-navy-800 rounded-3xl p-10 text-center text-white">
            <h2 className="text-2xl font-display font-700 mb-3">
              {isFr ? "Préférez un Devis Détaillé ?" : "Prefer a Detailed Quote?"}
            </h2>
            <p className="text-navy-300 mb-6">
              {isFr
                ? "Notre formulaire de devis vous permet de décrire votre situation en détail pour obtenir une estimation précise."
                : "Our quote form lets you describe your situation in detail to receive an accurate estimate."}
            </p>
            <Link
              href={`/${locale}/quote`}
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              {isFr ? "Demander un Devis Gratuit" : "Request a Free Quote"}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
