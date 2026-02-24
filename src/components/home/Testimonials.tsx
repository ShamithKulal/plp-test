"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        name: "Priya & Kiran Shetty",
        location: "Udupi",
        date: "December 2024",
        rating: 5,
        text: "Paperlight captured our wedding beautifully! Every moment was documented with such care and artistry. The photos are absolutely stunning — we couldn't have asked for a better team.",
    },
    {
        name: "Ananya & Rohan Kamath",
        location: "Mangalore",
        date: "November 2024",
        rating: 5,
        text: "We booked for our pre-wedding shoot and were blown away. They knew exactly how to make us feel comfortable and the locations they chose were breathtaking.",
    },
    {
        name: "Deepa & Suresh Bhat",
        location: "Manipal",
        date: "October 2024",
        rating: 5,
        text: "The Haldi & Mehendi coverage was perfect. Every candid, every emotion captured. Our family was in tears looking at the final album. Truly professional!",
    },
];

export default function Testimonials() {
    return (
        <section
            style={{
                padding: "96px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Ambient center glow */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245,166,35,0.07) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#F5A623", marginBottom: "12px" }}>
                        Client Love
                    </p>
                    <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(30px, 4vw, 48px)", color: "white" }}>
                        What Our <span style={{ color: "#F5A623" }}>Couples Say</span>
                    </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            style={{
                                background: "#112055",
                                border: "1px solid #1E3170",
                                borderRadius: "2px",
                                padding: "28px",
                                transition: "all 0.4s",
                            }}
                            whileHover={{
                                borderColor: "rgba(245,166,35,0.35)",
                                boxShadow: "0 0 28px rgba(245,166,35,0.10)",
                            }}
                        >
                            {/* Stars */}
                            <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                                {Array.from({ length: review.rating }).map((_, j) => (
                                    <Star key={j} size={14} style={{ color: "#F5A623", fill: "#F5A623" }} />
                                ))}
                            </div>

                            <p style={{ fontSize: "14px", color: "#7A95C9", lineHeight: 1.8, marginBottom: "24px", fontStyle: "italic" }}>
                                &ldquo;{review.text}&rdquo;
                            </p>

                            <div style={{ borderTop: "1px solid #1E3170", paddingTop: "16px" }}>
                                <p style={{ color: "white", fontWeight: 500, fontSize: "14px", marginBottom: "2px" }}>{review.name}</p>
                                <p style={{ color: "rgba(245,166,35,0.70)", fontSize: "12px", letterSpacing: "0.05em" }}>
                                    {review.location} · {review.date}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <p style={{ color: "#7A95C9", fontSize: "12px", letterSpacing: "0.05em" }}>
                        ★ 4.9 average based on 127+ Google Reviews
                    </p>
                </div>
            </div>
        </section>
    );
}
