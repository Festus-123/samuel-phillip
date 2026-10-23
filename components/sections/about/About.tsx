"use client";

import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, PenTool, Ruler } from "lucide-react";
import CornerMarks from "@/components/svg/CornerMarks";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { IMAGES, SITE } from "@/data/site";

const FACTS = [
  {
    icon: Ruler,
    value: `${SITE.experienceYears} years`,
    label: "Of CAD design experience",
  },
  {
    icon: GraduationCap,
    value: "Mechanical Engineer",
    label: `Graduate, ${SITE.university}`,
  },
  {
    icon: PenTool,
    value: "Creative-driven",
    label: "Design with a clear purpose",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="about" data-nav-tone="cream" className="section bg-cream">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                Solid engineering,{" "}
                <span className="text-bordo">creative eye.</span>
              </>
            }
          />
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-forest/80">
            <p data-reveal>
              I&apos;m {SITE.name}, a CAD designer with {SITE.experienceYears}{" "}
              years of experience turning ideas and technical requirements into
              accurate 3D models and drawing sets.
            </p>
            <p data-reveal>
              As a mechanical engineering graduate, I bring an engineer&apos;s
              discipline to creative work. Dependable and detail-driven, I care
              as much about how a design looks as how it works.
            </p>
          </div>

          <ul className="divide-y divide-forest/20 border-y border-forest/20">
            {FACTS.map(({ icon: Icon, value, label }) => (
              <li
                key={value}
                data-reveal
                className="flex items-center gap-5 py-4"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-forest text-cream">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-heading text-lg font-bold">{value}</p>
                  <p className="text-sm text-forest/70">{label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="relative lg:col-span-6">
          <div className="relative rounded-card border border-forest/20 p-3">
            <CornerMarks className="text-bordo" />
            <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-forest">
              <Image
                src={IMAGES.about.src}
                alt={IMAGES.about.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
