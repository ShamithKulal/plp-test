import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/forms/InquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
    title: "Wedding Photographer in Udupi | Paperlight Productions",
    description:
        "Looking for the best wedding photographer in Udupi? Paperlight Productions specializes in candid, cinematic wedding photography at Manipal County, Kaup Beach, SVR Convention & more. Book today!",
    alternates: { canonical: "https://paperlightproductions.com/wedding-photography-udupi" },
};

const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyBusiness"],
    name: "Paperlight Productions – Udupi Wedding Photography",
    image: "https://paperlightproductions.com/hero-wedding.jpg",
    telephone: "+919876543210",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Udupi",
        addressRegion: "Karnataka",
        addressCountry: "IN",
    },
    areaServed: ["Udupi", "Manipal", "Kundapura", "Brahmavar"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127", bestRating: "5" },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "How far in advance should I book a wedding photographer in Udupi?", acceptedAnswer: { "@type": "Answer", text: "We recommend booking at least 6–12 months in advance, especially for peak wedding season (October–February). Dates fill up quickly!" } },
        { "@type": "Question", name: "Do you cover weddings at Manipal County Club, Udupi?", acceptedAnswer: { "@type": "Answer", text: "Yes! We have extensive experience shooting at Manipal County Club, SVR Convention, and other premium Udupi venues. We know every corner for the best shots." } },
        { "@type": "Question", name: "Do you offer pre-wedding shoots in Udupi?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Udupi and surrounding areas like Kaup Beach, Malpe Beach, and Manipal Lake offer stunning backdrops for pre-wedding shoots." } },
        { "@type": "Question", name: "What photography styles do you offer for Udupi weddings?", acceptedAnswer: { "@type": "Answer", text: "We offer candid, traditional, cinematic, and documentary-style wedding photography, fully customizable to your preference and event style." } },
    ],
};

const venues = ["Manipal County Club", "SVR Convention Hall", "Kaup Beach", "Malpe Beach", "Sri Durga Hall, Udupi", "Durgaparameshwari Temple Grounds"];

export default function UdupiWeddingPage() {
    return (
        <>
            <JsonLd data={schema} />
            <JsonLd data={faqSchema} />

            {/* Hero */}
            <section className="relative pt-32 pb-20 min-h-[70vh] flex items-end overflow-hidden">
                <Image src="/hero-wedding.jpg" alt="Wedding photographer in Udupi" fill priority className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Udupi, Karnataka</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-4">
                        Wedding Photographer<br /><span className="text-gold">in Udupi</span>
                    </h1>
                    <p className="text-white/70 text-lg max-w-xl">
                        Capturing love stories across Udupi's most breathtaking venues — from the mandap to the melodies.
                    </p>
                </div>
            </section>

            {/* Content + Form */}
            <section className="section-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">The Best Wedding Photographer in Udupi</h2>
                        <p className="text-[var(--color-muted)] leading-relaxed mb-4">
                            At Paperlight Productions, we bring a cinematic approach to every Udupi wedding. Whether you're celebrating in the grandeur of <strong className="text-[var(--color-text)]">Manipal County Club</strong>, the spiritual ambiance of a temple wedding, or the serene beauty of <strong className="text-[var(--color-text)]">Kaup Beach</strong>, our team is there to capture every unscripted moment.
                        </p>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            We are one of Udupi's most trusted wedding photography studios, with a 4.9-star Google rating and over 500 happy couples. Our style is candid-first — we believe the real magic happens in the moments between poses.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl text-[var(--color-text)] mb-4">Udupi Wedding Venues We Love</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {venues.map((v) => (
                                <div key={v} className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-sm text-sm text-[var(--color-muted)] hover:border-gold/40 hover:text-gold transition-colors">
                                    📍 {v}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl text-[var(--color-text)] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqSchema.mainEntity.map((faq) => (
                                <details key={faq.name} className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm">
                                    <summary className="flex justify-between items-center cursor-pointer p-5 text-sm text-[var(--color-text)] font-medium list-none">
                                        {faq.name}
                                        <span className="text-gold text-lg group-open:rotate-45 transition-transform duration-200">+</span>
                                    </summary>
                                    <p className="px-5 pb-5 text-sm text-[var(--color-muted)] leading-relaxed">{faq.acceptedAnswer.text}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sticky Form */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Check Date Availability</p>
                        <h3 className="font-serif text-xl text-[var(--color-text)] mb-6">Book Your Udupi Wedding</h3>
                        <InquiryForm compact />
                    </div>
                </div>
            </section>

            <Testimonials />

            <section className="py-12 text-center bg-[var(--color-surface)] border-t border-[var(--color-border)]">
                <p className="text-[var(--color-muted)] text-sm mb-4">Also serving Mangalore?</p>
                <Link href="/wedding-photography-mangalore" className="text-gold text-sm tracking-wider hover:underline">
                    Explore Wedding Photography in Mangalore →
                </Link>
            </section>
        </>
    );
}
