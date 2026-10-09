"use client";

import { CaseShell } from "@/components/case-shell";
import type { CaseSection } from "@/components/case-shell";
import {
  DecisionMap, DiscoveryEngine, FinalQuestion, LoopMap, OpportunitySpace,
  ProductGtm, Productization, WhereISit, WhoHasProblem,
} from "@/components/telecom-interactive";

const keywords = ["0→1 product strategy", "Customer discovery", "GTM", "AI + automation", "Vertical SaaS"];
const stage = ["Discovery", "Validation", "Pilot strategy"];
const insideOne = ["Workforce", "Payroll", "Recruiting", "Training", "Quality", "Operations", "Reporting", "Employee lifecycle"];
const acrossMarket = [
  "repeat across companies", "have measurable business impact", "have an identifiable buyer",
  "are urgent enough to solve", "are valuable enough to pay for", "can become repeatable products",
];
const interventions = ["Software", "Automation", "Integration", "Analytics", "AI", "Human-in-the-loop"];
const aiValue = ["Less manual work", "Faster analysis", "Broader QA coverage", "Earlier signals", "Better visibility"];

function Sub({ label, title, children }: { label: string; title?: string; children: React.ReactNode }) {
  return <div className="es-sub"><p className="es-label">{label}</p>{title && <h3 className="es-sub-title">{title}</h3>}{children}</div>;
}

const sections: CaseSection[] = [
  {
    id: "overview", label: "Overview", render: (go) => (
      <div className="es-overview has-grid">
        <p className="eyebrow">Stealth telecom technology</p>
        <p className="ec-meta">Product &amp; Go-to-Market Lead · 2025 to present · 0→1</p>
        <h1>Finding the problems worth turning into products.</h1>
        <p className="es-lede">I’m helping turn deep telecom industry experience into a repeatable product and commercial strategy by finding problems that are painful, recurring, valuable, and scalable enough to solve.</p>
        <p className="ec-keywords">{keywords.join(" · ")}</p>
        <div className="tc-stage" aria-label="Current stage">
          <p className="tc-stage-label">Current stage</p>
          <ol>{stage.map((item) => <li key={item}>{item}</li>)}</ol>
        </div>
        <button type="button" className="button" onClick={() => go(1)}>Explore the opportunity <span aria-hidden="true">↓</span></button>
      </div>
    ),
  },
  {
    id: "opportunity", label: "Opportunity", render: () => (
      <div>
        <p className="eyebrow">Opportunity</p>
        <h2>I knew the problems inside one company. That didn’t mean I knew the market.</h2>
        <div className="tc-shift">
          <div className="tc-shift-side">
            <p className="tc-side-label">Before · one organization</p>
            <p className="tc-side-intro">I worked inside complex operations and helped solve problems across:</p>
            <ul className="tc-tags">{insideOne.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <ol className="tc-shift-bridge" aria-label="From experience to evidence">
            <li>Experience</li><li>Hypothesis</li><li className="is-end">Market evidence</li>
          </ol>
          <div className="tc-shift-side tc-shift-now">
            <p className="tc-side-label">Now · across a market</p>
            <p className="tc-side-intro">Which problems…</p>
            <ul className="tc-questions">{acrossMarket.map((item) => <li key={item}>{item}?</li>)}</ul>
          </div>
        </div>
        <p className="tc-statement">My previous experience gives me hypotheses. <em>Customer discovery has to tell me whether they’re market problems.</em></p>
        <Sub label="Opportunity space" title="I’m looking for recurring operational friction across telecom.">
          <OpportunitySpace />
        </Sub>
      </div>
    ),
  },
  {
    id: "discovery", label: "People & discovery", render: () => (
      <div>
        <p className="eyebrow">People and discovery</p>
        <h2>A request isn’t enough. I need to understand the economics behind the problem.</h2>
        <DiscoveryEngine />
        <Sub label="Who has the problem?" title="Someone feels the pain. Someone else may own the budget.">
          <WhoHasProblem />
          <p className="ec-caption">It isn’t enough to hear “users want this.” I also ask who feels the pain, who owns it, who pays, and what business outcome matters to them.</p>
        </Sub>
      </div>
    ),
  },
  {
    id: "question", label: "Product question", render: () => (
      <div>
        <p className="eyebrow">The product question</p>
        <h2 className="tc-q">Which telecom problems create enough business impact to become a product?</h2>
        <FinalQuestion />
      </div>
    ),
  },
  {
    id: "decisions", label: "Product decisions", render: () => (
      <div>
        <p className="eyebrow">Product decisions</p>
        <h2>Finding a problem doesn’t automatically mean building software.</h2>
        <DecisionMap />
        <Sub label="AI as a product decision" title="AI is one tool. The workflow comes first.">
          <ol className="tc-flow3" aria-label="How I frame it"><li>Workflow</li><li>Constraint</li><li className="is-end">Intervention</li></ol>
          <ul className="tc-iv" aria-label="Possible interventions">{interventions.map((item) => <li key={item} className={item === "AI" ? "is-ai" : undefined}>{item}</li>)}</ul>
          <div className="tc-ai-value">
            <p className="tc-ai-label">Value to validate</p>
            <ul>{aiValue.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <p className="tc-statement tc-statement-small">I care less about whether something uses AI and more about whether it makes the workflow meaningfully better.</p>
        </Sub>
      </div>
    ),
  },
  {
    id: "direction", label: "Product direction", render: () => (
      <div>
        <p className="eyebrow">Product direction</p>
        <h2>A useful solution isn’t automatically a scalable product.</h2>
        <Productization />
        <Sub label="The loop I’m running now" title="From market discovery to productize or change direction.">
          <LoopMap />
        </Sub>
      </div>
    ),
  },
  {
    id: "gtm", label: "GTM", render: () => (
      <div>
        <p className="eyebrow">Go-to-market</p>
        <h2>The same evidence shapes what we build and how we sell it.</h2>
        <ProductGtm />
        <p className="ec-caption">Discovery helps me understand not only what might be worth building, but who would buy it, why they would care, and what we need to prove first.</p>
        <Sub label="Where I sit in the 0→1 journey" title="My role sits across market, customer, business, product, technology, and GTM.">
          <WhereISit />
        </Sub>
      </div>
    ),
  },
  {
    id: "learnings", label: "Learnings", render: () => (
      <div>
        <p className="eyebrow">Learnings</p>
        <h2>What this work is teaching me so far.</h2>
        <p className="tc-statement">My previous experience gives me hypotheses, not answers. <em>The evidence has to tell me which ones are real.</em></p>
        <div className="tc-current">
          <p className="tc-stage-label">Current chapter</p>
          <p>Discovery · Validation · Product strategy · GTM</p>
        </div>
      </div>
    ),
  },
];

export function TelecomCase() {
  return (
    <main id="main" className="ec tc">
      <CaseShell sections={sections} next={{ href: "/work/tempo-ai-life-planner", label: "Next project" }} />
    </main>
  );
}
