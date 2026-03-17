"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function UploadWidget({ folderPath }: { folderPath: string }) {
    const router = useRouter();

    return (
        <CldUploadWidget 
            signatureEndpoint="/api/sign-cloudinary-params"
            options={{
                folder: folderPath,
                multiple: true,
                sources: ['local', 'url', 'camera', 'google_drive'],
            }}
            onSuccess={() => {
                router.refresh();
            }}
        >
            {({ open }) => (
                <button onClick={(e) => { e.preventDefault(); open(); }} className="bg-gold text-[#0F0F0F] px-6 py-3 text-[11px] uppercase font-bold tracking-widest rounded-sm hover:bg-white transition-colors">
                    Upload Photos
                </button>
            )}
        </CldUploadWidget>
    );
}
