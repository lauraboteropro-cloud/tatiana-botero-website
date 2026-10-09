"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

export type CaseSection = { id: string; label: string; render: (go: (index: number) => void) => ReactNode };

/*
  Shared shell for every full case study. Each chapter is one view:
    - vertical movement reads the chapter, horizontal movement changes it (swipe, trackpad, arrows, selector)
    - exactly one chapter per gesture, and the new chapter always opens at its beginning
  Chapter count comes from the sections passed in, so nothing here assumes eight.
*/

const SWIPE_MIN = 56;        // px of horizontal travel before a touch swipe counts
const SWIPE_DOMINANCE = 1.6; // horizontal travel must beat vertical travel by this factor
const WHEEL_MIN = 70;        // accumulated horizontal wheel delta before a trackpad gesture counts
const LOCK_MS = 550;         // after a change, ignore further gestures for this long

/* The nearest element that scrolls sideways under the gesture (such as a phone-screen row), if any. */
function sideScroller(target: EventTarget | null, boundary: HTMLElement): HTMLElement | "form" | null {
  for (let el = target as HTMLElement | null; el && el !== boundary; el = el.parentElement) {
    if (el.matches?.("input, select, textarea")) return "form";
    if (el.scrollWidth > el.clientWidth + 1) {
      const overflowX = getComputedStyle(el).overflowX;
      if (overflowX === "auto" || overflowX === "scroll") return el;
    }
  }
  return null;
}

/* A side scroller owns the gesture while it can still move in that direction; at its edge the gesture changes chapter. */
function scrollerLeaves(scroller: HTMLElement | "form" | null, towardNext: boolean) {
  if (!scroller) return true;
  if (scroller === "form") return false;
  const atStart = scroller.scrollLeft <= 1;
  const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1;
  return towardNext ? atEnd : atStart;
}

/* True until the first case study of this page load has mounted. */
let firstDocumentLoad = true;

