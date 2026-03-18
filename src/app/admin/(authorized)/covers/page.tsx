import Link from "next/link";

export default function CoversDashboard() {
    const covers = [
        { title: "Weddings", slug: "weddings", desc: "Hero backgrounds for Mangalore & Udupi" },
        { title: "Pre-Wedding", slug: "prewedding", desc: "Hero backgrounds for Pre-Wedding Shoot" },
        { title: "Haldi & Mehendi", slug: "haldi-mehandi", desc: "Hero backgrounds for Haldi/Mehendi" },
    ];

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-[var(--color-border)] pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-serif text-white">Page Covers</h2>
                    <p className="text-sm text-[var(--color-muted)] mt-1">Manage the hero background photos for your main service pages.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {covers.map((cover) => (
                    <Link key={cover.slug} href={`/admin/covers/${cover.slug}`} className="flex flex-col group p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-gold transition-colors rounded-sm relative overflow-hidden text-left block">
                        <h3 className="text-lg font-serif text-white group-hover:text-gold transition-colors">{cover.title}</h3>
                        <p className="text-xs text-[var(--color-muted)] mt-2 font-mono break-all">{cover.desc}</p>
                        <p className="text-[10px] text-gold mt-4 tracking-widest uppercase">Target ➔ covers/{cover.slug}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
