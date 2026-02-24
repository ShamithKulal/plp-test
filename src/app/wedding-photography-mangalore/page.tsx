import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/forms/InquiryForm";
import JsonLd from "@/components/seo/JsonLd";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
    title: "Wedding Photographer in Mangalore | Paperlight Productions",
    description:
        "Hire the best wedding photographer in Mangalore. Paperlight Productions captures timeless memories at Blue Waters, Goldfinch Hotel, Pilikula & all Mangalore venues. Book today!",
    alternates: { canonical: "https://paperlightproductions.com/wedding-photography-mangalore" },
};

const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PhotographyBusiness"],
    name: "Paperlight Productions – Mangalore Wedding Photography",
    telephone: "+919876543210",
    address: { "@type": "PostalAddress", addressLocality: "Mangalore", addressRegion: "Karnataka", addressCountry: "IN" },
    areaServed: ["Mangalore", "Dakshina Kannada", "Bantwal", "Puttur"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127", bestRating: "5" },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        { "@type": "Question", name: "What is the cost of a wedding photographer in Mangalore?", acceptedAnswer: { "@type": "Answer", text: "Paperlight Productions' Mangalore wedding photography packages start from ₹45,000 for single-day coverage. Contact us for a personalized quote." } },
        { "@type": "Question", name: "Do you cover weddings at Blue Waters Mangalore?", acceptedAnswer: { "@type": "Answer", text: "Yes! Blue Waters Resort is one of our favorite Mangalore venues — the sea-facing backdrop makes for stunning wedding portraits." } },
        { "@type": "Question", name: "Do you travel outside Mangalore for weddings?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. We cover all of Coastal Karnataka including Bantwal, Puttur, Belthangady, and destination weddings." } },
        { "@type": "Question", name: "How soon can I receive my wedding photos?", acceptedAnswer: { "@type": "Answer", text: "Edited photos are typically delivered within 3–4 weeks after your wedding. Rush delivery options are available." } },
        { "@type": "Question", name: "Do you offer drone photography in Mangalore?", acceptedAnswer: { "@type": "Answer", text: "Yes, we offer professional drone (aerial) photography and videography for outdoor wedding venues in Mangalore." } },
    ],
};

const venues = ["Blue Waters Resort", "Goldfinch Hotel", "Pilikula Grounds", "Pabbas Mangalore", "Hotel Moti Mahal", "Lalbagh Grounds"];

export default function MangaloreWeddingPage() {
    return (
        <>
            <JsonLd data={schema} />
            <JsonLd data={faqSchema} />

            <section className="relative pt-32 pb-20 min-h-[70vh] flex items-end overflow-hidden">
                <Image src="/prewedding-hero.jpg" alt="Wedding photographer in Mangalore" fill priority className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Mangalore, Karnataka</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-4">
                        Wedding Photographer<br /><span className="text-gold">in Mangalore</span>
                    </h1>
                    <p className="text-white/70 text-lg max-w-xl">
                        Storytelling photography for Mangalore's most cherished celebrations — from Beary weddings to grand receptions.
                    </p>
                </div>
            </section>

            <section className="section-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Premium Wedding Photography in Mangalore</h2>
                        <p className="text-[var(--color-muted)] leading-relaxed mb-4">
                            Mangalore is a city of rich culture and vibrant weddings — and Paperlight Productions is here to honor every detail. From the grandeur of <strong className="text-[var(--color-text)]">Blue Waters Resort</strong> by the sea to the lush lawns of <strong className="text-[var(--color-text)]">Pilikula Grounds</strong>, we craft images that feel cinematic yet personal.
                        </p>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            Whether you want traditional Tulu Nadu wedding documentation, candid emotional storytelling, or cinematic highlights, we tailor every album to your vision.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl text-[var(--color-text)] mb-4">Mangalore Wedding Venues We Love</h2>
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

                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Check Date Availability</p>
                        <h3 className="font-serif text-xl text-[var(--color-text)] mb-6">Book Your Mangalore Wedding</h3>
                        <InquiryForm compact />
                    </div>
                </div>
            </section>

            <Testimonials />

            <section className="py-12 text-center bg-[var(--color-surface)] border-t border-[var(--color-border)]">
                <p className="text-[var(--color-muted)] text-sm mb-4">Also based in Udupi?</p>
                <Link href="/wedding-photography-udupi" className="text-gold text-sm tracking-wider hover:underline">
                    Explore Wedding Photography in Udupi →
                </Link>
            </section>
        </>
    );
}
