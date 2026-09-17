export interface ServicePackage {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceNote: string;
  delivery: string;
  features: string[];
}

export const packages: ServicePackage[] = [
  {
    id: "starter",
    name: "Starter",
    price: "RM 800–1,500",
    priceNote: "One-time, fixed price",
    delivery: "Delivery in 2 to 5 days",
    features: [
      "One page scrolling site with your branding and photos",
      "Hero, about, services, gallery and contact sections",
      "Floating WhatsApp button",
      "Mobile friendly and fast",
      "Free domain for the first year (hosting billed separately)",
    ],
  },
  {
    id: "business",
    name: "Business",
    badge: "Most requested",
    price: "RM 2,500–4,500",
    priceNote: "One-time, fixed price",
    delivery: "Delivery in 1 to 2.5 weeks",
    features: [
      "4 to 6 custom pages",
      "Self service dashboard. Update text, photos and gallery, no coding",
      "WhatsApp button plus contact form",
      "Testimonials and service detail sections",
      "SEO friendly structure",
      "Free domain for the first year (hosting billed separately)",
    ],
  },
  {
    id: "fullsystem",
    name: "Full System",
    price: "RM 6,000–15,000+",
    priceNote: "One-time, fixed price",
    delivery: "Delivery in 3 to 6+ weeks",
    features: [
      "Everything in Business",
      "Full ecommerce catalog, cart and checkout",
      "Secure FPX, card and ewallet payments",
      "Order management and admin dashboard",
      "Content and inventory management via CMS",
      "Priority support at launch",
      "Free domain for the first year (hosting billed separately)",
    ],
  },
];

export interface AddOn {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  recommended?: boolean;
}

export const addOns: AddOn[] = [
  {
    name: "Website Care & Hosting",
    price: "RM 99",
    priceNote: "/ month",
    description:
      "Keeps your website live, fast and secure every month. Includes small text or photo updates and priority support.",
    recommended: true,
  },
  {
    name: "Domain Renewal",
    price: "RM 200",
    priceNote: "/ year",
    description:
      "Your website address needs renewing every year to stay yours. Billed once a year before it expires.",
  },
  {
    name: "Additional Development",
    price: "RM 100",
    priceNote: "/ hour",
    description:
      "Any new feature or extra work not included in your package, such as adding a page or function later.",
  },
];

export const WHATSAPP_NUMBER = "60103053510";
export const WHATSAPP_DISPLAY = "010 305 3510";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
