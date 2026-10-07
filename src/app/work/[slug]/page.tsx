import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const studies = {
  "enterprise-workforce-platform": {
    title: "From fragmented operations to infrastructure for ~2,000 employees.",
    subtitle: "Enterprise Workforce Platform · Product Management · Operations Transformation",
    description: "A multi-year product journey connecting employee lifecycle workflows across HR, Payroll, Recruitment, Training, Operations, Finance, Quality, and IT.",
  },
  "stealth-telecom": {
    title: "Finding the problems worth turning into products.",
    subtitle: "Stealth Telecom Technology · Product & Go-to-Market Lead · 2026–Present",
    description: "Market-led 0→1 product strategy and customer discovery across telecom operational problems. This work is in progress; no commercial outcomes are claimed.",
  },
  "mom-seguros": {
    title: "Taking operational product thinking into an external 0→1 product.",
    subtitle: "MOM Seguros · Co-Founder / Product · Insurtech",
    description: "An external insurance product spanning self-service journeys, partner integrations, and founder-level product decisions.",
  },
  "tempo-ai-life-planner": {
    title: "What if available time isn’t the same as available capacity?",
    subtitle: "Tempo · AI Product Discovery · Product Exploration",
    description: "Discovery challenged an assumption about unused calendar time and reshaped the exploration toward priorities and human capacity.",
  },
} as const;

type StudySlug = keyof typeof studies;

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = studies[slug as StudySlug];
  return study ? { title: `${study.title} | Tatiana Botero`, description: study.description } : {};
}

const enterpriseResults = [
  ["4+ days → <1 day", "Payroll processing"],
  ["~300 → ~5", "Payroll complaints per cycle · ~98% reduction"],
  ["35 → 105 / day", "Candidate screenings · ~3× capacity"],
  ["~50% → ~99%", "Employee-document completion"],
  ["~50% → ~90%", "Schedule adherence"],
  ["200+ / month", "Employee transfers · ~99% billing accuracy"],
  ["~75%", "Estimated third-party license cost reduction"],
  ["~1,900–2,000", "Employees supported"],
  ["7", "Locations"],
  ["20+", "Client programs"],
];

const outcomes = [
  { title: "Payroll", metric: "4+ days → <1 day · ~300 → ~5 complaints / cycle", changed: "I worked with the team to connect attendance, payroll rules, validation, approvals, and exception handling. We automated calculations and checks that had required manual work.", mattered: "Payroll processing went from more than four days to less than one. Complaints fell by about 98%, so Payroll, HR, Finance, managers, and employees spent less time investigating and correcting disputes." },
  { title: "Recruiting", metric: "35 → 105 screenings / day · ~90% class fill on time", changed: "We digitized the recruiting pipeline. Screening capacity grew about threefold across seven recruiters without a proportional increase in recruiting capacity.", mattered: "More candidates moved through recruiting, and training classes filled more reliably. That eased a hiring bottleneck and helped the teams staff growing client programs. I can’t attribute revenue to this change." },
  { title: "Employee records", metric: "~50% → ~99% document completion", changed: "We moved document collection, validation, signatures, and status tracking into digital employee records instead of relying on manual follow-up.", mattered: "HR could see what was missing, find records more easily, and prepare for audits with more complete files. Standardized documentation also helped reduce compliance exposure." },
  { title: "Workforce operations", metric: "~50% → ~90% schedule adherence", changed: "We connected schedules, attendance, staffing, and operational information so managers could compare planned hours with what was actually delivered.", mattered: "Managers could spot coverage gaps earlier. Better visibility supported staffing decisions and more reliable client service, helping protect billable capacity. I’m not assigning a dollar value to that effect." },
  { title: "Employee transfers", metric: "200+ transfers / month · ~99% billing accuracy", changed: "A transfer could affect Operations, Payroll, Finance, IT, reporting, client assignment, cost centers, and management hierarchy. We connected these updates in the workflow.", mattered: "Teams had fewer updates to coordinate by hand. Correct assignments supported billing accuracy and reduced the chance of billing errors or revenue leakage." },
  { title: "License and credential management", metric: "~75% estimated cost reduction · ~25 unused licenses avoided weekly", changed: "We connected employee lifecycle changes to account provisioning and deprovisioning.", mattered: "When an employee left or transferred, accounts could be reviewed and removed sooner. Career records estimate a 75% reduction in third-party license costs and about 25 unused licenses avoided each week. Those figures have not been independently validated." },
  { title: "Retention and performance", metric: "~30–50 → <10 weekly attrition · ~70% PIP recovery per career records", changed: "Managers had a structured way to identify performance concerns, document coaching, agree on interventions, and track what happened.", mattered: "Earlier conversations gave employees more opportunity to recover. Lower attrition meant less replacement hiring and training, and helped preserve an experienced workforce. The PIP recovery figure comes from career records." },
  { title: "Leave and capacity planning", metric: "~60% → ~92% capacity-planning accuracy", changed: "We connected leave requests with schedules, workforce planning, and payroll so teams had a clearer view of who was available.", mattered: "Better availability information supported more accurate forecasts and staffing decisions. Career records also report that duplicate vacation payments were eliminated." },
];

