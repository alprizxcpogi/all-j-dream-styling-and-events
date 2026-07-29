export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relation: string;
  rating: number;
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "All J Dream transformed our wedding into something beyond our wildest dreams. Every detail was intentional, elegant, and absolutely flawless.",
    author: "Sarah & Michael",
    relation: "Wedding Clients",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&q=80",
  },
  {
    id: "t2",
    quote:
      "Jasmine has an incredible eye for design. Our corporate gala felt like a luxury brand experience — our guests are still talking about it months later.",
    author: "Diana Reyes",
    relation: "Corporate Event Director",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: "t3",
    quote:
      "From our first consultation to the final dance, the team was professional, warm, and obsessively detail-oriented. Worth every penny.",
    author: "Emily & James",
    relation: "Anniversary Celebration",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "t4",
    quote:
      "Our daughter's debut was styled to absolute perfection. The florals, the lighting, the flow of the evening — everything felt like a fairytale.",
    author: "The Santos Family",
    relation: "Debut Celebration",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];
