"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reducedMotion) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest(INTERACTIVE_SELECTOR));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ left: x, top: y, opacity: visible ? 1 : 0 }}
        className="pointer-events-none fixed z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-gold mix-blend-multiply transition-opacity duration-200"
      />
      <motion.div
        aria-hidden="true"
        style={{ left: ringX, top: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          scale: hovering ? 1.8 : 1,
          backgroundColor: hovering ? "rgba(242,201,206,0.25)" : "rgba(242,201,206,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none fixed z-[89] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-gold/50 transition-opacity duration-200"
      />
    </>
  );
}
