import { ArrowRight } from "lucide-react";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { cn } from "@/lib/utils";

type InteractiveHoverButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  type?: "whatsapp" | "default";
};

export function InteractiveHoverButton({
  children,
  href,
  className,
  type = "whatsapp",
}: InteractiveHoverButtonProps) {
  const isWhatsapp = type === "whatsapp";
  const isInternal = href?.startsWith("#");
  const Component = href ? "a" : "button";

  // Rest state: black pill + gold border. Hover: the "explosion" floods the pill.
  // Border opacity is 45% to match the SpecularButton's resting rim (baseColor
  // var(--gold) rendered at the shader's 0.45 base intensity) — same color, both themes.
  const base = isWhatsapp
    ? "border-gold/45 bg-background text-gold hover:border-[#00c307] hover:bg-[#00c307]"
    : "border-gold bg-gold text-gold-contrast";
  const explosion = isWhatsapp ? "bg-[#00c307]" : "bg-gold-soft";
  const hoverText = isWhatsapp ? "text-white" : "text-gold-contrast";

  return (
    <Component
      href={href}
      target={href && !isInternal ? "_blank" : undefined}
      rel={href && !isInternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative inline-flex h-13 cursor-pointer items-center overflow-hidden rounded-full border px-4 text-center text-[0.95rem] font-medium transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
        base,
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-75 group-hover:opacity-0">
          {/* green bubble at rest → explodes to flood the pill on hover */}
          <span
            className={cn(
              "absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-[40]",
              explosion,
            )}
          />
          {isWhatsapp ? (
            <WhatsApp className="relative z-10 text-[26px]! text-white" />
          ) : (
            <ArrowRight className="relative z-10 h-4 w-4 text-gold-contrast" />
          )}
        </div>

        <span className="inline-block pr-2 transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
          {children}
        </span>
      </div>

      {/* hover content */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex translate-x-10 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
          hoverText,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Component>
  );
}
