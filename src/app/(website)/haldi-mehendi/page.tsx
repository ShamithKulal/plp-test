import { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
    title: "Haldi & Mehendi Photography in Udupi & Mangalore | Paperlight Productions",
    description: "Expert Haldi and Mehendi ceremony photography in Udupi and Mangalore. Vibrant, candid, and beautifully captured by Paperlight Productions.",
    alternates: { canonical: "https://paperlightproductions.com/haldi-mehendi" },
};

export default function HaldiMehendiPage() {
    return (
        <>
            <section className="relative pt-32 pb-20 min-h-[60vh] flex items-end overflow-hidden">
                <Image src="/haldi-mehandi/poojitha-haldi/IMG_6441_3_11zon.jpg" alt="Haldi mehendi ceremony photography" fill priority className="object-cover object-top" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Pre-Wedding Traditions</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-4">Haldi &amp; <span className="text-gold">Mehendi</span></h1>
                    <p className="text-white/70 text-lg max-w-xl">The laughter, the colours, the rituals — every detail deserves to be immortalized.</p>
                </div>
            </section>

            <section className="section-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Candid Haldi & Mehendi Photography</h2>
                    <p className="text-[var(--color-muted)] leading-relaxed mb-4">
                        The Haldi ceremony is a burst of joy — turmeric flying, family laughing, and genuine emotions overflowing. The Mehendi night is intimate and beautiful. Paperlight Productions specializes in capturing both with a documentary style that feels authentic.
                    </p>
                    <p className="text-[var(--color-muted)] leading-relaxed mb-8">
                        We use fast prime lenses that perform beautifully in natural light, ensuring your outdoor or indoor Haldi celebrations look vibrant and warm in every photo.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {["Turmeric Ceremony Coverage", "Detail & Décor Shots", "Candid Family Moments", "Mehendi Closeups", "Group & Portrait Photos", "Same-Day Previews Available"].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-[var(--color-muted)]">
                                <span className="text-gold">✦</span> {item}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                        <h3 className="font-serif text-xl text-[var(--color-text)] mb-6">Book Haldi/Mehendi Coverage</h3>
                        <InquiryForm compact />
                    </div>
                </div>
            </section>
        </>
    );
}
