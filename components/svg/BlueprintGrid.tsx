interface BlueprintGridProps {
  id: string;
  className?: string;
}

/** Faint drafting-paper grid. Inherits its color from `currentColor`. */
export default function BlueprintGrid({ id, className }: BlueprintGridProps) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] ${className ?? ""}`}
    >
      <defs>
        <pattern
          id={id}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path d="M48 0H0V48" fill="none" stroke="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
