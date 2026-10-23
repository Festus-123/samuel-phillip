"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialIcon, WhatsAppIcon } from "@/components/svg/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { IMAGES, SITE, SOCIALS } from "@/data/site";

/** Contact and footer share one bordo block over a background image. */
export default function Contact({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="contact"
      data-nav-tone="bordo"
      className="relative scroll-mt-nav overflow-hidden bg-bordo text-cream"
    >
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
        <Image
          src={IMAGES.contact.src}
          alt={IMAGES.contact.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top opacity-40 mix-blend-luminosity lg:opacity-60 lg:[mask-image:linear-gradient(to_left,black_45%,transparent)]"
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-bordo/70 lg:hidden" />

      <div className="section container-page relative flex flex-col items-center gap-10 text-center lg:items-start lg:text-left">
        <SectionHeading
          tone="dark"
          align="center-lg-left"
          eyebrow="Contact"
          title="Have a model or drawing in mind?"
        >
          Message me on WhatsApp and let&apos;s talk about your project.
        </SectionHeading>

        <div
          data-reveal
          className="mx-auto flex w-full max-w-xs flex-col gap-3 lg:mx-0"
        >
          <Button asChild variant="cream" size="lg" className="w-full text-center">
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full text-center">
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer">
              <FileText />
              View resume
            </a>
          </Button>
        </div>

        <ul data-reveal className="flex gap-3">
          {SOCIALS.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid size-11 place-items-center rounded-full border border-cream/40 transition-colors hover:bg-cream hover:text-bordo"
              >
                <SocialIcon name={social.name} className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative">{children}</div>
    </section>
  );
}
