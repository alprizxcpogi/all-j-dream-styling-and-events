export interface PackageTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const packages: PackageTier[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$2,800",
    cadence: "starting at",
    description: "Day-of coordination for couples who've planned the details themselves.",
    features: [
      "Day-of coordination (up to 10 hrs)",
      "Timeline & vendor confirmations",
      "Rehearsal walkthrough",
      "On-site coordination team",
      "Setup & breakdown supervision",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    price: "$6,500",
    cadence: "starting at",
    description: "Full-service planning and styling for a seamless, beautifully designed day.",
    features: [
      "Everything in Essential",
      "Full planning from 6+ months out",
      "Custom design & styling concept",
      "Vendor sourcing & management",
      "Floral & tablescape design",
      "Unlimited planning consultations",
    ],
    popular: true,
  },
  {
    id: "bespoke",
    name: "Bespoke",
    price: "Custom",
    cadence: "quoted after consult",
    description: "White-glove planning for multi-day celebrations and destination events.",
    features: [
      "Everything in Signature",
      "Multi-day / destination coordination",
      "Guest travel & accommodation support",
      "Bespoke installations & production",
      "Dedicated senior lead planner",
      "Priority scheduling",
    ],
  },
];

export interface ComparisonRow {
  feature: string;
  essential: boolean;
  signature: boolean;
  bespoke: boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: "Day-of coordination", essential: true, signature: true, bespoke: true },
  { feature: "Full planning support", essential: false, signature: true, bespoke: true },
  { feature: "Custom design & styling", essential: false, signature: true, bespoke: true },
  { feature: "Floral & tablescape design", essential: false, signature: true, bespoke: true },
  { feature: "Vendor sourcing & management", essential: false, signature: true, bespoke: true },
  { feature: "Destination / multi-day support", essential: false, signature: false, bespoke: true },
  { feature: "Dedicated senior lead planner", essential: false, signature: false, bespoke: true },
];
