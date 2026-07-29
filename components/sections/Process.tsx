"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/lib/data/process";
import { getGsap } from "@/lib/gsap";

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = getGsap();
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="process" className="section-padding relative bg-cream">
      <div
        data-parallax="0.15"
        className="pointer-events-none absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-blush/20 blur-3xl"
      />

      <div className="mx-auto max-w-3xl">
        <SectionHeading
          subtitle="Our Process"
          title="From vision to celebration"
          description="A thoughtful, collaborative journey designed to make planning feel as joyful as the event itself."
        />

        <div ref={containerRef} className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-linen md:left-1/2 md:-translate-x-px" />
          <div
            ref={lineRef}
            style={{ transformOrigin: "top" }}
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-gold via-rose-gold to-blush md:left-1/2 md:-translate-x-px"
          />

          {processSteps.map((item, i) => (
            <motion.div
              key={item.title}
              data-reveal
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`relative mb-12 flex items-start gap-8 md:mb-16 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div
                className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
              >
                <div className="card-luxury ml-12 p-6 transition-transform duration-300 hover:-translate-y-1 md:ml-0">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-gold">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-medium text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                <div className="h-3 w-3 rounded-full border-2 border-gold bg-cream shadow-[0_0_12px_rgba(201,160,92,0.45)]" />
              </div>

              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
