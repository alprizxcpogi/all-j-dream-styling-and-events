"use client";

import type { ReactNode } from "react";
import { useLenis, useScrollReveal } from "@/hooks/useLenis";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useLenis();
  useScrollReveal();
  return <>{children}</>;
}
