import { RevealHeading } from "@/components/ui/reveal-heading";
import { whyPoints } from "@/lib/data/why-points";

export function Why() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="mx-auto max-w-[var(--container-page)] px-6 py-32 sm:py-44"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <RevealHeading
            id="why-heading"
            lines={["Why local businesses", "choose us"]}
            className="text-5xl sm:text-6xl lg:text-7xl"
          />
          <p className="mt-6 max-w-[42ch] text-lg text-ash">
            We build for owners who need a site that works, not a design
            portfolio piece. Turns out the two aren&apos;t mutually exclusive.
          </p>
        </div>

        <ul className="flex flex-col">
          {whyPoints.map((point, i) => (
            <li
              key={point.number}
              className="grid grid-cols-[auto_1fr] gap-7 border-t border-hairline py-9 first:pt-0 sm:gap-12"
              style={{ paddingLeft: i % 2 === 1 ? "clamp(0px, 6vw, 48px)" : undefined }}
            >
              <span className="font-display text-4xl italic text-signal sm:text-5xl">
                {point.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold sm:text-2xl">{point.title}</h3>
                <p className="mt-3 max-w-[46ch] text-base text-ash sm:text-lg">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
