import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Blog — Conseils Nettoyage Extrême" : "Blog — Extreme Cleaning Tips",
    description:
      locale === "fr"
        ? "Articles et conseils sur le nettoyage extrême, le syndrome de Diogène, les logements insalubres. Informations pratiques par nos experts."
        : "Articles and tips on extreme cleaning, Diogenes syndrome, unsanitary housing. Practical information from our experts.",
  };
}

// Static blog articles for GEO-SEO
const BLOG_POSTS = [
  {
    slug: "syndrome-de-diogene-comment-aider",
    category: "guides",
    readingTime: 8,
    date: "2025-04-15",
    coverColor: "from-teal-500 to-teal-700",
    emoji: "🏠",
    fr: {
      title: "Syndrome de Diogène : Comment Reconnaître et Aider un Proche",
      excerpt:
        "Le syndrome de Diogène touche entre 0,05% et 0,1% de la population française. Voici les signes à reconnaître et les étapes concrètes pour aider un proche de façon bienveillante.",
      category: "Guide",
    },
    en: {
      title: "Diogenes Syndrome: How to Recognise and Help a Loved One",
      excerpt:
        "Diogenes syndrome affects between 0.05% and 0.1% of the French population. Here are the signs to look for and concrete steps to help a loved one with compassion.",
      category: "Guide",
    },
  },
  {
    slug: "logement-insalubre-droits-locataire",
    category: "legal",
    readingTime: 6,
    date: "2025-03-28",
    coverColor: "from-navy-600 to-navy-900",
    emoji: "⚖️",
    fr: {
      title: "Logement Insalubre : Vos Droits et Démarches en France",
      excerpt:
        "Face à un logement insalubre, locataires et propriétaires ont des droits et obligations précis. Ce guide explique les procédures légales, les aides disponibles et comment faire intervenir les autorités.",
      category: "Légal",
    },
    en: {
      title: "Unsanitary Housing: Your Rights and Steps to Take in France",
      excerpt:
        "When faced with unsanitary housing, tenants and landlords have specific rights and obligations. This guide explains legal procedures, available assistance and how to involve the authorities.",
      category: "Legal",
    },
  },
  {
    slug: "nettoyage-post-mortem-qui-appeler",
    category: "guides",
    readingTime: 5,
    date: "2025-03-10",
    coverColor: "from-gold-400 to-gold-600",
    emoji: "🕊️",
    fr: {
      title: "Nettoyage Post-Mortem : Qui Appeler et Comment Procéder ?",
      excerpt:
        "Lorsqu'un décès survient à domicile, de nombreuses questions se posent sur les démarches à suivre. Ce guide pratique vous explique étape par étape comment procéder dans ces moments difficiles.",
      category: "Guide",
    },
    en: {
      title: "Post-Mortem Cleaning: Who to Call and How to Proceed?",
      excerpt:
        "When a death occurs at home, many questions arise about the steps to follow. This practical guide explains step by step how to proceed during these difficult moments.",
      category: "Guide",
    },
  },
  {
    slug: "debarras-maison-succession",
    category: "tips",
    readingTime: 7,
    date: "2025-02-20",
    coverColor: "from-teal-600 to-navy-700",
    emoji: "📦",
    fr: {
      title: "Débarras pour Succession : Guide Complet et Conseils Pratiques",
      excerpt:
        "Un débarras dans le cadre d'une succession nécessite organisation et méthode. Découvrez nos conseils pour gérer cette étape délicate efficacement tout en respectant la mémoire du défunt.",
      category: "Conseils",
    },
    en: {
      title: "Estate Clearance: Complete Guide and Practical Tips",
      excerpt:
        "Estate clearance requires organisation and method. Discover our tips for handling this delicate step efficiently while honouring the memory of the deceased.",
      category: "Tips",
    },
  },
  {
    slug: "desinfection-logement-guide-complet",
    category: "tips",
    readingTime: 9,
    date: "2025-02-05",
    coverColor: "from-teal-400 to-teal-600",
    emoji: "🧹",
    fr: {
      title: "Désinfection Complète d'un Logement : Les Étapes Professionnelles",
      excerpt:
        "La désinfection d'un logement contaminé nécessite protocoles stricts et équipements adaptés. Voici comment les professionnels procèdent pour garantir un résultat sûr et durable.",
      category: "Conseils",
    },
    en: {
      title: "Complete Property Disinfection: The Professional Steps",
      excerpt:
        "Disinfecting a contaminated property requires strict protocols and adapted equipment. Here is how professionals proceed to guarantee a safe and lasting result.",
      category: "Tips",
    },
  },
  {
    slug: "reconnaitre-logement-insalubre",
    category: "guides",
    readingTime: 5,
    date: "2025-01-18",
    coverColor: "from-navy-500 to-navy-800",
    emoji: "⚠️",
    fr: {
      title: "Comment Reconnaître un Logement Insalubre ? Les 10 Critères Clés",
      excerpt:
        "Un logement insalubre présente des risques pour la santé de ses occupants. Voici les 10 critères officiels définis par la réglementation française pour identifier une situation d'insalubrité.",
      category: "Guide",
    },
    en: {
      title: "How to Recognise Unsanitary Housing? The 10 Key Criteria",
      excerpt:
        "Unsanitary housing presents health risks for its occupants. Here are the 10 official criteria defined by French regulations to identify an unsanitary situation.",
      category: "Guide",
    },
  },
];

const blogListSchema = (locale: string) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Kiff Cleaning Solutions Blog",
  url: `https://www.kiffcleaningsolutions.com/${locale}/blog`,
  publisher: {
    "@type": "Organization",
    name: "Kiff Cleaning Solutions",
    url: "https://www.kiffcleaningsolutions.com",
  },
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.fr.title,
    url: `https://www.kiffcleaningsolutions.com/${locale}/blog/${post.slug}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Kiff Cleaning Solutions" },
  })),
});

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema(locale)) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
            {isFr ? "Ressources & Conseils" : "Resources & Tips"}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-800 text-white mb-6">
            {isFr ? "Blog & Conseils Experts" : "Expert Blog & Tips"}
          </h1>
          <p className="text-navy-300 text-xl max-w-2xl mx-auto">
            {isFr
              ? "Guides pratiques, conseils et informations sur le nettoyage extrême, les droits des locataires et la remise en état de logements."
              : "Practical guides, tips and information on extreme cleaning, tenant rights and property restoration."}
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => {
              const content = isFr ? post.fr : post.en;
              return (
                <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                  <Card hover className="h-full group overflow-hidden" padding="none">
                    {/* Cover */}
                    <div className={`bg-gradient-to-br ${post.coverColor} h-48 flex items-center justify-center`}>
                      <span className="text-6xl">{post.emoji}</span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                          {content.category}
                        </span>
                        <span className="flex items-center gap-1 text-navy-400 text-xs">
                          <Clock size={12} />
                          {post.readingTime} {isFr ? "min" : "min read"}
                        </span>
                      </div>
                      <h2 className="font-display font-700 text-navy-950 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2 text-lg leading-snug">
                        {content.title}
                      </h2>
                      <p className="text-navy-500 text-sm leading-relaxed line-clamp-3 mb-4">
                        {content.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold group-hover:gap-3 transition-all">
                        {isFr ? "Lire l'article" : "Read article"}
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
