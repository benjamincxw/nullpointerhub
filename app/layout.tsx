import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const siteUrl = "https://nullpointerhub.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NullPointer Hub | Website Design Malaysia | Web Developer Selangor",
  description:
    "NullPointer Hub builds fixed-price websites for SMEs in Selangor, Malaysia. See a working prototype before you commit. Contractors, clinics, cafes and workshops get a site that earns its keep.",
  keywords: [
    "website design Malaysia",
    "web developer Selangor",
    "SME website Malaysia",
    "website design Selangor",
    "affordable website Malaysia",
  ],
  openGraph: {
    title: "NullPointer Hub: Websites that look expensive, priced like they aren't",
    description:
      "Fixed-price websites for Malaysian SMEs. A working prototype before you commit, full ownership when you launch.",
    url: siteUrl,
    siteName: "NullPointer Hub",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NullPointer Hub: Website Design in Selangor, Malaysia",
    description:
      "Fixed-price websites for Malaysian SMEs, with a working prototype before you commit.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NullPointer Hub",
  description:
    "Web design and software studio building fixed-price websites for small and medium businesses in Selangor, Malaysia.",
  telephone: "+60162303136",
  areaServed: "Malaysia",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Selangor",
    addressCountry: "MY",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full">
        <SmoothScrollProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
