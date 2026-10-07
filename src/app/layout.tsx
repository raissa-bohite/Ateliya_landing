import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://ateliya.com";

// Données structurées (JSON-LD) — contenu statique maîtrisé, pas d'entrée utilisateur.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ateliya",
      url: SITE_URL,
      logo: `${SITE_URL}/logo_ateliya.jpeg`,
    },
    {
      "@type": "SoftwareApplication",
      name: "Ateliya",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, iOS",
      url: SITE_URL,
      description:
        "Application de gestion pour ateliers de couture : clients, mesures, commandes et paiements.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "2000",
        priceCurrency: "XOF",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ateliya — Gestion d'atelier de couture intelligente",
    template: "%s | Ateliya",
  },
  description:
    "Ateliya centralise la gestion de votre atelier de couture : clients, mesures, commandes et paiements, sur mobile. Essai gratuit, sans carte bancaire.",
  keywords: [
    "atelier de couture",
    "gestion atelier couture",
    "logiciel couturier",
    "prise de mesures",
    "gestion commandes couture",
  ],
  authors: [{ name: "Ateliya" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Ateliya",
    title: "Ateliya — Gestion d'atelier de couture intelligente",
    description:
      "Centralisez clients, mesures, commandes et paiements de votre atelier de couture.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateliya — Gestion d'atelier de couture intelligente",
    description:
      "Centralisez clients, mesures, commandes et paiements de votre atelier de couture.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
