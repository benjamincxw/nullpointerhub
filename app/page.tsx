import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Why } from "@/components/sections/why";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Process />
      <Why />
      <Contact />
    </>
  );
}
