"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/lib/data/process-steps";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-process-step]");

      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative mx-auto max-w-[var(--container-page)] px-6 py-32 sm:py-44"
    >
      <RevealHeading
        id="process-heading"
        lines={["A prototype before", "a commitment"]}
        className="max-w-[16ch] text-5xl sm:text-6xl lg:text-7xl"
      />

      <div className="mt-20">
        {processSteps.map((step) => (
          <div
            key={step.number}
            data-process-step
            className="border-t border-hairline py-12 sm:py-16"
          >
            <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:gap-12">
              <span className="font-display text-5xl italic text-ash sm:text-7xl">
                {step.number}
              </span>
              <div className="max-w-[52ch]">
                <h3 className="text-3xl font-semibold sm:text-4xl">{step.title}</h3>
                <p className="mt-4 text-lg text-ash">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
