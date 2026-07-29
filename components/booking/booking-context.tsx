"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface BookingContextValue {
  isOpen: boolean;
  preselectedPackage: string | null;
  openBooking: (packageId?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState<string | null>(
    null,
  );

  const value = useMemo(
    () => ({
      isOpen,
      preselectedPackage,
      openBooking: (packageId?: string) => {
        setPreselectedPackage(packageId ?? null);
        setIsOpen(true);
      },
      closeBooking: () => setIsOpen(false),
    }),
    [isOpen, preselectedPackage],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
