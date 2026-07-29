import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-luxury-white hover:shadow-[var(--shadow-glow)] hover:scale-[1.03] active:scale-[0.98]",
        outline:
          "border border-gold/40 bg-transparent text-text hover:bg-gold/10 hover:border-gold hover:shadow-[var(--shadow-glow)]",
        "outline-light":
          "border border-luxury-white/50 bg-luxury-white/10 text-luxury-white backdrop-blur-sm hover:bg-luxury-white/20 hover:border-luxury-white/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
        ghost:
          "text-text hover:bg-linen/50 hover:text-text",
        glass:
          "glass-nav text-text hover:shadow-[var(--shadow-soft)] hover:scale-[1.02]",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-6 text-xs tracking-wider uppercase",
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
        background:rgba(255,255,255,0.35);transform:scale(0);
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
