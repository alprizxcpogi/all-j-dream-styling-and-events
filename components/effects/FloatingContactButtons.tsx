"use client";

import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
      <motion.a
        href={`https://wa.me/${BUSINESS.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[var(--shadow-lift)]"
      >
        <MessageCircle className="h-5 w-5" />
      </motion.a>
      <motion.a
        href={`https://m.me/${BUSINESS.messengerUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on Messenger"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] text-white shadow-[var(--shadow-lift)]"
      >
        <Send className="h-5 w-5" />
      </motion.a>
    </div>
  );
}
