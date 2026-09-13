export interface ServicePackage {
  id: string;
  name: string;
  badge?: string;
  delivery: string;
  features: string[];
}

export const packages: ServicePackage[] = [
  {
    id: "starter",
    name: "Starter",
    delivery: "Delivery in 2 to 5 days",
    features: [
      "One page scrolling site with your branding and photos",
      "Hero, about, services, gallery and contact sections",
      "Floating WhatsApp button",
      "Mobile friendly and fast",
    ],
  },
  {
    id: "business",
    name: "Business",
    badge: "Most requested",
    delivery: "Delivery in 1 to 2.5 weeks",
    features: [
      "4 to 6 custom pages",
      "Self service dashboard. Update text, photos and gallery, no coding",
      "WhatsApp button plus contact form",
      "Testimonials and service detail sections",
      "SEO friendly structure",
    ],
  },
  {
    id: "fullsystem",
    name: "Full System",
    delivery: "Delivery in 3 to 6+ weeks",
    features: [
      "Everything in Business",
      "Full ecommerce catalog, cart and checkout",
      "Secure FPX, card and ewallet payments",
      "Order management and admin dashboard",
      "Inventory via CMS",
      "Priority support at launch",
    ],
  },
];

export const WHATSAPP_NUMBER = "60162303136";
export const WHATSAPP_DISPLAY = "016 230 3136";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
