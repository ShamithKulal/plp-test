"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../login/actions";

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin", exact: true },
        { name: "Portfolio", href: "/admin/portfolio", exact: false },
    ];

    return (
        <aside className="w-64 border-r border-[var(--color-border)] bg-[#0A0A0A] flex flex-col min-h-screen sticky top-0">
            <div className="p-8 pb-12">
                <h1 className="font-serif text-2xl text-[var(--color-text)]">Admin</h1>
                <p className="text-[10px] text-gold tracking-widest uppercase mt-1">Paperlight</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = item.exact 
                        ? pathname === item.href 
                        : pathname?.startsWith(item.href);

                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-sm transition-all duration-300 ${isActive ? 'bg-[var(--color-surface)] border-l-2 border-gold text-white' : 'text-[var(--color-muted)] hover:bg-[var(--color-surface)]/50 hover:text-white'}`}
                        >
                            <span className="text-sm font-medium tracking-wide">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-[var(--color-border)]">
                <form action={logout}>
                    <button type="submit" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-red-400 transition-colors w-full p-2 rounded-sm hover:bg-red-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Logout
                    </button>
                </form>
            </div>
        </aside>
    );
}
