"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getGitHubImages } from "./actions";

export default function GalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        async function fetchImages() {
            try {
                const result = await getGitHubImages();
                if (result.success) {
                    setImages(result.images);
                } else {
                    setFetchError(true);
                }
            } catch (err) {
                console.error("Failed to load images:", err);
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, []);

    if (fetchError) {
        return (
            <div className="pt-32 pb-24 text-center px-6 min-h-screen">
                <h1 className="font-serif text-3xl text-red-500 mb-4">Configuration Required</h1>
                <p className="text-[var(--color-muted)]">Please ensure your Cloudinary credentials are correct.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <section className="text-center mb-16">
                <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">GitHub Integration</p>
                <h1 className="font-serif text-5xl md:text-6xl text-[var(--color-text)] mb-4">Live Gallery</h1>
                <p className="text-[var(--color-muted)] max-w-md mx-auto text-sm">
                    These images are fetched and optimized dynamically from the `plp-images` origin repository.
                </p>
            </section>

            {loading ? (
                <div className="text-center py-20 border border-[var(--color-border)] rounded-sm">
                    <p className="text-xl text-[var(--color-muted)] animate-pulse">Loading gallery...</p>
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20 border border-[var(--color-border)] rounded-sm">
                    <p className="text-xl text-[var(--color-muted)]">No images found.</p>
                    <p className="text-sm text-[var(--color-muted)] mt-2">Upload some images to your Cloudinary Media Library!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((file) => (
                        <div key={file.public_id} className="relative aspect-square overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] group">
                            {/* Rendering fast CDN images */}
                            <Image
                                src={file.public_id}
                                alt="Gallery Image"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-xs text-white truncate text-center uppercase tracking-widest">{file.format || 'IMAGE'} · {Math.round(file.bytes / 1024)} KB</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
