import type { ReactNode } from "react";
import { tornPath } from "@/lib/tornPaper";

// Two paper shapes, so the tear keeps its proportions: landscape for desktop
// cards and portrait for phones.
const LANDSCAPE = { width: 1200, height: 480, path: tornPath(1200, 480, 26, 0.8) };
const PORTRAIT = { width: 340, height: 580, path: tornPath(340, 580, 22, 0.6) };

interface PaperSheetProps {
  children: ReactNode;
  /** Mirrors the tear so neighbouring sheets don't look identical. */
  flip?: boolean;
  className?: string;
}

const COLS = 3;
const ROWS = 3;
const pct = (value: number) => `${value * 100}%`;

function Paper({
  shape,
  flip,
  className,
}: {
  shape: typeof LANDSCAPE;
  flip: boolean;
  className: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${shape.width} ${shape.height}`}
      preserveAspectRatio="none"
      className={`absolute inset-0 size-full overflow-visible drop-shadow-[0_22px_32px_rgb(0_0_0/0.4)] ${
        flip ? "-scale-x-100" : ""
      } ${className}`}
    >
      <path d={shape.path} className="fill-cream" />
    </svg>
  );
}

/**
 * A sheet of torn paper drawn in SVG, with a faint grid of large cells.
 * `children` should be absolutely positioned to fill the sheet and leave room
 * for the tear.
 */
export default function PaperSheet({
  children,
  flip = false,
  className,
}: PaperSheetProps) {
  return (
    <div className={`relative ${className ?? ""}`} data-sheet>
      <Paper shape={PORTRAIT} flip={flip} className="lg:hidden land:hidden" />
      <Paper shape={LANDSCAPE} flip={flip} className="max-lg:hidden land:block" />

      <svg
        aria-hidden
        className="absolute left-7 top-7 h-[calc(100%-3.5rem)] w-[calc(100%-3.5rem)]"
      >
        {Array.from({ length: COLS - 1 }, (_, i) => (
          <line
            key={`v${i}`}
            data-sheet-line
            x1={pct((i + 1) / COLS)}
            x2={pct((i + 1) / COLS)}
            y1="0"
            y2="100%"
            className="stroke-forest/12"
          />
        ))}
        {Array.from({ length: ROWS - 1 }, (_, i) => (
          <line
            key={`h${i}`}
            data-sheet-line
            x1="0"
            x2="100%"
            y1={pct((i + 1) / ROWS)}
            y2={pct((i + 1) / ROWS)}
            className="stroke-forest/12"
          />
        ))}
      </svg>

      {children}
    </div>
  );
}
