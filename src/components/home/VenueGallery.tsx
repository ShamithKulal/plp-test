"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const venues = [
    { name: "Manipal County Club", location: "Manipal, Udupi" },
    { name: "Blue Waters Resort", location: "Malpe, Udupi" },
    { name: "Pilikula Nisargadhama", location: "Moodabidri, Mangalore" },
    { name: "Kaup Beach Resort", location: "Kaup, Udupi" },
    { name: "Goldfinch Hotel", location: "Mangalore" },
    { name: "KMC Manipal Lawn", location: "Udupi" },
    { name: "St. Aloysius Grounds", location: "Mangalore" },
    { name: "Karavali Utsav Maidan", location: "Udupi" },
];

// Duplicate for seamless loop
const allVenues = [...venues, ...venues];

function VenueCard({ venue }: { venue: typeof venues[0] }) {
    return (
        <motion.div
            whileHover={{
                borderColor: "rgba(245,166,35,0.55)",
                boxShadow: "0 0 28px rgba(245,166,35,0.16)",
                y: -4,
            }}
            transition={{ duration: 0.25 }}
            style={{
                flexShrink: 0,
                width: "220px",
                background: "#112055",
                border: "1px solid #1E3170",
                borderRadius: "2px",
                padding: "20px",
                cursor: "default",
            }}
        >
            <motion.div
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "rgba(245,166,35,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                }}
            >
                <MapPin size={14} style={{ color: "#F5A623" }} />
            </motion.div>
            <h3
                style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "16px",
                    color: "white",
                    marginBottom: "4px",
                    lineHeight: 1.3,
                }}
            >
                {venue.name}
            </h3>
            <p style={{ color: "#7A95C9", fontSize: "12px", letterSpacing: "0.05em" }}>
                {venue.location}
            </p>
        </motion.div>
    );
}

export default function VenueGallery() {
    const [paused, setPaused] = useState(false);

    return (
        <>
            {/* CSS keyframe injected once */}
            <style>{`
                @keyframes venue-marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                .venue-track {
                    animation: venue-marquee 28s linear infinite;
                }
                .venue-track.paused {
                    animation-play-state: paused;
                }
            `}</style>

            <section
                style={{
                    position: "relative",
                    overflow: "hidden",
                    padding: "96px 0",
                }}
            >
                {/* Lamp glow from top */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(245,166,35,0.22) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}
                    >
                        <p style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#F5A623", marginBottom: "12px" }}>
                            Where We Work
                        </p>
                        <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(30px, 4vw, 48px)", color: "white", marginBottom: "16px" }}>
                            Iconic Venues Across{" "}
                            <span style={{ color: "#F5A623" }}>Coastal Karnataka</span>
                        </h2>
                        <p style={{ color: "#7A95C9", maxWidth: "520px", margin: "0 auto", fontSize: "14px", lineHeight: 1.7 }}>
                            We have photographed at 50+ venues across Udupi, Mangalore, Manipal, and beyond.
                        </p>
                    </motion.div>

                    {/* Infinite marquee strip */}
                    <div
                        style={{ overflow: "hidden", paddingBottom: "8px" }}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <div
                            className={`venue-track${paused ? " paused" : ""}`}
                            style={{
                                display: "flex",
                                gap: "16px",
                                padding: "0 24px",
                                width: "max-content",
                            }}
                        >
                            {allVenues.map((venue, i) => (
                                <VenueCard key={`${venue.name}-${i}`} venue={venue} />
                            ))}
                        </div>
                    </div>

                    {/* Fade edges */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "80px",
                            height: "100%",
                            background: "linear-gradient(to right, #0D1B3E, transparent)",
                            pointerEvents: "none",
                            zIndex: 2,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "80px",
                            height: "100%",
                            background: "linear-gradient(to left, #0D1B3E, transparent)",
                            pointerEvents: "none",
                            zIndex: 2,
                        }}
                    />
                </div>
            </section>
        </>
    );
}
