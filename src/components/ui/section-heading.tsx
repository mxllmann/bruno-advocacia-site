import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { AnimatedHeading } from "./animated-heading";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-6 bg-gold/60" />
            {kicker}
          </span>
        </Reveal>
      )}
      <AnimatedHeading
        as="h2"
        text={title}
        highlight={highlight}
        className="font-serif text-[2.25rem] leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.5rem]"
      />
      {description && (
        <Reveal index={2}>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
