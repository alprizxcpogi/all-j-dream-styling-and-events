import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { BRAND } from "@/lib/constants";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b8?auto=format&fit=crop&w=1920&q=80",
  "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    setImageIndex((i) => (i < HERO_IMAGES.length - 1 ? i + 1 : i));
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-text"
    >
      {/* Fallback gradient — always visible behind image */}
      <div className="absolute inset-0 bg-gradient-to-br from-text via-[#2a2520] to-[#3d3530]" />

      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <img
          key={HERO_IMAGES[imageIndex]}
          src={HERO_IMAGES[imageIndex]}
          alt=""
          aria-hidden="true"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      <ParticleBackground />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 pt-24 text-center md:pt-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="hero-text-shadow mb-4 text-xs font-medium uppercase tracking-[0.4em] text-luxury-white"
        >
          {BRAND.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-text-shadow font-script text-6xl leading-none text-luxury-white drop-shadow-lg md:text-8xl lg:text-[7rem]"
        >
          {BRAND.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="hero-text-shadow mt-4 font-display text-xl font-light tracking-wide text-luxury-white md:text-2xl"
        >
          Styling and Events
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hero-text-shadow mx-auto mt-8 max-w-xl text-base leading-relaxed text-luxury-white/95 md:text-lg"
        >
          We transform visions into breathtaking celebrations —
          <br />
          where every detail tells your story
          <br />
          and every moment feels unforgettable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a href="#inquiry">Book a Consultation</a>
          </Button>
          <Button variant="outline-light" size="lg" asChild>
            <a href="#services">Our Services</a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-luxury-white transition-colors hover:text-gold"
        aria-label="Scroll to about"
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
