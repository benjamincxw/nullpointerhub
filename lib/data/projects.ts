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
  /** Gradient pair used behind the abstract site mock. Ignored once `thumbnail` is set. */
  gradient: [string, string];
  /** Path under /public to a real screenshot (e.g. "/work/renovation.png"); replaces the generated mock when set. */
  thumbnail?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    id: "sparkflare",
    industry: "Custom laser engraving",
    description: "Live storefront for a laser engraving studio, synced with Shopee and Etsy orders.",
    tag: "Reference",
    width: 460,
    offsetY: 0,
    gradient: ["#1c2c2a", "#0a0e14"],
    thumbnail: "/work/sparkflare.png",
  },
  {
    id: "elite-dental",
    industry: "Dental clinic",
    description: "Appointment-focused layout with services, team and booking calendar.",
    tag: "Reference",
    width: 420,
    offsetY: 32,
    gradient: ["#1e1c2e", "#0a0e14"],
    thumbnail: "/work/elite-dental.png",
  },
  {
    id: "zenth",
    industry: "Branding & identity studio",
    description: "Portfolio site for a branding studio's logo and identity work.",
    tag: "Reference",
    width: 380,
    offsetY: -18,
    gradient: ["#16232e", "#0a0e14"],
    thumbnail: "/work/zenth.png",
  },
  {
    id: "station",
    industry: "Cafe & bistro",
    description: "Menu, hours and story for a century-old railway station cafe.",
    tag: "Prototype",
    width: 500,
    offsetY: 20,
    gradient: ["#231a26", "#0a0e14"],
    thumbnail: "/work/station.png",
  },
  {
    id: "robert-tan-dental",
    industry: "Neighbourhood dental practice",
    description: "Family-friendly dental clinic site with WhatsApp booking and Google reviews.",
    tag: "Prototype",
    width: 400,
    offsetY: -10,
    gradient: ["#241c14", "#0a0e14"],
    thumbnail: "/work/robert-tan-dental.png",
  },
  {
    id: "ironclad-auto",
    industry: "Car repair workshop",
    description: "Transparent pricing and fast turnarounds for a neighbourhood workshop.",
    tag: "Prototype",
    width: 460,
    offsetY: 26,
    gradient: ["#1a2330", "#0a0e14"],
    thumbnail: "/work/ironclad-auto.png",
  },
  {
    id: "lumen-interiors",
    industry: "Interior design & renovation",
    description: "Portfolio and render-to-build promise for an interior design firm.",
    tag: "Prototype",
    width: 520,
    offsetY: -14,
    gradient: ["#142622", "#0a0e14"],
    thumbnail: "/work/lumen-interiors.png",
  },
  {
    id: "yours",
    industry: "Your business here",
    description: "Tell us what you sell and we'll show you what it could look like.",
    tag: "Coming soon",
    width: 380,
    offsetY: 12,
    gradient: ["#132a29", "#0a0e14"],
    href: "https://wa.me/60103053510?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20a%20website%20for%20my%20business.",
  },
];

export const WHATSAPP_NUMBER = "60103053510";
export const WHATSAPP_DISPLAY = "010 305 3510";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
