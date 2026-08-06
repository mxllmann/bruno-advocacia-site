import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-y rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-gold/35 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
