export default function ImagesGridLoading() {
    return (
        <div className="animate-pulse">
            <div className="mb-6 flex items-center gap-2">
                <div className="h-4 w-16 bg-[var(--color-surface)] rounded-sm"></div>
                <span className="text-[var(--color-surface)]">/</span>
                <div className="h-4 w-24 bg-[var(--color-surface)] rounded-sm"></div>
                <span className="text-[var(--color-surface)]">/</span>
                <div className="h-4 w-32 bg-[var(--color-surface)] rounded-sm"></div>
            </div>

            <div className="flex justify-between items-end mb-8 border-b border-[var(--color-border)] pb-4">
                <div>
                    <div className="h-7 w-56 bg-[var(--color-surface)] rounded-sm mb-2"></div>
                    <div className="h-4 w-64 bg-[var(--color-surface)] rounded-sm"></div>
                </div>
                <div className="h-10 w-36 bg-[var(--color-surface)] rounded-sm"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-square bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm"></div>
                ))}
            </div>
        </div>
    );
}
