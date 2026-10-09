import type { ReactNode } from "react";

/*
 * A handwritten margin note. The product interface is typeset; the note is the human question beside it.
 * Use sparingly: one per section at most, never for headings or body copy.
 * arrow: "up" curls toward the text above, "left" toward the text on its left, "none" is text only.
 */
export function Annotation({ children, arrow = "none", className = "" }: { children: ReactNode; arrow?: "up" | "left" | "none"; className?: string }) {
  return (
    <p className={`annot annot-${arrow} ${className}`.trim()}>
      {arrow !== "none" && (
        <svg className="annot-arrow" viewBox="0 0 48 40" aria-hidden="true" focusable="false">
          <path d="M44 34 C 30 36, 12 30, 8 8" />
          <path d="M3 15 L8 7 L15 13" />
        </svg>
      )}
      <span>{children}</span>
    </p>
  );
}
