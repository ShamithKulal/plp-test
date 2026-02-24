"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = ["All", "Wedding", "Pre-Wedding", "Haldi & Mehendi", "Corporate"];

const portfolioItems = [
    { id: 1, category: "Wedding", image: "/hero-wedding.jpg", title: "Priya & Kiran's Wedding", location: "Manipal County Club, Udupi" },
    { id: 2, category: "Pre-Wedding", image: "/prewedding-hero.jpg", title: "Coastal Romance", location: "Malpe Beach, Udupi" },
    { id: 3, category: "Wedding", image: "/hero-wedding.jpg", title: "Royal Celebration", location: "Blue Waters, Mangalore" },
    { id: 4, category: "Haldi & Mehendi", image: "/prewedding-hero.jpg", title: "Golden Haldi Morning", location: "Udupi" },
    { id: 5, category: "Corporate", image: "/hero-wedding.jpg", title: "Annual Tech Summit", location: "Hotel Moti Mahal, Mangalore" },
    { id: 6, category: "Pre-Wedding", image: "/prewedding-hero.jpg", title: "Sunset at Kaup", location: "Kaup Lighthouse, Udupi" },
    { id: 7, category: "Wedding", image: "/hero-wedding.jpg", title: "Temple Wedding", location: "Durgaparameshwari Temple" },
    { id: 8, category: "Haldi & Mehendi", image: "/prewedding-hero.jpg", title: "Mehendi Moments", location: "Mangalore" },
    { id: 9, category: "Wedding", image: "/hero-wedding.jpg", title: "Beachside Reception", location: "Pilikula Grounds, Mangalore" },
];

export default function PortfolioPage() {
    const [active, setActive] = useState("All");
    const [lightbox, setLightbox] = useState<null | (typeof portfolioItems)[0]>(null);

    const filtered = active === "All" ? portfolioItems : portfolioItems.filter((i) => i.category === active);

    return (
        <>
            <section className="pt-32 pb-8 text-center px-6">
                <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Our Work</p>
                <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">Portfolio</h1>
                <p className="text-[var(--color-muted)] max-w-md mx-auto text-sm">A curated collection of moments that define Paperlight Productions.</p>
            </section>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center px-6 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`px-5 py-2 text-[12px] tracking-wider uppercase rounded-full border transition-all duration-300 ${active === cat
                                ? "bg-gold text-[#0F0F0F] border-gold font-semibold"
                                : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-gold hover:text-gold"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35 }}
                                className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-sm border border-[var(--color-border)] hover:border-gold/40 transition-colors"
                                onClick={() => setLightbox(item)}
                            >
                                <div className="relative h-64 sm:h-72">
                                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                                        <p className="font-serif text-sm text-white">{item.title}</p>
                                        <p className="text-[10px] text-gold mt-0.5">{item.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setLightbox(null)}>
                            <X size={28} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-3xl w-full max-h-[80vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-[80vh]">
                                <Image src={lightbox.image} alt={lightbox.title} fill className="object-contain" sizes="90vw" />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="font-serif text-lg text-white">{lightbox.title}</p>
                                <p className="text-xs text-gold mt-1">{lightbox.location}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
