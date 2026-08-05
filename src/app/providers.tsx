"use client";

import { MotionConfig } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Global providers:
 *
 * - MotionConfig reducedMotion="user" makes every Motion component honor the OS
 *   "reduce motion" setting — transform-based motion collapses to opacity,
 *   matching Apple's guidance that reduced motion means gentler, not none.
 *
 * - Lenis adds smooth, momentum-based scrolling (the "slow", floaty feel).
 *   A lower `lerp` means the viewport catches up to the target more gradually,
 *   which reads as heavier, more deliberate motion. Disabled entirely when the
 *   user prefers reduced motion — then native scroll takes over.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const content = <MotionConfig reducedMotion="user">{children}</MotionConfig>;

  if (reduced) return content;

  return (
    <ReactLenis
      root
      options={{
        // lower = floatier / slower catch-up (default is 0.1)
        lerp: 0.075,
        wheelMultiplier: 1,
        // smooth anchor jumps, offset for the fixed header
        anchors: { offset: -96 },
        // let touch devices use their native momentum (Apple: 1:1 native tracking)
        syncTouch: false,
      }}
    >
      {content}
    </ReactLenis>
  );
}
