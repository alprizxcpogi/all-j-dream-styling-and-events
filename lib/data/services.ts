// Placeholder content shaped to mirror a future Sanity `service` document —
// swap this static array for a sanityFetch() query later without touching Services.tsx.
export interface ServiceItem {
  slug: string;
  icon:
    | "heart"
    | "utensils"
    | "church"
    | "clipboard"
    | "crown"
    | "cake"
    | "briefcase"
    | "sparkles";
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    slug: "wedding-styling",
    icon: "heart",
    title: "Wedding Styling",
    description:
      "Cohesive visual direction for your ceremony and reception — palettes, florals, and décor concepts tailored to your love story.",
  },
  {
    slug: "reception-styling",
    icon: "utensils",
    title: "Reception Styling",
    description:
      "Artfully composed tablescapes, lounge styling, and lighting design that transform any venue into an unforgettable scene.",
  },
  {
    slug: "church-decoration",
    icon: "church",
    title: "Church Decoration",
    description:
      "Elegant ceremony florals, aisle treatments, and altar installations designed with reverence and refined beauty.",
  },
  {
    slug: "event-coordination",
    icon: "clipboard",
    title: "Event Coordination",
    description:
      "End-to-end planning and day-of management — vendor coordination, timelines, and flawless execution from start to finish.",
  },
  {
    slug: "debut-styling",
    icon: "crown",
    title: "Debut Styling",
    description:
      "Milestone eighteenth celebrations styled with grandeur — from the grand staircase entrance to the final dance.",
  },
  {
    slug: "birthday-styling",
    icon: "cake",
    title: "Birthday Styling",
    description:
      "Milestone birthdays styled with the same artistry and care as our weddings — playful, elegant, and entirely custom.",
  },
  {
    slug: "corporate-events",
    icon: "briefcase",
    title: "Corporate Events",
    description:
      "Polished launches, galas, and brand experiences designed to leave a lasting impression on every guest.",
  },
  {
    slug: "custom-packages",
    icon: "sparkles",
    title: "Custom Packages",
    description:
      "Every celebration is unique — we build bespoke service packages tailored precisely to your vision, guest count, and budget.",
  },
];
