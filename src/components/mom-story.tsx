"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { CaseShell } from "@/components/case-shell";
import type { CaseSection } from "@/components/case-shell";
import { CareerContext, QuestionsCompare } from "@/components/mom-interactive";

const MOM_LINKEDIN_URL = "https://www.linkedin.com/company/mom-seguros/home/";

/* Real product screens only. A null src means the real screenshot hasn't been supplied yet, so nothing is drawn for it. */
const MOM_UI_QUOTE_PLACEHOLDER: string | null = null;
const screens: { id: string; stage: string; note: string; src: string | null; w: number; h: number; alt: string }[] = [
  { id: "quote", stage: "Quote", note: "Get a quote", src: MOM_UI_QUOTE_PLACEHOLDER, w: 630, h: 1270, alt: "" },
  { id: "explore", stage: "Explore", note: "Explore insurance options and insurers", src: "/mom-assets/mom-ui-home.png", w: 632, h: 1268, alt: "MOM Seguros home screen with insurance services and insurance companies" },
  { id: "authenticate", stage: "Authenticate", note: "Verify with a one-time code", src: "/mom-assets/mom-ui-otp.png", w: 640, h: 1272, alt: "MOM Seguros one-time code verification screen" },
  { id: "pay", stage: "Pay and policy", note: "Payment confirmed and purchase summary", src: "/mom-assets/mom-ui-payment-summary.png", w: 630, h: 1270, alt: "MOM Seguros purchase summary confirming a successful payment" },
];
const shown = screens.filter((s) => s.src);
const journey = ["Quote", "Authenticate", "Pay", "Issue policy"];
const partners = ["SURA", "AXA Colpatria", "Mundial", "Colmena", "SBS", "Berkley"];
const openQuestions = ["Would behavior change?", "Would people pay?", "Could distribution work?", "Did the business model hold up?", "Was the runway enough?", "Were we aligned as founders?"];
const layers = [
  ["Business model + runway", "How the business sustains itself"],
  ["Distribution + customer behavior", "How people find it, and whether they change habits"],
  ["Partner capabilities + operating constraints", "What the insurers can actually support"],
  ["The interface", "Quote, authenticate, pay, issue policy"],
];
const ladder = ["For whom?", "How important is it?", "What behavior has to change?", "What business value does it create?", "What evidence would prove it?"];
const fromMom = ["Behavior", "Demand", "Willingness to pay", "Runway", "Founder alignment"];
const today = ["Market discovery", "Customer discovery", "ICP", "Buyer", "Business impact", "Willingness to pay", "Pilot strategy", "Productization", "GTM"];

function Overview({ go }: { go: (i: number) => void }) {
  return (
    <div className="es-overview has-grid">
      <div className="mm-brand">
        <Image src="/mom-assets/mom-logo.png" alt="MOM Seguros" width={266} height={264} className="mm-logo" priority />
        <div>
          <p className="eyebrow">MOM Seguros</p>
          <p className="ec-meta">2022 to 2023 · 0→1 insurtech · Co-Founder + Product</p>
          <a className="mm-li" href={MOM_LINKEDIN_URL} target="_blank" rel="noopener noreferrer">View MOM Seguros on LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <h1>Building the product. Questioning the business.</h1>
      <p className="es-lede">I co-founded an insurtech and worked on digital insurance journeys, insurer integrations, and partnerships. It’s where I tested what I knew about product in a real market.</p>
      <ul className="ec-proof" aria-label="Early signals">
        <li><strong>20,000</strong>Downloads in the first month</li>
        <li><strong>6</strong>Insurance partners</li>
        <li><strong>Best Startup</strong>of the Year, CINTEL + PwC Andicom</li>
      </ul>
      <button type="button" className="button" onClick={() => go(1)}>Explore the story <span aria-hidden="true">↓</span></button>
    </div>
  );
}

function Question() {
  return (
    <div>
      <p className="eyebrow">The question</p>
      <h2>We made insurance easier to buy. But did that make people want to buy insurance?</h2>
      <p className="es-lead">We believed insurance could be easier to buy and manage digitally.</p>
      <div className="es-block">
        <p className="es-label">The people</p>
        <ul className="tc-tags"><li>Customer</li><li>Insurance partner</li><li>Product team</li></ul>
      </div>
      <div className="es-block">
        <p className="es-label">The design challenge</p>
        <blockquote className="sc-challenge">Are we removing friction from an existing behavior, or asking customers to adopt a new one?</blockquote>
      </div>
      <div className="es-block">
        <p className="es-label">What I worked on</p>
        <ul className="tc-tags">{["Customer journeys", "Insurer integrations", "Partnerships", "Business development", "Founder-level decisions"].map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </div>
  );
}

function Product() {
  const [active, setActive] = useState(Math.min(1, shown.length - 1));
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const move: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    const step = move[event.key];
    if (!step) return;
    event.preventDefault();
    setActive(Math.min(shown.length - 1, Math.max(0, active + step)));
  };
  return (
    <div>
      <p className="eyebrow">The product</p>
      <h2>We built a digital insurance experience customers could navigate themselves.</h2>
      <ol className="mm-journey mm-journey-tight" aria-label="The journey">
        {journey.map((step, index) => <li key={step} style={{ "--i": index } as CSSProperties}><span className="mm-step-dot" aria-hidden="true">{index + 1}</span>{step}</li>)}
      </ol>
      <div className="mm-phones" onKeyDown={onKeyDown} role="group" aria-label="Product screens">
        {shown.map((screen, index) => (
          <figure key={screen.id} className={`mm-phone${active === index ? " is-on" : ""}`}>
            <button type="button" aria-pressed={active === index} onClick={() => setActive(index)} aria-label={`Show ${screen.stage}`}>
              <span className="mm-phone-frame"><Image src={screen.src as string} alt={screen.alt} width={screen.w} height={screen.h} sizes="(max-width: 720px) 60vw, 320px" /></span>
            </button>
            <figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{screen.stage}</strong>{screen.note}</figcaption>
          </figure>
        ))}
      </div>
      <p className="es-small mm-hint">Screens from the product we shipped. Select one to focus it.</p>
    </div>
  );
}

