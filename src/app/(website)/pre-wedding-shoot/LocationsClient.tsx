"use client";

import { motion } from "framer-motion";

const locations = [
    "Malpe Beach, Udupi",
    "Kaup Lighthouse",
    "Maravanthe Beach",
    "Kudlu Falls",
    "Agumbe Rainforest",
    "Mangalore Beach Road",
    "Manipal Lake",
    "St. Mary's Island",
    "Kollur Forest Trail",
];

export default function LocationsClient() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {locations.map((loc, i) => (
                <motion.div
                    key={loc}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    className="relative group bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-3 rounded-sm text-sm overflow-hidden cursor-default transition-colors duration-300 hover:border-gold/60"
                    style={{ boxShadow: "none" }}
                >
                    {/* Gold glow bg on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2">
                        {/* Animated pin */}
                        <motion.span
                            className="inline-block text-base"
                            whileHover={{ rotate: [0, -15, 15, 0], scale: 1.3 }}
                            transition={{ duration: 0.4 }}
                        >
                            📍
                        </motion.span>
                        <span className="text-[var(--color-muted)] group-hover:text-gold transition-colors duration-300 font-medium">
                            {loc}
                        </span>
                    </span>

                    {/* Sliding gold underline */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gold"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
