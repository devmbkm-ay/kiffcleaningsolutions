import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/services-data";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr ? "Nos Services de Nettoyage Extrême" : "Our Extreme Cleaning Services",
    description: isFr
      ? "Découvrez tous nos services spécialisés : syndrome de Diogène, logement insalubre, post-mortem, débarras. Intervention 24h/24 en Île-de-France."
      : "Discover all our specialist services: Diogenes syndrome, unsanitary housing, post-mortem, clearance. 24/7 intervention across Île-de-France.",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "fr";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {lang === "fr" ? "Nos Expertises" : "Our Expertise"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-6">
            {lang === "fr" ? "Services de Nettoyage Extrême" : "Extreme Cleaning Services"}
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            {lang === "fr"
              ? "Des solutions expertes et discrètes pour chaque situation difficile, disponibles 24h/24 en Île-de-France."
              : "Expert and discreet solutions for every difficult situation, available 24/7 across Île-de-France."}
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:gap-20">
            {SERVICES.map((service, i) => {
              const content = service[lang];
              const isEven = i % 2 === 1;

              return (
                <div
                  key={service.slug}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isEven ? "lg:grid-flow-dense" : ""}`}
                  id={service.slug}
                >
                  {/* Content */}
                  <div className={isEven ? "lg:col-start-2" : ""}>
                    <Badge className="mb-4">{content.name}</Badge>
                    <h2 className="text-3xl lg:text-4xl font-display font-800 text-navy-950 mb-4">
                      {content.name}
                    </h2>

                    {/* GEO answer capsule */}
                    <div className="answer-capsule mb-6">
                      {content.answerCapsule}
                    </div>

                    <p className="text-navy-600 leading-relaxed mb-6">
                      {content.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {content.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-teal-500 mt-0.5 flex-shrink-0" />
                          <span className="text-navy-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all group"
                    >
                      {lang === "fr" ? "En savoir plus" : "Learn more"}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Photo card */}
                  {(() => {
                    const PHOTOS: Record<string, { src: string; alt: string }> = {
                      diogene: {
                        src: "https://images.unsplash.com/photo-caCqtH-CrCI?w=800&q=85&auto=format&fit=crop",
                        alt: "Logement affecté par le syndrome de Diogène — accumulation d'objets",
                      },
                      insalubre: {
                        src: "https://images.unsplash.com/photo-0CuTJUAOn-4?w=800&q=85&auto=format&fit=crop",
                        alt: "Nettoyage professionnel d'un logement insalubre",
                      },
                      postMortem: {
                        src: "https://images.unsplash.com/photo-3hO8igCybds?w=800&q=85&auto=format&fit=crop",
                        alt: "Intervention discrète et respectueuse post-mortem",
                      },
                      debarras: {
                        src: "https://images.unsplash.com/photo-8zpfe1rDRGM?w=800&q=85&auto=format&fit=crop",
                        alt: "Débarras complet d'un logement encombré",
                      },
                    };
                    const photo = PHOTOS[service.key];
                    return (
                      <div className={`relative rounded-3xl overflow-hidden min-h-[320px] ${isEven ? "lg:col-start-1" : ""}`}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover absolute inset-0"
                          style={{ minHeight: "320px" }}
                          loading="lazy"
                        />
                        {/* Overlay with tagline */}
                        <div className="absolute inset-0 bg-linear-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-white/90 text-sm italic leading-relaxed">
                            {content.tagline}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
