import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);

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
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 md:px-8">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-[20px] px-6 py-3 transition-all duration-500",
          isLightNav
            ? "glass-nav shadow-[var(--shadow-soft)]"
            : "glass-nav-dark",
        )}
      >
        <a href="#" className="group flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles
              className={cn(
                "h-4 w-4",
                isLightNav ? "text-gold" : "text-gold drop-shadow-sm",
              )}
            />
          </motion.span>
          <span
            className={cn(
              "hero-text-shadow font-script text-2xl md:text-3xl",
              isLightNav ? "text-text" : "text-luxury-white",
            )}
          >
            {BRAND.name}
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:text-gold",
                  isLightNav ? "text-text-muted" : "text-luxury-white/90",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button size="sm" asChild>
            <a href="#inquiry">Book Consultation</a>
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "rounded-full p-2 lg:hidden",
            isLightNav ? "text-text" : "text-luxury-white",
          )}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-nav mx-auto mt-2 max-w-7xl rounded-[20px] p-6 shadow-[var(--shadow-soft)] lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm uppercase tracking-wider text-text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Button className="w-full" asChild>
                  <a href="#inquiry" onClick={() => setOpen(false)}>
                    Book Consultation
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
