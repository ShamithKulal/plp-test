"use client";

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

export default function VenueGallery() {
    return (
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
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 48px", textAlign: "center" }}>
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
                </div>

                {/* Venue cards scroll */}
                <div style={{ overflowX: "auto", paddingBottom: "16px" }}>
                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            padding: "0 24px",
                            width: "max-content",
                            maxWidth: "1280px",
                            margin: "0 auto",
                        }}
                    >
                        {venues.map((venue, i) => (
                            <motion.div
                                key={venue.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                style={{
                                    flexShrink: 0,
                                    width: "220px",
                                    background: "#112055",
                                    border: "1px solid #1E3170",
                                    borderRadius: "2px",
                                    padding: "20px",
                                    transition: "all 0.3s",
                                }}
                                whileHover={{
                                    borderColor: "rgba(245,166,35,0.45)",
                                    boxShadow: "0 0 24px rgba(245,166,35,0.12)",
                                }}
                            >
                                <div
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
                                </div>
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
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
