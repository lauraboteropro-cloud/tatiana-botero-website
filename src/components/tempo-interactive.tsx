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

/* ---------- A stepper: select a stage, read one explanation ---------- */

export type Step = { name: string; text: string };

export function Stepper({ steps, label }: { steps: Step[]; label: string }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = useArrowNav(steps.length, active, setActive, refs);
  const current = steps[active];

  return (
    <div className="ec-spec tc-engine" style={{ "--p": active / (steps.length - 1), "--n": steps.length } as CSSProperties}>
      <div className="ec-spec-rail" aria-hidden="true"><i /></div>
      <div className="ec-spec-stages" onKeyDown={onKeyDown} role="group" aria-label={label}>
        {steps.map((step, index) => {
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
              <div className="tc-q-inline" id={`${uid}-${index}`}><p>{step.text}</p></div>
            </div>
          );
        })}
      </div>
      <div className="tc-question glass" aria-live="polite" key={active}>
        <p className="tc-question-n">Step {active + 1} of {steps.length} · {current.name}</p>
        <p className="tc-question-q">{current.text}</p>
      </div>
    </div>
  );
}

/* ---------- Spectrum with chips for the selected stage ---------- */

export function ChipSpectrum({ stages, start = 0 }: { stages: { stage: string; items: string[] }[]; start?: number }) {
  const [active, setActive] = useState(start);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = useArrowNav(stages.length, active, setActive, refs);

  return (
    <div className="ec-spec" style={{ "--p": active / (stages.length - 1) } as CSSProperties}>
      <div className="ec-spec-rail" aria-hidden="true"><i /></div>
      <div className="ec-spec-stages" onKeyDown={onKeyDown}>
        {stages.map((item, index) => {
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
        {stages[active].items.map((entry, index) => <li key={entry} style={{ "--i": index } as CSSProperties}>{entry}</li>)}
      </ul>
    </div>
  );
}

/* ---------- Hypotheses to test ---------- */

export function Hypotheses({ items }: { items: { name: string; q: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="tp-hyp">
      <div className="tp-hyp-list" role="group" aria-label="Hypotheses">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            onPointerEnter={(event) => { if (mouseOnly(event)) setActive(index); }}
          >{item.name}</button>
        ))}
      </div>
      <div className="tp-hyp-panel" aria-live="polite" key={active}>
        <p className="tp-hyp-label">Hypothesis · {items[active].name}</p>
        <p className="tp-hyp-q">{items[active].q}</p>
      </div>
    </div>
  );
}
