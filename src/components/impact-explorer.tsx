"use client";

import { useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

/*
  Bar widths use only the two numbers we know. Percentages are drawn against a
  100% track. "4+" and "<1" are bounds, so those bars fade out instead of ending hard.
  The licence bar is dashed because the figure is an estimate.
*/
type Bars = { before: number; after: number; beforeLabel?: string; afterLabel?: string; beforeOpen?: boolean; afterOpen?: boolean; estimate?: boolean };
type Evidence = { label: string; from?: string; to: string; note?: string; tag?: string; bars?: Bars };
type Category = {
  id: string;
  tab: string;
  title: string;
  evidence: Evidence[];
  changed: string;
  because: string[];
  more: string[];
};

const categories: Category[] = [
  {
    id: "time",
    tab: "Time",
    title: "Time",
    evidence: [{ label: "Payroll processing", from: "4+ days", to: "<1 day", bars: { before: 1, after: 0.25, beforeOpen: true, afterOpen: true } }],
    changed: "Attendance, payroll rules, validation, approvals, and exception handling became more connected.",
    because: ["Less processing time", "Less rework", "More team capacity"],
    more: ["Less administrative effort", "Less investigation and rework", "The team recovered capacity for higher-value work"],
  },
  {
    id: "capacity",
    tab: "Capacity",
    title: "Capacity",
    evidence: [
      { label: "Candidate screenings", from: "35/day", to: "105/day", note: "Approximately 3× capacity", bars: { before: 35 / 105, after: 1 } },
      { label: "Weekly attrition", from: "~30–50", to: "<10" },
    ],
    changed: "Recruiters could move significantly more candidates through screening without proportional growth in recruiting capacity.",
    because: ["~3× screening capacity", "Faster staffing", "Better training-class fill"],
    more: ["Reduced a staffing bottleneck", "Improved the ability to fill training classes", "Supported faster staffing as client programs grew"],
  },
  {
    id: "quality",
    tab: "Quality",
    title: "Quality",
    evidence: [
      { label: "Payroll complaints per cycle", from: "~300", to: "~5", note: "Approximately 98% reduction", bars: { before: 1, after: 5 / 300 } },
      { label: "Employee documents complete", from: "~50%", to: "~99%", bars: { before: 0.5, after: 0.99 } },
    ],
    changed: "Calculations, validation, and approvals were connected, and employee documents moved into digital collection, validation, and tracking.",
    because: ["~98% fewer complaints", "Less rework", "More reliable payroll"],
    more: ["Fewer payroll disputes", "More reliable employee records", "Better audit readiness", "Less manual HR follow-up"],
  },
  {
    id: "cost",
    tab: "Cost",
    title: "Cost",
    evidence: [{ label: "Third-party license cost", to: "~75%", tag: "Estimated", note: "Estimated reduction in third-party license cost", bars: { before: 1, after: 0.25, beforeLabel: "Before", afterLabel: "After, est.", estimate: true } }],
    changed: "Employee lifecycle events became connected with provisioning and deprovisioning.",
    because: ["Unused licenses removed", "Lower recurring software cost", "Better access governance"],
    more: ["Unused licenses could be identified and removed", "About 25 unused licenses avoided each week, per my career records", "The reduction is an estimate and hasn’t been independently validated"],
  },
  {
    id: "risk",
    tab: "Risk",
    title: "Risk and control",
    evidence: [
      { label: "Schedule adherence", from: "~50%", to: "~90%", bars: { before: 0.5, after: 0.9 } },
      { label: "Employee transfers", to: "200+/month", note: "~99% billing accuracy" },
    ],
    changed: "Managers could see whether planned staffing was actually being delivered. Transfers touched Operations, Payroll, Finance, IT, reporting, client assignment, cost centers, and billing, and connecting them cut manual coordination.",
    because: ["Better visibility", "Earlier intervention", "Client coverage"],
    more: ["Earlier identification of coverage gaps", "Better capacity decisions", "Lower risk to billable hours", "Less risk of billing errors and revenue leakage"],
  },
  {
    id: "scale",
    tab: "Scale",
    title: "Scale",
    evidence: [
      { label: "Employees supported", from: "~300", to: "2,000+", note: "7 locations · 20+ client programs", bars: { before: 300 / 1950, after: 1, beforeLabel: "Earlier", afterLabel: "Later" } },
    ],
    changed: "The hierarchy, permissions, employee model, and workflows supported major organizational growth without the product being structurally rebuilt.",
    because: ["One employee model", "Hierarchy and permissions", "Workflows that scale"],
    more: ["The product and operating infrastructure supported the organization during a period of rapid expansion in which monthly revenue grew from approximately $500K to $3M"],
  },
];

const fill = (width: number, order: number): CSSProperties => ({ "--w": width, "--o": order } as CSSProperties);

function EvidenceBlock({ item }: { item: Evidence }) {
  return (
    <div className="ev">
      <p className="ev-label">{item.label}{item.tag && <span className="ev-tag">{item.tag}</span>}</p>
      <p className="ev-numbers">
        {item.from && <><span className="ev-from"><span className="sr">From </span>{item.from}</span><span className="ev-arrow" aria-hidden="true">→</span></>}
        <strong className="ev-to">{item.from && <span className="sr">To </span>}{item.to}</strong>
      </p>
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
    </div>
  );
}

export function ImpactExplorer() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = categories[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : categories.length - 1;
      setActive(next);
      tabs.current[next]?.focus();
      return;
    }
    const step = keys[event.key];
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
        <div className="tabs" role="tablist" aria-label="Business impact" onKeyDown={onKeyDown}>
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
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setActive(index); }}
            >
              <span className="tab-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {category.tab}
            </button>
          ))}
        </div>

        <div className="explorer-panel" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${current.id}`} key={current.id}>
          <h3 className="sr">{current.title}</h3>
          <div className="flow">
            <section className="flow-col flow-evidence" aria-label="Evidence">
              <p className="flow-title">Evidence</p>
              {current.evidence.map((item) => <EvidenceBlock item={item} key={item.label} />)}
            </section>
            <span className="flow-link" aria-hidden="true" />
            <section className="flow-col flow-changed" aria-label="What changed">
              <p className="flow-title">What changed</p>
              <p className="changed">{current.changed}</p>
            </section>
            <span className="flow-link" aria-hidden="true" />
            <section className="flow-col flow-because" aria-label="Why it mattered">
              <p className="flow-title">Why it mattered</p>
              <ul className="because">
                {current.because.map((item, index) => <li key={item} style={{ "--i": index } as CSSProperties}>{item}</li>)}
              </ul>
            </section>
          </div>
          <details className="more">
            <summary>More detail<span aria-hidden="true">+</span></summary>
            <ul>{current.more.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        </div>
      </div>
    </div>
  );
}
