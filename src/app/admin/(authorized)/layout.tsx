import Sidebar from "./Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[#0F0F0F] text-[var(--color-text)]">
            <Sidebar />
            <main className="flex-1 px-6 md:px-16 py-12 max-w-7xl mx-auto w-full">
                {children}
            </main>
        </div>
    );
}
