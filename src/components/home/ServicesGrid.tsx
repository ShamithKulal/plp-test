"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
    {
        title: "Wedding Photography",
        description: "From the first glance to the final dance, we capture every precious moment with cinematic artistry.",
        image: "/hero-wedding.jpg",
        href: "/wedding-photography-udupi",
        tag: "Our Signature",
    },
    {
        title: "Pre-Wedding Shoot",
        description: "Come alive in front of our lens before your big day. Stunning locations across Coastal Karnataka.",
        image: "/prewedding-hero.jpg",
        href: "/pre-wedding-shoot",
        tag: "Romantic",
    },
    {
        title: "Haldi & Mehendi",
        description: "The colors, the laughter, the rituals — we freeze these beautiful pre-wedding ceremonies in vivid detail.",
        image: "/hero-wedding.jpg",
        href: "/haldi-mehendi",
        tag: "Traditional",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function ServicesGrid() {
    return (
        <section style={{ padding: "96px 0", maxWidth: "1280px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ textAlign: "center", marginBottom: "64px" }}
            >
                <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#F5A623", marginBottom: "12px" }}>
                    What We Do
                </p>
                <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", color: "white" }}>
                    Services Built for{" "}
                    <span style={{ color: "#F5A623" }}>Your Story</span>
                </h2>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}
            >
                {services.map((service) => (
                    <motion.div
                        key={service.title}
                        variants={cardVariants}
                        whileHover={{
                            boxShadow: "0 0 40px rgba(245,166,35,0.18)",
                            borderColor: "rgba(245,166,35,0.5)",
                            y: -6,
                        }}
                        style={{
                            background: "#112055",
                            border: "1px solid #1E3170",
                            borderRadius: "2px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Image with zoom on hover */}
                        <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                            <motion.div
                                style={{ position: "absolute", inset: 0 }}
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </motion.div>
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(13,27,62,0.9) 0%, transparent 60%)",
                                    zIndex: 1,
                                }}
                            />
                            {/* Tag badge */}
                            <span
                                style={{
                                    position: "absolute",
                                    top: "16px",
                                    left: "16px",
                                    fontSize: "10px",
                                    letterSpacing: "0.25em",
                                    textTransform: "uppercase",
                                    background: "rgba(245,166,35,0.12)",
                                    border: "1px solid rgba(245,166,35,0.35)",
                                    color: "#F5A623",
                                    padding: "4px 12px",
                                    borderRadius: "999px",
                                    backdropFilter: "blur(8px)",
                                    zIndex: 2,
                                }}
                            >
                                {service.tag}
                            </span>
                        </div>

                        {/* Content */}
                        <div style={{ padding: "24px" }}>
                            <h3
                                style={{
                                    fontFamily: "var(--font-playfair), Georgia, serif",
                                    fontSize: "20px",
                                    color: "white",
                                    marginBottom: "8px",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p style={{ fontSize: "13px", color: "#7A95C9", lineHeight: 1.7, marginBottom: "16px" }}>
                                {service.description}
                            </p>
                            <motion.div
                                whileHover="hover"
                                initial="rest"
                                animate="rest"
                                style={{ display: "inline-block" }}
                            >
                                <Link
                                    href={service.href}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        fontSize: "11px",
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        color: "#F5A623",
                                        textDecoration: "none",
                                    }}
                                >
                                    Learn More
                                    <motion.span
                                        variants={{
                                            rest: { x: 0, opacity: 0.6 },
                                            hover: { x: 5, opacity: 1 },
                                        }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <ArrowRight size={13} />
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ textAlign: "center", marginTop: "48px" }}
            >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-block" }}>
                    <Link
                        href="/portfolio"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "14px 36px",
                            border: "1px solid #F5A623",
                            color: "#F5A623",
                            fontSize: "12px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            borderRadius: "2px",
                            transition: "all 0.3s",
                        }}
                    >
                        View Full Portfolio <ArrowRight size={13} />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
