"use client";

import type { CSSProperties } from "react";
import { CaseShell } from "@/components/case-shell";
import type { CaseSection } from "@/components/case-shell";
import { RadialMap } from "@/components/enterprise-interactive";
import { ImpactStory } from "@/components/enterprise-impact";

const entry = ["Recruitment", "Onboarding", "Training", "Operations", "Client / program assignment"];
const domains = ["Attendance", "Schedule / hours", "Overtime", "Payroll / payments", "Leave", "Performance", "IT access / credentials"];
const events = ["Transfer to another client / program", "Promotion / career growth", "Role change", "Manager change", "Leave", "Performance intervention", "Offboarding"];
const teams = ["Recruitment", "HR", "Training", "Operations", "Payroll", "Finance", "IT", "Quality"];

function Lifecycle({ label = "How an employee enters the operation", items = entry }: { label?: string; items?: string[] }) {
  return (
    <ol className="es-life" aria-label={label}>
      {items.map((step, index) => <li key={step} style={{ "--i": index } as CSSProperties}><span className="es-life-dot" aria-hidden="true" />{step}</li>)}
    </ol>
  );
}

/* ---------- 01 Overview ---------- */
function Overview({ go }: { go: (index: number) => void }) {
  return (
    <div className="es-overview has-grid">
      <p className="eyebrow">Enterprise workforce platform</p>
      <p className="ec-meta">2018 to 2025 · Multi-year product journey</p>
      <h1>One employee. Multiple teams. One connected system.</h1>
      <p className="es-context">I worked on this product across four roles, and my responsibility grew as the product did.</p>
      <ol className="es-roles" aria-label="My roles on this product">
        <li>Product / Business Analyst</li><li>Product Owner</li><li>Product Manager</li><li>Senior Product Manager</li>
      </ol>
      <p className="es-lede">The platform evolved from disconnected operational workflows into a shared system of record for the employee lifecycle across Recruitment, HR, Training, Operations, Quality, IT, Finance, Payroll, and employee self-service.</p>
      <ul className="ec-proof" aria-label="Scale">
        <li><strong>2,000+</strong>Employees</li><li><strong>7</strong>Locations</li><li><strong>20+</strong>Client programs</li>
      </ul>
      <p className="es-problem">The employee experienced one company. Behind the scenes, different teams were working with different processes, information, tools, and definitions of that same employee.</p>
      <Lifecycle />
      <button type="button" className="button" onClick={() => go(1)}>Explore the problem <span aria-hidden="true">↓</span></button>
    </div>
  );
}

/* ---------- 02 Problem and effect ---------- */
const transfer = ["Client / program assignment", "Manager", "Schedule", "Payroll rules", "Cost center", "IT credentials and access", "Reporting", "Billing"];
const caused = ["Duplicate information", "Manual handoffs", "Incomplete employee records", "Slow investigations", "Payroll errors and complaints", "Scheduling gaps", "Transfer and billing risk", "Limited visibility", "Difficult scaling"];

