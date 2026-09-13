"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrollingDown = y > lastY.current;
        setHidden(scrollingDown && y > 120);
        lastY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-transform duration-300",
        hidden && "-translate-y-24"
      )}
    >
      <nav
        aria-label="Primary"
        className="flex w-full max-w-[640px] items-center justify-between rounded-full border border-hairline bg-void/60 px-4 py-2.5 backdrop-blur-lg"
      >
        <a href="#hero" className="flex items-center gap-2.5 px-1 text-base font-semibold">
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg" priority />
          NullPointer Hub
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-base text-ash transition-colors hover:text-chalk"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a
              href={whatsappLink("Hi, I'd like to get a quote for a website.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get a quote
            </a>
          </Button>
        </div>

        <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
          <DialogTrigger asChild>
            <button
              className="rounded-full p-2.5 text-chalk md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="items-center justify-center gap-9 bg-void">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-5xl italic text-chalk transition-colors hover:text-signal"
                style={{
                  animation: menuOpen
                    ? `nav-link-in 0.5s ease both ${i * 0.06 + 0.1}s`
                    : undefined,
                }}
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="default" className="mt-4">
              <a
                href={whatsappLink("Hi, I'd like to get a quote for a website.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Get a quote
              </a>
            </Button>
          </DialogContent>
        </Dialog>
      </nav>
    </header>
  );
}
