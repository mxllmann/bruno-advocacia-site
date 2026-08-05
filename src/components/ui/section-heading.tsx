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
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {kicker && (
        <Reveal>
          <span className="eyebrow inline-flex items-center gap-2.5 text-[0.7rem] font-semibold text-gold">
            <span className="h-px w-6 bg-gold/50" />
            {kicker}
          </span>
        </Reveal>
      )}
      <AnimatedHeading
        as="h2"
        text={title}
        highlight={highlight}
        className="headline text-[2rem] text-foreground sm:text-[2.75rem] md:text-5xl"
      />
      {description && (
        <Reveal index={2}>
          <p
            className={cn(
              "text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]",
              align === "center" && "max-w-xl",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
