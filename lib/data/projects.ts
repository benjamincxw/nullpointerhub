export type ProjectTag = "Prototype" | "Reference" | "Coming soon";

export interface Project {
  id: string;
  industry: string;
  description: string;
  tag: ProjectTag;
  /** Width in px for the horizontal track card — vary these so the strip reads as composed, not a carousel. */
  width: number;
  /** Vertical offset in px, staggers the strip. */
  offsetY: number;
  /** Gradient pair used behind the abstract site mock. Swap for a real screenshot via `thumbnail` when cleared. */
  gradient: [string, string];
  /** Drop a real screenshot path here later to replace the generated mock. */
  thumbnail?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    id: "renovation",
    industry: "Renovation & plumbing",
    description: "Quote request funnel built around before/after jobs.",
    tag: "Prototype",
    width: 420,
    offsetY: 0,
    gradient: ["#1c2c2a", "#0a0e14"],
  },
  {
    id: "dental",
    industry: "Dental clinic",
    description: "Appointment focused layout with treatment breakdowns.",
    tag: "Prototype",
    width: 500,
    offsetY: 36,
    gradient: ["#16232e", "#0a0e14"],
  },
  {
    id: "fabrication",
    industry: "Steel fabrication & welding",
    description: "Capability showcase for industrial and B2B buyers.",
    tag: "Reference",
    width: 360,
    offsetY: -20,
    gradient: ["#241c14", "#0a0e14"],
  },
  {
    id: "cafe",
    industry: "Independent cafe",
    description: "Menu, hours and location built to scroll fast on one thumb.",
    tag: "Prototype",
    width: 480,
    offsetY: 18,
    gradient: ["#231a26", "#0a0e14"],
  },
  {
    id: "roofing",
    industry: "Polycarbonate roofing & awning",
    description: "Gallery led site for a visual, quote driven trade.",
    tag: "Reference",
    width: 340,
    offsetY: -8,
    gradient: ["#1a2330", "#0a0e14"],
  },
  {
    id: "waterproofing",
    industry: "Waterproofing specialist",
    description: "Trust signals and case studies for a skeptical buyer.",
    tag: "Coming soon",
    width: 460,
    offsetY: 28,
    gradient: ["#142622", "#0a0e14"],
  },
  {
    id: "community",
    industry: "Bilingual community site",
    description: "CMS backed EN/BM site an admin updates without a dev.",
    tag: "Reference",
    width: 520,
    offsetY: -14,
    gradient: ["#1e1c2e", "#0a0e14"],
  },
  {
    id: "yours",
    industry: "Your business here",
    description: "Tell us what you sell and we'll show you what it could look like.",
    tag: "Coming soon",
    width: 380,
    offsetY: 12,
    gradient: ["#132a29", "#0a0e14"],
    href: "https://wa.me/60162303136?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20a%20website%20for%20my%20business.",
  },
];
