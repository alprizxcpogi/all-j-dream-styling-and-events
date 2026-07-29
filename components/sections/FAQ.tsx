"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faqs";

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-warm-white/60">
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
