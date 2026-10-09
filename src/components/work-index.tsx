"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";

/* Each preview is a teaser: the product question, a little context, and a way into the full case study. */

const teams = ["Recruitment", "HR", "Training", "Operations", "Quality", "IT", "Finance", "Payroll"];

function Hub() {
  return (
    <div className="sc-hub">
      <ul aria-label="Teams that worked with the same employee">{teams.map((t) => <li key={t}>{t}</li>)}</ul>
      <span className="sc-down" aria-hidden="true">↓</span>
      <p className="sc-one">One employee</p>
      <p className="sc-also">Different versions of the truth</p>
    </div>
  );
}

function Tension() {
  return (
    <div className="sc-tension">
      <p className="sc-big">20K downloads</p>
      <p className="sc-also">in the first month</p>
      <p className="sc-pair"><span>Attention</span><i aria-hidden="true">≠</i><span className="sr"> is not the same as </span><span>Product-market fit</span></p>
    </div>
  );
}

function Criteria() {
  return (
    <div className="sc-criteria">
      <ul className="sc-plus" aria-label="What makes a problem a product opportunity">
        {["Painful", "Recurring", "Valuable", "Repeatable"].map((item) => <li key={item}>{item}</li>)}
      </ul>
      <span className="sc-down" aria-hidden="true">↓</span>
      <p className="sc-one">Potential product</p>
    </div>
  );
}

function Evening() {
  return (
    <div className="sc-evening">
      <div className="sc-evening-cols">
        <div className="sc-cal"><span>Calendar</span><strong>Available ✓</strong></div>
        <div className="sc-real">
          <span>Reality</span>
          <ul><li>Back-to-back meetings</li><li>Mentally tired</li><li>Personal priorities still waiting</li></ul>
        </div>
      </div>
      <p className="sc-pair"><span>Available time</span><i aria-hidden="true">≠</i><span className="sr"> is not the same as </span><span>Available capacity</span></p>
    </div>
  );
}

type Project = {
  id: string;
  short: string;
  when: string;
  tag?: string;
  label: string;
  title: string;
  blurb: string;
  context: string[];
  scene: ReactNode;
  cta: { href: string; label: string };
};

const projects: Project[] = [
  {
    id: "enterprise", short: "Enterprise platform", when: "2018 to 2025", label: "Enterprise platform · 2018 to 2025",
    title: "One employee. Multiple teams. Different versions of the truth.",
    blurb: "The same employee existed differently depending on which department you asked.",
    context: ["2,000+ employees", "7 locations", "20+ client programs"],
    scene: <Hub />,
    cta: { href: "/work/enterprise-workforce-platform", label: "Explore case study" },
  },
  {
    id: "mom", short: "MOM Seguros", when: "2022 to 2023", label: "MOM Seguros · 2022 to 2023",
    title: "We made insurance easier to buy. But did that make people want to buy it?",
    blurb: "The product got attention. The harder question was whether attention would translate into behavior.",
    context: ["20K downloads in the first month", "6 insurance partners", "Best Startup of the Year recognition"],
    scene: <Tension />,
    cta: { href: "/work/mom-seguros", label: "Explore case study" },
  },
  {
    id: "telecom", short: "Stealth telecom", when: "2025 to present", label: "Stealth telecom · 2025 to present",
    title: "Everyone has problems. Which ones are actually worth building a product around?",
    blurb: "My work starts before the roadmap.",
    context: ["Customer discovery", "Product strategy", "Vertical SaaS"],
    scene: <Criteria />,
    cta: { href: "/work/stealth-telecom", label: "Explore case study" },
  },
  {
    id: "tempo", short: "Tempo", when: "2026", tag: "Side project", label: "Tempo · 2026 · Side project",
    title: "Your calendar says you’re free. But are you actually available?",
    blurb: "An empty hour on a calendar doesn’t necessarily mean someone has the mental capacity to use it well.",
    context: ["AI product exploration", "User research", "Product discovery"],
    scene: <Evening />,
    cta: { href: "/work/tempo-ai-life-planner", label: "Explore case study" },
  },
];

/* True on phones and small tablets, where the four previews become a swipe carousel. */
const PHONE = "(max-width: 768px)";
function usePhone() {
  return useSyncExternalStore(
    (notify) => { const query = window.matchMedia(PHONE); query.addEventListener("change", notify); return () => query.removeEventListener("change", notify); },
    () => window.matchMedia(PHONE).matches,
    () => false,
  );
}

