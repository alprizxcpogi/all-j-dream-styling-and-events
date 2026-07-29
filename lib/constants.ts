export const BRAND = {
  name: "All J Dream",
  full: "All J Dream Styling and Events",
  tagline: "Luxury Wedding Styling & Event Coordination",
  founder: "Jasmine",
  established: "2018",
};

// Placeholder business info — swap for the real details before launch.
export const BUSINESS = {
  email: "hello@alljdreamevents.com",
  phone: "(555) 123-4567",
  phoneRaw: "15551234567",
  whatsapp: "15551234567",
  messengerUsername: "alljdreamevents",
  address: "123 Celebration Ave, Suite 200, Metro City, ST 00000",
  location: "Serving the Greater Metro Area & Destination Events",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "10:00 AM – 4:00 PM" },
    { day: "Sunday", time: "By appointment only" },
  ],
  instagram: "@alljdreamevents",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  pinterestUrl: "https://pinterest.com",
  // Keyless embed — swap the query for the real business address before launch,
  // or upgrade to the Maps JavaScript API using NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.
  mapEmbedSrc:
    "https://www.google.com/maps?q=123+Celebration+Ave+Metro+City&output=embed",
};

export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alljdreamevents.com";
