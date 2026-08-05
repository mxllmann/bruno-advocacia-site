import WhatsApp from "@mui/icons-material/WhatsApp";
import { whatsappUrl } from "@/lib/site";

export function FloatingWhatsapp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-5 z-40 sm:bottom-7 sm:right-7"
    >
      <span className="grid h-16 w-16 place-items-center rounded-full bg-[#00c307] text-white shadow-[0_12px_28px_rgba(0,195,7,0.35)] animate-bounce">
        <WhatsApp className="text-[38px]!" />
      </span>
    </a>
  );
}
