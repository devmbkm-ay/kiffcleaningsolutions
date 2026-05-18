import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TrustSection } from "@/components/sections/TrustSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Kiff Cleaning Solutions — Nettoyage Extrême en Île-de-France"
      : "Kiff Cleaning Solutions — Extreme Cleaning in Île-de-France",
    description: isFr
      ? "Spécialistes du nettoyage extrême en Île-de-France. Syndrome de Diogène, logement insalubre, post-mortem, débarras. Intervention 24h/24. Devis gratuit."
      : "Extreme cleaning specialists in Île-de-France. Diogenes syndrome, unsanitary housing, post-mortem, clearance. 24/7 intervention. Free quote.",
  };
}

// Schema.org structured data for homepage
function HomePageSchema({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.kiffcleaningsolutions.com/#business",
        name: "Kiff Cleaning Solutions",
        description:
          "Spécialistes du nettoyage extrême, remise en état et désinfection en Île-de-France",
        url: "https://www.kiffcleaningsolutions.com",
        telephone: "+33770108339",
        email: "contact@kiffcleaningsolutions.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "220 chemin de Crécy",
          addressLocality: "Mareuil-lès-Meaux",
          postalCode: "77100",
          addressCountry: "FR",
          addressRegion: "Île-de-France",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 48.9597,
          longitude: 2.9043,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Île-de-France",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services de Nettoyage Extrême",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Syndrome de Diogène",
                description:
                  "Remise en état complète de logements affectés par le syndrome de thésaurisation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Logement Insalubre",
                description:
                  "Nettoyage intensif et désinfection de logements insalubres",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Nettoyage Post-Mortem",
                description:
                  "Intervention discrète et désinfection complète de scènes sensibles",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Débarras & Évacuation",
                description:
                  "Vidage complet, tri sélectif et nettoyage de logements",
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "200",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.kiffcleaningsolutions.com/#website",
        url: "https://www.kiffcleaningsolutions.com",
        name: "Kiff Cleaning Solutions",
        publisher: { "@id": "https://www.kiffcleaningsolutions.com/#business" },
        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://www.kiffcleaningsolutions.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HomePageSchema locale={locale} />
      <Hero />
      <ServicesOverview />
      <TrustSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
