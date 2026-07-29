import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We begin with a complimentary consultation to understand your vision, style, budget, and the feeling you want guests to carry home.",
  },
  {
    step: "02",
    title: "Design & Proposal",
    description:
      "A tailored concept board, mood imagery, and detailed proposal outlining services, timeline, and investment options.",
  },
  {
    step: "03",
    title: "Planning & Coordination",
    description:
      "Vendor sourcing, design refinements, site visits, and regular check-ins to keep every detail aligned with your vision.",
  },
  {
    step: "04",
    title: "Styling & Setup",
    description:
      "Our team brings the design to life — from ceremony florals to reception tablescapes — with precision and artistry.",
  },
  {
    step: "05",
    title: "Your Celebration",
    description:
      "On the day, we manage every moving piece behind the scenes so you can be fully present for your unforgettable moment.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-padding relative bg-cream">
      <div
        data-parallax="0.15"
        className="pointer-events-none absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-sage/15 blur-3xl"
      />

      <div className="mx-auto max-w-3xl">
        <SectionHeading
          subtitle="Our Process"
          title="From vision to celebration"
          description="A thoughtful, collaborative journey designed to make planning feel as joyful as the event itself."
        />

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 md:left-1/2 md:-translate-x-px" />

          {steps.map((item, i) => (
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
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="card-luxury ml-12 p-6 transition-transform duration-300 hover:-translate-y-1 md:ml-0">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
                    Step {item.step}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                <div className="h-3 w-3 rounded-full border-2 border-gold bg-cream shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
              </div>

              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
