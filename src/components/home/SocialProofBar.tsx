"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { Star, Users, Camera, Award } from "lucide-react";
import { useEffect, useRef } from "react";

const stats = [
    { icon: Star, rawValue: 4.9, display: "4.9", suffix: "", label: "Google Rating", sub: "127+ Reviews", decimals: 1 },
    { icon: Users, rawValue: 500, display: "500+", suffix: "+", label: "Happy Couples", sub: "Since 2018", decimals: 0 },
    { icon: Camera, rawValue: 200, display: "2L+", suffix: "K+", label: "Photos Delivered", sub: "Every event", decimals: 0 },
    { icon: Award, rawValue: 1, display: "#1", suffix: "", label: "Local Ranking", sub: "Udupi & Mangalore", decimals: 0, prefix: "#" },
];

function CountUp({
    to,
    decimals = 0,
    prefix = "",
    suffix = "",
    isRaw,
}: {
    to: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    isRaw: boolean;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    useEffect(() => {
        if (inView) {
            const controls = animate(motionVal, to, { duration: 1.8, ease: "easeOut" });
            return controls.stop;
        }
    }, [inView, motionVal, to]);

    useEffect(() => {
        return spring.on("change", (v) => {
            if (ref.current) {
                ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
            }
        });
    }, [spring, decimals, prefix, suffix]);

    if (!isRaw) return null;

    return (
        <div ref={sectionRef}>
            <span ref={ref}>{prefix}0{suffix}</span>
        </div>
    );
}

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
                    const isRaw = stat.rawValue > 1 || stat.rawValue === 4.9;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            style={{ textAlign: "center" }}
                        >
                            {/* Pulsing icon */}
                            <motion.div
                                animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                                style={{ display: "inline-block", marginBottom: "12px" }}
                            >
                                <Icon size={22} style={{ color: "#F5A623", display: "block" }} />
                            </motion.div>

                            {/* Count-up or static display */}
                            <div
                                style={{
                                    fontFamily: "var(--font-playfair), Georgia, serif",
                                    fontSize: "48px",
                                    color: "white",
                                    lineHeight: 1,
                                    marginBottom: "4px",
                                }}
                            >
                                {isRaw ? (
                                    <CountUp
                                        to={stat.rawValue}
                                        decimals={stat.decimals}
                                        prefix={stat.prefix ?? ""}
                                        suffix={stat.suffix}
                                        isRaw={isRaw}
                                    />
                                ) : (
                                    stat.display
                                )}
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
