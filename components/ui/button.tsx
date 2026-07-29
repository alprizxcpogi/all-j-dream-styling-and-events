"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-buttons relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blush text-text hover:bg-rose-gold hover:text-warm-white hover:shadow-[var(--shadow-glow)] hover:scale-[1.03] active:scale-[0.98]",
        rose: "bg-rose text-warm-white hover:bg-rose-dark hover:shadow-[var(--shadow-glow)] hover:scale-[1.03] active:scale-[0.98]",
        outline:
          "border border-rose-gold/40 bg-transparent text-text hover:bg-blush/20 hover:border-rose-gold hover:shadow-[var(--shadow-glow)]",
        "outline-light":
          "border border-warm-white/50 bg-warm-white/10 text-warm-white backdrop-blur-sm hover:bg-warm-white/20 hover:border-warm-white/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]",
        ghost: "text-text hover:bg-linen/60 hover:text-text",
        glass: "glass-nav text-text hover:shadow-[var(--shadow-soft)] hover:scale-[1.02]",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6 text-xs tracking-[0.15em] uppercase",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const ripple = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;border-radius:50%;pointer-events:none;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        background:rgba(255,255,255,0.4);transform:scale(0);
        animation:ripple 0.6s ease-out forwards;
      `;
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
      onClick?.(e);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={asChild ? onClick : handleClick}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
