import Link from "next/link";
import { getImagesInFolder, deleteImage, reorderImagesInFolder } from "../../../actions";
import UploadWidget from "../../portfolio/[category]/[client]/UploadWidget";
import AdminImageGrid from "../../portfolio/[category]/[client]/AdminImageGrid";

export const revalidate = 0;

const slugToTitle: Record<string, string> = {
    "weddings": "Weddings Cover",
    "prewedding": "Pre-Wedding Cover",
    "haldi-mehandi": "Haldi & Mehendi Cover"
};

export default async function CoverDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    const folderPath = `covers/${slug}`;
    const { success, images } = await getImagesInFolder(folderPath);

    return (
        <div>
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <Link href="/admin/covers" className="hover:text-white transition-colors">Page Covers</Link>
                <span>/</span>
                <span className="text-white capitalize">{slug.replace(/-/g, ' ')}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-[var(--color-border)] pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-serif text-white">{slugToTitle[slug] || slug}</h2>
                    <p className="text-sm text-[var(--color-muted)] mt-1 font-mono text-[11px]">{folderPath}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm overflow-hidden text-sm h-[40px]">
                        <span className="px-4 py-2 text-[var(--color-muted)] whitespace-nowrap leading-tight flex items-center">GitHub Integration Active</span>
                    </div>
                    <UploadWidget folderPath={folderPath} />
                </div>
            </div>

            {!success ? (
                <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded-sm">
                    Failed to load cover image from GitHub.
                </div>
            ) : images?.length === 0 ? (
                <div className="text-center py-32 border border-dashed border-[var(--color-border)] rounded-sm bg-[var(--color-surface)]/50">
                    <p className="text-xl font-serif text-[var(--color-muted)]">No cover image uploaded.</p>
                    <p className="text-sm text-[var(--color-muted)] mt-3 max-w-sm mx-auto">Click &quot;Upload Photos&quot; above to set the hero background for this page. (Only the newest/first image is used).</p>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gold">
                        Note: The live website will automatically display the first image in this grid as the full-screen background.
                    </div>
                    <AdminImageGrid 
                        images={images} 
                        deleteServerAction={deleteImage} 
                        reorderServerAction={async (sortedFilenames) => {
                            "use server";
                            return await reorderImagesInFolder(folderPath, sortedFilenames);
                        }}
                    />
                </>
            )}
        </div>
    );
}
