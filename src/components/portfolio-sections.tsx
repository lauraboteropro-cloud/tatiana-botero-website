import Link from "next/link";
import { ProjectVisual } from "@/components/system-visuals";

const outcomes = [
  { value: "4+ days → <1 day", label: "Payroll processing", changed: "Payroll calculations, validation, approvals, and exception handling were connected and automated.", mattered: "Less administrative effort and investigation across Payroll, HR, Finance, managers, and employees." },
  { value: "35 → 105 / day", label: "Candidate screening capacity · ~3× throughput", changed: "The digitized recruiting pipeline increased screenings approximately threefold across seven recruiters.", mattered: "Training classes filled more reliably (~90% on time), helping ease a staffing bottleneck without proportional recruiting-capacity growth." },
  { value: "~300 → ~5", label: "Payroll complaints per cycle · ~98% reduction", changed: "Connected calculations, validation, approvals, and exceptions reduced payroll disputes.", mattered: "Less manual investigation and correction work, lower operational risk, and a more reliable employee experience." },
  { value: "~50% → ~99%", label: "Employee-document completion · improved audit readiness", changed: "Digital collection, validation, signatures, and status tracking replaced a manually managed process.", mattered: "Less follow-up, more complete records for audit readiness, and reduced compliance exposure." },
  { value: "~50% → ~90%", label: "Schedule adherence", changed: "Connecting schedules, attendance, staffing, and operational information made planned versus delivered hours more visible.", mattered: "Earlier intervention and more reliable service delivery helped protect billable capacity; no direct revenue effect is quantified." },
  { value: "~75% estimated", label: "License cost reduction · ~25 unused licenses avoided weekly", changed: "Employee lifecycle changes were connected to account provisioning and deprovisioning.", mattered: "Faster deprovisioning helped avoid paying for unused accounts. The reduction is an estimate from career records, not an independently validated calculation." },
];

const principles = [
  "Requests aren’t requirements.",
  "Not every problem needs software.",
  "Understand the system before optimizing the piece.",
  "Adoption is part of the product.",
  "Shipping isn’t the outcome.",
  "AI is a tool, not the strategy.",
];

