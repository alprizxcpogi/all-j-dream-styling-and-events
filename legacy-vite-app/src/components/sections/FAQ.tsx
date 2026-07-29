import { motion } from "motion/react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of events do you coordinate?",
    a: "We specialize in weddings, engagement parties, bridal showers, anniversaries, corporate events, and luxury social celebrations. Every project receives the same level of care and attention to detail.",
  },
  {
    q: "How far in advance should we book?",
    a: "We recommend reaching out 12–18 months before your wedding and 6–9 months for other events. However, we occasionally accommodate shorter timelines — contact us to check availability.",
  },
  {
    q: "Do you travel for destination events?",
    a: "Yes! We love destination celebrations and regularly travel throughout the region and beyond. Travel fees are outlined in your custom proposal.",
  },
  {
    q: "What's included in a consultation?",
    a: "Your complimentary discovery call is a 30-minute conversation about your vision, event details, and how our services can support you. There's no obligation — just an opportunity to connect.",
  },
  {
    q: "Can we hire you for styling only?",
    a: "Absolutely. We offer à la carte styling services including floral design, tablescape styling, and day-of coordination — in addition to full planning packages.",
  },
  {
    q: "How are your packages priced?",
    a: "Every event is unique, so we create custom proposals based on your guest count, scope of services, and design complexity. Investment details are shared after your discovery call.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-luxury-white/50">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          subtitle="FAQ"
          title="Common questions"
          description="Everything you need to know before we begin planning your celebration."
        />

        <motion.div data-reveal>
          <Accordion type="single" collapsible className="card-luxury px-6 md:px-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