export function CaseShell({ sections, next, className = "" }: { sections: CaseSection[]; next: { href: string; label: string }; className?: string }) {
  const [active, setActive] = useState(0);
  const [moves, setMoves] = useState(0);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const [swiped, setSwiped] = useState(false);
  const uid = useId();
  const root = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const stepRef = useRef<(by: number) => void>(() => {});
  const lockUntil = useRef(0);
  const last = sections.length - 1;

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("cs-swiped") === "1"; } catch {}
    if (!seen) return;
    const timer = window.setTimeout(() => setSwiped(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  /* Entering a case study always starts on its first chapter. A #chapter in the address is honoured only when this
     document was loaded directly on it (a shared link or a refresh): never when arriving by in-app navigation,
     where the hash still belongs to the page we just left. */
  useEffect(() => {
    const honourHash = firstDocumentLoad;
    const timer = window.setTimeout(() => { firstDocumentLoad = false; }, 0);
    const index = honourHash ? sections.findIndex((section) => `#${section.id}` === window.location.hash) : -1;
    if (index <= 0) {
      if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      if (!honourHash) window.scrollTo({ top: 0, behavior: "auto" });
      return () => window.clearTimeout(timer);
    }
    const open = window.setTimeout(() => setActive(index), 0);
    return () => { window.clearTimeout(timer); window.clearTimeout(open); };
  }, [sections]);

  /* Every way of changing chapter goes through here. */
  const go = (index: number) => {
    const target = Math.min(last, Math.max(0, index));
    if (target === active) return;
    setSwiped(true);
    try { sessionStorage.setItem("cs-swiped", "1"); } catch {}
    setDir(target > active ? "next" : "prev");
    setActive(target);
    window.history.replaceState(window.history.state, "", `#${sections[target].id}`);
    setMoves((count) => count + 1);
  };

  /* The gesture listeners are attached once, so they call the latest version through this. */
  useEffect(() => { stepRef.current = (by) => go(active + by); });

  /* After a chapter changes, bring its beginning to the top of the screen. */
  useEffect(() => {
    if (moves === 0) return;
    const panel = document.getElementById(`${uid}-panel`);
    if (!panel) return;
    const target = Math.max(0, panel.getBoundingClientRect().top + window.scrollY - 12);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (Math.abs(window.scrollY - target) > 1) window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  }, [moves, uid]);

  /* Touch swipe and trackpad gestures. Vertical movement is never touched; only a deliberate, mostly horizontal one counts. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let start: { x: number; y: number; t: number; edgeNext: boolean; edgePrev: boolean } | null = null;
    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) { start = null; return; }
      const touch = event.touches[0];
      const scroller = sideScroller(event.target, el);
      start = { x: touch.clientX, y: touch.clientY, t: Date.now(), edgeNext: scrollerLeaves(scroller, true), edgePrev: scrollerLeaves(scroller, false) };
    };
    const onEnd = (event: TouchEvent) => {
      if (!start) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x, dy = touch.clientY - start.y, elapsed = Date.now() - start.t;
      const allowed = dx < 0 ? start.edgeNext : start.edgePrev;
      start = null;
      if (!allowed) return;
      if (Date.now() < lockUntil.current || elapsed > 900) return;
      if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * SWIPE_DOMINANCE) return;
      lockUntil.current = Date.now() + LOCK_MS;
      stepRef.current(dx < 0 ? 1 : -1);
    };

    let sum = 0, quiet = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.5 || !scrollerLeaves(sideScroller(event.target, el), event.deltaX > 0)) return;
      event.preventDefault(); // a sideways gesture here must not also trigger the browser's back/forward swipe
      window.clearTimeout(quiet);
      quiet = window.setTimeout(() => { sum = 0; }, 160);
      if (Date.now() < lockUntil.current) return;
      sum += event.deltaX;
      if (Math.abs(sum) >= WHEEL_MIN) { const by = sum > 0 ? 1 : -1; sum = 0; lockUntil.current = Date.now() + LOCK_MS; stepRef.current(by); }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(quiet);
    };
  }, []);

  /* A sideways trackpad gesture must not also trigger the browser's own back/forward swipe on this page. */
  useEffect(() => {
    const html = document.documentElement;
    html.style.overscrollBehaviorX = "none";
    return () => { html.style.overscrollBehaviorX = ""; };
  }, []);

  /* Dots behave like a row of tabs: arrow keys move between them. */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const by = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[event.key];
    if (!by) return;
    event.preventDefault();
    const target = Math.min(last, Math.max(0, active + by));
    go(target);
    dots.current[target]?.focus();
  };

  return (
    <div className={`page-shell es ${className}`.trim()} ref={root}>
      <p className="sr" aria-live="polite">Section {active + 1} of {sections.length}: {sections[active].label}</p>

      <div className="es-panel" id={`${uid}-panel`} data-dir={dir ?? undefined} role="tabpanel" aria-labelledby={`${uid}-tab-${sections[active].id}`} key={active}>
        {sections[active].render(go)}
      </div>

      <div className="es-dock" role="group" aria-label="Chapters">
        {active === 0 && !swiped && (
          <p className="es-hint"><span className="es-hint-m">Swipe to explore →</span><span className="es-hint-d">Swipe or use trackpad →</span></p>
        )}
        <div className="es-dock-pill">
          <div className="es-dots" role="tablist" aria-label="Chapters" onKeyDown={onKeyDown}>
            {sections.map((section, index) => (
              <button
                key={section.id}
                ref={(node) => { dots.current[index] = node; }}
                id={`${uid}-tab-${section.id}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls={`${uid}-panel`}
                aria-current={active === index ? "step" : undefined}
                tabIndex={active === index ? 0 : -1}
                aria-label={`Go to chapter ${index + 1}: ${section.label}`}
                onClick={() => go(index)}
              />
            ))}
          </div>
          <p className="es-count" aria-hidden="true">{active + 1} / {sections.length}</p>
        </div>
      </div>

      {active === last && (
        <div className="es-end">
          <Link className="is-next" href={next.href}>{next.label} <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </div>
  );
}
