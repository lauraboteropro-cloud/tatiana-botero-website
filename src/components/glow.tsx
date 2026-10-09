"use client";

import { useEffect } from "react";

/*
  Cursor-reactive light. Any element with [data-glow] gets --mx / --my (pointer
  position inside it, in px) while a mouse hovers it. CSS decides what to draw.
  Does nothing for touch, or when the visitor prefers reduced motion.
*/
export function GlowController() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    let frame = 0;
    let pending: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const event = pending;
      pending = null;
      if (!event) return;
      const host = (event.target as Element | null)?.closest?.<HTMLElement>("[data-glow]");
      if (!host) return;
      const box = host.getBoundingClientRect();
      host.style.setProperty("--mx", `${Math.round(event.clientX - box.left)}px`);
      host.style.setProperty("--my", `${Math.round(event.clientY - box.top)}px`);
      host.dataset.glowing = "";
    };
    const onMove = (event: PointerEvent) => {
      pending = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = (event: PointerEvent) => {
      const host = (event.target as Element | null)?.closest?.<HTMLElement>("[data-glow]");
      if (host && !host.contains(event.relatedTarget as Node | null)) delete host.dataset.glowing;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
