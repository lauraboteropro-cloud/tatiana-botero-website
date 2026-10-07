import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Writing | Tatiana Botero",
  description: "A place for future writing on product judgment, operations, systems, and AI-enabled workflows.",
};

export default function WritingPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell secondary-page writing-page" id="main">
        <header className="secondary-hero">
          <p className="eyebrow">Writing / thinking</p>
          <h1>Ideas on products,<br />systems, and the work <em>between.</em></h1>
          <p className="secondary-lede">This space is ready for writing. No articles or external publications are represented yet.</p>
        </header>
        <div className="writing-topics"><span>Operational product discovery</span><span>Architecture as a product decision</span><span>AI inside real workflows</span><span>Adoption and operating change</span></div>
        <Link className="text-link" href="/">Back to the portfolio <span aria-hidden="true">←</span></Link>
      </main>
      <SiteFooter />
    </>
  );
}
