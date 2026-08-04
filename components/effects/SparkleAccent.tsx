import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SparkleAccentProps {
  className?: string;
  count?: number;
}

const POSITIONS = [
  { top: "10%", left: "6%", size: 10, delay: "0s" },
  { top: "70%", left: "94%", size: 14, delay: "0.8s" },
  { top: "85%", left: "12%", size: 8, delay: "1.6s" },
  { top: "20%", left: "92%", size: 10, delay: "2.4s" },
];

/**
 * Decorative twinkling sparkles — purely ambient, sits behind content.
 */
export function SparkleAccent({ className, count = 4 }: SparkleAccentProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {POSITIONS.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="absolute text-gold"
          style={{
            top: p.top,
            left: p.left,
            animation: `sparkle 3.5s ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          <Sparkle size={p.size} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}
