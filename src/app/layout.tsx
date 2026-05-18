import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kiffcleaningsolutions.com"),
  title: {
    default: "Kiff Cleaning Solutions — Nettoyage Extrême Île-de-France",
    template: "%s | Kiff Cleaning Solutions",
  },
  description:
    "Spécialistes du nettoyage extrême, remise en état et désinfection en Île-de-France. Syndrome de Diogène, logement insalubre, post-mortem, débarras. Intervention 24h/24.",
  keywords: [
    "nettoyage extrême",
    "syndrome de Diogène",
    "logement insalubre",
    "nettoyage post-mortem",
    "débarras",
    "désinfection",
    "Île-de-France",
    "Seine-et-Marne",
    "Meaux",
  ],
  authors: [{ name: "Kiff Cleaning Solutions" }],
  creator: "Kiff Cleaning Solutions",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_GB",
    siteName: "Kiff Cleaning Solutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
