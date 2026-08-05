"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealUp, inViewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** stagger index — multiplies the base delay */
  index?: number;
  as?: "div" | "li" | "span" | "section" | "article";
};

export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={index}
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={inViewport}
    >
      {children}
    </MotionTag>
  );
}