export function WorkIndex() {
  const [selected, setSelected] = useState(0);
  const phone = usePhone();
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsEl = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLDivElement | null)[]>([]);
  const moving = useRef(0);

  /* One slide = one panel width plus the gap, measured from the real layout. */
  const pitch = () => {
    const first = panels.current[0], second = panels.current[1];
    return first && second ? second.offsetLeft - first.offsetLeft : first?.offsetWidth ?? 1;
  };

  /* Phone: move the carousel to a project. While it travels, ignore scroll events so the selection doesn't flicker. */
  const slideTo = (index: number) => {
    const el = strip.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.clearTimeout(moving.current);
    moving.current = window.setTimeout(() => { moving.current = 0; }, reduced ? 50 : 650);
    el.scrollTo({ left: index * pitch(), behavior: reduced ? "auto" : "smooth" });
  };

  const choose = (index: number) => {
    setSelected(index);
    if (phone) slideTo(index);
  };

  /* A swipe scrolls the strip itself; the selector and dots follow the slide that is actually in view. */
  const onScroll = () => {
    const el = strip.current;
    if (!phone || !el || moving.current) return;
    const nearest = Math.min(projects.length - 1, Math.max(0, Math.round(el.scrollLeft / pitch())));
    if (nearest !== selected) setSelected(nearest);
  };

  /* Phone: keep the active chip centred in the selector (scrolling only the selector, never the page). */
  useEffect(() => {
    const bar = tabsEl.current;
    const chip = refs.current[selected];
    if (!phone || !bar || !chip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
  }, [phone, selected]);

  /* Phone: the carousel is only as tall as the preview in view. */
  useEffect(() => {
    const el = strip.current;
    const panel = panels.current[selected];
    if (!phone || !el || !panel) { if (el) el.style.height = ""; return; }
    const fit = () => { el.style.height = `${panel.offsetHeight}px`; };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [phone, selected]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[event.key];
    if (!step) return;
    event.preventDefault();
    const next = Math.min(projects.length - 1, Math.max(0, selected + step));
    choose(next);
    refs.current[next]?.focus();
  };

  const hoverSelect = (index: number, pointerType: string) => {
    if (pointerType === "mouse" && window.matchMedia("(min-width: 960px)").matches) setSelected(index);
  };

  return (
    <div className="index" data-glow>
      <div className="lit-light index-light" aria-hidden="true"><span /><span /></div>
      <div className="index-tabs" ref={tabsEl} role="tablist" aria-label="Case studies" onKeyDown={onKeyDown}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            ref={(node) => { refs.current[index] = node; }}
            className="index-button"
            id={`${uid}-tab-${project.id}`}
            aria-selected={selected === index}
            aria-controls={`${uid}-${project.id}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => choose(index)}
            onPointerEnter={(event) => hoverSelect(index, event.pointerType)}
          >
            <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="index-name">{project.short}<small>{project.when}</small></span>
            {project.tag && <span className="index-tag">{project.tag}</span>}
            <span className="index-mark" aria-hidden="true">→</span>
          </button>
        ))}
      </div>
      <div className="index-panels" ref={strip} onScroll={onScroll}>
        {projects.map((project, index) => {
          const open = selected === index;
          return (
            <div
              className="index-panel glass"
              key={project.id}
              ref={(node) => { panels.current[index] = node; }}
              id={`${uid}-${project.id}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${project.id}`}
              data-open={open ? "" : undefined}
              inert={!open}
            >
              <p className="panel-label">{project.label}</p>
              <h3>{project.title}</h3>
              <div className="panel-body sc-body">
                <div className="sc-scene">{project.scene}</div>
                <div className="sc-side">
                  <p className="sc-story">{project.blurb}</p>
                  <ul className="sc-context" aria-label="Context">{project.context.map((c) => <li key={c}>{c}</li>)}</ul>
                  <Link className="cta-pill" href={project.cta.href}>{project.cta.label} <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="index-dots" role="group" aria-label="Choose a case study">
        {projects.map((project, index) => (
          <button key={project.id} type="button" aria-label={project.short} aria-current={selected === index ? "true" : undefined} onClick={() => choose(index)} />
        ))}
      </div>
    </div>
  );
}
