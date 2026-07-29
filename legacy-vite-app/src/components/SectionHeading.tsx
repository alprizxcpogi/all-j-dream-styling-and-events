import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  subtitle,
  title,
  description,
  className,
  align = "center",
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
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
          {subtitle}
        </p>
      )}
      <h2 className="font-display text-4xl font-medium leading-tight text-text md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
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
