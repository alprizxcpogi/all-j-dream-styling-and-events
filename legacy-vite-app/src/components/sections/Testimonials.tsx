import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "All J Dream transformed our wedding into something beyond our wildest dreams. Every detail was intentional, elegant, and absolutely flawless.",
    author: "Sarah & Michael",
    relation: "Wedding Clients",
  },
  {
    quote:
      "Jasmine has an incredible eye for design. Our corporate gala felt like a luxury brand experience — our guests are still talking about it months later.",
    author: "Diana Reyes",
    relation: "Corporate Event Director",
  },
  {
    quote:
      "From our first consultation to the final dance, the team was professional, warm, and obsessively detail-oriented. Worth every penny.",
    author: "Emily & James",
    relation: "Anniversary Celebration",
  },
];

export function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Client Love
          </p>
          <h2 className="mt-3 font-display text-3xl text-text md:text-4xl">
            What our clients say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-luxury relative p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <Quote className="mb-4 h-5 w-5 text-gold/40" />
              <p className="text-sm leading-relaxed italic text-text-muted">
                "{t.quote}"
              </p>
              <footer className="mt-6 border-t border-linen/60 pt-4">
                <p className="font-display text-base text-text">{t.author}</p>
                <p className="text-xs text-text-muted">{t.relation}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
