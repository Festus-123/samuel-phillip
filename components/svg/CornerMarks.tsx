const CORNERS = [
  "left-0 top-0",
  "right-0 top-0 rotate-90",
  "bottom-0 right-0 rotate-180",
  "bottom-0 left-0 -rotate-90",
];

/** Drafting-style crop marks for the corners of a framed container. */
export default function CornerMarks({ className }: { className?: string }) {
  return (
    <>
      {CORNERS.map((position) => (
        <svg
          key={position}
          aria-hidden
          viewBox="0 0 16 16"
          className={`pointer-events-none absolute size-4 ${position} ${className ?? ""}`}
        >
          <path d="M1 15V1h14" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ))}
    </>
  );
}
