"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AtomicField from "@/components/svg/AtomicField";
import BlueprintGrid from "@/components/svg/BlueprintGrid";
import { WhatsAppIcon } from "@/components/svg/SocialIcons";
import { gsap, useGSAP } from "@/lib/gsap/gsap";
import { IMAGES, SITE } from "@/data/site";

/** Path the CAD crosshair travels across the hero, as [left%, top%]. */
const CURSOR_PATH = [
  [58, 26],
  [82, 48],
  [64, 72],
  [88, 78],
  [72, 34],
  [52, 58],
  [58, 26],
];
const [START_X, START_Y] = CURSOR_PATH[0];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const vGuideRef = useRef<HTMLSpanElement>(null);
  const hGuideRef = useRef<HTMLSpanElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero]", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        });

        const section = ref.current;
        const cursor = cursorRef.current;
        const readout = readoutRef.current;
        if (!section || !cursor || !readout) return;

        const steps = CURSOR_PATH.slice(1);
        const keyframes = (axis: "x" | "y" | "both") =>
          steps.map(([x, y]) => ({
            ...(axis !== "y" && { left: `${x}%` }),
            ...(axis !== "x" && { top: `${y}%` }),
            duration: 1.8,
            ease: "power2.inOut",
          }));

        gsap
          .timeline({
            repeat: -1,
            delay: 1,
            onUpdate: () => {
              const x = parseFloat(String(gsap.getProperty(cursor, "left")));
              const y = parseFloat(String(gsap.getProperty(cursor, "top")));
              readout.textContent = `X ${((x / section.offsetWidth) * 48).toFixed(1)}  Y ${((y / section.offsetHeight) * 27).toFixed(1)}`;
            },
          })
          .to(cursor, { keyframes: keyframes("both") }, 0)
          .to(vGuideRef.current, { keyframes: keyframes("x") }, 0)
          .to(hGuideRef.current, { keyframes: keyframes("y") }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="hero"
      data-nav-tone="bordo"
      className="section relative flex min-h-svh items-center overflow-hidden bg-bordo pt-nav text-cream"
    >
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
        <Image
          src={IMAGES.hero.src}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top opacity-40 mix-blend-luminosity lg:opacity-60 lg:[mask-image:linear-gradient(to_left,black_45%,transparent)]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-bordo/70 lg:hidden" />

      <AtomicField />
      <BlueprintGrid id="hero-grid" className="text-cream/5" />

      {/* AutoCAD-style crosshair with guide lines */}
      <span
        ref={vGuideRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-cream/15"
        style={{ left: `${START_X}%` }}
      />
      <span
        ref={hGuideRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-px bg-cream/15"
        style={{ top: `${START_Y}%` }}
      />
      <span
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${START_X}%`, top: `${START_Y}%` }}
      >
        <svg
          viewBox="-22 -22 44 44"
          className="size-11 text-cream"
          fill="none"
          stroke="currentColor"
        >
          <path d="M-22 0H22M0-22V22" strokeWidth="1" />
          <rect x="-6" y="-6" width="12" height="12" strokeWidth="1.5" />
        </svg>
      </span>
      <span
        ref={readoutRef}
        aria-hidden
        className="absolute bottom-6 right-gutter hidden text-[10px] tabular-nums tracking-widest text-cream/60 lg:block"
      >
        X 0.0 Y 0.0
      </span>

      <div className="container-page relative">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <span
            data-hero
            className="glass-dark eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            {SITE.role} · {SITE.experienceYears} years
          </span>

          <h1
            data-hero
            className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-cream/60">Hi,</span> I&apos;m {SITE.name}.
          </h1>

          <p data-hero className="max-w-xl text-lg leading-relaxed text-cream/80">
            A CAD designer turning concepts and technical requirements into
            accurate 3D models and clear drawing sets.
          </p>

          <div data-hero className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="cream" size="lg">
              <a href="#works">
                View selected works
                <ArrowDownRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
