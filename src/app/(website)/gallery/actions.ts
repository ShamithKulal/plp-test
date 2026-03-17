"use server";

import cloudinary from "@/lib/cloudinary";

export async function getCloudinaryImages() {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 100,
        });

        // Filter out any potential non-image files or folders
        const images = result.resources.filter((res: any) => res.format !== undefined);
        return { success: true, images };
    } catch (error) {
        console.error("Error fetching from Cloudinary:", error);
        return { success: false, images: [] };
    }
}
