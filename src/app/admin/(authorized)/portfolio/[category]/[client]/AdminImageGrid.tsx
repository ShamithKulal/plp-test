"use client";

import { CldImage } from "next-cloudinary";
import DeleteButton from "./DeleteButton";

export default function AdminImageGrid({ images, deleteServerAction }: { images: any[], deleteServerAction: (id: string) => Promise<{success: boolean, error?: string}> }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((file: any) => (
                <div key={file.public_id} className="relative aspect-square overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] group rounded-sm">
                    <CldImage
                        src={file.public_id}
                        alt="Gallery Image"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-[10px] text-white/70 truncate">{file.format.toUpperCase()} · {Math.round(file.bytes / 1024)} KB</p>
                    </div>
                    <DeleteButton publicId={file.public_id} deleteServerAction={deleteServerAction} />
                </div>
            ))}
        </div>
    );
}
