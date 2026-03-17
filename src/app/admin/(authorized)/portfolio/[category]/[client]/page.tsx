import Link from "next/link";
import { getImagesInFolder, deleteImage } from "../../../../actions";
import UploadWidget from "./UploadWidget";
import AdminImageGrid from "./AdminImageGrid";

export const revalidate = 0;

export default async function ClientPortfolioPage({ params }: { params: Promise<{ category: string, client: string }> }) {
    const { category, client } = await params;
    
    const folderPath = `portfolio/${category}/${client}`;
    const { success, images } = await getImagesInFolder(folderPath);

    return (
        <div>
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <Link href="/admin/portfolio" className="hover:text-white transition-colors">Categories</Link>
                <span>/</span>
                <Link href={`/admin/portfolio/${category}`} className="hover:text-white transition-colors capitalize">{category.replace(/-/g, ' ')}</Link>
                <span>/</span>
                <span className="text-white capitalize">{client.replace(/-/g, ' ')}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-[var(--color-border)] pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-serif text-white capitalize">{client.replace(/-/g, ' ')}&apos;s Photos</h2>
                    <p className="text-sm text-[var(--color-muted)] mt-1 font-mono text-[11px]">{folderPath}</p>
                </div>
                <UploadWidget folderPath={folderPath} />
            </div>

            {!success ? (
                <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded-sm">
                    Failed to load images from Cloudinary.
                </div>
            ) : images?.length === 0 ? (
                <div className="text-center py-32 border border-dashed border-[var(--color-border)] rounded-sm bg-[var(--color-surface)]/50">
                    <p className="text-xl font-serif text-[var(--color-muted)]">This folder is empty.</p>
                    <p className="text-sm text-[var(--color-muted)] mt-3 max-w-sm mx-auto">Click &quot;Upload Photos&quot; above to launch the Cloudinary uploader. You can select multiple images at once.</p>
                </div>
            ) : (
                <AdminImageGrid images={images} deleteServerAction={deleteImage} />
            )}
        </div>
    );
}
