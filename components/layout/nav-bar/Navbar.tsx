"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/svg/SocialIcons";
import { NAV_LINKS, SITE } from "@/data/site";

type Tone = "forest" | "cream" | "bordo";

/** Glass tint and text colors for the navbar, keyed by the section beneath it. */
const TONES: Record<
  Tone,
  { bar: string; text: string; link: string; toggle: string; cta: "solid" | "cream" }
> = {
  forest: {
    bar: "bg-forest/40 border-cream/15",
    text: "text-cream",
    link: "text-cream/80 hover:text-cream",
    toggle: "border-cream/30 text-cream",
    cta: "solid",
  },
  cream: {
    bar: "bg-cream/50 border-forest/15",
    text: "text-forest",
    link: "text-forest/75 hover:text-forest",
    toggle: "border-forest/30 text-forest",
    cta: "solid",
  },
  bordo: {
    bar: "bg-bordo/40 border-cream/15",
    text: "text-cream",
    link: "text-cream/80 hover:text-cream",
    toggle: "border-cream/30 text-cream",
    cta: "cream",
  },
};

export default function Navbar() {
  const [tone, setTone] = useState<Tone>("forest");
  const [open, setOpen] = useState(false);

  // Match the glass tint to whichever section is currently under the navbar.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-tone]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = 36;
      const hit = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= y && rect.bottom > y;
      });
      if (hit) setTone(hit.dataset.navTone as Tone);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const t = TONES[tone];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${t.bar} ${t.text}`}
    >
      <div className="container-page flex h-nav items-center justify-between px-gutter">
        <a
          href="#hero"
          className="font-heading text-xl font-extrabold tracking-tight"
        >
          {SITE.name}
          <span className="opacity-50">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${t.link}`}
            >
              {link.name}
            </a>
          ))}
          <Button asChild variant={t.cta} size="md">
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Let&apos;s talk
            </a>
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`grid size-10 place-items-center rounded-lg border transition-colors md:hidden ${t.toggle}`}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className={`flex flex-col gap-1 border-t px-gutter pb-6 pt-3 md:hidden ${t.bar}`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-current/10 py-3 text-base font-medium"
            >
              {link.name}
            </a>
          ))}
          <Button asChild variant={t.cta} className="mt-4">
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Let&apos;s talk
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
