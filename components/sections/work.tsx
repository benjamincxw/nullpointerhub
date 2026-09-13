"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/data/projects";
import { WorkCard } from "./work-card";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pinEl = pinRef.current;
        const track = trackRef.current;
        if (!pinEl || !track) return;

        const trackTween = gsap.to(track, {
          x: () => -(track.scrollWidth - pinEl.offsetWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth - pinEl.offsetWidth}`,
            invalidateOnRefresh: true,
          },
        });

        const cards = track.querySelectorAll<HTMLElement>("[data-work-card]");
        cards.forEach((card) => {
          const img = card.querySelector("[data-card-image]");
          if (!img) return;
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: trackTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        // The pin above inserts a spacer and restructures the DOM after this
        // section's own child triggers (e.g. the heading reveal) already
        // measured their positions — refresh so those recalculate correctly.
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          trackTween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="relative"
    >
      <div
        ref={pinRef}
        className={cn(
          !reducedMotion && "lg:flex lg:h-screen lg:flex-col lg:overflow-hidden"
        )}
      >
        <div
          className={cn(
            "max-w-[var(--container-page)] px-6 pb-8 pt-24 lg:mx-auto lg:pt-28",
            !reducedMotion && "lg:shrink-0"
          )}
        >
          <RevealHeading
            id="work-heading"
            as="h2"
            lines={["Work we're proud to build"]}
            className="text-5xl sm:text-6xl lg:text-7xl"
          />
          <p className="mt-5 max-w-[52ch] text-lg text-ash">
            Real client screenshots are on the way. Until then, here&apos;s
            the shape of what we build, by industry.
          </p>
        </div>

        <div
          className={cn(
            "no-scrollbar relative snap-x snap-mandatory overflow-x-auto pb-4 pl-6",
            "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
            !reducedMotion &&
              "lg:flex lg:flex-1 lg:min-h-0 lg:items-center lg:snap-none lg:overflow-visible lg:pb-0 lg:pl-0 lg:[mask-image:none]"
          )}
        >
          <div
            ref={trackRef}
            className={cn(
              "flex items-start gap-6 will-change-transform",
              !reducedMotion && "lg:w-full lg:items-center lg:px-[6vw]"
            )}
          >
            {projects.map((project) => (
              <div key={project.id} data-work-card className="snap-start">
                <WorkCard project={project} />
              </div>
            ))}
            <div
              className={cn("w-6 shrink-0", !reducedMotion && "lg:hidden")}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
