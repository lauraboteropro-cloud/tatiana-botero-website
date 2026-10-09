"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

/*
  Impact explorer: four impact views side by side in one fixed-height strip.
  Moving between them slides the content sideways in the same place, so the page never scrolls.
  The strip is a native horizontal scroller with snap points, so swipe and trackpad gestures work without extra code.
*/

type Stat = { label: string; from?: string; to: string; note?: string; tag?: string };
type View = { id: string; n: string; name: string; short: string; stats: Stat[]; line: string; chain: string[]; context?: string[] };

const views: View[] = [
  {
    id: "performance", n: "01", name: "Performance", short: "Performance",
    stats: [
      { label: "Weekly attrition", from: "~30–50", to: "<10" },
      { label: "PIP recovery", to: "~70%" },
      { label: "Schedule adherence", from: "~50%", to: "~90%" },
    ],
    line: "More consistent performance management and staffing stability.",
    chain: ["Structured coaching", "Documented intervention", "More workforce stability"],
  },
  {
    id: "efficiency", n: "02", name: "Efficiency & capacity", short: "Efficiency",
    stats: [
      { label: "Payroll processing", from: "4+ days", to: "<1 day" },
      { label: "Candidate screenings", from: "~35", to: "~105", note: "per day" },
      { label: "Training classes filled on time", to: "~90%" },
    ],
    line: "Less manual work increased operational capacity without simply adding more process.",
    chain: ["Connected information", "Less manual processing", "More operational capacity"],
  },
  {
    id: "risk", n: "03", name: "Risk & economics", short: "Risk",
    stats: [
      { label: "Employee document completion", from: "~50%", to: "~99%" },
      { label: "Employee transfers", to: "200+", note: "per month" },
      { label: "Billing accuracy", to: "~99%" },
      { label: "Third-party license cost", to: "~75%", tag: "Estimated", note: "estimated reduction" },
    ],
    line: "Connected workflows reduced avoidable cost, billing risk, and errors created when departments worked from disconnected information.",
    chain: ["Connected workflows", "Fewer disconnected updates", "Lower cost and billing risk"],
  },
  {
    id: "scale", n: "04", name: "Scale & business", short: "Scale",
    stats: [
      { label: "Employees supported", from: "~300", to: "2,000+" },
      { label: "Locations", to: "7" },
      { label: "Client programs", to: "20+" },
    ],
    line: "The product and operating infrastructure supported the organization during a period when monthly company revenue grew from approximately $500K to $3M.",
    chain: [],
    context: ["The product’s role was not to create that growth. It was to help the operation manage the complexity that came with it."],
  },
];

function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="ei-stats ex-stats">
      {stats.map((s) => (
        <div className="ei-stat" key={s.label}>
          <p className="ei-stat-label">{s.label}{s.tag && <span>{s.tag}</span>}</p>
          <p className="ei-stat-nums">
            {s.from && <><span className="ei-from"><span className="sr">From </span>{s.from}</span><i aria-hidden="true">→</i></>}
            <strong>{s.from && <span className="sr">To </span>}{s.to}</strong>
          </p>
          {s.note && <p className="ei-stat-note">{s.note}</p>}
        </div>
      ))}
    </div>
  );
}

export function ImpactStory() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const strip = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const moving = useRef(0);
  const last = views.length - 1;

  const goTo = (index: number) => {
    const el = strip.current;
    const next = Math.min(last, Math.max(0, index));
    setActive(next);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.clearTimeout(moving.current);
    moving.current = window.setTimeout(() => { moving.current = 0; }, 500);
    el.scrollTo({ left: next * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  };

  /* A swipe or trackpad gesture scrolls the strip itself; follow it. */
  const onScroll = () => {
    const el = strip.current;
    if (!el || moving.current) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active) setActive(Math.min(last, Math.max(0, index)));
  };

  /* Keep the current view in place if the strip is resized. */
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const observer = new ResizeObserver(() => { el.scrollLeft = active * el.clientWidth; });
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[event.key];
    if (!step) return;
    event.preventDefault();
    const next = Math.min(last, Math.max(0, active + step));
    goTo(next);
    tabs.current[next]?.focus();
  };

  const view = views[active];

  return (
    <div className="ex">
      <div className="ex-bar">
        <button type="button" className="ex-arrow" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous impact view"><span aria-hidden="true">←</span></button>

        <div className="ex-tabs" role="tablist" aria-label="Impact views" onKeyDown={onKeyDown}>
          {views.map((v, i) => (
            <button
              key={v.id}
              ref={(node) => { tabs.current[i] = node; }}
              type="button"
              role="tab"
              id={`${uid}-tab-${v.id}`}
              aria-selected={active === i}
              aria-controls={`${uid}-slide-${v.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => goTo(i)}
            >
              <span className="ex-tab-n" aria-hidden="true">{v.n}</span>
              <span className="ex-long">{v.name}</span>
              <span className="ex-short">{v.short}</span>
            </button>
          ))}
        </div>

        <button type="button" className="ex-arrow" onClick={() => goTo(active + 1)} disabled={active === last} aria-label="Next impact view"><span aria-hidden="true">→</span></button>
        <p className="ex-count" aria-live="polite"><span className="ex-count-name">{view.name}</span><span>{view.n} / 04</span></p>
      </div>

      <div className="ex-strip" ref={strip} onScroll={onScroll}>
        {views.map((v, i) => (
          <section
            key={v.id}
            role="tabpanel"
            id={`${uid}-slide-${v.id}`}
            aria-labelledby={`${uid}-tab-${v.id}`}
            className="ex-slide"
            data-active={active === i ? "" : undefined}
            inert={active !== i}
          >
            <Stats stats={v.stats} />
            <div className="ex-foot">
              <p className="ex-line">{v.line}</p>
              {v.chain.length > 0 && (
                <ol className="ex-chain" aria-label="How it connects">{v.chain.map((c) => <li key={c}>{c}</li>)}</ol>
              )}
              {v.context?.map((c) => <p className="ex-context" key={c}>{c}</p>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
