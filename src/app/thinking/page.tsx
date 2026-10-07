import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "How I Think | Tatiana Botero",
  description: "Product principles and lessons from working inside complex businesses and operational systems.",
};

const principles = [
  ["Requests aren’t requirements.", "A request is evidence about a need, not automatically the solution."],
  ["Not every problem needs software.", "The right intervention may be process, ownership, training, policy, or capacity."],
  ["Understand the system before optimizing the piece.", "A local fix can create downstream friction."],
  ["Adoption is part of the product.", "A system people do not trust or use has not solved the problem."],
  ["Shipping isn’t the outcome.", "The measure is what changed for users and the business."],
  ["AI is a tool, not the strategy.", "Start with the problem and workflow; then decide if AI has a useful role."],
];

export default function ThinkingPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell secondary-page" id="main">
        <header className="secondary-hero">
          <p className="eyebrow">How I think · Product judgment</p>
          <h1>Start with the work.<br />Find the constraint.<br /><em>Choose the intervention.</em></h1>
          <p className="secondary-lede">Product thinking shaped by understanding the business operation and the systems that support it.</p>
        </header>
        <section className="thinking-principles-page">
          <h2>How I think<br />about <em>products.</em></h2>
          <ol>{principles.map(([title, explanation], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{explanation}</p></div></li>)}</ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
