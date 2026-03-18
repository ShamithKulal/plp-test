import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";
import { getImagesInFolder } from "@/app/admin/actions";
import LocationsClient from "./LocationsClient";

async function getHeroImage(slug: string, fallback: string) {
    try {
        const { images } = await getImagesInFolder(`covers/${slug}`);
        if (images && images.length > 0) {
            return images[0].public_id;
        }
    } catch (e) {
        console.error(e);
    }
    return fallback;
}

export const revalidate = 60; // optionally cache for 1 minute

export default async function PreWeddingPage() {
    const heroImage = await getHeroImage('prewedding', '/prewedding-hero.jpg');

    return (
        <>
            <section className="relative pt-32 pb-20 min-h-[70vh] flex items-end overflow-hidden">
                <Image src={heroImage} alt="Pre-wedding shoot Udupi Mangalore" fill priority className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
                    <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-4">Coastal Karnataka</p>
                    <h1 className="font-serif text-5xl md:text-7xl text-white leading-none mb-4">Pre-Wedding <span className="text-gold">Shoot</span></h1>
                    <p className="text-white/70 text-lg max-w-xl">Your love story deserves a cinematic chapter — before the big day even begins.</p>
                </div>
            </section>

            <section className="section-padding max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-10">
                    <div>
                        <h2 className="font-serif text-3xl text-[var(--color-text)] mb-4">Stunning Pre-Wedding Photography in Coastal Karnataka</h2>
                        <p className="text-[var(--color-muted)] leading-relaxed mb-4">
                            A pre-wedding shoot is your chance to be completely yourselves — to laugh, explore, and fall in love with the camera. Coastal Karnataka&apos;s diverse landscapes offer the perfect backdrop: dramatic sunsets at <strong className="text-[var(--color-text)]">Malpe Beach</strong>, the mystical <strong className="text-[var(--color-text)]">Agumbe Rainforest</strong>, or the iconic <strong className="text-[var(--color-text)]">Kaup Lighthouse</strong>.
                        </p>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            At Paperlight, we scout each location, plan around golden hour lighting, and create a relaxed atmosphere so your true personalities shine through every frame.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl text-[var(--color-text)] mb-4">Our Favourite Locations</h2>
                        <LocationsClient />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm">
                        <h3 className="font-serif text-xl text-[var(--color-text)] mb-6">Book Your Pre-Wedding Shoot</h3>
                        <InquiryForm compact />
                    </div>
                </div>
            </section>
        </>
    );
}
