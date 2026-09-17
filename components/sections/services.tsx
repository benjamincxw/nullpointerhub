import { Check } from "lucide-react";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { Button } from "@/components/ui/button";
import { addOns, packages, whatsappLink } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-[var(--container-page)] px-6 py-32 sm:py-44"
    >
      <RevealHeading
        id="services-heading"
        lines={["Simple, transparent", "pricing"]}
        className="max-w-[16ch] text-5xl sm:text-6xl lg:text-7xl"
      />
      <p className="mt-6 max-w-[52ch] text-lg text-ash">
        Fixed prices, scoped over WhatsApp once we understand what you
        actually need. These are the shapes projects usually take.
      </p>

      <div className="mt-16 grid gap-7 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <div
            key={pkg.id}
            className={cn(
              "flex flex-col rounded-2xl border p-8",
              pkg.badge
                ? "border-signal/40 bg-signal/[0.04] lg:-translate-y-5"
                : "border-hairline"
            )}
          >
            {pkg.badge && (
              <span className="mb-4 inline-block w-fit rounded-full bg-signal px-3 py-1 text-xs font-bold text-void">
                {pkg.badge}
              </span>
            )}
            <h3 className="text-3xl font-display italic">{pkg.name}</h3>
            <p className="mt-4 text-2xl font-semibold text-chalk">{pkg.price}</p>
            <p className="text-sm uppercase tracking-wide text-ash">{pkg.priceNote}</p>
            <p className="mt-2 text-base text-ash">{pkg.delivery}</p>

            <ul className="mt-7 flex flex-1 flex-col gap-3.5">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-base text-chalk/90">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant={pkg.badge ? "primary" : "outline"}
              size="sm"
              className="mt-9 w-full"
            >
              <a
                href={whatsappLink(
                  `Hi, I'd like to ask about the ${pkg.name} package.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask about {pkg.name}
              </a>
            </Button>

            <span className="sr-only">Package {i + 1} of {packages.length}</span>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ash">
          Ongoing &amp; add ons
        </h3>
        <div className="mt-6 grid gap-7 sm:grid-cols-3">
          {addOns.map((addOn) => (
            <div
              key={addOn.name}
              className={cn(
                "flex flex-col rounded-2xl border p-8",
                addOn.recommended ? "border-signal/40 bg-signal/[0.04]" : "border-hairline"
              )}
            >
              {addOn.recommended && (
                <span className="mb-4 inline-block w-fit rounded-full bg-signal px-3 py-1 text-xs font-bold text-void">
                  Recommended
                </span>
              )}
              <h4 className="text-xl font-semibold">{addOn.name}</h4>
              <p className="mt-3 flex-1 text-base text-ash">{addOn.description}</p>
              <p className="mt-5 text-2xl font-semibold text-chalk">
                {addOn.price}
                <span className="ml-1 text-sm font-normal text-ash">{addOn.priceNote}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 text-sm text-ash">
        Every business is different, so final pricing is confirmed over
        WhatsApp once we understand your project.{" "}
        <a
          href="#contact"
          className="text-chalk underline decoration-hairline underline-offset-4 hover:text-signal"
        >
          get in touch
        </a>{" "}
        for a free quote.
      </p>
    </section>
  );
}
