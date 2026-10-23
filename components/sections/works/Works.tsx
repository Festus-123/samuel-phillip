"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectSheet from "@/components/sections/works/ProjectSheet";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/gsap";
import { PROJECTS } from "@/data/projects";

/**
 * "Drafts" a sheet onto the paper: grid lines are drawn on, the image is wiped
 * in behind a scanning line, then the text and details fade up. Returned
 * paused so a ScrollTrigger can play and reverse it.
 */
function draftSheet(sheet: HTMLElement) {
  const q = gsap.utils.selector(sheet);
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });

  tl.fromTo(
    q("[data-sheet-line]"),
    { drawSVG: "0%" },
    { drawSVG: "100%", duration: 0.9, stagger: 0.08 },
    0,
  )
    .fromTo(
      q("[data-sheet-image]"),
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1 },
      0.2,
    )
    .fromTo(
      q("[data-scan]"),
      { left: "0%", opacity: 1 },
      { left: "100%", duration: 1 },
      0.2,
    )
    .to(q("[data-scan]"), { opacity: 0, duration: 0.2 }, 1.1)
    .fromTo(
      q("[data-sheet-item]"),
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.6,
    );

  return tl;
}

export default function Works() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Pin the section and translate the track sideways as the visitor scrolls
  // down (on every screen size), releasing once the last project is in view.
  // Each sheet is drafted onto the paper as it slides in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduce } = context.conditions as { reduce: boolean };
          const track = trackRef.current;
          if (!track) return;

          const distance = () => track.scrollWidth - window.innerWidth;
          // Phones need a longer scroll for the same sideways travel.
          const length = () => distance() * (window.innerWidth < 1024 ? 1.6 : 1);
          const scrollTrigger = {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${length()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          };

          const slide = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: { ...scrollTrigger, pin: true, anticipatePin: 1 },
          });
          gsap.to(barRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { ...scrollTrigger, scrub: true },
          });

          if (reduce) return;

          gsap
            .utils.toArray<HTMLElement>("[data-sheet]", track)
            .forEach((sheet, index) => {
              const draft = draftSheet(sheet);
              const first = index === 0;

              // Cards grow to full size as they pass through the centre.
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: sheet,
                    containerAnimation: slide,
                    start: "left 95%",
                    end: "right 5%",
                    scrub: true,
                  },
                })
                .fromTo(
                  sheet,
                  { scale: 0.88, opacity: 0.55 },
                  { scale: 1, opacity: 1, ease: "none", duration: 1 },
                )
                .to(sheet, { scale: 0.88, opacity: 0.55, ease: "none", duration: 1 });

              ScrollTrigger.create({
                trigger: first ? ref.current : sheet,
                containerAnimation: first ? undefined : slide,
                start: first ? "top 60%" : "left 90%",
                onEnter: () => draft.play(),
                onLeaveBack: () => draft.reverse(),
              });
            });
        },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="works"
      data-nav-tone="forest"
      className="relative flex h-svh scroll-mt-0 flex-col overflow-hidden bg-forest text-cream"
    >
      <div className="px-gutter pt-nav">
        <div className="container-page flex flex-col gap-2 pb-3 pt-4 land:hidden lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:pb-4 lg:pt-3">
          <SectionHeading
            compact
            tone="dark"
            eyebrow="Selected works"
            title="Models and drawings"
          />
          <p className="hidden max-w-sm leading-relaxed text-cream/75 lg:block">
            A look at recent 3D models and technical drawings, each built from
            scratch in AutoCAD.
          </p>
        </div>
      </div>

      <div className="min-h-0 flex-1 pb-10 land:pb-6 lg:pb-14">
        <div ref={trackRef} className="flex h-full w-max">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="flex h-full w-screen shrink-0 items-center px-6 lg:px-16"
            >
              <ProjectSheet
                project={project}
                index={index}
                total={PROJECTS.length}
              />
            </article>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-gutter bottom-6 h-px bg-cream/20 land:bottom-3 lg:bottom-10"
      >
        <div ref={barRef} className="h-px origin-left scale-x-0 bg-cream" />
      </div>
    </section>
  );
}
