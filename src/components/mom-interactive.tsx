"use client";

import { useId, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

const mouseOnly = (event: { pointerType: string }) => event.pointerType === "mouse";

/* ---------- Where this happened in my career ---------- */

const stages = [
  { name: "Product / Business Analyst", added: "Understand systems and users." },
  { name: "Product Owner", added: "Translate complexity into something teams can build." },
  { name: "Product Manager", added: "Decide what to build and why." },
  { name: "MOM Seguros", sub: "Co-Founder + Product", mom: true, added: "Learn about markets, customers, behavior, business models, partnerships, runway, and founder decisions." },
  { name: "Senior Product Manager", added: "Combine product execution, systems thinking, business outcomes, and organizational scale." },
  { name: "Product + GTM Lead", added: "Connect market evidence, customer problems, product strategy, and commercial opportunity." },
];

export function CareerContext() {
  const [active, setActive] = useState(3);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const move: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    const step = move[event.key];
    if (!step) return;
    event.preventDefault();
    const next = Math.min(stages.length - 1, Math.max(0, active + step));
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="ec-spec mm-career" style={{ "--p": active / (stages.length - 1) } as CSSProperties}>
      <div className="ec-spec-rail" aria-hidden="true"><i /></div>
      <div className="ec-spec-stages" onKeyDown={onKeyDown}>
        {stages.map((stage, index) => {
          const open = active === index;
          return (
            <div className={`ec-spec-stage${open ? " is-open" : ""}${index <= active ? " is-reached" : ""}${stage.mom ? " is-mom" : ""}`} key={stage.name}>
              <button
                type="button"
                ref={(node) => { refs.current[index] = node; }}
                aria-expanded={open}
                aria-controls={`${uid}-${index}`}
                onClick={() => setActive(index)}
                onPointerEnter={(event) => { if (mouseOnly(event) && window.matchMedia("(min-width: 860px)").matches) setActive(index); }}
              >
                <span className="ec-spec-dot" aria-hidden="true" />
                <span className="ec-spec-name">{stage.name}</span>
                {stage.sub && <span className="mm-sub">{stage.sub}</span>}
              </button>
              <p className="mm-inline" id={`${uid}-${index}`}>{stage.added}</p>
            </div>
          );
        })}
      </div>
      <div className="mm-added" aria-live="polite" key={active}>
        <span>What this stage added</span>
        {stages[active].added}
      </div>
    </div>
  );
}

/* ---------- Before MOM, and what MOM added ---------- */

const before = ["How does the operation work?", "What does the user need?", "What should the product do?", "How do the workflows connect?", "How do we implement and adopt it?"];
const added = ["Will people actually want this?", "Will they change their behavior?", "How do we acquire them?", "Will they pay?", "How does distribution work?", "How do partners affect the experience?", "Does the business model work?", "How much runway do we have?", "Are the founders aligned?"];

export function QuestionsCompare() {
  const [focus, setFocus] = useState<"both" | "before" | "added">("both");
  return (
    <div className="mm-compare" data-focus={focus}>
      <div className="ec-switch" role="group" aria-label="Show questions">
        {([["both", "Both"], ["before", "Before MOM"], ["added", "MOM added"]] as const).map(([value, label]) => (
          <button key={value} type="button" aria-pressed={focus === value} onClick={() => setFocus(value)}>{label}</button>
        ))}
      </div>
      <div className="mm-compare-cols">
        <section className="mm-col mm-col-before" aria-label="Before MOM">
          <p className="mm-col-label">Before MOM</p>
          <ul>{before.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="mm-col mm-col-added" aria-label="MOM added">
          <p className="mm-col-label">MOM added</p>
          <ul>{added.map((item, index) => <li key={item} style={{ "--i": index } as CSSProperties}>{item}</li>)}</ul>
        </section>
      </div>
    </div>
  );
}
