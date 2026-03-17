import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SocialProofBar from "@/components/home/SocialProofBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import VenueGallery from "@/components/home/VenueGallery";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Paperlight Productions | Wedding Photographer in Udupi & Mangalore",
  description:
    "Paperlight Productions – Premium wedding, pre-wedding, haldi & mehendi photography in Udupi and Mangalore. Timeless moments, luxury storytelling. Our Work, Your Smile.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PhotographyBusiness"],
  name: "Paperlight Productions",
  image: "https://paperlightproductions.com/hero-wedding.jpg",
  "@id": "https://paperlightproductions.com",
  url: "https://paperlightproductions.com",
  telephone: "+919876543210",
  priceRange: "₹₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Udupi",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.3409,
    longitude: 74.7421,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
  areaServed: ["Udupi", "Mangalore", "Manipal", "Karnataka"],
  sameAs: [
    "https://instagram.com/paperlightproductions",
    "https://www.google.com/maps",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HeroSection />
      <SocialProofBar />
      <ServicesGrid />
      <VenueGallery />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
