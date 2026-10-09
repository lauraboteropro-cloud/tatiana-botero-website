"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CaseShell } from "@/components/case-shell";
import type { CaseSection } from "@/components/case-shell";
import { ChipSpectrum, Hypotheses, Stepper } from "@/components/tempo-interactive";
import type { Step } from "@/components/tempo-interactive";

const keywords = ["Product discovery", "AI product", "User research", "PRD", "MVP", "Guardrails", "Human-in-the-loop"];
const stage = ["Discovery", "MVP definition", "Build / validation"];
const day: [string, string, "busy" | "free"][] = [
  ["9:00", "Meeting", "busy"], ["10:00", "Meeting", "busy"], ["", "30 min free", "free"],
  ["11:30", "Meeting", "busy"], ["", "45 min free", "free"], ["1:00", "Meeting", "busy"],
];
const reasons = ["Context switching", "Mental load", "Meeting fatigue", "Recovery", "Task duration", "Personal priorities"];
const inputs = ["Personal intentions", "Calendar constraints", "Preferences", "Priorities"];
const loop: Step[] = [
  { name: "Brain dump", text: "The user writes what they want to make time for without manually structuring everything." },
  { name: "Parse", text: "AI turns the brain dump into structured tasks and flags ambiguity." },
  { name: "Review", text: "The user corrects or confirms what Tempo understood." },
  { name: "Plan", text: "Tempo finds realistic placements around existing calendar constraints." },
  { name: "Explain", text: "The user can understand why something was placed or deferred." },
  { name: "Approve", text: "Nothing is committed without user approval." },
  { name: "Commit", text: "Approved personal blocks are written to the selected output calendar." },
  { name: "Weekly review", text: "Behavior and feedback can inform future planning." },
];
const aiSide = ["Understand intent", "Parse the brain dump", "Structure tasks", "Generate explanations"];
const ruleSide = ["Conflict detection", "Hard constraints", "Scheduling rules", "Approval", "Calendar writes"];
const chain = ["AI", "Validation", "Deterministic decision", "User approval", "Calendar"];
const actions = ["Keep", "Move", "Edit", "Defer", "Remove"];
const guardrails = [["Work calendar", "Read only"], ["Personal output calendar", "Write target"], ["Explicit approval", "Required"]];
const deferReasons = ["No valid slot", "Not enough time", "Outside preferred window", "Higher priorities filled capacity", "Needs clarification"];
const blocks: ("fit" | "defer")[] = ["fit", "fit", "fit", "defer", "fit", "fit", "defer", "fit", "defer", "defer"];
const hypotheses = [
  { name: "Trust", q: "Will users connect their calendar and trust the permissions?" },
  { name: "Capacity", q: "Will users accept Tempo telling them something doesn’t fit?" },
  { name: "Commitment", q: "Will users commit at least one suggested block?" },
  { name: "Return", q: "Will they come back for another weekly planning cycle?" },
  { name: "Follow-through", q: "Does planning this way improve completion of accepted personal commitments?" },
  { name: "Explainability", q: "Does understanding why Tempo made a recommendation increase trust?" },
];
const work = [
  { stage: "Discover", items: ["User research", "Problem framing", "Market research", "Competitive research"] },
  { stage: "Define", items: ["Product strategy", "Positioning", "MVP scope", "Prioritization"] },
  { stage: "Specify", items: ["PRD", "User stories", "Business rules", "Success metrics", "Requirements"] },
  { stage: "AI product", items: ["AI behavior", "Guardrails", "Human-in-the-loop", "Explainability", "AI vs deterministic decisions"] },
  { stage: "Build", items: ["Design collaboration", "Engineering collaboration", "Sprint definition", "Acceptance criteria", "Technical tradeoffs"] },
  { stage: "Measure", items: ["Hypotheses", "Product metrics", "Trust signals", "Behavioral signals", "Beta criteria"] },
];
const spec = ["User research", "Problem reframe", "Product principles", "PRD", "Domain + architecture", "Sprints", "MVP"];
const decisions = [
  ["Calendar safety", "Work calendars are read-only.", "Protect user trust."],
  ["AI boundary", "AI interprets and suggests. Deterministic logic schedules and writes.", "Use AI where uncertainty is useful and deterministic logic where correctness matters."],
  ["Approval", "No calendar commit without explicit user approval.", "Keep the user in control."],
];
const learning = [
  ["Initial assumption", "Unused time is the opportunity."],
  ["Research", "Calendar gaps aren’t automatically usable capacity."],
  ["Reframe", "What can this week realistically absorb?"],
  ["Product principle", "Be willing to say what won’t fit."],
  ["MVP", "Test whether users trust and return to an honest planner."],
];

