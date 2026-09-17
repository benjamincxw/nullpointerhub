import Image from "next/image";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/data/packages";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#why", label: "Why us" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[var(--container-page)] flex-col gap-12 px-6 py-20 sm:flex-row sm:justify-between">
        <div className="max-w-[36ch]">
          <div className="flex items-center gap-2.5 text-base font-semibold">
            <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />
            NullPointer Hub
          </div>
          <p className="mt-4 text-base text-ash">
            Websites built for Selangor&apos;s small and medium businesses.
            Fixed price, prototype first, yours to keep.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-base text-ash">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-fit transition-colors duration-200 hover:text-chalk"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-base text-ash">
          <p>WhatsApp / Call</p>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="mt-1 block w-fit text-lg font-medium text-chalk transition-colors duration-200 hover:text-signal"
          >
            {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-4">Email</p>
          <a
            href="mailto:hello@nullpointerhub.com"
            className="mt-1 block w-fit text-lg font-medium text-chalk transition-colors duration-200 hover:text-signal"
          >
            hello@nullpointerhub.com
          </a>
          <p className="mt-4">Selangor, Malaysia</p>
        </div>
      </div>

      <div className="border-t border-hairline px-6 py-6 text-center text-sm text-ash">
        © {new Date().getFullYear()} NullPointer Hub. All rights reserved.
        {" "}Business Reg. No. 202603228970
      </div>
    </footer>
  );
}
