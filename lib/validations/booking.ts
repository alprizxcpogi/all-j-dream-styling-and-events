import { z } from "zod";

export const budgetRanges = [
  "Under $5,000",
  "$5,000 – $10,000",
  "$10,000 – $20,000",
  "$20,000 – $40,000",
  "$40,000+",
] as const;

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  eventDate: z.string().optional(),
  venue: z.string().optional(),
  guestCount: z.string().optional(),
  budget: z.enum(budgetRanges).optional(),
  specialRequests: z.string().optional(),
  packageId: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const bookingStepFields: Record<number, (keyof BookingFormValues)[]> = {
  0: ["name", "email", "phone", "services"],
  1: ["eventDate", "venue", "guestCount", "budget"],
  2: ["specialRequests"],
};
