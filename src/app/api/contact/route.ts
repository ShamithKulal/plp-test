import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    phone: z.string().regex(/^[6-9]\d{9}$/),
    email: z.string().email().optional().or(z.literal("")),
    eventType: z.string().min(1),
    date: z.string().min(1),
    location: z.string().min(2),
    message: z.string().optional(),
    referrer_url: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validation = contactSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });
        }

        const {
            name, phone, email, eventType, date, location, message,
            referrer_url, utm_source, utm_medium, utm_campaign,
        } = validation.data;

        // ── 1. Send via Resend (Email) ──────────────────────────────────────────
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
                body: JSON.stringify({
                    from: "Paperlight Leads <leads@paperlightproductions.com>",
                    to: [process.env.CONTACT_EMAIL || "hello@paperlightproductions.com"],
                    subject: `New Inquiry: ${eventType} on ${date} – ${name}`,
                    html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0f0f0f;color:#f5f0e8;padding:32px;border-radius:8px;">
              <h2 style="color:#D4AF37;font-size:24px;margin-bottom:16px;">New Lead from Paperlight Productions</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888;width:140px">Name</td><td style="padding:8px 0;border-bottom:1px solid #222">${name}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Phone</td><td style="padding:8px 0;border-bottom:1px solid #222">${phone}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Email</td><td style="padding:8px 0;border-bottom:1px solid #222">${email || "—"}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Event Type</td><td style="padding:8px 0;border-bottom:1px solid #222">${eventType}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Event Date</td><td style="padding:8px 0;border-bottom:1px solid #222">${date}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Location</td><td style="padding:8px 0;border-bottom:1px solid #222">${location}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Message</td><td style="padding:8px 0;border-bottom:1px solid #222">${message || "—"}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Source</td><td style="padding:8px 0;border-bottom:1px solid #222">${utm_source || "direct"}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Medium</td><td style="padding:8px 0;border-bottom:1px solid #222">${utm_medium || "—"}</td></tr>
                <tr><td style="padding:8px 0;border-bottom:1px solid #222;color:#888">Campaign</td><td style="padding:8px 0;border-bottom:1px solid #222">${utm_campaign || "—"}</td></tr>
                <tr><td style="padding:8px 0;color:#888">Referrer</td><td style="padding:8px 0">${referrer_url || "—"}</td></tr>
              </table>
              <p style="margin-top:24px;font-size:12px;color:#555">Paperlight Productions – Automated Lead Alert</p>
            </div>
          `,
                }),
            });
        }

        // ── 2. Send to Google Sheets via Apps Script ────────────────────────────
        const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
        if (sheetsUrl) {
            await fetch(sheetsUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                redirect: "follow",
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    name, phone, email: email || "", eventType, date, location,
                    message: message || "", utm_source: utm_source || "direct",
                    utm_medium: utm_medium || "", utm_campaign: utm_campaign || "",
                    referrer_url: referrer_url || "",
                }),
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
    }
}
