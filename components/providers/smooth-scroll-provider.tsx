"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/lib/lenis-context";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Lenis is an imperative resource tied 1:1 to this effect's lifecycle
    // (constructed and destroyed here); storing it is the sync, not a side effect to move out.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    const onLoad = () => ScrollTrigger.refresh();
    if (document.fonts) {
      document.fonts.ready.then(onLoad);
    }
    window.addEventListener("load", onLoad);
    // Sections created deeper in the tree (e.g. headings) can measure their
    // ScrollTrigger start position before an ancestor's own pin restructures
    // the DOM later in the same commit — one more refresh after paint catches those.
    const rafId = requestAnimationFrame(onLoad);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
      window.removeEventListener("load", onLoad);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
