"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { inViewport, spring } from "@/lib/motion";

type AnimatedListProps = {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring.default, delay: index * 0.1 },
  }),
};

/**
 * A page-level list: every item is revealed as it reaches the viewport.
 * It deliberately has no internal scroll area so content cannot be hidden.
 */
export function AnimatedList({
  items,
  className,
  itemClassName,
}: AnimatedListProps) {
  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={inViewport}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
