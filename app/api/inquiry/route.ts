import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { sendBookingNotification } from "@/lib/email/resend";
import { getSupabaseServerClient } from "@/lib/supabase/client";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Dev-safe fallback: without real credentials this still logs and
  // returns success so the booking flow is fully testable end-to-end.
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("bookings").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      services: data.services,
      event_date: data.eventDate || null,
      venue: data.venue ?? null,
      guest_count: data.guestCount ?? null,
      budget: data.budget ?? null,
      special_requests: data.specialRequests ?? null,
      package_id: data.packageId ?? null,
    });
    if (error) {
      console.error("[inquiry] Supabase insert failed:", error.message);
    }
  } else {
    console.log("[inquiry] Supabase not configured — booking logged only:", data);
  }

  try {
    await sendBookingNotification(data);
  } catch (err) {
    console.error("[inquiry] Resend send failed:", err);
  }

  return NextResponse.json({ ok: true });
}
