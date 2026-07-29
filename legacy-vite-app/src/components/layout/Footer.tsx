import { Sparkles } from "lucide-react";
import { BRAND, BUSINESS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-linen/60 bg-luxury-white/50 section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Sparkles className="mb-4 h-5 w-5 text-gold" />
          <p className="font-script text-4xl text-text md:text-5xl">
            {BRAND.name}
          </p>
          <p className="mt-2 font-display text-lg text-text-muted">
            Styling and Events
          </p>
          <p className="mt-3 text-sm text-text-muted">{BUSINESS.location}</p>
          <p className="mt-8 max-w-md text-xs leading-relaxed text-text-muted/80">
            Luxury event styling and coordination for weddings, celebrations, and
            corporate experiences — crafted with elegance, executed with precision.
          </p>
          <div className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-text-muted/60">
            © {new Date().getFullYear()} {BRAND.full}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
