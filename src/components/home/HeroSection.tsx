"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {/* Background Image */}
            <Image
                src="/hero-wedding.jpg"
                alt="Luxury wedding photography by Paperlight Productions"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center", transform: "scale(1.05)" }}
                sizes="100vw"
            />

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

            {/* Lamp glow from top-center */}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: "11px",
                        letterSpacing: "0.5em",
                        textTransform: "uppercase",
                        color: "#F5A623",
                        marginBottom: "24px",
                        fontWeight: 300,
                    }}
                >
                    Udupi &amp; Mangalore · Est. 2018
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "clamp(48px, 10vw, 100px)",
                        color: "white",
                        lineHeight: 1,
                        marginBottom: "24px",
                        letterSpacing: "-0.02em",
                    }}
                >
                    <span style={{ display: "block" }}>Every Frame,</span>
                    <span style={{ display: "block", color: "#F5A623" }}>A forever</span>
                    <span style={{ display: "block" }}>Memory.</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
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
                    transition={{ duration: 0.8, delay: 0.9 }}
                    style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
                >
                    <Link
                        href="#contact"
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
                            boxShadow: "0 0 40px rgba(245,166,35,0.40)",
                            transition: "all 0.3s",
                        }}
                    >
                        Check Availability
                    </Link>
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
            </div>

            {/* Scroll indicator */}
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "rgba(255,255,255,0.45)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown size={16} />
                </motion.div>
            </motion.div>
        </section>
    );
}