function Sub({ label, title, children }: { label: string; title?: ReactNode; children: ReactNode }) {
  return <div className="es-sub"><p className="es-label">{label}</p>{title && <h3 className="es-sub-title">{title}</h3>}{children}</div>;
}

const sections: CaseSection[] = [
  {
    id: "overview", label: "Overview", render: (go) => (
      <div className="es-overview has-grid">
        <p className="eyebrow">Side project · 2026</p>
        <p className="ec-meta">Tempo · AI product exploration</p>
        <h1>What if available time isn’t the same as available capacity?</h1>
        <p className="es-lede">A side project exploring whether AI can help busy professionals turn personal intentions into a realistic weekly plan without treating every empty calendar slot as usable capacity.</p>
        <p className="ec-keywords">{keywords.join(" · ")}</p>
        <div className="tc-stage" aria-label="Status">
          <p className="tc-stage-label">Product experiment</p>
          <ol>{stage.map((item) => <li key={item}>{item}</li>)}</ol>
        </div>
        <button type="button" className="button" onClick={() => go(1)}>Explore the story <span aria-hidden="true">↓</span></button>
      </div>
    ),
  },
  {
    id: "problem", label: "Problem", render: () => (
      <div>
        <p className="eyebrow">The first assumption</p>
        <h2>I thought the opportunity was unused calendar time.</h2>
        <div className="tp-assume">
          <div className="tp-day" aria-label="An example day, illustrative">
            <p className="tp-day-label">An example day</p>
            <ul>{day.map(([time, label, kind], index) => <li key={index} className={kind === "free" ? "is-free" : undefined}><span>{time}</span>{label}</li>)}</ul>
          </div>
          <div className="tp-hypo">
            <p className="tc-side-label">Initial hypothesis</p>
            <ol className="tp-flow"><li>Calendar gap</li><li>Available time</li><li className="is-end">Schedule a personal priority</li></ol>
            <p className="ec-small">The original idea was to find unused calendar gaps and use them for personal priorities people kept postponing.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "research", label: "Research", render: () => (
      <div>
        <p className="eyebrow">Research</p>
        <h2>A free hour isn’t necessarily a usable hour.</h2>
        <p className="tp-neq"><span>Available time</span><i aria-hidden="true">≠</i><span>Available capacity</span></p>
        <ul className="tc-tags tp-reasons" aria-label="Why a gap isn’t always usable">{reasons.map((item) => <li key={item}>{item}</li>)}</ul>
        <p className="tp-note">These illustrate why calendar availability alone was an incomplete model.</p>
        <div className="tp-signals">
          <p className="tc-side-label">Research signals</p>
          <div>
            <p><strong>86%</strong>of surveyed users had delayed a personal task in the previous month</p>
            <p><strong>93%</strong>reported negative emotions when personal tasks slipped</p>
          </div>
          <p className="tp-note">Signals that the pain exists, not proof that a product solves it.</p>
        </div>
      </div>
    ),
  },
  {
    id: "insight", label: "Key insight", render: () => (
      <div>
        <p className="eyebrow">Key insight</p>
        <h2>The problem changed.</h2>
        <div className="tp-reframe">
          <div className="tp-reframe-from"><span>From</span>How can we fill unused calendar gaps?</div>
          <span className="tp-reframe-arrow" aria-hidden="true">↓</span>
          <div className="tp-reframe-to"><span>To</span>What can this person’s week realistically absorb?</div>
        </div>
        <Sub label="What the research did and didn’t show" title="It showed the pain exists. It didn’t show people will pay, adopt, or trust AI with their calendar.">
          <p className="es-small">Those are the questions the MVP has to test.</p>
        </Sub>
      </div>
    ),
  },
  {
    id: "challenge", label: "Design challenge", render: () => (
      <div>
        <p className="eyebrow">Design challenge</p>
        <h2>Don’t optimize for a full calendar. Optimize for an honest week.</h2>
        <div className="tp-equation">
          <ul>{inputs.map((item) => <li key={item}>{item}</li>)}</ul>
          <span className="tp-down" aria-hidden="true">↓</span>
          <p className="tp-capacity">Realistic capacity</p>
          <span className="tp-down" aria-hidden="true">↓</span>
          <p className="tp-plan">Weekly plan</p>
        </div>
        <div className="tp-twin"><p><strong>Some things fit.</strong></p><p><strong>Some things don’t.</strong></p></div>
        <p className="tc-statement tc-statement-small">Tempo should be willing to say, “This week can’t hold all of this.”</p>
        <Sub label="A product decision I like" title="Sometimes the best recommendation is: don’t schedule it.">
          <div className="tp-defer">
            <div className="tp-blocks" aria-label="Illustration: some intentions fit and some don’t">
              {blocks.map((kind, index) => <span key={index} className={kind === "fit" ? "is-fit" : "is-defer"} />)}
            </div>
            <p className="tp-legend"><span className="is-fit">Fits</span><span className="is-defer">Doesn’t fit yet</span><em>Illustration only</em></p>
          </div>
          <div className="tp-defer-copy">
            <p className="tc-statement tc-statement-small"><em>Deferred</em> doesn’t mean <em>failed.</em> It means the week can’t realistically hold this yet.</p>
            <ul className="tc-tags" aria-label="Possible reasons">{deferReasons.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </Sub>
      </div>
    ),
  },
  {
    id: "decisions", label: "Product decisions", render: () => (
      <div>
        <p className="eyebrow">Product decisions</p>
        <h2>From a messy list to a plan the user trusts.</h2>
        <Stepper steps={loop} label="The weekly loop" />
        <Sub label="AI product decision" title="AI suggests. Deterministic logic protects the calendar.">
          <div className="tp-split">
            <div className="tp-ai"><p className="tp-side-title">AI</p><ul>{aiSide.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="tp-rules"><p className="tp-side-title">Deterministic system</p><ul>{ruleSide.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
          <ol className="tp-chain" aria-label="How a suggestion becomes a calendar change">
            {chain.map((item, index) => <li key={item} className={index === 0 ? "is-ai" : index === chain.length - 1 ? "is-end" : undefined}>{item}</li>)}
          </ol>
          <p className="ec-caption">The product architecture deliberately separates AI suggestions from trusted scheduling and writing behavior.</p>
        </Sub>
        <Sub label="Trust by design" title="The AI can recommend. The user keeps control.">
          <div className="tp-control">
            <p className="tp-control-step">Tempo suggests</p>
            <span className="tp-down" aria-hidden="true">↓</span>
            <ul>{actions.map((item) => <li key={item}>{item}</li>)}</ul>
            <span className="tp-down" aria-hidden="true">↓</span>
            <p className="tp-control-step is-key">User approves</p>
            <span className="tp-down" aria-hidden="true">↓</span>
            <p className="tp-control-step">Calendar changes</p>
          </div>
          <ul className="tp-guards" aria-label="Product rules">{guardrails.map(([what, rule]) => <li key={what}><span>{what}</span><strong>{rule}</strong></li>)}</ul>
        </Sub>
        <Sub label="Technical product thinking" title="Some product decisions became architecture decisions.">
          <div className="tp-decisions">
            {decisions.map(([label, rule, why]) => (
              <article key={label}><p className="tc-side-label">{label}</p><p className="tp-rule">{rule}</p><span aria-hidden="true">↓</span><p className="tp-why">{why}</p></article>
            ))}
          </div>
        </Sub>
      </div>
    ),
  },
  {
    id: "direction", label: "Product direction", render: () => (
      <div>
        <p className="eyebrow">Product direction</p>
        <h2>Building the planner doesn’t prove people want it.</h2>
        <Hypotheses items={hypotheses} />
        <p className="tc-statement tc-statement-small tp-test">The MVP is the test.</p>
        <Sub label="From idea to specification" title="It became a defined MVP.">
          <ol className="tp-spec" aria-label="How the work progressed">
            {spec.map((item, index) => <li key={item} className={index === spec.length - 1 ? "is-end" : undefined} style={{ "--i": index } as CSSProperties}>{item}</li>)}
          </ol>
          <p className="ec-caption">I translated the discovery into a PRD, hypotheses, business rules, product flows, success metrics, and sprint-ready requirements while collaborating with design and engineering.</p>
        </Sub>
        <Sub label="What I owned" title="What I worked on in this side project.">
          <ChipSpectrum stages={work} start={2} />
        </Sub>
      </div>
    ),
  },
  {
    id: "learnings", label: "Learnings", render: () => (
      <div className="tp-center">
        <p className="eyebrow">Learnings</p>
        <h2>Discovery is valuable when it changes the product.</h2>
        <ol className="tp-ladder">{learning.map(([label, text], index) => <li key={label} className={index === learning.length - 1 ? "is-end" : undefined}><span>{label}</span>{text}</li>)}</ol>
        <p className="tc-statement tc-statement-small">The best outcome of discovery isn’t confirmation. <em>It’s finding out early that you were asking the wrong question.</em></p>
        <p className="tp-end-text">Tempo gave me a place to experiment with AI product decisions, human control, product discovery, and the line between intelligent recommendations and deterministic systems.</p>
        <Link className="text-link" href="/#work">Back to case studies <span className="arrow-icon" aria-hidden="true">→</span></Link>
      </div>
    ),
  },
];

export function TempoCase() {
  return (
    <main id="main" className="ec tc tp">
      <CaseShell sections={sections} next={{ href: "/#work", label: "Back to case studies" }} />
    </main>
  );
}
