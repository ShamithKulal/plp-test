"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaBanner() {
    return (
        <section
            style={{
                position: "relative",
                overflow: "hidden",
                background: "#112055",
            }}
        >
            {/* Lamp glow — dramatic warm spotlight from top */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 80% 60% at 50% -15%, rgba(245,166,35,0.28) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Grid texture overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                }}
            />

            {/* Amber accent lines */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(to right, transparent, #F5A623, transparent)",
                    opacity: 0.6,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(to right, transparent, #F5A623, transparent)",
                    opacity: 0.6,
                }}
            />

            {/* Pulsing golden beacon ring */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            >
                {[0, 0.8, 1.6].map((delay) => (
                    <motion.div
                        key={delay}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "320px",
                            height: "320px",
                            borderRadius: "50%",
                            border: "1px solid rgba(245,166,35,0.30)",
                            transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                            scale: [1, 1.7],
                            opacity: [0.4, 0],
                        }}
                        transition={{
                            duration: 2.4,
                            delay,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>

            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "96px 24px",
                    textAlign: "center",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ fontSize: "11px", letterSpacing: "0.45em", textTransform: "uppercase", color: "#F5A623", marginBottom: "20px" }}
                    >
                        Limited Dates Available
                    </motion.p>
                    <h2
                        style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontSize: "clamp(36px, 5vw, 60px)",
                            color: "white",
                            lineHeight: 1.15,
                            marginBottom: "24px",
                        }}
                    >
                        Your Wedding Day{" "}
                        <span style={{ color: "#F5A623" }}>Deserves</span>
                        <br />
                        the Best Photographer
                    </h2>
                    <p style={{ color: "#7A95C9", fontSize: "15px", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.8 }}>
                        Join 500+ happy couples across Udupi &amp; Mangalore who chose Paperlight Productions to tell their love story.
                    </p>

                    {/* Shimmer CTA style */}
                    <style>{`
                        @keyframes shimmer {
                            0%   { background-position: -200% center; }
                            100% { background-position:  200% center; }
                        }
                        .cta-shimmer {
                            background: linear-gradient(
                                105deg,
                                #F5A623 0%,
                                #FFD27F 45%,
                                #F5A623 55%,
                                #E5901A 100%
                            );
                            background-size: 200% auto;
                            animation: shimmer 2.4s linear infinite;
                        }
                        .cta-shimmer:hover {
                            box-shadow: 0 0 60px rgba(245,166,35,0.55) !important;
                        }
                    `}</style>

                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href="/contact"
                                className="cta-shimmer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "16px 40px",
                                    fontSize: "12px",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                    color: "#0D1B3E",
                                    textDecoration: "none",
                                    borderRadius: "2px",
                                    boxShadow: "0 0 40px rgba(245,166,35,0.30)",
                                    transition: "box-shadow 0.3s",
                                }}
                            >
                                Check Availability
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                href="/portfolio"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "16px 40px",
                                    fontSize: "12px",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    fontWeight: 500,
                                    border: "1px solid rgba(255,255,255,0.25)",
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
                </motion.div>
            </div>
        </section>
    );
}
