"use client";

import { motion } from "framer-motion";
import { Star, Users, Camera, Award } from "lucide-react";

const stats = [
    { icon: Star, value: "4.9", label: "Google Rating", sub: "127+ Reviews" },
    { icon: Users, value: "500+", label: "Happy Couples", sub: "Since 2018" },
    { icon: Camera, value: "2L+", label: "Photos Delivered", sub: "Every event" },
    { icon: Award, value: "#1", label: "Local Ranking", sub: "Udupi & Mangalore" },
];

export default function SocialProofBar() {
    return (
        <section
            style={{
                background: "#112055",
                borderTop: "1px solid #1E3170",
                borderBottom: "1px solid #1E3170",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Subtle lamp glow at top */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 90% 40% at 50% -20%, rgba(245,166,35,0.10) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "56px 24px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "32px",
                }}
                className="md:grid-cols-4"
            >
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            style={{ textAlign: "center" }}
                        >
                            <Icon size={22} style={{ color: "#F5A623", margin: "0 auto 12px", display: "block" }} />
                            <div
                                style={{
                                    fontFamily: "var(--font-playfair), Georgia, serif",
                                    fontSize: "48px",
                                    color: "white",
                                    lineHeight: 1,
                                    marginBottom: "4px",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontSize: "11px",
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "#F5A623",
                                    marginBottom: "2px",
                                }}
                            >
                                {stat.label}
                            </div>
                            <div style={{ fontSize: "11px", color: "#7A95C9" }}>{stat.sub}</div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
