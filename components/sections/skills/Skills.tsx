"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { COMPETENCIES, TOOLS } from "@/data/site";

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="skills" data-nav-tone="cream" className="section bg-cream">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          eyebrow="Skills & tools"
          title={
            <>
              The toolkit behind <span className="text-bordo">the work</span>
            </>
          }
        />

        <div className="flex flex-col gap-4">
          <h3 data-reveal className="eyebrow text-forest/70">
            Primary software
          </h3>

          {/* Masonry: CSS columns with cards of varying height */}
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {TOOLS.map((tool, index) => {
              const accent = index % 3 === 1;
              return (
                <li
                  key={tool.name}
                  data-reveal
                  className={`relative mb-4 flex break-inside-avoid flex-col justify-between gap-6 overflow-hidden rounded-card border p-6 text-cream transition-colors hover:border-cream ${
                    accent
                      ? "border-bordo bg-bordo"
                      : "border-forest bg-forest"
                  } ${tool.tall ? "min-h-56" : "min-h-40"}`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-6 -right-2 select-none font-heading text-[9rem] font-extrabold leading-none text-cream/10"
                  >
                    {tool.name[0]}
                  </span>
                  <span className="relative grid size-12 place-items-center rounded-lg border border-cream/40 font-heading text-2xl font-extrabold">
                    {tool.name[0]}
                  </span>
                  <div className="relative">
                    <p className="font-heading text-xl font-bold">{tool.name}</p>
                    <p className="mt-1 text-sm text-cream/75">{tool.note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 data-reveal className="eyebrow text-forest/70">
            Core competencies
          </h3>
          <ul className="flex flex-wrap gap-3">
            {COMPETENCIES.map((item) => (
              <li
                key={item}
                data-reveal
                className="rounded-full border border-bordo/40 px-5 py-2 text-sm font-medium text-bordo transition-colors hover:bg-bordo hover:text-cream"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
