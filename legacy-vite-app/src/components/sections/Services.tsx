import { motion } from "motion/react";
import {
  CalendarHeart,
  Palette,
  Sparkles,
  Flower2,
  Building2,
  ClipboardList,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const services = [
  {
    icon: CalendarHeart,
    title: "Full Wedding Coordination",
    description:
      "End-to-end planning from engagement to send-off — vendor management, timelines, and flawless day-of execution.",
  },
  {
    icon: Palette,
    title: "Event Styling & Design",
    description:
      "Cohesive visual direction across every touchpoint — color palettes, stationery, signage, and immersive décor concepts.",
  },
  {
    icon: ClipboardList,
    title: "Day-of Coordination",
    description:
      "You've planned the details — we step in to manage the flow, vendors, and surprises so you can enjoy every moment.",
  },
  {
    icon: Flower2,
    title: "Floral & Tablescape Design",
    description:
      "Artfully composed centerpieces, ceremony installations, and reception tablescapes that elevate your aesthetic.",
  },
  {
    icon: Sparkles,
    title: "Luxury Social Events",
    description:
      "Milestone birthdays, anniversaries, bridal showers, and private dinners styled with the same care as our weddings.",
  },
  {
    icon: Building2,
    title: "Corporate & Brand Events",
    description:
      "Polished launches, galas, and brand experiences designed to leave a lasting impression on every guest.",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-luxury-white/50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Services"
          title="Curated experiences, flawlessly delivered"
          description="Whether you need full planning support or expert styling for your special day, we tailor our services to your vision and budget."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="card-luxury group p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="mb-5 inline-flex rounded-full border border-gold/20 bg-gold/5 p-3 transition-colors group-hover:bg-gold/10">
                <service.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-xl font-medium text-text">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
