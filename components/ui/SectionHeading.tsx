import type { ReactNode } from "react";

const ALIGN = {
  left: "items-start",
  center: "mx-auto items-center text-center",
  "center-lg-left":
    "mx-auto items-center text-center lg:mx-0 lg:items-start lg:text-left",
} as const;

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  /** `dark` for forest/bordo backgrounds, `light` for cream. */
  tone?: "dark" | "light";
  /** `center-lg-left` centers on mobile and left-aligns from `lg`. */
  align?: "left" | "center" | "center-lg-left";
  /** Smaller title, for tight layouts. */
  compact?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "light",
  align = "left",
  compact = false,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`flex max-w-2xl flex-col gap-4 ${ALIGN[align]}`}
    >
      <span
        data-reveal
        className={`eyebrow inline-flex items-center gap-3 ${
          isDark ? "text-cream" : "text-bordo"
        }`}
      >
        <span className="h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </span>
      <h2
        data-reveal
        className={`font-heading font-extrabold leading-tight tracking-tight ${
          compact ? "text-2xl sm:text-3xl lg:text-4xl" : "text-4xl sm:text-5xl"
        } ${
          isDark ? "text-cream" : "text-forest"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p
          data-reveal
          className={`text-base leading-relaxed ${
            isDark ? "text-cream/75" : "text-forest/75"
          }`}
        >
          {children}
        </p>
      )}
    </div>
  );
}
