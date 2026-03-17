import Link from "next/link";
import { getFolders } from "../actions";

export const revalidate = 0;

export default async function AdminDashboardPage() {
    // Quick statistics for the dashboard
    const { folders: categories } = await getFolders("portfolio");
    
    // Total Clients calculation 
    let totalClients = 0;
    if (categories) {
        for (const cat of categories) {
            const { folders: clients } = await getFolders(cat.path);
            if (clients) totalClients += clients.length;
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-serif text-white mb-2">Welcome Back</h2>
            <p className="text-[var(--color-muted)] mb-8">Here is an overview of your Paperlight Productions portfolio.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col justify-between">
                    <div>
                        <p className="text-sm text-[var(--color-muted)] font-medium tracking-wider mb-1">Categories</p>
                        <p className="text-4xl text-white font-serif">{categories?.length || 0}</p>
                    </div>
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col justify-between">
                    <div>
                        <p className="text-sm text-[var(--color-muted)] font-medium tracking-wider mb-1">Total Clients</p>
                        <p className="text-4xl text-white font-serif">{totalClients}</p>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-sm text-center">
                <h3 className="text-xl font-serif text-white mb-3">Manage Your Portfolio</h3>
                <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto mb-6">Create new categories, add clients, and upload your latest High-Resolution photography straight to Cloudinary.</p>
                <Link href="/admin/portfolio" className="inline-block bg-white text-black px-6 py-3 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors rounded-sm">
                    Open Portfolio Manager
                </Link>
            </div>
        </div>
    );
}
