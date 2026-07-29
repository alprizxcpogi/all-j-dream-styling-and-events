export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery",
    description:
      "A complimentary consultation to understand your vision, style, budget, and the feeling you want your guests to carry home.",
  },
  {
    step: "02",
    title: "Planning",
    description:
      "Vendor sourcing, venue coordination, and a detailed timeline that keeps every moving piece aligned with your vision.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "A tailored concept board, mood imagery, and styling direction across florals, tablescapes, and every visual detail.",
  },
  {
    step: "04",
    title: "Preparation",
    description:
      "Final walkthroughs, rehearsal coordination, and confirmations with every vendor so nothing is left to chance.",
  },
  {
    step: "05",
    title: "Wedding Day",
    description:
      "Our team manages every detail behind the scenes — from setup to send-off — so you can be fully present for the moment.",
  },
  {
    step: "06",
    title: "Celebration",
    description:
      "The dance floor, the toasts, the joy — we stay close throughout to ensure your celebration unfolds exactly as dreamed.",
  },
];