type CaseSectionProps = { label: string; title: React.ReactNode; children: React.ReactNode; className?: string };

function CaseSection({ label, title, children, className = "" }: CaseSectionProps) {
  return <section className={`case-section ${className}`}><div><p className="eyebrow">{label}</p><h2>{title}</h2></div><div>{children}</div></section>;
}

function EnterpriseStudy() {
  return (
    <>
      <section className="case-result-preview" aria-labelledby="enterprise-result-title">
        <div className="page-shell">
          <p className="eyebrow">What changed · Enterprise scale + measurable results</p>
          <h2 id="enterprise-result-title">A platform built to support the <em>workforce.</em></h2>
          <dl className="case-result-grid">{enterpriseResults.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
        </div>
      </section>
      <div className="page-shell case-study-content enterprise-case">
        <CaseSection label="01 · Context" title={<>A growing company.<br /><em>Disconnected operations.</em></>}>
          <p>Over several years, I worked from discovery and requirements through an enterprise operating platform used to support about 1,900–2,000 employees, seven locations, and more than 20 client programs.</p>
          <p>When I started mapping how work moved, I found HR spreadsheets, separate Payroll files, paper forms, WhatsApp, email, and independent employee lists. The same employee could look different depending on which team you asked. Hiring, attrition, attendance, payroll, staffing, and performance were hard to understand together.</p>
        </CaseSection>
        <CaseSection label="02 · The problem" title={<>The same employee showed up differently in <em>every department.</em></>}>
          <p>At first, these looked like separate department problems. But when I followed one employee event through the company, I saw how many teams and downstream steps it touched.</p>
          <div className="dependency-example"><p className="eyebrow">Example · Employee transfer</p><strong>One employee change</strong><span aria-hidden="true">↓</span><div>{["Operations", "Payroll", "Finance", "IT", "Client assignment", "Cost center", "Management hierarchy", "Reporting", "Billing"].map((item) => <span key={item}>{item}</span>)}</div></div>
          <p>Without a shared workflow, the same transfer needed to be updated in several places. That created more manual work and more chances for records to get out of sync.</p>
        </CaseSection>
        <CaseSection label="03 · Product decisions" title={<>Center the system on the <em>employee lifecycle.</em></>}>
          <p>We could have built another HR app and another Payroll app, each with its own employee record. I helped shape a different approach: center the system on the employee, then connect the lifecycle across departments.</p>
          <ol className="lifecycle-flow">{["Recruitment", "Onboarding + documents", "Training", "Operations", "Scheduling + attendance", "Performance", "Payroll", "Leave", "Transfers", "Credentials", "Offboarding"].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
          <p>That meant a change in one workflow could be considered alongside the teams it affected in HR, Payroll, Finance, Recruitment, Training, Quality, IT, Operations, and Leadership.</p>
        </CaseSection>
        <CaseSection label="04 · Product decisions / solution" title={<>Build the shared foundation.<br /><em>Connect the workflows.</em></>} className="case-solution">
          <div className="decision-points">
            <article><span>01</span><h3>Shared employee record</h3><p>Keep employee information connected across lifecycle workflows instead of maintaining separate departmental records.</p></article>
            <article><span>02</span><h3>Hierarchy and permissions</h3><p>Relate locations, branches, departments, clients, campaigns, roles, employees, managers, payroll structures, and access.</p></article>
            <article><span>03</span><h3>Follow the dependencies</h3><p>When one change touched HR, Payroll, Finance, IT, Operations, or client delivery, account for those effects in the workflow.</p></article>
          </div>
          <p className="role-scope"><strong>My role grew over time.</strong> I started with discovery, process mapping, and requirements. I later owned product strategy, business rules, permissions, backlog and prioritization, user stories, acceptance criteria, testing, release validation, implementation, training, adoption, support, analytics, and ongoing improvement. I worked directly with executives, department leaders, operational teams, and end users.</p>
        </CaseSection>
        <CaseSection label="05 · Wins" title={<>Numbers first.<br /><em>Then the change behind them.</em></>} className="case-wins">
          <p className="case-section-note">I’ll show what changed, how we got there, and why it mattered to the business.</p>
          <div className="case-outcome-list">{outcomes.map((story, index) => <details key={story.title}><summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{story.title}</strong><b>{story.metric}</b><i aria-hidden="true">+</i></summary><div><p><strong>What changed</strong>{story.changed}</p><p><strong>Why it mattered</strong>{story.mattered}</p></div></details>)}</div>
        </CaseSection>
        <section className="case-business-impact">
          <p className="eyebrow">06 · Business impact</p><h2>Operating infrastructure<br /><em>that supported scale.</em></h2>
          <p>The product and operating infrastructure supported the organization during a period when monthly revenue grew from about $500K to $3M. That’s company context. I’m not saying the platform caused the revenue growth.</p>
          <div className="scale-proof-line"><span>~300 employees earlier</span><i aria-hidden="true">→</i><strong>~1,900–2,000 supported</strong><span>· 7 locations · 20+ client programs</span></div>
          <p>More people meant more than more users: each employee, location, client, and program increased complexity across staffing, permissions, payroll, training, reporting, and service delivery. Shared records, hierarchy, workflows, and controls helped teams manage that complexity without rebuilding for every department or program.</p>
        </section>
        <CaseSection label="07 · Learning" title={<>Good architecture creates options before you <em>know you’ll need them.</em></>} className="case-learning">
          <p>During COVID, about 600 employees moved into hotel-based operations in Belize City. Career records say the move happened within days while operations continued. Configurable locations, clients, and campaigns let the operating model change without rebuilding the system.</p>
          <p>I learned that good architecture gives a business options before it knows it will need them.</p>
        </CaseSection>
      </div>
    </>
  );
}

function StealthTelecomStudy() {
  return (
    <div className="page-shell case-study-content">
      <section className="current-work-status"><p className="eyebrow">Current work · 2026–Present</p><p>This work is still at the beginning. We’re finding problems, shaping product ideas, and testing what might work. There’s no proven product-market fit, traction, successful pilot, or commercial result to report yet.</p></section>
      <CaseSection label="01 · Context" title={<>I used to solve these problems inside one company. Now I’m looking for the ones that repeat <em>across a market.</em></>}>
        <p>At Fusion CX, I worked inside one organization and saw how operational problems affected different teams. In this telecom venture, I’m using that experience to ask which problems recur across companies. I don’t want to assume that a problem from my last role is automatically a market need.</p>
        <p>I’m Product & Go-to-Market Lead. I’m working on product strategy, customer discovery, market validation, ICP and segmentation, positioning, pilot strategy, AI and automation, and deciding what could become a product.</p>
      </CaseSection>
      <CaseSection label="02 · Problem discovery" title={<>Understand the problem before shaping the <em>product.</em></>}>
        <ol className="lifecycle-flow">{["Problem", "Current workflow", "Existing tools", "Friction", "Business impact", "Buyer", "Urgency", "Willingness to pay", "Repeatability"].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
        <p>I’m working with telecom leaders and operators to understand what happens today, where work gets stuck, what that costs, and who cares enough to fix it. Then I look for signs the same problem shows up elsewhere.</p>
      </CaseSection>
      <CaseSection label="03 · Product judgment" title={<>Choose the intervention, including <em>not building.</em></>}>
        <p>I’m talking with people about workforce and operations, sales performance, customer operations, quality, training, employee lifecycle, reporting, data integration, workflow automation, and AI-assisted operations. These are areas I’m investigating. We don’t have products for all of them.</p>
        <p>For each problem, I ask whether we should integrate, automate, build, use AI, find a partner, change the process, or leave it alone. I look at how painful it is, who owns it, whether it repeats, and whether a buyer would pay for a better way.</p>
      </CaseSection>
      <CaseSection label="04 · Product + commercial strategy" title={<>Market evidence informs what to build and <em>how we take it to market.</em></>}>
        <p>What I hear in discovery should shape both the product and how we talk about it. It helps me understand who might buy, why the problem matters now, what an initial offer could be, and what a pilot needs to test.</p>
        <p>Right now, I’m working through market discovery, customer problems, business impact, product ideas, pilots, and validation. We’re still figuring out which steps make sense. This isn’t a proven sales process.</p>
      </CaseSection>
      <CaseSection label="05 · AI + productization" title={<>AI is one tool.<br /><em>Repeatability is the question.</em></>}>
        <p>Some problems may call for AI. Others may be better handled with automation, integrations, analytics, a workflow change, or a person staying in the loop. We’re exploring possible benefits such as less manual work or better visibility. Those are ideas to test, not results we’ve achieved.</p>
        <p>I’m also looking for patterns. Does the same problem keep coming up? Can we reuse the workflow? Could configuration replace one-off customization? Would a company pay for a standard version?</p>
      </CaseSection>
      <section className="telecom-closing"><p className="eyebrow">The question guiding the work</p><blockquote>“Which operational problems across telecom are painful enough to solve, recurring enough to standardize, valuable enough to pay for, and common enough to become scalable products?”</blockquote><p className="evidence-note">Current work in progress · No commercial outcomes claimed.</p></section>
    </div>
  );
}

function MomStudy() {
  return (
    <div className="page-shell case-study-content">
      <section className="case-result-preview compact-result"><p className="eyebrow">Result preview · Supported recognition</p><div className="mom-recognition"><strong>Best Startup of the Year</strong><span>CINTEL & PwC Andicom</span></div><p>0→1 external customer product · Co-Founder / Product</p></section>
      <CaseSection label="01 · Context" title={<>Moving from internal systems to a product for <em>external customers.</em></>}>
        <p>At MOM Seguros, I co-founded an insurtech product and worked as Product Manager. We were building digital, self-service insurance journeys and working with insurer partners. It was my move from internal enterprise software to a product for external customers.</p>
        <p>No revenue, customer growth, conversion, retention, or adoption metric is claimed here.</p>
      </CaseSection>
      <CaseSection label="02 · Problem" title={<>Make complex insurance steps feel like one <em>digital journey.</em></>}>
        <p>A customer needed to move through several steps to get a policy. We worked on bringing those steps into a digital journey while coordinating with insurer partners.</p>
        <div className="case-flow-simple">{["Quote", "Authenticate", "Pay", "Issue policy"].map((step, index) => <span key={step}>{index > 0 && <i aria-hidden="true">→</i>}{step}</span>)}</div>
      </CaseSection>
      <CaseSection label="03 · Product decisions + solution" title={<>Design for users and the <em>partner ecosystem.</em></>}>
        <p>I worked across product development, customer journeys, quoting, authentication, payments, policy issuance, carrier integrations, partnerships, and business development. I had to make product decisions while we were still working out the business and partner model.</p>
        <p>The work involved external users, insurer integrations, and commercial questions. I don’t have verified traction or revenue figures to include.</p>
      </CaseSection>
      <CaseSection label="04 · Wins + business impact" title={<>A supported signal of <em>external recognition.</em></>}>
        <p><strong>MOM Seguros received the Best Startup of the Year recognition from CINTEL and PwC Andicom.</strong></p>
        <p>I don’t have verified commercial results to add here. What I can show is the work of building for external customers, coordinating with partners, and making founder-level decisions while the product was still taking shape.</p>
      </CaseSection>
      <CaseSection label="05 · Learning" title={<>External products add the <em>ecosystem.</em></>}>
        <p>I learned that the customer journey depends on more than the interface. Partner capabilities and operating constraints matter too. This work stretched my experience from internal products to external customers, integrations, partnerships, and business development.</p>
      </CaseSection>
    </div>
  );
}

function TempoStudy() {
  return (
    <div className="page-shell case-study-content">
      <section className="case-result-preview compact-result"><p className="eyebrow">What we learned · Product discovery</p><h2>Available time <em>isn’t</em> always available capacity.</h2><p>User research challenged our first assumption and changed the product direction. This is a learning, not a business result.</p></section>
      <CaseSection label="01 · Context" title={<>Organized at work. Personal priorities still <em>postponed.</em></>}>
        <p>Tempo is an AI product exploration about planning for busy professionals. We’re looking at responsibilities, calendars, personal priorities, and other context to see whether planning could better reflect real life. It’s an experiment, not a proven startup.</p>
      </CaseSection>
      <CaseSection label="02 · Initial assumption" title={<>Calendar gaps were the <em>opportunity.</em></>}>
        <p>At first, I thought unused calendar time might be the opportunity to schedule personal priorities people kept postponing. I was treating the problem as calendar availability.</p>
        <div className="case-flow-simple"><span>Calendar availability</span><i aria-hidden="true">→</i><span>Schedule priorities</span></div>
      </CaseSection>
      <CaseSection label="03 · Discovery + product decision" title={<>Time available does not mean capacity <em>available.</em></>}>
        <p>In user conversations, that assumption didn’t hold. A free hour doesn’t necessarily mean someone has the mental or physical capacity to use it well.</p>
        <p className="validated-learning">WHAT I LEARNED<br /><strong>Available time is not the same as available capacity</strong></p>
        <p>That changed the direction. We started exploring how to plan around time, priorities, and a person’s capacity together.</p>
        <div className="case-flow-simple"><span>Time</span><i>+</i><span>Priorities</span><i>+</i><strong>Capacity</strong><i>→</i><span>Adaptive planning</span></div>
      </CaseSection>
      <CaseSection label="04 · Product behavior" title={<>Recommend, but keep the user <em>in control.</em></>}>
        <p>We’re exploring suggestions to keep, move, rearrange, or defer a task. The user should be able to review a suggestion before anything changes on their calendar.</p>
        <div className="case-products-tags">{["Keep", "Move", "Rearrange", "Defer"].map((action) => <span key={action}>{action}</span>)}</div>
      </CaseSection>
      <CaseSection label="05 · My role + learning" title={<>Discovery before <em>certainty.</em></>}>
        <p>I’ve worked on discovery, user and market research, competitive research, problem framing, product strategy, MMP definition, prioritization, requirements, AI behavior, guardrails, success measures, and collaboration with design and engineering.</p>
        <p>The result so far is a changed assumption and a different product direction. I’m not claiming conversion, retention, growth, product-market fit, or AI performance.</p>
      </CaseSection>
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  if (!(slug in studies)) notFound();
  const study = studies[slug as StudySlug];
  return (
    <>
      <SiteHeader />
      <main className="secondary-page case-study-page" id="main">
        <header className="page-shell case-hero"><p className="eyebrow">Selected work · {study.subtitle}</p><h1>{study.title}</h1><p className="secondary-lede">{study.description}</p><Link className="text-link" href="/#work">Back to selected work <span aria-hidden="true">←</span></Link></header>
        {slug === "enterprise-workforce-platform" && <EnterpriseStudy />}
        {slug === "stealth-telecom" && <StealthTelecomStudy />}
        {slug === "mom-seguros" && <MomStudy />}
        {slug === "tempo-ai-life-planner" && <TempoStudy />}
      </main>
      <SiteFooter />
    </>
  );
}
