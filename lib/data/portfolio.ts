// Placeholder gallery content shaped to mirror a future Sanity `portfolioItem` document.
export type PortfolioCategory =
  | "Weddings"
  | "Receptions"
  | "Debuts"
  | "Corporate"
  | "Florals";

export interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategory;
  span?: string;
}

export const portfolio: PortfolioItem[] = [
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80",
    alt: "Luxury reception styling with blush florals",
    category: "Receptions",
    span: "md:row-span-2",
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80",
    alt: "Elegant tablescape design in blush and gold",
    category: "Florals",
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80",
    alt: "Ceremony floral installation",
    category: "Weddings",
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
    alt: "Reception lounge styling",
    category: "Receptions",
    span: "md:col-span-2",
  },
  {
    id: "p5",
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80",
    alt: "Bridal bouquet detail in blush tones",
    category: "Florals",
  },
  {
    id: "p6",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80",
    alt: "Garden wedding celebration",
    category: "Weddings",
    span: "md:row-span-2",
  },
  {
    id: "p7",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80",
    alt: "Debut celebration grand staircase styling",
    category: "Debuts",
  },
  {
    id: "p8",
    src: "https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Corporate gala stage styling",
    category: "Corporate",
    span: "md:col-span-2",
  },
  {
    id: "p9",
    src: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Wedding ceremony aisle styling",
    category: "Weddings",
  },
];

export const portfolioCategories: PortfolioCategory[] = [
  "Weddings",
  "Receptions",
  "Debuts",
  "Corporate",
  "Florals",
];
