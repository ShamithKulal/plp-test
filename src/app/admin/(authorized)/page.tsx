import Link from "next/link";
import { getFolders, fetchTotalImageCount, fetchInquiryStats, fetchBookings } from "../actions";
import InquiryChart from "@/components/admin/InquiryChart";

export const revalidate = 0;

export default async function AdminDashboardPage() {
    // Quick statistics for the dashboard
    const [
        { folders: categories },
        totalImagesCount,
        { success: datesSuccess, dates },
        { success: bookingsSuccess, bookings }
    ] = await Promise.all([
        getFolders("portfolio"),
        fetchTotalImageCount(),
        fetchInquiryStats(),
        fetchBookings()
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

    const currentMonthStr = new Date().toLocaleDateString('en-CA').slice(0, 7);
    const shootsThisMonth = bookings?.filter((b: any) => b.date.startsWith(currentMonthStr))?.length || 0;

    const todayStr = new Date().toLocaleDateString('en-CA');
    const upcomingShoots = (bookings || [])
        .filter((b: any) => b.date >= todayStr)
        .sort((a: any, b: any) => a.date.localeCompare(b.date))
        .slice(0, 4);

    return (
        <div>
            <h2 className="text-3xl font-serif text-white mb-2">Welcome Back</h2>
            <p className="text-[var(--color-muted)] mb-8">Here is an overview of your Paperlight Productions portfolio.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
                        <p className="text-[11px] text-[var(--color-muted)] font-medium tracking-[0.15em] mb-1 uppercase">Shoots This Month</p>
                        <p className="text-4xl text-white font-serif">{shootsThisMonth}</p>
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
                
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm flex flex-col">
                    <h3 className="text-lg font-serif text-white mb-6 flex items-center justify-between">
                        Upcoming Shoots
                        <Link href="/admin/bookings" className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] hover:text-gold transition-colors">View Calendar ➔</Link>
                    </h3>
                    
                    {upcomingShoots.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                            <div className="w-12 h-12 bg-[#111] border border-[var(--color-border)] rounded-full flex items-center justify-center mb-3">
                                📅
                            </div>
                            <p className="text-sm text-[var(--color-muted)]">No upcoming shoots scheduled.</p>
                            <Link href="/admin/bookings" className="mt-4 px-4 py-2 border border-[var(--color-border)] rounded-sm text-[10px] tracking-widest uppercase hover:text-white transition-colors">Add Shoot</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {upcomingShoots.map((shoot: any) => (
                                <div key={shoot.id} className="border-l-2 border-gold pl-4 py-1">
                                    <p className="text-sm text-white font-semibold">{shoot.title}</p>
                                    <p className="text-xs text-[var(--color-muted)] mt-1">{new Date(shoot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} <span className="text-white/30 px-1">|</span> {shoot.time || "Time TBD"}</p>
                                    <p className="text-xs text-[var(--color-muted)] mt-1 truncate max-w-[250px]">{shoot.clientName} {shoot.location && `· ${shoot.location}`}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
