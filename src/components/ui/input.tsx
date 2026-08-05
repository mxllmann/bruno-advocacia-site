import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-surface-2/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
