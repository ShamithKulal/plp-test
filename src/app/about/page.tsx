import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | Paperlight Productions – Udupi & Mangalore",
    description: "Meet the team behind Paperlight Productions — passionate photographers dedicated to capturing your most precious moments in Udupi and Mangalore.",
    alternates: { canonical: "https://paperlightproductions.com/about" },
};

const values = [
    { title: "Authenticity", desc: "We capture real moments, not manufactured poses. Your genuine emotions are our art." },
    { title: "Craftsmanship", desc: "Every frame is composed with intention. We obsess over light, angle, and timing." },
    { title: "Connection", desc: "We become part of your celebration — friendly, unobtrusive, and completely present." },
];

export default function AboutPage() {
    return (
        <>
            <section className="pt-32 pb-16 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Our Story</p>
                    <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text)] mb-6">
                        Crafted with <span className="text-gold">Passion</span>
                    </h1>
                    <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
                        Born in the coastal air of Udupi, Paperlight Productions has been illuminating love stories since 2018.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative h-[500px] rounded-sm overflow-hidden">
                        <Image src="/prewedding-hero.jpg" alt="Paperlight Productions team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl text-[var(--color-text)]">Our Work, Your Smile</h2>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            We started Paperlight with one belief: the best photographs don't just document a moment — they carry its soul. Every wedding, every couple, every celebration has a unique heartbeat, and we chase that with our cameras.
                        </p>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            Based between Udupi and Mangalore, we've had the privilege of photographing over 500 weddings across Coastal Karnataka — from intimate beach ceremonies to grand banquet hall extravaganzas. Our style is cinematic, candid, and deeply personal.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="text-center">
                                <div className="font-serif text-3xl text-gold">500+</div>
                                <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">Weddings</div>
                            </div>
                            <div className="text-center">
                                <div className="font-serif text-3xl text-gold">4.9★</div>
                                <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">Google Rating</div>
                            </div>
                            <div className="text-center">
                                <div className="font-serif text-3xl text-gold">6+</div>
                                <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="font-serif text-3xl text-[var(--color-text)] text-center mb-10">What We Believe In</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-sm text-center hover:border-gold/40 transition-colors">
                                <h3 className="font-serif text-xl text-gold mb-3">{v.title}</h3>
                                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 text-[13px] tracking-widest uppercase font-semibold bg-gold text-[#0F0F0F] hover:brightness-110 transition-all duration-300 rounded-sm">
                        Work With Us →
                    </Link>
                </div>
            </section>
        </>
    );
}
