import Link from "next/link";
import { getFolders, createFolder } from "../../actions";
import { revalidatePath } from "next/cache";
import FolderActions from "./FolderActions";

export const revalidate = 0; // Always fetch fresh data

export default async function AdminDashboard() {
    const { success, folders } = await getFolders("portfolio");

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-[var(--color-border)] pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-serif text-white">Categories</h2>
                    <p className="text-sm text-[var(--color-muted)] mt-1">Manage your portfolio sections natively via GitHub.</p>
                </div>
                <form action={async (formData) => {
                    "use server";
                    const category = formData.get("category")?.toString().trim();
                    if (category) {
                        const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        await createFolder(`portfolio/${slug}`);
                        revalidatePath('/admin/portfolio');
                    }
                }} className="flex gap-2">
                    <input type="text" name="category" placeholder="New Category Name" required className="bg-[#111] border border-[var(--color-border)] px-4 py-2 text-sm text-white focus:border-gold outline-none rounded-sm" />
                    <button type="submit" className="bg-gold text-[#0F0F0F] px-4 py-2 hover:bg-white transition-colors font-semibold text-sm rounded-sm whitespace-nowrap">
                        Add Category
                    </button>
                </form>
            </div>

            {!success ? (
                <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded-sm">
                    Failed to load categories. Ensure your GitHub credentials are correct and you have created a &quot;portfolio&quot; folder.
                </div>
            ) : folders?.length === 0 ? (
                <div className="text-center py-20 border border-[var(--color-border)] rounded-sm">
                    <p className="text-xl text-[var(--color-muted)]">No categories found.</p>
                    <p className="text-sm text-[var(--color-muted)] mt-2">Create your first category above.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {folders?.map((folder: any) => (
                        <div key={folder.path} className="flex flex-col group p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-gold transition-colors rounded-sm relative overflow-hidden">
                            <Link href={`/admin/portfolio/${folder.name}`} className="flex-1 block cursor-pointer">
                                <h3 className="text-lg font-serif text-white group-hover:text-gold transition-colors capitalize">{folder.name.replace(/-/g, ' ')}</h3>
                                <p className="text-xs text-[var(--color-muted)] mt-2 font-mono">{folder.path}</p>
                            </Link>
                            <FolderActions folderPath={folder.path} folderName={folder.name} isCategory={true} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
