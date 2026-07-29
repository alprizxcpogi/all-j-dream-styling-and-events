"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { FloatingPetals } from "@/components/effects/FloatingPetals";

const SESSION_KEY = "ajd-intro-seen";
const PHASE_DURATIONS = {
  text1: 900,
  text2: 1500,
  line: 2100,
  fadeOut: 2500,
  curtain: 2900,
};

export function IntroLoader() {
  const [phase, setPhase] = useState<
    "playing" | "fading" | "curtain" | "done"
  >("playing");
  const [skip, setSkip] = useState(false);

  const finish = useCallback(() => {
    setPhase("curtain");
    window.setTimeout(() => setPhase("done"), 500);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (alreadySeen || reducedMotion) {
      setPhase("done");
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    const t1 = window.setTimeout(
      () => setPhase("fading"),
      PHASE_DURATIONS.fadeOut,
    );
    const t2 = window.setTimeout(
      () => setPhase("curtain"),
      PHASE_DURATIONS.curtain,
    );
    const t3 = window.setTimeout(() => setPhase("done"), 3300);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = window.setTimeout(() => setSkip(true), 400);
    return () => window.clearTimeout(t);
  }, [phase]);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, "1");
    finish();
  }, [finish]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {(
        <div className="fixed inset-0 z-[100]" role="dialog" aria-label="Intro animation">
          {/* Curtain panels */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "curtain" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-warm-white"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "curtain" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-warm-white"
          />

          <motion.div
            animate={{ opacity: phase === "fading" || phase === "curtain" ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-warm-white"
          >
            <FloatingPetals count={16} className="pointer-events-none absolute inset-0" />

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 mb-6"
            >
              <Sparkles className="h-9 w-9 text-gold" strokeWidth={1.5} />
            </motion.div>

            <div className="relative z-10 h-20 px-6 text-center">
              <AnimatePresence mode="wait">
                {phase === "playing" && (
                  <TextSwap key="intro-text" />
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 96, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.9, ease: "easeInOut" }}
              className="relative z-10 mt-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            />
          </motion.div>

          {skip && phase === "playing" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleSkip}
              className="font-buttons absolute bottom-8 right-8 z-20 rounded-full border border-gold/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-text-muted transition-colors hover:border-rose-gold hover:text-rose-gold"
            >
              Skip
            </motion.button>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

function TextSwap() {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowSecond(true), PHASE_DURATIONS.text1);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showSecond ? (
        <motion.p
          key="line1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-2xl italic text-text-muted md:text-3xl"
        >
          Creating Beautiful Moments
        </motion.p>
      ) : (
        <motion.p
          key="line2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl text-text md:text-4xl"
        >
          {BRAND.full}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
