"use client";

import { useTransition, useState, FormEvent } from "react";
import { renameFolder, deleteFolder } from "../../actions";
import { useRouter } from "next/navigation";

export default function FolderActions({ folderPath, folderName, isCategory = false }: { folderPath: string, folderName: string, isCategory?: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [isRenaming, setIsRenaming] = useState(false);
    const [renameInput, setRenameInput] = useState(folderName);
    
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRenameSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newName = renameInput.trim();
        if (!newName || newName === folderName) {
            setIsRenaming(false);
            return;
        }

        startTransition(async () => {
             const pathParts = folderPath.split("/");
             pathParts[pathParts.length - 1] = newName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase(); // Slugify
             const newPath = pathParts.join("/");

             const result = await renameFolder(folderPath, newPath);
             if (result.success) {
                 setIsRenaming(false);
                 if (isCategory) {
                     router.push('/admin/portfolio');
                     router.refresh();
                 } else {
                     const catPath = pathParts.slice(0, 2).join("/"); 
                     router.push(`/admin/${catPath}`);
                     router.refresh();
                 }
             } else {
                 alert(`Rename failed: ${result.error}`);
                 setIsRenaming(false);
             }
        });
    };

    const handleConfirmDelete = () => {
        startTransition(async () => {
            const result = await deleteFolder(folderPath);
            if (result.success) {
                if (isCategory) {
                    router.push('/admin/portfolio');
                    router.refresh();
                } else {
                     const catPath = folderPath.split("/").slice(0, 2).join("/");
                     router.push(`/admin/${catPath}`);
                     router.refresh();
                }
            } else {
                alert(`Delete failed: ${result.error}`);
                setIsDeleting(false);
            }
        });
    };

    if (isRenaming) {
        return (
            <div className="w-full mt-4 border-t border-[var(--color-border)] pt-4">
                <form onSubmit={handleRenameSubmit} className="flex gap-2">
                    <input 
                        type="text" 
                        value={renameInput}
                        onChange={(e) => setRenameInput(e.target.value)}
                        disabled={isPending}
                        autoFocus
                        className="flex-1 px-2 py-1 bg-[#111] border border-[var(--color-border)] text-xs text-white rounded-sm focus:border-gold outline-none"
                    />
                    <button type="submit" disabled={isPending} className="px-3 py-1 bg-gold text-black text-xs font-bold rounded-sm">
                        {isPending ? "..." : "Save"}
                    </button>
                    <button type="button" disabled={isPending} onClick={() => setIsRenaming(false)} className="px-2 py-1 bg-[#222] text-white text-xs rounded-sm">
                        X
                    </button>
                </form>
            </div>
        );
    }

    if (isDeleting) {
        return (
            <div className="w-full mt-4 border-t border-[var(--color-border)] pt-4 flex flex-col gap-2">
                <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider text-center">Are you sure?</p>
                <div className="flex gap-2">
                    <button 
                        onClick={handleConfirmDelete} 
                        disabled={isPending}
                        className="flex-1 text-xs py-1.5 rounded-sm bg-red-900/50 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                        {isPending ? "Deleting..." : "Yes, Delete"}
                    </button>
                    <button 
                        onClick={() => setIsDeleting(false)} 
                        disabled={isPending}
                        className="flex-1 text-xs py-1.5 rounded-sm bg-[#222] text-white hover:bg-[#333] transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-2 w-full mt-4 border-t border-[var(--color-border)] pt-4 relative z-10">
            <button 
                onClick={(e) => { e.preventDefault(); setIsRenaming(true); }} 
                className="flex-1 text-xs py-1.5 rounded-sm bg-[#1a1a1a] text-[var(--color-muted)] hover:text-white hover:bg-[#222] transition-colors"
            >
               Rename
            </button>
            <button 
                onClick={(e) => { e.preventDefault(); setIsDeleting(true); }} 
                className="flex-1 text-xs py-1.5 rounded-sm bg-[#1a0f0f] text-red-500 hover:bg-red-900/30 hover:text-red-400 transition-colors"
            >
                Delete
            </button>
        </div>
    );
}
