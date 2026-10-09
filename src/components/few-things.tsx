"use client";

import { useRef, useState } from "react";

const cards = [
  { n: "01", label: "What I’m curious about", text: "How businesses work. Why people behave the way they do. Where systems break. What happens when one small change affects everything else." },
  { n: "02", label: "How I work", text: "I usually start with “What’s actually happening?” before asking “What should we build?”" },
  { n: "03", label: "What I’m doing now", text: "I’m working at the intersection of product, operations, technology and GTM, figuring out which real-world problems are worth turning into products." },
  { n: "04", label: "Outside product", text: "Cooking, discovering new cafés, traveling, birdwatching, trying new food, and apparently analyzing how things work even when I’m supposed to be relaxing." },
];

/* Four notes as swipeable cards: a native scroll-snap strip with arrows and dots that follow it. */
export function FewThings() {
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (index: number) => {
    const el = strip.current;
    const card = el?.children[Math.min(cards.length - 1, Math.max(0, index))] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  };

  const onScroll = () => {
    const el = strip.current;
    if (!el) return;
    let nearest = 0, best = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const d = Math.abs((child as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < best) { best = d; nearest = i; }
    });
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) nearest = cards.length - 1;
    setActive(nearest);
  };

  return (
    <div className="ft">
      <div className="ft-strip" ref={strip} onScroll={onScroll} role="group" aria-label="A few things about me" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); } }}>
        {cards.map((card) => (
          <article className="ft-card" key={card.n}>
            <p className="ft-n">{card.n}</p>
            <h3>{card.label}</h3>
            <p className="ft-text">{card.text}</p>
          </article>
        ))}
      </div>
      <div className="ft-bar">
        <div className="ft-dots">
          {cards.map((card, i) => <button key={card.n} type="button" aria-label={`Show ${card.label}`} aria-current={active === i ? "true" : undefined} onClick={() => go(i)} />)}
        </div>
        <div className="ft-arrows">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous"><span aria-hidden="true">←</span></button>
          <button type="button" onClick={() => go(active + 1)} disabled={active === cards.length - 1} aria-label="Next"><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}
