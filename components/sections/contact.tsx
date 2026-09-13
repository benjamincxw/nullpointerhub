import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/ui/reveal-heading";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, whatsappLink } from "@/lib/data/packages";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto flex max-w-[var(--container-page)] flex-col items-center px-6 py-32 text-center sm:py-48"
    >
      <RevealHeading
        id="contact-heading"
        lines={["Let's talk about", "your business"]}
        className="text-6xl sm:text-7xl lg:text-8xl"
      />

      <p className="mt-8 max-w-[48ch] text-lg text-ash sm:text-xl">
        No pricing pressure until you&apos;re ready. Message us on WhatsApp
        and we&apos;ll talk through what you actually need first.
      </p>

      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild size="default">
          <a
            href={whatsappLink(
              "Hi, I'd like to talk about a website for my business."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Message us on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" size="default">
          <a href={`tel:+${WHATSAPP_NUMBER}`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            {WHATSAPP_DISPLAY}
          </a>
        </Button>
      </div>
    </section>
  );
}
