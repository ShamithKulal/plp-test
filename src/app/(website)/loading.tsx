"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0D1B3E]">
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-[var(--color-gold)] border-t-transparent opacity-80"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-2 rounded-full border border-[var(--color-gold)] border-b-transparent opacity-40"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    </div>
                </div>
                <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.3em] font-medium"
                >
                    Loading
                </motion.div>
            </div>
        </div>
    );
}
