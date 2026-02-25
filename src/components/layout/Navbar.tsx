"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Weddings", href: "/wedding-photography-udupi" },
    { label: "Pre-Wedding", href: "/pre-wedding-shoot" },
    { label: "Haldi & Mehendi", href: "/haldi-mehendi" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Top gradient: darkens hero image tops so nav text is always readable */}
            {mounted && !scrolled && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                        zIndex: 49,
                        pointerEvents: "none",
                    }}
                />
            )}
            {/* Scoped responsive styles */}
            <style>{`
        .plp-nav-desktop { display: none; }
        .plp-nav-hamburger { display: flex; }
        .plp-nav-cta { display: none; }
        @media (min-width: 768px) {
          .plp-nav-desktop { display: flex; align-items: center; gap: 28px; }
          .plp-nav-hamburger { display: none; }
          .plp-nav-cta { display: inline-flex; }
        }
        .plp-nav-link { font-size: 11px; letter-spacing: 0.12em; color: rgba(255,255,255,0.7); text-decoration: none; text-transform: uppercase; transition: all 0.3s; position: relative; }
        .plp-nav-link:hover { color: #fff; }
        .plp-nav-link.active { color: #F5A623; }
        .plp-nav-link.active::after { content: ''; position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: #F5A623; }
        .plp-cta-btn { padding: 10px 20px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; border: 1px solid #F5A623; color: #F5A623; text-decoration: none; border-radius: 2px; transition: background 0.3s, color 0.3s; }
        .plp-cta-btn:hover { background: #F5A623; color: #0D1B3E; }
      `}</style>

            <header
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    transition: "all 0.5s",
                    background: scrolled ? "rgba(13,27,62,0.88)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(245,166,35,0.15)" : "1px solid transparent",
                    padding: scrolled ? "10px 0" : "18px 0",
                }}
            >
                <div
                    style={{
                        maxWidth: "1280px",
                        margin: "0 auto",
                        padding: "0 24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                        onClick={(e) => handleNavClick(e, "/")}
                    >
                        <Image
                            src="/logo.png"
                            alt="Paperlight Productions"
                            width={130}
                            height={48}
                            style={{ height: "44px", width: "auto", objectFit: "contain" }}
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="plp-nav-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`plp-nav-link ${pathname === link.href ? "active" : ""}`}
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA + Hamburger */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Link href="/contact" className="plp-cta-btn plp-nav-cta">
                            Book Now
                        </Link>

                        <button
                            className="plp-nav-hamburger"
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "8px" }}
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.35 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 40,
                            background: "#0D1B3E",
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: "80px",
                            paddingLeft: "32px",
                            paddingRight: "32px",
                        }}
                    >
                        <div style={{ marginBottom: "24px" }}>
                            <Image
                                src="/logo.png"
                                alt="Paperlight Productions"
                                width={120}
                                height={44}
                                style={{ height: "40px", width: "auto" }}
                            />
                        </div>

                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                        handleNavClick(e, link.href);
                                    }}
                                    style={{
                                        display: "block",
                                        padding: "16px 0",
                                        fontSize: "24px",
                                        fontFamily: "var(--font-playfair), Georgia, serif",
                                        color: pathname === link.href ? "#F5A623" : "white",
                                        textDecoration: "none",
                                        borderBottom: "1px solid #1E3170",
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{ marginTop: "32px" }}
                        >
                            <Link
                                href="/contact"
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: "inline-block",
                                    padding: "12px 32px",
                                    fontSize: "12px",
                                    letterSpacing: "0.2em",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                    border: "1px solid #F5A623",
                                    color: "#F5A623",
                                    textDecoration: "none",
                                }}
                            >
                                Book Now
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