export function SelectedImpact() {
  return (
    <section className="selected-impact" id="impact" aria-labelledby="impact-title">
      <div className="page-shell">
        <div className="impact-heading"><p className="eyebrow">Selected impact</p><h2 id="impact-title">Evidence before the story.</h2></div>
        <div className="impact-ledger">
          {outcomes.map((item, index) => (
            <details className="impact-ledger-row" key={item.label}>
              <summary><span className="impact-index">0{index + 1}</span><strong>{item.value}</strong><span className="impact-label">{item.label}</span><span className="impact-toggle" aria-hidden="true">+</span></summary>
              <div className="impact-context"><p><strong>What changed</strong>{item.changed}</p><p><strong>Why it mattered</strong>{item.mattered}</p></div>
            </details>
          ))}
        </div>
        <div className="scale-strip">
          <p className="eyebrow">Built for complexity at scale</p>
          <div><strong>~1,900–2,000</strong><span>employees supported</span></div>
          <div><strong>7</strong><span>locations</span></div>
          <div><strong>20+</strong><span>client programs</span></div>
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <section className="selected-work" id="work" aria-labelledby="work-title">
      <div className="page-shell">
        <div className="section-heading"><div><p className="eyebrow">Selected work</p><h2 id="work-title">Four stories.<br /><em>Evidence, not a résumé.</em></h2></div><p className="section-aside">A flagship enterprise platform, market-led 0→1 work, an external product, and discovery that changed a product direction.</p></div>
        <div className="selected-work-list">
          <article className="work-preview work-preview-enterprise">
            <div className="work-preview-copy"><p className="eyebrow">01 · Enterprise workforce platform</p><h3>From fragmented operations to infrastructure for ~2,000 employees.</h3><p>We connected the employee lifecycle across HR, Payroll, Recruitment, Training, Operations, Finance, Quality, and IT. The platform supported seven locations and 20+ client programs.</p><div className="preview-results"><span><strong>4+ days → &lt;1 day</strong>Payroll processing</span><span><strong>35 → 105 / day</strong>Recruiting screenings</span><span><strong>~50% → ~90%</strong>Schedule adherence</span></div><Link className="text-link" href="/work/enterprise-workforce-platform">Explore flagship case study <span aria-hidden="true">↗</span></Link></div>
            <ProjectVisual variant="workforce" />
          </article>
          <article className="work-preview work-preview-telecom">
            <div className="work-preview-copy"><p className="eyebrow">02 · Stealth telecom technology · Product & Go-to-Market Lead · 2026–Present</p><h3>Finding the operational problems worth turning into products.</h3><p>I’m applying what I learned inside an enterprise to questions across the telecom market. Which problems keep coming up? Who owns them? Would a better way be worth paying for?</p><div className="preview-process"><span>Market</span><i>→</i><span>Discovery</span><i>→</i><span>Validation</span><i>→</i><span>Productization</span></div><p className="evidence-note">This work is still early. We have no validated commercial outcomes to report.</p><Link className="text-link" href="/work/stealth-telecom">Explore current work <span aria-hidden="true">↗</span></Link></div>
            <div className="work-preview-side-note" aria-hidden="true"><span>MARKET SIGNALS</span><i>→</i><span>PATTERNS</span><i>→</i><span>DECISIONS</span><i>→</i><span>PRODUCT</span></div>
          </article>
          <article className="work-preview work-preview-mom">
            <div className="work-preview-copy"><p className="eyebrow">03 · MOM Seguros · Co-Founder / Product</p><h3>Taking operational product thinking into an external 0→1 product.</h3><p>I worked on digital self-service insurance journeys for quoting, authentication, payments, policy issuance, and insurer partnerships.</p><p className="recognition-note">Recognized as Best Startup of the Year by CINTEL & PwC Andicom.</p><Link className="text-link" href="/work/mom-seguros">Explore MOM Seguros <span aria-hidden="true">↗</span></Link></div>
            <ProjectVisual variant="insurance" />
          </article>
          <article className="work-preview work-preview-tempo">
            <div className="work-preview-copy"><p className="eyebrow">04 · Tempo · AI product discovery</p><h3>What if available time isn’t the same as available capacity?</h3><p>We started with the idea that calendar gaps were the problem. User research showed us that a free hour doesn’t always mean someone has the energy or capacity to use it.</p><div className="preview-learning"><span>Calendar availability</span><i>→</i><strong>Time ≠ capacity</strong><i>→</i><span>Adaptive planning</span></div><p className="evidence-note">This learning changed the product direction. It is not a business outcome.</p><Link className="text-link" href="/work/tempo-ai-life-planner">Explore Tempo <span aria-hidden="true">↗</span></Link></div>
            <ProjectVisual variant="tempo" />
          </article>
        </div>
      </div>
    </section>
  );
}

export function CareerPreview() {
  return (
    <section className="career-preview" id="journey" aria-labelledby="career-preview-title">
      <div className="page-shell career-preview-inner">
        <div><p className="eyebrow">A short career arc</p><h2 id="career-preview-title">Closer to the problem.<br /><em>Broader in the decisions.</em></h2></div>
        <div className="career-progression" aria-label="Career progression"><span>Product / Business Analyst</span><i>→</i><span>Product Owner</span><i>→</i><span>Product Manager</span><i>→</i><span>Senior Product Leader</span><i>→</i><span>Product + GTM Lead</span></div>
        <p>From understanding systems and translating problems to owning products, strategy, and outcomes across enterprise scale and 0→1 work.</p>
        <Link className="text-link" href="/about">Read my story <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}

export function HowIThink() {
  return (
    <section className="how-i-think" id="thinking" aria-labelledby="thinking-title">
      <div className="page-shell how-i-think-inner"><div><p className="eyebrow">Product judgment</p><h2 id="thinking-title">How I think<br /><em>about products.</em></h2></div><ol>{principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span><strong>{principle}</strong></li>)}</ol><Link className="text-link" href="/thinking">More on how I think <span aria-hidden="true">→</span></Link></div>
    </section>
  );
}
