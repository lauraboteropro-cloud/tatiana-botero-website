"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

const mouseOnly = (event: { pointerType: string }) => event.pointerType === "mouse";

/* ---------- 1. Before to after: fragments resolve into one lifecycle ---------- */

const fragments: [string, number, number, number][] = [
  ["Spreadsheets", 4, 8, -3], ["WhatsApp", 38, 0, 2], ["Email", 70, 12, -2],
  ["Paper", 18, 38, 3], ["HR files", 52, 42, -3], ["Payroll files", 4, 68, 2], ["Employee lists", 44, 74, -2],
];
const lifecycle = ["Recruit", "Onboard", "Train", "Schedule", "Work", "Perform", "Pay", "Transfer", "Offboard"];

export function Transformation() {
  const [after, setAfter] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timer = window.setTimeout(() => setAfter(true), reduced ? 0 : 1700);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  return (
    <div className="ec-tx" ref={root}>
      <div className="ec-switch" role="group" aria-label="Show the company as">
        <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>Before</button>
        <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>After</button>
      </div>
      <div className={`ec-tx-stage has-grid${after ? " is-after" : ""}`}>
        <div className="ec-frags" aria-hidden={after}>
          {fragments.map(([name, x, y, r]) => (
            <span className="ec-frag" key={name} style={{ "--x": `${x}%`, "--y": `${y}%`, "--r": `${r}deg` } as CSSProperties}>{name}</span>
          ))}
          <p className="ec-frag-note">One employee, moving through multiple teams</p>
        </div>
        <div className="ec-life" aria-hidden={!after}>
          <p className="ec-life-title">Connected employee lifecycle</p>
          <ol>
            {lifecycle.map((step, index) => <li key={step} style={{ "--i": index } as CSSProperties}><span className="ec-life-dot" aria-hidden="true" />{step}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Radial map: one thing at the centre, everything it touches around it ---------- */

type RadialProps = { center: string; items: string[]; mode: "interactive" | "static"; label: string };

export function RadialMap({ center, items, mode, label }: RadialProps) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const on = mode === "static" || hover || pinned;
  const [rx, ry] = [315, 185];

  const points = items.map((_, index) => {
    const angle = ((-90 + (index * 360) / items.length) * Math.PI) / 180;
    return { x: 400 + rx * Math.cos(angle), y: 240 + ry * Math.sin(angle) };
  });

  return (
    <div className={`ec-radial${on ? " is-on" : ""}`} data-mode={mode} aria-label={label} role="group">
      <svg viewBox="0 0 800 480" aria-hidden="true">
        {points.map((point, index) => (
          <g key={items[index]}>
            <line className="ec-ray-off" x1="400" y1="240" x2={point.x} y2={point.y} />
            <line className="ec-ray-on" x1="400" y1="240" x2={point.x} y2={point.y} pathLength="1" style={{ "--d": `${index * 70}ms` } as CSSProperties} />
          </g>
        ))}
      </svg>
      {points.map((point, index) => (
        <span className="ec-rnode" key={items[index]} style={{ "--x": `${(point.x / 8).toFixed(2)}%`, "--y": `${(point.y / 4.8).toFixed(2)}%`, "--d": `${index * 70}ms` } as CSSProperties}>{items[index]}</span>
      ))}
      {mode === "interactive" ? (
        <button
          type="button"
          className="ec-rcenter"
          aria-pressed={pinned}
          onClick={() => setPinned(!pinned)}
          onPointerEnter={(event) => { if (mouseOnly(event)) setHover(true); }}
          onPointerLeave={(event) => { if (mouseOnly(event)) setHover(false); }}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
        >{center}<span className="ec-rcenter-hint" aria-hidden="true">{on ? "" : "Tap to trace"}</span></button>
      ) : (
        <span className="ec-rcenter">{center}</span>
      )}
    </div>
  );
}

/* ---------- 3. My role grew with the product ---------- */

const spectrum = [
  { stage: "Discover", items: ["User research", "Stakeholder interviews", "Process mapping", "Problem framing", "Business analysis"] },
  { stage: "Define", items: ["Product strategy", "Business rules", "Requirements", "Permissions", "Prioritization", "Roadmapping"] },
  { stage: "Build", items: ["User stories", "Acceptance criteria", "Engineering collaboration", "QA / testing", "Workflow design"] },
  { stage: "Launch", items: ["Release validation", "Implementation", "Training", "Change management"] },
  { stage: "Adopt", items: ["User support", "Feedback", "Workflow improvement", "Analytics"] },
  { stage: "Scale", items: ["Architecture", "Cross-functional dependencies", "New locations", "New client programs", "Ongoing product strategy"] },
];

export function RoleSpectrum() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const move: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = move[event.key];
    if (!step) return;
    event.preventDefault();
    const next = Math.min(spectrum.length - 1, Math.max(0, active + step));
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="ec-spec" style={{ "--p": active / (spectrum.length - 1) } as CSSProperties}>
      <div className="ec-spec-rail" aria-hidden="true"><i /></div>
      <div className="ec-spec-stages" onKeyDown={onKeyDown}>
        {spectrum.map((item, index) => {
          const open = active === index;
          return (
            <div className={`ec-spec-stage${open ? " is-open" : ""}${index <= active ? " is-reached" : ""}`} key={item.stage}>
              <button
                type="button"
                ref={(node) => { buttons.current[index] = node; }}
                aria-expanded={open}
                aria-controls={`${uid}-${index}`}
                onClick={() => setActive(index)}
                onPointerEnter={(event) => { if (mouseOnly(event) && window.matchMedia("(min-width: 860px)").matches) setActive(index); }}
              >
                <span className="ec-spec-dot" aria-hidden="true" />
                <span className="ec-spec-n">{String(index + 1).padStart(2, "0")}</span>
                <span className="ec-spec-name">{item.stage}</span>
              </button>
              <ul className="ec-spec-inline" id={`${uid}-${index}`}>{item.items.map((entry) => <li key={entry}>{entry}</li>)}</ul>
            </div>
          );
        })}
      </div>
      <ul className="ec-spec-panel" aria-live="polite" key={active}>
        {spectrum[active].items.map((entry, index) => <li key={entry} style={{ "--i": index } as CSSProperties}>{entry}</li>)}
      </ul>
    </div>
  );
}

/* ---------- 4. Business impact explorer ---------- */

type Bars = { before: number; after: number; beforeLabel?: string; afterLabel?: string; beforeOpen?: boolean; afterOpen?: boolean; estimate?: boolean };
type Evidence = { label: string; from?: string; to?: string; note?: string; tag?: string; bars?: Bars; meter?: number; stats?: [string, string][] };
type Category = { id: string; tab: string; title: string; evidence: Evidence[]; chain: string[]; meaning?: string };

const categories: Category[] = [
  {
    id: "time", tab: "Time", title: "Time",
    evidence: [
      { label: "Payroll processing", from: "4+ days", to: "<1 day", bars: { before: 1, after: 0.25, beforeOpen: true, afterOpen: true } },
      { label: "Payroll complaints per cycle", from: "~300", to: "~5", bars: { before: 1, after: 5 / 300 } },
    ],
    chain: ["Connected attendance + payroll data", "Less manual processing", "Less investigation + rework", "More team capacity"],
    meaning: "Faster payroll processing gave HR and Payroll time back and reduced the effort spent investigating errors and complaints.",
  },
  {
    id: "capacity", tab: "Capacity", title: "Capacity",
    evidence: [
      { label: "Candidate screenings", from: "~35/day", to: "~105/day", note: "~3× capacity", bars: { before: 35 / 105, after: 1 } },
      { label: "Training classes filled on time", to: "~90%" },
    ],
    chain: ["More screening capacity", "Fewer recruiting bottlenecks", "Faster staffing", "Better ability to support growing client programs"],
    meaning: "The system increased operational capacity without recruiting capacity having to grow in proportion.",
  },
  {
    id: "quality", tab: "Quality", title: "Quality",
    evidence: [
      { label: "Payroll complaints per cycle", from: "~300", to: "~5", note: "~98% reduction", bars: { before: 1, after: 5 / 300 } },
      { label: "Employee document completion", from: "~50%", to: "~99%", bars: { before: 0.5, after: 0.99 } },
    ],
    chain: ["More reliable records", "Less manual follow-up", "Standardized employee information", "Better audit readiness"],
  },
  {
    id: "cost", tab: "Cost", title: "Cost",
    evidence: [
      { label: "Third-party license cost", to: "~75%", tag: "Estimated", note: "Estimated reduction", bars: { before: 1, after: 0.25, afterLabel: "After, est.", estimate: true } },
      { label: "Unused licenses avoided weekly", to: "~25" },
    ],
    chain: ["Employee status connected to access", "Faster deprovisioning", "Fewer unused licenses", "Lower recurring software cost"],
    meaning: "The 75% figure is an estimate from my career records, not an independently validated calculation.",
  },
  {
    id: "risk", tab: "Risk", title: "Risk",
    evidence: [{ label: "Schedule adherence", from: "~50%", to: "~90%", bars: { before: 0.5, after: 0.9 } }],
    chain: ["Better staffing visibility", "Earlier identification of coverage gaps", "Faster intervention", "More reliable client coverage"],
    meaning: "This is operational and service-delivery risk. I’m not assigning a dollar value to it.",
  },
  {
    id: "revenue", tab: "Revenue protection", title: "Revenue protection",
    evidence: [
      { label: "Employee transfers", to: "200+/month" },
      { label: "Billing accuracy", to: "~99%", meter: 0.99 },
      { label: "Schedule adherence", from: "~50%", to: "~90%", bars: { before: 0.5, after: 0.9 } },
    ],
    chain: ["Staffing visibility + schedule adherence", "Transfers synchronized across Operations, Finance, Payroll, IT, reporting, and billing", "Client coverage and billing stay accurate", "The conditions to deliver and bill client commitments are protected"],
    meaning: "These workflows helped protect the operational conditions required to deliver client commitments and bill accurately. I’m not attributing a dollar amount to them.",
  },
  {
    id: "scale", tab: "Scale", title: "Scale",
    evidence: [
      { label: "Employees supported", from: "~300", to: "2,000+", bars: { before: 0.15, after: 1, beforeLabel: "Earlier", afterLabel: "Later" } },
      { label: "What it supported", stats: [["7", "locations"], ["20+", "client programs"]] },
    ],
    chain: ["Shared employee model + hierarchy + permissions + connected workflows", "More organizational complexity without a structural rebuild"],
    meaning: "Business context: during the broader company growth period, monthly company revenue grew from approximately $500K to $3M. The product and operating infrastructure supported the organization during that period.",
  },
];

const more = [
  { v: "~30–50 → <10", l: "Weekly attrition" },
  { v: "~70%", l: "PIP recovery, according to career records" },
  { v: "~60% → ~92%", l: "Leave and capacity planning accuracy" },
  { v: "200+/month", l: "Employee transfers" },
  { v: "~99%", l: "Billing accuracy" },
];

const fill = (width: number, order: number): CSSProperties => ({ "--w": width, "--o": order } as CSSProperties);

function EvidenceBlock({ item }: { item: Evidence }) {
  return (
    <div className="ev">
      <p className="ev-label">{item.label}{item.tag && <span className="ev-tag">{item.tag}</span>}</p>
      {item.stats ? (
        <ul className="ec-stats">{item.stats.map(([value, label]) => <li key={label}><strong>{value}</strong>{label}</li>)}</ul>
      ) : (
        <p className="ev-numbers">
          {item.from && <><span className="ev-from"><span className="sr">From </span>{item.from}</span><span className="ev-arrow" aria-hidden="true">→</span></>}
          <strong className="ev-to">{item.from && <span className="sr">To </span>}{item.to}</strong>
        </p>
      )}
      {item.note && <p className="ev-note">{item.note}</p>}
      {item.bars && (
        <div className={`ev-bars${item.bars.estimate ? " is-estimate" : ""}`} aria-hidden="true">
          {([[item.bars.beforeLabel ?? "Before", item.bars.before, "before", item.bars.beforeOpen], [item.bars.afterLabel ?? "After", item.bars.after, "after", item.bars.afterOpen]] as const).map(([name, width, kind, open], index) => (
            <div className="ev-bar-row" key={kind}>
              <span className="ev-bar-name">{name}</span>
              <span className={`ev-track${open ? " is-open" : ""}`}><i className={`ev-fill ev-fill-${kind}`} style={fill(width, index)} /></span>
            </div>
          ))}
        </div>
      )}
      {item.meter !== undefined && (
        <div className="ev-bars" aria-hidden="true">
          <div className="ev-bar-row"><span className="ev-bar-name">Accuracy</span><span className="ev-track"><i className="ev-fill ev-fill-after" style={fill(item.meter, 0)} /></span></div>
        </div>
      )}
    </div>
  );
}

export function CaseImpact() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = categories[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const move: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const target = event.key === "Home" ? 0 : categories.length - 1;
      setActive(target);
      tabs.current[target]?.focus();
      return;
    }
    const step = move[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + categories.length) % categories.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="explorer lit" data-glow>
      <div className="lit-light" aria-hidden="true"><span /><span /></div>
      <div className="explorer-surface glass">
        <div className="tabs ec-tabs" role="tablist" aria-label="Business impact" onKeyDown={onKeyDown}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={(node) => { tabs.current[index] = node; }}
              id={`${uid}-tab-${category.id}`}
              role="tab"
              type="button"
              aria-selected={active === index}
              aria-controls={`${uid}-panel`}
              tabIndex={active === index ? 0 : -1}
              className="tab"
              onClick={() => setActive(index)}
              onPointerEnter={(event) => { if (mouseOnly(event)) setActive(index); }}
            >{category.tab}</button>
          ))}
        </div>

        <div className="ec-impact" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${current.id}`} key={current.id}>
          <h3 className="sr">{current.title}</h3>
          <section className="ec-impact-evidence" aria-label="Evidence">
            <p className="flow-title">Evidence</p>
            {current.evidence.map((item) => <EvidenceBlock item={item} key={item.label} />)}
          </section>
          <section className="ec-impact-chain" aria-label="From operational change to business consequence">
            <p className="flow-title">From change to consequence</p>
            <ol className="ec-chain">
              {current.chain.map((step, index) => (
                <li key={step} className={index === current.chain.length - 1 ? "is-end" : undefined} style={{ "--i": index } as CSSProperties}>{step}</li>
              ))}
            </ol>
          </section>
          {current.meaning && <p className="ec-meaning">{current.meaning}</p>}
        </div>

        <details className="more ec-more">
          <summary>More outcomes<span aria-hidden="true">+</span></summary>
          <ul className="ec-more-list">{more.map((item) => <li key={item.l}><strong>{item.v}</strong>{item.l}</li>)}</ul>
        </details>
      </div>
    </div>
  );
}
