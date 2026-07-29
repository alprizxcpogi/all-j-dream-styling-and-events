"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, PartyPopper, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useBooking } from "@/components/booking/booking-context";
import {
  bookingSchema,
  bookingStepFields,
  budgetRanges,
  type BookingFormValues,
} from "@/lib/validations/booking";
import { services } from "@/lib/data/services";
import { packages } from "@/lib/data/packages";

const STEP_LABELS = ["Your Details", "Event Details", "Final Touches"];

export function BookingDialog() {
  const { isOpen, closeBooking, preselectedPackage } = useBooking();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const {
    register,
    control,
    handleSubmit,
    trigger,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      services: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      setValue("packageId", preselectedPackage ?? undefined);
      if (preselectedPackage) {
        const pkg = packages.find((p) => p.id === preselectedPackage);
        if (pkg) setValue("services", [pkg.name]);
      }
    }
  }, [isOpen, preselectedPackage, setValue]);

  const selectedServices = watch("services") ?? [];

  const goNext = async () => {
    const valid = await trigger(bookingStepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: BookingFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      closeBooking();
      window.setTimeout(() => {
        setStep(0);
        setStatus("idle");
        reset({ services: [] });
      }, 300);
    }
  };

  const toggleService = (title: string) => {
    const next = selectedServices.includes(title)
      ? selectedServices.filter((s) => s !== title)
      : [...selectedServices, title];
    setValue("services", next, { shouldValidate: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blush/40">
              <PartyPopper className="h-8 w-8 text-rose-gold" />
            </div>
            <DialogTitle className="text-center">
              Your request is in!
            </DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-center">
              Thank you for sharing your vision with us. We&rsquo;ll reach out
              within 48 hours to schedule your complimentary consultation.
            </DialogDescription>
            <Button className="mt-8" onClick={() => handleClose(false)}>
              Done
            </Button>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Book Your Consultation</DialogTitle>
              <DialogDescription>
                Tell us about your celebration — it takes less than two
                minutes.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-2">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                      i < step
                        ? "bg-rose-gold text-warm-white"
                        : i === step
                          ? "bg-blush text-text"
                          : "bg-linen text-text-muted",
                    )}
                  >
                    {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={cn(
                        "h-px flex-1 transition-colors",
                        i < step ? "bg-rose-gold" : "bg-linen",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Your name" {...register("name")} />
                        {errors.name && (
                          <p className="text-xs text-rose-dark">{errors.name.message}</p>
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
                          <p className="text-xs text-rose-dark">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" type="tel" placeholder="(555) 000-0000" {...register("phone")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Which services are you interested in?</Label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {services.map((s) => (
                          <button
                            type="button"
                            key={s.slug}
                            onClick={() => toggleService(s.title)}
                            className={cn(
                              "rounded-[12px] border px-3 py-2 text-left text-xs font-medium transition-colors",
                              selectedServices.includes(s.title)
                                ? "border-rose-gold bg-blush/40 text-text"
                                : "border-linen text-text-muted hover:border-rose-gold/40",
                            )}
                          >
                            {s.title}
                          </button>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="text-xs text-rose-dark">{errors.services.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input id="eventDate" type="date" {...register("eventDate")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guestCount">Estimated Guest Count</Label>
                        <Input id="guestCount" placeholder="e.g. 120" {...register("guestCount")} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue (if known)</Label>
                      <Input
                        id="venue"
                        placeholder="Venue name or city"
                        {...register("venue")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Estimated Budget</Label>
                      <Controller
                        control={control}
                        name="budget"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">
                        Tell us about your vision (optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        placeholder="Style inspiration, must-have details, anything else we should know..."
                        {...register("specialRequests")}
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-xs text-rose-dark">
                        Something went wrong sending your request — please try
                        again.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
                  className={cn(step === 0 && "invisible")}
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </Button>

                {step < STEP_LABELS.length - 1 ? (
                  <Button type="button" size="sm" onClick={goNext}>
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" size="sm" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <span className="shimmer inline-block h-4 w-20 rounded" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Submit Request
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
