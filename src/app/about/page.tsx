import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About | Tatiana Botero",
  description: "Tatiana Botero's path from culinary arts and business analysis to senior product leadership across enterprise systems and 0→1 work.",
};

const principles = [
  ["Requests aren’t requirements.", "A request is useful information, but not automatically the need or the answer."],
  ["Not every problem needs software.", "Sometimes the right intervention is process, ownership, training, policy, or capacity."],
  ["Understand the system before optimizing the piece.", "A local fix can create a downstream problem."],
  ["Adoption is part of the product.", "A system people do not trust or use has not solved the problem."],
  ["Shipping isn’t the outcome.", "The measure is what changed for users and the business."],
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell secondary-page about-page" id="main">
        <header className="secondary-hero">
          <p className="eyebrow">About · Tatiana Botero</p>
          <h1>Hi, I’m <em>Tatiana.</em></h1>
          <p className="secondary-lede">I got into product by getting closer to how people work and figuring out what gets in their way.</p>
        </header>
        <section className="about-story-section">
          <div className="about-story-opening"><p className="eyebrow">A different starting point</p><h2>I didn’t start<br />in <em>product.</em></h2></div>
          <div className="about-prose">
            <p>I started in culinary arts, before moving into technology as a Product / Business Analyst. It sounds far from product, but it taught me a principle I still use: what someone asks for isn’t always what they need.</p>
            <p>A customer can say, “This needs more salt.” But adding salt isn’t necessarily the answer. The real issue could be acidity, texture, temperature, or balance. The feedback matters. The job is to understand what sits behind it before deciding what to change.</p>
            <blockquote>Requests aren’t requirements.</blockquote>
            <p>Years later, I found myself using the same idea in product. A stakeholder might ask for a feature, an operator for another field, or a customer for automation. I take the request seriously, but I still need to understand why they need it.</p>
            <p>A great recipe also doesn’t guarantee a great restaurant experience. Ingredients, preparation, timing, sequencing, equipment, people, quality control, and execution all matter. Products are similar: a good feature can fail if the process is broken, data is unreliable, ownership is unclear, users are not trained, or the product doesn’t fit the real workflow.</p>
          </div>
        </section>
        <section className="about-evolution-section">
          <div><p className="eyebrow">The career progression</p><h2>Closer to the work.<br /><em>Broader in the decisions.</em></h2></div>
          <ol className="about-evolution-list">
            <li><span>01</span><div><h3>QA Analyst → Technical Writer → Product / Business Analyst</h3><p>Learn the system: test, document, map processes, investigate requirements, and translate operational needs.</p></div></li>
            <li><span>02</span><div><h3>Product Owner</h3><p>Turn that understanding into clear product requirements and delivery decisions.</p></div></li>
            <li><span>03</span><div><h3>Product Manager</h3><p>Own products, shape priorities, and make decisions about what to build and why.</p></div></li>
            <li><span>04</span><div><h3>Senior Product Leader</h3><p>Connect product decisions to operating realities, measurable outcomes, and enterprise scale.</p></div></li>
            <li><span>05</span><div><h3>Product + Go-to-Market Lead</h3><p>Bring market evidence, product strategy, and commercial opportunity together in current 0→1 work.</p></div></li>
          </ol>
        </section>
        <section className="about-range-section">
          <p className="eyebrow">The range came from the work</p>
          <p>Enterprise products · 0→1 · B2B / Vertical SaaS · Insurtech · AI · Automation · Product discovery · Operational systems · Go-to-market</p>
          <div className="about-evidence"><strong>One enterprise platform</strong><span>supported ~1,900–2,000 employees</span><span>across 7 locations and 20+ client programs</span></div>
          <p>Some outcomes included payroll processing reduced from more than four days to less than one, and screening capacity rising from 35 to 105 candidates per day. <Link href="/work/enterprise-workforce-platform">See the evidence and context <span aria-hidden="true">↗</span></Link></p>
        </section>
        <section className="about-judgment-section">
          <div><p className="eyebrow">The visible problem isn’t always the real problem</p><h2>Look beyond the <em>request.</em></h2></div>
          <div><p>A payroll problem can begin with attendance data. A billing problem can begin with an employee transfer. A staffing problem can begin in recruiting weeks earlier. A software request might actually be a process, data, ownership, training, policy, capacity, or incentive problem.</p><p className="about-question">I don’t start with “What should we build?”<br />I start with “What’s actually happening?”</p><p>Sometimes the right answer is software, automation, an integration, AI, or process redesign. Sometimes the right product decision is not to build anything.</p></div>
        </section>
        <section className="about-current-section">
          <p className="eyebrow">The current chapter</p><h2>From solving problems in one organization to finding patterns <em>across a market.</em></h2>
          <p>I’m currently leading product and go-to-market work with an early-stage, stealth telecom technology venture. I’m talking with the market, looking for recurring problems, and helping decide what might become a product.</p>
          <p><strong>Before:</strong> learn how to solve complex operational problems.<br /><strong>Now:</strong> investigate which problems repeat across a market.<br /><strong>Next:</strong> turn validated patterns into scalable products.</p>
        </section>
        <section className="about-outside-section"><p className="eyebrow">Outside product</p><p>I’m endlessly curious. I love traveling, discovering new technology, learning how businesses and systems work, exploring food and culture, and asking probably too many questions about why things work the way they do.</p><p>That curiosity brought me into product. It’s still my favorite part of the job.</p></section>
        <section className="about-principles-section"><p className="eyebrow">A few principles I return to</p><ol>{principles.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
      </main>
      <SiteFooter />
    </>
  );
}
