"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  motion,
  type MotionStyle,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

/**
 * MagicCard (adapted from MagicUI) — an interactive card whose gradient border
 * follows the cursor. Trimmed for this project: colors are driven by the gold
 * palette CSS variables, so the card follows the active (light/dark) theme.
 */
type MagicCardProps = {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  /** border gradient — start color near the cursor */
  gradientFrom?: string;
  /** border gradient — end color */
  gradientTo?: string;
  /** soft interior spotlight color */
  gradientColor?: string;
  gradientOpacity?: number;
};

export function MagicCard({
  children,
  className,
  gradientSize = 300,
  gradientFrom = "var(--gold)",
  gradientTo = "var(--gold-deep)",
  gradientColor = "rgba(194,168,120,0.12)",
  gradientOpacity = 0,
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(() => {
    const off = -gradientSizeRef.current;
    mouseX.set(off);
    mouseY.set(off);
  }, [mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  // Reset when the pointer leaves the window entirely (Apple: never leave a
  // decorative highlight stuck on-screen after the interaction ends).
  useEffect(() => {
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) reset();
    };
    const onBlur = () => reset();
    const onVisibility = () => {
      if (document.visibilityState !== "visible") reset();
    };
    window.addEventListener("pointerout", onOut);
    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reset]);

  // Both templates are created unconditionally (rules of hooks).
  const borderBackground = useMotionTemplate`
    linear-gradient(var(--background) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      var(--border) 100%
    ) border-box
  `;

  const spotlight = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ background: borderBackground }}
    >
      {/* Card fill (leaves a 1px gradient border) */}
      <div className="absolute inset-px z-20 rounded-[inherit] bg-background" />

      {gradientOpacity > 0 && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-[var(--magic-card-spotlight-opacity)]"
          style={
            {
              "--magic-card-spotlight-opacity": gradientOpacity,
              background: spotlight,
            } as MotionStyle
          }
        />
      )}

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
