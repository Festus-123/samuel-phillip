import { ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="px-gutter pb-10 text-cream">
      <div className="container-page flex flex-col items-center justify-between gap-6 border-t border-cream/20 pt-8 sm:flex-row">
        <p className="text-sm text-cream/70">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>

        <nav aria-label="Footer" className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/70 transition-colors hover:text-cream"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#hero"
          className="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
        >
          Back to top
          <span className="grid size-8 place-items-center rounded-full border border-cream/30">
            <ArrowUp className="size-4" />
          </span>
        </a>
      </div>
    </footer>
  );
}
