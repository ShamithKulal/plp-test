"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ publicId, deleteServerAction }: { publicId: string, deleteServerAction: (id: string) => Promise<{success: boolean, error?: string}> }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [awaitingConfirm, setAwaitingConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!awaitingConfirm) {
            setAwaitingConfirm(true);
            setTimeout(() => setAwaitingConfirm(false), 3000); // reset after 3s
            return;
        }

        setIsDeleting(true);
        try {
            const res = await deleteServerAction(publicId);
            if (res.success) {
                router.refresh();
            } else {
                alert(`Server returned false. Error: ${res.error || "Unknown server error"}`);
            }
        } catch (err: any) {
            alert(`Client Error: ${err.message || String(err)}`);
            console.error("Deletion fell through to catch block:", err);
        } finally {
            setIsDeleting(false);
            setAwaitingConfirm(false);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className={`absolute top-2 right-2 text-white p-2 text-xs rounded-sm opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50 ${awaitingConfirm ? 'bg-red-700 px-3 font-bold z-10' : 'bg-red-500/90 hover:bg-red-600 z-10'}`}
            title="Delete photo"
        >
            {isDeleting ? "..." : awaitingConfirm ? "Sure?" : (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            )}
        </button>
    );
}
