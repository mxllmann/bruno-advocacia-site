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
        "min-h-32 w-full resize-y rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/25",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
