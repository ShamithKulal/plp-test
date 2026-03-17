import PortfolioClient, { CategoryData, Subject } from "./PortfolioClient";
import { getFolders, getImagesInFolder } from "@/app/admin/actions";

// Default Next.js caching behavior will be used.
// The cache is automatically busted by revalidatePath('/', 'layout') in the admin actions.

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
    const portfolioData: CategoryData[] = [];
    const { success: catSuccess, folders: categories } = await getFolders("portfolio");

    if (catSuccess && categories && categories.length > 0) {
        // Fetch all categories in parallel to eliminate the sequential API waterfall
        const categoriesData = await Promise.all(
            categories.map(async (category: any) => {
                const label = category.name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
                const subjects: Subject[] = [];

                const { success: clientSuccess, folders: clients } = await getFolders(category.path);
                
                if (clientSuccess && clients && clients.length > 0) {
                    // Fetch images for all clients in parallel
                    const clientsData = await Promise.all(
                        clients.map(async (client: any) => {
                            const { success: imgSuccess, images } = await getImagesInFolder(client.path);
                            return { client, imgSuccess, images };
                        })
                    );

                    for (const { client, imgSuccess, images } of clientsData) {
                        if (imgSuccess && images && images.length > 0) {
                            // Extract cover image and all images
                            const publicIds = images.map((img: any) => img.public_id);
                            
                            subjects.push({
                                id: client.path,
                                name: client.name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
                                location: label, // Using category name as a beautiful subtitle
                                coverImage: publicIds[0], // First image is the cover
                                images: publicIds
                            });
                        }
                    }
                }
                
                return { label, subjects };
            })
        );

        // Filter out empty categories and assemble final data
        for (const data of categoriesData) {
            if (data.subjects.length > 0) {
                portfolioData.push(data);
            }
        }
    }

    return <PortfolioClient portfolioData={portfolioData} />;
}
