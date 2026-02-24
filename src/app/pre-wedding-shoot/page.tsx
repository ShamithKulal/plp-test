"use client";

import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";
import { motion } from "framer-motion";

const locations = [
    "Malpe Beach, Udupi",
    "Kaup Lighthouse",
    "Maravanthe Beach",
    "Kudlu Falls",
    "Agumbe Rainforest",
    "Mangalore Beach Road",
];

export default function PreWeddingPage() {
    return (
        <>
            <section className="relative pt-32 pb-20 min-h-[70vh] flex items-end overflow-hidden">
                <Image src="/prewedding/prakash-sonal-beach/PP-028_5_11zon.jpg" alt="Pre-wedding shoot Udupi Mangalore" fill priority className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Coastal Karnataka</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-4">Pre-Wedding <span className="text-gold">Shoot</span></h1>
                    <p className="text-white/70 text-lg max-w-xl">Your love story deserves a cinematic chapter — before the big day even begins.</p>
                </div>
            </section>

            <section className="section-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Stunning Pre-Wedding Photography in Coastal Karnataka</h2>
                        <p className="text-[var(--color-muted)] leading-relaxed mb-4">
                            A pre-wedding shoot is your chance to be completely yourselves — to laugh, explore, and fall in love with the camera. Coastal Karnataka&apos;s diverse landscapes offer the perfect backdrop: dramatic sunsets at <strong className="text-[var(--color-text)]">Malpe Beach</strong>, the mystical <strong className="text-[var(--color-text)]">Agumbe Rainforest</strong>, or the iconic <strong className="text-[var(--color-text)]">Kaup Lighthouse</strong>.
                        </p>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            At Paperlight, we scout each location, plan around golden hour lighting, and create a relaxed atmosphere so your true personalities shine through every frame.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl text-[var(--color-text)] mb-4">Our Favourite Locations</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {locations.map((loc, i) => (
                                <motion.div
                                    key={loc}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    whileHover={{ y: -4, scale: 1.03 }}
                                    className="relative group bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-sm text-sm overflow-hidden cursor-default transition-colors duration-300 hover:border-gold/60"
                                    style={{ boxShadow: "none" }}
                                >
                                    {/* Gold glow bg on hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />

                                    {/* Content */}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {/* Animated pin */}
                                        <motion.span
                                            className="inline-block text-base"
                                            whileHover={{ rotate: [0, -15, 15, 0], scale: 1.3 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            📍
                                        </motion.span>
                                        <span className="text-[var(--color-muted)] group-hover:text-gold transition-colors duration-300 font-medium">
                                            {loc}
                                        </span>
                                    </span>

                                    {/* Sliding gold underline */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[2px] bg-gold"
                                        initial={{ width: "0%" }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                        <h3 className="font-serif text-xl text-[var(--color-text)] mb-6">Book Your Pre-Wedding Shoot</h3>
                        <InquiryForm compact />
                    </div>
                </div>
            </section>
        </>
    );
}
