"use client";

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/effects/TextReveal";

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
        <TextReveal text={title} delay={0.1} />
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
          "relative mt-8 flex items-center",
          align === "center" && "mx-auto justify-center",
        )}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <motion.span
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <Sparkle className="h-3 w-3 text-gold" fill="currentColor" strokeWidth={0} />
        </motion.span>
      </div>
    </motion.div>
  );
}
