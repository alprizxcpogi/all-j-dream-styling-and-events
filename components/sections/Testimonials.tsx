"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden bg-cream"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          subtitle="Client Love"
          title="What our clients say"
          description="Every celebration is a partnership — here's what it felt like from the other side."
        />

        <motion.div data-reveal>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testimonial-pagination" }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            className="!pb-4"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="h-auto pb-2">
                <blockquote className="glass-card card-luxury relative flex h-full flex-col p-8">
                  <Quote className="mb-4 h-7 w-7 text-gold/50" />
                  <p className="flex-1 text-sm italic leading-relaxed text-text-muted">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-5 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-gold text-gold"
                      />
                    ))}
                  </div>
                  <footer className="mt-4 flex items-center gap-3 border-t border-linen/60 pt-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={t.photo}
                        alt={t.author}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-heading text-base text-text">
                        {t.author}
                      </p>
                      <p className="text-xs text-text-muted">{t.relation}</p>
                    </div>
                  </footer>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonial-pagination mt-6 flex justify-center gap-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-linen [&_.swiper-pagination-bullet-active]:bg-rose-gold" />
        </motion.div>
      </div>
    </section>
  );
}
