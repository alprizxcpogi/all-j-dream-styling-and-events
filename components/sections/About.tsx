"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { BRAND } from "@/lib/constants";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80";

const stats = [
  { value: 150, suffix: "+", label: "Events Styled" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 320, suffix: "+", label: "Happy Couples" },
  { value: 99, suffix: "%", label: "Positive Reviews" },
];

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    let raf: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden bg-cream"
    >
      <div
        data-parallax="0.2"
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-rose/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="About Us"
          title="Where dreams become beautifully real"
          description={`${BRAND.full} is a boutique event styling and coordination studio dedicated to creating refined, emotionally resonant celebrations.`}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div data-reveal className="relative">
            <div className="overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
              <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.6 }}>
                <Image
                  src={ABOUT_IMAGE}
                  alt="Elegant event tablescape styled in blush and gold"
                  width={900}
                  height={1125}
                  className="aspect-[4/5] w-full object-cover"
                />
              </motion.div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden rounded-[var(--radius-card)] border border-linen/70 bg-warm-white/90 p-6 shadow-[var(--shadow-soft)] md:block">
              <p className="font-heading text-3xl italic text-rose-gold">
                Est. {BRAND.established}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-text-muted">
                Crafting celebrations
              </p>
            </div>
          </motion.div>

          <motion.div data-reveal className="space-y-6">
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              Founded by {BRAND.founder}, our studio blends editorial design
              sensibility with meticulous coordination — ensuring your event
              is as seamless behind the scenes as it is stunning in every
              photograph.
            </p>
            <p className="text-base leading-relaxed text-text-muted md:text-lg">
              From intimate gatherings to grand celebrations, we partner with
              you to curate every floral arrangement, tablescape, and
              timeline detail — so you can be fully present for the moments
              that matter most.
            </p>
            <p className="font-heading text-xl italic text-text">
              &ldquo;Every celebration deserves to feel as extraordinary as
              the love it honors.&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="card-luxury p-4 text-center transition-transform duration-300 hover:-translate-y-1"
                >
                  <p className="font-heading text-2xl font-medium text-rose-gold md:text-3xl">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
