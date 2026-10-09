"use client";

import { useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

const mouseOnly = (event: { pointerType: string }) => event.pointerType === "mouse";

function useArrowNav(count: number, active: number, setActive: (index: number) => void, refs: React.RefObject<(HTMLButtonElement | null)[]>) {
  return (event: KeyboardEvent<HTMLElement>) => {
    const move: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = move[event.key];
    if (!step) return;
    event.preventDefault();
    const next = Math.min(count - 1, Math.max(0, active + step));
    setActive(next);
    refs.current?.[next]?.focus();
  };
}

/* ---------- 3. Discovery engine ---------- */

const engine = [
  { name: "Problem", q: "What is actually going wrong?" },
  { name: "Workflow", q: "How does the work happen today?" },
  { name: "Tools", q: "What are they already using?" },
  { name: "Friction", q: "Where does work slow down, break, or require manual effort?" },
  { name: "Business impact", q: "What does the problem affect?", chips: ["Time", "Cost", "Capacity", "Quality", "Risk", "Revenue"] },
  { name: "Buyer", q: "Who owns the problem and the budget?" },
  { name: "Urgency", q: "Why solve it now?" },
  { name: "Willingness to pay", q: "Is the problem valuable enough to fund a solution?" },
  { name: "Repeatability", q: "Does this problem exist beyond one company?" },
];

export function DiscoveryEngine() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = useArrowNav(engine.length, active, setActive, refs);
  const current = engine[active];

  return (
    <div className="ec-spec tc-engine" style={{ "--p": active / (engine.length - 1), "--n": engine.length } as CSSProperties}>
      <div className="ec-spec-rail" aria-hidden="true"><i /></div>
      <div className="ec-spec-stages" onKeyDown={onKeyDown}>
        {engine.map((step, index) => {
          const open = active === index;
          return (
            <div className={`ec-spec-stage${open ? " is-open" : ""}${index <= active ? " is-reached" : ""}`} key={step.name}>
              <button
                type="button"
                ref={(node) => { refs.current[index] = node; }}
                aria-expanded={open}
                aria-controls={`${uid}-${index}`}
                onClick={() => setActive(index)}
                onPointerEnter={(event) => { if (mouseOnly(event) && window.matchMedia("(min-width: 860px)").matches) setActive(index); }}
              >
                <span className="ec-spec-dot" aria-hidden="true" />
                <span className="ec-spec-n">{String(index + 1).padStart(2, "0")}</span>
                <span className="ec-spec-name">{step.name}</span>
              </button>
              <div className="tc-q-inline" id={`${uid}-${index}`}>
                <p>{step.q}</p>
                {step.chips && <ul>{step.chips.map((chip) => <li key={chip}>{chip}</li>)}</ul>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="tc-question glass" aria-live="polite" key={active}>
        <p className="tc-question-n">Stage {active + 1} of {engine.length} · {current.name}</p>
        <p className="tc-question-q">{current.q}</p>
        {current.chips && <ul className="tc-chips">{current.chips.map((chip) => <li key={chip}>{chip}</li>)}</ul>}
      </div>
    </div>
  );
}

/* ---------- 4. Opportunity space ---------- */

const areas = ["Customer operations / experience", "Sales performance", "Workforce", "Quality", "Training", "Employee lifecycle", "Reporting", "Data", "Workflow automation", "AI-assisted operations"];
const value = ["Revenue", "Cost", "Productivity / capacity", "Operational efficiency", "Risk"];

export function OpportunitySpace() {
  return (
    <div className="tc-opp">
      <div className="tc-opp-field has-grid">
        <p className="tc-opp-label">Areas of investigation <span>Not products</span></p>
        <ul className="tc-opp-chips">
          {areas.map((area) => <li key={area}><span className="tc-area">{area}</span></li>)}
        </ul>
        <span className="tc-opp-down" aria-hidden="true">↓</span>
        <div className="tc-opp-filter">
          <p className="tc-opp-filter-title">Business impact</p>
          <ul aria-label="Where business impact shows up">{value.map((v) => <li key={v}>{v}</li>)}</ul>
        </div>
      </div>
      <p className="tc-opp-line">A problem becomes worth pursuing when solving it creates measurable business value.</p>
    </div>
  );
}

/* ---------- 5. Product decision ---------- */

const options = [
  { name: "Integrate", text: "The capability already exists. Connect the systems instead of recreating it." },
  { name: "Automate", text: "The workflow is known but unnecessarily manual." },
  { name: "Build", text: "The problem is recurring and existing products don’t solve it well enough." },
  { name: "AI", text: "The workflow benefits from reasoning, interpretation, generation, or pattern detection." },
  { name: "Partner", text: "Someone else already solves part of the problem better." },
  { name: "Redesign the process", text: "Technology isn’t the constraint." },
  { name: "Don’t build", text: "The pain, urgency, economics, or repeatability aren’t strong enough.", end: true },
];

export function DecisionMap() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = useArrowNav(options.length, active, setActive, refs);
  const points = options.map((_, index) => {
    const angle = ((-90 + (index * 360) / options.length) * Math.PI) / 180;
    return { x: 400 + 320 * Math.cos(angle), y: 220 + 175 * Math.sin(angle) };
  });

  return (
    <div className="tc-dec">
      <div className="tc-dec-map" onKeyDown={onKeyDown}>
        <svg viewBox="0 0 800 440" aria-hidden="true">
          {points.map((point, index) => (
            <line key={options[index].name} className={`tc-dec-ray${active === index ? " is-on" : ""}`} x1="400" y1="220" x2={point.x} y2={point.y} />
          ))}
        </svg>
        <span className="tc-dec-center">Validated problem</span>
        {options.map((option, index) => (
          <div className={`tc-dec-item${active === index ? " is-on" : ""}${option.end ? " is-end" : ""}`} key={option.name} style={{ "--x": `${(points[index].x / 8).toFixed(2)}%`, "--y": `${(points[index].y / 4.4).toFixed(2)}%` } as CSSProperties}>
            <button
              type="button"
              ref={(node) => { refs.current[index] = node; }}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              onPointerEnter={(event) => { if (mouseOnly(event) && window.matchMedia("(min-width: 860px)").matches) setActive(index); }}
            >{option.name}</button>
            <p className="tc-dec-inline">{option.text}</p>
          </div>
        ))}
      </div>
      <div className="tc-dec-panel" aria-live="polite" key={active}>
        <p className="tc-dec-panel-name">{options[active].name}</p>
        <p>{options[active].text}</p>
      </div>
    </div>
  );
}

/* ---------- 7. Product and commercial paths share one set of evidence ---------- */

const productPath = ["Problem definition", "Product thesis", "MVP / intervention", "Pilot", "Productization"];
const commercialPath = ["ICP", "Buyer", "Positioning", "Value proposition", "Offer", "GTM"];

export function ProductGtm() {
  const [focus, setFocus] = useState<"both" | "product" | "commercial">("both");
  return (
    <div className="tc-pg" data-focus={focus}>
      <div className="ec-switch" role="group" aria-label="Highlight a path">
        {(["both", "product", "commercial"] as const).map((value) => (
          <button key={value} type="button" aria-pressed={focus === value} onClick={() => setFocus(value)}>{value === "both" ? "Both" : value === "product" ? "Product" : "Commercial"}</button>
        ))}
      </div>
      <div className="tc-pg-top"><span className="tc-key-node">Customer discovery</span></div>
      <div className="tc-pg-cols">
        <section className="tc-path tc-path-product" aria-label="Product path">
          <p className="tc-path-label">Product</p>
          <ol>{productPath.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
        <section className="tc-path tc-path-commercial" aria-label="Commercial path">
          <p className="tc-path-label">Commercial</p>
          <ol>{commercialPath.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
      </div>
      <div className="tc-pg-bottom"><span className="tc-key-node">Market evidence</span></div>
    </div>
  );
}

/* ---------- 8. Who has the problem ---------- */

const roles = [
  { name: "User", q: "Who experiences the workflow?" },
  { name: "Operator", q: "Who manages the problem?" },
  { name: "Buyer", q: "Who owns the budget?" },
  { name: "Executive", q: "Who cares about the business consequence?" },
];

export function WhoHasProblem() {
  const [active, setActive] = useState(2);
  return (
    <div className="tc-who">
      <div className="tc-roles" role="group" aria-label="Who is involved">
        {roles.map((role, index) => (
          <button
            key={role.name}
            type="button"
            className="tc-role"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            onPointerEnter={(event) => { if (mouseOnly(event)) setActive(index); }}
          ><strong>{role.name}</strong><span>{role.q}</span></button>
        ))}
      </div>
      <div className="tc-who-link" aria-hidden="true"><i style={{ "--k": active } as CSSProperties} /></div>
      <div className="tc-value">
        <p className="tc-value-label">Value</p>
        <ul>{["Time", "Cost", "Capacity", "Quality", "Risk", "Revenue"].map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </div>
  );
}

/* ---------- 9. From custom work to product ---------- */

const spectrumStages = ["One-off problem", "Custom implementation", "Reusable workflow", "Configurable solution", "Standardized product"];
const moveRight = ["Does the problem repeat?", "Can the workflow be reused?", "Can configuration replace customization?", "Can implementation become predictable?", "Is there a repeatable buyer?", "Is there willingness to pay?"];

export function Productization() {
  const [yes, setYes] = useState<Set<number>>(new Set());
  const position = Math.min(spectrumStages.length - 1, Math.round((yes.size * (spectrumStages.length - 1)) / moveRight.length));
  const toggle = (index: number) => setYes((previous) => { const next = new Set(previous); if (next.has(index)) next.delete(index); else next.add(index); return next; });

  return (
    <div className="tc-prod" style={{ "--pos": position, "--last": spectrumStages.length - 1 } as CSSProperties}>
      <ol className="tc-prod-line">
        {spectrumStages.map((stage, index) => (
          <li key={stage} className={index === position ? "is-here" : index < position ? "is-passed" : undefined}>
            <span className="tc-prod-dot" aria-hidden="true" />
            <span className="tc-prod-name">{stage}</span>
            {index === spectrumStages.length - 1 && <span className="tc-prod-tag">Productization</span>}
          </li>
        ))}
      </ol>
      <div className="tc-prod-questions">
        <p className="tc-prod-hint">Questions I use to move right. Tap one to see how the solution shifts.</p>
        <ul>
          {moveRight.map((question, index) => (
            <li key={question}><button type="button" aria-pressed={yes.has(index)} onClick={() => toggle(index)}>{question}</button></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- 10. The loop ---------- */

type LoopNode = { name: string; active: boolean };
const loop: LoopNode[] = [
  { name: "Market discovery", active: true },
  { name: "Problem", active: true },
  { name: "Business impact", active: true },
  { name: "Buyer", active: true },
  { name: "Product thesis", active: true },
  { name: "Pilot", active: true },
  { name: "Evidence", active: false },
  { name: "Productize or change direction", active: false },
];

export function LoopMap() {
  const [filter, setFilter] = useState<"all" | "active" | "next">("all");
  const [rx, ry, cx, cy] = [310, 185, 400, 230];
  const at = (t: number) => ({ x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t) });
  const nodes = loop.map((node, index) => ({ ...node, ...at(((-90 + (index * 360) / loop.length) * Math.PI) / 180) }));
  const arrows = loop.map((_, index) => {
    const t = ((-90 + ((index + 0.5) * 360) / loop.length) * Math.PI) / 180;
    const point = at(t);
    const angle = (Math.atan2(ry * Math.cos(t), -rx * Math.sin(t)) * 180) / Math.PI;
    return { ...point, angle };
  });
  const dim = (node: LoopNode) => (filter === "active" && !node.active) || (filter === "next" && node.active);

  return (
    <div className="tc-loop" data-filter={filter}>
      <div className="ec-switch" role="group" aria-label="Show">
        {([["all", "All"], ["active", "Active now"], ["next", "To validate"]] as const).map(([value, label]) => (
          <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
        ))}
      </div>
      <div className="tc-loop-ring">
        <svg viewBox="0 0 800 460" aria-hidden="true">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} className="tc-loop-path" />
          {arrows.map((arrow, index) => <path key={index} d="M-6 -5 L6 0 L-6 5 Z" className="tc-loop-arrow" transform={`translate(${arrow.x.toFixed(1)} ${arrow.y.toFixed(1)}) rotate(${arrow.angle.toFixed(1)})`} />)}
        </svg>
        <span className="tc-loop-center">The 0→1 loop</span>
        {nodes.map((node, index) => (
          <span key={node.name} className={`tc-loop-node ${node.active ? "is-active" : "is-next"}${dim(node) ? " is-dim" : ""}`} style={{ "--x": `${(node.x / 8).toFixed(2)}%`, "--y": `${(node.y / 4.6).toFixed(2)}%` } as CSSProperties}>
            <b aria-hidden="true">{index + 1}</b>{node.name}
          </span>
        ))}
      </div>
      <ol className="tc-loop-list" aria-label="The loop, step by step">
        {loop.map((node, index) => <li key={node.name} className={node.active ? "is-active" : "is-next"}><b aria-hidden="true">{index + 1}</b>{node.name}<span>{node.active ? "Active" : "To validate"}</span></li>)}
        <li className="tc-loop-return">↻ Back to market discovery</li>
      </ol>
      <div className="tc-loop-legend">
        <div><p className="tc-key tc-key-active">Active now</p><ul>{loop.filter((node) => node.active).map((node) => <li key={node.name}>{node.name}</li>)}</ul></div>
        <div><p className="tc-key tc-key-next">To validate</p><ul>{loop.filter((node) => !node.active).map((node) => <li key={node.name}>{node.name}</li>)}</ul></div>
      </div>
    </div>
  );
}

/* ---------- 11. Where I sit ---------- */

const sits = [
  { stage: "Market", items: ["Market validation", "Segmentation"] },
  { stage: "Customer", items: ["Customer discovery", "ICP definition", "Problem framing"] },
  { stage: "Business", items: ["Business model thinking", "Value proposition", "Prioritization"] },
  { stage: "Product", items: ["Product strategy", "Pilot strategy", "Productization"] },
  { stage: "Technology", items: ["AI + automation strategy", "Integrations", "Analytics"] },
  { stage: "GTM", items: ["Positioning", "GTM strategy", "Buyer discovery"] },
];

export function WhereISit() {
  const [active, setActive] = useState(3);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = useArrowNav(sits.length, active, setActive, refs);

  return (
    <div className="ec-spec" style={{ "--p": active / (sits.length - 1) } as CSSProperties}>
      <div className="ec-spec-rail" aria-hidden="true"><i /></div>
      <div className="ec-spec-stages" onKeyDown={onKeyDown}>
        {sits.map((item, index) => {
          const open = active === index;
          return (
            <div className={`ec-spec-stage${open ? " is-open" : ""}${index <= active ? " is-reached" : ""}`} key={item.stage}>
              <button
                type="button"
                ref={(node) => { refs.current[index] = node; }}
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
        {sits[active].items.map((entry, index) => <li key={entry} style={{ "--i": index } as CSSProperties}>{entry}</li>)}
      </ul>
    </div>
  );
}

/* ---------- 12. The question ---------- */

const criteria = [
  { word: "Painful", line: "painful enough to solve,", term: "Pain" },
  { word: "Recurring", line: "recurring enough to standardize,", term: "Repeatability" },
  { word: "Valuable", line: "valuable enough to pay for,", term: "Value" },
  { word: "Repeatable", line: "", term: "Market" },
];

export function FinalQuestion() {
  const [active, setActive] = useState<number | null>(null);
  const select = (index: number | null) => setActive(index);

  return (
    <div className="tc-final" data-active={active ?? undefined}>
      <div className="tc-criteria" role="group" aria-label="The four criteria">
        {criteria.map((item, index) => (
          <button
            key={item.word}
            type="button"
            aria-pressed={active === index}
            onClick={() => select(active === index ? null : index)}
            onPointerEnter={(event) => { if (mouseOnly(event)) select(index); }}
            onPointerLeave={(event) => { if (mouseOnly(event)) select(null); }}
          >{item.word}</button>
        ))}
      </div>
      <p className="tc-formula" aria-label="Pain, repeatability, value, and market lead to a product opportunity">
        {criteria.map((item, index) => (
          <span key={item.term} className="tc-formula-part">
            <span className={`tc-term${active === index ? " is-on" : ""}`}>{item.term}</span>
            {index < criteria.length - 1 && <i aria-hidden="true">×</i>}
          </span>
        ))}
        <i className="tc-formula-arrow" aria-hidden="true">→</i>
        <span className="tc-formula-result">Product opportunity</span>
      </p>
    </div>
  );
}
