export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Tell us about your business",
    description:
      "A short WhatsApp conversation about what you sell, who your customers are, and what your current site is missing.",
  },
  {
    number: "02",
    title: "We build a working prototype",
    description:
      "Before any money changes hands, you see a real, clickable version of your new site. Not a mockup, not a slide deck.",
  },
  {
    number: "03",
    title: "We refine it together",
    description:
      "You send feedback, we adjust. Nothing goes live until it looks and reads the way you want it to.",
  },
  {
    number: "04",
    title: "Launch and handover",
    description:
      "Your site goes live on your domain, and you get full ownership of the code, content and hosting access.",
  },
];
