import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[16px] border border-linen bg-warm-white/60 px-5 py-2 text-sm text-text transition-all placeholder:text-text-muted/60 focus-visible:border-rose-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold/30 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
