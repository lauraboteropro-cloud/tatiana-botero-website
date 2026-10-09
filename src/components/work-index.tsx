import Link from "next/link";
import type { ReactNode } from "react";

/* Each card is a preview: the hook, one compact visual, a line of context, and a way into the full case study. */

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
  label: string;
  title: string;
  blurb: string;
  context: string[];
  scene: ReactNode;
  cta: { href: string; label: string };
};

const projects: Project[] = [
  {
    id: "enterprise", label: "Enterprise platform · 2018 to 2025",
    title: "One employee. Multiple teams. Different versions of the truth.",
    blurb: "The same employee existed differently depending on which department you asked.",
    context: ["2,000+ employees", "7 locations", "20+ client programs"],
    scene: <Hub />,
    cta: { href: "/work/enterprise-workforce-platform", label: "Explore case study" },
  },
  {
    id: "mom", label: "MOM Seguros · 2022 to 2023",
    title: "We made insurance easier to buy. But did that make people want to buy it?",
    blurb: "The product got attention. The harder question was whether attention would translate into behavior.",
    context: ["20K downloads in the first month", "6 insurance partners", "Best Startup of the Year recognition"],
    scene: <Tension />,
    cta: { href: "/work/mom-seguros", label: "Explore case study" },
  },
  {
    id: "telecom", label: "Stealth telecom · 2025 to present",
    title: "Everyone has problems. Which ones are actually worth building a product around?",
    blurb: "My work starts before the roadmap.",
    context: ["Customer discovery", "Product strategy", "Vertical SaaS"],
    scene: <Criteria />,
    cta: { href: "/work/stealth-telecom", label: "Explore case study" },
  },
  {
    id: "tempo", label: "Tempo · 2026 · Side project",
    title: "Your calendar says you’re free. But are you actually available?",
    blurb: "An empty hour on a calendar doesn’t necessarily mean someone has the mental capacity to use it well.",
    context: ["AI product exploration", "User research", "Product discovery"],
    scene: <Evening />,
    cta: { href: "/work/tempo-ai-life-planner", label: "Explore case study" },
  },
];

export function WorkIndex() {
  return (
    <ol className="wc-grid">
      {projects.map((project, index) => (
        <li key={project.id}>
          <article className="wc" aria-labelledby={`wc-${project.id}`}>
            <p className="wc-meta">
              <span className="wc-n">{String(index + 1).padStart(2, "0")}</span>
              <span>{project.label}</span>
            </p>
            <h3 id={`wc-${project.id}`}>{project.title}</h3>
            <div className="wc-scene">{project.scene}</div>
            <p className="wc-blurb">{project.blurb}</p>
            <ul className="wc-chips" aria-label="Context">{project.context.map((c) => <li key={c}>{c}</li>)}</ul>
            <Link className="cta-pill wc-cta" href={project.cta.href}>{project.cta.label} <span aria-hidden="true">→</span></Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
