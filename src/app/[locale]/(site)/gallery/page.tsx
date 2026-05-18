import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Galerie Avant/Après — Nos Réalisations" : "Before/After Gallery — Our Work",
    description:
      locale === "fr"
        ? "Découvrez nos réalisations avant et après : syndrome de Diogène, logements insalubres, débarras. Résultats professionnels garantis."
        : "Discover our before and after results: Diogenes syndrome, unsanitary housing, clearances. Professional results guaranteed.",
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {isFr ? "Nos Réalisations" : "Our Work"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-6">
            {isFr ? "Galerie Avant / Après" : "Before / After Gallery"}
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            {isFr
              ? "La preuve en images de notre expertise. Chaque transformation témoigne de notre engagement envers l'excellence."
              : "The visual proof of our expertise. Each transformation speaks to our commitment to excellence."}
          </p>
          <p className="text-navy-500 text-sm mt-4">
            {isFr
              ? "* Toutes les images sont publiées avec l'accord exprès des clients concernés."
              : "* All images are published with the express consent of the clients concerned."}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid locale={locale} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
