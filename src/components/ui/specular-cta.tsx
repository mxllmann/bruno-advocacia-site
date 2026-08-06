"use client";

import { useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import SpecularButton from "./specular-button";

type SpecularCtaProps = {
  children: ReactNode;
  /** Anchor (e.g. "#contato") or external URL. Internal #hash uses Lenis smooth scroll. */
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

/**
 * Brand wrapper around SpecularButton (reactbits.dev). The specular rim colors
 * are shader uniforms (plain hex, not CSS vars), so we swap them with the theme;
 * the text color rides on `--foreground` so it flips automatically. For a #hash
 * target we synthesize an anchor click so Lenis's own handler smooth-scrolls it.
 */
export function SpecularCta({
  children,
  href,
  onClick,
  size = "lg",
  type = "button",
  disabled,
  className,
}: SpecularCtaProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setIsDark(el.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (!href) return;
    if (href.startsWith("#")) {
      const a = document.createElement("a");
      a.href = href;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <SpecularButton
      size={size}
      type={type}
      radius={999}
      disabled={disabled}
      // Click + hover feedback beyond the rim: a soft gold fill that deepens on
      // press (the component already adds active:scale for the tactile push).
      className={cn(
        "hover:bg-gold/10 active:bg-gold/20",
        className,
      )}
      textColor="var(--foreground)"
      // Resting outline matches the WhatsApp button's border (var(--gold));
      // the specular highlight (line) stays brighter for the shine on hover.
      baseColor={isDark ? "#c2a878" : "#8f6c2e"}
      lineColor={isDark ? "#f3e8c8" : "#dcc487"}
      intensity={1.15}
      thickness={1.1}
      shineSize={12}
      shineFade={44}
      proximity={260}
      onClick={handleClick}
    >
      {children}
    </SpecularButton>
  );
}
