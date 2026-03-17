export default function CategoriesLoading() {
    return (
        <div className="animate-pulse">
            <div className="flex justify-between items-end mb-8 border-b border-[var(--color-border)] pb-4">
                <div>
                    <div className="h-6 w-32 bg-[var(--color-surface)] rounded-sm mb-2"></div>
                    <div className="h-4 w-64 bg-[var(--color-surface)] rounded-sm"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-9 w-48 bg-[var(--color-surface)] rounded-sm"></div>
                    <div className="h-9 w-16 bg-[#222] rounded-sm"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="block p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm">
                        <div className="h-6 w-40 bg-[#222] rounded-sm mb-3"></div>
                        <div className="h-3 w-56 bg-[#1a1a1a] rounded-sm"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
