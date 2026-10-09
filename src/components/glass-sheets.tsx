"use client";

import { useEffect, useId, useRef } from "react";

/*
  Abstract kinetic artwork for the hero: four large translucent sheets, like thin glass or acrylic ribbons,
  overlapping so their colours mix while the graph paper shows through. No text, nothing to decode.
  Each sheet is a ribbon along a gently curving line. Its width swells and narrows, which reads as folding,
  and every control point drifts on its own very slow cycle, so the sheets bend, overlap and separate without repeating.
  With reduced motion the composition is drawn once and stays still.
*/

type Pt = [number, number];
type Sheet = {
  id: string;
  line: Pt[];          // centre line of the ribbon
  width: number[];     // width at each point
  from: string; to: string;   // gradient colours
  a0: number; a1: number;     // opacity at each end of the gradient
  grad: [number, number, number, number];
  drift: number;       // how far points wander, in px
};

const sheets: Sheet[] = [
  // soft lavender sheet at the back, the widest
  { id: "back", line: [[150, 120], [255, 140], [362, 172], [452, 222], [522, 300], [562, 404]], width: [60, 150, 210, 205, 150, 70], from: "#d9d8ff", to: "#e9e8ff", a0: 0.62, a1: 0.18, grad: [150, 120, 560, 400], drift: 22 },
  // mint ribbon sweeping through the middle
  { id: "mint", line: [[70, 330], [186, 252], [300, 214], [412, 238], [502, 322], [566, 452]], width: [34, 110, 158, 148, 104, 36], from: "#5fb199", to: "#cdeae3", a0: 0.5, a1: 0.2, grad: [70, 330, 566, 452], drift: 28 },
  // purple, the strongest, falling from the top right
  { id: "violet", line: [[548, 24], [472, 146], [402, 252], [330, 344], [248, 428], [172, 528]], width: [30, 118, 168, 156, 112, 40], from: "#6966f5", to: "#b7b5ff", a0: 0.62, a1: 0.2, grad: [548, 24, 172, 528], drift: 26 },
  // muted coral, a shorter sweep at the front
  { id: "coral", line: [[292, 596], [356, 506], [428, 428], [500, 366], [566, 312], [604, 262]], width: [28, 76, 118, 106, 72, 22], from: "#e58a7b", to: "#f5cdd7", a0: 0.5, a1: 0.18, grad: [292, 596, 604, 262], drift: 20 },
];

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(41);
/* Per control point: how it drifts and how its width breathes. Periods are 55 to 110 seconds. */
const motion = sheets.map((sheet) =>
  sheet.line.map(() => ({
    wx: (Math.PI * 2) / (55 + rand() * 55), wy: (Math.PI * 2) / (55 + rand() * 55), ww: (Math.PI * 2) / (45 + rand() * 50),
    px: rand() * 6.28, py: rand() * 6.28, pw: rand() * 6.28,
    ax: 0.5 + rand() * 0.5, ay: 0.5 + rand() * 0.5, aw: 0.18 + rand() * 0.2,
  })),
);
const REST = 14; // seconds into the cycle for the still composition

/* Smooth closed curve through points (Catmull-Rom as cubic Beziers). */
function closed(points: Pt[]) {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n];
  let d = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}
function open(points: Pt[]) {
  const n = points.length;
  const at = (i: number) => points[Math.min(n - 1, Math.max(0, i))];
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/* The three paths of one sheet at time t: the body, a lighter band of sheen along the fold, and the crease line. */
function shape(index: number, t: number) {
  const sheet = sheets[index];
  const m = motion[index];
  const centre: Pt[] = sheet.line.map(([x, y], i) => [x + Math.sin(m[i].wx * t + m[i].px) * sheet.drift * m[i].ax, y + Math.cos(m[i].wy * t + m[i].py) * sheet.drift * m[i].ay]);
  const w = sheet.width.map((v, i) => v * (1 + Math.sin(m[i].ww * t + m[i].pw) * m[i].aw));
  const normal = (i: number): Pt => {
    const a = centre[Math.max(0, i - 1)], b = centre[Math.min(centre.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len];
  };
  const edge = (offset: (i: number) => number, spread: (i: number) => number) => {
    const left: Pt[] = [], right: Pt[] = [];
    centre.forEach((c, i) => {
      const nrm = normal(i), o = offset(i), h = spread(i) / 2;
      left.push([c[0] + nrm[0] * (o + h), c[1] + nrm[1] * (o + h)]);
      right.push([c[0] + nrm[0] * (o - h), c[1] + nrm[1] * (o - h)]);
    });
    return [...left, ...right.reverse()];
  };
  const body = closed(edge(() => 0, (i) => w[i]));
  const sheen = closed(edge((i) => w[i] * 0.16, (i) => w[i] * 0.3));
  const crease = open(centre.map((c, i) => { const nrm = normal(i); return [c[0] + nrm[0] * w[i] * 0.04, c[1] + nrm[1] * w[i] * 0.04] as Pt; }));
  return { body, sheen, crease };
}

export function GlassSheets() {
  const uid = useId().replace(/:/g, "");
  const refs = useRef<{ body: SVGPathElement | null; sheen: SVGPathElement | null; crease: SVGPathElement | null }[]>(sheets.map(() => ({ body: null, sheen: null, crease: null })));
  const root = useRef<HTMLDivElement>(null);
  const id = (name: string) => `${uid}-${name}`;

  useEffect(() => {
    const host = root.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let timer = 0;
    let onScreen = true;
    const draw = () => {
      const t = REST + (performance.now() - start) / 1000;
      sheets.forEach((_, i) => {
        const s = shape(i, t), r = refs.current[i];
        r.body?.setAttribute("d", s.body); r.sheen?.setAttribute("d", s.sheen); r.crease?.setAttribute("d", s.crease);
      });
    };
    const run = () => { if (!timer && onScreen && !document.hidden) timer = window.setInterval(draw, 50); };
    const stop = () => { window.clearInterval(timer); timer = 0; };
    const visible = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; if (onScreen) run(); else stop(); });
    visible.observe(host);
    const onVisibility = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVisibility);
    run();
    return () => { stop(); visible.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return (
    <div className="art" ref={root} aria-hidden="true">
      <svg viewBox="0 0 640 640" focusable="false">
        <defs>
          {sheets.map((sheet) => (
            <linearGradient key={sheet.id} id={id(sheet.id)} gradientUnits="userSpaceOnUse" x1={sheet.grad[0]} y1={sheet.grad[1]} x2={sheet.grad[2]} y2={sheet.grad[3]}>
              <stop offset="0" stopColor={sheet.from} stopOpacity={sheet.a0} />
              <stop offset="1" stopColor={sheet.to} stopOpacity={sheet.a1} />
            </linearGradient>
          ))}
          <linearGradient id={id("sheen")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {sheets.map((sheet, i) => {
          const s = shape(i, REST);
          return (
            <g key={sheet.id}>
              <path ref={(el) => { refs.current[i].body = el; }} d={s.body} fill={`url(#${id(sheet.id)})`} stroke="#fff" strokeOpacity="0.65" strokeWidth="1.1" strokeLinejoin="round" />
              <path ref={(el) => { refs.current[i].sheen = el; }} d={s.sheen} fill={`url(#${id("sheen")})`} opacity="0.55" />
              <path ref={(el) => { refs.current[i].crease = el; }} d={s.crease} fill="none" stroke={sheet.from} strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
