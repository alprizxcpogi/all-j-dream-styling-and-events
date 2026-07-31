"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useBooking } from "@/components/booking/booking-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setOverHero(y < window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLightNav = scrolled || !overHero;

  return (
    <header className="fixed top-0 right-0 left-0 z-40 px-3 pt-3 sm:px-4 sm:pt-4 md:px-8">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-[20px] px-4 py-2.5 transition-all duration-500 sm:px-5 sm:py-3 md:px-6",
          isLightNav ? "glass-nav shadow-[var(--shadow-soft)]" : "glass-nav-dark",
        )}
      >
        <a href="#hero" className="group flex shrink-0 items-center gap-1.5 sm:gap-2">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles
              className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isLightNav ? "text-gold" : "text-gold drop-shadow-sm")}
            />
          </motion.span>
          <span
            className={cn(
              "hero-text-shadow font-heading text-base italic sm:text-lg md:text-xl lg:text-2xl",
              isLightNav ? "text-text" : "text-warm-white",
            )}
          >
            {BRAND.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1.5 sm:flex md:gap-3 lg:gap-4 xl:gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className={cn(
                  "group relative whitespace-nowrap text-[9.5px] font-medium uppercase tracking-tight transition-colors sm:text-[10px] md:text-[11px] md:tracking-[0.08em] xl:text-xs xl:tracking-[0.15em]",
                  isLightNav ? "text-text-muted hover:text-rose-gold" : "text-warm-white/90 hover:text-blush-light",
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 sm:block">
          <Button
            onClick={() => openBooking()}
            className="h-8 px-3 text-[9.5px] tracking-tight sm:h-9 sm:px-3 sm:text-[10px] md:h-10 md:px-6 md:text-xs"
          >
            Book Now
          </Button>
        </div>

        <button
          type="button"
          className={cn("shrink-0 rounded-full p-2.5 sm:hidden", isLightNav ? "text-text" : "text-warm-white")}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-nav mx-auto mt-2 max-w-7xl rounded-[20px] p-6 shadow-[var(--shadow-soft)] sm:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm uppercase tracking-wider text-text-muted transition-colors hover:text-rose-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    openBooking();
                  }}
                >
                  Book Now
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
