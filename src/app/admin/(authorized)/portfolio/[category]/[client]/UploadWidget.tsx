"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "../../../../actions";

export default function UploadWidget({ folderPath }: { folderPath: string }) {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setIsUploading(true);
        
        const files = Array.from(e.target.files);
        
        const uploadPromises = files.map(file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    const base64Data = reader.result as string;
                    const filename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '-').toLowerCase();
                    const res = await uploadImage(folderPath, base64Data, filename);
                    if (!res?.success) reject(new Error(res?.error || "Unknown upload error"));
                    else resolve(true);
                } catch(e) { reject(e); }
            };
            reader.onerror = () => reject(new Error("File read error"));
            reader.readAsDataURL(file);
        }));

        try {
            await Promise.all(uploadPromises);
            router.refresh();
        } catch (error: any) {
            alert(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
            if (e.target) e.target.value = '';
        }
    };

    return (
        <div className="relative overflow-hidden inline-block group">
            <button disabled={isUploading} className="bg-gold text-[#0F0F0F] px-6 py-3 text-[11px] uppercase font-bold tracking-widest rounded-sm transition-colors disabled:opacity-50 pointer-events-none">
                {isUploading ? "Uploading to GitHub..." : "Upload Photos"}
            </button>
            <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFiles} 
                disabled={isUploading}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
        </div>
    );
}
