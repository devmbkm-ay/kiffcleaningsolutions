import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const SERVICES = [
  { label: "Syndrome de Diogène", href: "/services/syndrome-de-diogene" },
  { label: "Logement Insalubre", href: "/services/logement-insalubre" },
  { label: "Nettoyage Post-Mortem", href: "/services/nettoyage-post-mortem" },
  { label: "Débarras & Évacuation", href: "/services/debarras-evacuation" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 text-navy-300 text-sm leading-relaxed max-w-sm">
              {t("description")}
            </p>

            {/* Contact quick links */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:0770108339"
                className="flex items-center gap-3 text-navy-300 hover:text-teal-400 transition-colors text-sm"
              >
                <Phone size={16} className="text-teal-500 flex-shrink-0" />
                <span>07 70 10 83 39</span>
              </a>
              <a
                href="mailto:contact@kiffcleaningsolutions.com"
                className="flex items-center gap-3 text-navy-300 hover:text-teal-400 transition-colors text-sm"
              >
                <Mail size={16} className="text-teal-500 flex-shrink-0" />
                <span>contact@kiffcleaningsolutions.com</span>
              </a>
              <a
                href="https://wa.me/33770108339"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-navy-300 hover:text-teal-400 transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-teal-500 flex-shrink-0" />
                <span>WhatsApp</span>
              </a>
              <div className="flex items-center gap-3 text-navy-300 text-sm">
                <MapPin size={16} className="text-teal-500 flex-shrink-0" />
                <span>220 chemin de Crécy, 77100 Mareuil-lès-Meaux</span>
              </div>
              <div className="flex items-center gap-3 text-navy-300 text-sm">
                <Clock size={16} className="text-teal-500 flex-shrink-0" />
                <span>Disponible 24h/24 — 7j/7</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("services")}
            </h3>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={`/${locale}${service.href}`}
                    className="text-navy-300 hover:text-teal-400 transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("company")}
            </h3>
            <ul className="flex flex-col gap-2">
              {(
                [
                  ["about", "/about"],
                  ["gallery", "/gallery"],
                  ["blog", "/blog"],
                  ["quote", "/quote"],
                  ["contact", "/contact"],
                ] as const
              ).map(([key, href]) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-navy-300 hover:text-teal-400 transition-colors text-sm"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Zone */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Zone d&apos;intervention
              </h3>
              <p className="text-navy-300 text-xs leading-relaxed">
                Seine-et-Marne (77) · Paris (75) · Hauts-de-Seine (92) ·
                Seine-Saint-Denis (93) · Val-de-Marne (94) · Essonne (91) ·
                Val-d&apos;Oise (95)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm">
            © {new Date().getFullYear()} Kiff Cleaning Solutions. {t("rights")}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href={`/${locale}/privacy`}
              className="text-navy-400 hover:text-teal-400 transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-navy-400 hover:text-teal-400 transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
