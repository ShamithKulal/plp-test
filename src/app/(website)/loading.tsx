import { Loader2 } from "lucide-react";

export default function WebsiteLoadingScreen() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative flex flex-col items-center">
                
                {/* Spinning Dual Ring */}
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-[3px] border-[var(--color-border)] rounded-full"></div>
                    <div className="absolute inset-0 border-[3px] border-transparent border-t-gold border-r-gold rounded-full animate-spin [animation-duration:1.5s]"></div>
                    <div className="absolute inset-2 border-[2px] border-transparent border-b-white/50 border-l-white/50 rounded-full animate-spin [animation-duration:2s] [animation-direction:reverse]"></div>
                </div>

                {/* Pulsing Branding */}
                <div className="mt-8 flex flex-col items-center">
                    <h2 className="font-serif tracking-widest text-lg text-white/90">PAPERLIGHT</h2>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-gold animate-pulse mt-2">
                        Loading Experience
                    </p>
                </div>
            </div>
        </div>
    );
}
