"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/data/packages";
import { useLenis } from "@/lib/lenis-context";

const NAV_SCROLL_OFFSET = -96;

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    setMenuOpen(false);
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(href, { offset: NAV_SCROLL_OFFSET, duration: 1.2 });
  }

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        aria-label="Primary"
        className="relative flex w-full max-w-[640px] items-center justify-between rounded-full border border-hairline bg-void/60 px-4 py-2.5 backdrop-blur-lg"
      >
        <a
          href="#hero"
          onClick={(e) => handleAnchorClick(e, "#hero")}
          className="flex items-center gap-2.5 px-1 text-base font-semibold transition-opacity duration-200 hover:opacity-80"
        >
          <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-lg" priority />
          NullPointer Hub
        </a>

        <div className="hidden items-center gap-1 md:ml-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
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

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-full p-2.5 text-chalk transition-colors duration-200 hover:bg-white/5 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {menuOpen && (
          <div
            className="absolute inset-x-0 top-full z-50 mt-2 flex flex-col gap-1 rounded-2xl border border-hairline bg-void/95 p-3 backdrop-blur-lg md:hidden"
            style={{ animation: "nav-dropdown-in 0.18s ease both" }}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="rounded-xl px-4 py-3 text-base text-ash transition-colors hover:bg-white/5 hover:text-chalk"
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="mt-1 w-full">
              <a
                href={whatsappLink("Hi, I'd like to get a quote for a website.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                Get a quote
              </a>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