function Problem() {
  return (
    <div>
      <p className="eyebrow">Problem and effect</p>
      <h2>The visible problem was fragmentation. The deeper problem was disconnected ownership of the same employee.</h2>
      <div className="es-two">
        <p>Critical workflows had grown across spreadsheets, paper, WhatsApp, email, independent lists, and departmental processes.</p>
        <p>But the real issue wasn’t simply the number of tools. The same employee moved through many teams, and a change in one place could affect several others.</p>
      </div>
      <div className="es-block">
        <p className="es-label">A transfer sounded simple until I mapped everything it touched</p>
        <p className="es-small">Moving an employee from one client program to another could affect:</p>
        <ul className="tc-tags">{transfer.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className="ec-radial-wrap lit es-radial" data-glow>
        <div className="lit-light" aria-hidden="true"><span /><span /></div>
        <RadialMap center="One employee" items={teams} mode="static" label="One employee, many teams" />
      </div>
      <div className="es-block">
        <p className="es-label">What fragmentation caused</p>
        <ul className="es-dashes">{caused.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
    </div>
  );
}

/* ---------- 03 People and research ---------- */
const asked = ["What are you trying to accomplish?", "What happens today?", "Where does it break?", "What do you do when it breaks?", "Who else does this affect?", "What information do you need?", "What happens if this is wrong?", "What would actually make the workflow better?"];
const personas = [
  ["Employee", "Understand what is expected, get paid correctly, and have employment information handled consistently.", "Changes involving schedules, performance, documents, leave, or pay could involve several departments.", "Clarity, consistency, visibility, and a fair process."],
  ["Operations manager", "Meet client performance and staffing targets.", "Needs fast answers about staffing, attendance, schedules, performance, transfers, and capacity.", "Operational visibility and workflows that don’t add unnecessary management overhead."],
  ["HR / People team", "Maintain accurate employee information and compliant processes.", "Incomplete documents, inconsistent records, undocumented actions, and manual follow-up created risk.", "Reliable employee records, documentation, process integrity, and auditability."],
  ["Payroll / Finance", "Pay employees correctly and allocate costs and billing accurately.", "Payroll and billing depended on information created upstream by other teams.", "Reliable attendance, employee status, transfers, assignments, payroll rules, and cost-center information."],
  ["Recruitment / Training", "Move qualified candidates into training and operations quickly.", "Manual screening, document collection, handoffs, and readiness tracking limited capacity.", "Faster structured workflows and visibility into candidate and employee readiness."],
];

function People() {
  return (
    <div>
      <p className="eyebrow">People and research</p>
      <h2>The system looked different depending on who you asked.</h2>
      <p className="es-lead">I spent time understanding workflows with frontline users, managers, department leaders, and executives. The goal wasn’t only to collect feature requests.</p>
      <div className="es-block">
        <p className="es-label">What I wanted to understand</p>
        <ul className="es-asked">{asked.map((q) => <li key={q}>{q}</li>)}</ul>
      </div>
      <div className="es-block">
        <p className="es-label">Representative user perspectives</p>
        <p className="es-small">Role-based, grounded in the workflows I observed. They are not verbatim quotes.</p>
        <div className="es-personas">
          {personas.map(([role, goal, pain, need]) => (
            <article key={role}>
              <h3>{role}</h3>
              <dl>
                <div><dt>Goal</dt><dd>{goal}</dd></div>
                <div><dt>Pain</dt><dd>{pain}</dd></div>
                <div><dt>Need</dt><dd>{need}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </div>
      <p className="es-statement">Different teams weren’t asking for the same feature. They were trying to do different jobs around the same employee. <em>That became an important product insight.</em></p>
    </div>
  );
}

/* ---------- 04 Design challenge ---------- */
const tensions = [
  ["Connected system", "One employee needed to remain the shared entity across departments, data, business rules and lifecycle events."],
  ["Different workflows", "Recruitment, HR, Training, Operations, Payroll, Finance and other teams worked around the same employee but had different jobs to accomplish, different information needs and different permissions."],
  ["Usable experience", "The underlying operation could be extremely complex. The experience could not be. Each person needed to see the information relevant to their role, understand what required their attention, and know what to do next without being exposed to the complexity of the entire system."],
];

function Challenge() {
  return (
    <div>
      <p className="eyebrow">The design challenge</p>
      <h2 className="es-long">How do I create one connected employee system that works across departments, without forcing everyone into the same workflow or making a complex operation feel complex?</h2>
      <div className="es-needs es-tensions">
        <ul>{tensions.map(([name, text]) => <li key={name}><strong>{name}</strong>{text}</li>)}</ul>
      </div>
      <ol className="es-principle" aria-label="The product principle">
        <li>One employee</li>
        <li>Shared data + hierarchy + business rules</li>
        <li className="is-end">Role-specific experiences + workflows</li>
      </ol>
    </div>
  );
}

/* ---------- 05 Product decisions ---------- */
const decisions = [
  ["The same employee information was used differently across teams.", "One shared employee model with role-based access and organizational hierarchy."],
  ["Employee changes created dependencies across departments.", "Connected lifecycle workflows instead of isolated departmental tools."],
  ["Manual handoffs caused missed steps and unclear ownership.", "Required stages, workflow automation, notifications and ownership."],
  ["The organization needed to add locations, client programs and rules without rebuilding the platform.", "A configurable architecture for locations, clients, programs, permissions and business rules."],
];
const furps = [
  ["Functionality", "Role-based access and hierarchy. A shared employee lifecycle. Required workflow stages with notifications and ownership. Attendance, status, transfers, and payroll rules connected."],
  ["Performance", "Cross-team events such as payroll cycles and 200+ monthly transfers had to complete without manual reconciliation."],
  ["Usability", "Each team gets the view and workflow for its job. Following the process had to be easier than working around it."],
  ["Reliability", "One change had to stay consistent across every department it touched. Required stages couldn’t be skipped, and actions left a documentation trail."],
  ["Supportability", "New locations, clients, and campaigns are configuration, not rebuilds. Permissions follow the hierarchy. Adoption included training and support."],
];
const invested = ["Recruit", "Screen", "Hire", "Train", "Coach", "Ramp"];
const lost = ["Employee leaves", "Capacity is lost", "The position has to be filled again", "Recruit again", "Train again", "Ramp again"];
const intervention = ["Performance issue", "Clear expectations", "PIP", "Coaching + documented review", "PPP when necessary", "Recovery or documented exit"];

function Decisions() {
  return (
    <div>
      <p className="eyebrow">Product decisions</p>
      <h2>Research changed what I built.</h2>
      <ul className="es-pairs">
        {decisions.map(([found, designed]) => (
          <li key={found}><div><span>I found</span>{found}</div><i aria-hidden="true">→</i><div className="is-decision"><span>I designed</span>{designed}</div></li>
        ))}
      </ul>
      <details className="more es-reqs">
        <summary>View detailed product requirements<span aria-hidden="true">+</span></summary>
        <dl>{furps.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </details>

      <div className="es-deep">
        <p className="eyebrow">One decision in practice</p>
        <h3>Performance + retention</h3>
        <p className="es-statement es-lead">Termination didn’t only mean losing an employee. <em>It restarted an expensive operational cycle.</em></p>

        <p className="es-label">The investment before an employee became productive</p>
        <ol className="es-flow" aria-label="Investment before an employee became productive">
          {invested.map((step) => <li key={step}>{step}</li>)}
          <li className="is-end">Productive employee</li>
        </ol>

        <div className="es-loss">
          <div>
            <p className="es-label">When that employee is lost</p>
            <ol className="es-vlist">{lost.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
          <div className="es-loss-text">
            <p className="es-small">By the time an employee reached Operations, the business had already invested recruiting capacity, training time, management attention, coaching, system access, and ramp-up time. Replacing that person meant repeating part of that investment while the operation also absorbed the capacity gap.</p>
            <p className="es-statement">So I stopped looking at attrition only as an HR outcome. <em>I looked at the system around it.</em></p>
          </div>
        </div>

        <p className="es-label">The product opportunity</p>
        <p className="es-small es-opportunity">Create a structured intervention between underperformance and termination so employees had a clear opportunity to recover, while managers and HR had a consistent process to coach, document, escalate, and make better-supported decisions.</p>
        <ol className="es-flow" aria-label="The intervention">
          {intervention.map((step, index) => <li key={step} className={index === intervention.length - 1 ? "is-end" : undefined}>{step}</li>)}
        </ol>
        <p className="es-small es-pipnote">PIP is the Performance Improvement Process. PPP is the Performance Probation Process, the additional intervention when necessary. If performance recovered after a PIP, the employee returned to normal performance management.</p>

        <ul className="tl-proof es-evidence" aria-label="Outcomes">
          <li><strong>~70%</strong>PIP recovery</li>
          <li><strong>~30–50 → &lt;10</strong>weekly attrition</li>
          <li><strong>Full</strong>documentation trail</li>
        </ul>
        <p className="es-statement es-close">More employees had a structured opportunity to recover, while the business protected more of the recruiting, training, coaching, and ramp-up investment already made in them.</p>
      </div>
    </div>
  );
}

/* ---------- 06 Solution ---------- */
const consequences = ["HR", "Payroll", "Finance", "IT", "Reporting", "Billing"];

function Solution() {
  return (
    <div>
      <p className="eyebrow">The solution</p>
      <h2>The product became infrastructure for the employee lifecycle.</h2>
      <div className="es-block">
        <p className="es-label">How an employee enters the operation</p>
        <Lifecycle />
        <p className="es-small">Once employees transitioned into Operations, they could move across client programs spanning telecommunications, financial services, healthcare, retail, collections, and specialized services. Each program came with its own staffing models, schedules, performance expectations, access requirements, and operational rules.</p>
      </div>
      <div className="es-block">
        <p className="es-label">Then the employee is the shared entity</p>
        <p className="es-small">Several processes ran around the same employee for as long as they worked there.</p>
        <div className="ec-radial-wrap lit es-radial" data-glow>
          <div className="lit-light" aria-hidden="true"><span /><span /></div>
          <RadialMap center="Employee" items={domains} mode="static" label="One employee with attendance, schedule, overtime, payroll, leave, performance, and IT access around them" />
        </div>
      </div>
      <div className="es-block">
        <p className="es-label">Events that can happen during employment</p>
        <ul className="tc-tags">{events.map((e) => <li key={e}>{e}</li>)}</ul>
      </div>
      <div className="es-block">
        <p className="es-label">Why a shared model mattered</p>
        <p className="es-small">A transfer wasn’t just Employee A moving to Program B.</p>
        <div className="es-transfer">
          <p className="es-converge">Transfer</p>
          <span className="es-down" aria-hidden="true">↓</span>
          <ul className="tc-tags">{transfer.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <p className="es-lead">A change started by Operations could have consequences for {consequences.join(", ")}. That is why isolated departmental systems were a problem, and why I needed a shared employee model with connected workflows.</p>
      </div>
    </div>
  );
}

/* ---------- 08 Learnings ---------- */
const lessons = [
  ["Follow the dependency, not just the symptom.", "A payroll problem can begin with attendance. A billing problem can begin with a transfer."],
  ["Requests aren’t requirements.", "I learned to separate what someone asks for from what they’re actually trying to accomplish."],
  ["Design for change, not only today’s workflow.", "The configurable architecture later helped the operation adapt to new locations, client programs, and unexpected operating models."],
];

function Learnings() {
  return (
    <div>
      <p className="eyebrow">Learnings</p>
      <h2>What this changed about how I think as a product manager.</h2>
      <ol className="es-lessons">
        {lessons.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
      </ol>
    </div>
  );
}

/* ---------- Shell ---------- */
const sections: CaseSection[] = [
  { id: "overview", label: "Overview", render: (go) => <Overview go={go} /> },
  { id: "problem", label: "Problem & effect", render: () => <Problem /> },
  { id: "people", label: "People & research", render: () => <People /> },
  { id: "challenge", label: "Design challenge", render: () => <Challenge /> },
  { id: "decisions", label: "Product decisions", render: () => <Decisions /> },
  { id: "solution", label: "Solution", render: () => <Solution /> },
  {
    id: "impact", label: "Impact", render: () => (
      <div>
        <p className="eyebrow">Business impact</p>
        <h2>The result wasn’t more software. It was a better-running operation.</h2>
        <ImpactStory />
      </div>
    ),
  },
  { id: "learnings", label: "Learnings", render: () => <Learnings /> },
];

export function EnterpriseStory() {
  return <CaseShell sections={sections} next={{ href: "/work/mom-seguros", label: "Next project" }} />;
}
