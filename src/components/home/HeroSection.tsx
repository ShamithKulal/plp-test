"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Floating bokeh particles configuration
const particles = [
    { id: 0, x: "12%", size: 6, delay: 0, duration: 6 },
    { id: 1, x: "25%", size: 4, delay: 1.2, duration: 8 },
    { id: 2, x: "45%", size: 8, delay: 0.4, duration: 7 },
    { id: 3, x: "60%", size: 3, delay: 2.1, duration: 9 },
    { id: 4, x: "72%", size: 5, delay: 0.8, duration: 6.5 },
    { id: 5, x: "83%", size: 7, delay: 1.7, duration: 7.5 },
    { id: 6, x: "90%", size: 4, delay: 3.0, duration: 8.5 },
    { id: 7, x: "35%", size: 5, delay: 2.5, duration: 10 },
];

// Headline words with stagger
const headlineWords = [
    { text: "Every", block: true, gold: false },
    { text: "Frame,", block: true, gold: false },
    { text: "A forever", block: true, gold: true },
    { text: "Memory.", block: true, gold: false },
];

export default function HeroSection() {
    const [showArrow, setShowArrow] = useState(true);
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    // Hide scroll arrow after 3.5 s
    useEffect(() => {
        const t = setTimeout(() => setShowArrow(false), 3500);
        return () => clearTimeout(t);
    }, []);

    const wordVariants = {
        hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.75, delay: 0.3 + i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
        }),
    };

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Ken-burns background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    scale: bgScale,
                    y: bgY,
                }}
            >
                <Image
                    src="/hero-wedding.jpg"
                    alt="Luxury wedding photography by Paperlight Productions"
                    fill
                    priority
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    sizes="100vw"
                />
            </motion.div>

            {/* Floating bokeh particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    style={{
                        position: "absolute",
                        left: p.x,
                        bottom: "10%",
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        background: "rgba(245,166,35,0.55)",
                        filter: "blur(1px)",
                        pointerEvents: "none",
                        zIndex: 2,
                    }}
                    animate={{ y: [0, -220, -440], opacity: [0, 0.7, 0] }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1,
                    }}
                />
            ))}

            {/* Navy overlay layers */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(13,27,62,0.75) 0%, rgba(13,27,62,0.25) 50%, rgba(13,27,62,0.88) 100%)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(13,27,62,0.55) 0%, transparent 50%, rgba(13,27,62,0.30) 100%)",
                }}
            />

            {/* Lamp glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 65% 45% at 50% -5%, rgba(245,166,35,0.20) 0%, transparent 68%)",
                    pointerEvents: "none",
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    textAlign: "center",
                    padding: "0 24px",
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
                    transition={{ duration: 1, delay: 0.1 }}
                    style={{
                        fontSize: "11px",
                        textTransform: "uppercase",
                        color: "#F5A623",
                        marginBottom: "24px",
                        fontWeight: 300,
                    }}
                >
                    Udupi &amp; Mangalore · Est. 2018
                </motion.p>

                {/* Word-by-word staggered headline */}
                <h1
                    style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(48px, 10vw, 100px)",
                        lineHeight: 1,
                        marginBottom: "24px",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {headlineWords.map((word, i) => (
                        <motion.span
                            key={word.text}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            style={{
                                display: "block",
                                color: word.gold ? "#F5A623" : "white",
                            }}
                        >
                            {word.text}
                        </motion.span>
                    ))}
                </h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    style={{
                        color: "rgba(255,255,255,0.70)",
                        fontSize: "16px",
                        marginBottom: "40px",
                        fontWeight: 300,
                        letterSpacing: "0.02em",
                        maxWidth: "480px",
                        margin: "0 auto 40px",
                    }}
                >
                    Premium wedding &amp; lifestyle photography in Coastal Karnataka.
                    <br />
                    <em style={{ color: "rgba(245,166,35,0.85)" }}>Our Work, Your Smile.</em>
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.35 }}
                    style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
                >
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            href="/contact"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px 36px",
                                fontSize: "12px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                fontWeight: 700,
                                background: "#F5A623",
                                color: "#0D1B3E",
                                textDecoration: "none",
                                borderRadius: "2px",
                                boxShadow: "0 0 40px rgba(245,166,35,0.50)",
                                transition: "box-shadow 0.3s",
                            }}
                        >
                            Check Availability
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            href="/portfolio"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "16px 36px",
                                fontSize: "12px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                fontWeight: 500,
                                border: "1px solid rgba(255,255,255,0.35)",
                                color: "white",
                                textDecoration: "none",
                                borderRadius: "2px",
                                transition: "all 0.3s",
                            }}
                        >
                            View Portfolio
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bouncing scroll arrow */}
            <AnimatePresence>
                {showArrow && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                        style={{
                            position: "absolute",
                            bottom: "36px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 20,
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ChevronDown size={28} style={{ color: "rgba(245,166,35,0.75)" }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
