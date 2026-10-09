"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

export type CaseSection = { id: string; label: string; render: (go: (index: number) => void) => ReactNode };

/*
  Shared shell for every full case study. Each chapter is one view:
    - vertical movement reads the chapter, horizontal movement changes it (swipe, trackpad, arrows, selector)
    - exactly one chapter per gesture, and the new chapter always opens at its beginning
    - the site navigation tucks away while reading down and returns on scroll up
  Chapter count comes from the sections passed in, so nothing here assumes eight.
*/

const SWIPE_MIN = 56;        // px of horizontal travel before a touch swipe counts
const SWIPE_DOMINANCE = 1.6; // horizontal travel must beat vertical travel by this factor
const WHEEL_MIN = 70;        // accumulated horizontal wheel delta before a trackpad gesture counts
const LOCK_MS = 550;         // after a change, ignore further gestures for this long

/* A gesture that starts inside something that scrolls sideways (such as a phone-screen row) belongs to that element. */
function inSideScroller(target: EventTarget | null, boundary: HTMLElement) {
  for (let el = target as HTMLElement | null; el && el !== boundary; el = el.parentElement) {
    if (el.matches?.("input, select, textarea")) return true;
    if (el.scrollWidth > el.clientWidth + 1) {
      const overflowX = getComputedStyle(el).overflowX;
      if (overflowX === "auto" || overflowX === "scroll") return true;
    }
  }
  return false;
}

export function CaseShell({ sections, next, className = "" }: { sections: CaseSection[]; next: { href: string; label: string }; className?: string }) {
  const [active, setActive] = useState(0);
  const [moves, setMoves] = useState(0);
  const [dir, setDir] = useState<"next" | "prev" | null>(null);
  const [swiped, setSwiped] = useState(false);
  const uid = useId();
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
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

  useEffect(() => {
    const index = sections.findIndex((section) => `#${section.id}` === window.location.hash);
    if (index <= 0) return;
    const timer = window.setTimeout(() => setActive(index), 0);
    return () => window.clearTimeout(timer);
  }, [sections]);

  /* Every way of changing chapter goes through here. */
  const go = (index: number) => {
    const target = Math.min(last, Math.max(0, index));
    if (target === active) return;
    document.documentElement.dataset.navLock = String(Date.now() + 1000);
    setDir(target > active ? "next" : "prev");
    setActive(target);
    window.history.replaceState(null, "", `#${sections[target].id}`);
    setMoves((count) => count + 1);
  };

  /* The gesture listeners are attached once, so they call the latest version through this. */
  useEffect(() => { stepRef.current = (by) => go(active + by); });

  /* After a chapter changes, bring its beginning just below the sticky chapter navigation. */
  useEffect(() => {
    if (moves === 0) return;
    const nav = document.getElementById(`${uid}-nav`);
    const panel = document.getElementById(`${uid}-panel`);
    if (!nav || !panel) return;
    const target = Math.max(0, panel.getBoundingClientRect().top + window.scrollY - nav.getBoundingClientRect().bottom);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (Math.abs(window.scrollY - target) > 1) window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
  }, [moves, uid]);

  /* Touch swipe and trackpad gestures. Vertical movement is never touched; only a deliberate, mostly horizontal one counts. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    let start: { x: number; y: number; t: number; ok: boolean } | null = null;
    const onStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) { start = null; return; }
      const touch = event.touches[0];
      start = { x: touch.clientX, y: touch.clientY, t: Date.now(), ok: !inSideScroller(event.target, el) };
    };
    const onEnd = (event: TouchEvent) => {
      if (!start || !start.ok) { start = null; return; }
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x, dy = touch.clientY - start.y, elapsed = Date.now() - start.t;
      start = null;
      if (Date.now() < lockUntil.current || elapsed > 900) return;
      if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * SWIPE_DOMINANCE) return;
      lockUntil.current = Date.now() + LOCK_MS;
      stepRef.current(dx < 0 ? 1 : -1);
      setSwiped(true);
      try { sessionStorage.setItem("cs-swiped", "1"); } catch {}
    };

    let sum = 0, quiet = 0;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) * 1.5 || inSideScroller(event.target, el)) return;
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

  /* Site navigation: hides while reading down, returns on scroll up, always visible near the top. */
  useEffect(() => {
    const html = document.documentElement;
    let lastY = window.scrollY, frame = 0;
    const set = (hidden: boolean) => { if (hidden) html.dataset.caseNav = "hidden"; else delete html.dataset.caseNav; };
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const locked = Date.now() < Number(html.dataset.navLock || 0);
      if (y < 60) set(false);
      else if (!locked) {
        if (y - lastY > 10) set(true);
        else if (lastY - y > 10) set(false);
        else return; // too small a movement: keep the current state and the reference point
      }
      lastY = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read); };
    window.addEventListener("scroll", onScroll, { passive: true });
    html.style.overscrollBehaviorX = "none";
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      delete html.dataset.caseNav;
      delete html.dataset.navLock;
      html.style.overscrollBehaviorX = "";
    };
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const by = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[event.key];
    if (!by) return;
    event.preventDefault();
    const target = Math.min(last, Math.max(0, active + by));
    go(target);
    tabs.current[target]?.focus();
  };

  const arrow = (by: 1 | -1) => {
    const disabled = by === 1 ? active === last : active === 0;
    const name = sections[active + by]?.label;
    return (
      <button type="button" className={`es-arrow ${by === 1 ? "is-next" : "is-prev"}`} onClick={() => go(active + by)} disabled={disabled} aria-label={by === 1 ? `Next chapter${name ? `: ${name}` : ""}` : `Previous chapter${name ? `: ${name}` : ""}`}>
        <span aria-hidden="true">{by === 1 ? "→" : "←"}</span>
      </button>
    );
  };

  return (
    <div className={`page-shell es ${className}`.trim()} ref={root}>
      <div className="es-nav" id={`${uid}-nav`} style={{ "--prog": (active + 1) / sections.length } as CSSProperties}>
        <div className="es-nav-row">
          <div className="es-nav-main">
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
        </div>
        <div className="es-cue">
          <div className="es-cue-top">
            {arrow(-1)}
            <p className="es-count" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}</p>
            {arrow(1)}
          </div>
          <div className="es-dots" role="group" aria-label="Chapters">
            {sections.map((section, index) => (
              <button key={section.id} type="button" onClick={() => go(index)} aria-current={active === index ? "step" : undefined} aria-label={`Go to chapter ${index + 1}: ${section.label}`} />
            ))}
          </div>
          {active === 0 && !swiped && <p className="es-hint">Swipe to explore <span aria-hidden="true">→</span></p>}
        </div>
      </div>

      <p className="sr" aria-live="polite">Section {active + 1} of {sections.length}: {sections[active].label}</p>

      <div className="es-panel" id={`${uid}-panel`} data-dir={dir ?? undefined} role="tabpanel" aria-labelledby={`${uid}-tab-${sections[active].id}`} key={active}>
        {sections[active].render(go)}
      </div>

      {active === last && (
        <div className="es-end">
          <Link className="is-next" href={next.href}>{next.label} <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </div>
  );
}
