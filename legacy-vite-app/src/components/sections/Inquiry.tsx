import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Check, Send } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit about your event"),
});

type InquiryForm = z.infer<typeof inquirySchema>;

const eventTypes = [
  "Wedding",
  "Engagement Party",
  "Bridal Shower",
  "Anniversary",
  "Corporate Event",
  "Social Celebration",
  "Other",
];

export function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (_data: InquiryForm) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="section-padding relative bg-cream">
      <div
        data-parallax="0.1"
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl"
      />

      <div className="mx-auto max-w-2xl">
        <SectionHeading
          subtitle="Inquire"
          title="Let's create something beautiful"
          description="Tell us about your upcoming celebration. We'll reach out within 48 hours to schedule your complimentary consultation."
        />

        <motion.div
          data-reveal
          className="card-luxury relative overflow-hidden p-8 md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 shimmer opacity-50" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative py-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
                <Check className="h-8 w-8 text-sage" />
              </div>
              <h3 className="font-display text-2xl text-text">Thank you!</h3>
              <p className="mt-3 text-text-muted">
                Your inquiry has been received. We can't wait to learn more about
                your celebration.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-rose">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 000-0000"
                    {...register("phone")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <select
                    id="eventType"
                    className="flex h-12 w-full rounded-[20px] border border-linen bg-luxury-white/60 px-5 py-2 text-sm text-text transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:border-gold/40"
                    {...register("eventType")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="text-xs text-rose">{errors.eventType.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date (optional)</Label>
                  <Input id="eventDate" type="date" {...register("eventDate")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Estimated Guest Count</Label>
                  <Input
                    id="guestCount"
                    placeholder="e.g. 120"
                    {...register("guestCount")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Tell Us About Your Vision</Label>
                <Textarea
                  id="message"
                  placeholder="Share your event details, style inspiration, and any questions..."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-rose">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="shimmer inline-block h-4 w-24 rounded" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
