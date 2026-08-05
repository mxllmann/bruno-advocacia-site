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
        "h-12 w-full rounded-xl border border-border bg-surface-2/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-[border-color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-border/80 focus:border-gold/60 focus:bg-surface-2/70 focus:outline-none focus:ring-2 focus:ring-gold/20",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
