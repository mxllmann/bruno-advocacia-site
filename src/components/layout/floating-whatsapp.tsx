"use client";

import { motion } from "framer-motion";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { whatsappUrl } from "@/lib/site";
import { spring } from "@/lib/motion";

export function FloatingWhatsapp() {
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-6 right-5 z-40 sm:bottom-7 sm:right-7"
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      // Delayed spring entrance with a little momentum — it arrives, then rests.
      transition={{ ...spring.gentleBounce, delay: 1.4 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <span className="grid h-15 w-15 place-items-center rounded-full bg-[#00c307] text-white shadow-[0_12px_32px_-6px_rgba(0,195,7,0.45)] sm:h-16 sm:w-16">
        {/* Soft resting halo instead of a constant bounce */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20 transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <WhatsApp className="text-[34px]! sm:text-[38px]!" />
      </span>
    </motion.a>
  );
}
