import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/lib/services-data";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const lang = locale === "en" ? "en" : "fr";
  const content = service[lang];

  return {
    title: content.name,
    description: content.answerCapsule,
    alternates: {
      canonical: `https://www.kiffcleaningsolutions.com/${locale}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const lang = locale === "en" ? "en" : "fr";
  const content = service[lang];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.name,
    description: content.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Kiff Cleaning Solutions",
      telephone: "+33770108339",
      url: "https://www.kiffcleaningsolutions.com",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Île-de-France" },
    url: `https://www.kiffcleaningsolutions.com/${locale}/services/${slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: lang === "fr" ? `Comment se déroule notre ${content.name.toLowerCase()} ?` : `How does our ${content.name.toLowerCase()} work?`,
    step: content.process.map(({ title, description }) => ({
      "@type": "HowToStep",
      name: title,
      text: description,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-navy-300 hover:text-teal-400 transition-colors mb-8 text-sm">
            <ArrowLeft size={16} />
            {lang === "fr" ? "Retour aux services" : "Back to services"}
          </Link>
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {lang === "fr" ? "Service Spécialisé" : "Specialist Service"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-6">
            {content.name}
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl">{content.tagline}</p>
        </div>
      </section>

      {/* Answer capsule */}
      <section className="py-10 bg-white border-b border-navy-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="answer-capsule text-base">
            <strong className="text-navy-900">
              {lang === "fr" ? "En résumé : " : "In summary: "}
            </strong>
            {content.answerCapsule}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-700 text-navy-950 mb-4">
                {lang === "fr" ? "Notre Approche" : "Our Approach"}
              </h2>
              <p className="text-navy-600 leading-relaxed mb-8">{content.description}</p>

              {/* What we do */}
              <h2 className="text-2xl font-display font-700 text-navy-950 mb-5">
                {lang === "fr" ? "Ce que Comprend Notre Service" : "What Our Service Includes"}
              </h2>
              <ul className="space-y-3 mb-10">
                {content.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-teal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-navy-700">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Process */}
              <h2 className="text-2xl font-display font-700 text-navy-950 mb-6">
                {lang === "fr" ? "Déroulement de l'Intervention" : "How the Intervention Works"}
              </h2>
              <div className="space-y-4 mb-10">
                {content.process.map(({ step, title, description }) => (
                  <div key={step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">{title}</h3>
                      <p className="text-navy-600 text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <h2 className="text-2xl font-display font-700 text-navy-950 mb-5">
                {lang === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions"}
              </h2>
              <div
                className="space-y-3"
                itemScope
                itemType="https://schema.org/FAQPage"
              >
                {content.faq.map(({ q, a }, i) => (
                  <div
                    key={i}
                    className="border border-navy-100 rounded-2xl overflow-hidden"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <div className="p-5 bg-navy-50">
                      <h3 className="font-semibold text-navy-900" itemProp="name">
                        {q}
                      </h3>
                    </div>
                    <div
                      className="p-5"
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <p className="text-navy-600 leading-relaxed" itemProp="text">
                        {a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-navy-950 rounded-3xl p-8 text-white">
                  <h3 className="font-display font-700 text-xl mb-2">
                    {lang === "fr" ? "Besoin d'une Intervention ?" : "Need an Intervention?"}
                  </h3>
                  <p className="text-navy-300 text-sm mb-6">
                    {lang === "fr"
                      ? "Devis gratuit et confidentiel sous 2 heures."
                      : "Free and confidential quote within 2 hours."}
                  </p>

                  <a href={`/${locale}/quote`} className="block">
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-3">
                      {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
                    </button>
                  </a>
                  <a href="tel:0770108339" className="block">
                    <button className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                      <Phone size={16} />
                      07 70 10 83 39
                    </button>
                  </a>

                  <div className="border-t border-white/10 mt-6 pt-6">
                    <p className="text-navy-400 text-xs text-center">
                      {lang === "fr"
                        ? "🔒 Confidentialité totale garantie"
                        : "🔒 Full confidentiality guaranteed"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
