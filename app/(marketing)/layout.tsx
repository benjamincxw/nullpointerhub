import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
