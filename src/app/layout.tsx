import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import JsonLd from "@/components/seo/JsonLd";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Paperlight Productions | Wedding Photographer in Udupi & Mangalore",
    template: "%s | Paperlight Productions",
  },
  description:
    "Paperlight Productions captures timeless wedding moments in Udupi & Mangalore. Luxury photography for weddings, pre-weddings, haldi, mehendi & corporate events. Book your date today.",
  keywords: [
    "wedding photographer Udupi",
    "wedding photographer Mangalore",
    "pre wedding shoot Udupi",
    "candid wedding photography Karnataka",
    "Paperlight Productions",
  ],
  authors: [{ name: "Paperlight Productions" }],
  creator: "Paperlight Productions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://paperlightproductions.com",
    siteName: "Paperlight Productions",
    title: "Paperlight Productions | Wedding Photographer in Udupi & Mangalore",
    description:
      "Luxury wedding photography in Udupi & Mangalore. Our Work, Your Smile.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Paperlight Productions - Wedding Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paperlight Productions | Wedding Photographer in Udupi & Mangalore",
    description: "Luxury wedding photography. Our Work, Your Smile.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://paperlightproductions.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Paperlight Productions",
  url: "https://paperlightproductions.com",
  description: "Luxury wedding photography in Udupi & Mangalore. Our Work, Your Smile.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://paperlightproductions.com/portfolio?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <JsonLd data={websiteSchema} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
