"use client";

import { motion } from "framer-motion";
import {
  Heart,
  UtensilsCrossed,
  Church,
  ClipboardList,
  Crown,
  Cake,
  Briefcase,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { services, type ServiceItem } from "@/lib/data/services";

const ICONS: Record<ServiceItem["icon"], LucideIcon> = {
  heart: Heart,
  utensils: UtensilsCrossed,
  church: Church,
  clipboard: ClipboardList,
  crown: Crown,
  cake: Cake,
  briefcase: Briefcase,
  sparkles: Sparkles,
};

export function Services() {
  return (
    <section id="services" className="section-padding bg-warm-white/60">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Services"
          title="Curated experiences, flawlessly delivered"
          description="Whether you need full planning support or expert styling for your special day, we tailor our services to your vision and budget."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div
                key={service.slug}
                data-reveal
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.6 }}
                className="card-luxury group p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]"
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-5 inline-flex rounded-full border border-gold/25 bg-gold/5 p-3 transition-colors group-hover:bg-blush/25"
                >
                  <Icon className="h-5 w-5 text-rose-gold" />
                </motion.div>
                <h3 className="font-heading text-lg font-medium text-text">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
