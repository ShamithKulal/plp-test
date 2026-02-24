"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "9483603189";
const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hi Paperlight! I'm interested in your photography services. Could you please share more details?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppButton() {
    return (
        <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-medium text-sm text-white group"
            style={{ backgroundColor: "#25D366" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >
            <MessageCircle size={20} fill="currentColor" />
            <span className="hidden sm:inline">Chat with Us</span>
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: "#25D366" }} />
        </motion.a>
    );
}
