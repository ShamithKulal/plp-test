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

export default function ServicesGrid() {
    return (
        <section style={{ padding: "96px 0", maxWidth: "1280px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#F5A623", marginBottom: "12px" }}>
                    What We Do
                </p>
                <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(32px, 4vw, 48px)", color: "white" }}>
                    Services Built for{" "}
                    <span style={{ color: "#F5A623" }}>Your Story</span>
                </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                {services.map((service, i) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.15, duration: 0.6 }}
                        style={{
                            background: "#112055",
                            border: "1px solid #1E3170",
                            borderRadius: "2px",
                            overflow: "hidden",
                            transition: "all 0.4s",
                        }}
                        whileHover={{ boxShadow: "0 0 32px rgba(245,166,35,0.14)", borderColor: "rgba(245,166,35,0.4)" }}
                    >
                        {/* Image */}
                        <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                style={{ objectFit: "cover", transition: "transform 0.7s" }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(to top, rgba(13,27,62,0.9) 0%, transparent 60%)",
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
                                    transition: "gap 0.3s",
                                }}
                            >
                                Learn More <ArrowRight size={13} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "48px" }}>
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
            </div>
        </section>
    );
}
