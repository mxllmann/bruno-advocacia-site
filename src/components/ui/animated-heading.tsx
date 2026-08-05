"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Highlighter } from "./highlighter";

const container: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Words({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={wordVariant}
          className={cn("inline-block whitespace-pre", className)}
        >
          {w}
          {" "}
        </motion.span>
      ))}
    </>
  );
}

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type AnimatedHeadingProps = {
  text: string;
  as?: Tag;
  className?: string;
  /** substring to emphasize in gold */
  highlight?: string;
  highlightClassName?: string;
  /** draw an animated (rough-notation) underline under the highlight */
  underline?: boolean;
  delay?: number;
};

export function AnimatedHeading({
  text,
  as = "h2",
  className,
  highlight,
  highlightClassName = "text-gold",
  underline = false,
  delay = 0,
}: AnimatedHeadingProps) {
  const MotionTag = motion[as];

  let content;
  const idx = highlight ? text.indexOf(highlight) : -1;
  if (highlight && idx >= 0) {
    const pre = text.slice(0, idx);
    const post = text.slice(idx + highlight.length);
    const hlWords = <Words text={highlight} className={highlightClassName} />;
    content = (
      <>
        {pre && <Words text={pre} />}
        {underline ? (
          <Highlighter
            action="underline"
            color="#c2a878"
            strokeWidth={2}
            padding={6}
          >
            {hlWords}
          </Highlighter>
        ) : (
          hlWords
        )}
        {post && <Words text={post} />}
      </>
    );
  } else {
    content = <Words text={text} />;
  }

  return (
    <MotionTag
      aria-label={text}
      className={className}
      custom={delay}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {content}
    </MotionTag>
  );
}
