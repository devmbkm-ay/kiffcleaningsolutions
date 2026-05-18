import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { formatDate } from "@/lib/utils";

const UPX = "https://images.unsplash.com/photo-";
const UQ = "?w=1400&q=90&auto=format&fit=crop";

// Inline static blog content (GEO-optimized with answer capsules, structured headings, FAQ)
const ARTICLES: Record<string, {
  date: string;
  readingTime: number;
  coverImage: string;
  coverAlt: string;
  fr: { title: string; category: string; excerpt: string; content: string };
  en: { title: string; category: string; excerpt: string; content: string };
}> = {
  "syndrome-de-diogene-comment-aider": {
    date: "2025-04-15",
    readingTime: 8,
    // Cluttered living room with boxes — hoarding disorder context
    coverImage: `${UPX}caCqtH-CrCI${UQ}`,
    coverAlt: "Logement affecté par le syndrome de Diogène — accumulation d'objets et encombrement",
    fr: {
      title: "Syndrome de Diogène : Comment Reconnaître et Aider un Proche",
      category: "Guide",
      excerpt: "Le syndrome de Diogène touche entre 0,05% et 0,1% de la population française. Voici les signes à reconnaître et les étapes concrètes pour aider un proche de façon bienveillante.",
      content: `## Qu'est-ce que le syndrome de Diogène ?

Le syndrome de Diogène (ou syndrome de thésaurisation) est un trouble du comportement caractérisé par une accumulation compulsive d'objets, de déchets et de saleté, associé à un isolement social progressif. Il touche principalement les personnes âgées de plus de 60 ans, mais peut affecter n'importe qui à tout âge.

**En résumé :** Le syndrome de Diogène est une maladie psychologique qui se manifeste par l'accumulation pathologique d'objets et de déchets dans le logement, rendant celui-ci impraticable et dangereux pour la santé. En France, on estime que 0,05 à 0,1% de la population en est affecté, soit entre 30 000 et 60 000 personnes.

## Comment reconnaître le syndrome de Diogène ?

### Les signes caractéristiques

- **Accumulation excessive** : des montagnes d'objets, journaux, vêtements ou déchets envahissent le logement
- **Refus de jeter** : incapacité à se séparer d'objets, même inutiles ou dégradés
- **Isolement social** : honte ou peur du regard des autres, refus des visites
- **Négligence personnelle** : hygiène corporelle et alimentaire délaissée
- **Déni** : la personne ne reconnaît généralement pas avoir un problème

### Les niveaux de gravité

Le syndrome est classifié en 5 niveaux selon l'échelle HOMES :

| Niveau | Description |
|--------|-------------|
| 1 | Légère accumulation, passages encore accessibles |
| 2 | Accumulation modérée, pièces partiellement inaccessibles |
| 3 | Forte accumulation, risques sanitaires émergents |
| 4 | Accumulation sévère, présence de nuisibles |
| 5 | Situation de crise, logement totalement impraticable |

## Comment aider un proche atteint du syndrome de Diogène ?

### Étape 1 : Approcher avec bienveillance (sans jugement)

La première erreur est d'arriver avec des sacs poubelles et de commencer à jeter. Cette approche est contre-productive et traumatisante pour la personne concernée.

- Commencez par **rétablir le contact** sans évoquer le problème du logement
- **Évitez les critiques** sur l'état de la maison
- Exprimez votre **inquiétude pour sa santé**, pas pour les objets
- Proposez votre aide de façon **graduelle et non intrusive**

### Étape 2 : Impliquer les professionnels

Il est essentiel de ne pas agir seul. Plusieurs professionnels peuvent intervenir :

- **Médecin traitant** : premier interlocuteur pour un suivi psychiatrique
- **Travailleur social** : peut déclencher une aide à domicile
- **Mandataire judiciaire** : en cas de mise sous tutelle
- **Entreprise spécialisée** : pour le nettoyage et la remise en état du logement

### Étape 3 : Planifier la remise en état

Une fois l'accord de la personne obtenu (ou celui de son tuteur légal), la remise en état doit être planifiée avec soin :

1. Faire intervenir une **entreprise spécialisée** en nettoyage extrême
2. Prévoir un **accompagnement psychologique** pendant l'intervention
3. **Trier en présence** de la personne ou d'un proche de confiance
4. Ne jeter que ce qui est **clairement inutilisable** ou dangereux

## Pourquoi faire appel à des professionnels du nettoyage extrême ?

Le nettoyage d'un logement affecté par le syndrome de Diogène nécessite des compétences spécifiques :

- **Équipements de protection** adaptés aux risques biologiques
- **Protocoles de désinfection** certifiés
- **Discrétion et respect** de la dignité de la personne
- **Gestion des déchets** selon les filières réglementaires

Kiff Cleaning Solutions intervient dans toute l'Île-de-France avec une approche bienveillante et confidentielle. Nos équipes sont formées pour gérer ces situations délicates avec le plus grand respect.

## Questions fréquentes

**Peut-on forcer quelqu'un à nettoyer son logement ?**
Non, sauf en cas de danger grave et imminent pour la personne ou ses voisins (procédure d'insalubrité). Il est toujours préférable d'obtenir l'accord de la personne.

**Combien coûte le nettoyage d'un logement Diogène ?**
Le coût varie selon la superficie et l'état du logement. Kiff Cleaning Solutions propose des devis gratuits et personnalisés.

**Existe-t-il des aides financières ?**
Oui, selon les situations : aide sociale à l'hébergement (ASH), ANAH, CAF, mutuelles. Un travailleur social peut vous orienter.`,
    },
    en: {
      title: "Diogenes Syndrome: How to Recognise and Help a Loved One",
      category: "Guide",
      excerpt: "Diogenes syndrome affects between 0.05% and 0.1% of the French population. Here are the signs to look for and concrete steps to help a loved one with compassion.",
      content: `## What is Diogenes Syndrome?

Diogenes syndrome (or hoarding disorder) is a behavioural condition characterised by compulsive accumulation of objects, waste and dirt, combined with progressive social isolation. It primarily affects people over 60 years old, but can affect anyone at any age.

**In summary:** Diogenes syndrome is a psychological condition manifested by the pathological accumulation of objects and waste in the home, making it uninhabitable and dangerous to health. In France, an estimated 0.05 to 0.1% of the population is affected, equating to between 30,000 and 60,000 people.

## How to Recognise Diogenes Syndrome?

### Characteristic signs

- **Excessive accumulation**: mountains of objects, newspapers, clothes or waste invade the home
- **Refusal to discard**: inability to part with objects, even useless or degraded ones
- **Social isolation**: shame or fear of others' judgement, refusal of visitors
- **Personal neglect**: personal and nutritional hygiene neglected
- **Denial**: the person generally does not recognise having a problem

## How to Help a Loved One with Diogenes Syndrome?

### Step 1: Approach with kindness (without judgement)

The first mistake is arriving with bin bags and starting to throw things away. This approach is counterproductive and traumatic for the person concerned.

- Start by **re-establishing contact** without mentioning the housing problem
- **Avoid criticism** about the state of the home
- Express your **concern for their health**, not the objects
- Offer help in a **gradual and non-intrusive** way

### Step 2: Involve professionals

It is essential not to act alone. Several professionals can intervene including a GP, social worker, legal guardian, and specialist cleaning company.

### Step 3: Plan the restoration

Once the person's agreement is obtained, restoration must be planned carefully with a specialist extreme cleaning company, psychological support, and careful sorting in the presence of the person or a trusted relative.

## Why Use Extreme Cleaning Professionals?

Cleaning a property affected by Diogenes syndrome requires specific skills: adapted protective equipment, certified disinfection protocols, discretion and respect, and regulated waste management.

Kiff Cleaning Solutions intervenes throughout Île-de-France with a compassionate and confidential approach.`,
    },
  },
  "logement-insalubre-droits-locataire": {
    date: "2025-03-28",
    readingTime: 6,
    // Abandoned building — unsanitary housing context
    coverImage: `${UPX}NVmdPTa-6s4${UQ}`,
    coverAlt: "Logement insalubre — état dégradé d'une habitation",
    fr: {
      title: "Logement Insalubre : Vos Droits et Démarches en France",
      category: "Légal",
      excerpt: "Face à un logement insalubre, locataires et propriétaires ont des droits et obligations précis. Ce guide explique les procédures légales et les aides disponibles.",
      content: `## Qu'est-ce qu'un logement insalubre ?

**En résumé :** Un logement est déclaré insalubre lorsqu'il présente un danger pour la santé ou la sécurité de ses occupants, en raison de son état ou de ses conditions d'occupation. La procédure d'insalubrité est encadrée par la loi et implique les autorités sanitaires locales.

## Les critères légaux d'insalubrité

Selon la réglementation française, un logement peut être déclaré insalubre si :

- **Humidité excessive** : moisissures, infiltrations, condensation
- **Absence de ventilation** : renouvellement d'air insuffisant
- **Présence de nuisibles** : rats, cafards, punaises de lit
- **Installations défectueuses** : électricité, gaz, plomberie dangereuses
- **Suroccupation** : trop de personnes pour la superficie

## Vos droits en tant que locataire

### Ce que vous pouvez faire

1. **Signaler** l'insalubrité à la mairie, préfecture ou ARS
2. **Demander** l'intervention d'un inspecteur sanitaire
3. **Suspendre** le loyer sous conditions strictes
4. **Quitter** le logement sans préavis en cas de danger grave

### Les aides disponibles

- Hébergement d'urgence (115)
- Aide au relogement de la CAF
- Garantie VISALE pour trouver un nouveau logement

## Faire appel à des professionnels

Kiff Cleaning Solutions intervient pour remettre aux normes les logements insalubres, avec un protocole certifié incluant désinfection, traitement des nuisibles et remise en état complète.`,
    },
    en: {
      title: "Unsanitary Housing: Your Rights and Steps to Take in France",
      category: "Legal",
      excerpt: "When faced with unsanitary housing, tenants and landlords have specific rights and obligations. This guide explains legal procedures and available assistance.",
      content: `## What is Unsanitary Housing?

**In summary:** A property is declared unsanitary when it presents a danger to the health or safety of its occupants, due to its condition or occupation conditions. The unsanitary housing procedure is governed by law and involves local health authorities.

## Legal Criteria for Unsanitary Housing

According to French regulations, a property may be declared unsanitary due to excessive humidity, lack of ventilation, presence of pests, defective installations, or overcrowding.

## Your Rights as a Tenant

As a tenant you can report the unsanitary conditions to the town hall, prefecture or regional health authority, request a sanitary inspector's intervention, and in cases of serious danger, leave without notice.

## Using Professionals

Kiff Cleaning Solutions intervenes to restore unsanitary properties to standard, with a certified protocol including disinfection, pest treatment and complete restoration.`,
    },
  },
  "nettoyage-post-mortem-qui-appeler": {
    date: "2025-03-10",
    readingTime: 5,
    // Silhouette in corridor — quiet, dignified, peaceful mood
    coverImage: `${UPX}3hO8igCybds${UQ}`,
    coverAlt: "Intervention discrète et respectueuse — nettoyage post-mortem",
    fr: {
      title: "Nettoyage Post-Mortem : Qui Appeler et Comment Procéder ?",
      category: "Guide",
      excerpt: "Lorsqu'un décès survient à domicile, de nombreuses questions se posent sur les démarches à suivre. Ce guide pratique vous explique étape par étape comment procéder.",
      content: `## Que faire lors de la découverte d'un décès à domicile ?

**En résumé :** En cas de découverte d'un décès à domicile, la priorité est d'alerter les services d'urgence (15 ou 112) et la police. Une fois les constatations officielles effectuées, vous pouvez faire appel à une entreprise spécialisée en nettoyage post-mortem pour la remise en état du logement.

## Les étapes à suivre dans l'ordre

### 1. Alerter les services d'urgence
Appelez le 15 (SAMU) ou le 112. N'entrez pas dans la pièce si vous n'y êtes pas obligé.

### 2. Contacter la police ou gendarmerie
Même en cas de mort naturelle, les forces de l'ordre doivent constater le décès. N'y touchez à rien avant leur passage.

### 3. Prévenir la famille et le médecin traitant
Le médecin établira le certificat de décès, indispensable pour toutes les démarches ultérieures.

### 4. Faire appel à une entreprise spécialisée
Après l'intervention des autorités, contactez Kiff Cleaning Solutions pour le nettoyage et la désinfection du logement. Nous intervenons sous 2 heures, 24h/24.

## Pourquoi un nettoyage professionnel est indispensable ?

Un décès, notamment s'il n'a pas été découvert rapidement, génère des contaminations biologiques nécessitant un protocole spécifique :
- **Décontamination** des surfaces et matières poreuses
- **Neutralisation** des odeurs persistantes
- **Élimination** des risques biologiques selon les normes en vigueur

Notre équipe intervient avec discrétion, dans le respect de la dignité du défunt et de sa famille.`,
    },
    en: {
      title: "Post-Mortem Cleaning: Who to Call and How to Proceed?",
      category: "Guide",
      excerpt: "When a death occurs at home, many questions arise about the steps to follow. This practical guide explains step by step how to proceed during these difficult moments.",
      content: `## What to Do When Discovering a Death at Home?

**In summary:** When discovering a death at home, the priority is to alert emergency services (15 or 112) and the police. Once official documentation is complete, you can call a specialist post-mortem cleaning company for restoration of the property.

## Steps to Follow in Order

1. **Alert emergency services**: Call 15 (SAMU) or 112
2. **Contact the police or gendarmerie**: Even for natural death, authorities must document it
3. **Notify family and the GP**: The doctor will issue the death certificate
4. **Contact a specialist company**: Call Kiff Cleaning Solutions for cleaning and disinfection — we respond within 2 hours, 24/7

## Why Professional Cleaning is Essential?

A death, particularly if not discovered promptly, generates biological contamination requiring a specific protocol including decontamination of surfaces, odour neutralisation, and biological hazard elimination.

Our team intervenes discreetly, with full respect for the dignity of the deceased and their family.`,
    },
  },
};

