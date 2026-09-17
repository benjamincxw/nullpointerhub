export interface WhyPoint {
  number: string;
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    number: "01",
    title: "Fixed price, no surprises",
    description:
      "You agree on a number before work starts. It doesn't move once we begin.",
  },
  {
    number: "02",
    title: "See it before you pay for it",
    description:
      "A working prototype comes first. You're never buying something you haven't used.",
  },
  {
    number: "03",
    title: "Fast, without cutting corners",
    description:
      "Most sites launch in days to weeks, not months, because the scope is clear from the start.",
  },
  {
    number: "04",
    title: "You own everything",
    description:
      "Domain, code and content are yours outright. Hosting and care are a simple monthly add-on, not a platform contract you're locked into.",
  },
];
