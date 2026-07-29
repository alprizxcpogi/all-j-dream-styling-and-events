"use client";

import { motion } from "framer-motion";
import { Mail, Phone, AtSign, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { BUSINESS, BRAND } from "@/lib/constants";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: BUSINESS.phone,
    href: `tel:${BUSINESS.phoneRaw}`,
  },
  {
    icon: AtSign,
    label: "Instagram",
    value: BUSINESS.instagram,
    href: BUSINESS.instagramUrl,
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: BUSINESS.location,
    href: "#",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-cream">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          subtitle="Contact"
          title="We'd love to hear from you"
          description="Ready to start planning? Reach out directly or submit a booking request above."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              data-reveal
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-luxury group flex flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="mb-4 rounded-full border border-gold/25 bg-gold/5 p-3 transition-colors group-hover:bg-blush/25">
                <contact.icon className="h-5 w-5 text-rose-gold" />
              </div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                {contact.label}
              </p>
              <p className="mt-2 text-sm font-medium text-text">
                {contact.value}
              </p>
            </motion.a>
          ))}
        </div>

        <motion.div
          data-reveal
          className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-linen/70 shadow-[var(--shadow-soft)]"
        >
          <iframe
            title="Studio location map"
            src={BUSINESS.mapEmbedSrc}
            className="h-80 w-full grayscale-[20%] md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div data-reveal className="mt-16 text-center">
          <p className="font-heading text-3xl italic text-rose-gold md:text-4xl">
            Let&rsquo;s make it unforgettable
          </p>
          <p className="mt-2 font-heading text-2xl text-text">{BRAND.full}</p>
        </motion.div>
      </div>
    </section>
  );
}
