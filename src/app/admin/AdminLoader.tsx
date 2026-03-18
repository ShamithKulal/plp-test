export default function AdminFullScreenLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F0F0F]/80 backdrop-blur-md">
            <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-white/50 animate-[spin_1.5s_linear_infinite_reverse]"></div>
            </div>
            <p className="mt-6 text-gold text-xs tracking-[0.3em] uppercase animate-pulse">Loading Data...</p>
        </div>
    );
}
