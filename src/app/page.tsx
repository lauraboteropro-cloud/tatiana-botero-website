import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroSystemMap } from "@/components/system-visuals";
import { CareerPreview, HowIThink, SelectedImpact, SelectedWork } from "@/components/portfolio-sections";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section className="hero page-shell" aria-labelledby="hero-title">
          <div className="hero-topline eyebrow"><span>Senior / Lead Product Manager</span><span>Enterprise · 0→1 · B2B / Vertical SaaS · AI · Operations</span></div>
          <div className="hero-layout">
            <div className="hero-content">
              <p className="hero-name">Tatiana Botero</p>
              <h1 id="hero-title">I build products<br />for <em>complex problems.</em></h1>
              <p className="hero-copy">I’m a Senior / Lead Product Manager. I work with users, business teams, operations, and technology to turn fragmented workflows into products and systems that scale.</p>
              <div className="hero-actions"><a className="button button-dark" href="#work">View selected work <span aria-hidden="true">↓</span></a><a className="text-link" href="/about">About me <span aria-hidden="true">→</span></a></div>
            </div>
            <div className="hero-visual-wrap" aria-hidden="true"><HeroSystemMap /></div>
          </div>
          <div className="hero-meta" aria-label="Product experience"><span>Enterprise</span><i>·</i><span>0→1</span><i>·</i><span>B2B / Vertical SaaS</span><i>·</i><span>AI + Automation</span><i>·</i><span>Operations</span></div>
        </section>
        <SelectedImpact />
        <SelectedWork />
        <CareerPreview />
        <HowIThink />
        <section className="home-about-preview" aria-labelledby="home-about-title">
          <div className="page-shell home-about-preview-inner"><div><p className="eyebrow">About</p><h2 id="home-about-title">I learned product by getting close to the <em>problem.</em></h2></div><div><p>From culinary arts to product leadership, I’ve kept the same curiosity: what is really happening, what is out of balance, and what change would make the whole experience work better?</p><Link className="text-link" href="/about">Read my story <span aria-hidden="true">→</span></Link></div></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
