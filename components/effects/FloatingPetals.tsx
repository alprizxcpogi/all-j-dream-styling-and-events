"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface FloatingPetalsProps {
  count?: number;
  className?: string;
}

function PetalShape({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 28"
      className={className}
      style={style}
      fill="currentColor"
    >
      <path d="M12 0C18 6 24 12 12 28C0 12 6 6 12 0Z" />
    </svg>
  );
}

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  color: string;
}

export function FloatingPetals({ count = 14, className }: FloatingPetalsProps) {
  // Generated client-side only (post-mount) since Math.random() would
  // otherwise differ between the server-rendered and hydrated markup.
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        duration: 14 + Math.random() * 12,
        delay: -(Math.random() * 20),
        drift: (Math.random() - 0.5) * 160,
        opacity: 0.25 + Math.random() * 0.35,
        color: i % 3 === 0 ? "text-gold-soft" : i % 3 === 1 ? "text-rose" : "text-blush-dark",
      })),
    );
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={className ?? "pointer-events-none fixed inset-0 z-[1] overflow-hidden"}
    >
      {petals.map((p) => (
        <PetalShape
          key={p.id}
          className={`absolute top-0 ${p.color}`}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.2,
              opacity: p.opacity,
              "--drift-x": `${p.drift}px`,
              animation: `drift-down ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
