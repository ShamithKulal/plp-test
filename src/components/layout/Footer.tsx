"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import InquiryForm from "@/components/forms/InquiryForm";

const serviceLinks = [
    { label: "Wedding Photography – Udupi", href: "/wedding-photography-udupi" },
    { label: "Wedding Photography – Mangalore", href: "/wedding-photography-mangalore" },
    { label: "Pre-Wedding Shoot", href: "/pre-wedding-shoot" },
    { label: "Haldi & Mehendi", href: "/haldi-mehendi" },
    { label: "Corporate Events", href: "/corporate-events" },
];

const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Thank You", href: "/thank-you" },
];

export default function Footer() {
    return (
        <footer
            id="contact"
            className="bg-[var(--color-surface)] border-t border-[var(--color-border)] relative overflow-hidden"
        >
            {/* Lamp glow top-center */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(245,166,35,0.10) 0%, transparent 65%)",
                }}
            />

            {/* Amber accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-amber)] to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
                    {/* Quick Inquiry Form */}
                    <div className="lg:col-span-1">
                        <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-amber)] mb-2">
                            Get in Touch
                        </p>
                        <h3 className="font-serif text-2xl text-white mb-6">
                            Quick Inquiry
                        </h3>
                        <InquiryForm compact />
                    </div>

                    {/* Contact & Links */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-10">
                        {/* Contact Info */}
                        <div>
                            {/* Logo */}
                            <div className="mb-5">
                                <Image
                                    src="/logo.png"
                                    alt="Paperlight Productions"
                                    width={120}
                                    height={44}
                                    className="h-9 w-auto"
                                />
                            </div>
                            <p className="text-[var(--color-muted)] text-xs leading-relaxed mb-6">
                                Premium wedding & lifestyle photography in Coastal Karnataka.
                                Your story, beautifully told.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="tel:+919483603189"
                                    className="flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors"
                                >
                                    <Phone size={13} /> +91 94836 03189
                                </a>
                                <a
                                    href="mailto:hello@paperlightproductions.com"
                                    className="flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors"
                                >
                                    <Mail size={13} /> hello@paperlightproductions.com
                                </a>
                                <span className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                                    <MapPin size={13} /> Udupi & Mangalore, Karnataka
                                </span>
                                <a
                                    href="https://instagram.com/paperlightproductions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors"
                                >
                                    <Instagram size={13} /> @paperlightproductions
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-xs tracking-widest uppercase text-white mb-5">
                                Services
                            </h4>
                            <ul className="space-y-3">
                                {serviceLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-xs tracking-widest uppercase text-white mb-5">
                                Company
                            </h4>
                            <ul className="space-y-3">
                                {companyLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-amber)] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-[var(--color-muted)]">
                        © {new Date().getFullYear()} Paperlight Productions. All rights reserved.
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">
                        Made with ♥ in Coastal Karnataka
                    </p>
                </div>
            </div>
        </footer>
    );
}