// Generate static slugs
export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  const lang = locale === "en" ? "en" : "fr";
  const content = article[lang];

  return {
    title: content.title,
    description: content.excerpt,
    alternates: {
      canonical: `https://www.kiffcleaningsolutions.com/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: content.title,
      description: content.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-display font-700 text-navy-950 mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-display font-600 text-navy-900 mt-6 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("**En résumé") || line.startsWith("**In summary")) {
      elements.push(
        <div key={i} className="answer-capsule">
          {line.replace(/\*\*/g, "")}
        </div>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].startsWith("- ")) {
        i++;
        items.push(lines[i].slice(2));
      }
      elements.push(
        <ul key={i} className="list-none space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-navy-600">
              <span className="text-teal-500 mt-1 flex-shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].includes("---")) {
          rows.push(lines[i].split("|").filter((c) => c.trim()).map((c) => c.trim()));
        }
        i++;
      }
      i--;
      elements.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-navy-50">
                {rows[0]?.map((cell, j) => (
                  <th key={j} className="text-left px-4 py-2 font-semibold text-navy-900 border border-navy-200">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, j) => (
                <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-navy-50"}>
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-2 text-navy-600 border border-navy-200">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [line.replace(/^\d+\. /, "")];
      while (i + 1 < lines.length && lines[i + 1].match(/^\d+\. /)) {
        i++;
        items.push(lines[i].replace(/^\d+\. /, ""));
      }
      elements.push(
        <ol key={i} className="list-none space-y-2 my-4 counter-reset-list">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-navy-600">
              <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {j + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ol>
      );
    } else if (line.trim()) {
      elements.push(
        <p
          key={i}
          className="text-navy-600 leading-relaxed my-3"
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
        />
      );
    }

    i++;
  }

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const lang = locale === "en" ? "en" : "fr";
  const content = article[lang];
  const isFr = locale === "fr";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "Kiff Cleaning Solutions",
      url: "https://www.kiffcleaningsolutions.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Kiff Cleaning Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kiffcleaningsolutions.com/logo.png",
      },
    },
    url: `https://www.kiffcleaningsolutions.com/${locale}/blog/${slug}`,
    inLanguage: locale === "fr" ? "fr-FR" : "en-GB",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero with real photo */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background photo */}
        <img
          src={article.coverImage}
          alt={article.coverAlt}
          className="absolute inset-0 w-full h-full object-cover"
          priority-fetch="high"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-[1px]" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} />
            {isFr ? "Retour au blog" : "Back to blog"}
          </Link>
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            {content.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-800 text-white mb-6 leading-[1.15]">
            {content.title}
          </h1>
          <div className="flex items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(article.date, isFr ? "fr-FR" : "en-GB")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {article.readingTime} {isFr ? "min de lecture" : "min read"}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={14} />
              Kiff Cleaning Solutions
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2 prose-custom">
              <p className="text-navy-500 text-lg leading-relaxed border-b border-navy-100 pb-8 mb-4">
                {content.excerpt}
              </p>
              {renderMarkdown(content.content)}
            </article>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-24">
                <div className="bg-navy-950 rounded-3xl p-7 text-white mb-6">
                  <h3 className="font-display font-700 text-lg mb-2">
                    {isFr ? "Besoin d'aide ?" : "Need help?"}
                  </h3>
                  <p className="text-navy-300 text-sm mb-5">
                    {isFr
                      ? "Nos experts sont disponibles 24h/24 pour répondre à vos questions."
                      : "Our experts are available 24/7 to answer your questions."}
                  </p>
                  <a href={`/${locale}/quote`} className="block mb-3">
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm">
                      {isFr ? "Devis Gratuit" : "Free Quote"}
                    </button>
                  </a>
                  <a href="tel:0770108339" className="block">
                    <button className="w-full border border-white/20 hover:bg-white/10 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors text-sm">
                      07 70 10 83 39
                    </button>
                  </a>
                </div>

                <div className="bg-navy-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-navy-900 mb-3 text-sm">
                    {isFr ? "Autres articles" : "Other articles"}
                  </h4>
                  <ul className="space-y-2">
                    {Object.entries(ARTICLES)
                      .filter(([s]) => s !== slug)
                      .slice(0, 3)
                      .map(([s, a]) => (
                        <li key={s}>
                          <Link
                            href={`/${locale}/blog/${s}`}
                            className="text-sm text-navy-600 hover:text-teal-600 transition-colors line-clamp-2"
                          >
                            {a[lang].title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
