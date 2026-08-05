"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";

type RoughAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

type HighlighterProps = {
  children: ReactNode;
  action?: RoughAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  /** wait until scrolled into view before drawing */
  isView?: boolean;
  className?: string;
};

export function Highlighter({
  children,
  action = "underline",
  color = "#c2a878",
  strokeWidth = 1.5,
  animationDuration = 800,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = true,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(elementRef, { once: true, margin: "-10%" });
  const shouldShow = !isView || isInView;

  useEffect(() => {
    if (!shouldShow) return;
    const element = elementRef.current;
    if (!element) return;

    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    // Wait for web fonts before measuring so the underline doesn't get drawn
    // at the fallback-font position and then jump (a common source of jank).
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      if (cancelled || !elementRef.current) return;
      annotation.show();

      // Only redraw when this element itself changes size (e.g. on resize),
      // never on every body mutation.
      resizeObserver = new ResizeObserver(() => {
        annotation.hide();
        annotation.show();
      });
      resizeObserver.observe(element);
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      annotation.remove();
    };
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ]);

  return (
    <span ref={elementRef} className={className}>
      {children}
    </span>
  );
}
