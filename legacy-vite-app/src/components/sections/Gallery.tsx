import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b8?w=800&q=80",
    alt: "Luxury reception styling",
    span: "md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    alt: "Elegant tablescape design",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    alt: "Ceremony floral installation",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    alt: "Reception lounge styling",
    span: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1520854221256-17451cc791c8?w=800&q=80",
    alt: "Bridal bouquet details",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    alt: "Garden wedding celebration",
    span: "md:row-span-2",
  },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="portfolio" className="section-padding bg-luxury-white/50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Portfolio"
          title="Celebrations we've brought to life"
          description="A curated selection of weddings, social events, and styled experiences from our studio."
        />

        <motion.div
          data-reveal
          className="mb-12 grid auto-rows-[200px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4"
        >
          {photos.map((photo) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightbox(photo.src)}
              className={`group relative overflow-hidden rounded-[20px] ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-text/0 transition-all duration-300 group-hover:bg-text/30">
                <Expand className="h-6 w-6 text-luxury-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </motion.div>

        <motion.div data-reveal className="relative">
          <div className="overflow-hidden rounded-[20px]" ref={emblaRef}>
            <div className="flex">
              {photos.map((photo) => (
                <div
                  key={`slide-${photo.src}`}
                  className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <div className="p-2">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="aspect-[4/3] w-full rounded-[16px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-3">
            <Button variant="outline" size="icon" onClick={scrollPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          {lightbox && (
            <img
              src={lightbox.replace("w=800", "w=1600")}
              alt="Gallery preview"
              className="w-full rounded-[20px] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
