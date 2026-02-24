import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Thank You! | Paperlight Productions",
    description: "Thank you for your inquiry. Paperlight Productions will get back to you within 24 hours.",
};

export default function ThankYouPage() {
    return (
        <section className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* Decorative ring */}
                <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8">
                    <span className="text-3xl">✦</span>
                </div>

                <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">
                    Thank You! 🎉
                </h1>
                <p className="text-[var(--color-muted)] text-base leading-relaxed mb-8">
                    Your inquiry has been received. We&apos;ll review your details and get back to you within{" "}
                    <strong className="text-[var(--color-text)]">24 hours</strong> to discuss your event and check date availability.
                </p>

                <div className="bg-[var(--color-surface)] border border-gold/20 rounded-sm p-6 mb-8">
                    <p className="text-sm text-[var(--color-muted)] mb-1">While you wait, explore our Instagram for the latest work:</p>
                    <a
                        href="https://instagram.com/paperlightproductions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-2 px-6 py-3 text-[13px] tracking-widest uppercase font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-sm hover:opacity-90 transition-opacity"
                    >
                        ✦ Follow on Instagram
                    </a>
                </div>

                <Link
                    href="/"
                    className="text-[12px] tracking-widest uppercase text-[var(--color-muted)] hover:text-gold transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </section>
    );
}
