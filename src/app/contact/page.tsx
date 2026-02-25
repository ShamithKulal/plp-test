"use client";

import { motion } from "framer-motion";
import InquiryForm from "@/components/forms/InquiryForm";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[var(--color-navy)] pt-32 pb-20">
            {/* Background Accents */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    background: "radial-gradient(circle at 50% 0%, var(--color-amber) 0%, transparent 50%)"
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-[var(--color-amber)] text-[11px] tracking-[0.5em] uppercase mb-4"
                    >
                        Get In Touch
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-white mb-6"
                    >
                        Let's Create <span className="text-[var(--color-amber)] italic">Magic</span> Together
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto"
                    >
                        Whether it's a grand wedding or an intimate celebration, we're here to capture every precious moment. Fill out the form below to check our availability.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="font-serif text-3xl text-white mb-8">Contact Information</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)]">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Call Us</h4>
                                    <a href="tel:+919483603189" className="text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors text-sm">
                                        +91 94836 03189
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)]">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Email Us</h4>
                                    <a href="mailto:hello@paperlightproductions.com" className="text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors text-sm">
                                        hello@paperlightproductions.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)]">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Visit Us</h4>
                                    <p className="text-[var(--color-muted)] text-sm">
                                        Udupi & Mangalore, Karnataka
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-amber)]">
                                    <Instagram size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-semibold mb-1">Follow Us</h4>
                                    <a
                                        href="https://instagram.com/paperlightproductions"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors text-sm"
                                    >
                                        @paperlightproductions
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof / Trust factor */}
                        <div className="mt-16 p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm">
                            <p className="text-[var(--color-amber)] font-serif text-xl mb-2">500+ Stories Told</p>
                            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                                Join our community of happy couples who trusted us to capture their most precious moments with luxury and style.
                            </p>
                        </div>
                    </motion.div>

                    {/* The Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-[var(--color-surface)] p-8 md:p-12 border border-[var(--color-border)] rounded-sm shadow-2xl relative overflow-hidden"
                    >
                        {/* Shimmer effect for form box */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-amber)] to-transparent opacity-50" />

                        <h2 className="font-serif text-3xl text-white mb-8">Send an Inquiry</h2>
                        <InquiryForm />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
