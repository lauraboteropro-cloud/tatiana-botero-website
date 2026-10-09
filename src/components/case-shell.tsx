"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

export type CaseSection = { id: string; label: string; render: (go: (index: number) => void) => ReactNode };

/*
  Shared shell for every full case study: sticky numbered section navigation (a dropdown on small
  screens), one section at a time, Previous / Next at the bottom, and #hash deep links so a
  recruiter can jump straight to Research, Decisions, Impact and so on.
*/
export function CaseShell({ sections, next, className = "" }: { sections: CaseSection[]; next: { href: string; label: string }; className?: string }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const index = sections.findIndex((section) => `#${section.id}` === window.location.hash);
    if (index <= 0) return;
    const timer = window.setTimeout(() => setActive(index), 0);
    return () => window.clearTimeout(timer);
  }, [sections]);

  const go = (index: number) => {
    setActive(index);
    window.history.replaceState(null, "", `#${sections[index].id}`);
    setMoves((count) => count + 1);
  };

  /* After a chapter changes, bring its beginning into view just below the sticky section navigation.
     (The navigation itself is sticky, so scrolling to it does nothing; the chapter content is the target.) */
  useEffect(() => {
    if (moves === 0) return;
    const nav = document.getElementById(`${uid}-nav`);
    const panel = document.getElementById(`${uid}-panel`);
    if (!nav || !panel) return;
    const target = Math.max(0, panel.getBoundingClientRect().top + window.scrollY - nav.getBoundingClientRect().bottom);
    if (window.scrollY <= target + 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  }, [moves, uid]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[event.key];
    if (!step) return;
    event.preventDefault();
    const target = Math.min(sections.length - 1, Math.max(0, active + step));
    go(target);
    tabs.current[target]?.focus();
  };

  return (
    <div className={`page-shell es ${className}`.trim()}>
      <div className="es-nav" id={`${uid}-nav`} style={{ "--prog": (active + 1) / sections.length } as CSSProperties}>
        <div className="es-tabs" style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }} role="tablist" aria-label="Case study sections" onKeyDown={onKeyDown}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              ref={(node) => { tabs.current[index] = node; }}
              id={`${uid}-tab-${section.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`${uid}-panel`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => go(index)}
            ><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.label}</button>
          ))}
        </div>
        <div className="es-select">
          <label htmlFor={`${uid}-select`}>Section {active + 1} of {sections.length}</label>
          <select id={`${uid}-select`} value={active} onChange={(event) => go(Number(event.target.value))}>
            {sections.map((section, index) => <option key={section.id} value={index}>{String(index + 1).padStart(2, "0")} · {section.label}</option>)}
          </select>
        </div>
      </div>

      <div className="es-panel" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${sections[active].id}`} key={active}>
        {sections[active].render(go)}
      </div>

      <div className="es-pager">
        {active > 0 ? <button type="button" onClick={() => go(active - 1)}><span aria-hidden="true">←</span> {sections[active - 1].label}</button> : <span />}
        {active < sections.length - 1
          ? <button type="button" className="is-next" onClick={() => go(active + 1)}>Next: {sections[active + 1].label} <span aria-hidden="true">→</span></button>
          : <Link className="is-next" href={next.href}>{next.label} <span aria-hidden="true">→</span></Link>}
      </div>
    </div>
  );
}
