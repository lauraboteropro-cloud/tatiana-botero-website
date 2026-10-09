import Link from "next/link";
import { CareerJourney } from "@/components/career-journey";
import { WorkIndex } from "@/components/work-index";

export function JourneySection() {
  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="page-shell">
        <header className="section-head" data-reveal>
          <p className="eyebrow">My path into product</p>
          <h2 id="journey-title">My scope grew as the questions I owned got bigger.</h2>
          <p className="section-sub">I started by learning how a complex operation worked. Each role expanded the question I was responsible for answering.</p>
        </header>
        <CareerJourney />
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="page-shell">
        <header className="section-head" data-reveal>
          <p className="eyebrow">Case studies</p>
          <h2 id="work-title">Culinary arts taught me to experiment, diagnose, and understand how small changes affect the whole.</h2>
        </header>
        <div data-reveal><WorkIndex /></div>
      </div>
    </section>
  );
}

const principles = [
  ["Requests aren’t requirements.", "A request is evidence about a need, not automatically the solution."],
  ["Not every problem needs software.", "Sometimes the right fix is process, ownership, training, policy, or capacity."],
  ["Understand the system before optimizing one part.", "A local fix can create friction somewhere downstream."],
  ["Adoption is part of the product.", "A system people don’t trust or use hasn’t solved the problem."],
  ["AI isn’t automatically the solution.", "I start with the workflow, then decide whether AI has a useful role."],
  ["Shipping isn’t the outcome.", "What matters is what changed for users and the business."],
];

export function HowIThink() {
  return (
    <section className="think" id="thinking" aria-labelledby="thinking-title">
      <div className="page-shell think-inner">
        <div data-reveal>
          <p className="eyebrow">How I think</p>
          <h2 id="thinking-title">Principles I keep coming back to.</h2>
          <Link className="text-link" href="/thinking">More on how I think <span className="arrow-icon" aria-hidden="true">→</span></Link>
        </div>
        <div className="principles" data-reveal>
          {principles.map(([title, text], index) => (
            <details name="principles" key={title}>
              <summary><span className="principle-number">{String(index + 1).padStart(2, "0")}</span><span className="principle-title">{title}</span><span className="principle-mark" aria-hidden="true">+</span></summary>
              <p>{text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
