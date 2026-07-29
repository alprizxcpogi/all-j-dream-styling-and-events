"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { FloatingPetals } from "@/components/effects/FloatingPetals";
import { BRAND } from "@/lib/constants";
import { useBooking } from "@/components/booking/booking-context";

// Swap for a real cinematic clip later — falls back to the Ken Burns image treatment if empty.
const HERO_VIDEO_URL = "";
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { openBooking } = useBooking();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const layerX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const layerY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  return (
    <section
      ref={ref}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-text"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-text via-[#3a2f2c] to-[#4a3835]" />

      <motion.div
        style={{ scale: scrollScale, x: layerX, y: layerY }}
        className="absolute inset-0 scale-105"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {HERO_VIDEO_URL ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_IMAGE}
              className="h-full w-full object-cover"
            >
              <source src={HERO_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </motion.div>
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      <FloatingPetals count={10} className="pointer-events-none absolute inset-0 z-[2]" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center md:pt-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hero-text-shadow mb-5 text-xs font-medium uppercase tracking-[0.4em] text-blush-light"
        >
          {BRAND.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-text-shadow font-heading text-5xl leading-[1.05] text-warm-white drop-shadow-lg md:text-7xl lg:text-8xl"
        >
          Creating Dream Weddings
          <br />
          <span className="italic text-blush-light">
            Filled with Love &amp; Elegance
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="hero-text-shadow mx-auto mt-8 max-w-xl text-base leading-relaxed text-warm-white/95 md:text-lg"
        >
          Boutique wedding styling and event coordination — where every detail
          is curated, every moment is intentional, and every celebration
          feels like a dream brought to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <Button size="lg" onClick={() => openBooking()}>
              Book Consultation
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button variant="outline-light" size="lg" asChild>
              <a href="#portfolio">View Portfolio</a>
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-warm-white transition-colors hover:text-blush-light"
        aria-label="Scroll to about section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 drop-shadow-md" />
        </motion.div>
      </motion.a>
    </section>
  );
}
