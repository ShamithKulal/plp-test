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
        label: "House Warming",
        subjects: [
            {
                id: 13,
                name: "SIRI",
                location: "Udupi",
                coverImage: "/house-warming/siri/IMG_8287_3_11zon.jpg",
                images: [
                    "/house-warming/siri/DSC04448_1_11zon.jpg",
                    "/house-warming/siri/DSC04670_2_11zon.jpg",
                    "/house-warming/siri/DSC04678_3_11zon.jpg",
                    "/house-warming/siri/DSC05775_4_11zon.jpg",
                    "/house-warming/siri/IMG_4251_5_11zon.jpg",
                    "/house-warming/siri/IMG_4262_1_11zon.jpg",
                    "/house-warming/siri/IMG_8253_2_11zon.jpg",
                    "/house-warming/siri/IMG_8287_3_11zon.jpg",
                    "/house-warming/siri/IMG_8312_4_11zon.jpg",
                ],
            },
            {
                id: 14,
                name: "Pritham",
                location: "Udupi",
                coverImage: "/house-warming/pritham/IMG_0134_2_11zon.jpg",
                images: [
                    "/house-warming/pritham/IMG_0035_1_11zon.jpg",
                    "/house-warming/pritham/IMG_0134_2_11zon.jpg",
                    "/house-warming/pritham/IMG_8720_3_11zon.jpg",
                    "/house-warming/pritham/IMG_8754_4_11zon.jpg",
                    "/house-warming/pritham/IMG_9742_5_11zon.jpg",
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {visibleSubjects.map((subject) => (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            onClick={() => openGallery(subject)}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                                <Image
                                    src={subject.coverImage}
                                    alt={subject.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">
                                        {subject.categoryLabel}
                                    </p>
                                    <h3 className="font-serif text-2xl text-white mb-1">{subject.name}</h3>
                                    <p className="text-[var(--color-muted)] text-[12px] tracking-wide">
                                        {subject.location}
                                    </p>
                                </div>

                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                                    <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center text-gold backdrop-blur-sm">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Lightbox Gallery ── */}
            <AnimatePresence>
                {activeSubject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#0F0F0F]/fb flex flex-col pt-10"
                    >
                        {/* Lightbox Header */}
                        <div className="flex justify-between items-center px-8 h-20">
                            <div>
                                <h2 className="font-serif text-2xl text-white">{activeSubject.name}</h2>
                                <p className="text-gold text-[10px] tracking-[0.3em] uppercase mt-1">
                                    {activeSubject.categoryLabel} · {activeSubject.location}
                                </p>
                            </div>
                            <button
                                onClick={closeGallery}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Main Image Area */}
                        <div className="flex-1 relative flex items-center justify-center px-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={galleryIndex}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.4 }}
                                    className="relative w-full h-full max-h-[75vh]"
                                >
                                    <Image
                                        src={activeSubject.images[galleryIndex]}
                                        alt={`${activeSubject.name} Gallery ${galleryIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="90vw"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav Buttons */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="absolute left-6 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-gold/20 hover:border-gold hover:text-gold transition-all"
                            >
                                <ChevronLeft size={28} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-6 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-gold/20 hover:border-gold hover:text-gold transition-all"
                            >
                                <ChevronRight size={28} />
                            </button>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="h-24 flex justify-center items-center gap-3 pb-8 px-6">
                            {activeSubject.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setGalleryIndex(idx)}
                                    className={`relative h-14 aspect-square overflow-hidden rounded-sm transition-all duration-300 ${galleryIndex === idx ? "ring-2 ring-gold scale-110 z-10" : "opacity-40 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt="Thumb" fill className="object-cover" sizes="60px" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Footer Link ── */}
            <section className="bg-[var(--color-surface)] py-20 px-6 border-t border-[var(--color-border)]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl text-white mb-6">Ready to create your own story?</h2>
                    <Link
                        href="/#contact"
                        className="inline-block py-4 px-10 bg-gold text-[#0D1B3E] text-[12px] font-bold tracking-[0.2em] uppercase rounded-sm hover:shadow-[0_0_40px_rgba(245,166,35,0.4)] transition-all"
                    >
                        Check Availability
                    </Link>
                </div>
            </section>
        </>
    );
}
