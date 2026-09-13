"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollVelocity } from "@/lib/hooks/use-scroll-velocity";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const SERVICES = [
  "Websites",
  "Booking systems",
  "E-commerce",
  "WhatsApp integration",
  "Content dashboards",
  "SEO structure",
  "Hosting & care",
];

const INDUSTRIES = [
  "Contractors",
  "Clinics",
  "Workshops",
  "Cafes",
  "Fabricators",
  "Retailers",
  "Community groups",
];

function Row({
  items,
  reverse,
  velocityRef,
  reducedMotion,
}: {
  items: string[];
  reverse?: boolean;
  velocityRef: React.RefObject<number>;
  reducedMotion: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current || reducedMotion) return;

    const tween = gsap.to(trackRef.current, {
      xPercent: reverse ? 50 : -50,
      duration: 22,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    gsap.ticker.add(update);
    function update() {
      const idleScale = 1;
      const boosted = 1 + Math.min(Math.abs(velocityRef.current) * 0.18, 3.5);
      tween.timeScale(idleScale * boosted);
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, [reducedMotion]);

  const content = (
    <>
      {items.map((item, i) => (
        <span key={i} className="mx-4 inline-flex items-center gap-4 text-2xl text-ash sm:text-4xl">
          {item}
          <span className="text-signal">·</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="no-scrollbar overflow-hidden whitespace-nowrap">
      <div
        ref={trackRef}
        className={cn("inline-flex", reducedMotion && "flex-wrap")}
      >
        <div className="inline-flex">{content}</div>
        {!reducedMotion && <div className="inline-flex" aria-hidden="true">{content}</div>}
      </div>
    </div>
  );
}

export function Marquee() {
  const velocityRef = useScrollVelocity();
  const reducedMotion = useReducedMotion();

  return (
    <section aria-label="Services and industries we work with" className="border-y border-hairline py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:gap-6">
        <Row items={SERVICES} velocityRef={velocityRef} reducedMotion={reducedMotion} />
        <Row items={INDUSTRIES} reverse velocityRef={velocityRef} reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
