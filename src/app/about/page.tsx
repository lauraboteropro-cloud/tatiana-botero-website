import type { Metadata } from "next";
import Link from "next/link";
import { Annotation } from "@/components/annotation";
import { FewThings } from "@/components/few-things";
import { AboutPortrait } from "@/components/about-portrait";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About | Tatiana Botero",
  description: "How I became a product manager before I knew that was what I was doing.",
};

const steps = ["Taste", "Question", "Adjust", "Taste again"];
const real = ["Acidity", "Temperature", "Texture", "Balance"];

export default function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className="ab">
        <section className="ab-open" aria-labelledby="about-title">
          <div className="page-shell ab-open-grid">
            <div className="ab-open-copy">
              <p className="ab-head">About</p>
              <h1 id="about-title">I became a product manager before I knew that was what I was doing.</h1>
              <p className="ab-intro">I was curious about how the business worked, why things broke between teams, and how all the pieces connected. Product gave that curiosity a name.</p>
              <Annotation className="ab-note">I ask a lot of questions.</Annotation>
            </div>
            <AboutPortrait />
          </div>
        </section>

        <section className="ab-kitchen paper-run" aria-labelledby="kitchen-title">
          <div className="page-shell">
            <div data-reveal>
              <p className="ab-head">An unexpected beginning</p>
              <h2 id="kitchen-title">Before product, there was a kitchen.</h2>
              <ol className="ab-steps" aria-label="Taste, question, adjust, taste again">
                {steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <p className="ab-ask">Culinary arts taught me something I still use in product: what someone asks for isn’t always what the problem needs.</p>
            </div>

            <div className="ab-salt" data-reveal>
              <div className="ab-salt-says">
                <p className="ab-small-label">Someone may say</p>
                <p className="ab-quote">“More salt.”</p>
              </div>
              <span className="ab-salt-arrow" aria-hidden="true">→</span>
              <div className="ab-salt-real">
                <p className="ab-small-label">But the real issue might be</p>
                <ul>{real.map((word) => <li key={word}>{word}</li>)}</ul>
              </div>
            </div>
            <p className="ab-verdict" data-reveal>Requests aren’t requirements.</p>
          </div>
        </section>

        <section className="ab-few" aria-labelledby="few-title">
          <div className="page-shell">
            <p className="ab-head" id="few-title">A few things about me</p>
            <FewThings />
          </div>
        </section>

        <section className="ab-close" aria-label="Closing">
          <div className="page-shell ab-close-inner">
            <p>Want to talk about a problem worth figuring out?</p>
            <Link className="button" href="/contact">Let’s talk <span className="arrow-icon" aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
