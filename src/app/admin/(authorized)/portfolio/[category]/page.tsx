import Link from "next/link";
import { getFolders, createFolder } from "../../../actions";
import { revalidatePath } from "next/cache";
import FolderActions from "../FolderActions";

export const revalidate = 0;

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    
    // Cloudinary path for this category
    const path = `portfolio/${category}`;
    const { success, folders: clients } = await getFolders(path);

    // Add client action
    const addClient = async (formData: FormData) => {
        "use server";
        const client = formData.get("client")?.toString().trim();
        if (client) {
            const slug = client.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            await createFolder(`portfolio/${category}/${slug}`);
            revalidatePath(`/admin/portfolio/${category}`);
        }
    };

    return (
        <div>
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--color-muted)]">
                <Link href="/admin/portfolio" className="hover:text-white transition-colors">Categories</Link>
                <span>/</span>
                <span className="text-white capitalize">{category.replace(/-/g, ' ')}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-[var(--color-border)] pb-4 gap-4">
                <div>
                    <h2 className="text-xl font-serif text-white capitalize">{category.replace(/-/g, ' ')} Clients</h2>
                    <p className="text-sm text-[var(--color-muted)] mt-1">Manage clients and shoots for this category.</p>
                </div>
                <form action={addClient} className="flex gap-2">
                    <input type="text" name="client" placeholder="New Client Name" required className="bg-[#111] border border-[var(--color-border)] px-4 py-2 text-sm text-white focus:border-gold outline-none rounded-sm" />
                    <button type="submit" className="bg-gold text-[#0F0F0F] px-4 py-2 hover:bg-white transition-colors font-semibold text-sm rounded-sm whitespace-nowrap">
                        Add Client
                    </button>
                </form>
            </div>

            {!success ? (
                <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-500 text-sm rounded-sm">
                    Failed to load clients.
                </div>
            ) : clients?.length === 0 ? (
                <div className="text-center py-20 border border-[var(--color-border)] rounded-sm">
                    <p className="text-xl text-[var(--color-muted)]">No clients found.</p>
                    <p className="text-sm text-[var(--color-muted)] mt-2">Add a client to start uploading photos.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients?.map((client: any) => (
                        <div key={client.path} className="flex flex-col group p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-gold transition-colors rounded-sm relative overflow-hidden">
                            <Link href={`/admin/portfolio/${category}/${client.name}`} className="flex-1 block cursor-pointer">
                                <h3 className="text-lg font-serif text-white group-hover:text-gold transition-colors capitalize">{client.name.replace(/-/g, ' ')}</h3>
                                <p className="text-xs text-[var(--color-muted)] mt-2 font-mono">{client.path}</p>
                            </Link>
                            <FolderActions folderPath={client.path} folderName={client.name} isCategory={false} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
