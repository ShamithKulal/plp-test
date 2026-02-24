"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Subject = {
    id: number;
    name: string;
    location: string;
    coverImage: string;
    images: string[];
};

type CategoryData = {
    label: string;
    subjects: Subject[];
};

const portfolioData: CategoryData[] = [
    {
        label: "Wedding",
        subjects: [
            {
                id: 1,
                name: "Priya & Kiran",
                location: "Manipal County Club, Udupi",
                coverImage: "/hero-wedding.jpg",
                images: [
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                ],
            },
            {
                id: 2,
                name: "Divya & Rahul",
                location: "Blue Waters, Mangalore",
                coverImage: "/prewedding-hero.jpg",
                images: [
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                ],
            },
            {
                id: 3,
                name: "Sneha & Arjun",
                location: "Durgaparameshwari Temple",
                coverImage: "/hero-wedding.jpg",
                images: [
                    "/hero-wedding.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                ],
            },
            {
                id: 4,
                name: "Ananya & Vikram",
                location: "Pilikula Grounds, Mangalore",
                coverImage: "/prewedding-hero.jpg",
                images: [
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                ],
            },
        ],
    },
    {
        label: "Pre-Wedding",
        subjects: [
            {
                id: 5,
                name: "Prakash & Sonal",
                location: "Beach",
                coverImage: "/prewedding/prakash-sonal-beach/PP-002_2_11zon.jpg",
                images: [
                    "/prewedding/prakash-sonal-beach/PP-002_2_11zon.jpg",
                    "/prewedding/prakash-sonal-beach/PP-012_3_11zon.jpg",
                    "/prewedding/prakash-sonal-beach/PP-014_4_11zon.jpg",
                    "/prewedding/prakash-sonal-beach/PP-028_5_11zon.jpg",
                    "/prewedding/prakash-sonal-beach/PP-035_6_11zon.jpg",
                    "/prewedding/prakash-sonal-beach/PP-037_7_11zon.jpg",
                    "/prewedding/prakash-sonal-beach/PP-045_8_11zon.jpg",
                ],
            },
            {
                id: 6,
                name: "Prakash & Sonal",
                location: "Heritage House",
                coverImage: "/prewedding/prakash-sonal-heritage/PP-057_1_11zon.jpg",
                images: [
                    "/prewedding/prakash-sonal-heritage/PP-057_1_11zon.jpg",
                    "/prewedding/prakash-sonal-heritage/PP-064_2_11zon.jpg",
                    "/prewedding/prakash-sonal-heritage/PP-070_3_11zon.jpg",
                    "/prewedding/prakash-sonal-heritage/PP-072_4_11zon.jpg",
                    "/prewedding/prakash-sonal-heritage/PP-077_5_11zon.jpg",
                    "/prewedding/prakash-sonal-heritage/PP-082_6_11zon.jpg",
                ],
            },
            {
                id: 7,
                name: "Prakash & Sonal",
                location: "Traditional",
                coverImage: "/prewedding/prakash-sonal-traditional/PP-131_3_11zon.jpg",
                images: [
                    "/prewedding/prakash-sonal-traditional/PP-122_1_11zon.jpg",
                    "/prewedding/prakash-sonal-traditional/PP-130_2_11zon.jpg",
                    "/prewedding/prakash-sonal-traditional/PP-131_3_11zon.jpg",
                    "/prewedding/prakash-sonal-traditional/PP-136_4_11zon.jpg",
                    "/prewedding/prakash-sonal-traditional/PP-137_5_11zon.jpg",
                    "/prewedding/prakash-sonal-traditional/PP-138_6_11zon.jpg",
                    "/prewedding/prakash-sonal-traditional/PP-143_7_11zon.jpg",
                ],
            },
            {
                id: 8,
                name: "Coastal Romance",
                location: "Malpe Beach, Udupi",
                coverImage: "/prewedding-hero.jpg",
                images: [
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                ],
            },
            {
                id: 9,
                name: "Sunset at Kaup",
                location: "Kaup Lighthouse, Udupi",
                coverImage: "/hero-wedding.jpg",
                images: [
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                ],
            },
            {
                id: 10,
                name: "Golden Hour",
                location: "Mangalore Coastline",
                coverImage: "/prewedding-hero.jpg",
                images: [
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                ],
            },
        ],
    },
    {
        label: "Haldi & Mehendi",
        subjects: [
            {
                id: 11,
                name: "Poojitha",
                location: "Haldi",
                coverImage: "/haldi-mehandi/poojitha-haldi/DSC00081_11zon.jpg",
                images: [
                    "/haldi-mehandi/poojitha-haldi/DSC00081_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6196_1_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6231_2_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6441_3_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_5760_6_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_5955_7_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6025_8_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6050_9_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6134_10_11zon.jpg",
                    "/haldi-mehandi/poojitha-haldi/IMG_6196_11_11zon.jpg",
                ],
            },
            {
                id: 12,
                name: "Poojitha",
                location: "Mehandi",
                coverImage: "/haldi-mehandi/poojitha-mehandi/DSC00873_1_11zon.jpg",
                images: [
                    "/haldi-mehandi/poojitha-mehandi/DSC00873_1_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6497_2_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6518_3_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6541_4_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6578_5_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6614_6_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6670_1_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6884_2_11zon.jpg",
                    "/haldi-mehandi/poojitha-mehandi/IMG_6940_3_11zon.jpg",
                ],
            },
        ],
    },
    {
        label: "Corporate",
        subjects: [
            {
                id: 13,
                name: "Annual Tech Summit",
                location: "Hotel Moti Mahal, Mangalore",
                coverImage: "/hero-wedding.jpg",
                images: [
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                ],
            },
            {
                id: 14,
                name: "Product Launch 2024",
                location: "Goldfinch Hotel, Mangalore",
                coverImage: "/prewedding-hero.jpg",
                images: [
                    "/prewedding-hero.jpg",
                    "/hero-wedding.jpg",
                    "/prewedding-hero.jpg",
                ],
            },
        ],
    },
];

const ALL_CATEGORIES = ["All", ...portfolioData.map((c) => c.label)];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSubject, setActiveSubject] = useState<(Subject & { categoryLabel: string }) | null>(null);
    const [galleryIndex, setGalleryIndex] = useState(0);

    // Subjects visible in the current category view
    const visibleSubjects =
        activeCategory === "All"
            ? portfolioData.flatMap((cat) =>
                cat.subjects.map((s) => ({ ...s, categoryLabel: cat.label }))
            )
            : portfolioData
                .find((c) => c.label === activeCategory)
                ?.subjects.map((s) => ({ ...s, categoryLabel: activeCategory })) ?? [];

    // Gallery navigation
    const openGallery = (subject: Subject & { categoryLabel: string }) => {
        setActiveSubject(subject);
        setGalleryIndex(0);
    };

    const closeGallery = () => setActiveSubject(null);

    const prevImage = useCallback(() => {
        if (!activeSubject) return;
        setGalleryIndex((i) => (i - 1 + activeSubject.images.length) % activeSubject.images.length);
    }, [activeSubject]);

    const nextImage = useCallback(() => {
        if (!activeSubject) return;
        setGalleryIndex((i) => (i + 1) % activeSubject.images.length);
    }, [activeSubject]);

    // Keyboard navigation
    useEffect(() => {
        if (!activeSubject) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "Escape") closeGallery();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [activeSubject, prevImage, nextImage]);

    return (
        <>
            {/* ── Header ── */}
            <section className="pt-32 pb-8 text-center px-6">
                <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">Our Work</p>
                <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">Portfolio</h1>
                <p className="text-[var(--color-muted)] max-w-md mx-auto text-sm">
                    A curated collection of moments that define Paperlight Productions.
                </p>
            </section>

            {/* ── Category Tabs ── */}
            <div className="flex flex-wrap gap-2 justify-center px-6 mb-10">
                {ALL_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 text-[12px] tracking-wider uppercase rounded-full border transition-all duration-300 ${activeCategory === cat
                            ? "bg-gold text-[#0F0F0F] border-gold font-semibold"
                            : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-gold hover:text-gold"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Subject Grid ── */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {visibleSubjects.map((subject) => (
                            <motion.div
                                key={subject.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.35 }}
                                className="group relative cursor-pointer overflow-hidden rounded-sm border border-[var(--color-border)] hover:border-gold/40 transition-colors"
                                onClick={() => openGallery(subject)}
                            >
                                {/* Category badge (shown in "All" view) */}
                                {activeCategory === "All" && (
                                    <span className="absolute top-3 left-3 z-10 text-[9px] tracking-widest uppercase bg-black/60 text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                                        {subject.categoryLabel}
                                    </span>
                                )}

                                {/* Cover image */}
                                <div className="relative h-72">
                                    <Image
                                        src={subject.coverImage}
                                        alt={subject.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                                </div>

                                {/* Name + location overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <p className="font-serif text-base text-white leading-snug">{subject.name}</p>
                                    <p className="text-[10px] text-gold mt-1 tracking-wide">{subject.location}</p>
                                    <p className="text-[10px] text-white/40 mt-0.5">
                                        {subject.images.length} photos · tap to view
                                    </p>
                                </div>

                                {/* Hover ring */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30 transition-all duration-300 rounded-sm" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* ── Gallery Lightbox ── */}
            <AnimatePresence>
                {activeSubject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/97 flex flex-col"
                        onClick={closeGallery}
                    >
                        {/* Top bar */}
                        <div
                            className="flex items-center justify-between px-6 pt-6 pb-4 flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeGallery}
                                className="flex items-center gap-1.5 text-sm text-white/60 hover:text-gold transition-colors"
                            >
                                <ArrowLeft size={16} />
                                <span className="tracking-wide uppercase text-[11px]">Back</span>
                            </button>

                            <div className="text-center">
                                <p className="font-serif text-base text-white">{activeSubject.name}</p>
                                <p className="text-[10px] text-gold tracking-wide">{activeSubject.location}</p>
                            </div>

                            <button
                                className="text-white/60 hover:text-gold transition-colors"
                                onClick={closeGallery}
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* Main image area */}
                        <div
                            className="flex-1 relative flex items-center justify-center px-16 min-h-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Prev arrow */}
                            {activeSubject.images.length > 1 && (
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all duration-200"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                            )}

                            {/* Image */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={galleryIndex}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.28 }}
                                    className="relative w-full h-full max-h-[70vh]"
                                >
                                    <Image
                                        src={activeSubject.images[galleryIndex]}
                                        alt={`${activeSubject.name} – photo ${galleryIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="90vw"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Next arrow */}
                            {activeSubject.images.length > 1 && (
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all duration-200"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            )}
                        </div>

                        {/* Footer: counter + thumbnail strip */}
                        <div
                            className="flex-shrink-0 pb-8 pt-4 flex flex-col items-center gap-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Counter */}
                            <p className="text-[11px] tracking-widest text-white/40 uppercase">
                                {galleryIndex + 1} / {activeSubject.images.length}
                            </p>

                            {/* Thumbnail strip */}
                            <div className="flex gap-2 overflow-x-auto px-4 max-w-full">
                                {activeSubject.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setGalleryIndex(idx)}
                                        className={`flex-shrink-0 relative w-12 h-12 rounded-sm overflow-hidden border-2 transition-all duration-200 ${idx === galleryIndex
                                            ? "border-gold"
                                            : "border-white/10 opacity-50 hover:opacity-80"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`thumb ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
