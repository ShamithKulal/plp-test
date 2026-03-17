"use server";

import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// ─── Folders (Categories / Clients) ──────────────────────────────────────────

export async function getFolders(path: string = "portfolio") {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

        const result = await cloudinary.api.sub_folders(path);
        return { success: true, folders: result.folders };
    } catch (error: any) {
        // If the parent folder doesn't exist yet, it throws a 404
        if (error?.error?.http_code === 404) {
            return { success: true, folders: [] };
        }
        console.error("Error fetching folders from Cloudinary:", error);
        return { success: false, folders: [] };
    }
}

export async function createFolder(path: string) {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        await cloudinary.api.create_folder(path);
        return { success: true };
    } catch (error) {
        console.error("Error creating folder:", error);
        return { success: false, error: "Failed to create folder" };
    }
}

export async function deleteFolder(path: string) {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        await cloudinary.api.delete_folder(path);
        return { success: true };
    } catch (error) {
        console.error("Error deleting folder:", error);
        return { success: false, error: "Failed to delete folder. Ensure it is empty first." };
    }
}

// ─── Images ──────────────────────────────────────────────────────────────────

export async function getImagesInFolder(folderPath: string) {
    try {
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        const result = await cloudinary.api.resources({
            type: "upload",
            prefix: `${folderPath}/`,
            max_results: 100,
        });
        
        // Filter out folders
        const images = result.resources.filter((res: any) => res.format !== undefined);
        return { success: true, images };
    } catch (error) {
        console.error("Error fetching images:", error);
        return { success: false, images: [] };
    }
}

export async function deleteImage(publicId: string) {
    try {
        // Enforce config to prevent Next.js from caching old environment variables
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        
        console.log(`Attempting to delete image with publicId: "${publicId}"`);
        const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
        console.log(`Delete image result:`, result);
        
        if (result.result === 'ok') {
            revalidatePath('/', 'layout');
            return { success: true };
        } else {
            return { success: false, error: `Cloudinary responded with: ${result.result}` };
        }
    } catch (error: any) {
        console.error("Error deleting image detailed:", error.message || error);
        return { success: false, error: "Failed to delete image" };
    }
}
