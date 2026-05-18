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

                  {/* Visual card */}
                  <div className={`bg-gradient-to-br from-navy-50 to-teal-50 rounded-3xl p-10 flex items-center justify-center min-h-[280px] border border-teal-100 ${isEven ? "lg:col-start-1" : ""}`}>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-teal-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl">
                          {service.key === "diogene" ? "🏠" : service.key === "insalubre" ? "⚠️" : service.key === "postMortem" ? "🕊️" : "📦"}
                        </span>
                      </div>
                      <p className="text-navy-400 text-sm italic max-w-xs">
                        {content.tagline}
                      </p>
                    </div>
                  </div>
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
