"use client";

import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { packages, comparisonRows } from "@/lib/data/packages";
import { useBooking } from "@/components/booking/booking-context";

export function Packages() {
  const { openBooking } = useBooking();

  return (
    <section id="packages" className="section-padding bg-warm-white/60">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle="Packages"
          title="Investment tailored to your celebration"
          description="Every event is unique — these starting packages give you a sense of scope. Final proposals are customized after your discovery call."
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              data-reveal
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={cn(
                "relative flex flex-col rounded-[var(--radius-card)] border p-8 transition-all duration-500 hover:-translate-y-2",
                pkg.popular
                  ? "border-rose-gold bg-gradient-to-b from-blush/40 to-warm-white shadow-[var(--shadow-lift)] lg:-translate-y-4 lg:scale-[1.03]"
                  : "card-luxury",
              )}
            >
              {pkg.popular && (
                <span className="font-buttons absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-rose-gold px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-warm-white shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </span>
              )}

              <h3 className="font-heading text-2xl text-text">{pkg.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{pkg.description}</p>

              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-wider text-text-muted">
                  {pkg.cadence}
                </p>
                <p className="font-heading text-4xl text-rose-gold">
                  {pkg.price}
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose-gold" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={pkg.popular ? "default" : "outline"}
                className="mt-8 w-full"
                onClick={() => openBooking(pkg.id)}
              >
                Book Now
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          data-reveal
          className="card-luxury mt-16 overflow-x-auto p-6 md:p-8"
        >
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-linen">
                <th className="py-4 pr-4 font-heading text-base font-medium text-text">
                  Compare packages
                </th>
                {packages.map((pkg) => (
                  <th
                    key={pkg.id}
                    className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-rose-gold"
                  >
                    {pkg.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-linen/60 last:border-0">
                  <td className="py-4 pr-4 text-text-muted">{row.feature}</td>
                  {(["essential", "signature", "bespoke"] as const).map((key) => (
                    <td key={key} className="px-4 py-4 text-center">
                      {row[key] ? (
                        <Check className="mx-auto h-4 w-4 text-rose-gold" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-text-muted/30" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
