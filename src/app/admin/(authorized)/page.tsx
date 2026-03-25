import Link from "next/link";
import { getFolders, fetchTotalImageCount, fetchInquiryStats } from "../actions";
import InquiryChart from "@/components/admin/InquiryChart";

export const revalidate = 0;

export default async function AdminDashboardPage() {
    // Quick statistics for the dashboard
    const [
        { folders: categories },
        totalImagesCount,
        { success: datesSuccess, dates }
    ] = await Promise.all([
        getFolders("portfolio"),
        fetchTotalImageCount(),
        fetchInquiryStats()
    ]);
    
    // Total Clients calculation 
    let totalClients = 0;
    if (categories) {
        for (const cat of categories) {
            const { folders: clients } = await getFolders(cat.path);
            if (clients) totalClients += clients.length;
        }
    }

    // Aggregate Inquiries by Month
    const monthsOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthCounts: Record<string, number> = {
        Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
        Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };

    if (datesSuccess && dates) {
        dates.forEach((dateString: string) => {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                const monthName = date.toLocaleString('default', { month: 'short' });
                if (monthCounts[monthName] !== undefined) {
                    monthCounts[monthName]++;
                }
            }
        });
    }

    const chartData = monthsOrder.map(month => ({
        month,
        inquiries: monthCounts[month]
    }));

    return (
        <div>
            <h2 className="text-3xl font-serif text-white mb-2">Welcome Back</h2>
            <p className="text-[var(--color-muted)] mb-8">Here is an overview of your Paperlight Productions portfolio.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[11px] text-[var(--color-muted)] font-medium tracking-[0.15em] mb-1 uppercase">Categories</p>
                        <p className="text-4xl text-white font-serif">{categories?.length || 0}</p>
                    </div>
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[11px] text-[var(--color-muted)] font-medium tracking-[0.15em] mb-1 uppercase">Total Clients</p>
                        <p className="text-4xl text-white font-serif">{totalClients}</p>
                    </div>
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[11px] text-[var(--color-muted)] font-medium tracking-[0.15em] mb-1 uppercase">Hosted Photos</p>
                        <p className="text-4xl text-white font-serif">{totalImagesCount}</p>
                    </div>
                </div>
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[11px] text-gold font-medium tracking-[0.15em] mb-1 uppercase">Total Inquiries</p>
                        <p className="text-4xl text-gold font-serif">{dates?.length || 0}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                    <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gold"></span>
                        Inquiries Over Time
                    </h3>
                    <InquiryChart data={chartData} />
                </div>
                
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-sm flex flex-col justify-center text-center">
                    <div className="w-16 h-16 mx-auto bg-gold/10 text-gold rounded-full flex items-center justify-center mb-6 text-2xl">📸</div>
                    <h3 className="text-xl font-serif text-white mb-3">Manage Portfolio</h3>
                    <p className="text-sm text-[var(--color-muted)] mb-8">Maintain categories, setup client branches, and upload high-res files directly to your Git repository.</p>
                    <Link href="/admin/portfolio" className="inline-block bg-white text-black px-6 py-3 text-[11px] tracking-widest font-semibold uppercase hover:bg-white/90 transition-colors rounded-sm">
                        Open Manager
                    </Link>
                </div>
            </div>
        </div>
    );
}
