import { motion } from "motion/react";
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
    href: `tel:${BUSINESS.phone.replace(/\D/g, "")}`,
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
    href: "#inquiry",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-cream">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          subtitle="Contact"
          title="We'd love to hear from you"
          description="Ready to start planning? Reach out directly or submit an inquiry above."
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
              <div className="mb-4 rounded-full border border-gold/20 bg-gold/5 p-3 transition-colors group-hover:bg-gold/10">
                <contact.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="text-xs uppercase tracking-wider text-text-muted">
                {contact.label}
              </p>
              <p className="mt-2 text-sm font-medium text-text">{contact.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.div data-reveal className="mt-16 text-center">
          <p className="font-script text-4xl text-gold md:text-5xl">
            Let's make it unforgettable
          </p>
          <p className="mt-2 font-display text-2xl text-text">{BRAND.full}</p>
        </motion.div>
      </div>
    </section>
  );
}
