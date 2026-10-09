"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const path = [
  { when: "2018", verb: "Understand", role: "Analyst", line: "Understand the business", org: "Fusion CX" },
  { when: "", verb: "Deliver", role: "Product owner", line: "Turn complexity into requirements", org: "Fusion CX" },
  { when: "", verb: "Own", role: "Product manager", line: "Own the system", org: "Fusion CX" },
  { when: "", verb: "Build", role: "Co-founder + product", line: "Build for a market", org: "MOM Seguros" },
  { when: "", verb: "Scale", role: "Senior product manager", line: "Scale operations", org: "Fusion CX" },
  { when: "Today", verb: "Lead", role: "Product + GTM", line: "Find what is worth building", org: "Stealth Telecom Technology" },
];
const STEP = 520; // ms between stages
const DRAW = 440; // ms for the line to reach the next dot

/*
  Scroll-driven, plays once. Stage i lights up when the line reaches it:
  the segment before it starts drawing at i * STEP and the stage activates DRAW ms later.
  Without scripting, or with reduced motion, everything is simply shown.
*/
export function CareerJourney() {
  const list = useRef<HTMLOListElement>(null);
  const [state, setState] = useState<"idle" | "play" | "done">("idle");
  const [lines, setLines] = useState(0); // segments drawn
  const [on, setOn] = useState(0); // stages activated

  useEffect(() => {
    const node = list.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => { setLines(path.length); setOn(path.length); setState("done"); };
    if (reduced || !("IntersectionObserver" in window)) { const t = window.setTimeout(finish, 0); return () => window.clearTimeout(t); }

    const timers: number[] = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setState("play");
      setOn(1);
      path.forEach((_, i) => {
        if (i === 0) return;
        timers.push(window.setTimeout(() => setLines(i), i * STEP));
        timers.push(window.setTimeout(() => setOn(i + 1), i * STEP + DRAW));
      });
      timers.push(window.setTimeout(() => setState("done"), path.length * STEP + DRAW));
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => { observer.disconnect(); timers.forEach(window.clearTimeout); };
  }, []);

  return (
    <ol className="pp" ref={list} data-state={state}>
      {path.map((step, index) => (
        <li key={step.verb} data-on={index < on ? "" : undefined} data-line={index < lines ? "" : undefined} style={{ "--i": index } as CSSProperties}>
          <span className="pp-when">{step.when}</span>
          <span className="pp-dot" aria-hidden="true" />
          <div className="pp-body">
            <span className="pp-verb">{step.verb}</span>
            <span className="pp-role">{step.role}</span>
            <span className="pp-line">{step.line}</span>
            <span className="pp-org">{step.org}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
