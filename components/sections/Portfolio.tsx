"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Expand, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { portfolio, portfolioCategories } from "@/lib/data/portfolio";

type Filter = "All" | (typeof portfolioCategories)[number];

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? portfolio
      : portfolio.filter((item) => item.category === filter);

  const openLightbox = useCallback((id: string) => {
    const idx = filtered.findIndex((item) => item.id === id);
    setLightboxIndex(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const next = (current + delta + filtered.length) % filtered.length;
        return next;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, step]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section id="portfolio" className="section-padding bg-warm-white/60">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Portfolio & Gallery"
          title="Celebrations we've brought to life"
          description="A curated selection of weddings, receptions, and styled events from our studio — filter by category or browse the full gallery."
        />

        <div
          data-reveal
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {(["All", ...portfolioCategories] as Filter[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "font-buttons rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-wider transition-all",
                filter === cat
                  ? "border-rose-gold bg-blush text-text shadow-[var(--shadow-soft)]"
                  : "border-linen text-text-muted hover:border-rose-gold/50 hover:text-rose-gold",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          layout
          data-reveal
          className="mb-14 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(item.id)}
                className={cn(
                  "group relative overflow-hidden rounded-[20px]",
                  item.span,
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-text/0 transition-all duration-300 group-hover:bg-text/30">
                  <Expand className="h-6 w-6 text-warm-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div data-reveal>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.15}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            className="!overflow-visible"
          >
            {portfolio.map((item) => (
              <SwiperSlide key={`slide-${item.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(v) => !v && closeLightbox()}>
        <DialogContent
          className="max-w-5xl border-none bg-transparent p-0 shadow-none"
          style={{ maxHeight: "none", overflow: "visible" }}
        >
          {activeItem && (
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] md:aspect-[16/10]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-warm-white/80 p-2 text-text shadow-[var(--shadow-soft)] transition-colors hover:bg-warm-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-warm-white/80 p-2 text-text shadow-[var(--shadow-soft)] transition-colors hover:bg-warm-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
