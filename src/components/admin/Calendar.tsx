"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, MapPin, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Booking = {
    id: string;
    title: string;
    clientName: string;
    date: string; // YYYY-MM-DD
    time?: string;
    location?: string;
    notes?: string;
};

export default function AdminCalendar({ initialBookings, saveAction }: { initialBookings: Booking[], saveAction: (bookings: Booking[]) => Promise<{success: boolean, error?: string}> }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [bookings, setBookings] = useState<Booking[]>(initialBookings || []);
    const [isSaving, setIsSaving] = useState(false);
    
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

    // Form states
    const [title, setTitle] = useState("");
    const [clientName, setClientName] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const openModal = (dateStr: string, bookingToEdit?: Booking) => {
        setSelectedDate(dateStr);
        if (bookingToEdit) {
            setEditingBooking(bookingToEdit);
            setTitle(bookingToEdit.title);
            setClientName(bookingToEdit.clientName);
            setTime(bookingToEdit.time || "");
            setLocation(bookingToEdit.location || "");
            setNotes(bookingToEdit.notes || "");
        } else {
            setEditingBooking(null);
            setTitle("");
            setClientName("");
            setTime("");
            setLocation("");
            setNotes("");
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setEditingBooking(null), 300);
    };

    const handleSaveBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !title || !clientName) return;

        let newBookings = [...bookings];
        
        if (editingBooking) {
            newBookings = newBookings.map(b => b.id === editingBooking.id ? {
                ...b, title, clientName, time, location, notes
            } : b);
        } else {
            newBookings.push({
                id: Date.now().toString(),
                date: selectedDate,
                title,
                clientName,
                time,
                location,
                notes
            });
        }

        setIsSaving(true);
        setBookings(newBookings); // Optimistic UI
        closeModal();
        await saveAction(newBookings);
        setIsSaving(false);
    };

    const handleDeleteBooking = async () => {
        if (!editingBooking) return;
        if (!confirm("Are you sure you want to delete this shoot?")) return;

        const newBookings = bookings.filter(b => b.id !== editingBooking.id);
        setIsSaving(true);
        setBookings(newBookings);
        closeModal();
        await saveAction(newBookings);
        setIsSaving(false);
    };

    const renderDays = () => {
        const days = [];
        // Empty cells before first day
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="min-h-[100px] border border-[var(--color-border)]/50 bg-[#0a0a0a]" />);
        }

        const todayStr = new Date().toLocaleDateString('en-CA');

        // Actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const dateObj = new Date(year, month, i);
            const dateStr = dateObj.toLocaleDateString('en-CA'); // YYYY-MM-DD local time
            const dayBookings = bookings.filter(b => b.date === dateStr);
            const isToday = dateStr === todayStr;

            days.push(
                <div 
                    key={`day-${i}`} 
                    onClick={() => openModal(dateStr)}
                    className={`min-h-[100px] p-2 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[#1a1a1a] transition-colors cursor-pointer flex flex-col gap-1 relative overflow-hidden group`}
                >
                    <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-gold text-black' : 'text-[var(--color-muted)] group-hover:text-white'}`}>
                        {i}
                    </span>
                    
                    <div className="flex-1 overflow-y-auto w-full no-scrollbar space-y-1 mt-1 pb-1">
                        {dayBookings.map(b => (
                            <div 
                                key={b.id} 
                                onClick={(e) => { e.stopPropagation(); openModal(dateStr, b); }}
                                className="group/pill relative z-20 bg-gold/10 border border-gold/40 rounded-sm px-2 py-1 text-[10px] sm:text-xs hover:bg-gold cursor-pointer transition-all duration-200"
                            >
                                <span className="font-semibold text-gold group-hover/pill:text-black block truncate">{b.title}</span>
                                <span className="text-[var(--color-muted)] group-hover/pill:text-black/80 block truncate">{b.clientName}</span>
                            </div>
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity flex items-center justify-center">
                        {dayBookings.length === 0 && <Plus size={20} className="text-white/30" />}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="w-full">
            {isSaving && (
                <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse z-50"></div>
            )}
            
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-serif text-white tracking-wide">{monthNames[month]} <span className="text-gold">{year}</span></h2>
                    <p className="text-[11px] tracking-widest uppercase text-[var(--color-muted)] mt-1">Manage Shoot Schedule</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handlePrevMonth} className="p-2 border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] hover:text-gold transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] text-xs uppercase tracking-widest hover:text-gold transition-colors hidden sm:block">
                        Today
                    </button>
                    <button onClick={handleNextMonth} className="p-2 border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] hover:text-gold transition-colors">
                        <ChevronRight size={18} />
                    </button>
                    <button onClick={() => openModal(new Date().toLocaleDateString('en-CA'))} className="ml-2 px-4 py-2 bg-gold text-black rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gold/90 transition-colors flex items-center gap-2">
                        <Plus size={14} /> <span className="hidden sm:inline">Add Shoot</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px rounded-t-sm overflow-hidden border border-[var(--color-border)] border-b-0 bg-[#0a0a0a]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                    <div key={d} className="py-3 text-center text-[10px] uppercase tracking-widest text-[var(--color-muted)] font-semibold bg-[var(--color-surface)]">
                        {d}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-px rounded-b-sm overflow-hidden bg-[var(--color-border)] border border-[var(--color-border)] shadow-xl">
                {renderDays()}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0f0f0f] border border-[var(--color-border)] rounded-sm p-6 w-full max-w-md relative shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={closeModal} className="absolute top-4 right-4 text-[var(--color-muted)] hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                            
                            <h3 className="text-xl font-serif text-white mb-6">
                                {editingBooking ? "Edit Booking" : "New Booking"}
                                <span className="block text-xs font-sans tracking-widest text-gold mt-1 uppercase">
                                    {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                                </span>
                            </h3>

                            <form onSubmit={handleSaveBooking} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] tracking-widest uppercase text-[var(--color-muted)] mb-1">Shoot Title *</label>
                                    <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Haldi Pre-shoot" className="w-full bg-[#111] border border-[var(--color-border)] focus:border-gold px-3 py-2 text-sm text-white outline-none rounded-sm transition-colors" />
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] tracking-widest uppercase text-[var(--color-muted)] mb-1">Client Name *</label>
                                    <input required value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Rahul & Priya" className="w-full bg-[#111] border border-[var(--color-border)] focus:border-gold px-3 py-2 text-sm text-white outline-none rounded-sm transition-colors" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] tracking-widest uppercase text-[var(--color-muted)] mb-1 flex items-center gap-1"><Clock size={10}/> Time</label>
                                        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-[#111] border border-[var(--color-border)] focus:border-gold px-3 py-2 text-sm text-white outline-none rounded-sm transition-colors" style={{ colorScheme: "dark" }} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] tracking-widest uppercase text-[var(--color-muted)] mb-1 flex items-center gap-1"><MapPin size={10}/> Location</label>
                                        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Udupi Beach" className="w-full bg-[#111] border border-[var(--color-border)] focus:border-gold px-3 py-2 text-sm text-white outline-none rounded-sm transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] tracking-widest uppercase text-[var(--color-muted)] mb-1">Notes</label>
                                    <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional info or requirements..." rows={3} className="w-full bg-[#111] border border-[var(--color-border)] focus:border-gold px-3 py-2 text-sm text-white outline-none rounded-sm transition-colors resize-none" />
                                </div>

                                <div className="pt-4 flex items-center justify-between">
                                    {editingBooking ? (
                                        <button type="button" onClick={handleDeleteBooking} disabled={isSaving} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 text-[11px] uppercase tracking-widest font-semibold p-2">
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}
                                    <div className="flex gap-2">
                                        <button type="button" onClick={closeModal} className="px-4 py-2 border border-[var(--color-border)] rounded-sm text-xs uppercase tracking-widest hover:text-white text-[var(--color-muted)] transition-colors">
                                            Cancel
                                        </button>
                                        <button type="submit" disabled={isSaving} className="px-6 py-2 bg-gold text-black font-semibold rounded-sm text-xs uppercase tracking-widest hover:bg-gold/90 transition-colors disabled:opacity-50">
                                            {isSaving ? "Saving..." : "Save Shoot"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
