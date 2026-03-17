import { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
    title: "Corporate Event Photography in Udupi & Mangalore | Paperlight Productions",
    description: "Professional corporate event, conference, product launch & team photography in Udupi and Mangalore by Paperlight Productions.",
};

const offerings = ["Conferences & Seminars", "Product Launches", "Team Photoshoots", "Award Ceremonies", "Office Interiors", "Annual Day Events"];

export default function CorporatePage() {
    return (
        <>
            <section className="relative pt-32 pb-20 min-h-[60vh] flex items-end overflow-hidden">
                <Image src="/hero-wedding.jpg" alt="Corporate event photography Mangalore" fill priority className="object-cover object-center" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">B2B Photography</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-4">Corporate <span className="text-gold">Events</span></h1>
                    <p className="text-white/70 text-lg max-w-xl">Professional imagery that elevates your brand — from boardroom to stage.</p>
                </div>
            </section>

            <section className="section-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Corporate Event Photography Built for Your Brand</h2>
                    <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                        First impressions matter in business. Our corporate photography delivers clean, professional, and high-impact images that work across your website, social media, and press materials. We cover events of all scales across Udupi, Mangalore, and all of Coastal Karnataka.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {offerings.map((item) => (
                            <div key={item} className="bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-sm text-sm text-[var(--color-muted)] hover:border-gold/40 hover:text-gold transition-colors">
                                ✦ {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                        <h3 className="font-serif text-xl text-[var(--color-text)] mb-6">Request a Quote</h3>
                        <InquiryForm compact />
                    </div>
                </div>
            </section>
        </>
    );
}
