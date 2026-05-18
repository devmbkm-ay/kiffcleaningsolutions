import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Award, Clock, Heart, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "À Propos — Notre Engagement" : "About — Our Commitment",
    description:
      locale === "fr"
        ? "Kiff Cleaning Solutions, spécialiste du nettoyage extrême en Île-de-France depuis plus de 10 ans. Discrétion, expertise et bienveillance."
        : "Kiff Cleaning Solutions, extreme cleaning specialist in Île-de-France for over 10 years. Discretion, expertise and compassion.",
  };
}

const ZONES = [
  { dept: "77", name: "Seine-et-Marne", cities: ["Meaux", "Melun", "Chelles", "Torcy", "Lagny-sur-Marne", "Coulommiers"] },
  { dept: "75", name: "Paris", cities: ["Tous arrondissements"] },
  { dept: "92", name: "Hauts-de-Seine", cities: ["Nanterre", "Boulogne", "Issy-les-Moulineaux"] },
  { dept: "93", name: "Seine-Saint-Denis", cities: ["Saint-Denis", "Montreuil", "Aubervilliers"] },
  { dept: "94", name: "Val-de-Marne", cities: ["Créteil", "Vincennes", "Ivry-sur-Seine"] },
  { dept: "91", name: "Essonne", cities: ["Évry", "Corbeil-Essonnes", "Massy"] },
  { dept: "95", name: "Val-d'Oise", cities: ["Cergy", "Pontoise", "Argenteuil"] },
];

const VALUES = [
  { icon: Shield, title: "Discrétion", description: "Intervention en tenue neutre, véhicules non identifiés. Confidentialité absolue garantie pour toutes nos interventions." },
  { icon: Heart, title: "Bienveillance", description: "Nous accompagnons nos clients dans des situations souvent douloureuses avec empathie, respect et sans aucun jugement." },
  { icon: Award, title: "Expertise", description: "Équipes formées aux protocoles sanitaires les plus stricts et aux techniques de nettoyage professionnel spécialisé." },
  { icon: Clock, title: "Réactivité", description: "Disponibles 24h/24, 7j/7. Intervention d'urgence sous 2 heures dans notre zone principale." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kiff Cleaning Solutions",
  description: "Spécialiste du nettoyage extrême, remise en état et désinfection en Île-de-France",
  foundingDate: "2013",
  address: {
    "@type": "PostalAddress",
    streetAddress: "220 chemin de Crécy",
    addressLocality: "Mareuil-lès-Meaux",
    postalCode: "77100",
    addressCountry: "FR",
  },
  telephone: "+33770108339",
  email: "contact@kiffcleaningsolutions.com",
  url: "https://www.kiffcleaningsolutions.com",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 5, maxValue: 15 },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {isFr ? "Notre Entreprise" : "Our Company"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-6">
            {isFr ? "À Propos de Kiff Cleaning Solutions" : "About Kiff Cleaning Solutions"}
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            {isFr
              ? "Une entreprise fondée sur l'engagement, la discrétion et l'expertise. Nous intervenons là où les autres n'osent pas aller."
              : "A company built on commitment, discretion and expertise. We intervene where others dare not go."}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-800 text-navy-950 mb-6">
                {isFr ? "Notre Mission" : "Our Mission"}
              </h2>
              <div className="answer-capsule">
                {isFr
                  ? "Kiff Cleaning Solutions intervient dans les situations de nettoyage les plus difficiles en Île-de-France avec respect, efficacité et confidentialité totale. Notre mission est d'aider les familles et les individus à traverser des moments difficiles en prenant en charge la dimension sanitaire et logistique de la remise en état."
                  : "Kiff Cleaning Solutions handles the most challenging cleaning situations across Île-de-France with respect, efficiency and complete confidentiality. Our mission is to help families and individuals through difficult moments by taking care of the sanitary and logistical aspects of restoration."}
              </div>
              <p className="text-navy-600 leading-relaxed mb-6">
                {isFr
                  ? "Fondée avec la conviction que chaque situation mérite une réponse professionnelle et humaine, notre entreprise s'est spécialisée dans les interventions sensibles : syndrome de Diogène, logements insalubres, nettoyages post-mortem et débarras complets."
                  : "Founded with the conviction that every situation deserves a professional and humane response, our company has specialised in sensitive interventions: Diogenes syndrome, unsanitary housing, post-mortem cleaning and complete clearances."}
              </p>
              <p className="text-navy-600 leading-relaxed">
                {isFr
                  ? "Avec plus de 500 interventions réalisées en Île-de-France, nous avons acquis une expertise reconnue et une réputation fondée sur la discrétion et l'efficacité."
                  : "With over 500 interventions carried out across Île-de-France, we have built recognised expertise and a reputation founded on discretion and efficiency."}
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden">
              {/* Professional cleaning team photo */}
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=85&auto=format&fit=crop"
                alt="Équipe Kiff Cleaning Solutions au travail"
                className="w-full h-72 lg:h-96 object-cover"
              />
              {/* Stats overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/30 to-transparent flex flex-col justify-end p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: isFr ? "Interventions" : "Interventions", value: "500+" },
                    { label: isFr ? "Satisfaction" : "Satisfaction", value: "98%" },
                    { label: isFr ? "Expérience" : "Experience", value: "10 ans" },
                    { label: isFr ? "Disponibilité" : "Availability", value: "24/7" },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <div className="font-display font-800 text-2xl gradient-text">{value}</div>
                      <div className="text-white/70 text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-navy-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-800 text-navy-950 mb-4">
              {isFr ? "Nos Valeurs" : "Our Values"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-navy-100">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={22} className="text-teal-600" />
                </div>
                <h3 className="font-display font-700 text-xl text-navy-950 mb-2">{title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="section-padding bg-white" id="zone-intervention">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-800 text-navy-950 mb-4 flex items-center justify-center gap-3">
              <MapPin className="text-teal-500" size={32} />
              {isFr ? "Zone d'Intervention" : "Service Area"}
            </h2>
            <p className="text-navy-500 text-lg">
              {isFr
                ? "Nous couvrons l'ensemble de l'Île-de-France avec une priorité sur la Seine-et-Marne"
                : "We cover the whole of Île-de-France with priority coverage of Seine-et-Marne"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZONES.map(({ dept, name, cities }) => (
              <div
                key={dept}
                className={`rounded-2xl p-5 border ${dept === "77" ? "border-teal-300 bg-teal-50" : "border-navy-100 bg-white"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-sm font-bold px-2 py-1 rounded-lg ${dept === "77" ? "bg-teal-500 text-white" : "bg-navy-100 text-navy-600"}`}>
                    {dept}
                  </span>
                  <span className="font-semibold text-navy-900">{name}</span>
                  {dept === "77" && <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Principal</span>}
                </div>
                <ul className="space-y-1">
                  {cities.map((city) => (
                    <li key={city} className="flex items-center gap-2 text-sm text-navy-500">
                      <CheckCircle2 size={14} className="text-teal-500 flex-shrink-0" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-navy-400 text-sm mt-8">
            {isFr
              ? "Des interventions ponctuelles hors Île-de-France sont possibles sur devis. Contactez-nous pour en discuter."
              : "Occasional interventions outside Île-de-France are possible on request. Contact us to discuss."}
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
