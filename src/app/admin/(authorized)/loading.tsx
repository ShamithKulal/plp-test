export default function AdminLoading() {
    return (
        <div className="w-full flex justify-center items-center py-32">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 rounded-full border-2 border-[var(--color-muted)] border-t-gold animate-spin"></div>
                <p className="text-sm font-medium tracking-widest text-[var(--color-muted)] uppercase">Loading...</p>
            </div>
        </div>
    );
}
