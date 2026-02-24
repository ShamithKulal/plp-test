"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().email("Enter a valid email").optional().or(z.literal("")),
    eventType: z.string().min(1, "Please select an event type"),
    date: z.string().min(1, "Please select a date"),
    location: z.string().min(2, "Location is required"),
    message: z.string().optional(),
    referrer_url: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const eventTypes = [
    "Wedding",
    "Pre-Wedding Shoot",
    "Haldi & Mehendi",
    "Reception",
    "Corporate Event",
    "Other",
];

interface InquiryFormProps {
    compact?: boolean;
}

export default function InquiryForm({ compact = false }: InquiryFormProps) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setValue("referrer_url", document.referrer || window.location.href);
            const params = new URLSearchParams(window.location.search);
            setValue("utm_source", params.get("utm_source") || "");
            setValue("utm_medium", params.get("utm_medium") || "");
            setValue("utm_campaign", params.get("utm_campaign") || "");
        }
    }, [setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                router.push("/thank-you");
            }
        } catch {
            // silently fail – user stays on page
        }
    };

    const inputClass =
        "w-full bg-[#111] border border-[var(--color-border)] focus:border-[var(--color-gold)] text-[var(--color-text)] text-sm px-4 py-3 rounded-sm outline-none transition-colors placeholder:text-[var(--color-muted)]";
    const labelClass = "block text-[11px] tracking-[0.15em] uppercase text-[var(--color-muted)] mb-1.5";
    const errorClass = "text-red-400 text-xs mt-1";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!compact && (
                <h3 className="font-serif text-2xl text-[var(--color-text)] mb-6">
                    Check <span className="text-gold">Availability</span>
                </h3>
            )}

            <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                <div>
                    <label className={labelClass}>Your Name *</label>
                    <input {...register("name")} placeholder="Priya Sharma" className={inputClass} />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input {...register("phone")} placeholder="9876543210" type="tel" className={inputClass} />
                    {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
                </div>
            </div>

            <div>
                <label className={labelClass}>Email (optional)</label>
                <input {...register("email")} placeholder="priya@example.com" type="email" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                <div>
                    <label className={labelClass}>Event Type *</label>
                    <select {...register("eventType")} className={inputClass}>
                        <option value="">Select event</option>
                        {eventTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {errors.eventType && <p className={errorClass}>{errors.eventType.message}</p>}
                </div>
                <div>
                    <label className={labelClass}>Event Date *</label>
                    <input {...register("date")} type="date" className={inputClass} />
                    {errors.date && <p className={errorClass}>{errors.date.message}</p>}
                </div>
            </div>

            <div>
                <label className={labelClass}>Event Location *</label>
                <input {...register("location")} placeholder="Udupi / Mangalore" className={inputClass} />
                {errors.location && <p className={errorClass}>{errors.location.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Message (optional)</label>
                <textarea
                    {...register("message")}
                    placeholder="Tell us a bit about your event..."
                    rows={compact ? 3 : 4}
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* Hidden UTM fields */}
            <input type="hidden" {...register("referrer_url")} />
            <input type="hidden" {...register("utm_source")} />
            <input type="hidden" {...register("utm_medium")} />
            <input type="hidden" {...register("utm_campaign")} />

            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 text-[13px] tracking-widest uppercase font-semibold bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-60 transition-all duration-300 rounded-sm"
            >
                {isSubmitting ? "Sending..." : "Check Availability →"}
            </motion.button>
        </form>
    );
}
