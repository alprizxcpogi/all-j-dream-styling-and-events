import { Instagram, Facebook, MapPin, Sparkles } from "lucide-react";
import { BRAND, BUSINESS, NAV_LINKS } from "@/lib/constants";

const galleryPreview = [
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=80",
  "https://images.pexels.com/photos/265722/pexels-photo-265722.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",
  "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=300&q=80",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-text text-warm-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="font-heading text-2xl italic text-warm-white">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-white/70">
              {BRAND.full} — crafting refined, emotionally resonant
              celebrations for the moments that matter most.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={BUSINESS.instagramUrl}
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-white/20 text-warm-white/80 transition-colors hover:border-blush hover:text-blush"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={BUSINESS.facebookUrl}
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-white/20 text-warm-white/80 transition-colors hover:border-blush hover:text-blush"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blush-light">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-white/70 transition-colors hover:text-blush"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blush-light">
              Business Hours
            </h3>
            <ul className="space-y-3">
              {BUSINESS.hours.map((h) => (
                <li key={h.day} className="text-sm text-warm-white/70">
                  <span className="block text-warm-white/90">{h.day}</span>
                  {h.time}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-start gap-2 text-sm text-warm-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {BUSINESS.location}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-blush-light">
              Instagram
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {galleryPreview.map((src, i) => (
                <a
                  key={i}
                  href={BUSINESS.instagramUrl}
                  className="aspect-square overflow-hidden rounded-[8px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-warm-white/10 pt-8 text-xs text-warm-white/50 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.full}. All rights
            reserved.
          </p>
          <p>Designed with love for unforgettable celebrations.</p>
        </div>
      </div>
    </footer>
  );
}
