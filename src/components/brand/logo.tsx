import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** show the "RAMOS & PEREIRA" wordmark next to the monogram */
  withWordmark?: boolean;
};

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid place-items-center rounded-full",
        "ring-1 ring-gold/35",
        className,
      )}
    >
      <span
        className="font-serif leading-none tracking-tight text-gold"
        style={{ fontSize: "0.5em" }}
      >
        R&amp;P
      </span>
    </span>
  );
}

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Monogram className="h-10 w-10" />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[0.95rem] tracking-[0.22em] text-foreground/90 sm:text-base">
            RAMOS&nbsp;&amp;&nbsp;PEREIRA
          </span>
          <span className="mt-1.5 text-[0.55rem] font-medium uppercase tracking-[0.3em] text-gold/80">
            Advocacia · OAB/SC 3.864
          </span>
        </span>
      )}
    </span>
  );
}
