import Link from "next/link";
import { GlassSheets } from "@/components/glass-sheets";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HowIThink, JourneySection, WorkSection } from "@/components/portfolio-sections";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <div className="paper-run paper-run-a">
        <section className="hero" aria-labelledby="hero-title" data-glow>
          <div className="lit-light hero-light" aria-hidden="true"><span /><span /></div>
          <div className="page-shell hero-inner">
            <p className="hero-role">Product · Operations · Systems</p>
            <div className="hero-copy">
              <h1 id="hero-title">I turn complicated business problems into products that make the operation work better.</h1>
            </div>
            <p className="hero-focus">Enterprise products · 0→1 · B2B / Vertical SaaS · AI · Operations</p>
            <GlassSheets />
            <div className="hero-actions">
              <a className="button" href="#work">Explore my work <span className="arrow-icon arrow-down" aria-hidden="true">↓</span></a>
              <Link className="button button-glass" href="/about">My story <span className="arrow-icon" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
        <section className="intro" aria-labelledby="intro-title">
          <div className="page-shell intro-inner" data-reveal>
            <p className="eyebrow">A little about me</p>
            <h2 id="intro-title">Curiosity is what brought me into product.</h2>
            <div className="intro-copy">
              <p>Before product, I studied culinary arts. I loved experimenting with flavors and textures, recreating dishes, questioning what wasn’t working, and changing one thing at a time until it got better.</p>
              <p>When I moved into product, that instinct felt familiar. I wanted to understand how the business worked, how everything connected, where things broke, and what we could improve.</p>
              <p className="intro-close">Different ingredients. Same curiosity.</p>
              <Link className="text-link" href="/about">My story <span className="arrow-icon" aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
        </div>
        <JourneySection />
        <div className="paper-run paper-run-b">
          <WorkSection />
          <HowIThink />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
