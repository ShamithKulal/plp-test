"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../login/actions";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const menuItems = [
        { name: "Dashboard", href: "/admin", exact: true },
        { name: "Portfolio", href: "/admin/portfolio", exact: false },
        { name: "Page Covers", href: "/admin/covers", exact: false },
        { name: "Our Bookings", href: "/admin/bookings", exact: false },
    ];

    const content = (
        <>
            <div className="p-8 pb-12 hidden md:block">
                <h1 className="font-serif text-2xl text-[var(--color-text)]">Admin</h1>
                <p className="text-[10px] text-gold tracking-widest uppercase mt-1">Paperlight</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 md:mt-0 mt-8">
                {menuItems.map((item) => {
                    const isActive = item.exact 
                        ? pathname === item.href 
                        : pathname?.startsWith(item.href);

                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-sm transition-all duration-300 ${isActive ? 'bg-[var(--color-surface)] border-l-2 border-gold text-white' : 'text-[var(--color-muted)] hover:bg-[var(--color-surface)]/50 hover:text-white'}`}
                        >
                            <span className="text-sm font-medium tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-[var(--color-border)] mt-auto">
                <form action={logout}>
                    <button type="submit" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-red-400 transition-colors w-full p-2 rounded-sm hover:bg-red-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout
                    </button>
                </form>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 border-r border-[var(--color-border)] bg-[#0A0A0A] flex-col min-h-screen sticky top-0">
                {content}
            </aside>

            {/* Mobile Header Top Bar */}
            <div className="md:hidden flex justify-between items-center p-4 border-b border-[var(--color-border)] bg-[#0A0A0A] sticky top-0 z-[60] w-full">
                <div>
                   <h1 className="font-serif text-xl text-[var(--color-text)]">Admin</h1>
                   <p className="text-[8px] text-gold tracking-widest uppercase">Paperlight</p>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="md:hidden fixed inset-0 top-[73px] z-[50] bg-[#0A0A0A] flex flex-col border-r border-[var(--color-border)]"
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
