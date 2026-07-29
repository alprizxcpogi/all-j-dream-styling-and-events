"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  className,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {subtitle && (
        <p
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-[0.3em]",
            light ? "text-blush-light" : "text-rose-gold",
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-4xl font-medium leading-tight md:text-5xl lg:text-6xl",
          light ? "text-warm-white" : "text-text",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            light ? "text-warm-white/85" : "text-text-muted",
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent",
          align === "center" && "mx-auto",
        )}
      />
    </motion.div>
  );
}
