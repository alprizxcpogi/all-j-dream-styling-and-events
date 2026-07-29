import { Resend } from "resend";
import type { BookingFormValues } from "@/lib/validations/booking";

let cachedClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) cachedClient = new Resend(apiKey);
  return cachedClient;
}

/**
 * Sends the booking notification email. No-ops (returns `{ sent: false }`)
 * when RESEND_API_KEY isn't configured, so the booking flow stays fully
 * functional in local/dev environments before real credentials exist.
 */
export async function sendBookingNotification(data: BookingFormValues) {
  const client = getResendClient();
  if (!client) return { sent: false as const };

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = process.env.RESEND_TO_EMAIL ?? data.email;

  await client.emails.send({
    from,
    to,
    subject: `New booking request from ${data.name}`,
    html: `
      <h2>New booking request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone ?? "—"}</p>
      <p><strong>Services:</strong> ${data.services.join(", ")}</p>
      <p><strong>Event date:</strong> ${data.eventDate ?? "—"}</p>
      <p><strong>Venue:</strong> ${data.venue ?? "—"}</p>
      <p><strong>Guest count:</strong> ${data.guestCount ?? "—"}</p>
      <p><strong>Budget:</strong> ${data.budget ?? "—"}</p>
      <p><strong>Notes:</strong> ${data.specialRequests ?? "—"}</p>
    `,
  });

  return { sent: true as const };
}