function Signals() {
  return (
    <div>
      <p className="eyebrow">Early market signals</p>
      <h2>The attention was real. The question was what it meant.</h2>
      <div className="mm-signals">
        <div className="mm-signal mm-signal-told">
          <p className="tc-side-label">What it told us</p>
          <ul className="tl-proof">
            <li><strong>20,000</strong>downloads in the first month</li>
            <li><strong>6</strong>insurance partners</li>
          </ul>
          <p className="mm-partners">{partners.join(" · ")}</p>
          <p className="mm-award"><strong>Best Startup of the Year</strong>CINTEL &amp; PwC Andicom</p>
        </div>
        <div className="mm-signal mm-signal-unknown">
          <p className="tc-side-label">What it couldn’t tell us</p>
          <ul>{openQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
        </div>
      </div>
      <p className="es-statement mm-pmf"><span>Attention</span> <i aria-hidden="true">≠</i><span className="sr"> is not </span> <span>product-market fit</span></p>
      <p className="es-small mm-center-small">A good product experience doesn’t automatically create product-market fit.</p>
    </div>
  );
}

function Learned() {
  return (
    <div>
      <p className="eyebrow">What the market taught me</p>
      <h2>A customer journey depends on more than the interface.</h2>
      <ol className="mm-layers mm-layers-left" aria-label="What sits beyond the interface, from outside in">
        {layers.map(([title, note], index) => (
          <li key={title} style={{ "--d": index } as CSSProperties}><span className="mm-layer-title">{title}</span><span className="mm-layer-note">{note}</span></li>
        ))}
      </ol>
      <div className="es-block">
        <p className="es-label">What MOM added to the questions I ask</p>
        <QuestionsCompare />
      </div>
      <p className="es-statement">MOM expanded my definition of product from <em>building the right solution</em> to questioning whether we were <em>building the right business.</em></p>
    </div>
  );
}

function Changed() {
  return (
    <div>
      <p className="eyebrow">How it changed how I build</p>
      <h2>I went back to enterprise product work asking different questions.</h2>
      <div className="es-block"><p className="es-label">Where this happened in my career</p><CareerContext /></div>
      <ol className="mm-ladder mm-ladder-left es-block">
        <li className="mm-ladder-before"><span className="mm-ladder-label">Before</span>Can we solve it?</li>
        <li className="mm-ladder-main"><span className="mm-ladder-label">After MOM</span>Should we solve it?</li>
        {ladder.map((q) => <li key={q}>{q}</li>)}
      </ol>
      <p className="es-lead">I returned to Fusion CX as a Senior Product Manager with a broader view of product: not only how to build and scale systems, but how customer behavior, economics, adoption, and business viability shape product decisions.</p>
      <div className="es-block">
        <p className="es-label">Why this still matters</p>
        <div className="mm-bridge">
          <div className="mm-bridge-side"><p className="tc-side-label">MOM Seguros</p><ul>{fromMom.map((i) => <li key={i} className={today.includes(i) ? "is-shared" : undefined}>{i}</li>)}</ul></div>
          <span className="mm-bridge-arrow" aria-hidden="true" />
          <div className="mm-bridge-side mm-bridge-now"><p className="tc-side-label">Today</p><ul>{today.map((i) => <li key={i} className={fromMom.includes(i) ? "is-shared" : undefined}>{i}</li>)}</ul></div>
        </div>
        <p className="es-lead">Many of the questions I’m asking in my current 0→1 work are questions I learned, sometimes painfully, to ask much earlier because of MOM.</p>
      </div>
    </div>
  );
}

const sections: CaseSection[] = [
  { id: "overview", label: "Overview", render: (go) => <Overview go={go} /> },
  { id: "question", label: "The question", render: () => <Question /> },
  { id: "product", label: "The product", render: () => <Product /> },
  { id: "signals", label: "Market signals", render: () => <Signals /> },
  { id: "learned", label: "What I learned", render: () => <Learned /> },
  { id: "changed", label: "How it changed me", render: () => <Changed /> },
];

export function MomStory() {
  return <CaseShell className="mm" sections={sections} next={{ href: "/work/stealth-telecom", label: "See how I apply this today" }} />;
}
