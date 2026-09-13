"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

interface RevealHeadingProps {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}

export function RevealHeading({ lines, as = "h2", className, id }: RevealHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const Tag = as;
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const spans = containerRef.current?.querySelectorAll("[data-reveal-line]");
      if (!spans || spans.length === 0 || reducedMotion) return;

      gsap.fromTo(
        spans,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          overwrite: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <Tag ref={containerRef as never} id={id} className={cn("block", className)}>
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span data-reveal-line className="block will-change-transform">
              {line}
            </span>
          </span>
        ))}
      </span>
      <span className="sr-only">{lines.join(" ")}</span>
    </Tag>
  );
}
