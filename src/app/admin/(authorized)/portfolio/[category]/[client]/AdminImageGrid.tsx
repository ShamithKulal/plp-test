"use client";

import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableImageCard({ file, deleteServerAction }: { file: any, deleteServerAction: any }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: file.public_id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative aspect-square overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] group rounded-sm touch-none">
            <Image
                src={file.public_id}
                alt="Gallery Image"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 50vw"
            />
            {/* Drag Handle Overlay */}
            <div 
                {...attributes} 
                {...listeners}
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
            ></div>

            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
                <p className="text-[10px] text-white/70 truncate uppercase pointer-events-auto">{file.format || 'IMAGE'} · <a href={file.public_id} target="_blank" rel="noreferrer" className="underline hover:text-gold">View Raw</a></p>
            </div>
            <div className="absolute top-2 right-2 z-20">
                <DeleteButton publicId={file.public_id} deleteServerAction={deleteServerAction} />
            </div>
        </div>
    );
}

export default function AdminImageGrid({ 
    images, 
    deleteServerAction,
    reorderServerAction
}: { 
    images: any[], 
    deleteServerAction: (id: string) => Promise<{success: boolean, error?: string}>,
    reorderServerAction?: (sortedFilenames: string[]) => Promise<{success: boolean, error?: string}>
}) {
    const [items, setItems] = useState(images);
    const [isSaving, setIsSaving] = useState(false);

    // Sync state if props change (e.g. after upload or deletion)
    useEffect(() => {
        setItems(images);
    }, [images]);

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 250, tolerance: 5 },
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.public_id === active.id);
            const newIndex = items.findIndex((i) => i.public_id === over.id);
            const newItems = arrayMove(items, oldIndex, newIndex);
            
            setItems(newItems);

            if (reorderServerAction) {
                setIsSaving(true);
                const sortedFilenames = newItems.map(item => item.public_id.split('/').pop() || "");
                await reorderServerAction(sortedFilenames);
                setIsSaving(false);
            }
        }
    };

    return (
        <div>
            {isSaving && (
                <div className="mb-4 text-[10px] tracking-widest text-gold animate-pulse uppercase">
                    Saving new order to GitHub...
                </div>
            )}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map(i => i.public_id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {items.map((file: any) => (
                            <SortableImageCard 
                                key={file.public_id} 
                                file={file} 
                                deleteServerAction={deleteServerAction} 
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
