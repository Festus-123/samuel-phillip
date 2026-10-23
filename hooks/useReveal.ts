"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap/gsap";

const DEFAULT_QUERY = "(prefers-reduced-motion: no-preference)";

/**
 * Fades up every `[data-reveal]` element inside `scope` as it scrolls into
 * view. Elements entering together are staggered. Only runs while `query`
 * matches (by default: unless the visitor prefers reduced motion).
 */
export function useReveal(
  scope: RefObject<HTMLElement | null>,
  query: string = DEFAULT_QUERY,
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(query, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
        gsap.set(items, { opacity: 0, y: 24 });

        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: "auto",
            }),
        });
      });
    },
    { scope },
  );
}
