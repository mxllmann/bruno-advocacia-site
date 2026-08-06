"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring, inViewport } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

type AnimatedHeadingProps = {
  text: string;
  as?: Tag;
  className?: string;
  /** substring to emphasize in gold */
  highlight?: string;
  highlightClassName?: string;
  /** draw a precise animated underline beneath the highlight */
  underline?: boolean;
  delay?: number;
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring.default, delay },
  }),
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { type: "spring", bounce: 0, duration: 0.7, delay: delay + 0.35 },
  }),
};

function Highlight({
  text,
  className,
  underline,
  delay,
}: {
  text: string;
  className?: string;
  underline?: boolean;
  delay: number;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      {text}
      {underline && (
        <motion.span
          aria-hidden
          className="absolute -bottom-1 left-0 h-[0.09em] w-full origin-left rounded-full bg-linear-to-r from-gold-deep via-gold to-gold-bright"
          variants={underlineVariants}
          custom={delay}
        />
      )}
    </span>
  );
}

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

  const idx = highlight ? text.indexOf(highlight) : -1;

  let content: ReactNode;
  if (highlight && idx >= 0) {
    content = (
      <>
        {text.slice(0, idx)}
        <Highlight
          text={highlight}
          className={highlightClassName}
          underline={underline}
          delay={delay}
        />
        {text.slice(idx + highlight.length)}
      </>
    );
  } else {
    content = text;
  }

  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={headingVariants}
      initial="hidden"
      whileInView="visible"
      viewport={inViewport}
    >
      {content}
    </MotionTag>
  );
}
