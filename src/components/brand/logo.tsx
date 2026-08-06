import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** show the "RAMOS & PEREIRA" wordmark next to the monogram */
  withWordmark?: boolean;
};

/** The real R&P interlocked emblem (gold on transparent — reads on any theme). */
export function Monogram({
  className,
  decorative = false,
}: {
  className?: string;
  /** when the name is already conveyed by a nearby wordmark, mark the image decorative */
  decorative?: boolean;
}) {
  return (
    <Image
      src="/logo/icon.png"
      alt={decorative ? "" : "Ramos & Pereira"}
      width={407}
      height={502}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Monogram className={withWordmark ? "h-10" : "h-11"} decorative={withWordmark} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[0.95rem] tracking-[0.22em] text-foreground/90 sm:text-base">
            RAMOS&nbsp;&amp;&nbsp;PEREIRA
          </span>
          <span className="mt-1.5 text-[0.55rem] font-medium uppercase tracking-[0.3em] text-gold/80">
            Advocacia | OAB/SC 3.864
          </span>
        </span>
      )}
    </span>
  );
}
