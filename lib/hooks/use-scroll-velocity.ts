"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/lib/lenis-context";

/**
 * Returns a ref holding the current smoothed scroll velocity (roughly -1..1+ range,
 * unbounded on fast flicks). Read it inside a rAF/GSAP ticker loop, not in render.
 */
export function useScrollVelocity() {
  const lenis = useLenis();
  const velocityRef = useRef(0);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = (e: { velocity: number }) => {
      velocityRef.current = e.velocity;
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return velocityRef;
}
